import Image from 'next/image';
import { TeamMember, TeamCategory } from '@/lib/data/team';

interface TeamSectionProps {
  category: TeamCategory;
  members: TeamMember[];
}

const AVAILABLE_PHOTOS = new Set([
  'images/team/althoff-headshot.jpg',
  'images/team/dowdy-headshot.jpg',
  'images/team/fojo-headshot.jpg',
  'images/team/gerace-headshot.png',
  'images/team/kasaie-headshot.jpg',
  'images/team/reid-headshot.jpeg',
  'images/team/schnure-headshot.jpg',
  'images/team/shah-headshot.jpg',
  'images/team/zalesak-headshot.png',
  'images/team/zhao-headshot.jpg',
]);

function initials(member: TeamMember) {
  return member.shortName
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2);
}

function hasPhoto(member: TeamMember) {
  return member.photo ? AVAILABLE_PHOTOS.has(member.photo) : false;
}

function institutionalProfile(member: TeamMember) {
  return member.websites?.find(website => website.type === 'institutional')?.url;
}

function scholarProfile(member: TeamMember) {
  const id = member.socialMedia?.googleScholar;
  return id && id !== 'scholar-id'
    ? `https://scholar.google.com/citations?user=${id}`
    : undefined;
}

function orcidProfile(member: TeamMember) {
  const id = member.socialMedia?.orcid;
  return id && id !== '0000-0000-0000-0000'
    ? `https://orcid.org/${id}`
    : undefined;
}

function MemberPhoto({ member, large = false }: { member: TeamMember; large?: boolean }) {
  const photoExists = hasPhoto(member);

  return (
    <div
      className={[
        'relative overflow-hidden border border-[color:var(--color-rule)] bg-[#eef3f8]',
        large ? 'w-full max-w-[13rem] sm:max-w-none' : 'w-28 sm:w-full',
        large ? 'aspect-[4/5]' : 'aspect-square',
      ].join(' ')}
    >
      {photoExists ? (
        <Image
          src={`/${member.photo}`}
          alt={member.name}
          fill
          className="object-cover"
          sizes={large ? '(max-width: 768px) 100vw, 260px' : '120px'}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-serif text-4xl text-[color:var(--color-hopkins-blue)]">
            {initials(member)}
          </span>
        </div>
      )}
    </div>
  );
}

function MemberLinks({ member }: { member: TeamMember }) {
  const links = [
    member.email ? { href: `mailto:${member.email}`, label: 'Email' } : undefined,
    institutionalProfile(member)
      ? { href: institutionalProfile(member), label: 'Profile' }
      : undefined,
    scholarProfile(member)
      ? { href: scholarProfile(member), label: 'Scholar' }
      : undefined,
    orcidProfile(member) ? { href: orcidProfile(member), label: 'ORCID' } : undefined,
  ].filter(Boolean) as { href: string; label: string }[];

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em]">
      {links.map(link => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function ProjectList({ member }: { member: TeamMember }) {
  if (!member.projects?.length) {
    return null;
  }

  return (
    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
      {member.projects.map(project => (
        <li key={project}>{project}</li>
      ))}
    </ul>
  );
}

function ExpertiseList({ member }: { member: TeamMember }) {
  if (!member.expertise?.length) {
    return null;
  }

  return (
    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs leading-relaxed text-[color:var(--color-muted)]">
      {member.expertise.slice(0, 4).map(expertise => (
        <li key={expertise}>{expertise}</li>
      ))}
    </ul>
  );
}

function FacultyProfile({ member }: { member: TeamMember }) {
  return (
    <article className="border-t border-[color:var(--color-rule)] py-7">
      <div className="grid gap-6 sm:grid-cols-[10rem_minmax(0,1fr)]">
        <MemberPhoto member={member} large />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
            {member.title}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-tight text-[color:var(--color-ink)]">
            {member.name}
          </h3>
          {member.credentials && member.credentials.length > 0 && (
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              {member.credentials.join(', ')}
            </p>
          )}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink)]">
            {member.shortBio || member.bio}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
            {member.primaryAffiliation.department}
            <span className="px-1.5">/</span>
            {member.primaryAffiliation.institution}
          </p>
          <ProjectList member={member} />
          <ExpertiseList member={member} />
          <MemberLinks member={member} />
        </div>
      </div>
    </article>
  );
}

function DirectoryProfile({ member }: { member: TeamMember }) {
  return (
    <article className="grid gap-5 border-t border-[color:var(--color-rule)] py-6 sm:grid-cols-[7rem_minmax(0,1fr)]">
      <MemberPhoto member={member} />
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <div>
            <h3 className="font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
              {member.name}
            </h3>
            <p className="mt-2 text-sm font-medium text-[color:var(--color-muted)]">
              {member.title}
            </p>
          </div>
          {member.credentials && member.credentials.length > 0 && (
            <p className="text-sm text-[color:var(--color-muted)]">
              {member.credentials.join(', ')}
            </p>
          )}
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink)]">
          {member.shortBio || member.bio}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
          {member.primaryAffiliation.department}
          <span className="px-1.5">/</span>
          {member.primaryAffiliation.institution}
        </p>
        <ProjectList member={member} />
        <ExpertiseList member={member} />
        <MemberLinks member={member} />
      </div>
    </article>
  );
}

export default function TeamSection({ category, members }: TeamSectionProps) {
  const isFaculty = category.id === 'faculty';

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-[color:var(--color-rule)] py-12 first:border-t-0 first:pt-0 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
            {members.length} {members.length === 1 ? 'member' : 'members'}
          </p>
          <h2 className="mt-3 max-w-xs font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
            {category.name}
          </h2>
        </div>

        <div className="border-t border-[color:var(--color-rule)]">
          {members.map(member =>
            isFaculty ? (
              <FacultyProfile key={member.id} member={member} />
            ) : (
              <DirectoryProfile key={member.id} member={member} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
