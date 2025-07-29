"use client";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import "../styles/MainComponent.css";

function MainComponent() {
  const pricingRef = useRef(null);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (pricingRef.current) {
        const rect = pricingRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) setShowPricing(true);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="main-page-root">
      {/* Animated Gradient Bubbles */}
      <div className="main-bubbles" aria-hidden>
        <span className="main-bubble lg a"></span>
        <span className="main-bubble md b"></span>
        <span className="main-bubble lg c"></span>
        <span className="main-bubble md d"></span>
        <span className="main-bubble sm e"></span>
        <span className="main-bubble sm f"></span>
      </div>
      {/* HERO */}
      <section className="main-hero-section">
        <div className="main-hero-grid">
          <div className="main-hero-left">
            <h1>Anushtaan</h1>
            <h2>The Ultimate AI-Driven Project Management Platform</h2>
            <p className="main-hero-tag">Rethink Project Management. Redefine Possibility.</p>
            <p className="main-hero-lead">
              Anushtaan isn't just another project management tool—it's a next-generation platform designed for professionals and organizations that demand efficiency, transparency, and intelligent control. Built by Ganglia Technologies, Anushtaan brings powerful AI and human-centered design to every stage of your projects.
            </p>
            <button className="main-primary-button">Discover Anushtaan</button>
          </div>
          <div className="main-hero-right">
            <div className="main-hero-logo" aria-label="Logo">🚀</div>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section className="main-about-section">
        <div className="main-about-flex">
          <div className="main-about-left">
            <h2>About Anushtaan</h2>
            <p>
              Anushtaan is a highly customizable Project Management Tool designed for professionals and organizations that demand transparency, efficiency, and control. With real-time time tracking, it ensures accurate billing and trust for hourly-based projects.
            </p>
            <p>
              Equipped with an advanced Admin Portal, Anushtaan provides deep visibility into project health through live dashboards, Gantt charts, Kanban boards, financial tracking, and data analytics. Admins can assign tasks, monitor team progress, manage budgets, and oversee quality settings, ensuring projects stay on track.
            </p>
          </div>
          <aside className="main-about-features">
            <h3>All Features</h3>
            <ul>
              {[
                'Intelligent Project Hours Tracking',
                'AI-Powered Productivity Assistant',
                'Dynamic Dashboards (30+ KPIs)',
                'Seamless Communication & Collaboration',
                'Customizable Views (Kanban, Gantt, Table)',
                'Personal Projects & Tasks Management',
                'Powerful Admin Portal',
                'Enterprise-Grade Security',
                'Real-Time Presence Indicators',
                'Smart Notifications & Email Alerts',
                'Dark, Light & System Modes',
                'PERT/CPM Critical Path Analysis'
              ].map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      {/* CORE FEATURES */}
      <section className="main-core-section">
        <h2>Core Features</h2>
        <div className="main-core-grid">
          <div className="main-core-card">
            <div className="main-core-card-head">
              <span className="main-core-icon">⏱️</span>
              <h3>Intelligent Hours Tracking</h3>
            </div>
            <ul>
              <li>
                <strong>Automated Time Logging:</strong> Smart timer automatically pauses when users step away and resumes when they return.
              </li>
              <li>
                <strong>Effortless Billing:</strong> Convert accurate, real-time hours into professional client invoices with complete transparency.
              </li>
            </ul>
          </div>
          <div className="main-core-card">
            <div className="main-core-card-head">
              <span className="main-core-icon">🤖</span>
              <h3>AI-Powered Productivity</h3>
            </div>
            <ul>
              <li>
                <strong>Conversational AI Assistant:</strong> Generate tasks, identify risks, or create entire projects through natural conversation.
              </li>
              <li>
                <strong>Smart Planning:</strong> AI analyzes resource allocation and foresees challenges to keep projects ahead of schedule.
              </li>
            </ul>
          </div>
          <div className="main-core-card">
            <div className="main-core-card-head">
              <span className="main-core-icon">📊</span>
              <h3>Dynamic Dashboards</h3>
            </div>
            <ul>
              <li>
                <strong>30+ KPIs Visualized:</strong> Dashboards track budgets, workloads, progress, and milestones at a glance.
              </li>
              <li>
                <strong>Real-Time Presence:</strong> Instantly see which team members are online and actively working.
              </li>
            </ul>
          </div>
          <div className="main-core-card">
            <div className="main-core-card-head">
              <span className="main-core-icon">💬</span>
              <h3>Communication & Collaboration</h3>
            </div>
            <ul>
              <li>
                <strong>Integrated Comments:</strong> Tag teammates, discuss progress on tasks, and keep conversations in context.
              </li>
              <li>
                <strong>Instant Notifications:</strong> Stay updated with real-time email alerts for every update and milestone.
              </li>
            </ul>
          </div>
          <div className="main-core-card">
            <div className="main-core-card-head">
              <span className="main-core-icon">📋</span>
              <h3>Customizable Views</h3>
            </div>
            <ul>
              <li>
                <strong>KANBAN Board:</strong> Drag-and-drop interface fully customizable to fit your team's process.
              </li>
              <li>
                <strong>Gantt Chart:</strong> Advanced PERT/CPM logic with critical path highlighting.
              </li>
              <li>
                <strong>Multiple UI Modes:</strong> Dark, Light & System modes for any environment.
              </li>
            </ul>
          </div>
          <div className="main-core-card">
            <div className="main-core-card-head">
              <span className="main-core-icon">🔒</span>
              <h3>Security You Can Trust</h3>
            </div>
            <ul>
              <li>
                <strong>Enterprise-Grade Security:</strong> AWS highly secure cloud infrastructure for data protection and scalability.
              </li>
              <li>
                <strong>Data Sovereignty:</strong> Enterprise customers get on-premises or dedicated server storage options.
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* GLIMPSE SECTION */}
      <section className="main-glimpse-section">
        <h2>Glimpse of Anushtaan</h2>
        <div className="main-glimpse-grid">
          <div className="main-glimpse-card">
            <div className="main-glimpse-art"><span role="img" aria-label="Kanban Board">📋</span></div>
            <div className="main-glimpse-label">KANBAN Board</div>
          </div>
          <div className="main-glimpse-card">
            <div className="main-glimpse-art"><span role="img" aria-label="Analytics">📊</span></div>
            <div className="main-glimpse-label">Project Analytics</div>
          </div>
          <div className="main-glimpse-card">
            <div className="main-glimpse-art"><span role="img" aria-label="Gantt Chart">📈</span></div>
            <div className="main-glimpse-label">GANTT Chart</div>
          </div>
          <div className="main-glimpse-card">
            <div className="main-glimpse-art"><span role="img" aria-label="Admin Portal">⚙️</span></div>
            <div className="main-glimpse-label">Admin Portal</div>
          </div>
        </div>
      </section>
      {/* WHY CHOOSE SECTION */}
      <section className="main-why-section">
        <h2>Why Choose Anushtaan?</h2>
        <div className="main-why-grid">
          <div className="main-why-card">
            <span className="main-why-icon">🤖</span>
            <h3>AI-Integrated Management</h3>
            <p>From planning to risk assessment, let AI supercharge every aspect of your project workflow.</p>
          </div>
          <div className="main-why-card">
            <span className="main-why-icon">🎯</span>
            <h3>Precision & Accountability</h3>
            <p>Live tracking, scoring, and comprehensive dashboards ensure every hour, task, and decision counts.</p>
          </div>
          <div className="main-why-card">
            <span className="main-why-icon">👤</span>
            <h3>User-Centric Flexibility</h3>
            <p>Manage work and personal projects side-by-side, adapting the platform to your life and career.</p>
          </div>
          <div className="main-why-card">
            <span className="main-why-icon">🔒</span>
            <h3>Flexible, Scalable, Secure</h3>
            <p>Whether you're a freelancer, agency, or enterprise, Anushtaan adapts to empower teams of all sizes.</p>
          </div>
        </div>
        <div className="main-why-cta">
          <h3>Ready to Transform Your Project Management?</h3>
          <p>
            Cut through the noise of project management—choose the power of AI, transparency, and enterprise security.
          </p>
          <button className="main-primary-button">Choose Anushtaan</button>
        </div>
      </section>
      {/* PRICING */}
      <section className="main-pricing-section" ref={pricingRef}>
        <h2>PRICING</h2>
        <div className={`main-pricing-cards${showPricing ? " visible" : ""}`}>
          <div className="main-pricing-card">
            <h3>Free Version</h3>
            <p>Basic features for small teams and personal projects</p>
          </div>
          <div className="main-pricing-card premium">
            <h3>Premium</h3>
            <p>Advanced AI features, unlimited projects, and priority support for growing teams</p>
          </div>
          <div className="main-pricing-card">
            <h3>Enterprise</h3>
            <p>Full customization, on-premises deployment, and dedicated support for large organizations</p>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <Footer />
    </div>
  );
}
export default MainComponent;
