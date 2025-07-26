import React from 'react';
import logo1 from '../assets/1.png';
import logo2 from '../assets/2.png';
import logo3 from '../assets/3.png';
import logo4 from '../assets/4.png';
import logo5 from '../assets/5.png';
import '../styles/App.css'; // Importing the main CSS file with supporter band styles

const SupporterBand = () => {
  // Individual logo configurations - UPDATED FOR LARGER SIZES
  const supporterLogos = [
    { 
      src: logo1, 
      alt: "Manipal Universal Technology Business Incubator",
      className: "supporter-logo-1",
      // Desktop: 200px height, 300px width
    },
    { 
      src: logo2, 
      alt: "Startup Karnataka",
      className: "supporter-logo-2",
      // Desktop: 250px height, 600px width (extra wide!)
    },
    { 
      src: logo3, 
      alt: "DPIIT Startup India",
      className: "supporter-logo-3",
      // Desktop: 230px height, 400px width
    },
    { 
      src: logo4, 
      alt: "Manipal-GOK Bioincubator",
      className: "supporter-logo-4",
      // Desktop: 120px height, 240px width
    },
    { 
      src: logo5, 
      alt: "Manipal Academy of Higher Education",
      className: "supporter-logo-5",
      // Desktop: 250px height, 400px width
    }
  ];

  return (
    <div className="supporter-band">
      <div className="supporter-track">
        {/* Render logos 4 times for seamless scrolling - FIXED TO BOTTOM OF SCREEN */}
        {[...Array(4)].map((_, setIndex) => (
          supporterLogos.map((logo, logoIndex) => (
            <img 
              key={`${setIndex}-${logoIndex}`}
              src={logo.src} 
              alt={logo.alt} 
              className={`supporter-logo ${logo.className}`} // Individual class for each logo
              loading="lazy"
              onError={(e) => {
                console.warn(`Failed to load logo: ${logo.alt}`);
                e.target.style.opacity = '0'; // Hide broken images gracefully
              }}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export default SupporterBand;