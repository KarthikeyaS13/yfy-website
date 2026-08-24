'use client';
import { useState } from 'react';
import ROICalculator from '@/components/platform/ROICalculator';
import { Calculator } from 'lucide-react';

export default function ROICalculatorWrapper() {
  const [showCalculator, setShowCalculator] = useState(false);

  const handleStartCalculation = () => {
    setShowCalculator(true);
    setTimeout(() => {
      const el = document.getElementById('roi-tool-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <div id="assessment-trigger">
      {!showCalculator && (
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={handleStartCalculation}
            className="btn btn-primary btn-lg"
            style={{ 
              padding: '1.25rem 2.5rem', 
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 8px 32px rgba(107, 31, 162, 0.4)'
            }}
          >
            <Calculator size={22} />
            Assess Payroll Costs
          </button>
        </div>
      )}

      {showCalculator && (
        <div id="roi-tool-container" className="active-calculator" style={{ marginTop: '4rem' }}>
          <ROICalculator isInitiallyBlank={true} />
        </div>
      )}
    </div>
  );
}
