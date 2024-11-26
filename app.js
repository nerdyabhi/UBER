const dotenv = require('dotenv');
dotenv.config();
const app = require('express')();
const cors = require('cors');
const connectToDB = require('./db/connection');


connectToDB();
app.use(cors);
app.get("/" , (req, res)=>{
    res.send("hello world");
})

module.exports = app;