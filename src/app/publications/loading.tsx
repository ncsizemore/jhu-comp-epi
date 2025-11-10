import MainLayout from '@/components/layout/MainLayout';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PublicationsLoading() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading publications..." size="lg" />
      </div>
    </MainLayout>
  );
}
