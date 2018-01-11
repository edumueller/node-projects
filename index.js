const express = require('express');
const bodyParser = require('body-parser'); // middlewares need to be called using app.use
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); // represents a running express app. Most projects will use only one.

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey] // Gives a unique identifier to the cookie
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // exports a function that's immediately called
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
	// Express will serve up index.html file
	// If it doesn't recognize de route
}

// https://console.developers.google.com/

const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express telling node to listen to http requests on port 5000
