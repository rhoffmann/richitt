require('dotenv').config();

export const __prod__ = process.env.NODE_ENV === 'production';

export const DB_NAME = process.env.ORM_DB_NAME;
export const DB_PASSWORD = process.env.ORM_DB_PASSWORD;
export const DB_USER = process.env.ORM_DB_USER;

export const REDIS_SECRET = process.env.REDIS_SECRET || 'FALLBACK';
export const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'fid';

export const CORS_ORIGIN_WHITELIST = process.env.CORS_ORIGIN_WHITELIST || '*';

export const EMAIL_FROM = process.env.EMAIL_FROM;
export const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME;
export const SMTP_HOST = process.env.SMTP_HOST || 'localhost';
export const SMTP_PORT = process.env.SMTP_PORT || 587;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
