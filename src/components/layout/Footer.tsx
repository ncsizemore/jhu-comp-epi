import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-hopkins-blue text-white border-t border-hopkins-blue/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute -left-16 -top-48 w-64 h-64 bg-hopkins-spirit-blue/[0.15] rounded-full z-0"></div>
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-hopkins-gold/[0.12] rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-white">Contact</h3>
            <p className="text-sm text-white/90 mb-2">
              615 N. Wolfe Street<br />
              Baltimore, MD 21205
            </p>
            <p className="text-sm text-white/90">
              <span className="font-medium">Email:</span><br />
              <a href="mailto:compepi@jhu.edu" className="hover:text-white hover:underline transition-colors">compepi@jhu.edu</a>
            </p>
          </div>

          {/* Logo in the middle */}
          <div className="text-center flex flex-col items-center">
            <Image
              src="/images/JHU.logo_horizontal.white.svg"
              alt="Johns Hopkins University" 
              width={220} 
              height={55} 
              className="mb-3"
            />
            <div className="text-sm text-white/90">
              <span className="font-medium">Computational Epidemiology</span><br />
              <span className="text-xs tracking-wider">RESEARCH GROUP</span>
            </div>
          </div>
          
          {/* Links Columns - moved closer together */}
          <div className="text-center">
            <div className="inline-grid grid-cols-2 gap-x-2 gap-y-2 text-center mx-auto">
              <div>
                <h4 className="text-xs font-medium uppercase tracking-wider mb-2 text-white/60">Models</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/projects/jheem" className="text-white/90 hover:text-white transition-all">
                      JHEEM
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects/shield" className="text-white/90 hover:text-white transition-all">
                      SHIELD
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects/pearl" className="text-white/90 hover:text-white transition-all">
                      PEARL
                    </Link>
                  </li>
                  <li>

                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium uppercase tracking-wider mb-2 text-white/60">Pages</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-white/90 hover:text-white transition-all">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="text-white/90 hover:text-white transition-all">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/publications" className="text-white/90 hover:text-white transition-all">
                      Publications
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="text-white/90 hover:text-white transition-all">
                      Team
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Combined external links and copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="text-white/70 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} The Computational Epidemiology Lab, Johns Hopkins University
          </div>
          <div className="flex space-x-6">
            <a href="https://www.jhu.edu" target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white transition-all group inline-flex items-center">
              Johns Hopkins University
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a href="https://publichealth.jhu.edu" target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white transition-all group inline-flex items-center">
              Bloomberg School of Public Health
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}