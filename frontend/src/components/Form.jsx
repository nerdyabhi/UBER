import axios from "axios";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebouncing";
import { pickupCoordinatesAtom, userCoordinatesAtom , destinationAtom , pickupAtom, destinationCoordinatesAtom ,  } from "../store/atom/CoordinatesContext";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";


const Form = ()=>{
  
    const apiKey = import.meta.env.VITE_HERE_API_KEY;
    const [pickupCoordinates , setPickupCoordinates] = useRecoilState(pickupCoordinatesAtom);
    const [userCoordinates , setUserCoordinates] = useRecoilState(userCoordinatesAtom);
    const [pickup , setPickup] = useRecoilState(pickupAtom);
    const [destination , setDestination] = useRecoilState(destinationAtom);
    const [destinationCoordinates , setDestinationCoordinates] = useRecoilState(destinationCoordinatesAtom);
    const [pickupPanel , setPickupPanel] = useState(false);
    const [destinationPanel , setDestinationPanel] = useState(false);

    const [pickupSuggestions  , setPickupSuggestions] = useState(null);
    const [destinationSuggestions , setDestinationSuggestions] = useState(null);
    const navigate = useNavigate();

    const getLocations = async(location)=>{
      const url= `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${location}&at=0.0,0.0&apiKey=${apiKey}&limit=10`;
      const response = await axios.get(url);
      return response.data.items;
      
    }

    const debouncedGetLocations = useDebounce(async (location , type) => {
      const locations = await getLocations(location);
      if(type =="pickup") setPickupSuggestions(locations);
      else if(type =="destination") setDestinationSuggestions(locations);
      console.log(locations);
      
    }, 200);

    const handleChange = async(e , type)=>{
      if(type == "pickup"){
        setPickup(e.target.value);
        debouncedGetLocations(pickup , "pickup");
      }
      else{
        setDestination(e.target.value);
        debouncedGetLocations(destination , "destination");
      }
    }

    return (
      <div className="flex  dark:text-black items-start justify-start w-full">
      <form className="flex flex-col gap-4 p-4 w-[100%] lg:w-[400px] ">
        <div className="relative ">
        <input
        type="text"
        onFocus={()=>setPickupPanel(true)}
        onBlur={()=>{
          setTimeout(()=>{
            setPickupPanel(false)
          }, 300)
        }}
        value={pickup}
        onChange={(e)=>handleChange(e , "pickup")}

        placeholder="Enter pickup location"
        className="w-full  text-black z-5 p-3 pl-8 border bg-white rounded-lg focus:outline-none focus:border-black"
        />
       {pickupPanel &&  <ul className="bg-white shadow-xl overflow-y-scroll max-h-200px] rounded-lg w-full p-4 absolute mt-1 z-20">
          {!pickupSuggestions && <h1 className="text-center text-gray-400">No results here</h1>}
          {pickupSuggestions &&
            pickupSuggestions.map((ele) => (
              <li key={ele.id} onClick={()=>{
                setPickup(ele.title)
                setPickupCoordinates({ltd:ele?.position?.lat , lng:ele?.position?.lng})
              }} className="p-2 font-normal hover:bg-gray-100 cursor-pointer transition-colors">{ele?.title}</li>
            )) 
          } 
        
        </ul>}
        {/* Icon from pickup to destinnnation */}
        <div className="bg-black rounded-full absolute left-[13px] top-[20px] w-2 h-2"></div>
        <div className="h-[50px] w-[2px] bg-black absolute z-10 left-[15px] top-[35px]"></div>
        <div className="h-2 w-2 bg-black absolute z-10 left-[13px] bottom-[-50px]"></div>
        {/* Ends here. */}
        </div>

        <div className="relative">
        <input
        type="text"
        value={destination}
        onFocus={()=>setDestinationPanel(true)}
        onBlur={()=>{
          setTimeout(()=>{
            setDestinationPanel(false)
          }, 300)
        }}
        onChange={(e)=>handleChange(e , "destination")}
        placeholder="Enter drop off location"
        className="w-full text-black p-3 pl-8 border z-5 bg-white rounded-lg focus:outline-none focus:border-black"
        />
        {destinationPanel &&  <ul className="bg-white shadow-lg overflow-y-scroll max-h-[200px] rounded-lg w-full p-4 absolute mt-1 z-10">
          {!destinationSuggestions && <h1 className="text-center text-gray-400">No results here.</h1>}
          {destinationSuggestions && 
            destinationSuggestions.map((ele) => (
              
              <li key={ele.id} onClick={()=>{
                setDestination(ele.title);
                setDestinationCoordinates({ltd:ele.position.lat , lng:ele?.position?.lng})
              }} className="p-2 font-thin text-black font-mono hover:bg-gray-100 cursor-pointer transition-colors">{ele?.title}</li>
            ))
          }
        </ul>}
        </div>

       
        </form>
       </div>
    )
};
export default Form;