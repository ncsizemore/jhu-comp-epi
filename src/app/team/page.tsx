import MainLayout from '@/components/layout/MainLayout';
import TeamSection from '@/components/sections/team/TeamSection';
import {
  getTeamCategories,
  getTeamMembersByCategory
} from '@/lib/data/team';
import { SITE } from '@/lib/site';

export const metadata = {
  title: `Our Team | ${SITE.name}`,
  description: 'Meet the researchers and staff of CIPHER Lab.',
};

// Enable Incremental Static Regeneration - regenerate every hour
export const revalidate = 3600;

export default async function TeamPage() {
  const [teamCategories, faculty, postdocs, students, staff] = await Promise.all([
    getTeamCategories(),
    getTeamMembersByCategory('faculty'),
    getTeamMembersByCategory('postdoc'),
    getTeamMembersByCategory('student'),
    getTeamMembersByCategory('staff'),
  ]);

  const membersByCategory = {
    faculty,
    postdoc: postdocs,
    student: students,
    staff,
  };
  const populatedCategories = teamCategories
    .sort((a, b) => a.order - b.order)
    .map(category => ({
      category,
      members: membersByCategory[category.id as keyof typeof membersByCategory] || [],
    }))
    .filter(group => group.members.length > 0);

  return (
    <MainLayout>
      <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                People
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
                Team
              </h1>
            </div>

            <div>
              <p className="max-w-3xl text-xl leading-relaxed text-[color:var(--color-ink)]">
                Researchers and staff building computational models for
                infectious disease and population-health decision support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-rule)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          {populatedCategories.map(({ category, members }) => (
            <TeamSection
              key={category.id}
              category={category}
              members={members}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
