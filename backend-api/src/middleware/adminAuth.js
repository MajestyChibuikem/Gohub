/**
 * Admin Authentication Middleware
 * Protects admin routes by checking for admin key in headers
 */

const adminAuth = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  const expectedAdminKey = process.env.ADMIN_KEY;
  
  if (!expectedAdminKey) {
    console.error('⚠️ WARNING: ADMIN_KEY not set in environment variables!');
    return res.status(500).json({ 
      error: 'Server configuration error' 
    });
  }
  
  if (!adminKey) {
    console.warn('🚫 Admin access attempt without key');
    return res.status(401).json({ 
      error: 'Admin key required',
      message: 'Please provide x-admin-key header' 
    });
  }
  
  if (adminKey !== expectedAdminKey) {
    console.warn('🚫 Admin access attempt with invalid key');
    return res.status(401).json({ 
      error: 'Invalid admin key',
      message: 'Unauthorized access' 
    });
  }
  
  console.log('✅ Admin authenticated');
  next();
};

module.exports = adminAuth;

