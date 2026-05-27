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
  return (
    <header className="bg-hopkins-blue shadow-lg sticky top-0 z-50 border-b border-hopkins-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <Link href="/" className="flex items-center group relative overflow-hidden">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/images/JHU.logo_horizontal.white.svg"
                alt="Johns Hopkins University"
                width={200}
                height={50}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="border-l border-white/30 mx-4 h-10 hidden md:block" />
              <div className="hidden md:block">
                <div className="text-white font-bold text-lg group-hover:text-hopkins-gold transition-colors duration-300">
                  Computational Epidemiology Lab
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-hopkins-gold transition-all duration-300 group-hover:w-full" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-hopkins-gold font-medium transition-all relative group py-2"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hopkins-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              aria-label="Open menu"
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
