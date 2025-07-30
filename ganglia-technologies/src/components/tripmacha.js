import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/tripmacha.css';
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
                TripMachaAI is an intelligent, end-to-end travel and logistics planning platform powered by advanced AI—built specifically for hospitals, academic institutions, and healthcare organizations. Streamlines itinerary creation, accommodation selection, approval processes, and reimbursement tracking with unmatched efficiency and cost control.
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
            <h2><span>About</span> TripMachaAI</h2>
            <p>
              TripMachaAI is an intelligent, end-to-end travel and logistics planning platform powered by advanced AI—built specifically for hospitals, academic institutions, and healthcare organizations. Moving beyond basic manual and spreadsheet-based travel management, TripMachaAI helps your team plan, optimize, and track journeys for conferences, patient transfers, fieldwork, student postings, and more—all with unmatched efficiency and cost control.
            </p>
            <p>
              Seamlessly integrating with organizational workflows, TripMachaAI streamlines itinerary creation, accommodation selection, approval processes, and reimbursement tracking. Designed for doctors, admin staff, engineers, faculty, and students, it brings clarity, transparency, and peace of mind to every official trip—so you can focus on your mission, not the paperwork.
            </p>
          </div>
        </section>


        {/* Features Section */}
        <section className="tripmacha-page-features">
          <h2>Features</h2>
          <ul>
            <li><i className="tripmacha-page-icon" role="img" aria-label="ai">🤖</i> <strong>AI-Powered Itinerary Planning:</strong> Automatically generates optimal travel routes, schedules, and accommodation options based on user needs and organizational policies.</li>
            <li><i className="tripmacha-page-icon" role="img" aria-label="workflow">⚙️</i> <strong>Approval Workflow Automation:</strong> Simplifies and accelerates travel requests, approvals, and documentation with customizable, rule-based steps.</li>
            <li><i className="tripmacha-page-icon" role="img" aria-label="money">💰</i> <strong>Cost Optimization Engine:</strong> Suggests the best travel and stay options for both comfort and budget—maximizing value within company guidelines.</li>
            <li><i className="tripmacha-page-icon" role="img" aria-label="bell">🔔</i> <strong>Real-Time Notifications:</strong> Keeps travelers, managers, and admin teams updated on approvals, status changes, and travel alerts via email or SMS.</li>
            <li><i className="tripmacha-page-icon" role="img" aria-label="group">👥</i> <strong>Group & Bulk Booking:</strong> Handles individual or batch travel planning for teams, student groups, or multiple delegates with ease.</li>
            <li><i className="tripmacha-page-icon" role="img" aria-label="expense">📊</i> <strong>Integrated Expense Management:</strong> Captures receipts, automates reimbursement forms, and tracks expenses for transparent accounting.</li>
            <li><i className="tripmacha-page-icon" role="img" aria-label="dashboard">📋</i> <strong>Personalized Dashboards:</strong> Gives each user—traveler, admin, or approver—a clear view of upcoming trips, pending actions, and overall travel stats.</li>
            <li><i className="tripmacha-page-icon" role="img" aria-label="security">🔒</i> <strong>Data Security and Privacy:</strong> All travel data is securely stored within the organization's infrastructure or on-premises servers per your policy—never shared externally.</li>
            <li><i className="tripmacha-page-icon" role="img" aria-label="device">📱</i> <strong>Multi-Platform Accessibility:</strong> Plan, approve, and track travel from any device, at work or on the go.</li>
          </ul>
        </section>


        {/* Benefits Section */}
        <section className="tripmacha-page-benefits">
          <h2>Benefits of Using TripMachaAI</h2>
          <ul>
            <li>Dramatically reduces manual paperwork and administrative effort</li>
            <li>Ensures compliance with organizational travel policies and budgets</li>
            <li>Enhances accuracy, transparency, and speed of travel planning and approvals</li>
            <li>Improves user satisfaction with tailored, AI-guided itineraries</li>
            <li>Empowers HR and finance teams with real-time oversight of travel expenditures</li>
            <li>Scales effortlessly from small teams to multi-campus organizations</li>
            <li>Guarantees data privacy with secure, local data storage</li>
          </ul>
        </section>


        {/* Additional Advantages Section */}
        <section className="tripmacha-page-advantages">
          <h2>Additional Advantages</h2>
          <ul>
            <li>Customizable fields and approval chains to match your institution's workflows</li>
            <li>Advanced analytics on travel frequency, spend, and trends</li>
            <li>Seamless integration with internal HR or ERP systems</li>
            <li>Regional settings for currencies, destinations, and compliance</li>
            <li>Dedicated support and onboarding from the Ganglia team</li>
          </ul>
        </section>


        {/* Why Choose TripMachaAI Section */}
        <section className="tripmacha-page-why-choose">
          <h2>Why Choose TripMachaAI?</h2>
          <ul>
            <li>Developed by Ganglia Technologies—trusted for innovation, security, and collaboration with healthcare and academic leaders</li>
            <li>Advanced AI algorithms honed for real-world institutional needs</li>
            <li>Flexible, scalable, and tailored to your organization's travel management</li>
            <li>Proven to streamline operations, control costs, and enhance planning</li>
          </ul>
          <p>
            <strong>Cut through the chaos of travel management—choose the intelligence of AI, transparency, control, and security with TripMachaAI. Empower your team to move further, faster, and smarter.</strong>
          </p>
          <p><em>Innovation. Clarity. Mobility. Delivered.</em></p>
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

    </div>
  );
};


export default TripMacha;
