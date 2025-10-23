const mongoose = require('mongoose');

/**
 * Student Schema for GoHub App
 * Manages student authentication and session tracking
 */
const StudentSchema = new mongoose.Schema({
  // Student Information
  registrationNumber: { 
    type: String, 
    required: [true, 'Registration number is required'],
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },
  name: { 
    type: String, 
    required: [true, 'Student name is required'],
    trim: true
  },
  
  // Access Control
  isAllowed: {
    type: Boolean,
    default: false,
    index: true
  },
  isActivated: {
    type: Boolean,
    default: false
  },

  // Password Authentication
  password: {
    type: String,
    default: null,
    select: false // Don't return password in queries by default
  },
  passwordSetAt: {
    type: Date,
    default: null
  },
  isPasswordRequired: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // Session Management (Single Session Enforcement)
  activeSessionId: {
    type: String,
    default: null
  },
  activeSessionToken: {
    type: String,
    default: null
  },
  deviceId: {
    type: String,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
  },
  
  // Metadata
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

/**
 * Pre-save middleware to update timestamps
 */
StudentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * Instance method to check if student has an active session
 * @returns {boolean}
 */
StudentSchema.methods.hasActiveSession = function() {
  return !!(this.activeSessionId && this.activeSessionToken);
};

/**
 * Instance method to invalidate current session
 */
StudentSchema.methods.invalidateSession = function() {
  this.activeSessionId = null;
  this.activeSessionToken = null;
  return this.save();
};

/**
 * Instance method to check if password is set
 * @returns {boolean}
 */
StudentSchema.methods.hasPassword = function() {
  return !!(this.password && this.passwordSetAt);
};

/**
 * Instance method to check if onboarding is needed
 * Student needs onboarding if activated but no password set
 * @returns {boolean}
 */
StudentSchema.methods.needsOnboarding = function() {
  return this.isActivated && !this.hasPassword();
};

/**
 * Static method to find student by registration number
 * @param {string} regNumber - Registration number
 * @returns {Promise<Student>}
 */
StudentSchema.statics.findByRegNumber = function(regNumber) {
  return this.findOne({ 
    registrationNumber: regNumber.toUpperCase().trim() 
  });
};

/**
 * Static method to find students by allowed status
 * @param {boolean} isAllowed - Allowed status
 * @returns {Promise<Student[]>}
 */
StudentSchema.statics.findByAllowedStatus = function(isAllowed) {
  return this.find({ isAllowed }).sort({ registrationNumber: 1 });
};

// Create and export the model
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;

