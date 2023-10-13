const mongoose = require('mongoose');

const contestantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contestName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required:true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contestant = mongoose.model('Contestant', contestantSchema);

module.exports = Contestant;

