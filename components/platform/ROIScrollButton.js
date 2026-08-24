'use client';
import { Calculator } from 'lucide-react';

export default function ROIScrollButton() {
  const handleScroll = () => {
    const el = document.getElementById('assessment-trigger');
    if (el) {
      const offset = 80; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback: search for the section manually if ID is missing
      const sections = document.querySelectorAll('section');
      const target = Array.from(sections).find(s => s.innerText.includes('Measured by ROI'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
      <button 
        onClick={handleScroll}
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
  );
}
