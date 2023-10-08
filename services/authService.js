const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/jwt')

// Registration
exports.registerUser = async (name, email, password) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (error) {
    throw error;
  }
};

// Authenticate user and generate JWT token
exports.authenticateUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      throw new Error('User not found');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw error;
  }
};

