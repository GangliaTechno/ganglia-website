import React, { useState, useEffect } from 'react';
import '../styles/AboutUsSection.css';

import gifting from '../assets/gifting1.jpeg';
import gifting1 from '../assets/gifting.png';
import boardroom from '../assets/boardroom.jpeg';

const AboutUsSection = () => {
  const [flippedImages, setFlippedImages] = useState({
    top: false,
    bottomLeft: false,
    bottomRight: false
  });

  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageClick = (imageKey) => {
    // Only handle flip on desktop
    if (!isMobile) {
      setFlippedImages(prev => ({
        ...prev,
        [imageKey]: !prev[imageKey]
      }));
    }
  };

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-left">
          <div className="image-collage">
            <div 
              className={`image-wrapper top-image ${!isMobile && flippedImages.top ? 'flipped' : ''}`}
              onClick={() => handleImageClick('top')}
            >
              <div className="image-inner">
                <div className="image-front">
                  <img src={gifting} alt="Award ceremony" />
                </div>
                {!isMobile && (
                  <div className="image-back">
                    <h3>Award Ceremony</h3>
                    <p>Annual Excellence Awards 2024 - Recognizing outstanding achievements in healthcare technology and innovation. A memorable evening celebrating our team's dedication to advancing medical solutions.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div 
              className={`image-wrapper bottom-left ${!isMobile && flippedImages.bottomLeft ? 'flipped' : ''}`}
              onClick={() => handleImageClick('bottomLeft')}
            >
              <div className="image-inner">
                <div className="image-front">
                  <img src={gifting1} alt="Business meeting" />
                </div>
                {!isMobile && (
                  <div className="image-back">
                    <h3>Strategic Planning</h3>
                    <p>Quarterly business strategy session focused on expanding our healthcare technology solutions. Key stakeholders discussing future roadmaps and innovative product development initiatives.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div 
              className={`image-wrapper bottom-right ${!isMobile && flippedImages.bottomRight ? 'flipped' : ''}`}
              onClick={() => handleImageClick('bottomRight')}
            >
              <div className="image-inner">
                <div className="image-front">
                  <img src={boardroom} alt="Team discussion" />
                </div>
                {!isMobile && (
                  <div className="image-back">
                    <h3>Board Room Discussion</h3>
                    <p>Executive team collaboration on AI-powered healthcare initiatives. Discussing partnerships, technological advancements, and strategic decisions to make healthcare more accessible and affordable.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="about-right">
          <h2 className="about-title">About Ganglia</h2>
          <p className="about-description">
            We are dedicated to making <span className="highlight">advanced healthcare</span> and technology solutions both <span className="highlight">innovative</span> and <span className="highlight">affordable</span> by leveraging AI and engineering.
          </p>
          <button className="know-more-btn">Know More</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;