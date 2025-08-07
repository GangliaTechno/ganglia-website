import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    howDidYouHear: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare email content
    const emailSubject = `New Contact Form Submission - ${formData.subject}`;
    
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          📧 NEW CONTACT FORM SUBMISSION
        </h2>
        
        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">👤 CONTACT INFORMATION</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>How they heard about Ganglia:</strong> ${formData.howDidYouHear}</p>
        </div>

        <div style="background-color: #f0fff4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">💬 MESSAGE</h3>
          <p style="white-space: pre-line; line-height: 1.6;">${formData.message}</p>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">📞 NEXT STEPS</h3>
          <p>Please respond to <strong>${formData.email}</strong> to continue the conversation.</p>
          <p>Subject: Re: ${formData.subject}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
        
        <p style="color: #6c757d; font-size: 14px;">
          This message was submitted through your website's contact form.<br>
          Please review and respond accordingly.
        </p>
        
        <p style="color: #6c757d; font-size: 14px;">
          <strong>Best regards,</strong><br>
          Contact Form System
        </p>
      </div>
    `;

    try {
      const response = await fetch('https://tmmail.onrender.com/send-email/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipient: 'director@ganglia.in',
          subject: emailSubject,
          body: emailBody
        })
      });

      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          howDidYouHear: '',
          message: ''
        });

        toast.success("Message sent successfully! We will get back to you soon.");
        
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(`Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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

      {/* Fixed background wrapper */}
      <div className="ganglia-contact-page-wrapper"></div>
      
      {/* Content wrapper */}
      <div className="ganglia-contact-content-wrapper">
        <div className="ganglia-contact-container">
          <h1>Let's get down to <span className="ganglia-contact-highlight">business.</span></h1>
          <div className="ganglia-form-section">
            <form className="ganglia-contact-form" onSubmit={handleSubmit}>
              <div className="ganglia-form-row">
                <div className="ganglia-form-field">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="ganglia-form-field">
                  <label>Official Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="ganglia-form-row">
                <div className="ganglia-form-field">
                  <label>Subject:</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="ganglia-form-field">
                  <label>How did you hear about Ganglia?</label>
                  <select
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select an option</option>
                    <option value="Google">Google</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="ganglia-form-field ganglia-form-field-full-width">
                <label>Message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project or inquiry..."
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            <div className="ganglia-contact-info">
              <h3>Connect with us</h3>
              <p>director@ganglia.in</p>
              <p>(+91) 77600 42810</p>
              
              <h3>Address</h3>
              <p>
                Manipal Government of Karnataka Bioincubator,<br />
                3rd Floor, MAHE Advanced Research Centre<br />
                Behind MMMC,<br />
                Manipal, Karnataka 576104.
              </p>
              
              <h3>Working Hours</h3>
              <table className="ganglia-working-hours">
                <tbody>
                  <tr><td>Monday</td><td>9am to 5pm</td></tr>
                  <tr><td>Tuesday</td><td>9am to 5pm</td></tr>
                  <tr><td>Wednesday</td><td>9am to 5pm</td></tr>
                  <tr><td>Thursday</td><td>9am to 5pm</td></tr>
                  <tr><td>Friday</td><td>9am to 5pm</td></tr>
                  <tr><td>Saturday</td><td>9am to 5pm</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
