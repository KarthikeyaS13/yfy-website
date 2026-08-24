import Link from 'next/link';
import { Globe, Server, ShieldCheck, Fingerprint, MessageSquare, Calendar, Briefcase, Zap } from 'lucide-react';
import styles from './integrations.module.css';

export const metadata = {
  title: 'Enterprise Integrations | yfy.ai',
  description: 'Connect yfy.ai with your existing ecosystem. Native integrations for SAP, Oracle, Biometric Devices, WhatsApp, Job Boards, and Active Directory.',
  alternates: { canonical: '/integrations' },
};

export default function IntegrationsPage() {
  return (
    <main className={styles.platformContainer}>
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroBadge}>Native API Architecture</div>
            <h1 className={styles.heroTitle}>Connect Your Entire Enterprise Stack</h1>
            <p className={styles.heroDesc}>
              yfy.ai natively integrates with global ERPs, local accounting software, biometric hardware, and enterprise identity providers. Eliminate data silos across your organization.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/platform/demo" className="btn btn-primary btn-lg">Request API Documentation</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--bg-base)' }}>
        <div className="container">
          
          {/* TIER 1: CORE INFRASTRUCTURE */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Tier 1: Core Infrastructure</h2>
            <div className={styles.grid}>
              {/* ERP & Accounting */}
              <div className={styles.card}>
                <div className={styles.iconBox}><Globe size={32} strokeWidth={1.5} /></div>
                <h3>ERP & Accounting Sync</h3>
                <p>Push payroll journal entries directly to your general ledger with zero manual touch.</p>
                <ul className={styles.stageFeatures}>
                  <li>SAP SuccessFactors / ERP</li>
                  <li>Oracle NetSuite</li>
                  <li>TallyPrime (Direct XML Sync)</li>
                  <li>Zoho Books</li>
                </ul>
              </div>
              
              {/* Identity */}
              <div className={styles.card}>
                <div className={styles.iconBox}><ShieldCheck size={32} strokeWidth={1.5} /></div>
                <h3>Identity & SSO</h3>
                <p>One-click provisioning and de-provisioning. Supports SAML 2.0 and OAuth.</p>
                <ul className={styles.stageFeatures}>
                  <li>Microsoft Active Directory</li>
                  <li>Okta</li>
                  <li>Google Workspace</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TIER 2: WORKFORCE OPERATIONS */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Tier 2: Workforce Operations</h2>
            <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {/* Hardware & Biometrics */}
              <div className={styles.card}>
                <div className={styles.iconBox}><Fingerprint size={32} strokeWidth={1.5} /></div>
                <h3>Hardware & Biometrics</h3>
                <p>Real-time attendance push from hardware devices to the yfy cloud.</p>
                <ul className={styles.stageFeatures}>
                  <li>ESSL & Matrix Devices</li>
                  <li>Facial Recognition APIs</li>
                  <li>Access Control Gates</li>
                </ul>
              </div>

              {/* Communication */}
              <div className={styles.card}>
                <div className={styles.iconBox}><MessageSquare size={32} strokeWidth={1.5} /></div>
                <h3>Communication & Dispatch</h3>
                <p>Automate blue-collar payslip delivery and shift alerts via SMS/chat.</p>
                <ul className={styles.stageFeatures}>
                  <li>WhatsApp Business API</li>
                  <li>Twilio SMS Gateway</li>
                  <li>Slack & MS Teams Bots</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TIER 3: TALENT & PRODUCTIVITY */}
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Tier 3: Talent & Productivity</h2>
            <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {/* Job Boards */}
              <div className={styles.card}>
                <div className={styles.iconBox}><Briefcase size={32} strokeWidth={1.5} /></div>
                <h3>Talent Sourcing</h3>
                <p>Post jobs and sync candidate profiles directly into the yfy.ai ATS.</p>
                <ul className={styles.stageFeatures}>
                  <li>LinkedIn Recruiter</li>
                  <li>Naukri.com</li>
                  <li>Indeed</li>
                </ul>
              </div>

              {/* Calendars */}
              <div className={styles.card}>
                <div className={styles.iconBox}><Calendar size={32} strokeWidth={1.5} /></div>
                <h3>Interviews & Calendars</h3>
                <p>Automated interview scheduling and video link generation.</p>
                <ul className={styles.stageFeatures}>
                  <li>Google Calendar / Meet</li>
                  <li>Outlook / MS Teams</li>
                  <li>Zoom API</li>
                </ul>
              </div>

              {/* Developer APIs */}
              <div className={styles.card}>
                <div className={styles.iconBox}><Server size={32} strokeWidth={1.5} /></div>
                <h3>Open Webhooks</h3>
                <p>Build custom workflows using our secure developer APIs.</p>
                <ul className={styles.stageFeatures}>
                  <li>GraphQL & REST endpoints</li>
                  <li>Real-time event webhooks</li>
                  <li>Rate-limit protected architecture</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
