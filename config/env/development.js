'use strict';

module.exports = {

  db: 'mongodb://localhost/todo-dev',
  app: {
		title: 'TODO'
	},
  google: {
		clientID: process.env.GOOGLE_ID || '62458721458-i7eqvk93gaqf1qo88jcuciur006s1sid.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'Ne18IR7pvdKA3wb02WBQvzJg',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
};
