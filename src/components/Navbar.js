import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/log.png';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll behavior for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) return;

      const currentScrollY = window.scrollY;

      // Show navbar when at top of page (within 50px)
      if (currentScrollY <= 50) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close menu when scrolling
      }

      setLastScrollY(currentScrollY);
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScrollY, isMobile]);

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
    
    if (sectionId === 'careers') {
      // Navigate to careers page using React Router
      navigate('/careers');
    } else {
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
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const handleCareersClick = (e) => {
    e.preventDefault();
    navigate('/careers');
    setIsMobileMenuOpen(false);
  };

  // New function to handle Our Story navigation
  const handleOurStoryClick = (e) => {
    e.preventDefault();
    navigate('/our-story');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    // Navigate to home page
    navigate('/');
    
    // If already on home page, scroll to top
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleGetStartedClick = () => {
    // You can customize this to navigate to a specific page or section
    // For now, let's navigate to the contact page
    navigate('/contact');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`navbar ${isMobile ? (isVisible ? 'navbar-visible' : 'navbar-hidden') : ''}`}
    >
      <div className="logo">
        <img
          src={logo}
          alt="Ganglia Technologies Logo"
          className="logo-image"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Desktop Navigation */}
      <div className={`navbar-right ${isMobile ? 'navbar-desktop-hidden' : ''}`}>
        <ul className="nav-links">
          <li>
            <a
              href="#our-story"
              onClick={handleOurStoryClick}
            >
              Our Story
            </a>
          </li>
          <li>
            <a
              href="#products"
              onClick={(e) => handleNavClick(e, 'products')}
            >
              Products
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, 'services')}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              href="#research" 
              onClick={(e) => handleNavClick(e, 'research')}
            >
              Research
            </a>
          </li>
          <li>
            <a 
              href="#blog" 
              onClick={(e) => handleNavClick(e, 'blog')}
            >
              Blog
            </a>
          </li>
          <li>
            <a 
              href="#careers" 
              onClick={handleCareersClick}
            >
              Careers
            </a>
          </li>
          <li>
            <a 
              href="#awards" 
              onClick={(e) => handleNavClick(e, 'awards')}
            >
              Awards & News
            </a>
          </li>
        </ul>
        <button 
          className="get-started-btn"
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>
      </div>

      {/* Mobile Hamburger Menu */}
      {isMobile && (
        <>
          <div className="hamburger-menu" onClick={toggleMobileMenu}>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></div>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="mobile-nav-links">
              <li>
                <a
                  href="#our-story"
                  onClick={handleOurStoryClick}
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={(e) => handleNavClick(e, 'products')}
                >
                  Products
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleNavClick(e, 'services')}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#research" 
                  onClick={(e) => handleNavClick(e, 'research')}
                >
                  Research
                </a>
              </li>
              <li>
                <a 
                  href="#blog" 
                  onClick={(e) => handleNavClick(e, 'blog')}
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#careers" 
                  onClick={handleCareersClick}
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#awards" 
                  onClick={(e) => handleNavClick(e, 'awards')}
                >
                  Awards & News
                </a>
              </li>
              <li>
                <button 
                  className="get-started-btn mobile-get-started" 
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;