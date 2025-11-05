import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/session';
import { config } from '@/lib/config';
import { getAdminHash } from '@/lib/adminStore';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const providedUser = String(username || '').trim();
    const providedPass = String(password || '');
    const expectedUser = String(config.admin.username || '').trim();
  const expectedHash = String(getAdminHash() || '').trim();

    const userOk = providedUser.toLowerCase() === expectedUser.toLowerCase();
    let passOk = false;
    try {
      passOk = bcrypt.compareSync(providedPass, expectedHash);
    } catch (e) {
      console.error('bcrypt compare failed:', e);
    }

    console.log('[admin/login]', { 
      providedUser, 
      userOk, 
      hashLen: expectedHash.length, 
      hasHash: !!expectedHash, 
      passOk,
      sessionPassword: config.session.password.substring(0, 5) + '...' 
    });

    if (userOk && passOk) {
      const session = await getSession();
      session.isLoggedIn = true;
      session.username = expectedUser;
      await session.save();

      console.log('[admin/login] Session saved successfully');
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
