"use client";
import React, { useRef, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/InternshipForm.css';

function InternshipForm() {
  const [state, setState] = useState({
    visibleElements: new Set(['header']),
    scrollDirection: 'down',
    currentSection: 1,
    completedSections: new Set()
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formElement = e.target;
      const emailFormData = new FormData();
      
      // Collect all form data
      const data = new FormData(formElement);
      const formFields = {};
      
      // Extract non-file fields
      for (let [key, value] of data.entries()) {
        if (value instanceof File) {
          continue; // Skip files for now
        }
        formFields[key] = value;
      }

      // Prepare email content with ALL form fields
      const emailSubject = `New Internship Application - ${formFields.fullName || 'Applicant'} - ${formFields.position || 'Position'}`;
      
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            🎓 NEW INTERNSHIP APPLICATION
          </h2>
          
          <!-- Section 1: Basic Details -->
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">👤 BASIC DETAILS</h3>
            <p><strong>Full Name:</strong> ${formFields.fullName || 'N/A'}</p>
            <p><strong>Email:</strong> ${formFields.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${formFields.phone || 'N/A'}</p>
            <p><strong>Location:</strong> ${formFields.location || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> ${formFields.dob || 'N/A'}</p>
            <p><strong>Gender:</strong> ${formFields.gender || 'N/A'}</p>
            <p><strong>LinkedIn:</strong> ${formFields.linkedin || 'N/A'}</p>
            <p><strong>Portfolio:</strong> ${formFields.portfolio || 'N/A'}</p>
            <p><strong>Social Media:</strong> ${formFields.socialMedia || 'N/A'}</p>
          </div>

          <!-- Section 2: Internship Details -->
          <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">💼 INTERNSHIP DETAILS</h3>
            <p><strong>Position:</strong> ${formFields.position || 'N/A'}</p>
            <p><strong>Department:</strong> ${formFields.department || 'N/A'}</p>
            <p><strong>Internship Type:</strong> ${formFields.internshipType || 'N/A'}</p>
            <p><strong>Duration:</strong> ${formFields.duration || 'N/A'}</p>
            <p><strong>Start Date:</strong> ${formFields.startDate || 'N/A'}</p>
            <p><strong>College Approved:</strong> ${formFields.collegeApproved || 'N/A'}</p>
            <p><strong>Academic Credits Required:</strong> ${formFields.academicCredits || 'N/A'}</p>
            <p><strong>Other Commitments:</strong></p>
            <p style="white-space: pre-line; font-style: italic;">${formFields.otherCommitments || 'N/A'}</p>
          </div>

          <!-- Section 3: Educational Background -->
          <div style="background-color: #f0fff4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">🎓 EDUCATIONAL BACKGROUND</h3>
            <p><strong>Current Course:</strong> ${formFields.currentCourse || 'N/A'}</p>
            <p><strong>College/University:</strong> ${formFields.college || 'N/A'}</p>
            <p><strong>Field of Study:</strong> ${formFields.fieldOfStudy || 'N/A'}</p>
            <p><strong>Year of Study:</strong> ${formFields.yearOfStudy || 'N/A'}</p>
            <p><strong>Expected Graduation Year:</strong> ${formFields.graduationYear || 'N/A'}</p>
            <p><strong>Current GPA/Percentage:</strong> ${formFields.gpa || 'N/A'}</p>
          </div>

          <!-- Section 4: Skills & Tools -->
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">🛠️ SKILLS & TOOLS</h3>
            <p><strong>Languages Known:</strong> ${formFields.languages || 'N/A'}</p>
            <p><strong>Technical Skills:</strong> ${formFields.technicalSkills || 'N/A'}</p>
            <p><strong>Software Tools:</strong> ${formFields.softwareTools || 'N/A'}</p>
            <p><strong>Certifications:</strong> ${formFields.certifications || 'N/A'}</p>
            <p><strong>Remote Collaboration Tools Comfort:</strong> ${formFields.remoteComfort || 'N/A'}/5</p>
          </div>

          <!-- Section 5: Experience & Projects -->
          <div style="background-color: #d1ecf1; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">💼 EXPERIENCE & PROJECTS</h3>
            <p><strong>Prior Internships:</strong> ${formFields.priorInternships || 'N/A'}</p>
            <p><strong>Previous Internship Details:</strong></p>
            <p style="white-space: pre-line; font-style: italic;">${formFields.internshipDetails || 'N/A'}</p>
            <p><strong>Personal/Academic Projects:</strong></p>
            <p style="white-space: pre-line; font-style: italic;">${formFields.projects || 'N/A'}</p>
          </div>

          <!-- Section 6: Motivational & Fit Questions -->
          <div style="background-color: #f8d7da; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">💭 MOTIVATIONAL & FIT QUESTIONS</h3>
            <p><strong>Why do you want to intern with us:</strong></p>
            <p style="white-space: pre-line; font-style: italic; border-left: 3px solid #007bff; padding-left: 10px;">${formFields.whyIntern || 'N/A'}</p>
            
            <p><strong>What do you hope to learn:</strong></p>
            <p style="white-space: pre-line; font-style: italic; border-left: 3px solid #28a745; padding-left: 10px;">${formFields.hopeToLearn || 'N/A'}</p>
            
            <p><strong>What makes you a good fit:</strong></p>
            <p style="white-space: pre-line; font-style: italic; border-left: 3px solid #17a2b8; padding-left: 10px;">${formFields.goodFit || 'N/A'}</p>
            
            <p><strong>Challenge you've overcome:</strong></p>
            <p style="white-space: pre-line; font-style: italic; border-left: 3px solid #fd7e14; padding-left: 10px;">${formFields.challenge || 'N/A'}</p>
            
            <p><strong>Open to extending internship:</strong> ${formFields.extendInternship || 'N/A'}</p>
          </div>

          <!-- Section 7: Availability & Commitment -->
          <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">⏰ AVAILABILITY & COMMITMENT</h3>
            <p><strong>Hours per Week:</strong> ${formFields.hoursPerWeek || 'N/A'}</p>
            <p><strong>Has Laptop & Stable Internet:</strong> ${formFields.techRequirements || 'N/A'}</p>
            <p><strong>Scheduled Events/Unavailability:</strong></p>
            <p style="white-space: pre-line; font-style: italic;">${formFields.scheduledEvents || 'N/A'}</p>
          </div>

          <!-- Section 8: Reference Information -->
          ${formFields.refName ? `
          <div style="background-color: #ffeeba; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">📞 REFERENCE INFORMATION</h3>
            <p><strong>Reference Name:</strong> ${formFields.refName}</p>
            <p><strong>Designation & Organization:</strong> ${formFields.refDesignation || 'N/A'}</p>
            <p><strong>Email:</strong> ${formFields.refEmail || 'N/A'}</p>
            <p><strong>Phone:</strong> ${formFields.refPhone || 'N/A'}</p>
            <p><strong>Relationship:</strong> ${formFields.refRelationship || 'N/A'}</p>
          </div>
          ` : ''}

          <!-- Section 9: Declaration Status -->
          <div style="background-color: #e2e3e5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">✅ DECLARATIONS</h3>
            <p><strong>Information Certification:</strong> ${formFields.certifyInfo ? '✅ Certified' : '❌ Not Certified'}</p>
            <p><strong>Terms Understanding:</strong> ${formFields.understandTerms ? '✅ Understood' : '❌ Not Confirmed'}</p>
            <p><strong>Agreement to Terms:</strong> ${formFields.agreeTerms ? '✅ Agreed' : '❌ Not Agreed'}</p>
          </div>

          <!-- Attachments Information -->
          <div style="background-color: #cce5ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">📎 ATTACHMENTS</h3>
            <p><strong>Resume:</strong> ✅ Attached (Required)</p>
            <p><strong>Cover Letter:</strong> ${formElement.querySelector('#coverLetter').files.length > 0 ? '✅ Attached' : '❌ Not Provided'}</p>
            <p><strong>Certificates/Transcripts:</strong> ${formElement.querySelector('#certificates').files.length > 0 ? '✅ Attached (' + formElement.querySelector('#certificates').files.length + ' files)' : '❌ Not Provided'}</p>
            <p><strong>Video Introduction:</strong> ${formElement.querySelector('#videoIntro').files.length > 0 ? '✅ Attached' : '❌ Not Provided'}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
            <h3 style="color: #2c3e50; margin-top: 0;">📋 NEXT STEPS</h3>
            <p>1. Review the applicant's details and attachments</p>
            <p>2. Respond to <strong>${formFields.email}</strong> for further communication</p>
            <p>3. Contact reference if additional verification is needed</p>
          </div>
          
          <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
            This internship application was submitted through your website on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}.<br>
            Please review all sections and attachments carefully.
          </p>
          
          <p style="color: #6c757d; font-size: 14px;">
            <strong>Best regards,</strong><br>
            Internship Application System
          </p>
        </div>
      `;

      // Set up the email data
      emailFormData.append('recipient', 'eniyan2001@gmail.com');
      emailFormData.append('subject', emailSubject);
      emailFormData.append('body', emailBody);

      // Add files with proper handling
      const resumeFile = formElement.querySelector('#resume').files[0];
      const coverLetterFile = formElement.querySelector('#coverLetter').files[0];
      const certificatesFiles = formElement.querySelector('#certificates').files;
      const videoFile = formElement.querySelector('#videoIntro').files[0];

      // Add resume (required)
      if (resumeFile) {
        emailFormData.append('files', resumeFile);
      } else {
        throw new Error('Resume is required');
      }

      // Add optional files
      if (coverLetterFile) {
        emailFormData.append('files', coverLetterFile);
      }

      if (certificatesFiles && certificatesFiles.length > 0) {
        for (let i = 0; i < certificatesFiles.length; i++) {
          emailFormData.append('files', certificatesFiles[i]);
        }
      }

      if (videoFile) {
        emailFormData.append('files', videoFile);
      }

      const response = await fetch('https://tmmail.onrender.com/send-email-with-multiple-files/', {
        method: 'POST',
        body: emailFormData
      });

      if (response.ok) {
        const result = await response.json();
        
        // Show success message
        toast.success("🎉 Internship application submitted successfully! We will review your application and get back to you soon.");
        
        // Reset form after successful submission
        formElement.reset();
        
        // Optional: Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('Application submitted successfully:', result);
        
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error submitting internship application:', error);
      toast.error(`❌ Failed to submit application: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="internship-form-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={'p-4'}
        toastClassName={() => "relative flex p-6 rounded-md justify-between cursor-pointer bg-white text-black"}
      />

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

              <form className="modern-form" method="post" onSubmit={handleSubmit}>
                
                {/* Section 1: Basic Details */}
                <div className="form-section">
                  <h3 className="section-title">Section 1: Basic Details</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="fullName">Full Name (as per ID) *</label>
                      <input type="text" id="fullName" name="fullName" placeholder="Enter your full name as per government ID" required disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="email">Email Address *</label>
                      <input type="email" id="email" name="email" placeholder="your.email@example.com" required disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" required disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="location">Current City & Country *</label>
                      <input type="text" id="location" name="location" placeholder="e.g., Mumbai, India" required disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="dob">Date of Birth *</label>
                      <input type="date" id="dob" name="dob" required disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="linkedin">LinkedIn Profile</label>
                      <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label>Gender</label>
                    <div className="radio-grid">
                      <label className="radio-item">
                        <input type="radio" name="gender" value="male" disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Male</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="gender" value="female" disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Female</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="gender" value="other" disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Other</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="gender" value="prefer-not-to-say" disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Prefer not to say</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="portfolio">Portfolio/GitHub/Website</label>
                      <input type="url" id="portfolio" name="portfolio" placeholder="https://yourportfolio.com or github.com/username" disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="socialMedia">Social Media Handles</label>
                      <input type="text" id="socialMedia" name="socialMedia" placeholder="@username (optional)" disabled={isSubmitting} />
                    </div>
                  </div>
                </div>

                {/* Section 2: Internship Details */}
                <div className="form-section">
                  <h3 className="section-title">Section 2: Internship Details</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="position">Internship Position Applying For *</label>
                      <input type="text" id="position" name="position" placeholder="e.g., Software Development Intern" required disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="department">Preferred Department *</label>
                      <select id="department" name="department" required disabled={isSubmitting}>
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
                        <input type="radio" name="internshipType" value="on-site" required disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">On-site</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="internshipType" value="remote" required disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Remote</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="internshipType" value="hybrid" required disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Hybrid</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="duration">Duration Available *</label>
                      <select id="duration" name="duration" required disabled={isSubmitting}>
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
                      <input type="date" id="startDate" name="startDate" required disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label>College-Approved Internship</label>
                      <div className="radio-grid">
                        <label className="radio-item">
                          <input type="radio" name="collegeApproved" value="yes" disabled={isSubmitting} />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">Yes</span>
                        </label>
                        <label className="radio-item">
                          <input type="radio" name="collegeApproved" value="no" disabled={isSubmitting} />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">No</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group-modern">
                      <label>Academic Credits Required</label>
                      <div className="radio-grid">
                        <label className="radio-item">
                          <input type="radio" name="academicCredits" value="yes" disabled={isSubmitting} />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">Yes</span>
                        </label>
                        <label className="radio-item">
                          <input type="radio" name="academicCredits" value="no" disabled={isSubmitting} />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="otherCommitments">Any other commitments during internship period?</label>
                    <textarea id="otherCommitments" name="otherCommitments" rows="3" placeholder="e.g., classes, part-time work, exams" disabled={isSubmitting}></textarea>
                  </div>
                </div>

                {/* Section 3: Educational Background */}
                <div className="form-section">
                  <h3 className="section-title">Section 3: Educational Background</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="currentCourse">Current Course / Degree *</label>
                      <input type="text" id="currentCourse" name="currentCourse" placeholder="e.g., B.Tech, MBA, M.Sc" required disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="college">College/University Name *</label>
                      <input type="text" id="college" name="college" placeholder="Name of your institution" required disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="fieldOfStudy">Field of Study *</label>
                      <input type="text" id="fieldOfStudy" name="fieldOfStudy" placeholder="e.g., Computer Science, Business Administration" required disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="yearOfStudy">Year of Study *</label>
                      <select id="yearOfStudy" name="yearOfStudy" required disabled={isSubmitting}>
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
                      <input type="number" id="graduationYear" name="graduationYear" placeholder="2025" min="2024" max="2030" required disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="gpa">Current GPA / Percentage</label>
                      <input type="text" id="gpa" name="gpa" placeholder="e.g., 8.5/10 or 85%" disabled={isSubmitting} />
                    </div>
                  </div>
                </div>

                {/* Section 4: Skills & Tools */}
                <div className="form-section">
                  <h3 className="section-title">Section 4: Skills & Tools</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="languages">Languages Known *</label>
                      <input type="text" id="languages" name="languages" placeholder="e.g., English, Hindi, French" required disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="technicalSkills">Technical / Domain-Specific Skills *</label>
                      <input type="text" id="technicalSkills" name="technicalSkills" placeholder="e.g., Java, Python, Figma, SEO, Excel" required disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="softwareTools">Software/Tools Proficient In</label>
                      <input type="text" id="softwareTools" name="softwareTools" placeholder="e.g., Adobe Creative Suite, MS Office, Tableau" disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="certifications">Certifications (if any)</label>
                      <input type="text" id="certifications" name="certifications" placeholder="List any relevant certifications" disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="remoteComfort">Rate your comfort with remote collaboration tools (Zoom, Slack, etc.) *</label>
                    <select id="remoteComfort" name="remoteComfort" required disabled={isSubmitting}>
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
                        <input type="radio" name="priorInternships" value="yes" disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Yes</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="priorInternships" value="no" disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">No</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="internshipDetails">If yes, mention organization, role, and duration:</label>
                    <textarea id="internshipDetails" name="internshipDetails" rows="3" placeholder="Organization: ABC Corp, Role: Marketing Intern, Duration: 2 months" disabled={isSubmitting}></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="projects">List any personal/academic projects relevant to this role:</label>
                    <textarea id="projects" name="projects" rows="4" placeholder="• Project 1: Description and technologies used&#10;• Project 2: Link to GitHub/demo if available" disabled={isSubmitting}></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="resume">Upload your Resume (PDF only) *</label>
                    <input type="file" id="resume" name="resume" accept=".pdf" className="file-input" required disabled={isSubmitting} />
                    <small className="form-help-text">Please upload your resume in PDF format only</small>
                  </div>
                </div>

                {/* Section 6: Motivational & Fit Questions */}
                <div className="form-section">
                  <h3 className="section-title">Section 6: Motivational & Fit Questions</h3>
                  
                  <div className="form-group-full-modern">
                    <label htmlFor="whyIntern">Why do you want to intern with us? *</label>
                    <textarea id="whyIntern" name="whyIntern" rows="4" placeholder="Tell us what attracts you to our company and this internship opportunity" required disabled={isSubmitting}></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="hopeToLearn">What do you hope to learn during this internship? *</label>
                    <textarea id="hopeToLearn" name="hopeToLearn" rows="3" placeholder="Describe the skills and knowledge you want to gain" required disabled={isSubmitting}></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="goodFit">What makes you a good fit for this role? *</label>
                    <textarea id="goodFit" name="goodFit" rows="4" placeholder="Highlight your relevant skills, experience, and qualities" required disabled={isSubmitting}></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="challenge">Describe a challenge you've overcome (academic or personal) *</label>
                    <textarea id="challenge" name="challenge" rows="4" placeholder="Share a specific example and how you handled it" required disabled={isSubmitting}></textarea>
                  </div>

                  <div className="form-group-full-modern">
                    <label>Are you open to extending the internship based on performance?</label>
                    <div className="radio-grid">
                      <label className="radio-item">
                        <input type="radio" name="extendInternship" value="yes" disabled={isSubmitting} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Yes</span>
                      </label>
                      <label className="radio-item">
                        <input type="radio" name="extendInternship" value="no" disabled={isSubmitting} />
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
                      <select id="hoursPerWeek" name="hoursPerWeek" required disabled={isSubmitting}>
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
                          <input type="radio" name="techRequirements" value="yes" required disabled={isSubmitting} />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">Yes</span>
                        </label>
                        <label className="radio-item">
                          <input type="radio" name="techRequirements" value="no" required disabled={isSubmitting} />
                          <span className="radio-checkmark"></span>
                          <span className="radio-text">No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="scheduledEvents">Do you have any exams, vacations, or events scheduled during the internship period?</label>
                    <textarea id="scheduledEvents" name="scheduledEvents" rows="3" placeholder="Please mention any dates or periods you'll be unavailable" disabled={isSubmitting}></textarea>
                  </div>
                </div>

                {/* Section 8: Reference (Optional) */}
                <div className="form-section">
                  <h3 className="section-title">Section 8: Reference (Optional)</h3>
                  
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="refName">Reference Name</label>
                      <input type="text" id="refName" name="refName" placeholder="Full name of your reference" disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="refDesignation">Designation & Organization</label>
                      <input type="text" id="refDesignation" name="refDesignation" placeholder="e.g., Professor, XYZ University" disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="refEmail">Email</label>
                      <input type="email" id="refEmail" name="refEmail" placeholder="reference@email.com" disabled={isSubmitting} />
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="refPhone">Phone</label>
                      <input type="tel" id="refPhone" name="refPhone" placeholder="+91 98765 43210" disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="refRelationship">Relationship to You</label>
                    <input type="text" id="refRelationship" name="refRelationship" placeholder="e.g., Professor, Previous Supervisor, Mentor" disabled={isSubmitting} />
                  </div>
                </div>

                {/* Section 9: Declaration */}
                <div className="form-section">
                  <h3 className="section-title">Section 9: Declaration</h3>
                  
                  <div className="form-group-full-modern">
                    <label className="checkbox-item checkbox-single">
                      <input type="checkbox" id="certifyInfo" name="certifyInfo" required disabled={isSubmitting} />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">I certify that the information provided is true and correct to the best of my knowledge. *</span>
                    </label>
                  </div>

                  <div className="form-group-full-modern">
                    <label className="checkbox-item checkbox-single">
                      <input type="checkbox" id="understandTerms" name="understandTerms" required disabled={isSubmitting} />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">I understand that this is an unpaid/paid internship depending on the company's policy. *</span>
                    </label>
                  </div>

                  <div className="form-group-full-modern">
                    <label className="checkbox-item checkbox-single">
                      <input type="checkbox" id="agreeTerms" name="agreeTerms" required disabled={isSubmitting} />
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
                    <input type="file" id="coverLetter" name="coverLetter" accept=".pdf,.doc,.docx" className="file-input" disabled={isSubmitting} />
                    <small className="form-help-text">Upload your cover letter (PDF, DOC, or DOCX)</small>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="certificates">Certificates / Transcripts (Optional)</label>
                    <input type="file" id="certificates" name="certificates" accept=".pdf,.doc,.docx,.jpg,.png" className="file-input" multiple disabled={isSubmitting} />
                    <small className="form-help-text">Upload relevant certificates or transcripts</small>
                  </div>

                  <div className="form-group-full-modern">
                    <label htmlFor="videoIntro">Video Introduction (Optional - max 2 mins)</label>
                    <input type="file" id="videoIntro" name="videoIntro" accept=".mp4,.mov,.avi" className="file-input" disabled={isSubmitting} />
                    <small className="form-help-text">Upload a short video introduction (max 2 minutes)</small>
                  </div>
                </div>

                <div className="form-actions-modern">
                  <button type="submit" className="submit-btn-modern" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
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
