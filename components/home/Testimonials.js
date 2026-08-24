import styles from './Testimonials.module.css';
import { Briefcase, User, Rocket } from 'lucide-react';

const testimonials = [
  {
    quote: <><b>yfy®</b>'s compliance engine saved us ₹4 lakhs in PF penalties last year. The Labour Codes 2020 automation is a game-changer for our multi-state operations.</>,
    name: 'Priya Mehta',
    role: 'HR Director',
    company: 'TechScale India',
    avatar: <Briefcase size={28} strokeWidth={1.5} />,
    tag: 'Enterprise · 800 employees',
  },
  {
    quote: <>We integrated <b>yfy®</b> with Zoho Books — payroll entries now flow automatically to accounting. Zero manual journal entries. Our CA loves it.</>,
    name: 'Rajesh Kumar',
    role: 'CFO',
    company: 'LogisticsCorp',
    avatar: <User size={28} strokeWidth={1.5} />,
    tag: 'SME · 250 employees',
  },
  {
    quote: <><b>yfy®</b>'s enterprise APIs allowed us to connect our legacy on-premise ERP with their cloud payroll engine. The data migration was flawless.</>,
    name: 'Vikram Singh',
    role: 'CIO',
    company: 'Apex Manufacturing',
    avatar: <Rocket size={28} strokeWidth={1.5} />,
    tag: 'Enterprise · 4,500 employees',
  },
];

export default function Testimonials() {
  return (
    <section className={`section ${styles.section}`} id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Customer Stories</span>
          <h2>Real Impact for HR Teams Across India</h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={`card reveal reveal-delay-${i + 1} ${styles.card}`}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.author}>
                <span className={styles.avatar}>{t.avatar}</span>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}, {t.company}</div>
                  <span className={`badge badge-purple ${styles.tag}`}>{t.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.cta} reveal`}>
          <a href="/case-studies" className="btn btn-outline">Read All Case Studies</a>
        </div>
      </div>
    </section>
  );
}
