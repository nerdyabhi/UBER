import { useRecoilValue } from "recoil";
import { userContextAtom } from "../store/atom/UserContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



const Home = ()=>{
    const Navigate = useNavigate();

    const user = useRecoilValue(userContextAtom);
    const [pickup , setPickup ] = useState("");
    const [destination , setDestination ] = useState("");
    const [panelOpen , setPanelOpen] = useState(false);
    if(!user) return <h1> Please Login to continue</h1>

    const submitHandler = (e)=>{
        e.preventDefault();
        setPanelOpen(false);
    }


    return(
      <div className="flex flex-col h-[100vh] w-screen object-cover bg-[url('https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png?format=1500w')] transition-all duration-200">

        <div className="logo absolute">
            <img src="" alt="logo" />
        </div>

       <div className="flex flex-col h-[100%] justify-end absolute top-0 w-full">
          
            <div className={`menu-box ${panelOpen ? 'h-[100%] justify-start' : 'h-[30%]'} transition-all duration-300 ease-in-out shadow-xl w-[100%] py-6 flex-col flex items-center  z-10 bg-gray-50 rounded-3xl relative`}>
                       { panelOpen &&  <div onClick={()=>setPanelOpen(false)} className="cursor-pointer absolute right-0 top-0" >Go down</div>}
                    <h1 className="font-bold  text-2xl mb-2 ">Find a trip</h1>
                    <form onSubmit={submitHandler} className="flex flex-col space-y-4 w-full max-w-md px-6">
                        <input 
                            type="text" 
                            placeholder="Enter pickup location"
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-black"
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
                </div>
       </div>

      </div>
    )
}

export default Home;