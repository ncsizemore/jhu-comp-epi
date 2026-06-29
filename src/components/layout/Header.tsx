'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/team', label: 'Team' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-hopkins-blue border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label={SITE.name} className="flex min-w-0 items-center">
            <span className="font-serif text-2xl leading-none text-white">
              <span className="text-hopkins-gold">CIPHER</span>{' '}
              <span className="text-white/90">Lab</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {NAV.map(item => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className="group relative py-2 text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hopkins-gold"
                >
                  {item.label}
                  <span
                    className={[
                      'absolute inset-x-0 bottom-0 h-px origin-left bg-hopkins-gold transition-transform duration-200',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    ].join(' ')}
                  />
                </Link>
              );
            })}
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
            {NAV.map(item => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                  className={[
                    'block border-l py-2 pl-3 text-white/90 transition-colors hover:text-white',
                    isActive ? 'border-hopkins-gold' : 'border-transparent',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
