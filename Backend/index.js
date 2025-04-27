const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoute = require('./Routes/routes');
const User = require('./Models/userModel');
const Job = require('./Models/jobModel');

app.use(express.json());

require('dotenv').config();

const port = process.env.PORT || 9090;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database connected..!");
})
.catch((err)=>{
    console.log(err);
})


app.use('/route', userRoute);

app.get('/', (req,res)=>{
    res.send("This is home route..!");
})

app.listen(port, async ()=>{
    try{
        console.log(`Server is running at port http://localhost:${port}`);
    }
    catch(err){
        console.log(err);
    }
})