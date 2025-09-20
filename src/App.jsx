import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/ui/Header';
import CurrentWeather from './components/weather/CurrentWeather';
import WeatherForecast from './components/weather/WeatherForecast';
import WeatherAnimations from './components/animations/WeatherAnimations';
import { useWeather } from './hooks/useWeather';
import { 
  getWeatherTheme, 
  isNightTime as checkIsNightTime,
  getWeatherCategory 
} from './utils/weatherUtils';
import './App.css';

function App() {
  const {
    weatherData,
    loading,
    error,
    currentLocation,
    lastUpdated,
    loadWeatherData,
    loadCurrentLocationWeather,
    refreshWeatherData,
  } = useWeather();

  // Determine current theme based on weather and time
  const currentTheme = useMemo(() => {
    if (!weatherData?.current) return 'cloudy';
    
    const isNight = checkIsNightTime(
      Date.now() / 1000, 
      weatherData.current.sys.sunrise, 
      weatherData.current.sys.sunset
    );
    
    if (isNight) return 'night';
    
    return getWeatherCategory(
      weatherData.current.weather[0].main,
      weatherData.current.weather[0].description
    );
  }, [weatherData]);

  // Get background gradient classes
  const backgroundClasses = {
    sunny: 'from-sunny-400 via-orange-400 to-red-500',
    rainy: 'from-rainy-600 via-blue-700 to-gray-800',
    cloudy: 'from-cloudy-400 via-gray-500 to-gray-700',
    snowy: 'from-snowy-300 via-blue-400 to-gray-600',
    night: 'from-gray-900 via-blue-900 to-purple-900',
  };

  const currentBg = backgroundClasses[currentTheme] || backgroundClasses.cloudy;

  const handleLocationSelect = (location) => {
    loadWeatherData(location.lat, location.lon);
  };

  const handleCurrentLocationClick = () => {
    loadCurrentLocationWeather();
  };

  const handleRefresh = () => {
    refreshWeatherData();
  };

  // Loading component
  const LoadingComponent = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">Loading weather data...</p>
        <p className="text-white/60 text-sm mt-2">Getting your location and forecast</p>
      </div>
    </div>
  );

  // Error component
  const ErrorComponent = () => (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">Unable to Load Weather</h2>
        <p className="text-white/70 mb-6">{error}</p>
        <div className="space-y-3">
          <button
            onClick={handleCurrentLocationClick}
            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300"
          >
            Try Current Location
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white/80 font-medium transition-all duration-300"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentBg} transition-all duration-1000 relative overflow-hidden`} style={{ backgroundColor: '#1e293b' }}>
      {/* Weather Animations */}
      <WeatherAnimations 
        weatherCondition={weatherData?.current?.weather[0]?.description}
        isNightTime={currentTheme === 'night'}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <Header
            onLocationSelect={handleLocationSelect}
            onCurrentLocationClick={handleCurrentLocationClick}
            onRefresh={handleRefresh}
            isLoading={loading}
            currentLocation={currentLocation}
          />

          {/* Content */}
          <AnimatePresence mode="wait">
            {loading && !weatherData ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingComponent />
              </motion.div>
            ) : error && !weatherData ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorComponent />
              </motion.div>
            ) : weatherData ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Current Weather */}
                <CurrentWeather 
                  weatherData={weatherData} 
                  lastUpdated={lastUpdated}
                />

                {/* Weather Forecast */}
                <WeatherForecast 
                  forecastData={weatherData.forecast}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

export default App;
