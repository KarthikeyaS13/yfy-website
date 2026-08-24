import styles from './GrowthPaths.module.css';

const paths = [
  {
    tier: 'Mid-Market',
    badge: 'Growth',
    badgeColor: 'green',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>,
    tagline: 'Streamlined operations for 50-500 employees.',
    price: 'Core HR',
    priceNote: 'Per user / month',
    features: [
      'Automated payroll',
      'Basic leave & attendance',
      'Compliance reporting',
      'Employee self-service',
      'Setup & migration support',
    ],
    cta: 'View Plans',
    ctaHref: '/pricing',
    ctaStyle: 'btn-ghost',
    href: '/solutions/hr-leaders',
  },
  {
    tier: 'Large Enterprise',
    badge: 'Most Popular',
    badgeColor: 'gold',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
    tagline: 'Advanced automation for 500-5,000 employees.',
    price: 'Talent & Ops',
    priceNote: 'Per user / month',
    features: [
      'Full lifecycle management',
      'Multi-state intelligence',
      'ATS & PMS modules',
      'Expense management',
      'Priority support',
    ],
    cta: 'Request Demo',
    ctaHref: '/platform/demo',
    ctaStyle: 'btn-primary',
    href: '/solutions/finance',
    featured: true,
  },
  {
    tier: 'Conglomerates',
    badge: 'Custom Scale',
    badgeColor: 'silver',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 7 9-4 9 4"/><rect x="4" y="20" width="16" height="2"/><line x1="6" y1="7" x2="6" y2="20"/><line x1="10" y1="7" x2="10" y2="20"/><line x1="14" y1="7" x2="14" y2="20"/><line x1="18" y1="7" x2="18" y2="20"/></svg>,
    tagline: 'Bespoke configuration for 5,000+ employees.',
    price: 'Enterprise',
    priceNote: 'Custom pricing',
    features: [
      'Everything in Large Enterprise',
      'E-vault & document mgmt',
      'Full API access',
      'Multi-entity consolidation',
      'Dedicated account manager',
    ],
    cta: 'Talk to Sales',
    ctaHref: '/platform/demo',
    ctaStyle: 'btn-ghost',
    href: '/solutions/it',
  },
];

export default function GrowthPaths() {
  return (
    <section className="section" id="growth-paths">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">One Platform · Limitless Scale</span>
          <h2>Architected for Enterprise Scale</h2>
          <p>Deploy a workforce operating system built to adapt to your infrastructure.</p>
        </div>

        <div className={styles.grid}>
          {paths.map((p) => (
            <div
              key={p.tier}
              className={`card reveal ${styles.card} ${p.featured ? styles.featured : ''}`}
            >
              {p.featured && <div className={styles.featuredGlow} aria-hidden="true" />}
              <div className={styles.top}>
                <span className={styles.icon}>{p.icon}</span>
                <span className={`badge badge-${p.badgeColor}`}>{p.badge}</span>
              </div>
              <h3 className={styles.tier}>{p.tier}</h3>
              <p className={styles.tagline}>{p.tagline}</p>
              <div className={styles.price}>
                <span className={styles.priceMain}>{p.price}</span>
                <span className={styles.priceNote}>{p.priceNote}</span>
              </div>
              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <span className={styles.tick}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className={styles.cardCtas}>
                <a href={p.ctaHref} className={`btn ${p.ctaStyle}`}>{p.cta}</a>
                <a href={p.href} className={styles.learnMore}>Learn more →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
