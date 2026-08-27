# Graph Report - yfy-1  (2026-08-26)

## Corpus Check
- 79 files · ~236,893 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 251 nodes · 258 edges · 42 communities (24 shown, 18 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `31ceab6b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app/page.js
- partners/page.js
- dependencies
- layout.js
- package.json
- getAllPosts
- roi/page.js
- products/[slug]/page.js
- IndiaComplianceMap.js
- partners/[slug]/page.js
- The 4 Labour Codes at a Glance
- check_responsive.js
- The Hidden Costs of Manual Payroll
- compliance/route.js
- README.md
- integrations/page.js
- employeelifecycle/page.js
- privacy/page.js
- finance/page.js
- hr-leaders/page.js
- it/page.js
- compilerOptions
- AGENTS.md
- rules/graphify.md
- workflows/graphify.md
- eslint.config.mjs
- next.config.mjs
- case-studies/[slug]/page.js
- community/page.js
- about/page.js
- security/page.js
- terms/page.js

## God Nodes (most connected - your core abstractions)
1. `getAllPosts()` - 7 edges
2. `scripts` - 5 edges
3. `The 4 Labour Codes at a Glance` - 5 edges
4. `getPostBySlug()` - 4 edges
5. `productsData` - 4 edges
6. `ROICalculator()` - 3 edges
7. `Navbar()` - 3 edges
8. `caseStudiesData` - 3 edges
9. `formatINRCurrency()` - 3 edges
10. `The Hidden Costs of Manual Payroll` - 3 edges

## Surprising Connections (you probably didn't know these)
- `sitemap()` --calls--> `getAllPosts()`  [EXTRACTED]
  app/sitemap.js → lib/markdown.js
- `BlogPage()` --calls--> `getAllPosts()`  [EXTRACTED]
  app/blog/page.js → lib/markdown.js
- `generateStaticParams()` --calls--> `getAllPosts()`  [EXTRACTED]
  app/blog/[slug]/page.js → lib/markdown.js
- `BlogPost()` --calls--> `getPostBySlug()`  [EXTRACTED]
  app/blog/[slug]/page.js → lib/markdown.js
- `generateMetadata()` --calls--> `getPostBySlug()`  [EXTRACTED]
  app/blog/[slug]/page.js → lib/markdown.js

## Import Cycles
- None detected.

## Communities (42 total, 18 thin omitted)

### Community 0 - "app/page.js"
Cohesion: 0.09
Nodes (13): metadata, features, FinalCTA(), HeroSection(), integrations, certs, IsoCerts(), PricingCards() (+5 more)

### Community 1 - "partners/page.js"
Cohesion: 0.13
Nodes (12): metadata, HowItWorks(), steps, InteractiveEntry(), roles, PartnersCTA(), PartnersHero(), PartnersTrust() (+4 more)

### Community 2 - "dependencies"
Cohesion: 0.10
Nodes (21): framer-motion, gray-matter, lucide-react, dependencies, framer-motion, gray-matter, html2canvas, jspdf (+13 more)

### Community 3 - "layout.js"
Cohesion: 0.14
Nodes (5): metadata, TODO: wire up to your email marketing service, Footer(), Navbar(), navLinks

### Community 4 - "package.json"
Cohesion: 0.14
Nodes (13): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, name, private, scripts (+5 more)

### Community 5 - "getAllPosts"
Cohesion: 0.27
Nodes (9): BlogPage(), metadata, BlogPost(), generateMetadata(), generateStaticParams(), sitemap(), contentDirectory, getAllPosts() (+1 more)

### Community 6 - "roi/page.js"
Cohesion: 0.24
Nodes (6): metadata, ROICalculator(), ROICalculatorWrapper(), formatINRCurrency(), ROIPdfTemplate(), ROIScrollButton()

### Community 7 - "products/[slug]/page.js"
Cohesion: 0.24
Nodes (3): metadata, ProductClientView(), productsData

### Community 8 - "IndiaComplianceMap.js"
Cohesion: 0.29
Nodes (6): ComplianceUSP(), items, IndiaComplianceMap(), IndiaMapSVG(), Tooltip(), complianceMapData

### Community 10 - "The 4 Labour Codes at a Glance"
Cohesion: 0.29
Nodes (6): 1. Code on Wages, 2019, 2. Code on Social Security, 2020, 3. Occupational Safety, Health and Working Conditions Code, 2020, 4. Industrial Relations Code, 2020, How yfy® Automates the Transition, The 4 Labour Codes at a Glance

### Community 11 - "check_responsive.js"
Cohesion: 0.40
Nodes (4): { execSync }, files, fs, path

### Community 12 - "The Hidden Costs of Manual Payroll"
Cohesion: 0.40
Nodes (4): 1. Human Error & Compliance Penalties, 2. Resource Drain, Calculating Your Automation ROI, The Hidden Costs of Manual Payroll

### Community 14 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 38 - "community/page.js"
Cohesion: 0.40
Nodes (3): features, metadata, stats

## Knowledge Gaps
- **72 isolated node(s):** `graphify`, `Workflow: graphify`, `metadata`, `metadata`, `metadata` (+67 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `graphify`, `Workflow: graphify`, `metadata` to the rest of the system?**
  _72 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app/page.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08994708994708994 - nodes in this community are weakly interconnected._
- **Should `partners/page.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `layout.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._