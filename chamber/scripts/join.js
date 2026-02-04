
  document.getElementById("timestamp").value = new Date().toLocaleString();

  document.querySelectorAll("[data-modal]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.getElementById(link.dataset.modal).showModal();
    });
  });

  document.querySelectorAll("dialog button").forEach(btn => {
    btn.addEventListener("click", () => btn.closest("dialog").close());
  });