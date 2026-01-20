// date.js - Handle date and time display

document.addEventListener('DOMContentLoaded', function() {
  // Update year in footer
  const yearElement = document.getElementById('currentyear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Update last modified date
  const modifiedElement = document.getElementById('lastModified');
  if (modifiedElement) {
    const lastMod = new Date(document.lastModified);
    modifiedElement.textContent = 'Last Modified: ' + lastMod.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Format any date elements with class 'format-date'
  const dateElements = document.querySelectorAll('.format-date');
  dateElements.forEach(element => {
    const dateString = element.textContent;
    try {
      const date = new Date(dateString);
      element.textContent = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Invalid date format:', dateString);
    }
  });
});
