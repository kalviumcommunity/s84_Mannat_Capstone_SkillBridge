const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
router.use(express.json());


router.get('/user', async (req, res)=>{
    try{
        const data= await User.find();
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ error: 'Server error', success: false });
    }
});


router.post('/user', async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const newUser = new User({ fullname, email, phoneNumber, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', success: true, user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Server error', success: false });
    }
});


module.exports = router;