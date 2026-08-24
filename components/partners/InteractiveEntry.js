'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './InteractiveEntry.module.css';
import { Calculator, Users, UserPlus, TrendingUp, Check, ArrowRight } from 'lucide-react';

const roles = [
  { id: 'ca-accountants', label: 'Accountant / CA', icon: <Calculator size={24} /> },
  { id: 'hr-consultants', label: 'HR Consultant', icon: <Users size={24} /> },
  { id: 'recruitment-agencies', label: 'Recruitment Agency', icon: <UserPlus size={24} /> },
  { id: 'saas-partners', label: 'Sales Partner', icon: <TrendingUp size={24} /> }
];

export default function InteractiveEntry() {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/partners/${selectedRole}`);
    }
  };

  return (
    <section className="section-md" id="partner-entry">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.glow} />
          
          <div className={`card ${styles.mainCard} reveal`}>
            <div className={styles.header}>
              <div className={styles.pillLabel}>Interactive Segment</div>
              <h2 className={styles.title}>Tell Us About You</h2>
              <p className={styles.subtitle}>Select your role and we’ll tailor your partner experience.</p>
            </div>

            <div className={styles.roleGrid}>
              {roles.map((role) => (
                <button
                  key={role.id}
                  className={`${styles.roleCard} ${selectedRole === role.id ? styles.selected : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className={styles.roleIcon}>{role.icon}</div>
                  <span className={styles.roleLabel}>{role.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.footer}>
              <button 
                className={`btn btn-lg ${styles.continueBtn}`}
                disabled={!selectedRole}
                onClick={handleContinue}
              >
                <TrendingUp size={20} className={styles.btnIcon} />
                Continue
              </button>
              <p className={styles.microcopy}>
                Takes less than a minute • Personalized for you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
