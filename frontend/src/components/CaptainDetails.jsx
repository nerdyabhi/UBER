import LiveTracking from "./LiveTracking";

const IMG_URL = "https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png?format=1500w";

const CaptainDetails = ({captain , logoutHandler , userCoordinates,captainCoordinates })=>{
    return (
        <div className="flex h-[100vh] w-[100vw] bg-gray-400 ">
        {/* <img className="w-full h-1/2" src={IMG_URL} alt="" /> */}
        {userCoordinates && <LiveTracking captainCoordinates={captainCoordinates} userCoordinates={userCoordinates}/>}
        {!captainCoordinates && <LiveTracking />}

        <div className="absolute h-1/2 bottom-0 z-100 w-full bg-white p-6 rounded-md">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full"/>
                <div>
                    <h2 className="text-2xl font-bold">{captain.fullName.firstName } {captain.fullName.lastName}</h2>
                    <p className="text-gray-600">{captain.vehicle.vehicleType} Driver</p>
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

export default CaptainDetails;