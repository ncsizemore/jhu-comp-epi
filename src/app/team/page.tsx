import MainLayout from '@/components/layout/MainLayout';
import TeamSection from '@/components/sections/team/TeamSection';
import { HeroBackground } from '@/components/ui/HeroBackground';
import {
  getTeamCategories,
  getTeamMembersByCategory
} from '@/lib/data/team';

export const metadata = {
  title: 'Our Team | The Computational Epidemiology Lab',
  description: 'Meet the researchers and staff of The Computational Epidemiology Lab at Johns Hopkins University',
};

// Enable Incremental Static Regeneration - regenerate every hour
export const revalidate = 3600;

export default async function TeamPage() {
  // Fetch all data in parallel for better performance
  const [teamCategories, faculty, postdocs, students, staff] = await Promise.all([
    getTeamCategories(),
    getTeamMembersByCategory('faculty'),
    getTeamMembersByCategory('postdoc'),
    getTeamMembersByCategory('student'),
    getTeamMembersByCategory('staff'),
  ]);

  return (
    <MainLayout>
      {/* Simplified hero section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
        {/* Decorative background */}
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Our Team
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-hopkins-gold via-amber-400 to-orange-400 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Experts in epidemiology, biostatistics, computer science, and clinical medicine
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Sections */}
      <section className="py-20 pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {teamCategories
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              // Use already-fetched data instead of re-fetching
              const membersByCategory = {
                faculty,
                postdoc: postdocs,
                student: students,
                staff,
              };
              const members = membersByCategory[category.id as keyof typeof membersByCategory] || [];

              return (
                <TeamSection
                  key={category.id}
                  category={category}
                  members={members}
                />
              );
            })}
        </div>
      </section>
    </MainLayout>
  );
}
