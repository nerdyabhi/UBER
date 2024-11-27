const captainModel = require('../models/captain.models');


const createCaptain = async({fullName , email , password , vehicle})=>{

    if(!fullName || !email , !password , !vehicle){
        throw new Error("All fields are required");
    }
    const captain = captainModel.create({
        fullName,
        email,
        password: password,
        vehicle
    })

    return captain;
}

module.exports = createCaptain;