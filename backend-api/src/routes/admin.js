const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const adminAuth = require('../middleware/adminAuth');
const { adminLimiter } = require('../middleware/rateLimiter');

// Apply admin authentication and rate limiting to all routes in this router
router.use(adminAuth);
router.use(adminLimiter);

/**
 * POST /api/admin/add-student
 * Add a new student registration number
 */
router.post('/add-student', async (req, res) => {
  try {
    const { registrationNumber, name, isAllowed, isActivated } = req.body;
    
    if (!registrationNumber || !name) {
      return res.status(400).json({ 
        error: 'Registration number and name are required' 
      });
    }
    
    // Check if student already exists
    const existingStudent = await Student.findByRegNumber(registrationNumber);
    if (existingStudent) {
      return res.status(400).json({ 
        error: 'Registration number already exists',
        student: {
          registrationNumber: existingStudent.registrationNumber,
          name: existingStudent.name,
          isAllowed: existingStudent.isAllowed
        }
      });
    }
    
    const student = new Student({
      registrationNumber: registrationNumber.toUpperCase().trim(),
      name: name.trim(),
      isAllowed: isAllowed || false,
      isActivated: isActivated || false
    });
    
    await student.save();
    
    console.log(`➕ Student added: ${student.registrationNumber} (${student.name})`);
    
    res.status(201).json({ 
      success: true,
      message: 'Student added successfully',
      student: {
        id: student._id,
        registrationNumber: student.registrationNumber,
        name: student.name,
        isAllowed: student.isAllowed,
        isActivated: student.isActivated,
        createdAt: student.createdAt
      }
    });
    
  } catch (error) {
    console.error('❌ Add student error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Registration number already exists' 
      });
    }
    res.status(500).json({ 
      error: 'Failed to add student',
      message: error.message 
    });
  }
});

/**
 * POST /api/admin/bulk-add-students
 * Add multiple students at once
 */
router.post('/bulk-add-students', async (req, res) => {
  try {
    const { students } = req.body;
    
    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ 
        error: 'Students array is required and must not be empty' 
      });
    }
    
    const results = {
      success: [],
      failed: []
    };
    
    for (const studentData of students) {
      try {
        const { registrationNumber, name, isAllowed, isActivated } = studentData;
        
        if (!registrationNumber || !name) {
          results.failed.push({
            data: studentData,
            reason: 'Missing registration number or name'
          });
          continue;
        }
        
        // Check if student already exists
        const existingStudent = await Student.findByRegNumber(registrationNumber);
        if (existingStudent) {
          results.failed.push({
            data: studentData,
            reason: 'Registration number already exists'
          });
          continue;
        }
        
        const student = new Student({
          registrationNumber: registrationNumber.toUpperCase().trim(),
          name: name.trim(),
          isAllowed: isAllowed || false,
          isActivated: isActivated || false
        });
        
        await student.save();
        results.success.push(student.registrationNumber);
        
      } catch (error) {
        results.failed.push({
          data: studentData,
          reason: error.message
        });
      }
    }
    
    console.log(`➕ Bulk add completed: ${results.success.length} succeeded, ${results.failed.length} failed`);
    
    res.json({ 
      success: true,
      message: `Added ${results.success.length} students`,
      results
    });
    
  } catch (error) {
    console.error('❌ Bulk add error:', error);
    res.status(500).json({ 
      error: 'Bulk add failed',
      message: error.message 
    });
  }
});

/**
 * PUT /api/admin/toggle-allowed/:regNumber
 * Toggle isAllowed status for a student
 */
router.put('/toggle-allowed/:regNumber', async (req, res) => {
  try {
    const student = await Student.findByRegNumber(req.params.regNumber);
    
    if (!student) {
      return res.status(404).json({ 
        error: 'Student not found' 
      });
    }
    
    student.isAllowed = !student.isAllowed;
    
    // If disabling, also invalidate their session
    if (!student.isAllowed) {
      await student.invalidateSession();
      console.log(`🔒 Student disabled and session invalidated: ${student.registrationNumber}`);
    } else {
      console.log(`✅ Student enabled: ${student.registrationNumber}`);
    }
    
    await student.save();
    
    res.json({ 
      success: true,
      message: `Student ${student.isAllowed ? 'enabled' : 'disabled'}`,
      isAllowed: student.isAllowed,
      student: {
        registrationNumber: student.registrationNumber,
        name: student.name,
        isAllowed: student.isAllowed,
        isActivated: student.isActivated
      }
    });
    
  } catch (error) {
    console.error('❌ Toggle allowed error:', error);
    res.status(500).json({ 
      error: 'Failed to update status',
      message: error.message 
    });
  }
});

/**
 * PUT /api/admin/toggle-activated/:regNumber
 * Toggle isActivated status for a student
 */
