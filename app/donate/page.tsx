import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support Daastaanein',
  description: 'Help us keep uncovering the untold stories of Hindi music.',
}

export default function DonatePage() {
  return (
    <div className="max-w-[720px] mx-auto px-[60px] pt-20 pb-32">
      <div
        className="font-sans text-[0.72rem] tracking-[.18em] uppercase font-medium mb-4 flex items-center gap-2.5"
        style={{ color: 'var(--accent)' }}
      >
        <span className="w-7 h-px" style={{ background: 'var(--accent)' }} />
        Support Us
      </div>
      <h1
        className="font-display font-black leading-[1.05] tracking-[-0.03em] mb-6"
        style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--ink)' }}
      >
        Keep the stories alive
      </h1>
      <p className="font-body text-[1.08rem] leading-[1.85] font-light" style={{ color: 'var(--ink2)' }}>
        Donation page coming soon.
      </p>
    </div>
  )
}
