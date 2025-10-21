# Rate Limiting Documentation

## Overview

Rate limiting has been implemented to protect the GoHub Backend API from abuse, brute force attacks, and denial-of-service (DoS) attempts. The implementation uses `express-rate-limit` to enforce request limits on various endpoints.

---

## Rate Limit Configuration

### 1. **Global Rate Limiter**
- **Limit**: 1000 requests per 15 minutes per IP
- **Purpose**: Safety net to prevent DoS attacks on all endpoints
- **Applied to**: All routes globally

```javascript
// Applies to: ALL endpoints
// Window: 15 minutes
// Max requests: 1000
```

---

### 2. **Login Endpoint** (`POST /api/auth/login`)
- **Limit**: 5 requests per 15 minutes per IP
- **Purpose**: Prevent brute force attacks on authentication
- **Status Code**: 429 (Too Many Requests)
- **Message**: "Too many login attempts from this IP. Please try again after 15 minutes."

**Why so strict?**
- Only 5 attempts needed for legitimate users
- Registration numbers are the only credential
- Prevents account enumeration and brute force

```javascript
// Endpoint: POST /api/auth/login
// Window: 15 minutes
// Max requests: 5
// Resets: After 15 minutes
```

---

### 3. **Check Registration Endpoint** (`POST /api/auth/check-registration`)
- **Limit**: 10 requests per 15 minutes per IP
- **Purpose**: Prevent account enumeration attacks
- **Status Code**: 429
- **Message**: "Too many registration checks from this IP. Please try again after 15 minutes."

**Why this limit?**
- Allows users to check a few registration numbers
- Prevents automated scanning of valid registration numbers
- Protects user privacy

```javascript
// Endpoint: POST /api/auth/check-registration
// Window: 15 minutes
// Max requests: 10
// Resets: After 15 minutes
```

---

### 4. **Session Validation Endpoint** (`POST /api/auth/validate-session`)
- **Limit**: 100 requests per minute per IP
- **Purpose**: Allow frequent polling without blocking legitimate users
- **Status Code**: 429
- **Message**: "Too many session validation requests. Please slow down."

**Why so generous?**
- Frontend polls every 60 seconds
- With 100 concurrent users per IP, allows smooth operation
- Only counts failed validations (successful ones are skipped)

```javascript
// Endpoint: POST /api/auth/validate-session
// Window: 1 minute
// Max requests: 100
// Resets: Every minute
// Skip successful: true (only failed requests count)
```

---

### 5. **Logout Endpoint** (`POST /api/auth/logout`)
- **Limit**: 20 requests per 15 minutes per IP
- **Purpose**: Prevent abuse while allowing legitimate logouts
- **Status Code**: 429
- **Message**: "Too many logout requests. Please try again later."

```javascript
// Endpoint: POST /api/auth/logout
// Window: 15 minutes
// Max requests: 20
// Resets: After 15 minutes
```

---

### 6. **Admin Endpoints** (`/api/admin/*`)
- **Limit**: 100 requests per 15 minutes per IP
- **Purpose**: Protect admin panel from abuse
- **Status Code**: 429
- **Message**: "Too many admin requests from this IP. Please try again after 15 minutes."

**Protected endpoints:**
- `POST /api/admin/add-student`
- `POST /api/admin/bulk-add-students`
- `GET /api/admin/students`
- `GET /api/admin/student/:regNumber`
- `DELETE /api/admin/student/:regNumber`
- `PUT /api/admin/toggle-allowed/:regNumber`
- `PUT /api/admin/toggle-activated/:regNumber`
- `POST /api/admin/invalidate-session/:regNumber`

```javascript
// Endpoints: All /api/admin/* routes
// Window: 15 minutes
// Max requests: 100
// Resets: After 15 minutes
```

---

## Response Format

When rate limit is exceeded, the API returns:

```json
{
  "error": "Too Many Requests",
  "message": "You have exceeded the rate limit. Please try again later.",
  "retryAfter": "2025-10-21T14:45:00.000Z"
}
```

**Response Headers:**
```
RateLimit-Limit: 5
RateLimit-Remaining: 0
RateLimit-Reset: 1729521900
```

---

## How It Works

