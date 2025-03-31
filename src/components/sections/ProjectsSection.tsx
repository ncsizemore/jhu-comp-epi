import Link from 'next/link';

export default function ProjectsSection() {
  const projects = [
    {
      id: 'jheem',
      title: 'Johns Hopkins Epidemiological and Economic Model',
      shortName: 'JHEEM',
      description: 'A comprehensive framework for simulating HIV transmission dynamics and evaluating the impact of prevention and treatment interventions across diverse populations.',
      color: 'bg-hopkins-blue',
      stats: { cities: '15', publications: '24' }
    },
    {
      id: 'shield',
      title: 'Syphilis and HIV Integrated Epidemiologic and Economic Dynamics',
      shortName: 'SHIELD',
      description: 'Modeling the complex interactions between syphilis and HIV transmission to optimize intervention strategies and resource allocation at the local level.',
      color: 'bg-hopkins-gold',
      stats: { cities: '8', publications: '13' }
    },
    {
      id: 'pearl',
      title: 'ProjEcting Age, multimoRbidity, and poLypharmacy',
      shortName: 'PEARL',
      description: 'A novel modeling approach to understand and forecast age-related comorbidities and medication interactions in populations living with HIV.',
      color: 'bg-hopkins-spirit-blue',
      stats: { scenarios: '10+', publications: '9' }
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-hopkins-blue/10 rounded-full text-hopkins-blue mb-3">Our Research</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Modeling <span className="text-hopkins-blue">Projects</span></h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced computational frameworks addressing critical public health challenges
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
              <div className={`${project.color} h-48 flex items-center justify-center text-white relative overflow-hidden group-hover:h-52 transition-all duration-300`}>
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
                <div className="z-10 relative text-center">
                  <span className="text-4xl font-bold">{project.shortName}</span>
                  <div className="w-16 h-1 bg-white/50 mx-auto mt-2 rounded"></div>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{project.title}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
                <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                  {'cities' in project.stats ? (
                    <span>{project.stats.cities} Cities</span>
                  ) : (
                    <span>{project.stats.scenarios} Scenarios</span>
                  )}
                  <span>{project.stats.publications} Publications</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link 
                  href={`/projects/${project.id}`} 
                  className="text-hopkins-blue font-medium hover:opacity-80 flex items-center"
                >
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}