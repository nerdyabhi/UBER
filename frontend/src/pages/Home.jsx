import { useRecoilValue } from "recoil";
import { userContextAtom } from "../store/atom/UserContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import RideComponent from "../components/RideComponent";
import ConfirmedVehicle from "../components/confirmedVehicle";
import WaitingForDriver from "../components/WaitingForDriver";
import useAutoComplete from "../hooks/useAutoComplete";
import { SocketContext } from "../store/atom/SocketContext";

const Home = ()=>{
    const user = useRecoilValue(userContextAtom);
    const [pickup , setPickup ] = useState("");
    // const [locations , setLocations] = useState(null);
    const [destination , setDestination ] = useState("");
    const [panelOpen , setPanelOpen] = useState(false);
    const [vehiclePanelOpen , setVehiclePanelOpen] = useState(false);
    const [confirmedVehiclePanel , setConfirmedVehiclePanel] = useState(false);
    const [WaitingForDriverPanel , setWaitingForDriverPanel] = useState(false);
    const [fares , setFares] = useState(null);
    const [vehicleType , setVehicleType] = useState(null);
    const [activeField , setActiveField] = useState(null);
    const token = localStorage.getItem('token');
    const socket = useContext(SocketContext);
    const submitHandler = (e)=>{
        e.preventDefault();
        setPanelOpen(false);
    }
    
    const findTripHandler = async(e)=>{
        e.preventDefault();
        setVehiclePanelOpen(true)
        setPanelOpen(false);
        /*Get Fare */

        try {
            const response = await axios.post(API_URL+'/rides/getFare' , {pickup , destination} , {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(response.data);
            
            setFares(response.data);
        } catch (error) {
            console.log("failed to get fare" , error);
        }

        /*Clear Menu*/
        // setPickup("");
        // setDestination("");
    }

    useEffect(() => {
        if (user) {
            socket.emit('join', { userType: "user", userId: user._id });
        }
    }, [user]);

    /*@ Toggle between locations to save api referes */
    const locations = useAutoComplete(panelOpen ? (document.activeElement?.placeholder?.includes('pickup') ? pickup : destination) : pickup, token);
    // const locations = [];

    if(!user) return <h1> Please Login to continue</h1>

    return(
      <div className="flex flex-col max-w-[100vw] h-[100vh] w-[100vw] object-cover bg-[url('https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png?format=1500w')] transition-all duration-200">

        <div className="logo absolute top-4 left-4">
            <img src="/uber-logo.png" alt="Uber" className="h-8" />
        </div>

       <div className="flex flex-col h-[100%] justify-end absolute top-0 w-[100vw] max-w-[100vw]">
          
            <div className={`menu-box ${panelOpen ? 'h-[100%] justify-start' : 'h-[35%]'} transition-all duration-300 ease-in-out shadow-2xl w-[100%] py-8 flex-col flex items-center z-10 bg-white/95 backdrop-blur-sm rounded-t-3xl relative`}>
                       { panelOpen && <button onClick={()=>setPanelOpen(false)} className="absolute right-6 top-6 text-gray-600 hover:text-black transition-colors">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                           </svg>
                       </button>}
                    <h1 className="font-bold text-2xl mb-4 text-gray-900">Where to?</h1>
                    <form onSubmit={findTripHandler} className="flex flex-col space-y-4 w-full max-w-md px-6">
                        <input 
                            type="text" 
                            placeholder="Enter pickup location"
                            className="px-4 py-3 rounded-xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                            value={pickup}
                            onChange={(e)=>setPickup(e.target.value)}
                            onClick={()=>{
                                setPanelOpen(true);
                                console.log("pickup");
                                setActiveField('pickup');
                            }}
                        />
                        <input 
                            type="text" 
                            placeholder="Enter destination"
                            className="px-4 py-3 rounded-xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                            value={destination}
                            onChange={(e)=>setDestination(e.target.value)}
                            onClick={()=>{
                                setActiveField('destination');
                                setPanelOpen(true);
                            }}
                        />

                        {panelOpen && 
                            <button  type="submit" className="bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition-colors">
                                Find Trip
                            </button>
                        }
                    </form>

                    <div className="flex max-w-md items-center justify-center mt-4" >
                        {panelOpen && locations && <LocationSearchPanel locations={locations}  setPickup={setPickup} setDestination={setDestination} activeField={activeField} />}
                    </div>
                </div>
       </div>

       {vehiclePanelOpen && fares && <div className="absolute px-6 py-6 w-[100vw] h-[60%] bg-white/95 backdrop-blur-sm bottom-0 z-10 rounded-t-3xl shadow-2xl">
            <h1 className="font-bold py-2 text-2xl text-gray-900">Choose a ride</h1>
            <div className="flex flex-col gap-4 justify-center items-center overflow-y-auto h-[calc(100%-4rem)]">
                    <RideComponent setVehiclePanelOpen={setVehiclePanelOpen} setConfirmedVehiclePanel={setConfirmedVehiclePanel} fares={fares} setVehicleType={setVehicleType} />
            </div>
        </div>}

       {confirmedVehiclePanel && fares&& <div className="absolute p-6 shadow-2xl flex items-center justify-center w-[100vw] h-[60%] bg-white/95 backdrop-blur-sm bottom-0 z-10 rounded-t-3xl">
            <ConfirmedVehicle fares={fares} pickup={pickup} destination={destination} vehicleType={vehicleType} setConfirmedVehiclePanel={setConfirmedVehiclePanel} setWaitingForDriverPanel={setWaitingForDriverPanel} />
        </div>}

       {WaitingForDriverPanel && <div className="absolute p-6 shadow-2xl flex items-center justify-center w-[100vw] h-[60%] bg-white/95 backdrop-blur-sm bottom-0 z-10 rounded-t-3xl">
            <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel}/>
        </div>}
        
      </div>
    )
}

export default Home;