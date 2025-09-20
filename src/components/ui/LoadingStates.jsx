import React from 'react';
import { motion } from 'framer-motion';

// Loading skeleton for weather cards
export const WeatherCardSkeleton = () => (
  <div className="weather-card backdrop-blur-xl rounded-3xl p-8 mb-8 animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 bg-white/20 rounded"></div>
        <div className="h-6 bg-white/20 rounded w-48"></div>
      </div>
      <div className="h-4 bg-white/20 rounded w-32"></div>
    </div>
    
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-6">
        <div className="w-32 h-32 bg-white/20 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-12 bg-white/20 rounded w-24"></div>
          <div className="h-5 bg-white/20 rounded w-36"></div>
          <div className="h-4 bg-white/20 rounded w-32"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3 space-y-2">
          <div className="h-3 bg-white/20 rounded w-16"></div>
          <div className="h-5 bg-white/20 rounded w-20"></div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 space-y-2">
          <div className="h-3 bg-white/20 rounded w-16"></div>
          <div className="h-5 bg-white/20 rounded w-20"></div>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white/10 rounded-xl p-4 space-y-2">
          <div className="h-3 bg-white/20 rounded w-12"></div>
          <div className="h-5 bg-white/20 rounded w-16"></div>
        </div>
      ))}
    </div>
  </div>
);

// Loading spinner component
export const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-2',
    large: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };
  
  const sizeClass = sizes[size] || sizes.medium;
  
  return (
    <div className={`${sizeClass} border-white/30 border-t-white rounded-full animate-spin ${className}`}></div>
  );
};

// Fullscreen loading component
export const FullscreenLoader = ({ message = 'Loading...', subMessage }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex items-center justify-center p-6"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mx-auto mb-6"
      >
        <LoadingSpinner size="xl" />
      </motion.div>
      <motion.h2 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-white mb-2"
      >
        {message}
      </motion.h2>
      {subMessage && (
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/70 text-lg"
        >
          {subMessage}
        </motion.p>
      )}
    </div>
  </motion.div>
);

export default {
  WeatherCardSkeleton,
  LoadingSpinner,
  FullscreenLoader,
};
