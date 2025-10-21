/**
 * Rate Limiting Middleware
 * Protects endpoints from brute force attacks and abuse
 */

const rateLimit = require('express-rate-limit');

/**
 * Custom rate limit handler - returns JSON instead of HTML
 */
const rateLimitHandler = (req, res) => {
  res.status(429).json({
    error: 'Too Many Requests',
    message: 'You have exceeded the rate limit. Please try again later.',
    retryAfter: req.rateLimit.resetTime
  });
};

/**
 * Strict rate limiter for login attempts
 * Prevents brute force attacks on authentication
 *
 * Limit: 5 attempts per 15 minutes per IP
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: rateLimitHandler,
  skipSuccessfulRequests: false, // Count all requests, even successful ones
  skipFailedRequests: false
});

/**
 * Moderate rate limiter for registration checks
 * Prevents account enumeration attacks
 *
 * Limit: 10 attempts per 15 minutes per IP
 */
const checkRegistrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: 'Too many registration checks from this IP. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});

/**
 * Generous rate limiter for session validation
 * Allows frequent polling without blocking legitimate users
 *
 * Limit: 100 requests per minute per IP
 * (With 60s polling, this allows ~100 concurrent users per IP)
 */
const sessionValidationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many session validation requests. Please slow down.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
  skipSuccessfulRequests: true // Only count failed validations
});

/**
 * Moderate rate limiter for admin endpoints
 * Protects admin panel from abuse
 *
 * Limit: 100 requests per 15 minutes per IP
 */
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many admin requests from this IP. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});

/**
 * Global rate limiter - safety net for all endpoints
 * Prevents DoS attacks
 *
 * Limit: 1000 requests per 15 minutes per IP
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per window
  message: 'Too many requests from this IP. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});

/**
 * Lenient rate limiter for logout
 * No need to restrict logout heavily
 *
 * Limit: 20 requests per 15 minutes per IP
 */
const logoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: 'Too many logout requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});

module.exports = {
  loginLimiter,
  checkRegistrationLimiter,
  sessionValidationLimiter,
  adminLimiter,
  globalLimiter,
  logoutLimiter
};
