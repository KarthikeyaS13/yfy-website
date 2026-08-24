'use client';
import { useState, useEffect } from 'react';
import styles from './PartnerApplyForm.module.css';
import { Send, CheckCircle2, Loader2, ArrowRight, Building2, Users, Mail, Phone, User, Zap, Rocket, TrendingUp } from 'lucide-react';

export default function PartnerApplyForm({ type, title }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    clientCount: '', 
    process: '',     
    interest: [],    
    industries: '',  
    message: ''
  });

  // Initialize defaults based on type
  useEffect(() => {
    if (type === 'ca-accountants') {
      setFormData(prev => ({ ...prev, clientCount: '1-10', process: 'Manual' }));
    } else if (type === 'hr-consultants') {
      setFormData(prev => ({ ...prev, clientCount: '1-5', process: 'Scaling services' }));
    } else if (type === 'recruitment-agencies') {
      setFormData(prev => ({ ...prev, clientCount: '1-10', process: 'No' }));
    } else if (type === 'saas-partners') {
      setFormData(prev => ({ ...prev, clientCount: '1-10', process: 'Intermediate' }));
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const currentItems = [...formData.interest];
      if (checked) {
        setFormData({ ...formData, interest: [...currentItems, value] });
      } else {
        setFormData({ ...formData, interest: currentItems.filter(i => i !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, partnerType: type })
      });

      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <CheckCircle2 size={48} />
          </div>
          <h3 className={styles.successTitle}>Application Received!</h3>
          <p className={styles.successDesc}>
            Thank you for your interest in the yfy® Partner Program. Our team will review your details and get back to you within 24-48 hours.
          </p>
          <button onClick={() => setIsSuccess(false)} className="btn btn-outline">
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  const isAccountant = type === 'ca-accountants';
  const isHR = type === 'hr-consultants';
  const isRecruitment = type === 'recruitment-agencies';
  const isSaaS = type === 'saas-partners';

  return (
    <div className={styles.formWrapper} id="register">
      <div className={styles.formGlow} />
      
      <div className={styles.header}>
        <h2 className={styles.headline}>
          {isAccountant && 'Manage Payroll for All Your Clients — From One Dashboard'}
          {isHR && 'Power Your HR Services with Automation'}
          {isRecruitment && 'Expand Beyond Hiring — Own the Full Employee Lifecycle'}
          {isSaaS && 'Earn Recurring Revenue by Selling yfy®'}
          {!isAccountant && !isHR && !isRecruitment && !isSaaS && `Join the yfy® ${title} Partner Program`}
        </h2>
        
        {isAccountant && (
          <div className={styles.sideNote}>
            <Users size={14} /> Join accountants growing their practice with recurring revenue
          </div>
        )}

        {isHR && (
          <div className={styles.sideNote}>
            <Zap size={14} /> Deliver more value without increasing workload
          </div>
        )}

        {isRecruitment && (
          <div className={styles.sideNote}>
            <Rocket size={14} /> Turn one-time placements into recurring revenue
          </div>
        )}

        {isSaaS && (
          <div className={styles.sideNote}>
            <TrendingUp size={14} /> High-demand product + recurring commissions
          </div>
        )}
        
        <p className={styles.label}>Fill in the details below to start your partnership journey.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Common Fields */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Full Name</label>
          <div className="input-with-icon">
            <User size={18} className="icon-left" />
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="John Doe" 
              className={styles.input} 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email Address</label>
          <div className="input-with-icon">
            <Mail size={18} className="icon-left" />
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="john@example.com" 
              className={styles.input} 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Phone Number</label>
          <div className="input-with-icon">
            <Phone size={18} className="icon-left" />
            <input 
              type="tel" 
              name="phone" 
              required 
              placeholder="+91 98765 43210" 
              className={styles.input} 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            {isRecruitment ? 'Agency Name' : isSaaS ? 'Company / Individual' : 'Company Name'}
          </label>
          <div className="input-with-icon">
            <Building2 size={18} className="icon-left" />
            <input 
              type="text" 
              name="company" 
              required 
              placeholder={isSaaS ? "Your Brand or Freelance Name" : "Your Organization"} 
              className={styles.input} 
              value={formData.company}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Dynamic Accountant Fields */}
        {isAccountant && (
          <>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Number of Clients</label>
              <select 
                name="clientCount" 
                className={styles.select}
                value={formData.clientCount}
                onChange={handleChange}
              >
                <option value="1-10">1–10 Clients</option>
                <option value="11-50">11–50 Clients</option>
                <option value="50+">50+ Clients</option>
              </select>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Current Payroll Process</label>
              <div className={styles.radioGrid}>
                {['Manual', 'Software', 'Outsourced'].map((val) => (
                  <label key={val} className={styles.radioContainer}>
                    <input 
                      type="radio" 
                      name="process" 
                      value={val} 
                      className={styles.radioInput}
                      checked={formData.process === val}
                      onChange={handleChange}
                    />
                    <span className={styles.radioLabel}>{val === 'Manual' ? 'Manual / Excel' : val === 'Software' ? 'Using Software' : 'Outsourced'}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Interested In</label>
              <div className={styles.checkboxList}>
                {['Managing payroll for clients', 'Offering advisory services', 'Both'].map((val) => (
                  <label key={val} className={styles.checkboxItem}>
                    <input 
                      type="checkbox" 
                      name="interest" 
                      value={val} 
                      className={styles.checkboxInput}
                      checked={formData.interest.includes(val)}
                      onChange={handleChange}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Dynamic HR Fields */}
        {isHR && (
          <>
            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Services You Offer</label>
              <div className={styles.checkboxList}>
                {['HR Advisory', 'Compliance', 'Payroll', 'End-to-end HR'].map((val) => (
                  <label key={val} className={styles.checkboxItem}>
                    <input 
                      type="checkbox" 
                      name="interest" 
                      value={val} 
                      className={styles.checkboxInput}
                      checked={formData.interest.includes(val)}
                      onChange={handleChange}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Number of Clients</label>
              <select 
                name="clientCount" 
                className={styles.select}
                value={formData.clientCount}
                onChange={handleChange}
              >
                <option value="1-5">1–5 Clients</option>
                <option value="6-20">6–20 Clients</option>
                <option value="20+">20+ Clients</option>
              </select>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Biggest Challenge</label>
              <div className={styles.radioGrid}>
                {['Scaling services', 'Manual processes', 'Client retention'].map((val) => (
                  <label key={val} className={styles.radioContainer}>
                    <input 
                      type="radio" 
                      name="process" 
                      value={val} 
                      className={styles.radioInput}
                      checked={formData.process === val}
                      onChange={handleChange}
                    />
                    <span className={styles.radioLabel}>{val}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Dynamic Recruitment Fields */}
        {isRecruitment && (
          <>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Monthly Hiring Volume</label>
              <select 
                name="clientCount" 
                className={styles.select}
                value={formData.clientCount}
                onChange={handleChange}
              >
                <option value="1-10">1–10 Hires</option>
                <option value="10-50">10–50 Hires</option>
                <option value="50+">50+ Hires</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Industries You Hire For</label>
              <input 
                type="text" 
                name="industries" 
                placeholder="e.g. IT, Healthcare, Finance" 
                className={styles.input} 
                value={formData.industries}
                onChange={handleChange}
              />
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Do You Offer Payroll Today?</label>
              <div className={styles.radioGrid}>
                {['Yes', 'No'].map((val) => (
                  <label key={val} className={styles.radioContainer}>
                    <input 
                      type="radio" 
                      name="process" 
                      value={val} 
                      className={styles.radioInput}
                      checked={formData.process === val}
                      onChange={handleChange}
                    />
                    <span className={styles.radioLabel}>{val}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Interest</label>
              <div className={styles.checkboxList}>
                {['ATS only', 'ATS + Payroll', 'Full solution'].map((val) => (
                  <label key={val} className={styles.checkboxItem}>
                    <input 
                      type="checkbox" 
                      name="interest" 
                      value={val} 
                      className={styles.checkboxInput}
                      checked={formData.interest.includes(val)}
                      onChange={handleChange}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Dynamic SaaS Partner Fields */}
        {isSaaS && (
          <>
            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Your Audience</label>
              <div className={styles.checkboxList}>
                {['Mid-Market', 'Enterprises', 'Accountants / HR', 'Govt/PSU'].map((val) => (
                  <label key={val} className={styles.checkboxItem}>
                    <input 
                      type="checkbox" 
                      name="interest" 
                      value={val} 
                      className={styles.checkboxInput}
                      checked={formData.interest.includes(val)}
                      onChange={handleChange}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Monthly Lead Potential</label>
              <select 
                name="clientCount" 
                className={styles.select}
                value={formData.clientCount}
                onChange={handleChange}
              >
                <option value="1-10">1–10 Leads</option>
                <option value="10-50">10–50 Leads</option>
                <option value="50+">50+ Leads</option>
              </select>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Experience Selling SaaS</label>
              <div className={styles.radioGrid}>
                {['Beginner', 'Intermediate', 'Advanced'].map((val) => (
                  <label key={val} className={styles.radioContainer}>
                    <input 
                      type="radio" 
                      name="process" 
                      value={val} 
                      className={styles.radioInput}
                      checked={formData.process === val}
                      onChange={handleChange}
                    />
                    <span className={styles.radioLabel}>{val}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Message Field */}
        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Message (Optional)</label>
          <textarea 
            name="message" 
            rows="4" 
            placeholder="Tell us a bit more about your requirements..." 
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.fullWidth}>
          <button 
            type="submit" 
            className={`btn btn-primary btn-lg ${styles.submitBtn}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="spinner" size={20} />
            ) : (
              <>
                {isAccountant && '👉 Start Managing Client Payroll'}
                {isHR && '👉 Become an HR Partner'}
                {isRecruitment && '👉 Upgrade Your Recruitment Business'}
                {isSaaS && '👉 Become a Sales Partner'}
                {!isAccountant && !isHR && !isRecruitment && !isSaaS && 'Submit Application'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
