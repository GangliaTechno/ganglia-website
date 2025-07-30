import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OurTeam.css';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';


const OurTeam = () => {
  const location = useLocation(); 
  const [foundingTeam, setFoundingTeam] = useState([]);
  const [managementTeam, setManagementTeam] = useState([]);
  const [foundingInternTeam, setFoundingInternTeam] = useState([]);
  const [previousInternTeam, setPreviousInternTeam] = useState([]);
  const [internTeam, setInternTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hash scrolling with correct dependencies for ESLint
  useEffect(() => {
    const handleHashScroll = () => {
      if (location.hash) {
        // Try multiple times with increasing delays to ensure DOM is ready
        const attempts = [100, 300, 500, 800];
        attempts.forEach((delay) => {
          setTimeout(() => {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            }
          }, delay);
        });
      }
    };

    handleHashScroll();
  }, [location.hash, loading]); // Fixed: use location.hash, not location

  useEffect(() => {
    if (!loading && location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 200);
    }
  }, [loading, location.hash]);

  useEffect(() => {
    const fetchTeamData = async () => {
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
            imageSrc: member.image && member.image.startsWith('data:image')
              ? member.image
              : member.image 
                ? `data:image/png;base64,${member.image}`
                : null,
          }));
        };

        const [
          foundingWithImages,
          managementWithImages,
          foundingInternWithImages,
          previousInternWithImages,
          internWithImages
        ] = await Promise.all([
          processTeamImages(data.foundingTeam || data['Founding Team'] || []),
          processTeamImages(data.managementTeam || data['Management Team'] || []),
          processTeamImages(data.foundingInternTeam || data['Founding Intern Team'] || []),
          processTeamImages(data.previousInternTeam || data['Previous Interns'] || []),
          processTeamImages(data.internTeam || data['Intern Team'] || []),
        ]);

        setFoundingTeam(foundingWithImages);
        setManagementTeam(managementWithImages);
        setFoundingInternTeam(foundingInternWithImages);
        setPreviousInternTeam(previousInternWithImages);
        setInternTeam(internWithImages);
        setLoading(false);
      } catch (err) {
        setError('Failed to load team data');
        setLoading(false);
        console.error('Error fetching team data:', err);
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    if (!loading) {
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
    }
  }, [loading]);

  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const TeamMember = ({ member, isIntern = false }) => (
    <div className={`ourteam-member ${isIntern ? 'ourteam-intern-member' : ''}`}>
      <div className={`ourteam-member-photo ${isIntern ? 'ourteam-intern-photo' : ''}`}>
        {member.imageSrc ? (
          <img src={member.imageSrc} alt={member.alt || member.name} />
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

  if (loading) {
    return (
      <div className="ourteam-loading">
        <div className="ourteam-spinner"></div>
        <p>Loading team data...</p>
      </div>
    );
  }

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
      <section className="ourteam-hero-section">
        <div className="ourteam-container">
          <h1>Our Team</h1>
          <div className="ourteam-hero-content">
            <p>
              <strong>Innovation is driven by visionaries:</strong> Founders with engineering and
              medical excellence, AI pioneers, global collaborators. Our culture is bold ideas,
              openness, and relentless execution. We champion diversity because the best
              breakthroughs thrive at intersections of different perspectives and experiences.
            </p>
          </div>
          <h2 className="ourteam-section-subtitle">Meet the Minds Behind Ganglia</h2>
        </div>
      </section>

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
                {foundingTeam.map((member, index) => (
                  <TeamMember key={member.id || index} member={member} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    <TeamMember key={member.id || index} member={member} isIntern={true} />
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
                  <TeamMember key={member.id || index} member={member} isIntern={true} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    <TeamMember key={member.id || index} member={member} isIntern={true} />
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

    </div>
  );
};

export default OurTeam;
