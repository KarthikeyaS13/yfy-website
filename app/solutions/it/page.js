import Link from 'next/link';

export const metadata = {
  title: 'yfy.ai for IT Leaders | Secure & Scalable Architecture',
  description: 'Enterprise-grade security, rapid deployment, and deep integrations for the modern IT ecosystem.',
};

export default function ITLeadersPage() {
  return (
    <div style={{ padding: '120px 2rem 4rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(107, 31, 162, 0.15)', color: 'var(--brand-light)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
        Solutions for CIOs & IT Leaders
      </div>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
        Secure by design.<br />
        <span className="text-gradient">Built for enterprise scale.</span>
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '3rem', lineHeight: 1.6 }}>
        Consolidate your HR tech stack safely. yfy.ai delivers ISO-certified security, Single Sign-On (SSO), and Role-Based Access Control (RBAC) to ensure your workforce data remains protected and compliant.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
        <Link href="/platform/demo" className="btn btn-primary btn-lg">Request Enterprise Demo</Link>
        <Link href="/products/rbac" className="btn btn-outline btn-lg">Explore RBAC Security</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>ISO Certified Security</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Certified under ISO 27001:2022 (InfoSec) and ISO 27701:2019 (Privacy). We maintain the highest standards of data encryption and protection.</p>
        </div>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Identity & Access Management</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Native integrations with Microsoft Entra ID, Okta, and Google Workspace. Granular RBAC ensures users only see what they need to see.</p>
        </div>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Open API Ecosystem</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Connect yfy.ai to your existing infrastructure via robust REST APIs. Automate onboarding workflows with Active Directory and IT asset provisioning.</p>
        </div>
      </div>
    </div>
  );
}
