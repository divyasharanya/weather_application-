import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns';
import { WEATHER_CONDITIONS, WEATHER_ICONS, WEATHER_THEMES } from '../constants/weatherConstants';

// Format temperature with unit
export const formatTemperature = (temp, unit = '°C') => {
  return `${Math.round(temp)}${unit}`;
};

// Format wind speed
export const formatWindSpeed = (speed, unit = 'metric') => {
  if (unit === 'imperial') {
    return `${Math.round(speed)} mph`;
  }
  return `${Math.round(speed * 3.6)} km/h`; // Convert m/s to km/h
};

// Format pressure
export const formatPressure = (pressure) => {
  return `${pressure} hPa`;
};

// Format humidity
export const formatHumidity = (humidity) => {
  return `${humidity}%`;
};

// Format visibility
export const formatVisibility = (visibility, unit = 'metric') => {
  if (unit === 'imperial') {
    return `${Math.round(visibility * 0.621371)} mi`;
  }
  return `${Math.round(visibility / 1000)} km`;
};

// Format UV Index
export const formatUVIndex = (uvIndex) => {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-500' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-500' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-500' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-500' };
  return { level: 'Extreme', color: 'text-purple-500' };
};

// Get weather condition category
export const getWeatherCategory = (weatherMain, weatherDescription) => {
  const main = weatherMain.toLowerCase();
  const description = weatherDescription.toLowerCase();
  
  if (WEATHER_CONDITIONS.CLEAR.some(condition => 
    main.includes(condition) || description.includes(condition))) {
    return 'sunny';
  }
  
  if (WEATHER_CONDITIONS.RAIN.some(condition => 
    main.includes(condition) || description.includes(condition))) {
    return 'rainy';
  }
  
  if (WEATHER_CONDITIONS.THUNDERSTORM.some(condition => 
    main.includes(condition) || description.includes(condition))) {
    return 'rainy'; // Use rainy theme for thunderstorms
  }
  
  if (WEATHER_CONDITIONS.SNOW.some(condition => 
    main.includes(condition) || description.includes(condition))) {
    return 'snowy';
  }
  
  if (WEATHER_CONDITIONS.CLOUDS.some(condition => 
    main.includes(condition) || description.includes(condition))) {
    return 'cloudy';
  }
  
  if (WEATHER_CONDITIONS.MIST.some(condition => 
    main.includes(condition) || description.includes(condition))) {
    return 'cloudy'; // Use cloudy theme for mist/fog
  }
  
  return 'cloudy'; // Default fallback
};

// Get weather theme based on condition and time
export const getWeatherTheme = (weatherData, isNightTime = false) => {
  if (isNightTime) {
    return WEATHER_THEMES.night;
  }
  
  const category = getWeatherCategory(weatherData.weather[0].main, weatherData.weather[0].description);
  return WEATHER_THEMES[category] || WEATHER_THEMES.cloudy;
};

// Check if it's night time based on sunrise/sunset
export const isNightTime = (currentTime, sunrise, sunset) => {
  const now = currentTime || Date.now() / 1000;
  return now < sunrise || now > sunset;
};

// Get weather icon name
export const getWeatherIcon = (iconCode) => {
  return WEATHER_ICONS[iconCode] || 'cloudy';
};

// Format time from timestamp
export const formatTime = (timestamp, format12Hour = true) => {
  const date = new Date(timestamp * 1000);
  return format(date, format12Hour ? 'h:mm a' : 'HH:mm');
};

// Format date for forecast
export const formatForecastDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  
  return format(date, 'EEE, MMM d');
};

// Format day of week
export const formatDayOfWeek = (timestamp) => {
  const date = new Date(timestamp * 1000);
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  
  return format(date, 'EEEE');
};

// Get cardinal direction from wind degree
export const getWindDirection = (degrees) => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Calculate feels like temperature description
export const getFeelsLikeDescription = (temp, feelsLike) => {
  const diff = feelsLike - temp;
  
  if (Math.abs(diff) < 2) {
    return 'Similar to actual temperature';
  }
  
  if (diff > 0) {
    return `Feels ${Math.round(Math.abs(diff))}° warmer due to humidity`;
  }
  
  return `Feels ${Math.round(Math.abs(diff))}° cooler due to wind`;
};

