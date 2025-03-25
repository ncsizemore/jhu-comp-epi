import Link from 'next/link';

export default function ProjectsSection() {
  const projects = [
    {
      id: 'jheem',
      title: 'Johns Hopkins Epidemiological and Economic Model',
      shortName: 'JHEEM',
      description: 'A comprehensive framework for simulating HIV transmission dynamics and evaluating the impact of prevention and treatment interventions across diverse populations.',
      color: 'bg-teal-700',
      stats: { cities: '15', publications: '24' }
    },
    {
      id: 'shield',
      title: 'Syphilis and HIV Integrated Epidemiologic and Economic Dynamics',
      shortName: 'SHIELD',
      description: 'Modeling the complex interactions between syphilis and HIV transmission to optimize intervention strategies and resource allocation at the local level.',
      color: 'bg-rose-600',
      stats: { cities: '8', publications: '13' }
    },
    {
      id: 'pearl',
      title: 'ProjEcting Age, multimoRbidity, and poLypharmacy',
      shortName: 'PEARL',
      description: 'A novel modeling approach to understand and forecast age-related comorbidities and medication interactions in populations living with HIV.',
      color: 'bg-purple-600',
      stats: { scenarios: '10+', publications: '9' }
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-teal-700">Our Research</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Modeling Projects</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced computational frameworks addressing critical public health challenges
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className={`${project.color} h-48 flex items-center justify-center text-white`}>
                <span className="text-3xl font-bold">{project.shortName}</span>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
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
                  className="text-teal-700 font-medium hover:text-teal-800"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}