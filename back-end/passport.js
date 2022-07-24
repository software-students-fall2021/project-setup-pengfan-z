const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
require('dotenv').config();

const { User } = require('./db');

// JSON Web Tokens Strategy
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (payload, done) => {
            try {
                // Find the user specified in token
                const user = await User.findById(payload.sub);

                // If user doesn't exist
                if (!user) {
                    return done(null, false);
                }

                // Otherwise, return the user
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

// Local strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            // find the user given the email
            const user = await User.findOne({ username });
            // If not, handle it
            if (!user) {
                return done(null, false);
            }
            // Check if the passwor is correct
            const isMatch = await user.isValidPassword(password);

            // If not, handle it
            if (!isMatch) {
                return done(null, false);
            }
            // Otherwise, return the user
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);
