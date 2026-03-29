const STATS = [
  { n: '7 Decades', label: 'Of Hindi Music' },
  { n: '1940s',     label: 'Earliest Era Covered' },
  { n: '100%',      label: 'Independently Researched' },
  { n: '∞',         label: 'Stories Left to Tell' },
]

export default function StatsStrip() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 text-center py-8 md:py-10"
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--divide)',
        borderBottom: '1px solid var(--divide)',
      }}
    >
      {STATS.map((stat, i) => (
        <div
          key={i}
          className={`px-4 md:px-5 py-4 md:py-0 ${
            i % 2 !== 0 ? 'border-l' : ''
          } ${i >= 2 ? 'border-t md:border-t-0' : ''} ${
            i > 0 && i % 2 === 0 ? 'md:border-l' : ''
          } ${i > 0 && i % 2 !== 0 ? 'md:border-l' : ''}`}
          style={{ borderColor: 'var(--divide)' }}
        >
          <div
            className="font-display text-[1.9rem] md:text-[2.4rem] font-bold leading-none mb-1.5"
            style={{ color: 'var(--ink)' }}
          >
            {stat.n}
          </div>
          <div
            className="font-sans text-[0.62rem] md:text-[0.68rem] tracking-[.12em] uppercase"
            style={{ color: 'var(--ink3)' }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
