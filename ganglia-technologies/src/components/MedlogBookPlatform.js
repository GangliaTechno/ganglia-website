import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import '../styles/MedlogBookPlatform.css';
import Footer from "./Footer";
let medlog;
try {
  medlog= require('../assets/medlog.png');
} catch (error) {
  medlog = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001a4d;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000814;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23bg)'/%3E%3Cg transform='translate(200,150)'%3E%3Crect width='800' height='300' fill='%23374151' rx='20'/%3E%3Ccircle cx='150' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='300' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='450' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='600' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='650' cy='150' r='40' fill='%234B5563'/%3E%3Ctext x='400' y='250' text-anchor='middle' fill='%239CA3AF' font-size='24'%3ETeam Silhouette%3C/text%3E%3C/g%3E%3C/svg%3E";
}
const MedlogBookPlatform = () => {
  const [contactFormData, setContactFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    organizationName: ''
  });

  const handleFormInputChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactFormData);
  };
   const getImageSrc = useCallback((imageModule, fallback) => {
      if (typeof imageModule === 'string') {
        return imageModule;
      } else if (imageModule && imageModule.default) {
        return imageModule.default;
      }
      return fallback;
    }, []);

  return (
    <div className="medlog-platform-wrapper2">
      {/* Revolutionary Hero Section */}
      <section className="hero-showcase-zone2">
        <div className="floating-particles2"></div>
        <div className="hero-content-container2">
          <div className="doctor-avatar-section2">
            <div className="avatar-glow-effect2">
             <img
              src={getImageSrc(medlog, medlog)}
              alt="Team silhouette"
              className="hero-image2"
              onError={(e) => {
                console.warn("Image failed to load, using fallback");
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001a4d;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000814;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23bg)'/%3E%3Cg transform='translate(200,150)'%3E%3Crect width='800' height='300' fill='%23374151' rx='20'/%3E%3Ccircle cx='150' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='300' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='450' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='600' cy='150' r='40' fill='%234B5563'/%3E%3Ccircle cx='650' cy='150' r='40' fill='%234B5563'/%3E%3Ctext x='400' y='250' text-anchor='middle' fill='%239CA3AF' font-size='24'%3ETeam Silhouette%3C/text%3E%3C/g%3E%3C/svg%3E";
              }}
            />
            </div>
            <div className="floating-elements2">
              <div className="float-element2 float-12"></div>
              <div className="float-element2 float-22"></div>
              <div className="float-element2 float-32"></div>
            </div>
          </div>
          <div className="hero-text-content2">
            <div className="brand-title-wrapper2">
              <h1 className="main-brand-title2">
                <span className="title-highlight2">Ganglia's</span> Medical Logbook
              </h1>
              <div className="title-underline2"></div>
            </div>
            <p className="hero-description-text2">
              An advanced, AI-powered solution that revolutionizes clinical documentation 
              and supervision in hospitals. Experience seamless digital transformation 
              with voice-enabled entry, real-time feedback, and secure local data storage.
            </p>
            <button className="premium-discover-btn2">
              <span className="btn-text2">Discover Medical Logbook</span>
              <div className="btn-shine-effect2"></div>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section2">
        <div className="about-content-container2">
          <div className="section-title-container2">
            <h2 className="about-section-title2">About Medical Logbook</h2>
            <div className="title-accent-line2"></div>
          </div>
          <div className="about-text-content2 fade-in-up2">
            <p className="about-paragraph-primary2">
              Ganglia's Medical Logbook is an advanced, AI-powered solution that revolutionizes 
              how clinical documentation and supervision are managed in hospitals and medical 
              institutions. Moving beyond traditional paper logbooks, this digital platform 
              offers an intuitive website and mobile app designed for doctors, medical students, 
              interns, and hospital administrators.
            </p>
            <p className="about-paragraph-secondary2">
              With robust voice-enabled entry—tailored even for strong regional accents—medical 
              professionals and trainees can quickly and accurately log patient interactions, 
              diagnoses, observations, and prescriptions. Senior doctors and supervisors instantly 
              review, score, and provide real-time feedback, while admins enjoy full control over 
              customization and user access.
            </p>
            <p className="about-paragraph-secondary2">
              Built for high-impact clinical environments, Ganglia's Medical Logbook seamlessly 
              integrates into daily workflows, automates performance tracking against institutional 
              KPIs, and fosters a culture of accountability and continuous learning. Prioritizing 
              security, it ensures all data is stored locally on-premises, strictly within hospital 
              servers for complete privacy and compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Now Separate */}
      <section className="features-section2">
        <div className="features-content-container2">
          <div className="section-title-container2">
            <h2 className="features-section-title2">Key Features</h2>
            <div className="title-accent-line2"></div>
          </div>
          <div className="features-grid-layout2">
            <div className="premium-feature-card2 card-voice2">
              <div className="feature-icon-container2">
                <div className="feature-icon2 voice-icon2"></div>
              </div>
              <h3 className="feature-card-title2">Voice-Enabled Data Entry</h3>
              <p className="feature-card-description2">Easily dictate patient details and clinical notes with advanced AI that accurately understands regional accents.</p>
            </div>
            <div className="premium-feature-card2 card-supervision2">
              <div className="feature-icon-container2">
                <div className="feature-icon2 supervision-icon2"></div>
              </div>
              <h3 className="feature-card-title2">Real-Time Supervision</h3>
              <p className="feature-card-description2">Senior doctors can monitor junior clinicians' entries and progress instantly from anywhere.</p>
            </div>
            <div className="premium-feature-card2 card-ai2">
              <div className="feature-icon-container2">
                <div className="feature-icon2 ai-icon2"></div>
              </div>
              <h3 className="feature-card-title2">AI-Powered Scoring</h3>
              <p className="feature-card-description2">Automatically rate junior doctors' performance based on hospital-defined KPIs for transparent feedback.</p>
            </div>
            <div className="premium-feature-card2 card-management2">
              <div className="feature-icon-container2">
                <div className="feature-icon2 management-icon2"></div>
              </div>
              <h3 className="feature-card-title2">Task & Assignment Management</h3>
              <p className="feature-card-description2">Senior doctors can assign, track, and score clinical tasks or academic assignments seamlessly.</p>
            </div>
            <div className="premium-feature-card2 card-admin2">
              <div className="feature-icon-container2">
                <div className="feature-icon2 admin-icon2"></div>
              </div>
              <h3 className="feature-card-title2">Customizable Admin Controls</h3>
              <p className="feature-card-description2">Admins can tailor user roles, access, and system settings to fit specific institutional workflows.</p>
            </div>
            <div className="premium-feature-card2 card-security2">
              <div className="feature-icon-container2">
                <div className="feature-icon2 security-icon2"></div>
              </div>
              <h3 className="feature-card-title2">Secure Local Data Storage</h3>
              <p className="feature-card-description2">All data is safely stored on hospital premises, ensuring complete privacy without external sharing.</p>
            </div>
            <div className="premium-feature-card2 card-interfaces2">
              <div className="feature-icon-container2">
                <div className="feature-icon2 interfaces-icon2"></div>
              </div>
              <h3 className="feature-card-title2">Multi-User Interfaces</h3>
              <p className="feature-card-description2">Specialized dashboards provide role-specific tools for smooth operation and collaboration (Student, Doctor, Admin, Visitor).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section2">
        <div className="benefits-container2">
          <h2 className="benefits-title2">Why Choose Ganglia's Medical Logbook</h2>
          <div className="benefits-grid2">
            <div className="benefit-card2">
              <div className="benefit-icon2 trusted-icon2"></div>
              <h3>Trusted by Leading Hospitals</h3>
              <p>Proven track record with top medical institutions worldwide</p>
            </div>
            <div className="benefit-card2">
              <div className="benefit-icon2 patents-icon2"></div>
              <h3>17+ Approved Patents</h3>
              <p>Backed by advanced AI and innovative technology</p>
            </div>
            <div className="benefit-card2">
              <div className="benefit-icon2 collaboration-icon2"></div>
              <h3>Clinician-Engineered</h3>
              <p>Developed through close collaboration with medical professionals</p>
            </div>
            <div className="benefit-card2">
              <div className="benefit-icon2 customizable-icon2"></div>
              <h3>Fully Customizable</h3>
              <p>Tailored to your institution's unique workflows and protocols</p>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Glimpse Gallery */}
      <section className="glimpse-gallery-section2">
        <div className="gallery-title-container2">
          <h2 className="gallery-section-title2">Glimpse of Medical Logbook</h2>
          <div className="gallery-title-decoration2"></div>
        </div>
        <div className="gallery-cards-grid2">
          <div className="premium-gallery-card2 card-dashboard2">
            <div className="card-image-container2">
              <img src="/api/placeholder/320/220" alt="Dashboard Preview" className="gallery-card-img2" />
              <div className="card-overlay2">
                <div className="overlay-content2">
                  <h3 className="overlay-title2">Multi-User Dashboard</h3>
                  <p className="overlay-description2">Interfaces for students, doctors, admins, and visitors</p>
                </div>
              </div>
            </div>
          </div>
          <div className="premium-gallery-card2 card-reporting2">
            <div className="card-image-container2">
              <img src="/api/placeholder/320/220" alt="Voice Interface" className="gallery-card-img2" />
              <div className="card-overlay2">
                <div className="overlay-content2">
                  <h3 className="overlay-title2">Voice-Enabled Entry</h3>
                  <p className="overlay-description2">Regional accent support for accurate documentation</p>
                </div>
              </div>
            </div>
          </div>
          <div className="premium-gallery-card2 card-analytics2">
            <div className="card-image-container2">
              <img src="/api/placeholder/320/220" alt="Analytics View" className="gallery-card-img2" />
              <div className="card-overlay2">
                <div className="overlay-content2">
                  <h3 className="overlay-title2">Performance Analytics</h3>
                  <p className="overlay-description2">KPI tracking and learning insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Contact Section */}
      <section className="contact-form-zone2">
        <div className="contact-background-effects2">
          <div className="bg-wave2 wave-12"></div>
          <div className="bg-wave2 wave-22"></div>
          <div className="bg-particles2"></div>
        </div>
        <div className="contact-content-wrapper2">
          <div className="contact-message-content2">
            <p className="contact-description2">
              Embrace the future of clinical training and supervision—choose Ganglia's Medical Logbook 
              for seamless digitization, AI-powered insights, and uncompromised data security. Empower 
              your teams with precision, transparency, and personalized growth. Transform healthcare 
              education and patient care with technology designed for impact.
            </p>
            <div className="contact-title-section2">
              <h2 className="contact-main-title2">
                <span className="title-accent2"> Innovation.Accountability.<br/>Security.</span>Delivered.
              </h2>
            </div>
            <button className="ultra-premium-submit-btn2">
              <span className="submit-btn-text2">Get Started</span>
              <div className="submit-btn-ripple2"></div>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MedlogBookPlatform;
