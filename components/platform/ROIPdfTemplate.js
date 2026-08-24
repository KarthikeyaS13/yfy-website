"use client";

import React from 'react';
import styles from './ROIPdfTemplate.module.css';

// Helper to format currency
const formatINRCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function ROIPdfTemplate({
  currentAnnualCost = 1064328,
  costAfterYfy = 2384516,
  netAnnualSavings = -1320188,
  roiPercentage = -52,
  paybackPeriod = 0,
  oneTimeSetupCost = 279900,
  util = { payroll: 0.85, compliance: 0.8, error: 0.95, penalty: 0.98 },
  monthlyHoursFreed = 170
}) {
  const isPositiveSavings = netAnnualSavings > 0;
  
  // Calculate relative bar heights visually for the chart
  const maxScale = Math.max(currentAnnualCost, costAfterYfy) * 1.2;
  const sqHeight = `${(currentAnnualCost / maxScale) * 100}%`;
  const yfyHeight = `${(costAfterYfy / maxScale) * 100}%`;
  
  const avgAutoStr = ((util.payroll + util.compliance + util.penalty + util.error) / 4) * 100;
  const avgAuto = Math.round(avgAutoStr);
  
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className={styles.pdfContainer} id="roi-pdf-content">
      {/* PAGE 1 */}
      <div className={`${styles.pdfPage} pdf-page-capture`}>
        
        {/* Header */}
        <div className={styles.pageHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '42px', height: '42px',
              background: 'radial-gradient(ellipse at 50% 40%, #7A25B8, #6B1FA2 50%, #4A1070)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 16px rgba(107,31,162,0.4)',
              fontFamily: "'Inter', sans-serif"
            }}>yfy</div>
            <div className={styles.titleBlock}>
              <h2>EXECUTIVE SUMMARY</h2>
              <p>Automation Impact & ROI Analysis</p>
            </div>
          </div>
          <div className={styles.dateText}>{today}</div>
        </div>

        {/* Top Highlight Cards */}
        <div className={styles.highlightCards}>
          <div className={styles.highlightCard}>
            <div className={styles.highlightCardTitle}>Net Annual Impact</div>
            <div className={styles.highlightCardValue} style={{ color: isPositiveSavings ? '#16a34a' : '#dc2626' }}>
              {formatINRCurrency(netAnnualSavings)}
              <span style={{ color: isPositiveSavings ? '#16a34a' : '#dc2626' }}>
                {isPositiveSavings ? '▲' : '▼'}
              </span>
            </div>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightCardTitle}>Return on Investment</div>
            <div className={styles.highlightCardValue} style={{ color: isPositiveSavings ? '#16a34a' : '#dc2626' }}>
              {Math.round(roiPercentage)}%
              <span style={{ color: isPositiveSavings ? '#16a34a' : '#dc2626' }}>
                {isPositiveSavings ? '▲' : '▼'}
              </span>
            </div>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightCardTitle}>Payback Period</div>
            <div className={styles.highlightCardValue}>
              {Math.floor(paybackPeriod)} <span>Months</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className={styles.chartsWrapper}>
          
          {/* Column 1: Cost Comparison */}
          <div className={styles.chartColumn}>
            <div className={styles.sectionHeading}>Cost Comparison</div>
            
            <div className={styles.barChart}>
              <div className={styles.yAxis}>
                <span>Max</span>
                <span>Mid</span>
                <span>₹0</span>
              </div>
              <div className={styles.yAxisLine} style={{ top: '0%' }}></div>
              <div className={styles.yAxisLine} style={{ top: '50%' }}></div>
              <div className={styles.yAxisLine} style={{ top: '100%' }}></div>
              
              <div className={styles.barWrapper}>
                <div className={`${styles.bar} ${styles.gray}`} style={{ height: sqHeight }}></div>
                <div className={styles.barLabel}>Status Quo</div>
              </div>
              <div className={styles.barWrapper}>
                <div className={`${styles.bar} ${styles.purple}`} style={{ height: yfyHeight }}></div>
                <div className={styles.barLabel}>With yfy®</div>
              </div>
            </div>

            <table className={styles.dataTable} style={{ marginBottom: 0 }}>
              <tbody>
                <tr>
                  <td>Current Cost (Status Quo)</td>
                  <td className={styles.value}>{formatINRCurrency(currentAnnualCost)}</td>
                </tr>
                <tr>
                  <td>Cost with yfy® Automation</td>
                  <td className={styles.value}>{formatINRCurrency(costAfterYfy)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800, color: '#111827' }}>Total Savings</td>
                  <td className={styles.valDanger} style={{ color: isPositiveSavings ? '#16a34a' : '#dc2626' }}>
                    {formatINRCurrency(netAnnualSavings)} {isPositiveSavings ? '▲' : '▼'}
                  </td>
                </tr>
                <tr>
                  <td>Implementation (One-time)</td>
                  <td className={styles.value}>{formatINRCurrency(oneTimeSetupCost)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Column 2: Operational Efficiency */}
          <div className={styles.chartColumn}>
            <div className={styles.sectionHeading}>Operational Efficiency</div>
            
            {/* Donut Chart representation */}
            <div className={styles.donutChart}>
              <svg viewBox="0 0 42 42" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                {/* Background Track */}
                <path
                  d="M21 5.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                />
                {/* Automation Progress */}
                <path
                  d="M21 5.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#7e22ce"
                  strokeWidth="6"
                  strokeDasharray={`${avgAuto}, 100`}
                />
              </svg>
              <div className={styles.donutHole} style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>{avgAuto}%</span>
              </div>
              <div className={styles.donutLegend}>
                <div className={styles.legendItem}>
                  <div className={styles.legendColor} style={{ background: '#7e22ce' }}></div> Automated
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendColor} style={{ background: '#e2e8f0' }}></div> Residual
                </div>
              </div>
            </div>

            <div className={styles.efficiencyGrid}>
              <div className={styles.effCard}>
                <div className={styles.effTitle}>Payroll Effort Reduced</div>
                <div className={styles.effValue}>{Math.round(util.payroll * 100)}%</div>
              </div>
              <div className={styles.effCard}>
                <div className={styles.effTitle}>Compliance Reduced</div>
                <div className={styles.effValue}>{Math.round(util.compliance * 100)}%</div>
              </div>
              <div className={styles.effCard}>
                <div className={styles.effTitle}>Errors Reduced</div>
                <div className={styles.effValue}>{Math.round(util.error * 100)}%</div>
              </div>
              <div className={styles.effCard}>
                <div className={styles.effTitle}>Penalty Risk Reduced</div>
                <div className={styles.effValue}>{Math.round(util.penalty * 100)}%</div>
              </div>
            </div>

            <div className={styles.purpleBanner}>
              <strong>Workforce Impact:</strong> This automation frees up <span>{monthlyHoursFreed} hrs/mo</span> of FTE capacity for higher-level strategic initiatives.
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerDisclaimer}>
            * Disclaimer: Calculations are based on generalized inputs and estimates. Actual figures may vary substantially during real-time deployment and rigorous scope analysis.
          </div>
          <div className={styles.footerPage}>PAGE 1 OF 2</div>
        </div>

      </div>

      {/* PAGE 2 */}
      <div className={`${styles.pdfPage} pdf-page-capture`}>
        
        {/* Header */}
        <div className={styles.pageHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '42px', height: '42px',
              background: 'radial-gradient(ellipse at 50% 40%, #7A25B8, #6B1FA2 50%, #4A1070)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 16px rgba(107,31,162,0.4)',
              fontFamily: "'Inter', sans-serif"
            }}>yfy</div>
            <div className={styles.titleBlock}>
              <h2>DETAILED FINANCIAL LEDGER</h2>
              <p>Comprehensive Analysis Architecture</p>
            </div>
          </div>
          <div className={styles.dateText}>{today}</div>
        </div>

        <div className={styles.sectionHeading}>FINANCIAL IMPACT STATEMENT</div>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Analytical Metric</th>
              <th style={{ textAlign: 'right' }}>Calculated Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Current Status Quo (Annual Payroll & Compliance Cost)</td>
              <td className={styles.value}>{formatINRCurrency(currentAnnualCost)}</td>
            </tr>
            <tr>
              <td>Automated Target (Annual Cost After yfy® Scale)</td>
              <td className={styles.value}>{formatINRCurrency(costAfterYfy)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 800, color: '#111827' }}>Predicted Net Annual Financial Impact</td>
              <td className={styles.valDanger} style={{ color: isPositiveSavings ? '#16a34a' : '#dc2626' }}>
                {formatINRCurrency(netAnnualSavings)} {isPositiveSavings ? '▲' : '▼'}
              </td>
            </tr>
            <tr>
              <td>Return on Investment (ROI) Coefficient</td>
              <td className={styles.valDanger} style={{ color: isPositiveSavings ? '#16a34a' : '#dc2626' }}>
                {Math.round(roiPercentage)}% {isPositiveSavings ? '▲' : '▼'}
              </td>
            </tr>
            <tr>
              <td>Aggregated Capital Payback Period</td>
              <td className={styles.value}>{Math.floor(paybackPeriod)} Months</td>
            </tr>
            <tr>
              <td>One-Time Implementation & Initial Setup Cost</td>
              <td className={styles.value}>{formatINRCurrency(oneTimeSetupCost)}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.sectionHeading} style={{ marginTop: '50px' }}>OPERATIONAL TARGET MATRIX</div>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Efficiency Indicator</th>
              <th style={{ textAlign: 'right' }}>Improvement Assessment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Payroll Administration Effort Reduction Target</td>
              <td className={styles.value}>{Math.round(util.payroll * 100)}%</td>
            </tr>
            <tr>
              <td>Compliance Management Labor Mitigation</td>
              <td className={styles.value}>{Math.round(util.compliance * 100)}%</td>
            </tr>
            <tr>
              <td>Manual Errors & Human Rework Reduction Index</td>
              <td className={styles.value}>{Math.round(util.error * 100)}%</td>
            </tr>
            <tr>
              <td>Regulatory Penalty Risk Assessment Reduction</td>
              <td className={styles.value}>{Math.round(util.penalty * 100)}%</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 800, color: '#111827' }}>FTE Capacity Freed Metric (Output)</td>
              <td className={styles.value}>{monthlyHoursFreed} <span style={{ color: '#9ca3af', fontWeight: 400 }}>hrs/mo</span></td>
            </tr>
          </tbody>
        </table>

         {/* Footer */}
         <div className={styles.footer}>
          <div className={styles.footerDisclaimer}>
            * Disclaimer: Calculations are based on generalized inputs and estimates. Actual figures may vary substantially during real-time deployment and rigorous scope analysis.
          </div>
          <div className={styles.footerPage}>PAGE 2 OF 2</div>
        </div>

      </div>

    </div>
  );
}
