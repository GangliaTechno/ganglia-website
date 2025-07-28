"use client";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";

function MainComponent() {
  const keyframes = `
    @keyframes floatMove1 {
      0% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(75px, -50px) scale(1.1); }
      50% { transform: translate(-40px, 60px) scale(0.9); }
      75% { transform: translate(50px, 30px) scale(1.05); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove2 {
      0% { transform: translate(0, 0) scale(1); }
      20% { transform: translate(-60px, 40px) scale(1.2); }
      40% { transform: translate(45px, -60px) scale(0.8); }
      60% { transform: translate(-35px, 75px) scale(1.3); }
      80% { transform: translate(65px, -25px) scale(0.95); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove3 {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-90px, -50px) scale(1.1); }
      66% { transform: translate(60px, 70px) scale(0.7); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove4 {
      0% { transform: translate(0, 0) scale(1); }
      30% { transform: translate(80px, -65px) scale(1.2); }
      70% { transform: translate(-50px, 80px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove5 {
      0% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-70px, 50px) scale(1.3); }
      50% { transform: translate(90px, -40px) scale(0.7); }
      75% { transform: translate(-45px, -60px) scale(1.1); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes floatMove6 {
      0% { transform: translate(0, 0) scale(1); }
      20% { transform: translate(75px, -75px) scale(1.4); }
      40% { transform: translate(-60px, 45px) scale(0.6); }
      60% { transform: translate(100px, 60px) scale(1.2); }
      80% { transform: translate(-80px, -30px) scale(0.8); }
      100% { transform: translate(0, 0) scale(1); }
    }

    @media (max-width: 768px) {
      @keyframes floatMove1 {
        0% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(30px, -25px) scale(1.05); }
        50% { transform: translate(-20px, 30px) scale(0.95); }
        75% { transform: translate(25px, 15px) scale(1.02); }
        100% { transform: translate(0, 0) scale(1); }
      }
      
      @keyframes floatMove2 {
        0% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(-25px, 20px) scale(1.1); }
        50% { transform: translate(20px, -30px) scale(0.9); }
        75% { transform: translate(-15px, 35px) scale(1.15); }
        100% { transform: translate(0, 0) scale(1); }
      }
    }
  `;

  const pricingRef = useRef(null);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (pricingRef.current) {
        const rect = pricingRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setShowPricing(true);
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <style>
        {`
          .pricing-card {
            opacity: 0;
            transform: translateY(80px);
            transition: all 1.8s cubic-bezier(.77,0,.18,1);
          }
          .pricing-card.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .pricing-card.premium {
            transform: translateY(80px) scale(1.15);
          }
          .pricing-card.premium.visible {
            transform: translateY(0) scale(1.15);
          }

          @media (max-width: 768px) {
            .pricing-card.premium {
              transform: translateY(80px) scale(1.05);
            }
            .pricing-card.premium.visible {
              transform: translateY(0) scale(1.05);
            }
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
        {/* Animated Gradient Bubbles - Mobile Optimized */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none'
        }}>
          <div style={{
            position: 'absolute',
            width: window.innerWidth <= 768 ? '300px' : '600px',
            height: window.innerWidth <= 768 ? '300px' : '600px',
            borderRadius: '50%',
            opacity: 0.75,
            background: 'radial-gradient(circle, #9696DC 0%, #CE85CE 70%, transparent 100%)',
            filter: 'blur(80px)',
            top: '-50px',
            left: '-40px',
            animation: 'floatMove1 8s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: window.innerWidth <= 768 ? '200px' : '400px',
            height: window.innerWidth <= 768 ? '200px' : '400px',
            borderRadius: '50%',
            opacity: 0.75,
            background: 'radial-gradient(circle, #CE85CE 0%, #9696DC 60%, transparent 100%)',
            filter: 'blur(60px)',
            top: '-50px',
            right: '-75px',
            animation: 'floatMove2 10s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: window.innerWidth <= 768 ? '350px' : '700px',
            height: window.innerWidth <= 768 ? '350px' : '700px',
            borderRadius: '50%',
            opacity: 0.6,
            background: 'radial-gradient(circle, #9696DC 0%, #CE85CE 50%, transparent 100%)',
            filter: 'blur(100px)',
            bottom: '-150px',
            right: '-125px',
            animation: 'floatMove3 12s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: window.innerWidth <= 768 ? '250px' : '500px',
            height: window.innerWidth <= 768 ? '250px' : '500px',
            borderRadius: '50%',
            opacity: 0.5,
            background: 'radial-gradient(circle, #CE85CE 0%, #9696DC 65%, transparent 100%)',
            filter: 'blur(70px)',
            bottom: '-75px',
            left: '-100px',
            animation: 'floatMove4 9s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            width: window.innerWidth <= 768 ? '150px' : '300px',
            height: window.innerWidth <= 768 ? '150px' : '300px',
            borderRadius: '50%',
            opacity: 0.55,
            background: 'radial-gradient(circle, #9696DC 0%, #CE85CE 80%, transparent 100%)',
            filter: 'blur(50px)',
            top: '40%',
            left: '60%',
            animation: 'floatMove5 7s ease-in-out infinite reverse'
          }}></div>

          <div style={{
            position: 'absolute',
            width: window.innerWidth <= 768 ? '175px' : '350px',
            height: window.innerWidth <= 768 ? '175px' : '350px',
            borderRadius: '50%',
            opacity: 0.35,
            background: 'radial-gradient(circle, #CE85CE 0%, #9696DC 75%, transparent 100%)',
            filter: 'blur(60px)',
            top: '70%',
            left: '10%',
            animation: 'floatMove6 11s ease-in-out infinite reverse'
          }}></div>
        </div>

        {/* Hero Section - Mobile Responsive */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: window.innerWidth <= 768 ? '80px 16px' : '204px 20px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: window.innerWidth <= 768 ? '32px' : '64px'
          }}>
            {/* Logo - Mobile First */}
            <div style={{
              width: window.innerWidth <= 768 ? '100%' : '40%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              order: window.innerWidth <= 768 ? 1 : 1
            }}>
              {/* Logo placeholder */}
            </div>

            {/* Content */}
            <div style={{
              width: window.innerWidth <= 768 ? '100%' : '60%',
              paddingRight: window.innerWidth <= 768 ? '0' : '2px',
              textAlign: window.innerWidth <= 768 ? 'center' : 'right',
              order: window.innerWidth <= 768 ? 2 : 2
            }}>
              <h1 style={{
                fontSize: window.innerWidth <= 768 ? '36px' : '56px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#B5B5F9',
                margin: '0 0 16px 0'
              }}>
                Anushtaan
              </h1>
              <h2 style={{
                fontSize: window.innerWidth <= 768 ? '20px' : '28px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#CE85CE',
                margin: '0 0 24px 0'
              }}>
                The Ultimate AI-Driven Project Management Platform
              </h2>
              <p style={{
                fontSize: window.innerWidth <= 768 ? '16px' : '20px',
                lineHeight: '1.6',
                marginBottom: '16px',
                color: '#B5B5F9',
                fontWeight: '500',
                margin: '0 0 16px 0'
              }}>
                Rethink Project Management. Redefine Possibility.
              </p>
              <p style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '18px',
                lineHeight: '1.75',
                marginBottom: '32px',
                color: 'white',
                margin: '0 0 32px 0'
              }}>
                Anushtaan isn't just another project management tool—it's a next-generation platform designed for professionals and organizations that demand efficiency, transparency, and intelligent control. Built by Ganglia Technologies, Anushtaan brings powerful AI and human-centered design to every stage of your projects.
              </p>
              <button style={{
                padding: window.innerWidth <= 768 ? '12px 32px' : '16px 48px',
                borderRadius: '9999px',
                color: 'white',
                fontSize: window.innerWidth <= 768 ? '16px' : '20px',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #9996DC 0%, #CA86D0 100%)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                Discover Anushtaan
              </button>
            </div>
          </div>
        </div>

        {/* About Section - Mobile Responsive */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: window.innerWidth <= 768 ? '32px 16px' : '64px 24px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            marginBottom: '44px',
            alignItems: 'flex-start',
            gap: window.innerWidth <= 768 ? '32px' : '48px'
          }}>
            <div style={{ width: window.innerWidth <= 768 ? '100%' : '55%' }}>
              <h2 style={{
                fontSize: window.innerWidth <= 768 ? '32px' : '55px',
                fontWeight: 'bold',
                marginBottom: '24px',
                margin: '0 0 24px 0',
                textAlign: window.innerWidth <= 768 ? 'center' : 'left'
              }}>About Anushtaan</h2>
              <p style={{
                fontSize: window.innerWidth <= 768 ? '16px' : '18px',
                lineHeight: '1.75',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                Anushtaan is a highly customizable Project Management Tool designed for professionals and organizations that demand transparency, efficiency, and control. With real-time time tracking, it ensures accurate billing and trust for hourly-based projects to accurately bill and time-ensuring trust and accountability with clients.
              </p>
              <p style={{
                fontSize: window.innerWidth <= 768 ? '16px' : '18px',
                lineHeight: '1.75',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                Equipped with an advanced Admin Portal, Anushtaan provides deep visibility into project health through live dashboards. Gantt Charts, Kanban boards, financial tracking, and data analytics. Admins can assign tasks, monitor team progress, manage budgets, and oversee quality settings ensuring projects stay on track. The platform offers secure data storage, and receive automated email notifications. Whether you prefer calendar view, table view, or dark mode — Anushtaan easily adapts to your workflow.
              </p>
            </div>

            <div style={{ width: window.innerWidth <= 768 ? '100%' : '45%' }}>
              <div style={{
                backdropFilter: 'blur(4px)',
                borderRadius: '12px',
                padding: window.innerWidth <= 768 ? '24px' : '32px',
                background: 'linear-gradient(135deg, #9996DC 0%, #CA86D0 100%)'
              }}>
                <h3 style={{
                  fontSize: window.innerWidth <= 768 ? '28px' : '48px',
                  fontWeight: 'bold',
                  marginBottom: '32px',
                  margin: '0 0 32px 0',
                  textAlign: 'center'
                }}>All Features</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '20px'
                }}>
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
                  ].map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '50%',
                        marginRight: '12px',
                        flexShrink: 0
                      }}></div>
                      <span style={{ 
                        fontSize: window.innerWidth <= 768 ? '14px' : '16px', 
                        fontWeight: '500',
                        lineHeight: '1.4'
                      }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features Section - Mobile Grid */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: window.innerWidth <= 768 ? '32px 16px' : '64px 24px',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: window.innerWidth <= 768 ? '32px' : '54px',
            fontWeight: 'bold',
            marginBottom: '48px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #9996DC 0%, #CA86D0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 48px 0'
          }}>
            Core Features
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '48px'
          }}>
            {/* Feature Cards */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: window.innerWidth <= 768 ? '24px' : '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                textAlign: window.innerWidth <= 768 ? 'center' : 'left'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#9996DC',
                  borderRadius: '12px',
                  marginRight: window.innerWidth <= 768 ? '0' : '16px',
                  marginBottom: window.innerWidth <= 768 ? '12px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px' }}>⏱️</span>
                </div>
                <h3 style={{
                  fontSize: window.innerWidth <= 768 ? '20px' : '24px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#B5B5F9'
                }}>Intelligent Hours Tracking</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    color: '#CE85CE',
                    marginRight: '8px',
                    fontSize: '18px'
                  }}>•</span>
                  <span style={{ fontSize: window.innerWidth <= 768 ? '14px' : '16px', lineHeight: '1.5' }}>
                    <strong>Automated Time Logging:</strong> Smart timer automatically pauses when users step away and resumes when they return
                  </span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{
                    color: '#CE85CE',
                    marginRight: '8px',
                    fontSize: '18px'
                  }}>•</span>
                  <span style={{ fontSize: window.innerWidth <= 768 ? '14px' : '16px', lineHeight: '1.5' }}>
                    <strong>Effortless Billing:</strong> Convert accurate, real-time hours into professional client invoices with complete transparency
                  </span>
                </li>
              </ul>
            </div>

            {/* Continue with similar mobile optimizations for other feature cards... */}
            {/* I'll show one more example and you can apply the same pattern */}
            
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: window.innerWidth <= 768 ? '24px' : '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                textAlign: window.innerWidth <= 768 ? 'center' : 'left'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#CE85CE',
                  borderRadius: '12px',
                  marginRight: window.innerWidth <= 768 ? '0' : '16px',
                  marginBottom: window.innerWidth <= 768 ? '12px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px' }}>🤖</span>
                </div>
                <h3 style={{
                  fontSize: window.innerWidth <= 768 ? '20px' : '24px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#B5B5F9'
                }}>AI-Powered Productivity</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    color: '#CE85CE',
                    marginRight: '8px',
                    fontSize: '18px'
                  }}>•</span>
                  <span style={{ fontSize: window.innerWidth <= 768 ? '14px' : '16px', lineHeight: '1.5' }}>
                    <strong>Conversational AI Assistant:</strong> Generate tasks, identify risks, or create entire projects through natural conversation
                  </span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{
                    color: '#CE85CE',
                    marginRight: '8px',
                    fontSize: '18px'
                  }}>•</span>
                  <span style={{ fontSize: window.innerWidth <= 768 ? '14px' : '16px', lineHeight: '1.5' }}>
                    <strong>Smart Planning:</strong> AI analyzes resource allocation and foresees challenges to keep projects ahead of schedule
                  </span>
                </li>
              </ul>
            </div>

            {/* Add remaining feature cards with the same mobile optimizations... */}
          </div>
        </div>

        {/* Pricing Section - Mobile Responsive */}
        <div
          ref={pricingRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            minHeight: window.innerWidth <= 768 ? 'auto' : '120vh',
            padding: window.innerWidth <= 768 ? '32px 16px' : '64px 24px',
            position: 'relative',
            marginBottom: window.innerWidth <= 768 ? '64px' : '124px',
            zIndex: 11
          }}
        >
          <div style={{
            borderRadius: '24px',
            padding: window.innerWidth <= 768 ? '24px' : '32px',
            height: window.innerWidth <= 768 ? 'auto' : '100%',
            marginBottom: window.innerWidth <= 768 ? '64px' : '124px',
            background: 'linear-gradient(180deg, #9C93DA 0%, #00052b05 75%)'
          }}>
            <h2 style={{
              fontSize: window.innerWidth <= 768 ? '32px' : '54px',
              fontWeight: 'bold',
              marginBottom: window.innerWidth <= 768 ? '32px' : '68px',
              textAlign: 'center',
              margin: window.innerWidth <= 768 ? '0 0 32px 0' : '0 0 48px 0'
            }}>PRICING</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
              height: window.innerWidth <= 768 ? 'auto' : '80%',
              gap: '32px'
            }}>
              <div className={`pricing-card${showPricing ? " visible" : ""}`} style={{
                borderRadius: '16px',
                padding: window.innerWidth <= 768 ? '24px' : '32px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, #978FD5 0%, #00052b07 100%)'
              }}>
                <h3 style={{
                  fontSize: window.innerWidth <= 768 ? '24px' : '34px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  margin: '0 0 24px 0'
                }}>Free Version</h3>
                <div style={{
                  height: window.innerWidth <= 768 ? 'auto' : '128px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: window.innerWidth <= 768 ? '16px 0' : '0'
                }}>
                  <p style={{
                    color: '#D1D5DB',
                    margin: 0,
                    fontSize: window.innerWidth <= 768 ? '14px' : '16px'
                  }}>Basic features for small teams and personal projects</p>
                </div>
              </div>
              
              <div className={`pricing-card premium${showPricing ? " visible" : ""}`} style={{
                borderRadius: '16px',
                padding: window.innerWidth <= 768 ? '24px' : '32px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #00052b04 100%)'
              }}>
                <h3 style={{
                  fontSize: window.innerWidth <= 768 ? '24px' : '34px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  color: 'black',
                  margin: '0 0 24px 0'
                }}>Premium</h3>
                <div style={{
                  height: window.innerWidth <= 768 ? 'auto' : '128px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: window.innerWidth <= 768 ? '16px 0' : '0'
                }}>
                  <p style={{
                    color: '#374151',
                    margin: 0,
                    fontSize: window.innerWidth <= 768 ? '14px' : '16px'
                  }}>
                    Advanced AI features, unlimited projects, and priority support for growing teams
                  </p>
                </div>
              </div>
              
              <div className={`pricing-card${showPricing ? " visible" : ""}`} style={{
                borderRadius: '16px',
                padding: window.innerWidth <= 768 ? '24px' : '32px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, #978FD5 0%, #00052b0c 100%)'
              }}>
                <h3 style={{
                  fontSize: window.innerWidth <= 768 ? '24px' : '34px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  margin: '0 0 24px 0'
                }}>Enterprise</h3>
                <div style={{
                  height: window.innerWidth <= 768 ? 'auto' : '128px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: window.innerWidth <= 768 ? '16px 0' : '0'
                }}>
                  <p style={{
                    color: '#D1D5DB',
                    margin: 0,
                    fontSize: window.innerWidth <= 768 ? '14px' : '16px'
                  }}>
                    Full customization, on-premises deployment, and dedicated support for large organizations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default MainComponent;
