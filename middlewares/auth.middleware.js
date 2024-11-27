const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const blackListedTokenModel = require('../models/blackListedTokens.model');
const captainModel = require("../models/captain.models");

const authUser = async(req , res , next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({msg:'Unauthorized , No token found '});

   
    const isBlacklisted = await blackListedTokenModel.findOne({ token: token });
    
    if(isBlacklisted){
        
        return res.status(401).json({message:'Unauthorized , Blacklisted'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findById(decoded._id);
        req.user = user;
        
        next();
    } catch (error) {
        return res.status(401).json({msg : 'Unauthorized , error decoding JWT'});
    }
    
}

const authCaptain = async(req , res , next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({msg:'Unauthorized , No token found '});

   
    const isBlacklisted = await blackListedTokenModel.findOne({ token: token });
    
    if(isBlacklisted){
        
        return res.status(401).json({message:'Unauthorized , Blacklisted'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        
        next();
    } catch (error) {
        return res.status(401).json({msg : 'Unauthorized , error decoding JWT'});
    }
}

module .exports = {
    authUser,
    authCaptain,
};