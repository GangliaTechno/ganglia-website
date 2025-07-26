import React, { useState } from 'react';
import '../styles/CareersPage.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logob.png'; 

const CareersPage = () => {
 const [activeFilter, setActiveFilter] = useState('all');
 const [expandedCard, setExpandedCard] = useState(null);
 const [expandedJobCard, setExpandedJobCard] = useState(null);
 const [showApplicationModal, setShowApplicationModal] = useState(false);
 const [selectedJob, setSelectedJob] = useState(null);

 // Add navigation hook
 const navigate = useNavigate();

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
 title: "HR Lead",
 type: "Full-time",
 location: "On-site",
 level: "Senior",
 category: "management",
 description: "We are seeking an experienced HR Lead to spearhead our human resources operations and drive strategic HR initiatives that align with organizational objectives. This leadership role combines strategic thinking with operational excellence to manage all aspects of human capital development.",
 skills: ["Employment Law Knowledge", "HRIS Proficiency", "Data Analytics", "Leadership Skills"],
 detailedInfo: {
 coreResponsibilities: [
 "Design and implement comprehensive HR strategies that support business objectives",
 "Partner with executive leadership on workforce planning and organizational development",
 "Lead organizational transformation initiatives and guide teams through business changes",
 "Manage and mentor HR team members, providing coaching and professional development",
 "Oversee daily HR functions including recruitment, onboarding, and employee relations",
 "Create and implement HR policies and procedures ensuring legal compliance"
 ],
 requiredQualifications: [
 "Bachelor's degree in Human Resources, Business Administration, or related field",
 "5-8 years of progressive HR experience with minimum 3 years in leadership roles",
 "HR Certifications - SHRM-CP, SHRM-SCP, PHR, SPHR, or equivalent credentials",
 "Deep understanding of labor laws, compliance requirements, and regulatory changes",
 "Experience with HR information systems, ATS platforms, and performance management tools",
 "Proven ability to lead, influence, and develop high-performing teams"
 ],
 essentialSkills: [
 "Strategic thinking and ability to align HR initiatives with business strategy",
 "Exceptional communication abilities for all organizational levels",
 "Experience with HRIS, ATS, payroll systems, and performance management platforms",
 "Knowledge of compensation structures and benefits administration",
 "Skills in conflict resolution, mediation, and handling sensitive employee matters",
 "Project management abilities for complex HR initiatives"
 ],
 preferredQualifications: [
 "Master's degree in Human Resources Management, MBA, or related advanced degree",
 "Experience in complex, multi-location, or global organizations",
 "Background in diversity & inclusion, organizational development certifications",
 "Crisis management and business continuity planning experience"
 ]
 }
 },
 {
 id: 2,
 title: "Frontend Developer",
 type: "Full-time",
 location: "On-site",
 level: "senior",
 category: "engineering",
 description: "We are seeking a skilled Frontend Developer to join our development team and create exceptional user experiences through clean, efficient and responsive web applications.",
 skills: ["React", "JavaScript", "Next.js", "Version Control"]
 },
 {
 id: 3,
 title: "Backend Developer",
 type: "Full-time",
 location: "Hybrid",
 level: "Senior",
 category: "engineering",
 description: "We are seeking a skilled Backend Developer to join our development team and create robust, scalable server-side applications that power exceptional user experiences.",
 skills: ["server side languages", "Database Management", "API Development", "Version Control", "Package managers"]
 }
 ];

 const filteredJobs = activeFilter === 'all' 
 ? jobData 
 : jobData.filter(job => job.category === activeFilter);

 const handleApplyClick = (jobId) => {
 const job = jobData.find(j => j.id === jobId);
 setSelectedJob(job);
 setShowApplicationModal(true);
 };

 const closeModal = () => {
 setShowApplicationModal(false);
 setSelectedJob(null);
 };
 

 const handleInternshipApply = () => {
 console.log('Applying for internship');
 alert('Internship application form will be implemented here');
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

 return (
 <div className="careers-page">
 {/* Application Modal */}
 {showApplicationModal && selectedJob && (
 <div className="modal-overlay" onClick={closeModal}>
 <div className="application-modal" onClick={(e) => e.stopPropagation()}>
 <div className="modal-header">
 <h2>Apply for {selectedJob.title}</h2>
 <button className="close-modal" onClick={closeModal}>×</button>
 </div>
 <div className="modal-content">
 <div className="job-overview">
 <div className="job-meta-info">
 <span className="job-type">{selectedJob.type}</span>
 <span className="job-location">{selectedJob.location}</span>
 <span className="job-level">{selectedJob.level}</span>
 </div>
 <p className="job-description">{selectedJob.description}</p>
 </div>
 
 {renderDetailedInfo(selectedJob)}
 
 <div className="modal-actions">
 <button className="cancel-btn" onClick={closeModal}>
 Cancel
 </button>
 <button
 className="submit-application-btn"
 onClick={(e) => {
 e.stopPropagation(); // Handle it here instead
 navigate(`/apply/${selectedJob.id}`, {
 state: { jobTitle: selectedJob.title }
 });
 closeModal(); // Now we can call it without parameters
 }}
>
 Apply for this role
</button>

 </div>
 </div>
 </div>
 </div>
 )}

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
 <h2>Why Choose <span className="careers-ganglia-highlight">Ganglia ?</span></h2>
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
