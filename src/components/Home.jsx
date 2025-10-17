import React, { useEffect, useState } from 'react';
import './Home.css';
import backgroundImage from '../assets/image.png';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset || document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate zoom based on scroll position
  const zoomScale = Math.min(1 + (scrollY * 0.001), 2.5); // Simple linear zoom
  
  // Calculate text opacity - appears when zoom is at maximum (2.5x)
  const textOpacity = zoomScale >= 2.5 ? 1 : 0;
  
  // Temporary: Always show text for testing
  const testTextOpacity = 1;

  return (
    <div className="home-container">
      <div 
        className="background-image"
        style={{
          transform: `scale(${zoomScale})`,
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      <div className="content">
        <div 
          className="shree-text"
          style={{
            opacity: testTextOpacity,
          }}
        >
          SHREE
        </div>
        
        {/* Login/Signup Button - appears when fully zoomed */}
        <div 
          className="auth-buttons"
          style={{
            opacity: zoomScale >= 2.4 ? 1 : 0, // Only visible at max zoom
          }}
        >
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
      
      {/* Debug info */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 1000,
        fontFamily: 'monospace'
      }}>
        Scroll: {Math.round(scrollY)}px<br/>
        Zoom: {zoomScale.toFixed(2)}x<br/>
        Max Zoom: {zoomScale >= 2.4 ? 'YES' : 'NO'}<br/>
        Buttons Visible: {zoomScale >= 2.4 ? 'YES' : 'NO'}<br/>
        Opacity: {textOpacity.toFixed(2)}
      </div>
      
      {/* Spacer to enable scrolling */}
      <div className="scroll-spacer" />
    </div>
  );
};

export default Home;
