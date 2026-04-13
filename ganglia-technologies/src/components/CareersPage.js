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

// Hardcoded Jobs Array (still used by timeline)
{
  "ui_ux_design_intern": {
    "applicationTimeline": {
      "applicationsOpen": "2026-04-13",
      "finalDeadline": null,
      "programStarts": "2026-06-01"
    },
    "category": "design",
    "description": "{\n  \"Job Description\": \"You’ll help design how our product looks and feels — across web and mobile. Think of it as the bridge between the product team and the people using it. If you love making things look clean, logical, and easy to use, this role is for you.\",\n  \n  \"What You'll Do\": \"Sketch out wireframes and user flows, build interactive prototypes in Figma, work closely with developers to bring designs to life, and iterate based on user feedback. You won’t be thrown into the deep end alone — there’s a team to guide you.\",\n  \n  \"Skills We're Looking For\": \"Figma; Any of: Framer / Sketch / Adobe XD; Wireframing basics; Eye for typography; Good communication; AI tools (ChatGPT, etc.). New to this? If you've built anything in Figma — a personal project, a college assignment, even a mock app for fun — that counts. We care more about your design thinking than your resume.\"\n}\n",
    "id": 101001,
    "level": "Junior",
    "location": "On-site",
    "skills": [
      "Figma",
      "Wireframing",
      "Typography",
      "UI/UX Design",
      "Prototyping"
    ],
    "title": "UI/UX Design intern",
    "type": "Internship"
  },
  "marketing_intern": {
    "applicationTimeline": {
      "applicationsOpen": "2026-04-13",
      "finalDeadline": null,
      "programStarts": "2026-06-01"
    },
    "category": "marketing",
    "description": "{\n  \"Job Description\": \"You’ll help us show up in the right places — on social media, in search results, and in people’s inboxes. This is a great role if you like writing, storytelling, and figuring out what makes people click.\",\n  \n  \"What You'll Do\": \"Write and schedule posts across social platforms, draft copy for emails, blogs, and landing pages, help run digital marketing campaigns, do basic keyword research for SEO, and track how content is performing. You’ll collaborate with the design and product teams on launches.\",\n  \n  \"Skills We're Looking For\": \"Clear, engaging writing; Social media familiarity; Basic SEO concepts; Attention to detail; Curiosity about data; AI writing tools. New to this? If you’ve managed a club’s Instagram, written for a college newsletter, or run any kind of online page — that experience is relevant.\"\n}\n",
    "id": 101002,
    "level": "Junior",
    "location": "On-site",
    "skills": [
      "Content Writing",
      "SEO",
      "Social Media Marketing",
      "Copywriting",
      "Data Analytics"
    ],
    "title": "Marketing intern",
    "type": "Internship"
  },
  "mobile_app_developer_intern": {
    "applicationTimeline": {
      "applicationsOpen": "2026-04-13",
      "finalDeadline": null,
      "programStarts": "2026-06-01"
    },
    "category": "engineering",
    "description": "{\n  \"Job Description\": \"You’ll work on building real features inside our Android app. This means writing code, connecting to our backend, handling user logins, and making sure things don’t break. You’ll learn a ton by doing real work — not just watching tutorials.\",\n  \n  \"What You'll Do\": \"Build and test app features using Kotlin, integrate Firebase for login and data storage, connect the app to our backend via APIs, and debug issues when things go wrong. You’ll commit code to GitHub and review it with the team.\",\n  \n  \"Skills We're Looking For\": \"Android Studio; Firebase basics; REST APIs; Git & GitHub; Kotlin; Problem-solving mindset; AI tools for debugging. New to this? If you’ve built a simple Android app in college or on your own — even if it’s just a to-do list — that’s a great start.\"\n}\n",
    "id": 101003,
    "level": "Junior",
    "location": "On-site",
    "skills": [
      "Android Studio",
      "Kotlin",
      "Firebase",
      "REST APIs",
      "Git"
    ],
    "title": "Mobile app developer intern",
    "type": "Internship"
  },
  "full_stack_developer_intern": {
    "applicationTimeline": {
      "applicationsOpen": "2026-04-13",
      "finalDeadline": null,
      "programStarts": "2026-06-01"
    },
    "category": "engineering",
    "description": "{\n  \"Job Description\": \"You’ll work across the full product — building features users see on screen (frontend) and the logic that powers them behind the scenes (backend). It’s a great role if you like knowing how the whole system fits together.\",\n  \n  \"What You'll Do\": \"Build UI components in React, write backend logic in Python, store and retrieve data from MongoDB, and connect everything through REST APIs. You’ll write clean code, use Git for version control, and pair with teammates to review and ship features.\",\n  \n  \"Skills We're Looking For\": \"React.js; MongoDB basics; Git & GitHub; REST API concepts; Python; Clean code habits; AI coding tools. New to this? College projects, personal portfolios, or open-source contributions all count. Python is a bonus — knowing any backend language shows you can think server-side.\"\n}\n",
    "id": 101004,
    "level": "Junior",
    "location": "On-site",
    "skills": [
      "React.js",
      "Python",
      "MongoDB",
      "REST APIs",
      "Git"
    ],
    "title": "Full stack developer intern",
    "type": "Internship"
  }
}


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
            <a href="#timeline" className="careers-apply-btn primary">
              View Application Timeline
            </a>
          </div>
        </div>
        <div className="careers-hero-scroll">
          <span>Scroll to explore</span>
          <div className="careers-scroll-indicator"></div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="careers-why-join-section">
        <div className="careers-container">
          <div className="careers-section-header">
            <h2>
              Why Choose <span className="careers-ganglia-highlight">Ganglia ?</span>
            </h2>
            <p>We're not just building technology—we're shaping the future</p>
          </div>
          <div className="careers-benefits-grid">
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">
                <Player autoplay loop src={innovation} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Innovation First</h3>
              <p>Work on cutting-edge projects that push the boundaries of what's possible in healthcare technology.</p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">
                <Player autoplay loop src={learning} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Growth & Learning</h3>
              <p>Continuous learning opportunities with mentorship from industry experts and access to latest technologies.</p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">
                <Player autoplay loop src={collaboration} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Collaborative Culture</h3>
              <p>Join a diverse team where every voice matters and breakthrough ideas emerge from collaboration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Timeline Table Section */}
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
                    <tr key={job.id}>
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
                          ? new Date(
                              job.applicationTimeline.applicationsOpen
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : 'TBD'}
                      </td>
                      <td className="date-cell deadline-cell">
                        {job.applicationTimeline
                          ? new Date(
                              job.applicationTimeline.finalDeadline
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : 'TBD'}
                      </td>
                      <td className="date-cell">
                        {job.applicationTimeline
                          ? new Date(
                              job.applicationTimeline.programStarts
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : 'TBD'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data-message">
                      No job data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section className="careers-internship-section" id="internships">
        <div className="careers-internship-header">
          <p className="careers-header-text">
            We also offer roles in Technical and Management fields with internships and mentorships that foster growth.
          </p>
          <div className="careers-internship-title-container">
            <img src={logo} alt="Ganglia Logo" className="careers-logo" />
            <h1 className="careers-internship-title">SUMMER INTERNSHIP PROGRAM 2026</h1>
          </div>
        </div>
        <div className="careers-internship-content">
          <div className="careers-program-highlights">
            <div className="careers-highlight-card">
              <div className="careers-highlight-icon">
                <Player autoplay loop src={teach} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Learn from Experts</h3>
              <p>Work directly with senior engineers, designers, and product managers who are leaders in healthcare technology.</p>
            </div>
            <div className="careers-highlight-card">
              <div className="careers-highlight-icon">
                <Player autoplay loop src={globe} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Real-World Projects</h3>
              <p>Contribute to actual product features and research initiatives that impact thousands of healthcare professionals.</p>
            </div>
            <div className="careers-highlight-card">
              <div className="careers-highlight-icon">
                <Player autoplay loop src={launch} style={{ height: 55, width: 55 }} />
              </div>
              <h3>Career Launch</h3>
              <p>Kickstart your career with a company that's revolutionizing healthcare.</p>
            </div>
          </div>

          <ImageCarousel images={carouselImages} />

          <div className="careers-call-to-action">
            <div className="careers-cta-content">
              <h3>
                <span className="careers-highlight">Opportunities</span> like this don't wait
              </h3>
              <p className="careers-cta-subtitle">Join the next generation of healthcare innovators</p>
              <div className="careers-application-info">
                <button
                  className="careers-date-button"
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
      </section>
    </div>
  );
};

export default CareersPage;
