const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true,
  },
  choiceIndex: {
    type: Number,
    required: true,
  },
  
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;

