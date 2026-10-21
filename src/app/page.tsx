import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import TrajectoryFigure from "@/components/sections/home/TrajectoryFigure";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "CIPHER Lab | Infectious disease modeling at Johns Hopkins",
  description:
    "Policy-relevant infectious disease models to support public health decisions in the United States and globally.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <MainLayout editorial className="home-page">
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">
              Computational epidemiology &amp; public health
            </p>
            <h1>
              Modeling infectious disease.
              <br />
              Informing public health.
            </h1>
            <p className="intro">
              We develop policy-relevant models of infectious disease dynamics
              to support public health decision-making in the United States and
              globally.
            </p>
            <div className="actions">
              <Link className="text-link" href="/research">
                Explore our research <span aria-hidden="true">→</span>
              </Link>
              <a className="text-link" href="#people">
                Meet the team <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="research-note">
              CIPHER brings together faculty, researchers, and trainees at the
              Johns Hopkins Schools of Public Health and Medicine.
            </p>
          </div>
          <aside className="program-index" aria-labelledby="program-heading">
            <h2 id="program-heading">Research programs</h2>
            <a href="https://jheem.org/">
              <div>
                <strong>JHEEM</strong>
                <p>
                  HIV prevention, care, and policy in U.S. cities and states
                </p>
              </div>
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <Link href="/projects/shield">
              <div>
                <strong>SHIELD</strong>
                <p>Understanding and responding to HIV and syphilis together</p>
              </div>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/global-aging">
              <div>
                <strong>GMHA</strong>
                <p>
                  Planning for an aging population of people with HIV worldwide
                </p>
              </div>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </aside>
        </div>
      </section>
      <section
        id="research"
        className="section evidence futures-section"
        aria-labelledby="evidence-heading"
      >
        <div className="wrap">
          <div className="section-heading">
            <p className="kicker">Featured research</p>
            <p className="kicker">JHEEM · Ryan White program · 2025–2030</p>
          </div>
          <div className="research-lead">
            <h2 id="evidence-heading">
              What happens when HIV care funding ends?
            </h2>
            <div>
              <p>
                Across U.S. cities and states, we model how different funding
                scenarios could affect HIV prevention and care. Here, we compare
                continued Ryan White services with permanent cessation in 31
                metropolitan areas.
              </p>
              <a className="text-link" href="https://jheem.org/ryan-white">
                Explore the study in JHEEM <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <TrajectoryFigure />
        </div>
      </section>
      <section
        id="people"
        className="section team-intro"
        aria-labelledby="people-heading"
      >
        <div className="wrap people-grid">
          <div className="team-heading">
            <p className="kicker">The people behind the research</p>
            <h2 id="people-heading">Epidemiology, medicine, and modeling.</h2>
          </div>
          <div className="team-copy">
            <p>
              We are a multidisciplinary team of faculty, researchers, and
              trainees. Our work combines epidemiologic data, mathematical
              modeling, simulation, and statistical inference.
            </p>
            <Link className="text-link" href="/team">
              Meet the full team <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section
        className="section publications"
        aria-labelledby="publications-heading"
      >
        <div className="wrap">
          <div className="section-heading">
            <h2 id="publications-heading">Selected publications</h2>
            <Link className="text-link" href="/publications">
              Browse the research record <span aria-hidden="true">→</span>
            </Link>
          </div>
          <article className="publication">
            <div className="meta">
              <span>2026</span>
              <p>
                <em>Clinical Infectious Diseases</em>
              </p>
            </div>
            <div>
              <h3>
                <a href="https://doi.org/10.1093/cid/ciag038">
                  The Potential Effect of Ending Centers for Disease Control and
                  Prevention Funding for HIV Tests: A Modeling Study in 18
                  States
                </a>
              </h3>
              <p className="authors">Balasubramanian et al.</p>
            </div>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </article>
          <article className="publication">
            <div className="meta">
              <span>2025</span>
              <p>
                <em>Annals of Internal Medicine</em>
              </p>
            </div>
            <div>
              <h3>
                <a href="https://doi.org/10.7326/ANNALS-25-01737">
                  The Potential Impact of Ending the Ryan White HIV/AIDS Program
                  on HIV Incidence: A Simulation Study in 31 U.S. Cities
                </a>
              </h3>
              <p className="authors">Forster et al.</p>
            </div>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </article>
        </div>
      </section>
      <section className="news-note" aria-labelledby="news-heading">
        <div className="wrap news-grid">
          <div className="news-label">
            <h2 id="news-heading">In the news</h2>
            <Link className="text-link" href="/news">
              All coverage <span aria-hidden="true">→</span>
            </Link>
          </div>
          <article className="news-story">
            <p className="news-meta">
              NBC News <span aria-hidden="true">·</span>{" "}
              <time dateTime="2025-09">September 2025</time>
            </p>
            <h3>
              <a href="https://www.nbcnews.com/health/sexual-health/republicans-seek-deep-cuts-hiv-prevention-treatment-funding-rcna233776">
                Republicans seek deep cuts to HIV prevention and treatment
                funding <span aria-hidden="true">↗</span>
              </a>
            </h3>
            <p className="news-summary">
              CIPHER researcher Todd Fojo discusses the public health
              implications of proposed HIV funding cuts.
            </p>
          </article>
        </div>
      </section>
      <section
        id="contact"
        className="contact"
        aria-labelledby="contact-heading"
      >
        <div className="wrap contact-grid">
          <div>
            <h2 id="contact-heading">Start a conversation.</h2>
            <p>
              Have a research question or an interest in working with the group?
              Get in touch with the CIPHER team.
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
