'use strict';

var users = require('../../app/controllers/users.server.controller');
var notes = require('../../app/controllers/notes.server.controller');

module.exports = function(app) {
  app.route('/notes')
  .get(users.requiresLogin, notes.list)
  .post(users.requiresLogin, notes.create);

  app.route('/notes/:noteId')
    .get(users.requiresLogin, notes.hasAuthorization, notes.read)
    .put(users.requiresLogin, notes.hasAuthorization, notes.update)
    .delete(users.requiresLogin, notes.hasAuthorization, notes.delete);

  // Bind the middleware
  app.param('noteId', notes.noteByID);

};
