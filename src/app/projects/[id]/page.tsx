import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { projects } from '@/data/projects';

// Define the page parameters (Next.js 15 - params is a promise)
type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.shortName} | JHU Computational Epidemiology`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  // Find the project by ID
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  
  // If project doesn't exist, return 404
  if (!project) {
    notFound();
  }
  
  return (
    <MainLayout>
      {/* Hero section with project title and overview */}
      <section className={`${project.color} text-white py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('/graph-pattern.svg')] bg-[length:20px_20px] opacity-[0.05] z-0"></div>
        <div className="absolute -right-24 -top-24 w-64 h-64 bg-white/[0.1] rounded-full blur-sm"></div>
        <div className="absolute -left-24 bottom-0 w-64 h-64 bg-white/[0.05] rounded-full blur-sm"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <Link href="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Projects
              </Link>
              
              <h1 className="text-4xl font-bold mb-4">{project.shortName}</h1>
              <h2 className="text-2xl font-light mb-6">{project.title}</h2>
              <p className="text-xl text-white/90 mb-4 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="md:col-span-2 flex justify-center">
              <div className="w-64 h-64 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-7xl font-bold">{project.shortName}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project details section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6 leading-relaxed">This is a placeholder for the project overview. Real content will be added as the project develops.</p>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Project Details</h3>
                <div className="space-y-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action section */}
      <section className="py-12 bg-hopkins-blue/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interested in Collaboration?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team welcomes collaborations with health departments, community organizations, 
            and researchers interested in applying our models to address public health challenges.
          </p>
          <Link 
            href="mailto:compepi@jhu.edu" 
            className="inline-flex items-center justify-center px-6 py-3 bg-hopkins-blue text-white font-medium rounded-md hover:bg-hopkins-blue/90 transition-colors shadow-md"
          >
            Contact Our Team
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}