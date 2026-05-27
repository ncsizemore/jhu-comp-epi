'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/news', label: 'News' },
  { href: '/team', label: 'Team' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-hopkins-blue border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <div className="flex-shrink-0">
              <Image
                src="/images/JHU.logo_horizontal.white.svg"
                alt="Johns Hopkins University"
                width={180}
                height={45}
                className="h-auto w-[180px]"
              />
            </div>
            <div className="hidden h-8 border-l border-white/25 md:block" />
            <div className="hidden truncate text-sm font-semibold text-white md:block">
              Computational Epidemiology Lab
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/85 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(open => !open)}
              className="p-2 text-white transition-colors hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="border-t border-white/15 py-3 text-sm md:hidden">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-white/90 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
