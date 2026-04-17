import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/CareersPage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logob.png';
import { useRouteLoader } from '../hooks/useRouteLoader';
import { Player } from '@lottiefiles/react-lottie-player';
import innovation from '../assets/innovation.json';
import learning from '../assets/learning.json';
import collaboration from '../assets/collaboration.json';
import developmentTeamImg from '../assets/developmentteam.jpeg';
import researchLabImg from '../assets/researchlab.jpeg';
import designStudioImg from '../assets/designstudio.jpeg';
import collaborationSpacesImg from '../assets/collaborationspaces.jpg';
import launch from '../assets/Firecracker.json';
import teach from '../assets/Classroom.json';
import globe from '../assets/globe.json';

// debounce
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Hardcoded Jobs Array
const jobData = [
  {
    id: 'ui-ux-design-intern',
    title: 'UI/UX Design intern',
    category: 'design',
    type: 'Internship',
    location: 'In-Person',
    level: 'Entry Level',
    shortDescription:
      "Design interfaces people actually enjoy using. You'll help design how our product looks and feels — across web and mobile. Think of it as the bridge between the product team and the people using it. If you love making things look clean, logical, and easy to use, this role is for you.",
    details: {
      "What You'll Do": [
        "Sketch out wireframes and user flows.",
        "Build interactive prototypes in Figma.",
        "Work closely with developers to bring designs to life.",
        "Iterate based on user feedback.",
        "You won't be thrown into the deep end alone — there's a team to guide you."
      ],
      "Note for Newcomers": [
        "If you've built anything in Figma — a personal project, a college assignment, even a mock app for fun — that counts. We care more about your design thinking than your resume."
      ]
    },
    posted: ' ',
    skills: ['Figma', 'Framer', 'Sketch', 'Adobe XD', 'Wireframing basics', 'Typography', 'AI tools'],
    applicationTimeline: {
      applicationsOpen: '2026-04-01',
      finalDeadline: '2026-04-20',
      programStarts: '2026-06-01'
    }
  },
  {
    id: 'marketing-intern',
    title: 'Marketing intern',
    category: 'marketing',
    type: 'Internship',
    location: 'In-Person',
    level: 'Entry Level',
    shortDescription:
      "Help us grow our online presence. You'll help us show up in the right places — on social media, in search results, and in people's inboxes. This is a great role if you like writing, storytelling, and figuring out what makes people click.",
    details: {
      "What You'll Do": [
        "Write and schedule posts across social platforms.",
        "Draft copy for emails, blogs, and landing pages.",
        "Help run digital marketing campaigns.",
        "Do basic keyword research for SEO.",
        "Track how content is performing.",
        "Collaborate with the design and product teams on launches."
      ],
      "Note for Newcomers": [
        "If you've managed a club's Instagram, written for a college newsletter, or run any kind of online page — that experience is relevant. Bring samples of anything you've written or created."
      ]
    },
    posted: ' ',
    skills: ['Writing', 'Social Media', 'SEO', 'Data Curiosity', 'AI writing tools'],
    applicationTimeline: {
      applicationsOpen: '2026-04-01',
      finalDeadline: '2026-04-20',
      programStarts: '2026-06-01'
    }
  },
  {
    id: 'mobile-app-developer-intern',
    title: 'Mobile app developer intern',
    category: 'engineering',
    type: 'Internship',
    location: 'In-Person',
    level: 'Entry Level',
    shortDescription:
      "Build Android apps from scratch. You'll work on building real features inside our Android app. This means writing code, connecting to our backend, handling user logins, and making sure things don't break. You'll learn a ton by doing real work — not just watching tutorials.",
    details: {
      "What You'll Do": [
        "Build and test app features using Kotlin.",
        "Integrate Firebase for login and data storage.",
        "Connect the app to our backend via APIs.",
        "Debug issues when things go wrong.",
        "Commit code to GitHub and review it with the team."
      ],
      "Note for Newcomers": [
        "If you've built a simple Android app in college or on your own — even if it's just a to-do list — that's a great start. Kotlin is a plus but not a blocker; we're happy to help you pick it up."
      ]
    },
    posted: ' ',
    skills: ['Android Studio', 'Firebase', 'REST APIs', 'Git', 'GitHub', 'Kotlin', 'AI debugging tools'],
    applicationTimeline: {
      applicationsOpen: '2026-04-01',
      finalDeadline: '2026-04-20',
      programStarts: '2026-06-01'
    }
  },
  {
    id: 'full-stack-developer-intern',
    title: 'Full stack developer intern',
    category: 'engineering',
    type: 'Internship',
    location: 'In-Person',
    level: 'Entry Level',
    shortDescription:
      "Build web apps end-to-end. You'll work across the full product — building features users see on screen (frontend) and the logic that powers them behind the scenes (backend). It's a great role if you like knowing how the whole system fits together.",
    details: {
      "What You'll Do": [
        "Build UI components in React.",
        "Write backend logic in Python.",
        "Store and retrieve data from MongoDB.",
        "Connect everything through REST APIs.",
        "Write clean code, use Git for version control, and pair with teammates to review and ship features."
      ],
      "Note for Newcomers": [
        "College projects, personal portfolios, or open-source contributions all count. Python is a bonus — knowing any backend language shows you can think server-side, and Python is easy to pick up if you don't know it yet."
      ]
    },
    posted: ' ',
    skills: ['React.js', 'MongoDB', 'Git', 'GitHub', 'REST APIs', 'Python', 'Clean code', 'AI coding tools'],
    applicationTimeline: {
      applicationsOpen: '2026-04-01',
      finalDeadline: '2026-04-20',
      programStarts: '2026-06-01'
    }
  }
];

