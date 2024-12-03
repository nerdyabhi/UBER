const express = require('express');
const router = express.Router();
const {z} = require('zod');
const {createRide , getFare } = require('../services/ride.service');
const mongoose = require('mongoose');
const {authUser, authCaptain} = require('../middlewares/auth.middleware');
const { getCaptainsInTheRadius  , getAddressCoordinate} = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.models');
const userModel = require('../models/user.model');

/*@SCHEMA'S for the request */

const createRideSchema = z.object({
    pickup: z.string().min(1, { message: "Pickup location is required" }),
    destination: z.string().min(1, { message: "Destination is required" }),
    vehicleType: z.enum(['Motorcycle', 'Auto', 'Car'], {
        message: "Vehicle type must be either Motorcycle, Auto, or Car"
    })
});

const startRideSchema = z.object({
    rideId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ride ID"
    }),
    otp: z.string().length(6, { message: "OTP must be 6 digits" })
});

const getFareSchema = z.object({
    pickup: z.string().min(1, { message: "Pickup location is required" }),
    destination: z.string().min(1, { message: "Destination is required" }),
})

const confirmRideSchema = z.object({
    rideId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ride ID"
    }),
    captainId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid captain ID"
    })
})



/* Routers configurations */
router.post('/create' ,authUser,  async(req , res)=>{

    const validation = createRideSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

   const {pickup , destination , vehicleType} = validation.data;
    
    try {
        const pickupCoordinates = await getAddressCoordinate(pickup);
        const destinationCoordinates = await getAddressCoordinate(destination);
        const ride = await createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType,
            pickupCoordinates,
            destinationCoordinates
        });

        console.log(pickupCoordinates , destinationCoordinates);
        
         res.status(200).json(ride);

        /*Sending messages to the captain */
         ride.otp = "";

        const CaptainsNearby = await getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 100);
        CaptainsNearby.forEach(captain => {
            const messageObject = {
                event: 'ride-requested',
                data: {
                    ride,
                    user:req.user
                }
            };
            console.log("ride-requested" ,messageObject );
            
            sendMessageToSocketId(captain.socketId, messageObject);
            
        });

    } catch (error) {
        return res.status(400).json({message:error.message});
    }

})

router.post('/getFare' ,authUser , async(req ,res)=>{
    const validation = getFareSchema.safeParse(req.body);
    if(!validation.success){
        return res.json({message:"Please Send valid data"});
    }
    const fares = await getFare(validation.data.pickup ,validation.data.destination);

    return res.json({fares});

})

router.post('/confirm', authCaptain, async (req, res) => {
    const validation = confirmRideSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json("Please send valid RideId and CaptainID");
    }

    console.log("You called to create a ride.");
    

    const { rideId, captainId } = validation.data;

    try {
        const ride = await rideModel.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        const captain = await captainModel.findById(captainId);
        if (!captain) {
            return res.status(400).json({ message: 'Not a valid captain' });
        }

        if (ride.status === 'accepted') {
            return res.status(409).json({ message: 'Ride already accepted by another driver' });
        }

        console.log("ride Got accepted by", captain.fullName.firstName);

        //** Confirm the ride */
        ride.status = 'accepted';
        ride.captain = captain._id;
        await ride.save();

        const user = await userModel.findById(ride.user);
        console.log(user);
        if (user && user.socketId) {
            sendMessageToSocketId(user.socketId, {
                event: 'ride-accepted',
                data: {
                    rideId: ride._id,
                    captain: {
                        id: captain._id,
                        name: captain.fullName,
                        vehicle: captain.vehicle,
                    }
                }
            });
        }

        ride.otp = "";
        res.status(200).json(ride);

    } catch (error) {
        console.error('Error accepting ride:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/startRide', authCaptain, async (req, res) => {
        const validation = startRideSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }

        const { rideId, otp } = validation.data;

        try {
            const ride = await rideModel.findById(rideId);
            if (!ride) {
                return res.status(404).json({ message: 'Ride not found' });
            }

            if (ride.otp !== otp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            ride.status = 'ongoing';
            await ride.save();
            const user = await userModel.findById(ride.user);
            
            if (user && user.socketId) {
                sendMessageToSocketId(user.socketId, {
                    event: 'ride-started',
                    data: {
                        ride:ride,
                    }
                });
            }
            res.status(200).json(ride);   
        } catch (error) {
            console.error('Error starting ride:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
});

module.exports = router;