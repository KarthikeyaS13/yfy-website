import styles from './TrustBar.module.css';

export default function TrustBar() {
  const stats = [
    { value: '2,000+', label: 'Indian Enterprises' },
    { value: '300%', label: 'Faster Payroll' },
    { value: '60%', label: 'Compliance Cost Cut' },
    { value: '100%', label: 'White-Glove Migration' },
    { value: 'Zero', label: 'Operational Downtime' },
  ];
  return (
    <div className={styles.bar}>
      <div className={`container-lg ${styles.inner}`}>
        {stats.map((s, i) => (
          <div key={i} className={styles.stat}>
            <span className={styles.value}>{s.value}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
