'use strict';

var passport = require('passport');

module.exports = function(app) {

  var users = require('../../app/controllers/users.server.controller');

  app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users/password').post(users.changePassword);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

  // Setting up the users api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

  // Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));

	app.route('/auth/google/callback').get(users.oauthCallback('google'));

  // Finish by binding the user middleware
  app.param('userId', users.userByID);

};
