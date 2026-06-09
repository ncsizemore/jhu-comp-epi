# Using JHU Computational Epidemiology Team Data on Other Sites

This guide explains how to use the centralized team data on other websites (non-Next.js).

## Team Data URL

The centralized team data is available at:
```
https://raw.githubusercontent.com/[your-org]/jhu-comp-epi/main/src/data/team-data.json
```

## Basic JavaScript Implementation

```javascript
// Fetch team data
async function fetchTeamData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/[your-org]/jhu-comp-epi/main/src/data/team-data.json');
    const teamData = await response.json();
    return teamData;
  } catch (error) {
    console.error('Error fetching team data:', error);
    return null;
  }
}

// Render team members by category
function renderTeamSection(category, members) {
  return `
    <section class="team-section">
      <h2>${category.name}</h2>
      <p>${category.description}</p>
      <div class="team-grid">
        ${members.map(member => renderTeamMember(member)).join('')}
      </div>
    </section>
  `;
}

// Render individual team member
function renderTeamMember(member) {
  return `
    <div class="team-member-card">
      <div class="member-photo">
        ${member.photo ? 
          `<img src="${member.photo}" alt="${member.name}" />` :
          `<div class="photo-placeholder">${member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>`
        }
      </div>
      <div class="member-info">
        <h3>${member.name}</h3>
        <p class="title">${member.title}</p>
        <p class="affiliation">${member.primaryAffiliation.department}</p>
        <p class="bio">${member.shortBio || member.bio.substring(0, 150) + '...'}</p>
        ${member.email ? `<a href="mailto:${member.email}">Contact</a>` : ''}
      </div>
    </div>
  `;
}

// Usage example
async function displayTeam() {
  const teamData = await fetchTeamData();
  if (!teamData) return;
  
  const teamContainer = document.getElementById('team-container');
  
  // Render each category
  teamData.teamCategories.forEach(category => {
    const members = teamData.teamMembers.filter(member => 
      member.category === category.id && member.status === 'current'
    ).sort((a, b) => (a.order || 999) - (b.order || 999));
    
    if (members.length > 0) {
      teamContainer.innerHTML += renderTeamSection(category, members);
    }
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', displayTeam);
```

## Astro Implementation (for SHIELD site)

```astro
---
// In your Astro component
const TEAM_DATA_URL = 'https://raw.githubusercontent.com/[your-org]/jhu-comp-epi/main/src/data/team-data.json';

let teamData = null;
try {
  const response = await fetch(TEAM_DATA_URL);
  teamData = await response.json();
} catch (error) {
  console.error('Failed to fetch team data:', error);
}

const facultyMembers = teamData?.teamMembers.filter(member => 
  member.category === 'faculty' && member.status === 'current'
) || [];
---

<div class="team-section">
  <h2>Faculty & Investigators</h2>
  <div class="team-grid">
    {facultyMembers.map(member => (
      <div class="team-member-card">
        <h3>{member.name}</h3>
        <p>{member.title}</p>
        <p>{member.shortBio}</p>
        {member.email && <a href={`mailto:${member.email}`}>Contact</a>}
      </div>
    ))}
  </div>
</div>
```

## PHP Implementation

```php
<?php
function fetchTeamData() {
    $url = 'https://raw.githubusercontent.com/[your-org]/jhu-comp-epi/main/src/data/team-data.json';
    $json = file_get_contents($url);
    return json_decode($json, true);
}

function renderTeamPage() {
    $teamData = fetchTeamData();
    if (!$teamData) return;
    
    foreach ($teamData['teamCategories'] as $category) {
        $members = array_filter($teamData['teamMembers'], function($member) use ($category) {
            return $member['category'] === $category['id'] && $member['status'] === 'current';
        });
        
        if (count($members) > 0) {
            echo "<section class='team-section'>";
            echo "<h2>" . $category['name'] . "</h2>";
            echo "<div class='team-grid'>";
            
            foreach ($members as $member) {
                echo "<div class='team-member-card'>";
                echo "<h3>" . $member['name'] . "</h3>";
                echo "<p>" . $member['title'] . "</p>";
                echo "<p>" . ($member['shortBio'] ?? substr($member['bio'], 0, 150) . '...') . "</p>";
                echo "</div>";
            }
            
            echo "</div></section>";
        }
    }
}
?>
```

## CSS Styling Example

```css
.team-section {
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-member-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  transition: transform 0.2s;
}

.team-member-card:hover {
  transform: translateY(-2px);
}

.member-photo img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.photo-placeholder {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #0f4c75, #3282b8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 4px;
}
```

## Updating Team Data

To update team information:

1. Edit `team-data.json` in the Next.js repo
2. Commit and push changes
3. All websites will automatically fetch the updated data
4. Consider adding a cache-busting parameter if needed:
   ```javascript
   const response = await fetch(`${TEAM_DATA_URL}?v=${Date.now()}`);
   ```

## TypeScript Support

For TypeScript projects, you can copy the interfaces from `src/data/team.ts`:

```typescript
interface TeamMember {
  id: string;
  name: string;
  title: string;
  // ... other properties
}

interface TeamData {
  metadata: {
    lastUpdated: string;
    version: string;
    description: string;
  };
  teamMembers: TeamMember[];
  // ... other properties
}
```
