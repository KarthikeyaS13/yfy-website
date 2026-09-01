"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import styles from './ExposureReport.module.css';
import { useSearchParams } from 'next/navigation';

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", 
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

export default function ExposureReportPage() {
  const searchParams = useSearchParams();
  
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState(null);
  
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    workEmail: '',
    phone: '',
    companyName: '',
    
    // Step 2
    jobTitle: '',
    industry: '',
    ownEmployees: '',
    contractWorkers: '',
    numContractors: '',
    statesOperating: [],
    numSites: '',
    monthlyContractorSpend: '',
    attendanceCapture: '',
    challansCollected: '',
    currentApproach: [],
    trigger: '',
    shareData: '',
    notes: '',
    consent: false
  });

  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && (name === 'currentApproach' || name === 'statesOperating')) {
      setFormData(prev => {
        const selectedSet = new Set(prev[name] || []);
        if (checked) selectedSet.add(value);
        else selectedSet.delete(value);
        return { ...prev, [name]: Array.from(selectedSet) };
      });
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'select-multiple') {
      const options = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, [name]: options }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const submitStep1 = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length !== 10) {
        throw new Error("Please enter a valid 10-digit Indian phone number.");
      }

      const payload = {
        full_name: formData.fullName,
        work_email: formData.workEmail,
        phone: formData.phone,
        company_name: formData.companyName,
        persona: 'pe',
        lead_type: 'exposure_report',
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        landing_page: typeof window !== 'undefined' ? window.location.href : '',
        page_variant: 'exposure_report_default'
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit details');
      }

      setLeadId(data.id);
      setStep(2);
      
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitStep2 = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      if (!formData.consent) {
        throw new Error("You must agree to the privacy policy to continue.");
      }

      const payload = {
        id: leadId,
        job_title: formData.jobTitle,
        industry: formData.industry,
        own_employees: formData.ownEmployees,
        contract_workers: formData.contractWorkers,
        num_contractors: formData.numContractors,
        states_operating: formData.statesOperating.join(', '),
        num_sites: formData.numSites,
        monthly_contractor_spend: formData.monthlyContractorSpend,
        attendance_capture: formData.attendanceCapture,
        challans_collected: formData.challansCollected,
        current_approach: formData.currentApproach.join(', '),
        trigger: formData.trigger,
        can_share_data: formData.shareData,
        notes: formData.notes,
        consent: formData.consent ? 'Yes' : 'No'
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit details');
      }

      setIsSuccess(true);
      showToast("Thank you! Your report request is confirmed.");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.demoPage}>
      {/* Background Orbs */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className={`container ${styles.containerContent}`}>
        
        {/* Left Column: Copy & Trust Signals */}
        <div className={`${styles.leftCol} reveal`}>
          <div className={styles.vipBadge}>
            <div className={styles.vipDot} />
            <span className={styles.vipText}>PRINCIPAL EMPLOYER</span>
          </div>
          
          <h1 className={styles.title} style={{fontSize: '3rem', lineHeight: '1.2'}}>
            Find out what your contractors are shorting you into
          </h1>
          <p className={styles.subtitle} style={{fontSize: '1.1rem', color: '#ccc', marginBottom: '2rem'}}>
            Send us three months of contractor invoices, your attendance records and the states you operate in. We run them through the same statutory engine our customers use to release payments, and hand you back a report: claimed versus statutorily eligible, per contractor, per site, with the residual liability sized.
            <br/><br/>
            <strong style={{color: '#fff'}}>Nothing is installed. Nothing is migrated. You get a report.</strong>
          </p>

          <h4 style={{color: '#fff', marginBottom: '1rem', fontSize: '1.2rem'}}>What you'll receive</h4>
          <div className={styles.featureList} style={{gap: '1.25rem', marginBottom: '2.5rem'}}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <p className={styles.featureDesc} style={{fontSize: '1rem'}}><strong style={{color: '#fff'}}>Per-contractor variance:</strong> what was billed against what the statute requires</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <p className={styles.featureDesc} style={{fontSize: '1rem'}}><strong style={{color: '#fff'}}>Minimum wage shortfalls</strong> by state, zone and skill category</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <p className={styles.featureDesc} style={{fontSize: '1rem'}}><strong style={{color: '#fff'}}>PF, ESI and bonus reconciliation gaps</strong> against the challans you were given</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <p className={styles.featureDesc} style={{fontSize: '1rem'}}><strong style={{color: '#fff'}}>Your residual exposure</strong> under CLRA §21, EPF §8A and ESI §40, sized</p>
              </div>
            </div>
          </div>

          <div style={{padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)'}}>
            <h4 style={{color: '#fff', marginBottom: '0.75rem', fontSize: '1.1rem'}}>What we need from you</h4>
            <p style={{color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6'}}>
              Three months of contractor invoices, your contract worker attendance in whatever form you hold it, your site list with states, and the PF/ESI challans your contractors provided.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
               <div style={{flex: '1 1 120px'}}>
                 <strong style={{color: '#fff', fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem'}}>Turnaround</strong>
                 <p style={{color: '#aaa', fontSize: '0.9rem'}}>10 working days</p>
               </div>
               <div style={{flex: '1 1 200px'}}>
                 <strong style={{color: '#fff', fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem'}}>Privacy</strong>
                 <p style={{color: '#aaa', fontSize: '0.9rem'}}>Under NDA. We sign yours or send ours. Data is deleted on request at the end of the engagement.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Intent Lead Form */}
        <div className={`${styles.rightCol} reveal reveal-delay-2`}>
          <div className={styles.formCard} style={{maxHeight: '85vh', overflowY: 'auto'}}>
            
            {isSuccess ? (
              <div className={styles.formHeader} style={{textAlign: 'center', padding: '2rem 0'}}>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
                  <CheckCircle2 color="#22D3A0" size={64} />
                </div>
                <h3 className={styles.formTitle}>Request Received</h3>
                <p className={styles.formSubtitle}>
                  Our compliance team will review your details and contact you shortly with your personalized exposure report.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>
                    {step === 1 ? "Start Your Report" : "A few more details"}
                  </h3>
                  <p className={styles.formSubtitle}>
                    {step === 1 ? "Enter your details to get started." : "Help us customize your compliance analysis."}
                  </p>
                </div>

                {step === 1 && (
                  <form onSubmit={submitStep1} className={styles.formFields}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Full Name</label>
                      <input 
                        required 
                        type="text" 
                        name="fullName"
                        className={styles.input} 
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Work Email</label>
                      <input 
                        required 
                        type="email" 
                        name="workEmail"
                        className={styles.input} 
                        placeholder="john@company.com"
                        value={formData.workEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Phone Number</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span className={styles.input} style={{width: 'auto', background: 'rgba(255,255,255,0.05)', color: '#888'}}>
                          +91
                        </span>
                        <input 
                          required 
                          type="tel" 
                          name="phone"
                          className={styles.input} 
                          style={{ flex: 1 }}
                          placeholder="98765 43210"
                          value={formData.phone}
                          maxLength={10}
                          onChange={(e) => {
                            setFormData({...formData, phone: e.target.value.replace(/\D/g, "")});
                            setSubmitError(null);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Company Name</label>
                      <input 
                        required 
                        type="text" 
                        name="companyName"
                        className={styles.input} 
                        placeholder="Your Organization"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                    </div>

                    {submitError && (
                      <div style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 'bold', marginTop: '1rem', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        ⚠️ {submitError}
                      </div>
                    )}

                    <div className={styles.formFooter}>
                      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Processing... <Loader2 className={styles.spinner} size={18} /></>
                        ) : (
                          <>Next Step <ArrowRight size={18} /></>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={submitStep2} className={styles.formFields}>
                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>Job Title</label>
                        <select required name="jobTitle" className={`${styles.input} ${styles.select}`} value={formData.jobTitle} onChange={handleInputChange}>
                          <option value="" disabled>Select role</option>
                          <option value="Plant Head">Plant Head</option>
                          <option value="HR Head / CHRO">HR Head / CHRO</option>
                          <option value="IR / Compliance Manager">IR / Compliance Manager</option>
                          <option value="CFO / Finance Head">CFO / Finance Head</option>
                          <option value="Procurement">Procurement</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>Industry</label>
                        <select required name="industry" className={`${styles.input} ${styles.select}`} value={formData.industry} onChange={handleInputChange}>
                          <option value="" disabled>Select industry</option>
                          <option value="Pharma / API">Pharma / API</option>
                          <option value="Auto components">Auto components</option>
                          <option value="FMCG & food processing">FMCG & food processing</option>
                          <option value="Engineering & metals">Engineering & metals</option>
                          <option value="EPC & infrastructure">EPC & infrastructure</option>
                          <option value="Logistics & warehousing">Logistics & warehousing</option>
                          <option value="Textiles">Textiles</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>Own Employees</label>
                        <select required name="ownEmployees" className={`${styles.input} ${styles.select}`} value={formData.ownEmployees} onChange={handleInputChange}>
                          <option value="" disabled>Select count</option>
                          <option value="Under 100">Under 100</option>
                          <option value="100–500">100–500</option>
                          <option value="500–1,000">500–1,000</option>
                          <option value="1,000–5,000">1,000–5,000</option>
                          <option value="5,000+">5,000+</option>
                        </select>
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>Contract Workers</label>
                        <select required name="contractWorkers" className={`${styles.input} ${styles.select}`} value={formData.contractWorkers} onChange={handleInputChange}>
                          <option value="" disabled>Select count</option>
                          <option value="Under 100">Under 100</option>
                          <option value="100–500">100–500</option>
                          <option value="500–2,000">500–2,000</option>
                          <option value="2,000–5,000">2,000–5,000</option>
                          <option value="5,000+">5,000+</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>Number of Contractors</label>
                        <select required name="numContractors" className={`${styles.input} ${styles.select}`} value={formData.numContractors} onChange={handleInputChange}>
                          <option value="" disabled>Select count</option>
                          <option value="1–5">1–5</option>
                          <option value="6–15">6–15</option>
                          <option value="16–50">16–50</option>
                          <option value="50+">50+</option>
                        </select>
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>Monthly Contractor Spend</label>
                        <select required name="monthlyContractorSpend" className={`${styles.input} ${styles.select}`} value={formData.monthlyContractorSpend} onChange={handleInputChange}>
                          <option value="" disabled>Select spend</option>
                          <option value="Under ₹25L">Under ₹25L</option>
                          <option value="₹25L–1Cr">₹25L–1Cr</option>
                          <option value="₹1–5Cr">₹1–5Cr</option>
                          <option value="₹5Cr+">₹5Cr+</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>States Operating In (Select all that apply)</label>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', maxHeight: '160px', overflowY: 'auto'}}>
                          {INDIAN_STATES.map(state => (
                             <label key={state} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ccc', fontSize: '0.9rem', cursor: 'pointer'}}>
                               <input type="checkbox" name="statesOperating" value={state} checked={formData.statesOperating.includes(state)} onChange={handleInputChange} />
                               {state}
                             </label>
                          ))}
                        </div>
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>Number of Sites</label>
                        <select required name="numSites" className={`${styles.input} ${styles.select}`} value={formData.numSites} onChange={handleInputChange}>
                          <option value="" disabled>Select sites</option>
                          <option value="1">1</option>
                          <option value="2–5">2–5</option>
                          <option value="6–15">6–15</option>
                          <option value="16+">16+</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>How do you currently capture attendance?</label>
                      <select required name="attendanceCapture" className={`${styles.input} ${styles.select}`} value={formData.attendanceCapture} onChange={handleInputChange}>
                        <option value="" disabled>Select method</option>
                        <option value="Biometric at gate">Biometric at gate</option>
                        <option value="Manual muster register">Manual muster register</option>
                        <option value="Contractor-provided sheets">Contractor-provided sheets</option>
                        <option value="We don't capture it">We don't capture it</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Do you collect PF/ESI challans?</label>
                      <select required name="challansCollected" className={`${styles.input} ${styles.select}`} value={formData.challansCollected} onChange={handleInputChange}>
                        <option value="" disabled>Select frequency</option>
                        <option value="Always">Always</option>
                        <option value="Sometimes">Sometimes</option>
                        <option value="Rarely">Rarely</option>
                        <option value="Never">Never</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Current approach to compliance (Select all that apply)</label>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)'}}>
                        {["External compliance consultancy", "In-house team", "Our HRMS", "Excel", "Nothing formal"].map(opt => (
                           <label key={opt} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ccc', fontSize: '0.9rem', cursor: 'pointer'}}>
                             <input type="checkbox" name="currentApproach" value={opt} checked={formData.currentApproach.includes(opt)} onChange={handleInputChange} />
                             {opt}
                           </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>What triggered your interest today?</label>
                      <select required name="trigger" className={`${styles.input} ${styles.select}`} value={formData.trigger} onChange={handleInputChange}>
                        <option value="" disabled>Select trigger</option>
                        <option value="Upcoming labour inspection">Upcoming labour inspection</option>
                        <option value="Client or parent-company audit">Client or parent-company audit</option>
                        <option value="Labour Codes transition">Labour Codes transition</option>
                        <option value="Past penalty or notice">Past penalty or notice</option>
                        <option value="New plant or state">New plant or state</option>
                        <option value="General review">General review</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label} style={{marginBottom: '0.5rem', display: 'block'}}>Will you be able to share data securely?</label>
                      <div style={{display: 'flex', gap: '1rem'}}>
                        <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem'}}>
                          <input type="radio" name="shareData" value="Yes" required checked={formData.shareData === 'Yes'} onChange={handleInputChange} /> Yes
                        </label>
                        <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem'}}>
                          <input type="radio" name="shareData" value="Yes, with internal approval" required checked={formData.shareData === 'Yes, with internal approval'} onChange={handleInputChange} /> Yes, with internal approval
                        </label>
                        <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem'}}>
                          <input type="radio" name="shareData" value="Not yet" required checked={formData.shareData === 'Not yet'} onChange={handleInputChange} /> Not yet
                        </label>
                      </div>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Any specific notes or areas of concern?</label>
                      <textarea 
                        name="notes"
                        className={styles.input} 
                        style={{minHeight: '80px', padding: '12px'}}
                        placeholder="Optional details..."
                        value={formData.notes}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className={styles.fieldGroup}>
                      <label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#ccc', fontSize: '0.85rem', cursor: 'pointer', lineHeight: '1.4'}}>
                        <input type="checkbox" name="consent" required checked={formData.consent} onChange={handleInputChange} style={{marginTop: '3px'}} />
                        <span>I agree to the <a href="/legal/privacy" className={styles.termsLink} target="_blank">Privacy Policy</a> and consent to being contacted by yfy regarding my exposure report.</span>
                      </label>
                    </div>

                    {submitError && (
                      <div style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 'bold', marginTop: '1rem', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        ⚠️ {submitError}
                      </div>
                    )}

                    <div className={styles.formFooter}>
                      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Submitting... <Loader2 className={styles.spinner} size={18} /></>
                        ) : (
                          <>Get Report <ArrowRight size={18} /></>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
