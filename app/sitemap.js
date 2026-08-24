import { getAllPosts } from '../lib/markdown';

export default async function sitemap() {
  const baseUrl = 'https://yfy.ai';

  // Static routes
  const staticRoutes = [
    '',
    '/platform/roi',
    '/resources/compliance-calendar',
    '/blog',
    '/pricing',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Blog routes
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
