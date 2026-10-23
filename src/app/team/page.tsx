import { CONTACT_HREF } from "@/lib/site";
import PeopleDirectory from "@/components/sections/team/PeopleDirectory";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "People | CIPHER Lab",
  description:
    "Meet the faculty, scientists, and research staff of CIPHER Lab at Johns Hopkins.",
  alternates: { canonical: "/team" },
};

export default function PeoplePage() {
  return (
    <MainLayout editorial className="people-page">
      <section className="directory-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">People</span>
          </nav>
          <div className="directory-opening">
            <div>
              <h1>People.</h1>
              <p className="intro">
                Researchers and staff building computational models for
                infectious disease and population-health decision support.
              </p>
            </div>
            <nav className="contents" aria-label="On this page">
              <h2>Meet the group</h2>
              <div>
                <a href="#faculty">Faculty &amp; investigators</a>
                <a href="#scientists">Fellows &amp; scientists</a>
                <a href="#staff">Research staff</a>
              </div>
            </nav>
          </div>
        </div>
      </section>
      <PeopleDirectory />
      <section
        id="contact"
        className="contact"
        aria-labelledby="contact-heading"
      >
        <div className="wrap contact-grid">
          <div>
            <h2 id="contact-heading">Connect with the group.</h2>
            <p>
              Interested in collaborating on an infectious disease or
              public-health question? Get in touch with the CIPHER team.
            </p>
          </div>
          <div className="contact-links">
            <a className="text-link" href={CONTACT_HREF}>
              Contact CIPHER <span aria-hidden="true">↗</span>
            </a>
            <Link className="text-link" href="/research">
              Explore our research <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
