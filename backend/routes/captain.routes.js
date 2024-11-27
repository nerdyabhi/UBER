const express = require('express');
const router = express.Router();
const {captainRegistrationSchema , captainLoginSchema} = require('../validation/captain.validation')
const {registerCaptain , loginCaptainHandler , getProfileHandler , logoutCaptainHandler} = require('../controllers/captain.controllers');
const {authCaptain} = require('../middlewares/auth.middleware');


router.post('/register' , async(req , res)=>{
    const result = captainRegistrationSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({msg:"Error , Please Provide Valid Credentials" , error:result.error.errors})
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

router.get('/profile' , authCaptain , getProfileHandler);

router.get('/logout' ,authCaptain , logoutCaptainHandler );

module.exports = router;