import axios from "axios";
import { API_URL, AUTO_IMG, CAR_IMG, MOTO_IMG } from "../utils/constants";
import { useState } from "react";
import SearchingForDriver from "./SearchingForDriver";
const token = localStorage.getItem('token');
export default function ConfirmedVehicle({pickup, destination,  fares, vehicleType, setConfirmedVehiclePanel, setWaitingForDriverPanel }) {
    const img = vehicleType === "Car" ? CAR_IMG : vehicleType === "Motorcycle" ? MOTO_IMG : AUTO_IMG;
    const price = fares?.fares?.fares[vehicleType];
    const distance = fares?.fares?.distanceInKm;
    const[isWaiting , setIswaiting] = useState(false);

    const createRide = async()=>{
        const url = API_URL+'/rides/create';
        try {
            const response = await axios.post(url , {pickup , destination , vehicleType}, {
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            console.log(response);
            
        } catch (error) {
            console.log("Failed to create a ride" , error);
            
        }
    }

    const confirmRideHandler = async() => {
        setIswaiting(true);
        await createRide();
        // setIswaiting(false);
        // setConfirmedVehiclePanel(false);
        // setWaitingForDriverPanel(true);


    }
    if (!fares) return <></>;
    if(isWaiting) return <SearchingForDriver/>
    return (
        <div className="md:w-[40%] w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your ride details</h2>
                <button onClick={() => setConfirmedVehiclePanel(false)} className="text-gray-500">
                    ✕
                </button>
            </div>

            <div className="flex items-center gap-4 border-b pb-4">
                <img src={img} alt={vehicleType} className="w-24 h-24 object-contain" />
                <div>
                    <h3 className="text-xl font-semibold">{vehicleType}</h3>
                    <p className="text-gray-600">Estimated price: ₹{price}</p>
                </div>
            </div>
            
            <div className="flex items-center justify-center">
                <div className="py-4 border-b space-y-3 md:space-y-0 w-full">
                    <div className="flex flex-col md:flex-row md:justify-between gap-3">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                            <div>
                                <p className="text-sm text-gray-500">Pickup</p>
                                <p className="font-medium">{pickup}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                            <div>
                                <p className="text-sm text-gray-500">Destination</p>
                                <p className="font-medium">{destination}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-4 space-y-2">
                <p className="text-gray-600">Total distance is {distance} Km.</p>
                <div className="flex justify-between">
                    <span>Payment method</span>
                    <span className="font-medium">Cash</span>
                </div>
            </div>

            <button 
                className="w-full bg-black text-white py-4 rounded-lg font-semibold"
                onClick={confirmRideHandler}
            >
                Confirm Ride
            </button>
        </div>
    );
}