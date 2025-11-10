import MainLayout from '@/components/layout/MainLayout';
import TeamSection from '@/components/sections/team/TeamSection';
import ContactSection from '@/components/sections/team/ContactSection';
import { HeroBackground } from '@/components/ui/HeroBackground';
import {
  getTeamCategories,
  getContactInfo,
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
  const [teamCategories, contactInfo, faculty, postdocs, students, staff] = await Promise.all([
    getTeamCategories(),
    getContactInfo(),
    getTeamMembersByCategory('faculty'),
    getTeamMembersByCategory('postdoc'),
    getTeamMembersByCategory('student'),
    getTeamMembersByCategory('staff'),
  ]);

  return (
    <MainLayout>
      {/* Enhanced hero section matching home page aesthetic */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
        {/* Decorative background */}
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopkins-gold to-amber-400">Research</span><br />
              Team
            </h1>

            <p className="text-xl font-medium text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              The Computational Epidemiology Lab brings together experts from epidemiology, biostatistics, computer science, and clinical medicine
            </p>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Johns Hopkins Bloomberg School of Public Health & School of Medicine
            </p>

            {/* Team Stats */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-white text-2xl font-black mb-1">
                  {faculty.length + postdocs.length}
                </div>
                <div className="text-gray-300 text-sm font-medium">Faculty & Researchers</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-white text-2xl font-black mb-1">
                  {students.length}
                </div>
                <div className="text-gray-300 text-sm font-medium">Graduate Students</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-white text-2xl font-black mb-1">
                  {staff.length}
                </div>
                <div className="text-gray-300 text-sm font-medium">Research Staff</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Sections */}
      <section className="py-20 bg-white">
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

      {/* Contact Section */}
      <ContactSection contactInfo={contactInfo} />
    </MainLayout>
  );
}
