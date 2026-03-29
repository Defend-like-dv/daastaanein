'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'

const NAV_LINKS = [
  { href: '/stories',  label: 'Stories' },
  { href: '/map',      label: 'Collab Map' },
  { href: '/about',    label: 'How We Work' },
  { href: '/submit',   label: 'Request / Edit' },
]

export default function Nav() {
  const pathname   = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="px-6 md:px-[60px] flex items-center justify-between sticky top-0 z-50 transition-[background] duration-300"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--divide)' }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-[1.3rem] md:text-[1.45rem] font-bold py-4 md:py-5 tracking-[-0.01em] no-underline"
        style={{ color: 'var(--ink)' }}
      >
        Daastaanein
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-1 list-none">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-2 font-sans text-[0.78rem] tracking-[.06em] uppercase font-medium rounded transition-all hover:bg-bg2 hover:text-ink ${
                  isActive ? 'text-accent' : 'text-ink3'
                }`}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Right: Donate + Theme + Hamburger */}
      <div className="flex items-center gap-2 md:gap-3">
        <Link
          href="/donate"
          className="hidden md:inline-flex px-5 py-[9px] rounded font-sans text-[0.72rem] tracking-[.07em] uppercase font-medium items-center gap-1.5 transition-opacity hover:opacity-85"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          ♥ Support Us
        </Link>

        <button
          onClick={toggleTheme}
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors text-sm"
          style={{ border: '1px solid var(--divide)', background: 'transparent', color: 'var(--ink2)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☽'}
        </button>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px transition-all" style={{ background: 'var(--ink)' }} />
          <span className="block w-5 h-px transition-all" style={{ background: 'var(--ink)' }} />
          <span className="block w-5 h-px transition-all" style={{ background: 'var(--ink)' }} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-1 z-50"
          style={{ background: 'var(--bg)', borderBottom: '1px solid var(--divide)' }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 font-sans text-[0.78rem] tracking-[.06em] uppercase font-medium rounded transition-all hover:bg-bg2 hover:text-ink ${
                  isActive ? 'text-accent' : 'text-ink3'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/donate"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex px-5 py-3 rounded font-sans text-[0.72rem] tracking-[.07em] uppercase font-medium items-center justify-center gap-1.5"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            ♥ Support Us
          </Link>
        </div>
      )}
    </nav>
  )
}
