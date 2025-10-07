const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { generateSessionId, generateToken, verifyToken } = require('../utils/tokenUtils');

/**
 * POST /api/auth/check-registration
 * Check if registration number exists and is allowed
 */
router.post('/check-registration', async (req, res) => {
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
      registrationNumber: student.registrationNumber
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
router.post('/login', async (req, res) => {
  try {
    const { registrationNumber, deviceId } = req.body;
    
    if (!registrationNumber) {
      return res.status(400).json({ 
        success: false,
        message: 'Registration number is required' 
      });
    }
    
    const student = await Student.findByRegNumber(registrationNumber);
    
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
      user: {
        id: student._id,
        name: student.name,
        registrationNumber: student.registrationNumber,
        isActivated: student.isActivated,
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
router.post('/validate-session', async (req, res) => {
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
router.post('/logout', async (req, res) => {
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

module.exports = router;

