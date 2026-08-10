import 'dotenv/config';

const requiredEnv = [
  'VOTING_ADMIN_EMAIL',
  'VOTING_ADMIN_PASSWORD',
  'JWT_SECRET',
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.APP_PORT) || 9090,

  adminEmail: process.env.VOTING_ADMIN_EMAIL!,
  adminPassword: process.env.VOTING_ADMIN_PASSWORD!,

  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
