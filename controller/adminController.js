const Admin = require('../models/Admin');
const Category = require('../models/Category');
const jwt = require('jsonwebtoken');
const upload = multer({ storage: storage });

const adminController = {
  // Admin Signup
  signupAdmin: async (req, res) => {
    try {
      // Extract admin registration data from the request body
      const { username, password } = req.body;

        // Check if the username is already registered
      const existingAdmin = await Admin.findOne({ username });

      if (existingAdmin) {
        return res.status(400).json({ error: 'Username is already registered.' });
    }


      // Create a new admin with the provided details
      const newAdmin = new Admin({
        username,
        password,
      });

      // Save the admin to the database
      await newAdmin.save();

      // Generate a JWT token for authentication
      const token = jwt.sign({ adminId: newAdmin._id }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Send a response with the token
      res.status(201).json({ token, adminId: newAdmin._id });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred during admin signup.' });
    }
  },

  // Admin Login
  loginAdmin: async (req, res) => {
    try {
      // Extract login data from the request body
      const { username, password } = req.body;

      // Find the admin by username
      const admin = await Admin.findOne({ username });

      // Check if the admin exists
      if (!admin) {
        return res.status(401).json({ error: 'Authentication failed.' });
      }

      // Generate a JWT token for authentication
      const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Send a response with the token
      res.status(200).json({ token, adminId: admin._id });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred during admin login.' });
    }
  },

  // Create a new category (admin privilege required)
 const multer = require('multer');

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Path to store images
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Image name syntax
    cb(null, Date.now() + '-' + file.originalname);
  },
});


// Update the route handler to handle file uploads
app.post('/contest/categories', upload.single('categoryImage'), async (req, res) => {
  try {
    // Validate admin authentication
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the request header
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Verify the token

    // Check if the decoded token contains adminId
    if (!decodedToken || !decodedToken.adminId) {
      return res.status(401).json({ error: 'Authentication failed.' });
    }

    // Extract category data from the request body
    const { name, description, startTime, endTime, prize } = req.body;

    // Extract the file path of the uploaded image
    const imageFilePath = req.file.path;

    // Create a new category with provided details and image path
    const newCategory = new Category({
      name,
      description,
      startTime,
      endTime,
      prize,
      image: imageFilePath,
    });

    // Save the category to the database
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully.', category: newCategory });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the category.' });
  }
});

  // End voting for a category (admin privilege required)
  endCategoryVoting: async (req, res) => {
    try {
      // Validate admin authentication
      const token = req.headers.authorization.split(' ')[1]; // Extract the token from the request header
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Verify the token

      // Check if the decoded token contains adminId
      if (!decodedToken || !decodedToken.adminId) {
        return res.status(401).json({ error: 'Authentication failed.' });
      }

      // Extract category ID from request parameters
      const categoryId = req.params.categoryId;

      // Update the category status to 'ended'
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { $set: { status: 'ended' } },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found.' });
      }

      res.status(200).json({ message: 'Category voting ended successfully.', category: updatedCategory });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred while ending the category voting.' });
    }
  },

  // View results for a category (admin privilege required)
  viewCategoryResults: async (req, res) => {
    try {
      // Validate admin authentication
      const token = req.headers.authorization.split(' ')[1]; // Extract the token from the request header
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Verify the token

      // Check if the decoded token contains adminId
      if (!decodedToken || !decodedToken.adminId) {
        return res.status(401).json({ error: 'Authentication failed.' });
      }

      // Extract category ID from request parameters
      const categoryId = req.params.categoryId;

      // Fetch and return results for the specified category
      const categoryResults = await Category.findById(categoryId).populate('results');

      if (!categoryResults) {
        return res.status(404).json({ error: 'Category not found.' });
      }

      res.status(200).json(categoryResults);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching category results.' });
    }
  },
};

module.exports = adminController;

