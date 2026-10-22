import { CONTACT_HREF } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
export const metadata: Metadata = {
  title: "In the news | CIPHER Lab",
  description: "News coverage of CIPHER Lab’s infectious disease research.",
  alternates: { canonical: "/news" },
};
export default function NewsPage() {
  return (
    <MainLayout editorial>
      <section className="directory-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">News</span>
          </nav>
          <div className="directory-opening">
            <div>
              <h1>In the news.</h1>
              <p className="intro">
                Coverage of the group’s research and its implications for public
                health.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap news-grid">
          <p className="kicker">Media coverage</p>
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
            <h2 id="contact-heading">Discuss the research.</h2>
            <p>
              For questions about the group’s work or a potential collaboration,
              get in touch with the CIPHER team.
            </p>
          </div>
          <div className="contact-links">
            <a className="text-link" href={CONTACT_HREF}>
              Contact CIPHER <span aria-hidden="true">↗</span>
            </a>
            <Link className="text-link" href="/team">
              Meet the group <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
