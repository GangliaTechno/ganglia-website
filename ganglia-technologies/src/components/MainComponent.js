"use client";
import React, { useRef, useEffect, useState } from "react";
import "../styles/MainComponent.css";
import anushataanLogo from '../assets/anushtaanlogo.png';
import kanban1 from '../assets/kanbanboard1.png';
import projectAnalytics from '../assets/projectanalytics.png';
import adminPortal from '../assets/adminportal.png';
import ganttChart from '../assets/ganttchart.png';
import { Player } from '@lottiefiles/react-lottie-player';
import anushtaan1 from '../assets/anushtaan1.json';
import anushtaan2 from '../assets/anushtaan2.json';
import anushtaan3 from '../assets/anushtaan3.json';
import anushtaan4 from '../assets/anushtaan4.json';
import anushtaan5 from '../assets/anushtaan5.json';
import anushtaan6 from '../assets/anushtaan6.json';
import anushtaan7 from '../assets/anushtaan7.json';
import anushtaan8 from '../assets/anushtaan8.json'; 

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
    <div className="anushtaan-page-root">
      {/* Animated Gradient Bubbles */}
      <div className="anushtaan-bubbles" aria-hidden>
        <span className="anushtaan-bubble lg a"></span>
        <span className="anushtaan-bubble md b"></span>
        <span className="anushtaan-bubble lg c"></span>
        <span className="anushtaan-bubble md d"></span>
        <span className="anushtaan-bubble sm e"></span>
        <span className="anushtaan-bubble sm f"></span>
      </div>
      {/* HERO */}
      <section className="anushtaan-hero-section">
        <div className="anushtaan-hero-grid">
          <div className="anushtaan-hero-left">
            <h1>Anushtaan</h1>
            <h2>The Ultimate AI-Powered, Data-Driven Project Management Platform</h2>
            
            <p className="anushtaan-hero-lead">
              Anushtaan isn't just another project management tool—it's a next-generation platform designed for professionals and organizations that demand efficiency, transparency, and intelligent control. Built by Ganglia Technologies, Anushtaan brings powerful AI and human-centered design to every stage of your projects.
            </p>
            <button className="anushtaan-primary-button">Discover Anushtaan</button>
          </div>
          <div className="anushtaan-hero-right">
  <img 
    src={anushataanLogo} 
    alt="Anushtaan Logo" 
    className="anushtaan-hero-logo" 
  />
</div>
        </div>
      </section>
      {/* ABOUT */}
      <section className="anushtaan-about-section">
        <div className="anushtaan-about-flex">
          <div className="anushtaan-about-left">
            <h2>About Anushtaan</h2>
            <p>
              Anushtaan is a highly customizable Project Management Tool designed for professionals and organizations that demand transparency, efficiency, and control. With real-time time tracking, it ensures accurate billing and trust for hourly-based projects.
            </p>
            <p>
              Equipped with an advanced Admin Portal, Anushtaan provides deep visibility into project health through live dashboards, Gantt charts, Kanban boards, financial tracking, and data analytics. Admins can assign tasks, monitor team progress, manage budgets, and oversee quality settings, ensuring projects stay on track.
            </p>
          </div>
          <aside className="anushtaan-about-features">
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
      <section className="anushtaan-core-section">
        <h2>Core Features</h2>
        <div className="anushtaan-core-grid">
          <div className="anushtaan-core-card">
            <div className="anushtaan-core-card-head">
              <span className="anushtaan-core-icon"><Player autoplay loop src={anushtaan1} style={{ height: 55, width: 55 }} /></span>
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
          <div className="anushtaan-core-card">
            <div className="anushtaan-core-card-head">
              <span className="anushtaan-core-icon"><Player autoplay loop src={anushtaan2} style={{ height: 55, width: 55 }} /></span>
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
          <div className="anushtaan-core-card">
            <div className="anushtaan-core-card-head">
              <span className="anushtaan-core-icon"><Player autoplay loop src={anushtaan3} style={{ height: 55, width: 55 }} /></span>
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
          <div className="anushtaan-core-card">
            <div className="anushtaan-core-card-head">
              <span className="anushtaan-core-icon"><Player autoplay loop src={anushtaan4} style={{ height: 55, width: 55 }} /></span>
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
          <div className="anushtaan-core-card">
            <div className="anushtaan-core-card-head">
              <span className="anushtaan-core-icon"><Player autoplay loop src={anushtaan5} style={{ height: 55, width: 55 }} /></span>
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
          <div className="anushtaan-core-card">
            <div className="anushtaan-core-card-head">
              <span className="anushtaan-core-icon"><Player autoplay loop src={anushtaan6} style={{ height: 55, width: 55 }} /></span>
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
      <section className="anushtaan-glimpse-section">
        <h2>Glimpse of Anushtaan</h2>
        <div className="anushtaan-glimpse-grid">
  <div className="anushtaan-glimpse-card">
    <div className="anushtaan-glimpse-art">
      <img src={kanban1} alt="Kanban Board" className="anushtaan-glimpse-icon" />
    </div>
    <div className="anushtaan-glimpse-label">KANBAN Board</div>
  </div>
  <div className="anushtaan-glimpse-card">
    <div className="anushtaan-glimpse-art">
      <img src={projectAnalytics} alt="Project Analytics" className="anushtaan-glimpse-icon" />
    </div>
    <div className="anushtaan-glimpse-label">Project Analytics</div>
  </div>
  <div className="anushtaan-glimpse-card">
    <div className="anushtaan-glimpse-art">
      <img src={ganttChart} alt="Gantt Chart" className="anushtaan-glimpse-icon" />
    </div>
    <div className="anushtaan-glimpse-label">GANTT Chart</div>
  </div>
  <div className="anushtaan-glimpse-card">
    <div className="anushtaan-glimpse-art">
      <img src={adminPortal} alt="Admin Portal" className="anushtaan-glimpse-icon" />
    </div>
    <div className="anushtaan-glimpse-label">Admin Portal</div>
  </div>
  <div className="anushtaan-glimpse-card">
    <div className="anushtaan-glimpse-art">
      <img src={adminPortal} alt="Admin Portal" className="anushtaan-glimpse-icon" />
    </div>
    <div className="anushtaan-glimpse-label">Admin Portal</div>
  </div>
  <div className="anushtaan-glimpse-card">
    <div className="anushtaan-glimpse-art">
      <img src={adminPortal} alt="Admin Portal" className="anushtaan-glimpse-icon" />
    </div>
    <div className="anushtaan-glimpse-label">Admin Portal</div>
  </div>

