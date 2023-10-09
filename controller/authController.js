const User = require('../models/User');
const Contestant = require('../models/Contestant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  // Voter Signup
  signupVoter: async (req, res) => {
    try {
      // Extract user registration data from the request body
      const { name, email, password } = req.body;

       // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Send a response with the token
      res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred during voter signup.' });
    }
  },

  // Contestant Signup
  signupContestant: async (req, res) => {
    try {
      // Extract contestant registration data from the request body
      const { name, age, contestName, imageURL, category } = req.body;

        // Check if the name is already registered
    const existingContestant = await Contestant.findOne({ name });

    if (existingContestant) {
      return res.status(400).json({ error: 'Contestant name is already registered.' });
    }

      // Create a new contestant
      const newContestant = new Contestant({
        name,
        age,
        contestName,
        imageURL,
        category,
      });

      // Save the contestant to the database
      await newContestant.save();

      // Generate a JWT token for authentication
      const token = jwt.sign({ contestantId: newContestant._id }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Send a response with the token
      res.status(201).json({ token, contestantId: newContestant._id });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred during contestant signup.' });
    }
  },

  // Voter Login
  loginVoter: async (req, res) => {
    try {
      // Extract login data from the request body
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed.' });
      }

      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed.' });
      }

      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Send a response with the token
      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred during voter login.' });
    }
  },

  // Contestant Login
  loginContestant: async (req, res) => {
    try {
      // Extract login data from the request body
      const { name, password } = req.body;

      // Find the contestant by name
      const contestant = await Contestant.findOne({ name });

      // Check if the contestant exists
      if (!contestant) {
        return res.status(401).json({ error: 'Authentication failed.' });
      }


      // Generate a JWT token for authentication
      const token = jwt.sign({ contestantId: contestant._id }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Send a response with the token
      res.status(200).json({ token, contestantId: contestant._id });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred during contestant login.' });
    }
  },
};

module.exports = authController;

