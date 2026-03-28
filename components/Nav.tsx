'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const NAV_LINKS = [
  { href: '/stories',  label: 'Stories' },
  { href: '/about',    label: 'How We Work' },
  { href: '/submit',   label: 'Request / Edit' },
  { href: '/donate',   label: 'Donate' },
]

export default function Nav() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav
      className="px-[60px] flex items-center justify-between sticky top-0 z-50 transition-[background] duration-300"
      style={{
        background: 'var(--bg)',
        borderBottom: '1px solid var(--divide)',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-[1.45rem] font-bold py-5 tracking-[-0.01em] no-underline"
        style={{ color: 'var(--ink)' }}
      >
        Daastaanein
      </Link>

      {/* Nav Links */}
      <ul className="flex gap-1 list-none">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-4 py-2 font-sans text-[0.78rem] tracking-[.06em] uppercase font-medium rounded transition-all"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--ink3)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--ink)'
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--bg2)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--ink3)'
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Right: Donate CTA + Theme Toggle */}
      <div className="flex items-center gap-3">
        <Link
          href="/donate"
          className="px-5 py-[9px] rounded font-sans text-[0.72rem] tracking-[.07em] uppercase font-medium inline-flex items-center gap-1.5 transition-opacity hover:opacity-85"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          ♥ Support Us
        </Link>
        <button
          onClick={toggleTheme}
          className="w-[38px] h-[38px] rounded-full flex items-center justify-center transition-colors text-base"
          style={{
            border: '1px solid var(--divide)',
            background: 'transparent',
            color: 'var(--ink2)',
          }}
          title="Toggle theme"
          aria-label="Toggle dark/light mode"
        >
          {theme === 'dark' ? '☀' : '☽'}
        </button>
      </div>
    </nav>
  )
}
