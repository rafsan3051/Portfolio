import 'server-only';
import { Octokit } from '@octokit/rest';
import { config } from './config';

const octokit = new Octokit({ auth: config.github.token || undefined });

let effectiveUsernamePromise: Promise<string> | null = null;
async function getEffectiveUsername(): Promise<string> {
  if (effectiveUsernamePromise) return effectiveUsernamePromise;
  effectiveUsernamePromise = (async () => {
    // If a token is available, prefer the authenticated user to avoid needing GITHUB_USERNAME
    if (config.github.token) {
      try {
        const { data } = await octokit.users.getAuthenticated();
        if (data?.login) return data.login;
      } catch (_) {
        // fallback below
      }
    }
    return config.github.username;
  })();
  return effectiveUsernamePromise;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

type CacheEntry<T> = { data: T; ts: number } | null;
const TTL_MS = 10 * 60 * 1000; // 10 minutes
const BACKOFF_MS = 2 * 60 * 1000; // pause retries after rate-limit
let rateLimitedUntil = 0;

const cache: {
  repos: CacheEntry<GitHubRepo[]>;
  user: CacheEntry<{
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    public_repos: number;
    followers: number;
    following: number;
  }>;
} = {
  repos: null,
  user: null,
};

function isFresh<T>(entry: CacheEntry<T>) {
  return !!entry && Date.now() - entry.ts < TTL_MS;
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  // Serve fresh cache immediately when available to avoid rate limits
  if (isFresh(cache.repos)) return cache.repos!.data;

  // Respect a temporary backoff window when we've been rate limited
  if (Date.now() < rateLimitedUntil) {
    if (cache.repos) return cache.repos.data;
    throw new Error('GitHub rate limited. Please try again shortly.');
  }

  const perPage = config.github.token ? 100 : 30; // reduce requests when unauthenticated
  const username = await getEffectiveUsername();

  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: perPage,
    });

    const normalized = data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description ?? null,
      html_url: repo.html_url,
      homepage: repo.homepage ?? null,
      language: repo.language ?? null,
      stargazers_count: repo.stargazers_count ?? 0,
      forks_count: repo.forks_count ?? 0,
      topics: repo.topics ?? [],
      created_at: repo.created_at ?? new Date(0).toISOString(),
      updated_at: repo.updated_at ?? new Date(0).toISOString(),
      pushed_at: repo.pushed_at ?? new Date(0).toISOString(),
    }));

    cache.repos = { data: normalized, ts: Date.now() };
    return normalized;
  } catch (error: any) {
    const status = error?.status as number | undefined;
    console.error('Error fetching GitHub repos:', error);

    // On rate limit/abuse, set a backoff window and return stale cache if available
    if (status === 403 || status === 429) {
      rateLimitedUntil = Date.now() + BACKOFF_MS;
      if (cache.repos) return cache.repos.data;
    }

    throw new Error('Failed to fetch GitHub repositories');
  }
}

export async function getGitHubUser() {
  // Serve fresh cache immediately when available to avoid rate limits
  if (isFresh(cache.user)) return cache.user!.data;

  // Respect a temporary backoff window when we've been rate limited
  if (Date.now() < rateLimitedUntil) {
    if (cache.user) return cache.user.data;
    throw new Error('GitHub rate limited. Please try again shortly.');
  }

  const username = await getEffectiveUsername();
  try {
    const { data } = await octokit.users.getByUsername({ username });

    const normalized = {
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      blog: data.blog,
      location: data.location,
      email: data.email,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    };

    cache.user = { data: normalized, ts: Date.now() };
    return normalized;
  } catch (error: any) {
    const status = error?.status as number | undefined;
    console.error('Error fetching GitHub user:', error);

    if (status === 403 || status === 429) {
      rateLimitedUntil = Date.now() + BACKOFF_MS;
      if (cache.user) return cache.user.data;
    }

    throw new Error('Failed to fetch GitHub user data');
  }
}

export async function getRepoLanguages(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.listLanguages({
      owner,
      repo,
    });
    return data;
  } catch (error) {
    console.error('Error fetching repo languages:', error);
    return {};
  }
}
