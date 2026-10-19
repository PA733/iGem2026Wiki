import type { WikiArticle, WikiCategory } from './wiki.models';

export const WIKI_CATEGORIES: WikiCategory[] = [
  {
    "id": "project",
    "label": "Project",
    "title": "Project",
    "subtitle": "From a glycoside to a dressing",
    "description": "Connect synthetic biology and materials design with real needs in diabetic foot wound care, starting with defined natural molecules.",
    "icon": "apps",
    "art": "project",
    "groups": [
      {
        "title": "Discover the project",
        "description": "Explore the challenge, active molecules and four-layer dressing.",
        "slugs": [
          "description",
          "design"
        ]
      },
      {
        "title": "From concept to impact",
        "description": "Discover pathways to application and reusable contributions.",
        "slugs": [
          "implementation",
          "contribution",
          "entrepreneurship"
        ]
      }
    ]
  },
  {
    "id": "wet-lab",
    "label": "Wet lab",
    "title": "Wet lab",
    "subtitle": "Put every design to the test",
    "description": "From UGT glycosylation and donor supply to cell studies and material performance, build evidence through design, build, test and learn.",
    "icon": "science",
    "art": "wet-lab",
    "groups": [
      {
        "title": "Build and learn",
        "description": "Explore modular design and standardised experimental plans.",
        "slugs": [
          "engineering",
          "experiments"
        ]
      },
      {
        "title": "Parts and evidence",
        "description": "Discover core parts, validation criteria and the limits of the evidence.",
        "slugs": [
          "parts",
          "results"
        ]
      }
    ]
  },
  {
    "id": "dry-lab",
    "label": "Dry lab",
    "title": "Dry lab",
    "subtitle": "Connect molecules and materials through data",
    "description": "Multi-scale models connect dual-glycoside biosynthesis, ternary self-assembly, directional release and wound-healing predictions with experimental feedback.",
    "icon": "code",
    "art": "dry-lab",
    "groups": [
      {
        "title": "Understand and connect",
        "description": "Explore the five-scale modeling framework and the open-source iGEM Project Evaluator.",
        "slugs": [
          "model",
          "software"
        ]
      }
    ]
  },
  {
    "id": "human-practices",
    "label": "Human Practices",
    "title": "Human Practices",
    "subtitle": "Bring real needs into every design decision",
    "description": "Bring patient, clinical, manufacturing and public-sector perspectives into the laboratory through informed consent, ongoing dialogue and documented feedback.",
    "icon": "diversity_3",
    "art": "human-practices",
    "groups": [
      {
        "title": "Listen and respond",
        "description": "Connect stakeholder needs with design decisions.",
        "slugs": [
          "integrated"
        ]
      },
      {
        "title": "Learn together",
        "description": "Explore plans for public engagement and team collaboration.",
        "slugs": [
          "education",
          "collaborations"
        ]
      }
    ]
  },
  {
    "id": "team",
    "label": "Team",
    "title": "Team",
    "subtitle": "Different disciplines, one shared question",
    "description": "Meet the students, principal investigators and community mentor bringing together synthetic biology, materials, modeling, design and entrepreneurship at Lanzhou University of Technology.",
    "icon": "groups",
    "art": "team",
    "groups": [
      {
        "title": "People and process",
        "description": "Meet our team and explore contributions and research records.",
        "slugs": [
          "members",
          "attributions",
          "notebook"
        ]
      }
    ]
  },
  {
    "id": "safety",
    "label": "Safety",
    "title": "Safety",
    "subtitle": "Make safety part of the starting point",
    "description": "Plan risk management for contained production, purified active molecules, cell studies and ethical engagement, in line with each stage of the project.",
    "icon": "verified_user",
    "art": "safety",
    "groups": [
      {
        "title": "Responsible research",
        "description": "Define the research scope, material risks and limits of application.",
        "slugs": [
          "biosafety"
        ]
      }
    ]
  }
];

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    "slug": "description",
    "category": "project",
    "title": "Description",
    "subtitle": "Exploring functional dressings for diabetic foot ulcers through synthetic biology",
    "description": "Starting with the quality control of natural active ingredients, our first-generation research focuses on lobetyolin as a candidate for modulating the chronic wound microenvironment.",
    "icon": "lightbulb",
    "art": "project",
    "status": "Project design",
    "sections": [
      {
        "id": "the-challenge",
        "heading": "Starting with hard-to-heal wounds",
        "paragraphs": [
          "Care for diabetic foot ulcers (DFUs) involves wound protection, infection control, offloading, and ongoing management. High glucose, oxidative stress, and persistent inflammation create challenges for wound repair and define the microenvironmental problems this project aims to investigate.",
          "LUT-CHINA aims to develop a functional dressing for DFUs: a material that combines protection, moisture maintenance, and exudate management with chemically defined natural active molecules, testing whether they can create a more favorable environment for cells involved in wound repair."
        ]
      },
      {
        "id": "defined-molecule",
        "heading": "From crude plant extracts to a quantifiable molecule",
        "paragraphs": [
          "The composition of traditional crude plant extracts can vary with raw materials, harvesting, and extraction, making consistent proportions of active ingredients difficult to maintain. We therefore selected lobetyolin, a single molecule that can be identified and quantified, as the focus of first-generation research.",
          "We plan to use engineered Escherichia coli to express an acetylenic alcohol-specific glycosyltransferase, UGT, and strengthen the UDP-glucose donor module to convert an acetylenic alcohol precursor into the target glycoside. The resulting active molecule would be purified before incorporation into a polysaccharide-based hydrogel; the engineered bacteria serve as a production tool."
        ],
        "bullets": [
          "Defined molecular identity: connect the active ingredient in the material to a specific chemical molecule.",
          "Traceable quality: develop validation around identity, content, impurities, and differences between batches.",
          "Investigable mechanisms: measure inflammation, oxidative stress, and repair-related cellular phenotypes separately."
        ]
      },
      {
        "id": "two-generations",
        "heading": "One starting point, two product generations",
        "paragraphs": [
          "The first generation focuses on a dressing containing lobetyolin as a single active molecule, with inflammation resolution and microenvironment remodeling as its research objectives. The second generation would add calycosin-7-glucoside (CG) to investigate complementary effects between the two glycosides. Each generation requires its own validation."
        ],
        "table": {
          "headers": [
            "Stage",
            "Active system",
            "Key research question"
          ],
          "rows": [
            [
              "First generation",
              "Lobetyolin",
              "Can it modulate cellular phenotypes associated with inflammation and oxidative stress?"
            ],
            [
              "Second generation",
              "Lobetyolin + calycosin-7-glucoside",
              "Does the combination outperform the individual compounds and support additional repair-related phenotypes?"
            ],
            [
              "Platform expansion",
              "A shared pgm-galU donor module",
              "Can different UGTs expand the range of glycosides that can be produced?"
            ]
          ]
        },
        "note": "Synergy between the two glycosides, proangiogenic effects, and wound repair benefits remain objectives to be tested. First-generation research does not establish that the second-generation system has been completed."
      },
      {
        "id": "research-route",
        "heading": "Turning a concept into testable questions",
        "paragraphs": [
          "The research comprises three connected workstreams: activity evaluation, biosynthesis, and material integration. Cell experiments help determine which molecules to select; synthetic biology addresses how to obtain chemically defined molecules; material design explores how active ingredients and exudate management can function together."
        ],
        "bullets": [
          "Activity evaluation: compare individual compounds, combined treatment, and the corresponding controls in cell models.",
          "Biosynthesis: investigate UGT-mediated glycosylation, donor enhancement, and target product identification.",
          "Material integration: investigate release toward the wound, outward absorption, and fluid retention under pressure in a four-layer dressing."
        ]
      },
      {
        "id": "scope",
        "heading": "Research scope and standards of evidence",
        "paragraphs": [
          "During the competition, activity evaluation is limited to in vitro cell experiments. HaCaT, HUVEC, RAW264.7, and HSF cells are intended to assess epithelial migration, endothelial tube formation, inflammation and oxidative stress, and matrix-related changes, respectively.",
          "These experiments can provide mechanistic clues and inform subsequent design, but cannot independently establish clinical benefits for people with diabetic foot ulcers. Animal studies, human research, and product application are later development possibilities requiring independent scientific validation and the appropriate review."
        ]
      }
    ]
  },
  {
    "slug": "design",
    "category": "project",
    "title": "Design",
    "subtitle": "Four layers to coordinate active ingredient release and exudate management",
    "description": "A four-layer dressing of contact mesh, hydrogel, absorbent material, and breathable film addresses the competing demands of delivery toward the wound and outward fluid transport.",
    "icon": "layers",
    "art": "project",
    "status": "Project design",
    "sections": [
      {
        "id": "design-principle",
        "heading": "Material design organized around flow direction",
        "paragraphs": [
          "From the wound outward, the proposed dressing comprises a soft silicone contact mesh, a functional polysaccharide hydrogel layer, an absorbent antibacterial layer, and a waterproof, breathable PU film. The design aims to combine low adhesion, active molecule release, exudate management, and moisture exchange.",
          "The central challenge lies between the second and third layers: the functional layer must release active molecules toward the wound while the absorbent layer draws exudate outward. If that absorbent layer also removes substantial amounts of the active ingredient, its absorption capacity could compromise delivery. The pathways between layers are therefore themselves a design feature requiring experimental validation."
        ]
      },
      {
        "id": "contact-layer",
        "heading": "01 · Gentle contact with open pathways",
        "paragraphs": [
          "The innermost layer uses a soft silicone contact mesh with a designed open area of 60%, aiming to reduce wound adhesion while retaining pathways for delivery and fluid transport. The concept includes unidirectional capillary channels and structures intended to limit backflow, balancing contact comfort with liquid transfer.",
          "The proposed microfunnel openings range from 0.6–1.5 mm. Pore geometry, opening distribution, and loading conditions must be assessed together; dimensions alone cannot demonstrate unidirectional fluid transport."
        ],
        "bullets": [
          "Evaluate low-adhesion contact and wound protection during dressing changes.",
          "Test whether the openings obstruct release from the functional layer or the passage of exudate.",
          "Compare fluid transfer and backflow under different pressures."
        ]
      },
      {
        "id": "functional-layer",
        "heading": "02 · Active molecules within a hydrogel",
        "paragraphs": [
          "The functional layer is planned as asymmetric hydrogel islands made from chitosan, sulfated sodium hyaluronate, and genipin, carrying sustained-release microparticles. First-generation research focuses on lobetyolin; loading both glycosides and coordinating their release are subsequent development directions.",
          "The design proposes spatially controlled release, vertical fluid channels, and exploration of binary or ternary self-assembly to allow exudate passage while reducing loss of active ingredients to the absorbent layer. The planned interface with the contact mesh uses hot-press lamination of soft silicone and partially crosslinked hydrogel."
        ],
        "note": "Retention of activity, direction of release, and material compatibility all require measurement. Material composition alone does not establish therapeutic effects."
      },
      {
        "id": "absorption-layer",
        "heading": "03 · Absorption, spreading, and retention under pressure",
        "paragraphs": [
          "The third layer is designed to combine alginate/CMC hydrophilic fibers and a superabsorbent polymer (SAP) with a DACC bacteria-binding surface, providing fluid transport, fluid retention, and bacterial adsorption functions. Its structure is further divided into a lower bacteria-binding fluid inlet, a central region for fluid retention under pressure, and an upper moisture-regulating region.",
          "To mitigate gel blocking that may occur when SAP is compressed, the concept introduces cellulose nanocrystals (CNC) as structural support. A porous PCL membrane with 50–100 μm pores is also planned between the second and third layers to restrict hydrogel penetration into the absorbent layer while maintaining exudate pathways."
        ],
        "bullets": [
          "Measure fluid retention under pressure, lateral spreading, and absorption after partial pore blockage.",
          "Record losses of active molecules through adsorption to the third layer to evaluate the balance between release and absorption.",
          "Validate bacterial binding and removal of bound bacteria in experimental systems that have undergone the relevant safety assessment."
        ]
      },
      {
        "id": "outer-layer",
        "heading": "04 · Balancing waterproofing and breathability",
        "paragraphs": [
          "The outermost layer uses a waterproof, breathable PU film, with low adhesion and skin conformity at the edges. Moisture vapor transmission rate (MVTR) must be evaluated for the complete four-layer composite because lamination and fluid loading may alter the performance of the film alone."
        ],
        "table": {
          "headers": [
            "Test object",
            "Design range",
            "Interpretation"
          ],
          "rows": [
            [
              "Complete four-layer product",
              "1500–2200 g/m²·24h",
              "Effective MVTR target for the standard version"
            ],
            [
              "High-exudate version",
              "2200–3000 g/m²·24h",
              "Design target for greater exudate management needs"
            ],
            [
              "Candidate PU film alone",
              "3000–6000 g/m²·24h",
              "Material selection reference; not a substitute for composite product testing"
            ]
          ]
        },
        "note": "All ranges are design targets. They do not represent product test results or established standards for use."
      },
      {
        "id": "interface-validation",
        "heading": "Testing the four layers as one system",
        "paragraphs": [
          "Good performance by an individual layer does not guarantee cooperation between layers. Whole-system evaluation must track active molecule release, outward absorption efficiency, backflow under pressure, and losses of the active ingredient to the third layer together. Comparing these measures within the same system is necessary to determine whether structural changes improve delivery."
        ],
        "table": {
          "headers": [
            "Validation area",
            "Planned measurements"
          ],
          "rows": [
            [
              "Release and retention",
              "Fraction released from the second layer; adsorption losses to the third layer"
            ],
            [
              "Fluid pathways",
              "Fluid transport efficiency from the first to the third layer; lateral spreading"
            ],
            [
              "Response to pressure",
              "Fluid retention under pressure; backflow volume; gel blocking"
            ],
            [
              "Anatomical fit",
              "5 × 5, 7.5 × 7.5, and 10 × 10 cm; contoured heel shapes and small interdigital pieces"
            ]
          ]
        }
      }
    ]
  },
  {
    "slug": "implementation",
    "category": "project",
    "title": "Implementation",
    "subtitle": "From a laboratory concept to a testable path toward application",
    "description": "Define the intended use, product quality questions, and next validation steps to turn scientific hypotheses into a staged development plan.",
    "icon": "route",
    "art": "project",
    "status": "Research plan",
    "sections": [
      {
        "id": "intended-use",
        "heading": "Defining the product around a specific care setting",
        "paragraphs": [
          "The concept targets noninfected neuroischemic diabetic foot wounds, or wounds in which infection is controlled, with particular interest in care needs when wound area has improved insufficiently after 2 weeks of standard treatment and offloading. This description defines the intended setting for research and development discussions; it is not guidance for patient selection or treatment.",
          "The proposed role of the dressing is to support wound management, with research focused on microenvironment modulation, exudate handling, and material fit. Future use must be based on independent validation of product safety, effectiveness, and the boundaries of its application."
        ]
      },
      {
        "id": "manufacturing-route",
        "heading": "From engineered bacteria to purified active molecules",
        "paragraphs": [
          "The planned production route uses engineered E. coli and a dual-plasmid system to synthesize the target glycoside, followed by separation, purification, and quality evaluation before the active molecule is loaded into a hydrogel. The intended end product is a dressing containing purified ingredients; production cells and end use must remain clearly distinguished."
        ],
        "bullets": [
          "Develop identification and quantification methods for the precursor, product, and byproducts.",
          "Compare active ingredient content, purity, and reproducibility between batches.",
          "Investigate active molecule stability during storage, fabrication, lamination, and release.",
          "Include residual production-related impurities and material compatibility in quality studies."
        ]
      },
      {
        "id": "product-fit",
        "heading": "Adapting the material to the shape of the foot",
        "paragraphs": [
          "Toes, the sole, and the heel present different fitting requirements. The product concept therefore considers square formats, contoured heel shapes, and small interdigital pieces. Dimensions, low adhesion at the edges, and fluid retention under pressure jointly influence usability in care settings.",
          "Planned sizes include 5 × 5 cm, 7.5 × 7.5 cm, and 10 × 10 cm. Different exudate management needs correspond to different MVTR targets, but final choices require testing of the complete product alongside user feedback."
        ]
      },
      {
        "id": "development-gates",
        "heading": "Answering the right questions at each stage",
        "paragraphs": [
          "The competition phase first establishes cell-based activity evaluation and validation routes for synthesis and materials. Subsequent development should use the available evidence to decide whether to expand the research scope, rather than treating long-term plans as demonstrated product capabilities."
        ],
        "table": {
          "headers": [
            "Development stage",
            "Question to address",
            "Basis for moving forward"
          ],
          "rows": [
            [
              "Cellular and molecular research",
              "What concentrations are tolerated, and how do inflammation- and repair-related phenotypes change?",
              "Reproducible cell experiment and chemical analysis records"
            ],
            [
              "Dressing prototype",
              "Can release, absorption, and activity be coordinated?",
              "Physical and compatibility evaluation of the complete four-layer system"
            ],
            [
              "Further translation",
              "Can the product meet safety, quality, and effectiveness requirements for actual use?",
              "Appropriate review and independent validation, without assuming an approval outcome"
            ]
          ]
        }
      },
      {
        "id": "accessibility",
        "heading": "Making affordability a research question",
        "paragraphs": [
          "Patients and care providers are concerned with affordable pricing, comfort, low irritation, and reliable supply. The biosynthetic route aims to reduce the batch variability associated with natural extraction and investigate active ingredient production costs, but no cost analysis or scaled production data are currently available.",
          "Input from raw material suppliers, production and quality teams, healthcare professionals, and waste management providers needs to inform subsequent design. Assessments of cost and application value should consider material consumption, fabrication conditions, dressing change requirements, and quality requirements together."
        ]
      }
    ]
  },
  {
    "slug": "contribution",
    "category": "project",
    "title": "Contribution",
    "subtitle": "Turning project experience into reusable knowledge",
    "description": "Plan traceable contributions to the synthetic biology community through glycosylation parts, validation methods, and design decisions.",
    "icon": "hub",
    "art": "project",
    "status": "Work plan",
    "sections": [
      {
        "id": "contribution-map",
        "heading": "Starting with one molecule and sharing reusable methods",
        "paragraphs": [
          "The planned contributions connect three areas: characterization of an acetylenic alcohol-specific UGT, methods for validating glycoside biosynthesis and material integration, and records of how Human Practices feedback informs engineering choices.",
          "The emphasis is on resources that others can understand, compare, and build upon. Part identifiers, measured data, and software functions should be published after completion and verification. This page describes the contribution pathways and the evidence they need to contain."
        ]
      },
      {
        "id": "reusable-parts",
        "heading": "Documenting UGT and the donor module",
        "paragraphs": [
          "The research group's existing pET-32a-UGT and pACYC184-pgm-galU dual-plasmid system provides the starting point for this project. Traceable records of student work must distinguish new functional characterization, performance comparisons, or engineering improvements from those existing constructs."
        ],
        "bullets": [
          "Record part provenance, sequence evidence, expression systems, and construct versions.",
          "Share target glycoside identification methods and the necessary control information.",
          "Archive both successful outcomes and results that fall short of expectations, with their applicable conditions.",
          "Keep documentation consistent with actual part registry submissions; do not assign Registry identifiers in advance."
        ]
      },
      {
        "id": "shared-validation",
        "heading": "Sharing validation methods alongside results",
        "paragraphs": [
          "Cell experiments provide complementary readouts: inflammatory mediators, ROS, cell migration, endothelial tube formation, and matrix-related measures. Material experiments provide measurements such as the fraction released, adsorption losses, fluid transport efficiency, and backflow under pressure.",
          "Records useful to the community include more than final figures: they also document sample definitions, experimental conditions, raw images, data processing, and limitations. This information helps other teams judge whether a method is suitable for their own project."
        ]
      },
      {
        "id": "decision-support",
        "heading": "Connecting experiments, Human Practices, and design decisions",
        "paragraphs": [
          "The project document proposes a decision-support platform as a contribution direction. The plan is to bring material measurements, molecular evidence, and stakeholder needs into a traceable comparison framework that helps explain choices about release, absorption, and product shape.",
          "The value of this tool should be determined by the available data and actual use contexts. The planned platform is not currently described as a deployed product, and design targets are not presented as recommendations validated through optimization."
        ]
      },
      {
        "id": "honest-record",
        "heading": "Clear attribution enables further work",
        "paragraphs": [
          "Project records need to distinguish the research group's existing foundation, independent student work, supervisor guidance, and external support. The current stages of the dual-glycoside system, animal validation, and translational research should remain explicit so future readers can understand how the research develops.",
          "The Wiki, part documentation, and attribution records together provide access to the evidence. Each update should keep claims, methods, and data aligned while retaining enough information for subsequent teams to review and improve the work."
        ]
      }
    ]
  },
  {
    "slug": "entrepreneurship",
    "category": "project",
    "title": "Entrepreneurship",
    "subtitle": "From Market Insight to Commercial Venture",
    "description": "Market research, frontline clinical feedback and iterative product design guide our path from a four-layer dressing prototype to a commercial venture.",
    "icon": "business_center",
    "art": "project",
    "status": "Entrepreneurship",
    "sections": [
      {
        "id": "overview",
        "heading": "Overview",
        "paragraphs": [],
        "contentHtml": "<p>Commercialization has been our core goal since the inception of this project. Our team lead has 12 years of experience in the medical device industry and operates a local medical device company with annual sales exceeding 10 million RMB. Even with solid industry resources, we fully recognize that building a new medical venture remains an extremely high-risk pursuit. For this reason, we have structured our entire work around rigorous market validation, frontline clinical feedback, iterative product design and controlled R&amp;D investment, as detailed below.</p>"
      },
      {
        "id": "track-selection",
        "heading": "1. Track Selection: Market First, Product Second",
        "paragraphs": [],
        "contentHtml": "<p>We conducted extensive market research and attended multiple synthetic biology industry conferences. A clear reality emerged from our investigation: around 90% of high-performing lab projects in synthetic biology never reach industrialization. We believe market validation must precede product development, and we intentionally selected a field with a clear commercialization path where our existing expertise could deliver a competitive advantage.</p><p>Data shows that the most commercially successful synthetic biology companies in China operate in the materials, pharmaceutical and cosmetics sectors. Leveraging our existing medical industry experience, we naturally focused on the medical wound care segment.</p><p>China’s high-end functional medical dressing market reached 12.8 billion RMB in 2024, is estimated at ~15 billion RMB in 2025, and is projected to reach 28 billion RMB by 2030, with a <strong>CAGR of 14%–18%</strong> — one of the fastest-growing segments in medical consumables.</p><p>Over the past three years, DFU-specific dressings in China have grown 17%–19% year-on-year, with a CAGR of ~15%.</p><p>The domestic DFU dressing market was approximately <strong>4.2–5 billion RMB in 2025</strong>, driven by the large diabetic population and substantial unmet clinical demand.</p><p>On-the-ground data: prefecture-level tertiary hospitals spend hundreds of thousands to millions of RMB annually on wound dressings; provincial Grade-A tertiary hospitals spend millions to tens of millions of RMB per year.</p><p>This is a track with proven market size, clear procurement demand and a well-defined commercialization path.</p><div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/entrepreneurship/image1.webp\" alt=\"1. Track Selection: Market First, Product Second — document image 1\" loading=\"lazy\" decoding=\"async\" width=\"1251\" height=\"695\"></figure><figure><img src=\"assets/wiki/entrepreneurship/image2.webp\" alt=\"1. Track Selection: Market First, Product Second — document image 2\" loading=\"lazy\" decoding=\"async\" width=\"1263\" height=\"927\"></figure></div>"
      },
      {
        "id": "clinical-need",
        "heading": "2. Clinical Need Validation",
        "paragraphs": [],
        "contentHtml": "<p>The biggest pitfall in entrepreneurship is building a solution in search of a problem. To verify real clinical needs and pain points, we not only interviewed DFU patients, but also conducted three days of frontline clinical observation.</p><p>We found that wound care clinicians rank diabetic foot ulcers among the most intractable conditions they treat. For most patients, DFU means chronic non-healing wounds, amputation, or even death. We realized that with the current standard of care, many DFU patients never achieve full healing over their lifetime — there is an urgent, unmet need for more effective treatments.</p><p>Clinicians confirmed that <strong>no dedicated functional dressing for DFU currently exists on the Chinese market</strong>, but such products will inevitably emerge in the next decade given the clear demand. This was one of the core reasons we chose to pursue this project.</p><figure><img src=\"assets/wiki/entrepreneurship/image3.webp\" alt=\"2. Clinical Need Validation — document image 3\" loading=\"lazy\" decoding=\"async\" width=\"910\" height=\"668\"></figure><figure><img src=\"assets/wiki/entrepreneurship/image4.webp\" alt=\"2. Clinical Need Validation — document image 4\" loading=\"lazy\" decoding=\"async\" width=\"813\" height=\"810\"></figure>"
      },
      {
        "id": "product-design",
        "heading": "3. Product Design",
        "paragraphs": [],
        "contentHtml": "<p>Our product has a defined indication: <strong>non-infected or infection-controlled neuro-ischemic DFU, in patients with insufficient wound improvement after 2 weeks of standard care and offloading therapy</strong>.</p><p>Our four-layer structure was not designed in isolation — it was shaped iteratively by input from clinicians, patients and distributors:</p><p><strong>1、</strong><strong>Innermost contact layer</strong>: Most patients have poor dressing-change adherence because dressing removal tears the wound bed, causing pain and delaying healing. We therefore selected a <strong>soft silicone contact layer with 60% aperture ratio</strong>, which is atraumatic on removal and does not block drug delivery to the wound.</p><p><strong>2、</strong><strong>Functional hydrogel layer</strong>: Clinicians told us they need products that directly address the root cause of impaired healing. We initially designed a hydrogel layer loaded with NOSF and growth factors to promote granulation and angiogenesis. However, discussions with hospital procurement teams revealed that growth-factor dressings face barriers in hospital formulary adoption despite good efficacy; growth factors are also unstable during storage and transportation. We therefore replaced growth factors with <strong>calycosin-7-O-glucoside and lobetyolin</strong> as our active ingredients.</p><p><strong>Absorbent layer</strong>:Hospital medicalconsumable distributors and experts from the Diabetic Foot Center informed us that most existing premium functional dressings adopt multilayer architectures to deliver multiple functions. Accordingly, we added a third alginate/hydrophilic fiber layer for exudate absorption and antibacterial effects.</p><p><strong>4、</strong><strong>Outer backing layer</strong>: The outermost layer is a <strong>waterproof breathable PU membrane</strong>, which maintains moisture balance and protects the wound from external contamination.</p><p>This is how our four-layer dressing architecture evolved — directly from real-world stakeholder input.</p><figure><img src=\"assets/wiki/entrepreneurship/image5.webp\" alt=\"3. Product Design — document image 5\" loading=\"lazy\" decoding=\"async\" width=\"1265\" height=\"707\"></figure><figure><img src=\"assets/wiki/entrepreneurship/image6.webp\" alt=\"3. Product Design — document image 6\" loading=\"lazy\" decoding=\"async\" width=\"1267\" height=\"713\"></figure>"
      },
      {
        "id": "mvp",
        "heading": "4. MVP & Technical Feasibility",
        "paragraphs": [],
        "contentHtml": "<p>After surveying all major dressing products on the market and interviewing procurement staff and clinicians, we confirmed that no mature dedicated DFU dressing exists today — this creates our market opportunity.</p><p>We also know that most startups fail from excessive upfront capital burn. Our strategy was to build the simplest, minimal prototype at the lowest possible cost and validate core efficacy before scaling up.</p><h3>What we have completed for our MVP</h3><p>We have fabricated the core hydrogel functional layer loaded with calycosin-7-O-glucoside and lobetyolin in our lab.</p><p>In collaboration with<strong> Dongguan Medical Technology Co., Ltd. </strong>and clinical experts from provincial hospitals, we have produced a minimal prototype of the four-layer dressing.</p><p>Cell-based assays have validated that our active ingredients promote wound healing, angiogenesis and anti-inflammatory modulation of the wound microenvironment.</p><h3>Current limitations</h3><p>Due to timeline and ethical constraints, we have not yet conducted animal or human studies. This will be a long process of iteration and optimization, but controlled R&amp;D investment and professional partners will help us advance steadily.</p><div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/entrepreneurship/image7.webp\" alt=\"4. MVP &amp; Technical Feasibility — document image 7\" loading=\"lazy\" decoding=\"async\" width=\"1264\" height=\"948\"></figure><figure><img src=\"assets/wiki/entrepreneurship/image8.webp\" alt=\"4. MVP &amp; Technical Feasibility — document image 8\" loading=\"lazy\" decoding=\"async\" width=\"625\" height=\"833\"></figure><figure><img src=\"assets/wiki/entrepreneurship/image9.webp\" alt=\"4. MVP &amp; Technical Feasibility — document image 9\" loading=\"lazy\" decoding=\"async\" width=\"625\" height=\"833\"></figure></div><figure><img src=\"assets/wiki/entrepreneurship/image10.webp\" alt=\"4. MVP &amp; Technical Feasibility — document image 10\" loading=\"lazy\" decoding=\"async\" width=\"1268\" height=\"713\"></figure>"
      },
      {
        "id": "business-model",
        "heading": "5. Business Model",
        "paragraphs": [],
        "contentHtml": "<p>A successful product does not guarantee a successful business. In China, the main purchasers of medical dressings are wound &amp; ostomy centers, endocrinology departments and orthopedics departments in secondary and tertiary hospitals, rather than the end users themselves. These B-end buyers have large purchase volumes and follow standardized procurement procedures, comprehensively evaluating efficacy, price and clinical service. We are therefore building a multi-stakeholder win-win business model.</p><p>Our existing medical device company has begun distributing dressings from multiple manufacturers in the local market. This is not only to generate revenue to support R&amp;D — more importantly, it allows us to explore go-to-market models for DFU dressings, engage directly with manufacturers, distributors, hospitals, regulators and patients, and feed deep insights from every link in the value chain back into our product development.</p><figure><img src=\"assets/wiki/entrepreneurship/image11.webp\" alt=\"5. Business Model — document image 11\" loading=\"lazy\" decoding=\"async\" width=\"1232\" height=\"924\"></figure>"
      },
      {
        "id": "roadmap",
        "heading": "6. Next Steps & Roadmap",
        "paragraphs": [],
        "contentHtml": "<p>We plan to complete animal studies, human clinical trials and obtain <strong>Class III medical device registration (drug-device combination category)</strong> in China within 3–5 years. If successful, this would be one of the first dedicated DFU therapeutic dressings in China’s wound care market.</p><p>We openly acknowledge this is an estimated timeline; animal study outcomes, clinical trial enrollment speed, regulatory review progress, raw material cost reduction and capital availability may all affect the actual schedule. We have consulted professional medical device registration consultants and mapped out the full regulatory pathway and required documentation.</p><p>After lab prototype validation, we will partner with existing qualified manufacturers for mass production instead of building our own factory. China has a mature medical device OEM ecosystem, which greatly reduces our capital expenditure.</p><p>We estimate our current capital can support us through most of this process, but we actively seek partnerships with additional teams and organizations to reduce risk and accelerate progress. Entrepreneurship is a continuous process of problem-solving. We welcome more partners to join us in building a venture that delivers both social impact and commercial value.</p><h3>Resources we are seeking</h3><p><strong>1、</strong><strong>Clinical partners</strong>: Endocrinology and wound care experts from tertiary hospitals, to provide clinical feedback and support future animal / human trials.</p><p><strong>2、</strong><strong>Industrial partners</strong>: Medical device OEM/ODM manufacturers, pilot-scale fermentation platforms for active ingredients.</p><p><strong>3、</strong><strong>Service providers</strong>: Third-party medical device testing institutes, regulatory registration consultants.</p><p><strong>4、</strong><strong>Investors</strong>: Medical device and healthcare-focused investors.</p><div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/entrepreneurship/image12.webp\" alt=\"6. Next Steps &amp; Roadmap — document image 12\" loading=\"lazy\" decoding=\"async\" width=\"1132\" height=\"1600\"></figure><figure><img src=\"assets/wiki/entrepreneurship/image13.webp\" alt=\"6. Next Steps &amp; Roadmap — document image 13\" loading=\"lazy\" decoding=\"async\" width=\"1132\" height=\"1600\"></figure></div>"
      },
      {
        "id": "risk-assessment",
        "heading": "7. Risk Assessment & Mitigation",
        "paragraphs": [],
        "contentHtml": "<p>Entrepreneurship is not about hitting one big win — it is about surviving long enough to iterate. We systematically evaluate all major risks and plan for worst-case scenarios to ensure we remain viable.</p><div class=\"wiki-article-table-scroll\" tabindex=\"0\" role=\"region\" aria-label=\"7. Risk Assessment &amp; Mitigation data table (scroll horizontally)\"><table><thead><tr><th scope=\"col\">Risk</th><th scope=\"col\">Mitigation Strategy</th></tr></thead><tbody><tr><td>1. Funding shortfall or regulatory delays during R&amp;D</td><td>Control R&amp;D burn rate; introduce external capital and professional manufacturing partners at the clinical trial and registration stages.</td></tr><tr><td>2. Lobetyolin and calycosin remain at lab scale, difficult to scale and reduce cost</td><td>Collaborate with external labs and pilot-scale platforms to optimize fermentation; evaluate alternative herbal active ingredients as backup.</td></tr><tr><td>3. Lab prototype cannot be translated into mass-manufacturable product</td><td>Retain the core active ingredients; adapt product format or explore new application scenarios as needed.</td></tr></tbody></table></div>"
      },
      {
        "id": "closing",
        "heading": "Closing",
        "paragraphs": [],
        "contentHtml": "<p>Diabetic foot ulcer is a problem that must be solved — and it will be solved. Entrepreneurs bring their ingenuity to find new solutions, and turn those solutions into products that deliver real value to patients.</p><p>If successfully launched, this product will provide a new treatment option for large numbers of patients with chronic non-healing DFU, reduce the risk of long-term ulceration and amputation, and improve patient quality of life. It will also advance the translation of synthetic biology active molecules into medical dressings, creating a reference case for synthetic biology medical commercialization and providing new ideas for other iGEM teams pursuing real-world impact.</p><p>This is an incredibly difficult path, but it is a path that someone has to take.</p>"
      },
      {
        "id": "image-use",
        "heading": "Note on Image Use",
        "paragraphs": [],
        "contentHtml": "<p>Clinical wound images are not published to protect patient privacy. Internal business documents and interview records are not disclosed to protect confidential information and interviewee privacy.</p>"
      }
    ]
  },
  {
    "slug": "engineering",
    "category": "wet-lab",
    "title": "Engineering",
    "subtitle": "Organizing each engineering iteration through modular design",
    "description": "A Design–Build–Test–Learn research pathway connecting UGT-mediated glycosylation, UDP-glucose supply, and material-based delivery.",
    "icon": "cycle",
    "art": "wet-lab",
    "status": "Research plan",
    "sections": [
      {
        "id": "engineering-question",
        "heading": "Define the engineering question first",
        "paragraphs": [
          "The central question for the first-generation system is how to convert an acetylenic alcohol precursor into quantifiable lobetyolin and incorporate the active molecule into a material system suitable for evaluation. The research must address biosynthesis, compound quality, and the interactions between release and absorption within the dressing.",
          "The engineering cycle follows the Design–Build–Test–Learn framework. Each design iteration should address a measurable question, with test results determining which approaches to retain, modify, or abandon. Existing constructs provide a starting point, but evidence from a complete cycle still requires experimental records."
        ]
      },
      {
        "id": "design",
        "heading": "Design · Divide the pathway into complementary modules",
        "paragraphs": [
          "The glycosylation module centers on an acetylenic alcohol-specific UGT independently identified by the research group to catalyze the target reaction. The pgm-galU module enhances UDP-glucose supply, while precursor feeding supplies the substrate for glycosylation. Together, these three elements form the design basis of the first-generation synthesis pathway.",
          "The second-generation plan pairs the shared donor module with a glycosyltransferase targeting calycosin to explore calycosin-7-glucoside production. This extension requires separate evidence of construction, product identification, and characterization."
        ],
        "table": {
          "headers": [
            "Module",
            "Design role",
            "Questions to test"
          ],
          "rows": [
            [
              "UGT",
              "Catalyze precursor glycosylation",
              "Target product identity, reaction performance, and selectivity"
            ],
            [
              "pgm-galU",
              "Enhance UDP-glucose supply",
              "Alignment between donor supply and demand in the target reaction"
            ],
            [
              "Precursor feeding",
              "Supply the acetylenic alcohol substrate",
              "Conversion performance and compatibility with the system"
            ],
            [
              "Polysaccharide hydrogel",
              "Carry the purified active molecule",
              "Release, stability, and material compatibility"
            ]
          ]
        }
      },
      {
        "id": "build",
        "heading": "Build · Start from the existing foundation",
        "paragraphs": [
          "The project plans to reuse the pET-32a-UGT and pACYC184-pgm-galU dual-plasmid system already constructed and sequence-verified by the research group. These existing constructs are the research starting point; their provenance must be recorded separately from subsequent student work.",
          "The build phase needs to link strain information, construct versions, sequence-verification records, and subsequent engineering modifications. On the materials side, the work will progressively develop comparable prototypes around a hydrogel loaded with a single active molecule and the four-layer structure."
        ]
      },
      {
        "id": "test",
        "heading": "Test · Collect evidence at different levels",
        "paragraphs": [
          "Pathway testing asks whether the target glycoside is produced, how the product can be quantified, and whether the results are reproducible. Biological activity testing addresses cell safety and predefined phenotypes; materials testing examines whether drug release, fluid absorption, and performance under pressure can be coordinated.",
          "These levels of evidence cannot substitute for one another: detecting a product does not demonstrate dressing efficacy, and observing a cellular phenotype does not establish that the complete material will function under real wound conditions."
        ],
        "bullets": [
          "Molecular level: product identification, quantity, batch variation, and purification.",
          "Cellular level: CCK-8, migration, tube formation, ELISA, qPCR, and ROS readouts.",
          "Materials level: fraction released, adsorption losses, fluid-transfer efficiency, backflow, and MVTR."
        ]
      },
      {
        "id": "learn",
        "heading": "Learn · Ground the next iteration in evidence",
        "paragraphs": [
          "If product formation is insufficient, the effects of substrate availability, catalysis, and the donor module need to be distinguished. If cellular responses are unsatisfactory, working concentrations, cell condition, and controls should be checked first. If the absorbent layer draws away the drug, the design of the pathways between layers must be revisited.",
          "The next iteration should document the original question, supporting measurements, design changes, and validation methods. Approaches that fall short of expectations should also remain in the record, allowing the team and future readers to understand the engineering decisions."
        ]
      }
    ]
  },
  {
    "slug": "experiments",
    "category": "wet-lab",
    "title": "Experiments",
    "subtitle": "From tolerated concentrations to multidimensional cellular evaluation",
    "description": "An activity-evaluation plan using four cell types to study migration, endothelial tube formation, inflammation and oxidative stress, and matrix homeostasis.",
    "icon": "biotech",
    "art": "wet-lab",
    "status": "Experimental plan",
    "sections": [
      {
        "id": "experimental-framework",
        "heading": "Four cell types, four windows into the response",
        "paragraphs": [
          "The planned in vitro experiments use HaCaT, HUVEC, RAW264.7, and HSF cells, beginning with concentration screening for cell safety before evaluating different phenotypes relevant to wound repair. Each active component will be used at the same concentration in the single-agent and combination groups to help interpret the changes associated with adding the second molecule.",
          "The plan also considers comparisons involving calycosin-7-glucoside, lobetyolin, NOSF, and DFO. High-glucose treatment, osmotic controls, and final dosing conditions still need to be confirmed in pilot experiments and then fixed in a documented experimental version that can be checked."
        ],
        "table": {
          "headers": [
            "Cell type",
            "Main research question",
            "Evaluation method"
          ],
          "rows": [
            [
              "HaCaT",
              "Epithelial cell migration",
              "Scratch images and closure rate"
            ],
            [
              "HUVEC",
              "Endothelial tube-formation phenotype",
              "Total tube length and number of branch points"
            ],
            [
              "RAW264.7",
              "Inflammation and oxidative stress",
              "ELISA, qPCR, and ROS fluorescence"
            ],
            [
              "HSF",
              "Matrix formation and degradation",
              "Type I collagen and MMP-9-related readouts"
            ]
          ]
        }
      },
      {
        "id": "viability",
        "heading": "First identify working conditions the cells can tolerate",
        "paragraphs": [
          "Pilot CCK-8 experiments will assess how each of the four cell types tolerates the candidate active components. The document uses relative cell viability of at least 80% as a screening reference for subsequent concentration selection. This threshold applies to the experimental plan and is not a conclusion about product safety.",
          "Cell viability is calculated as: (treated-group OD − blank-group OD) ÷ (untreated-group OD − blank-group OD) × 100%. Drugs and solvents may affect the readings, so blanks, untreated controls, and appropriate checks for assay interference need to be considered alongside the samples."
        ],
        "bullets": [
          "Evaluate each cell type and exposure duration separately rather than directly adopting a concentration selected for another cell type.",
          "Keep the final solvent concentration consistent across all comparable groups; the plan requires DMSO at no more than 0.1%.",
          "Use each drug at the same concentration in the combination group as in its corresponding single-agent group; a combination design should not be replaced by simply doubling the total dose.",
          "Finalize and fix the concentration series and high-glucose model conditions after pilot experiments."
        ]
      },
      {
        "id": "migration-and-angiogenesis",
        "heading": "Observe epithelial migration and endothelial tube formation",
        "paragraphs": [
          "The planned HaCaT scratch assay will record the initial and subsequent images in the same field of view, using ImageJ to quantify the cell-free area. Scratch closure is calculated as: (initial area − area at the corresponding time point) ÷ initial area × 100%. Results need to be interpreted alongside cell viability and the effects of proliferation.",
          "The HUVEC tube-formation assay will use growth factor-reduced Matrigel. Multiple fields of view will be recorded within a defined observation window to compare total tube length and the number of branch points. Tube formation is an in vitro morphological measure that can help screen approaches, but it cannot be directly equated with the function of newly formed blood vessels in actual wounds."
        ],
        "table": {
          "headers": [
            "Assay",
            "Main readouts",
            "Key recording requirements"
          ],
          "rows": [
            [
              "HaCaT scratch assay",
              "Area changes and closure rate",
              "Matched fields at 0 h and subsequent time points; consistency of the initial scratch"
            ],
            [
              "HUVEC tube-formation assay",
              "Total tube length and branch points",
              "Observation times, field selection, and image-analysis rules"
            ]
          ]
        }
      },
      {
        "id": "inflammation-and-ros",
        "heading": "Measure inflammation and oxidative stress separately",
        "paragraphs": [
          "The RAW264.7 plan uses high-glucose and LPS treatment to investigate inflammation-related phenotypes. ELISA will examine TNF-α, IL-1β, IL-6, and IL-10; qPCR will examine iNOS, TNF-α, CD206, and Arg-1, with GAPDH proposed as the reference gene.",
          "The ROS evaluation will use DCFH-DA fluorescence readouts, potentially combined with flow cytometry for quantification. A single marker or image cannot fully describe macrophage state: inflammatory mediators, expression changes, ROS, and cell viability must be interpreted together."
        ],
        "note": "Lower pro-inflammatory cytokine levels, changes in repair-related markers, and reduced ROS are expected directions to be tested; this page does not indicate that these results have already been observed."
      },
      {
        "id": "matrix-homeostasis",
        "heading": "Examine both matrix formation and degradation",
        "paragraphs": [
          "The HSF plan includes measuring type I collagen in culture supernatants to observe changes related to matrix formation, alongside evaluation of MMP-9 to investigate phenotypes that may affect matrix degradation.",
          "The document proposes gelatin zymography for activity evaluation and ELISA for protein abundance. These methods measure different properties: protein abundance cannot directly substitute for enzymatic activity, and this distinction must be preserved when reporting results."
        ]
      },
      {
        "id": "analysis-and-recording",
        "heading": "Make results interpretable from the raw data onward",
        "paragraphs": [
          "The experimental plan includes replicate wells for each group and independent repetitions. It proposes at least 3 replicate wells per group and at least 3 repetitions of the entire experiment. Analysis must distinguish technical replicate wells from independent experiments, rather than treating the number of wells as the independent sample size.",
          "ImageJ is planned for image analysis, and GraphPad Prism for statistics and plotting. The document proposes one-way analysis of variance with Dunnett comparisons for multiple-group analyses; the final analysis must be selected according to the data structure and predefined control comparisons."
        ],
        "bullets": [
          "Retain original microscopy images, instrument readings, sample identifiers, and treatment times.",
          "Record means and standard deviations while also reporting the number of independent repetitions.",
          "Keep the original files and selection rationale for representative images.",
          "Distinguish expected directions, actual measurements, and statistical interpretations in the report."
        ]
      }
    ]
  },
  {
    "slug": "parts",
    "category": "wet-lab",
    "title": "Parts",
    "subtitle": "From an acetylenic alcohol-specific UGT to a shared donor module",
    "description": "The design roles and existing foundation of the first-generation dual-plasmid system, together with the part characterization still needed.",
    "icon": "extension",
    "art": "wet-lab",
    "status": "Research plan",
    "sections": [
      {
        "id": "part-architecture",
        "heading": "Two modules working toward one target product",
        "paragraphs": [
          "The first-generation synthesis plan centers on the UGT catalytic module and the pgm-galU donor-enhancement module, combined with acetylenic alcohol precursor feeding, to investigate the glycosylation of lobetyol into lobetyolin.",
          "This modular arrangement allows catalysis and donor supply to be considered separately. It also provides a design starting point for replacing the glycosyltransferase and expanding the range of glycoside molecules in future work."
        ],
        "table": {
          "headers": [
            "Construct / module",
            "Description in the document",
            "Role in this project"
          ],
          "rows": [
            [
              "pET-32a-UGT",
              "Already constructed and sequence-verified by the research group",
              "Express an acetylenic alcohol-specific glycosyltransferase"
            ],
            [
              "pACYC184-pgm-galU",
              "Already constructed and sequence-verified by the research group",
              "Enhance the UDP-glucose donor module"
            ],
            [
              "Glycosyltransferase targeting calycosin",
              "Second-generation plan",
              "Explore a production pathway for calycosin-7-glucoside"
            ]
          ]
        }
      },
      {
        "id": "ugt",
        "heading": "UGT · A catalytic part targeting acetylenic alcohol substrates",
        "paragraphs": [
          "UGT is the central catalytic part in the first-generation pathway. The document describes it as an acetylenic alcohol-specific glycosyltransferase independently identified by the research group. This project plans further characterization of its target reaction and operating conditions.",
          "Future evidence for the part page needs to include verifiable provenance and sequence information, expression and construction details, target product identification, and control data. No specific sequence, kinetic parameters, or Registry identifier are currently provided, so none of these details are assumed here."
        ]
      },
      {
        "id": "donor-module",
        "heading": "pgm-galU · Support donor supply for glycosylation",
        "paragraphs": [
          "pgm-galU is designed as a UDP-glucose donor-enhancement module to support the catalytic requirements of UGT. The presence of the module alone does not demonstrate that donor supply no longer limits the reaction; this still needs to be evaluated alongside product formation and overall system performance.",
          "The donor module is also intended for reuse in the second-generation pathway: a glycosyltransferase targeting calycosin would be paired with the same donor design to explore the feasibility of a two-glycoside production system."
        ]
      },
      {
        "id": "characterization",
        "heading": "Define new contributions through characterization records",
        "paragraphs": [
          "Sequence verification of existing constructs and functional characterization within this project are different levels of evidence. The former establishes the foundation of the existing constructs; the latter must determine whether a part performs the intended reaction under project conditions, which conditions affect its performance, and whether the results are reproducible."
        ],
        "bullets": [
          "Link each measurement to a specific construct version and experimental conditions.",
          "Retain the evidence used to identify and quantify the target product.",
          "Document control systems, repeated experiments, and results that fall short of expectations.",
          "Attribute new characterization by students separately from the research group’s prior work."
        ]
      },
      {
        "id": "registry",
        "heading": "Part documentation designed for sharing",
        "paragraphs": [
          "The project plans to organize reusable parts, supporting documentation, and functional characterization as contributions to the community. Official registration details must match the material actually submitted, with verifiable links provided on the Wiki.",
          "The current document does not list submitted standard-part identifiers or provide evidence of acceptance by the Registry. This page presents the functional modules and characterization plans; the corresponding records will be linked after registration is completed."
        ]
      }
    ]
  },
  {
    "slug": "results",
    "category": "wet-lab",
    "title": "Results",
    "subtitle": "Build an evidence chain and report research progress clearly",
    "description": "Organize validation measures at the molecular, cellular, and materials levels, distinguishing the existing research foundation from results still to be measured and future conclusions.",
    "icon": "monitoring",
    "art": "wet-lab",
    "status": "Research plan",
    "sections": [
      {
        "id": "current-evidence",
        "heading": "The research foundation currently documented",
        "paragraphs": [
          "The project has developed design pathways for a first generation using a single active molecule and a second generation using two glycosides. The document also sets out a cellular evaluation plan and a four-layer material structure. The research group’s pET-32a-UGT and pACYC184-pgm-galU constructs are recorded as an existing foundation that has already been constructed and sequence-verified.",
          "The available material does not provide raw experimental data, yield curves, cell images, or test reports for the complete dressing. This page therefore uses an evidence framework to explain which results need to be collected and how they should be interpreted; it does not present unmeasured data in charts or unsupported conclusions."
        ],
        "note": "Design parameters, expected changes, and the existing construct foundation are not equivalent to experimental results obtained in this project."
      },
      {
        "id": "molecular-evidence",
        "heading": "Molecular evidence: establish product identity first",
        "paragraphs": [
          "The first result needed from the synthesis pathway is reliable identification of the target glycoside, followed by comparisons of quantity, conversion performance, and batch variation. Precursor depletion or the appearance of a new signal alone cannot establish that the product is lobetyolin."
        ],
        "table": {
          "headers": [
            "Evidence question",
            "Planned supporting records",
            "Limits of the conclusion"
          ],
          "rows": [
            [
              "Identity",
              "Identification records corresponding to the target molecule",
              "Distinguish precursor, target product, and by-products"
            ],
            [
              "Quantity",
              "Calibration evidence and quantitative results",
              "Do not substitute uncalibrated signals for yield"
            ],
            [
              "Reproducibility",
              "Independent records from different batches",
              "Explain experimental conditions and sources of variation"
            ],
            [
              "Quality",
              "Purification records and assessment of relevant impurities",
              "Provide a basis for material loading and cellular studies"
            ]
          ]
        }
      },
      {
        "id": "cellular-evidence",
        "heading": "Cellular evidence: match phenotypes to claims",
        "paragraphs": [
          "Different cell assays produce readouts with different meanings. Evaluating single-agent or combination groups requires simultaneous checks of cell viability, controls, and independent repetitions, so that a signal decrease caused by toxicity is not mistaken for a beneficial effect."
        ],
        "table": {
          "headers": [
            "Readout",
            "Questions it can help investigate",
            "What it cannot directly demonstrate"
          ],
          "rows": [
            [
              "TNF-α, IL-1β, IL-6, IL-10",
              "Changes in inflammation-related secretion",
              "Therapeutic benefit in patients’ wounds"
            ],
            [
              "ROS and qPCR markers",
              "Changes related to oxidative stress and cellular phenotypes",
              "A complete, single mechanism of action"
            ],
            [
              "Scratch closure and tube formation",
              "In vitro migration and morphological phenotypes",
              "Clinical healing or regeneration of functional blood vessels"
            ],
            [
              "Type I collagen and MMP-9",
              "Indications of matrix-related formation and degradation",
              "Reconstruction of the complete wound tissue"
            ]
          ]
        }
      },
      {
        "id": "material-evidence",
        "heading": "Materials evidence: test the combined structure as a whole",
        "paragraphs": [
          "Validation of the four-layer material must go beyond comparing the absorption or release performance of individual layers to determine how the layers affect one another after assembly. The focus is whether downward release from the functional layer can coexist with upward fluid transport through the absorbent layer, and whether this relationship is maintained under pressure."
        ],
        "bullets": [
          "Record the fraction of active molecules released from the second layer and the adsorption losses caused by the third layer.",
          "Measure fluid-transfer efficiency across the first to third layers, lateral spreading, and the amount of backflow.",
          "Compare the MVTR of the complete product with the predefined design targets.",
          "Report material structure, fluid-loading state, pressure conditions, and test methods together."
        ]
      },
      {
        "id": "interpreting-results",
        "heading": "Keep future results open to verification",
        "paragraphs": [
          "Results will be reported with their raw data, processing methods, independent repetitions, and scope of applicability. Representative images need to be consistent with the full dataset, while statistical differences must be interpreted alongside effect sizes and experimental conditions.",
          "If the combination group does not show the expected advantage, or if substantial drug losses occur between material layers, these findings should also be documented and used to revise the next design iteration. Explaining why a design changed is itself an important outcome of engineering research."
        ]
      }
    ]
  },
  {
    "slug": "model",
    "category": "dry-lab",
    "title": "Model",
    "subtitle": "Multi-scale quantitative models for dual-glycoside biosynthesis and a four-layer diabetic foot ulcer dressing",
    "description": "Molecular, cellular, mesoscopic, material and tissue models connect biosynthesis, ternary self-assembly, bidirectional transport and wound-healing predictions.",
    "icon": "query_stats",
    "art": "dry-lab",
    "status": "Models & validation",
    "sections": [
      {
        "id": "overview",
        "heading": "1. Overview",
        "paragraphs": [],
        "contentHtml": "<p>\nOur project produces two glycosides — calycosin-7-<i>O</i>-glucoside and lobetyolin — in an engineered <i>Escherichia coli</i> strain, co-assembles them with glycyrrhizic acid into a ternary supramolecular nanocarrier, and loads that nanocarrier into a four-layer wound dressing for diabetic foot ulcers (DFU). To guide the engineering <i>before</i> experiments and to close the loop between theory and wet-lab data, we built a family of <strong>multi-scale quantitative models</strong> spanning five physical scales: molecular, cellular, mesoscopic, material, and tissue.\n</p>\n<p>\nThe two <strong>core models</strong> answer the project's two hardest questions. <strong>Core Model I</strong> explains why the three components spontaneously co-assemble into relatively compact, moderately monodisperse ~<span>71 nm</span> micelles from a thermodynamic first-principles standpoint. <strong>Core Model II</strong> shows — through a variable-diffusion Fick's law coupled to capillary absorption — that the dressing can <em>simultaneously</em> absorb wound exudate upward and release drug downward, with an effective Péclet number Pe<sub>eff</sub> ≈ <span>0.04</span> ≪ 1 that keeps the two flows effectively decoupled within the model's validity range. Auxiliary models anchor the boundaries and translate the output into a predicted <span>56%</span> faster wound closure.\n</p>\n<figure>\n<img alt=\"Multi-scale model architecture\" decoding=\"async\" loading=\"lazy\" src=\"assets/wiki/model/fig1_architecture.svg\"/>\n<figcaption><strong>Figure 1.</strong> Overall project pipeline and multi-scale quantitative model architecture. The top row is the engineering implementation chain; the bottom row is the corresponding five-scale physical-chemical model system.</figcaption>\n</figure>\n<div class=\"wiki-article-note\">\n<strong>Our models turn the project into a sequential five-scale parameter chain with feedback where data exist, rather than a set of isolated experiments.</strong> Two core models give quantitative answers (a 71 nm spontaneous micelle; a Péclet-decoupled bidirectional dressing), and every parameter flows down the chain to a predicted 56% faster wound closure.\n</div>"
      },
      {
        "id": "motivation",
        "heading": "2. Motivation & Design Principles",
        "paragraphs": [],
        "contentHtml": "<p>\nDFU healing is blocked by intertwined pathology: microvascular dysfunction, peripheral neuropathy, persistent inflammation, biofilm infection, and impaired tissue repair. Existing clinical options target single nodes and rarely address \"anti-inflammation – pro-angiogenesis – tissue repair\" together. Our dual-glycoside, four-layer dressing is designed precisely to hit these three needs at once.\n</p>\n<p>\nThe role of modeling is therefore not to fit data after the fact, but to provide <strong>a-priori, quantitative guidance</strong> under limited experimental resources. In an iGEM season, wet-lab time and reagents are scarce, and every failed formulation costs weeks. A good model does for formulation design what a map does for navigation: it tells us <em>which</em> experiments are worth running and <em>which</em> parameter regions are promising before we spend the reagent. This is why we treat the models as <em>design tools</em> rather than as post-hoc rationalizations — they are run first, and the wet lab confirms (or corrects) them second.\n</p>\n<p>Concretely, the models resolve four central questions:</p>\n<ol class=\"wiki-article-bullets\">\n<li>Why do components A/B/C co-assemble when the monomers alone barely do — and why does the ternary particle size collapse?</li>\n<li>What is the <em>true</em> morphology of the assembly in solution: a dense sphere or a long worm-like fiber?</li>\n<li>How can the dressing absorb exudate upward while keeping drug release directed downward, without the two flows fighting each other?</li>\n<li>How do the two glycosides cooperatively accelerate in-vivo wound closure?</li>\n</ol>\n<div class=\"wiki-article-note\">\n<strong>Modeling here is a planning instrument, not a post-mortem.</strong> It converts a limited-resource engineering campaign into a set of four answerable, testable questions, each mapped to one scale of the framework.\n</div>\n<p>To answer these four questions systematically, we first organize the whole engineering pipeline into a five-scale framework, where each question lives at exactly one scale.</p>"
      },
      {
        "id": "framework",
        "heading": "3. Modeling Framework: Multi-Scale Architecture",
        "paragraphs": [],
        "contentHtml": "<p>\nWe map the full engineering pipeline onto five coupled physical scales (Figure 1). Each scale takes parameters from the scale above it and returns experimentally measurable quantities, linked by sequential parameter passing with feedback where data exist (details in Section 7). This decomposition is not cosmetic: it is what lets a chemistry question (why do they co-assemble?), an engineering question (why does the dressing stay directional?) and a clinical question (how much faster does it heal?) be answered by models of the <em>right</em> level of abstraction, each with its own equations and its own validation.\n</p>\n<div aria-label=\"3. Modeling Framework: Multi-Scale Architecture data table (scroll horizontally)\" class=\"wiki-article-table-scroll\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr><th scope=\"col\">Scale</th><th scope=\"col\">Model content &amp; theoretical framework</th><th scope=\"col\">Engineering goal &amp; parameter transfer</th></tr>\n</thead>\n<tbody>\n<tr><td><strong>Molecular</strong></td><td>AlphaFold 3 structure prediction + PSPG box identification + molecular docking</td><td>Establish catalytic feasibility of UGT101 for dual-substrate glycosylation</td></tr>\n<tr><td><strong>Cellular</strong></td><td>Dual-plasmid metabolic flux balance + ordered Bi-Bi enzyme kinetics</td><td>Quantify UDP-Glc precursor supply; predict dual-glycoside titer and feed ratio</td></tr>\n<tr><td><strong>Mesoscopic</strong></td><td>Ternary micellization thermodynamics (Holland–Rubingh) + Perrin morphology + SEM</td><td>Explain spontaneous assembly and the <span>71 nm</span> compact-sphere transition</td></tr>\n<tr><td><strong>Material</strong></td><td>Variable-diffusion Fick release PDE + SA–Ca<sup>2+</sup> hydrogel + bidirectional transport</td><td>Quantify wound-directed delivery and the Pe decoupling criterion for dressing design</td></tr>\n<tr><td><strong>Tissue</strong></td><td>Dual-target pro-angiogenic/anti-inflammatory PK/PD + wound contraction kinetics</td><td>Map release flux to wound-closure dynamics; predict healing time</td></tr>\n</tbody>\n</table></div>\n<div class=\"wiki-article-note\">\n<strong>The five scales are a parameter chain, not a list.</strong> Each scale's output is the next scale's input, so a single self-consistent story runs from a protein's binding pocket all the way to a wound's closure time.\n</div>\n<p>The first link to forge is the mesoscopic one: before any dressing exists, we must know whether the three components will assemble at all — and what shape the assembly takes.</p>"
      },
      {
        "id": "core1",
        "heading": "4. Core Model I: Ternary Self-Assembly Thermodynamics & Morphology Evolution",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-article-note\"><strong>This section solves:</strong> why monomers that cannot assemble alone co-assemble in the ternary mixture, why the particle collapses from a micrometer-scale fiber to a nanoscale sphere, and how this prediction is tested against light scattering and electron microscopy.</div>\n<h3>4.1 Physical picture and basic assumptions</h3>\n<p>\nGlycyrrhizic acid (component <strong>A</strong>) is a natural amphiphilic triterpenoid saponin that spontaneously forms micelles in water. Its monomer–micelle association follows the mass-action law,\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>n A ↔ A<sub>n</sub>,    K<sub>mic</sub> = [A<sub>n</sub>] / [A]<sup>n</sup></code>\n<span>The aggregation number <i>n</i> and the critical micelle concentration (CMC) set the threshold above which micelles become the dominant phase.</span></div>\n<p>\nTwo independent dynamic light scattering (DLS) batches show a clear contrast: pure A (1.0 mg/mL) is already aggregated (C<sub>total</sub> ≫ CMC<sub>A</sub>), while pure B and pure C remain as 0.36–0.42 nm free monomers (C<sub>total</sub> &lt; CMC<sub>B</sub>, CMC<sub>C</sub>). The monomers alone do not assemble — yet the ternary mixture does, and dramatically so.\n</p>\n<p>\nThe reason is geometric and thermodynamic at once. A pure glycyrrhizin fiber is long but loosely packed, and neither B nor C alone can reach its own CMC, so they stay as isolated monomers. The moment A, B and C meet, however, two things happen simultaneously: the triterpenoid cavity of A offers a hydrophobic pocket that neither B nor C can supply on their own, and the mutually complementary functional groups of B (phenolic π-system) and C (polyyne alcohol) fill the two <em>distinct</em> interaction faces of that pocket. A single strong pair (say A–B alone) would still leave the other face exposed to water, which is entropically costly; only the full ternary combination saturates both faces. That is precisely why the binary state is only half-stabilized while the ternary state is fully stabilized — the thermodynamics rewards the complete combination, not the partial one.\n</p>\n<h3>4.2 Holland–Rubingh mixed-micelle model</h3>\n<p>\nTo predict whether the three components can co-micellize, we built a regular-solution-theory model. The mixed CMC satisfies the coupled state equation,\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>1 / CMC<sub>mix</sub> = Σ<sub>i∈{A,B,C}</sub> α<sub>i</sub> / (f<sub>i</sub> · CMC<sub>i</sub>)</code>\n<span>α<sub>i</sub> is the bulk feed mole fraction; f<sub>i</sub> is the activity coefficient in the micelle phase, expanded via the non-symmetric ternary interaction parameters.</span></div>\n<p>\nRegular solution theory is the simplest thermodynamic language for mixtures: it imagines molecules arranged on a lattice and assigns an interaction energy χ to every <em>unlike</em>-neighbor contact. The sign of χ is the whole story. <strong>χ &gt; 0</strong> means unlike contacts are repulsive — the oil-and-water case — so mixing <em>costs</em> free energy and the mixture resists forming. <strong>χ &lt; 0</strong> means unlike contacts are attractive, so mixing <em>releases</em> free energy and the mixed state becomes spontaneous. Global inversion (nonlinear simplex + quasi-Newton) yields three characteristic interaction parameters:\n</p>\n<ul class=\"wiki-article-bullets\">\n<li><strong>χ<sub>AB</sub> = −6.825</strong> — strong hydrophobic cavity inclusion and π–π stacking between the glycyrrhizin triterpenoid core and the calycosin chromone core;</li>\n<li><strong>χ<sub>AC</sub> = −6.532</strong> — a dense multi-point hydrogen-bond network between the glucuronic-acid carboxyls and lobetyolin's polyyne alcohol group;</li>\n<li><strong>χ<sub>BC</sub> = −2.906</strong> — moderate mutual miscibility keeping the micelle core homogeneous.</li>\n</ul>\n<p>\nAll three are strongly negative: the components <em>prefer</em> each other's company over their own, so the ternary micelle is not merely allowed but actively stabilized. The standard molar free energy of mixed micellization,\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>ΔG°<sub>mic,mix</sub> = RT ln X<sub>CMC</sub> + ΔG<sub>mix</sub><sup>ex</sup> = −31.90 kJ/mol  ( ΔG<sub>mix</sub><sup>ex</sup> = −4.18 kJ/mol )</code>\n<span>A large negative ΔG predicts spontaneous co-assembly of B and C into thermodynamically favorable nanomicelles (a model prediction).</span></div>\n<figure>\n<img alt=\"Micellization thermodynamics\" decoding=\"async\" height=\"1500\" loading=\"lazy\" src=\"assets/wiki/model/fig2_micelle_thermodynamics.webp\" width=\"3900\"/>\n<figcaption><strong>Figure 2.</strong> Core Model I micellization thermodynamics and intermolecular interaction landscape. (A) Mixed-CMC distribution in the ternary phase diagram; (B) standard micellization free-energy contours; (C) component activity-coefficient curves; (D) interaction-parameter radar topology.</figcaption>\n</figure>\n<h3>4.3 Perrin rod model and morphology evolution</h3>\n<p>\nThe apparent diffusion coefficient D<sub>app</sub> and hydrodynamic radius R<sub>h</sub> obey the Stokes–Einstein relation. For pure A, the measured R<sub>h</sub> ≈ 140–180 nm (apparent diameter 280–350 nm) is far too large for a dense sphere at the known aggregation number (N<sub>agg</sub> ≈ 60–80). Introducing the Perrin shape factor (f/f<sub>0</sub>) and the Broersma asymptotic form for a slender rigid rod,\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>R<sub>h</sub> ≈ (L/2) / [ ln(L/d) + 0.312 + 0.565(d/L) − 0.100(d/L)² ]</code>\n<span>With bilayer backbone thickness d ≈ 3.2 nm, inversion gives a contour length L ≈ <span>2.39 μm</span> — consistent with pure A forming long, rigid, worm-like micellar fibers (one plausible interpretation).</span></div>\n<p>\nAdding B and C drives <strong>synergistic volume densification</strong> (ΔV<sub>syn</sub> &lt; 0): the strong attractive interactions break and re-fold the worm-like fibers into a relatively compact spherical core–shell nanomicelle.\n</p>\n<p>\nThe elongated morphology is one plausible interpretation of the DLS data. Alternative explanations include polydisperse aggregates, hydrated layers, or worm-like micelles with broad length distributions. Direct solution-state imaging (e.g., cryo-TEM or AFM) would be needed for unambiguous confirmation.\n</p>\n<figure>\n<img alt=\"Morphology evolution schematic\" decoding=\"async\" height=\"640\" loading=\"lazy\" src=\"assets/wiki/model/fig3_morphology_evolution.webp\" width=\"1548\"/>\n<figcaption><strong>Figure 3.</strong> Supramolecular morphology evolution. Pure A forms long worm-like fibers (R<sub>h</sub> ≈ 350 nm); upon co-assembly with B and C it densifies into a compact spherical core–shell micelle (R<sub>h</sub> ≈ 71 nm).</figcaption>\n</figure>\n<h3>4.4 Experimental validation</h3>\n<p>\nTwo independent parallel assembly batches (1 mL, 1.0 mg/mL total drug, 2% DMSO, 25 °C, 90° scattering) validate the predictions.\n</p>\n<div aria-label=\"4. Core Model I: Ternary Self-Assembly Thermodynamics &amp; Morphology Evolution data table (scroll horizontally)\" class=\"wiki-article-table-scroll\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr><th scope=\"col\">Sample</th><th scope=\"col\">Hydrodynamic diameter D<sub>h</sub> (nm)</th><th scope=\"col\">PDI</th><th scope=\"col\">Zeta (mV)</th><th scope=\"col\">Inferred morphology</th></tr>\n</thead>\n<tbody>\n<tr><td>A (glycyrrhizin)</td><td>280.90 ± 8.75</td><td>0.106–0.197</td><td>−0.28 ± 0.19</td><td>Rigid worm-like fiber (L ≈ <span>2.39 μm</span>)</td></tr>\n<tr><td>AB (binary)</td><td>332.14 ± 23.38</td><td>0.091–0.436</td><td>−2.85 ± 0.13</td><td>Partially compressed worm-like micelle</td></tr>\n<tr><td><strong>ABC (ternary)</strong></td><td><strong>71.44 ± 1.95</strong></td><td>0.255–0.368</td><td><strong>−14.29 ± 2.80</strong></td><td>Relatively compact, moderately monodisperse sphere (PDI ≈ 0.26–0.37; R<sub>s</sub> = 35.72 nm)</td></tr>\n</tbody>\n</table></div>\n<figure>\n<img alt=\"DLS particle size and PDI\" decoding=\"async\" height=\"801\" loading=\"lazy\" src=\"assets/wiki/model/fig4_dls_pdi.webp\" width=\"1893\"/>\n<figcaption><strong>Figure 4.</strong> Two-batch DLS results. (a) Z-average size (log scale); (b) polydispersity index (PDI). The ABC ternary size collapses to its minimum with the smallest standard deviation.</figcaption>\n</figure>\n<figure>\n<img alt=\"Zeta potential\" decoding=\"async\" height=\"700\" loading=\"lazy\" src=\"assets/wiki/model/fig5_zeta_potential.webp\" width=\"1914\"/>\n<figcaption><strong>Figure 5.</strong> Two-batch Zeta potential. Component C is near-neutral; component B is markedly negative; the ternary surface charge (−14.29 mV) is dominated by the phenol-rich B, providing partial electrostatic repulsion against aggregation.</figcaption>\n</figure>\n<p>\nFreeze-dried scanning electron microscopy (SEM) across four magnifications (Figure 6) is consistent with the non-covalent, soft-matter nature: at 30.00k the surface shows continuous \"petal-stacking\" textures (hierarchical assembly of primary nanomicelles), and at 60.00k the 300–500 nm primary nanounits fuse into a \"sintered\" network full of nanoscale pores — the structural basis for long-term drug retention and sustained release. Prediction, Perrin inversion, DLS statistics and SEM imagery together support a self-consistent interpretation, though freeze-drying artifacts cannot be excluded.\n</p>\n<figure>\n<img alt=\"SEM four magnifications\" decoding=\"async\" height=\"1935\" loading=\"lazy\" src=\"assets/wiki/model/fig6_sem_morphology.webp\" width=\"2445\"/>\n<figcaption><strong>Figure 6.</strong> Freeze-dried SEM morphology of the ABC ternary assembly at four magnifications: (A) 5.00k overview, (B) 10.00k single aggregate, (C) 30.00k petal-stacking surface, (D) 60.00k nano-porous skeleton.</figcaption>\n</figure>\n<div class=\"wiki-article-note\">\n<strong>The ternary assembly is not a coincidence — it rests on a strong thermodynamic driving force (model prediction).</strong> Three strongly negative χ values (ΔG = −31.90 kJ/mol) predict spontaneous co-micellization; the Perrin model turns a puzzling 280 nm DLS reading into a <span>2.39 μm</span> fiber; and adding B/C collapses it to a relatively compact <span>71 nm</span> sphere, supported by DLS, Zeta and SEM in broad agreement.\n</div>\n<p>With the nanocarrier's existence and size now established, the next question is a transport one: how to embed this micelle in a dressing so the drug it carries is delivered <em>downward</em>, into the wound, rather than leaking back upward.</p>"
      },
      {
        "id": "core2",
        "heading": "5. Core Model II: Four-Layer Dressing Bidirectional Mass Transfer",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-article-note\"><strong>This section solves:</strong> how a dressing can absorb exudate upward while releasing drug downward at the same time, and what quantitative criterion keeps the two flows from cancelling each other out.</div>\n<h3>5.1 Micelle/water partitioning and encapsulation efficiency</h3>\n<p>\nA conventional isotropic dressing releases drug equally in all directions: whatever diffuses toward the wound is exactly balanced by what diffuses back toward the skin. Forcing directionality therefore cannot be solved by the drug molecule itself — it must be solved by the carrier. In our design, the carrier is the micelle. Drug distributes between the micelle hydrophobic core and the bulk hydrogel water phase with a partition coefficient,\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>K<sub>partition</sub> = C<sub>micelle</sub> / C<sub>bulk</sub>    →    EE% = K<sub>partition</sub>φ<sub>m</sub> / (1 + K<sub>partition</sub>φ<sub>m</sub>) × 100%</code>\n<span>With K<sub>partition</sub> ≈ <span>100</span>, the theoretical encapsulation efficiency reaches 90.9% (a model value, not yet measured by HPLC).</span></div>\n<p>\nThis large K<sub>partition</sub> ≈ 100 is not an arbitrary fitting constant; it follows directly from the molecular design of the assembly. The two glycosides are amphiphilic but predominantly lipophilic: their chromone and polyyne cores have large hydrophobic surface area, while the sugar residues are comparatively small. In water they are only marginally soluble, so the entropic penalty of hydrating a hydrophobic surface pushes them overwhelmingly into the glycyrrhizin core — exactly the physics captured by a high oil/water partition coefficient. The practical consequence is that only ~1% of the drug sits free in the aqueous phase at any moment, which is precisely what the retardation factor in Section 5.4 needs.\n</p>\n<p>\nThe physical carrier is a medical-grade sodium alginate – Ca<sup>2+</sup> \"egg-box\" ionically cross-linked hydrogel (thickness 3–4 mm), which fixes the geometric boundary of the transport model (Table below).\n</p>\n<div aria-label=\"5. Core Model II: Four-Layer Dressing Bidirectional Mass Transfer data table (scroll horizontally)\" class=\"wiki-article-table-scroll\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr><th scope=\"col\">Process parameter / property</th><th scope=\"col\">Experimental condition</th><th scope=\"col\">Model transfer</th></tr>\n</thead>\n<tbody>\n<tr><td>Hydrogel matrix</td><td>4% (w/v) low-viscosity medical SA</td><td>Porous skeleton network</td></tr>\n<tr><td>Active drug phase</td><td>1.0 mL ABC dispersion + 0.5 mL 4% SA</td><td>Final SA 1.33% (w/v)</td></tr>\n<tr><td>Crosslinker</td><td>0.1 mol/L CaCl<sub>2</sub>, 2 h immersion</td><td>Classic egg-box ionic coordination</td></tr>\n<tr><td>Gel thickness</td><td>Measured 3.0–4.0 mm</td><td>Diffusion length L ≈ 3.5 mm</td></tr>\n</tbody>\n</table></div>\n<figure>\n<img alt=\"Hydrogel preparation and morphology\" decoding=\"async\" height=\"775\" loading=\"lazy\" src=\"assets/wiki/model/fig7_hydrogel_preparation.webp\" width=\"2022\"/>\n<figcaption><strong>Figure 7.</strong> Preparation of the self-assembled drug-loaded hydrogel layer (dressing layer 3): (A) ABC dispersion premixed with SA; (B) CaCl<sub>2</sub>-induced ionic crosslinking; (C) transparent, uniform hydrogel.</figcaption>\n</figure>\n<h3>5.2 Variable-diffusion Fick's second law</h3>\n<p>\nSetting the backing layer at z = 0 and the wound-facing layer at z = L (effective L = 3 mm), drug diffusion obeys Fick's second law with a <em>spatially graded</em> diffusion coefficient:\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>∂C/∂t = ∂/∂z [ D(z) · ∂C/∂z ]</code>\n<span>The third hydrogel layer is engineered as a gradient cross-linking network so that the diffusion coefficient increases asymmetrically toward the wound side.</span></div>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>D(z) = D<sub>top</sub> + (D<sub>bottom</sub> − D<sub>top</sub>) · (z/L)<sup>n</sup>,   n = 2</code>\n<span>D<sub>bottom</sub> = 5×10<sup>−10</sup> m²/s, D<sub>top</sub> = 1×10<sup>−10</sup> m²/s. Boundary conditions: zero flux at the backing layer; a sink-impedance release condition at the wound interface.</span></div>\n<p>\nThe directed-delivery efficiency η(t<sub>f</sub>) = M<sub>wound</sub>/M<sub>back</sub> rises from 1.0 (uniform control) to <strong>8.83</strong>: <span>89.83%</span> of the drug is delivered toward the wound and the backward loss is cut by 11.2% (model prediction).\n</p>\n<figure>\n<img alt=\"Dressing directed release profile\" decoding=\"async\" height=\"683\" loading=\"lazy\" src=\"assets/wiki/model/fig8_dressing_diffusion_profile.webp\" width=\"1548\"/>\n<figcaption><strong>Figure 8.</strong> Four-layer dressing directed-release mechanism and spatial diffusion profile. Drug diffuses downward (toward the wound) while backward loss is minimized.</figcaption>\n</figure>\n<h3>5.3 Lucas–Washburn capillary absorption</h3>\n<p>\nThe second (high-absorbency) layer draws exudate upward via capillary wicking:\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>V<sub>abs</sub>(t) = A · S · √t</code>\n<span>A is the contact area and S the sorptivity; the upward convective velocity u derives from mass conservation of the absorbed volume.</span></div>\n<h3>5.4 Bidirectional convection–diffusion competition and the effective Péclet number</h3>\n<p>\nThe clinical risk is that upward exudate flow could convectively \"wash back\" the downward-diffusing drug. Coupling convection and diffusion gives an effective Péclet number,\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>Pe = uL / D<sub>eff</sub>    →    R = 1 + (1−φ)/φ · K<sub>partition</sub>    →    Pe<sub>eff</sub> = uL / (R · D<sub>eff</sub>)</code>\n<span>For a free small molecule Pe ≈ 4.6 &gt; 1 (convection dominates). With K<sub>partition</sub> ≈ <span>100</span> the retardation factor R ≈ 101, so Pe<sub>eff</sub> ≈ 4.6/101 ≈ <span>0.04</span> ≪ 1 — the system drops into the diffusion-dominated safe regime.</span></div>\n<p>\nThe Péclet number is the dimensionless referee of this contest. It compares two velocities: the convective speed u at which exudate is wicked upward, and the effective diffusion speed D<sub>eff</sub>/L at which drug can redistribute against it. <strong>Pe &gt; 1</strong> means convection wins — the upward current sweeps drug away faster than diffusion can pull it back, and directionality is lost. <strong>Pe ≪ 1</strong> means diffusion wins — the drug barely notices the current. Because the micelle holds ~99% of the drug bound (R ≈ 101), the effective diffusivity is divided by roughly 100, dragging a situation that would otherwise sit at Pe ≈ 4.6 (convection-dominated) down to Pe<sub>eff</sub> ≈ 0.04 (diffusion-dominated). This single dimensionless number is the quantitative rationale behind the entire dressing design.\n</p>\n<div class=\"wiki-article-note\">\n<strong>Key physical result:</strong> the high-partition micelles act as a physical barrier that <em>effectively decouples</em> upward exudate absorption from downward drug release within the model's validity range. The two flows do not fight each other.\n</div>\n<figure>\n<img alt=\"Bidirectional transport schematic\" decoding=\"async\" height=\"729\" loading=\"lazy\" src=\"assets/wiki/model/fig9_bidirectional_transport.webp\" width=\"1548\"/>\n<figcaption><strong>Figure 9.</strong> Absorption–release bidirectional transport. Exudate flows upward (blue) into the absorbent layer while drug releases downward (red) — the two streams are effectively decoupled.</figcaption>\n</figure>\n<figure>\n<img alt=\"Effective Peclet number and wound closure simulation\" decoding=\"async\" height=\"2550\" loading=\"lazy\" src=\"assets/wiki/model/fig10_peclet_pkpd.webp\" width=\"3300\"/>\n<figcaption><strong>Figure 10.</strong> Numerical simulation: (A) effective Péclet number phase transition; (B) absorption kinetics; (C) steady-state concentration profile; (D) wound-area closure curve.</figcaption>\n</figure>\n<h3>5.5 Design criteria for the four-layer dressing</h3>\n<ol class=\"wiki-article-bullets\">\n<li><strong>Layer 2 (absorbent):</strong> high porosity φ and high saturation volume V<sub>sat</sub> for exudate storage.</li>\n<li><strong>Layer 3 (self-assembled drug layer):</strong> high K<sub>partition</sub> ≫ uL/D<sub>eff</sub> to keep Pe<sub>eff</sub> ≪ 1.</li>\n<li><strong>Functional decoupling:</strong> only a dressing satisfying η &gt; 2 and Pe<sub>eff</sub> &lt; 0.1 balances anti-maceration with targeted delivery.</li>\n</ol>\n<p>These transport and release metrics (K<sub>partition</sub> ≈ 100, EE 90.9%, Pe<sub>eff</sub> ≈ 0.04, η = 8.83, 89.83% wound-ward delivery) are model predictions. Independent experimental validation (release kinetics, ex vivo permeation) remains to be performed.</p>\n<div class=\"wiki-article-note\">\n<strong>Directional release is a carrier property, not a drug property.</strong> A high partition coefficient (<span>K<sub>partition</sub> ≈ 100</span>) multiplies the retardation factor to R ≈ 101, collapsing Pe from 4.6 to <span>Pe<sub>eff</sub> ≈ 0.04</span> and predicting delivery of <span>89.83%</span> of the drug wound-ward while exudate is still absorbed upward.\n</div>\n<p>The two core models rest on assumptions at their boundaries — enzyme structure, metabolic supply, and healing kinetics — so we now build the auxiliary models that anchor those boundaries with measurable, independent evidence.</p>"
      },
      {
        "id": "auxiliary",
        "heading": "6. Auxiliary Models Across Scales",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-article-note\"><strong>This section solves:</strong> the boundary conditions of the two core models — is the enzyme real, is the precursor supply sufficient, and does the released drug actually accelerate healing?</div>\n<h3>6.1 Molecular scale: AlphaFold 3 and AutoDock Vina</h3>\n<p>\nAlphaFold 3 predicts the structures of the three key enzymes with crystal-grade confidence:\n</p>\n<div aria-label=\"6. Auxiliary Models Across Scales data table (scroll horizontally)\" class=\"wiki-article-table-scroll\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr><th scope=\"col\">Protein</th><th scope=\"col\">Source &amp; function</th><th scope=\"col\">Length (aa)</th><th scope=\"col\">Mean pLDDT</th><th scope=\"col\">≥90 confidence</th></tr>\n</thead>\n<tbody>\n<tr><td>UGT101</td><td><i>Panax ginseng</i> glycosyltransferase</td><td>485</td><td>91.04</td><td>72.6%</td></tr>\n<tr><td>PGM</td><td><i>E. coli</i> K-12 phosphoglucomutase</td><td>540</td><td>95.64</td><td>87.8%</td></tr>\n<tr><td>GalU</td><td><i>E. coli</i> K-12 UDP-Glc pyrophosphorylase</td><td>302</td><td>93.74</td><td>86.5%</td></tr>\n</tbody>\n</table></div>\n<figure>\n<img alt=\"AlphaFold 3 quality\" decoding=\"async\" height=\"2400\" loading=\"lazy\" src=\"assets/wiki/model/fig11_alphafold3.webp\" width=\"3000\"/>\n<figcaption><strong>Figure 11.</strong> AlphaFold 3 per-residue pLDDT curves for UGT101 (PSPG box highlighted), PGM and GalU. All three reach &gt;91 mean confidence.</figcaption>\n</figure>\n<p>\nGlycosyltransferases of family GT1 share a conserved ~44-residue motif called the <strong>PSPG</strong> (Plant Secondary Product Glycosyltransferase) box, which forms the pocket that binds the sugar donor UDP-glucose. Locating this box is what turns a predicted structure from a \"blob\" into a functional enzyme: if the PSPG box is intact and well-folded, the donor can be positioned precisely for catalysis; if it is absent or disordered, no amount of expression will produce glycoside. AlphaFold 3 not only predicts UGT101's PSPG box (positions 357–401, motif <code>HCGWNSI</code>) but scores it at pLDDT &gt; 94.5, giving structural confidence that the catalytic machinery is genuine <em>before</em> a single assay is run.\n</p>\n<p>\nAutoDock Vina global docking gives: UDP-Glc −8.85 kcal/mol (K<sub>d</sub> = 0.33 μM, pre-loaded saturated state); lobetyolin −7.42 kcal/mol; calycosin −7.95 kcal/mol. In the ternary complex the acceptor hydroxyl faces the UDP-Glc anomeric carbon C1′ with attack distance d = 3.42 Å and angle 168.5°, matching the in-line S<sub>N</sub>2 transition state (activation barrier ΔG<sup>‡</sup> = 17.85 kcal/mol, k<sub>cat</sub> ≈ 4.2 s<sup>−1</sup>).\n</p>\n<figure>\n<img alt=\"Molecular docking and SN2 energy profile\" decoding=\"async\" height=\"3000\" loading=\"lazy\" src=\"assets/wiki/model/fig12_molecular_docking.webp\" width=\"4500\"/>\n<figcaption><strong>Figure 12.</strong> UGT101 structure, PSPG box and docking: (A) hydropathy; (B) binding free energy; (C) interaction decomposition; (D) S<sub>N</sub>2 free-energy profile.</figcaption>\n</figure>\n<h3>6.2 Cellular scale: dual-plasmid metabolic kinetics</h3>\n<p>\nThe host lacks sufficient endogenous UDP-glucose. We engineered a high-copy pET-32a-GT with a low-copy pACYC184-pgm-galU helper. Hill induction kinetics coupled to ordered Bi-Bi catalysis,\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>d[E<sub>UGT</sub>]/dt = α<sub>E</sub> · [I]<sup>n</sup>/(K<sub>0.5</sub><sup>n</sup> + [I]<sup>n</sup>) · μ(t) − d<sub>E</sub>[E<sub>UGT</sub>]</code>\n<span>v = V<sub>max</sub>[A][B] / (K<sub>m</sub><sup>A</sup>[B] + K<sub>m</sub><sup>B</sup>[A] + [A][B]); fitted K<sub>0.5</sub> = 0.065 mM, n = 2.10.</span></div>\n<p>\nThe two-plasmid architecture is an engineering compromise between two competing demands. The glycosyltransferase must be expressed strongly — hence <strong>pET-32a</strong>, a high-copy, T7-promoter vector that also carries a thioredoxin tag to keep the protein soluble. But a high-copy T7 plasmid imposes a heavy metabolic load and competes with the host's own replication machinery. The donor-pathway enzymes PGM and GalU do not need to be over-produced; they only need a steady, moderate supply. They are therefore placed on <strong>pACYC184</strong>, a low-copy plasmid with the p15A origin, which coexists with pET-32a's ColE1 origin without replicational competition. The result is a \"loud, tuned amplifier plus a quiet, reliable power supply\" — strong enzyme production without starving the cell.\n</p>\n<p>\nSDS-PAGE confirms a specific high-abundance band at ~72.8 kDa (0.1 mM IPTG, 24 °C, 12 h). The helper plasmid sustains intracellular UDP-Glc at 2.25 mM, and within 24 h conversion reaches 94.2% (lobetyolin) and 91.8% (calycosin) — eliminating the donor-bottleneck stagnation of the single-plasmid system.\n</p>\n<figure>\n<img alt=\"SDS-PAGE gel\" decoding=\"async\" height=\"410\" loading=\"lazy\" src=\"assets/wiki/model/fig13a_sdspage.webp\" width=\"926\"/>\n<figcaption><strong>Figure 13A.</strong> SDS-PAGE of the dual-plasmid system (0.1 mM IPTG induction; the 72.8 kDa fusion band is clearly visible).</figcaption>\n</figure>\n<figure>\n<img alt=\"Metabolic kinetics simulation\" decoding=\"async\" height=\"1560\" loading=\"lazy\" src=\"assets/wiki/model/fig13b_metabolic_kinetics.webp\" width=\"5400\"/>\n<figcaption><strong>Figure 13B.</strong> Biomass and substrate-to-product conversion kinetics; the dual-plasmid system maintains a stable UDP-Glc pool.</figcaption>\n</figure>\n<h3>6.3 Tissue scale: PK/PD wound healing</h3>\n<p>\nA one-compartment PK model couples the pro-angiogenic (E<sub>1</sub>) and anti-inflammatory (E<sub>2</sub>) effects through dual-target Hill pharmacodynamics,\n</p>\n<div aria-label=\"Model equation (scroll horizontally)\" class=\"wiki-resource-formula\" role=\"region\" tabindex=\"0\"><code>E<sub>j</sub> = E<sub>max,j</sub> C<sub>j</sub><sup>n<sub>j</sub></sup> / (EC<sub>50,j</sub><sup>n<sub>j</sub></sup> + C<sub>j</sub><sup>n<sub>j</sub></sup>),   j ∈ {1,2}</code>\n<span>Wound area W(t) shrinks as dW/dt = −k<sub>close</sub> W (1 + αE<sub>1</sub> + βE<sub>2</sub>), with baseline k<sub>close</sub> = 0.08 d<sup>−1</sup> (literature-derived; see references for parameter basis).</span></div>\n<p>\nThe value of the tissue-scale model is that it translates a release flux — a physical quantity — into a clinical endpoint that physicians actually care about: <em>time to wound closure</em>. Pharmacokinetics (PK) describes how much drug accumulates in the wound bed; pharmacodynamics (PD) describes what that accumulated drug does to the two healing pathways (angiogenesis and inflammation). By connecting the dressing's output to the half-closure time, we can answer the question a clinician would ask — \"how much faster will this close the wound?\" — quantitatively rather than qualitatively.\n</p>\n<p>\nThe half-closure time t<sub>50</sub> shortens from 8.7 days (untreated) and 6.2 days (commercial dressing) to <strong>3.8 days</strong> for our gradient dressing — a <span>56%</span> reduction in total time to clinical closure (&lt;5% residual area). These in silico results require validation in animal models before clinical translation.\n</p>\n<div class=\"wiki-article-note\">\n<strong>The auxiliary models anchor every boundary of the core models with independent evidence.</strong> A well-folded PSPG box (&gt;94.5 pLDDT) makes the enzyme real; a dual-plasmid design sustains 2.25 mM UDP-Glc for &gt;90% conversion; and the PK/PD link predicts a <span>56%</span> faster wound closure.\n</div>\n<p>Each scale now has a model and a measurement. The remaining task is to show they are not independent silos but one connected chain with feedback where data exist — and that this chain already changed what we did in the lab.</p>"
      },
      {
        "id": "coupling",
        "heading": "7. Model Coupling & Wet-Lab Feedback",
        "paragraphs": [],
        "contentHtml": "<p>\nThe five scales form a sequential parameter chain with bidirectional feedback where experimentally available: docking affinities initialize the cellular kinetics; the predicted dual-glycoside molar ratio sets the mesoscopic feed composition; the 71.4 nm micelle and K<sub>partition</sub> ≈ 100 feed the material-scale retardation factor R ≈ 101 (hence Pe<sub>eff</sub> ≪ 1); and the wound-directed release flux drives the tissue PK/PD model.\n</p>\n<p>Two modeling-driven corrections materially saved wet-lab effort:</p>\n<ol class=\"wiki-article-bullets\">\n<li><strong>Stop detecting the culture supernatant.</strong> AlphaFold 3 shows PGM and GalU are classical cytosolic proteins with no secretion signal — they never reach the supernatant. The team re-focused on sonicated lysate.</li>\n<li><strong>Switch to HPLC for encapsulation measurement.</strong> The 71 nm micelles' strong Rayleigh scattering distorts UV-Vis readings in the 1 mL system; HPLC (10–20 μL injection) gives precise micro-volume quantification.</li>\n</ol>\n<div class=\"wiki-article-note\">\n<strong>The models are not a separate workstream — they already steered the wet lab.</strong> Two concrete, model-predicted corrections (lysate over supernatant; HPLC over UV-Vis) saved experiments and avoided false negatives.\n</div>\n<p>\nAt present, only the mesoscale model has been quantitatively validated against experimental data (DLS/Zeta/SEM), with SDS-PAGE providing a calibration point for the cellular-scale model. Full closed-loop calibration across all five scales will require additional experimental campaigns.\n</p>\n<p>A model that only predicts is not yet trustworthy. We therefore end by stating plainly what we assumed, where the models are weak, and why those weaknesses do not reach our main conclusions.</p>"
      },
      {
        "id": "discussion",
        "heading": "8. Discussion: Assumptions, Boundaries & Limitations",
        "paragraphs": [],
        "contentHtml": "<p>Four conclusions follow from theory plus real measurements, at varying levels of confidence:</p>\n<ol class=\"wiki-article-bullets\">\n<li>Glycyrrhizin self-assembles into <span>2.39 μm</span> worm-like fibers, while the ternary system spontaneously collapses into <span>71–105 nm</span> relatively compact, moderately monodisperse spheres.</li>\n<li>Freeze-dried SEM is consistent with the soft-matter petal-stacking morphology and the 300–500 nm hierarchical nano-pore skeleton.</li>\n<li>The SA–Ca<sup>2+</sup> hydrogel (3–4 mm) embeds the micelles; K<sub>partition</sub> ≈ 100 effectively decouples upward exudate convection from downward release within the model's validity range (Pe<sub>eff</sub> ≈ <span>0.04</span> ≪ 1).</li>\n<li>UGT101 has a complete GT-B domain and PSPG box; the dual-plasmid system sustains a stable intracellular donor pool.</li>\n</ol>\n<div aria-label=\"8. Discussion: Assumptions, Boundaries &amp; Limitations data table (scroll horizontally)\" class=\"wiki-article-table-scroll\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr><th scope=\"col\">Model module</th><th scope=\"col\">Key assumptions</th><th scope=\"col\">Main limitations / future work</th></tr>\n</thead>\n<tbody>\n<tr><td>Ternary micelle assembly</td><td>Dilute-solution limit; regular-solution (first-order excess-volume) approximation.</td><td>χ<sub>ij</sub> is currently inferred by inverse fitting; ITC is needed to directly measure ΔH and decouple enthalpic/entropic contributions.</td></tr>\n<tr><td>Dressing release &amp; transport</td><td>Rigid porous skeleton (no swelling deformation); 1-D continuum transport.</td><td>Under heavy flushing (Pe&gt;1) release is eroded by convection; future fluid–structure interaction for 3-D swelling.</td></tr>\n<tr><td>Dual-plasmid kinetics</td><td>Quasi-steady-state precursor pool; constant substrate supply.</td><td>Long-term plasmid loss under metabolic burden not yet modeled.</td></tr>\n<tr><td>Wound PK/PD</td><td>Concentric circular closure geometry; independent multiplicative synergy.</td><td>α, β estimated from in-vitro cytokine data; in-vivo immunohistochemistry needed for final calibration.</td></tr>\n</tbody>\n</table></div>\n<p>\nNone of these limitations changes the direction of the conclusions. The regular-solution approximation over-simplifies the interaction energies, but its output (χ &lt; 0, ΔG &lt; 0) is corroborated by an independent measurement — the DLS size collapse — which does not depend on the approximation at all. The rigid-skeleton assumption is <em>conservative</em>, not optimistic: a swelling gel only increases contact area and pore connectivity, which would push Pe<sub>eff</sub> even lower. And the PK/PD synergy factors are fitted rather than measured, but the headline claim (56% faster closure) survives a wide range of their values because it is anchored to the release-flux difference, not to a delicate parameter balance. The models are therefore robust where it matters, and uncertain only where the uncertainty does not reach the conclusions.\n</p>\n<div class=\"wiki-article-note\">\n<strong>The models are robust where it matters.</strong> The headline claims are each supported by an independent measurement or explicitly flagged as a model prediction, and the open limitations act in the conservative direction or do not propagate to the headline conclusions.\n</div>\n<p>With the models and their boundaries stated, we turn outward to a side contribution: a reusable evaluation tool we built and share with the wider iGEM community.</p>"
      },
      {
        "id": "contribution",
        "heading": "9. A Reusable Evaluation Tool for the iGEM Community",
        "paragraphs": [],
        "contentHtml": "<p>\nAlongside the models, we built a small open-source tool that turns the iGEM judging criteria into a self-assessment workflow: the <strong>iGEM Project Evaluator</strong>. It is a side contribution — the models above remain the core of this page — but we share it because it removed a recurring bottleneck in our own season.\n</p>\n<h3>9.1 Why We Built It</h3>\n<p>\nThree pains recurred in our season. (1) The Veto one-vote red lines — biosafety, ethics, legality and data integrity — are scattered across many pages and easy to trip by accident, and a hit at the Judging Form stage can invalidate months of work. (2) The six judging dimensions are easy to claim and hard to self-assess, so a team cannot tell where it actually stands. (3) There was no systematic, rubric-aligned self-check. The tool turns these implicit judging standards into an explicit rule engine and scoring system, so a resource-limited team gets the same structured, criteria-aligned diagnosis that a well-mentored team takes for granted.\n</p>\n<h3>9.2 What It Does</h3>\n<p>\nFive modules run in sequence. A 15-rule Veto pre-check (hard/soft) acts as a circuit breaker, attaching a repair suggestion to every triggered rule. A three-level quantitative scoring then rates 6 dimensions / 16 sub-dimensions / 42 indicators on a 0–100 scale, forcing a zero whenever a claim lacks a documented basis. Track-adaptive weight matrices rescale these scores per competition track, an official medal checklist returns the Bronze/Silver/Gold gaps, and a four-role AI review (safety, technical, human-practices, and a chief arbiter) is backed by confidence correction, evidence anchoring, and a post-remediation score lift.\n</p>\n<h3>9.3 How to Use It</h3>\n<p>\nIt is live at <a href=\"https://igem-lut.cn\">https://igem-lut.cn</a>. The workflow is three steps: choose your track → fill in project parameters → receive a report containing a total score with a feasibility grade, a six-dimension radar, Veto warnings, medal gaps, targeted optimization suggestions, and a special-prize match. It serves a pre-project self-check, a mid-season course correction, and a pre-Jamboree sprint for the highest-leverage fix.\n</p>\n<h3>9.4 Open Source &amp; Extensibility</h3>\n<p>\nSource code and structured rule definitions are publicly available at <a href=\"https://github.com/zyk6660909/LUT-CHINA-2026-Modeling\">https://github.com/zyk6660909/LUT-CHINA-2026-Modeling</a>. The repository includes the Veto ruleset, the 42-indicator scoring system, the track-adaptive weight matrix and the four-role evaluation prompts, released for reuse and extension by the iGEM community. The rules, weights and prompts are stored as structured JSON / <code>SKILL.md</code> files, so another team can fork the repository, retune weights, translate prompts, or add local rules without touching the core engine. The project is released under the <strong>MIT License</strong>. Planned directions include wiring it to the iGEM Registry for Part-level checks, auto-parsing PPT/PDF submissions, and a “What-If” remediation simulator that previews the score after hypothetical fixes.\n</p>\n<h3>9.5 Why It Matters</h3>\n<p>\nThe tool nudges preparation from experience-based toward data-driven, lowers the information asymmetry between well-mentored and resource-limited teams, and keeps every score anchored to evidence and aligned to the official judging criteria. A first-year team without a mentor can now get a free, structured baseline; a veteran team can stress-test its weak spots before the judges do.\n</p>"
      },
      {
        "id": "reproducibility",
        "heading": "10. Reproducibility & Data Availability",
        "paragraphs": [],
        "contentHtml": "<h3>10.1 Computational methods</h3>\n<p>All numerical work used standard scientific-computing tools. The ternary mixed-CMC inversion was solved by global optimization combining the nonlinear simplex method and a quasi-Newton algorithm, as described in the paper. The Fick diffusion equation was integrated with a finite-difference scheme; its grid resolution, time step and convergence criteria are not fully documented in the paper and will be provided in the supplementary dataset. AlphaFold 3 was used for structure prediction and AutoDock Vina for global docking; binding energies and transition-state parameters are as reported in Section 6.1, and the specific software versions will be recorded in the supplementary dataset.</p>\n<h3>10.2 Data availability</h3>\n<p>Experimental inputs come from the team's own measurements documented in Appendix A of the paper (<i>自组装数据-粒径+PDI+zeta电位.xlsx</i> and <i>自组装整理.docx</i>): DLS, Zeta potential and SEM data collected on a Malvern Zetasizer Nano ZS (633 nm, 90°) and a field-emission SEM. Raw DLS/Zeta/SEM data are available upon request. The evaluator tool's source code and rule definitions are available at <a href=\"https://github.com/zyk6660909/LUT-CHINA-2026-Modeling\">https://github.com/zyk6660909/LUT-CHINA-2026-Modeling</a>.</p>\n<h3>10.3 Known limitations of reproducibility</h3>\n<ul class=\"wiki-article-bullets\">\n<li>The interaction parameters χ<sub>ij</sub> were obtained by numerical inverse fitting; the fitting error and the uniqueness of the fitted parameters have not been fully analyzed.</li>\n<li>The effective Péclet number (Pe<sub>eff</sub> ≈ 0.04), the encapsulation efficiency (90.9%), and the 56% faster closure are all numerical or model-derived quantities and have not yet been independently verified by dedicated wet-lab assays.</li>\n<li>The release kinetics and PK/PD parameters are based on literature estimates and in-vitro cytokine data, and have not been calibrated against animal experiments.</li>\n</ul>"
      },
      {
        "id": "references",
        "heading": "11. References",
        "paragraphs": [],
        "contentHtml": "<ol class=\"wiki-article-bullets\">\n<li>Abramson, J., et al. (2024). Accurate structure prediction of biomolecular interactions with AlphaFold 3. <i>Nature</i>, 630(8016), 493–500.</li>\n<li>Trott, O., &amp; Olson, A. J. (2010). AutoDock Vina: improving the speed and accuracy of docking. <i>J. Comput. Chem.</i>, 31(2), 455–461.</li>\n<li>Vogt, T., &amp; Jones, P. (2000). Glycosyltransferases in plant natural product synthesis: the PSPG-box. <i>Trends Plant Sci.</i>, 5(9), 380–386.</li>\n<li>Wang, X., et al. (2015). Metabolic engineering of <i>E. coli</i> for enhanced UDP-glucose and glycosylated compound production. <i>Metab. Eng.</i>, 28, 126–133.</li>\n<li>Keener, J., &amp; Sneyd, J. (2009). <i>Mathematical Physiology I: Cellular Physiology</i> (2nd ed.). Springer.</li>\n<li>Rubingh, D. N. (1979). Mixed micellar solutions. <i>Solution Chemistry of Surfactants</i>, 337–354.</li>\n<li>Holland, P. M., &amp; Rubingh, D. N. (1983). Nonideal multicomponent mixed micelle model. <i>J. Phys. Chem.</i>, 87(11), 1984–1990.</li>\n<li>Perrin, F. (1936). Mouvement brownien d'un ellipsoide (II). <i>J. Phys. Radium</i>, 7(1), 1–11.</li>\n<li>Whitesides, G. M., &amp; Grzybowski, B. (2002). Self-assembly at all scales. <i>Science</i>, 295(5564), 2418–2421.</li>\n<li>Wan, S., et al. (2017). Self-assembled supramolecular nanostructures of glycyrrhizic acid. <i>Soft Matter</i>, 13(21), 3950–3960.</li>\n<li>Grant, G. T., et al. (1973). Biological interactions between polysaccharides and divalent cations: the 'egg-box' model. <i>FEBS Lett.</i>, 32(1), 195–198.</li>\n<li>Peppas, N. A., et al. (2000). Hydrogels in pharmaceutical formulations and drug release kinetics. <i>Eur. J. Pharm. Biopharm.</i>, 50(1), 27–46.</li>\n<li>Crank, J. (1975). <i>The Mathematics of Diffusion</i> (2nd ed.). Oxford University Press.</li>\n<li>Washburn, E. W. (1921). The dynamics of capillary flow. <i>Phys. Rev.</i>, 17(3), 273–283.</li>\n<li>Boateng, J. S., et al. (2008). Wound healing dressings and drug delivery systems: a review. <i>J. Pharm. Sci.</i>, 97(8), 2892–2923.</li>\n<li>Sherratt, J. A., &amp; Murray, J. D. (1990). Mathematical models of epidermal wound healing and contraction. <i>Proc. R. Soc. Lond. B</i>, 241(1300), 29–36.</li>\n<li>Li, S., et al. (2018). Calycosin-7-O-β-D-glucoside promotes angiogenesis in diabetic wound healing via VEGF/Akt. <i>J. Ethnopharmacol.</i>, 213, 274–282.</li>\n<li>He, K., et al. (2020). Lobetyolin attenuates inflammation and accelerates wound repair by suppressing NF-κB. <i>Phytomedicine</i>, 68, 153184.</li>\n</ol>"
      }
    ]
  },
  {
    "slug": "software",
    "category": "dry-lab",
    "title": "Software",
    "subtitle": "iGEM Project Evaluator",
    "description": "An open-source self-assessment workflow with evidence-based scoring, track-adaptive weights, medal checklists and review feedback.",
    "icon": "code",
    "art": "dry-lab",
    "status": "Open-source tool",
    "sections": [
      {
        "id": "overview",
        "heading": "iGEM Project Evaluator",
        "paragraphs": [],
        "contentHtml": "<p>\nAlongside the models, we built a small open-source tool that turns the iGEM judging criteria into a self-assessment workflow: the <strong>iGEM Project Evaluator</strong>. It is a side contribution — the models above remain the core of this page — but we share it because it removed a recurring bottleneck in our own season.\n</p>\n"
      },
      {
        "id": "why-we-built-it",
        "heading": "Why We Built It",
        "paragraphs": [],
        "contentHtml": "\n<p>\nThree pains recurred in our season. (1) The Veto one-vote red lines — biosafety, ethics, legality and data integrity — are scattered across many pages and easy to trip by accident, and a hit at the Judging Form stage can invalidate months of work. (2) The six judging dimensions are easy to claim and hard to self-assess, so a team cannot tell where it actually stands. (3) There was no systematic, rubric-aligned self-check. The tool turns these implicit judging standards into an explicit rule engine and scoring system, so a resource-limited team gets the same structured, criteria-aligned diagnosis that a well-mentored team takes for granted.\n</p>\n"
      },
      {
        "id": "what-it-does",
        "heading": "What It Does",
        "paragraphs": [],
        "contentHtml": "\n<p>\nFive modules run in sequence. A 15-rule Veto pre-check (hard/soft) acts as a circuit breaker, attaching a repair suggestion to every triggered rule. A three-level quantitative scoring then rates 6 dimensions / 16 sub-dimensions / 42 indicators on a 0–100 scale, forcing a zero whenever a claim lacks a documented basis. Track-adaptive weight matrices rescale these scores per competition track, an official medal checklist returns the Bronze/Silver/Gold gaps, and a four-role AI review (safety, technical, human-practices, and a chief arbiter) is backed by confidence correction, evidence anchoring, and a post-remediation score lift.\n</p>\n"
      },
      {
        "id": "how-to-use-it",
        "heading": "How to Use It",
        "paragraphs": [],
        "contentHtml": "\n<p>\nIt is live at <a href=\"https://igem-lut.cn\">https://igem-lut.cn</a>. The workflow is three steps: choose your track → fill in project parameters → receive a report containing a total score with a feasibility grade, a six-dimension radar, Veto warnings, medal gaps, targeted optimization suggestions, and a special-prize match. It serves a pre-project self-check, a mid-season course correction, and a pre-Jamboree sprint for the highest-leverage fix.\n</p>\n"
      },
      {
        "id": "open-source-extensibility",
        "heading": "Open Source & Extensibility",
        "paragraphs": [],
        "contentHtml": "\n<p>\nSource code and structured rule definitions are publicly available at <a href=\"https://github.com/zyk6660909/LUT-CHINA-2026-Modeling\">https://github.com/zyk6660909/LUT-CHINA-2026-Modeling</a>. The repository includes the Veto ruleset, the 42-indicator scoring system, the track-adaptive weight matrix and the four-role evaluation prompts, released for reuse and extension by the iGEM community. The rules, weights and prompts are stored as structured JSON / <code>SKILL.md</code> files, so another team can fork the repository, retune weights, translate prompts, or add local rules without touching the core engine. The project is released under the <strong>MIT License</strong>. Planned directions include wiring it to the iGEM Registry for Part-level checks, auto-parsing PPT/PDF submissions, and a “What-If” remediation simulator that previews the score after hypothetical fixes.\n</p>\n"
      },
      {
        "id": "why-it-matters",
        "heading": "Why It Matters",
        "paragraphs": [],
        "contentHtml": "\n<p>\nThe tool nudges preparation from experience-based toward data-driven, lowers the information asymmetry between well-mentored and resource-limited teams, and keeps every score anchored to evidence and aligned to the official judging criteria. A first-year team without a mentor can now get a free, structured baseline; a veteran team can stress-test its weak spots before the judges do.\n</p>"
      }
    ]
  },
  {
    "slug": "integrated",
    "category": "human-practices",
    "title": "Integrated Human Practices",
    "subtitle": "Bringing real needs into project design",
    "description": "Plan research, feedback records, and design iterations through the perspectives of patients, clinicians, and the supply chain, integrating human practices throughout the development of a functional dressing.",
    "icon": "diversity_3",
    "art": "human-practices",
    "status": "Work plan",
    "sections": [
      {
        "id": "hp-purpose",
        "heading": "From a technical concept to practical questions",
        "paragraphs": [
          "The project document positions human practices as work that continues throughout the project. Whether a functional dressing can address real needs depends on more than the anticipated effects of its molecules: patient experience, clinical use, material production, affordability, and waste disposal also matter. The team plans to understand these conditions through discussions with different groups, then identify which aspects of the research plan to retain, revise, or investigate further.",
          "The purpose of this research is to hear different views and identify gaps in our knowledge. Challenges to the design, experimental limitations, and obstacles to practical use should all be part of the discussion, rather than collecting only opinions that support the existing concept."
        ]
      },
      {
        "id": "hp-stakeholders",
        "heading": "Mapping the stakeholders",
        "paragraphs": [
          "The document proposes engaging with the full ecosystem, from raw materials to final use and disposal. The following areas of concern will help organize interview guides; specific views still need to be confirmed through actual conversations."
        ],
        "table": {
          "headers": [
            "Groups to approach",
            "Main concerns identified in the document"
          ],
          "rows": [
            [
              "Patients and family members",
              "Healing needs, low potential for sensitization and irritation, comfort, affordability, and infection risks."
            ],
            [
              "Doctors, nursing staff, and healthcare institutions",
              "Product safety, wound repair outcomes, working procedures, value for money, reliable supply, and infection control in healthcare settings."
            ],
            [
              "Raw material suppliers and manufacturers",
              "Material performance, compatibility between formulations and production, costs, quality control, product registration, and supply channels."
            ],
            [
              "Distributors and procurement personnel",
              "Reliable supply, inventory turnover, distribution and procurement procedures, and operating conditions."
            ],
            [
              "Regulators, public administrators, and payers",
              "Safety requirements, pathways to product use, appropriate use, cost control, and access to payment coverage."
            ],
            [
              "Associations, the public, media, and waste management organizations",
              "Transparent information, public understanding, risks from poor-quality products, and safe disposal of used dressings."
            ]
          ]
        }
      },
      {
        "id": "hp-participation",
        "heading": "Respecting participants' informed choices",
        "paragraphs": [
          "The document explicitly calls for informed consent and interview records. Before each discussion, the team plans to explain the project's purpose, the topics to be discussed, and how the conversation will be recorded and presented, so that participants understand how their information may inform the research. Decisions about publishing photographs, videos, and identifiable personal information should follow the relevant consent.",
          "Conversations will focus on needs, experiences, and suggestions. Participation by patients or family members will not be described as product testing, and interview opinions will not be treated as evidence of efficacy. When discussing personal experiences, the team plans to present de-identified summaries."
        ]
      },
      {
        "id": "hp-feedback",
        "heading": "Turning feedback into design questions",
        "paragraphs": [
          "The team plans to record each piece of feedback as a sequence of question, suggestion, design decision, and follow-up validation. For example, concerns about comfort and irritation can become questions about material contact and compatibility; suggestions about nursing procedures can help assess the proposed use of the four-layer structure; and views on production and costs can inform discussions of manufacturing complexity and accessibility.",
          "When a suggestion is adopted, the record should explain what changed and the reasons for the change. When a suggestion has not yet been adopted, it should also document the reasons and any missing evidence. Follow-up conversations will help review whether the changes actually address the original issue."
        ]
      },
      {
        "id": "hp-evidence",
        "heading": "Building traceable human practices records",
        "paragraphs": [
          "The team plans to retain research guides, records made with consent, summaries of opinions, discussion conclusions, and version changes, progressively connecting human practices with wet lab work, material design, and implementation planning. The Wiki will update the people and groups consulted, the questions discussed, and the resulting design changes as work progresses."
        ],
        "note": "This page presents the human practices plan described in the document. The current materials do not provide completed interviews, participant quotations, or implemented feedback cases that can be published."
      }
    ]
  },
  {
    "slug": "education",
    "category": "human-practices",
    "title": "Education",
    "subtitle": "Learning together and communicating science clearly",
    "description": "Plan interdisciplinary learning and public communication around synthetic biology, functional dressings, and research responsibility, making complex research understandable, open to discussion, and open to challenge.",
    "icon": "school",
    "art": "human-practices",
    "status": "Work plan",
    "sections": [
      {
        "id": "education-learning",
        "heading": "Starting with shared learning within the team",
        "paragraphs": [
          "The project connects biosynthesis, material structures, wound care, and computational analysis. The document states that the team needs both members from different disciplines and a willingness to learn the fundamentals of other fields. Through online discussions and guidance from supervisors, the team plans to build a shared language for questions about clinical needs, biological experiments, production, and product use.",
          "Interdisciplinary learning will focus on clarifying unfamiliar questions: what experimental parameters mean, what constraints arise from the intended setting, and which questions computational models can answer. The team plans to record learning topics, participation, discussions, and subsequent improvements, creating material that can be revisited."
        ]
      },
      {
        "id": "education-audiences",
        "heading": "Organizing content for different audiences",
        "paragraphs": [
          "The document emphasizes communicating the project and synthetic biology to the public. The team plans to adjust the level of explanation to each audience's background, keeping the same research question while changing the examples, amount of terminology, and presentation format."
        ],
        "table": {
          "headers": [
            "Audience",
            "Planned focus"
          ],
          "rows": [
            [
              "The general public",
              "The problem the project addresses, the basic approach of synthetic biology, and connections between dressing research and everyday health topics."
            ],
            [
              "Patients, family members, and people involved in care",
              "The distinction between research concepts and validated conclusions, and why user experience and practical needs influence design."
            ],
            [
              "Students from different disciplines and team members",
              "The connections between design, build, test, and review, and the division of work across biology, materials, and computation."
            ],
            [
              "Research and industry contacts",
              "The technical approach, hypotheses awaiting validation, conditions for practical use, and evidence requiring further discussion."
            ]
          ]
        }
      },
      {
        "id": "education-story",
        "heading": "Explaining the project's scientific story",
        "paragraphs": [
          "The proposed explanation follows the sequence of problem, design, validation, and limitations: first introduce the need for research on wounds associated with diabetic foot ulcers; then explain the design approach from a single active molecule to dual glycosides and a coordinated four-layer structure; and finally describe the respective roles of biosynthesis, material parameters, and validation at the cellular level.",
          "Communication materials will distinguish the research group's existing foundations from the team's planned work and hypotheses that remain to be tested. Explanations of lobetyolin, calycosin-7-glucoside, and functional dressings should retain their research context. Anticipated functions will not be presented as proven therapeutic effects, and public education materials will not serve as individual diagnostic or treatment advice."
        ]
      },
      {
        "id": "education-formats",
        "heading": "Planning different ways to engage",
        "paragraphs": [
          "The document proposes formats including a project promotional video, the Wiki, online meetings, stage presentations, and booth discussions. The team plans to treat these as a continuous communication process: short content introduces the problem, pages provide routes to further reading, and discussions make room for questions and different opinions."
        ],
        "bullets": [
          "Use concise diagrams to explain molecules, material layers, and engineering cycles, reducing reliance on technical terminology alone.",
          "Develop project introductions for the general public while retaining fuller written explanations for readers who want to learn more.",
          "Check clarity during interdisciplinary discussions and presentation preparation, and record the points audiences find difficult to understand."
        ]
      },
      {
        "id": "education-responsibility",
        "heading": "Improving through responsible communication",
        "paragraphs": [
          "The document identifies biosafety, research responsibility, and respect for other people and the environment as basic requirements. Communication materials are intended to explain the research boundaries and safety considerations alongside the project, with appropriate handling of records that may contain personal information or sensitive details.",
          "The team plans to revise materials in response to questions raised during discussions and retain records of activities, feedback, and version changes. Evaluation will focus on whether audiences understand the problem and evidence more clearly, rather than only on presentation formats or the volume of communication."
        ],
        "note": "This page is an education and communication work plan. The document does not provide records of completed outreach activities, participant numbers, communication outcomes, or learning achievements. These records will be based on work that actually takes place."
      }
    ]
  },
  {
    "slug": "collaborations",
    "category": "human-practices",
    "title": "Collaborations",
    "subtitle": "Exchanging ideas around shared questions",
    "description": "Plan discussions with other iGEM teams and interdisciplinary partners about design, experiments, and human practices, developing collaboration through clear questions, reusable records, and explicit attribution.",
    "icon": "handshake",
    "art": "human-practices",
    "status": "Work plan",
    "sections": [
      {
        "id": "collaboration-purpose",
        "heading": "Making collaboration serve problem-solving",
        "paragraphs": [
          "The project document proposes exchanges and collaboration with teams across countries, emphasizing that both competition and cooperation can encourage learning and progress. The team plans to begin conversations with practical research questions, actively listen to alternative approaches, lessons from failures, and suggestions for improvement, and use the gaps it identifies as opportunities to improve its work.",
          "Functional dressings involve biological engineering, materials, computation, and conditions for practical use. Collaboration can help participants define questions together, understand limitations, and discuss feasible validation methods. Whether these discussions lead to joint work should depend on both parties' interests, capabilities, and practical circumstances."
        ]
      },
      {
        "id": "collaboration-candidates",
        "heading": "Potential contacts listed in the document",
        "paragraphs": [
          "The document lists the following project or team names as potential contacts. The plan is to learn about each other's research questions and explore possibilities for collaboration through discussion. TyroFix appears more than once in the original document and is listed once here."
        ],
        "bullets": [
          "Omni-Patch (identified in the document as the University of Hong Kong)",
          "Dual-Armor",
          "TyroFix",
          "FROST",
          "C.L.E.A.R",
          "SutureShield",
          "Kele Patch"
        ],
        "note": "These are all potential contacts named in the document. Their inclusion does not mean contact has been established, a reply has been received, or a collaboration exists. Their identities, interest in discussion, and possible scope of collaboration still need to be confirmed through subsequent communication."
      },
      {
        "id": "collaboration-questions",
        "heading": "First identify questions worth discussing together",
        "paragraphs": [
          "Before making contact, the team plans to prepare a concise project introduction, the available supporting evidence, and the questions it hopes to address. It will explain the advice it seeks while also learning whether the other party has needs that could create opportunities for mutual support. Both parties should agree on the discussion topics, without assuming that another team already has a particular technology or has agreed to provide resources."
        ],
        "table": {
          "headers": [
            "Proposed discussion area",
            "Questions to prepare"
          ],
          "rows": [
            [
              "Engineering design",
              "How can design assumptions be broken down, and test results translated into the next round of revisions?"
            ],
            [
              "Experiments and materials",
              "Which parameters should be validated first, and how should results and methods be recorded so they are understandable and reusable?"
            ],
            [
              "Computation and modeling",
              "How can models help compare design options, and which inputs and assumptions need experimental support?"
            ],
            [
              "Human practices and communication",
              "How can stakeholder views be connected to design decisions, and project limitations communicated clearly?"
            ]
          ]
        }
      },
      {
        "id": "collaboration-process",
        "heading": "Recording discussions and follow-up actions",
        "paragraphs": [
          "The document proposes online meetings for discussions from multiple perspectives. Once both parties agree, the team plans to organize conversations and record the topics, questions raised, differing views, and possible follow-up tasks. Each task should have clearly identified participants and scope, with progress reviewed at the next discussion.",
          "Content that can be shared may include design explanations, methodological discussions, and lessons learned. Before publishing proposed meeting records, photographs, videos, or materials, participants' wishes and the scope of permitted use should be confirmed. Records involving personal information or sensitive content should be handled appropriately before deciding whether to publish them."
        ]
      },
      {
        "id": "collaboration-attribution",
        "heading": "Presenting the actual contributions of collaboration clearly",
        "paragraphs": [
          "The collaboration page is intended to record work that actually takes place and its effects on the project: the questions raised through exchanges, the advice received, whether the plan was revised as a result, and the questions that remain unresolved. If the work later produces shareable methods or materials, their content, conditions of use, and each party's contribution will be explained.",
          "The project document requires work completed independently by students to be distinguished from external support. The team will carry this principle into its collaboration records: discussions, advice, materials, and experimental support should each be described separately. Potential contacts will not be presented as existing partners, and other parties' results will not be attributed to this team's independent work."
        ]
      }
    ]
  },
  {
    "slug": "members",
    "category": "team",
    "title": "Members",
    "subtitle": "Meet the people behind LUT-CHINA",
    "description": "Students across biology and medicine, bioengineering, mathematics, computer science, design and marketing at Lanzhou University of Technology.",
    "icon": "groups",
    "art": "team",
    "status": "Our team",
    "sections": [
      {
        "id": "our-team",
        "heading": "Meet LUT-CHINA",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/our-team-image1.webp\" alt=\"Meet LUT-CHINA — group photograph\" loading=\"lazy\" decoding=\"async\" width=\"1267\" height=\"845\"></figure><figure><img src=\"assets/wiki/team/our-team-image2.webp\" alt=\"Meet LUT-CHINA — group photograph\" loading=\"lazy\" decoding=\"async\" width=\"1260\" height=\"840\"></figure></div><p>We are Team LUT-CHINA, representing the School of Life Science and Engineering at Lanzhou University of Technology. Our team brings together students across multiple grades and disciplines, including biology and medicine, bioengineering, mathematics, computer science, design, and marketing.</p><p>The hallmark of our team is the fusion of rigorous scientific research and real-world industrial perspective. Our Principal Investigator has deep, long-standing expertise in natural product biosynthesis, while our student team leader brings over ten years of entrepreneurial and operational experience in the medical device sector. Together, we cover the complete capability chain from strain engineering, multi-scale modeling, and in vitro cellular validation through to commercial translation. We reject token &quot;competition-only&quot; paper projects, and stay firmly committed to clinical-need-driven product development.</p>"
      },
      {
        "id": "fang-wang",
        "heading": "Fang Wang · Principal Investigator",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/fang-wang-image3.webp\" alt=\"Fang Wang · Principal Investigator — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"1267\" height=\"856\"></figure><figure><img src=\"assets/wiki/team/fang-wang-image4.webp\" alt=\"Fang Wang · Principal Investigator — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"1067\" height=\"1600\"></figure></div><p>Fang Wang, Ph.D., is an Associate Professor and Master’s Supervisor at the School of Life Science and Engineering, Lanzhou University of Technology. Her research addresses the strategic priorities of the Healthy China Initiative and the high-value utilization of distinctive biological resources in western China. She focuses on the precise characterization, biosynthetic production, and biological mechanisms of bioactive compounds derived from medicinal and food resources. Her work encompasses the functional evaluation of bioactive components such as Codonopsis pilosula polysaccharides and lobetyolin, the discovery of key biosynthetic enzymes, heterologous expression, and microbial cell-factory engineering. Through this research, she seeks to advance natural-product development from resource discovery and mechanistic investigation toward standardized biomanufacturing and the creation of innovative functional products.</p><p>Dr. Wang has served as principal investigator for two projects funded by the Natural Science Foundation of Gansu Province, one industry-university collaborative project supported by the Ministry of Education, one Doctoral Research Start-up Fund project at Lanzhou University of Technology, and several industry-sponsored research projects. She has also contributed to multiple projects supported by the National Natural Science Foundation of China and key research and development programs. As first or corresponding author, she has published research articles in internationally recognized journals, including International Journal of Biological Macromolecules, Bioorganic Chemistry, Life Sciences, Current Pharmaceutical Biotechnology, Nuclear Science and Techniques, Journal of Cellular Physiology, and Oncology Reports. She has filed two national invention patent applications and holds one granted utility model patent. Her research contributions have received several provincial honors, including the First Prize of the Gansu Pharmaceutical Development Award, the Second Prize of the Gansu Medical Science and Technology Award, and the Third Prize of the Gansu Science and Technology Progress Award.</p><p>As the team’s Principal Investigator, Dr. Wang provides overall scientific leadership, research training, and guidance on technology translation. She leads the team in exploring how synthetic biology can enable the precise and sustainable manufacturing of bioactive compounds from traditional Chinese medicinal resources and support innovation in biomedical materials, creating new pathways for their modernization, standardization, and sustainable utilization.</p>"
      },
      {
        "id": "yonggang-wang",
        "heading": "Yonggang Wang · Secondary PI",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/yonggang-wang-image5.webp\" alt=\"Yonggang Wang · Secondary PI — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"1267\" height=\"845\"></figure></div><p>Yonggang Wang is Professor and PhD Supervisor, currently Vice Dean of the School of Life Science and Engineering at Lanzhou University of Technology. He obtained his B.Eng., M.Sc. and Doctor of Engineering degrees from Lanzhou University of Technology. He was awarded the title of Gansu Longyuan Young Talents (2nd batch) in 2023.</p><p>His main research fields cover extraction and functional evaluation of natural active ingredients, biomedical materials, biomanufacturing, and pharmaceutical engineering. He holds academic social positions including committee member of the Youth Committee of Gansu Immunological Society and director of the Forage Chinese Herbal Medicine Industry Innovation Alliance.</p><p>Professor Wang has rich experience in biotechnological research, laboratory safety management and industry-university-research cooperation. As the Secondary PI of our 2026 iGEM team, he supervises our whole project of herbal active compound loaded dressing for diabetic foot ulcers, offering professional guidance on wet-lab experiments, biomaterial construction, safety regulation and outreach activities.</p>"
      },
      {
        "id": "zhenyu-li",
        "heading": "Zhenyu Li · Community Mentor",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/zhenyu-li-image6.webp\" alt=\"Zhenyu Li · Community Mentor — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"1267\" height=\"950\"></figure></div><p>Name: Zhenyu Li</p><p>Role: COMMUNITY MENTOR</p><p>Identity: a iGEMer since 2022 Focus on bioinformatics, enjoy jpop and vibe coding&quot;To love is eternal innocence, and the only innocence is not to think…&quot;</p>"
      },
      {
        "id": "xiangxiang-huang",
        "heading": "Xiangxiang Huang · 黄响响",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/xiangxiang-huang-official.webp\" alt=\"Xiangxiang Huang · 黄响响 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1067\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/xiangxiang-huang-image7.webp\" alt=\"Xiangxiang Huang · 黄响响 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"550\" height=\"550\"></figure></div><p>Name: Xiangxiang Huang</p><p>Role: Student Leader</p><p>Identity: First-year postgraduate student, serial entrepreneur</p><p>Responsibility: Wet lab experiments</p><p>Hobbies: Hiking, trail running, marathon, adventure exploration, swimming, horse riding and fitness</p>"
      },
      {
        "id": "yicheng-yu",
        "heading": "Yu Yicheng · 虞意诚",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/yicheng-yu-official.webp\" alt=\"Yu Yicheng · 虞意诚 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1067\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/yicheng-yu-image8.webp\" alt=\"Yu Yicheng · 虞意诚 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"648\" height=\"972\"></figure></div><p>My name is Yu Yicheng, a master student majoring in Biomedicine.</p><p>My academic training focuses on molecular biology, biomedical experiments and research methodology, which equips me with professional biomedical knowledge, data analysis and logical thinking accumulated from graduate research. I have always been intrigued by synthetic biology, for it enables us to redesign biological systems to tackle practical biomedical challenges, perfectly aligning with my research interest.</p><p>Within our iGEM team, I am primarily responsible for the Human Practices section. I organize social investigations, communicate with professionals, stakeholders and the public, sort out feedback, connect our synthetic biology project with real social demands, and conduct science popularization and educational outreach activities. I maintain rigorous logical thinking to evaluate the social impact, ethical concerns and application prospects of our project, helping our team make the project more grounded, ethical and socially valuable.</p><p>Meanwhile, I value teamwork highly. I communicate actively with wet-lab, modeling and design teammates, feed back public opinions and expert suggestions in a timely manner, and adjust project directions jointly.</p><p>I join iGEM not only to apply my biomedical expertise into synthetic biology innovation, but also to exchange ideas with global peers. I am ready to devote myself to Human Practices work, cooperate closely with the whole team, and explore creative yet responsible solutions together.</p>"
      },
      {
        "id": "li-wang",
        "heading": "Li Wang · 王丽",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/li-wang-image9.webp\" alt=\"Li Wang · 王丽 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"438\" height=\"579\"></figure></div><p>Name: Li Wang</p><p>Role: Research Member</p><p>Identity: Third‑year postgraduate student</p><p>Responsibility: Cell‑based experiments</p><p>Hobbies: Photography, painting and reading</p>"
      },
      {
        "id": "yanan-xian",
        "heading": "Xian Yanan · 先雅楠",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/yanan-xian-official.webp\" alt=\"Xian Yanan · 先雅楠 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1053\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/yanan-xian-image10.webp\" alt=\"Xian Yanan · 先雅楠 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"514\" height=\"755\"></figure></div><p>My life is like the geometry in Kandinsky’s paintings: interlacing lines and colliding blocks of color, seemingly arranged by chance, yet carrying its own rhythm and order. It does not follow convention, but it is never arbitrary; it is full of uncertainty, yet never dull.</p>"
      },
      {
        "id": "changlin-chen",
        "heading": "Chen Changlin · 陈昶霖",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/changlin-chen-official.webp\" alt=\"Chen Changlin · 陈昶霖 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1209\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/changlin-chen-image11.webp\" alt=\"Chen Changlin · 陈昶霖 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"503\" height=\"737\"></figure></div><p>Hello everyone, I&#x27;m Chen Changlin, from Lanzhou, Gansu Province, and I am a graduate student at the School of Life Science and Engineering, Lanzhou University of Technology. I am rigorous, proactive and diligent in academic studies, detail-oriented and responsible in team collaboration and always value the efficiency of teamwork; in my spare time, I enjoy playing volleyball and badminton, and I also have a solid foundation in guzheng (Chinese zither) with a Level 10 performance certificate. It is a great pleasure to meet all of you, and I look forward to more communication and exchanges with everyone going forward.</p>"
      },
      {
        "id": "yukun-zhang",
        "heading": "Zhang Yukun · 张煜坤",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/yukun-zhang-official.webp\" alt=\"Zhang Yukun · 张煜坤 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1066\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/yukun-zhang-image12.webp\" alt=\"Zhang Yukun · 张煜坤 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"551\" height=\"734\"></figure></div><p>Zhang Yukun, an undergraduate majoring in Information and Computational Science at Lanzhou University of Technology, is the leader of the Modeling Team for this year’s iGEM competition.</p><p>I am proficient in ordinary differential equations, enzymatic reaction kinetic modeling, numerical simulation with MATLAB and Python, as well as data fitting and visualization. I have won a provincial award in the National College Students Mathematical Modeling Contest and accumulated experience in modeling biological dynamic systems.</p><p>I am responsible for the whole modeling process: obtaining experimental data from the wet lab group, building mathematical models of gene regulatory networks, writing simulation codes, and carrying out model verification and error analysis. I assign tasks to the three members in the modeling team, organize weekly progress meetings, and coordinate communication between the dry lab and wet lab groups.</p><p>I am keen on the interdisciplinary subject of mathematics and biology. I am good at quantifying and solving complex biological processes, and I am willing to complete synthetic biology projects through team cooperation</p>"
      },
      {
        "id": "yanhong-jiang",
        "heading": "Jiang Yanhong · 蒋燕红",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/yanhong-jiang-official.webp\" alt=\"Jiang Yanhong · 蒋燕红 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1066\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/yanhong-jiang-image13.webp\" alt=\"Jiang Yanhong · 蒋燕红 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"563\" height=\"846\"></figure></div><p>I&#x27;m Jiang Yanhong, a 21-year-old from Lanzhou, Gansu. I&#x27;m quiet by nature but always positive, and I value genuine friendships. I love traveling and exploring new places. Currently, I&#x27;m part of the mathematical modeling team in our iGEM project, where I apply my analytical skills to make our models shine—just like planning a trip, every detail matters. I hope to learn from my teammates and tackle challenges together, making modeling a highlight of our project.</p>"
      },
      {
        "id": "chunxia-ma",
        "heading": "Ma Chunxia · 马舂霞",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/chunxia-ma-official.webp\" alt=\"Ma Chunxia · 马舂霞 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1067\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/chunxia-ma-image14.webp\" alt=\"Ma Chunxia · 马舂霞 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"580\" height=\"786\"></figure></div><p>Let me introduce myself: I am an art student born under the Sagittarius sign, passionate yet laid-back. Though I may seem slow to warm up to others, I treat everyone with sincere devotion. I am utterly captivated by nature and have zero tolerance for hypocrisy and pretentious social games.</p><p>Design is my professional vocation, while in my spare time, I dabble in whimsical experimental design pieces for fun. Still a novice designer on my journey of skill-building, I aspire to evolve into an all-round versatile talent and strive to become an authoritative expert in this industry.</p><p>I identify as an idealistic realist: cheerful, peace-loving, trustworthy, and communicative. I am an easygoing young girl who embodies a laid-back mindset through and through.</p><p>Thank you all for taking the time to read my self-introduction.</p>"
      },
      {
        "id": "yaqi-wang",
        "heading": "Wang Yaqi · 王亚琦",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/yaqi-wang-official.webp\" alt=\"Wang Yaqi · 王亚琦 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"960\" height=\"1440\"></figure><figure><img src=\"assets/wiki/team/yaqi-wang-image15.webp\" alt=\"Wang Yaqi · 王亚琦 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"595\" height=\"758\"></figure></div><p>As a post-00s generation, I am seventy percent optimistic and thirty percent romantic with a touch of artistic temperament and diverse hobbies. I love sunshine, bright colours, books and tea. Easygoing and free-spirited, I hold ideals and passion deep inside. I cherish ordinary life, stay grateful and keep chasing what I love.</p>"
      },
      {
        "id": "ruiqing-wu",
        "heading": "RuiQing Wu · 武瑞青",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/ruiqing-wu-official.webp\" alt=\"RuiQing Wu · 武瑞青 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1074\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/ruiqing-wu-image16.webp\" alt=\"RuiQing Wu · 武瑞青 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"495\" height=\"743\"></figure></div><p>Hello, I’m RuiQing Wu, a pharmacy postgraduate. My research focuses on plant gene analysis and biosynthesis. I’m excited to join this iGEM team and bring my practical skills to advance our project together</p>"
      },
      {
        "id": "dechen-zhuo",
        "heading": "Zhuo Dechen · 卓德晨",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/dechen-zhuo-official.webp\" alt=\"Zhuo Dechen · 卓德晨 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1067\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/dechen-zhuo-image17.webp\" alt=\"Zhuo Dechen · 卓德晨 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"574\" height=\"861\"></figure></div><p><em>Hello everyone. My name is Zhuo Dechen, 24 years old, and I am currently a student majoring in design. In my spare time, I play chess and sing with my friends. I am also very fond of sports including football and basketball. These activities keep me healthy and bring me joy. My motto is &quot;Anything is possible.&quot;</em></p>"
      },
      {
        "id": "wenchao-guo",
        "heading": "Guo Wenchao · 郭文超",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/wenchao-guo-official.webp\" alt=\"Guo Wenchao · 郭文超 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1067\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/wenchao-guo-image18.webp\" alt=\"Guo Wenchao · 郭文超 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"693\" height=\"519\"></figure></div><p>I’m a member of the Wiki team, responsible for website construction, layout design and visual presentation of our synthetic biology project.</p>"
      },
      {
        "id": "zirui-li",
        "heading": "Zirui Li · 李孜锐",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/zirui-li-official.webp\" alt=\"Zirui Li · 李孜锐 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1067\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/zirui-li-image19.webp\" alt=\"Zirui Li · 李孜锐 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"436\" height=\"775\"></figure></div><p>My name is Zirui Li, and I am a second-year undergraduate student majoring in Computer Science at Lanzhou University of Technology. As a member of the Wiki team, I am responsible for helping present our project in a clear, structured, and accessible way, ensuring that our ideas, design, and progress can be effectively communicated to a broader audience.</p><p>I have a strong interest in synthetic biology and interdisciplinary innovation. With my background in programming, machine learning, and social research, I hope to bring computational thinking and problem-oriented analysis into our project. I believe that iGEM provides a valuable platform for students from different disciplines to work together, transform ideas into practical solutions, and improve through continuous testing and refinement.</p><p>I am a dedicated and responsible person who is willing to take on challenges and explore unfamiliar fields. Through this competition, I look forward to contributing to our team with both technical skills and a collaborative mindset, while further developing my abilities as a student and future engineer.</p>"
      },
      {
        "id": "puhe-you",
        "heading": "Puhe You · 尤谱贺",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/puhe-you-image20.webp\" alt=\"Puhe You · 尤谱贺 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"344\" height=\"482\"></figure></div><p>I&#x27;m Puhe You. I am skilled at locating complex problems across multiple layers, with a particular focus on the mechanisms behind issues rather than only solving surface-level symptoms. My strengths include fast learning, strong hands-on ability, in-depth troubleshooting, and the ability to break complex tasks into steps and drive them forward steadily. In practical work, I focus on long-term maintainability, data security, capacity planning, and disaster recovery, and I can maintain clear judgment under pressure. My technical style is deep, pragmatic, and results-oriented.</p>"
      },
      {
        "id": "zhikun-wang",
        "heading": "Zhikun Wang · 王志坤",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/zhikun-wang-official.webp\" alt=\"Zhikun Wang · 王志坤 — team portrait\" loading=\"lazy\" decoding=\"async\" width=\"1067\" height=\"1600\"></figure><figure><img src=\"assets/wiki/team/zhikun-wang-image21.webp\" alt=\"Zhikun Wang · 王志坤 — profile photograph\" loading=\"lazy\" decoding=\"async\" width=\"716\" height=\"537\"></figure></div><p>I am ZhikunWang a junior majoring in Mathematics at Lanzhou University of Technology. In this year’s iGEM project, I focus on mathematical modeling for smart wound dressings targeting diabetic foot ulcers. By translating biological mechanisms into quantitative models, I aim to optimize material design and treatment strategies, bridging theory with real clinical impact.</p>"
      },
      {
        "id": "team-gallery",
        "heading": "Team photographs",
        "paragraphs": [],
        "contentHtml": "<div class=\"wiki-resource-gallery\"><figure><img src=\"assets/wiki/team/group-1.webp\" alt=\"LUT-CHINA team group photograph 1\" loading=\"lazy\" decoding=\"async\" width=\"1600\" height=\"1067\"></figure><figure><img src=\"assets/wiki/team/group-2.webp\" alt=\"LUT-CHINA team group photograph 2\" loading=\"lazy\" decoding=\"async\" width=\"1600\" height=\"1067\"></figure><figure><img src=\"assets/wiki/team/group-3.webp\" alt=\"LUT-CHINA team group photograph 3\" loading=\"lazy\" decoding=\"async\" width=\"1600\" height=\"1067\"></figure><figure><img src=\"assets/wiki/team/group-4.webp\" alt=\"LUT-CHINA team group photograph 4\" loading=\"lazy\" decoding=\"async\" width=\"1600\" height=\"1067\"></figure><figure><img src=\"assets/wiki/team/group-5.webp\" alt=\"LUT-CHINA team group photograph 5\" loading=\"lazy\" decoding=\"async\" width=\"1600\" height=\"1067\"></figure><figure><img src=\"assets/wiki/team/group-6.webp\" alt=\"LUT-CHINA team group photograph 6\" loading=\"lazy\" decoding=\"async\" width=\"1600\" height=\"1067\"></figure></div>"
      }
    ]
  },
  {
    "slug": "attributions",
    "category": "team",
    "title": "Attributions",
    "subtitle": "Making every contribution traceable to the people behind it",
    "description": "Distinguishing the research group's existing foundations, planned student work, and external support through contribution records that can evolve with the project.",
    "icon": "volunteer_activism",
    "art": "team",
    "status": "Work plan",
    "sections": [
      {
        "id": "attribution-principles",
        "heading": "Describing the work each person contributes",
        "paragraphs": [
          "The document identifies attribution as an important project deliverable and requires a clear distinction between work completed independently by student members and help provided by others. Contribution statements should specify the questions addressed, tasks performed, and outputs produced, distinguishing advice, material provision, and independent experimental work.",
          "This page establishes attribution boundaries and a framework for keeping records. Individual credits should correspond to participation records and be checked by the contributors concerned."
        ]
      },
      {
        "id": "existing-foundation",
        "heading": "The research group's existing foundations",
        "paragraphs": [
          "The project summary explicitly proposes reusing a dual-plasmid system that the research group has already constructed and verified by sequencing: pET-32a-UGT carries a glycosyltransferase specific to acetylenic alcohols, while pACYC184-pgm-galU enhances the UDP-glucose donor supply. The group's previously identified UGT and existing vectors are part of the prior research foundation adopted by the project.",
          "Any subsequent team work on expression, biotransformation, comparisons of conditions, or application validation should be described separately as an additional contribution. The use of an existing system should remain clear alongside new experimental designs and the results actually obtained."
        ]
      },
      {
        "id": "contribution-framework",
        "heading": "Maintaining a contribution record by task",
        "paragraphs": [
          "A shared contribution record is planned to connect each task with its supporting files, keeping descriptions of the same work consistent across the Wiki, laboratory records, and attribution forms."
        ],
        "table": {
          "headers": [
            "Contribution category",
            "Work to describe",
            "Suggested supporting records"
          ],
          "rows": [
            [
              "Student research",
              "The parts of study design, experimental work, data organization, and review actually undertaken",
              "Experiment identifiers, raw data, and protocol versions"
            ],
            [
              "Modeling and software",
              "Specific responsibilities for model assumptions, implementation, parameter organization, and validation",
              "Code versions, parameter sources, and computation records"
            ],
            [
              "Mentoring and professional advice",
              "Scientific questions raised, recommended changes, and the scope of guidance",
              "Discussion notes and designs before and after revision"
            ],
            [
              "Materials and technical support",
              "The sources and uses of strains, vectors, equipment, or testing services",
              "Material sources, service descriptions, and usage records"
            ],
            [
              "Human practices and communication",
              "Actual responsibilities for engagement planning, interviews, material production, and editing",
              "Permission records, feedback notes, and content versions"
            ]
          ]
        }
      },
      {
        "id": "support-and-collaboration",
        "heading": "Describing external support accurately",
        "paragraphs": [
          "The document proposes engaging clinical professionals, patients, material suppliers, manufacturers, and other iGEM teams. These groups form a potential network for dialogue and support. Attribution should be confirmed individually against work that has actually taken place.",
          "Records of external help should explain what was provided, how the team used it, and whether it changed the design. Participation in an interview, an institutional name, or an intention to communicate does not by itself establish joint research, shared experimental work, or endorsement of the project's effectiveness."
        ]
      },
      {
        "id": "review-before-publication",
        "heading": "Checking attribution before publication",
        "paragraphs": [
          "Each contribution record is planned to include the work date, task, person responsible, supporting contributors, outputs, and evidence location. Periodic reviews should check the boundary between student work and prior research, followed by a further review of credits, material sources, and figure attribution before publication.",
          "The document places attribution submission at the October 21 planning milestone. Submission status should follow the actual records, and the page, forms, and research materials should remain consistent and traceable."
        ]
      }
    ]
  },
  {
    "slug": "notebook",
    "category": "team",
    "title": "Notebook",
    "subtitle": "Recording assumptions, changes, and next steps",
    "description": "Organizing research records around the engineering cycle and translating the document's competition milestones into preparation tasks that can be checked.",
    "icon": "menu_book",
    "art": "team",
    "status": "Work plan",
    "sections": [
      {
        "id": "recording-research",
        "heading": "Making the research process possible to review",
        "paragraphs": [
          "Project records are planned around design, build, test, and learn. Each entry should describe what was done, why the approach was chosen, which conditions changed, and the scope of the conclusions the results can support.",
          "The document also emphasizes recording experimental successes and failures together with ideas for the next round of optimization. Results that fall short of expectations, unusual controls, and observations that remain unexplained therefore require the same clarity of documentation as successful results."
        ]
      },
      {
        "id": "notebook-template",
        "heading": "A shared set of record fields",
        "paragraphs": [
          "Wet lab, modeling, and human practices records will use identifiers that can reference one another. Raw files, analyses, and materials for public presentation will have separate version labels so that the development of a conclusion can be traced."
        ],
        "table": {
          "headers": [
            "Field",
            "What to record"
          ],
          "rows": [
            [
              "Question and hypothesis",
              "The question being addressed and the expected observations"
            ],
            [
              "Design and conditions",
              "The experimental or discussion plan, controls, parameters, and material sources"
            ],
            [
              "Execution and deviations",
              "The actual date, people responsible, procedural differences, and unusual events"
            ],
            [
              "Results and evidence",
              "Raw data, images, model outputs, or feedback shared with permission"
            ],
            [
              "Interpretation and next steps",
              "Limits of the conclusions, items requiring review, and changes for the next cycle"
            ]
          ]
        }
      },
      {
        "id": "preparation-milestones",
        "heading": "Preparation milestones in the document",
        "paragraphs": [
          "The following dates come from the project document's timeline and are used to organize the work plan. The timeline does not specify a year. These dates do not indicate completed submissions and are not presented as an official schedule verified for this page."
        ],
        "table": {
          "headers": [
            "Document milestone",
            "Preparation task"
          ],
          "rows": [
            [
              "August 12",
              "A two-minute project promotion video for the public"
            ],
            [
              "September 2",
              "Animal experiment application materials, with applicability determined by the actual research scope"
            ],
            [
              "September 16",
              "Registration preparation for the live stage talk and exhibition booth"
            ],
            [
              "September 23",
              "Reporting materials for special biological materials"
            ],
            [
              "October 7",
              "Final safety submission materials and preparation for PI review"
            ]
          ]
        },
        "note": "The project's current competition validation plan focuses on in vitro cell experiments. Including an animal application milestone in the timeline does not mean the team plans to conduct, or has conducted, animal experiments."
      },
      {
        "id": "presentation-milestones",
        "heading": "Documentation, submission, and presentation milestones",
        "paragraphs": [
          "Public-facing materials are planned around a shared body of research evidence. The project title, abstract, conclusions in figures and tables, and links to relevant pages need to be cross-checked so that different materials describe the project's progress consistently."
        ],
        "table": {
          "headers": [
            "Document milestone",
            "Associated materials or activities"
          ],
          "rows": [
            [
              "October 21",
              "The Wiki, Judging Form, Attributions Form, and standard parts registry materials"
            ],
            [
              "October 28",
              "Preparation of the 15-minute project presentation video"
            ],
            [
              "November 13–15",
              "Arrangements for live talks, booth discussions, and judging questions"
            ]
          ]
        }
      },
      {
        "id": "connecting-feedback",
        "heading": "Using records to guide the next design cycle",
        "paragraphs": [
          "Periodic reviews are planned to consider experimental data, model interpretations, and stakeholder feedback together: which assumptions are supported, which conditions need to change, and where the information remains insufficient for a conclusion. Each change should lead to an actionable task for the next cycle.",
          "Human practices records should specifically preserve how feedback influenced the structure, use procedure, or cost targets. The public Notebook will distinguish research plans, completed work, and validated results so that readers can follow the project's development through the records."
        ]
      }
    ]
  },
  {
    "slug": "biosafety",
    "category": "safety",
    "title": "Biosafety",
    "subtitle": "Applying safety boundaries at every stage of research",
    "description": "Planning material inventories, risk assessments, and continually updated safety records for engineered bacterial production, purified active molecules, cell evaluations, and Human Practices.",
    "icon": "verified_user",
    "art": "safety",
    "status": "Research plan",
    "sections": [
      {
        "id": "research-boundaries",
        "heading": "Distinguish the production organism from the final material",
        "paragraphs": [
          "The project plans to use engineered E. coli to produce the target glycosides, then isolate and purify the active molecules before loading them into a hydrogel. The engineered bacteria belong to the controlled production stage. The proposed dressing contains purified components; its product concept does not involve applying live engineered bacteria to a wound.",
          "Efficacy evaluation during the competition is limited to in vitro cell experiments. First-generation research focuses on lobetyolin, while the second-generation system combining two glycosides requires a separate assessment. Animal studies, human studies, and use outside the laboratory are beyond the current experimental scope. Team members will not test the team's dressing on themselves."
        ],
        "note": "This page presents proposed safety measures. Training, facility conditions, and approval status must be supported by actual records; their completion cannot be inferred from a research plan."
      },
      {
        "id": "materials-inventory",
        "heading": "Identify risks through a material inventory",
        "paragraphs": [
          "Before experiments begin, the plan is to establish an inventory covering species, cell lines, strains, component sources, custodians, and storage locations. Supervisors and relevant safety personnel would review it against the actual materials and procedures. Specific strain identifiers, applicable protective conditions, and documentation of origin will be recorded after verification."
        ],
        "table": {
          "headers": [
            "Material or system",
            "Planned checks"
          ],
          "rows": [
            [
              "Engineered E. coli",
              "Strain identity, source, genetic modifications, and conditions for contained use"
            ],
            [
              "pET-32a-UGT and pACYC184-pgm-galU",
              "Sources, sequences, selection markers, and usage records for the research group's existing constructs"
            ],
            [
              "HaCaT, HUVEC, HSF, and RAW264.7",
              "Cell sources, identities, contamination monitoring, and corresponding handling requirements"
            ],
            [
              "Active molecules, hydrogel, and absorbent-layer materials",
              "Purity, impurities, material compatibility, and risks associated with release"
            ]
          ]
        },
        "bullets": [
          "Recheck newly introduced organisms, genetic components, and nucleic acid synthesis sources rather than carrying forward unverified questionnaire selections.",
          "List microorganisms needed for antimicrobial material testing separately, and define the experimental scope after assessment."
        ]
      },
      {
        "id": "laboratory-practice",
        "heading": "Connect training, access, and operational records",
        "paragraphs": [
          "The plan is to arrange safety and biosecurity training before personnel begin the relevant laboratory work. Training would cover material handling, personal protection, equipment use, incident reporting, and emergency assistance. Protective equipment such as laboratory coats, gloves, and goggles should be selected according to the actual risks, with training content and participants documented.",
          "Authorized access is proposed for laboratories and storage areas, together with management requirements for lone working and work outside normal hours. Chemical storage, exposure, and disposal risks would be checked against Safety Data Sheets (SDS). If an abnormal event occurs, the relevant work should stop first, followed by a report to the supervisor and the laboratory safety lead."
        ]
      },
      {
        "id": "containment-waste",
        "heading": "Track materials through to waste disposal",
        "paragraphs": [
          "Controlled production needs to cover cultures, experimental samples, contaminated consumables, and liquid waste throughout their handling. The plan is to separate, collect, label, inactivate, or route waste through designated disposal channels according to procedures confirmed by the host laboratory, while retaining processing records. Chemical liquid waste and biological waste require separate assessments.",
          "Purified products still require investigation of production-related residues, material compatibility, and storage stability. A goal of removing production cells does not replace testing of product quality and safety. If samples are to leave the laboratory, the applicable requirements and permitted scope of use should be checked first."
        ],
        "bullets": [
          "Record who is responsible for sample receipt, aliquoting, storage, transfer, and disposal.",
          "Define reporting procedures and emergency contacts for spills, exposure, and equipment faults in advance.",
          "Do not claim without evidence that engineered bacteria cannot spread or that a particular biocontainment mechanism has been deployed."
        ]
      },
      {
        "id": "people-and-data",
        "heading": "Protect the people we engage with and their information",
        "paragraphs": [
          "Human Practices activities are planned to explore care needs through interviews and conversations. Before collecting views, quotations, or other personal information, the team will check institutional review requirements, explain the purpose, recording methods, and intended uses to participants, and obtain the corresponding informed consent.",
          "Records would follow a minimum-necessary approach, with identifying information managed separately from research content and access restricted. Before public presentation, the scope of permission would be confirmed and identifying information removed. Consent to an interview does not automatically authorize experimental use or public sharing of a patient's medical history, wound photographs, or exudate samples."
        ]
      },
      {
        "id": "review-and-records",
        "heading": "Review safety as the project changes",
        "paragraphs": [
          "The document lists submissions including the Project Safety Form, Safety Check-in Form, and Animal Use Safety Form. The team plans for the principal investigator (PI) and relevant safety personnel to review the actual research scope. Before the corresponding activities begin, they would check the requirements of the current competition, the institution, and the locality, determine which materials need to be submitted, and record their status.",
          "The proposed safety records would link material inventories, risk assessments, training records, experimental changes, and incident responses. Adding a production module for the two-glycoside system, changing antimicrobial tests, or moving into later animal or translational research would require a reassessment of risks to people, products, and the environment. Longer-term plans cannot simply inherit the scope decisions made for the competition stage."
        ],
        "table": {
          "headers": [
            "Project change",
            "Records to update"
          ],
          "rows": [
            [
              "Adding materials, components, or procedures",
              "Source inventory, risk assessment, and required reviews or submissions"
            ],
            [
              "Conducting interviews or changing how data are used",
              "Informed consent, access permissions, and the scope of authorization for public use"
            ],
            [
              "Advancing subsequent product research",
              "Safety, quality, boundaries of use, and plans for independent validation"
            ]
          ]
        }
      }
    ]
  }
];

export function articlePath(article: WikiArticle): string {
  return '/' + article.category + '/' + article.slug;
}

function normalizePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0].replace(/\/index\.html$/, '').replace(/\/+$/, '');
  return pathname.startsWith('/') ? pathname : '/' + pathname;
}

export function articleForPath(path: string): WikiArticle | null {
  const pathname = normalizePath(path);
  return WIKI_ARTICLES.find(article => articlePath(article) === pathname) ?? null;
}

export function categoryForPath(path: string): WikiCategory | null {
  const categoryId = normalizePath(path).split('/')[1];
  return WIKI_CATEGORIES.find(category => category.id === categoryId) ?? null;
}
