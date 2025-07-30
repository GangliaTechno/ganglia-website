import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/tripmacha.css';
import Footer from './Footer';
import guyOnScooter from '../assets/guy_on_scooter.png';
import beachPhoto from '../assets/beach-Photoroom.png';
import autoImage from '../assets/auto.png';
import logoImage from '../assets/logo.png';

const TripMacha = () => {
  const [scooterImageIndex, setScooterImageIndex] = useState(0);
  const bubbleContainerRef = useRef(null);
  const titleRef = useRef(null);
  
  const images = [
    { src: guyOnScooter, alt: 'TripMacha mascot on scooter' },
    { src: beachPhoto, alt: 'TripMacha mascot at beach' },
    { src: autoImage, alt: 'TripMacha mascot in auto rickshaw' }
  ];

  // Optimize colors array with useMemo to prevent unnecessary re-renders
  const colors = useMemo(() => ['#c9f6ff', '#ffdeeb', '#ffe9cc', '#c8f1f1', '#feffd7'], []);

  useEffect(() => {
    // Title shuffle animation
    const titleElement = titleRef.current;
    const originalText = 'Trip Macha AI';
    
    const shuffleString = (str) => {
      let arr = str.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
    };

    const animateShuffle = (text, iterations = 6, delay = 80) => {
      let count = 0;
      const intervalId = setInterval(() => {
        if (count >= iterations) {
          titleElement.textContent = text;
          clearInterval(intervalId);
          return;
        }
        titleElement.textContent = shuffleString(text);
        count++;
      }, delay);
    };

    if (titleElement) {
      animateShuffle(originalText);
    }

    // Dynamic bubble creation
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.classList.add('tripmacha-bubble');
      
      const size = Math.floor(Math.random() * 120) + 60;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      
      bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      const heroElement = document.querySelector('.tripmacha-page-hero');
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        bubble.style.left = Math.floor(Math.random() * (heroRect.width - size)) + 'px';
        bubble.style.top = Math.floor(Math.random() * (heroRect.height - size)) + 'px';
      }
      
      bubble.style.position = 'absolute';
      bubble.style.borderRadius = '50%';
      bubble.style.opacity = '0.25';
      bubble.style.filter = 'blur(4px)';
      bubble.style.pointerEvents = 'auto';
      bubble.style.transition = 'transform 0.5s, opacity 0.5s, background-color 0.3s';
      
      bubble.addEventListener('click', function handleBurst() {
        bubble.classList.add('bursting');
        bubble.style.background = '#ff4d4d';
        bubble.style.transform = 'scale(2)';
        bubble.style.opacity = '0';
        bubble.removeEventListener('click', handleBurst);
        setTimeout(() => {
          if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
          createBubbleAndAppend();
        }, 500);
      });
      
      return bubble;
    };

    const createBubbleAndAppend = () => {
      if (bubbleContainerRef.current) {
        bubbleContainerRef.current.appendChild(createBubble());
      }
    };

    // Generate bubbles
    if (bubbleContainerRef.current) {
      bubbleContainerRef.current.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        createBubbleAndAppend();
      }
    }

    // Mouse parallax effect
    const handleMouseMove = (e) => {
      document.querySelectorAll('.tripmacha-bubble').forEach((bubble, i) => {
        if (bubble.classList.contains('bursting')) return;
        const speed = 0.04 + i * 0.015;
        bubble.style.transform = `translate(${e.clientX * speed}px, ${e.clientY * speed}px) scale(1)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [colors]);

  const handleScooterClick = () => {
    const scooterImg = document.getElementById('scooterGuy');
    if (scooterImg) {
      scooterImg.style.opacity = 0;
      setTimeout(() => {
        setScooterImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        scooterImg.onload = () => {
          scooterImg.style.opacity = 1;
        };
      }, 400);
    }
  };

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    console.log('Discover TripMacha AI clicked');
    // Add your navigation logic here, for example:
    // navigate('/discover'); // if using react-router
    // window.location.href = '/discover';
  };

  return (
    <div className="tripmacha-page">
      <div className="tripmacha-page-container">
        {/* Hero Section */}
        <section className="tripmacha-page-hero">
          <div className="tripmacha-parallax-bubbles" ref={bubbleContainerRef}>
            <div className="tripmacha-bubble tripmacha-bubble1"></div>
            <div className="tripmacha-bubble tripmacha-bubble2"></div>
            <div className="tripmacha-bubble tripmacha-bubble3"></div>
            <div className="tripmacha-bubble tripmacha-bubble4"></div>
            <div className="tripmacha-bubble tripmacha-bubble5"></div>
          </div>
          
          <div className="tripmacha-page-content">
            <div className="tripmacha-page-image">
              <img 
                id="scooterGuy" 
                src={images[scooterImageIndex].src} 
                alt={images[scooterImageIndex].alt}
                onClick={handleScooterClick}
              />
            </div>
            <div className="tripmacha-page-description">
              <img src={logoImage} alt="TripMacha Logo" className="tripmacha-page-logo" />
              <h1 className="tripmacha-title" ref={titleRef}>Trip Macha AI</h1>
              <p>
                TripMacha AI is an AI travel assistant tailored for short, time-limited trips. 
                It creates smart, hyper-personalized itineraries using user interests, 
                traffic, crowd, and real-time data.
              </p>
              <button 
                className="tripmacha-page-btn" 
                onClick={handleDiscoverClick}
                type="button"
              >
                Discover TripMacha AI
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="tripmacha-page-about">
          <div className="tripmacha-page-about-text">
            <h2><span>About</span> TripMacha</h2>
            <p>
              TripMacha AI is the first-of-its-kind AI-powered travel assistant in India, built specifically for short-distance, time-limited travel. Ideal for users with just a few hours to explore, it generates smart, hyper-personalized itineraries based on minimal input—factoring in user interest, traffic, live crowd data, and real-time availability.
            </p>
            <p>
              Unlike conventional travel apps that overload users with choices, TripMacha AI delivers instant, optimized plans with built-in navigation and reservation options. With no comparable solution in the Indian market, it redefines spontaneous travel through intelligent automation and seamless execution.
            </p>
          </div>

          <div className="tripmacha-page-features-card">
            <h3>Features</h3>
            <ul>
              <li><i className="tripmacha-page-icon" role="img" aria-label="location">📍</i> Short Distance Travel Partner</li>
              <li><i className="tripmacha-page-icon" role="img" aria-label="checkmark">✅</i> Hyper-personalised Itineraries</li>
              <li><i className="tripmacha-page-icon" role="img" aria-label="clock">⏱️</i> Real time Optimisation</li>
              <li><i className="tripmacha-page-icon" role="img" aria-label="chart">📊</i> Minimum Input, Max Output</li>
              <li><i className="tripmacha-page-icon" role="img" aria-label="handshake">🤝</i> Hassle Free Planner</li>
              <li><i className="tripmacha-page-icon" role="img" aria-label="globe">🌐</i> Web & App support</li>
            </ul>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="tripmacha-page-how-it-works">
          <p className="tripmacha-page-subheading">HOW IT WORKS</p>
          <h2>Plan your perfect trip in minutes!</h2>

          <div className="tripmacha-page-steps">
            <div className="tripmacha-page-step">
              <div className="tripmacha-step-placeholder">
                <span className="tripmacha-step-number">1</span>
              </div>
              <p>Decide the Location<br />for the trip</p>
            </div>
            <div className="tripmacha-page-step">
              <div className="tripmacha-step-placeholder">
                <span className="tripmacha-step-number">2</span>
              </div>
              <p>Enter the details in<br />TripMacha Chatbot</p>
            </div>
            <div className="tripmacha-page-step">
              <div className="tripmacha-step-placeholder">
                <span className="tripmacha-step-number">3</span>
              </div>
              <p>Get Your complete<br />Itinerary</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="tripmacha-page-pricing">
          <h2>PRICING</h2>
          <div className="tripmacha-page-pricing-cards">
            <div className="tripmacha-page-card">Free Version</div>
            <div className="tripmacha-page-card tripmacha-highlight">Plus</div>
            <div className="tripmacha-page-card">Pro</div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="tripmacha-page-final-cta">
          <div className="tripmacha-page-cta-content">
            <div className="tripmacha-cta-placeholder">
              <span className="tripmacha-cta-emoji">🚗</span>
            </div>
            <h2><span className="tripmacha-faint">Plan your trip</span> <strong>NOW!</strong></h2>
          </div>
        </section>
      </div>
      
      {/* External Footer Component - Same as all other pages */}
      <Footer />
    </div>
  );
};

export default TripMacha;
