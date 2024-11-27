const express = require('express');
const router = express.Router();
const {userRegistrationSchema  , userLoginSchema} = require( '../validation/user.validation');
const {registerUserHandler , loginUserHandler , getUserProfile , logoutUserHandler} = require('../controllers/user.controller');
const {authUser} = require('../middlewares/auth.middleware')


/* /user/register Route  */
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


/* /user/login Route */
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


/* /user/profile Route */
router.get("/profile" ,authUser ,  getUserProfile)

/* /user/logout Route */
router.get('/logout' , authUser , logoutUserHandler);
module.exports = router;