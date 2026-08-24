import styles from './IntegrationsStrip.module.css';
import { 
  PieChart, BookOpen, CreditCard, 
  Mail, Inbox, Send, 
  Video, Monitor, MessageSquare, 
  MessageCircle, Smartphone, Fingerprint 
} from 'lucide-react';

const integrations = [
  { name: 'Tally Prime', icon: <PieChart size={28} strokeWidth={1.5} />, cat: 'Accounting' },
  { name: 'Zoho Books', icon: <BookOpen size={28} strokeWidth={1.5} />, cat: 'Accounting' },
  { name: 'RazorpayX', icon: <CreditCard size={28} strokeWidth={1.5} />, cat: 'Payments' },
  { name: 'Gmail', icon: <Mail size={28} strokeWidth={1.5} />, cat: 'Email' },
  { name: 'Outlook', icon: <Inbox size={28} strokeWidth={1.5} />, cat: 'Email' },
  { name: 'Zoho Mail', icon: <Send size={28} strokeWidth={1.5} />, cat: 'Email' },
  { name: 'Zoom', icon: <Video size={28} strokeWidth={1.5} />, cat: 'Meetings' },
  { name: 'Google Meet', icon: <Monitor size={28} strokeWidth={1.5} />, cat: 'Meetings' },
  { name: 'MS Teams', icon: <MessageSquare size={28} strokeWidth={1.5} />, cat: 'Meetings' },
  { name: 'WhatsApp', icon: <MessageCircle size={28} strokeWidth={1.5} />, cat: 'Messaging' },
  { name: 'Twilio SMS', icon: <Smartphone size={28} strokeWidth={1.5} />, cat: 'Messaging' },
  { name: 'Biometric', icon: <Fingerprint size={28} strokeWidth={1.5} />, cat: 'Attendance' },
];

export default function IntegrationsStrip() {
  return (
    <section className={`section-md ${styles.section}`} id="integrations">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Integrations</span>
          <h2>Connect HR, Finance &amp; Communication <span className="text-gradient">Without Silos</span></h2>
          <p>API-first architecture. Real-time sync. Zero data duplication.</p>
        </div>
      </div>

      {/* Marquee */}
      <div className={`marquee-track reveal`}>
        <div className="marquee-inner">
          {[...integrations, ...integrations].map((item, i) => (
            <div key={i} className={styles.logoCard}>
              <span className={styles.logoIcon}>{item.icon}</span>
              <span className={styles.logoName}>{item.name}</span>
              <span className={styles.logoCat}>{item.cat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.cta} reveal`}>
        <a href="/integrations" className="btn btn-outline">View All Integrations</a>
        <a href="/integrations#custom" className="btn btn-ghost">Request Custom Integration</a>
      </div>
    </section>
  );
}
