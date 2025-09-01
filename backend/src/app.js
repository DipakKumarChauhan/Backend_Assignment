const express =  require('express');;
const cors =  require('cors');
const morgan = require('morgan');
const e = require('express');
const profileRoutes = require('./routes/profileRoutes');


//Import Routes Here Later

const app =  express();


app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL encoded bodies

app.use(cors());
app.use(morgan('combined')); // Http request logger

//Health Check endpoint
app.get('/health', (req,res)=> {
    res.status(200).json({status: "OK"});
});


// Register Api routes here later
app.use('/api/profile', profileRoutes);

module.exports = app;
