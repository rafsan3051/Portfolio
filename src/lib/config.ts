// This module is server-only to prevent bundling secrets into client code
import 'server-only';

// Environment variables configuration
export const config = {
  github: {
    username: process.env.GITHUB_USERNAME || 'rafsan3051',
    token:
      process.env.GITHUB_TOKEN && !String(process.env.GITHUB_TOKEN).startsWith('your_')
        ? String(process.env.GITHUB_TOKEN)
        : '', // Optional: for higher rate limits
  },
  session: {
    password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
    cookieName: 'portfolio_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/', // Ensure cookie is available across all paths
    },
  },
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    // Hash of 'admin123' - CHANGE THIS IN PRODUCTION
    passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2b$10$xxm6i85h1ZH2Y83IlRZ2beoWGanrR4uKm3ud0iiUM/Lg3n5/ioJMi',
  },
};
