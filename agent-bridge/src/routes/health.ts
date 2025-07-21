import { Router } from 'express';
import { logger } from '../utils/logger.js';

export const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  const healthData = {
    status: 'healthy',
    service: 'agent-bridge',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    nodejs: process.version,
    memory: process.memoryUsage()
  };

  logger.debug('Health check requested', healthData);
  
  res.json(healthData);
});