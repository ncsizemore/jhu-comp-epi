import MainLayout from '@/components/layout/MainLayout';
import TeamSection from '@/components/sections/team/TeamSection';
import ContactSection from '@/components/sections/team/ContactSection';
import {
  getTeamCategories,
  getContactInfo,
  getTeamMembersByCategory
} from '@/lib/data/team';

export const metadata = {
  title: 'Our Team | The Computational Epidemiology Lab',
  description: 'Meet the researchers and staff of The Computational Epidemiology Lab at Johns Hopkins University',
};

export default async function TeamPage() {
  // Fetch data using the data access layer
  const teamCategories = await getTeamCategories();
  const contactInfo = await getContactInfo();
  return (
    <MainLayout>
      {/* Enhanced hero section matching home page aesthetic */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
        {/* Sophisticated background matching projects/publications */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-hopkins-blue/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-hopkins-gold/10 rounded-full blur-3xl"></div>
        </div>

        {/* Static geometric shapes with modern sophistication */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-hopkins-gold/20 to-amber-400/30 transform rotate-45 rounded-2xl shadow-lg"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-emerald-400/25 to-teal-500/35 rounded-full shadow-md"></div>
          <div className="absolute top-1/2 left-20 w-16 h-64 bg-gradient-to-b from-hopkins-blue/15 to-transparent rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-white/10 rounded-lg rotate-12"></div>
        </div>

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
                  {(await getTeamMembersByCategory('faculty')).length + (await getTeamMembersByCategory('postdoc')).length}
                </div>
                <div className="text-gray-300 text-sm font-medium">Faculty & Researchers</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-white text-2xl font-black mb-1">
                  {(await getTeamMembersByCategory('student')).length}
                </div>
                <div className="text-gray-300 text-sm font-medium">Graduate Students</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-white text-2xl font-black mb-1">
                  {(await getTeamMembersByCategory('staff')).length}
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
          {await Promise.all(
            teamCategories
              .sort((a, b) => a.order - b.order)
              .map(async (category) => {
                const members = await getTeamMembersByCategory(category.id);
                return (
                  <TeamSection
                    key={category.id}
                    category={category}
                    members={members}
                  />
                );
              })
          )}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection contactInfo={contactInfo} />
    </MainLayout>
  );
}
