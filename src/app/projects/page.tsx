import Link from 'next/link';
import type { CSSProperties } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { getProjects, type Project, type ProjectStats } from '@/lib/data/projects';

export const metadata = {
  title: 'Projects | JHU Computational Epidemiology',
  description:
    'Decision-support modeling projects for HIV, STI, and population health policy questions.',
};

const STAT_LABELS: Record<keyof ProjectStats, string> = {
  cities: 'cities',
  states: 'states',
  locations: 'locations',
  publications: 'publications',
  scenarios: 'scenarios',
  countries: 'countries',
  incomeGroups: 'income groups',
};

const WORKFLOW_STEPS = [
  {
    label: 'Ground the question locally',
    text: 'Start with surveillance, care, demographic, and program data from the places where decisions are made.',
  },
  {
    label: 'Represent transmission and care',
    text: 'Use mechanistic models to connect population structure, intervention pathways, and epidemic dynamics.',
  },
  {
    label: 'Compare realistic choices',
    text: 'Test prevention, treatment, testing, funding, and implementation scenarios against a common baseline.',
  },
  {
    label: 'Return decision-ready evidence',
    text: 'Summarize projected infections, incidence, costs, reach, and tradeoffs in forms teams can discuss.',
  },
];

const PROJECT_ACTION_CLASS =
  'inline-flex w-fit items-center border border-[color:var(--color-rule)] px-3 py-2 text-sm font-semibold text-[color:var(--color-link)] transition-colors hover:border-[color:var(--color-link)] hover:bg-[#f8fafc]';

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
  gmha: {
    role: 'Global HIV aging and care planning',
    decision:
      'How will the age distribution of people living with HIV change across countries, income groups, and global populations through 2040?',
    audience: 'HIV modelers, clinicians, policy researchers, and conference collaborators',
    geography: 'Nine countries, four income-group aggregates, UNAIDS remainder, and global estimates',
    products: 'Interactive projections, calibration review, and conference-facing summaries for GMHA analyses',
    compare: ['Age distribution shifts', 'Counts and proportions', 'Sex-stratified projections', 'Calibration against surveillance data'],
  },
};

const PROJECT_VISUALS: Record<
  string,
  {
    index: string;
    accent: string;
    tint: string;
    surface: string;
  }
> = {
  jheem: {
    index: '01',
    accent: '#002D72',
    tint: '#f5f8fc',
    surface: 'Jurisdictional HIV policy',
  },
  gmha: {
    index: '02',
    accent: '#087b94',
    tint: '#f2fbfd',
    surface: 'Global HIV aging and care planning',
  },
  shield: {
    index: '03',
    accent: '#b56a00',
    tint: '#fff8eb',
    surface: 'HIV/STI co-epidemic strategy',
  },
};

function formatScope(stats: ProjectStats) {
  return Object.entries(stats)
    .filter(([, value]) => value && value !== '0')
    .map(([key, value]) => `${value} ${STAT_LABELS[key as keyof ProjectStats] ?? key}`)
    .join(' / ');
}

