import Link from 'next/link';
import { Users, MessageCircle, Calendar, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './Community.module.css';

export const metadata = {
  title: 'Community | yfy HR & Compliance Network',
  description: 'Join the largest HR & Compliance Community in India. Connect with peers, get expert advice, and stay updated with compliance changes.',
};

const features = [
  {
    icon: <Users size={24} />,
    title: 'Peer Networking',
    description: 'Connect with hundreds of HR professionals and business leaders across India. Share experiences and build your network.',
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Expert Discussions',
    description: 'Stuck on a tricky compliance question? Get answers directly from vetted payroll and labor law experts.',
  },
  {
    icon: <Calendar size={24} />,
    title: 'Exclusive Events',
    description: 'Get priority access to our monthly webinars, town halls, and in-person HR meetups happening in your city.',
  },
  {
    icon: <GraduationCap size={24} />,
    title: 'Resource Library',
    description: 'Access premium templates, compliance checklists, and guides tailored for Indian businesses.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Policy Updates',
    description: 'Receive real-time alerts whenever there are changes in EPF, ESI, TDS, or state-specific labor laws.',
  },
];

const stats = [
  { label: 'Active Members', value: '500+' },
  { label: 'Questions Answered', value: '1,200+' },
  { label: 'Monthly Events', value: '2+' },
];

export default function CommunityPage() {
  return (
    <>
      <main className={styles.communityPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <span className={styles.heroTag}>yfy HR Network</span>
          <h1 className={styles.title}>Never navigate HR & Compliance alone.</h1>
          <p className={styles.subtitle}>
            Join India's most active community of HR professionals, founders, and compliance experts. Share knowledge, solve problems, and grow together.
          </p>
          <div className={styles.heroActions}>
            <Link href="/platform/demo" className={styles.primaryButton}>
              Join the Community <ArrowRight size={18} />
            </Link>
            <Link href="#features" className={styles.secondaryButton}>
              Explore Benefits
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Why join our network?</h2>
          <div className={styles.grid}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.iconWrapper}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
