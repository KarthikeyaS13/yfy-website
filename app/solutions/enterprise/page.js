"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowRight, 
  Server, 
  Lock, 
  Activity, 
  Users, 
  Box, 
  Ticket, 
  Settings2, 
  Fingerprint, 
  Database, 
  Headphones, 
  FileCheck, 
  TrendingUp,
  Globe,
  Briefcase
} from "lucide-react";
import Navbar from "../../../components/ui/Navbar";
import styles from "./enterprise.module.css";

const EnterprisePage = () => {
  const whyChooseEnterprise = [
    { title: "Full Suite Coverage", desc: "End-to-end management from hire to retire with custom modules." },
    { title: "Dedicated Account Management", desc: "Bespoke support from senior relationship managers." },
    { title: "Enterprise Security", desc: "Bank-grade controls with SSO, MFA, and granular RBAC." },
    { title: "Scalable Architecture", desc: "Built to handle 100k+ employees with zero performance lag." }
  ];

  const enterpriseModules = [
    { 
      label: "Growth + Talent", 
      title: "Consultants Module", 
      desc: "Manage external workforces, contracts, and vendor payments alongside your core team.",
      icon: <Users className={styles.cardIcon} />
    },
    { 
      label: "Operations", 
      title: "Internal Ticketing", 
      desc: "Streamline employee requests, HR queries, and IT support with an integrated helpdesk.",
      icon: <Ticket className={styles.cardIcon} />
    },
    { 
      label: "Resources", 
      title: "Asset Tracking", 
      desc: "Centralized lifecycle management for IT assets, equipment, and company property.",
      icon: <Box className={styles.cardIcon} />
    },
    { 
      label: "Automation", 
      title: "Custom Workflows", 
      desc: "Design complex approval matrices and automated logic tailored to your SOPs.",
      icon: <Settings2 className={styles.cardIcon} />
    },
    { 
      label: "Identity", 
      title: "Advanced Security", 
      desc: "Seamless SSO integration, multi-factor authentication, and SOC 2 Type II audit logs.",
      icon: <Fingerprint className={styles.cardIcon} />
    },
    { 
      label: "Support", 
      title: "Dedicated SLA", 
      desc: "24/7 technical support with guaranteed response times and priority escalation.",
      icon: <Headphones className={styles.cardIcon} />
    }
  ];

  return (
    <div className={styles.container}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.prestigeBadge}>
            <ShieldCheck size={16} /> Enterprise Excellence | Over 1M+ Records Managed
          </div>
          <h1 className={styles.heroTitle}>Enterprise Workforce Infrastructure & OS Tailored to Your Complex Needs</h1>
          <p className={styles.heroSubtitle}>
            A Compliance-First Workforce Infrastructure Platform unifying workforce operations, active compliance intelligence, and workforce decision support.
          </p>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
            <Link href="/demo" className={styles.buttonEnterprise}>
              Request Custom Demo <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className={styles.buttonSales}>
              Contact Sales
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Image 
            src="/assets/enterprise-hero.png" 
            alt="Enterprise Architecture Visualization" 
            width={1200} 
            height={800} 
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* Why Enterprises Choose yfy® */}
      <section className={styles.section} style={{ background: "rgba(107, 31, 162, 0.03)" }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Enterprises Choose yfy®</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>
            Uncompromising security meet infinite scalability.
          </p>
        </div>
        <div className={styles.mosaicGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {whyChooseEnterprise.map((item, i) => (
            <div key={i} className={styles.mosaicCard} style={{ padding: "2.5rem" }}>
              <div style={{ color: "var(--brand-light)", marginBottom: "1.5rem" }}><ShieldCheck size={32} /></div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>{item.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "60px", opacity: 0.6 }}>
          <p style={{ letterSpacing: "0.2em", fontWeight: "700" }}>SOC 2 TYPE II COMPLIANT | DATA RESIDENCY: INDIA | DPDP READY</p>
        </div>
      </section>

      {/* Enterprise Modules */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The Ultimate Suite</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>
            Modular components designed for high-headcount efficiency.
          </p>
        </div>
        <div className={styles.mosaicGrid}>
          {enterpriseModules.map((module, i) => (
            <div key={i} className={styles.mosaicCard}>
              <span className={styles.cardLabel}>{module.label}</span>
              {module.icon}
              <h3 style={{ fontSize: "1.6rem", fontWeight: "700", marginBottom: "1.25rem" }}>{module.title}</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>{module.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance & Risk */}
      <section className={styles.archSection}>
        <div className={styles.infraGrid}>
          <div>
            <h2 className={styles.sectionTitle}>Compliance & Risk Management</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginBottom: "2.5rem" }}>
              Enterprise-grade compliance automation across all regulatory requirements.
            </p>
            <div style={{ display: "grid", gap: "2rem" }}>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Activity color="var(--brand-light)" size={28} />
                <div>
                  <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Predictive Risk Dashboards</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Real-time monitoring of regulatory status and upcoming filings across multiple states.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <FileCheck color="var(--brand-light)" size={28} />
                <div>
                  <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Audit-Ready Governance</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Comprehensive immutable logs for every transaction, change, and approval.</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "20px", padding: "3rem" }}>
            <h4 style={{ marginBottom: "2rem", textAlign: "center" }}>Compliance Status</h4>
            <div style={{ display: "grid", gap: "1rem" }}>
              {["PF Filing", "ESI Compliance", "Audit Trail", "DPDP Consent"].map(item => (
                <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px" }}>
                  <span>{item}</span>
                  <ShieldCheck size={16} color="#00ff88" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section className={styles.section}>
        <div className={styles.infraGrid} style={{ gridTemplateColumns: "0.8fr 1.2fr" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Database size={200} color="rgba(107, 31, 162, 0.2)" />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Platform Security</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "3rem" }}>
              Encrypted at rest (AES-256) and in transit (TLS 1.3). Granular role-based permissions ensure that only the right people have access to sensitive data.
            </p>
            <div className={styles.mosaicGrid} style={{ gridTemplateColumns: "1fr 1fr", padding: 0 }}>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "2rem", borderRadius: "12px" }}>
                <Lock size={24} color="var(--brand-light)" style={{ marginBottom: "1rem" }} />
                <h5>Identity & Access</h5>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>SAML 2.0 / SSO Integration with Azure AD, Okta, and Google Workspace.</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "2rem", borderRadius: "12px" }}>
                <Globe size={24} color="var(--brand-light)" style={{ marginBottom: "1rem" }} />
                <h5>Data Residency</h5>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Localization and residency options following DPDP requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className={styles.section} style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Enterprise Success Stories</h2>
        </div>
        <div className={styles.mosaicGrid} style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className={styles.mosaicCard}>
            <h4 style={{ marginBottom: "1rem" }}>Large-Scale Retail Deployment</h4>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Managed 15,000+ employees across 200+ locations with centralized compliance and automated shift rotations.</p>
            <p style={{ fontWeight: "700", color: "var(--brand-light)" }}>Result: 35% reduction in administrative overhead.</p>
          </div>
          <div className={styles.mosaicCard}>
            <h4 style={{ marginBottom: "1rem" }}>Global Tech Engineering Hub</h4>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Seamless SSO integration and custom onboarding workflows for a high-growth engineering team of 5,000.</p>
            <p style={{ fontWeight: "700", color: "var(--brand-light)" }}>Result: 50% faster onboarding time.</p>
          </div>
        </div>
      </section>

      {/* ROI Matrix */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>ROI & TCO Projections</h2>
          <p style={{ color: "var(--text-secondary)" }}>Calculated for a 3-5 year organization lifecycle.</p>
        </div>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
          <table className={styles.roiTable}>
            <thead>
              <tr>
                <th>Focus Area</th>
                <th>Efficiency Gain</th>
                <th>Risk Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Payroll Operations</td>
                <td>+65%</td>
                <td>99.9% Error Reduction</td>
              </tr>
              <tr>
                <td>Statutory Filing</td>
                <td>+80%</td>
                <td>Zero Non-Compliance Penalties</td>
              </tr>
              <tr>
                <td>Recruitment & Onboarding</td>
                <td>+45%</td>
                <td>Reduced Time-to-Fill</td>
              </tr>
              <tr>
                <td>IT Asset Management</td>
                <td>+30%</td>
                <td>Reduced Asset Leakage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.section} style={{ textAlign: "center", background: "radial-gradient(circle at center, rgba(107, 31, 162, 0.1) 0%, transparent 100%)" }}>
        <h2 className={styles.heroTitle} style={{ fontSize: "3.5rem" }}>Tailored for Your Enterprise</h2>
        <p className={styles.sectionDesc} style={{ marginBottom: "3rem" }}>Request a custom demo or connect with our solutions team to explore bespoke configurations.</p>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
          <Link href="/demo" className={styles.buttonEnterprise}>Request Custom Demo</Link>
          <Link href="/contact" className={styles.buttonSales}>Contact Sales</Link>
        </div>
      </section>

      {/* Footer Branding Persistence */}
      <footer style={{ padding: "80px 0", textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}>
        <p style={{ fontWeight: "700", color: "var(--text-secondary)", marginBottom: "1rem" }}>yfy® - Enterprise Grade Governance</p>
        <p style={{ fontSize: "0.875rem" }}>&copy; 2026 yfy. All rights reserved. yfy® is a registered trademark.</p>
      </footer>
    </div>
  );
};

export default EnterprisePage;
