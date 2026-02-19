// ===============================
// IMPORTS
// ===============================
import { getTemplates } from "./fetch.js";
import { initModal } from "./modal.js";
import { saveTheme, getTheme } from "./storage.js";

// ===============================
// LOAD TEMPLATES FROM JSON
// ===============================
document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("itemsContainer");

    if (container) {
        const templates = await getTemplates();

        templates.forEach(template => {
            container.innerHTML += `
                <div class="card">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                    <p><strong>$${template.price}</strong></p>
                </div>
            `;
        });
    }

});

// ===============================
// HAMBURGER MENU
// ===============================
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        const isOpen = navigation.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}

// ===============================
// FETCH USD TO CLP EXCHANGE RATE
// ===============================
async function fetchExchangeRate() {
    try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();

        const rate = data.rates.CLP;
        const rateElement = document.getElementById("usd-rate");

        if (rateElement) {
            rateElement.textContent = `$${rate.toFixed(2)}`;
        }
    } catch (error) {
        const rateElement = document.getElementById("usd-rate");
        if (rateElement) {
            rateElement.textContent = "No disponible";
        }
    }
}

fetchExchangeRate();

// ===============================
// AUTO FOOTER YEAR
// ===============================
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ===============================
// LAST MODIFIED
// ===============================
const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// ===============================
// DARK MODE WITH LOCAL STORAGE
// ===============================
const body = document.body;
const header = document.querySelector("header");

if (header) {
    const themeButton = document.createElement("button");
    themeButton.textContent = "🌙";
    themeButton.setAttribute("aria-label", "Toggle dark mode");
    themeButton.classList.add("theme-toggle");

    header.appendChild(themeButton);

    const savedTheme = getTheme();
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        themeButton.textContent = "☀️";
    }

    themeButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            saveTheme("dark");
            themeButton.textContent = "☀️";
        } else {
            saveTheme("light");
            themeButton.textContent = "🌙";
        }
    });
}

// ===============================
// MODAL INIT
// ===============================
initModal();

document.addEventListener("DOMContentLoaded", () => {
  const results = document.querySelector("#results");

  if (results) {
    const params = new URLSearchParams(window.location.search);

    results.innerHTML = `
      <h2>Thank you, ${params.get("fullname") || ""}!</h2>
      <p><strong>Email:</strong> ${params.get("email") || ""}</p>
      <p><strong>Business Type:</strong> ${params.get("business") || ""}</p>
      <p><strong>Budget:</strong> $${params.get("budget") || ""}</p>
      <p><strong>Project Description:</strong> ${params.get("message") || ""}</p>
    `;
  }
});

