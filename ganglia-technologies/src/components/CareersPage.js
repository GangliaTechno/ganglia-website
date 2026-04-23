import React, { useState, useRef } from 'react';
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

// Hardcoded Jobs Array - Added Technical Project Manager and updated deadlines
const jobData = [
  {
    id: 'technical-project-manager',
    title: 'Technical Project Manager',
    category: 'management',
    type: 'Full-time',
    location: 'In-Person',
    level: 'Mid Level',
    shortDescription:
      "Drive end-to-end technical projects, providing leadership, and giving strategic inputs across multiple initiatives. Bring your experience to architect solutions, mentor a team, and manage project lifecycles.",
    details: {
      "What You'll Do": [
        "Manage project timelines, delivery, and lifecycle.",
        "Provide leadership and direction to a development team.",
        "Contribute key technical and strategic inputs to various projects.",
        "Code, review, and architect robust solutions across the stack.",
        "Lead client interactions, capture project requirements, and communicate them clearly to the development team for execution."
      ],
      "Note for Newcomers": [
        "Pre-requisites: BTech/MCA, age below 25 years. Terms & Conditions: No accommodation provided, No allowances provided."
      ]
    },
    posted: ' ',
    skills: ['Full-Stack Experience', 'Project Management', 'Team Leadership', 'Strategic Thinking', 'Problem Solving', 'AI-writing Tools', 'Communication'],
    applicationTimeline: {
      applicationsOpen: '2026-04-01',
      finalDeadline: '2026-04-30',
      programStarts: 'Immediate'
    }
  },
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
      finalDeadline: '2026-04-30',
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
      finalDeadline: '2026-04-30',
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
      finalDeadline: '2026-04-30',
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
      finalDeadline: '2026-04-30',
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

// Extracted Component
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


const CareersPage = () => {
  const { isLoading } = useRouteLoader();
  const navigate = useNavigate();

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

  return (
    <div className="careers-page">
      {/* Dynamic CSS injected for the job cards to implement Glassmorphism and specialized Full-time styling */}
      <style>{`
        .careers-job-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 30px;
        }

        /* Glassmorphism Styles - Base */
        .careers-job-card-dark {
          position: relative;
          background: rgba(17, 21, 38, 0.45); 
          backdrop-filter: blur(12px); 
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08); 
          border-radius: 16px; 
          padding: 24px;
          display: flex;
          flex-direction: column;
          color: #e2e8f0;
          text-align: left;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); 
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        /* Full-Time Specific Styling */
        .careers-job-card-dark.full-time-card {
          border: 1px solid rgba(252, 235, 79, 0.3); /* Gold/Yellow border */
          background: rgba(25, 22, 10, 0.45); /* Slightly warmer background */
        }
        
        .careers-job-card-dark.full-time-card:hover {
          border-color: rgba(252, 235, 79, 0.8);
          box-shadow: 0 12px 40px 0 rgba(252, 235, 79, 0.15);
        }

        .job-card-title-dark.full-time-title {
          color: #fceb4f; /* Highlighted title for full time */
        }

        /* Subtle top highlight for depth */
        .careers-job-card-dark::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%);
          z-index: 1;
        }
        
        .careers-job-card-dark.full-time-card::before {
           background: linear-gradient(90deg, rgba(252, 235, 79, 0) 0%, rgba(252, 235, 79, 0.4) 50%, rgba(252, 235, 79, 0) 100%);
        }

        .careers-job-card-dark:hover:not(.full-time-card) {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
        }
        
        .careers-job-card-dark.full-time-card:hover {
            transform: translateY(-6px);
        }

        .job-card-title-dark {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px 0;
          position: relative;
          z-index: 2;
        }

        .job-card-badge-dark {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
        }
        
        .job-card-badge-dark.design { background-color: rgba(59, 33, 79, 0.8); color: #d8b4e2; }
        .job-card-badge-dark.marketing { background-color: rgba(26, 42, 79, 0.8); color: #9bb7ed; }
        .job-card-badge-dark.engineering { background-color: rgba(30, 58, 41, 0.8); color: #a3d9b4; }
        .job-card-badge-dark.management { background-color: rgba(133, 90, 20, 0.8); color: #fceb4f; }
        
        .job-card-meta-dark {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }

        .job-card-desc-dark {
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 20px;
          color: #cbd5e1;
          position: relative;
          z-index: 2;
        }

        .job-card-duties-dark {
          position: relative;
          z-index: 2;
        }

        .job-card-duties-dark h4 {
          font-size: 1rem;
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .job-card-duties-dark ul {
          padding-left: 20px;
          margin-bottom: 20px;
          color: #cbd5e1;
        }

        .job-card-duties-dark li {
          font-size: 0.9rem;
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .job-card-skills-dark {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }

        .skill-tag-dark {
          background-color: transparent;
          color: #94a3b8;
          font-size: 0.85rem;
        }

        .skill-tag-dark:not(:last-child)::after {
          content: ' • ';
          color: #475569;
          margin-left: 8px;
        }

        .apply-btn-yellow {
          background-color: #fceb4f;
          color: #000000;
          border: none;
          border-radius: 6px;
          padding: 14px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          text-align: center;
          margin-top: auto;
          transition: background-color 0.2s ease, transform 0.2s ease;
          position: relative;
          z-index: 2;
        }

        .apply-btn-yellow:hover {
          background-color: #e5d444;
          transform: scale(1.02);
        }
      `}</style>

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

      {/* Internship Section (Moved below Apply Now / Hero Section) */}
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

      {/* Open Roles Cards Section */}
      <section className="careers-open-roles-section" id="open-roles">
        <div className="careers-container">
          <div className="careers-section-header">
            <h2>
              Open <span className="careers-ganglia-highlight">Roles</span>
            </h2>
            <p>Explore our open positions and find your perfect fit</p>
          </div>

          <div className="careers-job-cards-grid">
            {jobData.map(job => {
              const isFullTime = job.type === 'Full-time';
              return (
                <div key={job.id} className={`careers-job-card-dark ${isFullTime ? 'full-time-card' : ''}`}>
                  <h3 className={`job-card-title-dark ${isFullTime ? 'full-time-title' : ''}`}>{job.title}</h3>
                  
                  <div>
                    <span className={`job-card-badge-dark ${job.category}`}>
                      {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                    </span>
                  </div>
                  
                  <div className="job-card-meta-dark">
                    {job.type} • {job.location} • {job.level}
                  </div>
                  
                  <p className="job-card-desc-dark">{job.shortDescription}</p>
                  
                  <div className="job-card-duties-dark">
                    <h4>What You'll Do:</h4>
                    <ul>
                      {job.details["What You'll Do"].slice(0, 4).map((duty, idx) => (
                        <li key={idx}>{duty}</li>
                      ))}
                      {job.details["What You'll Do"].length > 4 && <li>...and more!</li>}
                    </ul>
                  </div>

                  <div className="job-card-skills-dark">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag-dark">{skill}</span>
                    ))}
                  </div>
                  
                  <button 
                    className="apply-btn-yellow"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/apply/${job.id}`, { replace: true });
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              );
            })}
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
                        {job.applicationTimeline && job.applicationTimeline.programStarts !== 'Immediate'
                          ? new Date(
                              job.applicationTimeline.programStarts
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : job.applicationTimeline ? job.applicationTimeline.programStarts : 'TBD'}
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
    </div>
  );
};

export default CareersPage;
