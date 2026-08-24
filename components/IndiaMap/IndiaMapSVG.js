import React, { useMemo } from "react";
import India from "@svg-maps/india";
import { complianceMapData as locations } from "../../data/complianceMapData";
import { motion } from "framer-motion";

export const IndiaMapSVG = ({ hoveredState, ambientHighlights = {}, onStateHover, onStateLeave }) => {
  const sortedLocations = useMemo(() => {
    return [...India.locations].sort((a, b) => {
      const aAmbient = !!ambientHighlights[a.name];
      const bAmbient = !!ambientHighlights[b.name];
      if (aAmbient && !bAmbient) return 1;
      if (!aAmbient && bAmbient) return -1;
      return b.path.length - a.path.length;
    });
  }, [ambientHighlights]);

  return (
    <svg
      viewBox={India.viewBox}
      className="w-full h-full"
      style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="depth-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {sortedLocations.map((state) => {
        const locationData = locations[state.name];
        const isHovered = hoveredState === state.name;

        const isSelectable = [
          "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
          "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
          "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
          "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
          "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
        ].includes(state.name);

        let baseFill = "rgba(107, 31, 162, 0.1)"; // Default dark theme inactive
        let baseStroke = "rgba(255, 255, 255, 0.1)";
        
        if (locationData?.status === "Active Shield") {
          baseFill = "#ec4899"; // Vibrant Pink
          baseStroke = "rgba(255, 255, 255, 0.2)";
        } else if (locationData?.status === "Upcoming") {
          baseFill = "#f59e0b"; // Orange
          baseStroke = "rgba(255, 255, 255, 0.2)";
        }

        const ambientColor = ambientHighlights[state.name];
        const isAmbient = !!ambientColor;

        let targetFill = baseFill;
        let targetStroke = baseStroke;

        if (isAmbient && isSelectable) {
          targetFill = ambientColor;
          targetStroke = "#B7C9DD"; 
        }

        const ambientIndex = Object.keys(ambientHighlights).indexOf(state.name);
        const staggerDelay = isAmbient ? (ambientIndex > -1 ? ambientIndex * 0.15 : 0) : 0;

        let animateState = {};
        let transitionState = {};

        if (isHovered && isSelectable) {
          animateState = { 
            scale: 1, 
            y: 0, 
            fill: targetFill,
            stroke: targetStroke,
            filter: "brightness(1.2) drop-shadow(0px 0px 10px rgba(236,72,153,0.5))",
            opacity: 1
          };
          transitionState = { duration: 0.3 };
        } else if (isAmbient && isSelectable) {
          animateState = { 
            fill: targetFill, 
            stroke: targetStroke,
            scale: 1.01, 
            y: [0, -4.5, -4, -5, -4.5],
            filter: "brightness(1.02) drop-shadow(0px 8px 14px rgba(0,0,0,0.10))",
            opacity: 1
          };
          transitionState = {
            duration: 0.4,
            delay: staggerDelay,
            y: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.15, 0.5, 0.8, 1],
              delay: staggerDelay
            }
          };
        } else {
          animateState = { 
            scale: 1, 
            y: 0, 
            fill: targetFill, 
            stroke: targetStroke,
            filter: "brightness(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
            opacity: 1
          };
          transitionState = { duration: 0.4 };
        }

        return (
          <g key={state.id}>
            <motion.path
              id={state.id}
              d={state.path}
              style={{
                cursor: isSelectable ? "pointer" : "default",
                transition: "colors 0.5s ease-in-out",
                transformOrigin: "center"
              }}
              strokeWidth="1"
              initial={false}
              animate={animateState}
              transition={transitionState}
              onMouseEnter={(e) => isSelectable && onStateHover(state.name, e)}
              onMouseLeave={() => isSelectable && onStateLeave()}
            />
          </g>
        );
      })}
    </svg>
  );
};
