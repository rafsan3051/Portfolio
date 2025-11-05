import { Octokit } from '@octokit/rest';
import { config } from './config';

const octokit = new Octokit({
  auth: config.github.token || undefined,
});

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

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username: config.github.username,
      sort: 'updated',
      per_page: 100,
    });

    return data.map((repo) => ({
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
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw new Error('Failed to fetch GitHub repositories');
  }
}

export async function getGitHubUser() {
  try {
    const { data } = await octokit.users.getByUsername({
      username: config.github.username,
    });

    return {
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
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
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
