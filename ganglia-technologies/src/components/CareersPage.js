import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/CareersPage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logob.png';
// Removed Firebase imports since we use hardcoded data instead

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

// Hardcoded Jobs Array as per your provided data format
const jobData = [
  {
    id: 'backend-intern-2026',
    title: 'Back-end Developer Intern',
    category: 'engineering',
    type: 'Internship',
    location: 'Manipal, Karnataka (In-Person)',
    level: 'Student',
    shortDescription:
      "Join Ganglia Technologies as a Back-end Developer Intern and get hands-on experience building the infrastructure behind our advanced biomedical and AI systems. You’ll be solving real-world problems, working on scalable server-side logic, and collaborating with a high-performance team in a fast-growing tech environment.",
    details: {
      "Eligibility Conditions & Duration": [
        "Open to students currently pursuing UG/PG in Computer Science, Information Technology, Software Engineering, or related fields.",
        "Must have completed at least one academic project involving server-side development.",
        "Internship duration: Minimum 60 days, extendable based on performance and ongoing project requirements."
      ],
      "Project Responsibilities": [
        "Develop and maintain scalable back-end logic, APIs, and server infrastructure for Ganglia’s biomedical and AI platforms.",
        "Work with databases (SQL/MongoDB) to structure and manage data efficiently.",
        "Integrate third-party APIs and services, and ensure system security and data protection.",
        "Collaborate with front-end developers and DevOps engineers to deliver full-stack features.",
        "Write clean, efficient, and well-documented code, and contribute to version control repositories."
      ],
      "General Information": [
        "Only Indian nationals are eligible for this internship.",
        "Internship will be based out of Manipal, Karnataka, in an in-person mode.",
        "Interns must bring their own devices and be available for a minimum of 5 hours/day."
      ],
      "Skills Required": [
        "Proficiency in at least one back-end language: Node.js, Python (Django/Flask), or Java (Spring Boot)",
        "Strong understanding of REST APIs, Databases (MySQL, MongoDB), and Authentication Protocols (JWT, OAuth).",
        "Familiarity with Git, Postman, and Docker is a plus."
      ]
    },
    posted: 'Applications open year-round',
    skills: ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'APIs', 'Git'],
    applicationTimeline: {
      applicationsOpen: '2025-12-01',
      finalDeadline: '2026-01-10',
      programStarts: '2026-02-01'
    }
  },
   {
    id: 'hr-operations-executive',
    title: 'HR/Operations Executive',
    category: 'management', // or 'operations' if you want a custom category and filter for it
    type: 'Full-Time',
    location: 'Manipal, Karnataka',
    level: 'Entry Level',
    shortDescription:
      "Join Ganglia Technologies as an HR/Operations Executive and play a vital role in shaping our people and processes. From recruitment and documentation to supporting daily operations and maintaining company culture, this role is perfect for dynamic individuals who thrive in fast-paced, innovation-driven environments. Ideal for fresh graduates or early professionals ready to grow with a leading biomedical and AI company based in Manipal.",
    details: {
      "Eligibility Conditions & Duration": [
        "Open to individuals with a Bachelor’s or Master’s degree in Human Resources / Business Administration / Management / Commerce / Psychology or related fields.",
        "Candidate must have strong communication skills, time management, and a proactive attitude.",
        "Minimum commitment period: 6 months (probation), extendable based on performance.",
        "Preference will be given to candidates currently residing in or willing to relocate to Manipal, Karnataka."
      ],
      "Core Responsibilities": [
        "Support end-to-end recruitment cycle including job postings, screening, and scheduling interviews.",
        "Maintain employee records, HR databases, and internal documentation (leaves, attendance, onboarding/offboarding).",
        "Assist in the planning and execution of internal events, team-building activities, and training programs.",
        "Liaise with various departments to support daily operations and resolve administrative bottlenecks.",
        "Monitor internship programs, manage documentation, and coordinate evaluations.",
        "Uphold company culture and ensure adherence to policies and operational protocols."
      ],
      "General Information": [
        "Only Indian nationals are eligible for this role.",
        "Selected candidates will undergo a short induction and training phase.",
        "Performance reviews will be conducted every 6 months with scope for permanent placement and leadership roles.",
        "Candidates must demonstrate discretion, reliability, and an interest in working in a fast-paced tech and biomedical R&D environment."
      ]
    },
    posted: 'Applications open year-round',
    skills: ['Recruitment', 'Communication', 'Time Management', 'HR Documentation', 'Event Planning'],
    applicationTimeline: {
      applicationsOpen: '2025-01-01',  // Placeholder dates, adjust as needed
      finalDeadline: 'Year-round',
      programStarts: 'Immediate'
    }
  },
  {
    id: 'frontend-intern-2026',
    title: 'Front-End Developer Intern',
    category: 'engineering',
    type: 'Internship',
    location: 'Manipal, Karnataka (Hybrid Options)',
    level: 'Student',
    shortDescription:
      "Kickstart your career in web development with a hands-on Front-end Developer Internship at Ganglia Technologies. You'll work alongside a dynamic tech team on real-world projects that power cutting-edge biomedical and AI applications. Learn, build, and innovate in an environment designed to accelerate your growth.",
    details: {
      "Eligibility Conditions & Duration": [
        "Open to students currently pursuing UG/PG in Computer Science, Information Technology, Web Development, or related fields from a recognized university/institution in India.",
        "Must have completed at least 1 major academic project involving web technologies (HTML, CSS, JS, React/Angular).",
        "Internship duration: Minimum 60 days with possibility of extension based on performance and project needs."
      ],
      "Project Responsibilities": [
        "Assist in developing responsive and user-friendly web interfaces using modern front-end frameworks like React.js or Vue.js.",
        "Collaborate with UI/UX designers to translate design wireframes into high-quality code.",
        "Integrate front-end components with back-end APIs.",
        "Debug, test, and optimize code for performance and scalability.",
        "Participate in daily team stand-ups, sprint reviews, and documentation."
      ],
      "General Information": [
        "Only Indian nationals are eligible for this internship.",
        "Based in Manipal, Karnataka. Hybrid options may be available depending on project and mentor availability.",
        "Interns must carry their own laptops and be available for minimum 5 hours/day."
      ],
      "Skills Required": [
        "Proficiency in HTML5, CSS3, JavaScript",
        "Familiarity with React.js, Git, REST APIs",
        "Knowledge of version control, responsive design, and cross-browser compatibility",
        "Bonus: Experience with Figma, TailwindCSS, Next.js, or TypeScript"
      ]
    },
    posted: 'Applications open year-round',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Git', 'REST APIs'],
    applicationTimeline: {
      applicationsOpen: '2025-01-01', // Placeholder, adjust if needed
      finalDeadline: 'Year-round',
      programStarts: 'Project dependent'
    }
  },
    {
    id: 'aiml-intern-rd-2026',
    title: 'AI/ML Engineering Intern - R&D',
    category: 'engineering',
    type: 'Internship',
    location: 'Manipal, Karnataka (Hybrid Options)',
    level: 'Student',
    shortDescription:
      "Ganglia Technologies is looking for passionate AI/ML Research Interns to join our R&D team. If you're excited about real-world applications of AI and want to contribute to impactful research in healthcare and technology, this internship offers a chance to collaborate on academic publications, cutting-edge experiments, and applied AI innovation.",
    details: {
      "Eligibility Conditions & Duration": [
        "Open to UG/PG/PhD students pursuing studies in Artificial Intelligence, Machine Learning, Data Science, Computer Science, or related fields from recognized institutions in India.",
        "Candidates should have academic writing skills and a proven interest in AI/ML research (coursework, minor thesis, or publications).",
        "Duration: Minimum 90 days (extendable based on performance and research requirements)."
      ],
      "Research Responsibilities": [
        "Collaborate with R&D team members on AI/ML research projects in biomedical, healthcare, and industrial applications.",
        "Assist in literature reviews, model development, experimentation, and result interpretation.",
        "Work on drafting, editing, and formatting research papers for journal/conference submissions (IEEE, Springer, Elsevier, etc.).",
        "Contribute to data collection, preprocessing, feature engineering, and model evaluation using real-world datasets.",
        "Participate in research presentations, documentation, and internal reviews."
      ],
      "General Information": [
        "Only Indian nationals are eligible for this research internship.",
        "Based at Ganglia Technologies – Manipal, Karnataka. Hybrid mode may be offered to eligible candidates.",
        "Interns must bring their own laptop and dedicate at least 20 hours/week."
      ],
      "Skills Required": [
        "Proficiency in Python, with libraries such as NumPy, Pandas, scikit-learn, TensorFlow, or PyTorch.",
        "Understanding of AI/ML concepts, including supervised/unsupervised learning, evaluation metrics, and statistical techniques.",
        "Ability to conduct academic research, write formal documentation, and summarize technical content.",
        "Bonus: Familiarity with LaTeX, research publication formats, or tools like Jupyter Notebooks, Kaggle, Zotero/Mendeley."
      ]
    },
    posted: 'Applications open year-round',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Research', 'Data Science', 'Academic Writing'],
    applicationTimeline: {
      applicationsOpen: '2025-01-01',
      finalDeadline: 'Year-round',
      programStarts: 'Project dependent'
    }
  },
  {
  id: 'cad-engineering-intern',
  title: 'CAD Engineering Intern',
  category: 'engineering',
  type: 'Internship',
  location: 'Manipal, Karnataka (On-site)',
  level: 'Student',
  shortDescription:
    "Join Ganglia Technologies as a CAD Engineering Intern and take your design skills from concept to creation. Work alongside engineers and researchers on real hardware products in the biomedical and AI space. Gain hands-on experience in CAD modelling, prototyping, and product development in a fast-paced R&D environment.",
  details: {
    "Eligibility Conditions & Duration": [
      "Open to UG/PG students in Mechanical Engineering, Mechatronics, Product Design, or related fields.",
      "Applicants must have prior exposure to 3D CAD modelling and technical drawings.",
      "Internship duration: Minimum 60 days, extendable based on performance and design cycles.",
      "Candidates must be comfortable working on-site in a lab-based hardware environment at Manipal, Karnataka."
    ],
    "Project Responsibilities": [
      "Design, modify, and review 3D CAD models for biomedical and R&D hardware products.",
      "Create technical drawings, assembly diagrams, and exploded views for prototyping and production.",
      "Collaborate with the engineering and R&D team to convert concepts into manufacturable components.",
      "Participate in hardware prototyping, testing, and iterative improvements.",
      "Maintain version control of CAD files and assist with BOM (Bill of Materials) documentation."
    ],
    "General Information": [
      "Only Indian nationals are eligible for this internship.",
      "Internship is on-site at Ganglia Technologies, Manipal.",
      "Interns must bring their own laptops (with design software installed if applicable) and be available for at least 5 hours/day."
    ],
    "Skills Required": [
      "Proficiency in at least one CAD tool: SolidWorks, Fusion 360, AutoCAD, or CATIA.",
      "Understanding of design for manufacturing (DFM) principles and tolerance analysis.",
      "Familiarity with 3D printing, CNC machining, or hardware prototyping workflows is a strong plus.",
      "Bonus: Experience with simulation tools, sheet metal design, or medical device components."
    ]
  },
  posted: 'Applications open year-round',
  skills: ['CAD', 'SolidWorks', 'Fusion 360', 'AutoCAD', 'CATIA', '3D Modelling', 'DFM'],
  applicationTimeline: {
    applicationsOpen: '2025-01-01',
    finalDeadline: 'Year-round',
    programStarts: 'Project dependent'
  }
},
{
  id: 'marketing-branding-intern',
  title: 'Marketing/Branding Intern',
  category: 'design', // Could also be 'marketing' if you add that filter
  type: 'Internship',
  location: 'Manipal, Karnataka (Hybrid Options)',
  level: 'Student',
  shortDescription:
    "Looking to build a brand from the ground up? Join Ganglia Technologies as a mid-level Marketing Intern and work directly with company leadership to create a luxury brand—from logo to packaging to market entry strategy. Ideal for strategic, design-savvy individuals who want to leave their creative fingerprint on a bold, future-forward product line.",
  details: {
    "Eligibility Conditions & Duration": [
      "Open to students or recent graduates from Design, Marketing, Branding, Mass Communication, or Business Strategy backgrounds.",
      "Must have portfolio or prior experience in branding, product design, or marketing campaigns (academic or freelance).",
      "Duration: Minimum 90 days, with high-performance interns eligible for extended projects and leadership grooming.",
      "Must be able to dedicate at least 25 hours/week and work closely with the board members and creative leads."
    ],
    "Key Responsibilities": [
      "Assist in developing luxury product brands from scratch – including brand identity, brand story, logo, logo-marks, and brand guidelines.",
      "Work on product and packaging design for high-end product segments in healthcare, wellness, and tech-enabled goods.",
      "Co-develop the Market Entry Strategy, including competitor analysis, brand positioning, and go-to-market plans.",
      "Design and implement Social Media Strategy across platforms (Instagram, LinkedIn, Substack, X, etc.) – covering both organic and paid initiatives.",
      "Collaborate with stakeholders across design, R&D, and marketing to ensure brand consistency and quality.",
      "Contribute to the preparation of marketing pitches, investor decks, and campaign rollout calendars."
    ],
    "General Information": [
      "Only Indian nationals are eligible for this internship.",
      "Hybrid format available: Internship can be pursued remotely with regular online meetings, or from the Ganglia HQ in Manipal, Karnataka.",
      "Interns must maintain high-quality, timely communication and provide weekly progress updates.",
      "Certificate of Internship, Letter of Recommendation, and strong portfolio projects upon completion. PPO opportunity available."
    ],
    "Skills Required": [
      "Proficiency in branding, graphic design, or marketing strategy.",
      "Hands-on experience with tools such as Figma, Adobe Creative Suite, Canva, or similar.",
      "Understanding of luxury branding, visual storytelling, and packaging trends.",
      "Bonus: Familiarity with content calendars, digital ads, and consumer psychology."
    ]
  },
  posted: 'Applications open year-round',
  skills: ['Branding', 'Graphic Design', 'Marketing Strategy', 'Figma', 'Adobe Creative Suite', 'Social Media', 'Packaging Design'],
  applicationTimeline: {
    applicationsOpen: '2025-01-01',
    finalDeadline: 'Year-round',
    programStarts: 'Project dependent'
  }
}

];
  // Add other jobs here in same format if needed



const CareersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedJobCard, setExpandedJobCard] = useState(null);

  // Responsive: detect mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();

  const handleFilterChange = (filter) => setActiveFilter(filter);
  const handleCardClick = (cardIndex) => setExpandedCard(expandedCard === cardIndex ? null : cardIndex);

  // Filtered jobs for display
  const filteredJobs = activeFilter === 'all'
    ? jobData
    : jobData.filter(job => job.category === activeFilter);

  const totalJobCount = jobData.length;

  // Navigate with full detail object passed as "jobDescription"
  const handleApplyClick = (jobId) => {
    const job = jobData.find(j => j.id === jobId);
    if (!job) return;
    navigate(`/apply/${job.id}`, {
      state: {
        jobTitle: job.title,
        jobDescription: job.details, // pass full details for application form
      },
      replace: false,
    });
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
                      {/* Show only shortDescription on job card */}
                      <p className="careers-job-description">{job.shortDescription}</p>
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
                        {job.applicationTimeline ? new Date(job.applicationTimeline.applicationsOpen).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'TBD'}
                      </td>
                      <td className="date-cell deadline-cell">
                        {job.applicationTimeline ? new Date(job.applicationTimeline.finalDeadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'TBD'}
                      </td>
                      <td className="date-cell">
                        {job.applicationTimeline ? new Date(job.applicationTimeline.programStarts).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'TBD'}
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
