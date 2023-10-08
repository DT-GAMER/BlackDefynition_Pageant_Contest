const poll = require('../models/poll');

// Middleware to authorize user's access to a specific poll
exports.authorizeUserAccess = async (req, res, next) => {
  try {
    const { pollId } = req.params;
    const { userId } = req;

    // Check if the poll exists
    const poll = await poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    
    if (poll.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized - You do not have access to this poll' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

