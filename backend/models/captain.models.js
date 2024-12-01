const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const captainSchema = new mongoose.Schema({

    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3 , 'First Name should be atleast 3 characters long']
        },
        lastName:{
            type:String,
            required:true,
            minLength:[3 , 'Last Name should be atleast 3 characters long'],
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },

    password:{
        type:String,
        required:true,
        select:false

    },

    socketId:{
        type:String
    },

    status:{
        type:String,
        enum:['active' , 'inactive'],
        default:'inactive',
    },

    vehicle:{
        
        color:{
            type:String,
            required:true,
            minlength :[3 , 'color must be atleast 3 characters long ']
        },

        plate:{
            type:String,
            required:true,
            minlength:[3 , 'Plate must have 3 characters'],
        },
        capacity :{
            type:Number  ,
            required:true,
            min:[1 , 'Capacity must be atleast 1'],
        },

        vehicleType:{
            type:String,
            required:true,
            enum : ['car' , 'motorcycle' , 'auto']
        }

    },

    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number
        }
    }


})


captainSchema.methods.generateAuthToken = function(){
    const token  = jwt.sign({_id : this._id} , process.env.JWT_SECRET , {expiresIn:'15d'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password ,10);
}


const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;