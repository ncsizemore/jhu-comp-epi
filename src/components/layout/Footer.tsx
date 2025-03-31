import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-100">
      <div className="bg-hopkins-blue py-8 border-b border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/JHU.logo_horizontal.white.svg')] bg-no-repeat bg-[length:400px] bg-[center_right_-100px] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Image 
              src="/images/JHU.logo_horizontal.white.svg" 
              alt="Johns Hopkins University" 
              width={150} 
              height={35} 
              className="mr-3"
            />
          </div>
          <div className="text-white">
            <h3 className="text-xl font-bold">Computational Epidemiology Research Group</h3>
          </div>
        </div>
      </div>
      
      <div className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">About Us</h3>
              <p className="text-gray-400 mb-6">
                Our group develops computational models to understand disease dynamics, evaluate interventions, 
                and inform public health policy for HIV, STIs, and other infectious diseases.
              </p>
              <p className="text-gray-400">
                <strong className="text-white">Address:</strong><br />
                615 N. Wolfe Street<br />
                Baltimore, MD 21205
              </p>
              <p className="text-gray-400 mt-4">
                <strong className="text-white">Email:</strong><br />
                compepi@jhu.edu
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Our Models</h3>
              <ul className="space-y-3">
                <li><Link href="/projects/jheem" className="text-gray-400 hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-hopkins-blue rounded-full mr-2"></span> JHEEM</Link></li>
                <li><Link href="/projects/shield" className="text-gray-400 hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-hopkins-gold rounded-full mr-2"></span> SHIELD</Link></li>
                <li><Link href="/projects/pearl" className="text-gray-400 hover:text-white transition-colors flex items-center"><span className="w-2 h-2 bg-hopkins-spirit-blue rounded-full mr-2"></span> PEARL</Link></li>
                <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors mt-4 inline-block">View All Projects →</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/publications" className="text-gray-400 hover:text-white transition-colors">Publications</Link></li>
                <li><Link href="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
                <li><a href="https://www.jhu.edu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Johns Hopkins University</a></li>
                <li><a href="https://publichealth.jhu.edu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Bloomberg School of Public Health</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} Johns Hopkins University Computational Epidemiology Research Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}