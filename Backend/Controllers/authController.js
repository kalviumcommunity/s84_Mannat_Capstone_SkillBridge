const bcrypt = require('bcrypt');
const User = require('../Models/userModel');


const signup = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {}
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } 
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } 
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signup, login };
