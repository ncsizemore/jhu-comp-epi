'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Publication } from '@/lib/data/publications';
import { getProjectTheme, PROJECT_THEME } from '@/lib/projects/config';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { formatAuthors } from '@/lib/utils/authors';
import PublicationModal from '@/components/publications/PublicationModal';

interface FeaturedPublicationsGridProps {
  publications: Publication[];
}

export default function FeaturedPublicationsGrid({ publications }: FeaturedPublicationsGridProps) {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Get featured publications, sorted chronologically (newest first)
  const featuredPubs = useMemo(() => {
    return publications
      .filter(pub => pub.featured)
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, [publications]);

  const handleCardClick = (publication: Publication, index: number) => {
    setSelectedPub(publication);
    setSelectedIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % featuredPubs.length;
    setSelectedIndex(nextIndex);
    setSelectedPub(featuredPubs[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (selectedIndex - 1 + featuredPubs.length) % featuredPubs.length;
    setSelectedIndex(prevIndex);
    setSelectedPub(featuredPubs[prevIndex]);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <HeroBackground />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Publications
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-hopkins-gold via-amber-400 to-orange-400 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our research in computational epidemiology, HIV modeling, and public health interventions
            </p>
          </div>
        </div>
      </section>

      {/* Cards Section - Clean Background */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/8 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredPubs.map((publication, index) => {
              const projectId = publication.projects[0] || 'jheem';
              const project = PROJECT_THEME[projectId as keyof typeof PROJECT_THEME];
              const projectTheme = getProjectTheme(projectId);

              return (
                <article
                  key={publication.id}
                  onClick={() => handleCardClick(publication, index)}
                  className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/10 flex flex-col cursor-pointer"
                >
                {/* Image Header (if available) */}
                {publication.imageUrl && (
                  <div className="relative h-64 bg-white/10 overflow-hidden">
                    <Image
                      src={publication.imageUrl}
                      alt={publication.imageCaption || publication.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Project badge overlay */}
                    <div className="absolute top-4 left-4">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${projectTheme.colors.gradient} text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg`}>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        {project.name}
                      </div>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20 text-white text-sm font-bold rounded-lg">
                        {publication.year}
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* If no image, show badges at top */}
                  {!publication.imageUrl && (
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${projectTheme.colors.gradient} text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg`}>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        {project.name}
                      </div>
                      <div className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-700 text-sm font-bold rounded-lg">
                        {publication.year}
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-3 group-hover:text-hopkins-blue transition-colors duration-300">
                    {publication.title}
                  </h2>

                  {/* Authors & Journal */}
                  <div className="mb-4 text-sm">
                    <p className="text-gray-700 font-medium mb-1">
                      {formatAuthors(publication.authors)}
                    </p>
                    <p className="text-gray-600 italic">
                      {publication.journal}
                    </p>
                  </div>

                  {/* Key Findings */}
                  {(publication.keyFindings || publication.abstract) && (
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                        {publication.keyFindings || publication.abstract}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPub && (
        <PublicationModal
          publication={selectedPub}
          onClose={() => setSelectedPub(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
}
