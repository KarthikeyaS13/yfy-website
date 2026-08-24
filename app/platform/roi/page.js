import { ShieldCheck, CheckCircle2, XCircle, TrendingUp, Cpu, Target } from 'lucide-react';
import styles from './roi-page.module.css';
import ROICalculatorWrapper from '@/components/platform/ROICalculatorWrapper';
import ROIScrollButton from '@/components/platform/ROIScrollButton';

export const metadata = {
  title: 'Workforce ROI Calculator | yfy.ai',
  description: 'Calculate your true workforce management and compliance costs. Discover how much you can save with yfy.ai\'s Workforce Operating System.',
  alternates: { canonical: '/platform/roi' },
};

export default function ROIPage() {
  return (
    <div className={styles.containerSection}>
      <main className="container">
        
        {/* Page Header */}
        <section className={`${styles.heroSection} reveal`}>
          <span className={styles.badge}>
            Interactive ROI Tool
          </span>
          <h1 className={styles.title}>
            Calculate Your True <br/>
            <span className="text-gradient">Workforce & Compliance ROI</span>
          </h1>
          <p className={styles.subtitle}>
            Stop comparing simple payroll tools on cost per employee alone. See how yfy.ai's Workforce Operating System, compliance intelligence, and analytics eliminate manual workflows, reduce risks, and deliver measurable ROI.
          </p>

          <ROIScrollButton />
        </section>

        {/* Education Section 1: The Hidden Cost */}
        <section className="reveal">
          <div className={styles.educationBox}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Most HR & Payroll Comparisons Ignore <span className="text-gradient">70% of the Real Cost</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Most businesses evaluate HRMS platforms using just one metric: "Monthly Cost Per Employee". That’s highly misleading. Your actual workforce operational cost includes hidden manual hours across disconnected platforms, compliance assessment risks, and legal exposure.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <XCircle color="#ff4b2b" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ color: '#ff4b2b', marginBottom: '4px' }}>Outdated Approach</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>"What is the exact monthly SAAS cost per employee?"</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 color="var(--accent-green)" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ color: 'var(--accent-green)', marginBottom: '4px' }}>Smarter Approach</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>"How much total cost, manual effort, and compliance risk can this software eliminate per month?"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.gridStats}>
               <div className={styles.statCard}>
                  <Cpu color="var(--brand-xlight)" size={28} style={{ marginBottom: '1rem' }} />
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Deep Payroll Automation</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>End-to-end processing with minimal manual intervention.</p>
               </div>
               <div className={styles.statCard}>
                  <ShieldCheck color="var(--brand-xlight)" size={28} style={{ marginBottom: '1rem' }} />
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Compliance Intelligence</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>Real-time regulatory updates and state-wise handling across India.</p>
               </div>
               <div className={styles.statCard}>
                  <Target color="var(--brand-xlight)" size={28} style={{ marginBottom: '1rem' }} />
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Error Prevention</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>Smart validations reduce rework and eliminate audit-fines.</p>
               </div>
               <div className={styles.statCard}>
                  <TrendingUp color="var(--brand-xlight)" size={28} style={{ marginBottom: '1rem' }} />
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Impact Tracking</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>Reduces compliance workload and frees up strategic capacity.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Education Section 2: Thesis */}
        <section className={`${styles.thesisSection} reveal`}>
           <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Workforce Infrastructure Should Be Measured by ROI, Not Price.</h2>
           <p className={styles.thesisText}>
             A comprehensive solution may substitute 3 standalone tools and save 80% manual effort. That drives higher long-term profit margins. Use the calculator below to discover your true payback period and ROI based on your business metrics.
           </p>
           
           {/* ROI Calculator Trigger */}
           <ROICalculatorWrapper />
        </section>

      </main>
    </div>
  );
}
