const blackListedTokenModel = require('../models/blackListedTokens.model');
const captainModel = require('../models/captain.models');
const createCaptain = require('../services/captain.service');

/*@Register Captain */
const registerCaptain = async(data , res)=>{

    const hashedPassword = await captainModel.hashPassword(data.password);
    data.password = hashedPassword;

    try {
        const captain = await createCaptain(data);
        const token = captain.generateAuthToken();
        res.cookie('token', token).status(200).json({ msg: "Successfully Registered the user", token, captain });
    } catch (error) {
        if(error.code === 11000) {
            return res.status(500).json({"msg": "Email already exists"});
          }
        res.status(500).json({ msg: error.message, error: error.message });
    }
}


/*@Login Captain */
const loginCaptainHandler = async(data , req, res)=>{
   try {
    const email = data.email;
    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain) return res.status(400).json({ msg: "Invalid username or password" });
    const passMatch = await captain.comparePassword(data.password);
    if(!passMatch) return res.status(400).json({ msg: "Invalid username or password" });

    const token = captain.generateAuthToken();
    res.cookie('token' , token).status(200).json({msg:"Successfully Registered the user" , token , captain});
   } catch (error) {
        res.status(500).json({msg:"Failed to login with message", error: error.message});
   }


}

/*@GetProfile Handler */
const getProfileHandler = async( req, res)=>{
    res.status(200).json({captain:req.captain});
}

/*@Logout Captain Handler */
const logoutCaptainHandler = async(req , res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    try {
        await blackListedTokenModel.create({ token });
        res.clearCookie('token').status(200).json({ msg: "Successfully logged out" });
    } catch (error) {
}
}

module.exports = {
    registerCaptain,
    loginCaptainHandler,
    getProfileHandler,
    logoutCaptainHandler
}