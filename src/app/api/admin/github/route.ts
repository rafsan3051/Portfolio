import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/session';
import { getGitHubRepos, getGitHubUser } from '@/lib/github';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [repos, user] = await Promise.all([getGitHubRepos(), getGitHubUser()]);

    return NextResponse.json({ repos, user });
  } catch (error: any) {
    console.error('Error fetching GitHub data:', error);
    const msg = typeof error?.message === 'string' ? error.message : '';
    if (msg.includes('rate limited')) {
      return NextResponse.json(
        { error: 'GitHub rate limit hit. Add a GITHUB_TOKEN in .env or try again shortly.' },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