function ProjectToolLink({ project }: { project: Project }) {
  if (project.externalUrl.startsWith('/')) {
    return (
      <Link href={project.externalUrl} className={PROJECT_ACTION_CLASS}>
        {project.externalLabel}
      </Link>
    );
  }

  return (
    <a
      href={project.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={PROJECT_ACTION_CLASS}
    >
      {project.externalLabel}
    </a>
  );
}

function projectPrimaryHref(project: Project) {
  return project.id === 'gmha' ? project.externalUrl : `/projects/${project.id}`;
}

function projectVisual(project: Project) {
  return PROJECT_VISUALS[project.id] ?? PROJECT_VISUALS.jheem;
}

function projectStyle(project: Project): CSSProperties {
  const visual = projectVisual(project);

  return {
    '--project-accent': visual.accent,
    '--project-tint': visual.tint,
  } as CSSProperties;
}

function ProjectsIntro({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#f7fafd]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Modeling portfolio
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl">
              Projects
            </h1>
            <p className="mt-6 max-w-4xl text-2xl leading-snug text-[color:var(--color-ink)] md:text-3xl">
              Decision-support models for HIV, STI, and care-system questions
              where timing, geography, and implementation choices matter.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[color:var(--color-muted)]">
              The lab maintains a focused set of modeling programs that turn
              surveillance data, mechanistic assumptions, and intervention
              scenarios into comparisons that research and policy teams can use.
            </p>
          </div>

          <nav
            aria-label="Project shortcuts"
            className="border-t border-[color:var(--color-rule)] pt-5 lg:border-l lg:border-t-0 lg:pl-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Active programs
            </p>
            <div className="mt-5 border-t border-[color:var(--color-rule)]">
              {projects.map(project => {
                const visual = projectVisual(project);

                return (
                  <Link
                    key={project.id}
                    href={projectPrimaryHref(project)}
                    style={projectStyle(project)}
                    className="group grid grid-cols-[1rem_minmax(0,1fr)] gap-3 border-b border-[color:var(--color-rule)] py-4"
                  >
                    <span
                      className="mt-2 h-2 w-2 bg-[var(--project-accent)]"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-serif text-xl leading-tight text-[color:var(--color-ink)] group-hover:text-[color:var(--color-link)]">
                        {project.shortName}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-[color:var(--color-muted)]">
                        {visual.surface}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

function ModelingWorkflow() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Modeling workflow
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
              From evidence to choices.
            </h2>
          </div>
          <ol className="grid border-t border-[color:var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
            {WORKFLOW_STEPS.map((step, index) => (
              <li
                key={step.label}
                className="border-b border-[color:var(--color-rule)] py-5 md:px-5 xl:border-b-0 xl:border-r xl:last:border-r-0"
              >
                <div>
                  <p className="font-mono text-xs text-[color:var(--color-muted)]">
                    0{index + 1}
                  </p>
                  <h3 className="font-serif text-xl leading-tight text-[color:var(--color-ink)]">
                    {step.label}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProjectDossier({ project }: { project: Project }) {
  const details = PROJECT_DETAILS[project.id];
  const visual = projectVisual(project);

  return (
    <article
      style={projectStyle(project)}
      className="overflow-hidden border border-[color:var(--color-rule)] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.045)]"
    >
      <div className="h-1 bg-[var(--project-accent)]" />
      <div className="grid lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside className="border-b border-[color:var(--color-rule)] bg-[var(--project-tint)] p-5 md:p-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-[color:var(--color-muted)]">
              {visual.index}
            </p>
            <span className="h-2 w-12 bg-[var(--project-accent)]" aria-hidden="true" />
          </div>
          <h3 className="mt-6 font-serif text-3xl leading-tight text-[color:var(--color-ink)] md:mt-7 md:text-4xl">
            <Link href={projectPrimaryHref(project)} className="hover:text-[color:var(--color-link)]">
              {project.shortName}
            </Link>
          </h3>
          <p className="mt-3 font-serif text-xl leading-snug text-[color:var(--color-ink)]">
            {project.title}
          </p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
            {details.role}
          </p>

          <dl className="mt-7 space-y-5 border-t border-[color:var(--color-rule)] pt-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Scope
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink)]">
                {formatScope(project.stats)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Geography
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink)]">
                {details.geography}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Model surface
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink)]">
                {visual.surface}
              </dd>
            </div>
          </dl>
        </aside>

        <div className="p-5 md:p-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                Decision question
              </p>
              <p className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-[color:var(--color-ink)] md:text-3xl">
                {details.decision}
              </p>
            </div>
            <div className="border-t border-[color:var(--color-rule)] pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                Project output
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {details.products}.
              </p>
            </div>
          </div>

          <p className="mt-7 max-w-3xl text-base leading-relaxed text-[color:var(--color-ink)]">
            {project.description}
          </p>

          <div className="mt-7 grid gap-6 border-t border-[color:var(--color-rule)] pt-6 md:mt-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Audience
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
                {details.audience}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Compare
              </h4>
              <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm leading-relaxed text-[color:var(--color-ink)] sm:grid-cols-2">
                {details.compare.map(item => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.55rem] h-px w-4 flex-none bg-[var(--project-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 border-t border-[color:var(--color-rule)] pt-5 md:mt-8 md:pt-6">
            {project.id !== 'gmha' && (
              <Link href={`/projects/${project.id}`} className={PROJECT_ACTION_CLASS}>
                Read project overview
              </Link>
            )}
            <ProjectToolLink project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <p className="max-w-4xl border-t border-[color:var(--color-rule)] pt-5 text-lg leading-relaxed text-[color:var(--color-ink)]">
          Each program is anchored to a concrete decision environment, with
          outputs organized around the audiences, geographies, and comparisons
          each model supports.
        </p>

        <div className="mt-10 space-y-7">
          {projects.map(project => (
            <ProjectDossier key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Collaboration() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
            Collaboration
          </h2>
          <div className="border-t border-[color:var(--color-rule)] pt-5 lg:border-t-0 lg:pt-0">
            <p className="max-w-3xl text-base leading-relaxed text-[color:var(--color-ink)]">
              The lab works with researchers, health departments, clinicians, and
              community partners on model calibration, scenario design, and
              policy-facing analysis.
            </p>
            <p className="mt-5 text-sm">
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
    </section>
  );
}

export default async function ProjectsPage() {
  const projectsList = await getProjects();

  return (
    <MainLayout>
      <ProjectsIntro projects={projectsList} />
      <ModelingWorkflow />
      <ProjectList projects={projectsList} />
      <Collaboration />
    </MainLayout>
  );
}
