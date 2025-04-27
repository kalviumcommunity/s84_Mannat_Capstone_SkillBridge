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


router.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, phoneNumber, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { fullname, email, phoneNumber, role },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ 
                error: 'User not found', 
                success: false 
            });
        }
        res.status(200).json({ 
            message: 'User updated successfully', 
            success: true, 
            user: updatedUser 
        });
    } 
    
    catch (err) {
        res.status(500).json({ 
            error: 'Server error', 
            success: false 
        });
    }
});


module.exports = router;