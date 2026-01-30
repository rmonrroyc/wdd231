/* Timbuktu Chamber of Commerce - Featured Members Display Script */

// DOM Elements
const spotlightsContainer = document.getElementById('spotlights-container');

// Number of members to show
const FEATURED_COUNT = 3;

// Load members from JSON and display featured members
async function loadFeaturedMembers() {
  try {
    spotlightsContainer.innerHTML = '<p>Loading members...</p>';

    // Fetch members JSON
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const members = await response.json();

    // Filter Gold (3) and Silver (2) members
    const filteredMembers = members.filter(member => member.membershipLevel >= 2);

    if (filteredMembers.length === 0) {
      spotlightsContainer.innerHTML = '<p>No featured members found.</p>';
      return;
    }

    // Shuffle array for randomness
    const shuffled = filteredMembers.sort(() => 0.5 - Math.random());

    // Take first FEATURED_COUNT members
    const featured = shuffled.slice(0, FEATURED_COUNT);

    // Create HTML
    spotlightsContainer.innerHTML = featured
      .map(member => `
        <article class="spotlight-card">
          <img src="images/${member.image}" 
               alt="${member.name} logo" 
               class="spotlight-image" 
               onerror="this.src='images/placeholder.jpg'">

          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="spotlight-link">
            Visit Website →
          </a>
          <span class="member-level ${getLevelClass(member.membershipLevel)}">
            ${member.levelName} Member
          </span>
        </article>
      `)
      .join('');

  } catch (error) {
    console.error('Error loading featured members:', error);
    spotlightsContainer.innerHTML = `
      <div class="error">
        <p>Error loading member directory. Please refresh the page.</p>
      </div>
    `;
  }
}

/**
 * Get CSS class name for membership level
 */
function getLevelClass(level) {
  return {
    1: 'member',
    2: 'silver',
    3: 'gold'
  }[level] || 'member';
}

// Initialize
document.addEventListener('DOMContentLoaded', loadFeaturedMembers);
