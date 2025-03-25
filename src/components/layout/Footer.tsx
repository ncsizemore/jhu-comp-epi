import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-teal-400 font-bold text-xs mr-2">
                JHU
              </div>
              <div className="text-white font-bold">Computational Epidemiology</div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Our group develops computational models to understand disease dynamics, evaluate interventions, 
              and inform public health policy for HIV, STIs, and other infectious diseases.
            </p>
          </div>
          
          {/* Projects */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Projects</h3>
            <ul className="space-y-2">
              <li><Link href="/projects/jheem" className="text-gray-400 hover:text-white transition-colors">JHEEM</Link></li>
              <li><Link href="/projects/shield" className="text-gray-400 hover:text-white transition-colors">SHIELD</Link></li>
              <li><Link href="/projects/pearl" className="text-gray-400 hover:text-white transition-colors">PEARL</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <p className="text-gray-400 mb-2">615 N. Wolfe Street<br />Baltimore, MD 21205</p>
            <p className="text-gray-400">compepi@jhu.edu</p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} Johns Hopkins University Computational Epidemiology Research Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}