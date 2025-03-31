import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden border-b border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-hopkins-blue/[0.08] via-white to-hopkins-spirit-blue/[0.1] z-0"></div>
      <div className="absolute -right-16 -top-16 w-96 h-96 bg-hopkins-spirit-blue/[0.08] rounded-full z-0"></div>
      <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-hopkins-blue/[0.08] rounded-full z-0"></div>
      <div className="absolute right-1/4 bottom-0 w-48 h-48 bg-hopkins-gold/[0.05] rounded-full z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-hopkins-blue/10 rounded-full text-hopkins-blue mb-6">
          Johns Hopkins University
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
          Computational <span className="text-hopkins-blue">Epidemiology</span> <br className="hidden md:block" />Research Group
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 font-normal mb-8 max-w-3xl">
          Modeling infectious disease dynamics to inform public health policy
        </h2>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl">
          We develop advanced computational models to understand disease transmission, 
          evaluate interventions, and provide data-driven guidance for HIV, STIs, and other infectious diseases.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/projects" 
            className="inline-block px-6 py-3 bg-hopkins-blue text-white font-medium rounded-md hover:bg-hopkins-blue/90 transition-colors shadow-md flex items-center"
          >
            Explore Our Models <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link 
            href="/team" 
            className="inline-block px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            Meet Our Team <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}