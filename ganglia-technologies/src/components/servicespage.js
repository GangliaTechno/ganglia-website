import React, { useState } from 'react';
import '../styles/servicepage.css';
import Footer from './Footer';

// Import your service images
import healthcareImage from '../assets/ai.png';
import enterpriseImage from '../assets/medical.png';
import consultingImage from '../assets/health.png';
import aiImage from '../assets/consulting.png';

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const services = [
    {
      id: 1,
      title: "Healthcare Tech",
      subtitle: "Smart medical devices, telemedicine platforms and patient data management",
      image: consultingImage,
      alt: "Healthcare Technology Solutions",
      features: [
        "Custom telemedicine platform development",
        "IoT-enabled medical device integration",
        "HIPAA-compliant patient data management systems",
        "Real-time health monitoring solutions",
        "Electronic Health Record (EHR) systems",
        "Medical imaging and diagnostic tools"
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "AWS Healthcare", "HL7 FHIR", "WebRTC"]
    },
    {
      id: 2,
      title: "Medical Enterprise Software",
      subtitle: "Scalable Business Solutions tailored to client needs",
      image: enterpriseImage,
      alt: "Medical Enterprise Software Solutions",
      features: [
        "Hospital Management Systems (HMS)",
        "Practice Management Software",
        "Medical Billing and Revenue Cycle Management",
        "Pharmacy Management Systems",
        "Laboratory Information Management Systems (LIMS)",
        "Medical Inventory and Supply Chain Management"
      ],
      technologies: ["Java Spring", "Angular", "PostgreSQL", "Microservices", "Docker", "Kubernetes"]
    },
    {
      id: 3,
      title: "Consulting & Custom Development",
      subtitle: "AI Strategy & Automation for Business Growth",
      image: aiImage,
      alt: "Consulting and Custom Development Services",
      features: [
        "Digital transformation consulting",
        "Custom software architecture design",
        "Business process automation",
        "Legacy system modernization",
        "API development and integration",
        "Cloud migration strategies"
      ],
      technologies: ["Python", "Django", "React", "AWS", "Azure", "GraphQL"]
    },
    {
      id: 4,
      title: "AI Powered Applications",
      subtitle: "Intelligent automation, Machine Learning and NLP models",
      image: healthcareImage,
      alt: "AI Powered Applications and Machine Learning",
      features: [
        "Custom AI model development",
        "Natural Language Processing solutions",
        "Computer Vision applications",
        "Predictive analytics platforms",
        "Chatbot and virtual assistant development",
        "Machine Learning pipeline automation"
      ],
      technologies: ["TensorFlow", "PyTorch", "OpenAI API", "Scikit-learn", "FastAPI", "Docker"]
    }
  ];

  return (
    <div>
      <div className="services-container1">
        <header className="services-header1">
          <h1>Our Services</h1>
          <p>Comprehensive solutions tailored to drive your business forward</p>
        </header>

        <div className="services-list1">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-item1 ${expandedService === index ? 'expanded1' : ''}`}
            >
              <div className="service-icon1">
                <img 
                  src={service.image} 
                  alt={service.alt}
                  className="service-image1"
                  onError={(e) => {
                    // Fallback in case image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback icon div */}
                <div className={`icon1 ${service.id === 1 ? 'healthcare-icon1' : service.id === 2 ? 'enterprise-icon1' : service.id === 3 ? 'consulting-icon1' : 'ai-icon1'}`} style={{display: 'none'}}></div>
              </div>
              
              <div className="service-content1">
                <div className="service-header1" onClick={() => toggleService(index)}>
                  <h2>{service.title}</h2>
                  <span className="expand-btn1">
                    {expandedService === index ? '−' : '+'}
                  </span>
                </div>
                
                <p className="service-subtitle1">{service.subtitle}</p>
                
                <div className="service-details1">
                  <h3>What We Offer:</h3>
                  <ul>
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  
                  <h3>Technologies:</h3>
                  <div className="tech-tags1">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
