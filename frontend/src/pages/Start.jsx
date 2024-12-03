import { Link } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import { useEffect, useState } from "react";
import axios from "axios";


const Start = () => {
    const [userCoordinates , setUserCoordinates] = useState(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (!userCoordinates) {
                const url = `https://ipinfo.io/json?token=2e1d3d6f06dc4e`;
                try {
                    const response = await axios.get(url);
                    console.log(response);
                    
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
      <div className="h-[100vh] w-full relative">
        <div className="absolute top-4 z-50 left-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" className="h-8" />
        </div>
        {userCoordinates && <div className="h-[90%]"><LiveTracking userCoordinates={userCoordinates} className="h-full w-full" /> </div>}
        <div className="bg-white absolute bottom-0 w-full h-[10vh] rounded-t-3xl shadow-lg flex items-center justify-center">
          <Link 
            to="/home" 
            className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            Get Started
          </Link>
        </div>
      </div>
    );
}

export default Start;