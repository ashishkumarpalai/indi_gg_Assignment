// rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');

// Create a rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max requests per window
    message: 'Too many requests from this IP, please try again later.',
});

module.exports = {limiter};
