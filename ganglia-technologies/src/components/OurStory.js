"use client";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import CardParticleEffect from "./CardParticleEffect";
import TechMilestonesTimeline from "./TechMilestonesTimeline";
import '../styles/OurStory.css';

// Static imports for images with fallbacks
let aboutusImage;

try {
  aboutusImage = require('../assets/aboutus.svg');
} catch (error) {
  aboutusImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001a4d;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000814;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23bg)'/%3E%3Cg transform='translate(200,150)'%3E%3Crect width='800' height='300' fill='%23374151' rx='20'/%3E%3Ccircle cx='150' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='300' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='450' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='600' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='650' cy='150' r='40' fill='%234B5563'/%3E%3Ctext x='400' y='250' text-anchor='middle' fill='%239CA3AF' font-size='24'%3ETeam Silhouette%3C/text%3E%3C/g%3E%3C/svg%3E";
}

function OurStory() {
  const [stars, setStars] = useState([]);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const observerRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Generate fewer stars with random positions and animation delays
    const starArray = [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 4,
    }));
    setStars(starArray);
    
    // Set images as loaded after a short delay
    setTimeout(() => setImagesLoaded(true), 100);
  }, []);

  useEffect(() => {
    // Track scroll direction with throttling
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (Math.abs(currentScrollY - lastScrollY.current) > 5) { // Only update if significant change
            if (currentScrollY > lastScrollY.current) {
              setScrollDirection('down');
            } else {
              setScrollDirection('up');
            }
            lastScrollY.current = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Pre-load only the header to reduce initial lag
    const initialVisible = new Set(['header']);
    setVisibleElements(initialVisible);
  }, [imagesLoaded]);

  useEffect(() => {
    // Clean intersection observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setVisibleElements(currentVisible => {
          const newVisible = new Set(currentVisible);
          let changed = false;

          entries.forEach((entry) => {
            const elementId = entry.target.id;
            const isIntersecting = entry.isIntersecting && entry.intersectionRatio > 0.1;
            const wasVisible = newVisible.has(elementId);
            
            if (isIntersecting && !wasVisible) {
              newVisible.add(elementId);
              changed = true;
            } else if (!isIntersecting && wasVisible) {
              // Allow re-animation for blue cards only
              const animatableCards = ['why-exist', 'how-we-do', 'what-we-create', 'impact'];
              if (animatableCards.includes(elementId)) {
                newVisible.delete(elementId);
                changed = true;
              }
            }
          });

          return changed ? newVisible : currentVisible;
        });
      },
      {
        threshold: [0.1, 0.15],
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const setupObserver = () => {
      const slideElements = document.querySelectorAll('.slide-element');
      slideElements.forEach((el) => {
        if (observerRef.current && el.id) {
          observerRef.current.observe(el);
        }
      });
    };

    setTimeout(setupObserver, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [imagesLoaded]);

  // Simple visibility check
  const isElementVisible = (elementId) => {
    return visibleElements.has(elementId);
  };

  // Function to safely require images with fallback
  const getImageSrc = (imageModule, fallback) => {
    // If the image module has a default export (ES6) or is a string (CommonJS)
    if (typeof imageModule === 'string') {
      return imageModule;
    } else if (imageModule && imageModule.default) {
      return imageModule.default;
    }
    return fallback;
  };

  if (!imagesLoaded) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="aboutus-container">
      {/* Animated stars background */}
      <div className="aboutus-stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="aboutus-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>

      <div className="aboutus-content-wrapper">
        {/* Header */}
        <div
          id="header"
          className={`slide-element slide-up aboutus-header ${isElementVisible('header') ? 'visible' : ''}`}
        >
          <h1 className="aboutus-main-title">About</h1>
          <h2 className="aboutus-company-title">
            <span className="ganglia-highlight">Ganglia</span> Technologies
          </h2>
        </div>

        {/* Cards Container */}
        <div className="stacking-container">
          {/* Why We Exist Section */}
          <div
            id="why-exist"
            className={`slide-element ${scrollDirection === 'down' ? 'slide-down' : 'slide-up'} stacking-card ${isElementVisible('why-exist') ? 'visible' : ''}`}
          >
            <div className="card-overlay">
              <CardParticleEffect />
            </div>
            <div className="card-content">
              <h3 className="section-title">
                <span className="yellow-highlight">Why</span> We Exist
              </h3>
              <p className="section-text">
                At Ganglia Technologies, we believe in a future where world-class
                healthcare and technological automation are not luxuries for the
                few, but rights for all. We exist to break barriers—to redefine
                what's possible for those who refuse to settle for less. Every
                morning, we wake up driven by a single question: How can we make
                life better, easier, safer?
              </p>
            </div>
          </div>

          {/* How we do it Section */}
          <div
            id="how-we-do"
            className={`slide-element ${scrollDirection === 'down' ? 'slide-down' : 'slide-up'} stacking-card ${isElementVisible('how-we-do') ? 'visible' : ''}`}
          >
            <div className="card-overlay">
              <CardParticleEffect />
            </div>
            <div className="card-content">
              <h3 className="section-title">
                <span className="yellow-highlight">How</span> we do it
              </h3>
              <p className="section-text-with-margin">
                We challenge the status quo by blending deep engineering, medical
                expertise, and actual human empathy. For us, technology is not
                about cold code or plastic and wires—it's about people.
              </p>
              <ul className="feature-list">
                <li className="feature-list-item">
                  <span className="feature-bullet">•</span>
                  <span>
                    We engineer bold ideas into practical tools—medical devices
                    that heal without trauma, ICU solutions that reach the
                    remotest highways, and software that thinks, learns, and
                    empowers.
                  </span>
                </li>
                <li className="feature-list-item">
                  <span className="feature-bullet">•</span>
                  <span>
                    We make innovation affordable—cutting-edge, AI-powered,
                    beautifully simple, and always within reach.
                  </span>
                </li>
                <li className="feature-list-item">
                  <span className="feature-bullet">•</span>
                  <span>
                    We obsess over every detail—from a laryngoscope's ergonomic
                    grip to seamless software UI, from clinical accuracy to
                    planetary impact.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* What We Create Section */}
          <div
            id="what-we-create"
            className={`slide-element ${scrollDirection === 'down' ? 'slide-down' : 'slide-up'} stacking-card ${isElementVisible('what-we-create') ? 'visible' : ''}`}
          >
            <div className="card-overlay">
              <CardParticleEffect />
            </div>
            <div className="card-content">
              <h3 className="section-title">
                <span className="yellow-highlight">What</span> We Create
              </h3>
              <p className="section-text-with-margin">
                We build solutions that don't just work—they inspire.
              </p>
              <ul className="feature-list">
                <li className="feature-list-item-large">
                  <span className="feature-bullet">•</span>
                  <span>
                    <strong>Smart Video-Laryngoscopes</strong> that combine
                    AI-powered imaging, real-time oxygenation, and trauma-free
                    operation, all at a fraction of the traditional cost.
                  </span>
                </li>
                <li className="feature-list-item-large">
                  <span className="feature-bullet">•</span>
                  <span>
                    <strong>Mobile ICUs</strong> designed for rapid deployment,
                    capable of turning accident sites into sanctuaries of survival
                    within minutes—because every second matters.
                  </span>
                </li>
                <li className="feature-list-item-large">
                  <span className="feature-bullet">•</span>
                  <span>
                    <strong>TriplAcha AI:</strong> India's first instant,
                    context-aware travel planner that turns spontaneous journeys
                    into joyful adventures with no stress and zero friction.
                  </span>
                </li>
                <li className="feature-list-item-large">
                  <span className="feature-bullet">•</span>
                  <span>
                    <strong>Anushtaan:</strong> Project management platform for
                    total control, transparency, and trust.
                  </span>
                </li>
                <li className="feature-list-item-large">
                  <span className="feature-bullet">•</span>
                  <span>
                    <strong>Medical Logbook:</strong> AI-powered clinical
                    reporting that makes learning, supervision, and hospital
                    efficiency effortless and measurable.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* The Impact Section */}
          <div
            id="impact"
            className={`slide-element ${scrollDirection === 'down' ? 'slide-down' : 'slide-up'} stacking-card ${isElementVisible('impact') ? 'visible' : ''}`}
          >
            <div className="card-overlay">
              <CardParticleEffect />
            </div>
            <div className="card-content">
              <h3 className="section-title">The Impact</h3>
              <p className="section-text">
                We are more than inventors. We are partners in
                progress—collaborating with healthcare leaders, serving
                institutions and patients, and reaching underserved communities
                with solutions that change lives.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section - Full Width */}
        <div
          id="hero-image"
          className={`slide-element slide-up hero-image-section ${isElementVisible('hero-image') ? 'visible' : ''}`}
        >
          <div className="hero-image-container">
            <img
              src={getImageSrc(aboutusImage, aboutusImage)}
              alt="Team silhouette"
              className="hero-image"
              onError={(e) => {
                console.warn("Image failed to load, using fallback");
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001a4d;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000814;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23bg)'/%3E%3Cg transform='translate(200,150)'%3E%3Crect width='800' height='300' fill='%23374151' rx='20'/%3E%3Ccircle cx='150' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='300' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='450' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='600' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='650' cy='150' r='40' fill='%234B5563'/%3E%3Ctext x='400' y='250' text-anchor='middle' fill='%239CA3AF' font-size='24'%3ETeam Silhouette%3C/text%3E%3C/g%3E%3C/svg%3E";
              }}
            />
            <div className="hero-overlay">
              <h2 className="hero-overlay-text">
                Decisive. Disruptive. Human at the core.
              </h2>
            </div>
          </div>
        </div>

        {/* Ganglia Story Section - Full Width - NO ANIMATION */}
        <div
          id="ganglia-story"
          className="ganglia-story-section"
        >
          <p className="story-subtitle">
            Unsatisfied with existing technology
          </p>
          <h3 className="story-title">
            The <span className="ganglia-text">Ganglia</span> Story
          </h3>
        </div>

        {/* Philosophy Section - NO ANIMATIONS */}
        <div
          id="philosophy-header"
          className="philosophy-section"
        >
          <h3 className="philosophy-title">Philosophy</h3>

          <div className="mission-cards-container">
            <div
              id="mission-card-1"
              className="mission-card"
            >
              <div className="mission-card-content">
                <p className="mission-quote">
                  "To be the most preferred cost-effective medical device developer and automation solution provider by 2032."
                </p>
                <p className="mission-description">
                  Ganglia Technologies was founded on a belief that transcends creating medical devices and automation solutions. The company exists to redefine what's possible for people and institutions who refuse to settle for less. This deep sense of purpose drives Ganglia to challenge the status quo in healthcare and technology, striving to make advanced solutions accessible not as a privilege, but as a fundamental right.
                </p>
              </div>
              <h4 className="mission-title">Our Vision</h4>
            </div>

            <div
              id="mission-card-2"
              className="mission-card"
            >
              <div className="mission-card-content-right">
                <p className="mission-quote">
                  "We leverage engineering, AI, and medical expertise to develop affordable, high-quality solutions that improve lives and streamline operations for businesses and institutions."
                </p>
                <p className="mission-description-center">
                  • <strong>Empowering Human Potential:</strong> Ganglia's core belief is in making the world better, easier, and safer for everyone. The mission is not solely to innovate, but to ensure those innovations reach communities and institutions often overlooked by the traditional tech industry.<br/><br/>
                  • <strong>Bridging Gaps, Not Just Engineering Products:</strong> Ganglia aims to eliminate the barriers that keep life-saving technology out of reach in underserved regions, ensuring that world-class healthcare and automation opportunities are available to all.
                </p>
              </div>
              <h4 className="mission-title-left">Our Mission</h4>
            </div>
          </div>

          {/* Our Values - No particle effects */}
          <div className="values-section">
            <h3
              id="values-header"
              className={`slide-element slide-up values-title ${isElementVisible('values-header') ? 'visible' : ''}`}
            >
              Our Values
            </h3>
            <div className="values-grid">
              <div
                id="value-card-1"
                className={`slide-element slide-left value-card ${isElementVisible('value-card-1') ? 'visible' : ''}`}
              >
                <h5 className="value-card-title">Human-Centricity</h5>
                <p className="value-card-description">
                  Every innovation is designed around real human needs—whether that's a trauma-free laryngoscope for clinicians or a user-friendly medical logbook for young doctors and nurses.
                </p>
              </div>
              <div
                id="value-card-2"
                className={`slide-element slide-up value-card ${isElementVisible('value-card-2') ? 'visible' : ''}`}
              >
                <h5 className="value-card-title">Affordability with Excellence</h5>
                <p className="value-card-description">
                  By making high-quality, AI-powered solutions affordable, Ganglia enables institutions with limited resources to benefit from the latest advances, challenging industry norms around exclusivity and high costs.
                </p>
              </div>
              <div
                id="value-card-3"
                className={`slide-element slide-right value-card ${isElementVisible('value-card-3') ? 'visible' : ''}`}
              >
                <h5 className="value-card-title">Innovation with Impact</h5>
                <p className="value-card-description">
                  Each solution—from emergency mobile ICUs to AI-powered travel planning—addresses genuine challenges impacting health, education, and operational efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Broader Impact Section - WITH particle effects - NO ANIMATION */}
          <div className="broader-impact-section">
            <h3
              id="broader-impact-title"
              className="broader-impact-title"
            >
              Broader Impact
            </h3>
            <div
              id="broader-impact-content"
              className="broader-impact-content"
            >
              <div className="card-overlay">
                <CardParticleEffect />
              </div>
              <div className="card-content">
                <p className="broader-impact-text">
                  Ganglia Technologies actively collaborates with healthcare leaders, businesses, and government institutions to:
                </p>
                <ul className="broader-impact-list">
                  <li className="broader-impact-item">
                    <span className="feature-bullet">•</span>
                    <span>Support underserved communities with technology that has the power to save lives and uplift local infrastructure.</span>
                  </li>
                  <li className="broader-impact-item">
                    <span className="feature-bullet">•</span>
                    <span>Foster learning environments—helping hospitals, interns, and junior doctors grow through better accountability and knowledge-sharing.</span>
                  </li>
                  <li className="broader-impact-item">
                    <span className="feature-bullet">•</span>
                    <span>Drive social change by making transformative technology the new standard—not just a luxury for a select few.</span>
                  </li>
                </ul>
                <p className="broader-impact-conclusion">
                  Ganglia Technologies exists not just to build things, but to drive progress, inspire action, and create a future where technology is quietly, powerfully, and meaningfully woven into the everyday lives of people everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Milestones Section - REPLACES the old static one */}
        <TechMilestonesTimeline />
      </div>
       
      <Footer />  
    </div>
  );
}

export default OurStory;