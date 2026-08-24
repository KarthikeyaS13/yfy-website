import styles from './IsoCerts.module.css';
import { Award, Lock, ShieldCheck } from 'lucide-react';

const certs = [
  { code: 'ISO 9001:2015', title: 'Quality Management', desc: 'Consistent quality in product delivery and customer service', icon: <Award size={32} strokeWidth={1.5} /> },
  { code: 'ISO 27001:2022', title: 'Information Security', desc: 'Enterprise-grade data protection and security controls', icon: <Lock size={32} strokeWidth={1.5} /> },
  { code: 'ISO 27701:2019', title: 'Privacy Information', desc: 'GDPR-aligned privacy management for all HR data', icon: <ShieldCheck size={32} strokeWidth={1.5} /> },
];

export default function IsoCerts() {
  return (
    <section className={`section-md ${styles.section}`} id="certifications">
      <div className="container">
        <div className={styles.inner}>
          <div className={`reveal ${styles.left}`}>
            <span className="section-label">Certifications</span>
            <h2 className={styles.heading}>
              Certified Secure.<br />
              <span className="text-gradient">Trusted by Enterprises.</span>
            </h2>
            <p className={styles.desc}>
              <b>yfy®</b> maintains three ISO certifications — ensuring quality, security, and privacy
              for every HR workflow, payroll transaction, and compliance filing.
            </p>
            <div className={styles.trademark}>
              <span className={styles.tmText}><b>yfy®</b> is a registered trademark.</span>
            </div>
          </div>
          <div className={styles.right}>
            {certs.map((c, i) => (
              <div key={i} className={`iso-badge reveal reveal-delay-${i + 1} ${styles.cert}`}>
                <span className={styles.certIcon}>{c.icon}</span>
                <div>
                  <div className={styles.certCode}>{c.code}</div>
                  <div className={styles.certTitle}>{c.title}</div>
                  <div className={styles.certDesc}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
