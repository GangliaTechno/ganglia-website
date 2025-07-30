"use client";
import React, { useMemo } from "react";
import Footer from "./Footer";
import '../styles/research.css';

function ResearchPapers() {
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

  // Simplified AnimatedSection - Always visible
  const AnimatedSection = React.memo(({ id, className, children }) => {
    const sectionClass = useMemo(() => {
      return `slide-element ${className} visible`;
    }, [className]);

    return (
      <div id={id} className={sectionClass}>
        {children}
      </div>
    );
  });

  // Paper Component
  const PaperCard = React.memo(({ paper }) => (
    <div className="research-paper-card">
      <div className="research-paper-header">
        <h3 className="research-paper-title">{paper.title}</h3>
        <div className="research-paper-meta">
          <span className="research-paper-type">{paper.type}</span>
          <span className="research-paper-status">{paper.status}</span>
        </div>
      </div>
      
      <div className="research-paper-authors">
        <h4>Authors:</h4>
        <p>{paper.authors}</p>
      </div>

      <div className="research-paper-abstract">
        <h4>Abstract:</h4>
        {paper.abstract ? (
          <p>{paper.abstract}</p>
        ) : (
          <div className="research-abstract-sections">
            {paper.abstractSections.map((section, index) => (
              <div key={index} className="research-abstract-section">
                <strong>{section.title}:</strong> {section.content}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="research-paper-keywords">
        <h4>Keywords:</h4>
        <div className="research-keywords-list">
          {paper.keywords.map((keyword, index) => (
            <span key={index} className="research-keyword">{keyword}</span>
          ))}
        </div>
      </div>
    </div>
  ));

  // Research Stats Component
  const ResearchStats = React.memo(() => (
    <div className="research-stats">
      <div className="research-stat-item">
        <div className="research-stat-icon">📊</div>
        <div className="research-stat-number">2</div>
        <div className="research-stat-label">Published Papers</div>
      </div>
      <div className="research-stat-item">
        <div className="research-stat-icon">🔬</div>
        <div className="research-stat-number">5+</div>
        <div className="research-stat-label">Research Areas</div>
      </div>
      <div className="research-stat-item">
        <div className="research-stat-icon">🏆</div>
        <div className="research-stat-number">100%</div>
        <div className="research-stat-label">Acceptance Rate</div>
      </div>
    </div>
  ));

  return (
    <div className="research-container">
      {/* Hero Section */}
      <div className="research-hero-section">
        <AnimatedSection
          id="header"
          className="slide-up research-header"
        >
          <div className="hero-content">
            <h1 className="research-main-title">Research Papers</h1>
            <p className="research-description">
              Advancing healthcare through cutting-edge research and innovation
            </p>
            <div className="hero-divider"></div>
          </div>
        </AnimatedSection>
      </div>

      {/* Stats Section */}
      <AnimatedSection
        id="stats-section"
        className="slide-up research-stats-section"
      >
        <ResearchStats />
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection
        id="about-section"
        className="slide-up research-about-section"
      >
        <div className="research-about-container">
          <div className="research-about-content">
            <h2 className="research-about-title">
              Pioneering <span className="research-highlight">Medical Research</span>
            </h2>
            <p className="research-about-description">
              Our research focuses on developing innovative AI-driven solutions for healthcare challenges, 
              from automated disease detection to advanced medical device technologies. We collaborate with 
              leading researchers and institutions to push the boundaries of medical innovation.
            </p>
            <div className="research-areas">
              <div className="research-area-tag">AI in Healthcare</div>
              <div className="research-area-tag">Medical Imaging</div>
              <div className="research-area-tag">Disease Detection</div>
              <div className="research-area-tag">Explainable AI</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Research Papers Section */}
      <AnimatedSection
        id="papers-section"
        className="slide-up research-papers-section"
      >
        <div className="research-papers-container">
          <h2 className="research-section-title">Published Research Papers</h2>
          <div className="research-papers-grid">
            {paperData.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ResearchPapers;