router.put('/toggle-activated/:regNumber', async (req, res) => {
  try {
    const student = await Student.findByRegNumber(req.params.regNumber);
    
    if (!student) {
      return res.status(404).json({ 
        error: 'Student not found' 
      });
    }
    
    student.isActivated = !student.isActivated;
    await student.save();
    
    console.log(`🔄 Student activation toggled: ${student.registrationNumber} -> ${student.isActivated}`);
    
    res.json({ 
      success: true,
      message: `Student ${student.isActivated ? 'activated' : 'deactivated'}`,
      isActivated: student.isActivated,
      student: {
        registrationNumber: student.registrationNumber,
        name: student.name,
        isAllowed: student.isAllowed,
        isActivated: student.isActivated
      }
    });
    
  } catch (error) {
    console.error('❌ Toggle activated error:', error);
    res.status(500).json({ 
      error: 'Failed to update activation status',
      message: error.message 
    });
  }
});

/**
 * GET /api/admin/students
 * Get all students (with optional filters)
 */
router.get('/students', async (req, res) => {
  try {
    const { isAllowed, isActivated, search } = req.query;
    
    let query = {};
    
    // Apply filters
    if (isAllowed !== undefined) {
      query.isAllowed = isAllowed === 'true';
    }
    
    if (isActivated !== undefined) {
      query.isActivated = isActivated === 'true';
    }
    
    // Search by registration number or name
    if (search) {
      query.$or = [
        { registrationNumber: new RegExp(search, 'i') },
        { name: new RegExp(search, 'i') }
      ];
    }
    
    const students = await Student.find(query)
      .select('-activeSessionToken') // Don't send token to frontend
      .sort({ registrationNumber: 1 });
    
    res.json({ 
      success: true,
      count: students.length,
      students: students.map(s => ({
        id: s._id,
        registrationNumber: s.registrationNumber,
        name: s.name,
        isAllowed: s.isAllowed,
        isActivated: s.isActivated,
        hasActiveSession: s.hasActiveSession(),
        deviceId: s.deviceId,
        lastLogin: s.lastLogin,
        createdAt: s.createdAt
      }))
    });
    
  } catch (error) {
    console.error('❌ Get students error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch students',
      message: error.message 
    });
  }
});

/**
 * GET /api/admin/student/:regNumber
 * Get a specific student's details
 */
router.get('/student/:regNumber', async (req, res) => {
  try {
    const student = await Student.findByRegNumber(req.params.regNumber);
    
    if (!student) {
      return res.status(404).json({ 
        error: 'Student not found' 
      });
    }
    
    res.json({ 
      success: true,
      student: {
        id: student._id,
        registrationNumber: student.registrationNumber,
        name: student.name,
        isAllowed: student.isAllowed,
        isActivated: student.isActivated,
        hasActiveSession: student.hasActiveSession(),
        activeSessionId: student.activeSessionId,
        deviceId: student.deviceId,
        lastLogin: student.lastLogin,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt
      }
    });
    
  } catch (error) {
    console.error('❌ Get student error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch student',
      message: error.message 
    });
  }
});

/**
 * DELETE /api/admin/student/:regNumber
 * Delete a student
 */
router.delete('/student/:regNumber', async (req, res) => {
  try {
    const student = await Student.findByRegNumber(req.params.regNumber);
    
    if (!student) {
      return res.status(404).json({ 
        error: 'Student not found' 
      });
    }
    
    await student.deleteOne();
    
    console.log(`🗑️ Student deleted: ${student.registrationNumber} (${student.name})`);
    
    res.json({ 
      success: true,
      message: 'Student deleted successfully',
      deletedStudent: {
        registrationNumber: student.registrationNumber,
        name: student.name
      }
    });
    
  } catch (error) {
    console.error('❌ Delete student error:', error);
    res.status(500).json({ 
      error: 'Failed to delete student',
      message: error.message 
    });
  }
});

/**
 * POST /api/admin/invalidate-session/:regNumber
 * Manually invalidate a student's session (logout them)
 */
router.post('/invalidate-session/:regNumber', async (req, res) => {
  try {
    const student = await Student.findByRegNumber(req.params.regNumber);
    
    if (!student) {
      return res.status(404).json({ 
        error: 'Student not found' 
      });
    }
    
    await student.invalidateSession();
    
    console.log(`🔓 Session invalidated for: ${student.registrationNumber}`);
    
    res.json({ 
      success: true,
      message: 'Session invalidated successfully',
      student: {
        registrationNumber: student.registrationNumber,
        name: student.name
      }
    });
    
  } catch (error) {
    console.error('❌ Invalidate session error:', error);
    res.status(500).json({ 
      error: 'Failed to invalidate session',
      message: error.message 
    });
  }
});

module.exports = router;

