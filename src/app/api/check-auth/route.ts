import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    const authed = session.isLoggedIn === true;
    console.log('[check-auth]', { isLoggedIn: session.isLoggedIn, username: session.username, authed });
    
    if (authed) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error('[check-auth] Error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
