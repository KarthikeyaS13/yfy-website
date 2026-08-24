import styles from './ValueProps.module.css';
import { Layout, IndianRupee, Zap, HeartHandshake } from 'lucide-react';

const values = [
  {
    icon: <Layout className={styles.valIcon} />,
    title: 'Built for Multi-Client Professionals',
    desc: 'Manage all your clients from a single, powerful dashboard.'
  },
  {
    icon: <IndianRupee className={styles.valIcon} />,
    title: 'Unlock Recurring Revenue',
    desc: 'Turn one-time services into predictable monthly income.'
  },
  {
    icon: <Zap className={styles.valIcon} />,
    title: 'Automate Operations',
    desc: 'Payroll, compliance, HR, and hiring — all streamlined.'
  },
  {
    icon: <HeartHandshake className={styles.valIcon} />,
    title: 'Dedicated Partner Support',
    desc: 'Get onboarding, training, and growth support at every stage.'
  }
];

export default function ValueProps() {
  return (
    <section className="section section-md" id="why-partner">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Value Proposition</span>
          <h2 className="h2">Why Partner with yfy®?</h2>
        </div>

        <div className={styles.grid}>
          {values.map((v, i) => (
            <div key={i} className={`${styles.item} reveal reveal-delay-${i + 1}`}>
              <div className={styles.iconBox}>{v.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.title}>{v.title}</h3>
                <p className={styles.desc}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
