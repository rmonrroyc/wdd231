/* Timbuktu Chamber of Commerce - Members Display Script */

// DOM Elements
const membersContainer = document.getElementById('members-container');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

// State
let members = [];
let currentView = 'grid'; // Default view

/**
 * Fetch members data from JSON file
 */
async function loadMembers() {
  try {
    membersContainer.innerHTML = '<div class="loading">Loading member directory...</div>';
    
    const response = await fetch('data/members.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    members = await response.json();
    
    // Sort members by membership level (gold first)
    members.sort((a, b) => b.membershipLevel - a.membershipLevel);
    
    displayMembers();
    attachEventListeners();
  } catch (error) {
    console.error('Error loading members:', error);
    membersContainer.innerHTML = `<div class="error">
      <p>Error loading member directory. Please refresh the page.</p>
      <p style="font-size: 0.9em; margin-top: 0.5rem;">${error.message}</p>
    </div>`;
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

  const membersHTML = members.map(member => createMemberCard(member)).join('');
  membersContainer.innerHTML = membersHTML;
  
  // Apply current view class
  membersContainer.className = `${currentView}-view`;
}

/**
 * Create HTML for a single member card
 */
function createMemberCard(member) {
  const levelClass = `level-${getLevelClass(member.membershipLevel)}`;
  
  return `
    <div class="member-card" data-member-id="${member.id}">
      <img src="images/${member.image}" alt="${member.name} logo" class="member-image" onerror="this.src='images/placeholder.jpg'">
      <div class="member-info">
        <h3 class="member-name">${member.name}</h3>
        
        <div class="member-detail">
          <strong>Address:</strong>
          <span>${member.address}</span>
        </div>
        
        <div class="member-detail">
          <strong>Phone:</strong>
          <span><a href="tel:${member.phone}">${member.phone}</a></span>
        </div>
        
        <div class="member-detail">
          <strong>Founded:</strong>
          <span>${member.founded}</span>
        </div>
        
        <p style="color: var(--text-light); font-size: 0.95rem; margin: 0.75rem 0;">${member.description}</p>
        
        <span class="member-level ${levelClass}">${member.levelName} Member</span>
        
        <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="member-website">
          Visit Website →
        </a>
      </div>
    </div>
  `;
}

/**
 * Get CSS class name for membership level
 */
function getLevelClass(level) {
  const levelMap = {
    1: 'member',
    2: 'silver',
    3: 'gold'
  };
  return levelMap[level] || 'member';
}

/**
 * Attach click event listeners to view toggle buttons
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
  
  // Update button states
  if (viewType === 'grid') {
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
  } else {
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
  }
  
  // Update display
  displayMembers();
}

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', loadMembers);
