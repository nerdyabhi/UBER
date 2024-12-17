<img src="https://helios-i.mashable.com/imagery/articles/03y6VwlrZqnsuvnwR8CtGAL/hero-image.fill.size_1248x702.v1623372852.jpg" alt="Logo" width="150" height="75">

Live Link 🚀 : https://uber.abhi.works

##  Functional Requirements.

-  Real-time ride tracking and mapping
-  Live driver-passenger matching
-  Dynamic pricing & fare estimation
-  Secure user authentication
-  Responsive cross-platform design


### Architecture
![image](https://github.com/user-attachments/assets/02637e89-ea1f-4a12-8b93-15f490bccf5b)
![image](https://github.com/user-attachments/assets/c607344c-a89f-4a61-8324-10984916cdd4)


### Quick Start
#### - Frontend 

```bash
git clone https://github.com/nerdyabhi/uber.git
```

```bash
cd frontend
npm install
npm run dev
```
#### - Backend 
```bash
cd backend
npm install
node server.js
cd ..
```

### Environment Variables

#### Backend
```js
PORT=xxx
MONGO_URL="Your MONGO connecting string"
JWT_SECRET = "JWT SECRET"
GOOGLE_MAP_API = "API"


```
### Frontend
```js

VITE_API_URL=your_backend_api_url
VITE_SOCKET_URL=your_socket_server_url
```

# 📡 API Endpoints
### Authentication
```cpp
POST /api/user/register    # Register new user
POST /api/user/login      # User login
POST /api/captain/register # Register new captain
POST /api/captain/login   # Captain login
```
### Rides
```javascript
POST /api/rides/create    # Create new ride
POST /api/rides/confirm   # Confirm ride
POST /api/rides/getFare   # Get fare estimate
POST /api/rides/startRide # Start ride with OTP
```

### Maps
```javascript
GET /api/maps/get-coordinates    # Get coordinates from address
GET /api/maps/get-Distance-time  # Get distance and time
GET /api/maps/autocomplete       # Get location suggestions
```



### Don't Forget to '⭐' this


### 🚀 **Socket Events Documentation**

| **Socket Event**          | **Description**               | **Payload**                                                                 |
|----------------------------|-------------------------------|-----------------------------------------------------------------------------|
| `join`                    | User/Captain connection       | `{ userId: string, userType: "user" | "captain" }`                         |
| `update-location-captain` | Update captain's location     | `{ userId: string, location: { ltd: number, lng: number } }`               |
| `ride-request`            | New ride request              | `{ rideId: string, pickup: string, destination: string }`                  |
| `ride-confirmed`          | Ride confirmation             | `{ rideId: string, captainId: string }`                                    |

---



