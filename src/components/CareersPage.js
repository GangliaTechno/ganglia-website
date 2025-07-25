import React, { useState } from 'react';
import '../styles/CareersPage.css';
import Footer from './Footer';
import logo from '../assets/logob.png'; 

const CareersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedJobCard, setExpandedJobCard] = useState(null);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleCardClick = (cardIndex) => {
    setExpandedCard(expandedCard === cardIndex ? null : cardIndex);
  };

  const handleJobCardClick = (jobId) => {
    setExpandedJobCard(expandedJobCard === jobId ? null : jobId);
  };

  const imageCardsData = [
    {
      title: "Development Team",
      description: "Building next-gen healthcare solutions",
      gradient: "linear-gradient(135deg, #037ee5 0%, #4489ca 100%)"
    },
    {
      title: "Research Lab", 
      description: "AI-powered medical diagnostics",
      gradient: "linear-gradient(135deg, #4489ca 0%, #64b5f6 100%)"
    },
    {
      title: "Design Studio",
      description: "Crafting intuitive user experiences", 
      gradient: "linear-gradient(135deg, #64b5f6 0%, #81e4f9 100%)"
    },
    {
      title: "Collaboration Spaces",
      description: "Where innovation happens",
      gradient: "linear-gradient(135deg, #037ee5 0%, #10389d 100%)"
    }
  ];

  const jobData = [
    {
      id: 1,
      title: "Senior UI/UX Designer",
      type: "Full-time",
      location: "Remote/Hybrid",
      level: "Senior",
      category: "design",
      description: "Lead the design of intuitive healthcare interfaces that directly impact patient care. Work with cutting-edge AI tools and collaborate with world-class engineering teams.",
      skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
      posted: "Posted 2 days ago"
    },
    {
      id: 2,
      title: "Frontend Developer",
      type: "Full-time",
      location: "On-site",
      level: "Mid-level",
      category: "engineering",
      description: "Build responsive, scalable web applications using modern React frameworks. Join our mission to create seamless user experiences in healthcare technology.",
      skills: ["React", "TypeScript", "Next.js", "GraphQL"],
      posted: "Posted 5 days ago"
    },
    {
      id: 3,
      title: "Backend Engineer",
      type: "Full-time",
      location: "Hybrid",
      level: "Senior",
      category: "engineering",
      description: "Architect and build robust APIs and microservices that power our healthcare platform. Work with AI/ML pipelines and handle millions of patient data points securely.",
      skills: ["Python", "Node.js", "AWS", "Docker"],
      posted: "Posted 1 week ago"
    }
  ];

  const filteredJobs = activeFilter === 'all' 
    ? jobData 
    : jobData.filter(job => job.category === activeFilter);

  const handleApplyClick = (jobId) => {
    console.log(`Applying for job ID: ${jobId}`);
    alert('Application form will be implemented here');
  };

  const handleInternshipApply = () => {
    console.log('Applying for internship');
    alert('Internship application form will be implemented here');
  };

  return (
    <div className="careers-page">
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
              <span className="careers-stat-number">50+</span>
              <span className="careers-stat-label">Team Members</span>
            </div>
            <div className="careers-stat">
              <span className="careers-stat-number">15+</span>
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
            <h2>Why Choose Ganglia?</h2>
            <p>We're not just building technology—we're shaping the future</p>
          </div>
          <div className="careers-benefits-grid">
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">💡</div>
              <h3>Innovation First</h3>
              <p>Work on cutting-edge projects that push the boundaries of what's possible in healthcare technology.</p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">🌱</div>
              <h3>Growth & Learning</h3>
              <p>Continuous learning opportunities with mentorship from industry experts and access to latest technologies.</p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">🤝</div>
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
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                className={`careers-job-card ${expandedJobCard === job.id ? 'expanded' : 'collapsed'}`} 
                data-category={job.category}
                onClick={() => handleJobCardClick(job.id)}
              >
                {/* Mobile Rectangle View - Title Only */}
                <div className="careers-job-card-content">
                  <div className="careers-job-card-title-only">
                    {job.title}
                  </div>
                </div>

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
                  <p className="careers-job-description">{job.description}</p>
                  <div className="careers-job-skills">
                    {job.skills.map((skill, index) => (
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
            ))}
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
              <div className="careers-highlight-icon">🎓</div>
              <h3>Learn from Experts</h3>
              <p>Work directly with senior engineers, designers, and product managers who are leaders in healthcare technology.</p>
            </div>
            <div className="careers-highlight-card">
              <div className="careers-highlight-icon">🔬</div>
              <h3>Real-World Projects</h3>
              <p>Contribute to actual product features and research initiatives that impact thousands of healthcare professionals.</p>
            </div>
            <div className="careers-highlight-card">
              <div className="careers-highlight-icon">🚀</div>
              <h3>Career Launch</h3>
              <p>Kickstart your career with a company that's revolutionizing healthcare.</p>
            </div>
          </div>
          
          <div className="careers-image-cards-container">
            {imageCardsData.map((card, index) => (
              <div 
                key={index}
                className={`careers-image-card ${expandedCard === index ? 'expanded' : 'collapsed'}`}
                onClick={() => handleCardClick(index)}
              >
                <div 
                  className="careers-image-card-content"
                  style={{
                    background: card.gradient,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div className="careers-image-card-title">
                    {card.title}
                  </div>
                </div>
                <div className="careers-image-overlay">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="careers-call-to-action">
            <div className="careers-cta-content">
              <h3><span className="careers-highlight">Opportunities</span> like this don't wait</h3>
              <p className="careers-cta-subtitle">Join the next generation of healthcare innovators</p>
              <div className="careers-application-info">
                <div className="careers-application-timeline">
                  <div className="careers-timeline-item">
                    <div className="careers-timeline-date">Jan 15, 2026</div>
                    <div className="careers-timeline-event">Applications Open</div>
                  </div>
                  <div className="careers-timeline-item">
                    <div className="careers-timeline-date">Mar 1, 2026</div>
                    <div className="careers-timeline-event">Final Deadline</div>
                  </div>
                  <div className="careers-timeline-item">
                    <div className="careers-timeline-date">Jun 1, 2026</div>
                    <div className="careers-timeline-event">Program Starts</div>
                  </div>
                </div>
                <button 
                  className="careers-date-button" 
                  onClick={handleInternshipApply}
                >
                  Apply for Internship
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default CareersPage;