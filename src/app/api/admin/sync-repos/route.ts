import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/session';
import { performSync } from '@/lib/syncRepos';

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { selectedRepos } = body; // Array of repo names to sync
    const result = await performSync(selectedRepos);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error syncing repos:', error);
    return NextResponse.json(
      { error: 'Failed to sync repositories' },
      { status: 500 }
    );
  }
}
