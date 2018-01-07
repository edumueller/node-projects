const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'] // Access we want to the user's profile
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout(); // req.logout() is a built-in function that destroys the user's cookie
		//res.send(req.user);
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		// Returns the currently logged user -- req: incoming request, res: outgoing response
		res.send(req.user);
	});
};

/*** How the routing works: ***
 *    app.get(
 *    	'/auth/google', // First Argument: The route we are going to respond to
 *    	'' // The code to be executed when someone access that route
 *    );
 ***/
