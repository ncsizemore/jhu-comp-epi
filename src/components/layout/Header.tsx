import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-hopkins-blue shadow-lg sticky top-0 z-50 border-b border-hopkins-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image 
                src="/images/JHU.logo_horizontal.white.svg" 
                alt="Johns Hopkins University" 
                width={180} 
                height={40} 
                className="mr-3"
              />
                <div className="border-l border-white/30 mx-3 h-8 hidden md:block"></div>
                <div className="hidden md:block">
                  <div className="text-white font-bold text-lg">Computational Epidemiology</div>
                  <div className="text-white/80 text-xs tracking-wider">RESEARCH GROUP</div>
                </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/publications" 
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Publications
            </Link>
            <Link 
              href="/team" 
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Team
            </Link>
          </nav>
          {/* Mobile menu button - for future implementation */}
          <div className="md:hidden flex items-center">
            <button className="text-white">
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