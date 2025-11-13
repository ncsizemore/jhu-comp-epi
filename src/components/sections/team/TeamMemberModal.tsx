'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/lib/data/team';

interface TeamMemberModalProps {
  member: TeamMember;
  onClose: () => void;
}

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with photo */}
        <div className="relative">
          <div className="relative h-80 bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
            {member.photo ? (
              <Image
                src={`/${member.photo}`}
                alt={member.name}
                fill
                className="object-cover opacity-40"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue opacity-40"></div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-start gap-6">
                {/* Photo circle */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0">
                  {member.photo ? (
                    <Image
                      src={`/${member.photo}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue flex items-center justify-center">
                      <div className="text-white text-3xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
                  <p className="text-xl text-hopkins-gold font-semibold mb-2">{member.title}</p>
                  {member.credentials && member.credentials.length > 0 && (
                    <p className="text-gray-300 text-sm mb-3">{member.credentials.join(', ')}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {member.projects?.map((project) => (
                      <span
                        key={project}
                        className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {project.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-8">
          {/* Affiliation */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Affiliation</h3>
            <p className="text-base text-gray-900 font-medium leading-tight mb-1">
              {member.primaryAffiliation.department}
            </p>
            <p className="text-base text-gray-600">
              {member.primaryAffiliation.institution}
            </p>
            {member.secondaryAffiliations && member.secondaryAffiliations.length > 0 && (
              <div className="mt-3">
                {member.secondaryAffiliations.map((aff, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {aff.department} • {aff.institution}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Full Bio */}
          {member.bio && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{member.bio}</p>
            </div>
          )}

          {/* Expertise */}
          {member.expertise && member.expertise.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Links */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Contact & Links</h3>
            <div className="flex flex-wrap gap-3">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-hopkins-gold hover:bg-hopkins-gold/90 text-white rounded-lg transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Email
                </a>
              )}

              {member.websites?.find(w => w.type === 'institutional') && (
                <a
                  href={member.websites.find(w => w.type === 'institutional')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-hopkins-blue hover:bg-hopkins-blue/90 text-white rounded-lg transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                  </svg>
                  Profile
                </a>
              )}

              {member.socialMedia?.googleScholar && (
                <a
                  href={`https://scholar.google.com/citations?user=${member.socialMedia.googleScholar}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0z"/>
                  </svg>
                  Google Scholar
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
