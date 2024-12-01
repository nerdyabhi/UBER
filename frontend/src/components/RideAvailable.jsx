export default function RideAvailable({data}) {
    const {user ,  ride} = data;
    const handleConfirm = () => {
        // Add ride confirmation logic here
    };

    const handleReject = () => {
        // Add ride rejection logic here
    };

    return (
        <div className="md:w-[40%] w-full z-10 absolute bottom-0 bg-white py-12 px-4">
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
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <button onClick={handleReject} className="flex-1 border border-black py-4 rounded-lg font-semibold">
                    Decline
                </button>
                <button onClick={handleConfirm} className="flex-1 bg-black text-white py-4 rounded-lg font-semibold">
                    Accept Ride
                </button>
            </div>
        </div>
    );
}