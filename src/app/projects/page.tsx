import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import ExternalLinkButton from '@/components/ExternalLinkButton';
import ClickableProjectCard from '@/components/ClickableProjectCard';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { getProjectTheme } from '@/lib/projects/config';
import { getAllProjects } from '@/data/projects';

export const metadata = {
  title: 'Our Projects | JHU Computational Epidemiology',
  description: 'Three specialized computational frameworks addressing HIV/STI co-infections, aging population health, and epidemic modeling through dynamic mathematical models and agent-based simulations.',
};

export default function ProjectsPage() {
  const projectsList = getAllProjects();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <HeroBackground />

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
            {projectsList.map((project) => {
              const theme = getProjectTheme(project.id);

              return (
              <ClickableProjectCard
                key={project.id}
                href={`/projects/${project.id}`}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left Side - Content */}
                  <div className="flex-1 p-8 lg:p-12">
                    {/* Project Badge */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${theme.colors.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
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
                        {project.keyFeatures.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <ExternalLinkButton
                      href={project.externalUrl}
                      label={`Explore ${project.shortName}`}
                      accentGradient={theme.colors.gradient}
                    />
                  </div>

                  {/* Right Side - Stats & Visual */}
                  <div className="lg:w-80 bg-gradient-to-br from-gray-50 to-gray-100/50 p-8 border-l border-gray-200/50">
                    {/* Stats */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Project Scope</h4>
                      <div className="space-y-3">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm capitalize">{key}</span>
                            <span className="font-bold text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visual Element */}
                    <div className={`h-32 bg-gradient-to-br ${theme.colors.gradient} rounded-xl relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/60 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-white/60 rounded-lg rotate-45"></div>
                        <div className="absolute top-1/2 left-1/3 w-2 h-12 bg-white/60 rounded-full"></div>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="text-white/80 text-xs font-bold uppercase tracking-wider">
                          {project.shortName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ClickableProjectCard>
              );
            })}
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
