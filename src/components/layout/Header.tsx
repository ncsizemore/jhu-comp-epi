import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-sm mr-3">
                JHU
              </div>
              <div>
                <div className="text-teal-700 font-bold text-lg">Computational Epidemiology</div>
                <div className="text-gray-500 text-xs tracking-wider">JOHNS HOPKINS UNIVERSITY</div>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-800 hover:text-teal-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className="text-gray-800 hover:text-teal-600 font-medium transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/publications" 
              className="text-gray-800 hover:text-teal-600 font-medium transition-colors"
            >
              Publications
            </Link>
            <Link 
              href="/team" 
              className="text-gray-800 hover:text-teal-600 font-medium transition-colors"
            >
              Team
            </Link>
          </nav>
          {/* Mobile menu button - for future implementation */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-500">
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