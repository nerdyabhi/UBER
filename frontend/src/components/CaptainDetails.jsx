import { useRecoilState } from "recoil";
import LiveTracking from "./LiveTracking";
import { captainContextAtom } from "../store/atom/CaptainContext";
import { MOTO_IMG , AUTO_IMG , CAR_IMG } from "../utils/constants";
const CaptainDetails = ({ logoutHandler  })=>{
    const captain = useRecoilState(captainContextAtom);
    console.log(captain);
    const vehicleType = captain[0].vehicle.vehicleType;
    const VehicleIcon = vehicleType=="car"?CAR_IMG:vehicleType=="auto"?AUTO_IMG:MOTO_IMG;

return (
    <div className="py-4 px-2 flex flex-col items-center justify-center w-full bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-4">
            <img src={VehicleIcon} alt="Driver" className="w-20 h-15 rounded-full"/>
            <div>
                <h2 className="text-xl font-bold">{captain[0].fullName.firstName} {captain[0].fullName.lastName}</h2>
                <p className="text-gray-600">{captain[0].email}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
                captain[0].status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
                {captain[0].status}
            </span>
        </div>

        <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-medium">{captain[0].vehicle.vehicleType}</p>
                </div>
                <div>
                    <p className="text-gray-600">Color</p>
                    <p className="font-medium">{captain[0].vehicle.color}</p>
                </div>
                <div>
                    <p className="text-gray-600">Plate</p>
                    <p className="font-medium">{captain[0].vehicle.plate}</p>
                </div>
                <div>
                    <p className="text-gray-600">Capacity</p>
                    <p className="font-medium">{captain[0].vehicle.capacity}</p>
                </div>
            </div>
        </div>

        <div className="mt-4">
            <LiveTracking location={captain[0].location} />
        </div>

        <button 
            onClick={logoutHandler}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
        >
            Logout
        </button>
    </div>
);
}

export default CaptainDetails;