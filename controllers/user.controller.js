const userModel = require('../models/user.model')
const userServices = require('../services/user.service');


const registerUser = async({fullName , email , password} , req, res)=>{
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({fullName , email , password:hashedPassword});

    const token  = user.generateAuthToken();
    res.status(201).json({token , user})
}

module.exports = {
    registerUser,
}