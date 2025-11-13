'use client';

import { useState } from 'react';
import { TeamMember, TeamCategory } from '@/lib/data/team';
import TeamMemberCard from './TeamMemberCard';
import TeamMemberModal from './TeamMemberModal';

interface TeamSectionProps {
  category: TeamCategory;
  members: TeamMember[];
}

export default function TeamSection({ category, members }: TeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  if (members.length === 0) {
    return null; // Don't render empty sections
  }

  return (
    <>
      <section className="mb-20 last:mb-0">
        {/* Section Header - Enhanced visual separation */}
        <div className="mb-10 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-2 h-10 bg-gradient-to-b from-hopkins-gold to-amber-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
}
