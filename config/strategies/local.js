'use strict';

// Module dependencies.
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function()
{
  passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
    function(username, password, done) {
      User.findOne({
        username: username
      }, function(err, user) {

        if(err) return done(err);

        if(!user)
        {
          return done(null, false, {
            message: 'Invalid username or password'
          });
        }

        if(!user.authenticate(password))
        {
          return done(null, false, {
            message: 'Invalid username or password'
          });
        }

        return done(null, user);

      });
    }
  ));
};
