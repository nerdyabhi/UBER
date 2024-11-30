import { useRecoilValue } from "recoil";
import { captainContextAtom } from "../store/atom/CaptainContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const IMG_URL = "https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png?format=1500w";
const CaptainHome = () => {
    const Navigate = useNavigate();

    const captain = useRecoilValue(captainContextAtom);
    const token = localStorage.getItem('token');
    const logoutHandler = async () => {
        const response = await axios.get(API_URL + '/captain/logout', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        Navigate('/login')
    }

    console.log(captain);
    

    if (!captain) return <h1> Please Login to continue</h1>

    
return (
        <div className="flex h-[100vh] w-[100vw] bg-gray-400 ">
                <img className="w-full h-1/2" src={IMG_URL} alt="" />
                <div>

                </div>
        <div className="absolute h-1/2 bottom-0 w-full bg-white p-6 rounded-md">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full"/>
                <div>
                    <h2 className="text-2xl font-bold">{captain.fullName.firstName } {captain.fullName.lastName}</h2>
                    <p className="text-gray-600">{captain.vehicleType} Driver</p>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Vehicle Number</span>
                    <span className="font-semibold">{captain.vehicle.plate}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Vehicle Type </span>
                    <span className="font-semibold">{captain.vehicle.vehicleType}</span>
                </div>
            </div>

            <button 
                onClick={logoutHandler}
                className="w-full mt-6 bg-black text-white py-4 rounded-lg font-semibold"
            >
                Logout
            </button>
        </div>
        </div>   
    )   
}

export default CaptainHome;