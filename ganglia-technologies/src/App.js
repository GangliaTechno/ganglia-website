// ✅ App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ParticleBackground from './components/ParticleBackground';
import SupporterBand from './components/SupporterBand';
import AboutUsSection from './components/AboutUsSection';
import ProductsSection from './components/ProductsSection';
import StatsStrip from './components/StatsStrip';
import Services from './components/Services';
import TeamSection from './components/TeamSection';
import CertificationsSection from './components/CertificationsSection';
import Footer from './components/Footer';
import CareersPage from './components/CareersPage';
import ApplicationForm from './components/Applicationform';
import ContactUs from './components/ContactUs';
import OurStory from './components/OurStory';
import OurTeam from './components/OurTeam';
import TripMacha from './components/tripmacha';
import Laryngoscope from './components/laryngoscope';
import MainComponent from './components/MainComponent';
import MedlogBookPlatform from './components/MedlogBookPlatform';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

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
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/apply/:jobId" element={<ApplicationForm />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/tripmacha" element={<TripMacha />} />
          {/* <Route path="/smart-video-laryngoscope" element={<Laryngoscope />} /> */}
          {/* <Route path="/medical-logbook" element={<MedlogBookPlatform />} /> {/* ✅ New Route */}
           <Route path="/main-component" element={<MainComponent />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;