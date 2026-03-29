import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'How Daastaanein researches and uncovers the stories behind Hindi songs.',
}

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-[60px] pt-20 pb-32">
      <div
        className="font-sans text-[0.72rem] tracking-[.18em] uppercase font-medium mb-4 flex items-center gap-2.5"
        style={{ color: 'var(--accent)' }}
      >
        <span className="w-7 h-px" style={{ background: 'var(--accent)' }} />
        The Process
      </div>
      <h1
        className="font-display font-black leading-[1.05] tracking-[-0.03em] mb-6"
        style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--ink)' }}
      >
        How we uncover them
      </h1>
      <p className="font-body text-[1.08rem] leading-[1.85] font-light mb-4" style={{ color: 'var(--ink2)' }}>
        Coming soon — the story behind the stories.
      </p>
    </div>
  )
}
