import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player'; // Import Lottie player
import '../styles/AboutUsSection.css';

import gifting from '../assets/gifting1.jpeg';
import gifting1 from '../assets/gifting.png';
import boardroom from '../assets/boardroom.jpeg';
import forwardAnimation from '../assets/Forward.json'; // Import your Lottie JSON

const AboutUsSection = () => {
  const navigate = useNavigate();
  const [flippedImages, setFlippedImages] = useState({
    top: false,
    bottomLeft: false,
    bottomRight: false
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageClick = (imageKey) => {
    if (!isMobile) {
      setFlippedImages(prev => ({
        ...prev,
        [imageKey]: !prev[imageKey]
      }));
    }
  };

  const handleKnowMoreClick = () => {
    navigate('/our-story');
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
            At Ganglia Technologies, we believe world-class healthcare and automation should be within everyone's reach—not a privilege for a few. By blending <span className="highlight">engineering excellence</span>, <span className="highlight">medical insight</span>, and <span className="highlight">true empathy</span>, we create breakthrough solutions that heal, empower, and inspire. From <span className="highlight">trauma-free medical devices</span> to <span className="highlight">AI-driven tools</span> and <span className="highlight">rapid-response ICUs</span>, we're redefining what's possible—making <span className="highlight">innovation affordable</span>, <span className="highlight">human-centered</span>, and <span className="highlight">impactful </span>for all.
          </p>
          <button className="know-more-btn" onClick={handleKnowMoreClick}>
            Discover Our Story
            <span className="arrow-icon">
              <Player
                autoplay
                loop
                src={forwardAnimation}
                style={{ height: '30px', width: '30px', marginLeft: '10px' }}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;