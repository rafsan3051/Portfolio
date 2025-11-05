/**
 * Generate a unique cover image path for a project.
 * Priority:
 * 1. Repository social preview image from GitHub
 * 2. Gradient-based default using project name hash
 */

export function getProjectCoverImage(
  repoFullName: string,
  slug: string,
  hasCustomImage: boolean = false
): string {
  // If custom image exists in public folder, use it
  if (hasCustomImage) {
    return `/images/projects/${slug}/cover-01.jpg`;
  }

  // Return GitHub's OpenGraph image as fallback
  // This is the repo's social preview image set on GitHub
  return `https://opengraph.githubassets.com/1/${repoFullName}`;
}

/**
 * Generate a consistent gradient color scheme based on project name
 */
export function getProjectGradient(projectName: string): {
  from: string;
  to: string;
  via?: string;
} {
  const gradients = [
    { from: 'from-blue-500', to: 'to-cyan-500', via: 'via-blue-400' },
    { from: 'from-purple-500', to: 'to-pink-500', via: 'via-purple-400' },
    { from: 'from-emerald-500', to: 'to-teal-500', via: 'via-emerald-400' },
    { from: 'from-orange-500', to: 'to-amber-500', via: 'via-orange-400' },
    { from: 'from-rose-500', to: 'to-red-500', via: 'via-rose-400' },
    { from: 'from-indigo-500', to: 'to-blue-600', via: 'via-indigo-400' },
    { from: 'from-violet-500', to: 'to-purple-600', via: 'via-violet-400' },
    { from: 'from-cyan-500', to: 'to-blue-500', via: 'via-cyan-400' },
  ];

  // Simple hash of project name to pick consistent gradient
  const hash = projectName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}
