'use client';
import styles from './PartnerTypes.module.css';
import { Calculator, Users, UserPlus, TrendingUp, ChevronRight } from 'lucide-react';

const partners = [
  {
    type: 'CA & Accountants',
    slug: 'ca-accountants',
    icon: <Calculator size={32} />,
    benefit: 'Automated PF/ESI/TDS',
    headline: 'Manage Payroll for Your Clients',
    description: 'Offer payroll and compliance services to your clients without increasing your workload.',
    points: ['Multi-client dashboard', 'Automated filings', 'Expand into advisory'],
    cta: 'Explore Program',
    color: 'var(--accent-blue)'
  },
  {
    type: 'HR Consultants',
    slug: 'hr-consultants',
    icon: <Users size={32} />,
    benefit: 'Full Lifecycle Tech',
    headline: 'Deliver HR Services with Tech',
    description: 'Move beyond advisory and offer execution with a full HR + payroll platform.',
    points: ['End-to-end HR suite', 'Workforce analytics', 'Scalable delivery'],
    cta: 'Explore Program',
    color: 'var(--brand-xlight)'
  },
  {
    type: 'Recruitment Agencies',
    slug: 'recruitment-agencies',
    icon: <UserPlus size={32} />,
    benefit: 'Recurring Revenue',
    headline: 'Go Beyond Hiring Services',
    description: 'Manage hiring, onboarding, and payroll, all in one platform.',
    points: ['Built-in ATS', 'Multi-client pipelines', 'Recurring revenue'],
    cta: 'Explore Program',
    color: 'var(--accent-green)'
  },
  {
    type: 'SaaS Sales Partners',
    slug: 'saas-partners',
    icon: <TrendingUp size={32} />,
    headline: 'Resell & Earn Recurring Income',
    benefit: 'High Commissions',
    description: 'Monetize your network by selling a high-demand payroll & HR product.',
    points: ['Attractive commissions', 'Easy-to-sell product', 'Partner support'],
    cta: 'Explore Program',
    color: 'var(--accent-gold)'
  }
];

export default function PartnerTypes() {
  return (
    <section className={`section-md ${styles.section}`} id="partner-types">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Choose Your Partner Path</span>
          <h2 className="h2">Find the program designed for how you work and grow.</h2>
        </div>

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className={`${styles.card} reveal reveal-delay-${index + 1}`}
              style={{ '--accent': partner.color }}
            >
              <div className={styles.cardGlow} />
              
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {partner.icon}
                </div>
                <div className={styles.headerContent}>
                  <span className={styles.typeLabel}>{partner.type}</span>
                  <div className={styles.benefitTag}>{partner.benefit}</div>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h4 className={styles.headline}>{partner.headline}</h4>
                <p className={styles.description}>{partner.description}</p>
                
                <ul className={styles.points}>
                  {partner.points.map((point, i) => (
                    <li key={i} className={styles.point}>
                      <ChevronRight size={14} className={styles.pointIcon} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.cardFooter}>
                <a href={`/partners/${partner.slug}`} className={`btn btn-sm ${styles.cta}`}>
                  {partner.cta}
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
