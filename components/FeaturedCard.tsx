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

export default function FeaturedCard({ story }: { story: Story }) {
  const eraLabel = story.era ? ERA_LABELS[story.era] ?? story.era : null
  const issueLabel = [eraLabel, story.year].filter(Boolean).join(' · ')
  const firstSinger = story.singers?.[0] ?? story.musicDirectors?.[0]

  return (
    <div
      className="rounded-xl p-10 relative overflow-hidden animate-fade-up"
      style={{
        background: 'var(--card)',
        boxShadow: 'var(--shadow2)',
        animationDelay: '0.15s',
      }}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
        }}
      />

      {/* Label */}
      <div
        className="font-sans text-[0.65rem] tracking-[.18em] uppercase font-medium mb-6 flex items-center gap-2"
        style={{ color: 'var(--accent)' }}
      >
        This Week&apos;s Story
        <span className="flex-1 h-px" style={{ background: 'var(--divide)' }} />
      </div>

      {/* Issue / era */}
      {issueLabel && (
        <div
          className="font-sans text-[0.62rem] tracking-[.14em] uppercase mb-3"
          style={{ color: 'var(--ink4)' }}
        >
          {issueLabel}
        </div>
      )}

      {/* Title */}
      <Link
        href={`/story/${story.slug}`}
        className="font-display text-[1.6rem] font-bold leading-[1.2] tracking-[-0.015em] block mb-2 transition-colors no-underline text-ink hover:text-accent"
      >
        {story.title}
      </Link>

      {/* Hindi */}
      {story.titleHindi && (
        <p
          className="font-body italic text-[0.95rem] mb-4"
          style={{ color: 'var(--ink3)' }}
        >
          {story.titleHindi}
        </p>
      )}

      {/* Excerpt */}
      {story.excerpt && (
        <p
          className="text-[0.96rem] leading-[1.78] italic mb-6 font-light"
          style={{ color: 'var(--ink2)' }}
        >
          {story.excerpt}
        </p>
      )}

      {/* Footer */}
      <div
        className="flex items-center gap-3.5 pt-[18px]"
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
    </div>
  )
}
