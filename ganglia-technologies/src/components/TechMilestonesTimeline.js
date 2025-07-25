import React, { useState, useEffect, useRef } from 'react';

const TechMilestonesTimeline = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [circuitNodes, setCircuitNodes] = useState([]);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Milestone data with tech-focused styling
  const milestones = [
    {
      id: 1,
      date: "June 2023",
      title: "Singapore-India-Hackathon-2023",
      description: "Selected as one of the 12 Start-ups in India for the prestigious Singapore-India-Hackathon-2023",
      icon: "🚀",
      side: "left"
    },
    {
      id: 2,
      date: "August 2023",
      title: "Company Foundation",
      description: "Ganglia Incorporated and incubated",
      icon: "🏢",
      side: "right"
    },
    {
      id: 3,
      date: "August 2023",
      title: "Government Recognition",
      description: "Received Government of Karnataka's Seed Fund Grant",
      icon: "🏆",
      side: "left"
    },
    {
      id: 4,
      date: "August 2023",
      title: "Prototype Development",
      description: "Near Final Mechanical prototype 3D print ready in August 2023",
      icon: "⚙️",
      side: "right"
    },
    {
      id: 5,
      date: "October 2023",
      title: "Startup Awards",
      description: "Secured the Great Indian Entrepreneurship, Business Design, Startup award",
      icon: "🥇",
      side: "left"
    },
    {
      id: 6,
      date: "June 2024",
      title: "Patent Portfolio",
      description: "Ganglia Technologies secured 14 Patents",
      icon: "📜",
      side: "right"
    },
    {
      id: 7,
      date: "July 2024",
      title: "Additional Patents",
      description: "Ganglia Technologies secured 2 more Patents, Totalling 16",
      icon: "📋",
      side: "left"
    },
    {
      id: 8,
      date: "July 2024",
      title: "Excellence Recognition",
      description: "Certificate of Excellence in product design at the 3rd Elets Startup Awards",
      icon: "🏅",
      side: "right"
    }
  ];

  // Generate circuit board nodes
  useEffect(() => {
    const nodes = [...Array(35)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      pulseDelay: Math.random() * 3,
    }));
    setCircuitNodes(nodes);
  }, []);

  // Set up intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = parseInt(entry.target.dataset.cardId);
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe cards after they mount
  useEffect(() => {
    const cards = document.querySelectorAll('.tech-milestone-card');
    cards.forEach((card) => {
      if (observerRef.current) {
        observerRef.current.observe(card);
      }
    });
  }, []);

  // Update mouse position for magnetic effect
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Calculate magnetic effect
  const calculateMagneticEffect = (cardElement, mouseX, mouseY) => {
    if (!cardElement || !containerRef.current) return { x: 0, y: 0 };
    
    const rect = cardElement.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardCenterX = rect.left - containerRect.left + rect.width / 2;
    const cardCenterY = rect.top - containerRect.top + rect.height / 2;
    
    const distanceX = mouseX - cardCenterX;
    const distanceY = mouseY - cardCenterY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    const maxDistance = 120;
    const magnetStrength = Math.max(0, maxDistance - distance) / maxDistance;
    
    return {
      x: distanceX * magnetStrength * 0.1,
      y: distanceY * magnetStrength * 0.1
    };
  };

  return (
    <div className="tech-milestones-wrapper">
      {/* Header */}
      <div className="tech-milestones-header">
        <h3 className="tech-milestones-title">Milestones</h3>
        <div className="tech-title-underline"></div>
      </div>

      {/* Timeline Container */}
      <div 
        ref={containerRef}
        className="tech-timeline-container"
        onMouseMove={handleMouseMove}
      >
        {/* Circuit board background */}
        <div className="circuit-background">
          {circuitNodes.map((node) => (
            <div
              key={node.id}
              className="circuit-node"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                animationDelay: `${node.pulseDelay}s`,
              }}
            />
          ))}
          
          {/* Circuit traces */}
          <div className="circuit-traces">
            <div className="trace trace-1"></div>
            <div className="trace trace-2"></div>
            <div className="trace trace-3"></div>
            <div className="trace trace-4"></div>
            <div className="trace trace-5"></div>
            <div className="trace trace-6"></div>
          </div>
        </div>

        {/* Central timeline spine */}
        <div className="timeline-spine">
          <div className="spine-glow"></div>
        </div>

        {/* Milestone cards */}
        <div className="tech-milestones-container">
          {milestones.map((milestone, index) => {
            const isVisible = visibleCards.has(milestone.id);
            const isHovered = hoveredCard === milestone.id;
            const magneticEffect = isHovered ? calculateMagneticEffect(
              document.querySelector(`[data-card-id="${milestone.id}"]`),
              mousePosition.x,
              mousePosition.y
            ) : { x: 0, y: 0 };
            
            return (
              <div
                key={milestone.id}
                data-card-id={milestone.id}
                className={`tech-milestone-card ${milestone.side} ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
                style={{
                  '--delay': `${index * 0.15}s`,
                  transform: `translate(${magneticEffect.x}px, ${magneticEffect.y}px) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
                }}
                onMouseEnter={() => setHoveredCard(milestone.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glass morphism card */}
                <div className="card-glass">
                  {/* Holographic border effect */}
                  <div className="holo-border"></div>
                  
                  {/* Card content */}
                  <div className="card-header">
                    <div className="milestone-icon">{milestone.icon}</div>
                    <div className="milestone-date">{milestone.date}</div>
                  </div>
                  
                  <h4 className="milestone-title">{milestone.title}</h4>
                  <p className="milestone-description">{milestone.description}</p>
                  
                  {/* Tech grid overlay */}
                  <div className="tech-grid"></div>
                  
                  {/* Status indicator */}
                  <div className="status-indicator">
                    <div className="status-dot"></div>
                    <span>COMPLETED</span>
                  </div>
                </div>

                {/* Connection to timeline */}
                <div className="timeline-connector">
                  <div className="connector-line"></div>
                  <div className="connector-node">
                    <div className="node-pulse"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data streams */}
        <div className="data-streams">
          <div className="stream stream-1"></div>
          <div className="stream stream-2"></div>
          <div className="stream stream-3"></div>
          <div className="stream stream-4"></div>
          <div className="stream stream-5"></div>
        </div>
      </div>
    </div>
  );
};

export default TechMilestonesTimeline;