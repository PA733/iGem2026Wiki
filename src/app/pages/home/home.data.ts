import { MaterialCard } from './home.models';

// Content migrated from docs/wiki_resources/Home.docx.
export const IO_CARDS: MaterialCard[] = [
  {
    "title": "Every 20 seconds",
    "description": "Globally, a lower limb amputation is performed on a person with diabetes every 20 seconds. According to 2025 data from the International Diabetes Federation (IDF), the number of people aged 20–79 living with diabetes worldwide has reached 589 million, among which approximately 140 million are in China, ranking first globally.",
    "art": "molecule",
    "href": "/project/description",
    "size": "feature"
  },
  {
    "title": "The burden of diabetic foot ulcers",
    "description": "Approximately 15%–25% of people with diabetes will develop diabetic foot ulcers (DFUs) during their lifetime. In China, over 10 million people suffer from DFUs. Clinical data show that only about half of DFUs eventually heal, around 20% of patients ultimately face lower limb amputation, and the majority experience a chronic, recurrent disease course. Diabetic foot disease severely impairs patients’ quality of life and imposes a heavy economic burden. Domestic multicenter studies indicate that the average direct medical cost per hospitalization for a DFU patient is approximately 32,000 RMB; if surgical intervention or vascular reconstruction is required due to co-infection, the cost can exceed 80,000 RMB.",
    "art": "single",
    "href": "/project/description",
    "size": "large"
  },
  {
    "title": "An unmet clinical need",
    "description": "Among current clinical regimens, wound dressings are a core component of local treatment for diabetic foot. Most commercially available dressings only provide physical coverage, maintain moisture, exert anti-infective effects, and absorb exudate. They fail to address the root causes of impaired wound healing, angiogenesis, and nerve regeneration.",
    "art": "dual",
    "href": "/project/entrepreneurship#clinical-need",
    "size": "large"
  }
];

export const EXPRESSIVE_INTRO_CARDS: MaterialCard[] = [
  {
    "title": "01 · Gentle contact",
    "description": "Perforated soft silicone contact layer – does not impede downward drug release, adheres gently without sticking to the wound bed, avoids secondary injury during dressing changes, and improves patient compliance.",
    "art": "contact",
    "href": "/project/design#contact-layer",
    "size": "large"
  },
  {
    "title": "02 · Targeted delivery",
    "description": "Core functional layer – via molecular self-assembly, enables targeted downward delivery of drugs directly to the wound bed, while blocking upward exudate migration to prevent loss of therapeutic efficacy.",
    "art": "delivery",
    "href": "/project/design#functional-layer",
    "size": "large"
  },
  {
    "title": "03 · Fluid management",
    "description": "Alginate layer – efficiently absorbs exudate and traps bacteria, ensures uniform lateral diffusion, and retains fluid firmly even under compression.",
    "art": "absorption",
    "href": "/project/design#absorption-layer",
    "size": "large"
  },
  {
    "title": "04 · Breathable protection",
    "description": "Outermost waterproof breathable PU membrane – optimized for the moisture permeability requirements of diabetic foot, balances moisture retention and air permeability, and features low-adhesion edges that do not damage surrounding healthy skin.",
    "art": "protection",
    "href": "/project/design#outer-layer",
    "size": "large"
  }
];

export const COMPONENT_CARDS: MaterialCard[] = [
  {
    "title": "Calycosin-7-glucoside",
    "description": "Calycosin-7-glucoside promotes angiogenesis, induces pro-repair polarization of macrophages, and accelerates re-epithelialization.",
    "art": "engineering",
    "href": "/dry-lab/model#auxiliary",
    "size": "large"
  },
  {
    "title": "Lobetyolin",
    "description": "Lobetyolin scavenges oxidative damage, downregulates pro-inflammatory factors, and modulates the wound microenvironment, targeting the core pathology of chronic inflammation that underlies refractory DFUs.",
    "art": "model",
    "href": "/dry-lab/model#core1",
    "size": "large"
  }
];

export const APPLY_CARDS: MaterialCard[] = [
  {
    "title": "Synthetic biology cell factories",
    "description": "To address this unmet clinical need, we employ synthetic biology approaches. By identifying and characterizing key enzymes, we have constructed engineered Escherichia coli cell factories that function as precise production lines for the targeted manufacturing of high-purity, batch-consistent lobetyolin and calycosin-7-glucoside. Moving beyond traditional crude plant extraction, this strategy eliminates batch-to-batch variability, enabling quantitative, stable, and low-cost mass production of active herbal ingredients.",
    "art": "people",
    "href": "/wet-lab/engineering",
    "size": "small"
  },
  {
    "title": "From molecules to wound repair",
    "description": "Powered by synthetic biology cell factories and the four-layer structured hydrogel carrier, we achieve stable and controlled delivery of calycosin-7-glucoside and lobetyolin, to targetedly improve the microenvironment of chronic diabetic foot wounds. We expect this solution to provide a new wound repair option for DFU patients and reduce amputation risk. Meanwhile, we aim to support the upgrading of Gansu’s local traditional Chinese medicine industry from raw material export to high-value-added biomanufacturing.",
    "art": "education",
    "href": "/dry-lab/model",
    "size": "small"
  },
  {
    "title": "From laboratory to local industry",
    "description": "Furthermore, this project represents a core direction for our team’s technology translation and entrepreneurial efforts. We will continue to optimize the performance of our cell factories and dressing structure, advance in-depth functional validation and regulatory development, and strive for local industrialization in the future, translating laboratory achievements into tangible clinical and industrial value.",
    "art": "safety",
    "href": "/project/entrepreneurship",
    "size": "small"
  }
];

export const NEXT_CARDS: MaterialCard[] = [
  {
    "title": "Engineering Cycle",
    "description": "Explore our design, build, test and learn cycle",
    "href": "/wet-lab/engineering"
  },
  {
    "title": "Human Practices",
    "description": "Connect clinical needs and stakeholder feedback",
    "href": "/human-practices/integrated"
  },
  {
    "title": "Entrepreneurship",
    "description": "From market insight to commercial venture",
    "href": "/project/entrepreneurship"
  },
  {
    "title": "Experimental Results",
    "description": "Explore experimental results and validation",
    "href": "/wet-lab/results"
  }
];
