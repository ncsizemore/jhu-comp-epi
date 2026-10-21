import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="cipher-site">
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Link className="site-logo" href="/" aria-label="CIPHER Lab home">
                <Image
                  src="/brand/cipher-v15-refined-white.svg"
                  width={158}
                  height={24}
                  style={{ height: "auto" }}
                  alt="CIPHER"
                />
              </Link>
              <p>
                Computational and Infectious Disease Public Health Epidemiology
                Research
              </p>
              <p>
                Johns Hopkins Schools of Public Health and Medicine
                <br />
                615 N. Wolfe Street · Baltimore, MD 21205
              </p>
            </div>
            <div>
              <h2>Research programs</h2>
              <ul>
                <li>
                  <a href="https://jheem.org/">JHEEM portal ↗</a>
                </li>
                <li>
                  <Link href="/projects/shield">SHIELD</Link>
                </li>
                <li>
                  <Link href="/global-aging">Global HIV &amp; aging</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>The group</h2>
              <ul>
                <li>
                  <Link href="/research">Research</Link>
                </li>
                <li>
                  <Link href="/team">People</Link>
                </li>
                <li>
                  <Link href="/publications">Publications</Link>
                </li>
                <li>
                  <Link href="/news">News &amp; coverage</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} CIPHER Lab</span>
            <a href="mailto:pkasaie@jhu.edu">Contact CIPHER</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
