const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/connection');
const userRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
connectToDB(); // Db connection 


// Basic Middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Route Configurations
app.get("/" , (req, res)=>{
    res.send("hello world");
})

app.use('/user', userRouter);

module.exports = app;