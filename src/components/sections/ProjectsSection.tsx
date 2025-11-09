import { Project } from '@/lib/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
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
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              id={project.id}
              title={project.title}
              shortName={project.shortName}
              description={project.description}
              color={project.color}
              stats={project.stats}
            />
          ))}
        </div>
      </div>
    </section>
  );
}