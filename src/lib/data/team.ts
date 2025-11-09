/**
 * Team Data Access Layer
 *
 * Abstraction layer for team member data access.
 * This layer separates data fetching from presentation components,
 * enabling easier testing, caching, and future migration to APIs/databases.
 */

import {
  teamMembers as teamMembersData,
  teamCategories as teamCategoriesData,
  contactInfo as contactInfoData,
  TeamMember,
  TeamCategory,
  ContactInfo
} from '@/data/team';

// Re-export types
export type { TeamMember, TeamCategory, ContactInfo };

/**
 * Get all team members
 * @returns Promise resolving to all team members
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  // Future: This could fetch from an API or database
  return teamMembersData;
}

/**
 * Get team members by category
 * @param category The category to filter by (faculty, postdoc, student, staff)
 * @param status Optional status filter (default: 'current')
 * @returns Promise resolving to team members in that category
 */
export async function getTeamMembersByCategory(
  category: 'faculty' | 'postdoc' | 'student' | 'staff',
  status: 'current' | 'alumni' | 'collaborator' = 'current'
): Promise<TeamMember[]> {
  return teamMembersData
    .filter(member => member.category === category && member.status === status)
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Get faculty members
 * @returns Promise resolving to current faculty members
 */
export async function getFacultyMembers(): Promise<TeamMember[]> {
  return getTeamMembersByCategory('faculty');
}

/**
 * Get postdoc members
 * @returns Promise resolving to current postdoc members
 */
export async function getPostdocMembers(): Promise<TeamMember[]> {
  return getTeamMembersByCategory('postdoc');
}

/**
 * Get student members
 * @returns Promise resolving to current student members
 */
export async function getStudentMembers(): Promise<TeamMember[]> {
  return getTeamMembersByCategory('student');
}

/**
 * Get staff members
 * @returns Promise resolving to current staff members
 */
export async function getStaffMembers(): Promise<TeamMember[]> {
  return getTeamMembersByCategory('staff');
}

/**
 * Get team member by ID
 * @param id Team member ID
 * @returns Promise resolving to team member or undefined
 */
export async function getTeamMemberById(id: string): Promise<TeamMember | undefined> {
  return teamMembersData.find(member => member.id === id);
}

/**
 * Get team members by project
 * @param projectId The project ID
 * @param status Optional status filter (default: 'current')
 * @returns Promise resolving to team members working on that project
 */
export async function getTeamMembersByProject(
  projectId: string,
  status: 'current' | 'alumni' | 'collaborator' = 'current'
): Promise<TeamMember[]> {
  return teamMembersData.filter(member =>
    member.projects?.includes(projectId) && member.status === status
  );
}

/**
 * Get team members by status
 * @param status The status to filter by
 * @returns Promise resolving to team members with that status
 */
export async function getTeamMembersByStatus(
  status: 'current' | 'alumni' | 'collaborator'
): Promise<TeamMember[]> {
  return teamMembersData
    .filter(member => member.status === status)
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Get all team categories
 * @returns Promise resolving to all team categories
 */
export async function getTeamCategories(): Promise<TeamCategory[]> {
  return teamCategoriesData;
}

/**
 * Get contact information
 * @returns Promise resolving to contact info
 */
export async function getContactInfo(): Promise<ContactInfo> {
  return contactInfoData;
}

/**
 * Search team members by name or expertise
 * @param query Search query string
 * @returns Promise resolving to matching team members
 */
export async function searchTeamMembers(query: string): Promise<TeamMember[]> {
  const lowerQuery = query.toLowerCase();
  return teamMembersData.filter(member =>
    member.name.toLowerCase().includes(lowerQuery) ||
    member.title.toLowerCase().includes(lowerQuery) ||
    member.expertise?.some(exp => exp.toLowerCase().includes(lowerQuery))
  );
}
