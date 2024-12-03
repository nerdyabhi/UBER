const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');


function calculateFare(distanceInKm, vehicleType = 'Car') {
    const baseFares = {
        Motorcycle: 20,
        Auto: 35,
        Car: 50
    };
    const farePerKm = 10; // fare per kilometer in currency
    return Math.round(baseFares[vehicleType] + (farePerKm * distanceInKm));
}

const getFare= async(pickup, destination) =>{
    const distanceData = await mapService.getDistanceAndTime(destination, pickup);

    if (distanceData && distanceData.data.status === "OK") {
        const distanceInKm = distanceData.data.distance.value / 1000;
        const fares = {
            Motorcycle: calculateFare(distanceInKm, 'Motorcycle'),
            Auto: calculateFare(distanceInKm, 'Auto'),
            Car: calculateFare(distanceInKm, 'Car')
        };
        return {fares , distanceInKm  };
    }
   return res.status(400).json({message:"Please send valid details"});
}

const getOTP = (num)=>{
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)-1).toString();
    return otp;
}


const createRide = async({user , pickup , destination , vehicleType , pickupCoordinates ,destinationCoordinates })=>{
    if(!user || !pickup | !destination || !vehicleType){
        throw new Error("All field are required");
    }

    
        const {fares , distanceInKm} = await getFare(pickup , destination);
        const otp = getOTP(6);
        const ride = await rideModel.create({
            user,
            pickup,
            destination,
            fare: fares[vehicleType],
            distance: distanceInKm * 1000,
            otp: otp,
            pickupCoordinates: {
            ltd: pickupCoordinates.lat,
            lng: pickupCoordinates.lng
            },
            destinationCoordinates:{
            
                ltd: destinationCoordinates.lat,
                lng: destinationCoordinates.lng
            }
        });

       return ride;
}


module.exports = {createRide , getFare};
