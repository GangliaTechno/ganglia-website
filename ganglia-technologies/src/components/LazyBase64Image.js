import React, { useRef, useState, useEffect } from 'react';

const LazyBase64Image = ({ dataUri, alt, className, style }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { 
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.1 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div ref={imgRef} className={className} style={style}>
      {!isVisible ? (
        // Placeholder while not visible
        <div 
          className="ourteam-image-placeholder"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#666'
          }}
        >
          {alt ? alt.charAt(0).toUpperCase() : '?'}
        </div>
      ) : hasError ? (
        // Error state
        <div 
          className="ourteam-image-error"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#999'
          }}
        >
          Image Error
        </div>
      ) : (
        // Actual image when visible
        <img
          src={dataUri}
          alt={alt}
          onError={handleError}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  );
};

export default React.memo(LazyBase64Image);
