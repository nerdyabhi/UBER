const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/connection');
const userRouter = require('./routes/user.routes');

connectToDB(); // Db connection 


// Basic Middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Route Configurations
app.get("/" , (req, res)=>{
    res.send("hello world");
})

app.use('/user', userRouter);

module.exports = app;