export type Repo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
};

export async function fetchUserRepos(user: string, perPage = 8): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=${perPage}`,
    {
      // Cache lightly on the edge; SWR revalidates on focus in the client.
      headers: { "Accept": "application/vnd.github+json" },
      next: { revalidate: 60 * 30 },
    } as any
  );
  if (!res.ok) return [];
  const data = (await res.json()) as Repo[];
  // Prefer repos with more stars and recent updates at the top
  return data
    .filter((r) => !r.name.startsWith("."))
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, perPage);
}
