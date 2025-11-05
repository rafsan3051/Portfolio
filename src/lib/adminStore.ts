import { config } from './config';

// Simple in-memory store for the admin password hash so changes take effect without restart
let adminPasswordHash = String(config.admin.passwordHash || '').trim();

export function getAdminHash() {
  return adminPasswordHash;
}

export function setAdminHash(newHash: string) {
  adminPasswordHash = String(newHash || '').trim();
}
