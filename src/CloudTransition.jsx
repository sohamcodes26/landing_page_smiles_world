import React from 'react';
import './CloudTransition.css';

const CloudTransition = ({ isActive }) => {
  return (
    <div className={`transition-container ${isActive ? 'active' : ''}`}>
      <div className="transition-cloud left"></div>
      <div className="transition-cloud right"></div>
    </div>
  );
};

export default CloudTransition;