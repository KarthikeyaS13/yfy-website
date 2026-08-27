'use client';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      {/* Background orbs */}
      <div className={styles.orbTop} aria-hidden="true" />
      <div className={styles.orbBottom} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      {/* Animated Background Flow */}
      <div className={styles.animatedBgOverlay} aria-hidden="true">
        {/* yfy® Portal Node */}
        <div className={`${styles.bgEntity} ${styles.bgYfy}`}>
          <div className={styles.bgEntityIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <div className={styles.bgLabelGroup}>
            <span className={styles.bgLabel}>Workforce OS</span>
            <span className={styles.bgSubLabel}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              Intelligence Layer
            </span>
          </div>
        </div>

        <div className={styles.bgTracks}>
          {/* Forward Track (Filing) */}
          <div className={styles.trackWrapper}>
            <div className={styles.trackLineFwd}></div>
            {[
              { label: 'PF', id: 'fw1' },
              { label: 'ESI', id: 'fw2' },
              { label: 'TDS', id: 'fw3' },
              { label: 'PT', id: 'fw4' }
            ].map((file) => (
              <div key={file.id} className={`${styles.bgFile} ${styles[file.id]}`}>
                <div className={styles.fileIconWrapper}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <span className={styles.fileLabel}>{file.label}</span>
              </div>
            ))}
          </div>

          {/* Backward Track (Acknowledgements) */}
          <div className={styles.trackWrapper}>
            <div className={styles.trackLineBwd}></div>
            {[
              { label: 'PF Ack', id: 'bw1' },
              { label: 'ESI Ack', id: 'bw2' },
              { label: 'TDS Ack', id: 'bw3' },
              { label: 'PT Ack', id: 'bw4' }
            ].map((file) => (
              <div key={file.id} className={`${styles.bgFile} ${styles[file.id]}`}>
                <div className={`${styles.fileIconWrapper} ${styles.ackIcon}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span className={`${styles.fileLabel} ${styles.ackLabel}`}>{file.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Govt Node */}
        <div className={`${styles.bgEntity} ${styles.bgGovt}`}>
          <div className={styles.bgEntityIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 22 7 12 2" />
              <rect x="4" y="7" width="2" height="10" />
              <rect x="10" y="7" width="2" height="10" />
              <rect x="16" y="7" width="2" height="10" />
              <rect x="2" y="17" width="20" height="2" />
              <rect x="2" y="19" width="20" height="2" />
            </svg>
          </div>
          <div className={styles.bgLabelGroup}>
            <span className={styles.bgLabel}>Govt. Portals</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          India’s First Workforce Intelligent Operating System
        </div>

        {/* Headline */}
        <h1 className={styles.headline} >
          The Compliance-First Workforce Platform for {' '}
          <span className={styles.highlight}>Indian Companies</span>
          <br />
        </h1>

        <p className={styles.subheadline}>
          Verify what your contractors actually paid before you release their bill. Compute your statutory liability, generate the government's own return files, and hold the evidence across every state you operate in.
        </p>

        {/* Compliance pills */}
        <div className={styles.compliancePills}>
          {['ATS', 'HRMS', 'Payroll', 'PMS', 'LMS', 'Workforce Intelligence', 'Statutory Compliance', 'Labour Codes 2020'].map((tag) => (
            <span key={tag} className={styles.pill}>{tag}</span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={styles.ctas}>
          <a href="/platform/demo" className="btn btn-accent btn-lg glossy" id="hero-book-demo">
            Get your free exposure report
          </a>
          <a href="/platform" className="btn btn-outline btn-lg" id="hero-enterprise">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></svg>
            See how the statutory engine works
          </a>
        </div>


        {/* Micro-trust */}
        <p className={styles.microTrust}>
          Trusted by <strong>India's fastest-growing enterprises</strong> &nbsp;·&nbsp; Expert-Led Migration &nbsp;·&nbsp; ISO 9001 · 27001 · 27701 Certified
        </p>

        {/* Lifecycle Visual */}
        <div className={styles.lifecycleRow}>
          {[
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>,
              label: 'Hire'
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>,
              label: 'Onboard'
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
              label: 'Manage'
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>,
              label: 'Pay'
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
              label: 'Grow'
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>,
              label: 'Retire'
            },
          ].map((step, i) => (
            <div key={step.label} className={styles.lifecycleStep}>
              <div className={styles.lifecycleIcon}>{step.icon}</div>
              <span className={styles.lifecycleLabel}>{step.label}</span>
              {i < 5 && (
                <div className={styles.lifecycleArrow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
