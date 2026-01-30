
function displayFeaturedMembers() {
  const container = document.getElementById("spotlights-container");
  if (!container) return;

  const filteredMembers = members.filter(m => m.levelName === "Gold" || m.levelName === "Silver");

  const shuffled = filteredMembers.sort(() => 0.5 - Math.random());

  const selected = shuffled.slice(0, 3);

  container.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <a href="${member.website}" target="_blank">
        <img src="images/${member.image}" alt="${member.name}" class="spotlight-image">
      </a>
      <div class="spotlight-content">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <a href="${member.website}" class="spotlight-link" target="_blank">Learn More →</a>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", displayFeaturedMembers);
