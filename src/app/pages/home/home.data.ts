import { MaterialCard } from './home.models';

export const IO_CARDS: MaterialCard[] = [
  {
    title: 'Small molecules. A meaningful change.',
    description: 'We use synthetic biology to produce defined, measurable molecules and explore functional dressings for the chronic inflammation of diabetic foot wounds.',
    art: 'molecule',
    href: '/project/description',
    date: 'OUR PROJECT',
    size: 'feature',
  },
  {
    title: 'One molecule, a focused beginning',
    description: 'Our first-generation concept focuses on lobetyolin, with cell-based studies and hydrogel delivery planned to investigate inflammation and the wound microenvironment.',
    art: 'single',
    href: '/project/design',
    date: 'PHASE 01 · LOBETYOLIN',
    size: 'large',
  },
  {
    title: 'Two glycosides, the next chapter',
    description: 'A second generation would add calycosin-7-glucoside to explore complementary effects on inflammation and repair, while extending the glycoside biosynthesis platform.',
    art: 'dual',
    href: '/project/implementation',
    date: 'PHASE 02 · FUTURE DEVELOPMENT',
    size: 'large',
  },
];

export const EXPRESSIVE_INTRO_CARDS: MaterialCard[] = [
  {
    title: '01 · Gentle contact',
    description: 'A soft silicone mesh with micropores and proposed one-way capillary channels, designed for gentle contact, fluid transfer and molecular delivery.',
    art: 'contact',
    href: '/project/design#contact-layer',
    size: 'large',
  },
  {
    title: '02 · Targeted delivery',
    description: 'A polysaccharide hydrogel carrying active molecules, designed to investigate controlled release toward the wound and separation between layers.',
    art: 'delivery',
    href: '/project/design#functional-layer',
    size: 'large',
  },
  {
    title: '03 · Fluid management',
    description: 'Hydrophilic fibres, SAP and DACC combine in a proposed absorption layer for fluid distribution, retention under pressure and physical bacterial capture.',
    art: 'absorption',
    href: '/project/design#absorption-layer',
    size: 'large',
  },
  {
    title: '04 · Breathable protection',
    description: 'An outer PU film balances water resistance, breathability and moisture retention, with water-vapour transmission to be tested across the complete dressing.',
    art: 'protection',
    href: '/project/design#outer-layer',
    size: 'large',
  },
];

export const COMPONENT_CARDS: MaterialCard[] = [
  {
    title: 'Wet lab: design, build, test, learn',
    description: 'Connect UGT glycosyltransferases, a UDP-glucose supply module and cell-based studies through an engineering cycle that tests each hypothesis.',
    art: 'engineering',
    href: '/wet-lab/engineering',
    size: 'large',
  },
  {
    title: 'Dry lab: make the design measurable',
    description: 'Plan models and software to connect biosynthesis, molecular release and transport between layers, so experiments can inform design choices.',
    art: 'model',
    href: '/dry-lab/model',
    size: 'large',
  },
];

export const APPLY_CARDS: MaterialCard[] = [
  {
    title: 'Listen, learn, and redesign',
    description: 'Plan conversations with patients, clinicians and manufacturers to bring comfort, affordability and practical needs into the design.',
    art: 'people',
    href: '/human-practices/integrated',
    size: 'small',
  },
  {
    title: 'An open conversation about science',
    description: 'Plan public engagement on synthetic biology and wound care, with informed consent, clear communication and feedback at its heart.',
    art: 'education',
    href: '/human-practices/education',
    size: 'small',
  },
  {
    title: 'Responsibility, from the beginning',
    description: 'Integrate risk assessment, laboratory management and product safety throughout development. Competition-stage validation is limited to in vitro cell studies.',
    art: 'safety',
    href: '/safety/biosafety',
    size: 'small',
  },
];

export const NEXT_CARDS: MaterialCard[] = [
  { title: 'Explore our experiments', description: 'Explore experimental design and evidence evaluation', href: '/wet-lab/experiments' },
  { title: 'Meet LUT-CHINA', description: 'Discover our disciplines and planned roles', href: '/team/members' },
  { title: 'Build on our work', description: 'Explore contributions and reusable engineering ideas', href: '/project/contribution' },
  { title: 'Follow the research', description: 'Follow research records and project milestones', href: '/team/notebook' },
];
