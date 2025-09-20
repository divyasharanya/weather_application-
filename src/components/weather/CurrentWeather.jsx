import React from 'react';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import WeatherIcon from '../ui/WeatherIcon';
import { 
  formatTemperature, 
  formatTime, 
  getWeatherIcon,
  isNightTime as checkIsNightTime,
  getWeatherAdvice,
  formatLastUpdated 
} from '../../utils/weatherUtils';

const CurrentWeather = ({ weatherData, lastUpdated }) => {
  if (!weatherData) return null;

  const { current, location } = weatherData;
  const isNight = checkIsNightTime(Date.now() / 1000, current.sys.sunrise, current.sys.sunset);
  const iconName = getWeatherIcon(current.weather[0].icon);
  const advice = getWeatherAdvice(current);

  return (
    <div className="weather-card backdrop-blur-xl rounded-3xl p-8 mb-8 transition-all duration-500 hover:scale-[1.02]">
      {/* Location and Date */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-5 h-5 text-white/70" />
          <h1 className="text-2xl font-bold text-white">
            {location.name}
            {location.state && `, ${location.state}`}
            {location.country && ` (${location.country})`}
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-white/70">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          {/* Weather Icon */}
          <div className="relative">
            <WeatherIcon icon={iconName} size="xl" className="drop-shadow-2xl" />
            {isNight && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-300 rounded-full animate-pulse" />
            )}
          </div>

          {/* Temperature and Description */}
          <div>
            <div className="text-6xl font-bold text-white mb-2">
              {formatTemperature(current.main.temp)}
            </div>
            <div className="text-xl text-white/80 capitalize mb-1">
              {current.weather[0].description}
            </div>
            <div className="text-sm text-white/60">
              Feels like {formatTemperature(current.main.feels_like)}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 text-right">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-white/60 uppercase tracking-wide">High/Low</div>
            <div className="text-lg font-semibold text-white">
              {formatTemperature(current.main.temp_max)} / {formatTemperature(current.main.temp_min)}
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-white/60 uppercase tracking-wide">Humidity</div>
            <div className="text-lg font-semibold text-white">
              {current.main.humidity}%
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-white/60 uppercase tracking-wide">Wind</span>
          </div>
          <div className="text-lg font-semibold text-white">
            {Math.round(current.wind?.speed * 3.6 || 0)} km/h
          </div>
          {current.wind?.deg && (
            <div className="text-xs text-white/60">
              {Math.round(current.wind.deg)}°
            </div>
          )}
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-white/60 uppercase tracking-wide">Pressure</span>
          </div>
          <div className="text-lg font-semibold text-white">
            {current.main.pressure} hPa
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-xs text-white/60 uppercase tracking-wide">Visibility</span>
          </div>
          <div className="text-lg font-semibold text-white">
            {current.visibility ? Math.round(current.visibility / 1000) : 'N/A'} km
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-xs text-white/60 uppercase tracking-wide">UV Index</span>
          </div>
          <div className="text-lg font-semibold text-white">
            N/A
          </div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <span className="text-xs">☀️</span>
            </div>
            <span className="text-sm text-white/80 font-medium">Sunrise</span>
          </div>
          <div className="text-xl font-semibold text-white">
            {formatTime(current.sys.sunrise)}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs">🌅</span>
            </div>
            <span className="text-sm text-white/80 font-medium">Sunset</span>
          </div>
          <div className="text-xl font-semibold text-white">
            {formatTime(current.sys.sunset)}
          </div>
        </div>
      </div>

      {/* Weather Advice */}
      {advice.length > 0 && (
        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold text-white/80 mb-2 uppercase tracking-wide">
            Weather Tips
          </h3>
          <div className="space-y-1">
            {advice.slice(0, 2).map((tip, index) => (
              <div key={index} className="text-sm text-white/70 flex items-start space-x-2">
                <span className="text-xs mt-1">💡</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-center text-xs text-white/50">
          Last updated: {formatLastUpdated(lastUpdated)}
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
