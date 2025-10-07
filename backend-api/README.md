# GoHub Backend API

Backend API for the GoHub Catholic Prayer & Hymn App. Handles student authentication, session management, and admin control.

## 🎯 Features

- **Registration Number Authentication**: Students login with registration number only (no passwords)
- **Single Session Enforcement**: New login automatically invalidates previous session
- **Admin Control**: Admins manage which students can access the app
- **Session Validation**: Real-time session validation with backend
- **Admin Panel**: Beautiful web interface for managing students

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend-api
npm install
```

### 2. Configure Environment Variables

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```env
PORT=3000
NODE_ENV=development

# MongoDB (use MongoDB Atlas for cloud database)
MONGODB_URI=mongodb://localhost:27017/gohub

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=30d

# Admin Key (change this in production!)
ADMIN_KEY=your-admin-key-change-this-in-production

# CORS
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:19006,https://gohub-alpha.vercel.app
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on: `http://localhost:3000`

## 📚 API Endpoints

### Authentication Endpoints

#### Check Registration
```http
POST /api/auth/check-registration
Content-Type: application/json

{
  "registrationNumber": "CS/2020/001"
}
```

**Response:**
```json
{
  "allowed": true,
  "name": "John Doe",
  "isActivated": true,
  "registrationNumber": "CS/2020/001"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "registrationNumber": "CS/2020/001",
  "deviceId": "device_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "sessionId": "session_xyz789",
  "user": {
    "id": "607f1f77bcf86cd799439011",
    "name": "John Doe",
    "registrationNumber": "CS/2020/001",
    "isActivated": true,
    "deviceId": "device_abc123",
    "lastLogin": "2025-10-07T10:30:00.000Z"
  }
}
```

#### Validate Session
```http
POST /api/auth/validate-session
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "sessionId": "session_xyz789"
}
```

**Response (Valid):**
```json
{
  "isValid": true,
  "user": {
    "id": "607f1f77bcf86cd799439011",
    "name": "John Doe",
    "registrationNumber": "CS/2020/001",
    "isActivated": true,
    "lastLogin": "2025-10-07T10:30:00.000Z"
  }
}
```

**Response (Invalid):**
```json
{
  "isValid": false,
  "reason": "session_invalidated_by_new_login"
}
```

#### Logout
```http
POST /api/auth/logout
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "sessionId": "session_xyz789"
}
```

### Admin Endpoints

All admin endpoints require the `x-admin-key` header.

#### Add Student
```http
POST /api/admin/add-student
x-admin-key: your-admin-key
Content-Type: application/json

{
  "registrationNumber": "CS/2020/001",
  "name": "John Doe",
  "isAllowed": true,
  "isActivated": false
}
```

#### Get All Students
```http
GET /api/admin/students
x-admin-key: your-admin-key
```

#### Toggle Student Access
```http
PUT /api/admin/toggle-allowed/CS/2020/001
x-admin-key: your-admin-key
```

#### Toggle Student Activation
```http
PUT /api/admin/toggle-activated/CS/2020/001
x-admin-key: your-admin-key
```

#### Delete Student
```http
DELETE /api/admin/student/CS/2020/001
x-admin-key: your-admin-key
```

#### Invalidate Session (Force Logout)
```http
POST /api/admin/invalidate-session/CS/2020/001
x-admin-key: your-admin-key
```

## 🎨 Admin Panel

Access the admin panel at: `http://localhost:3000/admin`

**Features:**
- Add new students
- Enable/disable access
- Activate/deactivate accounts
- View all students
- Search and filter students
- Force logout users
- Delete students
- Real-time statistics

## 🗄️ Database Schema

### Student Model

```javascript
{
  registrationNumber: String,  // Unique, uppercase, indexed
  name: String,
  isAllowed: Boolean,         // Admin controls access
  isActivated: Boolean,       // Account activation status
  activeSessionId: String,    // Current session ID
  activeSessionToken: String, // Current JWT token
  deviceId: String,           // Last login device
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Single Session Enforcement

The backend ensures only ONE active session per student:

1. When a student logs in on Device A, they get a session token
2. If they login on Device B, the backend creates a NEW session
3. Device A's session becomes invalid immediately
4. Next validation check on Device A fails → auto-logout

## 🚀 Deployment

### Option 1: Railway.app (Recommended)

1. Create account on [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard
4. Deploy!

### Option 2: Render.com

1. Create account on [Render.com](https://render.com)
2. Create new Web Service
3. Connect repository
4. Add environment variables
5. Deploy!

### Option 3: Vercel (For API Routes)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts

### MongoDB Atlas (Cloud Database)

1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 📁 Project Structure

```
backend-api/
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── models/
│   │   └── Student.js        # Student schema & model
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── admin.js          # Admin routes
│   ├── middleware/
│   │   └── adminAuth.js      # Admin authentication
│   ├── utils/
│   │   └── tokenUtils.js     # JWT utilities
│   └── server.js             # Main server file
├── admin-panel/
│   └── index.html            # Admin web interface
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🧪 Testing

### Test with curl

**Check Registration:**
```bash
curl -X POST http://localhost:3000/api/auth/check-registration \
  -H "Content-Type: application/json" \
  -d '{"registrationNumber":"CS/2020/001"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"registrationNumber":"CS/2020/001","deviceId":"test-device"}'
```

**Add Student (Admin):**
```bash
curl -X POST http://localhost:3000/api/admin/add-student \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your-admin-key" \
  -d '{"registrationNumber":"CS/2020/001","name":"John Doe","isAllowed":true}'
```

## 🔧 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongod --version`
- Verify `MONGODB_URI` in `.env`
- For Atlas, check network access settings

### Admin Panel Not Loading
- Ensure server is running
- Check browser console for errors
- Verify admin key is set

### CORS Errors
- Update `ALLOWED_ORIGINS` in `.env`
- Add your frontend URL to the list

## 📝 License

ISC

## 👨‍💻 Author

MAJESTY - Godfrey Okoye University

## 🆘 Support

For issues or questions, contact the development team.

