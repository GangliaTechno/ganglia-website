"use client";
import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import CardParticleEffect from "./CardParticleEffect";
import TechMilestonesTimeline from "./TechMilestonesTimeline";
import '../styles/OurStory.css';

// Static imports for images with fallbacks
let aboutusImage;
let targetGif;
let ideaGif;
try {
  aboutusImage = require('../assets/aboutus.svg');
} catch (error) {
  aboutusImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001a4d;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000814;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23bg)'/%3E%3Cg transform='translate(200,150)'%3E%3Crect width='800' height='300' fill='%23374151' rx='20'/%3E%3Ccircle cx='150' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='300' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='450' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='600' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='650' cy='150' r='40' fill='%234B5563'/%3E%3Ctext x='400' y='250' text-anchor='middle' fill='%239CA3AF' font-size='24'%3ETeam Silhouette%3C/text%3E%3C/g%3E%3C/svg%3E";
}
try {
  targetGif = require('../assets/rocket.gif');
} catch (error) {
  targetGif = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='6'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E";
}
try {
  ideaGif = require('../assets/idea.gif');
} catch (error) {
  ideaGif = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9.5 16h5v-1h-5v1zm1-3h3v-1h-3v1zm0-2h3V9h-3v2z'/%3E%3C/svg%3E";
}

// Memoized star component to prevent unnecessary re-renders
const Star = React.memo(({ style }) => (
  <div className="aboutus-star" style={style} />
));

// Memoized section component
const AnimatedSection = React.memo(({ 
  id, 
  className, 
  children, 
  isVisible,
  scrollDirection 
}) => {
  const sectionClass = useMemo(() => {
    const baseClass = `slide-element ${className}`;
    const directionClass = scrollDirection === 'down' ? 'slide-down' : 'slide-up';
    const visibilityClass = isVisible ? 'visible' : '';
    return `${baseClass} ${directionClass} ${visibilityClass}`.trim();
  }, [className, isVisible, scrollDirection]);

  return (
    <div id={id} className={sectionClass}>
      {children}
    </div>
  );
});

