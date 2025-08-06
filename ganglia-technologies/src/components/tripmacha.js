import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/tripmacha.css';
import guyOnScooter from '../assets/guy_on_scooter.png';
import logoImage from '../assets/logo.png';
import { Player } from '@lottiefiles/react-lottie-player';
import trip1 from '../assets/tripmacha/trip1.json';
import trip2 from '../assets/tripmacha/trip2.json';
import trip3 from '../assets/tripmacha/trip3.json';
import trip4 from '../assets/tripmacha/trip4.json';
import trip5 from '../assets/tripmacha/trip5.json';
import trip6 from '../assets/tripmacha/trip6.json';
import trip7 from '../assets/tripmacha/trip7.json';
import trip8 from '../assets/tripmacha/trip8.json';
import trip9 from '../assets/tripmacha/trip9.json';
import trip10 from '../assets/tripmacha/trip10.json';
import trip11 from '../assets/tripmacha/trip11.json';
import trip12 from '../assets/tripmacha/trip12.json';
import trip13 from '../assets/tripmacha/trip13.json';
import trip14 from '../assets/tripmacha/trip14.json';
import trip15 from '../assets/tripmacha/trip15.json';
import trip16 from '../assets/tripmacha/trip16.json';
import trip17 from '../assets/tripmacha/trip17.json';
import trip18 from '../assets/tripmacha/trip18.json';

