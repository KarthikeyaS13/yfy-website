"use client";

import React, { useState, useEffect, useRef } from "react";
import { IndiaMapSVG } from "./IndiaMapSVG";
import { Tooltip } from "./Tooltip";
import { complianceMapData } from "../../data/complianceMapData";

export const IndiaComplianceMap = () => {
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [scenarioIndex, setScenarioIndex] = useState(1);
  const containerRef = useRef(null);

  // Scenarios: Single State -> Multi-State -> Pan-India
  const scenarios = [
    {
      Maharashtra: "rgba(236,72,153, 0.5)",
    },
    {
      Maharashtra: "rgba(236,72,153, 0.4)",
      Karnataka: "rgba(236,72,153, 0.4)",
      Telangana: "rgba(236,72,153, 0.4)",
    },
    {
      Maharashtra: "rgba(236,72,153, 0.4)",
      Karnataka: "rgba(236,72,153, 0.4)",
      Telangana: "rgba(236,72,153, 0.4)",
      "Tamil Nadu": "rgba(236,72,153, 0.4)",
      Delhi: "rgba(236,72,153, 0.4)",
      Haryana: "rgba(245,158,11, 0.4)", 
    }
  ];

  const ambientHighlights = scenarios[scenarioIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scenarios.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStateHover = (stateName, event) => {
    setHoveredState(stateName);
  };

  const handleStateLeave = () => {
    setHoveredState(null);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hoveredState && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    if (hoveredState) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredState]);

  return (
    <div 
      ref={containerRef} 
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px' }}
    >
      <IndiaMapSVG
        hoveredState={hoveredState}
        ambientHighlights={ambientHighlights}
        onStateHover={handleStateHover}
        onStateLeave={handleStateLeave}
      />
      <Tooltip
        hoveredState={hoveredState}
        tooltipPos={tooltipPos}
        locationData={hoveredState ? complianceMapData[hoveredState] : null}
      />
    </div>
  );
};
