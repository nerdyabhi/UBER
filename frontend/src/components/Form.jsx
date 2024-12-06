import axios from "axios";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebouncing";

const Form = ({setDestinationCoordinates , setPickupCoordinates})=>{
  
    const apiKey = import.meta.env.VITE_HERE_API_KEY;
    const [pickupSuggestions , setPickupSuggestions] = useState(null);
    const [destinationSuggestions , setDestinationSuggestions] = useState(null);
    const [pickupPanel , setPickupPanel] = useState(false);
    const [destinationPanel , setDestinationPanel] = useState(false);
    const [pickup , setPickup] = useState();
    const [destination , setDestination] = useState();
    

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
      <div className="flex items-center justify-center w-full">
      <form className="flex flex-col gap-4 p-4 w-[400px] ">
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
        className="w-full z-5 p-3 pl-8 border bg-gray-100 rounded-lg focus:outline-none focus:border-black"
        />
       {pickupPanel &&  <ul className="bg-white shadow-xl overflow-y-scroll max-h-200px] rounded-lg w-full p-4 absolute mt-1 z-20">
          {!pickupSuggestions && <h1>No results here</h1>}
          {pickupSuggestions &&
            pickupSuggestions.map((ele) => (
              <li key={ele.id} onClick={()=>{
                setPickup(ele.title)
                setPickupCoordinates({ltd:ele?.position?.lat , lng:ele?.position?.lng})
              }} className="p-2 font-thin hover:bg-gray-100 cursor-pointer transition-colors">{ele?.title}</li>
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
        placeholder="Enter destination"
        className="w-full p-3 pl-8 border z-5 bg-gray-100 rounded-lg focus:outline-none focus:border-black"
        />
        {destinationPanel &&  <ul className="bg-white shadow-lg overflow-y-scroll max-h-[200px] rounded-lg w-full p-4 absolute mt-1 z-10">
          {!destinationSuggestions && <h1>No results here.</h1>}
          {destinationSuggestions && 
            destinationSuggestions.map((ele) => (
              
              <li key={ele.id} onClick={()=>{
                setDestination(ele.title);
                setDestinationCoordinates({ltd:ele.position.lat , lng:ele?.position?.lng})
              }} className="p-2 font-thin font-mono hover:bg-gray-100 cursor-pointer transition-colors">{ele?.title}</li>
            ))
          }
        </ul>}
        </div>

        <button
        type="submit"
        className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition"
        >
        Find a ride
        </button>
        </form>
       </div>
    )
};
export default Form;