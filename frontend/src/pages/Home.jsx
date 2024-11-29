import { useRecoilValue } from "recoil";
import { userContextAtom } from "../store/atom/UserContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import RideComponent from "../components/RideComponent";



const Home = ()=>{
    const Navigate = useNavigate();

    const user = useRecoilValue(userContextAtom);
    const [pickup , setPickup ] = useState("");
    const [destination , setDestination ] = useState("");
    const [panelOpen , setPanelOpen] = useState(false);
    const [vehiclePanelOpen , setVehiclePanelOpen] = useState(false);
    if(!user) return <h1> Please Login to continue</h1>

    const submitHandler = (e)=>{
        e.preventDefault();
        setPanelOpen(false);
    }


    return(
      <div className="flex flex-col max-w-[100vw] h-[100vh] w-[100vw] object-cover bg-[url('https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png?format=1500w')] transition-all duration-200">

        <div className="logo absolute">
            <img src="" alt="logo" />
        </div>

       <div className="flex flex-col h-[100%] justify-end absolute top-0 w-[100vw]  max-w-[100vw]">
          
            <div className={`menu-box ${panelOpen ? 'h-[100%] justify-start' : 'h-[30%]'} transition-all duration-300 ease-in-out shadow-xl w-[100%] py-6 flex-col flex items-center  z-10 bg-gray-50 rounded-3xl relative`}>
                       { panelOpen &&  <div onClick={()=>setPanelOpen(false)} className="cursor-pointer absolute right-0 top-0" >Go down</div>}
                    <h1 className="font-bold  text-2xl mb-2 ">Find a trip</h1>
                    <form onSubmit={submitHandler} className="flex flex-col space-y-4 w-full max-w-md">
                        <input 
                            type="text" 
                            placeholder="Enter pickup location"
                            className=" px-4 py-3 rounded-lg bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-black"
                            value={pickup}
                            onChange={(e)=>setPickup(e.target.value)}
                            onClick={()=>setPanelOpen(true)}
                        />
                        <input 
                            type="text" 
                            placeholder="Enter destination"
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-black"
                            value={destination}
                            onChange={(e)=>setDestination(e.target.value)}
                            onClick={()=>setPanelOpen(true)}
                        />

                    </form>

                    {/* Location's Panel */}
                    <div className="flex max-w-md items-center justify-center mt-4" >
                        {panelOpen && <LocationSearchPanel setPanelOpen={setPanelOpen}  setVehiclePanelOpen = {setVehiclePanelOpen}/>}
                    </div>

                </div>
       </div>

       {vehiclePanelOpen && <div className="absolute px-4 py-2 w-[100vw] h-[50%] bg-gray-50 bottom-0 z-10">
            < h1 className="font-bold py-2 text-2xl">Choose a Vehicle</h1>
            <div className="flex  flex-col gap-4 justify-center items-center ">
                    <RideComponent setVehiclePanelOpen = {setVehiclePanelOpen} img={"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png"}/>
                    <RideComponent setVehiclePanelOpen = {setVehiclePanelOpen} img= {"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"}/>
                    <RideComponent setVehiclePanelOpen = {setVehiclePanelOpen} img ={"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"} />
            </div>
        </div>}
      </div>
    )
}

export default Home;