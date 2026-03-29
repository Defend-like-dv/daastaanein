import { MetadataRoute } from 'next'
import { getAllStories, getAllPeople } from '@/lib/content'

const BASE_URL = 'https://daastaanein.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = getAllStories()
  const people  = getAllPeople()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/stories`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/donate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]

  // Story pages — highest SEO value
  const storyRoutes: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${BASE_URL}/story/${story.slug}`,
    lastModified: new Date(story.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Artist pages
  const artistRoutes: MetadataRoute.Sitemap = people.map((person) => ({
    url: `${BASE_URL}/artist/${person.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...storyRoutes, ...artistRoutes]
}
