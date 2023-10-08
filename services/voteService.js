const Vote = require('../models/Vote');
const Poll = require('../models/Poll');

// Submit a vote for a poll
exports.submitVote = async (userId, pollId, choiceIndex) => {
  try {
    // Check if the user has already voted in this poll
    const existingVote = await Vote.findOne({ userId, pollId });

    if (existingVote) {
      throw new Error('You have already voted in this poll');
    }

    // Find the poll by ID
    const poll = await Poll.findById(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

    // Check if the choiceIndex is valid
    if (choiceIndex < 0 || choiceIndex >= poll.choices.length) {
      throw new Error('Invalid choice index');
    }

    // Record the vote
    const newVote = new Vote({
      userId,
      pollId,
      choiceIndex,
    });

    await newVote.save();

    // Update the poll's vote count for the chosen choice
    poll.choices[choiceIndex].votes += 1;
    await poll.save();
  } catch (error) {
    throw error;
  }
};


