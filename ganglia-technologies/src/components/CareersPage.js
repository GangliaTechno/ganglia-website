import React, { useState, useRef } from 'react';
import '../styles/CareersPage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logob.png';
import { useRouteLoader } from '../hooks/useRouteLoader';
import { Player } from '@lottiefiles/react-lottie-player';
import innovation from '../assets/innovation.json';
import learning from '../assets/learning.json';
import collaboration from '../assets/collaboration.json';

// Hardcoded Jobs Array - Updated to reflect requested changes
const jobData = [
  {
    id: 'technical-project-manager',
    title: 'Technical Project Manager',
    category: 'management',
    type: 'Full-time',
    location: 'In-Person',
    level: 'Mid Level',
    status: 'closed', // Mark as closed
    shortDescription:
      "Drive end-to-end technical projects, providing leadership, and giving strategic inputs across multiple initiatives. Bring your experience to architect solutions, mentor a team, and manage project lifecycles.",
    details: {
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
    id: 'android-developer',
    title: 'Android Developer',
    category: 'engineering',
    type: 'Internship',
    location: 'In-Person',
    level: 'Entry Level',
    shortDescription:
      "Build Android apps from scratch. You'll work on building real features inside our Android app. This means writing code, connecting to our backend, handling user logins, and making sure things don't break. Proficiency in Android Studio is highly important for this role.",
    details: {
      "Note for Newcomers": [
        "If you've built a simple Android app in college or on your own — even if it's just a to-do list — that's a great start. Kotlin is a plus but not a blocker; we're happy to help you pick it up."
      ]
    },
    posted: ' ',
    skills: ['Android Studio (Crucial)', 'Firebase', 'REST APIs', 'Git', 'GitHub', 'Kotlin', 'AI debugging tools'],
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
      {/* Dynamic CSS injected for the job cards to implement Glassmorphism, specific stylings, and responsiveness */}
      <style>{`
        /* Responsive 3-column Grid */
        .careers-job-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 40px;
        }

        /* Glassmorphism Styles & Square Aspect Ratio */
        .careers-job-card-dark {
          position: relative;
          background: rgba(17, 21, 38, 0.45); 
          backdrop-filter: blur(12px); 
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08); 
          border-radius: 16px; 
          padding: 32px; /* Increased padding */
          display: flex;
          flex-direction: column;
          color: #e2e8f0;
          text-align: left;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); 
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          aspect-ratio: 1 / 1; /* Force square shape */
        }

        /* Full-Time Specific Styling */
        .careers-job-card-dark.full-time-card {
          border: 1px solid rgba(252, 235, 79, 0.3);
          background: rgba(25, 22, 10, 0.45); 
        }
        
        .careers-job-card-dark.full-time-card:hover {
          border-color: rgba(252, 235, 79, 0.8);
          box-shadow: 0 12px 40px 0 rgba(252, 235, 79, 0.15);
        }

        .job-card-title-dark.full-time-title {
          color: #fceb4f; 
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
          margin: 0 0 12px 0;
          position: relative;
          z-index: 2;
        }

        .job-card-badge-dark {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }
        
        .job-card-badge-dark.design { background-color: rgba(59, 33, 79, 0.8); color: #d8b4e2; }
        .job-card-badge-dark.marketing { background-color: rgba(26, 42, 79, 0.8); color: #9bb7ed; }
        .job-card-badge-dark.engineering { background-color: rgba(30, 58, 41, 0.8); color: #a3d9b4; }
        .job-card-badge-dark.management { background-color: rgba(133, 90, 20, 0.8); color: #fceb4f; }
        
        .job-card-meta-dark {
          font-size: 0.9rem;
          color: #94a3b8;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }

        .job-card-desc-dark {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 24px;
          color: #cbd5e1;
          position: relative;
          z-index: 2;
          flex-grow: 1; /* Pushes the button and skills to the bottom */
          overflow-y: auto; /* Handles text overflow gracefully */
          padding-right: 8px; /* Room for potential scrollbar */
        }

        /* Custom scrollbar for description */
        .job-card-desc-dark::-webkit-scrollbar {
          width: 4px;
        }
        .job-card-desc-dark::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05); 
        }
        .job-card-desc-dark::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2); 
          border-radius: 10px;
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
          border-radius: 8px;
          padding: 16px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          text-align: center;
          margin-top: auto;
          transition: background-color 0.2s ease, transform 0.2s ease;
          position: relative;
          z-index: 2;
        }

        .apply-btn-yellow:hover:not(:disabled) {
          background-color: #e5d444;
          transform: scale(1.02);
        }

        /* Disabled / Closed State Styling */
        .apply-btn-yellow:disabled {
          background-color: #334155;
          color: #94a3b8;
          cursor: not-allowed;
          opacity: 0.8;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .careers-job-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .careers-job-cards-grid {
            grid-template-columns: 1fr;
          }
          .careers-job-card-dark {
             aspect-ratio: auto; /* Disable square strictly on mobile to prevent clipping */
             min-height: 400px;
          }
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
              const isClosed = job.status === 'closed';

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
                  
                  <div className="job-card-skills-dark">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag-dark">{skill}</span>
                    ))}
                  </div>
                  
                  <button 
                    className="apply-btn-yellow"
                    disabled={isClosed}
                    onClick={() => {
                      if (!isClosed) {
                        window.scrollTo(0, 0);
                        navigate(`/apply/${job.id}`, { replace: true });
                      }
                    }}
                  >
                    {isClosed ? 'Closed' : 'Apply Now'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
