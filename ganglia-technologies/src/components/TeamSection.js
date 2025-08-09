import React from 'react';
import '../styles/TeamSection.css';

// Import all team images
import team1 from '../assets/team1.jpg';
import team2 from '../assets/team2.jpg';
import team3 from '../assets/team3.jpg';
import team4 from '../assets/team4.jpg';
import team5 from '../assets/team5.jpg';
import team6 from '../assets/team6.jpg';
import team7 from '../assets/team7.png';
import team8 from '../assets/team8.jpg';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr Dasharathraj K Shetty",
      role: "Co-founder",
      image: team2,
      linkedin: "https://www.linkedin.com/in/dasharathraj/"
    },
    {
      id: 2,
      name: "Dr Balakrishna S Maddodi",
      role: "Co-founder",
      image: team3,
      linkedin: "https://www.linkedin.com/in/dr-balakrishna-srinivas-maddodi-68874218/"
    },
    {
      id: 3,
      name: "Dr Sandeep S Shenoy",
      role: "Director",
      image: team4,
      linkedin: null // Not available
    },
    {
      id: 4,
      name: "Namesh Malarout",
      role: "CEO",
      image: team5,
      linkedin: "https://www.linkedin.com/in/namesh-malarout-97375697/"
    },
    {
      id: 5,
      name: "Shreepathy Ranga Bhatta",
      role: "Director",
      image: team6,
      linkedin: "https://www.linkedin.com/in/shreepathy-ranga-bhatta-862a2b24a/"
    },
    {
      id: 6,
      name: "Anusha Pai",
      role: "Director",
      image: team7,
      linkedin: "https://www.linkedin.com/in/anusha-pai-013b0213/"
    },
    {
      id: 7,
      name: "Dr Manu Sudhi",
      role: "Director",
      image: team8,
      linkedin: "https://www.linkedin.com/in/dr-manu-sudhi-609296167/"
    },
    {
      id: 8,
      name: "Dr Jayaraj Mymbilly Balakrishnan",
      role: "Former Director",
      duration: "July 2022 - March 2025",
      image: team1,
      linkedin: "https://www.linkedin.com/in/dr-jayaraj-mymbilly-balakrishnan-71a15b6/"
    }
  ];

  const handleLinkedInClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <section className="team-section">
      <div className="team-background">
        <div className="team-content">
          <div className="team-header">
            <p className="team-subtitle">Meet Our Team</p>
            <h2 className="team-title">Our Leadership Team</h2>
          </div>
          
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-image-container">
                  <div className="team-image-placeholder">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="team-member-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="placeholder-content" style={{display: 'none'}}>
                      <span>Photo</span>
                    </div>
                  </div>
                  <button
                    className="linkedin-btn"
                    onClick={() => handleLinkedInClick(member.linkedin)}
                    aria-label={`View ${member.name} on LinkedIn`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  {member.duration && (
                    <p className="team-duration">{member.duration}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
