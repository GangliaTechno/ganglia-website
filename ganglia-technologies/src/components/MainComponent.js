"use client";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer"; // <-- Import the Footer component

function MainComponent() {
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
  `;

  // Animation for pricing cards
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
            /* Add scale to the transition */
            /* Initial state */
            transform: translateY(80px) scale(1.15);
          }
          .pricing-card.premium.visible {
            /* Final state */
            transform: translateY(0) scale(1.15);
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
          {/* Large bubble top left */}
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            opacity: 0.75,
            background: 'radial-gradient(circle, #9696DC 0%, #CE85CE 70%, transparent 100%)',
            filter: 'blur(80px)',
            top: '-100px',
            left: '-80px',
            animation: 'floatMove1 8s ease-in-out infinite'
          }}></div>

          {/* Medium bubble top right */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            opacity: 0.75,
            background: 'radial-gradient(circle, #CE85CE 0%, #9696DC 60%, transparent 100%)',
            filter: 'blur(60px)',
            top: '-100px',
            right: '-150px',
            animation: 'floatMove2 10s ease-in-out infinite'
          }}></div>

          {/* Large bubble bottom right */}
          <div style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            opacity: 0.0,
            background: 'radial-gradient(circle, #9696DC 0%, #CE85CE 50%, transparent 100%)',
            filter: 'blur(100px)',
            bottom: '-300px',
            right: '-250px',
            animation: 'floatMove3 12s ease-in-out infinite'
          }}></div>

          {/* Medium bubble bottom left */}
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            opacity: 0.0,
            background: 'radial-gradient(circle, #CE85CE 0%, #9696DC 65%, transparent 100%)',
            filter: 'blur(70px)',
            bottom: '-150px',
            left: '-200px',
            animation: 'floatMove4 9s ease-in-out infinite'
          }}></div>

          {/* Additional smaller bubbles for depth */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
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
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            opacity: 0.35,
            background: 'radial-gradient(circle, #CE85CE 0%, #9696DC 75%, transparent 100%)',
            filter: 'blur(60px)',
            top: '70%',
            left: '10%',
            animation: 'floatMove6 11s ease-in-out infinite reverse'
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
            {/* Left Side - Heading and Content */}
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
                color: '#B5B5F9',
                margin: '0 0 16px 0'
              }}>
                Anushtaan
              </h1>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#CE85CE',
                margin: '0 0 24px 0'
              }}>
                The Ultimate AI-Driven Project Management Platform
              </h2>
              <p style={{
                fontSize: '20px',
                lineHeight: '1.6',
                marginBottom: '16px',
                color: '#B5B5F9',
                fontWeight: '500',
                margin: '0 0 16px 0'
              }}>
                Rethink Project Management. Redefine Possibility.
              </p>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.75',
                marginBottom: '32px',
                color: 'white',
                margin: '0 0 32px 0'
              }}>
                Anushtaan isn't just another project management tool—it's a next-generation platform designed for professionals and organizations that demand efficiency, transparency, and intelligent control. Built by Ganglia Technologies, Anushtaan brings powerful AI and human-centered design to every stage of your projects.
              </p>
              <button style={{
                padding: '16px 48px',
                borderRadius: '9999px',
                color: 'white',
                fontSize: '20px',
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
            {/* Right Side - Logo */}
            <div style={{
              width: '40%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              order: 1 
            }}>
              {/* <img
                src={require('../assets/image-removebg-preview (1).png')}
                alt="Anushtaan Logo"
                style={{
                  width: '520px',
                  height: 'auto',
                 
                }}
              /> */}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 24px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '44px',
            alignItems: 'flex-start',
            gap: '48px'
          }}>
            <div style={{ width: '55%' }}>
              <h2 style={{
                fontSize: '55px',
                fontWeight: 'bold',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>About Anushtaan</h2>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.75',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                Anushtaan is a highly customizable Project Management Tool designed for professionals and organizations that demand transparency, efficiency, and control. With real-time time tracking, it ensures accurate billing and trust for hourly-based projects to accurately bill and time-ensuring trust and accountability with clients.
              </p>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.75',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                Equipped with an advanced Admin Portal, Anushtaan provides deep visibility into project health through live dashboards. Gantt Charts, Kanban boards, financial tracking, and data analytics. Admins can assign tasks, monitor team progress, manage budgets, and oversee quality settings ensuring projects stay on track. The platform offers secure data storage, and receive automated email notifications. Whether you prefer calendar view, table view, or dark mode — Anushtaan easily adapts to your workflow.
              </p>
            </div>

            <div style={{ width: '45%' }}>
              <div style={{
                backdropFilter: 'blur(4px)',
                borderRadius: '12%',
                padding: '32px',
                background: 'linear-gradient(135deg, #9996DC 0%, #CA86D0 100%)'
              }}>
                <h3 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  marginBottom: '32px',
                  margin: '0 0 32px 0'
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
                        fontSize: '16px', 
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

        {/* Core Features Section */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '48px'
          }}>
            {/* Intelligent Project Hours Tracking */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#9996DC',
                  borderRadius: '12px',
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px' }}>⏱️</span>
                </div>
                <h3 style={{
                  fontSize: '24px',
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Effortless Billing:</strong> Convert accurate, real-time hours into professional client invoices with complete transparency
                  </span>
                </li>
              </ul>
            </div>

            {/* AI-Powered Productivity */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#CE85CE',
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Smart Planning:</strong> AI analyzes resource allocation and foresees challenges to keep projects ahead of schedule
                  </span>
                </li>
              </ul>
            </div>

            {/* Dynamic Dashboards */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#9996DC',
                  borderRadius: '12px',
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px' }}>📊</span>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#B5B5F9'
                }}>Dynamic Dashboards</h3>
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>30+ KPIs Visualized:</strong> Comprehensive dashboards track budgets, workloads, progress, and milestones at a glance
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Real-Time Presence:</strong> Instantly see which team members are online and actively working
                  </span>
                </li>
              </ul>
            </div>

            {/* Seamless Communication */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#CE85CE',
                  borderRadius: '12px',
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px' }}>💬</span>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#B5B5F9'
                }}>Communication & Collaboration</h3>
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Integrated Comments:</strong> Tag teammates, discuss progress on tasks, and keep conversations in context
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Instant Notifications:</strong> Stay updated with real-time email alerts for every update and milestone
                  </span>
                </li>
              </ul>
            </div>

            {/* Customizable Views */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#9996DC',
                  borderRadius: '12px',
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px' }}>📋</span>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#B5B5F9'
                }}>Customizable Views</h3>
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>KANBAN Board:</strong> Drag-and-drop interface fully customizable to fit your team's process
                  </span>
                </li>
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Gantt Chart:</strong> Advanced PERT/CPM logic with critical path highlighting
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Multiple UI Modes:</strong> Dark, Light & System modes for any environment
                  </span>
                </li>
              </ul>
            </div>

            {/* Security & Enterprise */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#CE85CE',
                  borderRadius: '12px',
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px' }}>🔒</span>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#B5B5F9'
                }}>Security You Can Trust</h3>
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Enterprise-Grade Security:</strong> AWS highly secure cloud infrastructure for data protection and scalability
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
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Data Sovereignty:</strong> Enterprise customers get on-premises or dedicated server storage options
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Glimpse Section */}
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
            background: 'linear-gradient(135deg, #9996DC 0%, #CA86D0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 48px 0'
          }}>
            Glimpse of Anushtaan
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                height: '192px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#C084FC',
                    borderRadius: '8px',
                    margin: '0 auto 8px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '28px' }}>📋</span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    margin: 0
                  }}>Drag & Drop Interface</p>
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                textAlign: 'center',
                margin: 0
              }}>
                KANBAN Board
              </h3>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                height: '192px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#C084FC',
                    borderRadius: '8px',
                    margin: '0 auto 8px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '28px' }}>📊</span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    margin: 0
                  }}>30+ KPIs Dashboard</p>
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                textAlign: 'center',
                margin: 0
              }}>
                Project Analytics
              </h3>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                height: '192px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#C084FC',
                    borderRadius: '8px',
                    margin: '0 auto 8px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '28px' }}>📈</span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    margin: 0
                  }}>PERT/CPM Timeline</p>
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                textAlign: 'center',
                margin: 0
              }}>GANTT Chart</h3>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                height: '192px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#C084FC',
                    borderRadius: '8px',
                    margin: '0 auto 8px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '28px' }}>⚙️</span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    margin: 0
                  }}>Company-Wide Insights</p>
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                textAlign: 'center',
                margin: 0
              }}>Admin Portal</h3>
            </div>
          </div>
        </div>

        {/* Why Anushtaan Section */}
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
            background: 'linear-gradient(135deg, #9996DC 0%, #CA86D0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 48px 0'
          }}>
            Why Choose Anushtaan?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#9996DC',
                borderRadius: '50%',
                margin: '0 auto 24px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '28px' }}>🤖</span>
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#B5B5F9',
                margin: '0 0 16px 0'
              }}>AI-Integrated Management</h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0
              }}>
                From planning to risk assessment, let AI supercharge every aspect of your project workflow.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#CE85CE',
                borderRadius: '50%',
                margin: '0 auto 24px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '28px' }}>🎯</span>
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#B5B5F9',
                margin: '0 0 16px 0'
              }}>Precision & Accountability</h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0
              }}>
                Live tracking, scoring, and comprehensive dashboards ensure every hour, task, and decision counts.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#9996DC',
                borderRadius: '50%',
                margin: '0 auto 24px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '28px' }}>👤</span>
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#B5B5F9',
                margin: '0 0 16px 0'
              }}>User-Centric Flexibility</h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0
              }}>
                Manage work and personal projects side-by-side, adapting the platform to your life and career.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#CE85CE',
                borderRadius: '50%',
                margin: '0 auto 24px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '28px' }}>🔒</span>
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#B5B5F9',
                margin: '0 0 16px 0'
              }}>Flexible, Scalable, Secure</h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0
              }}>
                Whether you're a freelancer, agency, or enterprise, Anushtaan adapts to empower teams of all sizes.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            textAlign: 'center',
            marginTop: '64px',
            padding: '48px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(4px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#B5B5F9',
              margin: '0 0 16px 0'
            }}>Ready to Transform Your Project Management?</h3>
            <p style={{
              fontSize: '18px',
              marginBottom: '32px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0 0 32px 0'
            }}>
              Cut through the noise of project management—choose the power of AI, transparency, and enterprise security.
            </p>
            <button style={{
              padding: '16px 48px',
              borderRadius: '9999px',
              color: 'white',
              fontSize: '20px',
              fontWeight: '500',
              background: 'linear-gradient(135deg, #9996DC 0%, #CA86D0 100%)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}>
              Choose Anushtaan
            </button>
          </div>
        </div>

        {/* Pricing Section */}
        <div
          ref={pricingRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            height: '120vh',
            padding: '64px 24px',
            position: 'relative',
            marginBottom: '124px',
            zIndex: 11
          }}
        >
          <div style={{
            borderRadius: '24px',
            padding: '32px',
            height: '100%',
            marginBottom: '124px',
            background: 'linear-gradient(180deg, #9C93DA 0%, #00052b05 75%)'
          }}>
            <h2 style={{
              fontSize: '54px',
              fontWeight: 'bold',
              marginBottom: '68px',
              textAlign: 'center',
              margin: '0 0 48px 0'
            }}>PRICING</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              height: '80%',
              gap: '32px'
            }}>
              <div className={`pricing-card${showPricing ? " visible" : ""}`} style={{
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, #978FD5 0%, #00052b07 100%)'
              }}>
                <h3 style={{
                  fontSize: '34px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  margin: '0 0 24px 0'
                }}>Free Version</h3>
                <div style={{
                  height: '128px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <p style={{
                    color: '#D1D5DB',
                    margin: 0
                  }}>Basic features for small teams and personal projects</p>
                </div>
              </div>
              <div className={`pricing-card premium${showPricing ? " visible" : ""}`} style={{
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #00052b04 100%)'
              }}>
                <h3 style={{
                  fontSize: '34px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  color: 'black',
                  margin: '0 0 24px 0'
                }}>Premium</h3>
                <div style={{
                  height: '128px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <p style={{
                    color: '#374151',
                    margin: 0
                  }}>
                    Advanced AI features, unlimited projects, and priority support for growing teams
                  </p>
                </div>
              </div>
              <div className={`pricing-card${showPricing ? " visible" : ""}`} style={{
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, #978FD5 0%, #00052b0c 100%)'
              }}>
                <h3 style={{
                  fontSize: '34px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  margin: '0 0 24px 0'
                }}>Enterprise</h3>
                <div style={{
                  height: '128px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <p style={{
                    color: '#D1D5DB',
                    margin: 0
                  }}>
                    Full customization, on-premises deployment, and dedicated support for large organizations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
export default MainComponent;
