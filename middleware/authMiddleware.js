const jwt = require('jsonwebtoken');

// Middleware function for user authentication
const authMiddleware = (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token using your secret key
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded token data to the request for further use
    req.userData = decodedToken;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed.' });
  }
};

module.exports = authMiddleware;

