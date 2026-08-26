import styles from './ComplianceUSP.module.css';
import { Scale, Shield, ClipboardList, Calendar, FileText, Search, Bell } from 'lucide-react';
import { IndiaComplianceMap } from '../IndiaMap/IndiaComplianceMap';

const items = [
  {
    icon: <Scale size={40} strokeWidth={1.5} />,
    title: 'Labour Code Readiness',
    desc: 'Fully aligned with the 4 new codes: Wages, Industrial Relations, Social Security & OSH. Auto-updates when regulations change.',
    tag: 'Labour Codes 2020',
    tagColor: 'gold',
  },
  {
    icon: <Shield size={40} strokeWidth={1.5} />,
    title: 'State Regulatory Compliance',
    desc: 'Auto-calculate PT, LWF, and state-specific rules for every Indian state. No manual intervention required.',
    tag: 'Multi-State',
    tagColor: 'green',
  },
  {
    icon: <Search size={40} strokeWidth={1.5} />,
    title: 'Automated Applicability Assessment',
    desc: 'Real-time assessment of local, state, and central statutory liabilities as headcount and location footprints scale.',
    tag: 'Intelligence Layer',
    tagColor: 'green',
  },
  {
    icon: <ClipboardList size={40} strokeWidth={1.5} />,
    title: 'Statutory Filings Automation',
    desc: 'PF ECR, ESIC returns, TDS challans (Form 24Q), Professional Tax, filed on time, every time.',
    tag: 'Zero Penalties',
    tagColor: 'green',
  },
  {
    icon: <Bell size={40} strokeWidth={1.5} />,
    title: 'Compliance Monitoring & Alerts',
    desc: 'Active monitoring of state-specific regulatory deadlines. Automated notifications and push alerts for due dates.',
    tag: 'Active Shield',
    tagColor: 'purple',
  },
  {
    icon: <Search size={40} strokeWidth={1.5} />,
    title: 'Audit-Ready Reports',
    desc: 'Complete audit trails, statutory registers, and compliance reports, accessible in one click for any period.',
    tag: 'Audit Ready',
    tagColor: 'silver',
  },
];

export default function ComplianceUSP() {
  return (
    <section className={`section ${styles.section}`} id="compliance-usp">
      <div className={styles.bgAccent} aria-hidden="true" />
      <div className="container">
        <div className={`section-header reveal ${styles.header}`}>
          <span className="section-label">Compliance Management System</span>
          <h2>
            Active Compliance Intelligence{' '}
            <span className="text-gradient">Designed for Indian Regulations</span>
          </h2>
          <p>
            The cost of inaction is too high. <b>yfy®</b> serves as your Active Compliance Shield, helping you avoid statutory penalties, eliminate operational blind spots and protect your brand reputation across every Indian state.
          </p>
        </div>

        <div className={styles.splitView}>

          {/* Map Side */}
          <div className="reveal" style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Multi-State Compliance Shield</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hover over a state to view active statutory automations.</p>
            </div>
            <IndiaComplianceMap />
          </div>

          {/* Features Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {items.slice(0, 4).map((item, i) => (
              <div
                key={i}
                className={`card reveal reveal-delay-${(i % 3) + 1}`}
                style={{ '--delay': `${i * 0.08}s`, display: 'flex', gap: '1rem', padding: '1.5rem' }}
              >
                <div style={{ color: 'var(--brand-primary)', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{item.title}</h3>
                    <div className={`badge badge-${item.tagColor}`} style={{ fontSize: '0.65rem' }}>{item.tag}</div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className={`${styles.bottomCta} reveal`} style={{ marginTop: '4rem' }}>
          <a href="/products/compliance" className="btn btn-primary btn-lg">
            Explore Compliance Engine
          </a>
          <a href="/resources/compliance-calendar" className="btn btn-outline btn-lg">
            View Compliance Calendar
          </a>
        </div>
      </div>
    </section>
  );
}
