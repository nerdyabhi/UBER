const mongoose = require('mongoose');

const connectToDB = async()=>{
     try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Succesfully Connected to MongoDB");
        
     } catch (error) {
        console.log("Error Connecting Database : " , error);
        
     }
}

module.exports = connectToDB;