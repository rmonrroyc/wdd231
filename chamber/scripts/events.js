// Events Section - Chamber Events and Activities

const eventsContainer = document.getElementById('events-container');

// Sample events data - in a real application, this would come from a database or API
const events = [
  {
    id: 1,
    title: 'Monthly Business Networking Breakfast',
    date: '2026-02-15',
    time: '08:00 AM',
    location: 'Concepción Convention Center',
    description: 'Join us for our monthly networking breakfast where local business leaders gather to share opportunities and build relationships.'
  },
  {
    id: 2,
    title: 'Digital Marketing Workshop',
    date: '2026-02-20',
    time: '10:00 AM',
    location: 'Chamber Office',
    description: 'Learn digital marketing strategies to grow your business online. Expert speakers will cover social media, SEO, and email marketing.'
  },
  {
    id: 3,
    title: 'Annual Chamber Gala',
    date: '2026-03-10',
    time: '06:00 PM',
    location: 'Concepción Convention Center',
    description: 'Celebrate our community with the annual Chamber Gala featuring awards recognition, fine dining, and networking.'
  }
];

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Function to load and display events
function loadEvents() {
  if (events.length === 0) {
    eventsContainer.innerHTML = '<p>No upcoming events at this time.</p>';
    return;
  }
  
  let eventsHTML = '';
  
  // Display only the next 3 events (upcoming)
  const upcomingEvents = events.slice(0, 3);
  
  upcomingEvents.forEach(event => {
    eventsHTML += `
      <article class="event-card">
        <div class="event-header">
          <h3>${event.title}</h3>
        </div>
        <div class="event-details">
          <p><strong>📅 Date:</strong> ${formatDate(event.date)}</p>
          <p><strong>🕐 Time:</strong> ${event.time}</p>
          <p><strong>📍 Location:</strong> ${event.location}</p>
        </div>
        <p class="event-description">${event.description}</p>
      </article>
    `;
  });
  
  eventsContainer.innerHTML = eventsHTML;
}

// Load events on page load
document.addEventListener('DOMContentLoaded', loadEvents);
