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
    pickup: z.string().nonempty({ message: "Pickup location is required" }),
    destination: z.string().nonempty({ message: "Destination location is required" }),
    pickupCoordinates: z.object({
        ltd: z.number().min(-90).max(90, { message: "Invalid latitude for pickup" }),
        lng: z.number().min(-180).max(180, { message: "Invalid longitude for pickup" })
    }),
    destinationCoordinates: z.object({
        ltd: z.number().min(-90).max(90, { message: "Invalid latitude for destination" }),
        lng: z.number().min(-180).max(180, { message: "Invalid longitude for destination" })
    }),
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
    pickupCoordinates: z.object({
        ltd: z.number().min(-90).max(90, { message: "Invalid latitude for pickup" }),
        lng: z.number().min(-180).max(180, { message: "Invalid longitude for pickup" })
    }),
    destinationCoordinates: z.object({
        ltd: z.number().min(-90).max(90, { message: "Invalid latitude for destination" }),
        lng: z.number().min(-180).max(180, { message: "Invalid longitude for destination" })
    })
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

    if(!req.user){
        return res.status(400).json({error:"User Not Found"})
    }
    console.log(validation.data);
    

   const {pickupCoordinates , destinationCoordinates, pickup , destination , vehicleType , fares} = validation.data;
    
    try {
        const ride = await createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType,
            pickupCoordinates,
            destinationCoordinates,
            fares,
        });
        console.log("Created ride succesfully" ,ride);
        
        
         res.status(200).json(ride);

        /*Sending messages to the captain */
         ride.otp = "";

        const CaptainsNearby = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 100);
        CaptainsNearby.forEach(captain => {
            const messageObject = {
                event: 'ride-requested',
                data: {
                    ride,
                    user:req.user
                }
            };
            console.log(captain.fullName);
            
            sendMessageToSocketId(captain.socketId, messageObject);
            
        });

    } catch (error) {
        return res.status(400).json({message:error.message});
    }

})




router.post('/getFare' ,authUser , async(req ,res)=>{
    const validation = getFareSchema.safeParse(req.body);
    if(!validation.success){
        return res.status(400).json({message:"Please Send valid data"});
    }
    const {fares , distanceInKm} = await getFare(validation.data.pickupCoordinates ,validation.data.destinationCoordinates);

    if(!fares){
        res.status(500).json({message:"Failed to get a ride , skill issue."});
    }

    return res.status(200).json({fares });

})

router.post('/confirm', authCaptain, async (req, res) => {
    const validation = confirmRideSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json("Please send valid RideId and CaptainID");
    }

    

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

        //** Confirm the ride */
        ride.status = 'accepted';
        ride.captain = captainId;
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
                        location:captain.location,
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