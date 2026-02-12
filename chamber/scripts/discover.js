import { discoverItems } from "../data/discover.mjs";

const grid = document.getElementById("discover-grid");
const visitMessage = document.getElementById("visit-message");

function displayItems() {
  discoverItems.forEach((item, index) => {

    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="images/${item.image}" alt="${item.name}" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;

    grid.appendChild(card);
  });
}

function handleVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = 
      "Welcome! Let us know if you have any questions.";
  } else {
    const diff = now - Number(lastVisit);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) {
      visitMessage.textContent = 
        "Back so soon! Awesome!";
    } else if (days === 1) {
      visitMessage.textContent = 
        "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = 
        `You last visited ${days} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

displayItems();
handleVisitMessage();
