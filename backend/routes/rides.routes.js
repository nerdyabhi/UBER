const express = require('express');
const router = express.Router();
const {z} = require('zod');
const {createRide , getFare } = require('../services/ride.service');
const {authUser} = require('../middlewares/auth.middleware');
const { getCaptainsInTheRadius  , getAddressCoordinate} = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');


const createRideSchema = z.object({
    pickup: z.string().min(1, { message: "Pickup location is required" }),
    destination: z.string().min(1, { message: "Destination is required" }),
    vehicleType: z.enum(['Motorcycle', 'Auto', 'Car'], {
        message: "Vehicle type must be either Motorcycle, Auto, or Car"
    })
});

const getFareSchema = z.object({
    pickup: z.string().min(1, { message: "Pickup location is required" }),
    destination: z.string().min(1, { message: "Destination is required" }),
})

router.post('/create' ,authUser,  async(req , res)=>{

    const validation = createRideSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

   const {pickup , destination , vehicleType} = validation.data;
    
    try {
        const ride  = await createRide({ user: req.user._id,pickup , destination , vehicleType});
         res.status(200).json(ride);


        /*Details for the captain */
        const pickupCoordinates  =await getAddressCoordinate(pickup);
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
            console.log(messageObject);
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

module.exports = router;