/* Concepción Chamber of Commerce - Featured Members Script */

// DOM Element
const spotlightsContainer = document.getElementById('spotlights-container');

// Stop execution if container does not exist (prevents errors on other pages)
if (!spotlightsContainer) {
  console.warn('Spotlights container not found. members.js not executed on this page.');
} else {

  const FEATURED_COUNT = 3;

  async function loadFeaturedMembers() {
    try {
      spotlightsContainer.innerHTML = '<p>Loading members...</p>';

      const response = await fetch('data/members.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const members = await response.json();

      // Filter Silver (2) and Gold (3) members
      const eligibleMembers = members.filter(
        member => member.membershipLevel >= 2
      );

      if (eligibleMembers.length === 0) {
        spotlightsContainer.innerHTML = '<p>No featured members available.</p>';
        return;
      }

      // Shuffle for randomness
      const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

      // Select featured members
      const featuredMembers = shuffled.slice(0, FEATURED_COUNT);

      // Render HTML
      spotlightsContainer.innerHTML = featuredMembers
        .map(member => `
          <article class="spotlight-card">
            <img
              src="images/${member.image}"
              alt="${member.name} logo"
              class="spotlight-image">

            <h3>${member.name}</h3>
            <p>${member.description}</p>

            <a href="${member.website}"
               target="_blank"
               rel="noopener noreferrer"
               class="spotlight-link">
              Visit Website →
            </a>

            <span class="member-level ${getLevelClass(member.membershipLevel)}">
              ${member.levelName} Member
            </span>
          </article>
        `)
        .join('');

      // Image fallback handled via JS (no inline JS)
      document.querySelectorAll('.spotlight-image').forEach(img => {
        img.addEventListener('error', () => {
          img.src = 'images/placeholder.jpg';
        });
      });

    } catch (error) {
      console.error('Error loading featured members:', error);
      spotlightsContainer.innerHTML = `
        <p class="error-message">
          Error loading member directory. Please refresh the page.
        </p>
      `;
    }
  }

  function getLevelClass(level) {
    switch (level) {
      case 3:
        return 'gold';
      case 2:
        return 'silver';
      default:
        return 'member';
    }
  }

  document.addEventListener('DOMContentLoaded', loadFeaturedMembers);
}
