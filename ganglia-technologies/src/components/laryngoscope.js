"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Footer from "./Footer";

let laryImage;
try {
  laryImage = require('../assets/lanyngoscope1.png');
} catch (error) {
  laryImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Crect width='280' height='280' fill='%23374151' rx='10'/%3E%3Ctext x='140' y='140' text-anchor='middle' fill='%23ffffff' font-size='16'%3ELaryngoscope%3C/text%3E%3C/svg%3E";
}



function LaryngoscopeComponent() {
  const keyframes = `
    @keyframes floatMove1 {
      0% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(150px, -100px) scale(1.2); }
      50% { transform: translate(-80px, 120px) scale(0.8); }
      75% { transform: translate(100px, 60px) scale(1.1); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove2 {
      0% { transform: translate(0, 0) scale(1); }
      20% { transform: translate(-120px, 80px) scale(1.3); }
      40% { transform: translate(90px, -120px) scale(0.7); }
      60% { transform: translate(-70px, 150px) scale(1.4); }
      80% { transform: translate(130px, -50px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove3 {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-180px, -100px) scale(1.2); }
      66% { transform: translate(120px, 140px) scale(0.6); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove4 {
      0% { transform: translate(0, 0) scale(1); }
      30% { transform: translate(160px, -130px) scale(1.3); }
      70% { transform: translate(-100px, 160px) scale(0.8); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove5 {
      0% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-140px, 100px) scale(1.4); }
      50% { transform: translate(180px, -80px) scale(0.6); }
      75% { transform: translate(-90px, -120px) scale(1.2); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove6 {
      0% { transform: translate(0, 0) scale(1); }
      20% { transform: translate(150px, -150px) scale(1.5); }
      40% { transform: translate(-120px, 90px) scale(0.5); }
      60% { transform: translate(200px, 120px) scale(1.3); }
      80% { transform: translate(-160px, -60px) scale(0.7); }
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
  const [activePrototype, setActivePrototype] = useState('prototype1');

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
    { feature: 'Camera Resolution', prototype1: '4K Ultra HD', prototype2: '8K Professional' },
    { feature: 'Battery Life', prototype1: '8 hours', prototype2: '12 hours' },
    { feature: 'Weight', prototype1: '450g', prototype2: '380g' },
    { feature: 'Connectivity', prototype1: 'Wired', prototype2: 'Wireless + Wired' },
    { feature: 'Operating Temperature', prototype1: '5°C to 40°C', prototype2: '0°C to 50°C' },
    { feature: 'Sterilization', prototype1: 'Standard', prototype2: 'Waterproof + Enhanced' },
    { feature: 'AI Processing', prototype1: 'Real-time Detection', prototype2: 'Advanced ML Algorithms' },
    { feature: 'Display Output', prototype1: 'HD Video Stream', prototype2: '4K + Mobile Compatible' }
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
    // Extended left part pattern to cover full width
    const ecgPath = variant === 1 
      ? "M0,50 Q20,45 40,50 Q60,55 80,50 Q100,45 120,50 L130,20 L140,80 L150,10 L160,90 L170,50 Q190,45 210,50 Q230,55 250,50 Q270,45 290,50 Q310,55 320,50 L330,30 L340,70 L350,20 L360,80 L370,50 Q390,45 410,50 Q430,55 450,50 Q470,45 490,50 Q510,55 530,50 Q550,45 570,50 Q590,55 610,50 Q630,45 650,50 Q670,55 690,50 Q710,45 730,50 Q750,55 770,50 Q790,45 810,50 Q830,55 850,50 Q870,45 890,50 Q910,55 930,50 Q950,45 970,50 Q990,55 1010,50 Q1030,45 1050,50 Q1070,55 1090,50 Q1110,45 1130,50 Q1150,55 1170,50 Q1190,45 1200,50"
      : "M0,50 Q15,48 30,50 Q45,52 60,50 Q75,48 90,50 L100,25 L110,75 L120,15 L130,85 L140,50 Q155,48 170,50 Q185,52 200,50 Q215,48 230,50 Q245,52 260,50 Q275,48 290,50 L300,35 L310,65 L320,25 L330,75 L340,50 Q355,48 370,50 Q385,52 400,50 Q415,48 430,50 Q445,52 460,50 Q475,48 490,50 Q505,52 520,50 Q535,48 550,50 Q565,52 580,50 Q595,48 610,50 Q625,52 640,50 Q655,48 670,50 Q685,52 700,50 Q715,48 730,50 Q745,52 760,50 Q775,48 790,50 Q805,52 820,50 Q835,48 850,50 Q865,52 880,50 Q895,48 910,50 Q925,52 940,50 Q955,48 970,50 Q985,52 1000,50 Q1015,48 1030,50 Q1045,52 1060,50 Q1075,48 1090,50 Q1105,52 1120,50 Q1135,48 1150,50 Q1165,52 1180,50 Q1195,48 1200,50";

    return (
      <div style={{
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '64px 0',
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
          backgroundSize: '20px 10px',
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
          
          {/* Main ECG line */}
          <path
            d={ecgPath}
            fill="none"
            stroke="url(#ecgGradient)"
            strokeWidth="3"
            strokeDasharray="2000"
            strokeDashoffset="2000"
            style={{
              animation: 'ecgFlow 4s linear infinite'
            }}
          />
          
          {/* Heartbeat pulse indicators - only at the ECG spike locations */}
          <circle 
            cx="150" 
            cy="50" 
            r="4" 
            fill="#00CED1"
            style={{
              animation: 'ecgPulse 2s ease-in-out infinite'
            }}
          />
          <circle 
            cx="340" 
            cy="50" 
            r="4" 
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
            transform: translateY(80px);
            transition: all 1.8s cubic-bezier(.77,0,.18,1);
          }
          .prototype-card.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .prototype-card.featured {
            transform: translateY(80px) scale(1.05);
          }
          .prototype-card.featured.visible {
            transform: translateY(0) scale(1.05);
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
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            opacity: 0.6,
            background: 'radial-gradient(circle, #00CED1 0%, #1E90FF 70%, transparent 100%)',
            filter: 'blur(80px)',
            top: '-100px',
            left: '-80px',
            animation: 'floatMove1 8s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            opacity: 0.7,
            background: 'radial-gradient(circle, #20B2AA 0%, #00CED1 60%, transparent 100%)',
            filter: 'blur(60px)',
            top: '-100px',
            right: '-150px',
            animation: 'floatMove2 10s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            opacity: 0.5,
            background: 'radial-gradient(circle, #1E90FF 0%, #20B2AA 65%, transparent 100%)',
            filter: 'blur(70px)',
            bottom: '-150px',
            left: '-200px',
            animation: 'floatMove4 9s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            opacity: 0.55,
            background: 'radial-gradient(circle, #00CED1 0%, #1E90FF 80%, transparent 100%)',
            filter: 'blur(50px)',
            top: '40%',
            left: '60%',
            animation: 'floatMove5 7s ease-in-out infinite reverse'
          }}></div>
        </div>

        {/* Hero Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '204px 20px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '64px'
          }}>
            <div style={{
              width: '60%',
              paddingRight: '2px',
              textAlign: 'right',
              order: 2 
            }}>
              <h1 style={{
                fontSize: '56px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#00CED1',
                margin: '0 0 16px 0'
              }}>
                Ganglia Smart Video-Laryngoscope
              </h1>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#20B2AA',
                margin: '0 0 24px 0'
              }}>
                Revolutionizing Airway Management. For Everyone.
              </h2>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.75',
                marginBottom: '32px',
                color: 'white',
                margin: '0 0 32px 0'
              }}>
                At Ganglia Technologies, we've reimagined the laryngoscope from the ground up—merging world-class engineering, cutting-edge AI, and effortless usability to deliver the next generation of intubation. Whether you're in a metropolitan hospital or a rural clinic, airway management just became safer, smarter, and truly accessible.
              </p>
              <button style={{
                padding: '16px 48px',
                borderRadius: '9999px',
                color: 'white',
                fontSize: '20px',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                Request Demo
              </button>
            </div>
            <div style={{
              width: '40%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              order: 1 
            }}>
              {/* Device visualization with corrected image */}
              
                <img
      src={getImageSrc(laryImage, laryImage)}
      alt="laryngoscope"
      
      onError={(e) => {
        console.warn("Idea GIF failed to load, using fallback");
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='6'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E";
      }}
    />
              
            </div>
          </div>
        </div>

        {/* ECG Divider 1 */}
        <ECGDivider variant={1} />

        {/* Value Proposition Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 24px',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '54px',
            fontWeight: 'bold',
            marginBottom: '48px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 48px 0'
          }}>
            Why Settle? Experience Innovation.
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '48px',
            marginBottom: '48px'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              border: '2px solid rgba(220, 20, 60, 0.3)',
              flex: '1',
              maxWidth: '300px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#FF6B6B',
                margin: '0 0 16px 0'
              }}>Traditional Systems</h3>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#FF6B6B',
                marginBottom: '16px'
              }}>₹7+ Lakhs</div>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0
              }}>Limited accessibility, restricting advanced care</p>
            </div>

            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#00CED1',
              padding: '0 24px'
            }}>VS</div>

            <div style={{
              backgroundColor: 'rgba(0, 206, 209, 0.1)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              border: '2px solid rgba(0, 206, 209, 0.5)',
              flex: '1',
              maxWidth: '300px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#00CED1',
                margin: '0 0 16px 0'
              }}>Ganglia Smart</h3>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#00CED1',
                marginBottom: '16px'
              }}>₹1.5-2 Lakhs</div>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0
              }}>Revolutionary accessibility for everyone</p>
            </div>
          </div>
        </div>

        {/* ECG Divider 2 */}
        <ECGDivider variant={2} />

        {/* Prototypes Section */}
        <div
          ref={prototypesRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '64px 24px',
            position: 'relative',
            zIndex: 10
          }}
        >
          <h2 style={{
            fontSize: '54px',
            fontWeight: 'bold',
            marginBottom: '48px',
            textAlign: 'center',
            margin: '0 0 48px 0'
          }}>
            Designed to Care. Engineered to Lead.
          </h2>

          {/* Prototype Selector */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '48px',
            gap: '24px'
          }}>
            <button
              onClick={() => setActivePrototype('prototype1')}
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                color: activePrototype === 'prototype1' ? 'white' : '#00CED1',
                fontSize: '18px',
                fontWeight: '600',
                background: activePrototype === 'prototype1' 
                  ? 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)' 
                  : 'transparent',
                border: '2px solid #00CED1',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Prototype I: The Breakthrough
            </button>
            <button
              onClick={() => setActivePrototype('prototype2')}
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                color: activePrototype === 'prototype2' ? 'white' : '#1E90FF',
                fontSize: '18px',
                fontWeight: '600',
                background: activePrototype === 'prototype2' 
                  ? 'linear-gradient(135deg, #1E90FF 0%, #20B2AA 100%)' 
                  : 'transparent',
                border: '2px solid #1E90FF',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Prototype II: The Evolution
            </button>
          </div>

          {/* Prototype Features */}
          {activePrototype === 'prototype1' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px'
            }}>
              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#00CED1',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>🕹️</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1'
                  }}>Joy-stick Controlled Tongue-tip</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Effortlessly pulls the Epiglottis—precisely, gently, minimizing trauma and boosting patient comfort.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#1E90FF',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>📹</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1'
                  }}>Dual Camera System</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Switch between focused and wide-angle views for extraordinary anatomical clarity.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#20B2AA',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>💨</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1'
                  }}>In-built Oxygen Supply Port</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Seamless, constant oxygenation ensures patient safety throughout the procedure.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#00CED1',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>🔗</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1'
                  }}>Wired Setup</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  LIVE video feeds directly to monitors, computers, or mobile devices for instant, high-definition visibility anywhere.
                </p>
              </div>

              <div className={`prototype-card featured${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(30, 144, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '2px solid rgba(30, 144, 255, 0.4)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#1E90FF',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>🤖</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1E90FF'
                  }}>AI-Powered Software</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  <strong>Industry-first:</strong> AI highlights anatomy, trauma, and ulcers in real-time—accelerating critical interventions, aiding junior staff, and reducing error.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(0, 206, 209, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(0, 206, 209, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#20B2AA',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>✋</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#00CED1'
                  }}>Ergonomic Design</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Built to fit naturally in any hand, reducing fatigue and maximizing control.
                </p>
              </div>
            </div>
          )}

          {activePrototype === 'prototype2' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px'
            }}>
              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(30, 144, 255, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(30, 144, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#1E90FF',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>📡</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1E90FF'
                  }}>Wireless Setup</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Freedom to connect—untethered streaming to any device. Ready for the next-generation mobile hospital.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(30, 144, 255, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(30, 144, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#20B2AA',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>📸</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1E90FF'
                  }}>Improved Dual Camera</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Even greater image fidelity through advanced sensors and image processing for diagnostic confidence.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(30, 144, 255, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(30, 144, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#00CED1',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>💧</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1E90FF'
                  }}>Water-proof Casing</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Built to last. Easy sterilization and infection control for every shift.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(30, 144, 255, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(30, 144, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#1E90FF',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>⚙️</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1E90FF'
                  }}>Improved Mechanical Design</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Enhanced efficiency: greater thrust with dramatically less power, ensuring all-day operation.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(30, 144, 255, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(30, 144, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#20B2AA',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>⬇️</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1E90FF'
                  }}>Lighter, Stronger</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Precision alloys reduce weight—more comfort, less strain, superior performance.
                </p>
              </div>

              <div className={`prototype-card${showPrototypes ? " visible" : ""}`} style={{
                backgroundColor: 'rgba(30, 144, 255, 0.05)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(30, 144, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#00CED1',
                    borderRadius: '12px',
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>🎯</span>
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1E90FF'
                  }}>Refined Ergonomics</h3>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                  Every angle, every curve designed to elevate clinical confidence.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ECG Divider 3 */}
        <ECGDivider variant={1} />

        {/* AI Features Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 24px',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '54px',
            fontWeight: 'bold',
            marginBottom: '48px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 48px 0'
          }}>
            The Power of Intelligence. At Your Fingertips.
          </h2>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
            marginBottom: '48px'
          }}>
            <div style={{
              width: '40%',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '300px',
                height: '300px',
                backgroundColor: 'rgba(30, 144, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(30, 144, 255, 0.3)',
                position: 'relative'
              }}>
                <span style={{ fontSize: '80px' }}>🧠</span>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '2px dashed rgba(0, 206, 209, 0.5)',
                  animation: 'floatMove1 4s linear infinite'
                }}></div>
              </div>
            </div>

            <div style={{ width: '60%' }}>
              <h3 style={{
                fontSize: '32px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#00CED1',
                margin: '0 0 24px 0'
              }}>AI-Powered Software—An Industry First</h3>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#1E90FF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '20px' }}>🤖</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#00CED1',
                      margin: '0 0 8px 0'
                    }}>Artificial Intelligence-Driven</h4>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.8)',
                      margin: 0
                    }}>
                      Instantly detects anatomy, highlights trauma and ulcers, supplements the clinician's assessment with every scan.
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#20B2AA',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '20px' }}>👩‍⚕️</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#00CED1',
                      margin: '0 0 8px 0'
                    }}>Clinician-Centric Interface</h4>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.8)',
                      margin: 0
                    }}>
                      Built for doctors, paramedics, and nurses—simple, intuitive, and ready for urgent care.
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#00CED1',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '20px' }}>🔍</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#00CED1',
                      margin: '0 0 8px 0'
                    }}>Advanced Image Processing</h4>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.8)',
                      margin: 0
                    }}>
                      Next-level trauma visualization using sophisticated algorithms and black-and-white filters for true diagnostic clarity.
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#1E90FF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '20px' }}>🚀</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#00CED1',
                      margin: '0 0 8px 0'
                    }}>Live Collaboration (In Progress)</h4>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.8)',
                      margin: 0
                    }}>
                      Peer-to-peer broadcast lets specialists anywhere consult in real time—empowering hospitals, teaching centers, mobile ICUs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ECG Divider 4 */}
        <ECGDivider variant={2} />

        {/* Specifications Table */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 24px',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '54px',
            fontWeight: 'bold',
            marginBottom: '48px',
            textAlign: 'center',
            margin: '0 0 48px 0'
          }}>
            Crafted for Real-World Excellence
          </h2>
          
          <div style={{
            backgroundColor: 'rgba(0, 206, 209, 0.05)',
            backdropFilter: 'blur(4px)',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid rgba(0, 206, 209, 0.2)',
            overflowX: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '16px'
            }}>
              <thead>
                <tr>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    borderBottom: '2px solid rgba(0, 206, 209, 0.3)',
                    color: '#00CED1',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>Feature</th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'center',
                    borderBottom: '2px solid rgba(0, 206, 209, 0.3)',
                    color: '#00CED1',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>Prototype I</th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'center',
                    borderBottom: '2px solid rgba(30, 144, 255, 0.3)',
                    color: '#1E90FF',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>Prototype II</th>
                </tr>
              </thead>
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={index} style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <td style={{
                      padding: '16px',
                      fontWeight: '500',
                      color: 'white'
                    }}>{spec.feature}</td>
                    <td style={{
                      padding: '16px',
                      textAlign: 'center',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>{spec.prototype1}</td>
                    <td style={{
                      padding: '16px',
                      textAlign: 'center',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: '500'
                    }}>{spec.prototype2}</td>
                  </tr>
                ))}
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
          padding: '64px 24px 124px 24px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            textAlign: 'center',
            padding: '64px 48px',
            backgroundColor: 'rgba(0, 206, 209, 0.05)',
            backdropFilter: 'blur(4px)',
            borderRadius: '24px',
            border: '1px solid rgba(0, 206, 209, 0.2)'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 24px 0'
            }}>
              Airway Management—Transformed
            </h2>
            <p style={{
              fontSize: '20px',
              lineHeight: '1.6',
              marginBottom: '16px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0 0 16px 0'
            }}>
              The Ganglia Smart Video-Laryngoscope isn't just another device.
            </p>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              marginBottom: '32px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0 0 32px 0'
            }}>
              It's a leap forward for clinicians. A lifeline for patients. A promise: that the best of technology should quietly, powerfully, and affordably <strong>save lives everywhere</strong>.
            </p>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#00CED1',
              marginBottom: '48px',
              fontStyle: 'italic'
            }}>
              Innovation. Compassion. Delivered.
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '20px 48px',
                borderRadius: '9999px',
                color: 'white',
                fontSize: '20px',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #00CED1 0%, #1E90FF 100%)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                Request Demo
              </button>
              <button style={{
                padding: '20px 48px',
                borderRadius: '9999px',
                color: '#00CED1',
                fontSize: '20px',
                fontWeight: '500',
                background: 'transparent',
                border: '2px solid #00CED1',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default LaryngoscopeComponent;