function OurStory() {
  // Consolidated state
  const [state, setState] = useState({
    stars: [],
    visibleElements: new Set(['header']),
    imagesLoaded: false,
    scrollDirection: 'down'
  });

  const observerRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef(null);

  // Memoize stars generation
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
      }
    }));
  }, []);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
        setState(prev => ({
          ...prev,
          scrollDirection: newDirection
        }));
        lastScrollY.current = currentScrollY;
      }
    }, 16); // ~60fps throttling
  }, []);

  // Optimized intersection observer
  const setupIntersectionObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const updates = {};
        let hasChanges = false;

        entries.forEach((entry) => {
          const elementId = entry.target.id;
          const isIntersecting = entry.isIntersecting && entry.intersectionRatio > 0.1;
          
          if (isIntersecting) {
            updates[elementId] = true;
            hasChanges = true;
          } else {
            // Allow re-animation for specific cards only
            const animatableCards = ['why-exist', 'how-we-do', 'what-we-create', 'impact'];
            if (animatableCards.includes(elementId)) {
              updates[elementId] = false;
              hasChanges = true;
            }
          }
        });

        if (hasChanges) {
          setState(prev => {
            const newVisible = new Set(prev.visibleElements);
            Object.entries(updates).forEach(([id, visible]) => {
              if (visible) {
                newVisible.add(id);
              } else {
                newVisible.delete(id);
              }
            });
            return {
              ...prev,
              visibleElements: newVisible
            };
          });
        }
      },
      {
        threshold: [0.1, 0.15],
        rootMargin: '50px 0px -50px 0px'
      }
    );

    // Observe elements
    const slideElements = document.querySelectorAll('.slide-element');
    slideElements.forEach((el) => {
      if (el.id && observerRef.current) {
        observerRef.current.observe(el);
      }
    });
  }, []);

  // Initialize component
  useEffect(() => {
    setState(prev => ({
      ...prev,
      stars,
      imagesLoaded: true
    }));
  }, [stars]);

  // Setup scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Setup intersection observer
  useEffect(() => {
    if (state.imagesLoaded) {
      const timeoutId = setTimeout(setupIntersectionObserver, 100);
      return () => {
        clearTimeout(timeoutId);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [state.imagesLoaded, setupIntersectionObserver]);

  // Memoized visibility checker
  const isElementVisible = useCallback((elementId) => {
    return state.visibleElements.has(elementId);
  }, [state.visibleElements]);

  // Memoized image src getter
  const getImageSrc = useCallback((imageModule, fallback) => {
    if (typeof imageModule === 'string') {
      return imageModule;
    } else if (imageModule && imageModule.default) {
      return imageModule.default;
    }
    return fallback;
  }, []);

  // Loading state
  if (!state.imagesLoaded) {
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
        {state.stars.map((star) => (
          <Star key={star.id} style={star.style} />
        ))}
      </div>

      <div className="aboutus-content-wrapper">
        {/* Header */}
        <AnimatedSection
          id="header"
          className="slide-up aboutus-header"
          isVisible={isElementVisible('header')}
          scrollDirection={state.scrollDirection}
        >
          <h1 className="aboutus-main-title">About</h1>
          <h2 className="aboutus-company-title">
            <span className="ganglia-highlight">Ganglia</span> Technologies
          </h2>
        </AnimatedSection>

        {/* Cards Container */}
        <div className="stacking-container">
          {/* Why We Exist Section */}
          <AnimatedSection
            id="why-exist"
            className="stacking-card"
            isVisible={isElementVisible('why-exist')}
            scrollDirection={state.scrollDirection}
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
                few, but rights for all. We exist to break barriers to redefine
                what's possible for those who refuse to settle for less. Every
                morning, we wake up driven by a single question: How can we make
                life better, easier, safer?
              </p>
            </div>
          </AnimatedSection>

          {/* How we do it Section */}
          <AnimatedSection
            id="how-we-do"
            className="stacking-card"
            isVisible={isElementVisible('how-we-do')}
            scrollDirection={state.scrollDirection}
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
                about cold code or plastic and wires it's about people.
              </p>
              <ul className="feature-list">
                <li className="feature-list-item">
                  <span className="feature-bullet">•</span>
                  <span>
                    We engineer bold ideas into practical tools, medical devices
                    that heal without trauma, ICU solutions that reach the
                    remotest highways, and software that thinks, learns, and
                    empowers.
                  </span>
                </li>
                <li className="feature-list-item">
                  <span className="feature-bullet">•</span>
                  <span>
                    We make innovation affordable cutting-edge, AI-powered,
                    beautifully simple, and always within reach.
                  </span>
                </li>
                <li className="feature-list-item">
                  <span className="feature-bullet">•</span>
                  <span>
                    We obsess over every detail from a laryngoscope's ergonomic
                    grip to seamless software UI, from clinical accuracy to
                    planetary impact.
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* What We Create Section */}
          <AnimatedSection
            id="what-we-create"
            className="stacking-card"
            isVisible={isElementVisible('what-we-create')}
            scrollDirection={state.scrollDirection}
          >
            <div className="card-overlay">
              <CardParticleEffect />
            </div>
            <div className="card-content">
              <h3 className="section-title">
                <span className="yellow-highlight">What</span> We Create
              </h3>
              <p className="section-text-with-margin">
                We build solutions that don't just work, they inspire.
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
                    within minutes because every second matters.
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
          </AnimatedSection>

          {/* The Impact Section */}
          <AnimatedSection
            id="impact"
            className="stacking-card"
            isVisible={isElementVisible('impact')}
            scrollDirection={state.scrollDirection}
          >
            <div className="card-overlay">
              <CardParticleEffect />
            </div>
            <div className="card-content">
              <h3 className="section-title">The Impact</h3>
              <p className="section-text">
                We are more than inventors. We are partners in
                progress collaborating with healthcare leaders, serving
                institutions and patients, and reaching underserved communities
                with solutions that change lives.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Hero Section - Full Width */}
        <AnimatedSection
          id="hero-image"
          className="slide-up hero-image-section"
          isVisible={isElementVisible('hero-image')}
          scrollDirection={state.scrollDirection}
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
        </AnimatedSection>

        {/* Ganglia Story Section - Full Width - NO ANIMATION */}
       
        {/* Philosophy Section - NO ANIMATIONS */}
        <div id="philosophy-header" className="philosophy-section">
          <h3 className="philosophy-title">Philosophy</h3>

          <div className="mission-cards-container">
            <div id="mission-card-1" className="mission-card">
  <div className="mission-card-content">
    <p className="mission-quote">
      "To be the most preferred cost-effective medical device developer and automation solution provider by 2032."
    </p>
    <p className="mission-description">
      Ganglia Technologies was founded on a belief that transcends creating medical devices and automation solutions. The company exists to redefine what's possible for people and institutions who refuse to settle for less. This deep sense of purpose drives Ganglia to challenge the status quo in healthcare and technology, striving to make advanced solutions accessible not as a privilege, but as a fundamental right.
    </p>
  </div>
  <div className="mission-card-right">
    <img
      src={getImageSrc(ideaGif, ideaGif)}
      alt="Mission Icon"
      className="mission-icon-1"
      onError={(e) => {
        console.warn("Idea GIF failed to load, using fallback");
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='6'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E";
      }}
    />
    <h4 className="mission-title">Our Vision</h4>
  </div>
</div>


           <div id="mission-card-2" className="mission-card">
  <div className="mission-card-content-right">
    <p className="mission-quote">
      "We leverage engineering, AI, and medical expertise to develop affordable, high-quality solutions that improve lives and streamline operations for businesses and institutions."
    </p>
    <p className="mission-description-center">
      <strong>Empowering Human Potential:</strong> Ganglia's core belief is in making the world better, easier, and safer for everyone. The mission is not solely to innovate, but to ensure those innovations reach communities and institutions often overlooked by the traditional tech industry.<br/><br/>
      <strong>Bridging Gaps, Not Just Engineering Products:</strong> Ganglia aims to eliminate the barriers that keep life-saving technology out of reach in underserved regions, ensuring that world-class healthcare and automation opportunities are available to all.
    </p>
  </div>
  <img
      src={getImageSrc(targetGif, targetGif)}
      alt="Mission Icon"
      className="mission-icon"
      onError={(e) => {
        console.warn("Target GIF failed to load, using fallback");
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='6'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E";
      }}
    />
  <div className="mission-title-container">
    {/* Icon first (top) */}
    
    {/* Heading second (bottom) */}
    <h4 className="mission-title-left">Our Mission</h4>
  </div>



            </div>
          </div>

          {/* Our Values */}
          <div className="values-section">
            <AnimatedSection
              id="values-header"
              className="slide-up values-title"
              isVisible={isElementVisible('values-header')}
              scrollDirection={state.scrollDirection}
            >
              Our Values
            </AnimatedSection>
            <div className="values-grid">
              <AnimatedSection
                id="value-card-1"
                className="slide-left value-card"
                isVisible={isElementVisible('value-card-1')}
                scrollDirection={state.scrollDirection}
              >
                <h5 className="value-card-title">Human Centricity</h5>
                <p className="value-card-description">
                  Every innovation is designed around real human needs whether that's a trauma-free laryngoscope for clinicians or a user-friendly medical logbook for young doctors and nurses.
                </p>
              </AnimatedSection>
              <AnimatedSection
                id="value-card-2"
                className="slide-up value-card"
                isVisible={isElementVisible('value-card-2')}
                scrollDirection={state.scrollDirection}
              >
                <h5 className="value-card-title">Affordability with Excellence</h5>
                <p className="value-card-description">
                  By making high-quality, AI-powered solutions affordable, Ganglia enables institutions with limited resources to benefit from the latest advances, challenging industry norms around exclusivity and high costs.
                </p>
              </AnimatedSection>
              <AnimatedSection
                id="value-card-3"
                className="slide-right value-card"
                isVisible={isElementVisible('value-card-3')}
                scrollDirection={state.scrollDirection}
              >
                <h5 className="value-card-title">Innovation with Impact</h5>
                <p className="value-card-description">
                  Each solution from emergency mobile ICUs to AI-powered travel planning addresses genuine challenges impacting health, education, and operational efficiency.
                </p>
              </AnimatedSection>
            </div>
          </div>

          {/* Broader Impact Section - WITH particle effects - NO ANIMATION */}
        
            <h3 id="broader-impact-title" className="broader-impact-title">
              Broader Impact
            </h3>
            
              
              
                <p className="broader-impact-text">
                  Ganglia Technologies actively collaborates with healthcare leaders, businesses, and government institutions to:
                </p>
                <ul className="broader-impact-list">
                  <li className="broader-impact-item">
                    
                    <span>Support underserved communities with technology that has the power to save lives and uplift local infrastructure.</span>
                  </li>
                  <li className="broader-impact-item">
                    
                    <span>Foster learning environments helping hospitals, interns, and junior doctors grow through better accountability and knowledge-sharing.</span>
                  </li>
                  <li className="broader-impact-item">
                    
                    <span>Drive social change by making transformative technology the new standard not just a luxury for a select few.</span>
                  </li>
                </ul>
                <p className="broader-impact-conclusion">
                  Ganglia Technologies exists not just to build things, but to drive progress, inspire action, and create a future where technology is quietly, powerfully, and meaningfully woven into the everyday lives of people everywhere.
                </p>
              </div>
            
          
        

        {/* Tech Milestones Section */}
        <div id="TechMilestonesTimeline">
        <TechMilestonesTimeline />
        </div>
      </div>


      {/* Social Responsibility Section */}
<div id="social-responsibility-section" className="social-responsibility-section">
  <h3 className="social-responsibility-title">
    Social Responsibility: Technology for Good
  </h3>
  <p className="social-responsibility-text">
    At Ganglia Technologies, our commitment to social responsibility runs deep—it shapes not only what we create but how we create it. We focus on sustainable, inclusive impact by:
  </p>
  <ul className="social-responsibility-list">
    <li>
      <span className="feature-bullet">•</span>
      Ensuring affordability with accessible pricing models designed to bring advanced healthcare technology within reach of underserved communities.
    </li>
    <li>
      <span className="feature-bullet">•</span>
      Empowering the next generation through comprehensive training and education programs that equip interns, healthcare workers, and local professionals with essential skills and knowledge.
    </li>
    <li>
      <span className="feature-bullet">•</span>
      Championing environmental stewardship by integrating eco-friendly design principles and sustainable manufacturing processes into every product we build.
    </li>
    <li>
      <span className="feature-bullet">•</span>
      Engaging deeply with communities through outreach initiatives that foster lasting social change and strengthen local healthcare ecosystems.
    </li>
  </ul>
  <p className="social-responsibility-conclusion">
    Our promise goes far beyond products, it is woven into the fabric of every community we serve, driving progress that is ethical, lasting, and meaningful.
  </p>
</div>

    </div>
  );
}

export default OurStory;
