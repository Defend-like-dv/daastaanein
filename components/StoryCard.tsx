import Link from 'next/link'
import { Story } from '@/lib/content'

const ERA_LABELS: Record<string, string> = {
  'golden-era': 'Golden Era',
  '1970s': '1970s',
  '1980s': '1980s',
  '1990s': '1990s',
  '2000s': '2000s',
  'modern': 'Modern',
}

interface StoryCardProps {
  story: Story
  large?: boolean   // spans 2 rows in the homepage grid
}

export default function StoryCard({ story, large = false }: StoryCardProps) {
  const eraLabel = story.era ? ERA_LABELS[story.era] ?? story.era : null
  const firstSinger = story.singers?.[0] ?? story.musicDirectors?.[0]

  return (
    <Link
      href={`/story/${story.slug}`}
      className={`story-card flex flex-col rounded-xl p-8 group no-underline ${large ? 'row-span-2' : ''}`}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--divide)',
      }}
    >
      {/* Era + Year */}
      {(eraLabel || story.year) && (
        <div
          className="font-sans text-[0.65rem] tracking-[.16em] uppercase font-medium mb-3"
          style={{ color: 'var(--ink3)' }}
        >
          {[eraLabel, story.year].filter(Boolean).join(' · ')}
        </div>
      )}

      {/* Title */}
      <h3
        className={`font-display font-bold leading-[1.2] tracking-[-0.015em] mb-2 transition-colors ${
          large ? 'text-[1.5rem]' : 'text-[1.15rem]'
        }`}
        style={{ color: 'var(--ink)' }}
      >
        {story.title}
      </h3>

      {/* Hindi title */}
      {story.titleHindi && (
        <p
          className="font-body italic text-[0.9rem] mb-3"
          style={{ color: 'var(--ink3)' }}
        >
          {story.titleHindi}
        </p>
      )}

      {/* Excerpt */}
      {story.excerpt && (
        <p
          className={`font-body italic font-light leading-[1.78] mb-5 flex-1 ${
            large ? 'text-[0.98rem]' : 'text-[0.88rem]'
          }`}
          style={{ color: 'var(--ink2)' }}
        >
          {story.excerpt}
        </p>
      )}

      {/* Footer meta */}
      <div
        className="flex items-center gap-3.5 pt-4 mt-auto"
        style={{ borderTop: '1px solid var(--divide)' }}
      >
        {firstSinger && (
          <span
            className="font-sans text-[0.68rem] tracking-[.08em] uppercase font-medium"
            style={{ color: 'var(--ink2)' }}
          >
            {firstSinger}
          </span>
        )}
        {story.readTime && (
          <span
            className="font-body text-[0.85rem] italic ml-auto"
            style={{ color: 'var(--ink4)' }}
          >
            {story.readTime} min read →
          </span>
        )}
      </div>
    </Link>
  )
}
