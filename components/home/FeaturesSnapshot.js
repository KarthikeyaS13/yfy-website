import styles from './FeaturesSnapshot.module.css';
import { Coins, Scale, Target, BarChart3, Users, ShieldAlert } from 'lucide-react';

const features = [
  {
    cat: 'Workforce Management',
    icon: <Users size={28} strokeWidth={1.5} />,
    items: [
      'Talent Acquisition (ATS) & Pipelines',
      'Core HRMS, GPS & Biometric Attendance',
      'Payroll & Statutory Processing (PF, ESIC, TDS)',
      'Performance Management System (PMS)',
      'Learning Management System (LMS) & Training'
    ]
  },
  {
    cat: 'Compliance Intelligence',
    icon: <Scale size={28} strokeWidth={1.5} />,
    items: [
      'Central Labour Law Compliance Rules',
      'State-Specific Statutory Compliance Engine',
      'New Labour Codes Readiness Dashboard',
      'Automated Applicability Assessment',
      'Registrations, Returns & Filings Management'
    ]
  },
  {
    cat: 'Workforce Intelligence',
    icon: <BarChart3 size={28} strokeWidth={1.5} />,
    items: [
      'Workforce Planning & Role Modeler',
      'Predictive Headcount Forecasting',
      'Statutory Budgeting & Cost Modeling',
      'Attrition & Flight Risk Analytics',
      'Executive Dashboards & Decision Support'
    ]
  },
];

export default function FeaturesSnapshot() {
  return (
    <section className={`section ${styles.section}`} id="features">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Workforce Intelligent OS</span>
          <h2>The Infrastructure to <span className="text-gradient">Manage, Comply & Model</span></h2>
          <p>One system to unify operations, manage regulatory risk and accelerate growth.</p>
        </div>
        <div className={styles.grid}>
          {features.map((f, i) => (
            <div key={f.cat} className={`card reveal reveal-delay-${(i % 3) + 1} ${styles.card}`}>
              <div className={styles.catHeader}>
                <span className={styles.icon}>{f.icon}</span>
                <span className={styles.cat}>{f.cat}</span>
              </div>
              <ul className={styles.list}>
                {f.items.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.dot} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`${styles.bottomLink} reveal`}>
          <a href="/platform/employeelifecycle" className="btn btn-outline">
            Explore All Modules →
          </a>
        </div>
      </div>
    </section>
  );
}
