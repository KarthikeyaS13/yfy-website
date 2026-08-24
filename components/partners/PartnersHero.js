import styles from './PartnersHero.module.css';

export default function PartnersHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />
      
      <div className="container">
        <div className={styles.content}>
          <div className="badge badge-purple reveal">yfy® Partners Program</div>
          
          <h1 className={`${styles.title} h1 reveal reveal-delay-1`}>
            Grow Your Business with <span className="text-gradient">yfy® Partners</span> Program
          </h1>
          
          <p className={`${styles.subtext} text-lg reveal reveal-delay-2`}>
            Whether you manage clients, advise businesses, hire talent, or sell SaaS — yfy® helps you unlock new revenue streams with payroll, HR, and hiring technology.
          </p>
          
          <div className={`${styles.ctas} reveal reveal-delay-3`}>
            <a href="#partner-registration" className="btn btn-primary btn-lg">
              👉 Get Started as a Partner
            </a>
            <a href="/platform/demo" className="btn btn-outline btn-lg">
              👉 Book a Demo
            </a>
          </div>
          
          <p className={`${styles.microcopy} text-xs reveal reveal-delay-4`}>
            No commitment • Takes less than 60 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
