import PartnersHero from '@/components/partners/PartnersHero';
import PartnerTypes from '@/components/partners/PartnerTypes';
import InteractiveEntry from '@/components/partners/InteractiveEntry';
import ValueProps from '@/components/partners/ValueProps';
import HowItWorks from '@/components/partners/HowItWorks';
import PartnersTrust from '@/components/partners/PartnersTrust';
import PartnersCTA from '@/components/partners/PartnersCTA';

export const metadata = {
  title: 'yfy® Partners Program – Grow Your Business with Payroll & HR Tech',
  description:
    'Join the yfy® partner ecosystem. We help Accountants, HR Consultants, Recruitment Agencies, and SaaS Sales partners unlock new revenue streams with India-first payroll & HR technology.',
  alternates: { canonical: '/partners' },
};

export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <PartnerTypes />
      <InteractiveEntry />
      <ValueProps />
      <HowItWorks />
      <PartnersTrust />
      <PartnersCTA />
    </>
  );
}
