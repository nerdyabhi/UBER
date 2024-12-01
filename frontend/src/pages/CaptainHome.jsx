import { useRecoilValue } from "recoil";
import { captainContextAtom } from "../store/atom/CaptainContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import RideAvailable from "../components/RideAvailable";
import CaptainDetails from "../components/CaptainDetails";
import { SocketContext } from "../store/atom/SocketContext";

const CaptainHome = () => {
  const Navigate = useNavigate();
  const captain = useRecoilValue(captainContextAtom);
  // const [availableRide, setAvailableRide] = useState(false);
  const [data , setData] = useState(null);

  const socket = useContext(SocketContext);

  if (!captain) {
    return <h1>Please login to continue</h1>;
  }

  const token = localStorage.getItem('token');
  const logoutHandler = async () => {
    await axios.get(API_URL + '/captain/logout', {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    console.log("Logged out");
    


  };

  useEffect(() => {
    if (navigator.geolocation) {
      let lastPosition = null;
      let lastUpdateTime = Date.now();

      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude: ltd, longitude: lng } = position.coords;
          const currentTime = Date.now();

          if (
            !lastPosition ||
            (lastPosition.latitude !== ltd || lastPosition.longitude !== lng) ||
            (currentTime - lastUpdateTime >= 2 * 60 * 1000)
          ) {
            socket?.emit('update-location', { userId: captain._id, location: { ltd, lng } });
            lastPosition = { latitude: ltd, longitude: lng };
            lastUpdateTime = currentTime;
          }
        },
        (error) => {
          console.error("Error watching location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    socket?.emit('join', { userType: "captain", userId: captain._id });

  
  }, [token, captain, socket]);

  useEffect(() => {
    socket?.on('connect', () => {
      console.log("Connected to server");
    });

    socket?.on('disconnect', () => {
      console.log("Disconnected from server");
    });

  socket?.on('ride-requested', (data) => {
    console.log("Ride requested: ", data);
    setData(data);
  })

  }, [socket]);

  return (
    <>
      <CaptainDetails captain={captain} logoutHandler={logoutHandler} />
      {data && <RideAvailable data={data} />}
    </>
  );
};

export default CaptainHome;
