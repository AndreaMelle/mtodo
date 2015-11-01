'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Note cannot be empty'
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }

});

mongoose.model('Note', NoteSchema);
