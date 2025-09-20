import React, { useState } from 'react';
import WeatherIcon from '../ui/WeatherIcon';
import { 
  formatTemperature, 
  formatTime,
  formatDayOfWeek,
  getWeatherIcon,
  getPrecipitationDescription 
} from '../../utils/weatherUtils';

const HourlyForecast = ({ hourlyData }) => {
  if (!hourlyData || !hourlyData.length) return null;

  const next24Hours = hourlyData.slice(0, 24);

  return (
    <div className="weather-card backdrop-blur-xl rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <span>📊</span>
        <span>24-Hour Forecast</span>
      </h2>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 min-w-max">
          {next24Hours.map((hour, index) => {
            const isNow = index === 0;
            const iconName = getWeatherIcon(hour.weather[0].icon);
            
            return (
              <div 
                key={hour.dt} 
                className={`flex-shrink-0 bg-white/10 rounded-xl p-4 text-center min-w-[100px] transition-all duration-300 hover:bg-white/20 ${
                  isNow ? 'ring-2 ring-white/50 bg-white/20' : ''
                }`}
              >
                <div className="text-sm text-white/70 font-medium mb-2">
                  {isNow ? 'Now' : formatTime(hour.dt)}
                </div>
                
                <div className="mb-3">
                  <WeatherIcon icon={iconName} size="small" />
                </div>
                
                <div className="text-lg font-semibold text-white mb-1">
                  {formatTemperature(hour.main.temp)}
                </div>
                
                {hour.pop > 0.1 && (
                  <div className="text-xs text-blue-300">
                    {Math.round(hour.pop * 100)}%
                  </div>
                )}
                
                <div className="text-xs text-white/60 mt-1">
                  {Math.round(hour.wind?.speed * 3.6 || 0)} km/h
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DailyForecast = ({ dailyData }) => {
  if (!dailyData || !dailyData.length) return null;

  return (
    <div className="weather-card backdrop-blur-xl rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <span>📅</span>
        <span>7-Day Forecast</span>
      </h2>
      
      <div className="space-y-2">
        {dailyData.map((day, index) => {
          const iconName = getWeatherIcon(day.weather[0].icon);
          const isToday = index === 0;
          
          return (
            <div 
              key={day.dt} 
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                isToday ? 'bg-white/15' : 'bg-white/5'
              }`}
            >
              {/* Day and Weather */}
              <div className="flex items-center space-x-4 flex-1">
                <div className="min-w-[80px]">
                  <div className="font-semibold text-white">
                    {formatDayOfWeek(day.dt)}
                  </div>
                  {day.weather[0].description && (
                    <div className="text-xs text-white/60 capitalize">
                      {day.weather[0].description}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <WeatherIcon icon={iconName} size="small" />
                  {day.pop > 0.1 && (
                    <div className="text-sm text-blue-300">
                      {Math.round(day.pop * 100)}%
                    </div>
                  )}
                </div>
              </div>
              
              {/* Temperature Range */}
              <div className="flex items-center space-x-3 text-right">
                <div className="text-sm text-white/70">
                  {formatTemperature(day.temp.min)}
                </div>
                <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                    style={{ width: '70%' }}
                  />
                </div>
                <div className="text-lg font-semibold text-white min-w-[60px]">
                  {formatTemperature(day.temp.max)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeatherForecast = ({ forecastData }) => {
  const [activeTab, setActiveTab] = useState('hourly');
  
  if (!forecastData) return null;

  const { hourly, daily } = forecastData;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-white/10 rounded-xl p-1 backdrop-blur-sm">
        <button
          onClick={() => setActiveTab('hourly')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'hourly'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Hourly Forecast
        </button>
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'daily'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Daily Forecast
        </button>
      </div>

      {/* Forecast Content */}
      <div className="transition-all duration-300">
        {activeTab === 'hourly' ? (
          <HourlyForecast hourlyData={hourly} />
        ) : (
          <DailyForecast dailyData={daily} />
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
export { HourlyForecast, DailyForecast };
