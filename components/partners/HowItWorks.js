import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    title: 'Choose Your Partner Type',
    desc: 'Tell us about your business and goals.'
  },
  {
    number: '02',
    title: 'Get Onboarded',
    desc: 'Our team helps you set up and start quickly.'
  },
  {
    number: '03',
    title: 'Start Growing',
    desc: 'Manage clients, deliver services, and earn revenue.'
  }
];

export default function HowItWorks() {
  return (
    <section className="section section-md" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Process</span>
          <h2 className="h2">Get Started in 3 Simple Steps</h2>
        </div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div key={i} className={`${styles.step} reveal reveal-delay-${i + 1}`}>
              <div className={styles.numberRow}>
                <span className={styles.number}>{step.number}</span>
                {i < steps.length - 1 && <div className={styles.connector} />}
              </div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
