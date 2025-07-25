import React, { useState } from 'react';
import '../styles/ContactUs.css';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    howDidYouHear: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      howDidYouHear: '',
      message: ''
    });
  };

  return (
    <>
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
                  />
                </div>
                <div className="ganglia-form-field">
                  <label>How did you hear about Ganglia?</label>
                  <select
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    required
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
                />
              </div>
              <button type="submit">Send Message</button>
            </form>
            
            <div className="ganglia-contact-info">
              <h3>Connect with us</h3>
              <p>director@ganglia.in</p>
              <p>(+91) 81097 82903</p>
              
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
        
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;