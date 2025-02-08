import { useRecoilState, useRecoilValue } from "recoil";
import { userContextAtom } from "../store/atom/UserContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import RideComponent from "../components/RideComponent"
import ConfirmedVehicle from "../components/confirmedVehicle";
import { SocketContext } from "../store/atom/SocketContext";
import OngoingRide from "../components/OngoingRide";
import LiveTracking from "../components/LiveTracking";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { destinationAtom, destinationCoordinatesAtom, pickupAtom, pickupCoordinatesAtom } from "../store/atom/CoordinatesContext";
import Draggable from 'react-draggable';
import { ToastContainer  , toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LinearGradient } from "react-text-gradients";

const Home = ()=>{
    const user = useRecoilValue(userContextAtom);
    // const [locations , setLocations] = useState(null);
    const [destination , setDestination ] = useRecoilState(destinationAtom);
    const [panelOpen , setPanelOpen] = useState(false);
    const [vehiclePanelOpen , setVehiclePanelOpen] = useState(true);
    const [confirmedVehiclePanel , setConfirmedVehiclePanel] = useState(false);
    const [WaitingForDriverPanel , setWaitingForDriverPanel] = useState(false);
    const [fares , setFares] = useState(null);
    const [vehicleType , setVehicleType] = useState(null);
    const [rideData , setRideData] = useState(null);
    const [confirmedRideData , setConfirmedRideData] = useState(null);
    const [pickupCoordinates , setPickupCoordinates] = useRecoilState(pickupCoordinatesAtom);
    const [pickup , setPickup] = useRecoilState(pickupAtom);
    const [destinationCoordinates , setDestinationCoordinates] = useRecoilState(destinationCoordinatesAtom);
    const [captainCoordinates , setCaptainCoordinates ] = useState(null);
    const[rideStarted , setRidestarted] = useState(null);
    
    const token = localStorage.getItem('token');
    const socket = useContext(SocketContext);
    const submitHandler = (e)=>{
        e.preventDefault();
        setPanelOpen(false);
    }
    
    const findTripHandler = async(e)=>{

        e.preventDefault();
        if(!pickupCoordinates || !destinationCoordinates){
            toast.error("Please enter valid location");
            return;
        }
        console.log(pickupCoordinates , destinationCoordinates);
        setVehiclePanelOpen(true)
        setPanelOpen(false);
        /*Get Fare */

        try {
            
            const response = await axios.post(API_URL+'/rides/getFare' , {pickupCoordinates , destinationCoordinates} , {
                headers:{
                    Authorization:`Bearer ${token}`,
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Content-Type': 'application/json'
                }
            })
            
            
            if(response.status == 200){
                console.log("Got this fares " , response.data);
                setFares(response.data);
            }

            else{
                toast.error(response?.data?.message || "failed to get a ride.");
            }
            
        } catch (error) {
            toast.error(`${error?.response?.data?.message}`);
        }

        /*Clear Menu*/
        // setPickup("");
        // setDestination("");
    }
    
    useEffect(() => {
        const fetchCoordinates = async () => {
            if (!pickupCoordinates) {
                const url = `https://ipinfo.io/json?token=2e1d3d6f06dc4e`;
                try {
                    const response = await axios.get(url);
                    console.log(response);
                    
                    const loc = response.data.loc.split(',');
                    setPickupCoordinates({ ltd: parseFloat(loc[0]), lng: parseFloat(loc[1]) });
                } catch (error) {
                    console.log("Failed to fetch location data", error);
                }
            }
        };
        fetchCoordinates();
    }, [])

    useEffect(() => {
        if (user) {
            socket.emit('join', { userType: "user", userId: user._id });
        }
    }, [user]);

    useEffect(()=>{
        const handleRideAccepted = (data) => {
            console.log("Ride got accepted  HUrray");
            console.log(data);
            setCaptainCoordinates(data?.captain?.location);
            setVehicleType(data?.captain?.vehicle?.vehicleType)
            setConfirmedRideData(data);
            setConfirmedVehiclePanel(false);

        };

        const handleError = (data) => {
            console.log("Got an error ", data);
        };

        socket?.on('ride-accepted', handleRideAccepted);
        socket?.on('error', handleError); 
        socket?.on('ride-started' ,async(data)=>{
            console.log(data);
            setPanelOpen(false);
            setVehiclePanelOpen(false);
            setConfirmedVehiclePanel(false);
            setWaitingForDriverPanel(false);
            // setPickupCoordinates(data?.pickupCoordinates);
            // setDestination(data?.destinationCoordinates);
            console.log(rideData);
            
            // setConfirmedRideData(null);

        } )

      
    }, [socket])



    return(
       <div className="h-[100vh] w-full relative dark:text-white dark:bg-slate-900">
          <Navbar/>

          <div className="flex px-2 w-full h-[100vh] flex-col md:flex-row items-start justify-start gap-5">
            <div className="lg:w-[20%] md:w-[30%] w-full  flex flex-col items-center justify-center">
                <h1 className="font-bold hidden md:block dark:text-white text-center text-3xl p-4">Book a <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>Ride</LinearGradient> now.</h1>
              <Form/>
              <button onClick={findTripHandler} className="bg-black dark:text-white   w-[170px] lg:w-[240px] align-start justify-start text-white py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition"> Find Trip </button>
            </div>
            
            <div className="flex  items-start w-full md:w-[90%] h-[90vh] ">
                <LiveTracking captainCoordinates={captainCoordinates} captainLocationName = {"Captain Location"} vehicleType={vehicleType} />
            </div>

            {vehiclePanelOpen && fares && (
              <Draggable disabled={window.innerWidth <768}>
                <div className="absolute px-6 dark:text-black py-6 cursor-pointer md:max-w-[50%] max-h-[60%] flex flex-col gap-5 bg-white/95 backdrop-blur-sm bottom-10 z-[1000] rounded-t-3xl shadow-2xl">
                  <RideComponent setVehiclePanelOpen={setVehiclePanelOpen} setConfirmedVehiclePanel={setConfirmedVehiclePanel} fares={fares} setVehicleType={setVehicleType} />
                </div>
              </Draggable>
            )}

            {confirmedVehiclePanel && fares && (
              <Draggable disabled={window.innerWidth < 768}>
                <div className="absolute dark:text-black cursor-pointer px-6 w-full max-w-[450px] py-6 max-h-[60%] flex flex-col gap-5 bg-white/95 backdrop-blur-sm bottom-10 z-[1000] rounded-t-3xl shadow-2xl">
                  <ConfirmedVehicle setVehiclePanelOpen={setVehiclePanelOpen} rideData={rideData} setRideData={setRideData} fares={fares} pickup={pickup} destination={destination} vehicleType={vehicleType} setConfirmedVehiclePanel={setConfirmedVehiclePanel} setWaitingForDriverPanel={setWaitingForDriverPanel} setPickupCoordinates={setPickupCoordinates} setDestinationCoordinates={setDestinationCoordinates} />
                </div>
              </Draggable>
            )}

        { confirmedRideData &&
            <Draggable disabled={window.innerWidth < 768}>
                <div className="absolute  cursor-pointer  items-center justify-center w-full  md:min-w-[450px] py-6 md:max-w-[450px] max-h-[60%] flex flex-col gap-5 bg-white/95 backdrop-blur-sm bottom-10 z-[1000] rounded-t-3xl shadow-2xl">
                    <OngoingRide rideData={rideData} confirmedRideData={confirmedRideData} setConfirmedRideData={setConfirmedRideData}/>
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
          {/* <Footer/> */}
       </div>

    )
}

export default Home;