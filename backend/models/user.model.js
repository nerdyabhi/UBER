const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{type:String , required:true , minlength :[3 , 'First name should have atleast 3 characters.']},
        lastName:{type:String , required:true , minlength:[3 , 'Last name should have atleast 3 characters']}
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength:[5 , 'Please Enter atleast 5 characters']
    },

    password:{
        type:String,
        required:true,
        select:false
    },
    socketId :{
        type:String,
    }
})

// Methods for instances (jaise classes mein hota waise..)
userSchema.methods.generateAuthToken = function(){
    console.log(this._id);
    
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword =  async function(password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
}

// More like static keyword thing , hashes password without requiring the instance Bravo !
userSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password , 10);
}

const userModel = mongoose.model('user' , userSchema);

module.exports = userModel;