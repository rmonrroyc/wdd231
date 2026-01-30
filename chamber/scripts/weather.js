// Weather Section - Concepción, Chile
// Using Open-Meteo API (free, no API key required)

const weatherContainer = document.getElementById('weather-container');

// Fetch weather data for Concepción, Chile
async function loadWeather() {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-36.8201&longitude=-73.0554&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    const current = data.current;
    
    // Interpret weather code
    const weatherDescription = getWeatherDescription(current.weather_code);
    
    // Create weather HTML
    const weatherHTML = `
      <div class="weather-details">
        <div class="weather-main">
          <span class="temperature">${current.temperature_2m}°C</span>
          <span class="description">${weatherDescription}</span>
        </div>
        <div class="weather-info">
          <p><strong>Humidity:</strong> ${current.relative_humidity_2m}%</p>
          <p><strong>Wind Speed:</strong> ${current.wind_speed_10m} km/h</p>
        </div>
      </div>
    `;
    
    weatherContainer.innerHTML = weatherHTML;
  } catch (error) {
    console.error('Weather fetch error:', error);
    weatherContainer.innerHTML = '<p>Unable to load weather information at this time.</p>';
  }
}

// WMO Weather interpretation codes
function getWeatherDescription(code) {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with hail'
  };
  
  return weatherCodes[code] || 'Unknown';
}

// Load weather on page load
document.addEventListener('DOMContentLoaded', loadWeather);
