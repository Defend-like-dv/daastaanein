const STATS = [
  { n: '480+',      label: 'Song Stories' },
  { n: '120+',      label: 'Composers Covered' },
  { n: '7 Decades', label: 'Of Hindi Music' },
  { n: '62K',       label: 'Monthly Readers' },
]

export default function StatsStrip() {
  return (
    <div
      className="grid grid-cols-4 text-center py-10"
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--divide)',
        borderBottom: '1px solid var(--divide)',
      }}
    >
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="px-5"
          style={i > 0 ? { borderLeft: '1px solid var(--divide)' } : {}}
        >
          <div
            className="font-display text-[2.4rem] font-bold leading-none mb-1.5"
            style={{ color: 'var(--ink)' }}
          >
            {stat.n}
          </div>
          <div
            className="font-sans text-[0.68rem] tracking-[.12em] uppercase"
            style={{ color: 'var(--ink3)' }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
