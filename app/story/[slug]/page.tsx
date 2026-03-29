import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  getStoryBySlug,
  getAllStorySlugs,
  buildMetaTitle,
  buildMetaDescription,
} from '@/lib/content'
import YouTubeEmbed from '@/components/YouTubeEmbed'

const ERA_LABELS: Record<string, string> = {
  'golden-era': 'Golden Era',
  '1970s': '1970s',
  '1980s': '1980s',
  '1990s': '1990s',
  '2000s': '2000s',
  'modern': 'Modern',
}

// ── Static params for build-time generation ───────────────────────
export async function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }))
}

// ── SEO metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) return {}

  const title       = buildMetaTitle(story)
  const description = buildMetaDescription(story)
  const image       = story.ogImage ?? story.coverImage

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: story.publishedAt,
      tags: story.tags,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// ── Page ──────────────────────────────────────────────────────────
export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) notFound()

  const eraLabel = story.era ? ERA_LABELS[story.era] ?? story.era : null

  // JSON-LD Article schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: buildMetaTitle(story),
    description: buildMetaDescription(story),
    datePublished: story.publishedAt,
    dateModified: story.publishedAt,
    author: {
      '@type': story.authorType === 'community' ? 'Person' : 'Organization',
      name: story.authorType === 'community' ? story.contributorName : 'Daastaanein',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Daastaanein',
    },
    keywords: story.tags?.join(', '),
    ...(story.coverImage ? { image: story.coverImage } : {}),
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-[1100px] mx-auto px-6 md:px-[60px] pt-10 md:pt-16 pb-16 md:pb-24">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 mb-10 font-sans text-[0.68rem] tracking-[.1em] uppercase" style={{ color: 'var(--ink4)' }}>
          <Link href="/" className="hover:text-ink transition-colors" style={{ color: 'var(--ink4)' }}>Home</Link>
          <span>/</span>
          <Link href="/stories" className="hover:text-ink transition-colors" style={{ color: 'var(--ink4)' }}>Stories</Link>
          {eraLabel && (
            <>
              <span>/</span>
              <span style={{ color: 'var(--ink3)' }}>{eraLabel}</span>
            </>
          )}
        </div>

        {/* ── Header ── */}
        <header className="mb-12" style={{ maxWidth: '720px' }}>
          {/* Era + Year badge */}
          {(eraLabel || story.year) && (
            <div
              className="inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-[.18em] uppercase font-medium mb-5 px-3 py-1.5 rounded-full"
              style={{
                color: 'var(--accent)',
                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
              }}
            >
              {[eraLabel, story.year].filter(Boolean).join(' · ')}
            </div>
          )}

          {/* Song title */}
          <h1
            className="font-display font-black leading-[1.05] tracking-[-0.03em] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)', color: 'var(--ink)' }}
          >
            {story.title}
          </h1>

          {/* Hindi title */}
          {story.titleHindi && (
            <p
              className="font-body italic text-[1.2rem] mb-6 tracking-[0.02em]"
              style={{ color: 'var(--ink3)' }}
            >
              {story.titleHindi}
            </p>
          )}

          {/* Film + metadata strip */}
          <div
            className="flex flex-wrap gap-x-8 gap-y-2 py-5 mb-6"
            style={{ borderTop: '1px solid var(--divide)', borderBottom: '1px solid var(--divide)' }}
          >
            {story.filmName && (
              <MetaItem label="Film" value={story.filmName} />
            )}
            {story.musicDirectors?.length ? (
              <MetaItem label="Music" value={story.musicDirectors.join(', ')} />
            ) : null}
            {story.lyricists?.length ? (
              <MetaItem label="Lyrics" value={story.lyricists.join(', ')} />
            ) : null}
            {story.singers?.length ? (
              <MetaItem label="Voice" value={story.singers.join(', ')} />
            ) : null}
            {story.readTime && (
              <MetaItem label="Read" value={`${story.readTime} min`} />
            )}
          </div>

          {/* Excerpt as pull quote */}
          {story.excerpt && (
            <blockquote
              className="font-body italic text-[1.12rem] leading-[1.82] pl-5 font-light"
              style={{
                color: 'var(--ink2)',
                borderLeft: '3px solid var(--accent)',
              }}
            >
              {story.excerpt}
            </blockquote>
          )}
        </header>

        {/* ── YouTube Embed ── */}
        {story.youtubeId && (
          <YouTubeEmbed videoId={story.youtubeId} title={story.title} />
        )}

        {/* ── Story Body ── */}
        <div className="prose mt-10">
          <MDXRemote source={story.content} />
        </div>

        {/* ── Footer ── */}
        <footer
          className="mt-16 pt-8 flex flex-wrap items-start justify-between gap-8"
          style={{ borderTop: '1px solid var(--divide)' }}
        >
          {/* Tags */}
          {story.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-[0.65rem] tracking-[.1em] uppercase px-3 py-1.5 rounded-full"
                  style={{
                    color: 'var(--ink3)',
                    background: 'var(--bg2)',
                    border: '1px solid var(--divide)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {/* Attribution */}
          <div className="text-right">
            {story.authorType === 'community' && story.contributorName ? (
              <div>
                <p className="font-sans text-[0.65rem] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--ink4)' }}>
                  Submitted by
                </p>
                <p className="font-display font-bold text-[1rem]" style={{ color: 'var(--ink)' }}>
                  {story.contributorName}
                  {story.contributorCity && (
                    <span className="font-body italic font-normal text-[0.9rem] ml-2" style={{ color: 'var(--ink3)' }}>
                      {story.contributorCity}
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-sans text-[0.65rem] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--ink4)' }}>
                  Written by
                </p>
                <p className="font-display font-bold text-[1rem]" style={{ color: 'var(--ink)' }}>
                  Daastaanein Editorial
                </p>
              </div>
            )}
          </div>
        </footer>

        {/* ── Back link ── */}
        <div className="mt-12">
          <Link
            href="/stories"
            className="font-sans text-[0.72rem] tracking-[.1em] uppercase font-medium transition-colors text-ink3 hover:text-ink"
          >
            ← All Stories
          </Link>
        </div>
      </article>
    </>
  )
}

// ── Helper ────────────────────────────────────────────────────────
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-[0.6rem] tracking-[.14em] uppercase mb-0.5" style={{ color: 'var(--ink4)' }}>
        {label}
      </p>
      <p className="font-body text-[0.95rem] font-medium" style={{ color: 'var(--ink)' }}>
        {value}
      </p>
    </div>
  )
}
