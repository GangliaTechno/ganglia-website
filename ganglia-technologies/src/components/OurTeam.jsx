import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OurTeam.css';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';

// Import local leadership team images
import team1 from '../assets/founders/team1.jpeg';
import team2 from '../assets/founders/team2.jpeg';
import team3 from '../assets/founders/team3.jpeg';
import team4 from '../assets/founders/team4.jpeg';
import team5 from '../assets/founders/team5.jpeg';
import team6 from '../assets/founders/team6.jpeg';
import team7 from '../assets/founders/team7.jpeg';
import team8 from '../assets/founders/team8.jpeg';

/* ───── Lazy-load base-64 images only when they scroll into view ──── */
const LazyImage = ({ src, alt }) => {
  const imgRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '150px' }
    );

    if (imgRef.current) io.observe(imgRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={show ? src : undefined}
      alt={alt}
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
};

// Static leadership team data with local images
const staticLeadershipTeam = [
  {
    id: 1,
    name: "DR DASHARATHARAJ K SHETTY",
    role: "Co-founder",
    imageSrc: team1,
    linkedin: "https://www.linkedin.com/in/dasharathraj/"
  },
  {
    id: 2,
    name: "DR BALAKRISHNA S MADODI",
    role: "Co-founder",
    imageSrc: team2,
    linkedin: "https://www.linkedin.com/in/dr-balakrishna-srinivas-maddodi-68874218/"
  },
  {
    id: 3,
    name: "DR SANDEEP S SHENOY",
    role: "Director",
    imageSrc: team3,
    linkedin: "https://www.linkedin.com/"
  },
  {
    id: 4,
    name: "NAMESH MALAROUT",
    role: "Chief Executive Officer",
    imageSrc: team4,
    linkedin: "https://www.linkedin.com/in/namesh-malarout-97375697/"
  },
  {
    id: 5,
    name: "SHREEPATHY RANGA BHATTA",
    role: "Director",
    imageSrc: team5,
    linkedin: "https://www.linkedin.com/in/shreepathy-ranga-bhatta-862a2b24a/"
  },
  {
    id: 6,
    name: "ANUSHA PAI",
    role: "Director",
    imageSrc: team6,
    linkedin: "https://www.linkedin.com/in/anusha-pai-013b0213/"
  },
  {
    id: 7,
    name: "DR MANU SUDHI",
    role: "Director",
    imageSrc: team7,
    linkedin: "https://www.linkedin.com/in/dr-manu-sudhi-609296167/"
  },
  {
    id: 8,
    name: "DR JAYARAJ M B",
    role: "Former Director (July 2022- March 2025)",
    imageSrc: team8,
    linkedin: "https://www.linkedin.com/in/dr-jayaraj-mymbilly-balakrishnan-71a15b6/"
  }
];

