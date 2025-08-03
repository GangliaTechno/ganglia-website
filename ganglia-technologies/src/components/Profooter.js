import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Profooter.css';
import logo from '../assets/log.png';
import decorativeImage from '../assets/cardpayments.png';
import responsiveImage from '../assets/cardd.png';
import Lottie from 'lottie-react';
import emailIcon from '../assets/5.json';
import callIcon from '../assets/6.json';

const Profooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const navigateWithScrollToTop = (path) => {
    navigate(path);
    setTimeout(() => { scrollToTop(); }, 100);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === 'story') {
      navigateWithScrollToTop('/our-story');
    } else if (sectionId === 'products') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => { scrollToSection('products'); }, 300);
      } else { scrollToSection('products'); }
    } else if (sectionId === 'services') {
      navigateWithScrollToTop('/services');
    } else if (sectionId === 'blog') {
      navigateWithScrollToTop('/blogs');
    } else if (sectionId === 'research') {
      navigateWithScrollToTop('/research-papers');
    } else if (sectionId === 'awards') {
      navigateWithScrollToTop('/awards');
    } else if (sectionId === 'home') {
      navigateWithScrollToTop('/');
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => { scrollToSection(sectionId); }, 300);
      } else {
        scrollToSection(sectionId);
      }
    }
  };

  const handleContactClick = () => { navigateWithScrollToTop('/contact'); };
  const handleLogoClick = () => {
    if (location.pathname === '/') { scrollToTop(); }
    else { navigateWithScrollToTop('/'); }
  };
  const handleSubscribeClick = () => { navigateWithScrollToTop('/blogs'); };

  return (
    <footer className="profooter">
      <div className="profooter-content">

        <div className="profooter-left">
          <div
            className="profooter-logo"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            aria-label="Go to home"
          >
            <img src={logo} alt="Ganglia Technologies" style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div className="profooter-center">
          <div className="profooter-section headquarters">
            <h3>Headquarters</h3>
            <p>Manipal Government of Karnataka Bioincubator,</p>
            <p>III Floor MAHE Advanced Research Centre Behind MMMC,</p>
            <p>Manipal, Karnataka 576104</p>
          </div>
          <div className="profooter-contact footer-contact">
            <div className="contact-item">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=director@ganglia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                aria-label="Email director at Ganglia"
              >
                <div className="contact-icon">
                  <Lottie animationData={emailIcon} loop autoplay style={{ height: 40, width: 40 }} />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>director@ganglia.in</p>
                </div>
              </a>
            </div>
            <div className="contact-item">
              <a href="tel:+917760042810" className="contact-link" aria-label="Phone Ganglia">
                <div className="contact-icon">
                  <Lottie animationData={callIcon} loop autoplay style={{ height: 40, width: 40 }} />
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <p>(+91) 77600 42810</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="profooter-right">
          <div className="profooter-section-company-links">
            <h3>Company</h3>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
              <li><a href="#story" onClick={(e) => handleNavClick(e, 'story')}>Our Story</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, 'products')}>Products</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
              <li><a href="#research" onClick={(e) => handleNavClick(e, 'research')}>Research</a></li>
              <li><a href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a></li>
              <li><a href="#awards" onClick={(e) => handleNavClick(e, 'awards')}>Awards & News</a></li>
            </ul>
          </div>
          <div className="profooter-newsletter">
            <h3>Get in Touch with us</h3>
            <button type="button" className="contact-btn" onClick={handleContactClick}>Contact Now</button>
            <h3 style={{ marginTop: '20px' }}>Join Our Newsletter</h3>
            <button type="button" className="contact-btn" onClick={handleSubscribeClick}>Subscribe</button>
            <div className="social-icons">
              {/* Social icons go here */}
            </div>
          </div>
        </div>

      </div>

      <img
        src={responsiveImage}
        alt="Responsive Footer Image"
        className="profooter-responsive-image"
      />
      <img
        src={decorativeImage}
        alt="Payments accepted"
        className="profooter-decorative-image"
      />
      <div className="profooter-copyright">
        © 2025 Ganglia Technologies. All rights reserved.
      </div>
    </footer>
  );
};

export default Profooter;
