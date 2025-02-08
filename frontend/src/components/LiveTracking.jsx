// LiveTracking.jsx
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-routing-machine";
import { userCoordinatesAtom , pickupAtom, pickupCoordinatesAtom , destinationAtom , destinationCoordinatesAtom } from '../store/atom/CoordinatesContext';
import { useRecoilState } from 'recoil';
import { AUTO_IMG, CAR_IMG, MOTO_IMG } from '../utils/constants';


// Fix for default marker icons

const LiveTracking = ({captainCoordinates , captainLocationName,  vehicleType}) => {
    const [pickupCoordinates] = useRecoilState(pickupCoordinatesAtom);
    const [userCoordinates] = useRecoilState(userCoordinatesAtom);
    const [pickup] = useRecoilState(pickupAtom);
    const [destination] = useRecoilState(destinationAtom);
    const CaptainIcon = new L.Icon({
      iconUrl: vehicleType === "car" ? CAR_IMG : vehicleType === "auto" ? AUTO_IMG : MOTO_IMG,
      iconSize: [50, 50], 
      iconAnchor: [25, 50], 
      popupAnchor: [0, -50],
    });
    const [destinationCoordinates] = useRecoilState(destinationCoordinatesAtom);
    let defaultCoordinates = captainCoordinates || userCoordinates ||{ ltd: 28.7041, lng: 77.1025 }; // Delhi coordinates

    console.log(pickupCoordinates , destinationCoordinates);
     
    const PopupMarker = ({ position, icon , location }) => {
      const markerRef = useRef(null);

      useEffect(() => {
          if (markerRef.current) {
              markerRef.current.openPopup();
          }
      }, [position, icon]);

      return (
          <Marker ref={markerRef} position={position} icon={icon}>
              <Popup closeOnClick={false} closeButton={false} autoClose={false}>
                  <div className='h-10px font-bold font-xl bg-opacity-0'>
                      <h3 style={{ margin: 0 }}>{location}</h3>
                  </div>
              </Popup>
          </Marker>
      );
    };


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
  function RoutingMachine({ captainCoordinates, pickupCoordinates, destinationCoordinates }) {
    const map = useMap();
  
    useEffect(() => {
      const controls = [];
  
      // Add captain to pickup route if captain coordinates exist
      if ( captainCoordinates && pickupCoordinates) {
        const captainRouteControl = L.Routing.control({
          waypoints: [
            L.latLng(captainCoordinates.ltd, captainCoordinates.lng),
            L.latLng(pickupCoordinates.ltd, pickupCoordinates.lng),
          ],
          createMarker: () => null,
          lineOptions: {
            styles: [{ color: "black", weight: 5, opacity: 1, dashArray: '10, 10' }],
          },
          show: false,
          addWaypoints: false,
          showAlternatives: false,
          routeWhileDragging: false,
          fitSelectedRoutes: false,
          summaryTemplate: '',
          containerClassName: 'hidden',
          formatter: new L.Routing.Formatter({ language: 'en' })
        }).addTo(map);
  
        controls.push(captainRouteControl);
      }
  
      // Add pickup to destination route if coordinates exist
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
          show: false,
          addWaypoints: false,
          showAlternatives: false,
          routeWhileDragging: false,
          fitSelectedRoutes: false,
          summaryTemplate: '',
          containerClassName: 'hidden',
          // formatter: new L.Routing.Formatter({ language: 'en' })
        }).addTo(map);
  
        controls.push(routeControl);
      }
  
      // Cleanup: Remove all controls when component unmounts
      return () => {
        controls.forEach((control) => map.removeControl(control));
      };
    }, [map, captainCoordinates, pickupCoordinates, destinationCoordinates]);
  
    return null;
  }
  
  
        
    // If No Coordinates , show default map
    if((!pickupCoordinates && !destinationCoordinates)){
        return (
          
            <div className=" shadow-xl  rounded-xl top-5 z-100  h-[100%] w-[100%]">
                <MapContainer
                    center={[defaultCoordinates.ltd , defaultCoordinates.lng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                <Marker
                icon={CaptainIcon}
                position={[defaultCoordinates.ltd , defaultCoordinates.lng]}
                >
                  <Popup>Your Current Location</Popup>

                </Marker>
    
                </MapContainer>
            </div>
        );
    }

    


  
   



  // Custom DivIcon for pickup (black circle with white center)
  const pickupIcon = new L.DivIcon({
    html: `
      <div style="width: 20px; height: 20px; background-color: black; position: relative; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
        <div style="width: 5px; height: 5px;  background-color: white; border-radius: 100%;"></div>
      </div>
    `,
    iconSize: [10, 10],
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
        <div className=" top-5 z-100   h-[100%] w-[100%]">
        <MapContainer
      center={[pickupCoordinates.ltd, pickupCoordinates.lng]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
       <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

      <RoutingMachine 
        captainCoordinates={captainCoordinates}
        pickupCoordinates={pickupCoordinates}
        destinationCoordinates={destinationCoordinates}
      />

    {/* Pickup Marker */}
 
    {pickupCoordinates && <PopupMarker position={[pickupCoordinates.ltd, pickupCoordinates.lng]} icon={pickupIcon} location={pickup || "Pickup"} />}

    {destinationCoordinates && <PopupMarker position={[destinationCoordinates.ltd, destinationCoordinates.lng]} icon={destinationIcon} location={destination || " Location"} />}

    <ZoomToLocations />
    {captainCoordinates && <PopupMarker position={[captainCoordinates.ltd , captainCoordinates.lng]} location={"Your Location"} icon={CaptainIcon} />}
    </MapContainer>
        </div>
    );
    
};

export default LiveTracking;
