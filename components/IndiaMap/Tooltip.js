import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Tooltip = ({ hoveredState, tooltipPos, locationData }) => {
  return (
    <AnimatePresence>
      {hoveredState && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: tooltipPos.y,
            left: tooltipPos.x,
            pointerEvents: "none",
            zIndex: 50,
            transform: "translate(-50%, -100%)",
            marginTop: "-16px",
          }}
        >
          <div style={{
            background: 'rgba(14, 6, 24, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            padding: '1rem',
            width: '260px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(236,72,153,0.1)',
            color: '#fff'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{hoveredState}</h4>
              {locationData ? (
                <span style={{
                  background: locationData.status === 'Active Shield' ? 'rgba(236,72,153,0.2)' : 'rgba(245,158,11,0.2)',
                  color: locationData.status === 'Active Shield' ? '#ec4899' : '#f59e0b',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {locationData.status}
                </span>
              ) : (
                <span style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  Standard
                </span>
              )}
            </div>

            {locationData && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  {locationData.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.5rem' }}>
                  {locationData.features.map(f => (
                    <span key={f} style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      color: '#e2e8f0'
                    }}>
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {!locationData && (
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                Standard central labour laws applied. State-specific automations coming soon.
              </p>
            )}

            {/* Triangle Pointer */}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              background: 'rgba(14, 6, 24, 0.95)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              borderRight: '1px solid rgba(255,255,255,0.1)',
            }}></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
