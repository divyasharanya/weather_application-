import React, { useState } from 'react';
import { ArrowPathIcon, MapPinIcon, BookmarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import SearchBar from './SearchBar';

const Header = ({ 
  onLocationSelect,
  onCurrentLocationClick,
  onRefresh,
  isLoading,
  currentLocation,
  className = '' 
}) => {
  const [showSavedLocations, setShowSavedLocations] = useState(false);

  return (
    <header className={`mb-8 ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
        {/* Logo/Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">⛅</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">WeatherApp</h1>
            <p className="text-sm text-white/60">Real-time weather updates</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="flex-1 md:w-96">
            <SearchBar 
              onLocationSelect={onLocationSelect}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Current Location Button */}
            <button
              onClick={onCurrentLocationClick}
              disabled={isLoading}
              className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 group"
              title="Use current location"
            >
              <MapPinIcon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
            </button>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 group"
              title="Refresh weather data"
            >
              <ArrowPathIcon className={`w-5 h-5 text-white/80 group-hover:text-white transition-colors ${
                isLoading ? 'animate-spin' : ''
              }`} />
            </button>

            {/* Saved Locations Button */}
            <button
              onClick={() => setShowSavedLocations(!showSavedLocations)}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 group"
              title="Saved locations"
            >
              <BookmarkIcon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
            </button>

            {/* Settings Button */}
            <button
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 group"
              title="Settings"
            >
              <Cog6ToothIcon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Location Indicator */}
      {currentLocation && (
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>
              Showing weather for coordinates: {currentLocation.lat?.toFixed(4)}, {currentLocation.lon?.toFixed(4)}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
