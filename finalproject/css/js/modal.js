export function initModal() {
    const modal = document.querySelector("#infoModal");
    const openBtn = document.querySelector("#openModal");
    const closeBtn = document.querySelector("#closeModal");

    if (!modal || !openBtn || !closeBtn) return;

    openBtn.addEventListener("click", () => modal.showModal());
    closeBtn.addEventListener("click", () => modal.close());
}
