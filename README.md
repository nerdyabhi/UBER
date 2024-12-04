![image](https://github.com/user-attachments/assets/02637e89-ea1f-4a12-8b93-15f490bccf5b)
# 🚗 Uber Clone

A real-time ride-sharing application built with modern tech stack, enabling seamless transportation services.

![Demo Preview](https://github.com/user-attachments/assets/02637e89-ea1f-4a12-8b93-15f490bccf5b)

## ✨ Key Features

- 🌍 Real-time ride tracking and mapping
- 🔄 Live driver-passenger matching
- 💰 Dynamic pricing & fare estimation
- 🔐 Secure user authentication
- 📱 Responsive cross-platform design

## 🛠️ Built With

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

## 🚀 Quick Start

```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone
npm install
npm start
```

## 📝 Environment Variables

# Backend
```javascript
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_key
SOCKET_SERVER_URL=your_socket_server_url
```
# Frontend
```javascript
VITE_API_URL=your_backend_api_url
VITE_SOCKET_URL=your_socket_server_url```

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
Here's the information formatted as a table:
Here’s an aesthetic markdown table with a clear heading for your GitHub:

---

### 🚀 **Socket Events Documentation**

| **Socket Event**          | **Description**               | **Payload**                                                                 |
|----------------------------|-------------------------------|-----------------------------------------------------------------------------|
| `join`                    | User/Captain connection       | `{ userId: string, userType: "user" | "captain" }`                         |
| `update-location-captain` | Update captain's location     | `{ userId: string, location: { ltd: number, lng: number } }`               |
| `captain-location-update` | Broadcast captain location    | `{ ltd: number, lng: number }`                                             |
| `ride-request`            | New ride request              | `{ rideId: string, pickup: string, destination: string }`                  |
| `ride-confirmed`          | Ride confirmation             | `{ rideId: string, captainId: string }`                                    |

---
