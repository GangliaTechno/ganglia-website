import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Applicationform.css';

export default function ApplicationForm() {
  const { jobId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    currentLocation: '',
    linkedin: '',
    experience: '',
    skills: '',
    tools: '',
    resume: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to parse job description if it's a JSON string
  const parseJobDescription = (description) => {
    if (!description) return null;
    
    try {
      // If it's already an object, return it
      if (typeof description === 'object') {
        return description;
      }
      
      // If it's a string, try to parse it as JSON
      return JSON.parse(description);
    } catch (error) {
      // If parsing fails, return the original description as plain text
      return { "Job Description": description };
    }
  };

  const jobDetails = parseJobDescription(state?.jobDescription);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate PDF file
    if (!form.resume) {
      toast.error("Please upload your resume");
      setIsSubmitting(false);
      return;
    }

    if (form.resume.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      setIsSubmitting(false);
      return;
    }

    // Prepare email content
    const emailSubject = `New Job Application - ${state?.jobTitle || 'Position'} (Job ID: ${jobId})`;
    
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          🎯 NEW JOB APPLICATION RECEIVED
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">📋 POSITION DETAILS</h3>
          <p><strong>Position:</strong> ${state?.jobTitle || 'Position'}</p>
          <p><strong>Job ID:</strong> ${jobId}</p>
        </div>

        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">👤 APPLICANT INFORMATION</h3>
          <p><strong>Name:</strong> ${form.name}</p>
          <p><strong>Email:</strong> ${form.email}</p>
          <p><strong>Phone:</strong> ${form.phone}</p>
          <p><strong>Location:</strong> ${form.currentLocation}</p>
          <p><strong>LinkedIn:</strong> ${form.linkedin || 'Not provided'}</p>
          <p><strong>Experience:</strong> ${form.experience} years</p>
        </div>

        <div style="background-color: #f0fff4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">💼 SKILLS & QUALIFICATIONS</h3>
          <p><strong>Key Skills:</strong></p>
          <p style="white-space: pre-line;">${form.skills}</p>
          
          ${form.tools ? `
            <p><strong>Tools & Technologies:</strong></p>
            <p style="white-space: pre-line;">${form.tools}</p>
          ` : ''}
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">📄 RESUME</h3>
          <p><strong>File Name:</strong> ${form.resume.name}</p>
          <p><strong>File Size:</strong> ${(form.resume.size / 1024 / 1024).toFixed(2)} MB</p>
          <p style="color: #28a745;"><strong>✅ Resume attached to this email</strong></p>
        </div>

        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
        
        <p style="color: #6c757d; font-size: 14px;">
          This application was submitted through your website's career portal.<br>
          Please review and contact the candidate if suitable.
        </p>
        
        <p style="color: #6c757d; font-size: 14px;">
          <strong>Best regards,</strong><br>
          Career Portal System
        </p>
      </div>
    `;

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('recipient', 'director@ganglia.in');
      formData.append('subject', emailSubject);
      formData.append('body', emailBody);
      formData.append('pdf_file', form.resume);

      const response = await fetch('https://tmmail.onrender.com/send-email-with-pdf/', {
        method: 'POST',
        body: formData // No Content-Type header needed for FormData
      });

      if (response.ok) {
        // Reset form
        setForm({
          name: '',
          email: '',
          phone: '',
          currentLocation: '',
          linkedin: '',
          experience: '',
          skills: '',
          tools: '',
          resume: null
        });

        // Clear file input
        const fileInput = document.getElementById('resume-upload');
        if (fileInput) fileInput.value = '';

        toast.success("Application submitted successfully! Your resume has been sent.");
        
        setTimeout(() => {
          setIsSubmitting(false);
          navigate('/careers');
        }, 2000);

      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(`Failed to submit application: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="application-form-wrapper">
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
      
      <div className="form-container">
        <div className="form-header">
          <h1>Apply for {state?.jobTitle ?? 'Position'}</h1>
          <p>Please fill in your details below</p>
        </div>

        {/* Job Details Section */}
        {jobDetails && (
          <div className="job-details-section">
            <h2>Job Details</h2>
            <div className="job-details-content">
              {Object.entries(jobDetails).map(([key, value]) => (
                <div key={key} className="job-detail-item">
                  <h3 className="job-detail-title">{key}</h3>
                  <div className="job-detail-description">
                    {value.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <input 
                required 
                name="name" 
                value={form.name} 
                onChange={handleChange}
                placeholder="Full Name *"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <input 
                required 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange}
                placeholder="Email Address *"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <input 
                required 
                type="tel" 
                name="phone" 
                value={form.phone} 
                onChange={handleChange}
                placeholder="Phone Number *"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <input 
                required 
                name="currentLocation" 
                value={form.currentLocation} 
                onChange={handleChange}
                placeholder="Current Location *"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <input 
                type="url" 
                name="linkedin" 
                value={form.linkedin} 
                onChange={handleChange}
                placeholder="LinkedIn Profile"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <input 
                required 
                type="number" 
                name="experience" 
                value={form.experience} 
                onChange={handleChange}
                min="0" 
                placeholder="Years of Experience *"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group full-width">
              <textarea 
                required 
                name="skills" 
                value={form.skills} 
                onChange={handleChange}
                placeholder="Key Skills *"
                rows="3"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group full-width">
              <textarea 
                name="tools" 
                value={form.tools} 
                onChange={handleChange}
                placeholder="Tools & Technologies"
                rows="3"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group full-width">
              <div className="file-input-wrapper">
                <input 
                  required 
                  type="file" 
                  accept=".pdf" 
                  name="resume" 
                  onChange={handleChange}
                  id="resume-upload"
                  disabled={isSubmitting}
                />
                <label htmlFor="resume-upload" className="file-input-label">
                  <span>📄</span>
                  {form.resume ? form.resume.name : 'Upload Resume (PDF) *'}
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
