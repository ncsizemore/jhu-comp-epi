"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const links = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/team", label: "People" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const navigation = links.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      aria-current={
        pathname === href ||
        (href === "/research" && pathname.startsWith("/projects/"))
          ? "page"
          : undefined
      }
      onClick={() => {
        if (menu.current) menu.current.open = false;
      }}
    >
      {label}
    </Link>
  ));
  return (
    <>
      <div className="cipher-site">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="affiliation">
          <div className="wrap">
            <a href="https://www.jhu.edu/">
              Johns Hopkins{" "}
              <span className="long">
                Schools of Public Health and Medicine
              </span>
              <span className="short">University</span>
            </a>
          </div>
        </div>
      </div>
      <div className="cipher-site site-chrome">
        <header className="site-header">
          <div className="wrap nav-row">
            <Link className="site-logo" href="/" aria-label="CIPHER Lab home">
              <Image
                src="/brand/cipher-v15-refined-ink.svg"
                width={168}
                height={26}
                style={{ height: "auto" }}
                alt="CIPHER"
                priority
              />
            </Link>
            <nav className="desktop-nav" aria-label="Main navigation">
              {navigation}
            </nav>
            <details
              className="mobile-nav"
              ref={menu}
              onKeyDown={(event) => {
                if (event.key === "Escape" && menu.current) {
                  menu.current.open = false;
                  menu.current.querySelector("summary")?.focus();
                }
              }}
            >
              <summary>
                Menu <span aria-hidden="true">&nbsp;☰</span>
              </summary>
              <nav aria-label="Mobile navigation">{navigation}</nav>
            </details>
          </div>
        </header>
      </div>
    </>
  );
}
