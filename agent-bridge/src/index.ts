import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { webhookRouter } from './routes/webhook.js';
import { healthRouter } from './routes/health.js';
import { logger } from './utils/logger.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3333'],
  credentials: true
}));

// Parse JSON bodies (required for webhooks)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// Routes
app.use('/health', healthRouter);
app.use('/webhook', webhookRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'agent-bridge',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      { path: '/health', method: 'GET', description: 'Health check endpoint' },
      { path: '/webhook/sanity', method: 'POST', description: 'Sanity webhook receiver' }
    ],
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  logger.warn('Route not found', { 
    method: req.method, 
    url: req.originalUrl 
  });
  
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    availableEndpoints: ['/health', '/webhook/sanity']
  });
});

// Global error handler
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method
  });

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  logger.info('Agent Bridge started', {
    port: PORT,
    nodeEnv: process.env.NODE_ENV || 'development',
    endpoints: {
      health: `/health`,
      webhook: `/webhook/sanity`
    }
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;