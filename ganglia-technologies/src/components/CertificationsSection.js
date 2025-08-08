import React, { useEffect, useRef, useState } from 'react';
import '../styles/CertificationsSection.css';

import dpiitImg from '../assets/dpiitw.png';
import gokImg from '../assets/gokw.png';
import dunImg from '../assets/dun.png';

const CertificationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef(null);

  // Animation on scroll
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationKey(prev => prev + 1);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Counter animation hook
  const useCounter = (end, duration = 2000, start = 0) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      if (!isVisible) {
        setCount(start);
        return;
      }

      let startTimestamp = null;
      let animationId = null;
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * (end - start) + start);
        setCount(currentCount);
        if (progress < 1) {
          animationId = window.requestAnimationFrame(step);
        }
      };
      
      animationId = window.requestAnimationFrame(step);

      return () => {
        if (animationId) {
          window.cancelAnimationFrame(animationId);
        }
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, animationKey, end, duration, start]);

    return count;
  };

  const patentsCount = useCounter(17, 2000);
  const projectsCount = useCounter(15, 2200);
  const awardsreceivedCount = useCounter(4, 2500);

  const certifications = [
    {
      year: '2023',
      title: 'DPIIT - Startup India Recognition',
      id: 1
    },
    {
      year: '2025',
      title: 'Government of Karnataka - Startup Recognition',
      id: 2
    },
    {
      year: '2025',
      title: 'DUN & BRADSTREET - Startup Recognition',
      id: 3
    }
  ];

  const stats = [
    {
      number: patentsCount,
      label: 'Patents Received',
      id: 1
    },
    {
      number: `${projectsCount}+`,
      label: 'Projects',
      id: 2
    },
    {
      number: `${awardsreceivedCount}+`,
      label: 'Awards Received',
      id: 3
    }
  ];

  return (
    <section className="certifications-section" ref={sectionRef}>
      <div className="certifications-container">
        <h2 className="certifications-title">
          We are Proudly Certified By
        </h2>
        
        <p className="certifications-description">
  We are proud of our achievements in innovation and excellence. From securing patents to winning 
  industry awards, our work is making a real impact. Here are some of our key certifications
</p>


        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id}
              className="certification-card"
              style={{
                animationDelay: isVisible ? `${index * 0.2}s` : '0s',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s ease-out'
              }}
            >
              <div className="certification-badge">
                <img
                  src={
                    cert.id === 1
                      ? dpiitImg
                      : cert.id === 2
                      ? gokImg
                      : dunImg
                  }
                  alt={cert.title}
                  className="certification-image"
                />
              </div>
              
              <div className="certification-year">
                {cert.year}
              </div>
              
              <p className="certification-text">
                {cert.title}
              </p>
            </div>
          ))}
        </div>

        <div className="certifications-stats-divider"></div>

        <div className="certifications-stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={`${stat.id}-${animationKey}`}
              className="certification-stat-item"
              style={{
                animationDelay: isVisible ? `${(index + 3) * 0.2}s` : '0s',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s ease-out'
              }}
            >
              <div className="certification-stat-number">
                {stat.number}
              </div>
              <div className="certification-stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
