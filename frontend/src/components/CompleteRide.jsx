import React, { useState } from 'react';

const CompleteRide = ({ onCompleteRide }) => {
    const [isCompleting, setIsCompleting] = useState(false);

    const handleCompleteRide = () => {
        setIsCompleting(true);
        setTimeout(() => {
            onCompleteRide && onCompleteRide();
            setIsCompleting(false);
        }, 1000);
    };

    return (
        <div className="md:w-[40%] w-full z-10 absolute bottom-0 bg-white py-12 px-8 rounded-t-3xl shadow-2xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Ride in Progress</h2>
                <p className="text-gray-600 mt-2">Your ride is currently ongoing</p>
            </div>

            <div className="py-6 border-b">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-lg font-medium">Status: Active</span>
                </div>
            </div>

            <div className="py-6">
                <button
                    onClick={handleCompleteRide}
                    disabled={isCompleting}
                    className="w-full bg-black text-white py-5 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-md disabled:bg-gray-400"
                >
                    {isCompleting ? 'Completing...' : 'Complete Ride'}
                </button>
            </div>
        </div>
    );
};

export default CompleteRide;