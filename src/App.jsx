import React, { useState } from 'react';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import CloudTransition from './CloudTransition';

const App = () => {
  const [showHomePage, setShowHomePage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = () => {
    // Prevent new transitions if one is already in progress
    if (isTransitioning) return;

    // 1. Start the transition (clouds slide IN)
    setIsTransitioning(true);

    // 2. Wait for the clouds to fully cover the screen
    setTimeout(() => {
      // 3. Swap the page component behind the clouds
      setShowHomePage(true);

      // 4. End the transition (clouds slide OUT, revealing the new page)
      setIsTransitioning(false);
    }, 1200); // This duration must be slightly longer than the CSS transition time
  };

  return (
    <>
      <CloudTransition isActive={isTransitioning} />

      {/* Conditionally render the correct page */}
      {!showHomePage ? (
        <LandingPage onNavigate={handleNavigate} />
      ) : (
        <HomePage />
      )}
    </>
  );
};

export default App;