</div>

      </section>
      {/* WHY CHOOSE SECTION */}
      <section className="anushtaan-why-section">
        <h2>Why Choose Anushtaan?</h2>
        <div className="anushtaan-why-grid">
          <div className="anushtaan-why-card">
            <span className="anushtaan-why-icon"><Player autoplay loop src={anushtaan2} style={{ height: 55, width: 55 }} /></span>
            <h3>AI-Integrated Management</h3>
            <p>From planning to risk assessment, let AI supercharge every aspect of your project workflow.</p>
          </div>
          <div className="anushtaan-why-card">
            <span className="anushtaan-why-icon"><Player autoplay loop src={anushtaan7} style={{ height: 55, width: 55 }} /></span>
            <h3>Precision & Accountability</h3>
            <p>Live tracking, scoring, and comprehensive dashboards ensure every hour, task, and decision counts.</p>
          </div>
          <div className="anushtaan-why-card">
            <span className="anushtaan-why-icon"><Player autoplay loop src={anushtaan8} style={{ height: 55, width: 55 }} /></span>
            <h3>User-Centric Flexibility</h3>
            <p>Manage work and personal projects side-by-side, adapting the platform to your life and career.</p>
          </div>
          <div className="anushtaan-why-card">
            <span className="anushtaan-why-icon"><Player autoplay loop src={anushtaan6} style={{ height: 55, width: 55 }} /></span>
            <h3>Flexible, Scalable, Secure</h3>
            <p>Whether you're a freelancer, agency, or enterprise, Anushtaan adapts to empower teams of all sizes.</p>
          </div>
        </div>
        <div className="anushtaan-why-cta">
          <h3>Ready to Transform Your Project Management?</h3>
          <p>
            Cut through the noise of project management—choose the power of AI, transparency, and enterprise security.
          </p>
          <button className="anushtaan-primary-button">Choose Anushtaan</button>
        </div>
      </section>
      {/* PRICING */}
      <section className="anushtaan-pricing-section" ref={pricingRef}>
        <h2>PRICING</h2>
        <div className={`anushtaan-pricing-cards${showPricing ? " visible" : ""}`}>
          <div className="anushtaan-pricing-card">
            <h3>Free Version</h3>
            <p>Basic features for small teams and personal projects</p>
          </div>
          <div className="anushtaan-pricing-card premium">
            <h3>Premium</h3>
            <p>Advanced AI features, unlimited projects, and priority support for growing teams</p>
          </div>
          <div className="anushtaan-pricing-card">
            <h3>Enterprise</h3>
            <p>Full customization, on-premises deployment, and dedicated support for large organizations</p>
          </div>
        </div>
      </section>
      {/* FOOTER */}
    </div>
  );
}
export default MainComponent;
