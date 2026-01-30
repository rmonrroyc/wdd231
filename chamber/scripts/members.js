/* Timbuktu Chamber of Commerce - Members Display Script (Accessible Version) */

// DOM Elements
const membersContainer = document.getElementById('members-container');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

// State
let members = [];
let currentView = 'grid';

/**
 * Fetch members data from JSON file
 */
async function loadMembers() {
  try {
    membersContainer.innerHTML =
      '<p class="loading">Loading member directory...</p>';

    const response = await fetch('data/members.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    members = await response.json();

    // Sort by membership level (Gold → Silver → Member)
    members.sort((a, b) => b.membershipLevel - a.membershipLevel);

    displayMembers();
    attachEventListeners();
  } catch (error) {
    console.error('Error loading members:', error);
    membersContainer.innerHTML = `
      <div class="error">
        <p>Error loading member directory. Please refresh the page.</p>
      </div>
    `;
  }
}

/**
 * Display members based on current view
 */
function displayMembers() {
  if (members.length === 0) {
    membersContainer.innerHTML = '<p>No members found.</p>';
    return;
  }

  membersContainer.className = `${currentView}-view`;
  membersContainer.innerHTML = members
    .map(member => createMemberCard(member))
    .join('');
}

/**
 * Create HTML for a single member card
 */
function createMemberCard(member) {
  const levelClass = `level-${getLevelClass(member.membershipLevel)}`;

  return `
    <article class="member-card" data-member-id="${member.id}">
      <img
        src="images/${member.image}"
        alt="${member.name} logo"
        class="member-image"
        onerror="this.src='images/placeholder.jpg'"
      >

      <div class="member-info">
        <h3 class="member-name">${member.name}</h3>

        <p class="member-detail">
          <strong>Address:</strong> ${member.address}
        </p>

        <p class="member-detail">
          <strong>Phone:</strong>
          <a href="tel:${member.phone}" class="member-phone">
            ${member.phone}
          </a>
        </p>

        <p class="member-detail">
          <strong>Founded:</strong> ${member.founded}
        </p>

        <p class="member-description">
          ${member.description}
        </p>

        <span class="member-level ${levelClass}">
          ${member.levelName} Member
        </span>

        <a
          href="${member.website}"
          target="_blank"
          rel="noopener noreferrer"
          class="member-website"
        >
          Visit Website →
        </a>
      </div>
    </article>
  `;
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

/**
 * Attach event listeners
 */
function attachEventListeners() {
  gridViewBtn.addEventListener('click', () => switchView('grid'));
  listViewBtn.addEventListener('click', () => switchView('list'));
}

/**
 * Switch between grid and list views
 */
function switchView(viewType) {
  currentView = viewType;

  gridViewBtn.classList.toggle('active', viewType === 'grid');
  listViewBtn.classList.toggle('active', viewType === 'list');

  gridViewBtn.setAttribute('aria-pressed', viewType === 'grid');
  listViewBtn.setAttribute('aria-pressed', viewType === 'list');

  displayMembers();
}

// Initialize
document.addEventListener('DOMContentLoaded', loadMembers);
