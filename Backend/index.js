const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./Routes/userRoutes');
const authRoute = require('./Routes/authRoutes');
const User = require('./Models/userModel');
const Job = require('./Models/jobModel');

const app = express();
app.use(express.json());

// Add CORS middleware before routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

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
app.use('/route/auth', authRoute);

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