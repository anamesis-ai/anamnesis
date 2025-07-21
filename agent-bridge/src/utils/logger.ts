interface LogContext {
  [key: string]: any;
}

interface Logger {
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
  debug: (message: string, context?: LogContext) => void;
}

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_FORMAT = process.env.LOG_FORMAT || 'json';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const shouldLog = (level: keyof typeof logLevels): boolean => {
  return logLevels[level] <= logLevels[LOG_LEVEL as keyof typeof logLevels];
};

const formatMessage = (level: string, message: string, context?: LogContext): string => {
  const timestamp = new Date().toISOString();
  
  if (LOG_FORMAT === 'json') {
    return JSON.stringify({
      timestamp,
      level: level.toUpperCase(),
      message,
      ...(context && { context })
    });
  }
  
  // Plain text format
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
};

export const logger: Logger = {
  info: (message: string, context?: LogContext) => {
    if (shouldLog('info')) {
      console.log(formatMessage('info', message, context));
    }
  },
  
  warn: (message: string, context?: LogContext) => {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message, context));
    }
  },
  
  error: (message: string, context?: LogContext) => {
    if (shouldLog('error')) {
      console.error(formatMessage('error', message, context));
    }
  },
  
  debug: (message: string, context?: LogContext) => {
    if (shouldLog('debug')) {
      console.debug(formatMessage('debug', message, context));
    }
  }
};