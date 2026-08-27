import HeroSection from '@/components/home/HeroSection';
import PricingCards from '@/components/home/PricingCards';
import TrustBar from '@/components/home/TrustBar';

import WhyYfy from '@/components/home/WhyYfy';
import FeaturesSnapshot from '@/components/home/FeaturesSnapshot';
import ComplianceUSP from '@/components/home/ComplianceUSP';
import IntegrationsStrip from '@/components/home/IntegrationsStrip';
import Testimonials from '@/components/home/Testimonials';
import IsoCerts from '@/components/home/IsoCerts';
import ROITeaser from '@/components/home/ROITeaser';
import FinalCTA from '@/components/home/FinalCTA';

export const metadata = {
  title: 'India’s Compliance-First Workforce Infrastructure Platform | ATS • HRMS • Payroll • PMS • LMS • Workforce Intelligence',
  description:
    "India's workforce landscape is becoming increasingly complex. yfy.ai unifies hiring, employee records, payroll, compliance, performance, learning, and budgeting into a single intelligent operating system.",
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PricingCards />
      {/* <TrustBar /> */}

      {/* <ComplianceUSP /> */}
      {/* <WhyYfy /> */}
      {/* <FeaturesSnapshot /> */}
      {/* <IntegrationsStrip /> */}
      {/* <Testimonials /> */}
      <IsoCerts />
      <ROITeaser />
      <FinalCTA />
    </>
  );
}
