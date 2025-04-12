const express = require('express');
const app = express();
const User = require('./Routes/routes');

app.use(express.json());

require('dotenv').config();

const port = process.env.PORT || 9090;

app.use('/route', User);

app.get('/', (req,res)=>{
    res.send("This is home route..!");
})

app.listen(port, async ()=>{
    try{
        console.log(`Server is running on port http://localhost:${port}`);
    }
    catch(err){
        console.log(err);
    }
})