import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(14, 6, 24, 0.8)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 99999,
      color: '#fff'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        background: 'radial-gradient(ellipse at 50% 40%, #7A25B8, #6B1FA2 50%, #4A1070)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: '0 8px 32px rgba(107,31,162,0.6)',
        animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 900,
          color: '#fff'
        }}>
          yfy
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: '#B388FF' }} />
        <span style={{ fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.05em', color: '#E9D5FF' }}>
          Loading...
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: .85;
            transform: scale(0.95);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
