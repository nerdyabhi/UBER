
const axios = require('axios');
const captainModel = require('../models/captain.models');

/*@Get Cordinates  */
const getAddressCoordinate = async(address)=>{
    const apiKey = process.env.GOOGLE_MAP_API;
    
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&language=en&region=en&key=${apiKey}`

    try {
        
        const response = await axios.get(url);
        const coordinates = response.data.results[0].geometry.location;
        return coordinates;
    } catch (error) {
        console.log("Unable to fetch coordinates" , error);
    }
}


/*@Get distance and time.. */
const getDistanceAndTime = async(destinationCoordinates, pickupCoordinates) => {
    const apiKey = process.env.HERE_MAP_API;
    const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${pickupCoordinates.ltd},${pickupCoordinates.lng}&destination=${destinationCoordinates.ltd},${destinationCoordinates.lng}&return=summary&apiKey=${apiKey}`
    try {
        const response = await axios.get(url);
        const data = response?.data.routes[0].sections[0].summary;
        if(!data) return null;
        return data.length;
        // { duration: 19347, length: 614976, baseDuration: 19465 }
    } catch (error) {
        console.log("Unable to fetch distance and time", error);
    }
}

const getAutoCompleteSuggestions = async(address)=>{
    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${address}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const suggestions = response.data.predictions.map(prediction => ({
            place_id: prediction.place_id,
            description: prediction.description
        }));
        return suggestions;
    } catch (error) {
        console.log("Unable to fetch autocomplete suggestions", error);
        return [];
    }
}

const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], radius / 6371]
                }
            }
        });
        return captains;
    } catch (error) {
        console.log("Unable to fetch captains in the radius", error);
        return [];
    }
}
module.exports = {
    getAddressCoordinate,
    getDistanceAndTime,
    getAutoCompleteSuggestions,
    getCaptainsInTheRadius
}