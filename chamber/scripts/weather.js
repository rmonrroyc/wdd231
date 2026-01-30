// Weather Section - Concepción, Chile
const weatherContainer = document.getElementById('weather-container');

async function loadWeather() {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-36.8201&longitude=-73.0554&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&temperature_unit=celsius&timezone=America/Santiago'
    );
    if (!response.ok) throw new Error('Failed to fetch weather data');

    const data = await response.json();
    const current = data.current_weather;
    const daily = data.daily;

    const currentWeatherHTML = `
      <div class="weather-details">
        <div class="weather-main">
          <span class="temperature">${current.temperature}°C</span>
          <span class="description">${getWeatherDescription(current.weathercode)}</span>
        </div>
      </div>
    `;

    let forecastHTML = '<div class="weather-forecast">';
    for (let i = 0; i < 3; i++) {
      forecastHTML += `
        <div class="forecast-day">
          <p><strong>${daily.time[i]}</strong></p>
          <p>${getWeatherDescription(daily.weathercode[i])}</p>
          <p>Min: ${daily.temperature_2m_min[i]}°C | Max: ${daily.temperature_2m_max[i]}°C</p>
        </div>
      `;
    }
    forecastHTML += '</div>';

    weatherContainer.innerHTML = currentWeatherHTML + forecastHTML;

  } catch (error) {
    console.error('Weather fetch error:', error);
    weatherContainer.innerHTML = '<p>Unable to load weather information at this time.</p>';
  }
}

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

document.addEventListener('DOMContentLoaded', loadWeather);
