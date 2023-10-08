// Function to validate email format
exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to sanitize user input
exports.sanitizeInput = (input) => {
  return input.trim();
};

