import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './CaseStudies.module.css';
import { caseStudiesData } from '@/data/caseStudiesData';

export const metadata = {
  title: 'Case Studies | yfy',
  description: 'See how businesses use yfy to automate payroll, streamline compliance, and scale operations.',
};

export default function CaseStudiesPage() {
  return (
    <>
      <main className={styles.caseStudiesPage}>
        <div className="container">
          <header className={styles.hero}>
            <h1 className={styles.title}>Customer Success Stories</h1>
            <p className={styles.subtitle}>
              Discover how leading companies are transforming their payroll and compliance operations with yfy.
            </p>
          </header>

          <div className={styles.grid}>
            {caseStudiesData.map((study) => (
              <Link href={`/case-studies/${study.slug}`} key={study.slug} className={styles.card}>
                <span className={styles.industryTag}>{study.industry}</span>
                <h2 className={styles.cardTitle}>{study.title}</h2>
                <p className={styles.cardExcerpt}>{study.description}</p>
                <div className={styles.cardMeta}>
                  <span className={styles.client}>{study.clientName}</span>
                  <span className={styles.readMore}>
                    Read Case Study <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
