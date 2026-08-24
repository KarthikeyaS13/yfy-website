'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import styles from './ProductClientView.module.css';
import { productsData } from '@/data/productsData';

// Dynamic Icon Component
const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.Sparkles;
  return <IconComponent className={className} />;
};

export default function ProductClientView({ product }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!product) return null;

  // Get related products data
  const relatedProductsList = (product.relatedProducts || []).map((slug) => productsData[slug]).filter(Boolean);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        
        {/* Hero Section */}
        <section className={`${styles.heroSection} reveal`}>
          <div className={styles.categoryTag}>
            <Icons.Sparkles size={16} />
            <span>{product.category} • {product.badge}</span>
          </div>
          <h1 className={styles.title}>{product.headline}</h1>
          <p className={styles.subtitle}>{product.subheadline}</p>
          
          <div className={styles.ctaButtons}>
            <Link href="/platform/demo" className={styles.btnPrimary}>
              <span>Book a Live Demo</span>
              <Icons.ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className={styles.btnSecondary}>
              <span>View Pricing Plans</span>
            </Link>
          </div>

          {/* Hero Stats */}
          {product.heroStats && product.heroStats.length > 0 && (
            <div className={styles.statsGrid}>
              {product.heroStats.map((stat, idx) => (
                <div key={idx} className={styles.statCard}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div className={styles.statDesc}>{stat.desc}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Why Choose / Benefits Section */}
        {product.architectureSection && (
          <section className={`${styles.archSection} reveal`}>
            <div className={styles.archHeader}>
              <Icons.ShieldCheck size={24} className="text-gradient" />
              <span className={styles.archBadge}>Key Advantages & Business Benefits</span>
            </div>
            <h2 className={styles.archTitle}>{product.architectureSection.title}</h2>
            <p className={styles.archDesc}>{product.architectureSection.desc}</p>
            
            <div className={styles.archGrid}>
              {(product.architectureSection.highlights || []).map((item, idx) => {
                const [boldText, ...rest] = item.split(': ');
                return (
                  <div key={idx} className={styles.archHighlightItem}>
                    <div className={styles.archIconWrapper}>
                      <Icons.CheckCircle2 size={20} />
                    </div>
                    <div className={styles.archHighlightText}>
                      <strong>{boldText}{rest.length > 0 ? ':' : ''}</strong>
                      {rest.join(': ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Key Features Grid */}
        <section className={`${styles.featuresSection} reveal`}>
          <h2 className={styles.sectionTitle}>Built for Scale, Simplicity & Efficiency</h2>
          <p className={styles.sectionSubtitle}>
            Explore the smart tools and intuitive features designed to make daily workforce management effortless for your team.
          </p>
          
          <div className={styles.featuresGrid}>
            {(product.keyFeatures || []).map((feat, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <DynamicIcon name={feat.icon} size={26} />
                </div>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureDesc}>{feat.desc}</p>
                
                {feat.items && feat.items.length > 0 && (
                  <ul className={styles.featureItemsList}>
                    {feat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className={styles.featureItem}>
                        <Icons.CheckCircle2 size={16} className={styles.featureItemIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Steps Section */}
        {product.workflowSteps && product.workflowSteps.length > 0 && (
          <section className={`${styles.workflowSection} reveal`}>
            <h2 className={styles.sectionTitle}>How It Works in Practice</h2>
            <p className={styles.sectionSubtitle}>
              A simple, step-by-step workflow engineered to save you time and eliminate manual paperwork.
            </p>
            
            <div className={styles.workflowGrid}>
              {product.workflowSteps.map((step, idx) => (
                <div key={idx} className={styles.workflowStep}>
                  <div className={styles.stepNumber}>{step.step}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AEO / FAQs Section */}
        {product.faqs && product.faqs.length > 0 && (
          <section className={`${styles.faqSection} reveal`}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Clear answers to common questions about how {product.title} helps your business grow.
            </p>
            
            <div className={styles.faqList}>
              {product.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={styles.faqItem}>
                    <button
                      className={styles.faqHeader}
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <Icons.ChevronUp size={20} className={styles.faqIcon} />
                      ) : (
                        <Icons.ChevronDown size={20} className={styles.faqIcon} />
                      )}
                    </button>
                    {isOpen && (
                      <div className={styles.faqBody}>
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Products Section */}
        {relatedProductsList && relatedProductsList.length > 0 && (
          <section className={`${styles.relatedSection} reveal`}>
            <h2 className={styles.sectionTitle}>Explore Related Modules</h2>
            <p className={styles.sectionSubtitle}>
              Discover how our connected workforce modules work together seamlessly across your organization.
            </p>
            
            <div className={styles.relatedGrid}>
              {relatedProductsList.map((rel, idx) => (
                <Link key={idx} href={`/products/${rel.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedCategory}>{rel.category}</div>
                  <h3 className={styles.relatedTitle}>{rel.title}</h3>
                  <p className={styles.relatedDesc}>{rel.metaDesc}</p>
                  <div className={styles.relatedLinkText}>
                    <span>Learn More</span>
                    <Icons.ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className={`${styles.ctaBanner} reveal`}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Workplace Operations?</h2>
          <p className={styles.ctaDesc}>
            Join growing businesses across India that have switched from disconnected HR tools to yfy.ai's unified, easy-to-use workforce platform.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/platform/demo" className={styles.btnPrimary}>
              <span>Schedule a Live Demo</span>
              <Icons.ArrowRight size={18} />
            </Link>
            <Link href="/platform/roi" className={styles.btnSecondary}>
              <span>Calculate Your ROI Savings</span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
