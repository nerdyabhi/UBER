const express = require('express');
const router = express.Router();
const {authUser} = require('../middlewares/auth.middleware');
const {getAddressCoordinate , getDistanceAndTime , getAutoCompleteSuggestions} = require('../services/maps.service')
const { z } = require('zod' );

const getCoordinatesSchema = z.object({
    address: z.string().min(3),
});

const getDistanceTimeSchema = z.object({
    destinations:z.string().min(3),
    origins:z.string().min(3),
})

const autoCompleteSchema = z.object({
    input: z.string().min(1),
});


router.get('/get-coordinates', authUser, async(req, res) => {
    const validation = getCoordinatesSchema.safeParse(req.query);

    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid query parameter' });
    }
    
    const response = await getAddressCoordinate(validation.data.address);
    // Do stuffs
    res.json({ data: response });
});

router.get('/get-Distance-time' , authUser, async(req, res)=>{
    const validation = getDistanceTimeSchema.safeParse(req.query);
    if(!validation.success){
        return res.status(400).json({error:"Invalid Query Parameters"});
    }
    const origins = validation.data.origins;
    const destinations = validation.data.destinations;
    const response = await getDistanceAndTime(origins , destinations);

    res.json({data:response});

})

router.get('/autocomplete' , authUser, async (req, res) => {

    const validation = autoCompleteSchema.safeParse(req.query);

    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid query parameter' });
    }

    const response = await getAutoCompleteSuggestions(validation.data.input);
    res.json({ data: response });
})

module.exports =  router;