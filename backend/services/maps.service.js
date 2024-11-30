
const axios = require('axios');


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
const getDistanceAndTime = async(destinations, origins) => {
    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destinations}&origins=${origins}&key=${apiKey}`
    try {
        const response = await axios.get(url);
        const data = response?.data?.rows[0]?.elements[0];

       

        return {data };
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

module.exports = {
    getAddressCoordinate,
    getDistanceAndTime,
    getAutoCompleteSuggestions
}