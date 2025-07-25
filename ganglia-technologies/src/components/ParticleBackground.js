import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const animationIdRef = useRef(null);

  const createCircularTexture = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(133, 153, 225, 1)");
    gradient.addColorStop(0.2, "rgba(133, 153, 225, 0.8)");
    gradient.addColorStop(0.5, "rgba(133, 153, 225, 0.3)");
    gradient.addColorStop(1, "rgba(133, 153, 225, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const animate = useCallback(() => {
    animationIdRef.current = requestAnimationFrame(animate);
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0008;
    }
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, []);

  const init = useCallback(() => {
    if (!mountRef.current) return;
    
    const particleCount = 800;
    
    // Scene
    sceneRef.current = new THREE.Scene();
    
    // Camera
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 400;
    
    // Renderer
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(rendererRef.current.domElement);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      size: 6,
      map: createCircularTexture(),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particlesRef.current = new THREE.Points(geometry, material);
    sceneRef.current.add(particlesRef.current);
  }, [createCircularTexture]);

  const handleResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    
    init();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
      if (currentMount && rendererRef.current && currentMount.contains(rendererRef.current.domElement)) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [init, animate, handleResize]);

  return <div ref={mountRef} className="canvas-container" />;
};

export default ParticleBackground;