const TripMacha = () => {
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);
  const heroRef = useRef(null);
  
  const colors = useMemo(() => ['#c9f6ff', '#ffdeeb', '#ffe9cc', '#c8f1f1', '#feffd7'], []);

  // Enhanced scroll animations with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.tripmacha-section');
    sections.forEach((section) => observer.observe(section));

    // Observe feature items for staggered animation
    const featureItems = document.querySelectorAll('.tripmacha-feature-item');
    featureItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      observer.observe(item);
    });

    // Observe benefit items
    const benefitItems = document.querySelectorAll('.tripmacha-benefit-item');
    benefitItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.15}s`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced title shuffle animation
  useEffect(() => {
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

    const animateShuffle = (text, iterations = 8, delay = 100) => {
      let count = 0;
      const intervalId = setInterval(() => {
        if (count >= iterations) {
          titleElement.textContent = text;
          titleElement.classList.add('title-glow');
          clearInterval(intervalId);
          return;
        }
        titleElement.textContent = shuffleString(text);
        count++;
      }, delay);
    };

    if (titleElement) {
      setTimeout(() => animateShuffle(originalText), 500);
    }
  }, []);

  // Enhanced scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.parallax-element');
      
      parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });

      // Hero content parallax
      const heroContent = document.querySelector('.tripmacha-page-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    
    // Button click animation
    e.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
      e.target.style.transform = 'scale(1.05)';
      setTimeout(() => {
        e.target.style.transform = 'scale(1)';
      }, 100);
    }, 100);
    
    console.log('Discover TripMacha AI clicked');
  };

  // Small Bubbles Component
  const SmallBubbles = () => {
    return (
      <div className="small-bubbles-container">
        {[...Array(25)].map((_, i) => (
          <span 
            key={i} 
            className="small-bubble" 
            style={{ 
              animationDelay: `${i * 0.4}s`, 
              left: `${Math.random() * 95}%`,
              animationDuration: `${8 + Math.random() * 6}s`
            }} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="tripmacha-page">
      <div className="tripmacha-page-container">
        {/* Enhanced Hero Section */}
        <section className="tripmacha-page-hero" ref={heroRef}>
          <div className="hero-background-layer"></div>
          <SmallBubbles />
          
          <div className="tripmacha-page-content">
            <div className="tripmacha-page-image">
              <img 
                id="scooterGuy" 
                src={guyOnScooter} 
                alt="TripMacha mascot on scooter"
              />
            </div>
            <div className="tripmacha-page-description">
              <img src={logoImage} alt="TripMacha Logo" className="tripmacha-page-logo" />
              <h1 className="tripmacha-title" ref={titleRef}>Trip Macha AI</h1>
              <p>
                TripMachaAI is an intelligent, end-to-end travel and logistics planning platform powered by advanced AI—built specifically for hospitals, academic institutions, and healthcare organizations. Streamlines itinerary creation, accommodation selection, approval processes, and reimbursement tracking with unmatched efficiency and cost control.
              </p>
              <button 
                className="tripmacha-page-btn" 
                onClick={handleDiscoverClick}
                type="button"
              >
                <span>Discover TripMacha AI</span>
                <div className="btn-glow"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section className="tripmacha-page-about tripmacha-section">
          <div className="section-background"></div>
          <div className="tripmacha-page-about-text">
            <h2><span>About</span> TripMachaAI</h2>
            <div className="content-columns">
              <p>
                TripMachaAI is an intelligent, end-to-end travel and logistics planning platform powered by advanced AI—built specifically for hospitals, academic institutions, and healthcare organizations. Moving beyond basic manual and spreadsheet-based travel management, TripMachaAI helps your team plan, optimize, and track journeys for conferences, patient transfers, fieldwork, student postings, and more—all with unmatched efficiency and cost control.
              </p>
              <p>
                Seamlessly integrating with organizational workflows, TripMachaAI streamlines itinerary creation, accommodation selection, approval processes, and reimbursement tracking. Designed for doctors, admin staff, engineers, faculty, and students, it brings clarity, transparency, and peace of mind to every official trip—so you can focus on your mission, not the paperwork.
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="tripmacha-page-features tripmacha-section">
          <div className="section-background"></div>
          <h2>Features</h2>
          <div className="features-grid">
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip1} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>AI-Powered Itinerary Planning</h3>
                <p>Automatically generates optimal travel routes, schedules, and accommodation options based on user needs and organizational policies.</p>
              </div>
            </div>
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip2} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>Approval Workflow Automation</h3>
                <p>Simplifies and accelerates travel requests, approvals, and documentation with customizable, rule-based steps.</p>
              </div>
            </div>
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip3} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>Cost Optimization Engine</h3>
                <p>Suggests the best travel and stay options for both comfort and budget—maximizing value within company guidelines.</p>
              </div>
            </div>
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip4} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>Real-Time Notifications</h3>
                <p>Keeps travelers, managers, and admin teams updated on approvals, status changes, and travel alerts via email or SMS.</p>
              </div>
            </div>
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip5} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>Group & Bulk Booking</h3>
                <p>Handles individual or batch travel planning for teams, student groups, or multiple delegates with ease.</p>
              </div>
            </div>
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip6} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>Integrated Expense Management</h3>
                <p>Captures receipts, automates reimbursement forms, and tracks expenses for transparent accounting.</p>
              </div>
            </div>
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip7} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>Personalized Dashboards</h3>
                <p>Gives each user—traveler, admin, or approver—a clear view of upcoming trips, pending actions, and overall travel stats.</p>
              </div>
            </div>
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip8} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>Data Security and Privacy</h3>
                <p>All travel data is securely stored within the organization's infrastructure or on-premises servers per your policy—never shared externally.</p>
              </div>
            </div>
            <div className="tripmacha-feature-item">
              <div className="feature-icon"><Player autoplay loop src={trip9} style={{ height: 55, width: 55 }} /></div>
              <div className="feature-content">
                <h3>Multi-Platform Accessibility</h3>
                <p>Plan, approve, and track travel from any device, at work or on the go.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Benefits Section */}
        <section className="tripmacha-page-benefits tripmacha-section">
          <div className="section-background"></div>
          <h2>Benefits of Using TripMachaAI</h2>
          <div className="benefits-grid">
            <div className="tripmacha-benefit-item">
              <div className="benefit-number">01</div>
              <p>Dramatically reduces manual paperwork and administrative effort</p>
            </div>
            <div className="tripmacha-benefit-item">
              <div className="benefit-number">02</div>
              <p>Ensures compliance with organizational travel policies and budgets</p>
            </div>
            <div className="tripmacha-benefit-item">
              <div className="benefit-number">03</div>
              <p>Enhances accuracy, transparency, and speed of travel planning and approvals</p>
            </div>
            <div className="tripmacha-benefit-item">
              <div className="benefit-number">04</div>
              <p>Improves user satisfaction with tailored, AI-guided itineraries</p>
            </div>
            <div className="tripmacha-benefit-item">
              <div className="benefit-number">05</div>
              <p>Empowers HR and finance teams with real-time oversight of travel expenditures</p>
            </div>
            <div className="tripmacha-benefit-item">
              <div className="benefit-number">06</div>
              <p>Scales effortlessly from small teams to multi-campus organizations</p>
            </div>
            <div className="tripmacha-benefit-item">
              <div className="benefit-number">07</div>
              <p>Guarantees data privacy with secure, local data storage</p>
            </div>
          </div>
        </section>

        {/* Enhanced Additional Advantages Section */}
        <section className="tripmacha-page-advantages tripmacha-section">
          <div className="section-background"></div>
          <h2>Additional Advantages</h2>
          <div className="advantages-container">
            <div className="advantage-card">
              <div className="advantage-icon"><Player autoplay loop src={trip10} style={{ height: 55, width: 55 }} /></div>
              <p>Customizable fields and approval chains to match your institution's workflows</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon"><Player autoplay loop src={trip11} style={{ height: 55, width: 55 }} /></div>
              <p>Advanced analytics on travel frequency, spend, and trends</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon"><Player autoplay loop src={trip12} style={{ height: 55, width: 55 }} /></div>
              <p>Seamless integration with internal HR or ERP systems</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon"><Player autoplay loop src={trip13} style={{ height: 55, width: 55 }} /></div>
              <p>Regional settings for currencies, destinations, and compliance</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon"><Player autoplay loop src={trip14} style={{ height: 55, width: 55 }} /></div>
              <p>Dedicated support and onboarding from the Ganglia team</p>
            </div>
          </div>
        </section>

        {/* Enhanced Why Choose TripMachaAI Section */}
        <section className="tripmacha-page-why-choose tripmacha-section">
          <div className="section-background"></div>
          <h2>Why Choose TripMachaAI?</h2>
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="card-header">
                <div className="card-icon"><Player autoplay loop src={trip15} style={{ height: 55, width: 55 }} /></div>
                <h3>Trusted Innovation</h3>
              </div>
              <p>Developed by Ganglia Technologies—trusted for innovation, security, and collaboration with healthcare and academic leaders</p>
            </div>
            <div className="why-choose-card">
              <div className="card-header">
                <div className="card-icon"><Player autoplay loop src={trip16} style={{ height: 55, width: 55 }} /></div>
                <h3>Advanced AI</h3>
              </div>
              <p>Advanced AI algorithms honed for real-world institutional needs</p>
            </div>
            <div className="why-choose-card">
              <div className="card-header">
                <div className="card-icon"><Player autoplay loop src={trip17} style={{ height: 55, width: 55 }} /></div>
                <h3>Flexible & Scalable</h3>
              </div>
              <p>Flexible, scalable, and tailored to your organization's travel management</p>
            </div>
            <div className="why-choose-card">
              <div className="card-header">
                <div className="card-icon"><Player autoplay loop src={trip18} style={{ height: 55, width: 55 }} /></div>
                <h3>Proven Results</h3>
              </div>
              <p>Proven to streamline operations, control costs, and enhance planning</p>
            </div>
          </div>
          <div className="closing-statement">
            <p>
              <strong>Cut through the chaos of travel management—choose the intelligence of AI, transparency, control, and security with TripMachaAI. Empower your team to move further, faster, and smarter.</strong>
            </p>
            <p><em>Innovation. Clarity. Mobility. Delivered.</em></p>
          </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section className="tripmacha-page-how-it-works tripmacha-section">
          <div className="section-background"></div>
          <p className="tripmacha-page-subheading">HOW IT WORKS</p>
          <h2>Plan your perfect trip in minutes!</h2>
          <div className="tripmacha-page-steps">
            <div className="tripmacha-page-step">
              <div className="step-content">
                <div className="tripmacha-step-placeholder">
                  <span className="tripmacha-step-number">1</span>
                </div>
                <p>Decide the Location<br />for the trip</p>
              </div>
              <div className="step-connector"></div>
            </div>
            <div className="tripmacha-page-step">
              <div className="step-content">
                <div className="tripmacha-step-placeholder">
                  <span className="tripmacha-step-number">2</span>
                </div>
                <p>Enter the details in<br />TripMacha Chatbot</p>
              </div>
              <div className="step-connector"></div>
            </div>
            <div className="tripmacha-page-step">
              <div className="step-content">
                <div className="tripmacha-step-placeholder">
                  <span className="tripmacha-step-number">3</span>
                </div>
                <p>Get Your complete<br />Itinerary</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Section */}
        <section className="tripmacha-page-pricing tripmacha-section">
          <div className="section-background"></div>
          <h2>PRICING</h2>
          <div className="tripmacha-page-pricing-cards">
            <div className="tripmacha-page-card">
              <div className="card-header">
                <h3>Free Version</h3>
              </div>
            </div>
            <div className="tripmacha-page-card tripmacha-highlight">
              <div className="card-header">
                <h3>Plus</h3>
              </div>
              <div className="popular-badge">Most Popular</div>
            </div>
            <div className="tripmacha-page-card">
              <div className="card-header">
                <h3>Pro</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="tripmacha-page-final-cta tripmacha-section">
          <div className="cta-background-animation"></div>
          <div className="tripmacha-page-cta-content">
            <div className="tripmacha-cta-placeholder">
              <span className="tripmacha-cta-emoji">🚗</span>
            </div>
            <h2><span className="tripmacha-faint">Plan your trip</span> <strong>NOW!</strong></h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TripMacha;
