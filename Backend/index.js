const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const userRoute = require('./Routes/userRoutes');
const authRoute = require('./Routes/authRoutes');
const connectDB = require('./config/db');
const passport = require('./Middleware/passport');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://s84-mannat-skillbridge.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth2 endpoints
app.get('/route/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/route/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const frontendUrl =
      process.env.FRONTEND_URL || 'http://localhost:5173';

    const redirectUrl = `${frontendUrl}/dashboard?token=${token}`;
    res.redirect(redirectUrl);
  }
);

const port = process.env.PORT || 9090;

connectDB();

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