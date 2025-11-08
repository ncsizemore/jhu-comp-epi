import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import ExternalLinkButton from '@/components/ExternalLinkButton';
import ClickableProjectCard from '@/components/ClickableProjectCard';

export const metadata = {
  title: 'Our Projects | JHU Computational Epidemiology',
  description: 'Three specialized computational frameworks addressing HIV/STI co-infections, aging population health, and epidemic modeling through dynamic mathematical models and agent-based simulations.',
};

export default function ProjectsPage() {
  const projectDetails = {
    jheem: {
      title: 'Johns Hopkins Epidemiological & Economic Model',
      description: 'Projects HIV intervention impact across diverse populations in 32 US cities.',
      challenge: 'Ending the HIV Epidemic in the US',
      scope: '32 EtE cities, 945 compartments',
      highlights: 'Real-time intervention modeling • Testing, PrEP & viral suppression • Demographic targeting',
      url: 'https://jheem-portal.vercel.app',
      gradient: 'from-hopkins-blue to-indigo-800',
      accent: 'from-hopkins-blue to-indigo-600'
    },
    shield: {
      title: 'Syphilis & HIV Integrated Epidemiologic Dynamics',
      description: 'Models HIV-syphilis co-epidemic strategies across high-burden urban jurisdictions.',
      challenge: 'Dual STI epidemics at crisis levels',
      scope: '32 US cities, 60% of diagnoses',
      highlights: 'Doxy-PEP innovation • Point-of-care testing • At-home diagnostics • Cost-effectiveness analysis',
      url: 'https://ncsizemore.github.io/shield-project/',
      gradient: 'from-amber-500 to-orange-600',
      accent: 'from-amber-500 to-orange-600'
    },
    pearl: {
      title: 'Projecting Age, Multimorbidity, & Polypharmacy',
      description: 'Simulates multimorbidity and healthcare needs for aging populations living with HIV.',
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
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-hopkins-blue/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-hopkins-gold/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Our Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Three computational platforms reshaping how we understand and combat health crises—from dual HIV/STI epidemics to aging population challenges
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">3</div>
              <div className="text-gray-300 text-sm font-medium">Frameworks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">200+</div>
              <div className="text-gray-300 text-sm font-medium">Sites Nationwide</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">16</div>
              <div className="text-gray-300 text-sm font-medium">Publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="space-y-8 max-w-6xl mx-auto">
            {Object.entries(projectDetails).map(([key, project]) => (
              <ClickableProjectCard
                key={key}
                href={`/projects/${key}`}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left Side - Content */}
                  <div className="flex-1 p-8 lg:p-12">
                    {/* Project Badge */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <div className="w-6 h-6 bg-white rounded-md"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">{project.title}</h3>
                        <p className="text-sm text-gray-600 font-medium">{project.challenge}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.split(' • ').map((highlight, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <ExternalLinkButton
                      href={project.url}
                      label={`Explore ${key.toUpperCase()}`}
                      accentGradient={project.accent}
                    />
                  </div>

                  {/* Right Side - Stats & Visual */}
                  <div className="lg:w-80 bg-gradient-to-br from-gray-50 to-gray-100/50 p-8 border-l border-gray-200/50">
                    {/* Stats */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Project Scope</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Cities/Sites</span>
                          <span className="font-bold text-gray-900">{key === 'jheem' ? '32' : key === 'shield' ? '32' : '200+'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Publications</span>
                          <span className="font-bold text-gray-900">{key === 'jheem' ? '8' : key === 'shield' ? '0' : '8'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">{key === 'pearl' ? 'Scenarios' : 'Coverage'}</span>
                          <span className="font-bold text-gray-900">{key === 'pearl' ? '10+' : 'National'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Element */}
                    <div className={`h-32 bg-gradient-to-br ${project.gradient} rounded-xl relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/60 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-white/60 rounded-lg rotate-45"></div>
                        <div className="absolute top-1/2 left-1/3 w-2 h-12 bg-white/60 rounded-full"></div>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="text-white/80 text-xs font-bold uppercase tracking-wider">
                          {key.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ClickableProjectCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-900/10">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Ready to Collaborate?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              From real-time HIV intervention modeling to aging population health challenges, these three platforms work in concert to provide the computational backbone for evidence-based public health policy nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/publications"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-hopkins-blue/25 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
              >
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
      </section>
    </MainLayout>
  );
}
