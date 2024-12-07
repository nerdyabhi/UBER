export default function RideAvailable({data , setRideAvailablePanel , setData,  handleConfirmRide , setUserCoordinates}) {
    const {user ,  ride} = data;
   
    const handleReject = () => {
        // Add ride rejection logic here
        setData(null);
        setRideAvailablePanel(false);
        setUserCoordinates(null);
    };

    return (
        <div className="w-full cursor-pointer z-10  rounded-xl shadow-lg shadow-gray-300 border border-gray-200 bg-white py-5 px-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">New Ride Request!</h2>
                <p className="text-gray-600">{user.fullName.firstName} is waiting for confirmation</p>
            </div>

            <div className="py-4 border-b">
                <div className="flex items-center gap-4 mb-4">
                    <img 
                        src="https://ui-avatars.com/api/?name=Abhi+Sharma" 
                        alt="user" 
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold">{user.fullName.firstName} {user.fullName.lastName}</h3>
                        <p className="text-gray-600">4.8 ⭐</p>
                    </div>
                </div>
            </div>

            <div className="py-4 space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"/>
                        <span>{ride.pickup}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"/>
                        <span>To: {ride.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"/>
                        <span>Fare : ₹{Math.round(ride.fare)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"/>
                        <span>Distance: {Math.round(ride.distance/1000)} Km.</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <button onClick={handleReject} className="flex-1 border border-black py-2 rounded-lg font-semibold">
                    Decline
                </button>
                <button onClick={handleConfirmRide} className="flex-1 bg-black text-white py-2 rounded-lg font-semibold">
                    Accept Ride
                </button>
            </div>
        </div>
    );
}