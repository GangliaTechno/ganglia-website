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
  // Add mobile dropdown states
  const [mobileDropdownStates, setMobileDropdownStates] = useState({
    about: false,
    products: false,
    services: false
  });

  const navigate = useNavigate();
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);
  const mouseTimeoutRef = useRef(null);

  // Check if device is mobile - FIXED: Check on mount AND resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Close mobile menu when switching to desktop
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Re-enable body scroll when closing mobile menu
        document.body.style.overflow = '';
      }
    };

    // Check on initial load
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobileMenuOpen]); // Added dependency

  // FIXED: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
        setMobileDropdownStates({ about: false, products: false, services: false });
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
          setMobileDropdownStates({ about: false, products: false, services: false });
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

  // Mobile dropdown handlers
  const handleMobileDropdownToggle = (dropdownName) => {
    setMobileDropdownStates(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName]
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
    } else if (sectionId === 'research') {
      navigate('/research-papers');
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
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  const handleCareersClick = (e) => {
    e.preventDefault();
    navigate('/careers');
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  const handleLogoClick = () => {
    navigate('/');
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  const handleGetStartedClick = () => {
    navigate('/contact');
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  // FIXED: Improved mobile menu toggle
  const toggleMobileMenu = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsMobileMenuOpen(prev => !prev);
    // Close all dropdowns when toggling mobile menu
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  // FIXED: Close mobile menu when clicking outside - improved logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if mobile menu is open and click is outside the navbar
      if (isMobileMenuOpen && 
          !event.target.closest('.navbar') && 
          !event.target.closest('.mobile-menu-overlay')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // FIXED: Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => document.removeEventListener('keydown', handleEscapeKey);
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
        { label: 'TripMacha AI – Short Trip Planner', link: '/tripmacha' },
        { label: 'Anushtaan – Project Management Tool', link: '/main-component' },
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

  // Mobile dropdown menu renderer
  const renderMobileDropdownMenu = (items, isOpen) => (
    <div className={`mobile-dropdown-menu ${isOpen ? 'active' : ''}`}>
      {items.map((section, index) => (
        <div key={index} className="mobile-dropdown-category">
          <a 
            href={section.link} 
            className="mobile-dropdown-item mobile-category-header"
            onClick={(e) => {
              e.preventDefault();
              navigate(section.link);
              setIsMobileMenuOpen(false);
              setMobileDropdownStates({ about: false, products: false, services: false });
            }}
          >
            {section.category}
          </a>
          <div className="mobile-dropdown-subsection">
            {section.items.map((item, itemIndex) => (
              <a 
                key={itemIndex}
                href={item.link} 
                className={`mobile-dropdown-item ${item.highlighted ? 'highlighted' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.link);
                  setIsMobileMenuOpen(false);
                  setMobileDropdownStates({ about: false, products: false, services: false });
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Debug logging (remove in production)
  console.log('Navbar Debug:', { isMobile, isMobileMenuOpen, window: typeof window !== 'undefined' ? window.innerWidth : 'SSR' });

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

      {/* Desktop Navigation - FIXED: Better conditional rendering */}
      {!isMobile && (
        <div className="navbar-right">
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
                href="/research-papers" 
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
      )}

      {/* Mobile Hamburger Menu - FIXED: Always render when mobile */}
      {isMobile && (
        <>
          <div 
            className="hamburger-menu" 
            onClick={toggleMobileMenu}
            role="button"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></div>
          </div>

          {/* Mobile Menu Overlay with Dropdowns */}
          <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="mobile-nav-links">
              <li className="mobile-dropdown-container">
                <div 
                  className="mobile-dropdown-trigger"
                  onClick={() => handleMobileDropdownToggle('about')}
                >
                  About Us
                  <span className={`mobile-dropdown-arrow ${mobileDropdownStates.about ? 'active' : ''}`}>▼</span>
                </div>
                {renderMobileDropdownMenu(aboutDropdownItems, mobileDropdownStates.about)}
              </li>

              <li className="mobile-dropdown-container">
                <div 
                  className="mobile-dropdown-trigger"
                  onClick={() => handleMobileDropdownToggle('products')}
                >
                  Products
                  <span className={`mobile-dropdown-arrow ${mobileDropdownStates.products ? 'active' : ''}`}>▼</span>
                </div>
                {renderMobileDropdownMenu(productsDropdownItems, mobileDropdownStates.products)}
              </li>

              <li className="mobile-dropdown-container">
                <div 
                  className="mobile-dropdown-trigger"
                  onClick={() => handleMobileDropdownToggle('services')}
                >
                  Services
                  <span className={`mobile-dropdown-arrow ${mobileDropdownStates.services ? 'active' : ''}`}>▼</span>
                </div>
                {renderMobileDropdownMenu(servicesDropdownItems, mobileDropdownStates.services)}
              </li>

              <li>
                <a 
                  href="/research-papers" 
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
