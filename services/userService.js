const User = require('../models/User');

// Get user profile by ID
exports.getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

// Update user profile
exports.updateUserProfile = async (userId, name, email) => {
  try {
    // Check for valid input
    if (!name || !email) {
      throw new Error('Invalid input data');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

