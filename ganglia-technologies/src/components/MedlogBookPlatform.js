import React, { useState } from 'react';
import '../styles/MedlogBookPlatform.css';

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

  return (
    <div className="medlog-platform-wrapper">
      {/* Revolutionary Hero Section */}
      <section className="hero-showcase-zone">
        <div className="floating-particles"></div>
        <div className="hero-content-container">
          <div className="doctor-avatar-section">
            <div className="avatar-glow-effect">
              <img src="/api/placeholder/350/450" alt="AI Doctor Avatar" className="doctor-illustration-img" />
            </div>
            <div className="floating-elements">
              <div className="float-element float-1"></div>
              <div className="float-element float-2"></div>
              <div className="float-element float-3"></div>
            </div>
          </div>
          <div className="hero-text-content">
            <div className="brand-title-wrapper">
              <h1 className="main-brand-title">
                <span className="title-highlight">Medlog</span> Book
              </h1>
              <div className="title-underline"></div>
            </div>
            <p className="hero-description-text">
              Medical Logbook is an AI-powered clinical reporting platform
              for hospitals, enhancing accountability, learning, and efficiency.
              It lets doctors, medical students, and nurses log daily events to create
              structured, cloud-based records for senior review.
            </p>
            <button className="premium-discover-btn">
              <span className="btn-text">Discover Medlog Book</span>
              <div className="btn-shine-effect"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Premium About & Features Section */}
      <section className="about-features-premium-section">
        <div className="about-content-zone">
          <div className="section-title-container">
            <h2 className="about-section-title">About Medlog Book</h2>
            <div className="title-accent-line"></div>
          </div>
          <div className="about-text-content">
            <p className="about-paragraph-primary">
              Medical Logbook is a comprehensive reporting and analytics
              platform designed to enhance accountability, learning, and efficiency in
              hospital environments. Built for medical institutions, it allows users, nurses,
              doctors, and nurses to log daily diagnoses, symptoms, tests, and
              prescriptions—creating structured, cloud-based records for senior review.
            </p>
            <p className="about-paragraph-secondary">
              With dedicated modules for student doctors, senior doctors, and
              administrators, the platform streamlines supervision and feedback. Senior
              doctors can review, approve, and provide guidance through integrated real-
              time feedback to juniors. Powered by an integrated ChatGPT model, the
              software transforms keyword-based inputs into complete clinical
              summaries—reducing documentation time while improving clarity and
              learning outcomes.
            </p>
          </div>
        </div>
        <div className="features-showcase-zone">
          <div className="features-card-container">
            <h2 className="features-section-title">Features</h2>
            <div className="features-grid-layout">
              <div className="premium-feature-card card-ai">
                <div className="feature-icon-container">
                  <div className="feature-icon ai-icon"></div>
                </div>
                <h3 className="feature-card-title">AI-Powered Reporting</h3>
                <p className="feature-card-description">Automated clinical documentation with ChatGPT integration</p>
              </div>
              <div className="premium-feature-card card-feedback">
                <div className="feature-icon-container">
                  <div className="feature-icon feedback-icon"></div>
                </div>
                <h3 className="feature-card-title">Real-time Feedback</h3>
                <p className="feature-card-description">Instant supervision and guidance from senior doctors</p>
              </div>
              <div className="premium-feature-card card-cloud">
                <div className="feature-icon-container">
                  <div className="feature-icon cloud-icon"></div>
                </div>
                <h3 className="feature-card-title">Cloud-based Records</h3>
                <p className="feature-card-description">Secure, structured digital logbook accessible anywhere</p>
              </div>
              <div className="premium-feature-card card-modules">
                <div className="feature-icon-container">
                  <div className="feature-icon modules-icon"></div>
                </div>
                <h3 className="feature-card-title">Multi-user Modules</h3>
                <p className="feature-card-description">Dedicated interfaces for students, doctors, and administrators</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Glimpse Gallery */}
      <section className="glimpse-gallery-section">
        <div className="gallery-title-container">
          <h2 className="gallery-section-title">Glimpse of Medlog Book</h2>
          <div className="gallery-title-decoration"></div>
        </div>
        <div className="gallery-cards-grid">
          <div className="premium-gallery-card card-dashboard">
            <div className="card-image-container">
              <img src="/api/placeholder/320/220" alt="Dashboard Preview" className="gallery-card-img" />
              <div className="card-overlay">
                <div className="overlay-content">
                  <h3 className="overlay-title">Doctor Dashboard</h3>
                  <p className="overlay-description">Comprehensive overview of patient logs</p>
                </div>
              </div>
            </div>
          </div>
          <div className="premium-gallery-card card-reporting">
            <div className="card-image-container">
              <img src="/api/placeholder/320/220" alt="Reporting Interface" className="gallery-card-img" />
              <div className="card-overlay">
                <div className="overlay-content">
                  <h3 className="overlay-title">Smart Reporting</h3>
                  <p className="overlay-description">AI-assisted clinical documentation</p>
                </div>
              </div>
            </div>
          </div>
          <div className="premium-gallery-card card-analytics">
            <div className="card-image-container">
              <img src="/api/placeholder/320/220" alt="Analytics View" className="gallery-card-img" />
              <div className="card-overlay">
                <div className="overlay-content">
                  <h3 className="overlay-title">Analytics Dashboard</h3>
                  <p className="overlay-description">Data-driven insights for patient care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Contact Section */}
      <section className="contact-form-zone">
        <div className="contact-background-effects">
          <div className="bg-wave wave-1"></div>
          <div className="bg-wave wave-2"></div>
          <div className="bg-particles"></div>
        </div>
        <div className="contact-content-wrapper">
          <div className="contact-title-section">
            <h2 className="contact-main-title">
              Let's <span className="title-accent">Discuss</span> your needs
            </h2>
          </div>
          <form onSubmit={handleFormSubmission} className="premium-contact-form">
            <div className="form-input-row">
              <div className="input-field-wrapper">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Name"
                  value={contactFormData.fullName}
                  onChange={handleFormInputChange}
                  className="premium-form-input"
                  required
                />
                <div className="input-focus-line"></div>
              </div>
              <div className="input-field-wrapper">
                <input
                  type="email"
                  name="emailAddress"
                  placeholder="Your Email"
                  value={contactFormData.emailAddress}
                  onChange={handleFormInputChange}
                  className="premium-form-input"
                  required
                />
                <div className="input-focus-line"></div>
              </div>
            </div>
            <div className="form-input-row">
              <div className="input-field-wrapper">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Contact Info"
                  value={contactFormData.phoneNumber}
                  onChange={handleFormInputChange}
                  className="premium-form-input"
                  required
                />
                <div className="input-focus-line"></div>
              </div>
              <div className="input-field-wrapper">
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Your Organization name"
                  value={contactFormData.organizationName}
                  onChange={handleFormInputChange}
                  className="premium-form-input"
                  required
                />
                <div className="input-focus-line"></div>
              </div>
            </div>
            <button type="submit" className="ultra-premium-submit-btn">
              <span className="submit-btn-text">Submit</span>
              <div className="submit-btn-ripple"></div>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default MedlogBookPlatform;