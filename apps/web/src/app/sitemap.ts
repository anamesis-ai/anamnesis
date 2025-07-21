import { MetadataRoute } from 'next'
import { getAllPostsForBuild, getAllDirectoryItemsForBuild } from '@/lib/sanity.client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog pages
  const posts = await getAllPostsForBuild()
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post._createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Dynamic directory pages
  const directoryItems = await getAllDirectoryItemsForBuild()
  const directoryPages = directoryItems.map((item) => ({
    url: `${baseUrl}/directory/${item.slug.current}`,
    lastModified: new Date(item._createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...directoryPages]
}