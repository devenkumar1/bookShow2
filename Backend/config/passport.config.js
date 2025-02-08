import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; 

import user from '../models/user.model.js'; 
import dotenv from 'dotenv';

dotenv.config();

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,         
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  callbackURL: `${process.env.BACKEND_URI}/auth/google/callback`, 
}, async (token, tokenSecret, profile, done) => {
  try {
    let existingUser = await user.findOne({ googleId: profile.id });

    if (!existingUser) {
      const newUser = new user({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0]?.value,
      });
      await newUser.save();
      return done(null, newUser);
    }

    return done(null, existingUser);
  } catch (error) {
    done(error);
  }
}));



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const userData = await user.findById(id);
  done(null, userData);
});

export default passport;
