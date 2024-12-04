import { useState, useEffect } from "react";
import axios from "axios";
import useDebouncing from "./useDebouncing";
import { API_URL } from "../utils/constants";

const useAutoComplete = (input, token) => {
    const [locations, setLocations] = useState([]);

    const getAutoCompleteValues = async () => {
        try {
            const response = await axios.get(API_URL + '/maps/autocomplete', {
                params: { input },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setLocations(response.data.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
            setLocations([]);
        }
    };

    const debouncedGetAutoComplete = useDebouncing(getAutoCompleteValues, 350);

    useEffect(() => {
        if (input) {
            debouncedGetAutoComplete();
        }
    }, [input]);

    return locations;
};

export default useAutoComplete;