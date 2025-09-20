import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocationSearch } from '../../hooks/useWeather';

const SearchBar = ({ onLocationSelect, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const { searchResults, searchLoading, searchError, searchLocations, clearSearch } = useLocationSearch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        searchLocations(query);
        setIsOpen(true);
      } else {
        clearSearch();
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchLocations, clearSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    setQuery(`${location.name}${location.state ? `, ${location.state}` : ''}, ${location.country}`);
    setIsOpen(false);
    onLocationSelect(location);
    clearSearch();
  };

  const handleClearSearch = () => {
    setQuery('');
    setIsOpen(false);
    clearSearch();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
          onFocus={() => query.trim() && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors duration-200"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
          {searchLoading && (
            <div className="p-4 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <p className="text-white/70 text-sm mt-2">Searching...</p>
            </div>
          )}

          {searchError && (
            <div className="p-4 text-center">
              <p className="text-red-400 text-sm">{searchError}</p>
            </div>
          )}

          {!searchLoading && !searchError && searchResults.length === 0 && query.trim() && (
            <div className="p-4 text-center">
              <p className="text-white/70 text-sm">No cities found for "{query}"</p>
            </div>
          )}

          {!searchLoading && searchResults.length > 0 && (
            <div className="py-2">
              {searchResults.map((location, index) => (
                <button
                  key={`${location.lat}-${location.lon}-${index}`}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 group"
                >
                  <MapPinIcon className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">
                      {location.name}
                      {location.state && (
                        <span className="text-white/70">, {location.state}</span>
                      )}
                    </div>
                    <div className="text-white/60 text-sm">
                      {location.country}
                      {location.state && location.country !== location.state && (
                        <span> • {location.country}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-white/50">
                    {location.lat?.toFixed(2)}, {location.lon?.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
