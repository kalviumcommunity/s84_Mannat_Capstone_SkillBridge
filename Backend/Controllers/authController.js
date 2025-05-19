const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../Models/userModel');
const { isValidGmail } = require('../Utils/emailValidator');
const sendEmail = require('../Utils/sendEmail');

// In-memory store for verification codes (for dev/demo)
const verificationCodes = {};

const sendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;
        if (!isValidGmail(email)) {
            return res.status(400).json({ error: 'Please use a valid Gmail address.' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        // Generate a 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        verificationCodes[email] = code;
        // Send the code via email
        await sendEmail(
            email,
            'Your SkillBridge Verification Code',
            `<p>Your verification code is: <b>${code}</b></p>`
        );
        res.json({ message: 'Verification code sent to your email.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signup = async (req, res) => {
    try {
        const fullname = req.body.fullname || req.body.name;
        const { email, phoneNumber = '', password, role = 'jobseeker', code } = req.body;

        if (!isValidGmail(email)) {
            return res.status(400).json({ error: 'Please use a valid Gmail address.' });
        }
        if (!code || verificationCodes[email] !== code) {
            return res.status(400).json({ error: 'Invalid or missing verification code.' });
        }
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
            profile: {},
            verified: true,
            verificationToken: undefined
        });
        // Remove the code after successful signup
        delete verificationCodes[email];
        // Generate token for the new user
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const userObj = newUser.toObject();
        delete userObj.password;
        res.status(201).json({ message: 'User created and verified successfully', token, user: userObj });
    } catch (error) {
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

module.exports = { signup, login, verifyEmail, sendVerificationCode };
