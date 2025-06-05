import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden border-b border-gray-100">
      {/* Enhanced background with more dynamic gradients and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-hopkins-blue/[0.12] via-white to-hopkins-spirit-blue/[0.15] z-0"></div>
      
      {/* Decorative circles with improved positioning and subtle animation */}
      <div className="absolute -right-24 -top-24 w-88 h-88 bg-hopkins-spirit-blue/[0.12] rounded-full blur-sm z-0 animate-pulse-slow"></div>
      <div className="absolute -left-24 -bottom-24 w-88 h-88 bg-hopkins-blue/[0.12] rounded-full blur-sm z-0"></div>
      <div className="absolute right-1/4 bottom-0 w-44 h-44 bg-hopkins-gold/[0.08] rounded-full z-0"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/graph-pattern.svg')] bg-[length:20px_20px] opacity-[0.03] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18 md:py-24 relative z-10">
        <div className="grid md:grid-cols-5 gap-7 items-center">
          <div className="md:col-span-3">
            {/* Enhanced badge with subtle glow */}
            <div className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-hopkins-blue/10 rounded-full text-hopkins-blue mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-hopkins-blue rounded-full mr-2"></span>
              Johns Hopkins University
            </div>
            
            {/* Improved typography with letter spacing and line height */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-5 text-gray-900">
              Computational <span className="text-hopkins-blue relative">
                Epidemiology
                <span className="absolute bottom-1 left-0 w-full h-2 bg-hopkins-gold/20 -z-10 skew-x-3"></span>
              </span> <br className="hidden md:block" />
              Research Group
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-600 font-normal mb-5 max-w-3xl leading-relaxed">
              Modeling infectious disease dynamics to inform public health policy
            </h2>
            
            <p className="text-lg text-gray-500 mb-8 max-w-2xl leading-relaxed">
              We develop advanced computational models to understand disease transmission, 
              evaluate interventions, and provide data-driven guidance for HIV, STIs, and other infectious diseases.
            </p>
            
            {/* Fixed buttons with improved hover effects - icon and text on same line */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/projects" 
                className="inline-flex items-center justify-center px-6 py-3 bg-hopkins-blue text-white font-medium rounded-md hover:bg-hopkins-blue/90 hover:translate-y-[-2px] transition-all duration-200 shadow-md whitespace-nowrap group"
              >
                <span>Explore Our Models</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                href="/team" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 hover:border-hopkins-blue/30 hover:translate-y-[-2px] transition-all duration-200 shadow-sm whitespace-nowrap group"
              >
                <span>Meet Our Team</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Add a visual element to the right side for larger screens - adjusted size */}
          <div className="hidden md:block md:col-span-2 relative">
            <div className="relative h-[320px] w-full">
              {/* Abstract data visualization visual - adjusted size */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-58 h-58 rounded-full border-4 border-hopkins-blue/20 relative animate-spin-slow opacity-70">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-42 h-42 rounded-full border-4 border-dashed border-hopkins-spirit-blue/30"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-4 border-hopkins-gold/30"></div>
                  
                  {/* Data points */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-hopkins-blue rounded-full shadow-lg"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-hopkins-spirit-blue rounded-full shadow-lg"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-hopkins-gold rounded-full shadow-lg"></div>
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-hopkins-blue rounded-full shadow-lg"></div>
                  
                  {/* Connection lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-hopkins-blue/20 to-transparent rotate-45"></div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-hopkins-gold/20 to-transparent -rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}