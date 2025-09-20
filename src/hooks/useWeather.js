import { useState, useEffect, useCallback, useRef } from 'react';
import { getCompleteWeatherData, getCurrentLocation, searchCities } from '../services/weatherService';
import { UPDATE_INTERVALS, STORAGE_KEYS } from '../constants/weatherConstants';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const updateIntervalRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Load weather data for given coordinates
  const loadWeatherData = useCallback(async (lat, lon, showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const data = await getCompleteWeatherData(lat, lon);
      setWeatherData(data);
      setCurrentLocation({ lat, lon });
      setLastUpdated(new Date());
      
      // Save last location
      localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify({ lat, lon }));
    } catch (err) {
      setError(err.message);
      console.error('Error loading weather data:', err);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  // Get user's current location and load weather
  const loadCurrentLocationWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const location = await getCurrentLocation();
      await loadWeatherData(location.lat, location.lon, false);
    } catch (err) {
      setError(err.message);
      // Try to load last saved location as fallback
      const lastLocation = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
      if (lastLocation) {
        const { lat, lon } = JSON.parse(lastLocation);
        await loadWeatherData(lat, lon, false);
      }
    } finally {
      setLoading(false);
    }
  }, [loadWeatherData]);

  // Refresh current weather data
  const refreshWeatherData = useCallback(async () => {
    if (currentLocation) {
      await loadWeatherData(currentLocation.lat, currentLocation.lon, false);
    }
  }, [currentLocation, loadWeatherData]);

  // Set up auto-refresh
  const setupAutoRefresh = useCallback(() => {
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }

    updateIntervalRef.current = setInterval(() => {
      if (currentLocation) {
        refreshWeatherData();
      }
    }, UPDATE_INTERVALS.CURRENT_WEATHER);
  }, [currentLocation, refreshWeatherData]);

  // Initialize weather data on mount
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      loadCurrentLocationWeather();
    }
  }, [loadCurrentLocationWeather]);

  // Set up auto-refresh when location changes
  useEffect(() => {
    if (currentLocation) {
      setupAutoRefresh();
    }

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [currentLocation, setupAutoRefresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, []);

  return {
    weatherData,
    loading,
    error,
    currentLocation,
    lastUpdated,
    loadWeatherData,
    loadCurrentLocationWeather,
    refreshWeatherData,
  };
};

export const useLocationSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const searchLocations = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    setSearchError(null);

    try {
      const results = await searchCities(query);
      setSearchResults(results);
    } catch (err) {
      setSearchError(err.message);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchError(null);
  }, []);

  return {
    searchResults,
    searchLoading,
    searchError,
    searchLocations,
    clearSearch,
  };
};

export const useSavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState([]);

  // Load saved locations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_LOCATIONS);
    if (saved) {
      setSavedLocations(JSON.parse(saved));
    }
  }, []);

  // Save location
  const saveLocation = useCallback((location) => {
    setSavedLocations(prev => {
      // Check if location already exists
      const exists = prev.some(loc => 
        Math.abs(loc.lat - location.lat) < 0.01 && 
        Math.abs(loc.lon - location.lon) < 0.01
      );
      
      if (exists) return prev;
      
      const updated = [...prev, location];
      localStorage.setItem(STORAGE_KEYS.SAVED_LOCATIONS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Remove saved location
  const removeSavedLocation = useCallback((locationToRemove) => {
    setSavedLocations(prev => {
      const updated = prev.filter(loc => 
        !(Math.abs(loc.lat - locationToRemove.lat) < 0.01 && 
          Math.abs(loc.lon - locationToRemove.lon) < 0.01)
      );
      localStorage.setItem(STORAGE_KEYS.SAVED_LOCATIONS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if location is saved
  const isLocationSaved = useCallback((location) => {
    return savedLocations.some(loc => 
      Math.abs(loc.lat - location.lat) < 0.01 && 
      Math.abs(loc.lon - location.lon) < 0.01
    );
  }, [savedLocations]);

  return {
    savedLocations,
    saveLocation,
    removeSavedLocation,
    isLocationSaved,
  };
};
