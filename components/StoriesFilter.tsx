'use client'

import { useState, useMemo } from 'react'
import StoryCard from './StoryCard'
import type { Story } from '@/lib/content'

const ERA_OPTIONS = [
  { value: '',           label: 'All Eras' },
  { value: 'golden-era', label: 'Golden Era (Pre-1970)' },
  { value: '1970s',      label: '1970s' },
  { value: '1980s',      label: '1980s' },
  { value: '1990s',      label: '1990s' },
  { value: '2000s',      label: '2000s' },
  { value: 'modern',     label: 'Modern (2010+)' },
]

const GENRE_OPTIONS = [
  { value: '',           label: 'All Genres' },
  { value: 'romantic',   label: 'Romantic' },
  { value: 'sad',        label: 'Sad / Melancholic' },
  { value: 'folk',       label: 'Folk' },
  { value: 'classical',  label: 'Classical' },
  { value: 'devotional', label: 'Devotional' },
  { value: 'patriotic',  label: 'Patriotic' },
  { value: 'qawwali',    label: 'Qawwali' },
  { value: 'dance',      label: 'Dance' },
]

interface Props {
  stories: Story[]
}

export default function StoriesFilter({ stories }: Props) {
  const [search,    setSearch]    = useState('')
  const [era,       setEra]       = useState('')
  const [genre,     setGenre]     = useState('')

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.filmName?.toLowerCase().includes(q) ||
        s.singers?.some((x) => x.toLowerCase().includes(q)) ||
        s.musicDirectors?.some((x) => x.toLowerCase().includes(q)) ||
        s.lyricists?.some((x) => x.toLowerCase().includes(q)) ||
        s.excerpt?.toLowerCase().includes(q)

      const matchesEra   = !era   || s.era === era
      const matchesGenre = !genre || s.genre?.includes(genre)

      return matchesSearch && matchesEra && matchesGenre
    })
  }, [stories, search, era, genre])

  const filterSelect =
    'font-sans text-[0.75rem] tracking-[.04em] px-4 py-2.5 rounded-lg outline-none cursor-pointer transition-colors appearance-none'

  return (
    <>
      {/* ── Filter bar ── */}
      <div
        className="flex flex-wrap gap-3 items-center mb-12 p-5 rounded-xl"
        style={{ background: 'var(--bg2)', border: '1px solid var(--divide)' }}
      >
        {/* Search */}
        <div className="flex-1 min-w-[220px] relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[0.9rem]" style={{ color: 'var(--ink4)' }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search songs, films, artists…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg font-body text-[0.95rem] outline-none"
            style={{
              background: 'var(--card)',
              color: 'var(--ink)',
              border: '1px solid var(--divide)',
            }}
          />
        </div>

        {/* Era filter */}
        <div className="relative">
          <select
            value={era}
            onChange={(e) => setEra(e.target.value)}
            className={filterSelect}
            style={{
              background: 'var(--card)',
              color: era ? 'var(--accent)' : 'var(--ink3)',
              border: `1px solid ${era ? 'var(--accent)' : 'var(--divide)'}`,
              paddingRight: '2rem',
            }}
          >
            {ERA_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Genre filter */}
        <div className="relative">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={filterSelect}
            style={{
              background: 'var(--card)',
              color: genre ? 'var(--accent)' : 'var(--ink3)',
              border: `1px solid ${genre ? 'var(--accent)' : 'var(--divide)'}`,
              paddingRight: '2rem',
            }}
          >
            {GENRE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
        {(search || era || genre) && (
          <button
            onClick={() => { setSearch(''); setEra(''); setGenre('') }}
            className="font-sans text-[0.7rem] tracking-[.08em] uppercase transition-colors px-3 py-2"
            style={{ color: 'var(--ink3)' }}
            onMouseEnter={(e) => ((e.currentTarget).style.color = 'var(--accent)')}
            onMouseLeave={(e) => ((e.currentTarget).style.color = 'var(--ink3)')}
          >
            Clear ×
          </button>
        )}
      </div>

      {/* ── Results count ── */}
      <p className="font-sans text-[0.7rem] tracking-[.1em] uppercase mb-8" style={{ color: 'var(--ink4)' }}>
        {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
        {(era || genre || search) && ' matching filters'}
      </p>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {filtered.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="font-display text-[1.4rem] font-bold mb-3" style={{ color: 'var(--ink3)' }}>
            No stories found
          </p>
          <p className="font-body italic" style={{ color: 'var(--ink4)' }}>
            Try adjusting your filters
          </p>
        </div>
      )}
    </>
  )
}
