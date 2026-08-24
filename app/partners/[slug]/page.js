'use client';
import { useEffect, use } from 'react';
import { partnersData } from '@/data/partnersData';
import styles from './PartnerDetail.module.css';
import { CheckCircle2, ArrowLeft, Target, ShieldCheck, Zap, Briefcase, Rocket } from 'lucide-react';
import Link from 'next/link';
import PartnerApplyForm from '@/components/partners/PartnerApplyForm';

export default function PartnerDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const data = partnersData[params.slug];

  useEffect(() => {
    if (data?.seo?.title) {
      document.title = data.seo.title;
    }
  }, [data]);

  if (!data) {
    return (
      <div className={styles.notFound}>
        <h1>Partner Program Not Found</h1>
        <Link href="/partners" className="btn btn-primary">Back to Partners</Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <main>
        {/* Detail Hero */}
        <section className={styles.hero}>
          <div className={styles.gridOverlay} />
          <div className="container">
            <Link href="/partners" className={styles.backLink} aria-label="Back to partners">
              <ArrowLeft size={16} /> Back to Partners
            </Link>
            
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <div className={styles.iconBox}>{data.icon}</div>
                <h1 className={`${styles.title} h1`}>{data.heroHeadline}</h1>
                <h2 className={styles.subHeadline}>{data.heroSubHeadline}</h2>
                <p className={`${styles.description} text-lg`}>{data.heroDescription}</p>
                
                <div className={styles.ctaButtons}>
                  <a href="#register" className="btn btn-primary btn-lg">
                    {data.ctaSection.buttonLabel}
                  </a>
                  <a href="/platform/demo" className="btn btn-outline btn-lg">Book a Demo</a>
                </div>
              </div>

              {data.heroImage && (
                <div className={styles.heroVisual}>
                  <div className={styles.glassImageWrapper}>
                    <img src={data.heroImage} alt={data.title} className={styles.heroImg} />
                    <div className={styles.imageOverlay}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        {data.whySection && (
          <section className="section">
            <div className="container">
              <div className="section-header">
                <span className="section-label">Partnership Benefits</span>
                <h2 className="h2">{data.whySection.title}</h2>
              </div>

              <div className={styles.whyGrid}>
                {data.whySection.items.map((item, i) => (
                  <WhyCard key={i} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dual Stack Section (Optional) */}
        {data.dualStackSection && (
          <section className="section-lg bg-dark-soft">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="h2">{data.dualStackSection.title}</h2>
              </div>
              <div className={styles.stackGrid}>
                {data.dualStackSection.stacks.map((stack, i) => (
                  <div key={i} className={styles.stackCard}>
                    <span className={styles.stackLabel}>{stack.label}</span>
                    <h3 className={styles.stackName}>{stack.name}</h3>
                    <ul className={styles.stackFeatures}>
                      {stack.features.map((feat, j) => (
                        <li key={j} className={styles.stackFeature}>
                          {i === 0 ? <Rocket className={styles.rocketIcon} size={18} /> : <Zap className={styles.lightningIcon} size={18} />}
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Built For Section */}
        {data.builtForSection && (
          <section className="section-lg">
            <div className="container">
              <div className={styles.builtForWrapper}>
                <div className={styles.builtForContent}>
                  <h2 className="h2">{data.builtForSection.title}</h2>
                  <div className={styles.checklist}>
                    {data.builtForSection.features.map((feature, i) => (
                      <div key={i} className={styles.checkItem}>
                        <CheckCircle2 size={24} className={styles.checkIcon} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.builtForVisual}>
                  {/* Decorative icon or visual representation */}
                  <ShieldCheck size={200} strokeWidth={1} style={{ opacity: 0.1, color: 'var(--brand-xlight)' }} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Deep Dive Section (Optional) */}
        {data.deepDiveSection && (
          <section className="section-lg bg-dark">
            <div className="container">
              <div className={styles.deepDiveBox}>
                <h2 className="h2 mb-2">{data.deepDiveSection.title}</h2>
                <p className={styles.deepDiveSubtitle}>{data.deepDiveSection.subtitle}</p>
                
                <div className={styles.deepDiveGrid}>
                  {data.deepDiveSection.items.map((item, i) => (
                    <div key={i} className={styles.deepDiveCard}>
                      <CheckCircle2 size={20} className={styles.checkIcon} />
                      <span className={styles.deepDiveText}>{item}</span>
                    </div>
                  ))}
                </div>

                <p className={styles.deepDiveFooter}>{data.deepDiveSection.footer}</p>
              </div>
            </div>
          </section>
        )}

        {/* Who Is This For */}
        {data.whoIsThisFor && (
          <section className="section">
            <div className="container">
              <div className="section-header">
                <span className="section-label">Target Network</span>
                <h2 className="h2">{data.whoIsThisFor.title}</h2>
              </div>
              <div className={styles.audienceGrid}>
                {data.whoIsThisFor.items.map((item, i) => (
                  <div key={i} className={styles.audienceCard}>
                    <Briefcase size={24} className={styles.audienceIcon} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Partner Form */}
        <section className="section" id="register">
          <div className="container">
            <PartnerApplyForm type={params.slug} title={data.title} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-lg">
          <div className="container">
            <div className={styles.ctaBox}>
              <h2 className="h2">{data.ctaSection.title}</h2>
              <p className="text-lg opacity-80 mb-8">{data.ctaSection.subtitle || data.ctaSection.description}</p>
              <div className={styles.ctaButtons}>
                <a href="#register" className="btn btn-primary btn-lg">
                  {data.ctaSection.buttonLabel}
                </a>
                <a href="/platform/demo" className="btn btn-outline btn-lg">Book a Demo</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Inline helper for card hover effect
function WhyCard({ item }) {
  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className={styles.whyCard} onMouseMove={handleMouseMove}>
      <div className={styles.featureIcon}>
        <Zap size={32} />
      </div>
      <h3 className={styles.featureTitle}>{item.title}</h3>
      <p className={styles.featureDesc}>{item.description}</p>
    </div>
  );
}
