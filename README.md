![image](https://github.com/user-attachments/assets/02637e89-ea1f-4a12-8b93-15f490bccf5b)


## ✨ Key Features

-  Real-time ride tracking and mapping
-  Live driver-passenger matching
-  Dynamic pricing & fare estimation
-  Secure user authentication
-  Responsive cross-platform design

####  Quick Start

```bash
git clone https://github.com/nerdyabhi/uber.git
cd uber
cd backend
npm install
node server.js
cd ..
cd frontend
npm install
npm run dev
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


---

### 🚀 **Socket Events Documentation**

| **Socket Event**          | **Description**               | **Payload**                                                                 |
|----------------------------|-------------------------------|-----------------------------------------------------------------------------|
| `join`                    | User/Captain connection       | `{ userId: string, userType: "user" | "captain" }`                         |
| `update-location-captain` | Update captain's location     | `{ userId: string, location: { ltd: number, lng: number } }`               |
| `ride-request`            | New ride request              | `{ rideId: string, pickup: string, destination: string }`                  |
| `ride-confirmed`          | Ride confirmation             | `{ rideId: string, captainId: string }`                                    |

---


