const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{type:String , required:true , minlength :[3 , 'First name should have atleast 3 characters.']},
        lastName:{type:String , required:true , minlength:[3 , 'Last name should have atleast 3 characters']}
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5 , 'Please Enter atleast 5 characters']
    },

    password:{
        type:String,
        required:true
    },
    socketId :{
        type:String,
        required:true
    }
})

userSchema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({_id:this._id} , process.env.JWT_SECRET);
}