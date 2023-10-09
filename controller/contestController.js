const Contestant = require('../models/Contestant');
const Category = require('../models/Category');
const Vote = require('../models/Vote');
const jwt = require('jsonwebtoken');

const contestController = {
  // Get all categories
  getAllCategories: async (req, res) => {
    try {
      // Fetch and return all active categories
      const categories = await Category.find({ status: 'active' });
      res.status(200).json(categories);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching categories.' });
    }
  },

  // Get contestants by category
  getContestantsByCategory: async (req, res) => {
    try {
      // Extract category ID from request parameters
      const categoryId = req.params.categoryId;

      // Fetch and return contestants by category ID
      const contestants = await Contestant.find({ category: categoryId });
      res.status(200).json(contestants);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching contestants.' });
    }
  },

  // Create a new category
  createCategory: async (req, res) => {
    try {
      // Extract category data from the request body
      const { name, description, startTime, endTime, prize } = req.body;

      // Create a new category with provided details
      const newCategory = new Category({
        name,
        description,
        startTime,
        endTime,
        prize,
      });

      // Save the category to the database
      await newCategory.save();

      res.status(201).json({ message: 'Category created successfully.', category: newCategory });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the category.' });
    }
  },

  // Vote for a contestant
  voteForContestant: async (req, res) => {
    try {
      // Validate the user's JWT token for authentication
      const token = req.headers.authorization.split(' ')[1]; // Extract the token from the request header
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Verify the token

      // Extract user ID and contestant ID from the token
      const userId = decodedToken.userId;
      const contestantId = req.body.contestantId; // You should pass the contestantId in the request body

      // Check if the user has already voted for the contestant
      const existingVote = await Vote.findOne({ voter: userId, contestant: contestantId });

      if (existingVote) {
        return res.status(400).json({ error: 'You have already voted for this contestant.' });
      }

      // Create a new vote record
      const newVote = new Vote({
        voter: userId,
        contestant: contestantId,
      });

      // Save the vote to the database
      await newVote.save();

      res.status(201).json({ message: 'Vote recorded successfully.' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred while recording the vote.' });
    }
  },
};

module.exports = contestController;

