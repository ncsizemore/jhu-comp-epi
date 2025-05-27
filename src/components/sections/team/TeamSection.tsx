import { TeamMember, TeamCategory } from '@/data/team';
import TeamMemberCard from './TeamMemberCard';

interface TeamSectionProps {
  category: TeamCategory;
  members: TeamMember[];
}

export default function TeamSection({ category, members }: TeamSectionProps) {
  if (members.length === 0) {
    return null; // Don't render empty sections
  }

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <div className="w-1.5 h-8 bg-hopkins-gold rounded mr-3"></div>
          <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
        </div>
        <p className="text-gray-600 max-w-2xl">
          {category.description}
        </p>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
