const express = require('express');
const { signup, login, verifyEmail, sendVerificationCode } = require('../Controllers/authController');
const admin = require('firebase-admin');

const router = express.Router();

// Initialize Firebase Admin if not already done
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use a service account
  });
}

router.post('/send-code', sendVerificationCode);
router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email', verifyEmail);

router.post('/google', async (req, res) => {
  const { token, email, name, photoURL } = req.body;
  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if user exists in your DB
    let user = await require('../Models/userModel').findOne({ email });
    if (!user) {
      // Create a new user if not found
      user = await require('../Models/userModel').create({
        fullname: name,
        email,
        phoneNumber: '',
        password: '', // No password for Google users
        role: 'jobseeker',
        profile: { profilePhoto: photoURL },
        verified: true
      });
    }

    // Generate your app's JWT
    const jwt = require('jsonwebtoken');
    const appToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const userObj = user.toObject();
    delete userObj.password;

    return res.json({
      token: appToken,
      user: userObj
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Google token', error: err.message });
  }
});

module.exports = router;