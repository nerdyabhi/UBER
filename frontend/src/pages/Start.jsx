import { Link } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { pickupCoordinatesAtom, destinationCoordinatesAtom, userCoordinatesAtom } from "../store/atom/CoordinatesContext";
import { useRecoilState } from "recoil";

const Start = () => {
  const [userCoordinates, setUserCoordinates] = useRecoilState(userCoordinatesAtom);
  const [pickupCoordinates, setPickupCoordinates] = useRecoilState(pickupCoordinatesAtom);
  const [destinationCoordinates, setDestinationCoordinates] = useRecoilState(destinationCoordinatesAtom);


  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!userCoordinates) {
        const url = `https://ipinfo.io/json?token=2e1d3d6f06dc4e`;
        try {
          const response = await axios.get(url);
          const loc = response.data.loc.split(',');
          setUserCoordinates({ ltd: parseFloat(loc[0]), lng: parseFloat(loc[1]) });
        } catch (error) {
          console.error("Failed to fetch location data", error);
        }
      }
    };
    fetchCoordinates();
  }, [userCoordinates]);

  return (
    <div className="h-[100vh] bg-gray-50 dark:text-white dark:bg-slate-900 max-w-[100%]  relative w-full">
      <div className="absolute inset-0 -z-10 shadow-sm dark:shadow-blue-200"></div>
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh]">
        {/* Left Div */}
        <div className="w-full md:w-[40vw] flex flex-col gap-5 border-1 border-slate-300 bg-gray-50 dark:bg-slate-900 m-2 py-10 items-center justify-center">
          {/* Heading */}
          <h1 className="font-bold text-4xl text-center">Go anywhere with <span className="font-sans">Uber</span></h1>
          <Form setDestinationCoordinates={setDestinationCoordinates} setPickupCoordinates={setPickupCoordinates} />
          <button
        onClick={(e)=>{
            e.preventDefault();
             navigate('/login')
          }}
  
        className="bg-black text-white w-[35-px] py-3 px-6 rounded-lg hover:bg-gray-800 transition"
        >
        Login
        </button>
        </div>

        {/* Map */}
        <div className="relative w-full md:w-[50vw] h-[80vh] md:h-[70vh] p-10">
          {userCoordinates && <LiveTracking />}
          
        </div>
      </div>
    </div>
  );
}

export default Start;
