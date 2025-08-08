import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/CareersPage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logob.png';
// Import Firebase database
import { database } from '../firebase/config';
import { ref, get } from 'firebase/database';
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


const CareersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedJobCard, setExpandedJobCard] = useState(null);
  // Removed modal state: showApplicationModal & selectedJob
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Responsive: detect mobile - if you need this later, remove the eslint-disable comment
  // eslint-disable-next-line no-unused-vars
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const navigate = useNavigate();


  const parseJobDescription = (description) => {
    if (!description) return null;
    try {
      if (typeof description === 'object') return description;
      return JSON.parse(description);
    } catch (error) {
      return { "Job Description": description };
    }
  };


  const renderJobDescription = (job) => {
    const parsedDescription = parseJobDescription(job.description);
    if (!parsedDescription || typeof parsedDescription === 'string') {
      return <p className="job-description">{job.description}</p>;
    }
    return (
      <div className="job-description-sections">
        {Object.entries(parsedDescription).map(([key, value]) => (
          <div key={key} className="description-section">
            <h4 className="section-title">{key}</h4>
            <div className="section-content">
              {value.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };


  useEffect(() => {
    fetchJobsFromFirebase();
  }, []);


  const fetchJobsFromFirebase = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsRef = ref(database, 'jobs');
      const snapshot = await get(jobsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const jobsArray = Array.isArray(data) ? data : Object.values(data);
        setJobData(jobsArray);
      } else {
        setJobData([]);
      }
    } catch (error) {
      setError('Failed to load job data. Please try again later.');
      setJobData([]);
    } finally {
      setLoading(false);
    }
  };


  const handleFilterChange = (filter) => setActiveFilter(filter);
  const handleCardClick = (cardIndex) => setExpandedCard(expandedCard === cardIndex ? null : cardIndex);
  
  // If you need this function later, remove the eslint-disable comment
  // eslint-disable-next-line no-unused-vars
  const handleJobCardClick = (jobId) => setExpandedJobCard(expandedJobCard === jobId ? null : jobId);


  const totalJobCount = jobData.length;
  const filteredJobs = activeFilter === 'all'
    ? jobData
    : jobData.filter(job => job.category === activeFilter);


  // Removed application modal handling, direct navigation instead
  const handleApplyClick = (jobId) => {
    const job = jobData.find(j => j.id === jobId);
    if (!job) return;
    navigate(`/apply/${job.id}`, {
      state: {
        jobTitle: job.title,
        jobDescription: parseJobDescription(job.description),
      },
      replace: false,
    });
  };


  // Removed closeModal as no modal now


  const handleInternshipApply = useCallback((path) => {
    try {
      if (typeof path !== 'string') {
        console.error('Invalid path provided to handleInternshipApply:', path);
        return;
      }
      
      window.scrollTo(0, 0);
      navigate(path, { replace: true });
      
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [navigate]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const renderDetailedInfo = (job) => {
    if (!job.detailedInfo) return null;
    return (
      <div className="job-detailed-info">
        <div className="info-section">
          <h3>Core Responsibilities</h3>
          <ul>
            {job.detailedInfo.coreResponsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="info-section">
          <h3>Required Qualifications</h3>
          <ul>
            {job.detailedInfo.requiredQualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="info-section">
          <h3>Essential Skills</h3>
          <ul>
            {job.detailedInfo.essentialSkills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="info-section">
          <h3>Preferred Qualifications</h3>
          <ul>
            {job.detailedInfo.preferredQualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="info-section">
          <p className="submit-note">
            <strong>Please submit:</strong> This role offers an exceptional opportunity to shape organizational culture, drive strategic HR initiatives, and lead a dynamic team in a growing organization.
          </p>
        </div>
      </div>
    );
  };


  // Images for carousel, you can add more images here
  const carouselImages = [
    { src: developmentTeamImg, alt: 'Development Team', title: 'Development Team' },
    { src: researchLabImg, alt: 'Research Lab', title: 'Research Lab' },
    { src: designStudioImg, alt: 'Design Studio', title: 'Design Studio' },
    { src: collaborationSpacesImg, alt: 'Collaboration Spaces', title: 'Collaboration Spaces' },
    // Add more image objects here if needed
  ];


  // === New Carousel + Modal Component for Internship Section ===
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
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
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


  if (loading) {
    return (
      <div className="careers-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading job opportunities...</p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="careers-page">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchJobsFromFirebase} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="careers-page">
      {/* Removed Application Modal - no longer used */}

      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero-overlay"></div>
        <div className="careers-hero-content">
          <h1>Shape the Future with <span className="careers-gradient-text">Innovation</span></h1>
          <p>If you're inspired by challenging problems and passionate about meaningful change, Ganglia is where visionaries thrive and breakthrough ideas come to life.</p>
          <div className="careers-hero-buttons">
            <a href="#openings" className="careers-apply-btn primary">Explore Opportunities</a>
          </div>
          <div className="careers-hero-stats">
           
            <div className="careers-stat">
              <span className="careers-stat-number">{totalJobCount}+</span>
              <span className="careers-stat-label">Open Positions</span>
            </div>
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
            <h2>Why Choose <span className="careers-ganglia-highlight">Ganglia ?</span></h2>
            <p>We're not just building technology—we're shaping the future</p>
          </div>
          <div className="careers-benefits-grid">
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon"><Player autoplay loop src={innovation} style={{ height: 55, width: 55 }} /></div>
              <h3>Innovation First</h3>
              <p>Work on cutting-edge projects that push the boundaries of what's possible in healthcare technology.</p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon"><Player autoplay loop src={learning} style={{ height: 55, width: 55 }} /></div>
              <h3>Growth & Learning</h3>
              <p>Continuous learning opportunities with mentorship from industry experts and access to latest technologies.</p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon"><Player autoplay loop src={collaboration} style={{ height: 55, width: 55 }} /></div>
              <h3>Collaborative Culture</h3>
              <p>Join a diverse team where every voice matters and breakthrough ideas emerge from collaboration.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Openings Section */}
      <section className="careers-section" id="openings">
        <div className="careers-container">
          <div className="careers-section-header">
            <h2>Current Openings</h2>
            <p>Join our mission to revolutionize healthcare technology</p>
          </div>
          <div className="careers-filter-tabs">
            <button
              className={`careers-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All Positions
            </button>
            <button
              className={`careers-filter-btn ${activeFilter === 'engineering' ? 'active' : ''}`}
              onClick={() => handleFilterChange('engineering')}
            >
              Engineering
            </button>
            <button
              className={`careers-filter-btn ${activeFilter === 'design' ? 'active' : ''}`}
              onClick={() => handleFilterChange('design')}
            >
              Design
            </button>
            <button
              className={`careers-filter-btn ${activeFilter === 'management' ? 'active' : ''}`}
              onClick={() => handleFilterChange('management')}
            >
              Management
            </button>
          </div>
          <div className="careers-opening-cards">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="careers-job-card expanded"
                  data-category={job.category}
                >
                  {/* Full Content View - Expanded */}
                  <div className="careers-job-card-full-content">
                    <div className="careers-job-header">
                      <div className="careers-job-title-section">
                        <h3>{job.title}</h3>
                        <div className="careers-job-meta">
                          <span className="careers-job-type">{job.type}</span>
                          <span className="careers-job-location">{job.location}</span>
                          <span className="careers-job-level">{job.level}</span>
                        </div>
                      </div>
                    </div>
                    <div className="careers-job-description-container">
                      {(() => {
                        const parsedDescription = parseJobDescription(job.description);
                        if (
                          parsedDescription &&
                          typeof parsedDescription === 'object' &&
                          parsedDescription["Job Description"]
                        ) {
                          return (
                            <p className="careers-job-description">
                              {parsedDescription["Job Description"]}
                            </p>
                          );
                        }
                        return (
                          <p className="careers-job-description">
                            {job.description}
                          </p>
                        );
                      })()}
                    </div>
                    <div className="careers-job-skills">
                      {job.skills && job.skills.map((skill, index) => (
                        <span key={index} className="careers-skill-tag">{skill}</span>
                      ))}
                    </div>
                    <div className="careers-job-footer">
                      <div className="careers-job-posted">{job.posted}</div>
                      <button
                        className="careers-job-apply-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyClick(job.id);
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-jobs-message">
                <p>No job openings available at the moment. Please check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Application Timeline Table Section */}
      <section className="careers-timeline-section">
        <div className="careers-container">
          <div className="careers-section-header">
            <h2>Application <span className="careers-ganglia-highlight">Timeline</span></h2>
            <p>Important dates for all current job openings</p>
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
                          <span className="position-details">{job.type} • {job.location}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`category-badge ${job.category}`}>
                          {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                        </span>
                      </td>
                      <td className="date-cell">
                        {job.applicationTimeline ? formatDate(job.applicationTimeline.applicationsOpen) : 'TBD'}
                      </td>
                      <td className="date-cell deadline-cell">
                        {job.applicationTimeline ? formatDate(job.applicationTimeline.finalDeadline) : 'TBD'}
                      </td>
                      <td className="date-cell">
                        {job.applicationTimeline ? formatDate(job.applicationTimeline.programStarts) : 'TBD'}
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
          <p className="careers-header-text">We also offer roles in Technical and Management fields with internships and mentorships that foster growth.</p>
          <div className="careers-internship-title-container">
            <img src={logo} alt="Ganglia Logo" className="careers-logo" />
            <h1 className="careers-internship-title">SUMMER INTERNSHIP PROGRAM 2026</h1>
          </div>
        </div>
        <div className="careers-internship-content">
          <div className="careers-program-highlights">
            <div className="careers-highlight-card">
              <div className="careers-highlight-icon"><Player autoplay loop src={teach} style={{ height: 55, width: 55 }} /></div>
              <h3>Learn from Experts</h3>
              <p>Work directly with senior engineers, designers, and product managers who are leaders in healthcare technology.</p>
            </div>
            <div className="careers-highlight-card">
              <div className="careers-highlight-icon"><Player autoplay loop src={globe} style={{ height: 55, width: 55 }} /></div>
              <h3>Real-World Projects</h3>
              <p>Contribute to actual product features and research initiatives that impact thousands of healthcare professionals.</p>
            </div>
            <div className="careers-highlight-card">
              <div className="careers-highlight-icon"><Player autoplay loop src={launch} style={{ height: 55, width: 55 }} /></div>
              <h3>Career Launch</h3>
              <p>Kickstart your career with a company that's revolutionizing healthcare.</p>
            </div>
          </div>


          {/* REPLACE THE STATIC IMAGE CARDS WITH THE NEW CAROUSEL COMPONENT */}
          <ImageCarousel images={carouselImages} />


          <div className="careers-call-to-action">
            <div className="careers-cta-content">
              <h3><span className="careers-highlight">Opportunities</span> like this don't wait</h3>
              <p className="careers-cta-subtitle">Join the next generation of healthcare innovators</p>
              <div className="careers-application-info">
                <button
                  className="careers-date-button"
                  onClick={() => handleInternshipApply('/internship-form')}
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
