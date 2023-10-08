const jwt = require('jsonwebtoken');
const config = require('../config/jwt'); 

// Middleware to authenticate user based on JWT token
exports.authenticateUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, config.secret);

    // Attach user ID to the request for further processing
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

