import styles from './PartnersCTA.module.css';
import { ArrowRight } from 'lucide-react';

export default function PartnersCTA() {
  return (
    <section className={`section-md ${styles.section}`} id="final-cta">
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className="container">
        <div className={`reveal ${styles.inner}`}>
          <div className={styles.trustSignals}>
            <span className="badge badge-silver">Secure & Compliant</span>
            <span className="badge badge-silver">Indian Payroll Experts</span>
            <span className="badge badge-silver">Scalable Infrastructure</span>
          </div>
          
          <h2 className={styles.heading}>
            Let’s <span className="text-gradient">Grow</span> Together
          </h2>
          <p className={styles.desc}>
            Join the yfy® partner ecosystem and start building new revenue streams today.
          </p>
          
          <div className={styles.ctas}>
            <a href="#register" className="btn btn-primary btn-lg">
              Become a Partner <ArrowRight size={20} />
            </a>
            <a href="/contact" className="btn btn-outline btn-lg">
              Talk to Our Team <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
