const express = require('express');
const router = express.Router();
const {captainRegistrationSchema , captainLoginSchema , updateLocationSchema} = require('../validation/captain.validation')
const {registerCaptain , loginCaptainHandler , getProfileHandler , logoutCaptainHandler} = require('../controllers/captain.controllers');
const {authCaptain} = require('../middlewares/auth.middleware');
const captainModel = require('../models/captain.models');


router.post('/register' , async(req , res)=>{
    const result = captainRegistrationSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({msg: result.error.issues, error:"Please ENter Valid data" })
    }

    const data = result.data;
    registerCaptain(data , res);
})

router.post('/login' , async(req , res)=>{

    /*@VALIDATION CHECK */
    const result = captainLoginSchema.safeParse(req.body);
    if(!result.success) return res.status(400).json({msg:"Please send valid data"});
    const data = result.data;

    /*@ACTUAL HANDLER */
    loginCaptainHandler(data , req, res);
})

router.post('/update-location' , authCaptain , async(req , res)=>{
    const validation = updateLocationSchema.safeParse(req.body);
    if(!validation.success){
        res.status(400).json({message:"Please Send Valid Longitude and Latitude"});
    }

    const captainId = req.captain?._id;
   
    try {
        await captainModel.findByIdAndUpdate(captainId, {
            location: {
                ltd:validation.data.ltd,
                lng:validation.data.lng
            }
        });
        res.status(200).json({ message: "Location updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update location", error });
    }
    
})

router.get('/profile' , authCaptain , getProfileHandler);

router.get('/logout' ,authCaptain , logoutCaptainHandler );

module.exports = router;