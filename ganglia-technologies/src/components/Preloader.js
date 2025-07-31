import React, { useState, useEffect } from 'react';
import '../styles/Preloader.css';

const Preloader = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedAssets = 0;
    let totalAssets = 0;
    // Removed the unused 'assetsToLoad' variable

    // Function to collect all assets
    const collectAssets = () => {
      // Collect images
      const images = document.querySelectorAll('img');
      const imageSources = Array.from(images).map(img => img.src).filter(src => src);
      
      // Collect background images from CSS
      const elementsWithBgImages = document.querySelectorAll('*');
      const bgImages = [];
      elementsWithBgImages.forEach(el => {
        const bgImage = getComputedStyle(el).backgroundImage;
        if (bgImage && bgImage !== 'none') {
          const matches = bgImage.match(/url\(['"]?([^'")]+)['"]?\)/);
          if (matches) {
            bgImages.push(matches[1]);
          }
        }
      });

      // Collect fonts (if using web fonts)
      const fonts = [];
      if (document.fonts) {
        document.fonts.forEach(font => {
          fonts.push(font);
        });
      }

      // Combine all assets
      const allImageSources = [...new Set([...imageSources, ...bgImages])];
      
      return allImageSources;
    };

    // Function to load an image
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedAssets++;
          setProgress((loadedAssets / totalAssets) * 100);
          resolve();
        };
        img.onerror = () => {
          loadedAssets++;
          setProgress((loadedAssets / totalAssets) * 100);
          resolve(); // Still resolve to continue loading
        };
        img.src = src;
      });
    };

    // Function to load all assets
    const loadAllAssets = async () => {
      const startTime = Date.now(); // Move startTime declaration here

      // Wait for DOM to be ready
      await new Promise(resolve => {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', resolve);
        } else {
          resolve();
        }
      });

      // Small delay to ensure React components are mounted
      await new Promise(resolve => setTimeout(resolve, 500));

      const assets = collectAssets();
      totalAssets = Math.max(assets.length, 1); // Ensure at least 1 to avoid division by zero

      if (assets.length === 0) {
        // No assets to load, complete immediately
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          onLoadComplete();
        }, 1000);
        return;
      }

      // Load all assets
      const loadPromises = assets.map(asset => loadImage(asset));
      
      try {
        await Promise.all(loadPromises);
      } catch (error) {
        console.warn('Some assets failed to load:', error);
      }

      // Ensure minimum loading time for UX
      const minLoadTime = 2000; // 2 seconds minimum
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          onLoadComplete();
        }, 500);
      }, remainingTime);
    };

    loadAllAssets();

    // Fallback timeout
    const fallbackTimeout = setTimeout(() => {
      setIsLoading(false);
      onLoadComplete();
    }, 10000); // 10 seconds max

    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        <img 
          src="/preloader.gif" 
          alt="Loading..." 
          className="preloader-gif"
        />
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-text">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default Preloader;
