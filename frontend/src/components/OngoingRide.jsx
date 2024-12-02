import React from 'react';
import { CAR_IMG, MOTO_IMG, AUTO_IMG } from '../utils/constants';

export default function OngoingRide({rideData ,  confirmedRideData }) {
    const { captain } = confirmedRideData;
    const vehicleType = captain?.vehicle?.vehicleType || 'car';
    const img = vehicleType === "car" ? CAR_IMG : vehicleType === "motorcycle" ? MOTO_IMG : AUTO_IMG;

    // Generate a random 4-digit OTP (in real app, this should come from backend)
    const otp = rideData.otp;

    return (
        <div className="md:w-[35%] w-full bg-white p-4 rounded-lg shadow-lg absolute bottom-0 z-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your ride is on the way</h2>
                <div className="bg-gray-100 px-3 py-1 rounded">
                    <span className="text-sm font-medium">OTP: </span>
                    <span className="text-lg font-bold">{otp}</span>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <img src={img} alt={vehicleType} className="w-16 h-16 object-contain" />
                <div>
                    <h3 className="text-base font-semibold capitalize">{vehicleType}</h3>
                    <p className="text-sm text-gray-600">{captain.vehicle.color} • {captain.vehicle.plate}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="border-b pb-2">
                    <h3 className="text-sm font-medium text-gray-500">Captain</h3>
                    <p className="text-base font-medium">
                        {captain.name.firstName} {captain.name.lastName}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Vehicle Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-gray-500">Type: </span>
                            <span className="font-medium capitalize">{vehicleType}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Color: </span>
                            <span className="font-medium">{captain.vehicle.color}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-500">Plate: </span>
                            <span className="font-medium">{captain.vehicle.plate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}