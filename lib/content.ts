import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Story = {
  slug: string
  title: string
  titleHindi?: string
  publishedAt: string
  status: 'draft' | 'published' | 'archived'
  isFeatured?: boolean
  filmName?: string
  filmNameHindi?: string
  year?: number
  era?: string
  genre?: string[]
  language?: string
  musicDirectors?: string[]
  lyricists?: string[]
  singers?: string[]
  actors?: string[]
  excerpt?: string
  excerptHindi?: string
  coverImage?: string
  readTime?: number
  youtubeId?: string
  spotifyTrackId?: string
  authorType?: 'editorial' | 'community'
  contributorName?: string
  contributorCity?: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  tags?: string[]
  content: string
}

export type Person = {
  slug: string
  name: string
  nameHindi?: string
  knownRoles?: string[]
  activePeriod?: string
  profileImage?: string
  shortBio?: string
  content: string
}

// ─── Paths ────────────────────────────────────────────────────────────────────

const STORIES_DIR = path.join(process.cwd(), 'content/daastaanein')
const PEOPLE_DIR  = path.join(process.cwd(), 'content/people')

// ─── Stories ──────────────────────────────────────────────────────────────────

export function getAllStories(): Story[] {
  if (!fs.existsSync(STORIES_DIR)) return []

  const files = fs.readdirSync(STORIES_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(STORIES_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      return { slug: filename.replace('.mdx', ''), content, ...data } as Story
    })
    .filter((s) => s.status === 'published')
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export function getFeaturedStory(): Story | null {
  const stories = getAllStories()
  return stories.find((s) => s.isFeatured) ?? stories[0] ?? null
}

export function getStoryBySlug(slug: string): Story | null {
  const filePath = path.join(STORIES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, content, ...data } as Story
}

export function getAllStorySlugs(): string[] {
  if (!fs.existsSync(STORIES_DIR)) return []
  return fs
    .readdirSync(STORIES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

// ─── People ───────────────────────────────────────────────────────────────────

export function getAllPeople(): Person[] {
  if (!fs.existsSync(PEOPLE_DIR)) return []

  const files = fs.readdirSync(PEOPLE_DIR).filter((f) => f.endsWith('.mdx'))

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(PEOPLE_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)
    return { slug: filename.replace('.mdx', ''), content, ...data } as Person
  })
}

export function getPersonBySlug(slug: string): Person | null {
  const filePath = path.join(PEOPLE_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, content, ...data } as Person
}

// ─── SEO helpers ──────────────────────────────────────────────────────────────

export function buildMetaTitle(story: Story): string {
  if (story.metaTitle) return story.metaTitle
  const film = story.filmName ? ` — ${story.filmName}` : ''
  const year = story.year ? ` (${story.year})` : ''
  return `Story Behind '${story.title}'${film}${year} | Daastaanein`
}

export function buildMetaDescription(story: Story): string {
  if (story.metaDescription) return story.metaDescription
  return story.excerpt ?? `The untold story behind '${story.title}'.`
}
