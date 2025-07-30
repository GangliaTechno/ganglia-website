import React from 'react';
import '../styles/RoutePreloader.css';

const RoutePreloader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="route-preloader-overlay">
      <div className="route-preloader-content">
        <img 
          src="/preloader.gif" 
          alt="Loading..." 
          className="route-preloader-gif"
        />
        <div className="route-loading-text">Loading page...</div>
      </div>
    </div>
  );
};

export default RoutePreloader;
