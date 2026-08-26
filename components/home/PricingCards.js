import React from 'react';
import Link from 'next/link';
import styles from './PricingCards.module.css';
import { Check, MapPin, ShieldCheck, Building2 } from 'lucide-react';

const pricingTiers = [
  {
    badge: 'Foundation',
    title: 'Multi-state employer',
    subtitle: '300+ employees across 3+ states and multiple legal entities.',
    priceText: 'Per employee / month',
    features: [
      { text: 'Payroll with statutory engine', accent: false },
      { text: 'Returns in government formats', accent: false },
      { text: 'Obligation register', accent: false },
      { text: 'Evidence vault', accent: false },
      { text: 'Core HR and self-service', accent: false }
    ],
    btnText: 'Compliance readiness check',
    iconType: 'MapPin',
    isPopular: false
  },
  {
    badge: 'Most complete',
    title: 'Principal employer',
    subtitle: 'Multi-state employers who also run contract labour through vendors.',
    priceText: 'Per employee + per contract worker / month',
    features: [
      { text: 'Everything in multi-state', accent: false },
      { text: 'Contractor bill verification', accent: true },
      { text: 'Per-worker PF and ESI recon', accent: true },
      { text: 'Exposure dashboard', accent: true },
      { text: 'Vendor scoring and CLRA returns', accent: true },
      { text: 'ATS, performance and expense', accent: false }
    ],
    btnText: 'Get your free exposure report',
    iconType: 'ShieldCheck',
    isPopular: true
  },
  {
    badge: 'Custom scale',
    title: 'Enterprise group',
    subtitle: '2,000+ employees across multiple entities and business lines.',
    priceText: 'Custom pricing',
    features: [
      { text: 'Everything in principal employer', accent: false },
      { text: 'Multi-entity consolidation', accent: false },
      { text: 'Workforce planning', accent: false },
      { text: 'Learning, assets, service desk', accent: false },
      { text: 'API, SSO and SCIM', accent: false },
      { text: 'Dedicated account manager', accent: false }
    ],
    btnText: 'Talk to sales',
    iconType: 'Building2',
    isPopular: false
  }
];

export default function PricingCards() {
  return (
    <section className={`section ${styles.pricingSection}`}>
      <div className="container">
        <h2 className="sr-only">Three pricing tiers for ELHRMS: Multi-State Employer, Principal Employer, and Enterprise Group, segmented by compliance complexity rather than headcount.</h2>
        <div className={styles.grid}>
          {pricingTiers.map((tier, index) => {
            const Icon = tier.iconType === 'MapPin' ? MapPin : tier.iconType === 'ShieldCheck' ? ShieldCheck : Building2;

            return (
              <div
                key={index}
                className={`${styles.card} ${tier.isPopular ? styles.popularCard : ''}`}
                style={{ padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <Icon size={24} color={tier.isPopular ? 'var(--brand-xlight)' : 'var(--text-secondary)'} />
                  <span style={{
                    background: tier.isPopular ? 'var(--accent-secondary-dim)' : 'rgba(192, 184, 216, 0.1)',
                    color: tier.isPopular ? 'var(--brand-xlight)' : 'var(--text-secondary)',
                    fontSize: '13px', padding: '4px 12px', borderRadius: '99px', fontWeight: 600
                  }}>
                    {tier.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{tier.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.5 }}>{tier.subtitle}</p>

                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>{tier.priceText}</p>

                <ul style={{ fontSize: '14px', color: 'var(--text-primary)', flexGrow: 1, marginBottom: '24px' }}>
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <Check size={16} color={feature.accent ? 'var(--brand-xlight)' : 'var(--accent-green)'} style={{ marginRight: '8px', flexShrink: 0 }} strokeWidth={3} />
                      <span style={{ lineHeight: 1.4 }}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto' }}>
                  <Link href="/platform/demo" className={`btn ${tier.isPopular ? 'btn-accent glossy' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                    {tier.btnText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
