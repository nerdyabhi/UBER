import { useRecoilState, useRecoilValue } from "recoil";
import { captainContextAtom } from "../store/atom/CaptainContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import RideAvailable from "../components/RideAvailable";
import CaptainDetails from "../components/CaptainDetails";
import { SocketContext } from "../store/atom/SocketContext";
import CompleteRidewithOtp from "../components/CompleteRideWithOtp";
import Navbar from "../components/Navbar";
import LiveTracking from "../components/LiveTracking";
import { destinationAtom, destinationCoordinatesAtom, pickupAtom, pickupCoordinatesAtom } from "../store/atom/CoordinatesContext";
import Draggable from "react-draggable";
import { ToastContainer } from "react-toastify";

const CaptainHome = () => {
  const token = localStorage.getItem('token');
  const Navigate = useNavigate();
  const captain = useRecoilValue(captainContextAtom);
  const [completeRideData , setCompleteRideData] = useState(null);
  const[RideAvailablePanel , setRideAvailablePanel] = useState(false);
  const [data , setData] = useState(null);
  const [captainCoordinates , setCaptainCoordinates] = useState(null);
  const [pickupCoordinates , setPickupCoordinates]  = useRecoilState(pickupCoordinatesAtom)
  const [destinationCoordinates , setDestinationCoordinates] = useRecoilState(destinationCoordinatesAtom);
  const [pickup , setPickup] = useRecoilState(pickupAtom);
  const [destination , setDestination] = useRecoilState(destinationAtom);
  const [fare , setFare] = useState(null);
  

  const socket = useContext(SocketContext);



  /*@ Use Effects  */
  useEffect(() => {
    if(captain){
      
      socket?.emit('join', {
        userId: captain?._id,
        userType: 'captain'
      });

    }

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



  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log("Connected to server");
    });

    socket.on('disconnect', () => {
      console.log("Disconnected from server");
    });

    socket.on('ride-requested', (data) => {
      console.log("Ride requested: ", data);
      setData(data);
      setRideAvailablePanel(true);
      setFare(data.ride.fare);

    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('ride-requested');
    };
  }, [socket]);


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
      setCompleteRideData(response?.data);
      setPickupCoordinates(response?.data?.pickupCoordinates);
      setRideAvailablePanel(false);
    })
    .catch(error => {
      console.error("Error confirming ride: ", error);
    });
    // setCompleteRidePanel(true);
    // setData(null);
  }

 
  
  return (
      <div className="h-full w-full relative dark:text-white dark:bg-slate-900">
        {/* Navbar */}
         <Navbar/>
        <div className="flex h-full md:h-full  md:flex-row flex-col-reverse md:items-start items-center justify-center gap-5">
         {/* Captain Details */}
          <div className="flex items-center justify-center min-w-[320px] w-[30%] dark:text-black flex-col  px-5 py-5 md:w-[30%]">
            {captain && <CaptainDetails logoutHandler={logoutHandler} />} 
          </div>

        {/* Map */}
        <div className="flex md:items-start items-center justify-center w-full md:w-[90%] md:h-[90vh] h-[40vh]">
         {captainCoordinates && <LiveTracking vehicleType={captain?.vehicle?.vehicleType} captainCoordinates={captainCoordinates} />}
        </div>

        
        {RideAvailablePanel  &&
            <Draggable disabled={window.innerWidth < 768}>
            <div className="absolute dark:text-black flex items-center justify-center w-full max-w-[450px]  md:max-w-[500px] px-3 rounded-xl  md:w-[40%] max-h-[50%] z-[1000]">
                      <RideAvailable data={data} setData={setData} handleConfirmRide = {handleConfirmRide} setRideAvailablePanel={setRideAvailablePanel}/>
                    </div>
            </Draggable>

        }

        {completeRideData &&
          <Draggable disabled={window.innerWidth < 768}>
            <div className="absolute top-0 h-full  dark:text-black flex items-center justify-center w-full max-w-[450px]  md:max-w-[500px] px-3 rounded-xl  md:w-[40%] max-h-[50%] z-[1000]">
              <CompleteRidewithOtp completeRideData = {completeRideData} setCompleteRideData={setCompleteRideData} fare =  {fare}/>
              </div>
           </Draggable>
           }


        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition: Bounce 
                stacked />

        </div>

      </div>
  )

  // return (
  //   <>
  //     {captain && <CaptainDetails captain={captain} logoutHandler={logoutHandler} captainCoordinates = {captainCoordinates} userCoordinates={userCoordinates}  />}
  //     {data && <RideAvailable data={data}  setData={setData} handleConfirmRide = {handleConfirmRide}   />}
  //     {completeRideData && <CompleteRidewithOtp completeRideData = {completeRideData} setCompleteRideData={setCompleteRideData} fare =  {fare}/>}
  //   </>
  // );
};

export default CaptainHome;
