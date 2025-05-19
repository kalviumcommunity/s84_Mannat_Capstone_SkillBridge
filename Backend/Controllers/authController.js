const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../Models/userModel');
const { isValidGmail } = require('../Utils/emailValidator');
const sendEmail = require('../Utils/sendEmail');

const signup = async (req, res) => {
    try {
        const fullname = req.body.fullname || req.body.name;
        const { email, phoneNumber = '', password, role = 'jobseeker' } = req.body;

        // Gmail validation using utility
        if (!isValidGmail(email)) {
            return res.status(400).json({ error: 'Please use a valid Gmail address.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {},
            verified: false,
            verificationToken
        });

        // Send verification email
        const verifyUrl = `http://localhost:5000/route/auth/verify-email?token=${verificationToken}`;
        await sendEmail(
            email,
            'Verify your SkillBridge account',
            `<p>Click the link to verify your account:</p><a href="${verifyUrl}">${verifyUrl}</a>`
        );

        res.status(201).json({ message: 'User created successfully. Please check your email to verify your account.' });
    } 
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).send('Invalid or expired verification link.');
        }
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.send('Email verified successfully! You can now log in.');
    } catch (error) {
        res.status(400).send('Verification failed.');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }
        if (!user.verified) {
            return res.status(403).json({ error: 'Please verify your email before logging in.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ message: 'Login successful', token, user: userObj });
    } 
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signup, login, verifyEmail };
