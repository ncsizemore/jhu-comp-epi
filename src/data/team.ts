// Team member type definition
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  category: 'faculty' | 'postdoc' | 'student' | 'staff';
  photo?: string; // URL to photo
  bio: string;
  education?: string[];
  projects?: string[]; // Project IDs they work on
  email?: string;
  website?: string;
  twitter?: string;
  googleScholar?: string;
  orcid?: string;
  publications?: number; // Count of publications
}

// Empty team members array - will be populated with real data later
export const teamMembers: TeamMember[] = [];

// Export team categories for filtering
export const teamCategories = [
  { id: 'faculty', name: 'Faculty & Investigators' },
  { id: 'postdoc', name: 'Postdoctoral Fellows' },
  { id: 'student', name: 'PhD Students' },
  { id: 'staff', name: 'Research Staff' }
];