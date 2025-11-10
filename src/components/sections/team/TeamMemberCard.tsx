import { memo } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/lib/data/team';

interface TeamMemberCardProps {
  member: TeamMember;
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Photo Section */}
      <div className="relative bg-gray-100 h-64 overflow-hidden">
        {member.photo ? (
          <Image
            src={`/${member.photo}`}
            alt={member.name}
            width={300}
            height={256}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue flex items-center justify-center">
            <div className="text-white text-4xl font-bold">
              {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {member.category === 'faculty' ? 'Faculty' :
             member.category === 'postdoc' ? 'Postdoc' :
             member.category === 'student' ? 'Student' : 'Staff'}
          </span>
        </div>

        {/* Social Links Overlay */}
        {(member.email || member.websites || member.socialMedia) && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-hopkins-gold hover:text-white transition-colors"
                  title="Email"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </a>
              )}
              
              {member.websites?.find(w => w.type === 'institutional') && (
                <a
                  href={member.websites.find(w => w.type === 'institutional')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-hopkins-blue hover:text-white transition-colors"
                  title="Institutional Profile"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                  </svg>
                </a>
              )}

              {member.socialMedia?.googleScholar && (
                <a
                  href={`https://scholar.google.com/citations?user=${member.socialMedia.googleScholar}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-green-600 hover:text-white transition-colors"
                  title="Google Scholar"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Name and Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {member.name}
          </h3>
          <p className="text-hopkins-blue font-medium text-sm mb-1">
            {member.title}
          </p>
          {member.credentials && member.credentials.length > 0 && (
            <p className="text-gray-500 text-sm">
              {member.credentials.join(', ')}
            </p>
          )}
        </div>

        {/* Affiliation */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 leading-tight">
            {member.primaryAffiliation.department}
          </p>
          <p className="text-sm text-gray-500">
            {member.primaryAffiliation.institution}
          </p>
        </div>

        {/* Short Bio */}
        {member.shortBio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {member.shortBio}
          </p>
        )}

        {/* Expertise Tags */}
        {member.expertise && member.expertise.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {member.expertise.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {member.expertise.length > 3 && (
                <span className="text-gray-500 text-xs px-2 py-1">
                  +{member.expertise.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Projects */}
        {member.projects && member.projects.length > 0 && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Projects:</p>
            <div className="flex flex-wrap gap-2">
              {member.projects.map((project) => (
                <span
                  key={project}
                  className="bg-hopkins-spirit-blue/10 text-hopkins-spirit-blue text-xs font-medium px-2 py-1 rounded"
                >
                  {project.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders when rendering multiple cards
export default memo(TeamMemberCard);
