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
        res.status(500).json({ msg: "Error registering captain", error: error.message });
    }
}


/*@Login Captain */
const loginCaptainHandler = async(data , res)=>{
    const email = data.email;
    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain) return res.status(400).json({ msg: "Invalid username or password" });
    const passMatch = await captain.comparePassword(data.password);
    if(!passMatch) return res.status(400).json({ msg: "Invalid username or password" });

    const token = captain.generateAuthToken();
    res.cookie('token' , token).status(200).json({msg:"Successfully Registered the user" , token , captain});


}


module.exports = {
    registerCaptain,
    loginCaptainHandler
}