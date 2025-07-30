"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";

import laryngoVideo from '../assets/laryngo.mp4';
import { Player } from '@lottiefiles/react-lottie-player';
import wireless from '../assets/wireless.json';
import dualcam from '../assets/dualcam.json';
import hardware from '../assets/hardware.json';
import design from '../assets/design.json';
import joystick from '../assets/joystick.json';
import wired from '../assets/wired.json';
import ai from '../assets/ai.json';
import health from '../assets/health.json';
import Research from '../assets/Research.json';
let laryImage;
try {
  laryImage = require('../assets/lanyngoscope1.png');
} catch (error) {
  laryImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23374151' rx='10'/%3E%3Ctext x='140' y='140' text-anchor='middle' fill='%23ffffff' font-size='16'%3ELaryngoscope%3C/text%3E%3C/svg%3E";
}

function LaryngoscopeComponent() {
  // Responsive breakpoint helper
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
 
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
   
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const keyframes = `
    @keyframes floatMove1 {
      0% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(clamp(50px, 15vw, 150px), clamp(-30px, -10vw, -100px)) scale(1.2); }
      50% { transform: translate(clamp(-25px, -8vw, -80px), clamp(40px, 12vw, 120px)) scale(0.8); }
      75% { transform: translate(clamp(30px, 10vw, 100px), clamp(20px, 6vw, 60px)) scale(1.1); }
      100% { transform: translate(0, 0) scale(1); }
    }
   
    @keyframes floatMove2 {
      0% { transform: translate(0, 0) scale(1); }
      20% { transform: translate(clamp(-40px, -12vw, -120px), clamp(25px, 8vw, 80px)) scale(1.3); }
      40% { transform: translate(clamp(30px, 9vw, 90px), clamp(-40px, -12vw, -120px)) scale(0.7); }
      60% { transform: translate(clamp(-25px, -7vw, -70px), clamp(50px, 15vw, 150px)) scale(1.4); }
      80% { transform: translate(clamp(40px, 13vw, 130px), clamp(-15px, -5vw, -50px)) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }
   
    @keyframes floatMove3 {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(clamp(-60px, -18vw, -180px), clamp(-30px, -10vw, -100px)) scale(1.2); }
      66% { transform: translate(clamp(40px, 12vw, 120px), clamp(45px, 14vw, 140px)) scale(0.6); }
      100% { transform: translate(0, 0) scale(1); }
    }
   
    @keyframes floatMove4 {
      0% { transform: translate(0, 0) scale(1); }
      30% { transform: translate(clamp(50px, 16vw, 160px), clamp(-40px, -13vw, -130px)) scale(1.3); }
      70% { transform: translate(clamp(-30px, -10vw, -100px), clamp(50px, 16vw, 160px)) scale(0.8); }
      100% { transform: translate(0, 0) scale(1); }
    }
   
    @keyframes floatMove5 {
      0% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(clamp(-45px, -14vw, -140px), clamp(30px, 10vw, 100px)) scale(1.4); }
      50% { transform: translate(clamp(55px, 18vw, 180px), clamp(-25px, -8vw, -80px)) scale(0.6); }
      75% { transform: translate(clamp(-30px, -9vw, -90px), clamp(-40px, -12vw, -120px)) scale(1.2); }
      100% { transform: translate(0, 0) scale(1); }
    }
   
    @keyframes floatMove6 {
      0% { transform: translate(0, 0) scale(1); }
      20% { transform: translate(clamp(50px, 15vw, 150px), clamp(-50px, -15vw, -150px)) scale(1.5); }
      40% { transform: translate(clamp(-40px, -12vw, -120px), clamp(30px, 9vw, 90px)) scale(0.5); }
      60% { transform: translate(clamp(65px, 20vw, 200px), clamp(40px, 12vw, 120px)) scale(1.3); }
      80% { transform: translate(clamp(-50px, -16vw, -160px), clamp(-20px, -6vw, -60px)) scale(0.7); }
      100% { transform: translate(0, 0) scale(1); }
    }

    @keyframes heartbeat {
      0% {
        stroke-dashoffset: 1000;
        opacity: 1;
      }
      95% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: 0;
      }
    }

    @keyframes ecgPulse {
      0%, 20%, 50%, 80%, 100% {
        transform: scaleY(1);
        opacity: 0.7;
      }
      40% {
        transform: scaleY(1.2);
        opacity: 1;
      }
      60% {
        transform: scaleY(0.8);
        opacity: 0.9;
      }
    }

    @keyframes heartbeatGlow {
      0%, 100% {
        filter: drop-shadow(0 0 5px #00CED1);
      }
      50% {
        filter: drop-shadow(0 0 20px #00CED1) drop-shadow(0 0 30px #1E90FF);
      }
    }
  `;

  // Animation for pricing cards and other sections
  const prototypesRef = useRef(null);
  const [showPrototypes, setShowPrototypes] = useState(false);
  const [activePrototype, setActivePrototype] = useState('prototype2');

  useEffect(() => {
    function handleScroll() {
      if (prototypesRef.current) {
        const rect = prototypesRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setShowPrototypes(true);
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const specifications = [
  { feature: 'Joy-stick Controlled Tongue-tip', benefit: 'Minimal trauma, accurate epiglottis movement' },
  { feature: 'Advanced Dual Camera', benefit: 'Wide + focused views, superior image processing' },
  { feature: 'In-built Oxygenator', benefit: 'Constant oxygen supply, maximum patient safety' },
  { feature: 'Wireless Setup', benefit: 'Live video broadcast anywhere' },
  { feature: 'AI-Powered Software', benefit: 'Real-time trauma & anatomy highlighting' },
  { feature: 'Waterproof, Lighter Casing', benefit: 'Durable, sterile, comfortable ideal for any environment' },
  { feature: 'Peer-to-peer Video Sharing (coming soon)', benefit: 'Unlocks immediate global collaboration' },
  { feature: 'Ergonomics, Improved Mechanics', benefit: 'Less power, more thrust, all-day clinical comfort' }
];


  const getImageSrc = useCallback((imageModule, fallback) => {
    if (typeof imageModule === 'string') {
      return imageModule;
    } else if (imageModule && imageModule.default) {
      return imageModule.default;
    }
    return fallback;
  }, []);

  // ECG Divider Component
  const ECGDivider = ({ variant = 1 }) => {
    const ecgPath = variant === 1
      ? "M0,50 Q20,45 40,50 Q60,55 80,50 Q100,45 120,50 L130,20 L140,80 L150,10 L160,90 L170,50 Q190,45 210,50 Q230,55 250,50 Q270,45 290,50 Q310,55 320,50 L330,30 L340,70 L350,20 L360,80 L370,50 Q390,45 410,50 Q430,55 450,50 Q470,45 490,50 Q510,55 530,50 Q550,45 570,50 Q590,55 610,50 Q630,45 650,50 Q670,55 690,50 Q710,45 730,50 Q750,55 770,50 Q790,45 810,50 Q830,55 850,50 Q870,45 890,50 Q910,55 930,50 Q950,45 970,50 Q990,55 1010,50 Q1030,45 1050,50 Q1070,55 1090,50 Q1110,45 1130,50 Q1150,55 1170,50 Q1190,45 1200,50"
      : "M0,50 Q15,48 30,50 Q45,52 60,50 Q75,48 90,50 L100,25 L110,75 L120,15 L130,85 L140,50 Q155,48 170,50 Q185,52 200,50 Q215,48 230,50 Q245,52 260,50 Q275,48 290,50 L300,35 L310,65 L320,25 L330,75 L340,50 Q355,48 370,50 Q385,52 400,50 Q415,48 430,50 Q445,52 460,50 Q475,48 490,50 Q505,52 520,50 Q535,48 550,50 Q565,52 580,50 Q595,48 610,50 Q625,52 640,50 Q655,48 670,50 Q685,52 700,50 Q715,48 730,50 Q745,52 760,50 Q775,48 790,50 Q805,52 820,50 Q835,48 850,50 Q865,52 880,50 Q895,48 910,50 Q925,52 940,50 Q955,48 970,50 Q985,52 1000,50 Q1015,48 1030,50 Q1045,52 1060,50 Q1075,48 1090,50 Q1105,52 1120,50 Q1135,48 1150,50 Q1165,52 1180,50 Q1195,48 1200,50";

    return (
      <div style={{
        width: '100%',
        height: 'clamp(60px, 10vw, 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'clamp(32px, 8vw, 64px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(0, 206, 209, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 206, 209, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(15px, 4vw, 20px) clamp(8px, 2vw, 10px)',
          opacity: 0.3
        }}></div>

        {/* ECG Line */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 100"
          style={{
            position: 'absolute',
            animation: 'heartbeatGlow 2s ease-in-out infinite'
          }}
        >
          <defs>
            <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00CED1" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#1E90FF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#20B2AA" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
         
          <path
            d={ecgPath}
            fill="none"
            stroke="url(#ecgGradient)"
            strokeWidth={isMobile ? "2" : "3"}
            strokeDasharray="2000"
            strokeDashoffset="2000"
            style={{
              animation: 'ecgFlow 4s linear infinite'
            }}
          />
         
          <circle
            cx="150"
            cy="50"
            r={isMobile ? "3" : "4"}
            fill="#00CED1"
            style={{
              animation: 'ecgPulse 2s ease-in-out infinite'
            }}
          />
          <circle
            cx="340"
            cy="50"
            r={isMobile ? "3" : "4"}
            fill="#1E90FF"
            style={{
              animation: 'ecgPulse 2s ease-in-out infinite 1s'
            }}
          />
        </svg>

        <style jsx>{`
          @keyframes ecgFlow {
            0% {
              stroke-dashoffset: 2000;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
         
          @keyframes heartbeatGlow {
            0%, 100% {
              filter: drop-shadow(0 0 5px rgba(0, 206, 209, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 15px rgba(0, 206, 209, 0.8));
            }
          }
         
          @keyframes ecgPulse {
            0%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.3);
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <style>
        {`
          .prototype-card {
            opacity: 0;
            transform: translateY(clamp(40px, 10vw, 80px));
            transition: all 1.8s cubic-bezier(.77,0,.18,1);
          }
          .prototype-card.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .prototype-card.featured {
            transform: translateY(clamp(40px, 10vw, 80px)) scale(${isMobile ? 1 : 1.05});
          }
          .prototype-card.featured.visible {
            transform: translateY(0) scale(${isMobile ? 1 : 1.05});
          }
        `}
      </style>
     
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#00052B',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Gradient Bubbles */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none'
        }}>
          {/* Medical-themed gradient bubbles */}
          <div style={{
            position: 'absolute',
            width: 'clamp(300px, 50vw, 600px)',
            height: 'clamp(300px, 50vw, 600px)',
            borderRadius: '50%',
            opacity: 0.6,
            background: 'radial-gradient(circle, #00CED1 0%, #1E90FF 70%, transparent 100%)',
            filter: 'blur(clamp(40px, 10vw, 80px))',
            top: 'clamp(-50px, -10vw, -100px)',
            left: 'clamp(-40px, -8vw, -80px)',
            animation: 'floatMove1 8s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: 'clamp(200px, 35vw, 400px)',
            height: 'clamp(200px, 35vw, 400px)',
            borderRadius: '50%',
            opacity: 0.7,
            background: 'radial-gradient(circle, #20B2AA 0%, #00CED1 60%, transparent 100%)',
            filter: 'blur(clamp(30px, 8vw, 60px))',
            top: 'clamp(-50px, -10vw, -100px)',
            right: 'clamp(-75px, -15vw, -150px)',
            animation: 'floatMove2 10s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: 'clamp(250px, 42vw, 500px)',
            height: 'clamp(250px, 42vw, 500px)',
            borderRadius: '50%',
            opacity: 0.5,
            background: 'radial-gradient(circle, #1E90FF 0%, #20B2AA 65%, transparent 100%)',
            filter: 'blur(clamp(35px, 9vw, 70px))',
            bottom: 'clamp(-75px, -15vw, -150px)',
            left: 'clamp(-100px, -20vw, -200px)',
            animation: 'floatMove4 9s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: 'clamp(150px, 25vw, 300px)',
            height: 'clamp(150px, 25vw, 300px)',
            borderRadius: '50%',
            opacity: 0.55,
            background: 'radial-gradient(circle, #00CED1 0%, #1E90FF 80%, transparent 100%)',
            filter: 'blur(clamp(25px, 6vw, 50px))',
            top: '40%',
            left: '60%',
            animation: 'floatMove5 7s ease-in-out infinite reverse'
          }}></div>
        </div>

        {/* Hero Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: `clamp(80px, 20vw, 204px) clamp(16px, 4vw, 20px)`,
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(32px, 8vw, 64px)',
            textAlign: isMobile ? 'center' : 'initial'
          }}>
            <div style={{
              width: '100%',
              maxWidth: isMobile ? '100%' : '60%',
              paddingRight: isMobile ? 0 : 'clamp(8px, 2vw, 2px)',
              textAlign: isMobile ? 'center' : 'right',
              order: isMobile ? 2 : 2
            }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                fontWeight: 'bold',
                marginBottom: 'clamp(12px, 3vw, 16px)',
                color: '#00CED1',
                margin: `0 0 clamp(12px, 3vw, 16px) 0`,
                lineHeight: 1.2
              }}>
                Ganglia's Smart Video  Laryngoscope
              </h1>
              <h2 style={{
                fontSize: 'clamp(1.2rem, 5vw, 1.75rem)',
                fontWeight: '600',
                marginBottom: 'clamp(16px, 4vw, 24px)',
                color: '#20B2AA',
                margin: `0 0 clamp(16px, 4vw, 24px) 0`,
                lineHeight: 1.3
              }}>
                Revolutionizing Airway Management.<br/>For Everyone.
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                lineHeight: '1.75',
                marginBottom: 'clamp(24px, 6vw, 32px)',
                color: 'white',
                margin: `0 0 clamp(24px, 6vw, 32px) 0`
              }}>
                At Ganglia Technologies, we've reimagined the laryngoscope from the ground up merging world class engineering, cutting-edge AI, and effortless usability to deliver the next generation of intubation. Whether you're in a metropolitan hospital or a rural clinic, airway management just became safer, smarter, and truly accessible.
              </p>
              <button style={{
                padding: 'clamp(12px, 3vw, 16px) clamp(32px, 8vw, 48px)',
                borderRadius: '9999px',
                color: 'white',
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                minWidth: isMobile ? '200px' : 'auto',
                width: isMobile ? '100%' : 'auto',
                maxWidth: '300px'
              }}>
                Request Demo
              </button>
            </div>
            <div style={{
              width: '100%',
              maxWidth: isMobile ? '100%' : '40%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              order: isMobile ? 1 : 1
            }}>
              <img
                src={getImageSrc(laryImage, laryImage)}
                alt="laryngoscope"
                style={{
                  width: 'clamp(5 00px, 40vw, 320px)',
                  maxWidth: '90vw',
                  height: 'auto'
                }}
                onError={(e) => {
                  console.warn("Idea GIF failed to load, using fallback");
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='6'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>

        {/* ECG Divider 1 */}
       

        {/* ECG Divider 2 */}
        <ECGDivider variant={2} />

        {/* Prototypes Section */}
        <div
          ref={prototypesRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(32px, 8vw, 64px) clamp(16px, 4vw, 24px)',
            position: 'relative',
            zIndex: 10
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 3.375rem)',
            fontWeight: 'bold',
            marginBottom: 'clamp(32px, 8vw, 48px)',
            textAlign: 'center',
            margin: `0 0 clamp(32px, 8vw, 48px) 0`,
            lineHeight: 1.2
          }}>
            Designed to Care. Engineered to Lead.
          </h2>

          {/* Prototype Selector */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            marginBottom: 'clamp(32px, 8vw, 48px)',
            gap: 'clamp(16px, 4vw, 24px)',
            alignItems: 'center'
          }}>
             
            <button
              onClick={() => setActivePrototype('prototype1')}
              style={{
                padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
                borderRadius: 'clamp(8px, 2vw, 12px)',
                color: activePrototype === 'prototype1' ? 'white' : '#00CED1',
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                fontWeight: '600',
                background: activePrototype === 'prototype1'
                  ? 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)'
                  : 'transparent',
                border: '2px solid #00CED1',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '300px' : 'none',
                textAlign: 'center'
              }}
            >
              Prototype I: The Breakthrough
            </button>
            <button
              onClick={() => setActivePrototype('prototype2')}
              style={{
                padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
                borderRadius: 'clamp(8px, 2vw, 12px)',
                color: activePrototype === 'prototype2' ? 'white' : '#1E90FF',
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                fontWeight: '600',
                background: activePrototype === 'prototype2'
                  ? 'linear-gradient(135deg, #1E90FF 0%, #20B2AA 100%)'
                  : 'transparent',
                border: '2px solid #1E90FF',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '300px' : 'none',
                textAlign: 'center'
              }}
            >
              Prototype II: The Evolution
            </button>
           
          </div>

          {/* Prototype Features */}
          {activePrototype === 'prototype1' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(20px, 5vw, 32px)'
            }}>
              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(20px, 5vw, 32px)',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 'clamp(16px, 4vw, 20px)',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                  gap: isMobile ? '12px' : '16px'
                }}>
                  <div style={{
                    width: 'clamp(40px, 8vw, 48px)',
                    height: 'clamp(40px, 8vw, 48px)',
                    backgroundColor: '#00CED1',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    marginRight: isMobile ? 0 : '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={joystick} style={{ height: 35, width: 35 }} /></span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1',
                    lineHeight: 1.3
                  }}>Joy stick Controlled Tongue-tip</h3>
                </div>
                <p style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.5',
                  margin: 0,
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  Effortlessly moves the Epiglottis precisely, minimizing any trauma to the patient.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(20px, 5vw, 32px)',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 'clamp(16px, 4vw, 20px)',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                  gap: isMobile ? '12px' : '16px'
                }}>
                  <div style={{
                    width: 'clamp(40px, 8vw, 48px)',
                    height: 'clamp(40px, 8vw, 48px)',
                    backgroundColor: '#1E90FF',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    marginRight: isMobile ? 0 : '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={dualcam} style={{ height: 35, width: 35 }} /></span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1',
                    lineHeight: 1.3
                  }}>Dual Camera System</h3>
                </div>
                <p style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.5',
                  margin: 0,
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  Switch between focused and wide-angle views for extraordinary anatomical clarity.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(20px, 5vw, 32px)',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 'clamp(16px, 4vw, 20px)',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                  gap: isMobile ? '12px' : '16px'
                }}>
                  <div style={{
                    width: 'clamp(40px, 8vw, 48px)',
                    height: 'clamp(40px, 8vw, 48px)',
                    backgroundColor: '#20B2AA',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    marginRight: isMobile ? 0 : '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="M463.33-160q-52.66 0-85.33-30.33-32.67-30.34-32.67-85h72q0 23 11.5 35.83 11.5 12.83 34.5 12.83 23.67 0 35.17-11.83t11.5-36.83q0-25-11.5-37.84Q487-326 463.33-326H80v-66.67h383.33q52.67 0 83 30.34 30.34 30.33 30.34 87 0 54.66-30.34 85Q516-160 463.33-160ZM80-565.33V-632h545.33q33.34 0 50.34-17.33 17-17.34 17-53.34t-17-53.33q-17-17.33-50.34-17.33-34 0-51 19.33t-17 48.67h-66.66q0-58.34 36.83-96.5Q564.33-840 625.33-840q60.34 0 97.17 37.17 36.83 37.16 36.83 100.16T722.5-602.5q-36.83 37.17-97.17 37.17H80Zm668 326.66v-66.66q32 0 48.67-18.67 16.66-18.67 16.66-52 0-34-18-51t-50-17H80v-66.67h665.33q61 0 97.84 36.84Q880-437 880-376q0 62.33-35.5 99.83t-96.5 37.5Z"/></svg></span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1',
                    lineHeight: 1.3
                  }}>In built Oxygen Supply Port</h3>
                </div>
                <p style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.5',
                  margin: 0,
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  Seamless, constant oxygenation ensures patient safety throughout the intubation process.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(20px, 5vw, 32px)',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 'clamp(16px, 4vw, 20px)',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                  gap: isMobile ? '12px' : '16px'
                }}>
                  <div style={{
                    width: 'clamp(40px, 8vw, 48px)',
                    height: 'clamp(40px, 8vw, 48px)',
                    backgroundColor: '#00CED1',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    marginRight: isMobile ? 0 : '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={wired} style={{ height: 35, width: 35 }} /></span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1',
                    lineHeight: 1.3
                  }}>Wired Setup</h3>
                </div>
                <p style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.5',
                  margin: 0,
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  LIVE video feeds directly to monitors, computers, or mobile devices for instant, high definition visibility.
                </p>
              </div>

              <div className={`prototype-card featured${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(30, 144, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(20px, 5vw, 32px)',
                border: '2px solid rgba(30, 144, 255, 0.4)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 'clamp(16px, 4vw, 20px)',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                  gap: isMobile ? '12px' : '16px'
                }}>
                  <div style={{
                    width: 'clamp(40px, 8vw, 48px)',
                    height: 'clamp(40px, 8vw, 48px)',
                    backgroundColor: '#1E90FF',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    marginRight: isMobile ? 0 : '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={ai} style={{ height: 35, width: 35 }} /></span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1E90FF',
                    lineHeight: 1.3
                  }}>AI-Powered Software</h3>
                </div>
                <p style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.5',
                  margin: 0,
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  <strong>Industry first:</strong> AI highlights anatomy, trauma, and ulcers in real-time accelerating critical interventions, aiding junior staff, and reducing error.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(20px, 5vw, 32px)',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 'clamp(16px, 4vw, 20px)',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                  gap: isMobile ? '12px' : '16px'
                }}>
                  <div style={{
                    width: 'clamp(40px, 8vw, 48px)',
                    height: 'clamp(40px, 8vw, 48px)',
                    backgroundColor: '#20B2AA',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    marginRight: isMobile ? 0 : '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={design} style={{ height: 35, width: 35 }} /></span>
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1',
                    lineHeight: 1.3
                  }}>Ergonomic Design</h3>
                </div>
                <p style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.5',
                  margin: 0,
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  Built to fit naturally in any hand, reducing fatigue and maximizing control.
                </p>
              </div>
            </div>
          )}

          {activePrototype === 'prototype2' && (
  <div style={{
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'clamp(20px, 5vw, 32px)'
  }}>
    {/* Wireless Setup */}
    <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
      backgroundColor: 'rgba(30, 144, 255, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 32px)',
      border: '1px solid rgba(30, 144, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(16px, 4vw, 20px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '12px' : '16px'
      }}>
        <div style={{
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          backgroundColor: '#1E90FF',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          marginRight: isMobile ? 0 : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={wireless} style={{ height: 35, width: 35 }} /></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: '600',
          margin: 0,
          color: '#1E90FF',
          lineHeight: 1.3
        }}>Wireless Setup</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.5',
        margin: 0,
        textAlign: isMobile ? 'center' : 'left'
      }}>
        Freedom to connect untethered streaming to any device. Ready for the next-generation mobile hospital.
      </p>
    </div>

    {/* Improved Dual Camera */}
    <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
      backgroundColor: 'rgba(30, 144, 255, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 32px)',
      border: '1px solid rgba(30, 144, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(16px, 4vw, 20px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '12px' : '16px'
      }}>
        <div style={{
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          backgroundColor: '#20B2AA',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          marginRight: isMobile ? 0 : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={dualcam} style={{ height: 35, width: 35 }} /></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: '600',
          margin: 0,
          color: '#1E90FF',
          lineHeight: 1.3
        }}>Improved Dual Camera</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.5',
        margin: 0,
        textAlign: isMobile ? 'center' : 'left'
      }}>
        Improved image fidelity through advanced sensors and image processing for diagnostic confidence.
      </p>
    </div>

    {/* Water-proof Casing */}
    <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
      backgroundColor: 'rgba(30, 144, 255, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 32px)',
      border: '1px solid rgba(30, 144, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(16px, 4vw, 20px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '12px' : '16px'
      }}>
        <div style={{
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          backgroundColor: '#00CED1',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          marginRight: isMobile ? 0 : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="M480-80q-137 0-228.5-94T160-408q0-63.33 28.67-126 28.66-62.67 71.66-120.33 43-57.67 93-108 50-50.34 93.34-88.67 7.33-6.67 15.83-9.5t17.5-2.83q9 0 17.5 2.83t15.83 9.5q43.34 38.33 93.34 88.67 50 50.33 93 108 43 57.66 71.66 120.33Q800-471.33 800-408q0 140-91.5 234T480-80Zm0-66.67q109.33 0 181.33-74.5 72-74.5 72-186.83 0-77-64.5-174.67-64.5-97.66-188.83-208.66-124.33 111-188.83 208.66Q226.67-485 226.67-408q0 112.33 72 186.83 72 74.5 181.33 74.5ZM480-480Zm3 274.67q14.67-.34 23.17-6.84 8.5-6.5 8.5-17.83 0-12-8.67-18.83-8.67-6.84-24.67-6.5-41.66 1-86-25.17Q351-306.67 339-373.67q-2-9.66-9.5-15.66t-16.5-6q-12 0-19 9.16-7 9.17-4.67 19.84Q305-280 363.33-242q58.34 38 119.67 36.67Z"/></svg></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: '600',
          margin: 0,
          color: '#1E90FF',
          lineHeight: 1.3
        }}>Water-proof Casing</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.5',
        margin: 0,
        textAlign: isMobile ? 'center' : 'left'
      }}>
        Built to last. Easy sterilization and infection control for each use.
      </p>
    </div>

    {/* Improved Mechanical Design */}
    <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
      backgroundColor: 'rgba(30, 144, 255, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 32px)',
      border: '1px solid rgba(30, 144, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(16px, 4vw, 20px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '12px' : '16px'
      }}>
        <div style={{
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          backgroundColor: '#1E90FF',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          marginRight: isMobile ? 0 : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={hardware} style={{ height: 35, width: 35 }} /></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: '600',
          margin: 0,
          color: '#1E90FF',
          lineHeight: 1.3
        }}>Improved Mechanical Design</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.5',
        margin: 0,
        textAlign: isMobile ? 'center' : 'left'
      }}>
        <strong>Enhanced efficiency:</strong> greater thrust with dramatically less power, ensuring longer operation.
      </p>
    </div>

    {/* Lighter, Stronger */}
    <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
      backgroundColor: 'rgba(30, 144, 255, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 32px)',
      border: '1px solid rgba(30, 144, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(16px, 4vw, 20px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '12px' : '16px'
      }}>
        <div style={{
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          backgroundColor: '#20B2AA',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          marginRight: isMobile ? 0 : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="m545.33-84-46.66-46.67 142-142-368-368-142 142L84-545.33l56-58-56-56L168.67-744 122-791.33 168.67-838l48 46 84-84 56 56 58-56 46.66 46.67-142 142 368 368 142-142L876-414.67l-56 58 56 56-85.33 85.34L837.33-168l-46.66 46.67L743.33-168l-84 84-56-56-58 56Z"/></svg></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: '600',
          margin: 0,
          color: '#1E90FF',
          lineHeight: 1.3
        }}>Lighter, Stronger</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.5',
        margin: 0,
        textAlign: isMobile ? 'center' : 'left'
      }}>
        Precision alloys reduce weight-more comfort, less strain, superior performance.
      </p>
    </div>

    {/* Refined Ergonomics */}
    <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
      backgroundColor: 'rgba(30, 144, 255, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 32px)',
      border: '1px solid rgba(30, 144, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(16px, 4vw, 20px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '12px' : '16px'
      }}>
        <div style={{
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          backgroundColor: '#00CED1',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          marginRight: isMobile ? 0 : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}><Player autoplay loop src={design} style={{ height: 35, width: 35 }} /></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: '600',
          margin: 0,
          color: '#1E90FF',
          lineHeight: 1.3
        }}>Refined Ergonomics</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.5',
        margin: 0,
        textAlign: isMobile ? 'center' : 'left'
      }}>
        Every angle, every curve designed to elevate clinical confidence.
      </p>
    </div>
  </div>
)}

        </div>

        {/* ECG Divider 3 */}
        <ECGDivider variant={1} />

        {/* AI Features Section */}
       {/* AI-Powered Software Section */}
{/* AI-Powered Software Section */}
<div style={{
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'clamp(32px, 8vw, 64px) clamp(16px, 4vw, 24px)',
  position: 'relative',
  zIndex: 10
}}>
  <h2 style={{
    fontSize: 'clamp(2rem, 8vw, 3.375rem)',
    fontWeight: 'bold',
    marginBottom: 'clamp(32px, 8vw, 48px)',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: `0 0 clamp(32px, 8vw, 48px) 0`,
    lineHeight: 1.2
  }}>
    AI-Powered Software:An Industry First
  </h2>

  {/* 3x3 Grid Layout */}
  <div style={{
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gridTemplateRows: isMobile ? 'auto auto auto auto auto auto' : 'repeat(3, 1fr)',
    gap: 'clamp(20px, 5vw, 32px)',
    alignItems: 'stretch',
    minHeight: isMobile ? 'auto' : '600px'
  }}>
   
    {/* Video Player - Position (1,1) to (2,2) - spans 4 grid cells */}
    <div style={{
      gridColumn: isMobile ? '1' : '1 / 3',
      gridRow: isMobile ? '1' : '1 / 3',
      backgroundColor: 'rgba(30, 144, 255, 0.1)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(16px, 4vw, 24px)',
      border: '2px solid rgba(30, 144, 255, 0.4)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        borderRadius: 'clamp(8px, 2vw, 12px)',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flex: '1'
      }}>
        <video
          src={laryngoVideo} // Use your imported video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'clamp(8px, 2vw, 12px)'
          }}
          onError={(e) => {
            console.warn("Video failed to load from assets");
            e.target.style.display = 'none';
            const placeholder = e.target.parentElement;
            placeholder.innerHTML = `
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #00CED1;
                font-size: clamp(1rem, 3vw, 1.5rem);
              ">
                <div style="font-size: clamp(2rem, 6vw, 3rem); margin-bottom: 16px;">🎥</div>
                <div>Laryngoscope Demo Video</div>
                <div style="font-size: clamp(0.8rem, 2vw, 1rem); opacity: 0.7; margin-top: 8px;">Video not found in assets</div>
              </div>
            `;
          }}
        />
      </div>
      <div style={{
        marginTop: 'clamp(12px, 3vw, 16px)',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: '600',
          margin: '0 0 clamp(8px, 2vw, 12px) 0',
          color: '#1E90FF'
        }}>Live Laryngoscope Demo</h3>
        <p style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
          color: 'rgba(255, 255, 255, 0.8)',
          margin: 0,
          lineHeight: 1.4
        }}>
          Watch AI-powered anatomy detection in real-time
        </p>
      </div>
    </div>

    {/* Feature 1 - Position (1,3) */}
    <div style={{
      gridColumn: isMobile ? '1' : '3',
      gridRow: isMobile ? '2' : '1',
      backgroundColor: 'rgba(0, 206, 209, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 24px)',
      border: '1px solid rgba(0, 206, 209, 0.2)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(12px, 3vw, 16px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '8px' : '12px'
      }}>
        <div style={{
          width: 'clamp(32px, 6vw, 40px)',
          height: 'clamp(32px, 6vw, 40px)',
          backgroundColor: '#1E90FF',
          borderRadius: 'clamp(6px, 2vw, 8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}><Player autoplay loop src={ai} style={{ height: 35, width: 35 }} /></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: '600',
          margin: 0,
          color: '#00CED1',
          lineHeight: 1.2
        }}>AI-Driven</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
        lineHeight: '1.4',
        margin: 0,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: isMobile ? 'center' : 'left',
        flex: '1'
      }}>
        Instantly detects anatomy, highlights trauma and ulcers, supplements assessment.
      </p>
    </div>

    {/* Feature 2 - Position (2,3) */}
    <div style={{
      gridColumn: isMobile ? '1' : '3',
      gridRow: isMobile ? '3' : '2',
      backgroundColor: 'rgba(0, 206, 209, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 24px)',
      border: '1px solid rgba(0, 206, 209, 0.2)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(12px, 3vw, 16px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '8px' : '12px'
      }}>
        <div style={{
          width: 'clamp(32px, 6vw, 40px)',
          height: 'clamp(32px, 6vw, 40px)',
          backgroundColor: '#00CED1',
          borderRadius: 'clamp(6px, 2vw, 8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}><Player autoplay loop src={health} style={{ height: 35, width: 35 }} /></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: '600',
          margin: 0,
          color: '#00CED1',
          lineHeight: 1.2
        }}>Clinician-Centric</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
        lineHeight: '1.4',
        margin: 0,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: isMobile ? 'center' : 'left',
        flex: '1'
      }}>
        Built for doctors, paramedics, and nurses simple, intuitive, ready for urgent care.
      </p>
    </div>

    {/* Feature 3 - Position (3,1) */}
    <div style={{
      gridColumn: isMobile ? '1' : '1',
      gridRow: isMobile ? '4' : '3',
      backgroundColor: 'rgba(0, 206, 209, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 24px)',
      border: '1px solid rgba(0, 206, 209, 0.2)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(12px, 3vw, 16px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '8px' : '12px'
      }}>
        <div style={{
          width: 'clamp(32px, 6vw, 40px)',
          height: 'clamp(32px, 6vw, 40px)',
          backgroundColor: '#20B2AA',
          borderRadius: 'clamp(6px, 2vw, 8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}><Player autoplay loop src={Research} style={{ height: 35, width: 35 }} /></span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: '600',
          margin: 0,
          color: '#00CED1',
          lineHeight: 1.2
        }}>Advanced Processing</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
        lineHeight: '1.4',
        margin: 0,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: isMobile ? 'center' : 'left',
        flex: '1'
      }}>
        Next-level trauma visualization using sophisticated algorithms.
      </p>
    </div>

    {/* Feature 4 - Position (3,2) */}
    <div style={{
      gridColumn: isMobile ? '1' : '2',
      gridRow: isMobile ? '5' : '3',
      backgroundColor: 'rgba(0, 206, 209, 0.05)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 24px)',
      border: '1px solid rgba(0, 206, 209, 0.2)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(12px, 3vw, 16px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '8px' : '12px'
      }}>
        <div style={{
          width: 'clamp(32px, 6vw, 40px)',
          height: 'clamp(32px, 6vw, 40px)',
          backgroundColor: '#1E90FF',
          borderRadius: 'clamp(6px, 2vw, 8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>🎯</span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: '600',
          margin: 0,
          color: '#00CED1',
          lineHeight: 1.2
        }}>Better Accuracy</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
        lineHeight: '1.4',
        margin: 0,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: isMobile ? 'center' : 'left',
        flex: '1'
      }}>
        Enhanced scans for speed and precision-faster, confident decisions.
      </p>
    </div>

    {/* Feature 5 - Position (3,3) */}
    <div style={{
      gridColumn: isMobile ? '1' : '3',
      gridRow: isMobile ? '6' : '3',
      backgroundColor: 'rgba(32, 178, 170, 0.1)',
      backdropFilter: 'blur(4px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(20px, 5vw, 24px)',
      border: '2px solid rgba(32, 178, 170, 0.4)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(12px, 3vw, 16px)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '8px' : '12px'
      }}>
        <div style={{
          width: 'clamp(32px, 6vw, 40px)',
          height: 'clamp(32px, 6vw, 40px)',
          backgroundColor: '#20B2AA',
          borderRadius: 'clamp(6px, 2vw, 8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>🔗</span>
        </div>
        <h3 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: '600',
          margin: 0,
          color: '#20B2AA',
          lineHeight: 1.2
        }}>Live Collaboration</h3>
      </div>
      <p style={{
        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
        lineHeight: '1.4',
        margin: 0,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: isMobile ? 'center' : 'left',
        flex: '1'
      }}>
        Peer-to-peer broadcast for real-time specialist consultation.
      </p>
    </div>
  </div>
