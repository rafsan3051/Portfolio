import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/session';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { getAdminHash, setAdminHash } from '@/lib/adminStore';

async function upsertEnvVar(filePath: string, key: string, value: string) {
  let env = '';
  try {
    env = await fs.readFile(filePath, 'utf-8');
  } catch {
    // file may not exist; we'll create it
  }

  const line = `${key}=${value}`;
  if (env.includes(`${key}=`)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    env = env.replace(regex, line);
  } else {
    env = env.trim().length ? env + `\n` + line + `\n` : line + `\n`;
  }
  await fs.writeFile(filePath, env, 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body || {};

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    if (String(newPassword).length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const expectedHash = getAdminHash();
    const ok = bcrypt.compareSync(String(currentPassword), String(expectedHash));
    if (!ok) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    const newHash = bcrypt.hashSync(String(newPassword), 10);

    // Update in-memory store so new logins work immediately
    setAdminHash(newHash);

    // Persist to .env so it survives restarts
    const envPath = path.join(process.cwd(), '.env');
    await upsertEnvVar(envPath, 'ADMIN_PASSWORD_HASH', newHash);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
