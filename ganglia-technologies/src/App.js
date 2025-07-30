import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader'; // Initial load preloader
import RoutePreloader from './components/RoutePreloader'; // Route change preloader
import { useRouteLoader } from './hooks/useRouteLoader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ParticleBackground from './components/ParticleBackground';
import SupporterBand from './components/SupporterBand';
import AboutUsSection from './components/AboutUsSection';
import ProductsSection from './components/ProductsSection';
import StatsStrip from './components/StatsStrip';
import Services from './components/Services';
import ServicesPage from './components/servicespage';
import TeamSection from './components/TeamSection';
import CertificationsSection from './components/CertificationsSection';
import Footer from './components/Footer';
import Profooter from './components/Profooter';
import CareersPage from './components/CareersPage';
import ApplicationForm from './components/Applicationform';
import ContactUs from './components/ContactUs';
import OurStory from './components/OurStory';
import OurTeam from './components/OurTeam';
import TripMacha from './components/tripmacha';
import Laryngoscope from './components/laryngoscope';
import MainComponent from './components/MainComponent';
//import MedlogBookPlatform from './components/MedlogBookPlatform';
import Blogs from './components/blogs';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';
import ResearchPapers from './components/research';
import GetStartedForm from './components/getstarted';


// HomePage: Removed Footer here to avoid duplication
const HomePage = () => {
  return (
    <>
      <div className="hero-container">
        <div className="background-image"></div>
        <ParticleBackground />
        <div className="content-overlay">
          <HeroSection />
          <SupporterBand />
        </div>
      </div>
      <AboutUsSection />
      <ProductsSection />
      <StatsStrip />
      <Services />
      <TeamSection />
      <CertificationsSection />
      {/* Footer removed from here */}
    </>
  );
};


// Updated 404 component
const NotFoundPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '2rem',
      textAlign: 'center',
      background: '#000426',
      color: '#ffffff'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#ffffff', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ color: '#cbd5e1', marginBottom: '2rem' }}>Page Not Found</h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button 
        onClick={() => window.location.href = '/'} 
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}
      >
        Go Home
      </button>
    </div>
  );
};


// FooterController: Decides what footer to render based on current path
const FooterController = () => {
  const location = useLocation();

  console.log('Current path:', location.pathname);

  const profooterPaths = [
    '/tripmacha',
    '/main-component',
    '/services',
    '/MedlogBookPlatform',
    '/smart-video-laryngoscope',
    '/get-started'
  ];

  if (profooterPaths.includes(location.pathname)) {
    return <Profooter />;
  }
  
  return <Footer />;
};




// App content wrapper to use route loader
const AppContent = () => {
  const { isLoading: isRouteLoading } = useRouteLoader();

  return (
    <>
      <RoutePreloader isVisible={isRouteLoading} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/apply/:jobId" element={<ApplicationForm />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/tripmacha" element={<TripMacha />} />
        <Route path="/smart-video-laryngoscope" element={<Laryngoscope />} />
        {/* <Route path="/medical-logbook" element={<MedlogBookPlatform />} /> */}
        <Route path="/main-component" element={<MainComponent />} />
        <Route path="/research-papers" element={<ResearchPapers />} />
        <Route path="/get-started" element={<GetStartedForm />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Conditionally renders either Footer or Profooter */}
      <FooterController />
    </>
  );
};


function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Hide the HTML preloader when React app starts
    const htmlPreloader = document.getElementById('preloader');
    if (htmlPreloader) {
      setTimeout(() => {
        htmlPreloader.style.opacity = '0';
        setTimeout(() => {
          htmlPreloader.style.display = 'none';
        }, 500);
      }, 100);
    }
  }, []);

  const handleInitialLoadComplete = () => {
    setIsInitialLoading(false);
  };

  return (
    <div className="App">
      {/* Initial load preloader - shows until all assets are loaded */}
      {isInitialLoading && <Preloader onLoadComplete={handleInitialLoadComplete} />}
      
      {/* Main app content - hidden until initial loading is complete */}
      <div style={{ 
        opacity: isInitialLoading ? 0 : 1, 
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: isInitialLoading ? 'none' : 'auto'
      }}>
        <Router>
          <AppContent />
        </Router>
      </div>
    </div>
  );
}


export default App;
