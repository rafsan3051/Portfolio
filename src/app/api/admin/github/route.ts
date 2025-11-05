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
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
