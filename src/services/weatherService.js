import axios from 'axios';
import { WEATHER_API_CONFIG } from '../constants/weatherConstants';

// Create axios instance with base configuration
const weatherAPI = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle API key
weatherAPI.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: WEATHER_API_CONFIG.API_KEY,
    units: WEATHER_API_CONFIG.UNITS,
  };
  return config;
});

// Error handling helper
const handleAPIError = (error) => {
  console.error('Weather API Error:', error);
  
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 401:
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      case 404:
        throw new Error('Location not found. Please check the city name.');
      case 429:
        throw new Error('API rate limit exceeded. Please try again later.');
      default:
        throw new Error(data.message || 'Weather service unavailable.');
    }
  } else if (error.request) {
    throw new Error('Network error. Please check your internet connection.');
  } else {
    throw new Error('Something went wrong. Please try again.');
  }
};

// Get current weather by coordinates
export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await weatherAPI.get(`${WEATHER_API_CONFIG.BASE_URL}/weather`, {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// Get current weather by city name
export const getCurrentWeatherByCity = async (cityName) => {
  try {
    const response = await weatherAPI.get(`${WEATHER_API_CONFIG.BASE_URL}/weather`, {
      params: { q: cityName },
    });
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// Get 5-day forecast by coordinates
export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await weatherAPI.get(`${WEATHER_API_CONFIG.BASE_URL}/forecast`, {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// Get 5-day forecast by city name
export const getForecastByCity = async (cityName) => {
  try {
    const response = await weatherAPI.get(`${WEATHER_API_CONFIG.BASE_URL}/forecast`, {
      params: { q: cityName },
    });
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// Get detailed weather data (One Call API) - requires subscription
export const getOneCallWeather = async (lat, lon) => {
  try {
    const response = await weatherAPI.get(`${WEATHER_API_CONFIG.ONE_CALL_URL}`, {
      params: { 
        lat, 
        lon,
        exclude: 'minutely,alerts' // exclude minutely and alerts to reduce data
      },
    });
    return response.data;
  } catch (error) {
    // Fallback to free tier APIs if One Call is not available
    console.warn('One Call API not available, falling back to free tier');
    const [current, forecast] = await Promise.all([
      getCurrentWeatherByCoords(lat, lon),
      getForecastByCoords(lat, lon)
    ]);
    
    return {
      current,
      forecast,
      hourly: forecast.list.slice(0, 24), // First 24 hours
      daily: processDailyForecast(forecast.list),
    };
  }
};

// Get geocoding data for city search
export const searchCities = async (query) => {
  try {
    const response = await weatherAPI.get(`${WEATHER_API_CONFIG.GEO_URL}/direct`, {
      params: { 
        q: query,
        limit: 5,
      },
    });
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// Reverse geocoding - get city name from coordinates
export const getCityFromCoords = async (lat, lon) => {
  try {
    const response = await weatherAPI.get(`${WEATHER_API_CONFIG.GEO_URL}/reverse`, {
      params: { 
        lat,
        lon,
        limit: 1,
      },
    });
    return response.data[0];
  } catch (error) {
    handleAPIError(error);
  }
};

// Get user's current location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5 * 60 * 1000, // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location access denied by user.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable.'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred while getting location.'));
        }
      },
      options
    );
  });
};

// Helper function to process daily forecast from 5-day forecast
const processDailyForecast = (forecastList) => {
  const dailyData = {};
  
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    
    if (!dailyData[date]) {
      dailyData[date] = {
        dt: item.dt,
        temp: { min: item.main.temp, max: item.main.temp },
        weather: item.weather,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        wind_speed: item.wind.speed,
        pop: item.pop,
      };
    } else {
      // Update min/max temperatures
      dailyData[date].temp.min = Math.min(dailyData[date].temp.min, item.main.temp);
      dailyData[date].temp.max = Math.max(dailyData[date].temp.max, item.main.temp);
      
      // Use the weather condition from noon (12:00) if available
      if (new Date(item.dt * 1000).getHours() === 12) {
        dailyData[date].weather = item.weather;
      }
    }
  });
  
  return Object.values(dailyData).slice(0, 7); // Return 7 days
};

// Comprehensive weather data fetching function
export const getCompleteWeatherData = async (lat, lon) => {
  try {
    const [current, forecast, cityInfo] = await Promise.all([
      getCurrentWeatherByCoords(lat, lon),
      getForecastByCoords(lat, lon),
      getCityFromCoords(lat, lon).catch(() => null), // Optional, don't fail if it doesn't work
    ]);

    const dailyForecast = processDailyForecast(forecast.list);
    const hourlyForecast = forecast.list.slice(0, 24);

    return {
      current,
      forecast: {
        daily: dailyForecast,
        hourly: hourlyForecast,
      },
      location: {
        name: cityInfo?.name || current.name,
        country: cityInfo?.country || current.sys.country,
        state: cityInfo?.state,
        lat: current.coord.lat,
        lon: current.coord.lon,
      },
      lastUpdated: new Date(),
    };
  } catch (error) {
    handleAPIError(error);
  }
};

export default {
  getCurrentWeatherByCoords,
  getCurrentWeatherByCity,
  getForecastByCoords,
  getForecastByCity,
  getOneCallWeather,
  searchCities,
  getCityFromCoords,
  getCurrentLocation,
  getCompleteWeatherData,
};
