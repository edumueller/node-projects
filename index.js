const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); // represents a running express app. Most projects will use only one.

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey] // Gives a unique identifier to the cookie
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// https://console.developers.google.com/

const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express telling node to listen to http requests on port 5000
