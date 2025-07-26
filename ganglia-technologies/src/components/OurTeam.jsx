import React, { useEffect, useState } from 'react';
import '../styles/OurTeam.css';
import Footer from './Footer';
// Import Firebase database and storage
import { database } from '../firebase/config';
import { ref, get } from 'firebase/database';

const OurTeam = () => {
  const [foundingTeam, setFoundingTeam] = useState([]);
  const [managementTeam, setManagementTeam] = useState([]);
  const [internTeam, setInternTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team data from Firebase (images are now URLs)
  const fetchTeamDataFromFirebase = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Reference to the team data node in Firebase
      const teamRef = ref(database, 'teamData');
      
      const snapshot = await get(teamRef);
      
      if (snapshot.exists()) {
        const teamData = snapshot.val();
        
        // No need to process images anymore - they're already URLs from Firebase Storage
        setFoundingTeam(teamData.foundingTeam || []);
        setManagementTeam(teamData.managementTeam || []);
        setInternTeam(teamData.internTeam || []);
      } else {
        console.log('No team data available');
        setFoundingTeam([]);
        setManagementTeam([]);
        setInternTeam([]);
      }
    } catch (err) {
      console.error('Error fetching team data from Firebase:', err);
      setError('Failed to load team data. Please try again later.');
      setFoundingTeam([]);
      setManagementTeam([]);
      setInternTeam([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamDataFromFirebase();
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

  const TeamMember = ({ member, isIntern = false }) => {
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <div className={`ourteam-member ${isIntern ? 'ourteam-intern-member' : ''}`}>
        <div className={`ourteam-member-photo ${isIntern ? 'ourteam-intern-photo' : ''}`}>
          {!imageError ? (
            <img 
              src={member.imageUrl || member.image} 
              alt={member.alt}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="ourteam-image-placeholder">
              <span>{member.name.charAt(0)}</span>
            </div>
          )}
          <div className="ourteam-linkedin-icon">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <h3>{member.name}</h3>
        <p className="ourteam-role">{member.role}</p>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="ourteam-loading">
        <div className="ourteam-spinner"></div>
        <p>Loading team data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="ourteam-error">
        <p className="ourteam-error-message">{error}</p>
        <button onClick={fetchTeamDataFromFirebase} className="ourteam-retry-btn">
          Try Again
        </button>
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

      {/* Founding Team Section */}
      <section className="ourteam-section">
        <div className="ourteam-container">
          <h2 className="ourteam-title">Founding Team</h2>
          <div className="ourteam-contact-form ourteam-animate-on-scroll">
            <div className="ourteam-info ourteam-animate-on-scroll">
              {foundingTeam.length > 0 ? (
                <div className="ourteam-founding-grid">
                  {foundingTeam.map((member) => (
                    <TeamMember key={member.id} member={member} />
                  ))}
                </div>
              ) : (
                <div className="ourteam-no-data">
                  <p>No founding team members available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Management Team Section */}
      <section className="ourteam-section ourteam-management-section">
        <div className="ourteam-container">
          <h2 className="ourteam-title">Management Team</h2>
          <div className="ourteam-contact-form ourteam-animate-on-scroll">
            <div className="ourteam-info ourteam-animate-on-scroll">
              {managementTeam.length > 0 ? (
                <div className="ourteam-management-grid">
                  {managementTeam.map((member) => (
                    <TeamMember key={member.id} member={member} />
                  ))}
                </div>
              ) : (
                <div className="ourteam-no-data">
                  <p>No management team members available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Intern Team Section */}
      <section className="ourteam-section ourteam-intern-section">
        <div className="ourteam-container">
          <h2 className="ourteam-title">Intern Team</h2>
          <div className="ourteam-contact-form ourteam-animate-on-scroll">
            <div className="ourteam-info ourteam-animate-on-scroll">
              {internTeam.length > 0 ? (
                <div className="ourteam-intern-grid">
                  {internTeam.map((member) => (
                    <TeamMember key={member.id} member={member} isIntern={true} />
                  ))}
                </div>
              ) : (
                <div className="ourteam-no-data">
                  <p>No intern team members available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OurTeam;