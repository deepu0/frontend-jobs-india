import winston from 'winston';
import { LOG_LEVEL } from '../config';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp: ts, source, ...meta }) => {
  const src = source ? `[${source}]` : '';
  const extra = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
  return `${ts} ${level} ${src} ${message}${extra}`;
});

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),
    new winston.transports.File({
      filename: 'scraper-error.log',
      level: 'error',
      maxsize: 5_242_880, // 5MB
      maxFiles: 3,
    }),
    new winston.transports.File({
      filename: 'scraper.log',
      maxsize: 10_485_760, // 10MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

export function createSourceLogger(source: string) {
  return logger.child({ source });
}
