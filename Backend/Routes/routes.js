const express = require('express');
const router = express.Router();
router.use(express.json());


router.get('/user', async (req, res)=>{
    try{
        const data= await User.find();
        res.status(200).json({ data });
    }
    catch(err){
        res.status(500).json({ error: 'Server error', success: false });
    }
})

module.exports = router;