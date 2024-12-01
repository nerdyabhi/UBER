
export default function WaitingForDriver({ img="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png", price="69$", vehicleType="moto", driverName = "John Doe" , setWaitingForDriverPanel  }) {
    return (
        <div className="md:w-[40%] w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Driver is on the way!</h2>
                <p className="text-gray-600">Please wait at your pickup location</p>
            </div>

            <div className="flex items-center gap-4 border-b ">
                <img src={img} alt={vehicleType} className="w-24 h-24 object-contain"/>
                <div>
                    <h3 className="text-xl font-semibold">{vehicleType}</h3>
                    <p className="text-gray-600">Fare: ₹{price}</p>
                </div>
            </div>

            <div className="py-4 border-b">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"/>
                    <div>
                        <h3 className="font-semibold">{driverName}</h3>
                        <p className="text-gray-600">4.8 ⭐ · KA 01 AB 1234</p>
                    </div>
                </div>
            </div>

            <div className="py-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"/>
                        <span>Driver is 2 mins away</span>
                    </div>
                    <span className="text-gray-600">1.2 km</span>
                </div>

              
            </div>

            <div className="flex gap-2 mt-4">
                <button onClick={()=>setWaitingForDriverPanel(false)} className="flex-1 border border-black py-4 rounded-lg font-semibold">
                    Cancel Ride
                </button>
                <button className="flex-1 bg-black text-white py-4 rounded-lg font-semibold">
                    Contact Driver
                </button>
            </div>
        </div>
    )
}