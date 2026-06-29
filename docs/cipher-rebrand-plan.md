# CIPHER Lab Rebrand Plan

Created: 2026-06-29

## Purpose

This plan tracks the site/content migration from the Johns Hopkins
Computational Epidemiology Lab framing to the new CIPHER Lab identity:

**CIPHER Lab**  
Computational and Infectious Disease Public Health Epidemiology Research

The goal is to make the public site feel like a coherent lab identity, not a
set of search-and-replace edits. The rebrand should broaden the site beyond
HIV/JHEEM while preserving continuity for existing projects, publications,
links, and collaborators.

## Senior SWE / Design Position

- Use **CIPHER Lab** as the visible brand almost everywhere.
- Use the full expansion once near the top of the homepage and where helpful
  for first-time readers.
- Keep Johns Hopkins affiliation clear, but secondary: the lab is housed within
  the Johns Hopkins Schools of Public Health and Medicine, but the header should
  lead with CIPHER rather than the JHU mark.
- Treat JHEEM's name change as continuity, not a break. The model, acronym, and
  prior citations remain connected.
- Do not rewrite historical publication titles or citation metadata. Add a
  transition note where readers need interpretation.
- Do not add placeholder collaborators, talks, or bios without source content
  and consent.

## Copy Handling Principle

Treat the stakeholder-provided copy in the appendix as the source of truth for
the rebrand. The implementation should preserve the substance and wording unless
a specific edit is reviewed.

Recommended interpretation:

- Replace older identity-level copy rather than layering the new copy on top of
  it.
- Reuse existing content only where it supports the new CIPHER Lab positioning.
- Keep strong existing page elements, such as the findings map, but reframe them
  as examples of CIPHER's broader decision-support work.
- Adapt sectioning, line breaks, hierarchy, and surrounding interface text for
  web readability.
- Do not silently soften or rewrite the JHEEM transition language.

## Phase 1: Sitewide Rebrand

### Repo changes

- Update global metadata in `src/app/layout.tsx`.
- Update shared header/footer branding.
- Remove the Johns Hopkins logo from the primary landing/header experience.
- Replace visible "Computational Epidemiology Lab" language with "CIPHER Lab"
  where it refers to the lab brand.
- Keep institutional affiliation in homepage copy and footer.
- Update README/project docs after the public-facing site is updated.

### Design direction

- Build a simple text-based CIPHER identity first rather than rushing a logo.
- Header should read as CIPHER Lab, restrained and academic, with JHU affiliation
  handled in footer/context copy.
- Avoid a large acronym lockup that feels like a temporary placeholder.

### Acceptance criteria

- The homepage first viewport clearly says CIPHER Lab.
- The site does not visually read as "the JHU logo site with a new name pasted
  into content."
- Footer still makes affiliation and contact information clear.

## Phase 2: Homepage Content

### Replace / revise homepage intro

Use the provided content as the source of truth, adapted for web rhythm:

- CIPHER Lab name and expansion.
- Housed within the Johns Hopkins Schools of Public Health and Medicine.
- Multidisciplinary modeling team.
- Policy-relevant models of infectious disease dynamics.
- U.S. and global public health decision support.

### Research section

Do not implement "Second tab" as a literal tab unless the design calls for it.
Recommended structure:

- `Our Research`
- `Diseases of Focus`
- `Geographic Reach`
- `Public Health Impact`
- `Decision Support for Policy and Practice`

### Content notes

- Include HIV/AIDS, syphilis/STIs, HPV, TB, and aging/comorbidities among
  people living with HIV.
- Preserve the homepage findings map if it still fits the page narrative, but
  introduce it as one example of CIPHER's decision-support work rather than the
  whole identity of the lab.

## Phase 3: JHEEM Rename and Continuity

### Rename

Update public-facing JHEEM name to:

**Joint HIV Epidemiology and Economic Model (JHEEM)**

### Continuity note

Add the team's formal note on the JHEEM project detail page and possibly the
JHEEM section of the Projects page:

> The Joint HIV Epidemiology and Economic Model (JHEEM) was previously published
> under the name "Johns Hopkins Epidemiology and Economic Model" (JHEEM). The
> acronym has been retained; the name was revised in 2026 to reflect the model's
> expanded use beyond a single institutional context. Citations referencing the
> prior name should be considered equivalent for the purposes of attribution,
> reproducibility, and methodological continuity.

### Implementation targets

- `src/data/projects.ts`
- `src/lib/projects/config.ts`
- `src/app/projects/page.tsx`
- `src/app/projects/[id]/page.tsx`
- homepage JHEEM references
- team bios where the model name is descriptive rather than a publication title

### Do not change without review

- Publication titles.
- Published abstracts if they are intended to mirror source records.
- DOI/citation metadata.

## Phase 4: Projects Page Cleanup

### Requested change

- Remove project publication counts from JHEEM and other project cards/metadata
  displays.

### Likely implementation

- Remove `publications` from project-level displayed stats.
- Consider whether `ProjectStats.publications` should be removed from the type
  entirely or simply not rendered.
- Keep the Publications page's total publication counts unless separately
  requested.

### Design note

The Projects page is improving, but it still benefits from gradual refinement.
Avoid using the rebrand as an excuse for another full redesign unless the new
homepage identity makes the page feel inconsistent.

## Phase 5: Publications Page Expansion

### Requested addition

Add a section for:

- Conference presentations.
- Invited talks.

### Blocked until content exists

Ask Melissa for structured data:

- title
- presenter(s)
- event or host
- location
- date
- talk type: conference presentation, poster, invited talk, panel, workshop
- project or disease area
- link/slides/abstract if public

### Recommended implementation

- Add a separate data file, not mixed into peer-reviewed publications unless the
  schema is intentionally generalized.
- Keep publications and talks visually related but clearly distinct.
- Do not imply talks are peer-reviewed publications.

## Phase 6: Team and Collaborators

### Requested future section

Add a `Consultants` or `Collaborators and Consultants` section after outreach
and consent.

Potential names mentioned:

- JHEEM: Scott, Javier, Caleb.
- SHIELD: Khalil.
- GMHA: Keri.

### Need from team

- confirmation of full names and preferred titles
- project associations
- short bios
- headshots, if desired
- public profile links
- consent to list on the public site

### Known profile links

- Khalil G. Ghanem:
  `https://profiles.hopkinsmedicine.org/provider/khalil-g-ghanem/2705292`
- Kendall Reid:
  `https://kreid415.github.io/`

### Reminder

When the website is ready for collaborator review, remind Parastu/Melissa to
send outreach messages asking collaborators for short bios and preferred public
links.

## Phase 7: Domain, Redirects, and Infrastructure

### Domain

Recommended direction:

- Add a new CIPHER-oriented Vercel domain.
- Keep the old Vercel domain active.
- Redirect the old domain to the new domain once the new domain is stable.
- Add canonical metadata after the production domain is decided.

### Domain decisions to confirm

- Desired public URL.
- Whether this will remain a Vercel subdomain or move to a custom domain.
- Whether old links should redirect at the host/domain level or route level.

### GitHub

Prefer a GitHub organization over a standalone new repository if the team will
own multiple projects over time.

Decisions to confirm:

- organization name availability
- owner/admin list
- whether to transfer this repo or keep it under the current owner
- Vercel deployment impact of any repo transfer
- naming convention for future repos

### Email

Use a JHU-managed group inbox if possible. Do not create an informal personal
email account for lab infrastructure.

Decisions to confirm:

- desired address, e.g. `cipherlab@jhu.edu`
- owner(s)
- forwarding/list behavior
- whether address should appear publicly on the site

## Phase 8: Verification and Deployment

Before pushing deployable changes:

```bash
npm run lint
npm run test:run
npm run build
```

After deploy:

- smoke test `/`
- smoke test `/projects`
- smoke test `/projects/jheem`
- smoke test `/global-aging`
- smoke test `/publications`
- smoke test `/team`
- verify old GMHA route behavior remains correct:
  `/projects/gmha` redirects to `/global-aging`
