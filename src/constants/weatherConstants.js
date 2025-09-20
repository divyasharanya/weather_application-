// OpenWeatherMap API configuration
export const WEATHER_API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  GEO_URL: 'https://api.openweathermap.org/geo/1.0',
  ONE_CALL_URL: 'https://api.openweathermap.org/data/3.0/onecall',
  API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || 'your-api-key-here',
  UNITS: 'metric', // metric, imperial, or standard
};

// Weather condition mappings for backgrounds and themes
export const WEATHER_CONDITIONS = {
  CLEAR: ['clear', 'sunny'],
  CLOUDS: ['clouds', 'cloudy', 'overcast'],
  RAIN: ['rain', 'drizzle', 'shower'],
  THUNDERSTORM: ['thunderstorm', 'storm'],
  SNOW: ['snow', 'sleet', 'blizzard'],
  MIST: ['mist', 'fog', 'haze', 'smoke'],
};

// Weather icons mapping
export const WEATHER_ICONS = {
  '01d': 'sunny', // clear sky day
  '01n': 'clear-night', // clear sky night
  '02d': 'partly-cloudy', // few clouds day
  '02n': 'partly-cloudy-night', // few clouds night
  '03d': 'cloudy', // scattered clouds
  '03n': 'cloudy',
  '04d': 'overcast', // broken clouds
  '04n': 'overcast',
  '09d': 'rain', // shower rain
  '09n': 'rain',
  '10d': 'rain-sun', // rain day
  '10n': 'rain-night', // rain night
  '11d': 'thunderstorm', // thunderstorm
  '11n': 'thunderstorm',
  '13d': 'snow', // snow
  '13n': 'snow',
  '50d': 'mist', // mist
  '50n': 'mist',
};

// Background themes based on weather
export const WEATHER_THEMES = {
  sunny: {
    primary: 'from-sunny-400 to-sunny-600',
    secondary: 'from-orange-400 to-red-500',
    text: 'text-white',
    card: 'bg-white/20',
  },
  rainy: {
    primary: 'from-rainy-600 to-rainy-800',
    secondary: 'from-blue-600 to-gray-700',
    text: 'text-white',
    card: 'bg-white/15',
  },
  cloudy: {
    primary: 'from-cloudy-400 to-cloudy-700',
    secondary: 'from-gray-400 to-gray-600',
    text: 'text-white',
    card: 'bg-white/15',
  },
  snowy: {
    primary: 'from-snowy-300 to-snowy-600',
    secondary: 'from-blue-300 to-gray-500',
    text: 'text-gray-900',
    card: 'bg-white/25',
  },
  night: {
    primary: 'from-gray-900 to-blue-900',
    secondary: 'from-indigo-900 to-purple-900',
    text: 'text-white',
    card: 'bg-white/10',
  },
};

// Default locations for quick access
export const DEFAULT_CITIES = [
  { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
  { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
  { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
  { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 },
];

// Time intervals for updates
export const UPDATE_INTERVALS = {
  CURRENT_WEATHER: 5 * 60 * 1000, // 5 minutes
  FORECAST: 30 * 60 * 1000, // 30 minutes
  LOCATION_REFRESH: 10 * 60 * 1000, // 10 minutes
};

// Storage keys for localStorage
export const STORAGE_KEYS = {
  SAVED_LOCATIONS: 'weather_saved_locations',
  LAST_LOCATION: 'weather_last_location',
  THEME_PREFERENCE: 'weather_theme_preference',
  UNITS_PREFERENCE: 'weather_units_preference',
};
