'use client';
import ROICalculator from '@/components/platform/ROICalculator';

export default function ROICalculatorWrapper() {
  return (
    <div id="assessment-trigger">
      <div id="roi-tool-container" className="active-calculator" style={{ marginTop: '4rem' }}>
        <ROICalculator isInitiallyBlank={true} />
      </div>
    </div>
  );
}
