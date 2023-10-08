// Error handling middleware for handling 404 errors
exports.handleNotFound = (req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
};

// Error handling middleware for handling other errors
exports.handleError = (error, req, res, next) => {
  console.error(error);

  // Determine the error status and message
  let status = 500;
  let message = 'Internal server error';

  if (error instanceof SyntaxError) {
    status = 400;
    message = 'Bad request - Invalid JSON';
  }

  if (error.message) {
    message = error.message;
  }

  res.status(status).json({ message });
};

