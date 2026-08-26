import Link from 'next/link';
import { Users, Briefcase, CircleDollarSign, LineChart, ArrowRight, Lightbulb } from 'lucide-react';
import styles from './About.module.css';

export const metadata = {
  title: 'About Us | yfy HR & Finance',
  description: 'Developed by FINNOVO®, the yfy® platform is the outcome of a strategic collaboration between qualified professionals and tech experts.',
};

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <span className={styles.heroSubtitle}>Powered by FINNOVO®</span>
        <h1 className={styles.heroTitle}>About Us</h1>
        <p className={styles.heroDescription}>
          Developed by FINNOVO®, the yfy® platform is the outcome of a strategic collaboration between qualified professionals—such as CA's, CMA's and MBA's and Tech experts. By combining expertise in finance, HR, and technology, it effectively addresses the real-world challenges of managing finance and HR functions.
        </p>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h2 className={styles.missionTitle}>Supercharge Growth with yfy®—Seamless HR & Finance Integration!</h2>
        <p className={styles.missionText}>
          At yfy®, we understand that human capital is the backbone of every organization. Moreover, effective HR and finance management requires seamless collaboration across departments. Our mission is to effortlessly integrate these functions, driving both efficiency and effectiveness. By empowering organizations with streamlined, automated processes, we help fuel productivity, accelerate growth and unlock their full potential.
        </p>
      </section>

      {/* Workflow Grid Section */}
      <section className={styles.workflowSection}>
        <header className={styles.workflowHeader}>
          <h2 className={styles.workflowTitle}>Integrations cut time and costs by optimizing workflows.</h2>
        </header>

        <div className={styles.grid}>
          {/* Employee */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Users size={24} />
            </div>
            <h3 className={styles.cardTitle}>For Employee</h3>
            <p className={styles.cardDescription}>
              yfy® automates attendance, leave, tax planning and forms, making processes seamless and freeing up time for more important tasks.
            </p>
          </div>

          {/* HR */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Briefcase size={24} />
            </div>
            <h3 className={styles.cardTitle}>For HR</h3>
            <p className={styles.cardDescription}>
              yfy® revolutionizes recruitment and employee management, integrating with communication & mail services for effortless operations.
            </p>
          </div>

          {/* Finance */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <CircleDollarSign size={24} />
            </div>
            <h3 className={styles.cardTitle}>For Finance</h3>
            <p className={styles.cardDescription}>
              yfy® simplifies financial workflows and automates compliance (TDS, PF, ESI, PT), ensuring accuracy and saving time for higher-value work.
            </p>
          </div>

          {/* Management */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <LineChart size={24} />
            </div>
            <h3 className={styles.cardTitle}>For Management</h3>
            <p className={styles.cardDescription}>
              yfy® provides real-time analytics, role-based access and secure cloud storage, offering insights and full control anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Content Blocks */}
      <section className={styles.contentSection}>
        <div className={styles.contentBlock}>
          <h2 className={styles.contentTitle}>WHY yfy®?</h2>
          <div className={styles.contentText}>
            <p>
              At FINNOVO®, we go beyond providing tools—we transform entire processes. Our mission is to seamlessly integrate digital solutions into your organization's daily operations.
            </p>
            <p>
              By eliminating repetitive tasks, breaking down data silos and ensuring continuity even amidst employee turnover, we foster a scalable, efficient environment that propels long-term success.
            </p>
          </div>
        </div>

        <div className={styles.contentBlock}>
          <h2 className={styles.contentTitle}>Our Commitment to Innovation!</h2>
          <div className={styles.contentText}>
            <p>
              We constantly adopt cutting-edge technologies to stay ahead of the curve. As your organization evolves, the yfy® platform will grow with you, integrating more digital processes to keep you at the forefront of innovation.
            </p>
            <p>
              Our commitment is to make yfy® a vital driver of your success, enhancing operational efficiency and boosting productivity.
            </p>
          </div>
        </div>
      </section>

      {/* RekrutIQ Section */}
      <section className={styles.rekrutIQSection}>
        <h2 className={styles.rekrutIQTitle}>
          <Lightbulb size={28} color="var(--primary)" />
          Introducing <span>rekrutIQ™</span>
        </h2>
        <p className={styles.rekrutIQText}>
          In addition to yfy®, we are also proud to introduce rekrutIQ™, a specialized solution designed for recruitment and staffing companies. rekrutIQ™ digitalizes the entire recruitment process—from client management and billing to contract payroll handling—ensuring smooth operations and enhancing efficiency.
          <br /><br />
          With yfy® and our upcoming innovations, we're revolutionizing how organizations work—helping them become more efficient, connected and successful in today's rapidly changing business landscape.
        </p>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Transform Your Organization?</h2>
        <p className={styles.ctaDescription}>
          Unlock the full potential of your organization with yfy®. Streamline your HR and finance processes and stay ahead of the competition. Request a demo or sign up now to see how yfy® can transform your business!
        </p>
        <Link href="/platform/demo" className={styles.primaryButton}>
          Request Demo <ArrowRight size={20} />
        </Link>
      </section>
    </main>
  );
}
