const Poll = require('../models/Poll');

// Create a new poll
exports.createPoll = async (title, choices) => {
  try {
    
    const newPoll = new Poll({
      title,
      choices,
    });

    await newPoll.save();
  } catch (error) {
    throw error;
  }
};

// List all polls
exports.listPolls = async () => {
  try {
    const polls = await Poll.find();
    return polls;
  } catch (error) {
    throw error;
  }
};

// Update a poll
exports.updatePoll = async (pollId, choices) => {
  try {
    // Check for valid input
    if (!choices || choices.length < 2) {
      throw new Error('Invalid input data');
    }

    const updatedPoll = await Poll.findByIdAndUpdate(
      pollId,
      { choices },
      { new: true }
    );

    return updatedPoll;
  } catch (error) {
    throw error;
  }
};

