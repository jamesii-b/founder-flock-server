// Apply rate limiting middleware
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5, 
    message: 'Too many login attempts, please try again later',
});

module.exports = loginLimiter;