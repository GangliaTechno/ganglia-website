"use client";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import '../styles/ResearchPapers.css';

function ResearchPapers() {
  const [state, setState] = useState({
    visibleElements: new Set(['header']),
    scrollDirection: 'down'
  });

  const observerRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef(null);

  // Handle scroll direction
  const handleScroll = React.useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
        setState(prev => ({
          ...prev,
          scrollDirection: newDirection
        }));
        lastScrollY.current = currentScrollY;
      }
    }, 16);
  }, []);

  // Setup intersection observer
  const setupIntersectionObserver = React.useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const updates = {};
        let hasChanges = false;

        entries.forEach((entry) => {
          const elementId = entry.target.id;
          const isIntersecting = entry.isIntersecting && entry.intersectionRatio > 0.1;
          
          if (isIntersecting) {
            updates[elementId] = true;
            hasChanges = true;
          }
        });

        if (hasChanges) {
          setState(prev => {
            const newVisible = new Set(prev.visibleElements);
            Object.entries(updates).forEach(([id, visible]) => {
              if (visible) {
                newVisible.add(id);
              }
            });
            return {
              ...prev,
              visibleElements: newVisible
            };
          });
        }
      },
      {
        threshold: [0.1, 0.15],
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const slideElements = document.querySelectorAll('.slide-element');
    slideElements.forEach((el) => {
      if (el.id && observerRef.current) {
        observerRef.current.observe(el);
      }
    });
  }, []);

  // Setup scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Setup intersection observer
  useEffect(() => {
    const timeoutId = setTimeout(setupIntersectionObserver, 100);
    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setupIntersectionObserver]);

  const isElementVisible = React.useCallback((elementId) => {
    return state.visibleElements.has(elementId);
  }, [state.visibleElements]);

  const AnimatedSection = React.memo(({ 
    id, 
    className, 
    children, 
    isVisible,
    scrollDirection 
  }) => {
    const sectionClass = React.useMemo(() => {
      const baseClass = `slide-element ${className}`;
      const directionClass = scrollDirection === 'down' ? 'slide-down' : 'slide-up';
      const visibilityClass = isVisible ? 'visible' : '';
      return `${baseClass} ${directionClass} ${visibilityClass}`.trim();
    }, [className, isVisible, scrollDirection]);

    return (
      <div id={id} className={sectionClass}>
        {children}
      </div>
    );
  });

  return (
    <div className="research-container" style={{ margin: 0, padding: 0 }}>
      {/* Hero Section */}
      <div className="research-hero-section">
        <AnimatedSection
          id="header"
          className="slide-up research-header"
          isVisible={isElementVisible('header')}
          scrollDirection={state.scrollDirection}
        >
          <h1 className="research-main-title">Research Papers</h1>
          <h2 className="research-subtitle">
            <span className="ganglia-highlight">Ganglia</span> Technologies
          </h2>
          <p className="research-description">
            Advancing healthcare through cutting-edge research and innovation
          </p>
        </AnimatedSection>
      </div>

      {/* About Section with Image Collage */}
      <div className="about-section">
        <div className="about-container">
          <div className="about-left">
  <div className="research-papers-collage">
    {/* Animated Paper Stack 1 */}
    <div className="paper-wrapper top-paper">
      <div className="paper-inner">
        <div className="paper-front">
          <div className="paper-container">
            <div className="paper-stack">
              <div className="paper-sheet paper-1"></div>
              <div className="paper-sheet paper-2"></div>
              <div className="paper-sheet paper-3"></div>
            </div>
            <div className="paper-content">
              <div className="paper-title">Research Paper 1</div>
              <div className="paper-lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line short"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="paper-back">
          <h3>AI Research</h3>
          <p>Advancing artificial intelligence applications in healthcare and medical diagnostics</p>
        </div>
      </div>
    </div>

    {/* Animated Chart/Graph 2 */}
    <div className="paper-wrapper bottom-left-paper">
      <div className="paper-inner">
        <div className="paper-front">
          <div className="chart-container">
            <div className="chart-header">Data Analysis</div>
            <div className="chart-content">
              <div className="bar-chart">
                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
                <div className="bar bar-4"></div>
                <div className="bar bar-5"></div>
              </div>
              <div className="chart-lines">
                <div className="chart-line line-1"></div>
                <div className="chart-line line-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="paper-back">
          <h3>Data Analysis</h3>
          <p>Deep learning and machine learning techniques for medical data interpretation</p>
        </div>
      </div>
    </div>

    {/* Animated DNA/Medical 3 */}
    <div className="paper-wrapper bottom-right-paper">
      <div className="paper-inner">
        <div className="paper-front">
          <div className="medical-container">
            <div className="medical-header">Medical Innovation</div>
            <div className="dna-helix">
              <div className="helix-strand strand-1">
                <div className="helix-dot dot-1"></div>
                <div className="helix-dot dot-2"></div>
                <div className="helix-dot dot-3"></div>
                <div className="helix-dot dot-4"></div>
              </div>
              <div className="helix-strand strand-2">
                <div className="helix-dot dot-1"></div>
                <div className="helix-dot dot-2"></div>
                <div className="helix-dot dot-3"></div>
                <div className="helix-dot dot-4"></div>
              </div>
            </div>
            <div className="medical-stats">
              <div className="stat-item">
                <div className="stat-value">95%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">2.5x</div>
                <div className="stat-label">Faster</div>
              </div>
            </div>
          </div>
        </div>
        <div className="paper-back">
          <h3>Medical Innovation</h3>
          <p>Breakthrough research in medical device development and clinical applications</p>
        </div>
      </div>
    </div>
  </div>
</div>


          <div className="about-right">
            <h2 className="about-title">
              Pioneering <span className="highlight">Medical Research</span>
            </h2>
            <p className="about-description">
              Our research focuses on developing innovative AI-driven solutions for healthcare challenges, 
              from automated disease detection to advanced medical device technologies.
            </p>
            <button className="know-more-btn">
              View Publications
              <div className="arrow-icon">→</div>
            </button>
          </div>
        </div>
      </div>

      <div className="research-content-wrapper" style={{ margin: 0, padding: 0 }}>
        {/* Research Papers Section */}
        <AnimatedSection
          id="papers-section"
          className="slide-up papers-section"
          isVisible={isElementVisible('papers-section')}
          scrollDirection={state.scrollDirection}
        >
          <div className="papers-container">
            <h2 className="section-title">Published Research Papers</h2>
            
            {/* Paper 1 */}
            <div className="paper-card">
              <div className="paper-header">
                <h3 className="paper-title">
                  Instance Segmentation and Contrastive Clustering Techniques for White Blood Cell Analysis
                </h3>
                <div className="paper-meta">
                  <span className="paper-type">Research Article</span>
                  <span className="paper-status">PAccepted for publishing</span>
                </div>
              </div>
              
              <div className="paper-authors">
                <h4>Authors:</h4>
                <p>Akshathaa Avinash Annadhani, Bhavana Baalebail, Dashrathraj K Shetty, Sharanya G Hegde, Deekshith R Prabhu, Phani Kumar Pullela, Namesh Malarout</p>
              </div>

              <div className="paper-abstract">
                <h4>Abstract:</h4>
                <p>
                  White blood cell (WBC) analysis using artificial intelligence (AI) is growing rapidly. However, many available datasets lack labels, making supervised learning approaches challenging. This review uses both qualitative and quantitative methods. It includes peer-reviewed studies from Scopus indexed journals. Sources were selected from the Scopus. The review groups findings into three key areas: segmentation, clustering, and health scoring. Contrastive clustering enables grouping of cells without labels. New health scoring methods allow assessment of cell health and model confidence. Despite progress, challenges remain. Models often lack robust testing when ground truth data is unavailable. Ethical concerns and limited model explainability also pose barriers. Future research should aim to integrate segmentation, clustering, and clinical objectives within a unified framework.
                </p>
              </div>

              <div className="paper-keywords">
                <h4>Keywords:</h4>
                <div className="keywords-list">
                  <span className="keyword">White Blood Cell Analysis</span>
                  <span className="keyword">Instance Segmentation</span>
                  <span className="keyword">Contrastive Clustering</span>
                  <span className="keyword">Artificial Intelligence</span>
                  <span className="keyword">Medical Imaging</span>
                </div>
              </div>
            </div>

            {/* Paper 2 */}
            <div className="paper-card">
              <div className="paper-header">
                <h3 className="paper-title">
                  Explainable AI-Based System for Automated Detection of Cardiovascular Disease Detection from ECG Images: A Theoretical Review
                </h3>
                <div className="paper-meta">
                  <span className="paper-type">Review Article</span>
                  <span className="paper-status">Accepted for Publishing</span>
                </div>
              </div>
              
              <div className="paper-authors">
                <h4>Authors:</h4>
                <p>Anoop P, K Sindhu Kamath, Dashrathraj K Shetty, Sharanya G Hegde, Deekshtih R Prabhu, Phani Kumar Pullela, Praveen Shastry</p>
              </div>

              

              <div className="paper-abstract">
                <h4>Abstract:</h4>
                <div className="abstract-sections">
                  <div className="abstract-section">
                    <strong>Introduction:</strong> Deep learning applied to electrocardiogram (ECG) images is changing cardiac diagnostics. But understanding how these systems work remains a major theoretical and practical challenge. This review focuses on Explainable AI (XAI) models for automatic heart disease detection from ECG images, with attention to theoretical insights.
                  </div>
                  <div className="abstract-section">
                    <strong>Methods:</strong> A systematic thematic review was conducted using Scopus and Web of Science. The focus was on theoretical and quantitative aspects of XAI, ECG, and deep learning. Studies were grouped by model type, interpretation method, and theoretical contribution.
                  </div>
                  <div className="abstract-section">
                    <strong>Results:</strong> The review found three trends: more use of saliency-based XAI methods such as Grad-CAM and SHAP; increasing use of CNN and transformer models for ECG analysis; and early development of theoretical frameworks assessing AI reliability. Few studies explored explainability in depth.
                  </div>
                  <div className="abstract-section">
                    <strong>Conclusion:</strong> A key challenge is linking model interpretability to clinical meaning. This review highlights the need for human-centred design, model causability, and cross-disciplinary theory to improve XAI use in cardiology.
                  </div>
                </div>
              </div>

              <div className="paper-keywords">
                <h4>Keywords:</h4>
                <div className="keywords-list">
                  <span className="keyword">Machine Learning</span>
                  <span className="keyword">Deep Learning</span>
                  <span className="keyword">Convolutional Neural Networks</span>
                  <span className="keyword">Transfer Learning</span>
                  <span className="keyword">Grad-CAM</span>
                  <span className="keyword">Explainable AI</span>
                  <span className="keyword">ECG Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Get Started Form Section */}
        <AnimatedSection
          id="get-started-section"
          className="slide-up get-started-section"
          isVisible={isElementVisible('get-started-section')}
          scrollDirection={state.scrollDirection}
        >
          <div className="form-container">
            <h2 className="form-title">Get Started with Ganglia Technologies</h2>
            <p className="form-subtitle">
              Interested in collaborating on research or implementing our solutions? 
              Fill out the form below and we'll get back to you.
            </p>

            <form className="get-started-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" placeholder="Please enter your full name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" placeholder="We'll use this to get back to you" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="Optional, but recommended for faster communication" />
                </div>

                <div className="form-group">
                  <label htmlFor="organization">Organization / Company Name *</label>
                  <input type="text" id="organization" placeholder='E.g., hospital, clinic, university, startup, etc. If individual, write "Individual"' required />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Your Role / Title</label>
                  <input type="text" id="role" placeholder="E.g., Doctor, Hospital Admin, Researcher, Student, etc." />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location (City, State)</label>
                  <input type="text" id="location" placeholder="This helps us connect you to the closest team" />
                </div>
              </div>

              <div className="form-group-full">
                <label htmlFor="solutions">Which Ganglia solution(s) are you interested in? (Select all that apply)</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" value="laryngoscope" />
                    <span>Smart Video-Laryngoscope</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" value="mobile-icu" />
                    <span>Mobile ICU</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" value="medical-logbook" />
                    <span>Medical Logbook</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" value="anushtaan" />
                    <span>Anushtaan (Project Management Platform)</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" value="tripmacha" />
                    <span>TripMacha AI</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" value="consulting" />
                    <span>Consulting/Custom Development</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" value="not-sure" />
                    <span>Not sure—please recommend based on my needs</span>
                  </label>
                </div>
              </div>

              <div className="form-group-full">
                <label htmlFor="goals">What do you hope to achieve with Ganglia's solutions?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="goals" value="clinical-efficiency" />
                    <span>Improve clinical efficiency/care</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="goals" value="lower-costs" />
                    <span>Lower costs</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="goals" value="digital-transformation" />
                    <span>Digital transformation/automation</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="goals" value="training" />
                    <span>Training or education</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="goals" value="research" />
                    <span>Research collaboration</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="goals" value="other" />
                    <span>Other</span>
                  </label>
                </div>
              </div>

              <div className="form-group-full">
                <label htmlFor="description">Briefly describe your current need or challenge</label>
                <textarea id="description" rows="4" placeholder="Tell us a little about your interest or problem you'd like us to solve"></textarea>
              </div>

              <div className="form-group-full">
                <label htmlFor="users">Expected Number of Users (If applicable)</label>
                <select id="users">
                  <option value="">Select range</option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="200+">200+</option>
                </select>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="source">How did you hear about us?</label>
                  <select id="source">
                    <option value="">Select option</option>
                    <option value="google">Google/Search engine</option>
                    <option value="social-media">Social media</option>
                    <option value="event">Event/Expo</option>
                    <option value="referral">Referral/Word of mouth</option>
                    <option value="news">News/Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-method">Preferred Method of Contact</label>
                  <select id="contact-method">
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="no-preference">No preference</option>
                  </select>
                </div>
              </div>

              <div className="form-group-full">
                <label className="checkbox-label">
                  <input type="checkbox" id="updates" />
                  <span>Would you like to receive updates and news from Ganglia Technologies?</span>
                </label>
              </div>

              <div className="form-group-full">
                <label htmlFor="attachment">Attach supporting document or enquiry file (Optional)</label>
                <input type="file" id="attachment" accept=".pdf,.doc,.docx,.txt" />
                <small>E.g., requirement sheet, proposal, pilot request, etc.</small>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit Request
                  <div className="arrow-icon">→</div>
                </button>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <div style={{ margin: 0, padding: 0, marginBottom: 0, paddingBottom: 0 }}>
        <Footer />
      </div>
    </div>
  );
}

export default ResearchPapers;
