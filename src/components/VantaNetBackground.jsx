import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three"; // Required for Vanta.js

const VantaNetBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    let effectInstance;

    import("vanta/dist/vanta.net.min").then((VANTA) => {
      effectInstance = VANTA.default({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        scale: 1.0,
        scaleMobile: 1.0,
        maxDistance: 22.0,
        spacing: 17.0,
        points:9,
        backgroundColor: "#000000", // Background color (Dark Gray)
        THREE, // Pass Three.js instance
      });

      setVantaEffect(effectInstance);
    });

    return () => {
      if (effectInstance) effectInstance.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.9, // 🌟 Set overall opacity here
      }}
    />
  );
};

export default VantaNetBackground;
