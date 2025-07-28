import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player'; // Import Lottie player
import '../styles/AboutUsSection.css';

import gifting from '../assets/gifting1.jpeg';
import gifting1 from '../assets/gifting.png';
import boardroom from '../assets/awards3.jpeg';
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
                    
                    <p>Official agreement signing between Dr. Manesh Thomas (CEO, Manipal - Government of Karnataka Bioincubator) and Dr. Dasharathraj K. Shetty (Co-founder, Ganglia Technologies) marking Ganglia’s incubation at the Manipal - Government of Karnataka Bioincubator, 2 August 2022</p>
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
                    
                    <p>Ganglia Technologies is honored with the "Promising & Innovative Technology Company of the Year 2023" Karnataka Award for Futuristic Product Development & Research at the prestigious 23rd Great Indian Entrepreneurship, Design, Business, & Startup Awards & Conference. development initiatives.</p>
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
                    
                    <p>At a board-endorsed ceremony attended by Ganglia Technologies’ leadership and Manipal GoK Bio-Incubator representatives, co-founder Dr. Dasharathraj K Shetty officially welcomed and honoured newly appointed CEO Namesh Malarout, an MIT Engineering Management graduate and former Canada-based data analyst and consultant, marking a pivotal moment in setting Ganglia’s 2025 strategic leadership direction.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="about-right">
          <h2 className="about-title">About Ganglia</h2>
          <p className="about-description">
            At Ganglia Technologies, we believe world-class healthcare and automation should be within everyone's reach, not a privilege for a few. By blending <span className="highlight">engineering excellence</span>, <span className="highlight">medical insight</span>, and <span className="highlight">true empathy</span>, we create breakthrough solutions that heal, empower, and inspire. From <span className="highlight">trauma-free medical devices</span> to <span className="highlight">AI-driven tools</span> and <span className="highlight">rapid-response ICUs</span>, we're redefining what's possible,making <span className="highlight">innovation affordable</span>, <span className="highlight">human-centered</span>, and <span className="highlight">impactful </span>for all.
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