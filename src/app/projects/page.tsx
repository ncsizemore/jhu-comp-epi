import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { projects } from '@/data/projects';

export const metadata = {
  title: 'Our Projects | JHU Computational Epidemiology',
  description: 'Advanced computational frameworks developed by the Johns Hopkins University Computational Epidemiology Research Group',
};

export default function ProjectsPage() {
  return (
    <MainLayout>
      {/* Enhanced header - more compact but visually interesting */}
      <section className="bg-hopkins-spirit-blue text-white py-12 relative overflow-hidden">
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 bg-[url('/graph-pattern.svg')] bg-[length:24px_24px] opacity-[0.07] z-0"></div>
        
        {/* Geometric decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-white/[0.03] clip-path-polygon-tr z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-white/[0.03] clip-path-polygon-bl z-0"></div>
        
        {/* Abstract data visualization elements */}
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-64 h-64 rounded-full border border-white/10 opacity-20 z-0"></div>
        <div className="absolute right-24 top-1/2 transform -translate-y-1/2 w-40 h-40 rounded-full border border-white/10 opacity-20 z-0"></div>
        <div className="absolute right-36 top-1/2 transform -translate-y-1/2 w-20 h-20 rounded-full border border-white/10 opacity-20 z-0"></div>
        
        {/* Floating dots */}
        <div className="absolute right-20 top-1/3 w-2 h-2 bg-white rounded-full opacity-30 z-0"></div>
        <div className="absolute right-48 top-1/4 w-3 h-3 bg-white rounded-full opacity-20 z-0"></div>
        <div className="absolute right-96 top-2/3 w-2 h-2 bg-white rounded-full opacity-30 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl relative">
            {/* Subtle highlight element */}
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-hopkins-gold opacity-70 rounded"></div>
            
            {/* Enhanced typography - more compact */}
            <div className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-white/10 rounded-full mb-3 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-hopkins-gold rounded-full mr-2"></span>
              Research Models
            </div>
            
            <h1 className="text-4xl font-bold mb-3 leading-tight tracking-tight drop-shadow-sm">
              Computational<br />
              <span className="relative inline-block">
                Frameworks
                <span className="absolute bottom-1 left-0 w-full h-1 bg-hopkins-gold/40 -z-10"></span>
              </span>
            </h1>
            
            <p className="text-lg text-white/90 leading-relaxed max-w-xl mb-0">
              Advanced modeling approaches addressing critical public health 
              challenges through data-driven analysis and implementation.
            </p>
          </div>
        </div>
      </section>
      
      {/* JHEEM Project Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-hopkins-blue/10 rounded-full text-hopkins-blue mb-4">JHEEM</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Johns Hopkins Epidemiological and Economic Model</h2>
              <p className="text-gray-600 mb-6">
                A comprehensive framework for simulating HIV transmission dynamics and evaluating 
                the impact of prevention and treatment interventions across diverse populations.
              </p>
              
              {/* Impact metrics placeholders */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-hopkins-blue">[15+]</div>
                  <div className="text-sm text-gray-500">Cities Modeled</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-hopkins-blue">[XX%]</div>
                  <div className="text-sm text-gray-500">Resource Optimization</div>
                </div>
              </div>
              
              <div className="bg-hopkins-blue/5 p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Featured Impact:</h3>
                <p className="text-gray-600 text-sm">
                  [Placeholder for specific JHEEM impact example - e.g., "JHEEM analysis in Baltimore 
                  informed a reallocation of HIV prevention resources that resulted in X% improvement 
                  in projected outcomes while maintaining the same budget."]
                </p>
              </div>
              
              <Link
                href="/projects/jheem"
                className="inline-flex items-center px-4 py-2 bg-hopkins-blue text-white font-medium rounded-md hover:bg-hopkins-blue/90 transition-colors shadow-sm"
              >
                Learn More About JHEEM
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg bg-hopkins-blue border border-hopkins-blue/20 relative h-[400px]">
              {/* Placeholder for JHEEM visualization or diagram */}
              <div className="absolute inset-0 bg-[url('/project-patterns/data-nodes-blue.svg')] bg-cover opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center max-w-xs">
                  <h3 className="text-2xl font-bold mb-4 drop-shadow-md">JHEEM</h3>
                  <p className="mb-6 text-white/90">
                    [Placeholder for JHEEM visualization or explanatory diagram]
                  </p>
                  <div className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-md backdrop-blur-sm">
                    HIV Transmission Model
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SHIELD Project Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg bg-hopkins-gold border border-hopkins-gold/20 relative h-[400px]">
              {/* Placeholder for SHIELD visualization or diagram */}
              <div className="absolute inset-0 bg-[url('/project-patterns/data-nodes-gold.svg')] bg-cover opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center max-w-xs">
                  <h3 className="text-2xl font-bold mb-4 drop-shadow-md">SHIELD</h3>
                  <p className="mb-6 text-white/90">
                    [Placeholder for SHIELD visualization or explanatory diagram]
                  </p>
                  <div className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-md backdrop-blur-sm">
                    HIV/Syphilis Co-Infection Model
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-hopkins-gold/10 rounded-full text-amber-700 mb-4">SHIELD</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Syphilis and HIV Integrated Epidemiologic and Economic Dynamics</h2>
              <p className="text-gray-600 mb-6">
                Modeling the complex interactions between syphilis and HIV transmission to optimize 
                intervention strategies and resource allocation at the local level.
              </p>
              
              {/* Impact metrics placeholders */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-amber-600">[8]</div>
                  <div className="text-sm text-gray-500">Cities Implemented</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-amber-600">[32%]</div>
                  <div className="text-sm text-gray-500">Efficiency Improvement</div>
                </div>
              </div>
              
              <div className="bg-hopkins-gold/5 p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Featured Impact:</h3>
                <p className="text-gray-600 text-sm">
                  [Placeholder for specific SHIELD impact example - e.g., "SHIELD analysis demonstrated 
                  that integrated screening for HIV and syphilis could identify X% more cases while 
                  reducing costs by Y% compared to separate screening programs."]
                </p>
              </div>
              
              <Link
                href="/projects/shield"
                className="inline-flex items-center px-4 py-2 bg-hopkins-gold text-white font-medium rounded-md hover:bg-hopkins-gold/90 transition-colors shadow-sm"
              >
                Learn More About SHIELD
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* PEARL Project Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-hopkins-spirit-blue/10 rounded-full text-hopkins-spirit-blue mb-4">PEARL</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ProjEcting Age, multimoRbidity, and poLypharmacy</h2>
              <p className="text-gray-600 mb-6">
                A novel modeling approach to understand and forecast age-related comorbidities 
                and medication interactions in populations living with HIV.
              </p>
              
              {/* Impact metrics placeholders */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-hopkins-spirit-blue">[10+]</div>
                  <div className="text-sm text-gray-500">Scenarios Modeled</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-hopkins-spirit-blue">[27%]</div>
                  <div className="text-sm text-gray-500">Risk Reduction</div>
                </div>
              </div>
              
              <div className="bg-hopkins-spirit-blue/5 p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Featured Impact:</h3>
                <p className="text-gray-600 text-sm">
                  [Placeholder for specific PEARL impact example - e.g., "PEARL projections have 
                  informed the development of X clinical guidelines for managing comorbidities in 
                  aging HIV+ populations, potentially reducing adverse events by Y%."]
                </p>
              </div>
              
              <Link
                href="/projects/pearl"
                className="inline-flex items-center px-4 py-2 bg-hopkins-spirit-blue text-white font-medium rounded-md hover:bg-hopkins-spirit-blue/90 transition-colors shadow-sm"
              >
                Learn More About PEARL
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg bg-hopkins-spirit-blue border border-hopkins-spirit-blue/20 relative h-[400px]">
              {/* Placeholder for PEARL visualization or diagram */}
              <div className="absolute inset-0 bg-[url('/project-patterns/data-nodes-spirit.svg')] bg-cover opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center max-w-xs">
                  <h3 className="text-2xl font-bold mb-4 drop-shadow-md">PEARL</h3>
                  <p className="mb-6 text-white/90">
                    [Placeholder for PEARL visualization or explanatory diagram]
                  </p>
                  <div className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-md backdrop-blur-sm">
                    Aging HIV+ Population Model
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* TBMTE Project Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg bg-emerald-600 border border-emerald-600/20 relative h-[400px]">
              {/* Placeholder for TBMTE visualization or diagram */}
              <div className="absolute inset-0 bg-[url('/project-patterns/data-nodes-emerald.svg')] bg-cover opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center max-w-xs">
                  <h3 className="text-2xl font-bold mb-4 drop-shadow-md">TBMTE</h3>
                  <p className="mb-6 text-white/90">
                    [Placeholder for TBMTE visualization or explanatory diagram]
                  </p>
                  <div className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-md backdrop-blur-sm">
                    Tuberculosis Transmission Model
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-emerald-600/10 rounded-full text-emerald-800 mb-4">TBMTE</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">TB Modeling and Translational Epidemiology</h2>
              <p className="text-gray-600 mb-6">
                Applying mathematical modeling and data science to address critical questions in tuberculosis 
                epidemiology, transmission dynamics, and control strategies worldwide.
              </p>
              
              {/* Impact metrics placeholders */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-emerald-600">[12]</div>
                  <div className="text-sm text-gray-500">Countries Implemented</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-emerald-600">[43%]</div>
                  <div className="text-sm text-gray-500">Allocation Efficiency</div>
                </div>
              </div>
              
              <div className="bg-emerald-600/5 p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Featured Impact:</h3>
                <p className="text-gray-600 text-sm">
                  [Placeholder for specific TBMTE impact example - e.g., "TBMTE analysis in [Country] 
                  identified high-yield interventions that could reduce TB incidence by X% while 
                  decreasing program costs by Y%."]
                </p>
              </div>
              
              <Link
                href="/projects/tbmte"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-600/90 transition-colors shadow-sm"
              >
                Learn More About TBMTE
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Collaboration CTA */}
      <section className="py-12 bg-hopkins-blue/10 border-t border-hopkins-blue/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Partner With Our Research Team</h2>
          <p className="text-lg text-gray-600 mb-8">
            We collaborate with health departments, community organizations, and researchers 
            to apply our computational models to address public health challenges.
          </p>
          <Link 
            href="mailto:compepi@jhu.edu" 
            className="inline-flex items-center justify-center px-6 py-3 bg-hopkins-blue text-white font-medium rounded-md hover:bg-hopkins-blue/90 transition-colors shadow-md"
          >
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}