// Carousel images
const carouselImages = [
  { src: developmentTeamImg, alt: 'Development Team', title: 'Development Team' },
  { src: researchLabImg, alt: 'Research Lab', title: 'Research Lab' },
  { src: designStudioImg, alt: 'Design Studio', title: 'Design Studio' },
  { src: collaborationSpacesImg, alt: 'Collaboration Spaces', title: 'Collaboration Spaces' }
];

const CareersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const { isLoading } = useRouteLoader();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  
  const debouncedHandleResize = useCallback(
    debounce(() => setIsMobile(window.innerWidth < 900), 100),
    []
  );

  useEffect(() => {
    debouncedHandleResize();
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [debouncedHandleResize]);

  const navigate = useNavigate();

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  // Filter jobs based on selected category
  const filteredJobs = jobData.filter(job => 
    activeFilter === 'all' ? true : job.category === activeFilter
  );

  useEffect(() => {
    const timer = setTimeout(() => setAnimationsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="careers-page-loader">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading careers page...</p>
        </div>
      </div>
    );
  }

  const ImageCarousel = ({ images }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const openModal = (index) => {
      setActiveIndex(index);
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    const scroll = (direction) => {
      if (!carouselRef.current) return;
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    };

    return (
      <>
        <div className="careers-image-carousel-wrapper">
          <button
            className="carousel-nav-btn left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            type="button"
          >
            ‹
          </button>
          <div className="careers-image-carousel" ref={carouselRef}>
            {images.map((img, idx) => (
              <div
                key={idx}
                className="carousel-image-card"
                role="button"
                tabIndex={0}
                onClick={() => openModal(idx)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') openModal(idx);
                }}
                aria-label={`View image: ${img.title || 'image #' + (idx + 1)}`}
              >
                <img
                  src={img.src}
                  alt={img.alt || `Image ${idx + 1}`}
                  loading="lazy"
                  className="carousel-image"
                />
                {img.title && <div className="carousel-image-title">{img.title}</div>}
              </div>
            ))}
          </div>
          <button
            className="carousel-nav-btn right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            type="button"
          >
            ›
          </button>
        </div>

        {modalOpen && (
          <div className="image-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
              <button
                className="modal-close-btn"
                aria-label="Close image modal"
                onClick={closeModal}
                type="button"
              >
                ×
              </button>
              <img
                src={images[activeIndex].src}
                alt={images[activeIndex].alt || `Image ${activeIndex + 1}`}
                className="modal-image"
              />
              {images[activeIndex].title && (
                <div className="modal-image-title">{images[activeIndex].title}</div>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero-overlay"></div>
        <div className="careers-hero-content">
          <h1>
            Shape the Future with <span className="careers-gradient-text">Innovation</span>
          </h1>
          <p>
            If you're inspired by challenging problems and passionate about meaningful change,
            Ganglia is where visionaries thrive and breakthrough ideas come to life.
          </p>
          <div className="careers-hero-buttons">
            <a href="#open-roles" className="careers-apply-btn primary">
              Apply Now
            </a>
          </div>
        </div>
        <div className="careers-hero-scroll">
          <span>Scroll to explore</span>
          <div className="careers-scroll-indicator"></div>
        </div>
      </section>

      {/* Why Join Us - Bento Grid Section */}
      <section className="careers-why-join-section">
        <div className="careers-container">
          <div className="careers-section-header">
            <h2>
              Why Choose <span className="careers-ganglia-highlight">Ganglia ?</span>
            </h2>
            <p>We're not just building technology—we're shaping the future</p>
          </div>
          
          <div className="bento-grid">
            <div className="bento-card bento-wide bento-feature-primary">
              <div className="careers-benefit-icon">
                <Player autoplay loop src={innovation} style={{ height: 65, width: 65 }} />
              </div>
              <h3>Innovation First</h3>
              <p>Work on cutting-edge projects that push the boundaries of what's possible in healthcare technology. We actively encourage experimentation and novel approaches to complex problems.</p>
            </div>
            
            <div className="bento-card bento-feature-secondary">
              <div className="careers-benefit-icon">
                <Player autoplay loop src={learning} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Growth & Learning</h3>
              <p>Continuous learning opportunities with mentorship from industry experts.</p>
            </div>
            
            <div className="bento-card bento-feature-tertiary">
              <div className="careers-benefit-icon">
                <Player autoplay loop src={collaboration} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Collaborative Culture</h3>
              <p>Join a diverse team where breakthrough ideas emerge from collaboration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Timeline Table Section (Restored) */}
      <section className="careers-timeline-section" id="timeline">
        <div className="careers-container">
          <div className="careers-section-header">
            <h2>
              Application <span className="careers-ganglia-highlight">Timeline</span>
            </h2>
            <p>Important dates for all current and upcoming programs</p>
          </div>
          <div className="careers-timeline-table-container">
            <table className="careers-timeline-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Category</th>
                  <th>Applications Open</th>
                  <th>Final Deadline</th>
                  <th>Start Date</th>
                </tr>
              </thead>
              <tbody>
                {jobData.length > 0 ? (
                  jobData.map(job => (
                    <tr key={`table-${job.id}`}>
                      <td className="position-cell">
                        <div className="position-info">
                          <span className="position-title">{job.title}</span>
                          <span className="position-details">
                            {job.type} • {job.location}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`category-badge ${job.category}`}>
                          {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                        </span>
                      </td>
                      <td className="date-cell">
                        {job.applicationTimeline
                          ? new Date(job.applicationTimeline.applicationsOpen).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : 'TBD'}
                      </td>
                      <td className="date-cell deadline-cell">
                        {job.applicationTimeline
                          ? new Date(job.applicationTimeline.finalDeadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : 'TBD'}
                      </td>
                      <td className="date-cell">
                        {job.applicationTimeline
                          ? new Date(job.applicationTimeline.programStarts).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : 'TBD'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data-message">
                      No timeline data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Open Roles Cards Section */}
      <section className="careers-open-roles-section" id="open-roles">
        <div className="careers-container">
          <div className="careers-section-header">
            <h2>
              Open <span className="careers-ganglia-highlight">Roles</span>
            </h2>
            <p>Find your next big opportunity with us</p>
          </div>

          {/* Filter Buttons */}
          <div className="careers-filters">
            {['all', 'engineering', 'design', 'marketing'].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Job Cards Grid */}
          <div className="careers-jobs-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div key={job.id} className="careers-job-card">
                  <div className="job-card-header">
                    <span className={`category-badge ${job.category}`}>
                      {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                    </span>
                    <span className="job-type-location">
                      {job.type} • {job.location}
                    </span>
                  </div>
                  
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-description">{job.shortDescription}</p>

                  <div className="job-skills-container">
                    {job.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="job-skill-pill">{skill}</span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="job-skill-pill extra">+{job.skills.length - 4}</span>
                    )}
                  </div>

                  <button 
                    className="job-card-apply-btn primary"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate('/internship-form', { replace: true });
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <div className="no-data-message">
                <p>No open roles available matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Internship & Programs - Bento Grid Section */}
      <section className="careers-internship-section" id="internships">
        <div className="careers-container">
          <div className="careers-internship-header">
            <p className="careers-header-text">
              We also offer roles in Technical and Management fields with internships and mentorships that foster growth.
            </p>
            <div className="careers-internship-title-container">
              <img src={logo} alt="Ganglia Logo" className="careers-logo" />
              <h1 className="careers-internship-title">SUMMER INTERNSHIP PROGRAM 2026</h1>
            </div>
          </div>
          
          <div className="bento-grid internship-bento">
            <div className="bento-card">
              <div className="careers-highlight-icon">
                <Player autoplay loop src={teach} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Learn from Experts</h3>
              <p>Work directly with senior engineers, designers, and product managers.</p>
            </div>
            
            <div className="bento-card">
              <div className="careers-highlight-icon">
                <Player autoplay loop src={globe} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Real-World Projects</h3>
              <p>Contribute to actual product features and research initiatives.</p>
            </div>
            
            <div className="bento-card">
              <div className="careers-highlight-icon">
                <Player autoplay loop src={launch} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Career Launch</h3>
              <p>Kickstart your career with a company that's revolutionizing healthcare.</p>
            </div>

            {/* Carousel spans across multiple columns in the bento grid */}
            <div className="bento-card bento-span-full bento-carousel-wrapper">
              <ImageCarousel images={carouselImages} />
            </div>

            <div className="bento-card bento-span-full bento-cta-card">
              <div className="careers-cta-content">
                <h3>
                  <span className="careers-highlight">Opportunities</span> like this don't wait
                </h3>
                <p className="careers-cta-subtitle">Join the next generation of healthcare innovators</p>
                <div className="careers-application-info">
                  <button
                    className="careers-date-button primary-glow"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate('/internship-form', { replace: true });
                    }}
                  >
                    Apply for Summer Internship Program 2026
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
