import { notFound } from 'next/navigation';
import ProductClientView from '@/components/products/ProductClientView';
import { productsData } from '@/data/productsData';

export async function generateStaticParams() {
  return Object.keys(productsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const product = productsData[slug];

  if (!product) {
    return {
      title: 'Product Not Found | yfy.ai',
    };
  }

  return {
    title: product.metaTitle || `${product.title} | yfy.ai`,
    description: product.metaDesc || product.subheadline,
    keywords: [
      product.title,
      product.category,
      'yfy.ai',
      'Workforce Management Software India',
      'Indian Payroll Software',
      'Attendance Tracking Software India',
      'Labour Law Compliance India'
    ],
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: product.metaTitle || `${product.title} | yfy.ai`,
      description: product.metaDesc || product.subheadline,
      url: `https://yfy.ai/products/${slug}`,
      type: 'website',
      siteName: 'yfy.ai',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metaTitle || `${product.title} | yfy.ai`,
      description: product.metaDesc || product.subheadline,
    },
  };
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const product = productsData[slug];

  if (!product) {
    notFound();
  }

  // Build AEO & SEO structured JSON-LD schemas
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${product.title} - yfy.ai`,
    operatingSystem: 'Web, iOS, Android, Cloud OS',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://yfy.ai/products/${slug}`,
    },
    description: product.metaDesc || product.subheadline,
    publisher: {
      '@type': 'Organization',
      name: 'yfy.ai',
      url: 'https://yfy.ai',
    },
  };

  const faqSchema =
    product.faqs && product.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: product.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <ProductClientView product={product} />
    </>
  );
}
