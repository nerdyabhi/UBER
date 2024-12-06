// LiveTracking.jsx
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-routing-machine";


// Fix for default marker icons

const LiveTracking = ({userCoordinates, pickupCoordinates, destinationCoordinates}) => {
    const defaultCoordinates = userCoordinates ||  { ltd: 28.7041, lng: 77.1025 }; // Delhi coordinates

        console.log(pickupCoordinates , destinationCoordinates);
        
    // If No Coordinates , show default map
    if(!pickupCoordinates || !destinationCoordinates){
        return (
            <div className=" top-5 z-100  h-[100%] w-[100%]">
                <MapContainer
                    center={[defaultCoordinates.ltd , defaultCoordinates.lng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
    
                </MapContainer>
            </div>
        );
    }

    // Routing bgera bgera settings 
     // Custom hook to handle zooming to show both locations
  function ZoomToLocations() {
    const map = useMap();
    useEffect(() => {
      if (pickupCoordinates && destinationCoordinates) {
        const bounds = L.latLngBounds(
          L.latLng(pickupCoordinates.ltd, pickupCoordinates.lng),
          L.latLng(destinationCoordinates.ltd, destinationCoordinates.lng)
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [pickupCoordinates, destinationCoordinates, map]);

    return null;
  }

  // Custom component to handle routing
  function RoutingMachine() {
    const map = useMap();
    useEffect(() => {
        if (pickupCoordinates && destinationCoordinates) {
            const routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(pickupCoordinates.ltd, pickupCoordinates.lng),
                    L.latLng(destinationCoordinates.ltd, destinationCoordinates.lng),
                ],
                createMarker: () => null,
                lineOptions: {
                    styles: [{ color: "black", weight: 5, opacity: 1 }],
                },
                show: false, // Disable the route summary display
                routeWhileDragging: false, // Optional: Prevents dragging of routes
            }).addTo(map);

            // Remove the text panel from the DOM
            const routeContainer = document.querySelector(".leaflet-routing-container");
            if (routeContainer) {
                routeContainer.style.display = "none";
            }

            return () => map.removeControl(routeControl);
        }
    }, [map, pickupCoordinates, destinationCoordinates]);

    return null;
}

    
const PopupMarker = ({ position, icon }) => {
    const markerRef = useRef(null);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [position, icon]);

    return (
        <Marker ref={markerRef} position={position} icon={icon}>
            <Popup>
                <div>
                    <h3 style={{ margin: 0 }}>Title</h3>
                    <p style={{ margin: 0, fontSize: "12px" }}>Content aayega yahan.</p>
                </div>
            </Popup>
        </Marker>
    );
};



  // Custom DivIcon for pickup (black circle with white center)
  const pickupIcon = new L.DivIcon({
    html: `
      <div style="width: 20px; height: 20px; background-color: black; position: relative; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
        <div style="width: 5px; height: 5px;  background-color: white; border-radius: 100%;"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });

    // Automatically open popup and customize content




  // Custom DivIcon for destination (black square with white center)
  const destinationIcon = new L.DivIcon({
    html: `
      <div style="width: 20px; height: 20px; background-color: black; position: relative; display: flex; align-items: center; justify-content: center;">
        <div style="width: 5px; height: 5px; background-color: white;"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -15],
  });

    // Ab agar , Pickup and destination dono hai toh..
    return (
        <div className=" top-5 z-100  h-[100%] w-[100%]">
            <MapContainer
      center={[pickupCoordinates.ltd, pickupCoordinates.lng]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
       <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

      <ZoomToLocations />
      <RoutingMachine />

    {/* Pickup Marker */}
    <PopupMarker position={[pickupCoordinates.ltd, pickupCoordinates.lng]} icon={pickupIcon} />

    {/* Destination Marker */}
      <Marker
        position={[destinationCoordinates.ltd, destinationCoordinates.lng]}
        icon={destinationIcon}
      >
        <Popup>Destination Location</Popup>
      </Marker>
    </MapContainer>
        </div>
    );
    
};

export default LiveTracking;
