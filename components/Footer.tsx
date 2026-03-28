import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="mt-24 py-12 px-[60px]"
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--divide)',
      }}
    >
      <div className="max-w-[1300px] mx-auto flex items-center justify-between gap-8 flex-wrap">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="font-display text-[1.2rem] font-bold block mb-1"
            style={{ color: 'var(--ink)' }}
          >
            Daastaanein
          </Link>
          <p className="font-body italic text-[0.9rem]" style={{ color: 'var(--ink3)' }}>
            The untold stories of music
          </p>
          <p className="font-body italic text-[0.82rem] mt-0.5" style={{ color: 'var(--ink4)' }}>
            संगीत की अनकही दास्तानें
          </p>
        </div>

        {/* Links */}
        <nav className="flex gap-8">
          {[
            { href: '/stories', label: 'Stories' },
            { href: '/about',   label: 'How We Work' },
            { href: '/submit',  label: 'Submit a Story' },
            { href: '/donate',  label: 'Support Us' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[0.72rem] tracking-[.08em] uppercase transition-colors"
              style={{ color: 'var(--ink3)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--ink)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--ink3)')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p
          className="font-sans text-[0.68rem] tracking-[.04em]"
          style={{ color: 'var(--ink4)' }}
        >
          © {new Date().getFullYear()} Daastaanein. Made with ♥ for Hindi music.
        </p>
      </div>
    </footer>
  )
}
