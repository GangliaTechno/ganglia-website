import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import mile1Animation from '../assets/mile1.json';
import mile2Animation from '../assets/mile2.json';
import mile3Animation from '../assets/mile3.json';
import mile4Animation from '../assets/mile4.json';
import mile5Animation from '../assets/mile5.json';
import mile6Animation from '../assets/mile6.json';
import mile7Animation from '../assets/mile7.json';
import mile8Animation from '../assets/mile8.json';
import '../styles/OurStory.css';

// Memoized milestone card component
const MilestoneCard = React.memo(({ 
  milestone, 
  index, 
  isVisible, 
  isHovered, 
  magneticEffect,
  onMouseEnter,
  onMouseLeave 
}) => {
  const cardStyle = useMemo(() => ({
    '--delay': `${index * 0.15}s`,
    transform: `translate(${magneticEffect.x}px, ${magneticEffect.y}px) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
  }), [index, magneticEffect, isHovered]);

  const cardClassName = useMemo(() => {
    return `tech-milestone-card ${milestone.side} ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`;
  }, [milestone.side, isVisible, isHovered]);

  return (
    <div
      data-card-id={milestone.id}
      className={cardClassName}
      style={cardStyle}
      onMouseEnter={() => onMouseEnter(milestone.id)}
      onMouseLeave={() => onMouseLeave(null)}
    >
      {/* Glass morphism card */}
      <div className="card-glass">
        {/* Holographic border effect */}
        <div className="holo-border"></div>
        
        {/* Card content */}
        <div className="card-header">
          <div className="milestone-icon">
            <Player
              autoplay
              loop
              src={milestone.icon}
              style={{ height: '24px', width: '24px' }}
            />
          </div>
          <div className="milestone-date">{milestone.date}</div>
        </div>
        
        <h4 className="milestone-title">{milestone.title}</h4>
        <p className="milestone-description">{milestone.description}</p>
        
        {/* Tech grid overlay */}
        <div className="tech-grid"></div>
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
});

// Memoized circuit node component
const CircuitNode = React.memo(({ node }) => (
  <div
    className="circuit-node"
    style={{
      left: `${node.x}%`,
      top: `${node.y}%`,
      width: `${node.size}px`,
      height: `${node.size}px`,
      animationDelay: `${node.pulseDelay}s`,
    }}
  />
));

const TechMilestonesTimeline = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const mouseMoveTimeoutRef = useRef(null);

  // Memoize milestone data
  const milestones = useMemo(() => [
    {
      id: 1,
      date: "June 2023",
      title: "Singapore-India-Hackathon-2023",
      description: "Selected as one of the 12 Start-ups in India for the prestigious Singapore-India-Hackathon-2023",
      icon: mile1Animation,
      side: "left"
    },
    {
      id: 2,
      date: "August 2023",
      title: "Company Foundation",
      description: "Ganglia Incorporated and incubated",
      icon: mile2Animation,
      side: "right"
    },
    {
      id: 3,
      date: "August 2023",
      title: "Government Recognition",
      description: "Received Government of Karnataka's Seed Fund Grant",
      icon: mile3Animation,
      side: "left"
    },
    {
      id: 4,
      date: "August 2023",
      title: "Prototype Development",
      description: "Near Final Mechanical prototype 3D print ready in August 2023",
      icon: mile4Animation,
      side: "right"
    },
    {
      id: 5,
      date: "October 2023",
      title: "Startup Awards",
      description: "Secured the Great Indian Entrepreneurship, Business Design, Startup award",
      icon: mile5Animation,
      side: "left"
    },
    {
      id: 6,
      date: "June 2024",
      title: "Patent Portfolio",
      description: "Ganglia Technologies secured 14 Patents",
      icon: mile6Animation,
      side: "right"
    },
    {
      id: 7,
      date: "July 2024",
      title: "Additional Patents",
      description: "Ganglia Technologies secured 2 more Patents, Totalling 16",
      icon: mile7Animation,
      side: "left"
    },
    {
      id: 8,
      date: "July 2024",
      title: "Excellence Recognition",
      description: "Certificate of Excellence in product design at the 3rd Elets Startup Awards",
      icon: mile8Animation,
      side: "right"
    }
  ], []);

  // Memoize circuit nodes
  const circuitNodes = useMemo(() => {
    return [...Array(35)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      pulseDelay: Math.random() * 3,
    }));
  }, []);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (mouseMoveTimeoutRef.current) {
      clearTimeout(mouseMoveTimeoutRef.current);
    }

    mouseMoveTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }, 8); // ~120fps throttling for smooth movement
  }, []);

  // Optimized magnetic effect calculation
  const calculateMagneticEffect = useCallback((cardElement, mouseX, mouseY) => {
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
  }, []);

  // Optimized intersection observer setup
  const setupIntersectionObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newVisibleCards = new Set(visibleCards);
        let hasChanges = false;

        entries.forEach((entry) => {
          const cardId = parseInt(entry.target.dataset.cardId);
          if (entry.isIntersecting && !newVisibleCards.has(cardId)) {
            newVisibleCards.add(cardId);
            hasChanges = true;
          }
        });

        if (hasChanges) {
          setVisibleCards(newVisibleCards);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    // Observe cards after a short delay to ensure they're mounted
    setTimeout(() => {
      const cards = document.querySelectorAll('.tech-milestone-card');
      cards.forEach((card) => {
        if (observerRef.current) {
          observerRef.current.observe(card);
        }
      });
    }, 100);
  }, [visibleCards]);

  // Setup intersection observer
  useEffect(() => {
    setupIntersectionObserver();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setupIntersectionObserver]);

  // Cleanup mouse move timeout
  useEffect(() => {
    return () => {
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, []);

  // Memoized hover handlers
  const handleMouseEnter = useCallback((cardId) => {
    setHoveredCard(cardId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

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
            <CircuitNode key={node.id} node={node} />
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
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                index={index}
                isVisible={isVisible}
                isHovered={isHovered}
                magneticEffect={magneticEffect}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
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