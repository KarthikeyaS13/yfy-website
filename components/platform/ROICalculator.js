"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './ROICalculator.module.css';
import ROIPdfTemplate from './ROIPdfTemplate';
import { 
  Plus, Minus, Wallet, Bot, TrendingUp, BarChart3, 
  Clock, ShieldAlert, Zap, Calendar, IndianRupee,
  CheckCircle2, ShieldCheck, Target, Cpu, RefreshCcw, XCircle,
  Mail, Building2, User, Send, CheckCircle, ArrowRight
} from 'lucide-react';

export default function ROICalculator({ isInitiallyBlank = false }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const tabNavRef = useRef(null);

  const getInitialState = () => ({
    // Tab 1: Company Profile
    numEmployees: isInitiallyBlank ? 50 : 50,
    operationalPresence: 'Single State',
    numPayCycles: 1,
    payCycleStructure: 'Single Pay Cycle',
    avgSalary: isInitiallyBlank ? 0 : 515000,
    
    // Tab 2: Payroll & HR Team Costs
    numPayrollExecs: isInitiallyBlank ? 0 : 0,
    numHRStaff: isInitiallyBlank ? 0 : 1,
    monthlySalaryPayrollExec: isInitiallyBlank ? 15000 : 115000,
    monthlySalaryHRStaff: isInitiallyBlank ? 15000 : 65000,
    timeSpentPercent: isInitiallyBlank ? 0 : 40,

    // Tab 3: Payroll Tech & Vendor Stack
    payrollSoftwareCost: isInitiallyBlank ? 0 : 41000,
    hrmsSoftwareCost: isInitiallyBlank ? 0 : 37000,
    tdsToolCost: isInitiallyBlank ? 0 : 13000,
    caFees: isInitiallyBlank ? 0 : 106000,
    pfEsiFees: isInitiallyBlank ? 0 : 164000,

    // Tab 4: Compliance Risk Exposure
    payrollErrorsPerYear: isInitiallyBlank ? 0 : 2,
    costPerError: isInitiallyBlank ? 0 : 31095,
    statutoryPenalties: isInitiallyBlank ? 0 : 56000,
    interestDelayed: isInitiallyBlank ? 0 : 60000,
    noticesReceived: isInitiallyBlank ? 'Select value' : 'Select value',

    // Tab 5: yfy Utilisation Level
    monthlySubscriptionConfig: 120,
    utilizationLevel: '',

    // Tab 7: Lead Gen
    leadName: '',
    leadEmail: '',
    leadOrg: ''
  });

  const [data, setData] = useState(getInitialState());

  // Auto-scroll active tab into view
  useEffect(() => {
    if (tabNavRef.current) {
      const activeBtn = tabNavRef.current.children[activeTab];
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;
    if (type === 'range' || type === 'number') {
      val = Number(val);
    }
    setData(prev => ({ ...prev, [name]: val }));
  };

  const handleToggle = (name, val) => {
    setData(prev => ({ ...prev, [name]: val }));
  };

  const handleStepChange = (name, delta, min, max) => {
    setData(prev => {
      const newVal = Math.min(max, Math.max(min, prev[name] + delta));
      return { ...prev, [name]: newVal };
    });
  };

  const handleSendReport = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pages = document.querySelectorAll('.pdf-page-capture');
      
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        
        // Temporarily ensure the parent isn't fully hidden (we use offscreen positioning)
        const canvas = await html2canvas(page, { 
          scale: 2, 
          useCORS: true,
          logging: false 
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.85); // Use JPEG compression to reduce size drastically
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }
      
      // Clean leadOrg to alpha-numerics to avoid browser filename rejection issues
      const cleanOrg = data.leadOrg ? data.leadOrg.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').toLowerCase() : 'demo';
      const fileNameRaw = `YFY-ROI-Analysis-${cleanOrg}`;
      pdf.save(`${fileNameRaw}.pdf`);
      setIsSuccess(true);
    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // ─── Mathematical Logic ──────────────────────────────────────────────
  const utilizationStats = {
    'Conservative Use': { payroll: 0.35, compliance: 0.45, penalty: 0.45, error: 0.40 },
    'Moderate Use': { payroll: 0.60, compliance: 0.65, penalty: 0.85, error: 0.70 },
    '100% Utilisation': { payroll: 0.85, compliance: 0.80, penalty: 0.98, error: 0.95 }
  };
  // Fallback to 'Moderate Use' if utilizationLevel gets corrupted
  const util = utilizationStats[data.utilizationLevel] || utilizationStats['Moderate Use'];

  const annualStaffCost = ((data.numPayrollExecs * data.monthlySalaryPayrollExec) + (data.numHRStaff * data.monthlySalaryHRStaff)) * 12 * (data.timeSpentPercent / 100);
  const annualSoftwareVendorCost = ((data.payrollSoftwareCost + data.hrmsSoftwareCost + data.tdsToolCost) * 12) + data.caFees + data.pfEsiFees;
  const errorCost = (data.payrollErrorsPerYear * data.costPerError);
  const penaltyInterestCost = (data.statutoryPenalties + data.interestDelayed);
  const annualErrorPenaltyCost = errorCost + penaltyInterestCost;
  const currentAnnualCost = annualStaffCost + annualSoftwareVendorCost + annualErrorPenaltyCost;
  const annualSubscriptionCost = data.monthlySubscriptionConfig * data.numEmployees * 12;
  const residualStaff = annualStaffCost * (1 - util.payroll);
  const residualVendor = annualSoftwareVendorCost * (1 - util.compliance);
  const residualPenalty = penaltyInterestCost * (1 - util.penalty);
  const residualError = errorCost * (1 - util.error);
  const yfyTotalOtherCosts = residualStaff + residualVendor + residualPenalty + residualError;
  const costAfterYfy = annualSubscriptionCost + yfyTotalOtherCosts;
  const oneTimeSetupCost = (annualSubscriptionCost / 6) * 0.75;
  const netAnnualSavings = currentAnnualCost - costAfterYfy;
  const monthlySavings = netAnnualSavings / 12;
  const paybackPeriod = monthlySavings > 0 ? (oneTimeSetupCost / monthlySavings) : 0;
  const initialInvestment = annualSubscriptionCost + oneTimeSetupCost;
  const roiPercentage = initialInvestment > 0 ? (netAnnualSavings / initialInvestment) * 100 : 0;
  const avgReduction = (util.payroll + util.compliance) / 2;
  const monthlyHoursFreed = Math.round((data.numPayrollExecs + data.numHRStaff) * 22 * 8 * (data.timeSpentPercent / 100) * avgReduction);

  const formatINRCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(val));
  const formatNumber = (val) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(val));

  const tabs = [
    { title: "Profile", icon: <User size={16} /> },
    { title: "Team", icon: <Bot size={16} /> },
    { title: "Tech Stack", icon: <Cpu size={16} /> },
    { title: "Compliance", icon: <ShieldAlert size={16} /> },
    { title: "yfy® & Strategy", icon: <Target size={16} /> },
    { title: "Impact & ROI", icon: <BarChart3 size={16} /> },
    { title: "Get Report", icon: <Mail size={16} /> }
  ];

  return (
    <div className={`${styles.calculatorContainer} ${isInitiallyBlank ? styles.openedMode : ''}`} id="roi-calculator">
      
      <div className={styles.leftPanel}>
        <div className={styles.tabNav} ref={tabNavRef}>
          {tabs.map((tab, idx) => (
            <button 
              key={idx} 
              className={`${styles.tabBtn} ${activeTab === idx ? styles.active : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className={styles.tabNum}>{idx + 1}</span>
              <span className={styles.tabTitleText}>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* STEP 1: Company Profile */}
        {activeTab === 0 && (
          <div className={styles.formSection}>
            <h3 style={{ marginBottom: '1.5rem' }}>1. Company Overview</h3>
            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Total Number of Employees*</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Employees on payroll (including full-time & contractual)</span>
                </div>
                <div className={styles.numberDisplay}>{formatNumber(data.numEmployees)}</div>
              </div>
              <input type="range" min="50" max="10000" step="10" name="numEmployees" value={data.numEmployees} onChange={handleInputChange} className={styles.slider} />
              {data.numEmployees === 50 && (
                <div style={{ color: 'var(--brand-light)', fontSize: '0.85rem', marginTop: '0.75rem', fontWeight: '500' }}>
                  💡 Minimum of 50 employees for enterprise deployment.
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Operational Presence*</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> More states = higher compliance & payroll risk</span>
                </div>
                <div className={styles.toggleGroup}>
                  <button className={`${styles.toggleBtn} ${data.operationalPresence === 'Single State' ? styles.active : ''}`} onClick={() => handleToggle('operationalPresence', 'Single State')}>Single State</button>
                  <button className={`${styles.toggleBtn} ${data.operationalPresence === 'Multi-State' ? styles.active : ''}`} onClick={() => handleToggle('operationalPresence', 'Multi-State')}>Multi-State</button>
                </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Pay Cycle Structure*</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Frequency of salary processing</span>
                </div>
                <div className={styles.toggleGroup}>
                  <button 
                    className={`${styles.toggleBtn} ${data.numPayCycles === 1 ? styles.active : ''}`} 
                    onClick={() => handleInputChange({ target: { name: 'numPayCycles', value: 1, type: 'number' }})}
                  >
                    Single Pay Cycle
                  </button>
                  <button 
                    className={`${styles.toggleBtn} ${data.numPayCycles > 1 ? styles.active : ''}`} 
                    onClick={() => handleInputChange({ target: { name: 'numPayCycles', value: 2, type: 'number' }})}
                  >
                    Multiple Pay Cycles
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Average Monthly Salary per Employee (₹)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Used to estimate payroll exposure & error impact</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.avgSalary)}</div>
              </div>
              <input type="range" min="20000" max="10000000" step="5000" name="avgSalary" value={data.avgSalary} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.infoAlert}>
              ⚠️ Larger workforce + multiple states significantly increase compliance risk, processing effort and penalty exposure.
            </div>

            <div className={styles.disclaimerBlock}>
              <h4>📌 General Disclaimer</h4>
              <p>All calculations are indicative estimates based on user inputs and standard assumptions. Actual savings, costs and outcomes may vary depending on organisational structure, processes and regulatory requirements.</p>
            </div>
          </div>
        )}

        {/* STEP 2: Team Costs */}
        {activeTab === 1 && (
          <div className={styles.formSection}>
            <h3 style={{ marginBottom: '1.5rem' }}>2. Payroll & Compliance Manpower</h3>
            
            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Number of Payroll Executives*</label>
                  <span className={styles.formDesc} style={{ marginBottom: '0.25rem' }}>Min: 0 - Max: 100</span>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Staff involved in salary processing, corrections & reporting</span>
                </div>
                <div className={styles.stepper}>
                  <button className={styles.stepBtn} onClick={() => handleStepChange('numPayrollExecs', -1, 0, 100)}><Minus size={14} /></button>
                  <span className={styles.stepValue}>{data.numPayrollExecs}</span>
                  <button className={styles.stepBtn} onClick={() => handleStepChange('numPayrollExecs', 1, 0, 100)}><Plus size={14} /></button>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Number of HR / Compliance Staff</label>
                  <span className={styles.formDesc} style={{ marginBottom: '0.25rem' }}>Min: 0 - Max: 100</span>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Handling filings, audits, notices & inspections</span>
                </div>
                <div className={styles.stepper}>
                  <button className={styles.stepBtn} onClick={() => handleStepChange('numHRStaff', -1, 0, 100)}><Minus size={14} /></button>
                  <span className={styles.stepValue}>{data.numHRStaff}</span>
                  <button className={styles.stepBtn} onClick={() => handleStepChange('numHRStaff', 1, 0, 100)}><Plus size={14} /></button>
                </div>
              </div>
            </div>

            <div className={styles.formGroup} style={data.numPayrollExecs === 0 ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Average Monthly Salary – Payroll Executive (₹)*</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Gross monthly salary</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.monthlySalaryPayrollExec)}</div>
              </div>
              <input type="range" min="15000" max="1000000" step="5000" name="monthlySalaryPayrollExec" value={data.monthlySalaryPayrollExec} onChange={handleInputChange} className={styles.slider} disabled={data.numPayrollExecs === 0} />
            </div>

            <div className={styles.formGroup} style={data.numHRStaff === 0 ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Average Monthly Salary – HR / Compliance Staff (₹)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Gross monthly salary</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.monthlySalaryHRStaff)}</div>
              </div>
              <input type="range" min="15000" max="500000" step="5000" name="monthlySalaryHRStaff" value={data.monthlySalaryHRStaff} onChange={handleInputChange} className={styles.slider} disabled={data.numHRStaff === 0} />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Time Spent on Payroll & Compliance (%)*</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Portion of total working time spent by Finance & HR teams on payroll processing, statutory compliance, coordination, and follow-ups</span>
                </div>
                <span className={styles.percentageDisplay}>{data.timeSpentPercent}%</span>
              </div>
              <input type="range" min="0" max="100" step="1" name="timeSpentPercent" value={data.timeSpentPercent} onChange={handleInputChange} className={styles.slider} />
            </div>
          </div>
        )}

        {/* STEP 3: Tech Stack */}
        {activeTab === 2 && (
          <div className={styles.formSection}>
            <h3 style={{ marginBottom: '1.5rem' }}>Monthly Tools</h3>
            
            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Payroll Software Cost (₹ / month)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Monthly subscription for payroll processing software</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.payrollSoftwareCost)}</div>
              </div>
              <input type="range" min="0" max="100000" step="500" name="payrollSoftwareCost" value={data.payrollSoftwareCost} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>HRMS Software Cost (₹ / month)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Employee lifecycle and HR management tools</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.hrmsSoftwareCost)}</div>
              </div>
              <input type="range" min="0" max="100000" step="500" name="hrmsSoftwareCost" value={data.hrmsSoftwareCost} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>TDS / Compliance Tool Cost (₹ / month)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Tools used for tax and statutory compliance filings</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.tdsToolCost)}</div>
              </div>
              <input type="range" min="0" max="100000" step="500" name="tdsToolCost" value={data.tdsToolCost} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.infoAlert} style={{ marginTop: '0', marginBottom: '2rem' }}>
              <ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Multiple tools = integrations, errors & duplicate work.
            </div>

            <h3 style={{ marginBottom: '1.5rem' }}>Annual Services</h3>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>CA / Consultant Fees (₹ / year)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Professional fees for payroll, tax, or compliance support</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.caFees)}</div>
              </div>
              <input type="range" min="0" max="1000000" step="5000" name="caFees" value={data.caFees} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>PF / ESI Vendor / Outsourcing Fees (₹ / year)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Third-party services for statutory processing</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.pfEsiFees)}</div>
              </div>
              <input type="range" min="0" max="1000000" step="5000" name="pfEsiFees" value={data.pfEsiFees} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.infoAlert} style={{ backgroundColor: '#fff7ed', color: '#c2410c', marginTop: '0' }}>
              ⚠️ Using multiple vendors increases cost, dependency and compliance blind spots.
            </div>
          </div>
        )}

        {/* STEP 4: Compliance Risk */}
        {activeTab === 3 && (
          <div className={styles.formSection}>
            <h3 style={{ marginBottom: '1.5rem' }}>Errors & Penalties</h3>
            
            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Payroll Errors per Year</label>
                  <span className={styles.formDesc} style={{ marginBottom: '0.25rem' }}>Min: 0 - Max: 100</span>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Errors requiring correction, reprocessing or employee escalation</span>
                </div>
                <div className={styles.stepper}>
                  <button className={styles.stepBtn} onClick={() => handleStepChange('payrollErrorsPerYear', -1, 0, 100)}><Minus size={14} /></button>
                  <span className={styles.stepValue}>{data.payrollErrorsPerYear}</span>
                  <button className={styles.stepBtn} onClick={() => handleStepChange('payrollErrorsPerYear', 1, 0, 100)}><Plus size={14} /></button>
                </div>
              </div>
            </div>

            <div className={`${styles.formGroup} ${data.payrollErrorsPerYear === 0 ? styles.disabledGroup : ''}`}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Average Cost per Payroll Error (₹)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Includes rework, employee dissatisfaction & management effort</span>
                </div>
                <div className={styles.currencyDisplay}>
                  {formatINRCurrency(data.payrollErrorsPerYear === 0 ? 0 : data.costPerError)}
                </div>
              </div>
              <input 
                type="range" min="0" max="100000" step="1000" 
                name="costPerError" 
                value={data.payrollErrorsPerYear === 0 ? 0 : data.costPerError} 
                onChange={handleInputChange} 
                className={styles.slider} 
                disabled={data.payrollErrorsPerYear === 0}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Statutory Penalties (Last 12 Months) (₹)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> PF, ESI, TDS, or other statutory penalties</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.statutoryPenalties)}</div>
              </div>
              <input type="range" min="0" max="100000" step="1000" name="statutoryPenalties" value={data.statutoryPenalties} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Interest on Delayed Statutory Payments (₹)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Interest paid due to delayed filings or payments</span>
                </div>
                <div className={styles.currencyDisplay}>{formatINRCurrency(data.interestDelayed)}</div>
              </div>
              <input type="range" min="0" max="100000" step="1000" name="interestDelayed" value={data.interestDelayed} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Notices Received from Authorities*</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Income Tax, PF, ESI, or labour department notices</span>
                </div>
                <select 
                  name="noticesReceived" 
                  value={data.noticesReceived} 
                  onChange={handleInputChange} 
                  className={styles.customSelect}
                >
                  <option value="Select value" disabled>Select value</option>
                  <option value="✅ None">✅ None</option>
                  <option value="⚠️ 1–2">⚠️ 1–2</option>
                  <option value="🚨 Multiple">🚨 Multiple</option>
                </select>
              </div>
            </div>

            <div className={styles.disclaimerBlock}>
              <p>📌 Compliance issues don’t just cost money. They consume leadership bandwidth and damage employer credibility.</p>
            </div>
          </div>
        )}

        {/* STEP 5: Subscription & Utilisation */}
        {activeTab === 4 && (
          <div className={styles.formSection}>
            <h3 style={{ marginBottom: '1.5rem' }}>5. yfy® Subscription & Utilisation</h3>

            <div className={styles.formGroup}>
              <div className={styles.formHeader}>
                <div className={styles.labelWrapper}>
                  <label className={styles.formLabel}>Monthly Subscription per Employee (₹)</label>
                  <span className={styles.formDesc}><ArrowRight size={14} style={{ marginBottom: '-2px', marginRight: '4px' }} /> Upper-range estimate. Volume discounts may apply.</span>
                </div>
                <div className={styles.currencyDisplay}>₹{data.monthlySubscriptionConfig}</div>
              </div>
              <input type="range" min="0" max="200" step="10" name="monthlySubscriptionConfig" value={data.monthlySubscriptionConfig} onChange={handleInputChange} className={styles.slider} />
            </div>

            <div className={styles.formGroup} style={{ marginTop: '2.5rem' }}>
              <div className={styles.labelWrapper} style={{ marginBottom: '1.25rem' }}>
                <label className={styles.formLabel}>How Deeply Are You Automating Payroll & Compliance?</label>
                <span className={styles.formDesc}>💡 Higher utilisation directly improves ROI and reduces compliance exposure.</span>
              </div>
              
              <div className={styles.utilGrid}>
                {Object.keys(utilizationStats).map((level) => {
                  let desc = "";
                  let stats = [];
                  let IconComponent = User;
                  
                  if(level === 'Conservative Use') {
                    desc = "Partial automation with manual oversight";
                    stats = [
                      { label: "Payroll effort reduced by:", value: "35 %" },
                      { label: "Compliance effort reduced by:", value: "45 %" },
                      { label: "Penalty risk reduction:", value: "45 %" },
                      { label: "Error reduction:", value: "40 %" }
                    ];
                    IconComponent = User;
                  } else if(level === 'Moderate Use') {
                    desc = "Automation across most workflows";
                    stats = [
                      { label: "Payroll effort reduced by:", value: "60 %" },
                      { label: "Compliance effort reduced by:", value: "65 %" },
                      { label: "Penalty risk reduction:", value: "85 %" },
                      { label: "Error reduction:", value: "70 %" }
                    ];
                    IconComponent = Cpu;
                  } else {
                    desc = "Full automation & max efficiency";
                    stats = [
                      { label: "Payroll effort reduced by:", value: "85 %" },
                      { label: "Compliance effort reduced by:", value: "80 %" },
                      { label: "Penalty risk reduction:", value: "98 %" },
                      { label: "Error reduction:", value: "95 %" }
                    ];
                    IconComponent = Zap;
                  }

                  const isActive = data.utilizationLevel === level;

                  return (
                    <div 
                      key={level}
                      className={`${styles.utilCard} ${isActive ? styles.active : ''}`} 
                      onClick={() => handleToggle('utilizationLevel', level)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <IconComponent size={20} style={{ color: isActive ? 'var(--accent-purple)' : '#9ca3af' }} />
                        <div className={styles.utilTitle} style={{ margin: 0, paddingBottom: 0 }}>{level}</div>
                      </div>
                      <div className={styles.formDesc} style={{ textAlign: 'center', marginBottom: '0.75rem', color: '#9ca3af' }}>{desc}</div>
                      
                      {isActive && (
                        <div className={styles.utilStats} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '8px' }}>
                          {stats.map((stat, i) => (
                            <div key={i} style={{ borderBottom: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: i < stats.length - 1 ? '0.25rem' : 0 }}>
                              <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{stat.label}</div>
                              <div style={{ color: 'var(--accent-green)', fontWeight: '600', fontSize: '1rem' }}>{stat.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.disclaimerBlock} style={{ marginTop: '2rem' }}>
              <p>📌 <strong style={{ color: '#eab308' }}>Compliance Disclaimer:</strong> Compliance effort and risk reduction percentages do not imply elimination of statutory obligations. Certain manual oversight may still be required.</p>
            </div>
          </div>
        )}

        {/* STEP 6: Impact & ROI */}
        {activeTab === 5 && (
          <div className={styles.formSection}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(155, 61, 216, 0.1)', color: 'var(--brand-light)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600, border: '1px solid rgba(155, 61, 216, 0.3)', marginBottom: '1rem' }}>
                <Target size={16} /> Business Impact Assessment
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Your Projected ROI</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Based on your inputs and selected automation tier.</p>
            </div>

            {/* Section 1: Executive KPI Snapshot */}
            <h3 style={{ marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
              <BarChart3 size={24} color="var(--brand-light)" /> Executive KPI Snapshot
            </h3>
            <div className={styles.metricGrid}>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={16} /> Current Annual Cost
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{formatINRCurrency(currentAnnualCost)}</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '1rem', lineHeight: 1.4 }}>Total cost including manpower, tools, vendors, and penalties.</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bot size={16} color="var(--brand-light)" /> Cost After yfy®
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-light)' }}>{formatINRCurrency(costAfterYfy)}</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '1rem', lineHeight: 1.4 }}>Subscription + residual operational costs.</div>
              </div>

              <div style={{ background: 'linear-gradient(145deg, rgba(155, 61, 216, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)', border: '1px solid rgba(155, 61, 216, 0.4)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(155, 61, 216, 0.1)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Wallet size={16} color="var(--brand-light)" /> Net Annual Impact
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: netAnnualSavings > 0 ? 'var(--accent-green)' : '#ff4b2b' }}>
                  {formatINRCurrency(netAnnualSavings)}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '1rem', lineHeight: 1.4 }}>
                  {netAnnualSavings > 0 ? '▲ Positive / Cost Savings' : '▼ Negative / Cost Increase'}
                </div>
              </div>

              <div style={{ background: 'linear-gradient(145deg, rgba(155, 61, 216, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)', border: '1px solid rgba(155, 61, 216, 0.4)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(155, 61, 216, 0.1)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={16} color="var(--brand-light)" /> ROI (%)
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: roiPercentage > 0 ? 'var(--accent-green)' : '#ff4b2b' }}>
                  {formatNumber(roiPercentage)}%
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '1rem', lineHeight: 1.4 }}>ROI improves with higher utilization and automation.</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} /> Payback Period
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{Math.floor(paybackPeriod)} <span style={{ fontSize: '1rem', fontWeight: 400, color: '#9ca3af' }}>Months</span></div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '1rem', lineHeight: 1.4 }}>Time needed to recover investment.</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={16} /> One-Time Setup Cost
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{formatINRCurrency(oneTimeSetupCost)}</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '1rem', lineHeight: 1.4 }}>Manual setup and onboarding cost.</div>
              </div>

            </div>

            {/* Section 2: Efficiency & Workforce Impact */}
            <h3 style={{ marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
              <Zap size={24} color="var(--brand-light)" /> Efficiency & Workforce Impact
            </h3>
            <div className={styles.threeColumnGrid}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📉 Payroll Effort Reduced
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-green)' }}>{Math.round(util.payroll * 100)}%</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🛡️ Compliance Effort Reduced
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-green)' }}>{Math.round(util.compliance * 100)}%</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  👥 FTE Capacity Freed
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{monthlyHoursFreed} <span style={{ fontSize: '1rem', fontWeight: 400, color: '#9ca3af' }}>hrs/mo</span></div>
              </div>
            </div>

            {/* Section 3: Risk & Error Reduction */}
            <h3 style={{ marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
              <ShieldCheck size={24} color="var(--brand-light)" /> Risk & Error Reduction
            </h3>
            <div className={styles.metricGrid}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⚠️ Human Errors Prevented
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-green)' }}>{Math.round(util.error * 100)}%</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ❗ Penalty Exposure Avoided
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-green)' }}>{Math.round(util.penalty * 100)}%</div>
              </div>
            </div>
            
            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setActiveTab(6)}>
              Request Detailed PDF Report 📩
            </button>
          </div>
        )}

        {/* STEP 7: Lead Gen Form */}
        {activeTab === 6 && (
          <div className={styles.formSection}>
            {isSuccess ? (
              <div className={styles.successState}>
                <CheckCircle size={64} color="var(--accent-green)" style={{ marginBottom: '1.5rem' }} />
                <h3>Report Generated Successfully!</h3>
                <p>Your report has been successfully sent. Please review it and feel free to contact us if you need any clarification or consultation.</p>
                <button className="btn btn-ghost" onClick={() => { 
                  setData(getInitialState());
                  setIsSuccess(false); 
                  setActiveTab(0); 
                }} style={{ marginTop: '2rem' }}>
                  Calculate Again
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ marginBottom: '1rem' }}>Final Step: Get Your Custom ROI Report</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  Enter your details to receive a comprehensive PDF audit of your payroll efficiency and savings projections via email.
                </p>
                
                <form className={styles.leadForm} onSubmit={handleSendReport}>
                  <div className={styles.inputIconGroup}>
                    <User size={18} className={styles.inputIcon} />
                    <input 
                      type="text" 
                      name="leadName" 
                      placeholder="Your Full Name" 
                      required 
                      value={data.leadName} 
                      onChange={handleInputChange} 
                      className={styles.leadInput}
                    />
                  </div>
                  
                  <div className={styles.inputIconGroup}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input 
                      type="email" 
                      name="leadEmail" 
                      placeholder="Professional Email ID" 
                      required 
                      value={data.leadEmail} 
                      onChange={handleInputChange} 
                      className={styles.leadInput}
                    />
                  </div>
                  
                  <div className={styles.inputIconGroup}>
                    <Building2 size={18} className={styles.inputIcon} />
                    <input 
                      type="text" 
                      name="leadOrg" 
                      placeholder="Organisation Name" 
                      required 
                      value={data.leadOrg} 
                      onChange={handleInputChange} 
                      className={styles.leadInput}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={isSending}
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    {isSending ? 'Generating PDF...' : 'Download PDF Report 📥'}
                  </button>
                </form>
              </>
            )}

            {/* Hidden PDF Template for Generation */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
              <ROIPdfTemplate 
                currentAnnualCost={currentAnnualCost}
                costAfterYfy={costAfterYfy}
                netAnnualSavings={netAnnualSavings}
                roiPercentage={roiPercentage}
                paybackPeriod={paybackPeriod}
                oneTimeSetupCost={oneTimeSetupCost}
                util={util}
                monthlyHoursFreed={monthlyHoursFreed}
              />
            </div>

          </div>
        )}

        {/* Navigation Controls */}
        <div className={styles.actionBtns}>
          {!isSuccess && (
            <>
              <button 
                className="btn btn-ghost" 
                onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
                style={{ visibility: activeTab === 0 ? 'hidden' : 'visible' }}
              >
                ← Back
              </button>
              {activeTab < 6 && (
                <button 
                  className="btn btn-outline" 
                  onClick={() => {
                    if (activeTab === 0 && data.numEmployees <= 20) return; // Block on Tab 1
                    if (activeTab === 3 && data.noticesReceived === 'Select value') return; // Block on Tab 4
                    if (activeTab === 4 && data.utilizationLevel === '') return; // Block on Tab 5
                    setActiveTab(prev => Math.min(6, prev + 1));
                  }}
                  style={((activeTab === 0 && data.numEmployees <= 20) || (activeTab === 3 && data.noticesReceived === 'Select value') || (activeTab === 4 && data.utilizationLevel === '')) ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                  Next →
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* RIGHT PANEL SUMMARY */}
      <div className={styles.rightPanel}>
        <div className={styles.summaryTitle}>Assessment Summary</div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total Employees</span>
          <span className={styles.summaryValue}>{formatNumber(data.numEmployees)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Multi State</span>
          <span className={styles.summaryValue}>{data.operationalPresence === 'Multi-State' ? 'True' : 'False'}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Pay Cycles</span>
          <span className={styles.summaryValue}>{data.numPayCycles === 1 ? 'Single' : 'Multiple'}</span>
        </div>
        {activeTab >= 4 && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Utilisation Level</span>
            <span className={styles.summaryValue}>{data.utilizationLevel}</span>
          </div>
        )}
        
        {activeTab > 0 && (
          <>
            <div className={styles.summaryDivider}></div>
            
            {/* Show Staff Cost from Tab 2 onwards */}
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Annual Staff Cost</span>
              <span className={styles.summaryValue} style={{ color: '#ff4b2b' }}>
                {formatINRCurrency(annualStaffCost)}
              </span>
            </div>

            {/* Show Software & Vendor Cost from Tab 3 onwards */}
            {activeTab > 1 && (
              <div className={styles.summaryRow} style={{ marginTop: '0.75rem' }}>
                <span className={styles.summaryLabel}>Annual Software & Vendor Costs</span>
                <span className={styles.summaryValue} style={{ color: '#ff4b2b' }}>
                  {formatINRCurrency(annualSoftwareVendorCost)}
                </span>
              </div>
            )}

            {/* Show Errors & Penalties Cost from Tab 4 onwards */}
            {activeTab > 2 && (
              <div className={styles.summaryRow} style={{ marginTop: '0.75rem' }}>
                <span className={styles.summaryLabel}>Cost of Errors & Penalties</span>
                <span className={styles.summaryValue} style={{ color: '#ff4b2b' }}>
                  {formatINRCurrency(annualErrorPenaltyCost)}
                </span>
              </div>
            )}

            {/* Show Full Implementation & Savings Breakdown from Tab 5 onwards */}
            {activeTab > 3 && (
              <>
                <div className={styles.summaryDivider}></div>
                
                <div className={styles.summaryRow} style={{ marginTop: '0.75rem', fontWeight: 700 }}>
                  <span className={styles.summaryLabel}>Current Annual Cost</span>
                  <span className={styles.summaryValue} style={{ color: '#ff4b2b' }}>
                    {formatINRCurrency(currentAnnualCost)}
                  </span>
                </div>
                
                <div className={styles.summaryRow} style={{ marginTop: '1.5rem' }}>
                  <span className={styles.summaryLabel}>Annual yfy® Subscription</span>
                  <span className={styles.summaryValue}>
                    {formatINRCurrency(annualSubscriptionCost)}
                  </span>
                </div>
                
                <div className={styles.summaryRow} style={{ marginTop: '0.75rem' }}>
                  <span className={styles.summaryLabel}>One-Time Setup Cost</span>
                  <span className={styles.summaryValue}>
                    {formatINRCurrency(oneTimeSetupCost)}
                  </span>
                </div>

                <div className={styles.summaryRow} style={{ marginTop: '0.75rem' }}>
                  <span className={styles.summaryLabel}>Residual Other Costs</span>
                  <span className={styles.summaryValue}>
                    {formatINRCurrency(yfyTotalOtherCosts)}
                  </span>
                </div>

                <div className={styles.summaryRow} style={{ marginTop: '1.5rem', fontWeight: 700 }}>
                  <span className={styles.summaryLabel}>Cost After yfy®</span>
                  <span className={styles.summaryValue} style={{ color: 'var(--accent-green)' }}>
                    {formatINRCurrency(costAfterYfy)}
                  </span>
                </div>
              </>
            )}
          </>
        )}
        
        {activeTab === 6 && !isSuccess && (
          <div className={styles.floatingPreview}>
            <div className={styles.previewBadge}>Report Preview</div>
            <p>Analysis for <strong>{data.leadOrg || 'Your Org'}</strong></p>
          </div>
        )}

        <div className={styles.disclaimerMini}>
          📌 Calculations are based on industry benchmarks for Indian payroll compliance costs.
        </div>
      </div>
    </div>
  );
}
