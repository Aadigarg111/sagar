const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data (same as frontend)
const mockUsers = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@sagar.gov.in',
    role: 'admin',
    reputation: 1250,
    joinDate: new Date('2023-01-15')
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    role: 'moderator',
    reputation: 890,
    joinDate: new Date('2023-03-20')
  }
];

const mockReports = [
  {
    id: 1,
    type: 'flood',
    location: { lat: 13.0827, lng: 80.2707, address: 'Marina Beach, Chennai' },
    description: 'Heavy flooding observed near Marina Beach due to high tide and heavy rainfall.',
    timestamp: new Date('2024-01-15T14:30:00'),
    verified: true,
    reporter: mockUsers[0],
    severity: 'high',
    status: 'verified',
    upvotes: 45,
    downvotes: 2
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SAGAR API is running' });
});

app.get('/api/v1/reports', (req, res) => {
  res.json(mockReports);
});

app.get('/api/v1/users', (req, res) => {
  res.json(mockUsers);
});

app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple mock authentication
  const user = mockUsers.find(u => u.email === email);
  if (user && password === 'password123') {
    res.json({
      success: true,
      user: user,
      accessToken: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/v1/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Simple mock registration
  const newUser = {
    id: mockUsers.length + 1,
    name,
    email,
    role: 'user',
    reputation: 0,
    joinDate: new Date()
  };
  
  mockUsers.push(newUser);
  
  res.json({
    success: true,
    user: newUser,
    accessToken: 'mock-jwt-token',
    refreshToken: 'mock-refresh-token'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SAGAR Backend API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
