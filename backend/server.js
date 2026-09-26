import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectDB } from './src/config/db.js';
import { errorHandler } from './src/middleware/errorHandler.js';

import authRoutes from './src/routes/authRoutes.js';
import problemRoutes from './src/routes/problemRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import collaborationRoutes from './src/routes/collaborationRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import voiceRoutes from './src/routes/voiceRoutes.js';
import translationRoutes from './src/routes/translationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api', limiter);

// Health Endpoint (Section REST APIs requirement)
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';
  res.json({
    success: true,
    status: 'UP',
    database: dbStatus,
    service: 'Samasya Nivark REST API Engine',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount Feature API Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/translation', translationRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 SAMASYA NIVARK REST API SERVER RUNNING ON PORT ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
});
