import Link from "next/link";
import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import PublicationArchive from "@/components/publications/PublicationArchive";
export const metadata: Metadata = {
  title: "Publications | CIPHER Lab",
  description:
    "Papers and preprints from CIPHER Lab on infectious disease modeling, prevention, care, and population health.",
  alternates: { canonical: "/publications" },
};
export default function PublicationsPage() {
  return (
    <MainLayout editorial className="publications-page">
      <section className="directory-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Publications</span>
          </nav>
          <div className="directory-opening">
            <div>
              <h1>Publications.</h1>
              <p className="intro">
                Papers and preprints on infectious disease modeling, prevention,
                care, and population health.
              </p>
            </div>
            <div className="archive-note">
              <p>Research record</p>
              <p>2016–2026</p>
              <Link className="text-link" href="/research">
                Explore the research <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <PublicationArchive />
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
            <a className="text-link" href="mailto:pkasaie@jhu.edu">
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
