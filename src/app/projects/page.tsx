import Link from 'next/link';
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

const APPROACH_STEPS = [
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

function formatScope(stats: ProjectStats) {
  return Object.entries(stats)
    .filter(([, value]) => value && value !== '0')
    .map(([key, value]) => `${value} ${STAT_LABELS[key as keyof ProjectStats] ?? key}`)
    .join(' / ');
}

function ProjectToolLink({ project }: { project: Project }) {
  const className = 'text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]';

  if (project.externalUrl.startsWith('/')) {
    return (
      <Link href={project.externalUrl} className={className}>
        {project.externalLabel}
      </Link>
    );
  }

  return (
    <a
      href={project.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {project.externalLabel}
    </a>
  );
}

function ProjectsIntro() {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Decision support
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
              Projects
            </h1>
          </div>
          <div>
            <p className="max-w-4xl text-xl leading-relaxed text-[color:var(--color-ink)]">
              We build modeling projects that help researchers, clinicians,
              public-health teams, and policymakers compare possible futures
              before decisions are made.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[color:var(--color-muted)]">
              Each project is organized around a concrete decision problem: what
              evidence is available, what choices are being compared, who will use
              the results, and where the findings apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SharedApproach() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Shared approach
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
              From local evidence to practical comparisons.
            </h2>
          </div>
          <div className="border-t border-[color:var(--color-rule)]">
            <div className="grid gap-px bg-[color:var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
              {APPROACH_STEPS.map(step => (
                <article key={step.label} className="bg-white px-5 py-6">
                  <h3 className="font-serif text-xl leading-tight text-[color:var(--color-ink)]">
                    {step.label}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectDossier({ project }: { project: Project }) {
  const details = PROJECT_DETAILS[project.id];

  return (
    <article className="border-t border-[color:var(--color-rule)] py-10 first:border-t-0 first:pt-0 md:py-12">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
            {project.shortName}
          </p>
          <h3 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
            <Link href={`/projects/${project.id}`} className="hover:text-[color:var(--color-link)]">
              {project.shortName}
            </Link>
          </h3>
          <p className="mt-2 max-w-xl font-serif text-xl leading-snug text-[color:var(--color-ink)]">
            {project.title}
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
            {details.role}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-ink)]">
            {project.description}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--color-muted)]">
            {details.products}.
          </p>
          <p className="mt-6 text-sm text-[color:var(--color-muted)]">
            <span className="font-semibold text-[color:var(--color-ink)]">Scope:</span>{' '}
            {formatScope(project.stats)}
          </p>
        </div>

        <div className="border-t border-[color:var(--color-rule)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
            Decision it informs
          </p>
          <p className="mt-3 font-serif text-2xl leading-snug text-[color:var(--color-ink)]">
            {details.decision}
          </p>

          <div className="mt-7 grid gap-6 border-t border-[color:var(--color-rule)] pt-6 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Who it serves
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
                {details.audience}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                Where it applies
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
                {details.geography}
              </p>
            </div>
          </div>

          <div className="mt-7 border-t border-[color:var(--color-rule)] pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
              What teams can compare
            </h4>
            <ul className="mt-4 grid gap-x-6 gap-y-3 text-sm leading-relaxed text-[color:var(--color-ink)] sm:grid-cols-2">
              {details.compare.map(item => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.55rem] h-px w-5 flex-none bg-[color:var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-[color:var(--color-rule)] pt-6 text-sm">
            <Link
              href={`/projects/${project.id}`}
              className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
            >
              Read project overview
            </Link>
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
        <div className="mb-10 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Current projects
            </p>
            <h2 className="mt-3 font-serif text-2xl text-[color:var(--color-ink)]">
              Active decision-support models
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-[color:var(--color-muted)]">
            The projects below are intentionally framed around use: the decision
            being tested, the audiences involved, the geographic scale, and the
            comparison outputs.
          </p>
        </div>

        {projects.map(project => (
          <ProjectDossier key={project.id} project={project} />
        ))}
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
      <ProjectsIntro />
      <SharedApproach />
      <ProjectList projects={projectsList} />
      <Collaboration />
    </MainLayout>
  );
}
