import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/session';
import { config } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Verify credentials
    if (
      username === config.admin.username &&
      bcrypt.compareSync(password, config.admin.passwordHash)
    ) {
      const session = await getSession();
      session.isLoggedIn = true;
      session.username = username;
      await session.save();

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
