const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/connection');
const cookieParser = require('cookie-parser');

/** Routes */
const userRouter = require('./routes/user.routes');
const captainRouter = require('./routes/captain.routes')
const mapRouter = require('./routes/maps.routes');
const rideRouter = require('./routes/rides.routes');
/** Database connection. */
connectToDB(); 


// Basic Middlewares
app.use(cors({
    origin: ['https://sastauber.vercel.app', 'https://uber-production.up.railway.app'], // Frontend and backend domains
    credentials: true, // Allow cookies to be sent/received
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    exposedHeaders: ['*', 'Authorization'],
    transports: ['websocket', 'polling']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Route Configurations

app.use('/user', userRouter);
app.use('/captain' , captainRouter );
app.use('/maps',mapRouter )
app.use('/rides',rideRouter );

module.exports = app;