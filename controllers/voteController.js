const Poll = require('../models/poll');
const Vote = require('../models/vote');



// Submit a vote for a poll
exports.submitVote = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { userId, choiceIndex } = req.body;

    // Check if the user has already voted in this poll
    const existingVote = await Vote.findOne({ userId, pollId });

    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted in this poll' });
    }

    // Find the poll by ID
    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    // Check if the choiceIndex is valid
    if (choiceIndex < 0 || choiceIndex >= poll.choices.length) {
      return res.status(400).json({ message: 'Invalid choice index' });
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

    res.status(200).json({ message: 'Vote submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

