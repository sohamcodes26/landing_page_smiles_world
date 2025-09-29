import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  return (
    <div className={`image-container ${className}`}>
      {!loaded && !error && (
        <div 
          className="image-placeholder"
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #ccc',
            borderRadius: '8px'
          }}
        >
          Loading...
        </div>
      )}
      
      {error ? (
        <div 
          className="image-error"
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#ffebee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #f44336',
            borderRadius: '8px',
            color: '#f44336'
          }}
        >
          Image failed to load
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: loaded ? 'block' : 'none',
            width: '100%',
            height: 'auto'
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;