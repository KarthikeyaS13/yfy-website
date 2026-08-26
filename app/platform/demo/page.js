"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './Demo.module.css';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    phone: '',
    company: '',
    employeeCount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Typical form submission logic would go here
    console.log('Demo Requested:', formData);
    alert("Thank you! Our compliance experts will contact you shortly.");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            <span className={styles.vipText}>EXCLUSIVE DEMO</span>
          </div>
          
          <h1 className={styles.title}>
            See yfy® in Action.
          </h1>
          <p className={styles.subtitle}>
            Experience how our compliance-first payroll engine automates complex Indian labour laws, saving you hours of manual calculation and securing your business against costly penalties.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Guided Platform Walkthrough</h4>
                <p className={styles.featureDesc}>A customized tour based on your unique HR, payroll, and statutory requirements.</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Compliance Audit Report</h4>
                <p className={styles.featureDesc}>Get an instant analysis of your existing payroll setup and risk exposure.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Direct Expert Access</h4>
                <p className={styles.featureDesc}>Speak directly to our CA and compliance architects, not just sales reps.</p>
              </div>
            </div>
          </div>

          <div className={styles.trustedSection}>
            <p className={styles.trustedTitle}>Trusted by Fast-Growing Companies</p>
            <div className={styles.trustedLogos}>
              <span className={styles.trustedLogo}>TechCorp.</span>
              <span className={styles.trustedLogo}>FinServe</span>
              <span className={styles.trustedLogo}>RetailHub</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Intent Lead Form */}
        <div className={`${styles.rightCol} reveal reveal-delay-2`}>
          <div className={styles.formCard}>
            
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Request Your Demo</h3>
              <p className={styles.formSubtitle}>Fill out the details below. All fields are required.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.formFields}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>First Name</label>
                  <input 
                    required 
                    type="text" 
                    name="firstName"
                    className={styles.input} 
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Last Name</label>
                  <input 
                    required 
                    type="text" 
                    name="lastName"
                    className={styles.input} 
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Work Email</label>
                <input 
                  required 
                  type="email" 
                  name="workEmail"
                  className={styles.input} 
                  placeholder="name@company.com"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  name="phone"
                  className={styles.input} 
                  placeholder="+91 99999 99999"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Company Name</label>
                  <input 
                    required 
                    type="text" 
                    name="company"
                    className={styles.input} 
                    placeholder="Your organization"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Employee Count</label>
                  <select 
                    required 
                    name="employeeCount"
                    className={`${styles.input} ${styles.select}`}
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select size</option>
                    <option value="500-1000">500 - 1,000</option>
                    <option value="1000-5000">1,000 - 5,000</option>
                    <option value="5000-10000">5,000 - 10,000</option>
                    <option value="10000+">10,000+</option>
                  </select>
                </div>
              </div>

              <div className={styles.formFooter}>
                <button type="submit" className={styles.submitBtn}>
                  Schedule Demo <ArrowRight size={18} />
                </button>
                <p className={styles.termsDoc}>
                  By submitting this form, you agree to our <a href="/legal/privacy" className={styles.termsLink}>Privacy Policy</a> and authorize yfy® to contact you.
                </p>
              </div>

            </form>
          </div>
        </div>

      </div>

      {/* Location / Map Section at the bottom */}
      <div className={`container ${styles.mapContainer}`}>
        <div className={styles.mapGrid}>
          <div className={styles.mapInfo}>
            <h3 className={styles.mapTitle}>Visit Our Office</h3>
            <div className={styles.mapDetails}>
              <p><strong>FINNOVO®</strong></p>
              <p>#102, Bhanu Elite</p>
              <p>Image Hospital Road, Madhapur</p>
              <p>Hyderabad, Telangana - 500 081</p>
              <p style={{ marginTop: '1rem' }}><strong>Email:</strong> info@yfy.ai</p>
              <p><strong>Phone:</strong> +91 812185 2224</p>
            </div>
          </div>
          <div className={styles.mapIframeWrapper}>
            <iframe 
              src="https://maps.google.com/maps?q=Bhanu+Elite,+Image+Hospital+Road,+Madhapur,+Hyderabad,+Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
