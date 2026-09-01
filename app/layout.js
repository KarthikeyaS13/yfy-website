import './globals.css';
import Script from 'next/script';
import GlobalScripts from '../components/GlobalScripts';
import AIChat from '@/components/AIChat';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import TopProgressBar from '@/components/TopProgressBar';

export const metadata = {
  metadataBase: new URL('https://yfy.ai'),
  title: {
    default: 'India’s Compliance-First Workforce Infrastructure Platform | ATS • HRMS • Payroll • PMS • LMS • Workforce Intelligence',
    template: '%s | yfy.ai',
  },
  icons: {
    icon: '/yfy-logo.jpg',
    apple: '/yfy-logo.jpg',
  },
  description:
    'yfy.ai is India\'s Compliance-First Workforce Infrastructure Platform. A Workforce Intelligent Operating System unifying ATS, HRMS, payroll, compliance intelligence, and workforce analytics.',
  keywords: [
    'Workforce Infrastructure Platform', 'Workforce OS India', 'Compliance Management System India',
    'HRMS India', 'Payroll software India', 'Indian Labour Codes 2020', 'Compliance intelligence',
    'Workforce Intelligence', 'ATS India', 'Employee lifecycle management', 'Workforce Planning & Budgeting'
  ],
  authors: [{ name: 'yfy.ai' }],
  openGraph: {
    type: 'website',
    siteName: 'yfy.ai',
    title: 'yfy.ai – India\'s Compliance-First Workforce Infrastructure Platform',
    description: 'India\'s workforce intelligent operating system unifying hiring, payroll, compliance, and budgeting in one platform.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yfy.ai – India\'s Compliance-First Workforce Infrastructure Platform',
    description: 'A single intelligent system unifying workforce operations, compliance intelligence, and decision-making.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'yfy.ai',
              url: 'https://yfy.ai',
              logo: 'https://yfy.ai/logo.png',
              description:
                'yfy.ai is India\'s compliance-first workforce infrastructure platform, an intelligent operating system unifying ATS, HRMS, payroll, compliance intelligence, and workforce analytics.',
              sameAs: [
                'https://www.linkedin.com/showcase/yfy-ai/',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'sales',
                email: 'sales@yfy.ai',
                availableLanguage: ['English', 'Hindi'],
              },
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GlobalScripts />
        <AIChat />
        <TopProgressBar />
      </body>
    </html>
  );
}

