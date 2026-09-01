"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import styles from './ComplianceProofPack.module.css';
import { useSearchParams } from 'next/navigation';

export default function ComplianceProofPackPage() {
  const searchParams = useSearchParams();
  
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    
    // Step 2 fields
    companyName: '',
    phone: '',
    deployedWorkers: '',
    statesOperating: '',
    clientAuditFrequency: '',
    clientProfile: ''
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitStep1 = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        full_name: formData.fullName,
        work_email: formData.workEmail,
        persona: 'agency',
        lead_type: 'compliance_proof_pack',
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        landing_page: typeof window !== 'undefined' ? window.location.href : '',
        page_variant: 'compliance_proof_pack_default'
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
      // Validate phone number (very basic check for exactly 10 digits as requested)
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length !== 10) {
        throw new Error("Please enter a valid 10-digit Indian phone number.");
      }

      const payload = {
        id: leadId, // Update existing lead
        company_name: formData.companyName,
        phone: formData.phone,
        deployed_workers: formData.deployedWorkers,
        states_operating: formData.statesOperating,
        clients_audit_compliance: formData.clientAuditFrequency,
        client_profile: formData.clientProfile
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
      showToast("Thank you! Your request is confirmed.");
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
            <span className={styles.vipText}>STAFFING & AGENCIES</span>
          </div>
          
          <h1 className={styles.title}>
            Get Your Compliance Proof Pack
          </h1>
          <p className={styles.subtitle}>
            See what your clients will find when they audit you — before they do. Generate airtight proof of compliance to win larger enterprise contracts.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Pre-empt audits</h4>
                <p className={styles.featureDesc}>Know exactly how your registers and challans look to an auditor.</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Win better clients</h4>
                <p className={styles.featureDesc}>Enterprise clients demand transparency. Give them irrefutable proof.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Scale operations</h4>
                <p className={styles.featureDesc}>Manage multi-state deployments without compliance bottlenecks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Intent Lead Form */}
        <div className={`${styles.rightCol} reveal reveal-delay-2`}>
          <div className={styles.formCard}>
            
            {isSuccess ? (
              <div className={styles.formHeader} style={{textAlign: 'center', padding: '2rem 0'}}>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
                  <CheckCircle2 color="#22D3A0" size={64} />
                </div>
                <h3 className={styles.formTitle}>Request Received</h3>
                <p className={styles.formSubtitle}>
                  Our compliance team will review your details and contact you shortly with your personalized proof pack.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>
                    {step === 1 ? "Start Your Pack" : "A few more details"}
                  </h3>
                  <p className={styles.formSubtitle}>
                    {step === 1 ? "Enter your work email to get started." : "Help us customize your proof pack."}
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
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Company Name</label>
                      <input 
                        required 
                        type="text" 
                        name="companyName"
                        className={styles.input} 
                        placeholder="Your Agency Name"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Phone Number (India)</label>
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

                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>Deployed Workers</label>
                        <select 
                          required 
                          name="deployedWorkers"
                          className={`${styles.input} ${styles.select}`}
                          value={formData.deployedWorkers}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Select count</option>
                          <option value="Under 1000">Under 1000</option>
                          <option value="1000-5000">1000 - 5000</option>
                          <option value="5000+">5000+</option>
                        </select>
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>States Operating In</label>
                        <select 
                          required 
                          name="statesOperating"
                          className={`${styles.input} ${styles.select}`}
                          value={formData.statesOperating}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Select states</option>
                          <option value="1-2 states">1-2 states</option>
                          <option value="3-5 states">3-5 states</option>
                          <option value="6+ states">6+ states</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>How often do clients audit your compliance?</label>
                      <select 
                        required 
                        name="clientAuditFrequency"
                        className={`${styles.input} ${styles.select}`}
                        value={formData.clientAuditFrequency}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select frequency</option>
                        <option value="Rarely">Rarely</option>
                        <option value="Occasionally">Occasionally (Annual)</option>
                        <option value="Regularly">Regularly (Quarterly)</option>
                        <option value="Every Billing Cycle">Every Billing Cycle (Monthly)</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Primary Client Profile</label>
                      <select 
                        required 
                        name="clientProfile"
                        className={`${styles.input} ${styles.select}`}
                        value={formData.clientProfile}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select profile</option>
                        <option value="MSMEs">MSMEs</option>
                        <option value="Large Domestic">Large Domestic Enterprises</option>
                        <option value="Listed/MNC">Listed Companies / MNCs</option>
                      </select>
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
                          <>Get Proof Pack <ArrowRight size={18} /></>
                        )}
                      </button>
                      <p className={styles.termsDoc}>
                        By submitting this form, you agree to our <a href="/legal/privacy" className={styles.termsLink}>Privacy Policy</a> and authorize yfy® to contact you.
                      </p>
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
