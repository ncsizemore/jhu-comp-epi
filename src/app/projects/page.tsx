import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import PageIntro from '@/components/ui/PageIntro';
import { getAllProjects, type Project, type ProjectStats } from '@/data/projects';

export const metadata = {
  title: 'Projects | JHU Computational Epidemiology',
  description:
    'Computational modeling platforms for HIV, STI, and population health policy questions.',
};

const STAT_LABELS: Record<keyof ProjectStats, string> = {
  cities: 'Cities',
  states: 'States',
  publications: 'Publications',
  scenarios: 'Scenarios',
  countries: 'Countries',
};

const WORKFLOW_STEPS = [
  {
    label: 'Local epidemic',
    text: 'Start with surveillance, program, and population data for specific places.',
  },
  {
    label: 'Mechanistic model',
    text: 'Represent transmission, diagnosis, prevention, treatment, and behavioral strata.',
  },
  {
    label: 'Policy scenario',
    text: 'Stress-test funding changes, service expansions, new tools, and implementation gaps.',
  },
  {
    label: 'Decision evidence',
    text: 'Report outcomes in terms policymakers can compare: infections, incidence, cost, and equity.',
  },
];

const PROJECT_DETAILS: Record<
  string,
  {
    question: string;
    geography: string;
    outputs: string[];
    evidence: string;
  }
> = {
  jheem: {
    question:
      'How would HIV incidence change if prevention, testing, treatment, or federal program funding shifted across U.S. cities and states?',
    geography: 'U.S. cities, states, and priority jurisdictions',
    outputs: ['Projected infections', 'Incidence change', 'Program impact', 'Scenario comparisons'],
    evidence: 'Published analyses, public portal summaries, and policy-facing scenario tools.',
  },
  shield: {
    question:
      'How should jurisdictions respond to overlapping HIV and syphilis epidemics as new testing and prevention strategies become available?',
    geography: 'High-burden U.S. urban jurisdictions',
    outputs: ['Co-epidemic trajectories', 'Intervention impact', 'Cost-effectiveness', 'Implementation tradeoffs'],
    evidence: 'Model development and intervention evaluation for HIV/STI co-epidemic planning.',
  },
};

function ProjectScope({ stats }: { stats: ProjectStats }) {
  return (
    <dl className="grid grid-cols-3 gap-x-5 gap-y-4 border-t border-[color:var(--color-rule)] pt-5">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key}>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
            {STAT_LABELS[key as keyof ProjectStats] ?? key}
          </dt>
          <dd className="mt-1 font-serif text-3xl leading-none text-[color:var(--color-ink)]">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ModelingWorkflow() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              How the platforms work
            </p>
            <h2 className="mt-3 font-serif text-2xl text-[color:var(--color-ink)]">
              From local data to policy evidence
            </h2>
          </div>
          <div className="grid border-t border-l border-[color:var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((step, index) => (
              <div
                key={step.label}
                className="min-h-48 border-r border-b border-[color:var(--color-rule)] p-5"
              >
                <p className="font-mono text-xs text-[color:var(--color-muted)]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 font-serif text-xl leading-tight text-[color:var(--color-ink)]">
                  {step.label}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectDossier({ project }: { project: Project }) {
  const details = PROJECT_DETAILS[project.id];

  return (
    <article className="border-t border-[color:var(--color-rule)] py-10 first:border-t-0 first:pt-0">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <div className="flex items-baseline gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              {project.shortName}
            </p>
            <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
          </div>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] text-[color:var(--color-ink)]">
            <Link href={`/projects/${project.id}`} className="hover:text-[color:var(--color-link)]">
              {project.title}
            </Link>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink)]">
            {project.description}
          </p>
          <div className="mt-7">
            <ProjectScope stats={project.stats} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="border-t border-[color:var(--color-rule)] pt-5 md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Policy question
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[color:var(--color-ink)]">
              {details.question}
            </p>
          </div>

          <div className="border-t border-[color:var(--color-rule)] pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Geography
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
              {details.geography}
            </p>
          </div>

          <div className="border-t border-[color:var(--color-rule)] pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Evidence product
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
              {details.evidence}
            </p>
          </div>

          <div className="border-t border-[color:var(--color-rule)] pt-5 md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Model outputs
            </h3>
            <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[color:var(--color-ink)] sm:grid-cols-2">
              {details.outputs.map(output => (
                <li key={output} className="flex gap-3">
                  <span className="mt-[0.55rem] h-px w-5 flex-none bg-[color:var(--color-accent)]" />
                  <span>{output}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-[color:var(--color-rule)] pt-5 text-sm md:col-span-2">
            <Link
              href={`/projects/${project.id}`}
              className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
            >
              Read project overview →
            </Link>
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
            >
              {project.externalLabel} →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function PlatformComparison({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
            Platform comparison
          </h2>
          <div className="overflow-x-auto border-t border-l border-[color:var(--color-rule)]">
            <table className="min-w-[680px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                  <th className="border-r border-b border-[color:var(--color-rule)] px-4 py-3 font-semibold">
                    Platform
                  </th>
                  <th className="border-r border-b border-[color:var(--color-rule)] px-4 py-3 font-semibold">
                    Primary focus
                  </th>
                  <th className="border-r border-b border-[color:var(--color-rule)] px-4 py-3 font-semibold">
                    Geography
                  </th>
                  <th className="border-r border-b border-[color:var(--color-rule)] px-4 py-3 font-semibold">
                    Public interface
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} className="align-top">
                    <td className="border-r border-b border-[color:var(--color-rule)] px-4 py-4">
                      <span className="font-semibold text-[color:var(--color-ink)]">
                        {project.shortName}
                      </span>
                    </td>
                    <td className="border-r border-b border-[color:var(--color-rule)] px-4 py-4 text-[color:var(--color-ink)]">
                      {project.challenge}
                    </td>
                    <td className="border-r border-b border-[color:var(--color-rule)] px-4 py-4 text-[color:var(--color-muted)]">
                      {PROJECT_DETAILS[project.id].geography}
                    </td>
                    <td className="border-r border-b border-[color:var(--color-rule)] px-4 py-4">
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                      >
                        {project.externalLabel}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  const projectsList = getAllProjects();

  return (
    <MainLayout>
      <PageIntro
        eyebrow="Modeling infrastructure"
        title="Platforms for policy-facing simulation"
      >
        <p>
          The lab builds modeling systems that connect local epidemic data to
          policy questions about prevention, treatment, testing, funding, and
          implementation.
        </p>
      </PageIntro>

      <ModelingWorkflow />

      <section className="border-b border-[color:var(--color-rule)]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="mb-10 grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
              Active platforms
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-[color:var(--color-ink)]">
              Each platform is built around a different public health decision
              problem, but they share a common design principle: make modeled
              futures legible at the geographic scale where programs operate.
            </p>
          </div>

          {projectsList.map(project => (
            <ProjectDossier key={project.id} project={project} />
          ))}
        </div>
      </section>

      <PlatformComparison projects={projectsList} />

      <section>
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
              Collaboration
            </h2>
            <div className="border-t border-[color:var(--color-rule)] pt-5 md:border-t-0 md:pt-0">
              <p className="max-w-3xl text-base leading-relaxed text-[color:var(--color-ink)]">
                The lab works with researchers, health departments, clinicians,
                and community partners on model calibration, scenario design,
                and policy-facing analysis.
              </p>
              <p className="mt-5 text-sm">
                <a
                  href="mailto:compepi@jhu.edu"
                  className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                >
                  Contact the lab →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
