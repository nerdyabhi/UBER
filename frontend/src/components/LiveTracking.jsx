// LiveTracking.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
import { AUTO_IMG, CAR_IMG, MOTO_IMG } from '../utils/constants';
import { useContext } from 'react';
import { SocketContext } from '../store/atom/SocketContext';
const LiveTracking = ({coordinates} ) => {
    const [captainLocation, setCaptainLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi coordinates
    const [userLocation, setUserLocation] = useState({ lat: 28.6129, lng: 77.2295 }); // Nearby Delhi location
    const socket = useContext(SocketContext);

    const rideData =  {
        "ride": {
            "user": "674cadff8fa2bbed3fb18120",
            "pickup": "Howrah",
            "destination": "kolkata",
            "fare": 200.35,
            "status": "pending",
            "vehicleType":"Car",
            "distance": 15035,
            "otp": "913481",
            "_id": "674cc49907fd28f262b9e1d1",
            "__v": 0
        },
        "user": {
            "fullName": {
                "firstName": "Abhi",
                "lastName": "Sharma"
            },
            "_id": "674cadff8fa2bbed3fb18120",
            "email": "abhi@gmail.com",
            "__v": 0,
            "socketId": "ULKoKgM6k9T_qHRRAAAG"
        }
    }

    const captainIcon = new L.Icon({
        iconUrl: rideData?.vehicleType === "Car" ? CAR_IMG : 
                rideData?.vehicleType === "Motorcycle" ? MOTO_IMG : AUTO_IMG,
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35]
    });

    const userIcon = new L.Icon({
        iconUrl: '/user-icon.png',
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35]
    });

    useEffect(() => {
        if (socket) {
            socket.on('captain-location-update', (location) => {
                setCaptainLocation(location);
            });

            return () => {
                socket.off('captain-location-update');
            };
        }
    }, [socket]);

    const center = [captainLocation.lat, captainLocation.lng] || [userLocation.lat, userLocation.lng] || [20.5937, 78.9629]; // India center

    return (
        <div className="h-[50vh] absolute top-0 z-5  w-full">
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {captainLocation && (
                    <Marker 
                        position={[captainLocation.lat, captainLocation.lng]}
                        icon={captainIcon}
                    >
                        <Popup>
                            Captain {rideData?.captain?.fullName?.firstName}
                        </Popup>
                    </Marker>
                )}

                {userLocation && (
                    <Marker 
                        position={[userLocation.lat, userLocation.lng]}
                        icon={userIcon}
                    >
                        <Popup>
                            Pickup Location
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default LiveTracking;