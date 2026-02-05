/* Concepción Chamber of Commerce - Directory Page Script */

const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-view-btn');
const listBtn = document.getElementById('list-view-btn');

// Load all members
async function loadMembers() {
  try {
    membersContainer.innerHTML = '<p>Loading members...</p>';

    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const members = await response.json();

    displayMembers(members);

  } catch (error) {
    console.error('Error loading members:', error);
    membersContainer.innerHTML = `
      <p class="error">
        Unable to load the business directory. Please try again later.
      </p>
    `;
  }
}

// Display members
function displayMembers(members) {
  membersContainer.innerHTML = members
    .map(member => `
      <article class="member-card">
        <img 
          src="images/${member.image}" 
          alt="${member.name} logo"
          loading="lazy"
          onerror="this.src='images/placeholder.jpg'"
        >

        <div class="member-info">
          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>

          <a href="${member.website}" target="_blank" rel="noopener noreferrer">
            Visit Website →
          </a>

          <span class="member-level ${getLevelClass(member.membershipLevel)}">
            ${member.levelName} Member
          </span>
        </div>
      </article>
    `)
    .join('');
}

// Membership level class
function getLevelClass(level) {
  return {
    1: 'member',
    2: 'silver',
    3: 'gold'
  }[level] || 'member';
}

// View toggle
gridBtn.addEventListener('click', () => {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');

  gridBtn.classList.add('active');
  gridBtn.setAttribute('aria-pressed', 'true');

  listBtn.classList.remove('active');
  listBtn.setAttribute('aria-pressed', 'false');
});

listBtn.addEventListener('click', () => {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');

  listBtn.classList.add('active');
  listBtn.setAttribute('aria-pressed', 'true');

  gridBtn.classList.remove('active');
  gridBtn.setAttribute('aria-pressed', 'false');
});

// Init
document.addEventListener('DOMContentLoaded', loadMembers);
