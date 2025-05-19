const express = require('express');
const { signup, login, verifyEmail, sendVerificationCode } = require('../Controllers/authController');

const router = express.Router();

router.post('/send-code', sendVerificationCode);
router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email', verifyEmail);

module.exports = router;