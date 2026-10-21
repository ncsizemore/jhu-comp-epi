import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/data/team";

const groups = [
  { id: "faculty", category: "faculty", title: "Faculty & investigators" },
  {
    id: "scientists",
    category: "postdoc",
    title: "Postdoctoral fellows & research scientists",
  },
  { id: "staff", category: "staff", title: "Research staff" },
];

export default function PeopleDirectory() {
  return (
    <>
      {groups.map((group) => (
        <section
          id={group.id}
          className="directory-section"
          key={group.id}
          aria-labelledby={`${group.id}-heading`}
        >
          <div className="wrap">
            <h2 id={`${group.id}-heading`}>{group.title}</h2>
            <div className="people-list">
              {teamMembers
                .filter(
                  (person) =>
                    person.status === "current" &&
                    person.category === group.category,
                )
                .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
                .map((person) => (
                  <article
                    className="person"
                    aria-labelledby={person.id}
                    key={person.id}
                  >
                    <div className="person-heading">
                      <div>
                        <h3 id={person.id}>{person.shortName}</h3>
                        {person.credentials?.length ? (
                          <p className="person-degrees">
                            {person.credentials.join(", ")}
                          </p>
                        ) : null}
                        <p className="person-role">{person.title}</p>
                      </div>
                      {person.photo && (
                        <Image
                          src={`/${person.photo}`}
                          alt={person.shortName}
                          width={72}
                          height={88}
                          sizes="(max-width: 700px) 60px, 72px"
                        />
                      )}
                    </div>
                    <p className="person-bio">
                      {person.shortBio ?? person.bio}
                    </p>
                    <p className="person-affiliation">
                      {person.primaryAffiliation.department},{" "}
                      {person.primaryAffiliation.institution}
                    </p>
                    <div className="person-links">
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          aria-label={`Email: ${person.shortName}`}
                        >
                          Email<span aria-hidden="true"> ↗</span>
                        </a>
                      )}
                      {person.websites
                        ?.filter((site) => site.type === "institutional")
                        .map((site) => (
                          <a
                            href={site.url}
                            key={site.url}
                            aria-label={`Faculty profile: ${person.shortName}`}
                          >
                            Faculty profile<span aria-hidden="true"> ↗</span>
                          </a>
                        ))}
                      {person.projects?.includes("shield") && (
                        <Link
                          href="/projects/shield"
                          aria-label={`SHIELD: ${person.shortName}`}
                        >
                          SHIELD
                        </Link>
                      )}
                      {person.projects?.includes("jheem") && (
                        <a
                          href="https://jheem.org/"
                          aria-label={`JHEEM: ${person.shortName}`}
                        >
                          JHEEM
                        </a>
                      )}
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