- verify old site domain redirects once domain work is configured

## Open Questions

- What exact public domain should represent CIPHER Lab?
- Should the primary header remove the JHU logo globally or only on the
  homepage? Recommendation: remove globally from the primary header, retain JHU
  affiliation in footer and copy.
- What email address is available through JHU?
- What GitHub organization name is available and preferred?
- Should `CIPHER Lab` be styled as a subtle wordmark, or remain plain text for
  now?
- Should the homepage findings map stay on the homepage after the broadened
  research overview is added?
- What data should power conference presentations and invited talks?
- Who will coordinate collaborator outreach and bio collection?

## Suggested Session Plan

### Session 1

- Sitewide brand strings and metadata.
- Header/footer update.
- Homepage intro and research overview.
- JHEEM rename in core project data.
- Remove project publication counts.
- Run full verification and checkpoint.

### Session 2

- JHEEM detail-page continuity note.
- Audit remaining old-name references.
- Update README/docs for CIPHER.
- Review homepage design in browser.
- Push if stable.

### Session 3

- Add presentations/talks once Melissa provides data.
- Add collaborator section once bios/links/consent are available.
- Domain/canonical redirect work once URL is confirmed.

## Appendix: Stakeholder-Provided Source Copy

This section preserves the supplied copy as source material for implementation.
The smiley in the original message after the lab expansion appears
conversational rather than intended public copy; confirm if the team wants it
treated otherwise.

### Lab Name

CIPHER Lab: Computational and Infectious Disease Public Health Epidemiology
Research

### Homepage Intro

CIPHER Lab: Computational and Infectious Disease Public Health Epidemiology
Research

CIPHER Lab is a multidisciplinary research team housed within the Johns Hopkins
Schools of Public Health and Medicine. Our faculty, researchers, and trainees
develop policy-relevant models of infectious disease dynamics to support public
health decision-making in the United States and globally.

By integrating epidemiologic data, mathematical modeling, simulation, and
statistical inference, we generate actionable evidence on disease transmission,
prevention, treatment, and population health outcomes. Our work bridges research
and practice, providing insights that help public health agencies, healthcare
systems, and policymakers respond to current and emerging health challenges.

### Our Research

CIPHER Lab studies how diseases spread, how interventions affect population
health, and how public health resources can be deployed most effectively. We
develop and apply computational models to answer questions that matter for
prevention, treatment, health equity, and policy.

### Diseases of Focus

Our research focuses on infectious diseases and their long-term health
consequences, including: HIV/AIDS, Syphilis and other sexually transmitted
infections, Human papillomavirus (HPV), Tuberculosis (TB), Aging and
comorbidities among people living with HIV

### Geographic Reach

We maintain a suite of locally calibrated models across multiple U.S. cities and
more than 30 states, enabling analyses that reflect local epidemiology,
healthcare systems, and population needs.

Our work also extends globally through studies of HIV and TB in selected
countries, supporting evidence-based decision-making across diverse settings.

### Public Health Impact

Our research helps answer critical questions such as:

- How can prevention and screening programs be optimized?
- What are the long-term impacts of treatment and care strategies?
- How do policy changes affect health outcomes?
- Where should limited public health resources be invested for greatest impact?
- How will demographic and epidemiologic changes shape future health needs?

### Decision Support for Policy and Practice

We collaborate with public health agencies, healthcare organizations, and
policymakers to evaluate interventions, project future disease burden, assess
program effectiveness, and inform resource allocation. Through peer-reviewed
research, public tools, and policy-focused analyses, we provide evidence that
supports better health decisions and stronger public health systems.

### JHEEM Transition Note

The Joint HIV Epidemiology and Economic Model (JHEEM) was previously published
under the name "Johns Hopkins Epidemiology and Economic Model" (JHEEM). The
acronym has been retained; the name was revised in 2026 to reflect the model's
expanded use beyond a single institutional context. Citations referencing the
prior name should be considered equivalent for the purposes of attribution,
reproducibility, and methodological continuity.
