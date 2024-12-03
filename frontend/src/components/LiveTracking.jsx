// LiveTracking.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AUTO_IMG, CAR_IMG, MOTO_IMG } from '../utils/constants';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LiveTracking = ({userCoordinates, captainCoordinates, vehicleType , pickup , destination}) => {
    const defaultCoordinates = { ltd: 28.7041, lng: 77.1025 }; // Delhi coordinates
    console.log(userCoordinates , captainCoordinates);
    pickup = pickup || "Pickup Location";
    destination = destination || "Destination Location";
    // Initialize with provided coordinates or default
    const [captainLocation, setCaptainLocation] = useState(captainCoordinates || null);
    const [userLocation, setUserLocation] = useState(userCoordinates || null);

    useEffect(() => {
        if (userCoordinates) {
            setUserLocation(userCoordinates);
        }
    }, [userCoordinates]);

    useEffect(() => {
        if (captainCoordinates) {
            setCaptainLocation(captainCoordinates);
        }
    }, [captainCoordinates]);

    const captainIcon = new L.Icon({
        iconUrl: vehicleType === "car" ? CAR_IMG : 
                vehicleType === "motorcycle" ? MOTO_IMG : AUTO_IMG,
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35]
    });

    const userIcon = new L.Icon({
        iconUrl: MOTO_IMG,
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35]
    });

    // Determine center based on available coordinates
    const determineCenter = () => {
        if (captainLocation && userLocation) {
            return [(captainLocation.ltd + userLocation.ltd) / 2, 
                   (captainLocation.lng + userLocation.lng) / 2];
        } else if (captainLocation) {
            return [captainLocation.ltd, captainLocation.lng];
        } else if (userLocation) {
            return [userLocation.ltd, userLocation.lng];
        }
        return [defaultCoordinates.ltd, defaultCoordinates.lng];
    };

    // Create polyline coordinates if both points exist
    const lineCoordinates = captainLocation && userLocation ? [
        [captainLocation.ltd, captainLocation.lng],
        [userLocation.ltd, userLocation.lng]
    ] : [];

    return (
        <div className="h-[85vh] absolute top-0 z-5 w-full">
            <MapContainer
                center={determineCenter()}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {captainLocation && (
                    <Marker 
                        position={[captainLocation.ltd, captainLocation.lng]}
                        icon={captainIcon}
                    >
                        <Popup>Captain Location</Popup>
                    </Marker>
                )}

                {userLocation && (
                    <Marker 
                        position={[userLocation.ltd, userLocation.lng]}
                        icon={userIcon}
                    >
                        <Popup>{pickup}</Popup>
                    </Marker>
                )}

                {lineCoordinates.length > 0 && (
                    <Polyline 
                        positions={lineCoordinates}
                        color="blue"
                        weight={4}
                        opacity={0.7}
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default LiveTracking;
