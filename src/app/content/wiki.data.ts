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
          "contribution"
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
    "description": "Plan models and data analysis around directional release, absorption losses and cellular responses to explain experiments and inform design.",
    "icon": "code",
    "art": "dry-lab",
    "groups": [
      {
        "title": "Understand and connect",
        "description": "Start with measurable questions to guide the next design iteration.",
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
    "description": "Connect biosynthesis, materials, computing and human practices through clear roles, transparent attribution and traceable research records.",
    "icon": "groups",
    "art": "team",
    "groups": [
      {
        "title": "People and process",
        "description": "Discover team organisation, contributions and research records.",
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
    "subtitle": "Connecting material design and experimental feedback through measurable transport between layers",
    "description": "A modeling plan focused on release, adsorption losses, fluid transport, and retention under pressure, turning questions about the four-layer dressing into design comparisons that experiments can test.",
    "icon": "query_stats",
    "art": "dry-lab",
    "status": "Research plan",
    "sections": [
      {
        "id": "model-question",
        "heading": "Modeling begins with a conflict between layers",
        "paragraphs": [
          "The project document proposes using mathematical models to inform engineering design. The central challenge for the four-layer dressing is to release active molecules from the second layer toward the wound while the third layer absorbs exudate outward. Could stronger absorption also increase drug loss? Would these transport pathways continue to function under pressure? The planned modeling work focuses on these measurable questions.",
          "The first-generation study focuses on lobetyolin; the second-generation system combining two glycosides remains a planned development. Material compositions and experimental conditions need to be recorded separately for each stage. Unvalidated parameters cannot simply be shared between them."
        ]
      },
      {
        "id": "model-inputs",
        "heading": "Map inputs to observable measurements",
        "paragraphs": [
          "The plan is to organize inputs around material formulations, structures between layers, and test conditions, and to constrain the models with measurements. The porous PCL membrane, fluid transport channels, and CNC support proposed in the document provide candidate conditions for comparison. Dimensions and moisture vapor transmission rate ranges are design targets, not measured model parameters."
        ],
        "table": {
          "headers": [
            "Area of comparison",
            "Measurements to record"
          ],
          "rows": [
            [
              "Active molecule delivery",
              "Fraction released from the second layer; adsorption losses in the third layer"
            ],
            [
              "Exudate transport pathways",
              "Transport efficiency from the first to the third layer; lateral spreading"
            ],
            [
              "Pressure and blockage",
              "Fluid retained under pressure; backflow volume; absorption after pore blockage"
            ]
          ]
        }
      },
      {
        "id": "model-cell-analysis",
        "heading": "Analyze material performance and cellular responses separately",
        "paragraphs": [
          "Planned measurements such as cell viability, migration, inflammatory mediators, and ROS assess biological responses, which cannot be inferred from material release data alone. Research during the competition is limited to cell experiments. The plan is to record the corresponding conditions for material tests and cell evaluations to support later interpretation.",
          "The document proposes using GraphPad Prism, presenting data as mean ± standard deviation, and applying one-way ANOVA and Dunnett's test for the relevant group comparisons. Replicate wells within each group and independent experimental repeats need separate records. A statistical analysis plan does not establish that significant results have been obtained."
        ]
      },
      {
        "id": "model-learning",
        "heading": "Put predictions to the experimental test",
        "paragraphs": [
          "The proposed next steps are to organize the data and units, compare whether candidate models explain observations under different conditions, and use additional experiments to assess prediction errors. The intended outputs are to identify tradeoffs between release and absorption, highlight conditions requiring further measurements, and inform the next round of structural adjustments."
        ],
        "note": "The current document provides no established mathematical model, fitted equation, parameters, or predictive performance. This page presents a modeling plan; expected trends are not model results or clinical conclusions."
      }
    ]
  },
  {
    "slug": "software",
    "category": "dry-lab",
    "title": "Software",
    "subtitle": "Planning an experimental record and decision-support platform with traceable evidence",
    "description": "Developing the decision-support platform proposed in the project document into a plan for recording, comparing, and sharing information, with traceable links between material choices, experimental data, and design changes.",
    "icon": "code",
    "art": "dry-lab",
    "status": "Research plan",
    "sections": [
      {
        "id": "software-purpose",
        "heading": "Build decision support on evidence",
        "paragraphs": [
          "The project document identifies a decision-support platform and Human Practices as potential reusable contributions to the community. The proposed platform would first support the team's experimental records and comparisons between designs: identifying the data behind a design choice, conditions that remain untested, and questions for the next round of experiments.",
          "This page organizes the corresponding feature plans. The document supplies no deployed platform, software code, or operational results, so this page does not provide access to a working tool or claim that software has been delivered."
        ]
      },
      {
        "id": "software-records",
        "heading": "Record conditions and data origins",
        "paragraphs": [
          "The plan is to link sample identifiers, material compositions, structures between layers, and test conditions to their original records. The fraction released from the second layer, drug losses in the third layer, fluid transport efficiency, and retention under pressure should retain their units and measurement conditions. Values obtained under different conditions should not be ranked directly as evidence that one design is better."
        ],
        "bullets": [
          "Preserve links between original files, processed data, and figures.",
          "Record protocol versions, descriptions of changes, and the corresponding experimental batches.",
          "Distinguish design targets, pending tests, actual measurements, and interpretive judgments."
        ]
      },
      {
        "id": "software-comparison",
        "heading": "Make comparisons transparent and open to review",
        "paragraphs": [
          "Design comparisons would first display measurements and missing information, then explain the basis for a choice. For example, a design with greater fluid absorption still needs to be checked for adsorption losses of active molecules in the third layer and backflow under pressure. An improvement in one metric does not automatically establish better overall dressing performance.",
          "Cell experiment records would link treatment groups, replicate wells, independent repeats, and versions of the statistical analysis. The Prism workflow described in the document could form part of these records, but it does not establish that the platform already performs automated statistics or has a validated recommendation algorithm."
        ]
      },
      {
        "id": "software-sharing",
        "heading": "From team records to community reuse",
        "paragraphs": [
          "The proposed next steps are to define record fields and workflows, then iterate using feedback from the team's experiments. Planned reusable materials include data field descriptions, completed examples, explanations of analytical procedures, and version histories. These would help other teams understand the conditions under which data apply and assess their relevance to their own experimental systems.",
          "Shared content must reflect work actually completed and retain attribution and source information. Judgments unsupported by experimental data should be marked as awaiting validation. The platform is not intended to provide patient diagnosis or treatment advice or to replace professional judgment."
        ],
        "note": "This is a plan for a decision-support and recordkeeping platform. The document provides no evidence of released software, a public code repository, user testing, or performance metrics."
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
    "subtitle": "Bringing disciplines together around a shared wound care challenge",
    "description": "LUT-CHINA's team plan connects biosynthesis, materials design, modeling, clinical needs, and science communication throughout the research process.",
    "icon": "groups",
    "art": "team",
    "status": "Work plan",
    "sections": [
      {
        "id": "shared-purpose",
        "heading": "One challenge, many perspectives",
        "paragraphs": [
          "Developing a functional dressing for diabetic foot ulcers involves manufacturing active molecules, coordinating transport between material layers, understanding the patient experience, and considering future production requirements. The project document therefore places interdisciplinary collaboration at the center of team development, bringing different perspectives into the definition of the problem from the outset.",
          "The team plan spans biology, bioengineering, materials science, computing, design, and communication. It also seeks guidance in clinical nursing, public health, medical devices, law, and ethics. This page organizes responsibilities around the expertise the project needs."
        ]
      },
      {
        "id": "research-roles",
        "heading": "Organizing responsibilities across the research process",
        "paragraphs": [
          "Each work area needs to share its design assumptions, input conditions, and deliverables. This division of responsibilities should allow information from an experiment or an interview to inform work in other areas."
        ],
        "table": {
          "headers": [
            "Work area",
            "Core responsibilities",
            "Connections with other areas"
          ],
          "rows": [
            [
              "Biosynthesis and wet lab",
              "Review glycosyltransferase and donor modules; design biosynthesis and cell-based validation studies",
              "Provide measurable indicators for modeling and materials research"
            ],
            [
              "Materials and device design",
              "Investigate contact, delivery, absorption, and moisture vapor transmission in the four-layer dressing",
              "Translate clinical use requirements into structural and performance targets"
            ],
            [
              "Modeling and computation",
              "Describe parameter relationships, organize data, and support comparisons between designs",
              "Update assumptions and computational conditions in response to experimental feedback"
            ],
            [
              "Human practices and implementation",
              "Plan stakeholder engagement and examine comfort, cost, and use procedures",
              "Record feedback as specific proposals for design changes"
            ],
            [
              "Design and science communication",
              "Organize the Wiki, illustrations, public science materials, and project narrative",
              "Check scientific statements against their supporting evidence"
            ]
          ]
        }
      },
      {
        "id": "learning-together",
        "heading": "Learning across disciplines with mentor support",
        "paragraphs": [
          "The document proposes online discussions that bring together different perspectives and encourages members to learn about clinical practice, biological experiments, production, and device registration. Plans for mentor support also emphasize a range of professional perspectives to examine practical constraints alongside scientific feasibility."
        ],
        "bullets": [
          "Define the question, available evidence, and desired feedback before each discussion.",
          "Record the date, topic, learning materials, and conclusions that can guide the project.",
          "Document disagreements, reasons for failure, and proposed improvements alongside successful work."
        ]
      },
      {
        "id": "working-responsibly",
        "heading": "Sharing responsibility for research",
        "paragraphs": [
          "Understanding the rules, working safely, and respecting participants are shared responsibilities across all work areas. The document calls for teachers and members to study competition materials together and remain attentive to biosafety, research integrity, and informed consent. Records of planned interviews, photographs, and discussions should reflect what actually takes place, with public use limited to the permission participants have given.",
          "Team collaboration will be assessed by whether it clarifies questions, improves designs, and produces traceable evidence. The number of activities alone cannot establish the value of a contribution."
        ]
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
