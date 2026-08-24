import Link from 'next/link';

export const metadata = {
  title: 'yfy.ai for Finance Leaders | Control Costs & Compliance',
  description: 'Unify payroll, expenses, and compliance to drive financial predictability and protect your bottom line.',
};

export default function FinanceLeadersPage() {
  return (
    <div style={{ padding: '120px 2rem 4rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(107, 31, 162, 0.15)', color: 'var(--brand-light)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
        Solutions for CFOs & Finance Teams
      </div>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
        Control costs.<br />
        <span className="text-gradient">Mitigate compliance risk.</span>
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '3rem', lineHeight: 1.6 }}>
        Finance teams need accuracy and predictability. yfy.ai automates payroll, syncs native journal entries to your ERP, and acts as an active shield against statutory penalties across all Indian states.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
        <Link href="/platform/demo" className="btn btn-primary btn-lg">Request Enterprise Demo</Link>
        <Link href="/platform/roi" className="btn btn-outline btn-lg">Calculate ROI</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Zero-Touch Payroll</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Automate gross-to-net calculations with 100% accuracy. Instantly generate bank files, payslips, and tax computations without manual intervention.</p>
        </div>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Active Compliance Shield</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Never pay a penalty again. Automated PF, ESI, TDS, and state-specific LWF and PT filings powered by real-time intelligence.</p>
        </div>
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Enterprise ERP Integration</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>Seamlessly sync payroll and expense data to Oracle, SAP, Tally Prime, and Zoho. Say goodbye to manual journal entries.</p>
        </div>
      </div>
    </div>
  );
}
