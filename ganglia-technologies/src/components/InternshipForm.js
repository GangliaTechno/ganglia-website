"use client";
import React, { useRef, useEffect, useState } from "react";
import '../styles/InternshipForm.css';

function InternshipForm() {
  const [state, setState] = useState({
    visibleElements: new Set(['header']),
    scrollDirection: 'down',
    currentSection: 1,
    completedSections: new Set()
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
    <div className="internship-form-container">
      {/* Animated background elements */}
      <div className="background-animated">
        <div className="floating-orb orb-purple"></div>
        <div className="floating-orb orb-sky"></div>
        <div className="floating-orb orb-pink"></div>
        <div className="floating-orb orb-blue"></div>
      </div>

      {/* Main Form Section */}
      <div className="form-content-wrapper">
        <AnimatedSection
          id="internship-form-section"
          className="slide-up internship-form-section"
          isVisible={isElementVisible('internship-form-section')}
          scrollDirection={state.scrollDirection}
        >
          <div className="form-container-modern">
            <div className="form-card">
              <h2 className="form-title-modern">Internship Application Form</h2>
              <p className="form-subtitle-modern">
                Join our team and gain valuable experience in your field of interest. 
                Please fill out all sections to complete your application.
              </p>

              <form className="modern-form" method="post" action="#">
                
                {/* Section 1: Basic Details */}
                <div className="form-section">
                  <h3 className="section-title">Section 1: Basic Details</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="fullName">Full Name (as per ID) *</label>
                      <input type="text" id="fullName" name="fullName" placeholder="Enter your full name as per government ID" required />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="email">Email Address *</label>
                      <input type="email" id="email" name="email" placeholder="your.email@example.com" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" required />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="location">Current City & Country *</label>
                      <input type="text" id="location" name="location" placeholder="e.g., Mumbai, India" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="dob">Date of Birth *</label>
                      <input type="date" id="dob" name="dob" required />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="linkedin">LinkedIn Profile</label>
                      <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label>Gender</label>
                    <div className="radio-grid">
                      <label className="radio-item">
                        <input type="radio" name="gender" value="male" />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Male</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="gender" value="female" />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Female</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="gender" value="other" />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Other</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="gender" value="prefer-not-to-say" />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Prefer not to say</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="portfolio">Portfolio/GitHub/Website</label>
                      <input type="url" id="portfolio" name="portfolio" placeholder="https://yourportfolio.com or github.com/username" />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="socialMedia">Social Media Handles</label>
                      <input type="text" id="socialMedia" name="socialMedia" placeholder="@username (optional)" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Internship Details */}
                <div className="form-section">
                  <h3 className="section-title">Section 2: Internship Details</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="position">Internship Position Applying For *</label>
                      <input type="text" id="position" name="position" placeholder="e.g., Software Development Intern" required />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="department">Preferred Department *</label>
                      <select id="department" name="department" required>
                        <option value="">Select Department</option>
                        <option value="design">Design</option>
                        <option value="development">Development</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="finance">Finance</option>
                        <option value="hr">Human Resources</option>
                        <option value="operations">Operations</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label>Internship Type *</label>
                    <div className="radio-grid">
                      <label className="radio-item">
                        <input type="radio" name="internshipType" value="on-site" required />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">On-site</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="internshipType" value="remote" required />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Remote</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="internshipType" value="hybrid" required />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Hybrid</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="duration">Duration Available *</label>
                      <select id="duration" name="duration" required>
                        <option value="">Select Duration</option>
                        <option value="1-month">1 month</option>
                        <option value="2-months">2 months</option>
                        <option value="3-months">3 months</option>
                        <option value="6-months">6 months</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="startDate">Available Start Date *</label>
                      <input type="date" id="startDate" name="startDate" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label>College-Approved Internship</label>
                      <div className="radio-grid">
                        <label className="radio-item">
                          <input type="radio" name="collegeApproved" value="yes" />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">Yes</span>
                        </label>
                        <label className="radio-item">
                          <input type="radio" name="collegeApproved" value="no" />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">No</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group-modern">
                      <label>Academic Credits Required</label>
                      <div className="radio-grid">
                        <label className="radio-item">
                          <input type="radio" name="academicCredits" value="yes" />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">Yes</span>
                        </label>
                        <label className="radio-item">
                          <input type="radio" name="academicCredits" value="no" />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="otherCommitments">Any other commitments during internship period?</label>
                    <textarea id="otherCommitments" name="otherCommitments" rows="3" placeholder="e.g., classes, part-time work, exams"></textarea>
                  </div>
                </div>

                {/* Section 3: Educational Background */}
                <div className="form-section">
                  <h3 className="section-title">Section 3: Educational Background</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="currentCourse">Current Course / Degree *</label>
                      <input type="text" id="currentCourse" name="currentCourse" placeholder="e.g., B.Tech, MBA, M.Sc" required />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="college">College/University Name *</label>
                      <input type="text" id="college" name="college" placeholder="Name of your institution" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="fieldOfStudy">Field of Study *</label>
                      <input type="text" id="fieldOfStudy" name="fieldOfStudy" placeholder="e.g., Computer Science, Business Administration" required />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="yearOfStudy">Year of Study *</label>
                      <select id="yearOfStudy" name="yearOfStudy" required>
                        <option value="">Select Year</option>
                        <option value="1st-year">1st Year</option>
                        <option value="2nd-year">2nd Year</option>
                        <option value="3rd-year">3rd Year</option>
                        <option value="4th-year">4th Year</option>
                        <option value="final-year">Final Year</option>
                        <option value="postgraduate">Postgraduate</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="graduationYear">Expected Graduation Year *</label>
                      <input type="number" id="graduationYear" name="graduationYear" placeholder="2025" min="2024" max="2030" required />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="gpa">Current GPA / Percentage</label>
                      <input type="text" id="gpa" name="gpa" placeholder="e.g., 8.5/10 or 85%" />
                    </div>
                  </div>
                </div>

                {/* Section 4: Skills & Tools */}
                <div className="form-section">
                  <h3 className="section-title">Section 4: Skills & Tools</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="languages">Languages Known *</label>
                      <input type="text" id="languages" name="languages" placeholder="e.g., English, Hindi, French" required />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="technicalSkills">Technical / Domain-Specific Skills *</label>
                      <input type="text" id="technicalSkills" name="technicalSkills" placeholder="e.g., Java, Python, Figma, SEO, Excel" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="softwareTools">Software/Tools Proficient In</label>
                      <input type="text" id="softwareTools" name="softwareTools" placeholder="e.g., Adobe Creative Suite, MS Office, Tableau" />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="certifications">Certifications (if any)</label>
                      <input type="text" id="certifications" name="certifications" placeholder="List any relevant certifications" />
                    </div>
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="remoteComfort">Rate your comfort with remote collaboration tools (Zoom, Slack, etc.) *</label>
                    <select id="remoteComfort" name="remoteComfort" required>
                      <option value="">Select Rating</option>
                      <option value="1">1 - Not comfortable</option>
                      <option value="2">2 - Slightly comfortable</option>
                      <option value="3">3 - Moderately comfortable</option>
                      <option value="4">4 - Very comfortable</option>
                      <option value="5">5 - Extremely comfortable</option>
                    </select>
                  </div>
                </div>

                {/* Section 5: Experience & Projects */}
                <div className="form-section">
                  <h3 className="section-title">Section 5: Experience & Projects</h3>
                  
                  <div className="form-group-full-modern">
                    <label>Have you done any prior internships?</label>
                    <div className="radio-grid">
                      <label className="radio-item">
                        <input type="radio" name="priorInternships" value="yes" />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Yes</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="priorInternships" value="no" />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">No</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="internshipDetails">If yes, mention organization, role, and duration:</label>
                    <textarea id="internshipDetails" name="internshipDetails" rows="3" placeholder="Organization: ABC Corp, Role: Marketing Intern, Duration: 2 months"></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="projects">List any personal/academic projects relevant to this role:</label>
                    <textarea id="projects" name="projects" rows="4" placeholder="• Project 1: Description and technologies used&#10;• Project 2: Link to GitHub/demo if available"></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="resume">Upload your Resume (PDF only) *</label>
                    <input type="file" id="resume" name="resume" accept=".pdf" className="file-input" required />
                    <small className="form-help-text">Please upload your resume in PDF format only</small>
                  </div>
                </div>

                {/* Section 6: Motivational & Fit Questions */}
                <div className="form-section">
                  <h3 className="section-title">Section 6: Motivational & Fit Questions</h3>
                  
                  <div className="form-group-full-modern">
                    <label htmlFor="whyIntern">Why do you want to intern with us? *</label>
                    <textarea id="whyIntern" name="whyIntern" rows="4" placeholder="Tell us what attracts you to our company and this internship opportunity" required></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="hopeToLearn">What do you hope to learn during this internship? *</label>
                    <textarea id="hopeToLearn" name="hopeToLearn" rows="3" placeholder="Describe the skills and knowledge you want to gain" required></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="goodFit">What makes you a good fit for this role? *</label>
                    <textarea id="goodFit" name="goodFit" rows="4" placeholder="Highlight your relevant skills, experience, and qualities" required></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="challenge">Describe a challenge you've overcome (academic or personal) *</label>
                    <textarea id="challenge" name="challenge" rows="4" placeholder="Share a specific example and how you handled it" required></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label>Are you open to extending the internship based on performance?</label>
                    <div className="radio-grid">
                      <label className="radio-item">
                        <input type="radio" name="extendInternship" value="yes" />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Yes</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="extendInternship" value="no" />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section 7: Availability & Commitment */}
                <div className="form-section">
                  <h3 className="section-title">Section 7: Availability & Commitment</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="hoursPerWeek">How many hours can you commit per week? *</label>
                      <select id="hoursPerWeek" name="hoursPerWeek" required>
                        <option value="">Select Hours</option>
                        <option value="10-15">10-15 hours</option>
                        <option value="16-25">16-25 hours</option>
                        <option value="26-35">26-35 hours</option>
                        <option value="36-40">36-40 hours</option>
                        <option value="40+">40+ hours</option>
                      </select>
                    </div>
                    <div className="form-group-modern">
                      <label>Do you have a laptop and stable internet connection? *</label>
                      <div className="radio-grid">
                        <label className="radio-item">
                          <input type="radio" name="techRequirements" value="yes" required />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">Yes</span>
                        </label>
                        <label className="radio-item">
                          <input type="radio" name="techRequirements" value="no" required />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="scheduledEvents">Do you have any exams, vacations, or events scheduled during the internship period?</label>
                    <textarea id="scheduledEvents" name="scheduledEvents" rows="3" placeholder="Please mention any dates or periods you'll be unavailable"></textarea>
                  </div>
                </div>

                {/* Section 8: Reference (Optional) */}
                <div className="form-section">
                  <h3 className="section-title">Section 8: Reference (Optional)</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="refName">Reference Name</label>
                      <input type="text" id="refName" name="refName" placeholder="Full name of your reference" />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="refDesignation">Designation & Organization</label>
                      <input type="text" id="refDesignation" name="refDesignation" placeholder="e.g., Professor, XYZ University" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="refEmail">Email</label>
                      <input type="email" id="refEmail" name="refEmail" placeholder="reference@email.com" />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="refPhone">Phone</label>
                      <input type="tel" id="refPhone" name="refPhone" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="refRelationship">Relationship to You</label>
                    <input type="text" id="refRelationship" name="refRelationship" placeholder="e.g., Professor, Previous Supervisor, Mentor" />
                  </div>
                </div>

                {/* Section 9: Declaration */}
                <div className="form-section">
                  <h3 className="section-title">Section 9: Declaration</h3>
                  
                  <div className="form-group-full-modern">
                    <label className="checkbox-item checkbox-single">
                      <input type="checkbox" id="certifyInfo" name="certifyInfo" required />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">I certify that the information provided is true and correct to the best of my knowledge. *</span>
                    </label>
                  </div>

                  <div className="form-group-full-modern">
                    <label className="checkbox-item checkbox-single">
                      <input type="checkbox" id="understandTerms" name="understandTerms" required />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">I understand that this is an unpaid/paid internship depending on the company's policy. *</span>
                    </label>
                  </div>

                  <div className="form-group-full-modern">
                    <label className="checkbox-item checkbox-single">
                      <input type="checkbox" id="agreeTerms" name="agreeTerms" required />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">I agree to abide by the terms, conditions, and confidentiality clauses of the organization during my internship. *</span>
                    </label>
                  </div>
                </div>

                {/* Section 10: Attachments */}
                <div className="form-section">
                  <h3 className="section-title">Section 10: Attachments</h3>
                  
                  <div className="form-group-full-modern">
                    <label htmlFor="coverLetter">Cover Letter (Optional)</label>
                    <input type="file" id="coverLetter" name="coverLetter" accept=".pdf,.doc,.docx" className="file-input" />
                    <small className="form-help-text">Upload your cover letter (PDF, DOC, or DOCX)</small>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="certificates">Certificates / Transcripts (Optional)</label>
                    <input type="file" id="certificates" name="certificates" accept=".pdf,.doc,.docx,.jpg,.png" className="file-input" multiple />
                    <small className="form-help-text">Upload relevant certificates or transcripts</small>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="videoIntro">Video Introduction (Optional - max 2 mins)</label>
                    <input type="file" id="videoIntro" name="videoIntro" accept=".mp4,.mov,.avi" className="file-input" />
                    <small className="form-help-text">Upload a short video introduction (max 2 minutes)</small>
                  </div>
                </div>

                <div className="form-actions-modern">
                  <button type="submit" className="submit-btn-modern">
                    Submit Application
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default InternshipForm;