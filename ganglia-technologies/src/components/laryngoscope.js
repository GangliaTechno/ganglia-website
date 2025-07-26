import React, { useState, useEffect } from 'react';
import '../styles/laryngoscope.css';

const Laryngoscope = () => {
  const [activePrototype, setActivePrototype] = useState('prototype1');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const specifications = [
    { feature: 'Camera Resolution', prototype1: '4K Ultra HD', prototype2: '8K Professional' },
    { feature: 'Battery Life', prototype1: '8 hours', prototype2: '12 hours' },
    { feature: 'Weight', prototype1: '450g', prototype2: '380g' },
    { feature: 'Connectivity', prototype1: 'Wired', prototype2: 'Wireless + Wired' },
    { feature: 'Operating Temp', prototype1: '5°C to 40°C', prototype2: '0°C to 50°C' },
    { feature: 'Sterilization', prototype1: 'Standard', prototype2: 'Waterproof + Enhanced' }
  ];

  return (
    <div className="laryngoscope-universe">
      {/* Hero Section */}
      <section className="quantum-hero-arena">
        <div className="cosmic-particle-field">
          <div className="stellar-dust-animation"></div>
          <div className="nebula-glow-effects"></div>
        </div>
        <div className="infinity-container">
          <div className="hero-content-matrix">
            <h1 className="galactic-title-showcase">
              <span className="brand-hologram">Ganglia</span>
              <span className="product-dimension">Smart Video-Laryngoscope</span>
            </h1>
            <p className="revolutionary-tagline">
              Revolutionizing Airway Management. <span className="golden-accent">For Everyone.</span>
            </p>
            <div className="mission-statement-capsule">
              <p>At Ganglia Technologies, we've reimagined the laryngoscope from the ground up—merging world-class engineering, cutting-edge AI, and effortless usability to deliver the next generation of intubation.</p>
            </div>
            <div className="action-command-center">
              <button className="plasma-cta-primary">Request Demo</button>
              <button className="crystal-cta-secondary">Learn More</button>
            </div>
          </div>
          <div className="holographic-showcase-zone">
            <div className="device-levitation-chamber">
              <div className="aurora-energy-ring"></div>
              <div className="quantum-device-replica"></div>
              <div className="electromagnetic-pulses"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section
        id="value-quantum"
        className={`price-revolution-theater ${isVisible['value-quantum'] ? 'materialize' : ''}`}
        data-reveal
      >
        <div className="infinity-container">
          <div className="value-orchestration">
            <h2 className="disruption-headline">Why Settle? Experience Innovation.</h2>
            <div className="price-battle-arena">
              <div className="legacy-price-monument traditional">
                <h3>Traditional Systems</h3>
                <div className="price-crystal">₹7+ Lakhs</div>
                <p>Limited accessibility</p>
              </div>
              <div className="versus-lightning-bolt">VS</div>
              <div className="future-price-beacon ganglia">
                <h3>Ganglia Smart</h3>
                <div className="price-crystal">₹1.5-2 Lakhs</div>
                <p>Revolutionary accessibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prototypes Section */}
      <section
        id="prototype-cosmos"
        className={`innovation-laboratory ${isVisible['prototype-cosmos'] ? 'materialize' : ''}`}
        data-reveal
      >
        <div className="infinity-container">
          <h2 className="engineering-manifesto">Designed to Care. Engineered to Lead.</h2>
         
          <div className="prototype-dimension-selector">
            <button
              className={`evolution-tab ${activePrototype === 'prototype1' ? 'activated' : ''}`}
              onClick={() => setActivePrototype('prototype1')}
            >
              Prototype I: The Breakthrough
            </button>
            <button
              className={`evolution-tab ${activePrototype === 'prototype2' ? 'activated' : ''}`}
              onClick={() => setActivePrototype('prototype2')}
            >
              Prototype II: The Evolution
            </button>
          </div>

          <div className="prototype-universe-container">
            {activePrototype === 'prototype1' && (
              <div className="feature-constellation morphIn">
                <div className="innovation-galaxy-grid">
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">🕹️</div>
                    <h3>Joy-stick Controlled Tongue-tip</h3>
                    <p>Effortlessly pulls the Epiglottis—precisely, gently, minimizing trauma and boosting patient comfort.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">📹</div>
                    <h3>Dual Camera System</h3>
                    <p>Switch between focused and wide-angle views for extraordinary anatomical clarity.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">🫁</div>
                    <h3>In-built Oxygen Supply Port</h3>
                    <p>Seamless, constant oxygenation ensures patient safety throughout the procedure.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">🔗</div>
                    <h3>Wired Setup</h3>
                    <p>LIVE video feeds directly to monitors, computers, or mobile devices for instant, high-definition visibility anywhere.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">🤖</div>
                    <h3>AI-Powered Software</h3>
                    <p>Industry-first: AI highlights anatomy, trauma, and ulcers in real-time—accelerating critical interventions.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">✋</div>
                    <h3>Ergonomic Design</h3>
                    <p>Built to fit naturally in any hand, reducing fatigue and maximizing control.</p>
                  </div>
                </div>
              </div>
            )}

            {activePrototype === 'prototype2' && (
              <div className="feature-constellation morphIn">
                <div className="innovation-galaxy-grid">
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">📡</div>
                    <h3>Wireless Setup</h3>
                    <p>Freedom to connect—untethered streaming to any device. Ready for the next-generation mobile hospital.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">📸</div>
                    <h3>Improved Dual Camera</h3>
                    <p>Even greater image fidelity through advanced sensors and image processing for diagnostic confidence.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">💧</div>
                    <h3>Water-proof Casing</h3>
                    <p>Built to last. Easy sterilization and infection control for every shift.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">⚙️</div>
                    <h3>Improved Mechanical Design</h3>
                    <p>Enhanced efficiency: greater thrust with dramatically less power, ensuring all-day operation.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">⬇️</div>
                    <h3>Lighter, Stronger</h3>
                    <p>Precision alloys reduce weight—more comfort, less strain, superior performance.</p>
                  </div>
                  <div className="stellar-feature-pod">
                    <div className="cosmic-icon">🎯</div>
                    <h3>Refined Ergonomics</h3>
                    <p>Every angle, every curve designed to elevate clinical confidence.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section
        id="ai-nexus"
        className={`intelligence-command-center ${isVisible['ai-nexus'] ? 'materialize' : ''}`}
        data-reveal
      >
        <div className="infinity-container">
          <h2 className="neural-supremacy-title">The Power of Intelligence. At Your Fingertips.</h2>
          <div className="ai-fusion-theater">
            <div className="consciousness-visualization">
              <div className="quantum-brain-matrix">
                <div className="synaptic-network-core"></div>
                <div className="neural-pathway-streams"></div>
              </div>
            </div>
            <div className="intelligence-manifesto">
              <h3>AI-Powered Software—An Industry First</h3>
              <ul className="consciousness-feature-catalog">
                <li>
                  <span className="neural-emblem">🧠</span>
                  <div>
                    <strong>Artificial Intelligence-Driven</strong>
                    <p>Instantly detects anatomy, highlights trauma and ulcers, supplements the clinician's assessment with every scan.</p>
                  </div>
                </li>
                <li>
                  <span className="neural-emblem">👩‍⚕️</span>
                  <div>
                    <strong>Clinician-Centric Interface</strong>
                    <p>Built for doctors, paramedics, and nurses—simple, intuitive, and ready for urgent care.</p>
                  </div>
                </li>
                <li>
                  <span className="neural-emblem">🔍</span>
                  <div>
                    <strong>Advanced Image Processing</strong>
                    <p>Next-level trauma visualization using sophisticated algorithms and black-and-white filters for true diagnostic clarity.</p>
                  </div>
                </li>
                <li>
                  <span className="neural-emblem">🚀</span>
                  <div>
                    <strong>Smarter Imaging, Better Accuracy</strong>
                    <p>Every scan is enhanced for speed and precision—enabling faster, more confident decisions.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section
        id="technical-matrix"
        className={`excellence-blueprint ${isVisible['technical-matrix'] ? 'materialize' : ''}`}
        data-reveal
      >
        <div className="infinity-container">
          <h2 className="craftsmanship-declaration">Crafted for Real-World Excellence</h2>
          <div className="specifications-hologram">
            <table className="technical-excellence-grid">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Prototype I</th>
                  <th>Prototype II</th>
                </tr>
              </thead>
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={index} className="spec-revelation" style={{animationDelay: `${index * 0.15}s`}}>
                    <td className="feature-identifier">{spec.feature}</td>
                    <td className="gen1-specs">{spec.prototype1}</td>
                    <td className="gen2-evolution">{spec.prototype2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="destiny-convergence-finale">
        <div className="infinity-container">
          <div className="transformation-proclamation">
            <h2 className="revolution-anthem">Airway Management—Transformed</h2>
            <p>The Ganglia Smart Video-Laryngoscope isn't just another device. It's a leap forward for clinicians. A lifeline for patients. A promise: that the best of technology should quietly, powerfully, and affordably <strong>save lives everywhere</strong>.</p>
            <div className="legacy-signature">
              <span>Innovation. Compassion. Delivered.</span>
            </div>
            <div className="final-action-nexus">
              <button className="plasma-cta-primary supersized">Get Started Today</button>
              <button className="crystal-cta-secondary supersized">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Laryngoscope;
