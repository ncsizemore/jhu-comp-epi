import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

export default function ShieldPage() {
  return (
    <MainLayout editorial className="shield-page">
      <section className="shield-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/research">Research</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">SHIELD</span>
          </nav>
          <div className="shield-opening">
            <div>
              <p className="kicker">SHIELD · Research program</p>
              <h1>Modeling HIV and syphilis together.</h1>
              <p className="intro">
                SHIELD examines how prevention, testing, and treatment
                strategies could reduce syphilis and health disparities in
                communities affected by HIV.
              </p>
              <div className="actions">
                <a className="text-link" href="#questions">
                  What SHIELD studies <span aria-hidden="true">↓</span>
                </a>
                <a
                  className="text-link"
                  href="https://ncsizemore.github.io/shield-project/"
                >
                  Visit the project website <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <aside className="shield-facts" aria-labelledby="facts-heading">
              <h2 id="facts-heading">Program at a glance</h2>
              <dl>
                <div>
                  <dt>Geographic focus</dt>
                  <dd>32 U.S. cities</dd>
                </div>
                <div>
                  <dt>Health focus</dt>
                  <dd>HIV and syphilis</dd>
                </div>
                <div>
                  <dt>Approach</dt>
                  <dd>Epidemiologic and economic modeling</dd>
                </div>
              </dl>
            </aside>
          </div>
          <p className="shield-full-name">
            Syphilis and HIV Integrated Epidemiologic and Economic Local-level
            Dynamics
          </p>
        </div>
      </section>
      <section
        id="questions"
        className="shield-section"
        aria-labelledby="questions-heading"
      >
        <div className="wrap research-split">
          <div className="section-intro">
            <h2 id="questions-heading">
              Which strategies could make the greatest difference locally?
            </h2>
            <p>
              The research considers health impact, cost-effectiveness, and
              equity together.
            </p>
          </div>
          <ol className="shield-aims">
            <li>
              <div>
                <h3>Strengthen existing services</h3>
                <p>
                  Evaluate combinations of testing, partner services, and
                  treatment. Examine how their impact and cost-effectiveness
                  could differ across populations and cities.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Evaluate emerging approaches</h3>
                <p>
                  Study doxycycline post-exposure prophylaxis (doxy-PEP),
                  point-of-care testing, and at-home sample collection. Explore
                  how uptake and access could affect outcomes and disparities.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Support local planning</h3>
                <p>
                  Develop a decision-support toolkit to help local teams examine
                  intervention choices, budget constraints, and projected health
                  outcomes. The toolkit is in development.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section
        id="model"
        className="shield-section shield-model"
        aria-labelledby="model-heading"
      >
        <div className="wrap">
          <div className="model-heading">
            <div>
              <p className="kicker">Inside the model</p>
              <h2 id="model-heading">
                Connecting infection, care, and local context.
              </h2>
            </div>
            <p>
              SHIELD represents populations across three connected dimensions.
              Together, they allow the research to examine syphilis
              interventions in the context of HIV and care engagement.
            </p>
          </div>
          <figure
            className="model-overview"
            aria-labelledby="model-heading model-caption"
          >
            <div className="model-dimensions">
              <div className="model-dimension">
                <p className="model-term">Syphilis natural history</p>
                <h3>How infection progresses</h3>
                <p>
                  Represent stages of syphilis infection and progression over
                  time.
                </p>
              </div>
              <div className="model-dimension">
                <p className="model-term">Syphilis care cascade</p>
                <h3>How people reach care</h3>
                <p>
                  Represent screening, diagnosis, and treatment within local
                  populations.
                </p>
              </div>
              <div className="model-dimension">
                <p className="model-term">HIV care continuum</p>
                <h3>How HIV and care intersect</h3>
                <p>
                  Represent HIV status and engagement with care alongside
                  syphilis.
                </p>
              </div>
            </div>
            <div className="model-populations">
              <h3>Within local populations</h3>
              <p>
                Age, race and ethnicity, STI risk, and social conditions help
                represent differences in disease burden and access to care.
              </p>
            </div>
            <figcaption id="model-caption">
              Conceptual overview of SHIELD&#39;s model dimensions.
            </figcaption>
          </figure>
          <div className="model-method">
            <p>
              The models combine local data with prior evidence through Bayesian
              calibration, producing a range of possible epidemic projections.
              Economic analyses examine costs, budget impact, and
              cost-effectiveness.
            </p>
            <a
              className="text-link"
              href="https://ncsizemore.github.io/shield-project/research/"
            >
              Read the research methods <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
      <section className="shield-section" aria-labelledby="partners-heading">
        <div className="wrap research-split">
          <div className="section-intro">
            <h2 id="partners-heading">Grounded in public health practice.</h2>
            <p>
              Health department partnerships connect the research with local
              planning needs.
            </p>
          </div>
          <div className="shield-partners">
            <h3>Health department partners</h3>
            <ul className="partner-list">
              <li>New York City</li>
              <li>Baltimore City</li>
              <li>New York State</li>
            </ul>
            <p className="shield-support">
              Supported by the National Institute of Allergy and Infectious
              Diseases, National Institutes of Health (R01AI179776).
            </p>
          </div>
        </div>
      </section>
      <section
        className="shield-section shield-resources"
        aria-labelledby="resources-heading"
      >
        <div className="wrap research-split">
          <div className="section-intro">
            <h2 id="resources-heading">Explore the work.</h2>
            <p>
              Continue to the project&#39;s methods and team, or browse the
              group&#39;s publication record.
            </p>
          </div>
          <ul className="resource-list">
            <li>
              <a href="https://ncsizemore.github.io/shield-project/research/">
                Research methods <span aria-hidden="true">↗</span>
              </a>
              <p>
                Model structure, calibration, intervention evaluation, and
                economic analysis.
              </p>
            </li>
            <li>
              <a href="https://ncsizemore.github.io/shield-project/team/">
                SHIELD research team <span aria-hidden="true">↗</span>
              </a>
              <p>Meet the people working on the project.</p>
            </li>
            <li>
              <Link href="/publications">
                CIPHER publications <span aria-hidden="true">→</span>
              </Link>
              <p>Browse the wider group&#39;s research record.</p>
            </li>
          </ul>
        </div>
      </section>
      <section
        id="contact"
        className="contact"
        aria-labelledby="contact-heading"
      >
        <div className="wrap contact-grid">
          <div>
            <h2 id="contact-heading">Discuss a local research question.</h2>
            <p>
              Interested in the project&#39;s work on HIV and syphilis? Get in
              touch with the CIPHER team.
            </p>
          </div>
          <div className="contact-links">
            <a className="text-link" href="mailto:pkasaie@jhu.edu">
              Contact CIPHER <span aria-hidden="true">↗</span>
            </a>
            <Link className="text-link" href="/research#programs">
              Explore our other programs <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
