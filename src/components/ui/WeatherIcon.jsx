import React from 'react';

const WeatherIcon = ({ icon, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const iconSize = sizeClasses[size] || sizeClasses.medium;

  const icons = {
    sunny: (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <circle cx="12" cy="12" r="5" className="fill-yellow-400 animate-pulse-slow" />
        <g className="animate-spin-slow">
          <path d="m12 1 0 2" className="stroke-yellow-400 stroke-2 stroke-linecap-round" />
          <path d="m12 21 0 2" className="stroke-yellow-400 stroke-2 stroke-linecap-round" />
          <path d="m4.22 4.22 1.42 1.42" className="stroke-yellow-400 stroke-2 stroke-linecap-round" />
          <path d="m18.36 18.36 1.42 1.42" className="stroke-yellow-400 stroke-2 stroke-linecap-round" />
          <path d="m1 12 2 0" className="stroke-yellow-400 stroke-2 stroke-linecap-round" />
          <path d="m21 12 2 0" className="stroke-yellow-400 stroke-2 stroke-linecap-round" />
          <path d="m4.22 19.78 1.42-1.42" className="stroke-yellow-400 stroke-2 stroke-linecap-round" />
          <path d="m18.36 5.64 1.42-1.42" className="stroke-yellow-400 stroke-2 stroke-linecap-round" />
        </g>
      </svg>
    ),

    'clear-night': (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <path 
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          className="fill-blue-300 animate-pulse-slow"
        />
      </svg>
    ),

    'partly-cloudy': (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <circle cx="10" cy="8" r="3" className="fill-yellow-400" />
        <path 
          d="M16 14h1a3 3 0 0 0 0-6h-1m0 6v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1m11 0H5"
          className="stroke-gray-400 fill-gray-400 stroke-2 animate-float"
        />
      </svg>
    ),

    'partly-cloudy-night': (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <path 
          d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
          className="fill-blue-300"
        />
        <path 
          d="M16 14h1a3 3 0 0 0 0-6h-1m0 6v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1m11 0H5"
          className="stroke-gray-300 fill-gray-300 stroke-2 animate-float"
        />
      </svg>
    ),

    cloudy: (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <path 
          d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
          className="fill-gray-400 animate-float"
        />
        <path 
          d="M13 16h3a2 2 0 0 0 0-4h-3m0 4v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1m6 0H7"
          className="fill-gray-300"
          style={{ animationDelay: '0.5s' }}
        />
      </svg>
    ),

    overcast: (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <path 
          d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
          className="stroke-gray-500 stroke-2 fill-gray-500 animate-float"
        />
        <path 
          d="M16 17v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2m12 0H4"
          className="fill-gray-400"
        />
      </svg>
    ),

    rain: (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <path 
          d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
          className="stroke-gray-600 stroke-2 fill-gray-600"
        />
        <g className="animate-bounce">
          <path d="m16 20-3-6" className="stroke-blue-400 stroke-2" />
          <path d="m11 20-3-6" className="stroke-blue-400 stroke-2" />
          <path d="m6 20-3-6" className="stroke-blue-400 stroke-2" />
        </g>
      </svg>
    ),

    'rain-sun': (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <circle cx="8" cy="8" r="3" className="fill-yellow-400" />
        <path 
          d="M16 14h1a3 3 0 0 0 0-6h-1m0 6v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1m11 0H5"
          className="stroke-gray-500 fill-gray-500 stroke-2"
        />
        <g className="animate-bounce">
          <path d="m14 20-2-4" className="stroke-blue-400 stroke-2" />
          <path d="m10 20-2-4" className="stroke-blue-400 stroke-2" />
        </g>
      </svg>
    ),

    'rain-night': (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <path 
          d="M10 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
          className="fill-blue-300"
        />
        <path 
          d="M16 14h1a3 3 0 0 0 0-6h-1m0 6v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1m11 0H5"
          className="stroke-gray-500 fill-gray-500 stroke-2"
        />
        <g className="animate-bounce">
          <path d="m14 20-2-4" className="stroke-blue-400 stroke-2" />
          <path d="m10 20-2-4" className="stroke-blue-400 stroke-2" />
        </g>
      </svg>
    ),

    thunderstorm: (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <path 
          d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
          className="stroke-gray-700 stroke-2 fill-gray-700"
        />
        <g className="animate-pulse">
          <path 
            d="m13 12-3 8 4-6-3 0 3-8-4 6z"
            className="fill-yellow-300 stroke-yellow-300"
          />
        </g>
        <g className="animate-bounce">
          <path d="m16 20-3-6" className="stroke-blue-400 stroke-2" />
          <path d="m6 20-3-6" className="stroke-blue-400 stroke-2" />
        </g>
      </svg>
    ),

    snow: (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <path 
          d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
          className="stroke-gray-500 stroke-2 fill-gray-500"
        />
        <g className="animate-float">
          <circle cx="8" cy="18" r="1" className="fill-white" />
          <circle cx="12" cy="20" r="1" className="fill-white" />
          <circle cx="16" cy="18" r="1" className="fill-white" />
          <circle cx="10" cy="16" r="0.5" className="fill-white" />
          <circle cx="14" cy="16" r="0.5" className="fill-white" />
        </g>
      </svg>
    ),

    mist: (
      <svg viewBox="0 0 24 24" fill="none" className={`${iconSize} ${className}`}>
        <g className="animate-pulse-slow">
          <path d="M3 8h18" className="stroke-gray-400 stroke-2 stroke-linecap-round" />
          <path d="M5 12h14" className="stroke-gray-400 stroke-2 stroke-linecap-round" />
          <path d="M7 16h10" className="stroke-gray-400 stroke-2 stroke-linecap-round" />
          <path d="M4 20h16" className="stroke-gray-400 stroke-2 stroke-linecap-round" />
        </g>
      </svg>
    ),
  };

  return icons[icon] || icons.cloudy;
};

export default WeatherIcon;
