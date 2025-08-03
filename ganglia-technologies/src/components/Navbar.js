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
  const [mobileDropdownStates, setMobileDropdownStates] = useState({
    about: false,
    products: false,
    services: false
  });

  const navigate = useNavigate();
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);
  const mouseTimeoutRef = useRef(null);

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

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
        setDropdownStates({ about: false, products: false, services: false });
        setMobileDropdownStates({ about: false, products: false, services: false });
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }, 16);
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

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = () => {
      const now = Date.now();
      setLastMouseMove(now);
      
      if (window.scrollY > 50) {
        setIsVisible(true);
      }
    };

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

  const handleMobileDropdownToggle = (dropdownName) => {
    setMobileDropdownStates(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName]
    }));
  };

  // Service navigation handler
  const handleServiceNavigation = (link) => {
    const [path, hash] = link.split('#');
    
    if (location.pathname === path) {
      // Already on services page, just scroll to section
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    } else {
      // Navigate to services page, then scroll
      navigate(path);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 300);
      } else {
        // If no hash, scroll to top
        setTimeout(() => {
          scrollToTop();
        }, 100);
      }
    }
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
      navigateWithScrollToTop('/careers');
    } else if (sectionId === 'research') {
      navigateWithScrollToTop('/research-papers');
    } else if (sectionId === 'awards') {
      // Navigate to dedicated awards page
      navigateWithScrollToTop('/awards');
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
    navigateWithScrollToTop('/careers');
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  const handleAwardsClick = (e) => {
    e.preventDefault();
    navigateWithScrollToTop('/awards');
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      scrollToTop();
    } else {
      navigateWithScrollToTop('/');
    }
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  const handleGetStartedClick = () => {
    navigateWithScrollToTop('/get-started');
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  const handleBlogClick = (e) => {
    e.preventDefault();
    navigateWithScrollToTop('/blogs');
    setIsMobileMenuOpen(false);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
    setDropdownStates({ about: false, products: false, services: false });
    setMobileDropdownStates({ about: false, products: false, services: false });
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  // Close mobile menu on escape key
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
        { label: 'Philosophy', link: 'our-story#philosophy-header' },
      { label: 'Milestone', link: '/our-story#TechMilestonesTimeline' },
        { label: 'Social Responsibility', link: '/our-story#social-responsibility-section' }
      ]
    },
    {
      category: 'Our Team',
      link: '/our-team',
      isHeader: true,
      items: [
        { label: 'Leadership Team', link: '/our-team#leadership-team', highlighted: true },
        { label: 'Management Team', link: '/our-team#management-team', highlighted: true },
        { label: 'Intern Team', link: '/our-team#founding-intern-team', highlighted: true },
      ]
    }
  ];

  const productsDropdownItems = [
    {
      category: 'Health Tech',
      isHeader: true,
      items: [
        { label: 'Smart Video Laryngoscope', link: '/smart-video-laryngoscope' },
        { label: 'Mobile ICU', link: '' , className: 'special-button'},
        { label: 'Medical Thermal-Imaging System', link: '', className: 'special-button' },
        { label: 'Medical Drone', link: '', className: 'special-button' }
      ]
    },
    {
      category: 'AI-Powered Tools',
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
      category: 'Our Services',
      link: '/services',
      isHeader: true,
      items: [
        { label: 'Healthcare Tech', link: '/services#healthcare-tech' },
        { label: 'Medical Enterprise Software', link: '/services#enterprise-software' },
        { label: 'Consulting & Custom Development', link: '/services#consulting-development' },
        { label: 'AI Powered Applications', link: '/services#ai-applications' }
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
                navigateWithScrollToTop(section.link);
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
                    handleServiceNavigation(item.link);
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

  const renderMobileDropdownMenu = (items, isOpen) => (
    <div className={`mobile-dropdown-menu ${isOpen ? 'active' : ''}`}>
      {items.map((section, index) => (
        <div key={index} className="mobile-dropdown-category">
          <a 
            href={section.link} 
            className="mobile-dropdown-item mobile-category-header"
            onClick={(e) => {
              e.preventDefault();
              navigateWithScrollToTop(section.link);
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
                  handleServiceNavigation(item.link);
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
                  navigateWithScrollToTop('/our-story');
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
              <a 
                href="/services" 
                className="dropdown-trigger"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithScrollToTop('/services');
                  setDropdownStates({ about: false, products: false, services: false });
                }}
              >
                Services
                <span className="dropdown-arrow">▼</span>
              </a>
              {renderDropdownMenu(servicesDropdownItems, dropdownStates.services)}
            </li>

            {/*
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
                href="/blogs"
                onClick={handleBlogClick}
              >
                Blog
              </a>
            </li>
            */}
            <li>
              <a 
                href="/careers" 
                onClick={handleCareersClick}
              >
                Careers
              </a>
            </li>
            <li>
              <a 
                href="/awards" 
                onClick={handleAwardsClick}
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
{/*}
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
                  href="/blogs" 
                  onClick={handleBlogClick}
                >
                  Blog
                </a>
              </li>
              */}
              <li>
                <a 
                  href="/careers" 
                  onClick={handleCareersClick}
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="/awards" 
                  onClick={handleAwardsClick}
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
