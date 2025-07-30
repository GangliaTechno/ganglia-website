import React, { useState, useEffect, useMemo } from 'react';
import '../styles/research.css';
import research from '../assets/Research.json';
import file from '../assets/file.json';
import trophy from '../assets/Trophy.json';
import { Player } from '@lottiefiles/react-lottie-player';
import Footer from './Footer';


const ResearchPage = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  // Paper data
  const paperData = useMemo(() => [
    {
      id: 'paper1',
      title: "Instance Segmentation and Contrastive Clustering Techniques for White Blood Cell Analysis",
      type: "Research Article",
      status: "Accepted for publishing",
      authors: "Akshathaa Avinash Annadhani, Bhavana Baalebail, Dashrathraj K Shetty, Sharanya G Hegde, Deekshith R Prabhu, Phani Kumar Pullela, Namesh Malarout",
      abstract: "White blood cell (WBC) analysis using artificial intelligence (AI) is growing rapidly. However, many available datasets lack labels, making supervised learning approaches challenging. This review uses both qualitative and quantitative methods. It includes peer-reviewed studies from Scopus indexed journals. Sources were selected from the Scopus. The review groups findings into three key areas: segmentation, clustering, and health scoring. Contrastive clustering enables grouping of cells without labels. New health scoring methods allow assessment of cell health and model confidence. Despite progress, challenges remain. Models often lack robust testing when ground truth data is unavailable. Ethical concerns and limited model explainability also pose barriers. Future research should aim to integrate segmentation, clustering, and clinical objectives within a unified framework.",
      keywords: ["White Blood Cell Analysis", "Instance Segmentation", "Contrastive Clustering", "Artificial Intelligence", "Medical Imaging"]
    },
    {
      id: 'paper2',
      title: "Explainable AI-Based System for Automated Detection of Cardiovascular Disease Detection from ECG Images: A Theoretical Review",
      type: "Review Article",
      status: "Accepted for publishing",
      authors: "Anoop P, K Sindhu Kamath, Dashrathraj K Shetty, Sharanya G Hegde, Deekshtih R Prabhu, Phani Kumar Pullela, Praveen Shastry",
      abstractSections: [
        {
          title: "Introduction",
          content: "Deep learning applied to electrocardiogram (ECG) images is changing cardiac diagnostics. But understanding how these systems work remains a major theoretical and practical challenge. This review focuses on Explainable AI (XAI) models for automatic heart disease detection from ECG images, with attention to theoretical insights."
        },
        {
          title: "Methods",
          content: "A systematic thematic review was conducted using Scopus and Web of Science. The focus was on theoretical and quantitative aspects of XAI, ECG, and deep learning. Studies were grouped by model type, interpretation method, and theoretical contribution."
        },
        {
          title: "Results",
          content: "The review found three trends: more use of saliency-based XAI methods such as Grad-CAM and SHAP; increasing use of CNN and transformer models for ECG analysis; and early development of theoretical frameworks assessing AI reliability. Few studies explored explainability in depth."
        },
        {
          title: "Conclusion",
          content: "A key challenge is linking model interpretability to clinical meaning. This review highlights the need for human-centred design, model causability, and cross-disciplinary theory to improve XAI use in cardiology."
        }
      ],
      keywords: ["Machine Learning", "Deep Learning", "Convolutional Neural Networks", "Transfer Learning", "Grad-CAM", "Explainable AI", "ECG Analysis"]
    }
  ], []);

  // Animation effects
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.rsch-fade-in-element');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll effects
  useEffect(() => {
    let ticking = false;
    
    const updateScrollEffects = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.rsch-hero-wrapper');
      
      parallaxElements.forEach(el => {
        const speed = 0.5;
        if (el) {
          el.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  // Stats Component
  const StatsSection = () => (
    <div className="rsch-stats-wrapper">
      <div className="rsch-stats-grid">
        <div className="rsch-stat-card">
          <div className="rsch-stat-icon"><Player autoplay loop src={file} style={{ height: 55, width: 55 }} /></div>
          <div className="rsch-stat-number">2</div>
          <div className="rsch-stat-label">Published Papers</div>
        </div>
        <div className="rsch-stat-card">
          <div className="rsch-stat-icon"><Player autoplay loop src={research} style={{ height: 55, width: 55 }} /></div>
          <div className="rsch-stat-number">5+</div>
          <div className="rsch-stat-label">Research Areas</div>
        </div>
        <div className="rsch-stat-card">
          <div className="rsch-stat-icon"><Player autoplay loop src={trophy} style={{ height: 55, width: 55 }} /></div>
          <div className="rsch-stat-number">100%</div>
          <div className="rsch-stat-label">Acceptance Rate</div>
        </div>
      </div>
    </div>
  );

  // Paper Card Component
  const PaperCard = ({ paper }) => (
    <div className="rsch-paper-card" data-paper-id={paper.id}>
      <div className="rsch-paper-header">
        <h3 className="rsch-paper-title">{paper.title}</h3>
        <div className="rsch-paper-meta">
          <span className="rsch-paper-type">{paper.type}</span>
          <span className="rsch-paper-status">{paper.status}</span>
        </div>
      </div>
      
      <div className="rsch-paper-authors">
        <h4 className="rsch-section-subtitle">Authors:</h4>
        <p className="rsch-authors-text">{paper.authors}</p>
      </div>

      <div className="rsch-paper-abstract">
        <h4 className="rsch-section-subtitle">Abstract:</h4>
        {paper.abstract ? (
          <p className="rsch-abstract-text">{paper.abstract}</p>
        ) : (
          <div className="rsch-abstract-sections">
            {paper.abstractSections.map((section, index) => (
              <div key={index} className="rsch-abstract-section">
                <strong className="rsch-section-title">{section.title}:</strong>{' '}
                <span className="rsch-section-content">{section.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rsch-paper-keywords">
        <h4 className="rsch-section-subtitle">Keywords:</h4>
        <div className="rsch-keywords-container">
          {paper.keywords.map((keyword, index) => (
            <span key={index} className="rsch-keyword-tag">{keyword}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div id="research-main-container">
      {/* Hero Section */}
      <div className="rsch-hero-wrapper">
        <div 
          id="hero-content"
          className={`rsch-hero-content rsch-fade-in-element ${visibleElements.has('hero-content') ? 'rsch-visible' : ''}`}
        >
          <h1 className="rsch-main-heading">Research Papers</h1>
          <p className="rsch-hero-description">
            Advancing healthcare through cutting-edge research and innovation
          </p>
          <div className="rsch-hero-divider"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div 
        id="stats-section"
        className={`rsch-fade-in-element ${visibleElements.has('stats-section') ? 'rsch-visible' : ''}`}
      >
        <StatsSection />
      </div>

      {/* About Section */}
      <div 
        id="about-section"
        className={`rsch-about-wrapper rsch-fade-in-element ${visibleElements.has('about-section') ? 'rsch-visible' : ''}`}
      >
        <div className="rsch-about-container">
          <div className="rsch-about-content">
            <h2 className="rsch-about-heading">
              Pioneering <span className="rsch-highlight-text">Medical Research</span>
            </h2>
            <p className="rsch-about-text">
              Our research focuses on developing innovative AI-driven solutions for healthcare challenges, 
              from automated disease detection to advanced medical device technologies. We collaborate with 
              leading researchers and institutions to push the boundaries of medical innovation.
            </p>
            <div className="rsch-area-tags">
              <div className="rsch-area-tag">AI in Healthcare</div>
              <div className="rsch-area-tag">Medical Imaging</div>
              <div className="rsch-area-tag">Disease Detection</div>
              <div className="rsch-area-tag">Explainable AI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Papers Section */}
      <div 
        id="papers-section"
        className={`rsch-papers-wrapper rsch-fade-in-element ${visibleElements.has('papers-section') ? 'rsch-visible' : ''}`}
      >
        <div className="rsch-papers-container">
          <h2 className="rsch-section-heading">Published Research Papers</h2>
          <div className="rsch-papers-grid">
            {paperData.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default ResearchPage;
