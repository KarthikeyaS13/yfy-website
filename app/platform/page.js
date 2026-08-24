'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Target, 
  UserPlus, 
  Settings, 
  Coins, 
  TrendingUp, 
  LogOut, 
  Zap, 
  Globe, 
  RefreshCw, 
  Shield, 
  Smartphone, 
  Lock,
  Presentation,
  BarChart3
} from 'lucide-react';
import styles from './platform.module.css';



export default function PlatformOverviewPage() {
  const [activeStage, setActiveStage] = useState(1);

  const platformModules = [
    {
      title: "Employee Lifecycle",
      desc: "Hire to Retire modules with AI-powered automation.",
      link: "/platform/employeelifecycle",
      icon: <Target size={32} strokeWidth={1.5} />,
      color: "var(--brand-light)"
    },
    {
      title: "ROI Calculator",
      desc: "Calculate your potential savings and efficiency gains.",
      link: "/platform/roi",
      icon: <TrendingUp size={32} strokeWidth={1.5} />,
      color: "var(--accent-green)"
    },
    {
      title: "Book a Demo",
      desc: "See our zero-error payroll platform in action.",
      link: "/platform/demo",
      icon: <Presentation size={32} strokeWidth={1.5} />,
      color: "var(--brand-xlight)"
    }
  ];

  return (
    <div className={styles.platformContainer}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>yfy.ai Platform Overview</div>
        <h1 className={styles.heroTitle}>India’s Compliance-First<br/>Workforce Infrastructure Platform</h1>
        <p className={styles.heroSubtitle}>
          An intelligent operating system designed to unify workforce operations, compliance intelligence, and strategic planning into a single platform.
        </p>
      </section>

      {/* Module Overview Grid */}
      <section className={styles.modulesIntro}>
        <div className={styles.featuresGrid}>
          {platformModules.map((mod, i) => (
            <Link href={mod.link} key={i} className={styles.featureBox} style={{ cursor: 'pointer' }}>
              <div className={styles.iconBox} style={{ color: mod.color }}>{mod.icon}</div>
              <h3 className={styles.featureTitle}>{mod.title}</h3>
              <p className={styles.featureDesc}>{mod.desc}</p>
              <span style={{ color: 'var(--brand-light)', fontSize: '0.9rem', fontWeight: '600', marginTop: 'auto' }}>
                Explore Module →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why YFY Section */}
      <section className={styles.whySection}>
        <h2 className={styles.sectionTitle} style={{marginBottom: "40px"}}>Why Choose a Workforce Intelligent Operating System?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureBox}>
            <div className={styles.iconBox}><Zap size={32} strokeWidth={1.5} /></div>
            <h3 className={styles.featureTitle}>Workforce Management</h3>
            <p className={styles.featureDesc}>One unified system for ATS, HRMS, Payroll, PMS, and LMS, eliminating disconnected data silos.</p>
          </div>
          <div className={styles.featureBox}>
             <div className={styles.iconBox}><RefreshCw size={32} strokeWidth={1.5} /></div>
             <h3 className={styles.featureTitle}>Compliance Intelligence</h3>
             <p className={styles.featureDesc}>Active compliance engine assessing statutory applicability, state rules, and automating filings.</p>
          </div>
          <div className={styles.featureBox}>
             <div className={styles.iconBox}><TrendingUp size={32} strokeWidth={1.5} /></div>
             <h3 className={styles.featureTitle}>Workforce Intelligence</h3>
             <p className={styles.featureDesc}>Model staffing overheads, predict attrition risk, and forecast future headcount growth.</p>
          </div>
          <div className={styles.featureBox}>
             <div className={styles.iconBox}><Lock size={32} strokeWidth={1.5} /></div>
             <h3 className={styles.featureTitle}>Infrastructure Security</h3>
             <p className={styles.featureDesc}>Natively compliant data storage with ISO 27001 & SOC-2 compliance for complete peace of mind.</p>
          </div>
          <div className={styles.featureBox}>
             <div className={styles.iconBox}><BarChart3 size={32} strokeWidth={1.5} /></div>
             <h3 className={styles.featureTitle}>Actionable Analytics</h3>
             <p className={styles.featureDesc}>Empower leadership with real-time dashboards answering if the business is compliant and optimized.</p>
          </div>
        </div>
      </section>

      {/* Deployment & Security */}
      <section className={styles.splitSection}>
        <div className={styles.infoCard}>
          <div className={styles.iconBox} style={{marginBottom: '1.5rem'}}><RefreshCw size={32} strokeWidth={1.5} /></div>
          <h3>Deployment Flexibility</h3>
          <p>
            Whether you are a mid-market organization preferring a robust cloud SaaS, or a large enterprise requiring on-premise dedicated server security, yfy.ai bends to your infrastructure needs.
          </p>
          <ul className={styles.stageFeatures}>
            <li>Multi-tenant Cloud SaaS</li>
            <li>Single-tenant Managed Server</li>
            <li>On-Premise Enterprise Deployment</li>
          </ul>
        </div>
        
        <div className={styles.infoCard}>
          <div className={styles.iconBox} style={{marginBottom: '1.5rem'}}><Lock size={32} strokeWidth={1.5} /></div>
          <h3>Uncompromising Security</h3>
          <p>
            Enterprise-grade data encryption at rest and in transit. Your payroll and employee PII data is secured with absolute compliance to local privacy regimes.
          </p>
          <div className={styles.badgeContainer}>
            <span className={styles.securityBadge}>ISO 9001:2015</span>
            <span className={styles.securityBadge}>ISO 27001:2022</span>
            <span className={styles.securityBadge}>ISO 27701:2019</span>
            <span className={styles.securityBadge}>SOC-2 Type II</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <h2>Ready to transform your HR?</h2>
        <p>Join over 2,000+ Indian companies running compliant, automated payroll on yfy.ai.</p>
        <div className={styles.ctaButtons}>
          <Link href="/platform/demo" className={styles.primaryBtn}>
            👉 Request a Demo
          </Link>
          <Link href="/platform/roi" className={styles.secondaryBtn}>
            👉 Calculate ROI
          </Link>
        </div>
      </section>

    </div>
  );
}
