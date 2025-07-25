import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../assets/log.png';

const Footer = () => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const footerRef = useRef(null);
  const networkRef = useRef(null);
  const mountedRef = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reset mounted ref
    mountedRef.current = true;

    class NetworkMesh {
      constructor(canvas, overlay, footerElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.overlay = overlay;
        this.footerElement = footerElement;
        
        this.nodes = [];
        this.mouse = { x: 0, y: 0 };
        this.isMouseInside = false;
        this.animationFrame = null;
        
        // Enhanced network parameters for denser mesh
        this.nodeCount = 200; // Increased from 120
        this.maxDistance = 100; // Reduced from 120 for more connections
        this.mouseRadius = 180; // Increased interaction radius
        
        this.init();
      }
      
      init() {
        this.resizeCanvas();
        this.createNodes();
        this.bindEvents();
        this.animate();
        
        // Handle window resize
        this.resizeHandler = () => this.resizeCanvas();
        window.addEventListener('resize', this.resizeHandler);
      }
      
      resizeCanvas() {
        if (!this.canvas) return;
        
        const footer = this.canvas.closest('.footer');
        if (footer) {
          this.canvas.width = footer.offsetWidth;
          this.canvas.height = footer.offsetHeight;
        }
        
        // Recreate nodes when canvas is resized
        if (this.canvas.width > 0 && this.canvas.height > 0) {
          this.createNodes();
        }
      }
      
      createNodes() {
        this.nodes = [];
        if (!this.canvas || this.canvas.width === 0 || this.canvas.height === 0) return;
        
        for (let i = 0; i < this.nodeCount; i++) {
          this.nodes.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.3, // Slightly slower movement
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.8, // Slightly smaller nodes
            opacity: Math.random() * 0.4 + 0.3, // Adjusted opacity for better visibility over background image
            pulsePhase: Math.random() * Math.PI * 2
          });
        }
      }
      
      bindEvents() {
        if (!this.footerElement) return;
        
        // Bind events to the entire footer instead of just canvas
        this.mouseMoveHandler = (e) => {
          const rect = this.footerElement.getBoundingClientRect();
          this.mouse.x = e.clientX - rect.left;
          this.mouse.y = e.clientY - rect.top;
          this.updateBrightnessOverlay(e.clientX, e.clientY);
        };
        
        this.mouseEnterHandler = () => {
          this.isMouseInside = true;
        };
        
        this.mouseLeaveHandler = () => {
          this.isMouseInside = false;
          if (this.overlay) {
            this.overlay.style.background = 'radial-gradient(circle at 50% 50%, rgba(100, 149, 237, 0) 0%, rgba(100, 149, 237, 0) 100%)';
          }
        };
        
        // Attach events to footer element for full interactivity
        this.footerElement.addEventListener('mousemove', this.mouseMoveHandler);
        this.footerElement.addEventListener('mouseenter', this.mouseEnterHandler);
        this.footerElement.addEventListener('mouseleave', this.mouseLeaveHandler);
      }
      
      updateBrightnessOverlay(clientX, clientY) {
        if (!this.overlay) return;
        
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;
        
        // Enhanced overlay effect that works well with background image
        this.overlay.style.background = `
          radial-gradient(circle 400px at ${x}% ${y}%, 
            rgba(64, 224, 208, 0.25) 0%, 
            rgba(100, 149, 237, 0.15) 30%, 
            rgba(0, 191, 255, 0.08) 60%,
            rgba(100, 149, 237, 0) 100%)
        `;
      }
      
      updateNodes() {
        this.nodes.forEach(node => {
          // Update position
          node.x += node.vx;
          node.y += node.vy;
          
          // Bounce off edges
          if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
          
          // Keep nodes in bounds
          node.x = Math.max(0, Math.min(this.canvas.width, node.x));
          node.y = Math.max(0, Math.min(this.canvas.height, node.y));
          
          // Pulse effect
          node.pulsePhase += 0.015; // Slightly slower pulse
          node.currentOpacity = node.opacity + Math.sin(node.pulsePhase) * 0.15; // Adjusted for background image
        });
      }
      
      getNodeBrightness(node) {
        if (!this.isMouseInside) return 1;
        
        const dx = node.x - this.mouse.x;
        const dy = node.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouseRadius) {
          return 1 + (1 - distance / this.mouseRadius) * 2.5; // Stronger effect
        }
        return 1;
      }
      
      // New function to calculate fade based on vertical position
      getVerticalFade(y) {
        if (!this.canvas) return 1;
        
        const topQuarter = this.canvas.height * 0.25; // Top 25% of the canvas
        
        if (y <= topQuarter) {
          // Linear fade from top quarter to top (0)
          return y / topQuarter; // At top (y=0), fade = 0; at top quarter, fade = 1
        }
        
        return 1; // Full opacity below top quarter
      }
      
      getConnectionOpacity(node1, node2) {
        const dx = node1.x - node2.x;
        const dy = node1.y - node2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > this.maxDistance) return 0;
        
        let opacity = (1 - distance / this.maxDistance) * 0.4; // Slightly reduced base opacity for better visibility over background
        
        // Apply vertical fade to both nodes (use the minimum fade for the connection)
        const fade1 = this.getVerticalFade(node1.y);
        const fade2 = this.getVerticalFade(node2.y);
        const verticalFade = Math.min(fade1, fade2);
        opacity *= verticalFade;
        
        // Boost opacity if near mouse
        if (this.isMouseInside) {
          const midX = (node1.x + node2.x) / 2;
          const midY = (node1.y + node2.y) / 2;
          const mouseDx = midX - this.mouse.x;
          const mouseDy = midY - this.mouse.y;
          const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
          
          if (mouseDistance < this.mouseRadius) {
            const mouseEffect = 1 - mouseDistance / this.mouseRadius;
            opacity += mouseEffect * 1.2 * verticalFade; // Apply vertical fade to mouse effect too
          }
        }
        
        return Math.min(opacity, 1);
      }
      
      drawConnections() {
        if (!this.ctx) return;
        
        for (let i = 0; i < this.nodes.length; i++) {
          for (let j = i + 1; j < this.nodes.length; j++) {
            const opacity = this.getConnectionOpacity(this.nodes[i], this.nodes[j]);
            
            if (opacity > 0.05) { // Lower threshold for more visible connections
              const gradient = this.ctx.createLinearGradient(
                this.nodes[i].x, this.nodes[i].y,
                this.nodes[j].x, this.nodes[j].y
              );
              
              // Updated colors to match the background network theme - deep blues with cyan accents
              const color1 = `rgba(0, 123, 255, ${opacity * 0.8})`; // Deep blue
              const color2 = `rgba(32, 201, 151, ${opacity * 0.7})`; // Cyan-green
              const color3 = `rgba(13, 110, 253, ${opacity * 0.9})`; // Bright blue
              
              gradient.addColorStop(0, color1);
              gradient.addColorStop(0.5, color3);
              gradient.addColorStop(1, color2);
              
              this.ctx.strokeStyle = gradient;
              this.ctx.lineWidth = opacity * 1.4; // Slightly thicker lines for better visibility
              this.ctx.globalAlpha = opacity;
              
              this.ctx.beginPath();
              this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
              this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
              this.ctx.stroke();
            }
          }
        }
      }
      
      drawNodes() {
        if (!this.ctx) return;
        
        this.nodes.forEach(node => {
          const brightness = this.getNodeBrightness(node);
          const verticalFade = this.getVerticalFade(node.y);
          const finalOpacity = Math.max(0, Math.min(1, node.currentOpacity * brightness * verticalFade));
          
          // Skip drawing if opacity is too low
          if (finalOpacity < 0.05) return;
          
          // Node glow - updated colors to match background network theme
          const gradient = this.ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 3.5
          );
          
          if (brightness > 1.5) {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.9})`);
            gradient.addColorStop(0.2, `rgba(32, 201, 151, ${finalOpacity * 0.85})`); // Cyan-green
            gradient.addColorStop(0.6, `rgba(0, 123, 255, ${finalOpacity * 0.7})`); // Deep blue
            gradient.addColorStop(1, 'rgba(0, 4, 38, 0)'); // Dark blue fade
          } else {
            gradient.addColorStop(0, `rgba(32, 201, 151, ${finalOpacity * 0.8})`); // Cyan-green
            gradient.addColorStop(0.3, `rgba(13, 110, 253, ${finalOpacity * 0.7})`); // Bright blue
            gradient.addColorStop(1, 'rgba(0, 4, 38, 0)'); // Dark blue fade
          }
          
          this.ctx.fillStyle = gradient;
          this.ctx.globalAlpha = 1;
          
          this.ctx.beginPath();
          this.ctx.arc(node.x, node.y, node.radius * (brightness > 1.5 ? 2.5 : 1.8), 0, Math.PI * 2);
          this.ctx.fill();
          
          // Core node - updated colors to match the network theme
          this.ctx.fillStyle = brightness > 1.5 ? 
            `rgba(255, 255, 255, ${finalOpacity * 0.9})` : 
            `rgba(32, 201, 151, ${finalOpacity * 0.8})`; // Cyan-green core
          this.ctx.beginPath();
          this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          this.ctx.fill();
        });
      }
      
      draw() {
        if (!this.ctx || !this.canvas) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawConnections();
        this.drawNodes();
      }
      
      animate() {
        if (!mountedRef.current) return;
        
        this.updateNodes();
        this.draw();
        this.animationFrame = requestAnimationFrame(() => this.animate());
      }
      
      destroy() {
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
        }
        
        if (this.footerElement) {
          this.footerElement.removeEventListener('mousemove', this.mouseMoveHandler);
          this.footerElement.removeEventListener('mouseenter', this.mouseEnterHandler);
          this.footerElement.removeEventListener('mouseleave', this.mouseLeaveHandler);
        }
        
        if (this.resizeHandler) {
          window.removeEventListener('resize', this.resizeHandler);
        }
      }
    }

    // Initialize the network with a small delay to ensure DOM is ready
    const initNetwork = () => {
      if (canvasRef.current && overlayRef.current && footerRef.current && mountedRef.current) {
        try {
          networkRef.current = new NetworkMesh(canvasRef.current, overlayRef.current, footerRef.current);
        } catch (error) {
          console.error('Error initializing network mesh:', error);
        }
      }
    };

    const timeoutId = setTimeout(initNetwork, 100);

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId);
      if (networkRef.current) {
        networkRef.current.destroy();
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait a bit for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
    } else {
      // If we're already on home page, just scroll
      scrollToSection(sectionId);
    }
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-background">
        {/* Gradient overlay for top half */}
        <div className="gradient-overlay"></div>
        <canvas ref={canvasRef} className="network-canvas"></canvas>
        <div ref={overlayRef} className="brightness-overlay"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="Ganglia Technologies" />
          </div>
        </div>
        
        <div className="footer-center">
          <div className="footer-section headquarters">
            <h3>Headquarters</h3>
            <p>Manipal Government of Karnataka Bioincubator,</p>
            <p>III Floor MAHE Advanced Research Centre Behind MMMC,</p>
            <p>Manipal, Karnataka 576104</p>
          </div>
          
          <div className="footer-contact">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>director@ganglia.in</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 3C2 2.45 2.45 2 3 2H5.5C5.85 2 6.15 2.2 6.27 2.53L7.7 6.21C7.85 6.6 7.7 7.04 7.35 7.27L5.5 8.5C6.5 10.62 8.38 12.5 10.5 13.5L11.73 11.65C11.96 11.3 12.4 11.15 12.79 11.3L16.47 12.73C16.8 12.85 17 13.15 17 13.5V16C17 16.55 16.55 17 16 17C8.82 17 3 11.18 3 4C3 3.45 2.55 3 2 3Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>(+91) 81097 82903</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-right">
          <div className="footer-section company-links">
            <h3>Company</h3>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
              <li><a href="#story" onClick={(e) => handleNavClick(e, 'story')}>Our Story</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, 'products')}>Products</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
              <li><a href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a></li>
              <li><a href="#awards" onClick={(e) => handleNavClick(e, 'awards')}>Awards & Research</a></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h3>Join Our Newsletter</h3>
            <button className="contact-btn" onClick={handleContactClick}>Contact Now</button>
            
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H12.6V14.2H10.2V11.2H12.6V9C12.6 6.6 14.1 5.3 16.3 5.3C17.3 5.3 18.2 5.4 18.5 5.4V8.1H17C15.8 8.1 15.6 8.7 15.6 9.5V11.2H18.4L18 14.2H15.6V22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95718 14.8821 3.28445C14.0247 3.61173 13.2884 4.19445 12.773 4.95371C12.2575 5.71297 11.9877 6.61435 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39624C5.36074 6.60667 4.01032 5.43666 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;