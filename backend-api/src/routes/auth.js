const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { generateSessionId, generateToken, verifyToken } = require('../utils/tokenUtils');
const { comparePassword, hashPassword, validatePasswordStrength } = require('../utils/passwordUtils');
const {
  loginLimiter,
  checkRegistrationLimiter,
  sessionValidationLimiter,
  logoutLimiter
} = require('../middleware/rateLimiter');

/**
 * POST /api/auth/check-registration
 * Check if registration number exists and is allowed
 */
router.post('/check-registration', checkRegistrationLimiter, async (req, res) => {
  try {
    const { registrationNumber } = req.body;
    
    if (!registrationNumber) {
      return res.status(400).json({ 
        allowed: false, 
        message: 'Registration number is required' 
      });
    }
    
    const student = await Student.findByRegNumber(registrationNumber);
    
    if (!student) {
      return res.status(404).json({ 
        allowed: false, 
        message: 'Registration number not found' 
      });
    }
    
    if (!student.isAllowed) {
      return res.status(403).json({ 
        allowed: false, 
        message: 'This registration number is not authorized' 
      });
    }
    
    res.json({
      allowed: true,
      name: student.name,
      isActivated: student.isActivated,
      registrationNumber: student.registrationNumber,
      isPasswordRequired: student.isPasswordRequired,
      needsOnboarding: student.needsOnboarding()
    });
    
  } catch (error) {
    console.error('❌ Check registration error:', error);
    res.status(500).json({ 
      allowed: false,
      message: 'Server error. Please try again later.' 
    });
  }
});

/**
 * POST /api/auth/login
 * Login with registration number
 * Creates new session and invalidates any existing session
 */
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { registrationNumber, password, deviceId } = req.body;

    if (!registrationNumber) {
      return res.status(400).json({
        success: false,
        message: 'Registration number is required'
      });
    }

    // Find student and explicitly select password field
    const student = await Student.findOne({
      registrationNumber: registrationNumber.toUpperCase().trim()
    }).select('+password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Registration number not found'
      });
    }

    if (!student.isAllowed) {
      return res.status(403).json({
        success: false,
        message: 'Registration number not authorized. Please contact administration.'
      });
    }

    // Check if password is required
    if (student.isPasswordRequired) {
      // Password authentication required
      if (!password) {
        return res.status(400).json({
          success: false,
          message: 'Password is required',
          requiresPassword: true
        });
      }

      // Verify password
      const isPasswordValid = await comparePassword(password, student.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid password'
        });
      }

      console.log(`🔐 Password verified for: ${student.registrationNumber}`);
    } else {
      // No password required yet (legacy mode or onboarding pending)
      console.log(`📝 No password required for: ${student.registrationNumber}`);
    }

    // Generate new session (this automatically invalidates old session)
    const newSessionId = generateSessionId();
    const newToken = generateToken(student._id.toString(), newSessionId);

    // Update student record - kicks out any other device
    student.activeSessionId = newSessionId;
    student.activeSessionToken = newToken;
    student.deviceId = deviceId || 'unknown';
    student.lastLogin = new Date();
    await student.save();

    console.log(`✅ Login successful: ${student.registrationNumber} (${student.name})`);

    res.json({
      success: true,
      message: 'Login successful',
      token: newToken,
      sessionId: newSessionId,
      needsOnboarding: student.needsOnboarding(),
      user: {
        id: student._id,
        name: student.name,
        registrationNumber: student.registrationNumber,
        isActivated: student.isActivated,
        isPasswordRequired: student.isPasswordRequired,
        deviceId: student.deviceId,
        lastLogin: student.lastLogin
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again later.'
    });
  }
});

/**
 * POST /api/auth/validate-session
 * Validate if session is still active
 * Checks if token matches the active session in database
 */
router.post('/validate-session', sessionValidationLimiter, async (req, res) => {
  try {
    const { token, sessionId } = req.body;
    
    if (!token || !sessionId) {
      return res.json({ 
        isValid: false, 
        reason: 'missing_credentials' 
      });
    }
    
    // Verify JWT
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.json({ 
        isValid: false, 
        reason: 'token_expired' 
      });
    }
    
    // Find student with this active session
    const student = await Student.findOne({ 
      _id: decoded.studentId,
      activeSessionToken: token,
      activeSessionId: sessionId
    });
    
    if (!student) {
      return res.json({ 
        isValid: false, 
        reason: 'session_invalidated_by_new_login' 
      });
    }
    
    if (!student.isAllowed) {
      return res.json({ 
        isValid: false, 
        reason: 'account_disabled' 
      });
    }
    
    res.json({ 
      isValid: true,
      user: {
        id: student._id,
        name: student.name,
        registrationNumber: student.registrationNumber,
        isActivated: student.isActivated,
        lastLogin: student.lastLogin
      }
    });
    
  } catch (error) {
    console.error('❌ Validate session error:', error);
    res.status(500).json({ 
      isValid: false, 
      reason: 'server_error' 
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout current session
 */
router.post('/logout', logoutLimiter, async (req, res) => {
  try {
    const { token, sessionId } = req.body;
    
    if (!token) {
      return res.json({ 
        success: true,
        message: 'Already logged out' 
      });
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.json({ 
        success: true,
        message: 'Session already expired' 
      });
    }
    
    const student = await Student.findOne({ 
      _id: decoded.studentId,
      activeSessionId: sessionId
    });
    
    if (student) {
      await student.invalidateSession();
      console.log(`👋 Logout successful: ${student.registrationNumber}`);
    }
    
    res.json({ 
      success: true,
      message: 'Logout successful' 
    });
    
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Logout failed' 
    });
  }
});

/**
 * POST /api/auth/set-password
 * Set password for first-time onboarding
 * Can only be used once - when student has no password yet
 * Note: Uses checkRegistrationLimiter (20/15min) instead of loginLimiter (5/15min) for testing
 */
router.post('/set-password', checkRegistrationLimiter, async (req, res) => {
  try {
    const { registrationNumber, password, confirmPassword, token, sessionId } = req.body;

    // Validate input
    if (!registrationNumber || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Registration number, password, and password confirmation are required'
      });
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Validate password strength
    const validation = validatePasswordStrength(password);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet requirements',
        errors: validation.errors
      });
    }

    // Verify session if provided (ensures user is logged in)
    if (token && sessionId) {
      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired session'
        });
      }
    }

    // Find student and select password field
    const student = await Student.findOne({
      registrationNumber: registrationNumber.toUpperCase().trim()
    }).select('+password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Registration number not found'
      });
    }

    if (!student.isAllowed) {
      return res.status(403).json({
        success: false,
        message: 'Registration number not authorized'
      });
    }

    if (!student.isActivated) {
      return res.status(403).json({
        success: false,
        message: 'Account not activated yet. Please wait for admin approval.'
      });
    }

    // Check if password already set
    if (student.password) {
      return res.status(400).json({
        success: false,
        message: 'Password already set. Use password reset if you need to change it.'
      });
    }

    // Hash and save password
    const hashedPassword = await hashPassword(password);
    student.password = hashedPassword;
    student.passwordSetAt = new Date();
    student.isPasswordRequired = true;
    await student.save();

    console.log(`🔐 Password set for: ${student.registrationNumber} (${student.name})`);

    res.json({
      success: true,
      message: 'Password created successfully. You can now log in with your password.',
      user: {
        id: student._id,
        name: student.name,
        registrationNumber: student.registrationNumber,
        isPasswordRequired: true
      }
    });

  } catch (error) {
    console.error('❌ Set password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set password. Please try again later.'
    });
  }
});

module.exports = router;

