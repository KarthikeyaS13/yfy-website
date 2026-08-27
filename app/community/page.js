import styles from './Community.module.css';

export const metadata = {
  title: 'Community | yfy HR & Compliance Network',
  description: 'Community platform coming soon.',
};

export default function CommunityPage() {
  return (
    <main className={styles.communityPage}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem' }}>
        <h1 className={styles.title}>Coming Soon</h1>
        <p className={styles.subtitle}>
          Our community platform is under construction. We can't wait to share it with you!
        </p>
      </div>
    </main>
  );
}
