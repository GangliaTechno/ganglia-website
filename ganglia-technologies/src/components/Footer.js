import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../assets/log.png';
import Lottie from 'lottie-react';
import emailIcon from '../assets/5.json';
import callIcon from '../assets/6.json';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  // Enhanced navigation function with scroll to top
  const navigateWithScrollToTop = (path) => {
    navigate(path);
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

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
    
    // Handle specific pages that need direct navigation
    if (sectionId === 'story') {
      navigateWithScrollToTop('/our-story');
    } else if (sectionId === 'products') {
      // Navigate to home page and scroll to products section
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          scrollToSection('products');
        }, 300);
      } else {
        scrollToSection('products');
      }
    } else if (sectionId === 'services') {
      navigateWithScrollToTop('/services');
    } else if (sectionId === 'blog') {
      navigateWithScrollToTop('/blogs');
    } else if (sectionId === 'research') {
      navigateWithScrollToTop('/research-papers');
    } else if (sectionId === 'awards') {
      navigateWithScrollToTop('/awards');
    } 
    else if (sectionId === 'home') {
      navigateWithScrollToTop('/');
    } else {
      // For sections on home page
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 300);
      } else {
        scrollToSection(sectionId);
      }
    }
  };

  const handleContactClick = () => {
    navigateWithScrollToTop('/contact');
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      scrollToTop();
    } else {
      navigateWithScrollToTop('/');
    }
  };

  const handleSubscribeClick = () => {
    // Navigate to blog page instead of scrolling to top
    navigateWithScrollToTop(''); // change to '/blogs' if you want to go to the blog page
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img 
              src={logo} 
              alt="Ganglia Technologies" 
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>

        <div className="footer-center">
          <div className="footer-section headquarters">
            <h3>Headquarters</h3>
            <p>IS/CWI/008, Manipal GoK Bio-incubator,</p>
            <p>3rd Floor, Advanced Research Centre, Madhav Nagar, </p>
            <p>Manipal, Udupi, Karnataka, India - 576104</p>
          </div>

          <div className="footer-contact">
            <div className="contact-item">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=director@ganglia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
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
              <a href="tel:+7760042810" className="contact-link">
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

        <div className="footer-right">
          <div className="footer-section company-links">
            <h3>Company</h3>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
              <li><a href="#story" onClick={(e) => handleNavClick(e, 'story')}>Our Story</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, 'products')}>Products</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
              <li><a href="#research" onClick={(e) => handleNavClick(e, 'research')}>Research</a></li>
              {/* <li><a href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a></li> */}
              {/* <li><a href="#awards" onClick={(e) => handleNavClick(e, 'awards')}>Awards & News</a></li> */}
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Get in Touch with us</h3>
            <button className="contact-btn" onClick={handleContactClick}>Contact Now</button>

            <h3 style={{ marginTop: '20px' }}>Join Our Newsletter</h3>
            <button className="contact-btn" onClick={handleSubscribeClick}>Subscribe</button>

            <div className="social-icons">
              <a 
                href="https://www.facebook.com/people/Ganglia-Technologies-Private-Limited/100093543685978/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon" 
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H12.6V14.2H10.2V11.2H12.6V9C12.6 6.6 14.1 5.3 16.3 5.3C17.3 5.3 18.2 5.4 18.5 5.4V8.1H17C15.8 8.1 15.6 8.7 15.6 9.5V11.2H18.4L18 14.2H15.6V22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href="https://x.com/Ganglia_in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon" 
                aria-label="X"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17.53 2H21.5L14.5 10.15L22.67 22H16.16L10.98 14.85L4.97 22H1L8.39 13.23L0.5 2H7.16L12 8.6L17.53 2ZM16.36 20H18.13L6.32 3.93H4.42L16.36 20Z" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/ganglia-technologies-private-limited" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon" 
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
            
          </div>
        </div>
      </div>
      <div className="footer-copyright">
  © 2025 Ganglia Technologies. All rights reserved.
</div>
    </footer>
  );
};

export default Footer;
