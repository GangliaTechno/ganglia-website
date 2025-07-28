"use client";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import '../styles/GetStartedForm.css';

function GetStartedForm() {
  const [state, setState] = useState({
    visibleElements: new Set(['header']),
    scrollDirection: 'down'
  });

  const observerRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef(null);

  // Handle scroll direction
  const handleScroll = React.useCallback(() => {
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
    }, 16);
  }, []);

  // Setup intersection observer
  const setupIntersectionObserver = React.useCallback(() => {
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
          }
        });

        if (hasChanges) {
          setState(prev => {
            const newVisible = new Set(prev.visibleElements);
            Object.entries(updates).forEach(([id, visible]) => {
              if (visible) {
                newVisible.add(id);
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

    const slideElements = document.querySelectorAll('.slide-element');
    slideElements.forEach((el) => {
      if (el.id && observerRef.current) {
        observerRef.current.observe(el);
      }
    });
  }, []);

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
    const timeoutId = setTimeout(setupIntersectionObserver, 100);
    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setupIntersectionObserver]);

  const isElementVisible = React.useCallback((elementId) => {
    return state.visibleElements.has(elementId);
  }, [state.visibleElements]);

  const AnimatedSection = React.memo(({ 
    id, 
    className, 
    children, 
    isVisible,
    scrollDirection 
  }) => {
    const sectionClass = React.useMemo(() => {
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

  return (
    <div className="get-started-container">
      {/* Animated background elements */}
      <div className="background-animated">
        <div className="floating-orb orb-purple"></div>
        <div className="floating-orb orb-sky"></div>
        <div className="floating-orb orb-pink"></div>
        <div className="floating-orb orb-blue"></div>
      </div>

      {/* Hero Section */}
      

      {/* Main Form Section */}
      <div className="form-content-wrapper">
        <AnimatedSection
          id="get-started-section"
          className="slide-up get-started-section"
          isVisible={isElementVisible('get-started-section')}
          scrollDirection={state.scrollDirection}
        >
          <div className="form-container-modern">
            <div className="form-card">
              <h2 className="form-title-modern">Get Started with Ganglia Technologies</h2>
              <p className="form-subtitle-modern">
                implementing our solutions or interested in collaborating on research? 
                Fill out the form below and we'll get back to you.
              </p>

              <form className="modern-form" method="post" action="#">
                <div className="form-row">
                  <div className="form-group-modern">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" placeholder="Please enter your full name" required />
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" placeholder="We'll use this to get back to you" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-modern">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="Optional, but recommended for faster communication" />
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="organization">Organization / Company Name *</label>
                    <input type="text" id="organization" name="organization" placeholder='E.g., hospital, clinic, university, startup, etc.' required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-modern">
                    <label htmlFor="role">Your Role / Title</label>
                    <input type="text" id="role" name="role" placeholder="E.g., Doctor, Hospital Admin, Researcher, Student, etc." />
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="location">Location (City, State)</label>
                    <input type="text" id="location" name="location" placeholder="This helps us connect you to the closest team" />
                  </div>
                </div>

                <div className="form-group-full-modern">
                  <label>Which Ganglia solution(s) are you interested in? (Select all that apply)</label>
                  <div className="checkbox-grid">
                    <label className="checkbox-item">
                      <input type="checkbox" value="laryngoscope" name="solutions" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Smart Video-Laryngoscope</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" value="mobile-icu" name="solutions" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Mobile ICU</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" value="medical-logbook" name="solutions" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Medical Logbook</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" value="anushtaan" name="solutions" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Anushtaan (Project Management Platform)</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" value="tripmacha" name="solutions" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">TripMacha AI</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" value="consulting" name="solutions" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Consulting/Custom Development</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" value="not-sure" name="solutions" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Not sure—please recommend based on my needs</span>
                    </label>
                  </div>
                </div>

                <div className="form-group-full-modern">
                  <label>What do you hope to achieve with Ganglia's solutions?</label>
                  <div className="radio-grid">
                    <label className="radio-item">
                      <input type="radio" name="goals" value="clinical-efficiency" />
                      <span className="radio-checkmark"></span>
                      <span className="radio-text">Improve clinical efficiency/care</span>
                    </label>
                    <label className="radio-item">
                      <input type="radio" name="goals" value="lower-costs" />
                      <span className="radio-checkmark"></span>
                      <span className="radio-text">Lower costs</span>
                    </label>
                    <label className="radio-item">
                      <input type="radio" name="goals" value="digital-transformation" />
                      <span className="radio-checkmark"></span>
                      <span className="radio-text">Digital transformation/automation</span>
                    </label>
                    <label className="radio-item">
                      <input type="radio" name="goals" value="training" />
                      <span className="radio-checkmark"></span>
                      <span className="radio-text">Training or education</span>
                    </label>
                    <label className="radio-item">
                      <input type="radio" name="goals" value="research" />
                      <span className="radio-checkmark"></span>
                      <span className="radio-text">Research collaboration</span>
                    </label>
                    <label className="radio-item">
                      <input type="radio" name="goals" value="other" />
                      <span className="radio-checkmark"></span>
                      <span className="radio-text">Other</span>
                    </label>
                  </div>
                </div>

                <div className="form-group-full-modern">
                  <label htmlFor="description">Briefly describe your current need or challenge</label>
                  <textarea id="description" name="description" rows="4" placeholder="Tell us a little about your interest or problem you'd like us to solve"></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group-modern">
                    <label htmlFor="users">Expected Number of Users</label>
                    <select id="users" name="users">
                      <option value="">Select range</option>
                      <option value="1-10">1–10</option>
                      <option value="11-50">11–50</option>
                      <option value="51-200">51–200</option>
                      <option value="200+">200+</option>
                    </select>
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="source">How did you hear about us?</label>
                    <select id="source" name="source">
                      <option value="">Select option</option>
                      <option value="google">Google/Search engine</option>
                      <option value="social-media">Social media</option>
                      <option value="event">Event/Expo</option>
                      <option value="referral">Referral/Word of mouth</option>
                      <option value="news">News/Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-modern">
                  <label htmlFor="contact-method">Preferred Method of Contact</label>
                  <select id="contact-method" name="contact-method">
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="no-preference">No preference</option>
                  </select>
                </div>

                <div className="form-group-full-modern">
                  <label className="checkbox-item checkbox-single">
                    <input type="checkbox" id="updates" name="updates" />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Would you like to receive updates and news from Ganglia Technologies?</span>
                  </label>
                </div>

                <div className="form-group-full-modern">
                  <label htmlFor="attachment">Attach supporting document or enquiry file (Optional)</label>
                  <input type="file" id="attachment" name="attachment" accept=".pdf,.doc,.docx,.txt" className="file-input" />
                  <small className="form-help-text">E.g., requirement sheet, proposal, pilot request, etc.</small>
                </div>

                <div className="form-actions-modern">
                  <button type="submit" className="submit-btn-modern">
                    Submit Request
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GetStartedForm;
