import React, { useState, useEffect } from 'react';

const MobileDebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const updateDebugInfo = () => {
      setDebugInfo({
        width: window.innerWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        isMobile: window.innerWidth <= 768,
        pixelRatio: window.devicePixelRatio || 1,
        touchSupport: 'ontouchstart' in window
      });
    };

    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);

    return () => window.removeEventListener('resize', updateDebugInfo);
  }, []);

  // Only show on mobile and when localStorage debug flag is set
  if (!debugInfo.isMobile || !localStorage.getItem('debug-mobile')) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div>Width: {debugInfo.width}px</div>
      <div>Height: {debugInfo.height}px</div>
      <div>Mobile: {debugInfo.isMobile ? 'Yes' : 'No'}</div>
      <div>Touch: {debugInfo.touchSupport ? 'Yes' : 'No'}</div>
      <div>Pixel Ratio: {debugInfo.pixelRatio}</div>
    </div>
  );
};

export default MobileDebugInfo;