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

// Project-specific content
const projectContent: Record<string, {
  fullDescription: string;
  keyFeatures: string[];
  externalUrl: string;
  externalLabel: string;
}> = {
  jheem: {
    fullDescription: "JHEEM employs mathematical modeling to understand and predict HIV transmission and the impact of interventions across local populations. The simulated population is stratified by age, race, sex, sexual behavior, and drug use to capture population diversity. Calibrated to real-world HIV surveillance data from 32 U.S. cities under the Ending the HIV Epidemic Initiative, JHEEM enables precise projections of how interventions may influence future transmission and inform evidence-based public health strategies.",
    keyFeatures: [
      "Real-time intervention modeling",
      "Testing, PrEP & viral suppression",
      "Demographic targeting",
      "Cost-effectiveness analysis"
    ],
    externalUrl: "https://jheem-portal.vercel.app",
    externalLabel: "Access JHEEM Portal"
  },
  shield: {
    fullDescription: "SHIELD employs mathematical modeling to study the transmission and control of HIV and syphilis across local populations. The models cover 32 U.S. cities, encompassing all Ending the HIV Epidemic (EHE) urban jurisdictions, which account for approximately 60% of both HIV and syphilis diagnoses. SHIELD simulates populations stratified by demographic and behavioral factors to capture population diversity and enables projections of disease spread and intervention impact, supporting evidence-based public health planning and policy decisions.",
    keyFeatures: [
      "Doxy-PEP innovation",
      "Point-of-care testing",
      "At-home diagnostics",
      "Cost-effectiveness analysis"
    ],
    externalUrl: "https://ncsizemore.github.io/shield-project/",
    externalLabel: "Visit SHIELD Site"
  },
  pearl: {
    fullDescription: "PEARL employs agent-based simulation to model aging and multimorbidity in people living with HIV. Leveraging NA-ACCORD data from over 200 clinical sites with 190,000+ participants, PEARL projects health outcomes through 2030, addressing the complexities of polypharmacy and multimorbidity as life expectancy approaches general population levels.",
    keyFeatures: [
      "Demographic modeling",
      "Healthcare costs projection",
      "2009-2030 projections",
      "Multimorbidity patterns"
    ],
    externalUrl: "https://pearlhivmodel.org/",
    externalLabel: "Visit PEARL Site"
  }
};

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  // If project doesn't exist, return 404
  if (!project) {
    notFound();
  }

  const content = projectContent[id as keyof typeof projectContent];

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
                <p className="mb-8 leading-relaxed">{content.fullDescription}</p>
              </div>

              {/* Key Features */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-hopkins-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Tool Link */}
              <div className="mt-8">
                <a
                  href={content.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-hopkins-blue to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span>{content.externalLabel}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="md:col-span-1">
              {/* Project Scope */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Project Scope</h3>
                <div className="space-y-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Figure Placeholder */}
              <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 mb-6">
                <div className="aspect-square bg-white rounded flex items-center justify-center text-gray-400 text-sm">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Figure Coming Soon</p>
                  </div>
                </div>
              </div>

              {/* Publications Link */}
              <div className="bg-hopkins-blue/10 p-6 rounded-lg border border-hopkins-blue/20">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Publications</h3>
                <p className="text-sm text-gray-600 mb-4">View research publications related to {project.shortName}</p>
                <Link
                  href="/publications"
                  className="inline-flex items-center gap-2 text-hopkins-blue hover:text-hopkins-blue/80 font-medium text-sm"
                >
                  <span>Browse Publications</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
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