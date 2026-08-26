import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import styles from '../CaseStudies.module.css';
import { caseStudiesData } from '@/data/caseStudiesData';

export function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const study = caseStudiesData.find((s) => s.slug === resolvedParams.slug);
  if (!study) return { title: 'Not Found' };

  return {
    title: `${study.title} | yfy Case Studies`,
    description: study.description,
  };
}

export default async function CaseStudyDetail({ params }) {
  const resolvedParams = await params;
  const study = caseStudiesData.find((s) => s.slug === resolvedParams.slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <main className={styles.detailPage}>
        <article className="container">
          <header className={styles.detailHeader}>
            <Link href="/case-studies" className={styles.backLink}>
              <ArrowLeft size={16} /> Back to Case Studies
            </Link>
            <h1 className={styles.detailTitle}>{study.title}</h1>
            <div className={styles.detailMeta}>
              <span className={styles.client}>Client: {study.clientName}</span>
              <span className={styles.separator}>•</span>
              <span className={styles.industry}>Industry: {study.industry}</span>
            </div>
          </header>

          <div className={styles.detailContent}>
            <p className={styles.lead}>{study.description}</p>
            
            <div className={styles.metricsGrid}>
              {study.metrics.map((metric, idx) => (
                <div key={idx} className={styles.metricCard}>
                  <div className={styles.metricValue}>{metric.value}</div>
                  <div className={styles.metricLabel}>{metric.label}</div>
                </div>
              ))}
            </div>

            <h2>The Challenge</h2>
            <p>{study.challenge}</p>

            <h2>The Solution</h2>
            <p>{study.solution}</p>

            <h2>Implementation</h2>
            <p>{study.implementation}</p>

            <h2>Key Results</h2>
            <ul>
              {study.results.map((result, idx) => (
                <li key={idx}>{result}</li>
              ))}
            </ul>

            <div className={styles.ctaSection}>
              <h2>Ready to achieve similar results?</h2>
              <p>See how yfy can transform your payroll and compliance operations.</p>
              <Link href="/contact" className={styles.primaryButton} style={{ marginTop: '1rem' }}>
                Request a Demo
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
