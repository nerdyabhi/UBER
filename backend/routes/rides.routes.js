const express = require('express');
const router = express.Router();
const {z} = require('zod');
const createRide = require('../services/ride.service');
const {authUser} = require('../middlewares/auth.middleware');


const createRideSchema = z.object({
    pickup: z.string().min(1, { message: "Pickup location is required" }),
    destination: z.string().min(1, { message: "Destination is required" }),
    vehicleType: z.enum(['Motorcycle', 'Auto', 'Car'], {
        message: "Vehicle type must be either Motorcycle, Auto, or Car"
    })
});

router.post('/create' ,authUser,  async(req , res)=>{

    const validation = createRideSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

   const {pickup , destination , vehicleType} = validation.data;
    
    try {
        const ride  = await createRide({ user: req.user._id,pickup , destination , vehicleType});
        return res.status(200).json(ride);

    } catch (error) {
        return res.status(400).json({message:error.message});
    }

})

module.exports = router;