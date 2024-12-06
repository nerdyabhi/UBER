import { Link } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Form from "../components/Form"
import UberMap from "../components/UberMap";

const Start = () => {
    const [userCoordinates , setUserCoordinates] = useState(null);
    const [pickupCoordinates , setPickupCoordinates] = useState(null);
    const [destinationCoordinates , setDestinationCoordinates] = useState(null);
    useEffect(() => {
        const fetchCoordinates = async () => {
            if (!userCoordinates) {
                const url = `https://ipinfo.io/json?token=2e1d3d6f06dc4e`;
                try {
                    const response = await axios.get(url);
                    
                    const loc = response.data.loc.split(',');
                    setUserCoordinates({ ltd: parseFloat(loc[0]), lng: parseFloat(loc[1]) });
                } catch (error) {
                    console.log("Failed to fetch location data", error);
                }
            }
        };
        fetchCoordinates();
    }, [])

    return (
      <div className="h-[100vh] bg-gray-50 max-w-[100%] w-[95%] relative mx-5">
      <div className="absolute inset-0 -z-10 "></div>
        {/* Navbar */}
          <Navbar/>
          <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh]">
            {/* Left Div */}
          <div className=" w-full md:w-[40vw] flex flex-col gap-5 border-2 m-2 py-10">
            {/* Heading */}
                  <h1 className="font-bold text-4xl text-center">Go anywhere with <span className="font-sans">Uber</span></h1>
                  <Form setDestinationCoordinates= {setDestinationCoordinates} setPickupCoordinates={setPickupCoordinates}/>
            </div>

            {/* Map */}
          <div className=" relative w-full md:w-[50vw] h-[80vh] md:h-[70vh] p-10 ">
              {userCoordinates  && <LiveTracking userCoordinates={userCoordinates} pickupCoordinates={pickupCoordinates} destinationCoordinates={destinationCoordinates}/>}
             
          </div>

        </div>
     
      </div>
    );
}

export default Start;