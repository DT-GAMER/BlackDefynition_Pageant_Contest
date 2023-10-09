// Middleware function for logging incoming requests and outgoing responses
const loggerMiddleware = (req, res, next) => {
  const currentDate = new Date().toISOString();
  const { method, originalUrl, body, params } = req;
  console.log(`[${currentDate}] ${method} ${originalUrl}`);
  console.log('Request Body:', body);
  console.log('Request Params:', params);

  // Capture the response data before sending it
  const originalSend = res.send;
  res.send = function (data) {
    console.log('Response Data:', data);
    originalSend.apply(res, arguments);
  };

  // Continue to the next middleware or route handler
  next();
};

module.exports = loggerMiddleware;

