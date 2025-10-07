require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'GoHub Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      admin: '/api/admin'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Serve admin panel (if built)
app.use('/admin', express.static('admin-panel'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: {
      auth: [
        'POST /api/auth/check-registration',
        'POST /api/auth/login',
        'POST /api/auth/validate-session',
        'POST /api/auth/logout'
      ],
      admin: [
        'POST /api/admin/add-student',
        'POST /api/admin/bulk-add-students',
        'PUT /api/admin/toggle-allowed/:regNumber',
        'PUT /api/admin/toggle-activated/:regNumber',
        'GET /api/admin/students',
        'GET /api/admin/student/:regNumber',
        'DELETE /api/admin/student/:regNumber',
        'POST /api/admin/invalidate-session/:regNumber'
      ]
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log('\n🚀 ====================================');
      console.log(`🚀 GoHub Backend API Server Started`);
      console.log(`🚀 ====================================`);
      console.log(`📡 Server running on port ${PORT}`);
      console.log(`🌐 API: http://localhost:${PORT}`);
      console.log(`👨‍💼 Admin Panel: http://localhost:${PORT}/admin`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🚀 ====================================\n`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;

