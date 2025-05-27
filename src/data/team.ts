// Enhanced team member type definition
export interface TeamMember {
  id: string;
  name: string;
  shortName: string;
  title: string;
  position: string;
  credentials?: string[];
  category: 'faculty' | 'postdoc' | 'student' | 'staff';
  status: 'current' | 'alumni' | 'collaborator';
  primaryAffiliation: {
    institution: string;
    department: string;
  };
  secondaryAffiliations?: {
    institution: string;
    department: string;
  }[];
  bio: string;
  shortBio?: string;
  photo?: string; // Relative path to photo
  email?: string;
  websites?: {
    type: 'institutional' | 'personal' | 'lab';
    url: string;
  }[];
  socialMedia?: {
    twitter?: string;
    googleScholar?: string;
    orcid?: string;
    linkedin?: string;
  };
  projects?: string[]; // Project IDs they work on
  expertise?: string[];
  publications?: number; // Count of publications
  order?: number; // Display order within category
}

// Team category definition
export interface TeamCategory {
  id: 'faculty' | 'postdoc' | 'student' | 'staff';
  name: string;
  description: string;
  order: number;
}

// Contact information
export interface ContactInfo {
  primaryContact: {
    name: string;
    email: string;
    role: string;
  };
  github?: string;
}

// Full team data structure
export interface TeamData {
  metadata: {
    lastUpdated: string;
    version: string;
    description: string;
  };
  teamMembers: TeamMember[];
  teamCategories: TeamCategory[];
  contactInfo: ContactInfo;
}

// Import team data from JSON
import teamDataJson from './team-data.json';

// Cast the imported JSON to our TypeScript interface
export const teamData: TeamData = teamDataJson as TeamData;

// Export individual arrays for easier use
export const teamMembers: TeamMember[] = teamData.teamMembers;
export const teamCategories: TeamCategory[] = teamData.teamCategories;
export const contactInfo: ContactInfo = teamData.contactInfo;

// Utility functions for working with team data
export const getTeamMembersByCategory = (category: string): TeamMember[] => {
  return teamMembers
    .filter(member => member.category === category && member.status === 'current')
    .sort((a, b) => (a.order || 999) - (b.order || 999));
};

export const getFacultyMembers = (): TeamMember[] => getTeamMembersByCategory('faculty');
export const getStudentMembers = (): TeamMember[] => getTeamMembersByCategory('student');
export const getStaffMembers = (): TeamMember[] => getTeamMembersByCategory('staff');
export const getPostdocMembers = (): TeamMember[] => getTeamMembersByCategory('postdoc');

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const getTeamMembersByProject = (projectId: string): TeamMember[] => {
  return teamMembers.filter(member => 
    member.projects?.includes(projectId) && member.status === 'current'
  );
};
