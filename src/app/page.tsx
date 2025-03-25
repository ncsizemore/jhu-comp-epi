import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <ProjectsSection />
      {/* We'll add Publications and Updates sections later */}
    </MainLayout>
  );
}