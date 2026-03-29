import Link from 'next/link'
import { getAllStories, getFeaturedStory } from '@/lib/content'
import StoryCard from '@/components/StoryCard'
import FeaturedCard from '@/components/FeaturedCard'
import StatsStrip from '@/components/StatsStrip'

export default function HomePage() {
  const featuredStory = getFeaturedStory()
  const recentStories = getAllStories().slice(0, 6)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-[60px] pt-14 md:pt-24 pb-12 md:pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left */}
        <div style={{ animation: 'fadeUp 0.65s ease both', animationDelay: '0.05s' }}>
          <div
            className="font-sans text-[0.72rem] tracking-[.18em] uppercase font-medium mb-4 md:mb-5 flex items-center gap-2.5"
            style={{ color: 'var(--accent)' }}
          >
            <span className="w-7 h-px" style={{ background: 'var(--accent)' }} />
            Hindi &amp; Classical Songs
          </div>

          <h1
            className="font-display font-black leading-[1.05] tracking-[-0.03em] mb-3"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)', color: 'var(--ink)' }}
          >
            The{' '}
            <em className="not-italic font-normal" style={{ color: 'var(--accent)' }}>
              stories
            </em>{' '}
            behind the songs
          </h1>

          <p
            className="font-body italic text-[1rem] md:text-[1.1rem] mb-5 md:mb-7 tracking-[0.03em]"
            style={{ color: 'var(--ink3)' }}
          >
            जो गाने हम सुनते हैं, उनकी अनकही कहानियाँ
          </p>

          <p
            className="text-[1rem] md:text-[1.08rem] leading-[1.85] max-w-[420px] mb-8 md:mb-11 font-light"
            style={{ color: 'var(--ink2)' }}
          >
            Streaming platforms give you the melody. Daastaanein gives you the human
            being behind it — the heartbreak that inspired it, the journey of the
            composer, and the moment a song became eternal.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-3.5 items-center">
            <Link
              href="/stories"
              className="inline-block px-6 md:px-[34px] py-[13px] md:py-[14px] rounded font-sans text-[0.75rem] md:text-[0.78rem] tracking-[.08em] uppercase font-medium transition-opacity hover:opacity-75 no-underline"
              style={{ background: 'var(--ink)', color: 'var(--bg)' }}
            >
              Read the Stories
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 py-[13px] font-sans text-[0.75rem] md:text-[0.78rem] tracking-[.06em] uppercase font-medium transition-colors no-underline text-ink3 hover:text-ink"
            >
              How we uncover them →
            </Link>
          </div>
        </div>

        {/* Right — Featured Card */}
        {featuredStory ? (
          <FeaturedCard story={featuredStory} />
        ) : (
          <div
            className="rounded-xl p-10 text-center"
            style={{ background: 'var(--card)', border: '1px dashed var(--divide)' }}
          >
            <p className="font-body italic" style={{ color: 'var(--ink3)' }}>
              First story coming soon…
            </p>
          </div>
        )}
      </section>

      {/* ── Stats Strip ───────────────────────────────────────────── */}
      <StatsStrip />

      {/* ── Recent Stories ────────────────────────────────────────── */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-[60px] py-14 md:py-[88px]">
        <div className="flex items-baseline justify-between mb-10 md:mb-[52px]">
          <h2
            className="font-display text-[1.5rem] md:text-[1.85rem] font-bold tracking-[-0.02em]"
            style={{ color: 'var(--ink)' }}
          >
            Recent Stories
          </h2>
          <Link
            href="/stories"
            className="font-sans text-[0.72rem] tracking-[.1em] uppercase font-medium no-underline transition-opacity hover:opacity-75"
            style={{ color: 'var(--accent)' }}
          >
            View all →
          </Link>
        </div>

        {recentStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {recentStories.map((story, i) => (
              <StoryCard key={story.slug} story={story} large={i === 0} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20">
            <p
              className="font-display text-[1.4rem] font-bold mb-3"
              style={{ color: 'var(--ink3)' }}
            >
              Stories are being written…
            </p>
            <p className="font-body italic" style={{ color: 'var(--ink4)' }}>
              Subscribe to be the first to read them.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
