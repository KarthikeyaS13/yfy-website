export const caseStudiesData = [
  {
    slug: 'techflow-solutions',
    clientName: 'TechFlow Solutions (Demo)',
    industry: 'IT Services',
    title: 'Scaling Payroll Operations with Automation',
    description: 'How TechFlow Solutions eliminated manual errors and scaled their payroll operations efficiently using yfy.',
    challenge: 'As TechFlow expanded rapidly from 150 to 800+ employees across 5 different states in India, their legacy manual payroll system began breaking down. The HR team spent nearly a week each month resolving compliance inconsistencies, dealing with multi-state labor laws, and managing TDS calculations. This manual overhead resulted in delayed payouts and compliance risks.',
    solution: 'TechFlow implemented the yfy platform to centralize their payroll operations. They utilized yfy\'s automated compliance engine to handle state-specific labor laws and integrated it with their existing HRMS to ensure a single source of truth for employee data.',
    implementation: 'The yfy implementation team conducted a phased rollout over 4 weeks. First, employee data was migrated securely. Next, state-specific compliance rules were configured within the engine. Finally, the automated tax calculation modules were tested in parallel with their legacy system before going fully live.',
    results: [
      'Centralized visibility into multi-state payroll operations.',
      'Significant reduction in manual data entry and calculation errors.',
      'Streamlined tax filing and compliance reporting.',
      'Improved employee satisfaction due to accurate and timely payouts.'
    ],
    metrics: [
      { label: 'Payroll Processing Time', value: 'Reduced by 60%' },
      { label: 'Compliance Errors', value: 'Near Zero' },
      { label: 'HR Bandwidth Freed', value: '40+ hrs/month' }
    ]
  },
  {
    slug: 'retailcore-inc',
    clientName: 'RetailCore Inc. (Demo)',
    industry: 'Retail & E-commerce',
    title: 'Streamlining Distributed Workforce Compliance',
    description: 'RetailCore used yfy to manage compliance and shift-based payroll for a highly distributed workforce.',
    challenge: 'With over 45 retail outlets and a mix of full-time, part-time, and contractual staff, RetailCore struggled to maintain accurate attendance and payroll records. The varying pay cycles and high attrition rate in the retail sector made statutory compliance (PF, ESI) incredibly complex and prone to penalties.',
    solution: 'yfy provided a dynamic payroll structure that automatically adjusted to different employment types and pay cycles. The built-in compliance guardrails ensured that minimum wage regulations and statutory deductions were accurately applied across all employee profiles in real-time.',
    implementation: 'The rollout focused heavily on integrating yfy with RetailCore\'s existing biometric attendance systems. Over 6 weeks, the team mapped attendance data to payroll variables, ensuring that shift allowances and overtime were calculated automatically without manual intervention.',
    results: [
      'Automated alignment of shift data with payroll processing.',
      'Eliminated late statutory payment penalties through automated reminders and calculations.',
      'Created a unified dashboard for regional managers to track labor costs.',
      'Simplified onboarding and full-and-final (FnF) settlements.'
    ],
    metrics: [
      { label: 'FnF Settlement Speed', value: '3x Faster' },
      { label: 'Statutory Penalties', value: 'Avoided Completely' },
      { label: 'Overhead Costs', value: 'Reduced by 35%' }
    ]
  },
  {
    slug: 'apex-manufacturing',
    clientName: 'Apex Manufacturing (Demo)',
    industry: 'Manufacturing',
    title: 'Modernizing Blue-Collar Payroll Systems',
    description: 'Apex Manufacturing transitioned from paper-based ledgers to a fully digital payroll ecosystem with yfy.',
    challenge: 'Apex Manufacturing relied on outdated, paper-based tracking for over 1,200 factory workers. Tracking daily wages, overtime, and advances manually led to constant discrepancies, employee grievances, and significant challenges during compliance audits under the Factories Act.',
    solution: 'They deployed yfy to digitize their entire wage calculation process. yfy\'s flexible deduction engine managed advances and loans automatically, while its compliance module generated audit-ready reports tailored to manufacturing regulations.',
    implementation: 'Given the shift from paper to digital, the implementation included extensive training for HR personnel on the shop floor. The yfy team customized the platform to handle specific overtime rules and piece-rate calculations unique to Apex’s production line.',
    results: [
      'Complete digitization of wage ledgers and attendance tracking.',
      'Dramatically improved transparency for workers regarding their earnings and deductions.',
      'Seamless generation of audit-ready compliance reports.',
      'Automated handling of wage advances and systematic deductions.'
    ],
    metrics: [
      { label: 'Audit Prep Time', value: 'Reduced by 80%' },
      { label: 'Worker Grievances', value: 'Dropped significantly' },
      { label: 'Data Accuracy', value: '100% Digitized' }
    ]
  }
];
