import type { ChapterNote } from "./types";

const U_BIO = "Everyday Biology & Health";
const U_CHEM = "Everyday Chemistry";
const U_PHYS = "Everyday Physics";
const U_NATURE = "Everyday Science Phenomena";
const U_SPACE = "Space, Solar System & ISRO";
const U_MATERIALS = "Everyday Materials & Metallurgy";

export const notesGeneralScience: ChapterNote[] = [
  /* ═════════════════════════════════════════════════════════════════════════ */
  /* CHAPTER 1: VITAMINS, MINERALS & DAILY NUTRITION                           */
  /* ═════════════════════════════════════════════════════════════════════════ */
  {
    id: "note-gen-1",
    classLevel: "general",
    chapterNo: 1,
    title: "Vitamins, Minerals & Daily Nutrition",
    unit: U_BIO,
    overview:
      "A complete visual guide to essential vitamins, daily food sources, health benefits, deficiency symptoms, and vital minerals. Learn which foods give you which vitamins and what happens if you don't get enough.",
    sections: [
      {
        title: "Fat-Soluble Vitamins (A, D, E, K)",
        points: [
          "• **Stored in Body**: Fat-soluble vitamins dissolve in organic fats and are stored in the liver and adipose tissue. They do not wash out in urine, so your body maintains a reserve for weeks.",
          "• **Vitamin A (Retinol / β-Carotene)**: Essential for retinal rhodopsin pigment, sharp night vision, and immune epithelial barriers. Found abundantly in **carrots, sweet potatoes, spinach, papaya, mangoes, and egg yolk**. Deficiency causes **Night Blindness (Nyctalopia)** and dry cornea (Xerophthalmia).",
          "• **Vitamin D (Sunshine Vitamin / Calciferol)**: Stimulates intestinal absorption of Calcium and Phosphorus to mineralize bones and teeth. Synthesized naturally in skin upon exposure to **morning solar UV-B rays**; also in **salmon, egg yolk, and fortified milk**. Deficiency causes **Rickets in children (bowed legs)** and **Osteomalacia in adults**.",
          "• **Vitamin E (Tocopherol)**: Premier lipid-soluble antioxidant that protects cellular membranes from oxidative damage; promotes glowing skin, hair vitality, and reproductive health. Found in **almonds, sunflower seeds, peanuts, and cold-pressed vegetable oils**.",
          "• **Vitamin K (Phylloquinone)**: Mandatory cofactor for hepatic synthesis of prothrombin and blood clotting factors VII, IX, and X. Found in **spinach, broccoli, kale, cabbage, and synthesized by gut flora**. Deficiency causes **prolonged bleeding and failure of cuts to clot**."
        ],
        table: {
          head: ["Vitamin", "Chemical Name", "Top Food Sources", "Main Biological Role", "Deficiency Symptom"],
          rows: [
            ["Vitamin A", "Retinol / Carotene", "Carrots, papaya, spinach, egg yolk, sweet potato", "Night vision, eye moisture, immune skin barrier", "Night blindness (Nyctalopia), dry cornea (Xerophthalmia)"],
            ["Vitamin D", "Calciferol (Sunshine)", "Morning sunlight, milk, egg yolk, salmon, mushrooms", "Bone mineralization, calcium & phosphorus absorption", "Rickets (bowed legs in kids), soft brittle bones (Osteomalacia)"],
            ["Vitamin E", "Tocopherol", "Almonds, sunflower seeds, peanuts, wheat germ oil", "Cellular antioxidant, skin glow, fertility health", "Muscle weakness, red blood cell fragility, premature aging"],
            ["Vitamin K", "Phylloquinone", "Spinach, broccoli, cabbage, kale, gut bacteria", "Blood clotting (prothrombin synthesis) & bone density", "Excessive bleeding from cuts, easy bruising, slow clotting"]
          ]
        },
        tip: "Mnemonic: Remember 'K-E-D-A' (or 'DEKA') as the fat-soluble vitamins. Always consume them with healthy fats (like nuts or olive oil) for optimal gut absorption."
      },
      {
        title: "Water-Soluble Vitamins (Vitamin C & B-Complex)",
        points: [
          "• **Daily Replenishment**: Water-soluble vitamins are not stored in significant quantities (excess is excreted in urine daily). Daily dietary intake is required.",
          "• **Vitamin C (Ascorbic Acid)**: Powerful antioxidant and collagen synthesizer for gums, skin, blood vessels, and wound healing. Easily destroyed by cooking heat! Best in **Amla (richest natural source!), guava, lemons, oranges, kiwis, and green chilies**. Deficiency causes **Scurvy (bleeding spongy gums, slow wound healing)**.",
          "• **Vitamin B₁ (Thiamine)**: Carbohydrate metabolism and nervous conduction. Abundant in **unpolished brown rice, whole wheat, pulses, and nuts**. Deficiency causes **Beriberi (peripheral neuropathy and heart weakness)**.",
          "• **Vitamin B₂ (Riboflavin)**: Cellular energy production (FAD/FMN coenzymes). Rich in **milk, curd, eggs, and leafy greens**. Deficiency causes **cracked lip corners (Cheilosis) and inflamed magenta tongue (Glossitis)**.",
          "• **Vitamin B₃ (Niacin)**: DNA repair and cellular NAD/NADP respiration. Found in **peanuts, mushrooms, chicken, and brown rice**. Deficiency causes **Pellagra (the 4 D's: Dermatitis, Diarrhea, Dementia, Death)**.",
          "• **Vitamin B₅ (Pantothenic Acid)**: Coenzyme A synthesis and hormone production. Found in **sunflower seeds, mushrooms, and avocados**. Deficiency causes fatigue and 'burning feet syndrome'.",
          "• **Vitamin B₆ (Pyridoxine)**: Amino acid synthesis, neurotransmitter creation (serotonin, dopamine), and hemoglobin. Found in **bananas, chickpeas, and potatoes**.",
          "• **Vitamin B₇ (Biotin)**: Keratin synthesis for hair and nails, fatty acid metabolism. Found in **egg yolk, almonds, and sweet potatoes**.",
          "• **Vitamin B₉ (Folic Acid / Folate)**: DNA synthesis and red blood cell maturation; critical during early pregnancy to prevent neural tube defects. Rich in **spinach, methi, lentils, and beans**.",
          "• **Vitamin B₁₂ (Cobalamin)**: The only vitamin with a heavy metal (**Cobalt**)! Crucial for myelin nerve sheaths and RBC formation. **Found only in animal/dairy foods (milk, curd, paneer, eggs, fish) — zero in plant foods.** Lack causes **Pernicious Anemia and neurological tingling**."
        ],
        table: {
          head: ["Vitamin", "Scientific Name", "Top Dietary Sources", "Key Function", "Deficiency Disease"],
          rows: [
            ["Vitamin C", "Ascorbic Acid", "Amla, guava, lemon, orange, kiwi, green chili", "Collagen synthesis, immune defense, iron uptake", "Scurvy: bleeding gums, loose teeth, poor healing"],
            ["Vitamin B₁", "Thiamine", "Brown rice, whole grains, pulses, peanuts", "Carb metabolism, nerve signal transmission", "Beriberi: weak limbs, nerve pain, cardiac edema"],
            ["Vitamin B₂", "Riboflavin", "Milk, yogurt, eggs, green leafy vegetables", "Energy release, mucosal health", "Cheilosis (cracked mouth corners), sore tongue"],
            ["Vitamin B₃", "Niacin", "Peanuts, mushrooms, poultry, whole wheat", "Cellular energy (NAD), digestive health", "Pellagra: scaly skin dermatitis, diarrhea, memory fog"],
            ["Vitamin B₅", "Pantothenic Acid", "Sunflower seeds, avocados, mushrooms, lentils", "Coenzyme A, fatty acid metabolism", "Fatigue, sleep disturbances, burning feet"],
            ["Vitamin B₆", "Pyridoxine", "Bananas, chickpeas, potatoes, chicken", "Neurotransmitters, hemoglobin synthesis", "Anemia, peripheral neuropathy, mood irritability"],
            ["Vitamin B₇", "Biotin", "Egg yolk, almonds, sweet potatoes, oats", "Keratin protein for hair & nails, lipid synthesis", "Hair thinning, brittle nails, scaly facial rash"],
            ["Vitamin B₉", "Folic Acid", "Spinach, methi, lentils, chickpeas, citrus", "Red blood cell formation, fetal spinal development", "Megaloblastic anemia, neural tube birth defects"],
            ["Vitamin B₁₂", "Cobalamin (Cobalt)", "Milk, curd, paneer, eggs, fish (no plant foods)", "Myelin nerve sheath, RBC DNA synthesis", "Pernicious anemia, nerve tingling & memory loss"]
          ]
        },
        tip: "Kitchen Fact: Amla contains roughly 20 times more Vitamin C than an orange! Because Vitamin C is thermolabile (destroyed by heat), consume citrus fruits fresh and raw."
      },
      {
        title: "Essential Minerals in Everyday Food",
        points: [
          "• **Iron (Fe)**: Forms **Hemoglobin** in red blood cells to transport oxygen from lungs to muscles. Found in **spinach, jaggery (gur), beetroot, pomegranate, and lentils**. Deficiency causes **Anemia (fatigue, pale complexion, spoon nails)**.",
          "• **Calcium (Ca)**: Major mineral in bones and teeth; essential for cardiac contraction, neuromuscular signaling, and blood coagulation. Found in **milk, curd, ragi, and sesame seeds (til)**. Deficiency causes **Osteoporosis and tetany**.",
          "• **Iodine (I)**: Structural component of thyroid hormones (T₃ and T₄) that govern metabolic rate and child brain maturation. Found in **iodized salt and seafood**. Deficiency causes **Goitre (neck swelling) and cretinism**.",
          "• **Potassium (K)**: Primary intracellular electrolyte; prevents muscle cramps and regulates blood pressure and heart rhythms. Found in **tender coconut water, bananas, and potatoes**.",
          "• **Sodium (Na)**: Primary extracellular electrolyte; controls osmotic pressure and nerve action potentials. Sourced from **table salt**.",
          "• **Zinc (Zn)**: Essential for wound healing, immune T-cell function, DNA polymerase, and taste sensation. Found in **pumpkin seeds, chickpeas, and almonds**.",
          "• **Fluorine (F)**: Prevents tooth decay at optimal levels (~1 ppm). Under 1 ppm causes dental cavities; above 2 ppm causes dental and skeletal fluorosis."
        ],
        table: {
          head: ["Mineral", "Symbol", "What It Does in Your Body", "Best Daily Food Sources", "Sign of Deficiency"],
          rows: [
            ["Iron", "Fe", "Synthesizes hemoglobin to carry oxygen in blood", "Spinach, jaggery (gur), beetroot, lentils, dates", "Anemia: fatigue, pale skin, spoon nails (koilonychia)"],
            ["Calcium", "Ca", "Builds dense bones and teeth; muscle contraction", "Milk, curd, ragi, sesame seeds (til), paneer", "Osteoporosis (fragile bones), rickets, tooth decay"],
            ["Iodine", "I", "Synthesizes thyroid thyroxine hormones; brain growth", "Iodized salt, marine fish, seaweed", "Goitre: enlarged thyroid neck gland; stunted growth"],
            ["Potassium", "K", "Balances cellular fluids, regulates heartbeat & BP", "Tender coconut water, bananas, potatoes, spinach", "Muscle cramps, fatigue, cardiac arrhythmias"],
            ["Sodium", "Na", "Maintains fluid volume and nerve impulses", "Table salt (NaCl), pickles, cheese", "Muscle weakness, cramps, low blood pressure"],
            ["Zinc", "Zn", "Powers immune response, heals cuts, taste & smell", "Pumpkin seeds, almonds, lentils, whole grains", "Slow wound healing, loss of taste/smell, hair loss"],
            ["Fluorine", "F", "Strengthens enamel against acidic bacterial decay", "Drinking water (~1 ppm), tea, toothpaste", "Dental caries (<1 ppm); dental fluorosis stains (>2 ppm)"]
          ]
        },
        tip: "Diet Hack: Vitamin C dramatically increases the bioavailability of non-heme (plant) iron. Squeezing fresh lemon juice over your dal or palak triples your iron absorption!"
      }
    ],
    keyTerms: [
      { term: "Hemoglobin", meaning: "The iron-containing protein inside red blood cells that transports oxygen from the lungs to all body tissues." },
      { term: "Antioxidant", meaning: "A molecule (such as Vitamin C or E) that neutralizes free radicals, preventing cellular and DNA damage." },
      { term: "Pernicious Anemia", meaning: "A severe form of anemia caused by inability to absorb Vitamin B₁₂ due to lack of stomach intrinsic factor." },
      { term: "Goitre", meaning: "Abnormal enlargement of the thyroid gland visible as a swelling at the front of the neck due to dietary iodine deficiency." }
    ],
    examTips: [
      "Vitamin B₁₂ is the only vitamin that contains a metal atom (Cobalt).",
      "Vitamin C (Ascorbic acid) is completely destroyed by heating and boiling.",
      "Amla is the richest natural source of Vitamin C (nearly 600 mg / 100 g).",
      "Fat-soluble vitamins: K, E, D, A. Water-soluble vitamins: B-complex and C."
    ]
  },

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* CHAPTER 2: DISEASES, CAUSES, PATHOGENS & IMMUNITY                         */
  /* ═════════════════════════════════════════════════════════════════════════ */
  {
    id: "note-gen-2",
    classLevel: "general",
    chapterNo: 2,
    title: "Diseases, Causes, Pathogens & Immunity",
    unit: U_BIO,
    overview:
      "A clear clinical directory of infectious and lifestyle diseases: causative bacteria, viruses, and parasites, transmission modes, clinical symptoms, and preventive vaccines.",
    sections: [
      {
        title: "Bacterial Diseases & Pathogens",
        points: [
          "• **Antibiotic Treatable**: Bacterial infections are caused by single-celled prokaryotic bacteria and can be effectively cured with targeted antibiotics (e.g. penicillin, azithromycin).",
          "• **Tuberculosis (TB)**: Caused by *Mycobacterium tuberculosis*. Attacks the lungs; transmitted via aerosol cough droplets. Symptoms include persistent bloody cough, night sweats, and weight loss. Prevented by **BCG Vaccine**; treated with DOTS therapy.",
          "• **Typhoid Fever**: Caused by *Salmonella typhi*. Transmitted through contaminated food and water. Characterized by sustained high step-ladder fever and abdominal pain. Diagnosed clinically by the **Widal Test**.",
          "• **Cholera**: Caused by *Vibrio cholerae* (comma-shaped). Transmitted through sewage-contaminated water. Causes acute painless **rice-water stools** leading to lethal rapid dehydration. Treated with **Oral Rehydration Salts (ORS)**.",
          "• **Tetanus (Lockjaw)**: Caused by *Clostridium tetani* anaerobe spores residing in rusted iron, street soil, and animal dung. Spores enter deep wounds and secrete tetanospasmin toxin, causing severe painful muscle spasms and clenched jaw. Prevented by **Tetanus Toxoid (TT)**.",
          "• **Pertussis (Whooping Cough)**: Caused by *Bordetella pertussis*. Severe spasmodic cough ending in a high-pitched 'whooping' inhalation. Prevented by the **DPT Vaccine**."
        ],
        table: {
          head: ["Disease", "Causative Pathogen", "Mode of Spread", "Primary Symptoms", "Diagnosis / Prevention"],
          rows: [
            ["Tuberculosis (TB)", "Mycobacterium tuberculosis", "Airborne cough/sneeze droplets", "Chronic cough with blood, chest pain, night sweats", "BCG Vaccine, Mantoux skin test, DOTS regimen"],
            ["Typhoid Fever", "Salmonella typhi", "Contaminated food and drinking water", "Continuous step-ladder fever, stomach ache, rash", "Widal Test, Typhoid Conjugate Vaccine (TCV)"],
            ["Cholera", "Vibrio cholerae (comma-shaped)", "Drinking sewage-polluted water/food", "Painless voluminous rice-water stools, shock", "ORS (Oral Rehydration Solution), clean water"],
            ["Tetanus (Lockjaw)", "Clostridium tetani (spores)", "Soil/rusty nail entry into puncture wounds", "Rigid lockjaw, violent body muscle spasms", "Tetanus Toxoid (TT / Td) within 24 hours of cut"],
            ["Diphtheria", "Corynebacterium diphtheriae", "Respiratory droplets and contact", "Thick grey pseudomembrane coating throat, choking", "DPT / Pentavalent Vaccine, antitoxin"],
            ["Pertussis", "Bordetella pertussis", "Airborne respiratory droplets", "Uncontrollable coughing fits ending in whoop sound", "DPT Vaccine (infant immunization)"],
            ["Pneumonia", "Streptococcus pneumoniae", "Airborne droplets, infected aerosols", "Fluid in lung alveoli, high fever, chest pain", "Pneumococcal Conjugate Vaccine (PCV), antibiotics"]
          ]
        },
        tip: "Clinical Note: The Widal test specifically diagnoses Typhoid, while the Mantoux test screens for Tuberculosis infection."
      },
      {
        title: "Viral Diseases & Pandemics",
        points: [
          "• **Intracellular Invaders**: Viruses lack cellular machinery and replicate exclusively inside host cells. **Antibiotics have zero effect on viruses!** Vaccines and antiviral drugs are used.",
          "• **Rabies (Hydrophobia)**: Caused by *Rhabdovirus*. Transmitted through the saliva of infected rabid dog, bat, or monkey bites. Fatal once neurological symptoms appear; characterized by intense throat spasms when seeing water (Hydrophobia). Prevented by immediate wound washing with soap and **Post-Exposure Prophylaxis (PEP) rabies vaccine**.",
          "• **Polio (Poliomyelitis)**: Caused by *Poliovirus*. Spread through fecal-oral route; destroys motor neurons in the spinal cord, causing permanent flaccid limb paralysis. Controlled globally by **Salk Injectable Vaccine (IPV)** and **Sabin Oral Vaccine (OPV drops)**.",
          "• **Hepatitis (A, B, C)**: Viruses affecting the liver. Hepatitis A spreads via contaminated food/water; Hepatitis B and C spread via infected blood transfusions and unsterilized needles. Causes jaundice (yellow eyes/skin) and liver cirrhosis.",
          "• **Dengue Fever (Breakbone Fever)**: Caused by *Dengue flavivirus*. Transmitted by daytime-biting **Aedes aegypti** mosquitoes. Characterized by retro-orbital headache, excruciating joint/muscle pain, and sudden drop in blood platelet counts."
        ],
        table: {
          head: ["Disease", "Causative Virus", "Transmission Mode", "Distinct Symptoms", "Prevention / Vaccine"],
          rows: [
            ["Rabies", "Rabies lyssavirus (bullet-shaped)", "Bite/scratch of rabid dog, bat, monkey", "Hydrophobia (fear of water), spasms, delirium", "Immediate soap wash + Post-Exposure Vaccine (PEP)"],
            ["Polio", "Poliovirus (enterovirus)", "Fecal-oral contaminated food/water", "Motor neuron damage, permanent limb paralysis", "Oral Polio Drops (OPV) & Inactivated Vaccine (IPV)"],
            ["Dengue Fever", "Dengue virus (DENV 1-4)", "Bite of infected female Aedes mosquito", "Breakbone joint pain, fever, sharp platelet drop", "Mosquito control, platelet monitoring, hydration"],
            ["Hepatitis B", "Hepatitis B virus (HBV)", "Infected blood, unsterilized needles", "Jaundice (yellow eyes/skin), liver damage", "Hepatitis B vaccine (recombinant surface antigen)"],
            ["Chickenpox", "Varicella Zoster virus", "Airborne droplets and blister contact", "Itchy fluid-filled skin blisters, fever", "Varicella vaccine, calamine lotion"],
            ["Measles", "Measles morbillivirus", "Airborne respiratory droplets", "Koplik spots in mouth, full-body red skin rash", "MR / MMR Vaccine (Measles-Mumps-Rubella)"],
            ["Common Cold", "Rhinovirus (over 100 serotypes)", "Inhaling aerosols, touching surfaces", "Runny nose, sneezing, scratchy throat", "Hand washing, rest, hydration (self-limiting)"]
          ]
        },
        tip: "Exam Favorite: Aedes aegypti mosquitoes bite strictly during the daytime and transmit Dengue, Chikungunya, and Zika virus. Anopheles mosquitoes bite at night and transmit Malaria."
      },
      {
        title: "Parasitic & Mosquito-Borne Diseases",
        points: [
          "• **Malaria**: Caused by the protozoan parasite *Plasmodium* (*P. falciparum* is the most fatal). Transmitted by the bite of female *Anopheles* mosquitoes. Multiplies in liver cells, then ruptures red blood cells, releasing hemozoin toxin that triggers cyclical chills and spiking high fever. Treated with **Artemisinin-based combination therapy (ACT)**.",
          "• **Amoebic Dysentery (Amoebiasis)**: Caused by *Entamoeba histolytica* protozoa. Spread via water contaminated with cysts. Causes severe bloody diarrhea with mucus and intestinal cramps.",
          "• **Filariasis (Elephantiasis)**: Caused by the parasitic filarial worm *Wuchereria bancrofti*. Transmitted by *Culex* mosquitoes. Worms block lymphatic vessels, causing massive chronic swelling of legs and scrotum."
        ],
        table: {
          head: ["Disease", "Pathogen Type & Name", "Transmission Vector", "Key Signs", "Management"],
          rows: [
            ["Malaria", "Protozoan: Plasmodium vivax / falciparum", "Female Anopheles mosquito (night bite)", "Cyclic high fever with shivering, chills, sweating", "ACT, Quinine, mosquito nets, antimalarial drugs"],
            ["Elephantiasis", "Helminth worm: Wuchereria bancrofti", "Culex mosquito bites", "Lymphatic blockage, gross swelling of legs & limbs", "DEC (Diethylcarbamazine), vector eradication"],
            ["Amoebiasis", "Protozoan: Entamoeba histolytica", "Cysts in contaminated food and water", "Abdominal cramps, loose stools with blood & mucus", "Metronidazole, boiling drinking water"],
            ["Kala-Azar", "Protozoan: Leishmania donovani", "Bite of infected Sandfly (Phlebotomus)", "Prolonged fever, enlarged spleen and liver, anemia", "Liposomal Amphotericin B, sandfly insecticides"]
          ]
        },
        tip: "Vector Rule: Malaria = Anopheles; Dengue / Chikungunya = Aedes; Elephantiasis = Culex; Kala-Azar = Sandfly; Sleeping Sickness = Tsetse fly."
      }
    ],
    keyTerms: [
      { term: "Pathogen", meaning: "Any microscopic biological agent (bacteria, virus, protozoan, or fungus) that causes infectious disease in a host." },
      { term: "Vector", meaning: "An intermediate organism (such as a mosquito, tick, or sandfly) that transmits an infectious disease from one host to another." },
      { term: "BCG Vaccine", meaning: "Bacille Calmette-Guérin, the standard infant vaccine administered to provide immunity against tuberculosis." },
      { term: "Oral Rehydration Salts (ORS)", meaning: "A balanced mixture of glucose and mineral electrolytes in clean water that prevents fatal dehydration from cholera and diarrhea." }
    ],
    examTips: [
      "The causative agent of Malaria is a protozoan (Plasmodium), NOT a bacterium or virus.",
      "Rabies is also known as Hydrophobia because patients suffer painful involuntary throat spasms when attempting to swallow liquids.",
      "Aedes aegypti mosquitoes breed in clean stagnant water and bite during daytime."
    ]
  },

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* CHAPTER 3: EVERYDAY PH VALUES & HOUSEHOLD CHEMICALS                       */
  /* ═════════════════════════════════════════════════════════════════════════ */
  {
    id: "note-gen-3",
    classLevel: "general",
    chapterNo: 3,
    title: "Everyday pH Values & Household Chemicals",
    unit: U_CHEM,
    overview:
      "A complete guide to the pH spectrum of daily liquids, natural organic acids in fruits, and common household chemicals with their official chemical formulas and applications.",
    sections: [
      {
        title: "The pH Scale & Daily Fluids",
        points: [
          "• **Logarithmic Scale**: Formulated by S.P.L. Sørensen in 1909. pH ranges from 0 (most acidic) to 14 (most basic/alkaline); 7 is pure neutral. Each unit change represents a 10-fold difference in H⁺ ion concentration.",
          "• **Gastric Juice (Stomach Acid, pH 1.2–2.0)**: Highly concentrated Hydrochloric acid (HCl). Kills ingested pathogens and activates pepsinogen into active pepsin to digest dietary proteins.",
          "• **Human Blood (pH 7.35–7.45)**: Strictly maintained slightly alkaline by the bicarbonate buffering system. Any drop below 7.35 (acidosis) or rise above 7.45 (alkalosis) is clinically dangerous.",
          "• **Tooth Decay Point (pH 5.5)**: When oral bacteria ferment sugars into acid and mouth pH falls below 5.5, hard enamel (calcium hydroxyapatite) begins demineralizing.",
          "• **Acid Rain (pH < 5.6)**: Normal rain has a pH of ~5.6 from dissolved carbonic acid (CO₂ + H₂O). When atmospheric SO₂ and NO₂ form sulfuric and nitric acids, rain pH drops below 5.6, corroding marble buildings ('marble cancer') and aquatic lakes."
        ],
        table: {
          head: ["Substance / Liquid", "Exact pH Value", "Chemical Nature", "Everyday Science Significance"],
          rows: [
            ["Battery Acid (H₂SO₄)", "0.5 to 1.0", "Extremely Strong Acid", "Concentrated sulfuric acid inside car lead-acid storage batteries"],
            ["Stomach Gastric Acid", "1.2 to 2.0", "Strong Acid (HCl)", "Kills swallowed bacteria; activates pepsin protein digestive enzyme"],
            ["Lemon Juice", "2.2 to 2.4", "Acidic (Citric acid)", "High citric acid content; cleans copper tarnish and provides Vitamin C"],
            ["Household Vinegar", "2.4 to 2.8", "Acidic (Acetic acid)", "5% to 8% acetic acid; used for pickling and culinary preservation"],
            ["Black Coffee", "5.0", "Mildly Acidic", "Contains chlorogenic acids; mild diuretic effect on kidneys"],
            ["Acid Rain Threshold", "< 5.6", "Harmful Acidic Rain", "Precipitation carrying sulfuric and nitric acids from air pollution"],
            ["Normal Human Saliva", "6.5 to 7.5", "Near Neutral", "Contains salivary amylase (ptyalin) to digest starch into sugars"],
            ["Pure Distilled Water (25°C)", "7.0 exactly", "Pure Neutral", "Equal concentration of H⁺ and OH⁻ ions (10⁻⁷ mol/L)"],
            ["Human Blood", "7.35 to 7.45", "Slightly Alkaline", "Strictly buffered by bicarbonate ions; essential for life homeostasis"],
            ["Human Tears", "7.4", "Slightly Alkaline", "Contains lysozyme enzyme to destroy bacterial cell walls in eyes"],
            ["Baking Soda Solution", "8.4", "Mild Alkaline", "Sodium bicarbonate; neutralizes acid reflux and makes cakes rise"],
            ["Milk of Magnesia", "10.5", "Alkaline Antacid", "Magnesium hydroxide [Mg(OH)₂]; treats heartburn and stomach acidity"],
            ["Household Bleach", "12.5 to 13.0", "Strong Alkaline", "Sodium hypochlorite (NaOCl); kills bacteria and oxidizes fabric stains"],
            ["Caustic Soda (Lye)", "14.0", "Extremely Strong Base", "Sodium hydroxide (NaOH); dissolves drain grease and saponifies soap"]
          ]
        },
        tip: "Remember: Pure neutral water is pH 7.0 only at 25°C. Human blood is slightly basic (7.4), whereas human stomach acid is intensely acidic (~1.5)."
      },
      {
        title: "Everyday Household Chemicals & Formulas",
        points: [
          "• **Baking Soda (NaHCO₃)**: Sodium hydrogen carbonate. Releases CO₂ bubbles when heated or mixed with acids (lemon/vinegar), creating fluffy bread and cakes.",
          "• **Washing Soda (Na₂CO₃ · 10H₂O)**: Sodium carbonate decahydrate. Removes permanent hardness from water by precipitating dissolved calcium and magnesium ions.",
          "• **Plaster of Paris (CaSO₄ · ½H₂O)**: Calcium sulfate hemihydrate. Made by heating Gypsum (CaSO₄ · 2H₂O) to 373 K. Used for setting fractured bones and ornamental ceiling casts.",
          "• **Bleaching Powder (CaOCl₂)**: Calcium hypochlorite. Formed by passing chlorine over dry slaked lime; disinfects municipal drinking water.",
          "• **Dry Ice (Solid CO₂)**: Carbon dioxide frozen at −78.5°C. Sublimates directly from solid to gas without melting into liquid, providing dense fog effects and cold refrigeration."
        ],
        table: {
          head: ["Common Name", "Chemical Name", "Chemical Formula", "Everyday Practical Uses"],
          rows: [
            ["Baking Soda", "Sodium hydrogen carbonate", "NaHCO₃", "Fluffy cakes, dhokla, antacid for acid reflux, fire extinguishers"],
            ["Washing Soda", "Sodium carbonate decahydrate", "Na₂CO₃ · 10H₂O", "Laundry detergent, removing permanent water hardness, glass manufacture"],
            ["Plaster of Paris (P.O.P.)", "Calcium sulfate hemihydrate", "CaSO₄ · ½H₂O", "Orthopedic casts for broken bones, false ceilings, sculpture statues"],
            ["Gypsum", "Calcium sulfate dihydrate", "CaSO₄ · 2H₂O", "Retards flash-setting time when added to Portland cement clinker"],
            ["Bleaching Powder", "Calcium hypochlorite", "CaOCl₂", "Disinfecting drinking water, fabric bleaching, chlorinating pools"],
            ["Quicklime", "Calcium oxide", "CaO", "Cement manufacturing, drying agents, chemical synthesis"],
            ["Slaked Lime", "Calcium hydroxide", "Ca(OH)₂", "Whitewashing walls, soil acidity neutralization, mortar"],
            ["Caustic Soda", "Sodium hydroxide", "NaOH", "Manufacturing soaps, rayon, paper pulp, unclogging drain pipes"],
            ["Laughing Gas", "Nitrous oxide", "N₂O", "Dental anesthesia, surgical analgesic, racing vehicle nitrous boost"],
            ["Dry Ice", "Solid Carbon dioxide", "CO₂ (solid at −78.5°C)", "Sublimates directly into gas; stage fog effects, preserving vaccines"],
            ["Blue Vitriol", "Copper sulfate pentahydrate", "CuSO₄ · 5H₂O", "Agricultural fungicide (Bordeaux mixture), copper electroplating"],
            ["Potash Alum (Fitkari)", "Potassium aluminium sulfate", "K₂SO₄·Al₂(SO₄)₃·24H₂O", "Water purification (coagulation), styptic to stop shaving cuts"]
          ]
        },
        tip: "Chemistry Alert: Gypsum has 2 water molecules (CaSO₄ · 2H₂O), while Plaster of Paris has half a water molecule (CaSO₄ · ½H₂O)."
      },
      {
        title: "Natural Organic Acids in Everyday Foods",
        points: [
          "• **Citric Acid**: Present in citrus fruits (lemon, orange, amla, mosambi). Acts as a natural preservative and antioxidant.",
          "• **Acetic Acid (Ethanoic Acid)**: The key component of household vinegar (5–8% solution in water).",
          "• **Lactic Acid**: Formed in curd and sour milk by *Lactobacillus* bacteria fermenting lactose. Also accumulates in human muscles during sprinting, causing cramps.",
          "• **Tartaric Acid**: Found in tamarind, unripened grapes, and baking powder. Neutralizes the bitter alkaline taste of baking soda.",
          "• **Oxalic Acid**: Present in tomatoes and spinach. Removes rust and ink stains. Binds with calcium to form calcium oxalate kidney stones.",
          "• **Formic Acid (Methanoic Acid)**: Injected into skin by red ant bites and nettle plant hairs, causing sharp stinging pain. Neutralized with baking soda or calamine.",
          "• **Malic Acid**: Primary acid in crisp apples and pears.",
          "• **Carbonic Acid (H₂CO₃)**: Weak acid formed when CO₂ dissolves in fizzy soda and aerated soft drinks."
        ],
        table: {
          head: ["Natural Source", "Principal Acid Present", "Chemical Formula", "Everyday Science Fact"],
          rows: [
            ["Lemons & Oranges", "Citric acid", "C₆H₈O₇", "Gives citrus fruits their sharp sourness; dissolves scale deposits"],
            ["Household Vinegar", "Acetic acid (Ethanoic)", "CH₃COOH (5-8%)", "Prevents bacterial growth in pickles and salad dressings"],
            ["Curd & Sour Milk", "Lactic acid", "C₃H₆O₃", "Coagulates milk casein protein into curd; causes muscle fatigue"],
            ["Tamarind & Grapes", "Tartaric acid", "C₄H₆O₆", "Component of baking powder to neutralize basic sodium carbonate"],
            ["Tomatoes & Spinach", "Oxalic acid", "C₂H₂O₄", "Removes rust stains; forms 80% of human kidney stones"],
            ["Red Ant Stings & Nettle", "Formic acid (Methanoic)", "HCOOH", "Causes burning sting; neutralized by applying calamine or baking soda"],
            ["Crisp Apples", "Malic acid", "C₄H₆O₅", "Imparts the refreshing tart flavor to green and red apples"],
            ["Carbonated Soda Drinks", "Carbonic acid", "H₂CO₃", "Formed by dissolving CO₂ gas under pressure; creates soda fizz"]
          ]
        },
        tip: "First Aid Tip: An ant sting injects acidic formic acid (neutralize with mild base like baking soda). A wasp sting injects an alkaline venom (neutralize with mild acid like vinegar)."
      }
    ],
    keyTerms: [
      { term: "pH Scale", meaning: "A logarithmic scale from 0 to 14 measuring hydrogen ion concentration; values below 7 are acidic, 7 is neutral, and above 7 are alkaline." },
      { term: "Aqua Regia", meaning: "A fresh fuming 3:1 mixture of concentrated Hydrochloric acid and Nitric acid capable of dissolving noble metals like gold and platinum." },
      { term: "Sublimation", meaning: "The direct transition of a substance from solid to gas without passing through the intermediate liquid phase (e.g. Dry Ice, Camphor, Iodine)." },
      { term: "Indicator", meaning: "A chemical dye (like litmus, phenolphthalein, or turmeric) that changes color in acidic and basic solutions." }
    ],
    examTips: [
      "Phenolphthalein indicator is colorless in acid and turns bright pink/magenta in base.",
      "Turmeric turns reddish-brown when exposed to alkaline soap.",
      "Tooth enamel begins dissolving when oral pH falls below 5.5.",
      "Litmus dye is naturally extracted from Lichens."
    ]
  },

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* CHAPTER 4: SI UNITS, SCIENTIFIC INSTRUMENTS & PHYSICAL LAWS               */
  /* ═════════════════════════════════════════════════════════════════════════ */
  {
    id: "note-gen-4",
    classLevel: "general",
    chapterNo: 4,
    title: "SI Units, Scientific Instruments & Physical Laws",
    unit: U_PHYS,
    overview:
      "A high-yield directory of SI base and derived units, famous laboratory and clinical measurement instruments, and foundational laws of classical and modern physics.",
    sections: [
      {
        title: "Scientific & Clinical Instruments",
        points: [
          "• **Sphygmomanometer**: Measures arterial blood pressure in mmHg using an inflatable cuff and stethoscope (normal resting: 120/80 mmHg).",
          "• **Barometer**: Invented by Torricelli (1643). Measures atmospheric air pressure (760 mmHg at sea level). A sudden drop signals a cyclone storm.",
          "• **Hydrometer vs Hygrometer**: A **Hydrometer** measures the relative density of liquids; a **Hygrometer** measures atmospheric humidity and moisture.",
          "• **Lactometer**: Measures milk density based on floatation buoyancy to detect water adulteration.",
          "• **Pyrometer**: Non-contact radiation thermometer that measures extremely high temperatures (above 1,500°C) inside blast furnaces or on the Sun's surface.",
          "• **Seismograph**: Detects and records earthquake seismic shockwaves; magnitude is quantified on the logarithmic Richter Scale.",
          "• **Fathometer**: Employs ultrasonic sonar echo-sounding to gauge the depth of the ocean floor."
        ],
        table: {
          head: ["Instrument", "Physical Quantity Measured", "Operating Principle", "Real-World Application"],
          rows: [
            ["Sphygmomanometer", "Blood Pressure (systolic/diastolic)", "Hydraulic occlusion of brachial artery", "Clinical diagnosis of hypertension and hypotension"],
            ["Barometer", "Atmospheric air pressure", "Torricellian vacuum supports mercury column", "Meteorological weather forecasting (storm detection)"],
            ["Lactometer", "Purity and density of milk", "Archimedes' floatation principle", "Dairy testing to detect illegal water dilution"],
            ["Hygrometer", "Relative humidity of ambient air", "Moisture absorption / wet-and-dry bulb", "Weather stations, greenhouse agriculture, server rooms"],
            ["Hydrometer", "Specific gravity / liquid density", "Archimedes' principle of buoyancy", "Testing battery electrolyte acid and brewing fluids"],
            ["Anemometer", "Wind speed and velocity", "Rotating aerodynamic cups or vanes", "Aviation runways, wind farms, weather observation"],
            ["Altimeter", "Altitude above sea level", "Pressure gradient decrease with elevation", "Aircraft cockpit navigation and mountaineering"],
            ["Pyrometer", "Extremely high temperatures (>1,500°C)", "Stefan-Boltzmann thermal radiation laws", "Blast furnaces, glass kilns, solar surface physics"],
            ["Seismograph", "Earthquake seismic tremors", "Inertial pendulum mass records ground waves", "Earthquake monitoring, tsunami early warning systems"],
            ["Fathometer", "Depth of the ocean floor", "Ultrasonic acoustic sound pulse reflection (sonar)", "Navigational sea charts and naval submarine safety"],
            ["Galvanometer", "Presence of tiny electric currents", "Deflection in magnetic field (Lorentz force)", "Bridge circuits and sensitive laboratory detection"],
            ["Ammeter", "Electric current in amperes", "Connected in series; very low resistance", "Measuring circuit current flow in electronics"],
            ["Voltmeter", "Potential difference in volts", "Connected in parallel; very high resistance", "Testing voltage across battery terminals and loads"],
            ["Endoscope", "Interior visual of internal organs", "Total Internal Reflection through optical fibers", "Minimally invasive diagnostic surgery and endoscopy"]
          ]
        },
        tip: "Rule of Thumb: An Ammeter connects in SERIES and has near-zero resistance; a Voltmeter connects in PARALLEL and has near-infinite resistance."
      },
      {
        title: "Standard International (SI) Units",
        points: [
          "• **7 Base Units**: Length (Metre, m), Mass (Kilogram, kg), Time (Second, s), Electric Current (Ampere, A), Temperature (Kelvin, K), Amount of Substance (Mole, mol), Luminous Intensity (Candela, cd).",
          "• **Astronomical Units**: **Light-Year** is a unit of astronomical distance (~9.46 × 10¹² km), NOT time! **Parsec** is the largest practical astronomical unit (~3.26 light-years). **Astronomical Unit (AU)** is the mean Earth-Sun distance (~150 million km).",
          "• **Subatomic Units**: **Fermi (femtometre)** = 10⁻¹⁵ m (nuclear size); **Angstrom (Å)** = 10⁻¹⁰ m (atomic radii).",
          "• **Power & Pressure**: 1 mechanical Horsepower (hp) = **746 Watts**. Standard atmospheric pressure (1 atm) = **101,325 Pascals (N/m²)** = 760 Torr."
        ],
        table: {
          head: ["Physical Quantity", "Official SI Unit", "Symbol", "Definition / Fundamental Equivalence"],
          rows: [
            ["Length", "Metre", "m", "Distance light travels in vacuum in 1/299,792,458 second"],
            ["Mass", "Kilogram", "kg", "Defined via Planck's constant (h = 6.62607015 × 10⁻³⁴ J·s)"],
            ["Time", "Second", "s", "Duration of 9,192,631,770 periods of Cesium-133 radiation"],
            ["Electric Current", "Ampere", "A", "Defined by elementary electron charge (e = 1.602 × 10⁻¹⁹ C)"],
            ["Thermodynamic Temp", "Kelvin", "K", "Absolute zero is 0 K (−273.15°C); water freezes at 273.15 K"],
            ["Luminous Intensity", "Candela", "cd", "Luminous intensity of a monochromatic 540 × 10¹² Hz source"],
            ["Force", "Newton", "N", "1 N = 1 kg · m / s² (force accelerating 1 kg at 1 m/s²)"],
            ["Work & Energy", "Joule", "J", "1 J = 1 N · m = 1 kg · m² / s²"],
            ["Power", "Watt", "W", "1 W = 1 J / s (rate of energy transfer; 1 hp = 746 W)"],
            ["Pressure", "Pascal", "Pa", "1 Pa = 1 N / m² (1 atm = 101,325 Pa = 760 mmHg)"],
            ["Electric Resistance", "Ohm", "Ω", "1 Ω = 1 V / A (opposition offered to current flow)"],
            ["Electric Capacitance", "Farad", "F", "1 F = 1 Coulomb / Volt (charge storage capacity)"],
            ["Magnetic Flux Density", "Tesla", "T", "1 T = 1 Weber / m² (1 Tesla = 10,000 Gauss)"],
            ["Frequency", "Hertz", "Hz", "1 Hz = 1 cycle per second (s⁻¹)"],
            ["Radioactivity", "Becquerel", "Bq", "1 Bq = 1 nuclear disintegration per second"]
          ]
        },
        tip: "Exam Classic: A 'Light-Year' is a measure of astronomical DISTANCE, not time! (Distance traversed by a photon in one year = ~9.46 trillion km)."
      },
      {
        title: "Fundamental Physical Laws Explained",
        points: [
          "• **Newton's First Law (Law of Inertia)**: A body remains at rest or in uniform straight motion unless compelled by a net external force. Explains why bus passengers lurch forward upon sudden braking.",
          "• **Newton's Second Law (F = ma)**: The rate of change of momentum is proportional to the applied force. Explains why a cricket fielder pulls his hands backward to increase catching time and soften impact.",
          "• **Newton's Third Law (Action-Reaction)**: For every action, there is an equal and opposite reaction. Powers rocket propulsion and firearm recoil.",
          "• **Pascal's Law**: Pressure applied to an enclosed liquid is transmitted undiminished in all directions. Drives hydraulic car brakes and hydraulic jacks.",
          "• **Bernoulli's Principle**: As fluid velocity increases, internal static fluid pressure decreases. Explains the aerodynamic upward lift on curved airplane wings and the suction of perfume atomizers.",
          "• **Archimedes' Principle**: A body submerged in a fluid experiences an upward buoyant force equal to the weight of fluid it displaces. Explains why a giant hollow steel ship floats."
        ],
        table: {
          head: ["Physical Law", "Formulated By", "Core Scientific Principle", "Everyday Life Example"],
          rows: [
            ["Law of Inertia", "Sir Isaac Newton", "Objects resist changes in velocity (F_net = 0)", "Passengers jerk forward when bus suddenly brakes"],
            ["Law of Momentum", "Sir Isaac Newton", "F = dp/dt = ma (force equals mass × acceleration)", "Cricket fielder pulls hands back to cushion hard catch"],
            ["Action & Reaction", "Sir Isaac Newton", "Every action produces an equal & opposite reaction", "Rocket exhaust fires downward to push rocket upward"],
            ["Pascal's Law", "Blaise Pascal", "Enclosed fluid transmits pressure equally everywhere", "Hydraulic car lifting jacks and automotive brakes"],
            ["Bernoulli's Principle", "Daniel Bernoulli", "Faster fluid speed produces lower static pressure", "Airplane wing lift; perfume atomizer; swing bowling"],
            ["Archimedes' Principle", "Archimedes", "Upward buoyant force equals weight of displaced fluid", "Hollow steel ships floating; hydrometer floating"],
            ["Ohm's Law", "Georg Simon Ohm", "Current is directly proportional to voltage (V = IR)", "Electrical resistor circuits at constant temperature"],
            ["Joule's Heating Law", "James Prescott Joule", "Heat generated is proportional to current squared (H=I²Rt)", "Electric room heaters, toasters, and fuse wires"],
            ["Electromagnetic Induction", "Michael Faraday", "Changing magnetic flux induces voltage (EMF)", "Electric power generators and electrical transformers"]
          ]
        },
        tip: "Physics Fact: On the Moon, acceleration due to gravity is 1/6th of Earth's (~1.62 m/s²). Your mass remains identical, but your scale weight drops to 1/6th!"
      }
    ],
    keyTerms: [
      { term: "Escape Velocity", meaning: "The minimum speed an object must achieve to break free from a celestial body's gravitational pull (11.2 km/s on Earth; 2.38 km/s on Moon)." },
      { term: "Parsec", meaning: "A unit of astronomical distance equal to about 3.26 light-years or 30.8 trillion kilometers, defined by stellar parallax." },
      { term: "Doppler Effect", meaning: "The apparent shift in observed wave frequency caused by relative motion between the source and observer (e.g. pitch of approaching siren)." },
      { term: "Tyndall Effect", meaning: "The visible scattering of a light beam by colloidal particles in a fine suspension (e.g. sunlight through dusty air)." }
    ],
    examTips: [
      "1 Horsepower (hp) is exactly 746 Watts.",
      "Acceleration due to gravity (g) is maximum at the Poles and minimum at the Equator.",
      "At the center of the Earth, acceleration due to gravity is exactly zero.",
      "The SI unit of temperature is Kelvin (K), not Celsius."
    ]
  },

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* CHAPTER 5: HUMAN BODY ANATOMY, VITALS & BLOOD TRANSFUSION                */
  /* ═════════════════════════════════════════════════════════════════════════ */
  {
    id: "note-gen-5",
    classLevel: "general",
    chapterNo: 5,
    title: "Human Body Anatomy, Vitals & Blood Transfusion",
    unit: U_BIO,
    overview:
      "A complete medical breakdown of the human body: universal blood donor and recipient rules, organ systems, hormonal endocrine glands, vital clinical signs, and anatomical records.",
    sections: [
      {
        title: "Blood Groups, Antigens & Transfusion Rules",
        points: [
          "• **ABO System**: Discovered by Karl Landsteiner in 1900 (1930 Nobel Prize). Determined by carbohydrate antigens (A and B) on RBC surfaces and antibodies in plasma.",
          "• **Universal Donor (O Negative, O−)**: O− red blood cells have zero A antigens, zero B antigens, and zero Rh(D) antigens. Any emergency patient can receive O− blood without immediate hemolysis.",
          "• **Universal Recipient (AB Positive, AB+)**: AB+ individuals possess all three antigens (A, B, and Rh) and produce no antibodies in plasma. They can safely receive blood of any ABO/Rh type.",
          "• **Rh Factor**: Discovered by Landsteiner and Wiener in 1940 using Rhesus macaque monkeys. If an Rh− mother carries an Rh+ fetus, maternal antibodies can attack fetal RBCs in subsequent pregnancies (**Erythroblastosis Fetalis**)."
        ],
        table: {
          head: ["Blood Group", "Antigens on Red Cells", "Antibodies in Blood Plasma", "Can Safely Donate Blood To", "Can Safely Receive Blood From"],
          rows: [
            ["O Negative (O−)", "None (no A, B, or Rh)", "Anti-A, Anti-B, and Anti-Rh", "UNIVERSAL DONOR (All groups)", "O Negative only"],
            ["O Positive (O+)", "Rh antigen only", "Anti-A and Anti-B", "O+, A+, B+, AB+", "O+, O−"],
            ["A Negative (A−)", "A antigen only", "Anti-B and Anti-Rh", "A−, A+, AB−, AB+", "A−, O−"],
            ["A Positive (A+)", "A and Rh antigens", "Anti-B only", "A+, AB+", "A+, A−, O+, O−"],
            ["B Negative (B−)", "B antigen only", "Anti-A and Anti-Rh", "B−, B+, AB−, AB+", "B−, O−"],
            ["B Positive (B+)", "B and Rh antigens", "Anti-A only", "B+, AB+", "B+, B−, O+, O−"],
            ["AB Negative (AB−)", "A and B antigens", "Anti-Rh only", "AB−, AB+", "AB−, A−, B−, O−"],
            ["AB Positive (AB+)", "A, B, and Rh antigens", "NONE (no antibodies in plasma)", "AB+ only", "UNIVERSAL RECIPIENT (All groups)"]
          ]
        },
        tip: "Transfusion Rule: Universal Red Cell Donor = O Negative (O−); Universal Red Cell Recipient = AB Positive (AB+)."
      },
      {
        title: "Human Organ Systems & Major Endocrine Glands",
        points: [
          "• **Master Gland (Pituitary)**: Located in the brain sella turcica. Secretes growth hormone (GH), thyroid-stimulating hormone (TSH), and ACTH.",
          "• **Thyroid Gland**: Butterfly-shaped gland in the neck. Requires iodine to produce Thyroxine (T₄), governing basal metabolic rate (BMR).",
          "• **Pancreas**: Dual endocrine/exocrine gland. Beta cells secrete **Insulin** (lowers blood glucose); Alpha cells secrete **Glucagon** (raises blood glucose).",
          "• **Adrenal Gland**: Perched atop the kidneys. Secretes **Adrenaline (Epinephrine)**, the 'fight-or-flight' emergency hormone.",
          "• **Cornea of Eye**: Only human tissue with zero blood vessels (absorbs oxygen directly from air), allowing corneal transplants without immune rejection."
        ],
        table: {
          head: ["Gland / Organ", "Hormones / Secretions", "Location in Body", "Key Physiological Function"],
          rows: [
            ["Pituitary Gland", "GH, TSH, ACTH, ADH, Oxytocin", "Base of brain (sella turcica)", "'Master Gland': controls and stimulates other endocrine organs"],
            ["Thyroid Gland", "Thyroxine (T₄) and Calcitonin", "Front of neck (butterfly shape)", "Regulates cellular basal metabolic rate; requires dietary iodine"],
            ["Pancreas (Beta Cells)", "Insulin", "Behind stomach", "Lowers blood glucose by driving cellular uptake; deficiency causes Diabetes"],
            ["Pancreas (Alpha Cells)", "Glucagon", "Behind stomach", "Raises blood sugar during fasting by breaking down liver glycogen"],
            ["Adrenal Gland", "Adrenaline (Epinephrine)", "Top of each kidney (suprarenal)", "'Fight-or-Flight' hormone: spikes pulse rate, BP, and alertness"],
            ["Pineal Gland", "Melatonin", "Deep center of brain", "'Third Eye': regulates 24-hour circadian sleep-wake cycles in darkness"],
            ["Liver", "Bile juice, urea synthesis", "Upper right abdominal cavity", "Largest internal organ; detoxifies chemicals, stores glycogen, makes bile"],
            ["Kidneys", "Urine, Renin, Erythropoietin", "Posterior abdominal wall", "Filters blood through ~1 million nephrons; maintains fluid balance"]
          ]
        },
        tip: "Memory Check: Skin is the largest organ overall; the Liver is the largest internal organ."
      },
      {
        title: "Human Anatomy Records & Normal Vitals",
        points: [
          "• **Adult Bones**: 206 bones in adults (infants born with ~300 that fuse).",
          "• **Smallest Bone**: Stapes in the middle ear (~3 mm); **Longest Bone**: Femur in thigh (~48 cm).",
          "• **Hardest Substance**: Tooth Enamel (96% mineral hydroxyapatite).",
          "• **Normal Blood Pressure**: 120/80 mmHg; **Resting Pulse**: ~72 beats/minute; **Body Temp**: 37°C / 98.6°F.",
          "• **RBC Lifespan**: ~120 days; recycled in Spleen ('Graveyard of RBCs')."
        ],
        table: {
          head: ["Anatomical Feature", "Record / Scientific Fact", "Normal Measurement / Value"],
          rows: [
            ["Largest Organ Overall", "Skin (Integumentary system)", "Area ~2 m², weighs ~4 kg"],
            ["Largest Internal Organ & Gland", "Liver", "Weighs about 1.5 kg; over 500 vital functions"],
            ["Smallest Bone", "Stapes (stirrup)", "In middle ear cavity (~3 mm long)"],
            ["Longest & Strongest Bone", "Femur (thigh bone)", "Measures ~48 cm; supports 30× body weight"],
            ["Hardest Substance", "Tooth Enamel", "96% mineral hydroxyapatite crystal (harder than bone)"],
            ["Total Adult Bones", "Skeleton", "206 bones (infants born with ~300)"],
            ["Kidney Filtering Units", "Nephrons", "Approx. 1 million per kidney (filters 180 L fluid/day)"],
            ["Natural Cardiac Pacemaker", "Sinoatrial Node (SA Node)", "Self-depolarizes in right atrium (~72 beats/min)"],
            ["Normal Body Temperature", "Oral / Core", "37.0°C / 98.6°F (regulated by Hypothalamus)"],
            ["Normal Resting Blood Pressure", "Arterial pressure", "120 mmHg (systolic) / 80 mmHg (diastolic)"],
            ["Average Resting Heart Rate", "Pulse", "70 to 75 beats per minute (average ~72 bpm)"],
            ["Red Blood Cell Lifespan", "Erythrocytes", "120 days (recycled in Spleen 'Graveyard of RBCs')"]
          ]
        },
        tip: "Anatomy Quick: The SA Node in the heart is the 'natural pacemaker' (generates 72 beats/min)."
      }
    ],
    keyTerms: [
      { term: "Universal Donor", meaning: "A person with blood group O Negative (O−) whose red blood cells lack A, B, and Rh antigens, making their blood safe for any emergency patient." },
      { term: "Nephron", meaning: "The microscopic functional filtering unit inside the kidney that cleanses blood of waste products and produces urine." },
      { term: "Insulin", meaning: "The pancreatic beta-cell hormone that facilitates glucose uptake into cells, keeping blood sugar within normal limits." },
      { term: "Spleen", meaning: "The lymphoid organ adjacent to the stomach that filters blood, stores platelets, and recycles old red blood cells." }
    ],
    examTips: [
      "Universal Donor = O Negative (O−). Universal Recipient = AB Positive (AB+).",
      "Corneal transplants succeed without immunosuppressive drugs because the cornea is completely avascular (has no blood vessels).",
      "The stapes bone in the human middle ear is the smallest bone in the entire body (~3 mm)."
    ]
  },

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* CHAPTER 6: EVERYDAY SCIENCE: WHY IT HAPPENS                               */
  /* ═════════════════════════════════════════════════════════════════════════ */
  {
    id: "note-gen-6",
    classLevel: "general",
    chapterNo: 6,
    title: "Everyday Science: Why It Happens",
    unit: U_NATURE,
    overview:
      "The scientific reasons behind everyday wonders: why the sky is blue, why ice floats, mirages on hot roads, rainbows, pressure cookers, and famous life-changing inventions.",
    sections: [
      {
        title: "Everyday Science Wonders Explained",
        points: [
          "• **Why is the Sky Blue?**: Sunlight is white light composed of all spectral colors. Nitrogen and oxygen gas molecules in the atmosphere scatter short blue wavelengths ~10 times more than red wavelengths (**Rayleigh Scattering**), making the daytime sky appear bright blue.",
          "• **Why are Sunsets and Danger Lights Red?**: At sunset, sunlight traverses a thick path through air; blue light is scattered away, leaving only the longest, least-scattered red wavelengths to reach our eyes. Danger lights are red because red light pierces through fog and dust with minimal scattering.",
          "• **Why Do Stars Twinkle, but Planets Don't?**: Distant stars appear as pinpoint light beams that constantly bend through turbulent swirling air layers of varying temperatures (**Atmospheric Refraction**). Closer planets appear as larger discs whose fluctuations cancel out to a steady shine.",
          "• **Why Does Ice Float on Water?**: Water displays **Anomalous Expansion**, reaching maximum density at 4°C. As it freezes from 4°C to 0°C, hydrogen bonds form a spacious open cage crystal lattice, making ice less dense (~0.92 g/cm³) than liquid water. This floating ice sheet insulates pond bottoms at 4°C, keeping fish alive in winter.",
          "• **Why Does Food Cook Faster in a Pressure Cooker?**: Locked steam raises internal pressure to 2 atmospheres, elevating the boiling point of water from 100°C to ~120°C. The hotter water and steam cook pulses and meats in a fraction of the time.",
          "• **What Causes a Mirage on a Hot Road?**: Scorching asphalt heats the air directly touching it. Sky light rays passing from cooler dense air into hot rare air bend continuously until **Total Internal Reflection (TIR)** bounces them upward, appearing like a puddle reflecting the sky.",
          "• **How Does a Rainbow Form?**: Raindrops act as tiny prisms. Sunlight entering a raindrop undergoes **Refraction**, **Dispersion** (splitting into VIBGYOR), and **Internal Reflection**, projecting a colorful circular arc with red on the outside (42°) and violet inside (40°).",
          "• **Why Can't Sound Travel in Space?**: Sound is a mechanical longitudinal wave requiring physical matter (air, water, solids) to vibrate. Space is a vacuum; astronauts use electromagnetic radio headsets."
        ],
        table: {
          head: ["Everyday Phenomenon", "Core Scientific Principle", "Real-World Manifestation"],
          rows: [
            ["Blue Daytime Sky", "Rayleigh Scattering: Blue light scatters 10× more than red", "Daytime sky looks blue; pitch-black in airless space"],
            ["Red Sunset & Danger Lights", "Red light has longest wavelength and scatters least", "Sunset horizon is deep red; vehicle brake lights pierce fog"],
            ["Twinkling of Stars", "Atmospheric Refraction through shifting air layers", "Distant pinpoint stars twinkle; closer planets shine steadily"],
            ["Ice Floats on Water", "Anomalous expansion: water is densest at 4°C; ice is lighter", "Icebergs float; lake bottoms stay liquid at 4°C for fish"],
            ["Pressure Cooker", "Higher internal steam pressure raises boiling point to 120°C", "Dal and rice cook in 10 minutes instead of 40"],
            ["Mirage on Hot Roads", "Total Internal Reflection through hot air ground layers", "Apparent shimmer of water puddles on dry summer highway"],
            ["Rainbow Formation", "Refraction, Dispersion, and Internal Reflection in raindrops", "7-color circular arc in sky when Sun is directly behind you"],
            ["Silence in Space", "Sound is a mechanical wave requiring a material medium", "No sound in space; astronauts communicate via radio headsets"]
          ]
        },
        tip: "Space Fact: On the Moon, because there is no air atmosphere to scatter sunlight, the sky is completely pitch-black even in broad daylight, and stars are visible next to the Sun!"
      },
      {
        title: "Famous Inventions & Scientific Discoveries",
        points: [
          "• **First Vaccine (Smallpox, 1796)**: Edward Jenner noticed milkmaids exposed to mild cowpox were immune to smallpox, founding the science of vaccination.",
          "• **Discovery of the Cell (1665)**: Robert Hooke observed honeycomb structures in bottle cork and coined the term 'Cell'. Antonie van Leeuwenhoek (1674) first saw living bacteria in water.",
          "• **X-Rays (1895)**: Discovered by Wilhelm Röntgen, enabling non-invasive medical imaging of broken bones (first Nobel Prize in Physics, 1901).",
          "• **Radioactivity (1898)**: Discovered by Henri Becquerel and Marie Curie. Marie Curie is the only scientist to win Nobel Prizes in both Physics and Chemistry.",
          "• **Penicillin (1928)**: Sir Alexander Fleming discovered that green mould (*Penicillium notatum*) killed bacterial cultures, inaugurating the antibiotic era.",
          "• **DNA Double Helix (1953)**: James Watson, Francis Crick, and Rosalind Franklin solved the molecular double helix code of life."
        ],
        table: {
          head: ["Discovery / Invention", "Pioneering Scientist", "Year", "Global Historical Impact"],
          rows: [
            ["First Vaccine (Smallpox)", "Edward Jenner", "1796", "Founded immunization; smallpox completely eradicated worldwide"],
            ["Cell Discovery", "Robert Hooke", "1665", "Named the basic structural and functional unit of life"],
            ["Living Bacteria", "Antonie van Leeuwenhoek", "1674", "First human to observe swimming microorganisms under microscope"],
            ["X-Rays", "Wilhelm Röntgen", "1895", "First medical imaging of human skeleton (1901 Physics Nobel)"],
            ["Radium & Radioactivity", "Marie & Pierre Curie", "1898", "Radiation cancer therapy; Marie Curie won 2 Nobel Prizes"],
            ["Penicillin (First Antibiotic)", "Sir Alexander Fleming", "1928", "Cured fatal bacterial infections, saving hundreds of millions"],
            ["DNA Double Helix", "Watson, Crick & Franklin", "1953", "Decoded genetic blueprint and molecular biology of all life"],
            ["Dynamite", "Alfred Nobel", "1867", "Stabilized nitroglycerin; established annual Nobel Prizes in 1895"]
          ]
        },
        tip: "Inspiring Record: Marie Curie won the Nobel Prize in Physics (1903) for radioactivity, and then the Nobel Prize in Chemistry (1911) for discovering Radium and Polonium."
      }
    ],
    keyTerms: [
      { term: "Rayleigh Scattering", meaning: "The scattering of light by air molecules, which scatters short blue wavelengths 10 times more than long red wavelengths." },
      { term: "Total Internal Reflection", meaning: "When light travelling from a denser to rarer medium strikes at an angle greater than the critical angle, completely reflecting back like a mirror." },
      { term: "Anomalous Expansion", meaning: "The unique property of water expanding as it cools from 4°C to 0°C, making solid ice lighter and buoyant on liquid water." },
      { term: "Penicillin", meaning: "The first antibiotic discovered from mold by Sir Alexander Fleming in 1928 that revolutionized modern medicine." }
    ],
    examTips: [
      "Danger signals are red because red light has the longest visible wavelength and scatters least in fog and smoke.",
      "Water reaches its maximum density at exactly 4°C.",
      "National Science Day in India is celebrated on February 28 to commemorate Sir C.V. Raman's discovery of the Raman Effect in 1928."
    ]
  },

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* CHAPTER 7: SPACE SCIENCE, SOLAR SYSTEM & ISRO MISSIONS                    */
  /* ═════════════════════════════════════════════════════════════════════════ */
  {
    id: "note-gen-7",
    classLevel: "general",
    chapterNo: 7,
    title: "Space Science, Solar System & ISRO Missions",
    unit: U_SPACE,
    overview:
      "A complete guide to the Solar System, planets, extreme moons, and India's landmark space achievements (Chandrayaan-1/2/3, Mangalyaan, Aditya-L1, Gaganyaan, and spaceports).",
    sections: [
      {
        title: "The Solar System: Sun & The 8 Planets",
        points: [
          "• **The Sun**: Contains 99.86% of the Solar System's total mass. Powered by nuclear fusion of hydrogen into helium at 15 million °C.",
          "• **Mercury**: Closest planet to the Sun; fastest orbital revolution (88 days); zero atmosphere and extreme temperature swings (−180°C to 430°C).",
          "• **Venus (Earth's Twin / Morning Star)**: Hottest planet (~465°C) due to runaway CO₂ greenhouse effect; rotates backwards (retrograde: East to West); a day on Venus is longer than its year!",
          "• **Mars (The Red Planet)**: Red due to iron oxide rust; hosts Olympus Mons (tallest volcano in Solar System, ~22 km) and two tiny moons: Phobos and Deimos.",
          "• **Jupiter**: Largest planet (1,300 Earths volume); famous 300-year-old Great Red Spot anticyclone; Ganymede is the largest moon in the Solar System.",
          "• **Saturn**: Spectacular ring system of ice chunks; lowest density of all planets (0.687 g/cm³ - would float in a giant ocean!); moon Titan has liquid methane lakes.",
          "• **Uranus**: Rotates on its side with an axial tilt of 98°; pale cyan color from methane gas.",
          "• **Neptune**: Windiest planet (supersonic winds up to 2,100 km/h); longest orbit (~165 Earth years)."
        ],
        table: {
          head: ["Planet", "Category", "Orbital Period / Rotation", "Extreme Record", "Daily Science Significance"],
          rows: [
            ["Mercury", "Terrestrial Rocky", "88 Earth days (fastest orbit)", "Shortest year; greatest temperature swing", "Closest planet to Sun; zero atmosphere"],
            ["Venus", "Terrestrial Rocky", "225 days orbit; 243 days day", "Hottest planet in Solar System (~465°C)", "Runaway CO₂ greenhouse effect; rotates East to West"],
            ["Earth", "Terrestrial Rocky", "365.25 days orbit; 24 hours day", "Only known world with liquid oceans & life", "Atmosphere: 78% N₂, 21% O₂; 23.5° axial tilt causes seasons"],
            ["Mars", "Terrestrial Rocky", "687 Earth days; 24.6 hours day", "Tallest volcano (Olympus Mons, ~22 km)", "Iron oxide surface rust; two moons (Phobos & Deimos)"],
            ["Jupiter", "Gas Giant", "11.86 Earth years; 9.9 hours day", "Largest planet; Great Red Spot storm", "Massive magnetosphere; Ganymede largest moon"],
            ["Saturn", "Gas Giant", "29.45 Earth years; 10.7 hours day", "Lowest density (0.687 g/cm³ - floats on water)", "Spectacular ice rings; Titan has liquid methane lakes"],
            ["Uranus", "Ice Giant", "84 Earth years; 17.2 hours day", "Tilted on its side at 98° axial tilt", "Rolls around the Sun; pale cyan methane atmosphere"],
            ["Neptune", "Ice Giant", "164.8 Earth years; 16.1 hours day", "Windiest planet (supersonic 2,100 km/h)", "Farthest planet; moon Triton orbits backwards"]
          ]
        },
        tip: "Planetary Fact: Venus is hotter than Mercury despite being nearly twice as far from the Sun, because its 96% CO₂ atmosphere traps heat via runaway greenhouse effect."
      },
      {
        title: "ISRO Missions & Indian Space Milestones",
        points: [
          "• **Aryabhata (1975)**: India's first satellite, launched on April 19, 1975 from Kapustin Yar on a Soviet Kosmos-3M rocket.",
          "• **SLV-3 & Rohini (1980)**: Directed by Dr. A.P.J. Abdul Kalam; made India the 6th nation with independent orbital launch capability.",
          "• **Chandrayaan-1 (2008)**: Launched by PSLV-C11; detected and confirmed the presence of water molecules (H₂O / OH) on the Moon.",
          "• **Mangalyaan / MOM (2013-14)**: Mars Orbiter Mission entered Martian orbit on its maiden attempt at an ultra-frugal cost of $74 million.",
          "• **Chandrayaan-3 (August 23, 2023)**: Vikram lander made history by becoming the **first spacecraft to soft-land near the lunar South Pole**; landing site named **'Shiv Shakti Point'**; August 23 declared **National Space Day**.",
          "• **Aditya-L1 (2023)**: India's first solar space observatory, stationed at Sun-Earth Lagrange Point 1 (L1), 1.5 million km from Earth.",
          "• **Gaganyaan**: India's human spaceflight mission to send 3 astronauts to 400 km Low Earth Orbit; female AI humanoid robot **Vyommitra**."
        ],
        table: {
          head: ["Mission / Milestone", "Launch Date", "Launch Vehicle", "Key Scientific Achievement"],
          rows: [
            ["Aryabhata", "April 19, 1975", "Kosmos-3M (Soviet)", "India's first unmanned satellite; initiated Indian space era"],
            ["SLV-3 (Rohini RS-1)", "July 18, 1980", "SLV-3 (Dr. APJ Kalam)", "First successful indigenous launch vehicle into Earth orbit"],
            ["Chandrayaan-1", "Oct 22, 2008", "PSLV-C11", "First lunar probe; discovered water molecules across lunar soil"],
            ["Mangalyaan (MOM)", "Nov 5, 2013", "PSLV-C25", "First Asian nation to reach Mars; first in world on maiden attempt"],
            ["104 Satellites Launch", "Feb 15, 2017", "PSLV-C37", "Historic world record: deployed 104 satellites in a single mission"],
            ["Chandrayaan-3", "July 14, 2023", "LVM3-M4", "First soft landing at lunar South Pole (Aug 23 National Space Day)"],
            ["Aditya-L1", "Sept 2, 2023", "PSLV-C57", "India's 1st solar observatory at Lagrange L1 to study corona & flares"],
            ["Gaganyaan", "Upcoming (2025)", "Human-rated LVM3", "First Indian human spaceflight (3 astronauts to 400 km LEO)"]
          ]
        },
        tip: "Landing Sites on Moon: Chandrayaan-3 landing point = 'Shiv Shakti Point'; Chandrayaan-2 crash site = 'Tiranga Point'; Chandrayaan-1 impact point = 'Jawahar Point'."
      }
    ],
    keyTerms: [
      { term: "Lagrange Point 1 (L1)", meaning: "A gravitational equilibrium point between the Sun and Earth (~1.5 million km from Earth) where a satellite can orbit with an unobstructed, 24/7 view of the Sun." },
      { term: "Shiv Shakti Point", meaning: "The official name given to the landing site of ISRO's Chandrayaan-3 Vikram lander on the lunar South Pole." },
      { term: "Event Horizon", meaning: "The gravitational boundary of a Black Hole beyond which nothing, including light, can escape." },
      { term: "Tidal Locking", meaning: "When a moon's rotational period matches its orbital period, causing the same face to perpetually point toward the planet (e.g. Earth's Moon)." }
    ],
    examTips: [
      "August 23 is celebrated as National Space Day in India to commemorate Chandrayaan-3's lunar landing.",
      "The primary launch spaceport of ISRO is Satish Dhawan Space Centre (SDSC SHAR) in Sriharikota, Andhra Pradesh.",
      "Dr. Vikram Sarabhai is revered as the Father of the Indian Space Program."
    ]
  },

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* CHAPTER 8: METALS, ALLOYS, ORES & EVERYDAY POLYMERS                       */
  /* ═════════════════════════════════════════════════════════════════════════ */
  {
    id: "note-gen-8",
    classLevel: "general",
    chapterNo: 8,
    title: "Metals, Alloys, Ores & Everyday Polymers",
    unit: U_MATERIALS,
    overview:
      "An essential reference to everyday metallurgy: key alloys (brass, bronze, stainless steel, solder), major mineral ores (bauxite, hematite, cinnabar), metal records, and synthetic polymers (Teflon, Bakelite, PVC, Kevlar).",
    sections: [
      {
        title: "Everyday Alloys & Their Compositions",
        points: [
          "• **Alloy Definition**: A homogeneous mixture of two or more metals (or a metal and a non-metal) engineered to improve strength, hardness, and corrosion resistance.",
          "• **Brass (Cu + Zn)**: ~70% Copper and ~30% Zinc. Golden luster, malleable, sonorous; used for musical instruments and decorative plumbing fittings.",
          "• **Bronze (Cu + Sn)**: ~88% Copper and ~12% Tin. Harder than pure copper, seawater corrosion resistant; used for medals, statues, and ship propellers.",
          "• **German Silver (Cu + Zn + Ni)**: TRICK! Contains **ZERO Silver (0% Ag)**; named solely for its silvery appearance.",
          "• **Solder Wire (Pb + Sn)**: 50% Lead and 50% Tin. Low melting point (~183°C); used to join electrical wires and circuit boards.",
          "• **Stainless Steel (Fe + Cr + Ni)**: Iron alloyed with ~18% Chromium and ~8% Nickel. Chromium forms a self-healing Cr₂O₃ passive oxide film that prevents rust.",
          "• **Amalgam**: Any alloy containing **Mercury (Hg)**. Iron does NOT form an amalgam, so mercury is transported in heavy iron flasks."
        ],
        table: {
          head: ["Alloy Name", "Composition", "Key Physical Property", "Real-World Everyday Applications"],
          rows: [
            ["Brass", "Copper (Cu ~70%) + Zinc (Zn ~30%)", "Golden appearance, malleable, acoustic resonance", "Musical instruments, water taps, decorative door hardware"],
            ["Bronze", "Copper (Cu ~88%) + Tin (Sn ~12%)", "Hard, corrosion-resistant, low friction", "Statues, coins, Olympic medals, ship propellers, bells"],
            ["German Silver", "Copper (~50%) + Zinc (~30%) + Nickel (~20%)", "Silvery luster; CONTAINS ZERO SILVER (0% Ag)", "Imitation jewelry, decorative utensils, tableware"],
            ["Solder Wire", "Tin (Sn ~50%) + Lead (Pb ~50%)", "Low melting point (~183°C); rapid bonding", "Joining electronic copper wires and electrical fuses"],
            ["Stainless Steel", "Iron (Fe) + Chromium (Cr ~18%) + Nickel (Ni ~8%)", "Rust-proof via self-healing chromium oxide film", "Kitchen cookware, cutlery, surgical instruments"],
            ["Duralumin", "Aluminium (Al ~95%) + Copper (Cu ~4%) + Mg + Mn", "High strength-to-weight ratio; featherweight", "Aircraft airframes, racing car bodies, helicopter blades"],
            ["Alnico", "Aluminium (Al) + Nickel (Ni) + Cobalt (Co) + Iron", "Permanent magnetic strength & high coercivity", "Loudspeaker magnets, electric guitar pickups, sensors"],
            ["Nichrome", "Nickel (Ni ~80%) + Chromium (Cr ~20%)", "High electrical resistance; survives 1,200°C without oxidizing", "Heating coils in toasters, room heaters, electric irons"],
            ["22 Karat Gold", "Pure Gold (91.6%) + Copper/Silver (8.4%)", "Hallmark 916; hardened for jewelry durability", "Indian wedding jewelry, gold rings, bangles, necklaces"]
          ]
        },
        tip: "Exam Classic: German Silver contains ZERO percent silver! It is an alloy of Copper, Zinc, and Nickel."
      },
      {
        title: "Commercial Mineral Ores & Extractions",
        points: [
          "• **Bauxite (Al₂O₃ · 2H₂O)**: The primary commercial ore of **Aluminium**, extracted via the Hall-Héroult electrolytic process.",
          "• **Hematite (Fe₂O₃) & Magnetite (Fe₃O₄)**: Major ores of **Iron**, reduced with coke inside industrial blast furnaces.",
          "• **Cinnabar (HgS)**: Chief ore of **Mercury**; roasted in air to liberate mercury vapor.",
          "• **Galena (PbS)**: Chief mineral ore of **Lead**.",
          "• **Pitchblende (U₃O₈)**: Chief radioactive ore of **Uranium** and Radium.",
          "• **Monazite Sand**: Plentiful on the coastal beaches of Kerala, India; world's richest deposit of **Thorium**.",
          "• **Calamine (ZnCO₃)**: Natural ore of **Zinc**, historically used in soothing skin lotions."
        ],
        table: {
          head: ["Mineral Ore", "Chemical Formula", "Primary Metal Extracted", "Industrial & Geographical Significance"],
          rows: [
            ["Bauxite", "Al₂O₃ · 2H₂O", "Aluminium (Al)", "Primary ore refined into light metal for aircraft & cans (Odisha leads in India)"],
            ["Hematite", "Fe₂O₃", "Iron (Fe)", "Red iron ore; primary feedstock for blast furnaces producing steel"],
            ["Magnetite", "Fe₃O₄", "Iron (Fe)", "Black natural magnetic lodestone with the highest iron content (~72%)"],
            ["Cinnabar", "HgS", "Mercury (Hg)", "Scarlet mineral roasted to liberate liquid metallic mercury"],
            ["Galena", "PbS", "Lead (Pb)", "Dense cubic lead sulfide ore; often yields silver as a valuable byproduct"],
            ["Pitchblende", "U₃O₈ / UO₂", "Uranium (U)", "Radioactive ore from which Marie Curie discovered Radium; nuclear fuel"],
            ["Monazite Sand", "(Ce,La,Nd,Th)PO₄", "Thorium (Th)", "Vast beach placer deposits in Kerala, India; key for Stage 3 nuclear power"],
            ["Calamine", "ZnCO₃", "Zinc (Zn)", "Zinc carbonate ore; used in zinc smelting and calamine soothing lotions"]
          ]
        },
        tip: "India's Nuclear Advantage: India holds nearly 25% of the world's Thorium in Kerala's coastal monazite sands."
      },
      {
        title: "Everyday Polymers & Synthetic Materials",
        points: [
          "• **Teflon (PTFE)**: Polytetrafluoroethylene. Frictionless, heat-resistant non-stick coating for cookware.",
          "• **Bakelite**: Phenol-formaldehyde resin. World's first synthetic plastic (1907); thermosetting polymer used for electrical switches and saucepan handles because it never melts upon reheating.",
          "• **Vulcanization**: Heating natural rubber with **Sulfur** (Charles Goodyear, 1839) to introduce cross-links, preventing car tires from melting in heat or cracking in cold.",
          "• **PVC (Polyvinyl Chloride)**: Monomer vinyl chloride; used for water pipes, cable insulation, and raincoats.",
          "• **Nylon-6,6**: First fully synthetic textile fiber (1935); exceptional tensile tenacity for parachutes, ropes, and bristles.",
          "• **Kevlar**: Synthetic polyaramid fiber 5 times stronger than steel of equal weight; used in bulletproof vests and combat helmets."
        ],
        table: {
          head: ["Synthetic Material", "Chemical Class / Monomer", "Distinctive Property", "Everyday Life Uses"],
          rows: [
            ["Teflon", "Polytetrafluoroethylene (PTFE)", "Extremely non-stick, slippery, withstands 260°C", "Non-stick frying pans, plumbing tape, waterproof gear"],
            ["Bakelite", "Phenol-Formaldehyde thermoset", "Heat & electrical insulator; does not melt on heating", "Electrical wall switches, saucepan handles, billiard balls"],
            ["Vulcanized Rubber", "Polyisoprene cross-linked with Sulfur", "Resilient elasticity, abrasion & temperature resistant", "Automobile tires, shoe soles, rubber conveyor belts"],
            ["PVC", "Polyvinyl Chloride (vinyl chloride)", "Rigid, waterproof, flame-retardant, cheap", "Plumbing drainage pipes, electrical wire sheathing, raincoats"],
            ["Nylon-6,6", "Polyamide (Adipic acid + HMD)", "High tensile strength, elasticity, abrasion resistant", "Toothbrush bristles, parachutes, climbing ropes, stockings"],
            ["Rayon", "Regenerated Cellulose (semi-synthetic)", "'Artificial Silk': soft, lustrous, highly absorbent", "Summer clothing, bedsheets, medical gauze bandages"],
            ["Kevlar", "Poly-paraphenylene terephthalamide", "5× stronger than steel per weight; absorbs impact", "Bulletproof body armor vests, combat helmets, racing tires"],
            ["PET", "Polyethylene Terephthalate", "Clear, shatterproof, gas-impermeable, recyclable", "Transparent soda bottles (code 1), polyester fleece jackets"]
          ]
        },
        tip: "Polymer Difference: Thermoplastics (like PVC and Polythene) melt when heated and can be remolded; Thermosetting plastics (like Bakelite) set permanently and never melt upon reheating."
      }
    ],
    keyTerms: [
      { term: "Amalgam", meaning: "An alloy formed by dissolving any other metal into liquid Mercury (e.g. silver dental filling amalgam)." },
      { term: "Galvanization", meaning: "The process of applying a protective sacrificial Zinc coating to iron or steel to prevent atmospheric rusting." },
      { term: "Vulcanization", meaning: "The chemical process of heating natural latex rubber with sulfur to cross-link polymer chains and enhance durability." },
      { term: "Thermosetting Plastic", meaning: "A polymer (such as Bakelite) that cross-links irreversibly upon heating and cannot be softened or remolded again." }
    ],
    examTips: [
      "Gold is the most malleable and ductile metal known (1 g can make a 2 km wire).",
      "Silver is the best conductor of electricity and heat of all known metals.",
      "Mercury is the only metal that is liquid at room temperature; Bromine is the only liquid non-metal.",
      "Teflon is chemically Polytetrafluoroethylene (PTFE)."
    ]
  }
];
