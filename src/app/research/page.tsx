import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Research | CIPHER Lab",
  description:
    "Explore the questions, programs, and evidence behind CIPHER\u2019s research in infectious disease modeling.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <MainLayout editorial className="research-page">
      <section className="research-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Research</span>
          </nav>
          <div className="research-opening">
            <div>
              <p className="kicker">Our research</p>
              <h1>Computational models for infectious disease decisions.</h1>
              <p className="intro">
                We study how diseases spread, how interventions affect
                population health, and how public health resources can be
                deployed most effectively. Our models address questions that
                matter for prevention, treatment, health equity, and policy.
              </p>
            </div>
            <nav className="contents" aria-label="On this page">
              <h2>On this page</h2>
              <div>
                <a href="#questions">Questions we study</a>
                <a href="#scope">Diseases &amp; places</a>
                <a href="#programs">Models &amp; tools</a>
                <a href="#studies">Selected studies</a>
              </div>
            </nav>
          </div>
        </div>
      </section>
      <section
        id="questions"
        className="research-section"
        aria-labelledby="questions-heading"
      >
        <div className="wrap research-split">
          <div className="section-intro">
            <h2 id="questions-heading">Questions that guide our work.</h2>
            <p>
              We collaborate with public health agencies, healthcare
              organizations, and policymakers to examine the choices they face.
            </p>
          </div>
          <ol className="questions">
            <li>
              <p>How can prevention and screening programs be optimized?</p>
            </li>
            <li>
              <p>
                What are the long-term impacts of treatment and care strategies?
              </p>
            </li>
            <li>
              <p>How do policy changes affect health outcomes?</p>
            </li>
            <li>
              <p>
                Where should limited public health resources be invested for
                greatest impact?
              </p>
            </li>
            <li>
              <p>
                How will demographic and epidemiologic changes shape future
                health needs?
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section
        id="scope"
        className="research-section research-scope"
        aria-labelledby="scope-heading"
      >
        <div className="wrap research-split">
          <div className="section-intro">
            <h2 id="scope-heading">
              Different places.
              <br />
              Different health needs.
            </h2>
            <p>
              Our work spans local epidemics and global changes in population
              health.
            </p>
          </div>
          <div className="scope-columns">
            <div>
              <h3>Geographic reach</h3>
              <p>
                We maintain locally calibrated models across U.S. cities and
                states, enabling analyses that reflect local epidemiology,
                healthcare systems, and population needs.
              </p>
              <p>
                Our work also extends globally through studies of HIV in
                selected countries.
              </p>
            </div>
            <div>
              <h3>Diseases &amp; health needs</h3>
              <ul className="disease-list">
                <li>HIV/AIDS</li>
                <li>Syphilis and other sexually transmitted infections</li>
                <li>Human papillomavirus (HPV)</li>
                <li>Aging and comorbidities among people living with HIV</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        id="programs"
        className="research-section"
        aria-labelledby="programs-heading"
      >
        <div className="wrap">
          <div className="program-heading">
            <h2 id="programs-heading">Models &amp; tools</h2>
            <p>
              Explore three of the group&#39;s modeling programs and the
              questions they help investigate.
            </p>
          </div>
          <article className="research-program" aria-labelledby="jheem-heading">
            <div>
              <p className="program-name">JHEEM</p>
              <p className="program-scope">HIV · U.S. cities and states</p>
            </div>
            <div>
              <h3 id="jheem-heading">HIV prevention, care, and policy</h3>
              <p className="program-description">
                Locally calibrated models examine how prevention and care
                strategies could shape HIV epidemics. Funding analyses compare
                scenarios for HIV testing and Ryan White services.
              </p>
            </div>
            <div className="program-destination">
              <a className="text-link" href="https://jheem.org/">
                Explore JHEEM <span aria-hidden="true">↗</span>
              </a>
              <p>
                Open the modeling portal to explore studies and local
                projections.
              </p>
            </div>
          </article>
          <article
            className="research-program"
            aria-labelledby="shield-heading"
          >
            <div>
              <p className="program-name">SHIELD</p>
              <p className="program-scope">HIV &amp; syphilis · U.S. cities</p>
            </div>
            <div>
              <h3 id="shield-heading">Responding to overlapping epidemics</h3>
              <p className="program-description">
                Models of HIV and syphilis examine prevention and testing
                strategies, intervention impact, and cost-effectiveness across
                high-burden urban jurisdictions.
              </p>
            </div>
            <div className="program-destination">
              <Link className="text-link" href="/projects/shield">
                About SHIELD <span aria-hidden="true">→</span>
              </Link>
              <p>Read about the model and the strategies it can evaluate.</p>
            </div>
          </article>
          <article className="research-program" aria-labelledby="gmha-heading">
            <div>
              <p className="program-name">GMHA</p>
              <p className="program-scope">HIV &amp; aging · Global</p>
            </div>
            <div>
              <h3 id="gmha-heading">Planning for an aging population</h3>
              <p className="program-description">
                The Global Model of HIV &amp; Aging examines how the age
                distribution of people living with HIV could change across
                countries, income groups, and the world.
              </p>
            </div>
            <div className="program-destination">
              <Link className="text-link" href="/global-aging">
                Explore HIV &amp; aging <span aria-hidden="true">→</span>
              </Link>
              <p>View demographic projections and model calibration.</p>
            </div>
          </article>
        </div>
      </section>
      <section
        id="studies"
        className="research-section selected-work"
        aria-labelledby="studies-heading"
      >
        <div className="wrap research-split">
          <div className="section-intro">
            <h2 id="studies-heading">Research in practice.</h2>
            <p>
              Selected studies connect funding decisions with projected health
              outcomes.
            </p>
            <Link className="text-link" href="/publications">
              All publications <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div>
            <article className="study-entry">
              <p className="study-meta">HIV TESTING · 18 STATES · 2026</p>
              <h3>What could ending CDC funding for HIV testing mean?</h3>
              <p>
                A modeling study examines the potential effect of ending Centers
                for Disease Control and Prevention funding for HIV tests across
                18 states.
              </p>
              <div className="study-links">
                <a
                  className="text-link"
                  href="https://doi.org/10.1093/cid/ciag038"
                >
                  Read the study <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
            <article className="study-entry">
              <p className="study-meta">
                HIV CARE · 31 METROPOLITAN AREAS · 2025
              </p>
              <h3>What happens when HIV care funding ends?</h3>
              <p>
                A study of Ryan White services examines how ending or
                interrupting care could affect HIV transmission through 2030.
              </p>
              <div className="study-links">
                <Link className="text-link" href="/#research">
                  See a comparison <span aria-hidden="true">→</span>
                </Link>
                <a
                  className="text-link"
                  href="https://doi.org/10.7326/ANNALS-25-01737"
                >
                  Read the study <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="contact"
        aria-labelledby="contact-heading"
      >
        <div className="wrap contact-grid">
          <div>
            <h2 id="contact-heading">Bring a public health question.</h2>
            <p>
              Interested in working with the group? Get in touch with the CIPHER
              team to discuss your research question.
            </p>
          </div>
          <div className="contact-links">
            <a className="text-link" href="mailto:pkasaie@jhu.edu">
              Contact CIPHER <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="https://jheem.org/work-with-us">
              Explore a JHEEM collaboration <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