const OurTeam = () => {
  const location = useLocation();
  const [managementTeam, setManagementTeam] = useState([]);
  const [foundingInternTeam, setFoundingInternTeam] = useState([]);
  const [previousInternTeam, setPreviousInternTeam] = useState([]);
  const [internTeam, setInternTeam] = useState([]);
  const [otherTeamsLoaded, setOtherTeamsLoaded] = useState(false);
  const [loadingOtherTeams, setLoadingOtherTeams] = useState(false);
  const [error, setError] = useState(null);

  // Hash scrolling
  useEffect(() => {
    const handleHashScroll = () => {
      if (location.hash) {
        const attempts = [100, 300, 500, 800];
        attempts.forEach((delay) => {
          setTimeout(() => {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
            }
          }, delay);
        });
      }
    };

    handleHashScroll();
  }, [location.hash]);

  // Load other teams when button is clicked
  const loadOtherTeams = async () => {
    if (otherTeamsLoaded || loadingOtherTeams) return;

    setLoadingOtherTeams(true);
    
    try {
      const teamRef = ref(database, '/');
      const snapshot = await get(teamRef);

      if (!snapshot.exists()) {
        throw new Error('No team data found');
      }

      const data = snapshot.val();

      const processTeamImages = (team) => {
        if (!team || !Array.isArray(team)) {
          return [];
        }

        return team.map((member) => ({
          ...member,
          imageSrc:
            member.image && member.image.startsWith('data:image')
              ? member.image
              : member.image
              ? `data:image/png;base64,${member.image}`
              : null,
        }));
      };

      const [
        managementWithImages,
        foundingInternWithImages,
        previousInternWithImages,
        internWithImages,
      ] = await Promise.all([
        processTeamImages(
          data.managementTeam || data['Management Team'] || []
        ),
        processTeamImages(
          data.foundingInternTeam || data['Founding Intern Team'] || []
        ),
        processTeamImages(
          data.previousInternTeam || data['Previous Interns'] || []
        ),
        processTeamImages(data.internTeam || data['Intern Team'] || []),
      ]);

      setManagementTeam(managementWithImages);
      setFoundingInternTeam(foundingInternWithImages);
      setPreviousInternTeam(previousInternWithImages);
      setInternTeam(internWithImages);
      setOtherTeamsLoaded(true);
      setLoadingOtherTeams(false);
    } catch (err) {
      setError('Failed to load other team data');
      setLoadingOtherTeams(false);
      console.error('Error fetching other team data:', err);
    }
  };

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.ourteam-animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [otherTeamsLoaded]);

  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  // Updated TeamMember component to handle both local and base64 images
  const TeamMember = ({ member, isIntern = false, isLeadership = false }) => (
    <div
      className={`ourteam-member ${isIntern ? 'ourteam-intern-member' : ''}`}
    >
      <div
        className={`ourteam-member-photo ${
          isIntern ? 'ourteam-intern-photo' : ''
        }`}
      >
        {member.imageSrc ? (
          isLeadership ? (
            // For leadership team, use regular img tag since images are local
            <img
              src={member.imageSrc}
              alt={member.alt || member.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            // For other teams, use LazyImage for base64 images
            <LazyImage src={member.imageSrc} alt={member.alt || member.name} />
          )
        ) : (
          <div className="ourteam-image-placeholder">
            {member.name ? member.name.charAt(0).toUpperCase() : '?'}
          </div>
        )}
        {member.linkedin && (
          <div className="ourteam-linkedin-icon">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
          </div>
        )}
      </div>
      <h3>{member.name}</h3>
      <p className="ourteam-role">{member.role}</p>
    </div>
  );

  if (error) {
    return (
      <div className="ourteam-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="ourteam-hero-section">
        <div className="ourteam-container">
          <h1 className='ourteam-hero-title'>Our Team</h1>
          <div className="ourteam-hero-content">
            <p>
              <strong>Innovation is driven by visionaries:</strong> Founders
              with engineering and medical excellence, AI pioneers, global
              collaborators. Our culture is bold ideas, openness, and relentless
              execution. We champion diversity because the best breakthroughs
              thrive at intersections of different perspectives and experiences.
            </p>
          </div>
          <h2 className="ourteam-section-subtitle">
            Meet the Minds Behind Ganglia
          </h2>
        </div>
      </section>

      {/* Leadership Team - Always visible with local images */}
      <section
        id="leadership-team"
        className="ourteam-section"
        style={{ scrollMarginTop: '120px', paddingTop: '40px' }}
      >
        <div className="ourteam-container">
          <h2 className="ourteam-title">Leadership Team</h2>
          <div className="ourteam-contact-form ourteam-animate-on-scroll">
            <div className="ourteam-info ourteam-animate-on-scroll">
              <div className="ourteam-founding-grid">
                {staticLeadershipTeam.map((member) => (
                  <TeamMember 
                    key={member.id} 
                    member={member} 
                    isLeadership={true}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Load More Teams Button */}
          {!otherTeamsLoaded && (
            <div className="ourteam-load-more-container">
              <button 
                className="ourteam-load-more-btn"
                onClick={loadOtherTeams}
                disabled={loadingOtherTeams}
              >
                {loadingOtherTeams ? (
                  <>
                    <div className="ourteam-mini-spinner"></div>
                    Loading Other Teams...
                  </>
                ) : (
                  'Show Other Teams'
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Other Teams - Only shown after button click */}
      {otherTeamsLoaded && (
        <>
          {/* Management Team */}
          <section
            id="management-team"
            className="ourteam-section ourteam-management-section"
            style={{ scrollMarginTop: '120px', paddingTop: '40px' }}
          >
            <div className="ourteam-container">
              <h2 className="ourteam-title">Management Team</h2>
              <div className="ourteam-contact-form ourteam-animate-on-scroll">
                <div className="ourteam-info ourteam-animate-on-scroll">
                  <div className="ourteam-management-grid">
                    {managementTeam.map((member, index) => (
                      <TeamMember key={member.id || index} member={member} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Founding Intern Team */}
          <section
            id="founding-intern-team"
            className="ourteam-section ourteam-founding-intern-section"
            style={{ scrollMarginTop: '120px', paddingTop: '40px' }}
          >
            <div className="ourteam-container">
              <h2 className="ourteam-title">Founding Intern Team</h2>
              <div className="ourteam-contact-form ourteam-animate-on-scroll">
                <div className="ourteam-info ourteam-animate-on-scroll">
                  <div className="ourteam-intern-grid">
                    {foundingInternTeam.length > 0 ? (
                      foundingInternTeam.map((member, index) => (
                        <TeamMember
                          key={member.id || index}
                          member={member}
                          isIntern
                        />
                      ))
                    ) : (
                      <div className="ourteam-no-data">
                        <p>No founding intern team members found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Intern Team */}
          <section
            id="intern-team"
            className="ourteam-section ourteam-intern-section"
            style={{ scrollMarginTop: '120px', paddingTop: '40px' }}
          >
            <div className="ourteam-container">
              <h2 className="ourteam-title">Intern Team</h2>
              <div className="ourteam-contact-form ourteam-animate-on-scroll">
                <div className="ourteam-info ourteam-animate-on-scroll">
                  <div className="ourteam-intern-grid">
                    {internTeam.map((member, index) => (
                      <TeamMember
                        key={member.id || index}
                        member={member}
                        isIntern
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Previous Intern Team */}
          <section
            id="previous-intern-team"
            className="ourteam-section ourteam-previous-intern-section"
            style={{ scrollMarginTop: '120px', paddingTop: '40px' }}
          >
            <div className="ourteam-container">
              <h2 className="ourteam-title">Previous Intern Team</h2>
              <div className="ourteam-contact-form ourteam-animate-on-scroll">
                <div className="ourteam-info ourteam-animate-on-scroll">
                  <div className="ourteam-intern-grid">
                    {previousInternTeam.length > 0 ? (
                      previousInternTeam.map((member, index) => (
                        <TeamMember
                          key={member.id || index}
                          member={member}
                          isIntern
                        />
                      ))
                    ) : (
                      <div className="ourteam-no-data">
                        <p>No previous intern team members found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default OurTeam;
