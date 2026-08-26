import styles from './WhyYfy.module.css';
import { Zap, Globe, RefreshCw, Link, Smartphone, Lock } from 'lucide-react';

const reasons = [
  { icon: <Zap size={32} strokeWidth={1.5} />, title: 'White-Glove Implementation', desc: 'Seamless migration of historical data with zero operational downtime, led by enterprise implementation experts.' },
  { icon: <Globe size={32} strokeWidth={1.5} />, title: 'India-First Architecture', desc: 'Built for Indian labour laws from scratch, not retrofitted from a global product.' },
  { icon: <RefreshCw size={32} strokeWidth={1.5} />, title: 'Full Lifecycle in One Platform', desc: 'Hire → Onboard → Attend → Pay → Comply → Grow → Exit. No tool switching.' },
  { icon: <Link size={32} strokeWidth={1.5} />, title: 'Deep Finance Integrations', desc: 'Native sync with enterprise ERPs like Oracle, SAP, and Tally Prime. CFO-ready reporting.' },
  { icon: <Smartphone size={32} strokeWidth={1.5} />, title: 'Mobile-First ESS App', desc: 'Employees access payslips, leave requests, and compliance docs from any device.' },
  { icon: <Lock size={32} strokeWidth={1.5} />, title: 'Enterprise-Grade Security', desc: 'ISO 27001:2022 & ISO 27701:2019 certified. SSO, role-based access, data encryption.' },
];

export default function WhyYfy() {
  return (
    <section className="section" id="why-yfy">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Why <b>yfy®</b></span>
          <h2>The Strategic Workforce Partner for Indian Enterprises</h2>
          <p>Trusted by India's fastest-growing mid-market and large enterprises to drive workforce agility.</p>
        </div>
        <div className={styles.grid}>
          {reasons.map((r, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} ${styles.item}`}>
              <div className={styles.iconBox}>{r.icon}</div>
              <div>
                <h3 className={styles.title}>{r.title}</h3>
                <p className={styles.desc}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
