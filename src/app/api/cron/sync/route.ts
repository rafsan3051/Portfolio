import { NextRequest, NextResponse } from 'next/server';
import { performSync } from '@/lib/syncRepos';
export const runtime = 'nodejs';

// Simple cron endpoint secured by a bearer token in env
// Set CRON_SECRET in your environment and call with header: Authorization: Bearer <CRON_SECRET>
export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization') || '';
  const token = (auth.startsWith('Bearer ') ? auth.slice(7) : '') || '';
  const secret = process.env.CRON_SECRET || '';

  if (!secret || token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await performSync();
    return NextResponse.json({ ok: true, ...result });
  } catch (err: any) {
    console.error('Cron sync failed:', err);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
