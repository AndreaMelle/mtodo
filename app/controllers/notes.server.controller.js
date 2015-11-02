'use strict';

var mongoose = require('mongoose');
var Note = mongoose.model('Note');
var _ = require('lodash');

var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Note already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

exports.create = function(req, res) {
  var note = new Note(req.body);
  note.user = req.user;

  note.save(function(err) {
    if(err) return res.status(400).send({message: getErrorMessage(err)});
    else res.json(note);
  });

};

//TODO: implement pagination!
exports.list = function(req, res) {
  Note.find({
    user: req.user
  }).sort('-created').limit(20).populate('user').exec(function(err, notes) {
    if(err) return res.status(400).send({message: getErrorMessage(err)});
    else res.json(notes);
  });
};

exports.read = function(req, res) {
  res.json(req.note);
};

exports.update = function(req, res) {
  var note = req.note;
  note = _.extend(note, req.body);
  note.save(function(err) {
    if(err) return res.status(400).send({message: getErrorMessage(err)});
    else res.json(note);
  });
};

exports.delete = function(req, res) {
  var note = req.note;
  note.remove(function(err) {
    if(err) return res.status(400).send({message: getErrorMessage(err)});
    else res.json(note);
  });
};

// Note middleware
exports.noteByID = function(req, res, next, id) {
  Note.findById(id).populate('user').exec(function(err, note) {

    if(err) return next(err);
    if(!note) return next(new Error('Failed to retrieve note ' + id));
    req.note = note;
    next();

  });
};

// Note authorization middleware
exports.hasAuthorization = function(req, res, next) {
  if(req.note.user.id !== req.user.id) {
    return res.status(403).send({message: 'User not authorized'});
  }
  next();
};
