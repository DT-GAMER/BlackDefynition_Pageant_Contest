const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contestant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contestant',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;

