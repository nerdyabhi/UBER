const userModel = require('../models/user.model');

module.exports.createUser = async ({fullName , email , password}) =>{

    const user = await userModel.create({
        fullName,
        email,
        password
    })

    return user;
}