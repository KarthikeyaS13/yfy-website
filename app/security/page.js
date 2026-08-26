import React from 'react';

export const metadata = {
  title: 'Security Policies | yfy.ai',
  description: 'Security Policies and Compliance for yfy.ai - India\'s Compliance-First Workforce Infrastructure Platform.',
  alternates: { canonical: '/security' },
};

export default function SecurityPoliciesPage() {
  return (
    <main style={{ padding: '120px 0 80px', background: 'var(--bg-base)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Security Policies</h1>
        <p style={{ marginBottom: '3rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>Last Updated: 01/01/2025</p>

        <section style={{ marginBottom: '3rem' }}>
          <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            At yfy®, security is foundational to everything we do. We understand that our customers trust us with their most sensitive workforce and financial data. Our security program is designed to protect your data with enterprise-grade safeguards, ensuring confidentiality, integrity, and availability.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>1. Compliance and Certifications</h2>
          <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            We adhere to rigorous international standards and undergo regular independent audits to validate our security controls.
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>ISO 9001:2015:</strong> Certified Quality Management System.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>ISO 27001:2022:</strong> Certified Information Security Management System (ISMS).</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>ISO 27701:2019:</strong> Certified Privacy Information Management System (PIMS).</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>DPDP Act Compliance:</strong> Fully compliant with the Indian Digital Personal Data Protection Act.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>2. Data Encryption</h2>
          <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            Your data is protected using strong encryption standards both in transit and at rest.
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>In Transit:</strong> All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>At Rest:</strong> All customer data is encrypted at rest using AES-256 encryption. Our database volumes, backups, and file storage are fully encrypted.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>3. Access Control and Authentication</h2>
          <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            We implement strict access controls to ensure that only authorized individuals can access your data.
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Role-Based Access Control (RBAC):</strong> Customers can define granular permissions for their users, ensuring least-privilege access.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Internal Access:</strong> yfy® employee access to production environments is strictly restricted, logged, and requires Multi-Factor Authentication (MFA) and VPN connections.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>MFA:</strong> We strongly encourage and support Multi-Factor Authentication for all user accounts.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>4. Infrastructure and Network Security</h2>
          <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            Our infrastructure is hosted on top-tier cloud providers with state-of-the-art physical and network security.
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Data Residency:</strong> Customer data is hosted within secure data centers located in India to ensure compliance with local regulations.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Network Isolation:</strong> Production databases are hosted in private subnets, inaccessible from the public internet.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Monitoring:</strong> 24/7 monitoring and alerting systems are in place to detect and respond to suspicious activity immediately.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>5. Vulnerability Management</h2>
          <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            We continuously test our systems to identify and mitigate potential vulnerabilities.
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Penetration Testing:</strong> We conduct regular third-party penetration testing of our application and infrastructure.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Vulnerability Scanning:</strong> Automated security scanning is integrated into our CI/CD pipeline to catch vulnerabilities before code is deployed.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>6. Incident Response</h2>
          <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            We have a documented Incident Response Plan that outlines procedures for detecting, investigating, and communicating security incidents. In the event of a data breach, we will notify affected customers in accordance with our legal and contractual obligations.
          </p>
        </section>
        
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Report a Security Vulnerability</h2>
          <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
            If you believe you have found a security vulnerability in our platform, please report it to us immediately.
          </p>
          <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--text-primary)' }}><strong>Security Team</strong></p>
            <p style={{ fontSize: '1.05rem' }}>Email: <a href="mailto:security@yfy.ai" style={{ color: 'var(--brand-xlight)', textDecoration: 'none', fontWeight: '500' }}>security@yfy.ai</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}
