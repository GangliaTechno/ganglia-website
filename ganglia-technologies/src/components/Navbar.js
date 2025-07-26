import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/log.png';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());
  const [dropdownStates, setDropdownStates] = useState({
    about: false,
    products: false,
    services: false
  });

  const navigate = useNavigate();
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);
  const mouseTimeoutRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close mobile menu when switching to desktop
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for blur effect
      setIsScrolled(currentScrollY > 50);

      // Show navbar when at top of page (within 50px)
      if (currentScrollY <= 50) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
        // Close all dropdowns when hiding navbar
        setDropdownStates({ about: false, products: false, services: false });
      }
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }, 16); // ~60fps throttling
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Handle mouse movement to show navbar
  useEffect(() => {
    const handleMouseMove = () => {
      const now = Date.now();
      setLastMouseMove(now);
      
      if (window.scrollY > 50) {
        setIsVisible(true);
      }
    };

    // Auto-hide navbar after inactivity
    const setupAutoHide = () => {
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      
      mouseTimeoutRef.current = setTimeout(() => {
        const now = Date.now();
        if (now - lastMouseMove > 3000 && window.scrollY > 100) {
          setIsVisible(false);
          setIsMobileMenuOpen(false);
          setDropdownStates({ about: false, products: false, services: false });
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    setupAutoHide();

    const intervalId = setInterval(setupAutoHide, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(intervalId);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, [lastMouseMove]);

  // Dropdown handlers
  const handleDropdownToggle = (dropdownName, isOpen) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdownName]: isOpen
    }));
  };

  // Navigation handlers
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
      navigate('/careers');
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(sectionId), 300);
      } else {
        scrollToSection(sectionId);
      }
    }
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
  };

  const handleCareersClick = (e) => {
    e.preventDefault();
    navigate('/careers');
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
  };

  const handleLogoClick = () => {
    navigate('/');
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
  };

  const handleGetStartedClick = () => {
    navigate('/contact');
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close all dropdowns when toggling mobile menu
    setDropdownStates({ about: false, products: false, services: false });
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Determine navbar classes
  const getNavbarClasses = () => {
    let classes = 'navbar';
    classes += isVisible ? ' navbar-visible' : ' navbar-hidden';
    if (isScrolled) {
      classes += ' navbar-blur-scrolled';
    }
    return classes;
  };

  // Dropdown menu data
  const aboutDropdownItems = [
    {
      category: 'Our Story',
      link: '/our-story',
      isHeader: true,
      items: [
        { label: 'Philosophy', link: '/philosophy' },
        { label: 'Milestone', link: '/milestone' },
        { label: 'Social Responsibility', link: '/social-responsibility' }
      ]
    },
    {
      category: 'Our Team',
      link: '/our-team',
      isHeader: true,
      items: [
        { label: 'Leadership Team', link: '/leadership-team', highlighted: true },
        { label: 'Management Team', link: '/management-team', highlighted: true },
        { label: 'Intern Team', link: '/intern-team', highlighted: true }
      ]
    }
  ];

  const productsDropdownItems = [
    {
      category: 'Health Tech',
      link: '/health-tech',
      isHeader: true,
      items: [
        { label: 'Smart Video Laryngoscope', link: '/smart-video-laryngoscope' },
        { label: 'Mobile ICU', link: '/mobile-icu' },
        { label: 'Medical Thermal-Imaging System', link: '/medical-thermal-imaging' },
        { label: 'Medical Drone', link: '/medical-drone' }
      ]
    },
    {
      category: 'AI-Powered Tools',
      link: '/ai-powered-tools',
      isHeader: true,
      items: [
        { label: 'TripMacha AI – Short Trip Planner', link: '/tripmacha' }, // ← Updated link
        { label: 'Anushtaan – Project Management Tool', link: '/anushtaan' },
        { label: 'Medical Logbook', link: '/medical-logbook' }
      ]
    }
  ];

  const servicesDropdownItems = [
    {
      category: 'Our Products',
      link: '/healthcare-tech',
      isHeader: true,
      items: [
        { label: 'Healthcare Tech', link: '/medical-enterprise-software' },
        { label: 'Medical Enterprise Software', link: '/consulting-custom-development' },
        { label: 'Consulting & Custom Development', link: '/consulting-custom-development' },
        { label: 'AI Powered Applications', link: '/consulting-custom-development' }
      ]
    }
  ];

  // ← Updated renderDropdownMenu function
  const renderDropdownMenu = (items, isOpen) => (
    <div className={`dropdown-menu ${isOpen ? 'active' : ''}`}>
      <div className="dropdown-section">
        {items.map((section, index) => (
          <div key={index} className="dropdown-category">
            <a 
              href={section.link} 
              className="dropdown-item category-header"
              onClick={(e) => {
                e.preventDefault();
                navigate(section.link);
                setIsMobileMenuOpen(false);
                setDropdownStates({ about: false, products: false, services: false });
              }}
            >
              {section.category}
            </a>
            <div className="dropdown-subsection">
              {section.items.map((item, itemIndex) => (
                <a 
                  key={itemIndex}
                  href={item.link} 
                  className={`dropdown-item ${item.highlighted ? 'highlighted' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.link);
                    setIsMobileMenuOpen(false);
                    setDropdownStates({ about: false, products: false, services: false });
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <nav className={getNavbarClasses()}>
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
          <li 
            className="dropdown-container"
            onMouseEnter={() => handleDropdownToggle('about', true)}
            onMouseLeave={() => handleDropdownToggle('about', false)}
          >
            <a 
              href="/our-story" 
              className="dropdown-trigger"
              onClick={(e) => {
                e.preventDefault();
                navigate('/our-story');
              }}
            >
              About Us
              <span className="dropdown-arrow">▼</span>
            </a>
            {renderDropdownMenu(aboutDropdownItems, dropdownStates.about)}
          </li>

          <li
            className="dropdown-container"
            onMouseEnter={() => handleDropdownToggle('products', true)}
            onMouseLeave={() => handleDropdownToggle('products', false)}
          >
            <a href="#products" className="dropdown-trigger">
              Products
              <span className="dropdown-arrow">▼</span>
            </a>
            {renderDropdownMenu(productsDropdownItems, dropdownStates.products)}
          </li>

          <li
            className="dropdown-container"
            onMouseEnter={() => handleDropdownToggle('services', true)}
            onMouseLeave={() => handleDropdownToggle('services', false)}
          >
            <a href="#services" className="dropdown-trigger">
              Services
              <span className="dropdown-arrow">▼</span>
            </a>
            {renderDropdownMenu(servicesDropdownItems, dropdownStates.services)}
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
                  href="/our-story"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/our-story');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  About Us
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
