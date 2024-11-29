
export default function ConfirmedVehicle({ img, price, vehicleType, setConfirmedVehiclePanel , setWaitingForDriverPanel }) {
    return (
        <div className="md:w-[40%] w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your ride details</h2>
                <button onClick={() => setConfirmedVehiclePanel(false)} className="text-gray-500">
                    ✕
                </button>
            </div>

            <div className="flex items-center gap-4 border-b pb-4">
                <img src={img} alt={vehicleType} className="w-24 h-24 object-contain"/>
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
                            <p className="font-medium">123 Main Street, City</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                        <div>
                            <p className="text-sm text-gray-500">Drop-off</p>
                            <p className="font-medium">456 Park Avenue, City</p>
                        </div>
                    </div>
                </div>
            </div>
           </div>

            <div className="py-4 space-y-2">
                <p className="text-gray-600">Driver arriving in 2 mins</p>
                <div className="flex justify-between">
                    <span>Payment method</span>
                    <span className="font-medium">Cash</span>
                </div>
            </div>

            <button 
                className="w-full bg-black text-white py-4 rounded-lg font-semibold"
                onClick={() => {
                    setConfirmedVehiclePanel(false);
                    setWaitingForDriverPanel(true)
                }}
            >
                Confirm Ride
            </button>
        </div>
    )
}