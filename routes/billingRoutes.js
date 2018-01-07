const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// Middlewares go in the middle, as many as we want
		if (!req.user) {
			return res.status(401).send({ error: 'You must be logged in!' });
		}
		//console.log(req.body); // bodyParser puts the info on the 'body' property

		// charges the user
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: 'Emaily: $' + 5 + ' for ' + 5 + ' credits',
			source: req.body.id
		});

		// add credit to user

		// send user model to the client to update the interface
		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
