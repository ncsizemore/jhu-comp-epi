import Link from 'next/link';
import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { getProjectById, getProjects, type Project, type ProjectStats } from '@/lib/data/projects';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const STAT_LABELS: Record<keyof ProjectStats, string> = {
  cities: 'cities',
  states: 'states',
  publications: 'publications',
  scenarios: 'scenarios',
  countries: 'countries',
};

const PROJECT_DETAILS: Record<
  string,
  {
    role: string;
    decision: string;
    audience: string;
    geography: string;
    products: string;
    compare: string[];
  }
> = {
  jheem: {
    role: 'HIV intervention and funding policy',
    decision:
      'How could HIV outcomes change if prevention, testing, treatment, or federal program funding shifted across U.S. jurisdictions?',
    audience: 'Health departments, policy teams, and implementation researchers',
    geography: 'U.S. cities, states, and Ending the HIV Epidemic priority jurisdictions',
    products: 'Published analyses, public summaries, and a scenario portal for policy discussion',
    compare: ['Projected infections', 'Incidence change', 'Program impact', 'Scenario comparisons'],
  },
  shield: {
    role: 'HIV/STI co-epidemic strategy',
    decision:
      'Which strategies could help jurisdictions respond to overlapping HIV and syphilis epidemics as new prevention and testing options become available?',
    audience: 'Researchers, urban health departments, clinical teams, and community partners',
    geography: 'High-burden U.S. urban jurisdictions',
    products: 'Model development and intervention evaluation for co-epidemic planning',
    compare: ['Epidemic trajectories', 'Intervention impact', 'Cost-effectiveness', 'Implementation tradeoffs'],
  },
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(project => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

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

function formatScope(stats: ProjectStats) {
  return Object.entries(stats)
    .filter(([, value]) => value && value !== '0')
    .map(([key, value]) => `${value} ${STAT_LABELS[key as keyof ProjectStats] ?? key}`)
    .join(' / ');
}

function ProjectHeader({ project }: { project: Project }) {
  const details = PROJECT_DETAILS[project.id];

  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <Link
              href="/projects"
              className="text-sm text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
            >
              Projects
            </Link>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              {project.shortName}
            </p>
          </div>
          <div>
            <h1 className="font-serif text-5xl leading-tight text-[color:var(--color-ink)]">
              {project.shortName}
            </h1>
            <p className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-[color:var(--color-ink)]">
              {project.title}
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
              {details.role}
            </p>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[color:var(--color-ink)]">
              {project.description}
            </p>
            <p className="mt-6 text-sm text-[color:var(--color-muted)]">
              <span className="font-semibold text-[color:var(--color-ink)]">Scope:</span>{' '}
              {formatScope(project.stats)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionContext({ project }: { project: Project }) {
  const details = PROJECT_DETAILS[project.id];

  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Decision context
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
              What the model helps evaluate.
            </h2>
          </div>
          <div>
            <p className="max-w-4xl font-serif text-2xl leading-snug text-[color:var(--color-ink)] md:text-3xl">
              {details.decision}
            </p>
            <div className="mt-8 grid gap-6 border-t border-[color:var(--color-rule)] pt-6 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                  Who it serves
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
                  {details.audience}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                  Where it applies
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
                  {details.geography}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectEvidence({ project }: { project: Project }) {
  const details = PROJECT_DETAILS[project.id];

  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Model overview
            </p>
            <h2 className="mt-3 font-serif text-2xl text-[color:var(--color-ink)]">
              How the project is used
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-ink)]">
              {project.fullDescription}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--color-muted)]">
              {details.products}.
            </p>
          </div>

          <div className="border-t border-[color:var(--color-rule)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                What teams can compare
              </h3>
              <ul className="mt-4 grid gap-x-6 gap-y-3 text-sm leading-relaxed text-[color:var(--color-ink)] sm:grid-cols-2">
                {details.compare.map(item => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.55rem] h-px w-5 flex-none bg-[color:var(--color-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-[color:var(--color-rule)] pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Model features
              </h3>
              <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[color:var(--color-ink)] sm:grid-cols-2">
                {project.keyFeatures.map(feature => (
                  <li key={feature} className="border-t border-[color:var(--color-rule)] pt-3">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
            Related work
          </h2>
          <div className="grid gap-6 border-t border-[color:var(--color-rule)] pt-6 md:grid-cols-3 lg:border-t-0 lg:pt-0">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Project tool
              </h3>
              <p className="mt-3 text-sm">
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                >
                  {project.externalLabel}
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Publications
              </h3>
              <p className="mt-3 text-sm">
                <Link
                  href="/publications"
                  className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                >
                  Browse publications
                </Link>
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Collaboration
              </h3>
              <p className="mt-3 text-sm">
                <a
                  href="mailto:pkasaie1@jhu.edu"
                  className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                >
                  Contact the lab
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <MainLayout>
      <ProjectHeader project={project} />
      <DecisionContext project={project} />
      <ProjectEvidence project={project} />
      <ProjectActions project={project} />
    </MainLayout>
  );
}
