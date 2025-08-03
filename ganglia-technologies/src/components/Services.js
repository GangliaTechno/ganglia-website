import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';

// Import all images from src/assets
import healthImage from '../assets/health.png';
import medicalImage from '../assets/medical.png';
import consultingImage from '../assets/consulting.png';
import aiImage from '../assets/ai.png';

const services = [
  {
    id: 'healthcare-tech',
    title: 'Healthcare Tech',
    description: 'Smart medical devices, telemedicine platforms and patient data management',
    image: healthImage
  },
  {
    id: 'medical-enterprise',
    title: 'Medical Enterprise Software',
    description: 'Scalable Business Solutions tailored to client needs',
    image: medicalImage
  },
  {
    id: 'consulting-custom',
    title: 'Consulting & Custom Dev',
    description: 'AI Strategy & Automation for Business Growth.',
    image: consultingImage
  },
  {
    id: 'ai-powered',
    title: 'AI Powered Applications',
    description: 'Intelligent automation, Machine Learning and NLP models',
    image: aiImage
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  // Handle service card click
  const handleServiceClick = (serviceId) => {
    navigate(`/services?section=${serviceId}`);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    const handleScroll = () => {
      if (!section || cards.length === 0) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      const sectionCenter = rect.top + sectionHeight / 2;
      const viewportCenter = windowHeight / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = windowHeight / 2 + sectionHeight / 2;
      let scrollProgress = Math.min(distance / maxDistance, 1);
      scrollProgress = 1 - scrollProgress;

      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
      const easedProgress = easeOutQuart(scrollProgress);

      cards.forEach((card, index) => {
        if (!card) return;
        let startX, startY;
        switch(index) {
          case 0: startX = -60; startY = -60; break;
          case 1: startX = 60; startY = -60; break;
          case 2: startX = -60; startY = 60; break;
          case 3: startX = 60; startY = 60; break;
          default: startX = 0; startY = 0;
        }

        const currentX = startX * (1 - easedProgress);
        const currentY = startY * (1 - easedProgress);
        const currentScale = 0.6 + (0.4 * easedProgress);
        const currentOpacity = 0.3 + (0.7 * easedProgress);
        const currentRotation = (1 - easedProgress) * (index % 2 === 0 ? -8 : 8);

        requestAnimationFrame(() => {
          card.style.transform = `translate(${currentX}vw, ${currentY}vh) scale(${currentScale}) rotate(${currentRotation}deg)`;
          card.style.opacity = currentOpacity;
        });
      });
    };

    let rafId;
    const smoothHandleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };
    
    window.addEventListener('scroll', smoothHandleScroll, { passive: true });
    window.addEventListener('resize', smoothHandleScroll, { passive: true });
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', smoothHandleScroll);
      window.removeEventListener('resize', smoothHandleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="services-bg" />
      <div className="services-container">
        <h2 className="services-heading">Services We Provide</h2>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`service-card scroll-responsive-card ${idx < 2 ? 'top-row' : 'bottom-row'} ${idx % 2 === 1 ? 'reverse' : ''}`}
              onClick={() => handleServiceClick(service.id)}
              style={{ cursor: 'pointer' }}
            >
              <img src={service.image} alt={service.title} className="service-img" />
              <div className="service-info">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
