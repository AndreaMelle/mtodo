'use strict';

// Module dependencies
var init = require('./config/init')();
var config = require('./config/config');
var mongoose = require('mongoose');

var db = mongoose.connect(config.db);

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('TODO application started on port ' + config.port);
