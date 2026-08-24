import Link from 'next/link';
import { Sparkles, ArrowRight, Layers, ShieldCheck, TrendingUp, Server, Target } from 'lucide-react';
import styles from './products-overview.module.css';
import { productsData } from '@/data/productsData';

export const metadata = {
  title: 'Enterprise Workforce & Compliance Modules | yfy.ai Products Suite',
  description: 'Explore yfy.ai\'s unified suite of 15+ enterprise workforce and compliance modules: ATS, Core HRMS, Automated Payroll, PMS, LMS, Labour Codes Readiness, and Executive Analytics.',
  alternates: { canonical: '/products' },
};

export default function ProductsOverviewPage() {
  const allProducts = Object.values(productsData);
  const coreHr = allProducts.filter((p) => p.category === 'Core HR & Payroll');
  const talentMgmt = allProducts.filter((p) => p.category === 'Talent Management');
  const workforceOps = allProducts.filter((p) => p.category === 'Workforce Operations');
  const complianceIntel = allProducts.filter((p) => p.category === 'Compliance Intelligence');
  const workforceIntel = allProducts.filter((p) => p.category === 'Workforce Intelligence');
  const platformOps = allProducts.filter((p) => p.category === 'Platform & Operations');

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        
        {/* Hero Section */}
        <section className={`${styles.heroSection} reveal`}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>The yfy.ai Product Suite</span>
          </div>
          <h1 className={styles.title}>
            A Unified Workforce Platform <br />
            <span className="text-gradient">Built for Growing Indian Businesses</span>
          </h1>
          <p className={styles.subtitle}>
            Say goodbye to messy spreadsheets and disconnected HR software. Discover our easy-to-use, modular applications that automate hiring, attendance, payroll, and statutory compliance from a single, secure platform.
          </p>
        </section>

        {/* Pillar 1: Core HR & Payroll */}
        {coreHr.length > 0 && (
          <section className={`${styles.pillarSection} reveal`}>
            <div className={styles.pillarHeader}>
              <Layers size={28} className="text-gradient" />
              <h2 className={styles.pillarTitle}>Core HR & Payroll</h2>
              <span className={styles.pillarDesc}>Essential tools for workforce data, attendance, and zero-error payroll</span>
            </div>
            
            <div className={styles.grid}>
              {coreHr.map((prod) => (
                <Link key={prod.slug} href={`/products/${prod.slug}`} className={styles.card}>
                  <span className={styles.cardBadge}>{prod.badge}</span>
                  <h3 className={styles.cardTitle}>{prod.title}</h3>
                  <p className={styles.cardDesc}>{prod.metaDesc}</p>
                  <div className={styles.cardLinkText}>
                    <span>Explore Features</span>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Pillar 2: Talent Management */}
        {talentMgmt.length > 0 && (
          <section className={`${styles.pillarSection} reveal`}>
            <div className={styles.pillarHeader}>
              <Target size={28} style={{ color: '#ec4899' }} />
              <h2 className={styles.pillarTitle}>Talent Management</h2>
              <span className={styles.pillarDesc}>Attract, develop, and retain top talent across your organization</span>
            </div>
            
            <div className={styles.grid}>
              {talentMgmt.map((prod) => (
                <Link key={prod.slug} href={`/products/${prod.slug}`} className={styles.card}>
                  <span className={styles.cardBadge}>{prod.badge}</span>
                  <h3 className={styles.cardTitle}>{prod.title}</h3>
                  <p className={styles.cardDesc}>{prod.metaDesc}</p>
                  <div className={styles.cardLinkText}>
                    <span>Explore Features</span>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Pillar 3: Workforce Operations */}
        {workforceOps.length > 0 && (
          <section className={`${styles.pillarSection} reveal`}>
            <div className={styles.pillarHeader}>
              <ShieldCheck size={28} style={{ color: '#3b82f6' }} />
              <h2 className={styles.pillarTitle}>Workforce Operations</h2>
              <span className={styles.pillarDesc}>Manage complex field staff, contract labour, and manpower agencies</span>
            </div>
            
            <div className={styles.grid}>
              {workforceOps.map((prod) => (
                <Link key={prod.slug} href={`/products/${prod.slug}`} className={styles.card}>
                  <span className={styles.cardBadge}>{prod.badge}</span>
                  <h3 className={styles.cardTitle}>{prod.title}</h3>
                  <p className={styles.cardDesc}>{prod.metaDesc}</p>
                  <div className={styles.cardLinkText}>
                    <span>Explore Features</span>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Pillar 4: Compliance Intelligence */}
        {complianceIntel.length > 0 && (
          <section className={`${styles.pillarSection} reveal`}>
            <div className={styles.pillarHeader}>
              <ShieldCheck size={28} style={{ color: '#10b981' }} />
              <h2 className={styles.pillarTitle}>Compliance Intelligence</h2>
              <span className={styles.pillarDesc}>Effortless legal protection, automated return filing, and New Labour Codes 2020 readiness</span>
            </div>
            
            <div className={styles.grid}>
              {complianceIntel.map((prod) => (
                <Link key={prod.slug} href={`/products/${prod.slug}`} className={styles.card}>
                  <span className={styles.cardBadge}>{prod.badge}</span>
                  <h3 className={styles.cardTitle}>{prod.title}</h3>
                  <p className={styles.cardDesc}>{prod.metaDesc}</p>
                  <div className={styles.cardLinkText}>
                    <span>Explore Features</span>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Pillar 5: Workforce Intelligence */}
        {workforceIntel.length > 0 && (
          <section className={`${styles.pillarSection} reveal`}>
            <div className={styles.pillarHeader}>
              <TrendingUp size={28} style={{ color: '#f59e0b' }} />
              <h2 className={styles.pillarTitle}>Workforce Intelligence</h2>
              <span className={styles.pillarDesc}>Smart headcount planning, labor budgeting, and retention analytics for leadership</span>
            </div>
            
            <div className={styles.grid}>
              {workforceIntel.map((prod) => (
                <Link key={prod.slug} href={`/products/${prod.slug}`} className={styles.card}>
                  <span className={styles.cardBadge}>{prod.badge}</span>
                  <h3 className={styles.cardTitle}>{prod.title}</h3>
                  <p className={styles.cardDesc}>{prod.metaDesc}</p>
                  <div className={styles.cardLinkText}>
                    <span>Explore Features</span>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Pillar 6: Platform & Operations */}
        {platformOps.length > 0 && (
          <section className={`${styles.pillarSection} reveal`}>
            <div className={styles.pillarHeader}>
              <Server size={28} style={{ color: '#8b5cf6' }} />
              <h2 className={styles.pillarTitle}>Platform & Operations</h2>
              <span className={styles.pillarDesc}>Enterprise-grade security, access controls, and digital document vaults</span>
            </div>
            
            <div className={styles.grid}>
              {platformOps.map((prod) => (
                <Link key={prod.slug} href={`/products/${prod.slug}`} className={styles.card}>
                  <span className={styles.cardBadge}>{prod.badge}</span>
                  <h3 className={styles.cardTitle}>{prod.title}</h3>
                  <p className={styles.cardDesc}>{prod.metaDesc}</p>
                  <div className={styles.cardLinkText}>
                    <span>Explore Features</span>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
