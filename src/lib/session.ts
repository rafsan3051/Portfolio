import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { config } from './config';

export interface SessionData {
  isLoggedIn: boolean;
  username?: string;
}

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, {
    password: config.session.password,
    cookieName: config.session.cookieName,
    cookieOptions: config.session.cookieOptions,
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session.isLoggedIn === true;
}
