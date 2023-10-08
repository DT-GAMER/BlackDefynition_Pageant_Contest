const Notification = require('../models/Notification');

// Send a notification
exports.sendNotification = async (userId, content) => {
  try {
    // Create a new notification
    const newNotification = new Notification({
      userId,
      content,
    });

    await newNotification.save();
  } catch (error) {
    throw error;
  }
};

