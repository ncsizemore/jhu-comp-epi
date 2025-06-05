import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Our Projects | JHU Computational Epidemiology',
  description: 'Three specialized computational frameworks addressing HIV/STI co-infections, aging population health, and epidemic modeling through dynamic mathematical models and agent-based simulations.',
};

export default function ProjectsPage() {
  const projectDetails = {
    jheem: {
      title: 'Johns Hopkins Epidemiological & Economic Model',
      description: 'Dynamic, compartmental model calibrated to 32 US cities for the Ending the HIV Epidemic Initiative. Simulates HIV transmission across 945 compartments stratified by age, race, sex, sexual behavior, and drug use to project intervention effects on future transmission.',
      challenge: 'Ending the HIV Epidemic in the US',
      scope: '32 EtE cities, 945 compartments',
      highlights: 'Real-time intervention modeling • Testing, PrEP & viral suppression • Demographic targeting',
      url: 'https://jheem.shinyapps.io/ryan-white/', // JHEEM interactive app
      gradient: 'from-hopkins-blue to-indigo-800',
      accent: 'from-hopkins-blue to-indigo-600'
    },
    shield: {
      title: 'Syphilis & HIV Integrated Epidemiologic Dynamics',
      description: 'Novel modeling framework tackling the US syphilis epidemic at its highest levels in decades. Syphilis rates have doubled in five years, with 25-50% of infections occurring among people with HIV. Evaluates cost-effective strategies for testing, partner services, and preventive counseling.',
      challenge: 'Dual STI epidemics at crisis levels',
      scope: '32 US cities, 60% of diagnoses',
      highlights: 'Doxy-PEP innovation • Point-of-care testing • At-home diagnostics',
      url: 'https://ncsizemore.github.io/shield-project/',
      gradient: 'from-amber-600 to-orange-800',
      accent: 'from-amber-500 to-orange-600'
    },
    pearl: {
      title: 'Projecting Age, Multimorbidity, & Polypharmacy',
      description: 'Agent-based simulation leveraging NA-ACCORD data from 200+ sites with 190K+ participants. Models aging HIV population health through 2030, addressing multimorbidity burden and polypharmacy challenges as life expectancy approaches general population levels.',
      challenge: 'Aging HIV+ population health',
      scope: 'NA-ACCORD: 200+ sites, 190K+ participants',
      highlights: 'Demographic modeling • Healthcare costs • 2009-2030 projections',
      url: 'https://pearlhivmodel.org/',
      gradient: 'from-hopkins-spirit-blue to-blue-800',
      accent: 'from-hopkins-spirit-blue to-blue-600'
    }
  };

  return (
    <MainLayout>
      {/* Hero Section with Sophisticated Background */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Sophisticated static background for consistency */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-hopkins-blue/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-hopkins-gold/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Static geometric shapes with modern sophistication */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-hopkins-gold/20 to-amber-400/30 transform rotate-45 rounded-2xl shadow-lg"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-emerald-400/25 to-teal-500/35 rounded-full shadow-md"></div>
          <div className="absolute top-1/2 left-20 w-16 h-64 bg-gradient-to-b from-hopkins-blue/15 to-transparent rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-white/10 rounded-lg rotate-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Active Research
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-hopkins-gold via-amber-400 to-orange-400 mx-auto rounded-full mb-8"></div>
              <p className="text-xl font-medium text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Three computational platforms reshaping how we understand and combat health crises—from dual HIV/STI epidemics to aging population challenges
              </p>
            </div>
            
            {/* Compelling stats teaser with enhanced animations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
              <div className="text-center group cursor-default">
                <div className="text-3xl font-black text-hopkins-gold mb-2 group-hover:scale-110 transition-transform duration-500">32</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">US Cities</div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-hopkins-gold to-transparent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-3xl font-black text-hopkins-spirit-blue mb-2 group-hover:scale-110 transition-transform duration-500">945</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Compartments</div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-hopkins-spirit-blue to-transparent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-3xl font-black text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-500">190K</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Participants</div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
        {/* Sophisticated static background for consistency */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/8 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-hopkins-gold/6 rounded-full blur-3xl"></div>
        </div>
        
        {/* Static geometric shapes with modern sophistication */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-20 right-20 w-32 h-32 border-2 border-hopkins-blue/20 rounded-2xl rotate-12 shadow-lg"></div>
          <div className="absolute bottom-32 left-16 w-20 h-20 border-2 border-hopkins-gold/25 rounded-full shadow-md"></div>
          <div className="absolute top-1/2 right-1/3 w-40 h-3 bg-gradient-to-r from-hopkins-blue/15 to-transparent rounded-full"></div>
          <div className="absolute top-1/4 left-1/2 w-6 h-40 bg-gradient-to-b from-emerald-400/10 to-transparent rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-amber-400/20 rounded-lg rotate-45 shadow-sm"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Projects Grid */}
          <div className="space-y-8 max-w-6xl mx-auto">
            {Object.entries(projectDetails).map(([key, project], index) => (
              <div
                key={key}
                className="group relative bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 animate-in slide-in-from-bottom-8 fade-in"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animationDuration: '800ms',
                  animationFillMode: 'both'
                }}
              >
                {/* Enhanced Project Header with Glass Effect */}
                <div className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  {/* Enhanced animated background patterns */}
                  <div className="absolute inset-0 opacity-25">
                    <div className="absolute top-6 right-6 w-24 h-24 border-2 border-white/50 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-6 left-6 w-18 h-18 border-2 border-white/50 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/3 w-4 h-24 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-8 left-8 w-10 h-10 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-8 right-12 w-6 h-6 bg-white/30 rounded-lg rotate-12 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  
                  {/* Enhanced floating geometric elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-4 right-16 w-3 h-16 bg-gradient-to-b from-white/40 to-transparent rounded-full transform rotate-12 group-hover:rotate-24 transition-transform duration-1000"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-3 bg-gradient-to-r from-white/40 to-transparent rounded-full transform -rotate-12 group-hover:rotate-0 transition-transform duration-1000"></div>
                    <div className="absolute top-6 left-1/2 w-2 h-8 bg-white/30 rounded-full transform -rotate-6 group-hover:rotate-6 transition-transform duration-1000" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  
                  {/* Premium glass overlay that intensifies on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 group-hover:from-white/10 group-hover:to-black/5 transition-all duration-700"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className={`inline-flex items-center gap-3 px-5 py-2.5 bg-white/25 backdrop-blur-md border border-white/40 text-white text-sm font-black uppercase tracking-wider rounded-2xl shadow-2xl shadow-black/20 group-hover:bg-white/35 group-hover:scale-105 transition-all duration-700 relative overflow-hidden`}>
                          {/* Badge shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg relative"></div>
                          <span className="relative">{key.toUpperCase()}</span>
                        </div>
                      </div>
                      
                      {/* Enhanced scope indicator */}
                      <div className="text-white text-sm font-bold bg-white/25 backdrop-blur-md border border-white/40 px-4 py-2 rounded-xl shadow-lg group-hover:bg-white/35 transition-all duration-500">
                        {project.scope.split(',')[0]}
                      </div>
                    </div>
                    
                    {/* Enhanced floating impact badge */}
                    <div className="flex justify-between items-end">
                      <div className="text-white/90 text-xs font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                          <span>Active Research</span>
                        </div>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs font-semibold rounded-xl transform group-hover:scale-105 transition-all duration-700 shadow-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {project.scope.split(',')[1] || 'Global Impact'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Project Content with Premium Typography */}
                <div className="p-8 flex-1 flex flex-col relative">
                  {/* Sophisticated background gradient overlay */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gray-50/80 to-transparent rounded-full -z-10 group-hover:from-gray-100/80 transition-all duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-50/50 to-transparent rounded-full -z-10"></div>
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-700 leading-tight tracking-tight">
                      {project.title}
                    </h3>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl mb-4 group-hover:bg-gray-50 group-hover:border-gray-300 group-hover:shadow-md transition-all duration-500 shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.challenge}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-8 text-base flex-1 group-hover:text-gray-700 transition-colors duration-700 font-medium">
                    {project.description}
                  </p>
                  
                  {/* Enhanced highlights with premium pill design */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.accent} animate-pulse shadow-sm`}></div>
                      <span className="text-sm font-black text-gray-700 uppercase tracking-wider">Key Innovations</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                      {project.highlights.split(' • ').map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold shadow-sm hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-400 group-hover:transform group-hover:scale-105"
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced CTA with premium glass button */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                    <Link
                      href={project.url}
                      target={project.url.startsWith('http') ? '_blank' : '_self'}
                      rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`group/btn inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r ${project.accent} text-white font-bold text-lg rounded-2xl transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:shadow-current/30 relative overflow-hidden shadow-lg`}
                    >
                      {/* Enhanced button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      
                      <span className="relative font-black tracking-wide">Explore {key.toUpperCase()}</span>
                      <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-500 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    
                    {/* Enhanced status indicator */}
                    <div className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-500">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                        <span className="font-semibold">Active Research</span>
                      </div>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Portfolio Integration Message */}
          <div className="mt-24 text-center">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-900/10 max-w-4xl mx-auto relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-hopkins-blue/5 to-transparent rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-hopkins-gold/5 to-transparent rounded-full"></div>
              
              <div className="relative">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-hopkins-blue/10 to-hopkins-spirit-blue/10 rounded-xl mb-6">
                  <div className="w-2 h-2 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Integrated Research Portfolio</span>
                </div>
                
                <h2 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                  Computational Epidemiology<br />
                  <span className="text-2xl font-bold text-gray-600">at the Speed of Decision-Making</span>
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  From real-time HIV intervention modeling to aging population health challenges, these three platforms work in concert to provide the computational backbone for evidence-based public health policy nationwide.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/publications"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-hopkins-blue/25 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <span className="relative">View Publications</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                  
                  <Link
                    href="mailto:compepi@jhu.edu"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Start a Collaboration</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
