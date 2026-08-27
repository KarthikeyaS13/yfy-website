import styles from './CaseStudies.module.css';

export const metadata = {
  title: 'Case Studies | yfy',
  description: 'Customer success stories coming soon.',
};

export default function CaseStudiesPage() {
  return (
    <main className={styles.caseStudiesPage}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem' }}>
        <h1 className={styles.title}>Coming Soon</h1>
        <p className={styles.subtitle}>
          We are currently gathering incredible stories from our customers. Check back soon!
        </p>
      </div>
    </main>
  );
}
