import Link from 'next/link';

export const metadata = {
  title: 'yfy.ai for HR Leaders | Empower Your Workforce',
  description: 'Transform HR from an administrative function to a strategic powerhouse with India’s most advanced workforce operating system.',
};

export default function HRLeadersPage() {
  return (
    <div style={{ padding: '120px 2rem 4rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(107, 31, 162, 0.15)', color: 'var(--brand-light)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
        Solutions for CHROs & HR Leaders
      </div>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
        Empower your workforce.<br />
        <span className="text-gradient">Elevate HR strategy.</span>
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '3rem', lineHeight: 1.6 }}>
        Move beyond spreadsheets and disjointed tools. yfy.ai unifies talent acquisition, performance management, and core HR records into a single, intelligent operating system designed for the Indian enterprise.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
        <Link href="/platform/demo" className="btn btn-primary btn-lg">Request Enterprise Demo</Link>
        <Link href="/products" className="btn btn-outline btn-lg">Explore All Products</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Unified Talent Lifecycle</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Manage hiring, onboarding, performance, and learning in one seamless flow. Eliminate data silos between ATS, PMS, and HRMS.</p>
        </div>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Workforce Intelligence</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Get real-time insights into attrition risks, headcount forecasting, and diversity metrics to make proactive, strategic decisions.</p>
        </div>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Frictionless Employee Experience</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Provide your workforce with a consumer-grade mobile app for attendance, leave, expenses, and payslips.</p>
        </div>
      </div>
    </div>
  );
}
