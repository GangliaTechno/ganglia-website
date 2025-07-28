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

    // Prepare email content
    const emailSubject = `New Job Application - ${state?.jobTitle || 'Position'} (Job ID: ${jobId})`;
    
    const emailBody = `
🎯 NEW JOB APPLICATION RECEIVED

═══════════════════════════════════════

📋 POSITION DETAILS
Position: ${state?.jobTitle || 'Position'}
Job ID: ${jobId}

👤 APPLICANT INFORMATION
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Location: ${form.currentLocation}
LinkedIn: ${form.linkedin || 'Not provided'}
Experience: ${form.experience} years

💼 SKILLS & QUALIFICATIONS
Key Skills:
${form.skills}

Tools & Technologies:
${form.tools || 'Not specified'}

📄 RESUME
File Name: ${form.resume ? form.resume.name : 'No resume uploaded'}

⚠️ NOTE: Resume file was uploaded but cannot be attached via email.

═══════════════════════════════════════

This application was submitted through your website's career portal.
Please review and contact the candidate if suitable.

Best regards,
Career Portal System
    `;

    try {
      // Send email via your custom API
      const response = await fetch('https://tmmail.onrender.com/send-email/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: "director@ganglia.in", // Change this to your actual recipient email
          subject: emailSubject,
          body: emailBody
        })
      });

      if (response.ok) {
        // Reset form on successful submission
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

        toast.success("Application submitted successfully!");
        
        // Navigate back after showing success message
        setTimeout(() => {
          setIsSubmitting(false);
          navigate('/careers');
        }, 2000);

      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Failed to submit application. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="application-form-wrapper">
      {/* Toast notification container */}
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