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
  BarChart3
} from 'lucide-react';
import styles from './platform.module.css';

const lifecycleStages = [
  {
    id: 1,
    title: "Hire",
    icon: <Target size={32} strokeWidth={1.5} />,
    desc: "Accelerate your hiring process with an intelligent recruitment system that leverages AI to screen candidates, rank profiles, and reduce time-to-hire. Publish job openings across multiple platforms and manage candidates from a centralized dashboard.",
    features: ["Applicant Tracking System (ATS)", "AI-Based Resume Screening", "Multi-Channel Job Posting", "Interview Scheduling & Collaboration"],
    benefits: ["Reduce hiring time with automated workflows", "Improve candidate quality using AI screening", "Enhance recruiter productivity with smart insights"]
  },
  {
    id: 2,
    title: "Onboard",
    icon: <UserPlus size={32} strokeWidth={1.5} />,
    desc: "Deliver a seamless onboarding experience with fully digital workflows. Ensure compliance with labor laws and company policies while reducing paperwork and manual errors.",
    features: ["Paperless Onboarding Workflows", "Document Management System", "Statutory & Compliance Verification", "Employee Self-Service Portal"],
    benefits: ["Faster onboarding with zero paperwork", "Built-in compliance checks (PF, ESI, tax regulations)", "Improved new hire experience"]
  },
  {
    id: 3,
    title: "Manage",
    icon: <Settings size={32} strokeWidth={1.5} />,
    desc: "Gain real-time visibility into workforce operations with integrated attendance, leave tracking, and performance management tools. Empower HR teams with actionable insights and automated processes.",
    features: ["Attendance & Time Tracking", "Leave Management System", "Performance Management System (PMS)", "Employee Database & HR Analytics"],
    benefits: ["Real-time employee data and analytics", "Increased workforce productivity", "Transparent performance tracking"]
  },
  {
    id: 4,
    title: "Pay",
    icon: <Coins size={32} strokeWidth={1.5} />,
    desc: "Simplify complex payroll operations with automated salary calculations, tax deductions, and compliance filings. Ensure accuracy and timeliness with AI-powered payroll processing.",
    features: ["Automated Payroll Processing", "Tax Calculation & Filing", "Statutory Compliance (PF, ESI, TDS)", "Benefits & Compensation Management"],
    benefits: ["Error-free payroll with automation", "100% statutory compliance", "Faster payroll cycles and reporting"]
  },
  {
    id: 5,
    title: "Grow",
    icon: <TrendingUp size={32} strokeWidth={1.5} />,
    desc: "Drive employee growth and retention with continuous learning, performance tracking, and engagement initiatives. Use AI insights to identify skill gaps and recommend development paths.",
    features: ["Learning & Development (L&D)", "Continuous Performance Reviews", "Employee Engagement Tools", "Feedback & Survey Systems"],
    benefits: ["Higher employee retention", "Data-driven talent development", "Improved engagement and satisfaction"]
  },
  {
    id: 6,
    title: "Retire",
    icon: <LogOut size={32} strokeWidth={1.5} />,
    desc: "Ensure a smooth and compliant employee exit process with automated final settlements, asset recovery tracking, and structured exit workflows.",
    features: ["Full & Final Settlement Automation", "Exit Workflow Management", "Asset & Access Recovery", "Exit Interviews & Analytics"],
    benefits: ["Hassle-free employee offboarding", "Accurate final settlements", "Better insights into attrition trends"]
  }
];

export default function PlatformOverviewPage() {
  const [activeStage, setActiveStage] = useState(1);

  return (
    <div className={styles.platformContainer}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>Automate workforce operations, ensure statutory compliance, and model organization growth with intelligent workflows and real-time insights.</div>
        <h1 className={styles.heroTitle}>End-to-End Workforce Infrastructure<br/>for the Complete Employee Lifecycle</h1>
        <p className={styles.heroSubtitle}>
          Streamline every stage of your workforce journey—from hiring and onboarding to payroll, compliance, and strategic planning—with a unified, AI-powered Workforce OS designed for modern businesses.
        </p>
      </section>

      {/* Visual Lifecycle Section */}
      <section className={styles.lifecycleSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Employee Lifecycle: Hire to Retire Modules</h2>
          <p className={styles.sectionSubtitle}>
            Manage your entire employee lifecycle with a single, integrated compliance-first workforce infrastructure platform. Our modular system ensures seamless data flow, reduces manual effort, and empowers HR teams with AI-driven automation and decision support.
          </p>
        </div>

        {/* Milestone Card System */}
        <div className={styles.stepContainer}>
          {lifecycleStages.map((stage) => (
            <div 
              key={stage.id} 
              className={`${styles.stepCard} ${activeStage === stage.id ? styles.activeCard : ""}`}
              onClick={() => setActiveStage(stage.id)}
            >
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>0{stage.id}</span>
                <div className={styles.stepIcon}>{stage.icon}</div>
              </div>
              <h3 className={styles.stepTitle}>{stage.title}</h3>
              {activeStage === stage.id && <div className={styles.activeIndicator}></div>}
            </div>
          ))}
        </div>

        {/* Dynamic Detail Card */}
        <div className={styles.detailContainer}>
          {lifecycleStages.map((stage) => (
             <div 
               key={`detail-${stage.id}`} 
               className={`${styles.detailCard} ${activeStage === stage.id ? styles.activeDetail : ''}`}
             >
               <div className={styles.detailHeader}>
                 <div className={styles.detailIconWrapper}>{stage.icon}</div>
                 <div>
                    <h3 className={styles.detailTitle}>{stage.title} Workflow</h3>
                    <p className={styles.detailDesc}>{stage.desc}</p>
                 </div>
               </div>
               <div className={styles.detailFeaturesGrid}>
                  <div className={styles.featuresColumn}>
                    <h4 className={styles.columnHeader}>Modules Included</h4>
                    {stage.features.map((feature, i) => (
                      <div key={`feat-${i}`} className={styles.detailFeatureBox}>
                          <span className={styles.featureCheck}>✓</span>
                          {feature}
                      </div>
                    ))}
                  </div>

                  <div className={styles.featuresColumn}>
                    <h4 className={styles.columnHeader}>Key Benefits</h4>
                    {stage.benefits.map((benefit, i) => (
                      <div key={`ben-${i}`} className={styles.detailFeatureBox}>
                          <span className={styles.benefitCheck}>★</span>
                          {benefit}
                      </div>
                    ))}
                  </div>
               </div>
             </div>
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
          <Link href="#modules" className={styles.primaryBtn} onClick={(e) => { e.preventDefault(); document.querySelector(`.${styles.lifecycleSection}`).scrollIntoView({ behavior: 'smooth' }); }}>
            👉 See Modules in Action
          </Link>
          <Link href="/platform/demo" className={styles.secondaryBtn}>
            👉 Request a Demo
          </Link>
        </div>
      </section>

    </div>
  );
}