</div>


       

        {/* ECG Divider 4 */}
        <ECGDivider variant={2} />

        {/* Specifications Table */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(32px, 8vw, 64px) clamp(16px, 4vw, 24px)',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 3.375rem)',
            fontWeight: 'bold',
            marginBottom: 'clamp(32px, 8vw, 48px)',
            textAlign: 'center',
            margin: `0 0 clamp(32px, 8vw, 48px) 0`,
            lineHeight: 1.2
          }}>
            Crafted for Real World Excellence
          </h2>
         
          <div style={{
            backgroundColor: 'rgba(0, 206, 209, 0.05)',
            backdropFilter: 'blur(4px)',
            borderRadius: 'clamp(12px, 3vw, 16px)',
            padding: 'clamp(20px, 5vw, 32px)',
            border: '1px solid rgba(0, 206, 209, 0.2)',
            overflowX: 'auto'
          }}>
<table style={{
  width: '100%',
  minWidth: isMobile ? '500px' : 'auto',
  borderCollapse: 'collapse',
  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
}}>
  <thead>
    <tr>
      <th style={{
        padding: 'clamp(12px, 3vw, 16px)',
        textAlign: 'left',
        borderBottom: '2px solid rgba(0, 206, 209, 0.3)',
        color: '#00CED1',
        fontSize: 'clamp(1rem, 3vw, 1.125rem)',
        fontWeight: '600'
      }}>Feature</th>
      <th style={{
        padding: 'clamp(12px, 3vw, 16px)',
        textAlign: 'left',
        borderBottom: '2px solid rgba(0, 206, 209, 0.3)',
        color: '#00CED1',
        fontSize: 'clamp(1rem, 3vw, 1.125rem)',
        fontWeight: '600'
      }}>Benefit</th>
    </tr>
  </thead>
  <tbody>
    {specifications.map((spec, index) => (
      <tr key={index} style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <td style={{
          padding: 'clamp(12px, 3vw, 16px)',
          fontWeight: '500',
          color: 'white',
          fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
        }}>{spec.feature}</td>
        <td style={{
          padding: 'clamp(12px, 3vw, 16px)',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
        }}>{spec.benefit}</td>
      </tr>
    ))}
  </tbody>
