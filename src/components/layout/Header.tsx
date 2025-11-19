import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-hopkins-blue shadow-lg sticky top-0 z-50 border-b border-hopkins-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Branding - now linked to homepage */}
          <Link href="/" className="flex items-center group relative overflow-hidden">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <Image
                  src="/images/JHU.logo_horizontal.white.svg"
                  alt="Johns Hopkins University" 
                  width={200} 
                  height={50} 
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="border-l border-white/30 mx-4 h-10 hidden md:block"></div>
              
              <div className="hidden md:block">
                <div className="text-white font-bold text-lg group-hover:text-hopkins-gold transition-colors duration-300">Computational Epidemiology Lab</div>
              </div>
            </div>
            {/* Subtle hover effect - animated underline */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-hopkins-gold transition-all duration-300 group-hover:w-full"></div>
          </Link>
          
          {/* Enhanced navigation links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-hopkins-gold font-medium transition-all relative group py-2"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hopkins-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/projects"
              className="text-white hover:text-hopkins-gold font-medium transition-all relative group py-2"
            >
              <span>Projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hopkins-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/publications"
              className="text-white hover:text-hopkins-gold font-medium transition-all relative group py-2"
            >
              <span>Publications</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hopkins-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/news"
              className="text-white hover:text-hopkins-gold font-medium transition-all relative group py-2"
            >
              <span>News</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hopkins-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/team"
              className="text-white hover:text-hopkins-gold font-medium transition-all relative group py-2"
            >
              <span>Team</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hopkins-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          {/* Mobile menu button with enhanced styling */}
          <div className="md:hidden flex items-center">
            <button className="text-white p-2 rounded-md hover:bg-white/10 transition-colors">
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