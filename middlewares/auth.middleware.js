const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');


const authUser = async(req , res , next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({msg:'Unauthorized , No token found '});

    try {
        const decoded = await jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded);
        
        const user = await userModel.findById(decoded._id);
        req.user = user;
        
        
        next();
    } catch (error) {
        return res.status(401).json({msg : 'Unauthorized , error decoding JWT'});
    }
    
}

module .exports = authUser;