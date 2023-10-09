const Poll = require('../models/poll');

// Create a new poll
exports.createcontest = async (req, res) => {
  try {
    const { title, choices } = req.body;

    // Check for valid input
    if (!title || !choices || choices.length < 2) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Create a new poll
    const newPoll = new Poll({
      title,
      choices,
    });

    await newPoll.save();

    res.status(201).json({ message: 'Poll created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// List all polls
exports.listvoting = async (req, res) => {
  try {
    const polls = await Poll.find();

    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a poll
exports.updateresults = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { choices } = req.body;

    // Check for valid input
    if (!choices || choices.length < 2) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const updatedPoll = await Poll.findByIdAndUpdate(
      pollId,
      { choices },
      { new: true }
    );

    res.status(200).json(updatedPoll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

