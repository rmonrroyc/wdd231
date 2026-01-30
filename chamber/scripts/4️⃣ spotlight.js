// Cargar los miembros desde members.js
// Asegúrate de que members.js se carga antes de este script en tu HTML

function displayFeaturedMembers() {
  const container = document.getElementById("spotlights-container");
  if (!container) return;

  // Filtrar miembros Gold o Silver
  const filteredMembers = members.filter(m => m.levelName === "Gold" || m.levelName === "Silver");

  // Mezclar aleatoriamente
  const shuffled = filteredMembers.sort(() => 0.5 - Math.random());

  // Tomar 2-3 miembros
  const selected = shuffled.slice(0, 3);

  // Limpiar contenedor
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

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", displayFeaturedMembers);
