import type { Metadata } from 'next'
import { getAllStories } from '@/lib/content'
import StoriesFilter from '@/components/StoriesFilter'

export const metadata: Metadata = {
  title: 'All Stories',
  description:
    'Every Daastaan — stories behind Hindi and classical songs across seven decades. Browse by era, genre, composer, and singer.',
}

export default function StoriesPage() {
  const stories = getAllStories()

  return (
    <div className="max-w-[1300px] mx-auto px-6 md:px-[60px] pt-10 md:pt-16 pb-16 md:pb-24">

      {/* ── Page Header ── */}
      <div className="mb-14" style={{ maxWidth: '640px' }}>
        <div
          className="font-sans text-[0.72rem] tracking-[.18em] uppercase font-medium mb-4 flex items-center gap-2.5"
          style={{ color: 'var(--accent)' }}
        >
          <span className="w-7 h-px" style={{ background: 'var(--accent)' }} />
          The Archive
        </div>
        <h1
          className="font-display font-black leading-[1.05] tracking-[-0.03em] mb-4"
          style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', color: 'var(--ink)' }}
        >
          All Daastaanein
        </h1>
        <p
          className="font-body text-[1.05rem] leading-[1.82] font-light"
          style={{ color: 'var(--ink2)' }}
        >
          {stories.length > 0
            ? `${stories.length} song ${stories.length === 1 ? 'story' : 'stories'} — and counting.`
            : 'Stories are being written. Come back soon.'}
          {' '}Each one researched, written, and verified.
        </p>
      </div>

      {/* ── Filter + Grid ── */}
      <StoriesFilter stories={stories} />
    </div>
  )
}
