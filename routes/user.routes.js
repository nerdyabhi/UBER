const express = require('express');
const router = express.Router();
const {userRegistrationSchema  , userLoginSchema} = require( '../validation/user.validation');
const {registerUserHandler , loginUserHandler} = require('../controllers/user.controller');

router.post("/register", (req, res) => {

    // Validate Using UserSchema Here !!!!!
    const result = userRegistrationSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.errors
        });
    }
    
    // Now , Got the right data : , use this and create userModel  
    const validatedData = result.data;
    
    registerUserHandler(validatedData , req, res)
    
});

router.post("/login" , (req, res)=>{
    // Validation 
    const result = userLoginSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success:false,
            errors:result.error.errors
        })
    }
    const validData = result.data;
    
    // Handler
    loginUserHandler(validData , req, res)

})

module.exports = router;