import MainLayout from '@/components/layout/MainLayout';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProjectsLoading() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading projects..." size="lg" />
      </div>
    </MainLayout>
  );
}
