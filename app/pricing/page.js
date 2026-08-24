"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Info } from 'lucide-react';
import styles from './Pricing.module.css';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className={styles.pricingPage}>
      <div className="container">
        
        {/* Header Section */}
        <div className={`${styles.header} reveal`}>
          <h1 className={styles.title}>
            Transparent Pricing.<br />
            <span style={{ color: 'var(--brand-xlight)' }}>Zero Hidden Fees.</span>
          </h1>
          <p className={styles.subtitle}>
            Automate workforce operations, compliance, and budgeting. Choose the plan that fits your workforce infrastructure needs.
          </p>

          {/* Pricing Toggle */}
          <div className={styles.toggleContainer}>
            <span className={`${styles.toggleLabel} ${!isAnnual ? styles.active : styles.inactive}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className={styles.toggleBtn}
            >
              <div 
                className={styles.toggleThumb}
                style={{ transform: isAnnual ? 'translateX(32px)' : 'translateX(0)' }}
              />
            </button>
            <span className={`${styles.toggleLabel} ${isAnnual ? styles.active : styles.inactive}`}>
              Annually <span className={styles.saveBadge}>Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={`${styles.grid} reveal`}>
          
          {/* Core HRMS Plan */}
          <div className={styles.card}>
            <h3 className={styles.planName}>Core HR & Payroll</h3>
            <p className={styles.planDesc}>Foundational workforce records, attendance, and automated payroll.</p>
            <div className={styles.priceBlock}>
              <span className={styles.price}>₹{isAnnual ? '250' : '300'}</span>
              <span className={styles.priceLabel}> / user / month</span>
            </div>
            <Link href="/platform/demo" className="btn btn-outline" style={{ justifyContent: 'center', marginBottom: '2rem' }}>Talk to an Expert</Link>
            
            <div className={styles.featureList}>
              <p className={styles.featureTitle}>Core Features:</p>
              <div className={styles.featureItem}><Check size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} /><span className={styles.featureText}>Automated Payroll Processing</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} /><span className={styles.featureText}>PF, ESI & TDS Calculations</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} /><span className={styles.featureText}>Attendance & GPS Tracking</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} /><span className={styles.featureText}>Employee Self-Service App</span></div>
            </div>
          </div>

          {/* Talent & Operations (Popular) */}
          <div className={styles.cardPopular}>
            <div className={styles.popularBadge}>Most Popular</div>
            <h3 className={styles.planName}>Talent & Operations</h3>
            <p className={styles.planDesc}>Advanced modules for hiring, performance, and workforce operations.</p>
            <div className={styles.priceBlock}>
              <span className={styles.price}>₹{isAnnual ? '450' : '550'}</span>
              <span className={styles.priceLabel}> / user / month</span>
            </div>
            <Link href="/platform/demo" className="btn btn-primary" style={{ justifyContent: 'center', marginBottom: '2rem' }}>Request Enterprise Demo</Link>

            <div className={styles.featureList}>
              <p className={styles.featureTitle}>Everything in Core, plus:</p>
              <div className={styles.featureItem}><Check size={18} color="var(--brand-xlight)" style={{ flexShrink: 0 }} /><span className={styles.featureTextWhite}>Applicant Tracking System (ATS)</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--brand-xlight)" style={{ flexShrink: 0 }} /><span className={styles.featureTextWhite}>Performance Management (PMS)</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--brand-xlight)" style={{ flexShrink: 0 }} /><span className={styles.featureTextWhite}>Expense & Asset Management</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--brand-xlight)" style={{ flexShrink: 0 }} /><span className={styles.featureTextWhite}>Contract Labour Tracking</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--brand-xlight)" style={{ flexShrink: 0 }} /><span className={styles.featureTextWhite}>Priority Chat Support</span></div>
            </div>
          </div>

          {/* Full Enterprise Platform */}
          <div className={styles.card}>
            <h3 className={styles.planName}>Full Enterprise Platform</h3>
            <p className={styles.planDesc}>Complete operating system with active compliance intelligence and e-vault.</p>
            <div className={styles.priceBlock}>
              <span className={styles.price}>Custom</span>
              <span className={styles.priceLabel}> pricing package</span>
            </div>
            <Link href="/platform/demo" className="btn btn-ghost" style={{ justifyContent: 'center', marginBottom: '2rem' }}>Contact Sales</Link>
            
            <div className={styles.featureList}>
              <p className={styles.featureTitle}>Everything in Talent, plus:</p>
              <div className={styles.featureItem}><Check size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} /><span className={styles.featureText}>Multi-State Compliance Engine</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} /><span className={styles.featureText}>Automated Statutory Filings</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} /><span className={styles.featureText}>e-Vault Document Security</span></div>
              <div className={styles.featureItem}><Check size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} /><span className={styles.featureText}>Roles & Access (RBAC)</span></div>
            </div>
          </div>

        </div>

        {/* Feature Comparison Matrix */}
        <div className={`${styles.matrixSection} reveal`}>
          <h2 className={styles.matrixTitle}>Detailed Feature Comparison</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th} style={{ width: '33%' }}>Features</th>
                  <th className={`${styles.th} ${styles.thCenter}`} style={{ width: '22%' }}>Core HR & Payroll</th>
                  <th className={`${styles.th} ${styles.thCenter} ${styles.thHighlight}`} style={{ width: '22%' }}>Talent & Ops</th>
                  <th className={`${styles.th} ${styles.thCenter}`} style={{ width: '23%' }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                
                {/* Category 1 */}
                <tr className={styles.catRow}><td colSpan={4} className={styles.catText}>Core Payroll Processing</td></tr>
                <tr>
                  <td className={styles.td} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Automated Salary Computation <Info size={14} style={{ color: 'var(--text-muted)' }} />
                  </td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><Check size={20} color="var(--accent-green)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdHighlight}`}><Check size={20} color="var(--brand-light)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><Check size={20} color="var(--accent-green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr>
                  <td className={styles.td}>Multi-Entity / Multi-Currency</td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><X size={20} color="var(--text-muted)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdHighlight}`}><Check size={20} color="var(--brand-light)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><Check size={20} color="var(--accent-green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr>
                  <td className={styles.td}>Dynamic Reimbursement Engine</td>
                  <td className={`${styles.td} ${styles.tdCenter}`}>Basic</td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdHighlight} ${styles.tdWhite}`}>Full Workflow</td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdWhite}`}>Full Workflow</td>
                </tr>

                {/* Category 2 */}
                <tr className={styles.catRow}><td colSpan={4} className={styles.catText}>Compliance & Statutory</td></tr>
                <tr>
                  <td className={styles.td}>PF, ESI, TDS Calculations</td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><Check size={20} color="var(--accent-green)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdHighlight}`}><Check size={20} color="var(--brand-light)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><Check size={20} color="var(--accent-green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr>
                  <td className={styles.td}>State-Wise Labour Welfare Fund (LWF)</td>
                  <td className={`${styles.td} ${styles.tdCenter}`}>Single State</td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdHighlight} ${styles.tdWhite}`}>All India Validations</td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdWhite}`}>All India Validations</td>
                </tr>
                <tr>
                  <td className={styles.td}>Auto-Filing & Challan Generation</td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><X size={20} color="var(--text-muted)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdHighlight}`}><Check size={20} color="var(--brand-light)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><Check size={20} color="var(--accent-green)" style={{ margin: '0 auto' }} /></td>
                </tr>

                {/* Category 3 */}
                <tr className={styles.catRow}><td colSpan={4} className={styles.catText}>Integration & Support</td></tr>
                <tr>
                  <td className={styles.td}>API Access</td>
                  <td className={`${styles.td} ${styles.tdCenter}`}><X size={20} color="var(--text-muted)" style={{ margin: '0 auto' }} /></td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdHighlight}`}>Limited</td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdWhite}`}>Full Access</td>
                </tr>
                <tr>
                  <td className={styles.td}>Support SLA</td>
                  <td className={`${styles.td} ${styles.tdCenter}`}>Standard Email</td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdHighlight} ${styles.tdWhite}`}>Priority Chat</td>
                  <td className={`${styles.td} ${styles.tdCenter} ${styles.tdWhite}`}>Dedicated Manager</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
