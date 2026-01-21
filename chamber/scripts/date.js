/* Concepción Chamber of Commerce - Date and Year Script */

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Set last modified date in footer
  const lastModifiedElement = document.getElementById('last-modified');
  if (lastModifiedElement) {
    lastModifiedElement.textContent = new Date(document.lastModified).toLocaleDateString();
  }
});
