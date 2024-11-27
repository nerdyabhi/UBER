const blackListedTokenModel = require('../models/blackListedTokens.model');
const userModel = require('../models/user.model')
const userServices = require('../services/user.service');



/* @POST /user/register handler. */
const registerUserHandler = async({fullName , email , password} , req, res)=>{
  try {
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({fullName , email , password:hashedPassword});

    const token  = user.generateAuthToken();
    res.cookie('token', token).status(201).json({token , user});
  } catch (error) {
    if(error.code === 11000) {
      return res.status(400).json({"msg": "Email already exists"});
    }
    res.status(403).json({"msg":"having Trouble Logging you In"});
  }
}

  
/*@Post /user/login handler */
const loginUserHandler = async({email  , password} , req, res) =>{
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({"msg":"Invalid Email or Password"})
    }

    const isMatch = await user.comparePassword(password);
    
    if(!isMatch ){
        return res.status(401).json({"msg":"Invalid Email or Password"})

    }
    const token = await user.generateAuthToken();
    res.cookie('token' , token).status(200).json({token , user});

}


/* @GET /user/profile handler */
const getUserProfile = async(req , res )=>{
    return res.status(200).json({msg:"Success" , user:req.user});
}

const logoutUserHandler = async(req , res)=>{
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  if(!token) res.status(401).json({msg:'User not logged in '});
  res.clearCookie('token');
  await blackListedTokenModel.create({token});

  res.status(200).json({msg:'Successfully Logged out'})
}

module.exports = {
    registerUserHandler,
    loginUserHandler,
    getUserProfile,
    logoutUserHandler,
}