### Request Flow:
```
1. Request arrives at server
   ↓
2. Global rate limiter checks IP
   ↓ (if within limit)
3. Endpoint-specific rate limiter checks IP
   ↓ (if within limit)
4. Request processed normally
   ↓
5. Response sent

If rate limit exceeded at any step:
   ↓
6. 429 response with error message
```

### Rate Limit Tracking:
- Uses **in-memory store** (default)
- Tracks by **IP address**
- Resets automatically after window expires
- Does NOT persist across server restarts

---

## Production Considerations

### For High-Traffic Scenarios (1000+ users):

**Option 1: Use Redis Store** (Recommended for production)
```javascript
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const loginLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:login:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 5
});
```

**Benefits:**
- Shared across multiple server instances
- Persists across server restarts
- Better performance at scale

---

**Option 2: Adjust Limits**

If using in-memory store, you can increase limits:

```javascript
// In .env file
RATE_LIMIT_VALIDATION_MAX=200  // Increase session validation limit
RATE_LIMIT_LOGIN_MAX=10        // Increase login attempts
```

---

## Testing Rate Limits

### Manual Testing:

```bash
# Test login rate limit (should fail after 5 attempts)
for i in {1..10}; do
  curl -X POST http://localhost:3001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"registrationNumber":"GOU/U23/CSC/1234"}' \
    && echo "Request $i: Success" \
    || echo "Request $i: Rate limited"
done
```

### Expected Output:
```
Request 1: Success
Request 2: Success
Request 3: Success
Request 4: Success
Request 5: Success
Request 6: Rate limited (429)
Request 7: Rate limited (429)
...
```

---

## Bypassing Rate Limits (Development Only)

To disable rate limiting during development:

### Method 1: Environment Variable
```bash
# In .env
DISABLE_RATE_LIMIT=true
```

### Method 2: Conditional Application
```javascript
// In server.js
if (process.env.NODE_ENV !== 'development') {
  app.use(globalLimiter);
}
```

⚠️ **WARNING**: Never disable rate limiting in production!

---

## Monitoring Rate Limits

### Log Rate Limit Hits:
```javascript
const loginLimiter = rateLimit({
  // ... config
  onLimitReached: (req, res, options) => {
    console.warn(`⚠️ Rate limit reached for IP: ${req.ip} on ${req.path}`);
  }
});
```

### Recommended Monitoring:
- Track 429 responses in logs
- Alert on excessive 429s (possible attack)
- Monitor rate limit patterns by endpoint

---

## Security Best Practices

✅ **Implemented:**
- Different limits for different endpoints
- Strict limits on authentication endpoints
- Generous limits on validation (polling)
- Global safety net

✅ **Recommended:**
- Use Redis store in production
- Monitor 429 responses
- Adjust limits based on usage patterns
- Consider IP whitelisting for trusted sources

⚠️ **Not Implemented (Future):**
- Account-based rate limiting (currently IP-based only)
- Dynamic rate limit adjustment
- Rate limit bypass for specific API keys

---

## File Structure

```
backend-api/
├── src/
│   ├── middleware/
│   │   └── rateLimiter.js          # Rate limit configurations
│   ├── routes/
│   │   ├── auth.js                 # Auth routes with rate limiters
│   │   └── admin.js                # Admin routes with rate limiter
│   └── server.js                   # Global rate limiter applied
└── RATE_LIMITING.md                # This file
```

---

## Troubleshooting

### Issue: "Too many requests" even with few attempts
**Cause**: Multiple users behind the same IP (NAT, proxy, VPN)
**Solution**:
- Increase limits for that specific endpoint
- Consider using account-based limiting instead

### Issue: Rate limits not working
**Cause**: Middleware not applied correctly
**Solution**:
- Check middleware order in server.js
- Ensure rate limiter is imported and applied

### Issue: Limits resetting unexpectedly
**Cause**: Server restart (in-memory store)
**Solution**:
- Use Redis store for persistence
- Accept that dev server restarts reset limits

---

## Summary

Rate limiting is now active on all GoHub Backend API endpoints with the following hierarchy:

1. **Global Limit**: 1000 req/15min (all endpoints)
2. **Endpoint-Specific Limits**:
   - Login: 5 req/15min
   - Check Registration: 10 req/15min
   - Session Validation: 100 req/minute
   - Logout: 20 req/15min
   - Admin: 100 req/15min

This configuration balances security with usability, protecting against attacks while allowing legitimate use.