</table>

          </div>
        </div>
         <ECGDivider variant={1} />
         <div style={{
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'clamp(32px, 8vw, 64px) clamp(16px, 4vw, 24px)',
  position: 'relative',
  zIndex: 10
}}>
  <h2 style={{
    fontSize: 'clamp(2rem, 8vw, 3.375rem)',
    fontWeight: 'bold',
    marginBottom: 'clamp(32px, 8vw, 48px)',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: `0 0 clamp(32px, 8vw, 48px) 0`,
    lineHeight: 1.2
  }}>
    Why Settle? Experience Innovation.
  </h2>
 
  {/* Comparison Table */}
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(4px)',
    borderRadius: 'clamp(12px, 3vw, 16px)',
    padding: 'clamp(20px, 5vw, 32px)',
    border: '1px solid rgba(0, 206, 209, 0.2)',
    overflowX: 'auto'
  }}>
    <table style={{
      width: '100%',
      minWidth: isMobile ? '600px' : 'auto',
      borderCollapse: 'collapse',
      fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
    }}>
      <thead>
        <tr>
          <th style={{
            padding: 'clamp(12px, 3vw, 16px)',
            textAlign: 'left',
            borderBottom: '2px solid rgba(0, 206, 209, 0.3)',
            color: '#00CED1',
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            fontWeight: '600',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: '25%'
          }}>Features</th>
          <th style={{
            padding: 'clamp(12px, 3vw, 16px)',
            textAlign: 'center',
            borderBottom: '2px solid rgba(220, 20, 60, 0.3)',
            color: '#FF6B6B',
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            fontWeight: '600',
            backgroundColor: 'rgba(220, 20, 60, 0.1)',
            width: '37.5%'
          }}>Traditional Laryngoscope</th>
          <th style={{
            padding: 'clamp(12px, 3vw, 16px)',
            textAlign: 'center',
            borderBottom: '2px solid rgba(0, 206, 209, 0.3)',
            color: '#00CED1',
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            fontWeight: '600',
            backgroundColor: 'rgba(0, 206, 209, 0.1)',
            width: '37.5%'
          }}>Ganglia's Smart Video-Laryngoscope</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Price</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: '#FF6B6B',
            textAlign: 'center',
            fontWeight: '500',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>Expensive (₹7+ lakhs)</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: '#00CED1',
            textAlign: 'center',
            fontWeight: '500',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Affordable (₹1.5–2 lakhs)</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Weight & Build</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>Bulky, heavy</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Lightweight, ergonomic</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Visualization</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>Limited (direct line of sight)</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Dual-camera (wide + focused), real-time HD video</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Display</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>No video, only direct view</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Live display on monitors, computers, or mobile devices</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Oxygenation</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>Not integrated</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>In-built oxygen supply port for constant oxygenation</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>AI Capabilities</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>None</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>AI-powered: highlights anatomy, trauma, ulcers in real time</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Operation</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>Manual, high skill needed</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Joystick-controlled tongue-tip, easier handling, clinician-centric UI</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Trauma Risk</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>Higher, more likely to cause injury</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Minimal trauma, trauma-free intubation</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Sterilization</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>Can be harder, not always waterproof</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Waterproof casing, easy sterilization</td>
        </tr>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Connectivity</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>No digital features</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Wireless setup, peer-to-peer video sharing (in-progress)</td>
        </tr>
        <tr>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}>Collaboration</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(220, 20, 60, 0.05)'
          }}>Not supported</td>
          <td style={{
            padding: 'clamp(12px, 3vw, 16px)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 206, 209, 0.05)'
          }}>Peer-to-peer real-time video broadcast for global consultation (in-progress)</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


        {/* ECG Divider 5 */}
        <ECGDivider variant={1} />

        {/* Final CTA Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: `clamp(32px, 8vw, 64px) clamp(16px, 4vw, 24px) clamp(80px, 15vw, 124px) clamp(16px, 4vw, 24px)`,
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            textAlign: 'center',
            padding: 'clamp(32px, 8vw, 64px) clamp(24px, 6vw, 48px)',
            backgroundColor: 'rgba(0, 206, 209, 0.05)',
            backdropFilter: 'blur(4px)',
            borderRadius: 'clamp(16px, 4vw, 24px)',
            border: '1px solid rgba(0, 206, 209, 0.2)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 6vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: 'clamp(16px, 4vw, 24px)',
              background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: `0 0 clamp(16px, 4vw, 24px) 0`,
              lineHeight: 1.2
            }}>
              Airway Management Transformed
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
              lineHeight: '1.6',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: `0 0 clamp(12px, 3vw, 16px) 0`
            }}>
              The Ganglia Smart Video Laryngoscope isn't just another device.
            </p>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              lineHeight: '1.6',
              marginBottom: 'clamp(24px, 6vw, 32px)',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: `0 0 clamp(24px, 6vw, 32px) 0`
            }}>
              It's a leap forward for clinicians. A lifeline for patients. A promise: that the best of technology should quietly, powerfully, and affordably <strong>save lives everywhere</strong>.
            </p>
            <div style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              fontWeight: '600',
              color: '#00CED1',
              marginBottom: 'clamp(32px, 8vw, 48px)',
              fontStyle: 'italic'
            }}>
              Innovation. Compassion. Delivered.
            </div>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'center',
              gap: 'clamp(16px, 4vw, 24px)',
              alignItems: 'center'
            }}>
              <button style={{
                padding: 'clamp(16px, 4vw, 20px) clamp(32px, 8vw, 48px)',
                borderRadius: '9999px',
                color: 'white',
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '300px' : 'none'
              }}>
                Request Demo
              </button>
             
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default LaryngoscopeComponent;