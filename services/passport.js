const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // This retrieves the Schema we created on the model file. One argument retrieves and two arguments put something in.

passport.serializeUser((user, done) => {
	// Turns an instance into a unique identifier (id)
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	// Turn a unique identifier into a user
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.google.client_id,
			clientSecret: keys.google.client_secret,
			callbackURL: '/auth/google/callback', // This is the URL Google will send the code we will need to ask the user's info he has stored.
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			// This is what's executed when we get a profile back..
			User.findOne({ googleID: profile.id }).then(existingUser => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({ googleID: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
