import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router
// import { Link } from 'react-router-dom'; // Alternative approach
import '../styles/App.css';

const HeroSection = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  
  const [glitchState, setGlitchState] = useState({
    visibleLetters: [true, true, true, true, true, true, true, true, true, true, true], // "Unsatisfied"
    letterGlitches: Array(11).fill(false) // Track which letters have missing parts
  });
  const [isGlitching, setIsGlitching] = useState(false);

  const originalWord = "Unsatisfied";
  const glitchVariations = {
    'U': ['U', 'Ʊ', 'Ǔ', '∪', 'ᴜ'],
    'n': ['n', 'ո', 'ᴎ', 'ɴ', ''],
    's': ['s', 'ꜱ', 'ѕ', '§', ''],
    'a': ['a', 'ɐ', 'ɑ', 'ᴀ', '', 'ɒ'],
    't': ['t', 'ţ', 'ť', '†', '', 'ţ'],
    'i': ['i', 'ɨ', 'ı', 'ɪ', '', '¡'],
    'f': ['f', 'ƒ', 'ḟ', 'ſ', ''],
    'e': ['e', 'ɘ', 'ə', 'ᴇ', '', 'є'],
    'd': ['d', 'ɖ', 'đ', 'ԁ', '', 'ᴅ']
  };

  useEffect(() => {
    let glitchInterval;
    
    // Main loop: 7 seconds total (3s glitch + 4s normal)
    const mainLoop = setInterval(() => {
      // Start glitching
      setIsGlitching(true);
      
      // Reset to normal state first
      setGlitchState({
        visibleLetters: Array(11).fill(true),
        letterGlitches: Array(11).fill(false)
      });
      
      // Start glitch effects
      glitchInterval = setInterval(() => {
        setGlitchState(prevState => {
          const newVisibleLetters = [...prevState.visibleLetters];
          const newLetterGlitches = [...prevState.letterGlitches];
          
          // Randomly make letters disappear/appear
          newVisibleLetters.forEach((_, index) => {
            if (Math.random() < 0.15) { // 15% chance to toggle visibility
              newVisibleLetters[index] = Math.random() < 0.7; // 70% chance to be visible when toggling
            }
          });
          
          // Randomly apply character glitches
          newLetterGlitches.forEach((_, index) => {
            newLetterGlitches[index] = Math.random() < 0.1; // 10% chance for character mutation
          });

          return {
            visibleLetters: newVisibleLetters,
            letterGlitches: newLetterGlitches
          };
        });
      }, 100);
      
      // Stop glitching after 3 seconds and reset to normal
      setTimeout(() => {
        setIsGlitching(false);
        clearInterval(glitchInterval);
        setGlitchState({
          visibleLetters: Array(11).fill(true),
          letterGlitches: Array(11).fill(false)
        });
      }, 4000);

    }, 8000); // Repeat every 8 seconds (4s glitch + 4s normal)

    return () => {
      clearInterval(mainLoop);
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, []);

  const renderGlitchedWord = () => {
    return originalWord.split('').map((letter, index) => {
      let displayLetter = letter;
      
      // Apply character mutations
      if (glitchState.letterGlitches[index] && glitchVariations[letter.toLowerCase()]) {
        const variations = glitchVariations[letter.toLowerCase()];
        displayLetter = variations[Math.floor(Math.random() * variations.length)];
      }
      
      return (
        <span
          key={index}
          className={`glitch-letter ${!glitchState.visibleLetters[index] ? 'invisible' : ''}`}
          style={{
            opacity: glitchState.visibleLetters[index] ? 1 : 0,
            transition: 'opacity 50ms ease'
          }}
        >
          {displayLetter}
        </span>
      );
    });
  };

  // Navigation handler for the Learn More button
  const handleLearnMoreClick = () => {
    // Option 1: Using React Router navigate
    navigate('/our-story');
    
    // Option 2: Smooth scroll to Our Story section if on same page
    // const ourStoryElement = document.getElementById('our-story');
    // if (ourStoryElement) {
    //   ourStoryElement.scrollIntoView({ behavior: 'smooth' });
    // }
    
    // Option 3: Simple page navigation
    // window.location.href = '/our-story';
  };

  return (
    <div className="hero-content">
      <div className="hero-text">
        <h1 className="hero-title">
          <span className={`unsatisfied-glitch ${isGlitching ? 'is-glitching' : ''}`}>
            {renderGlitchedWord()}
          </span>
          {/* Add explicit spacing and styling for "with" */}
          <span className="with-text"> with</span>
          <br />
          <span className="existing">Existing Technology</span>
        </h1>
        <p className="hero-subtitle">
          Revolutionising AI healthcare with accessible, efficient,
          and future-ready solutions.
        </p>
        
        {/* Updated Learn More button with navigation */}
        <button 
          className="learn-more-btn" 
          onClick={handleLearnMoreClick}
          aria-label="Learn more about our story"
        >
          Learn More
        </button>
        
        {/* Alternative: Using Link component instead of button */}
        {/* 
        <Link to="/our-story" className="learn-more-btn" role="button">
          Learn More
        </Link>
        */}
      </div>
    </div>
  );
};

export default HeroSection;