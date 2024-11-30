const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');
const crypto = require('crypto');

function calculateFare(distanceInKm, vehicleType = 'Car') {
    const baseFares = {
        Motorcycle: 30,
        Auto: 40,
        Car: 50
    };
    const farePerKm = 10; // fare per kilometer in currency
    return baseFares[vehicleType] + (farePerKm * distanceInKm);
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
    throw new Error("Unable to calculate fare");
}

const getOTP = (num)=>{
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)-1).toString();
    return otp;
}


const createRide = async({user , pickup , destination , vehicleType})=>{
    if(!user || !pickup | !destination || !vehicleType){
        throw new Error("All field are required");
    }

    
        const {fares , distanceInKm} = await getFare(pickup , destination);
        const otp = getOTP(6);
        const ride = await rideModel.create({
            user,
            pickup,
            destination,
            fare:fares[vehicleType],
            distance:distanceInKm*1000,
            otp:otp,
        })

       return ride;
}

module.exports = createRide;
