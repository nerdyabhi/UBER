import axios from "axios";
import { useState } from "react";
import { API_URL } from "../utils/constants";

export default function CompleteRideWithOtp({ completeRideData, fare, onComplete }) {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);

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
                console.log(response);
                
            } catch (error) {
                console.error("Error completing the ride:", error);
                const error_message = error?.response?.data?.message || error?.response?.data?.errors[0]?.message;
                setError(error_message);
            }
        } else {
            setError("OTP must be 6 digits.");
        }
    };

    return (
        <div className="md:w-[40%] w-full z-10 absolute bottom-0 bg-white py-12 px-8 rounded-t-3xl shadow-2xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Complete Your Ride</h2>
                <p className="text-gray-600 mt-2">Enter the 6-digit OTP shared with passenger</p>
            </div>

            <div className="py-6 border-b flex justify-center">
                <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-56 h-14 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter 6-digit OTP"
                />
            </div>

            {error && (
                <div className="py-4 text-red-500 text-center font-medium">
                    {error}
                </div>
            )}

            <div className="py-6">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-lg font-medium">Fare: ₹{fare}</span>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-black text-white py-5 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-md"
            >
                Complete Ride
            </button>
        </div>
    );
}
