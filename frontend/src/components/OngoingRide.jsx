import React from 'react';
import { CAR_IMG, MOTO_IMG, AUTO_IMG } from '../utils/constants';

export default function OngoingRide({rideData, confirmedRideData , setConfirmedRideData}) {
    const { captain } = confirmedRideData;
    const vehicleType = captain?.vehicle?.vehicleType || 'car';
    const img = vehicleType === "car" ? CAR_IMG : vehicleType === "motorcycle" ? MOTO_IMG : AUTO_IMG;

    const otp = rideData.otp;

    return (
        <div className="fixed bottom-0 max-w-[450px] left-0 right-0 z-10 p-4 bg-gray-100 rounded-t-lg shadow-lg">
            <div className="flex justify-end mb-2">
                <i onClick={() => setConfirmedRideData(null)} className="cursor-pointer text-gray-500 hover:text-gray-700 fas fa-times"></i>
            </div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Your ride is on the way</h2>
                <div className="px-3 py-1 bg-gray-100 rounded">
                    <span className="text-sm dark:text-black font-medium">OTP: </span>
                    <span className="text-lg dark:text-black font-bold">{otp}</span>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 mb-4 bg-gray-50 rounded-lg">
                <img src={img} alt={vehicleType} className="w-16 h-16 object-contain" />
                <div>
                    <h3 className="text-base font-semibold capitalize">{vehicleType}</h3>
                    <p className="text-sm text-gray-600">{captain.vehicle.color} • {captain.vehicle.plate}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="pb-3 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Captain</h3>
                    <p className="text-base font-medium text-gray-900">
                        {captain.name.firstName} {captain.name.lastName}
                    </p>
                </div>

                <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Vehicle Details</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="text-gray-500">Type: </span>
                            <span className="font-medium capitalize text-gray-900">{vehicleType}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Color: </span>
                            <span className="font-medium text-gray-900">{captain.vehicle.color}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-500">Plate: </span>
                            <span className="font-medium text-gray-900">{captain.vehicle.plate}</span>
                        </div>
                    </div>
                    <button 
                        className="w-full py-4 mt-6 text-white bg-black rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                        onClick={() => {
                            setConfirmedRideData(null);
                            console.log("Processing payment...");
                        }}
                    >
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
}
