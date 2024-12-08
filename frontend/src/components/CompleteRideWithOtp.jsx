import axios from "axios";
import { useState } from "react";
import { API_URL } from "../utils/constants";
import { useRecoilState } from "recoil";
import { destinationCoordinatesAtom } from "../store/atom/CoordinatesContext";
import { toast } from "react-toastify";
export default function CompleteRideWithOtp({ completeRideData, fare, onComplete , setCompleteRideData }) {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [destinationCoordinates , setDestinationCoordinates] = useRecoilState(destinationCoordinatesAtom)

    const handleChange = (value) => {
        if (isNaN(value)) return;
        if (value.length <= 6) {
            setOtp(value);
        }
    };
    
    const handleSubmit = async () => {
        if (otp.length === 6) {
            try {
                const response = await axios.post(API_URL + '/rides/startRide', { otp, rideId: completeRideData?._id }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                console.log(response.data.destinationCoordinates);
                setDestinationCoordinates(response?.data?.destinationCoordinates)

                setCompleteRideData(null);
                
            } catch (error) {
                console.log("Error completing the ride:", error);
                const error_message = error?.response?.data?.message || error?.response?.data?.errors[0]?.message;
                setError(error_message);
                toast.error("Failed to start the ride.")
            }
        } else {
            setError("OTP must be 6 digits.");
        }
    };
    return (
        <div className="w-full z-10 absolute bottom-0 bg-white py-6 px-4 rounded-t-2xl shadow-lg">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Start Your Ride</h2>
                <p className="text-sm text-gray-500">Enter the 6-digit OTP shared with passenger</p>
            </div>

            <div className="py-3 border-b flex justify-center">
                <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-44 h-10 border border-gray-300 rounded-md text-center text-lg focus:border-blue-400 focus:outline-none"
                    placeholder="Enter OTP"
                />
            </div>

            {error && (
                <div className="py-2 text-red-500 text-sm text-center">
                    {error}
                </div>
            )}

            <div className="py-3">
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-base">Fare: ₹{fare}</span>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-black text-white py-3 rounded-lg text-base hover:bg-gray-800 transition-colors"
            >
                Start Ride
            </button>
        </div>
    );
}