// Get precipitation probability description
export const getPrecipitationDescription = (pop) => {
  if (pop === 0) return 'No precipitation expected';
  if (pop <= 0.25) return 'Light chance of precipitation';
  if (pop <= 0.5) return 'Moderate chance of precipitation';
  if (pop <= 0.75) return 'High chance of precipitation';
  return 'Very high chance of precipitation';
};

// Convert units
export const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;
  
  // Convert to Celsius first
  let celsius = temp;
  if (fromUnit === 'fahrenheit') {
    celsius = (temp - 32) * 5/9;
  } else if (fromUnit === 'kelvin') {
    celsius = temp - 273.15;
  }
  
  // Convert from Celsius to target unit
  if (toUnit === 'fahrenheit') {
    return (celsius * 9/5) + 32;
  } else if (toUnit === 'kelvin') {
    return celsius + 273.15;
  }
  
  return celsius;
};

// Get Air Quality Index description
export const getAQIDescription = (aqi) => {
  switch (aqi) {
    case 1: return { level: 'Good', color: 'text-green-500' };
    case 2: return { level: 'Fair', color: 'text-yellow-500' };
    case 3: return { level: 'Moderate', color: 'text-orange-500' };
    case 4: return { level: 'Poor', color: 'text-red-500' };
    case 5: return { level: 'Very Poor', color: 'text-purple-500' };
    default: return { level: 'Unknown', color: 'text-gray-500' };
  }
};

// Group hourly forecast by day
export const groupHourlyForecastByDay = (hourlyData) => {
  const grouped = {};
  
  hourlyData.forEach((hour) => {
    const date = format(new Date(hour.dt * 1000), 'yyyy-MM-dd');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(hour);
  });
  
  return grouped;
};

// Get weather advice based on conditions
export const getWeatherAdvice = (weatherData) => {
  const condition = weatherData.weather[0].main.toLowerCase();
  const temp = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  
  let advice = [];
  
  // Temperature advice
  if (temp < 0) {
    advice.push('Bundle up! It\'s freezing outside.');
  } else if (temp < 10) {
    advice.push('Dress warmly, it\'s quite cold.');
  } else if (temp > 30) {
    advice.push('Stay hydrated and seek shade when possible.');
  }
  
  // Feels like advice
  if (Math.abs(feelsLike - temp) > 5) {
    if (feelsLike > temp) {
      advice.push('High humidity makes it feel warmer.');
    } else {
      advice.push('Wind chill makes it feel colder.');
    }
  }
  
  // Condition-specific advice
  if (condition.includes('rain')) {
    advice.push('Don\'t forget your umbrella!');
  } else if (condition.includes('snow')) {
    advice.push('Watch out for slippery conditions.');
  } else if (condition.includes('clear') && temp > 25) {
    advice.push('Perfect weather for outdoor activities!');
  }
  
  // Wind advice
  if (windSpeed > 10) {
    advice.push('Windy conditions - secure loose items.');
  }
  
  // Humidity advice
  if (humidity > 80) {
    advice.push('High humidity may make it feel uncomfortable.');
  }
  
  return advice.length > 0 ? advice : ['Have a great day!'];
};

// Format last updated time
export const formatLastUpdated = (timestamp) => {
  const now = new Date();
  const updated = new Date(timestamp);
  const diffInMinutes = Math.floor((now - updated) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
};

export default {
  formatTemperature,
  formatWindSpeed,
  formatPressure,
  formatHumidity,
  formatVisibility,
  formatUVIndex,
  getWeatherCategory,
  getWeatherTheme,
  isNightTime,
  getWeatherIcon,
  formatTime,
  formatForecastDate,
  formatDayOfWeek,
  getWindDirection,
  getFeelsLikeDescription,
  getPrecipitationDescription,
  convertTemperature,
  getAQIDescription,
  groupHourlyForecastByDay,
  getWeatherAdvice,
  formatLastUpdated,
};
