import React, {
  Suspense,
  lazy,
  useState,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Preloader from './components/Preloader';
import RoutePreloader from './components/RoutePreloader';
import { useRouteLoader } from './hooks/useRouteLoader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SupporterBand from './components/SupporterBand';
import AboutUsSection from './components/AboutUsSection';
import ProductsSection from './components/ProductsSection';
import StatsStrip from './components/StatsStrip';
import Services from './components/Services';
import TeamSection from './components/TeamSection';
import CertificationsSection from './components/CertificationsSection';
import Footer from './components/Footer';
import Profooter from './components/Profooter';

import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

/* ─────────────────────────────
   Lazy-loaded pages & big widgets
   ───────────────────────────── */
const ParticleBackground   = lazy(() => import('./components/ParticleBackground'));
const CareersPage          = lazy(() => import('./components/CareersPage'));
const ApplicationForm      = lazy(() => import('./components/Applicationform'));
const ContactUs            = lazy(() => import('./components/ContactUs'));
const OurStory             = lazy(() => import('./components/OurStory'));
const OurTeam              = lazy(() => import('./components/OurTeam'));
const TripMacha            = lazy(() => import('./components/tripmacha'));
const Laryngoscope         = lazy(() => import('./components/laryngoscope'));
const MainComponent        = lazy(() => import('./components/MainComponent'));
const MedlogBookPlatform   = lazy(() => import('./components/MedlogBookPlatform'));
const ServicesPage         = lazy(() => import('./components/servicespage'));
const AwardsResearchPage   = lazy(() => import('./components/AwardsResearch'));
const GetStartedForm       = lazy(() => import('./components/getstarted'));
const InternshipForm       = lazy(() => import('./components/InternshipForm'));

/* ───────── Home page ───────── */
const HomePage = () => {
  const [showParticles, setShowParticles] = useState(false);

  /* delay heavy background  */
  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="hero-container">
        <div className="background-image"></div>
        {showParticles && (
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        )}
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
    </>
  );
};

/* ───────── 404 page ───────── */
const NotFoundPage = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '2rem',
      textAlign: 'center',
      background: '#000426',
      color: '#ffffff'
    }}
  >
    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
    <h2 style={{ color: '#cbd5e1', marginBottom: '2rem' }}>Page Not Found</h2>
    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
      The page you&apos;re looking for doesn&apos;t exist or has been moved.
    </p>
    <button
      onClick={() => (window.location.href = '/')}
      style={{
        padding: '12px 24px',
        background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 600,
        transition: 'all 0.3s ease'
      }}
    >
      Go Home
    </button>
  </div>
);

/* ─────── Footer switcher ───── */
const FooterController = () => {
  const { pathname } = useLocation();
  const profooterPaths = [
    '/tripmacha',
    '/main-component',
    '/services',
    '/medical-logbook',
    '/smart-video-laryngoscope',
    '/get-started'
  ];
  return profooterPaths.includes(pathname) ? <Profooter /> : <Footer />;
};

/* ───────── App routes ──────── */
const AppContent = () => {
  const { isLoading } = useRouteLoader();

  return (
    <>
      <RoutePreloader isVisible={isLoading} />
      <Navbar />

      <Suspense fallback={<RoutePreloader isVisible />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/apply/:jobId" element={<ApplicationForm />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/tripmacha" element={<TripMacha />} />
          <Route path="/smart-video-laryngoscope" element={<Laryngoscope />} />
          <Route path="/medical-logbook" element={<MedlogBookPlatform />} />
          <Route path="/main-component" element={<MainComponent />} />
          <Route path="/awards" element={<AwardsResearchPage />} />
          <Route path="/get-started" element={<GetStartedForm />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/internship-form" element={<InternshipForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <FooterController />
    </>
  );
};

/* ───────── Main wrapper ────── */
function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  /* fade out HTML-level preloader */
  useEffect(() => {
    const htmlPreloader = document.getElementById('preloader');
    if (!htmlPreloader) return;
    setTimeout(() => {
      htmlPreloader.style.opacity = '0';
      setTimeout(() => {
        htmlPreloader.style.display = 'none';
      }, 500);
    }, 100);
  }, []);

  return (
    <div className="App">
      {isInitialLoading && (
        <Preloader onLoadComplete={() => setIsInitialLoading(false)} />
      )}

      <div
        style={{
          opacity: isInitialLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: isInitialLoading ? 'none' : 'auto'
        }}
      >
        <Router>
          <AppContent />
        </Router>
      </div>
    </div>
  );
}

export default App;
