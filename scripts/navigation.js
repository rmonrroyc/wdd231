// navigation.js - Handle responsive navigation menu

document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('nav');

  // Toggle menu on button click
  if (menuButton) {
    menuButton.addEventListener('click', function() {
      nav.classList.toggle('open');
      menuButton.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('open');
      if (menuButton) {
        menuButton.textContent = '☰';
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = nav && nav.contains(event.target);
    const isClickInsideButton = menuButton && menuButton.contains(event.target);
    
    if (!isClickInsideNav && !isClickInsideButton && nav) {
      nav.classList.remove('open');
      if (menuButton) {
        menuButton.textContent = '☰';
      }
    }
  });
});
