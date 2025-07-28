"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
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

  // Memoize paper data to prevent re-renders
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

  // Optimized scroll handler with debouncing
  const handleScroll = React.useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) { // Increased threshold
        const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
        setState(prev => ({
          ...prev,
          scrollDirection: newDirection
        }));
        lastScrollY.current = currentScrollY;
      }
    }, 32); // Reduced frequency to 30fps
  }, []);

  // Simplified intersection observer
  const setupIntersectionObserver = React.useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        setState(prev => {
          const newVisible = new Set(prev.visibleElements);
          let hasChanges = false;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
              newVisible.add(entry.target.id);
              hasChanges = true;
            }
          });

          return hasChanges ? { ...prev, visibleElements: newVisible } : prev;
        });
      },
      {
        threshold: [0.2], // Single threshold
        rootMargin: '100px 0px -50px 0px'
      }
    );

    // Only observe essential elements
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

  // Setup intersection observer with delay
  useEffect(() => {
    const timeoutId = setTimeout(setupIntersectionObserver, 200); // Increased delay
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

  // Simplified AnimatedSection
  const AnimatedSection = React.memo(({ 
    id, 
    className, 
    children, 
    isVisible
  }) => {
    const sectionClass = useMemo(() => {
      return `slide-element ${className} ${isVisible ? 'visible' : ''}`;
    }, [className, isVisible]);

    return (
      <div id={id} className={sectionClass}>
        {children}
      </div>
    );
  });

  // Memoized Paper Component
  const PaperCard = React.memo(({ paper }) => (
    <div className="paper-card">
      <div className="paper-header">
        <h3 className="paper-title">{paper.title}</h3>
        <div className="paper-meta">
          <span className="paper-type">{paper.type}</span>
          <span className="paper-status">{paper.status}</span>
        </div>
      </div>
      
      <div className="paper-authors">
        <h4>Authors:</h4>
        <p>{paper.authors}</p>
      </div>

      <div className="paper-abstract">
        <h4>Abstract:</h4>
        {paper.abstract ? (
          <p>{paper.abstract}</p>
        ) : (
          <div className="abstract-sections">
            {paper.abstractSections.map((section, index) => (
              <div key={index} className="abstract-section">
                <strong>{section.title}:</strong> {section.content}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="paper-keywords">
        <h4>Keywords:</h4>
        <div className="keywords-list">
          {paper.keywords.map((keyword, index) => (
            <span key={index} className="keyword">{keyword}</span>
          ))}
        </div>
      </div>
    </div>
  ));

  // Simplified animation components (remove heavy animations initially)
  const SimpleAnimationCollage = React.memo(() => (
    <div className="research-papers-collage simple-mode">
      {/* Simplified Paper Stack 1 */}
      <div className="paper-wrapper top-paper">
        <div className="paper-inner">
          <div className="paper-front">
            <div className="paper-container-simple">
              <div className="paper-icon">📄</div>
              <div className="paper-title">Research Papers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Chart 2 */}
      <div className="paper-wrapper bottom-left-paper">
        <div className="paper-inner">
          <div className="paper-front">
            <div className="chart-container-simple">
              <div className="chart-icon">📊</div>
              <div className="chart-title">Data Analysis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Medical 3 */}
      <div className="paper-wrapper bottom-right-paper">
        <div className="paper-inner">
          <div className="paper-front">
            <div className="medical-container-simple">
              <div className="medical-icon">🧬</div>
              <div className="medical-title">Medical Innovation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="research-container" style={{ margin: 0, padding: 0 }}>
      {/* Hero Section */}
      <div className="research-hero-section">
        <AnimatedSection
          id="header"
          className="slide-up research-header"
          isVisible={isElementVisible('header')}
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

      {/* About Section with Simplified Collage */}
      <div className="about-section">
        <div className="about-container">
          <div className="about-left">
            <SimpleAnimationCollage />
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
        >
          <div className="papers-container">
            <h2 className="section-title">Published Research Papers</h2>
            
            {/* Render papers using memoized component */}
            {paperData.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
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
