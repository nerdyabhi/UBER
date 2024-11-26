const express = require('express');
const router = express.Router();
const userSchema = require( '../validation/user.validation');
const {registerUser} = require('../controllers/user.controller');

router.post("/register", (req, res) => {

    // Validate Using UserSchema Here !!!!!
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.errors
        });
    }
    
    // Now , Got the right data : , use this and create userModel  
    const validatedData = result.data;
    
    registerUser(validatedData , req, res)
    
});

module.exports = router;