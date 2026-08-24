import { Calculator, Users, UserPlus, TrendingUp } from 'lucide-react';

export const partnersData = {
  'ca-accountants': {
    title: 'CA & Accountants',
    slug: 'ca-accountants',
    icon: <Calculator size={48} />,
    seo: {
      title: 'Payroll Software for Accountants & CAs | Partner with yfy®',
      description: 'Manage payroll for multiple clients with ease. Join yfy® accountant partner program and earn recurring revenue with automated payroll & compliance.'
    },
    heroHeadline: 'Payroll Software for Accountants & CAs',
    heroSubHeadline: 'Turn Client Payroll into a Recurring Revenue Stream',
    heroDescription: 'yfy® helps accountants and chartered accountants manage payroll for multiple clients from a single dashboard — while expanding into high-value advisory services.',
    heroImage: '/images/partners/ca-hero.png',
    
    whySection: {
      title: 'Why Accountants Partner with yfy®',
      items: [
        {
          title: 'Manage Multiple Clients in One Place',
          description: 'Handle payroll for all your clients without switching tools.'
        },
        {
          title: 'Automate Compliance & Filings',
          description: 'Stay compliant with tax regulations, PF, ESI, and more — automatically.'
        },
        {
          title: 'Offer Advisory Services',
          description: 'Use real-time insights to provide strategic financial guidance.'
        },
        {
          title: 'Earn Recurring Revenue',
          description: 'Charge clients for payroll services or earn through referrals.'
        }
      ]
    },
    
    builtForSection: {
      title: 'Built for Modern Accounting Firms',
      features: [
        'Multi-client payroll dashboard',
        'Employee payslip automation',
        'Tax calculations & filings',
        'Integration with accounting tools',
        'Secure cloud-based platform'
      ]
    },
    
    whoIsThisFor: {
      title: 'Who Is This For?',
      items: [
        'Chartered Accountants (CAs)',
        'Accounting firms',
        'Tax consultants',
        'Bookkeeping professionals'
      ]
    },
    
    ctaSection: {
      title: 'Get Started as an Accountant Partner',
      description: 'Start managing payroll for your clients with ease and grow your practice.',
      buttonLabel: 'Join the Accountant Partner Program'
    }
  },
  'hr-consultants': {
    title: 'HR Consultants',
    slug: 'hr-consultants',
    icon: <Users size={48} />,
    seo: {
      title: 'HR Software for Consultants | HR Partner Program | yfy®',
      description: 'Offer payroll and HR services with yfy®. Join our HR consultant partner program and scale your services with automation and analytics.'
    },
    heroHeadline: 'HR Software for Consultants',
    heroSubHeadline: 'Deliver End-to-End HR Services with yfy®',
    heroDescription: 'Move beyond advisory and provide complete HR execution with payroll, compliance, and workforce management — all in one platform.',
    heroImage: '/images/partners/hr-hero.png',
    
    whySection: {
      title: 'Why HR Consultants Choose yfy®',
      items: [
        {
          title: 'Expand Your Service Offering',
          description: 'Provide payroll, attendance, leave, and compliance services.'
        },
        {
          title: 'Automate HR Operations',
          description: 'Reduce manual work with ready-to-use workflows.'
        },
        {
          title: 'Deliver Data-Driven Insights',
          description: 'Use analytics to improve workforce performance.'
        },
        {
          title: 'Increase Client Value',
          description: 'Charge more by offering tech-enabled HR services.'
        }
      ]
    },
    
    builtForSection: {
      title: 'Everything You Need to Scale',
      features: [
        'Payroll & compliance automation',
        'Attendance & leave management',
        'Employee lifecycle management',
        'HR analytics dashboard'
      ]
    },
    
    whoIsThisFor: {
      title: 'Who Is This For?',
      items: [
        'HR consultants',
        'HR advisory firms',
        'People operations specialists',
        'Compliance consultants'
      ]
    },
    
    ctaSection: {
      title: 'Become an HR Partner',
      description: 'Empower your consulting practice with technology.',
      buttonLabel: 'Partner with yfy® as an HR Consultant'
    }
  },
  'recruitment-agencies': {
    title: 'Recruitment Agencies',
    slug: 'recruitment-agencies',
    icon: <UserPlus size={48} />,
    seo: {
      title: 'ATS & Payroll Software for Recruitment Agencies | yfy® + Rekrutiq',
      description: 'Manage hiring with Rekrutiq ATS and run payroll with yfy®. Join our recruitment partner program to unlock recurring revenue and manage the full employee lifecycle.'
    },
    heroHeadline: 'Recruitment Software with ATS & Payroll',
    heroSubHeadline: 'Go Beyond Hiring — Own the Employee Lifecycle',
    heroDescription: 'With Rekrutiq + yfy®, recruitment agencies can manage hiring, onboarding, and payroll in one seamless ecosystem — enabling long-term client relationships and predictable recurring revenue.',
    heroImage: '/images/partners/recruitment-hero.png',
    
    whySection: {
      title: 'Why Recruitment Agencies Partner with yfy®',
      items: [
        {
          title: 'Multi-Client ATS Powered by Rekrutiq',
          description: 'Track candidates, job openings, and hiring pipelines across multiple clients using a modern ATS built for agencies.'
        },
        {
          title: 'Seamless Hiring to Payroll',
          description: 'Move candidates from offer to onboarding and directly into payroll with yfy® — no data duplication.'
        },
        {
          title: 'Track Hiring Performance',
          description: 'Measure placements, client performance, and hiring ROI with built-in analytics.'
        },
        {
          title: 'Build Recurring Revenue',
          description: 'Go beyond one-time placement fees by offering ongoing payroll and workforce management services.'
        }
      ]
    },

    dualStackSection: {
      title: 'One Platform. Complete Hiring + Payroll Stack.',
      stacks: [
        {
          name: 'Rekrutiq ATS',
          label: 'Talent Sourcing',
          features: [
            'Multi-client applicant tracking',
            'Job posting & candidate pipeline management',
            'Interview scheduling & collaboration'
          ]
        },
        {
          name: 'yfy® Payroll & HR',
          label: 'Workforce Management',
          features: [
            'Employee onboarding workflows',
            'Payroll processing & compliance',
            'Payslips, tax filings, and reports'
          ]
        }
      ]
    },
    
    builtForSection: {
      title: 'Built for Modern Recruitment & Staffing Firms',
      features: [
        'Manage multiple clients from a single dashboard',
        'Reduce manual coordination between hiring & HR',
        'Deliver a full-service offering (hire → onboard → pay)',
        'Improve client retention with ongoing services'
      ]
    },

    deepDiveSection: {
      title: 'Why Combine Rekrutiq + yfy®?',
      subtitle: 'Most recruitment tools stop at hiring. With Rekrutiq + yfy®, you can:',
      items: [
        'Extend client relationships beyond hiring',
        'Create predictable monthly revenue streams',
        'Differentiate your agency with a tech-enabled offering'
      ],
      footer: 'From candidate pipeline to payroll — all in one ecosystem.'
    },
    
    whoIsThisFor: {
      title: 'Who Is This For?',
      items: [
        'Recruitment agencies',
        'Staffing firms',
        'Talent acquisition consultants',
        'Executive search firms'
      ]
    },
    
    ctaSection: {
      title: 'Upgrade Your Recruitment Business',
      description: 'Turn hiring into a long-term revenue engine with Rekrutiq and yfy®.',
      buttonLabel: 'Join the Recruitment Partner Program'
    }
  },
  'saas-partners': {
    title: 'SaaS Sales Partners',
    slug: 'saas-partners',
    icon: <TrendingUp size={48} />,
    seo: {
      title: 'SaaS Reseller Program | Earn Recurring Revenue | yfy®',
      description: 'Join yfy® SaaS partner program. Resell payroll & HR software and earn recurring commissions with full sales support.'
    },
    heroHeadline: 'SaaS Reseller Partner Program',
    heroSubHeadline: 'Sell Payroll Software. Earn Every Month.',
    heroDescription: 'yfy® offers a high-demand payroll and HR platform that businesses need every month — giving you predictable recurring income.',
    heroImage: '/images/partners/saas-hero.png',
    
    whySection: {
      title: 'Why Become a yfy® Sales Partner',
      items: [
        {
          title: 'Recurring Commissions',
          description: 'Earn monthly revenue from every client you bring.'
        },
        {
          title: 'High-Demand Product',
          description: 'Payroll is essential for every business.'
        },
        {
          title: 'Easy to Sell',
          description: 'Simple pricing and clear value proposition.'
        },
        {
          title: 'Full Sales Support',
          description: 'Get training, demos, and partner enablement.'
        }
      ]
    },
    
    builtForSection: {
      title: 'What You Get',
      features: [
        'Sales training & materials',
        'Demo support',
        'Dedicated partner manager',
        'Marketing resources'
      ]
    },
    
    whoIsThisFor: {
      title: 'Who Is This For?',
      items: [
        'SaaS resellers',
        'Consultants & advisors',
        'Agencies',
        'Freelance sales professionals'
      ]
    },
    
    ctaSection: {
      title: 'Start Earning with yfy®',
      description: 'Join the partner program and grow your income.',
      buttonLabel: 'Become a Sales Partner'
    }
  }
};
