import Link from 'next/link';
import { SITE } from '@/lib/site';

function FooterExpansionLockup() {
  return (
    <div
      aria-label={SITE.expansion}
      className="mt-3 space-y-1.5 text-sm font-medium leading-tight text-white/85"
    >
      <div className="flex items-baseline gap-2.5">
        <span className="w-11 shrink-0 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-hopkins-gold">
          CI
        </span>
        <span>
          Computational
          <span className="mx-1.5 text-white/35">/</span>
          Infectious Disease
        </span>
      </div>
      <div className="flex items-baseline gap-2.5">
        <span className="w-11 shrink-0 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-hopkins-gold">
          PHER
        </span>
        <span>
          Public Health
          <span className="mx-1.5 text-white/35">/</span>
          Epidemiology
          <span className="mx-1.5 text-white/35">/</span>
          Research
        </span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-hopkins-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/70">
              Contact
            </h3>
            <address className="not-italic text-sm text-white/90 leading-relaxed">
              615 N. Wolfe Street<br />
              Baltimore, MD 21205<br />
              <a href={`mailto:${SITE.contactEmail}`} className="hover:underline">
                {SITE.contactEmail}
              </a>
            </address>
          </div>

          <div>
            <p className="font-serif text-2xl leading-tight text-white">
              {SITE.name}
            </p>
            <FooterExpansionLockup />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Housed within the {SITE.affiliation}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/70">
                Models
              </h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/projects/jheem" className="text-white/90 hover:underline">JHEEM</Link></li>
                <li><Link href="/global-aging" className="text-white/90 hover:underline">GMHA</Link></li>
                <li><Link href="/projects/shield" className="text-white/90 hover:underline">SHIELD</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/70">
                Pages
              </h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/research" className="text-white/90 hover:underline">Research</Link></li>
                <li><Link href="/projects" className="text-white/90 hover:underline">Projects</Link></li>
                <li><Link href="/publications" className="text-white/90 hover:underline">Publications</Link></li>
                <li><Link href="/team" className="text-white/90 hover:underline">Team</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-white/70">
          <div>
            © {new Date().getFullYear()} {SITE.name}
          </div>
          <div className="flex gap-6">
            <a href="https://www.jhu.edu" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Johns Hopkins University
            </a>
            <a href="https://publichealth.jhu.edu" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Bloomberg School of Public Health
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
