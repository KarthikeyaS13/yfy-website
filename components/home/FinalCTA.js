import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section className={`section-md ${styles.section}`} id="final-cta">
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className="container">
        <div className={`reveal ${styles.inner}`}>
          <div className={styles.isoBadges}>
            {['ISO 9001:2015', 'ISO 27001:2022', 'ISO 27701:2019'].map(b => (
              <span key={b} className={styles.isoBadge}>{b}</span>
            ))}
          </div>
          <h2 className={styles.heading}>
            Transform Your HR, Payroll &amp; Compliance Today
          </h2>
          <p className={styles.desc}>
            Join India's leading enterprises that trust <b>yfy®</b> to automate
            HR, payroll, and compliance, with full New Labour Codes 2020 readiness.
          </p>
          <div className={styles.ctas}>
            <a href="/platform/demo" className="btn btn-primary btn-lg" id="final-cta-free">
              Request Enterprise Demo
            </a>
            <a href="/platform" className="btn btn-outline btn-lg" id="final-cta-demo">
              Explore Platform
            </a>
            <a href="/platform/roi" className="btn btn-ghost btn-lg" id="final-cta-roi">
              Calculate ROI
            </a>
          </div>
          <p className={styles.footnote}>
            Expert-led Migration · Zero Operational Downtime · ISO 27001 Certified
          </p>
        </div>
      </div>
    </section>
  );
}
