import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-opacity-20 bg-white rounded-full text-teal-300 mb-6">
          Johns Hopkins University
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Computational <span className="text-teal-400">Epidemiology</span> <br className="hidden md:block" />Research Group
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300 font-normal mb-8 max-w-3xl">
          Modeling infectious disease dynamics to inform public health policy
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl">
          We develop advanced computational models to understand disease transmission, 
          evaluate interventions, and provide data-driven guidance for HIV, STIs, and other infectious diseases.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/projects" 
            className="inline-block px-6 py-3 bg-teal-700 text-white font-medium rounded hover:bg-teal-600 transition-colors shadow-lg"
          >
            Explore Our Models
          </Link>
          <Link 
            href="/team" 
            className="inline-block px-6 py-3 bg-transparent border border-gray-600 text-white font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Meet Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}