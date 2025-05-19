const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/userModel');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    // Only allow @gmail.com addresses
    if (!/^([a-zA-Z0-9_.+-])+@gmail\.com$/.test(email)) {
      return done(new Error('Only Gmail accounts are allowed'), null);
    }
    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      // If user exists, return user (do not create duplicate)
      return done(null, user);
    }
    // If not, create new user
    user = await User.create({
      fullname: profile.displayName,
      email: email,
      phoneNumber: '',
      password: '', // No password for Google users
      role: 'jobseeker',
      profile: { profilePhoto: profile.photos[0]?.value || '' }
    });
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport; 