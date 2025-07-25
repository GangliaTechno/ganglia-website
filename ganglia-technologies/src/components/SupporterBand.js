import React from 'react';
import logo1 from '../assets/1.png';
import logo2 from '../assets/2.png';
import logo3 from '../assets/3.png';
import logo4 from '../assets/4.png';
import logo5 from '../assets/5.png';

const SupporterBand = () => {
  const supporterLogos = [
    { src: logo1, alt: "Supporter 1" },
    { src: logo2, alt: "Supporter 2" },
    { src: logo3, alt: "Supporter 3" },
    { src: logo4, alt: "Supporter 4" },
    { src: logo5, alt: "Supporter 5" }
  ];

  return (
    <div className="supporter-band">
      <div className="supporter-track">
        {/* Render logos three times for seamless scrolling */}
        {[...Array(3)].map((_, setIndex) => (
          supporterLogos.map((logo, logoIndex) => (
            <img 
              key={`${setIndex}-${logoIndex}`}
              src={logo.src} 
              alt={logo.alt} 
              className="supporter-logo" 
            />
          ))
        ))}
      </div>
    </div>
  );
};

export default SupporterBand;