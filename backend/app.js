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

/** Database connection. */
connectToDB(); 


// Basic Middlewares
app.use(cors({
    origin: '*', // Frontend domain
    credentials: true // Allow cookies to be sent/received
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Route Configurations
app.get("/" , (req, res)=>{
    res.send("hello world");
})

app.use('/user', userRouter);
app.use('/captain' , captainRouter );

module.exports = app;