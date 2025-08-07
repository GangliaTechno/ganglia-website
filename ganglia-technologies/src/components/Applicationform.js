import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Applicationform.css';

export default function ApplicationForm() {
  const { jobId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const parse = (description) => {
    if (!description) return null;
    try {
      if (typeof description === 'object') return description;
      return JSON.parse(description);
    } catch {
      return { "Job Description": description };
    }
  };

  const jobDetails = parse(state?.jobDescription);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

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

    const emailSubject = `New Job Application - ${state?.jobTitle || 'Position'} (Job ID: ${jobId})`;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
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
          <p style="color: #28a745;"><strong>✅ Resume attached</strong></p>
        </div>
        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
        <p style="color: #6c757d; font-size: 14px;">
          This application was submitted through the website's career portal.<br/>
          Please review and contact the candidate if suitable.
        </p>
        <p style="color: #6c757d; font-size: 14px;">
          <strong>Best regards,</strong><br/>
          Career Portal System
        </p>
      </div>
    `;

    try {
      const formData = new FormData();
      formData.append('recipient', 'director@ganglia.in');
      formData.append('subject', emailSubject);
      formData.append('body', emailBody);
      formData.append('pdf_file', form.resume);

      const response = await fetch('https://tmmail.onrender.com/send-email-with-pdf/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
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
        const fileInput = document.getElementById('resume-upload');
        if (fileInput) fileInput.value = '';

        toast.success("Application submitted successfully! Resume sent.");

        setTimeout(() => {
          setIsSubmitting(false);
          navigate('/careers');
        }, 2000);
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting:', error);
      toast.error(`Submit failed: ${error.message}`);
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
        className="p-4"
        toastClassName={() => "relative flex p-6 rounded-md justify-between cursor-pointer bg-white text-black"}
      />

      {/* LEFT HALF: job details */}
      {jobDetails && (
        <div className="job-details-section">
          <h2>Job Details</h2>
          <div className="job-details-content">
            {Object.entries(jobDetails).map(([key, value]) => (
              <div key={key} className="job-detail-item">
                <h3 className="job-detail-title">{key}</h3>
                <ul className="job-detail-list">
                  {value.split('\n').map((line, i) => line.trim() ? <li key={i}>{line}</li> : null)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RIGHT HALF: form container */}
      <div className="form-container">
        {/* Back Button */}
        <button
          type="button"
          className="btn btn-back btn-secondary"
          style={{ marginBottom: '1rem' }}
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
        >
          ← Back
        </button>

        <div className="form-header">
          <h1>Apply for {state?.jobTitle ?? 'Position'}</h1>
          <p>Please fill in your details below</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name *"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email *"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone *"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="currentLocation"
                value={form.currentLocation}
                onChange={handleChange}
                placeholder="Current Location *"
                required
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
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Years of Experience *"
                required
                min="0"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group full-width">
              <textarea
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Key Skills *"
                rows="3"
                required
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
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="file-input-label" tabIndex={0}>
                  <span role="img" aria-label="document">📄</span> {form.resume ? form.resume.name : 'Upload Resume (PDF) *'}
                </label>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
