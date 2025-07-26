import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../assets/log.png';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait a bit for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
    } else {
      // If we're already on home page, just scroll
      scrollToSection(sectionId);
    }
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="Ganglia Technologies" />
          </div>
        </div>
        
        <div className="footer-center">
          <div className="footer-section headquarters">
            <h3>Headquarters</h3>
            <p>Manipal Government of Karnataka Bioincubator,</p>
            <p>III Floor MAHE Advanced Research Centre Behind MMMC,</p>
            <p>Manipal, Karnataka 576104</p>
          </div>
          
          <div className="footer-contact">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>director@ganglia.in</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 3C2 2.45 2.45 2 3 2H5.5C5.85 2 6.15 2.2 6.27 2.53L7.7 6.21C7.85 6.6 7.7 7.04 7.35 7.27L5.5 8.5C6.5 10.62 8.38 12.5 10.5 13.5L11.73 11.65C11.96 11.3 12.4 11.15 12.79 11.3L16.47 12.73C16.8 12.85 17 13.15 17 13.5V16C17 16.55 16.55 17 16 17C8.82 17 3 11.18 3 4C3 3.45 2.55 3 2 3Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>(+91) 81097 82903</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-right">
          <div className="footer-section company-links">
            <h3>Company</h3>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
              <li><a href="#story" onClick={(e) => handleNavClick(e, 'story')}>Our Story</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, 'products')}>Products</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
              <li><a href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a></li>
              <li><a href="#awards" onClick={(e) => handleNavClick(e, 'awards')}>Awards & Research</a></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h3>Join Our Newsletter</h3>
            <button className="contact-btn" onClick={handleContactClick}>Contact Now</button>
            
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H12.6V14.2H10.2V11.2H12.6V9C12.6 6.6 14.1 5.3 16.3 5.3C17.3 5.3 18.2 5.4 18.5 5.4V8.1H17C15.8 8.1 15.6 8.7 15.6 9.5V11.2H18.4L18 14.2H15.6V22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95718 14.8821 3.28445C14.0247 3.61173 13.2884 4.19445 12.773 4.95371C12.2575 5.71297 11.9877 6.61435 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39624C5.36074 6.60667 4.01032 5.43666 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;