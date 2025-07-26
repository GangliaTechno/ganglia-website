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
    flexDirection: 'row', // Change to row for side-by-side
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
      <h2 style={{
        fontSize: '56px',
        fontWeight: 'bold',
        marginBottom: '32px',
        color: '#B5B5F9',
        margin: '0 0 32px 0'
      }}>
        Anushtaan
      </h2>
      <p style={{
        fontSize: '18px',
        lineHeight: '1.75',
        marginBottom: '12px',
        color: 'white',
        margin: '0 0 32px 0'
      }}>
        Anushtaan is a highly customizable project management<br />
        tool built for professionals and teams seeking<br />
        transparency, efficiency, and control.
      </p>
      <p style={{
        fontSize: '18px',
        lineHeight: '1.75',
        marginBottom: '48px',
        color: 'white',
        margin: '0 0 48px 0'
      }}>
        With real-time time tracking, it ensures accurate billing<br />
        and trust for hourly-based freelance and team projects.
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
                Anushtaan is a highly customizable Project Management Tool
                designed for professionals and organizations that demand
                transparency, efficiency, and control. With real-time time
                tracking, it ensures accurate billing and trust for hourly-based
                projects to accurately bill and time-ensuring trust and
                accountability with clients.
              </p>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.75',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                Equipped with an advanced Admin Portal, Anushtaan provides deep
                visibility into project health through live dashboards. Gantt
                Charts, Kanban boards, financial tracking, and data analytics.
                Admins can assign tasks, monitor team progress, manage budgets,
                and oversee quality settings ensuring projects stay on track. The
                platform offers secure data storage, and receive automated email
                notifications. Whether you prefer calendar view, table view, or
                dark mode — Anushtaan easily adapts to your workflow.
              </p>
            </div>

            <div style={{ width: '45%' }}>
              <div style={{
                backdropFilter: 'blur(4px)',
                borderRadius: '12%',
                padding: '24px',
                background: 'linear-gradient(135deg, #9996DC 0%, #CA86D0 100%)'
              }}>
                <h3 style={{
                  fontSize: '55px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  margin: '0 0 24px 0'
                }}>Features</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#C084FC',
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}></div>
                    <span style={{ fontSize: '28px', fontWeight: '300' }}>Live Time & Budget Tracking</span>
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#C084FC',
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}></div>
                    <span style={{ fontSize: '28px', fontWeight: '500' }}>Data-driven Admin Dashboard</span>
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#C084FC',
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}></div>
                    <span style={{ fontSize: '28px', fontWeight: '500' }}>Multi-View Project Layouts</span>
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#C084FC',
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}></div>
                    <span style={{ fontSize: '28px', fontWeight: '500' }}>Seamless Collaboration Tools</span>
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#C084FC',
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}></div>
                    <span style={{ fontSize: '28px', fontWeight: '500' }}>Smart Notifications & UI Modes</span>
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#C084FC',
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}></div>
                    <span style={{ fontSize: '28px', fontWeight: '500' }}>Scalable & Customizable</span>
                  </li>
                </ul>
              </div>
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
                    margin: '0 auto 8px auto'
                  }}></div>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    margin: 0
                  }}>Task Progress Interface</p>
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                textAlign: 'center',
                margin: 0
              }}>
                Task Progress List
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
                    margin: '0 auto 8px auto'
                  }}></div>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    margin: 0
                  }}>Analytics Dashboard</p>
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                textAlign: 'center',
                margin: 0
              }}>
                Project Summary
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
                    margin: '0 auto 8px auto'
                  }}></div>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    margin: 0
                  }}>Timeline View</p>
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
                    margin: '0 auto 8px auto'
                  }}></div>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    margin: 0
                  }}>Management Interface</p>
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

        {/* Pricing Section */}
        <div
          ref={pricingRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            height: '120vh', // Increased height
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
                  }}>Basic features for small teams</p>
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
                    Advanced features for growing teams
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
                    Full customization for large organizations
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
