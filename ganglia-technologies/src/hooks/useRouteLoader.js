import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const location = useLocation();

  // Create a memoized callback to avoid dependency issues
  const loadRoute = useCallback(async () => {
    // Minimum loading time for UX
    const minLoadTime = 800;
    const startTime = Date.now();

    // Wait for DOM to update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check for new images to load
    const images = document.querySelectorAll('img:not([data-loaded])');
    const imagePromises = Array.from(images).map(img => {
      return new Promise(resolve => {
        if (img.complete) {
          img.setAttribute('data-loaded', 'true');
          resolve();
        } else {
          img.onload = () => {
            img.setAttribute('data-loaded', 'true');
            resolve();
          };
          img.onerror = () => {
            img.setAttribute('data-loaded', 'true');
            resolve();
          };
        }
      });
    });

    // Wait for images to load
    await Promise.all(imagePromises);

    // Ensure minimum loading time
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);
    
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Don't show loader on initial app load (handled by main preloader)
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    // Show loader when route changes
    setIsLoading(true);
    loadRoute();
  }, [location.pathname, initialLoad, loadRoute]); // Include all dependencies

  return { isLoading, setIsLoading };
};
