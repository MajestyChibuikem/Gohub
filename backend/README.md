# Gohub Backend API

Backend server for Gohub Catholic Prayer & Hymn App with authentication, device binding, and user management.

## 🏗️ Architecture

- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based with device binding
- **Security**: Password hashing, rate limiting, CORS protection

## 🚀 Features

### **Authentication System**
- User registration with approved registration number validation
- Secure login with device binding (one device per user)
- JWT token management (access + refresh tokens)
- Automatic logout of previous devices

### **Device Management**
- **Device Binding**: Each user can only be active on one device
- **Automatic Logout**: Previous device logged out when new device logs in
- **Device Logging**: Audit trail of all device activities
- **Session Management**: Secure session handling

### **Security Features**
- **Password Hashing**: Bcrypt encryption
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Sanitize and validate all inputs
- **CORS Protection**: Configured for mobile app access

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database models and configuration
│   ├── models/              # Database models (auto-generated)
│   ├── schemas/             # API request/response schemas
│   ├── routes/              # API endpoints
│   │   ├── auth.py          # Authentication routes
│   │   ├── users.py         # User management routes
│   │   └── admin.py         # Admin routes
│   ├── services/            # Business logic
│   │   └── auth_service.py  # Authentication service
│   ├── middleware/          # Custom middleware
│   │   └── rate_limiter.py  # Rate limiting
│   └── utils/               # Utility functions
│       ├── config.py        # Configuration settings
│       └── security.py      # Security utilities
├── requirements.txt          # Python dependencies
└── README.md                # This file
```

## 🛠️ Setup Instructions

### **Prerequisites**
- Python 3.8+
- PostgreSQL database
- pip (Python package manager)

### **1. Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

### **2. Environment Configuration**
Create a `.env` file in the backend directory:
```env
# Database
DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/gohub

# Security
SECRET_KEY=your-super-secret-key-change-in-production

# Server
DEBUG=False
HOST=0.0.0.0
PORT=8000
```

### **3. Database Setup**
```bash
# Create PostgreSQL database
createdb gohub

# Or use psql
psql -U postgres
CREATE DATABASE gohub;
```

### **4. Run the Server**
```bash
# Development mode
python -m app.main

# Or using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🌐 API Endpoints

### **Authentication**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/validate` - Validate token

### **Users**
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile

### **Admin**
- `GET /api/v1/admin/users` - Get all users
- `POST /api/v1/admin/approve-registration` - Approve registration

### **System**
- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation

## 🔐 Authentication Flow

### **1. User Registration**
```
User submits registration → Check approved list → Create account → Return tokens
```

### **2. User Login**
```
User submits credentials → Verify password → Check device binding → Create session → Return tokens
```

### **3. Device Binding**
```
New device login → Check current device → Logout previous device → Create new session
```

## 🗄️ Database Schema

### **Tables**
- **approved_registrations**: Your compiled list of paid registration numbers
- **users**: User accounts with device binding
- **user_sessions**: Active sessions and device tracking
- **device_logs**: Audit trail of device activities

### **Key Relationships**
- Each user must have an approved registration number
- Each user can have only one active session
- Device changes are logged for security

## 🚀 Deployment

### **Railway.app (Recommended)**
1. **Install Railway CLI**: `npm install -g @railway/cli`
2. **Login**: `railway login`
3. **Initialize**: `railway init`
4. **Deploy**: `railway up`

### **Environment Variables for Production**
```env
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🧪 Testing

### **Run Tests**
```bash
pytest
```

### **API Testing**
- **Interactive Docs**: Visit `/docs` when server is running
- **Health Check**: Test `/health` endpoint
- **Postman/Insomnia**: Import OpenAPI spec from `/docs`

## 🔒 Security Features

### **Password Security**
- Bcrypt hashing with salt
- Password strength validation
- Secure token generation

### **API Security**
- Rate limiting (60 requests/minute, 1000/hour)
- Input sanitization
- CORS protection
- JWT token validation

### **Device Security**
- One device per user
- Automatic session invalidation
- Device activity logging

## 📊 Monitoring

### **Health Checks**
- Database connectivity
- API response times
- Error rates

### **Logging**
- Device login/logout events
- Authentication attempts
- API usage patterns

## 🔄 Future Enhancements

### **Planned Features**
- **Push Notifications**: Device change alerts
- **Analytics Dashboard**: User activity insights
- **Admin Panel**: User management interface
- **Backup System**: Automated database backups

### **Scalability**
- **Load Balancing**: Multiple server instances
- **Caching**: Redis for session storage
- **CDN**: Static content delivery
- **Monitoring**: Advanced metrics and alerts

## 🆘 Troubleshooting

### **Common Issues**
1. **Database Connection**: Check DATABASE_URL and PostgreSQL status
2. **Port Conflicts**: Ensure port 8000 is available
3. **Dependencies**: Verify all packages are installed
4. **Environment**: Check .env file configuration

### **Logs**
- Check console output for error messages
- Review database connection logs
- Monitor rate limiting alerts

## 📞 Support

For backend issues or questions:
- **Developer**: Majesty Chibuikem
- **Email**: gohubdevelopment@gmail.com
- **Documentation**: Check `/docs` endpoint when server is running

---

**Gohub Backend** - Secure, scalable authentication system for Catholic prayer and hymn app.
