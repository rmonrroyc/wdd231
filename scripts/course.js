// course.js - Handle course display, filtering, and credit calculations

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize course display
  displayCourses(courses);
  
  // Setup filter button event listeners
  setupFilterButtons();
});

/**
 * Setup filter button click events
 */
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value and display filtered courses
      currentFilter = this.getAttribute('data-filter');
      const filteredCourses = filterCourses(courses, currentFilter);
      displayCourses(filteredCourses);
    });
  });
}

/**
 * Filter courses by subject
 * @param {Array} courseList - Array of course objects
 * @param {String} filter - Filter type: 'all', 'wdd', or 'cse'
 * @returns {Array} - Filtered array of courses
 */
function filterCourses(courseList, filter) {
  if (filter === 'all') {
    return courseList;
  }
  
  return courseList.filter(course => 
    course.subject.toLowerCase() === filter.toUpperCase().toLowerCase()
  );
}

/**
 * Display courses dynamically on the page
 * @param {Array} courseList - Array of course objects to display
 */
function displayCourses(courseList) {
  const courseDisplay = document.getElementById('course-display');
  
  if (!courseDisplay) return;
  
  // Clear previous courses
  courseDisplay.innerHTML = '';
  
  // Create and append course cards
  courseList.forEach(course => {
    const card = createCourseCard(course);
    courseDisplay.appendChild(card);
  });
  
  // Update total credits
  updateTotalCredits(courseList);
}

/**
 * Create a course card element
 * @param {Object} course - Course object
 * @returns {HTMLElement} - Course card element
 */
function createCourseCard(course) {
  const card = document.createElement('div');
  card.className = 'course-card';
  
  // Add completed class if course is completed
  if (course.completed) {
    card.classList.add('completed');
  }
  
  // Build course title
  const courseTitle = `${course.subject} ${course.number}`;
  
  // Create card HTML
  card.innerHTML = `
    <div class="course-header">
      <h3>${course.title}</h3>
      <span class="course-code">${courseTitle}</span>
    </div>
    <div class="course-body">
      <p><strong>Credits:</strong> ${course.credits}</p>
      ${course.completed ? '<p class="completion-badge">✓ Completed</p>' : ''}
    </div>
  `;
  
  return card;
}

/**
 * Calculate and update total credits using reduce
 * @param {Array} courseList - Array of course objects
 */
function updateTotalCredits(courseList) {
  const totalCreditsElement = document.getElementById('total-credits');
  
  if (!totalCreditsElement) return;
  
  // Use reduce to sum up credits
  const totalCredits = courseList.reduce((sum, course) => {
    return sum + course.credits;
  }, 0);
  
  totalCreditsElement.textContent = totalCredits;
}
