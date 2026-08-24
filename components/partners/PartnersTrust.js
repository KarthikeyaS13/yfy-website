import styles from './PartnersTrust.module.css';
import { ShieldCheck, MapPin, BarChart3 } from 'lucide-react';

export default function PartnersTrust() {
  const trustItems = [
    {
      icon: <ShieldCheck size={24} />,
      label: 'Secure & compliant platform'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Designed for Indian payroll & regulations'
    },
    {
      icon: <BarChart3 size={24} />,
      label: 'Scalable for mid-market and large enterprises'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <h3 className={styles.heading}>Trusted by Growing Businesses & Professionals</h3>
          <div className={styles.grid}>
            {trustItems.map((item, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.icon}>{item.icon}</div>
                <span className={styles.label}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
