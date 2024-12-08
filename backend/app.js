const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/connection');
const cookieParser = require('cookie-parser');
const corsOptions = require('./utils/corsOption')

/** Routes */
const userRouter = require('./routes/user.routes');
const captainRouter = require('./routes/captain.routes')
const mapRouter = require('./routes/maps.routes');
const rideRouter = require('./routes/rides.routes');
/** Database connection. */
connectToDB(); 


// Basic Middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Route Configurations;


app.get("/" , (req, res)=>{
res.send("Hello world Abhi Here !");
})

app.use('/user', userRouter);
app.use('/captain' , captainRouter );
app.use('/maps',mapRouter )
app.use('/rides',rideRouter );

module.exports = app;