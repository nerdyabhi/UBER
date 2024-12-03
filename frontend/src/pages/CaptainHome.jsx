import { useRecoilValue } from "recoil";
import { captainContextAtom } from "../store/atom/CaptainContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import RideAvailable from "../components/RideAvailable";
import CaptainDetails from "../components/CaptainDetails";
import { SocketContext } from "../store/atom/SocketContext";
import CompleteRidewithOtp from "../components/CompleteRideWithOtp";

const CaptainHome = () => {
  const token = localStorage.getItem('token');
  const Navigate = useNavigate();
  const captain = useRecoilValue(captainContextAtom);
  const [data , setData] = useState(null);
  const [completeRideData , setCompleteRideData] = useState(false);
  const [fare , setFare] = useState(null);
  const [userCoordinates , setUserCoordinates] = useState(null);
  const [captainCoordinates , setCaptainCoordinates] = useState(null);

  const socket = useContext(SocketContext);



  /*@ Use Effects  */
  useEffect(() => {
    if(captain){
      
      socket?.emit('join', {
        userId: captain?._id,
        userType: 'captain'
      });

    }

    socket?.emit('join', {
      userId: captain?._id,
      userType: 'captain'
    });

    const updateLocation = () => {
      if (navigator.geolocation && captain) {
        navigator.geolocation.getCurrentPosition(position => {
          socket?.emit('update-location-captain', {
            userId: captain?._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
          setCaptainCoordinates({
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [captain , socket ]);


    socket?.on('connect', () => {
      console.log("Connected to server");
    });

    socket?.on('disconnect', () => {
      console.log("Disconnected from server");
    });

    socket?.on('ride-requested', (data) => {
      console.log("Ride requested: ", data);
      setData(data);
      setFare(data.ride.fare);
      setUserCoordinates(data?.pickupCoordinates);

    });



  /*@Handlers */
  const logoutHandler = async () => {
    await axios.get(API_URL + '/captain/logout', {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    console.log("Logged out");
    Navigate('/captain/login');


  };

  const handleConfirmRide = ()=>{
    axios.post(`${API_URL}/rides/confirm`, {
      rideId: data?.ride?._id,
      captainId: captain?._id
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Ride confirmed: ", response.data);
      setUserCoordinates(response.data.pickupCoordinates)
      setCompleteRideData(response.data);      // setCaptainCoordinates(data?.destinationCoordinates)
      setData(null);
    })
    .catch(error => {
      console.error("Error confirming ride: ", error);
    });
    // setCompleteRidePanel(true);
    // setData(null);
  }

 
  


  return (
    <>
      {captain && <CaptainDetails captain={captain} logoutHandler={logoutHandler} captainCoordinates = {captainCoordinates} userCoordinates={userCoordinates}  />}
      {data && <RideAvailable data={data}  setData={setData} handleConfirmRide = {handleConfirmRide}   />}
      {completeRideData && <CompleteRidewithOtp completeRideData = {completeRideData} setCompleteRideData={setCompleteRideData} fare =  {fare}/>}
    </>
  );
};

export default CaptainHome;
