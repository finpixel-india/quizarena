"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  Apple,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Droplet,
  ExternalLink,
  Flame,
  FlaskConical,
  Heart,
  HelpCircle,
  Info,
  Layers,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  LucideIcon,
  Moon,
  Orbit,
  Rocket,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Table as TableIcon,
  Thermometer,
  Zap,
} from "lucide-react";
import type { NoteChapter } from "@/data/notes";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";
import { GeneralSciencePracticeArena } from "./GeneralSciencePracticeArena";

/* -------------------------------------------------------------------------- */
/*                               DATA INTERFACES                              */
/* -------------------------------------------------------------------------- */

interface VitaminRow {
  name: string;
  chemicalName: string;
  type: "Fat-Soluble" | "Water-Soluble" | "Essential Mineral";
  icon: string;
  sources: string[];
  benefit: string;
  deficiency: string;
}

interface DiseaseRow {
  name: string;
  pathogen: string;
  category: "Bacterial" | "Viral" | "Mosquito / Parasitic" | "Fungal & Lifestyle";
  icon: string;
  spread: string;
  symptoms: string[];
  prevention: string;
}

interface PHRow {
  name: string;
  ph: string;
  phValue: number;
  category: "Strong Acid" | "Mild Acid" | "Pure Neutral" | "Near Neutral" | "Mild Alkaline" | "Strong Alkaline";
  icon: string;
  fact: string;
}

interface ChemicalRow {
  commonName: string;
  chemicalName: string;
  formula: string;
  icon: string;
  uses: string;
}

interface NaturalAcidRow {
  source: string;
  acid: string;
  icon: string;
  fact: string;
}

interface InstrumentRow {
  name: string;
  measures: string;
  category: "Medical & Health" | "Weather & Nature" | "Physics & Aviation";
  icon: string;
  principle: string;
}

interface SIUnitRow {
  quantity: string;
  unit: string;
  symbol: string;
  example: string;
}

interface BodyRecordRow {
  metric: string;
  value: string;
  category: string;
  icon: string;
  detail: string;
}

interface BloodCompatibilityRow {
  group: string;
  antigens: string;
  antibodies: string;
  canGive: string;
  canTake: string;
  note: string;
  highlight?: "donor" | "recipient";
}

interface PhenomenonRow {
  question: string;
  law: string;
  icon: string;
  shortAnswer: string;
  fullReason: string;
  realLife: string;
}

interface PlanetRow {
  name: string;
  category: "Terrestrial Rocky" | "Gas Giant" | "Ice Giant";
  icon: string;
  orbitPeriod: string;
  dayLength: string;
  recordFact: string;
  significance: string;
}

interface ISROMissionRow {
  mission: string;
  year: string;
  rocket: string;
  icon: string;
  achievement: string;
  significance: string;
}

interface CelestialMoonRow {
  name: string;
  host: string;
  icon: string;
  diameter: string;
  feature: string;
}

interface AlloyRow {
  name: string;
  composition: string;
  icon: string;
  properties: string;
  uses: string;
}

interface OreRow {
  ore: string;
  formula: string;
  metal: string;
  icon: string;
  importance: string;
}

interface PolymerRow {
  name: string;
  chemicalName: string;
  icon: string;
  category: "Thermoplastic" | "Thermoset" | "Elastomer" | "Synthetic Fibre";
  properties: string;
  uses: string;
}

/* -------------------------------------------------------------------------- */
/*                               DATA SETS                                    */
/* -------------------------------------------------------------------------- */

const VITAMINS_DATA: VitaminRow[] = [
  {
    name: "Vitamin A",
    chemicalName: "Retinol / β-Carotene",
    type: "Fat-Soluble",
    icon: "🥕",
    sources: ["Carrots", "Sweet Potato", "Spinach (Palak)", "Papaya", "Egg Yolk", "Mango"],
    benefit: "Sharp night vision, healthy transparent cornea, glowing skin, and strong immunity.",
    deficiency: "Night Blindness (Nyctalopia — difficulty seeing in dim light), dry eyes (Xerophthalmia).",
  },
  {
    name: "Vitamin D",
    chemicalName: "Calciferol (The Sunshine Vitamin)",
    type: "Fat-Soluble",
    icon: "☀️",
    sources: ["Morning Sunlight", "Cow's Milk", "Egg Yolk", "Salmon & Tuna", "Mushrooms"],
    benefit: "Absorbs calcium & phosphorus to keep bones and teeth rock-hard.",
    deficiency: "Rickets in children (bowed legs, soft skull), Osteomalacia (weak fragile bones in adults).",
  },
  {
    name: "Vitamin E",
    chemicalName: "Tocopherol",
    type: "Fat-Soluble",
    icon: "🥑",
    sources: ["Almonds (Badam)", "Sunflower Seeds", "Peanuts", "Olive Oil", "Avocado"],
    benefit: "Premier antioxidant; shields cell membranes from damage, promotes radiant skin and fertility.",
    deficiency: "Muscle weakness, numbness in limbs, pale skin, hemolytic anemia.",
  },
  {
    name: "Vitamin K",
    chemicalName: "Phylloquinone",
    type: "Fat-Soluble",
    icon: "🥦",
    sources: ["Spinach", "Broccoli", "Cabbage", "Kale", "Mustard Greens (Sarson)", "Gut Bacteria"],
    benefit: "Mandatory for liver synthesis of prothrombin to stop bleeding after minor cuts.",
    deficiency: "Excessive uncontrolled bleeding from small cuts, frequent nosebleeds, easy bruising.",
  },
  {
    name: "Vitamin C",
    chemicalName: "Ascorbic Acid (Heat-Sensitive)",
    type: "Water-Soluble",
    icon: "🍋",
    sources: ["Amla (Gooseberry — #1 Source)", "Guava (Amrood)", "Lemon", "Orange", "Kiwi", "Green Chili"],
    benefit: "Supercharges immunity, synthesizes collagen for gums & skin, accelerates wound healing.",
    deficiency: "Scurvy: bleeding spongy gums, loose teeth, delayed wound healing, joint pain.",
  },
  {
    name: "Vitamin B₁",
    chemicalName: "Thiamine",
    type: "Water-Soluble",
    icon: "🌾",
    sources: ["Brown Rice (Unpolished)", "Whole Wheat", "Pulses & Lentils", "Peanuts", "Sunflower Seeds"],
    benefit: "Converts dietary carbohydrates into glucose energy; powers peripheral nerves.",
    deficiency: "Beriberi: severe leg weakness, nerve pain, loss of appetite, cardiac enlargement.",
  },
  {
    name: "Vitamin B₂",
    chemicalName: "Riboflavin",
    type: "Water-Soluble",
    icon: "🥛",
    sources: ["Cow's Milk", "Curd (Dahi)", "Eggs", "Green Leafy Vegetables", "Almonds"],
    benefit: "Powers cellular energy release; maintains healthy mucous membranes and cornea.",
    deficiency: "Cheilosis: painful cracks and splits at the corners of the mouth; swollen magenta tongue.",
  },
  {
    name: "Vitamin B₃",
    chemicalName: "Niacin",
    type: "Water-Soluble",
    icon: "🥜",
    sources: ["Roasted Peanuts", "Mushrooms", "Chicken", "Whole Grains", "Green Peas"],
    benefit: "Governs cellular respiration (NAD/NADP), digestive function, and brain clarity.",
    deficiency: "Pellagra: the classic 4 D's — Dermatitis (scaly skin rash), Diarrhea, Dementia, Death.",
  },
  {
    name: "Vitamin B₅",
    chemicalName: "Pantothenic Acid",
    type: "Water-Soluble",
    icon: "🌻",
    sources: ["Sunflower Seeds", "Mushrooms", "Avocados", "Lentils", "Whole Wheat"],
    benefit: "Cofactor for Coenzyme A; powers fatty acid synthesis and cellular metabolism.",
    deficiency: "Fatigue, irritability, sleep disturbances, 'burning feet syndrome'.",
  },
  {
    name: "Vitamin B₆",
    chemicalName: "Pyridoxine",
    type: "Water-Soluble",
    icon: "🍌",
    sources: ["Bananas", "Chickpeas (Chana)", "Potatoes", "Chicken Breast", "Oats"],
    benefit: "Manufactures neurotransmitters (serotonin, dopamine) and red cell hemoglobin.",
    deficiency: "Microcytic anemia, peripheral neuropathy, seizures, skin inflammation.",
  },
  {
    name: "Vitamin B₇",
    chemicalName: "Biotin",
    type: "Water-Soluble",
    icon: "🥚",
    sources: ["Egg Yolk", "Almonds", "Sweet Potatoes", "Oats", "Spinach"],
    benefit: "Stimulates keratin synthesis for strong hair and nails; converts fats into energy.",
    deficiency: "Hair thinning, brittle nails, scaly red dermatitis around eyes and mouth.",
  },
  {
    name: "Vitamin B₉",
    chemicalName: "Folic Acid / Folate",
    type: "Water-Soluble",
    icon: "🥬",
    sources: ["Spinach (Palak)", "Methi Leaves", "Lentils (Dal)", "Chickpeas", "Oranges"],
    benefit: "Essential for DNA synthesis and rapid cell division; crucial for fetal spinal cord development.",
    deficiency: "Megaloblastic anemia; severe neural tube birth defects (spina bifida) in newborns.",
  },
  {
    name: "Vitamin B₁₂",
    chemicalName: "Cobalamin (Contains Cobalt Metal)",
    type: "Water-Soluble",
    icon: "🧀",
    sources: ["Milk & Paneer", "Curd (Yogurt)", "Eggs", "Fish", "Zero in plant foods"],
    benefit: "Maintains myelin sheath around nerves; synthesizes red blood cells with bone marrow.",
    deficiency: "Pernicious Anemia, numbness and pins-and-needles in hands/feet, memory loss.",
  },
  {
    name: "Iron",
    chemicalName: "Ferrum (Fe)",
    type: "Essential Mineral",
    icon: "🩸",
    sources: ["Spinach", "Jaggery (Gur)", "Beetroot", "Pomegranate", "Lentils", "Dates"],
    benefit: "Central atom of Hemoglobin in red blood cells that transports oxygen to muscles.",
    deficiency: "Iron Deficiency Anemia: persistent fatigue, pale skin, shortness of breath, spoon nails.",
  },
  {
    name: "Calcium",
    chemicalName: "Calcium (Ca)",
    type: "Essential Mineral",
    icon: "🦴",
    sources: ["Cow's Milk", "Curd", "Ragi (Finger Millet)", "Sesame Seeds (Til)", "Paneer"],
    benefit: "Constructs dense bone matrix and tooth enamel; facilitates muscle and heart contractions.",
    deficiency: "Osteoporosis (brittle porous bones in seniors), tooth decay, painful muscle cramps.",
  },
  {
    name: "Iodine",
    chemicalName: "Iodine (I)",
    type: "Essential Mineral",
    icon: "🧂",
    sources: ["Iodized Table Salt", "Marine Fish", "Kelp Seaweed", "Dairy Products"],
    benefit: "Structural element for thyroid thyroxine hormones (T₄/T₃) that govern body metabolic rate.",
    deficiency: "Goitre (massive visible swelling in neck gland); cretinism and stunted child brain growth.",
  },
];

const DISEASES_DATA: DiseaseRow[] = [
  {
    name: "Tuberculosis (TB)",
    pathogen: "Mycobacterium tuberculosis (Bacteria)",
    category: "Bacterial",
    icon: "🫁",
    spread: "Aerosolized respiratory cough/sneeze droplets in enclosed spaces",
    symptoms: ["Chronic cough lasting > 3 weeks", "Coughing up blood (hemoptysis)", "Drenching night sweats", "Rapid unexplained weight loss"],
    prevention: "BCG Vaccine at birth, well-ventilated rooms, DOTS antibiotic regimen.",
  },
  {
    name: "Typhoid Fever",
    pathogen: "Salmonella typhi (Bacteria)",
    category: "Bacterial",
    icon: "🌡️",
    spread: "Food and drinking water contaminated by carrier fecal matter",
    symptoms: ["Sustained step-ladder high fever (104°F)", "Severe stomach pain & headache", "Rose-colored skin spots", "Extreme fatigue & weakness"],
    prevention: "Widal test for diagnosis; Typhoid Conjugate Vaccine (TCV); drinking boiled water.",
  },
  {
    name: "Cholera",
    pathogen: "Vibrio cholerae (Comma-shaped Bacteria)",
    category: "Bacterial",
    icon: "💧",
    spread: "Consuming water or food polluted with sewage runoff",
    symptoms: ["Painless, profuse rice-water diarrhea", "Severe persistent vomiting", "Sunken eyes and wrinkled skin", "Hypovolemic shock within hours"],
    prevention: "Oral Rehydration Salts (ORS), drinking boiled water, cholera vaccination.",
  },
  {
    name: "Tetanus (Lockjaw)",
    pathogen: "Clostridium tetani Spores (Bacteria)",
    category: "Bacterial",
    icon: "🔩",
    spread: "Spores in soil, rusted nails, or animal dung entering open wounds",
    symptoms: ["Rigid spasm of jaw muscles (lockjaw)", "Painful arching of whole spine (opisthotonos)", "Severe difficulty swallowing", "Violent painful muscle spasms"],
    prevention: "Tetanus Toxoid (TT / Td) injection within 24 hours of injury; DPT vaccine in childhood.",
  },
  {
    name: "Diphtheria",
    pathogen: "Corynebacterium diphtheriae (Bacteria)",
    category: "Bacterial",
    icon: "🗣️",
    spread: "Airborne respiratory droplets and direct skin contact",
    symptoms: ["Thick grey membrane coating throat & tonsils", "Severe sore throat & barking cough", "Swollen 'bull-neck' lymph glands", "Suffocation from airway blockage"],
    prevention: "DPT / Pentavalent vaccine in infancy; diphtheria antitoxin.",
  },
  {
    name: "Pertussis (Whooping Cough)",
    pathogen: "Bordetella pertussis (Bacteria)",
    category: "Bacterial",
    icon: "😮‍💨",
    spread: "Airborne droplets released during intense coughing spells",
    symptoms: ["Uncontrollable rapid coughing spells", "High-pitched loud 'whoop' intake of breath", "Vomiting during or after coughing fits", "Blue lips from temporary oxygen loss"],
    prevention: "DPT immunization; macrolide antibiotics.",
  },
  {
    name: "Rabies (Hydrophobia)",
    pathogen: "Rabies Lyssavirus (Bullet-shaped Virus)",
    category: "Viral",
    icon: "🐕",
    spread: "Saliva from bite or scratch of infected rabid dog, monkey, or bat",
    symptoms: ["Intense pain/tingling at bite site", "Violent throat spasms on seeing water (Hydrophobia)", "Hyper-salivation & agitation", "Fatal encephalomyelitis once symptomatic"],
    prevention: "Immediate soap and running water wash for 15 minutes; Post-Exposure Rabies Vaccine (PEP).",
  },
  {
    name: "Polio (Poliomyelitis)",
    pathogen: "Poliovirus (Enterovirus)",
    category: "Viral",
    icon: "🦼",
    spread: "Fecal-oral route via contaminated drinking water or food",
    symptoms: ["Destruction of motor neurons in spinal cord", "Acute flaccid paralysis (usually legs)", "Unequal limb growth", "Respiratory paralysis in bulbar polio"],
    prevention: "Oral Polio Drops (OPV / Sabin) & Inactivated Polio Vaccine (IPV / Salk).",
  },
  {
    name: "Dengue Fever (Breakbone)",
    pathogen: "Dengue Flavivirus (Serotypes 1-4)",
    category: "Viral",
    icon: "🦟",
    spread: "Bite of infected female Aedes aegypti mosquito (bites during daytime)",
    symptoms: ["Excruciating joint and muscle breakbone pain", "Severe headache behind the eyes", "Sudden precipitous drop in blood platelets", "High fever with rash"],
    prevention: "Eliminate clean stagnant water containers; mosquito repellent nets.",
  },
  {
    name: "Hepatitis B",
    pathogen: "Hepatitis B Virus (HBV)",
    category: "Viral",
    icon: "🟡",
    spread: "Infected blood transfusion, unsterilized surgical needles, or birth",
    symptoms: ["Jaundice (deep yellowing of eyes & skin)", "Dark tea-colored urine", "Pale clay-colored stools", "Chronic liver cirrhosis or liver cancer"],
    prevention: "Recombinant Hepatitis B vaccine; sterile needles; screening blood donations.",
  },
  {
    name: "Malaria",
    pathogen: "Plasmodium protozoa (P. falciparum / P. vivax)",
    category: "Mosquito / Parasitic",
    icon: "🩸",
    spread: "Bite of infected female Anopheles mosquito (bites during dusk & night)",
    symptoms: ["Cyclic episodes of intense shivering chills", "Spiking high fever every 48-72 hours", "Drenching sweats as fever breaks", "Enlarged spleen and severe anemia"],
    prevention: "Artemisinin-based combination therapy (ACT); mosquito nets; draining stagnant ponds.",
  },
  {
    name: "Filariasis (Elephantiasis)",
    pathogen: "Wuchereria bancrofti (Filarial Worm)",
    category: "Mosquito / Parasitic",
    icon: "🐘",
    spread: "Bite of infected Culex mosquitoes breeding in dirty drain water",
    symptoms: ["Adult worms lodge in and block lymphatic vessels", "Massive chronic swelling of legs and feet", "Severely thickened, pebbled skin", "Swelling of genital organs (scrotum)"],
    prevention: "Annual mass drug administration of Diethylcarbamazine (DEC) + Albendazole.",
  },
];

const PH_SCALE_DATA: PHRow[] = [
  { name: "Car Battery Acid", ph: "0.5 to 1.0", phValue: 0.8, category: "Strong Acid", icon: "🔋", fact: "Concentrated sulfuric acid (H₂SO₄); highly corrosive to metals." },
  { name: "Stomach Gastric Acid", ph: "1.2 to 2.0", phValue: 1.5, category: "Strong Acid", icon: "🥩", fact: "Pure Hydrochloric acid (HCl); kills swallowed bacteria & activates pepsin." },
  { name: "Lemon Juice", ph: "2.2 to 2.4", phValue: 2.3, category: "Strong Acid", icon: "🍋", fact: "Rich in citric acid; dissolves hard water mineral scale and tarnish." },
  { name: "Household Vinegar", ph: "2.4 to 2.8", phValue: 2.6, category: "Mild Acid", icon: "🥗", fact: "5% to 8% solution of acetic acid; stops bacterial growth in pickles." },
  { name: "Carbonated Cola / Soda", ph: "2.8 to 3.2", phValue: 3.0, category: "Mild Acid", icon: "🥤", fact: "Contains carbonic & phosphoric acids; dissolves tooth enamel over time." },
  { name: "Tomato Juice", ph: "4.0 to 4.4", phValue: 4.2, category: "Mild Acid", icon: "🍅", fact: "Contains oxalic and malic acids; mildly tart flavor." },
  { name: "Black Coffee", ph: "5.0", phValue: 5.0, category: "Mild Acid", icon: "☕", fact: "Contains chlorogenic acids; mild diuretic effect on kidneys." },
  { name: "Acid Rain Threshold", ph: "< 5.6", phValue: 5.4, category: "Mild Acid", icon: "🌧️", fact: "Formed by atmospheric SO₂ and NO₂ emissions; damages Taj Mahal marble." },
  { name: "Cow's Fresh Milk", ph: "6.5 to 6.8", phValue: 6.6, category: "Near Neutral", icon: "🥛", fact: "Slightly acidic due to lactic acid and proteins; turns sour as bacteria grow." },
  { name: "Pure Distilled Water (25°C)", ph: "7.0", phValue: 7.0, category: "Pure Neutral", icon: "💧", fact: "Concentrations of H⁺ and OH⁻ ions are perfectly balanced at 10⁻⁷ mol/L." },
  { name: "Human Blood (Arterial)", ph: "7.35 to 7.45", phValue: 7.4, category: "Mild Alkaline", icon: "🩸", fact: "Strictly buffered by bicarbonate ions; any deviation outside 7.35-7.45 is fatal." },
  { name: "Human Tears & Saliva", ph: "6.8 to 7.4", phValue: 7.2, category: "Near Neutral", icon: "👁️", fact: "Matches eye corneal osmotic pressure; contains lysozyme enzyme." },
  { name: "Surface Ocean Seawater", ph: "8.1 to 8.4", phValue: 8.2, category: "Mild Alkaline", icon: "🌊", fact: "Alkaline buffer protects calcium carbonate shells of coral reefs and molluscs." },
  { name: "Baking Soda Solution", ph: "8.4", phValue: 8.4, category: "Mild Alkaline", icon: "🍞", fact: "Sodium bicarbonate (NaHCO₃); neutralizes heartburn acidity safely." },
  { name: "Milk of Magnesia", ph: "10.5", phValue: 10.5, category: "Mild Alkaline", icon: "💊", fact: "Magnesium hydroxide [Mg(OH)₂]; standard OTC antacid for stomach burn." },
  { name: "Household Ammonia", ph: "11.5", phValue: 11.5, category: "Strong Alkaline", icon: "🪟", fact: "Ammonium hydroxide solution; cuts through tough glass grease." },
  { name: "Household Bleach", ph: "12.5 to 13.0", phValue: 12.8, category: "Strong Alkaline", icon: "🧴", fact: "Sodium hypochlorite (NaOCl); oxidizes stains and ruptures bacteria." },
  { name: "Caustic Soda (Lye)", ph: "14.0", phValue: 14.0, category: "Strong Alkaline", icon: "🧼", fact: "Sodium hydroxide (NaOH); dissolves clogged hair in drains, makes bar soap." },
];

const CHEMICALS_DATA: ChemicalRow[] = [
  { commonName: "Baking Soda", chemicalName: "Sodium hydrogen carbonate", formula: "NaHCO₃", icon: "🍞", uses: "Leavening agent in cakes, fire extinguishers, antacid." },
  { commonName: "Washing Soda", chemicalName: "Sodium carbonate decahydrate", formula: "Na₂CO₃ · 10H₂O", icon: "🧺", uses: "Removes permanent water hardness, laundry detergent, glass manufacture." },
  { commonName: "Plaster of Paris", chemicalName: "Calcium sulfate hemihydrate", formula: "CaSO₄ · ½H₂O", icon: "🦴", uses: "Orthopedic casts for broken bones, false ceilings, sculpture casts." },
  { commonName: "Gypsum", chemicalName: "Calcium sulfate dihydrate", formula: "CaSO₄ · 2H₂O", icon: "🧱", uses: "Slows down setting time when added to Portland cement clinker." },
  { commonName: "Bleaching Powder", chemicalName: "Calcium hypochlorite", formula: "CaOCl₂", icon: "🚰", uses: "Disinfects municipal drinking water, textile bleaching, chlorine source." },
  { commonName: "Quicklime", chemicalName: "Calcium oxide", formula: "CaO", icon: "🔥", uses: "Manufacture of cement and glass, intensely exothermic slaking with water." },
  { commonName: "Slaked Lime", chemicalName: "Calcium hydroxide", formula: "Ca(OH)₂", icon: "🏠", uses: "Whitewashing buildings, soil acidity correction, mortar for bricks." },
  { commonName: "Caustic Soda", chemicalName: "Sodium hydroxide", formula: "NaOH", icon: "🧼", uses: "Saponifies fats into soap, paper pulp production, drain cleaning." },
  { commonName: "Laughing Gas", chemicalName: "Nitrous oxide", formula: "N₂O", icon: "😄", uses: "Dental anesthetic, analgesic, vehicle nitrous speed booster." },
  { commonName: "Dry Ice", chemicalName: "Solid Carbon dioxide", formula: "CO₂ (solid at −78.5°C)", icon: "🧊", uses: "Sublimates directly to gas; stage fog effects, vaccine cooling." },
  { commonName: "Blue Vitriol", chemicalName: "Copper sulfate pentahydrate", formula: "CuSO₄ · 5H₂O", icon: "💎", uses: "Agricultural fungicide (Bordeaux mixture), copper electroplating." },
  { commonName: "Potash Alum (Fitkari)", chemicalName: "Potassium aluminium sulfate", formula: "K₂SO₄·Al₂(SO₄)₃·24H₂O", icon: "🪒", uses: "Coagulates muddy water colloids, styptic pencil to stop shaving cuts." },
];

const NATURAL_ACIDS_DATA: NaturalAcidRow[] = [
  { source: "Citrus Fruits (Lemon, Orange)", acid: "Citric acid (C₆H₈O₇)", icon: "🍋", fact: "Natural antioxidant and scale remover; prevents kidney stone crystallization." },
  { source: "Household Vinegar", acid: "Acetic acid / Ethanoic (CH₃COOH)", icon: "🥗", fact: "5% to 8% solution in water; ancient culinary preservative for pickles." },
  { source: "Sour Milk & Curd (Dahi)", acid: "Lactic acid (C₃H₆O₃)", icon: "🥛", fact: "Produced by Lactobacillus fermenting lactose; causes muscle fatigue in sprints." },
  { source: "Tamarind & Grapes", acid: "Tartaric acid (C₄H₆O₆)", icon: "🍇", fact: "Key ingredient in baking powder to neutralize basic sodium carbonate." },
  { source: "Tomatoes & Spinach", acid: "Oxalic acid (C₂H₂O₄)", icon: "🍅", fact: "Removes rust stains from fabric; binds with calcium to form kidney stones." },
  { source: "Red Ant Stings & Nettle", acid: "Formic acid / Methanoic (HCOOH)", icon: "🐜", fact: "Injects stinging burn; neutralized by applying calamine or baking soda." },
  { source: "Crisp Apples & Pears", acid: "Malic acid (C₄H₆O₅)", icon: "🍏", fact: "Gives crisp sourness to green apples; stimulates salivary digestive flow." },
  { source: "Carbonated Soda Drinks", acid: "Carbonic acid (H₂CO₃)", icon: "🥤", fact: "Formed by dissolving CO₂ under pressure; fizzes when bottle cap opens." },
];

const INSTRUMENTS_DATA: InstrumentRow[] = [
  { name: "Sphygmomanometer", measures: "Arterial Blood Pressure (mmHg)", category: "Medical & Health", icon: "🩺", principle: "Hydraulic cuff occludes brachial artery; measures systolic/diastolic values." },
  { name: "Barometer", measures: "Atmospheric Air Pressure", category: "Weather & Nature", icon: "📉", principle: "Torricelli mercury column: 760 mmHg at sea level. Sudden drop = incoming storm." },
  { name: "Lactometer", measures: "Purity & Specific Gravity of Milk", category: "Physics & Aviation", icon: "🥛", principle: "Floatation buoyancy: floats high in pure milk (~1.030 g/cm³), sinks if watered down." },
  { name: "Hygrometer", measures: "Atmospheric Humidity & Moisture", category: "Weather & Nature", icon: "💧", principle: "Measures water vapor percentage in ambient air (psychrometric wet/dry bulb)." },
  { name: "Hydrometer", measures: "Specific Gravity / Density of Liquids", category: "Physics & Aviation", icon: "🧪", principle: "Archimedes' floatation: depth of weighted bulb indicates electrolyte liquid density." },
  { name: "Anemometer", measures: "Wind Speed and Velocity", category: "Weather & Nature", icon: "💨", principle: "Hemispherical spinning cups rotate at rate proportional to wind velocity." },
  { name: "Altimeter", measures: "Altitude Above Sea Level", category: "Physics & Aviation", icon: "✈️", principle: "Aneroid capsule detects predictable drop in air pressure with increasing altitude." },
  { name: "Pyrometer", measures: "Extremely High Temperatures (>1,500°C)", category: "Physics & Aviation", icon: "🔥", principle: "Non-contact measurement of emitted infrared radiation (Stefan-Boltzmann Law)." },
  { name: "Seismograph", measures: "Earthquake Tremors & Seismic Waves", category: "Weather & Nature", icon: "🌋", principle: "Inertial pendulum records P and S ground waves on logarithmic Richter Scale." },
  { name: "Fathometer", measures: "Depth of the Ocean Floor", category: "Physics & Aviation", icon: "🚢", principle: "Echo-sounding sonar: measures round-trip time delay of ultrasonic sound pulses." },
  { name: "Ammeter", measures: "Electric Current in Amperes", category: "Physics & Aviation", icon: "⚡", principle: "Connected in SERIES; possesses near-zero internal electrical resistance." },
  { name: "Voltmeter", measures: "Potential Difference in Volts", category: "Physics & Aviation", icon: "🔌", principle: "Connected in PARALLEL; possesses extremely high internal electrical resistance." },
];

const SI_UNITS_DATA: SIUnitRow[] = [
  { quantity: "Length", unit: "Metre", symbol: "m", example: "Wavelength of laser light, distance" },
  { quantity: "Mass", unit: "Kilogram", symbol: "kg", example: "Standard kilogram defined via Planck's constant" },
  { quantity: "Time", unit: "Second", symbol: "s", example: "9,192,631,770 cycles of Cesium-133 radiation" },
  { quantity: "Electric Current", unit: "Ampere", symbol: "A", example: "Rate of flow of electric charge (1 Coulomb/sec)" },
  { quantity: "Thermodynamic Temp", unit: "Kelvin", symbol: "K", example: "Absolute zero is 0 K (−273.15°C); room temp ~298 K" },
  { quantity: "Luminous Intensity", unit: "Candela", symbol: "cd", example: "Brightness of light emitted by standard candle" },
  { quantity: "Force", unit: "Newton", symbol: "N", example: "1 N = 1 kg · m / s² (weight of small apple ~1 N)" },
  { quantity: "Work & Energy", unit: "Joule", symbol: "J", example: "1 J = 1 N · m = 1 Watt · second" },
  { quantity: "Power", unit: "Watt", symbol: "W", example: "1 W = 1 J / s (1 horsepower = 746 Watts)" },
  { quantity: "Pressure", unit: "Pascal", symbol: "Pa", example: "1 Pa = 1 N / m² (1 atm = 101,325 Pa = 760 mmHg)" },
  { quantity: "Electric Resistance", unit: "Ohm", symbol: "Ω", example: "Opposition to current; V = IR" },
  { quantity: "Radioactivity", unit: "Becquerel", symbol: "Bq", example: "1 Bq = 1 nuclear decay per second" },
];

const BLOOD_COMPATIBILITY_DATA: BloodCompatibilityRow[] = [
  {
    group: "O Negative (O−)",
    antigens: "None (zero A, B, or Rh)",
    antibodies: "Anti-A, Anti-B, Anti-Rh",
    canGive: "UNIVERSAL DONOR (All groups)",
    canTake: "O Negative only",
    note: "Emergency red cell donor for trauma patients; zero foreign antigens.",
    highlight: "donor",
  },
  {
    group: "O Positive (O+)",
    antigens: "Rh(D) only",
    antibodies: "Anti-A, Anti-B",
    canGive: "O+, A+, B+, AB+",
    canTake: "O+, O−",
    note: "Most common blood group in India (~38% of population).",
  },
  {
    group: "A Negative (A−)",
    antigens: "A antigen only",
    antibodies: "Anti-B, Anti-Rh",
    canGive: "A−, A+, AB−, AB+",
    canTake: "A−, O−",
    note: "Rare blood group; safe for A and AB recipients.",
  },
  {
    group: "A Positive (A+)",
    antigens: "A and Rh antigens",
    antibodies: "Anti-B only",
    canGive: "A+, AB+",
    canTake: "A+, A−, O+, O−",
    note: "Very common group; receives from any A or O blood.",
  },
  {
    group: "B Negative (B−)",
    antigens: "B antigen only",
    antibodies: "Anti-A, Anti-Rh",
    canGive: "B−, B+, AB−, AB+",
    canTake: "B−, O−",
    note: "Can donate to B and AB patients.",
  },
  {
    group: "B Positive (B+)",
    antigens: "B and Rh antigens",
    antibodies: "Anti-A only",
    canGive: "B+, AB+",
    canTake: "B+, B−, O+, O−",
    note: "Second most common group in India (~32% of population).",
  },
  {
    group: "AB Negative (AB−)",
    antigens: "A and B antigens",
    antibodies: "Anti-Rh only",
    canGive: "AB−, AB+",
    canTake: "AB−, A−, B−, O−",
    note: "Rarest regular blood type (<1% of population).",
  },
  {
    group: "AB Positive (AB+)",
    antigens: "A, B, and Rh antigens",
    antibodies: "NONE (zero antibodies)",
    canGive: "AB+ only",
    canTake: "UNIVERSAL RECIPIENT (All groups)",
    note: "Can receive red blood cells from any blood group safely.",
    highlight: "recipient",
  },
];

const BODY_RECORDS_DATA: BodyRecordRow[] = [
  { metric: "Largest Organ Overall", value: "Skin (Integumentary)", category: "Anatomy", icon: "👤", detail: "Covers ~2 square metres, weighs ~4 kg; provides primary barrier against pathogens." },
  { metric: "Largest Internal Organ & Gland", value: "Liver", category: "Anatomy", icon: "🫀", detail: "Weighs ~1.5 kg; performs over 500 vital functions including bile secretion & urea synthesis." },
  { metric: "Smallest Bone", value: "Stapes (Stirrup)", category: "Skeleton", icon: "👂", detail: "Measures only 3 mm in the middle ear cavity; transmits sound vibrations into cochlea." },
  { metric: "Longest & Strongest Bone", value: "Femur (Thigh Bone)", category: "Skeleton", icon: "🦴", detail: "Averages 48 cm in adults; can withstand up to 30 times human body weight." },
  { metric: "Hardest Biological Substance", value: "Tooth Enamel", category: "Dental", icon: "🦷", detail: "Contains 96% crystalline calcium hydroxyapatite; harder than steel or bone." },
  { metric: "Total Bones in Adult Skeleton", value: "206 Bones", category: "Skeleton", icon: "🩻", detail: "Infants are born with ~300 soft bones that fuse together during growth." },
  { metric: "Natural Cardiac Pacemaker", value: "SA Node (Right Atrium)", category: "Cardiology", icon: "❤️", detail: "Self-depolarizes rhythmically ~72 times per minute to trigger coordinated heartbeats." },
  { metric: "Kidney Filtering Units", value: "Nephrons (~1 Million/Kidney)", category: "Renal", icon: "🫘", detail: "Filters 180 litres of blood fluid daily, condensing it into ~1.5 litres of urine." },
  { metric: "Normal Arterial Blood Pressure", value: "120 / 80 mmHg", category: "Vitals", icon: "🩺", detail: "120 mmHg is systolic pressure during contraction; 80 mmHg is diastolic at rest." },
  { metric: "Red Blood Cell Lifespan", value: "120 Days", category: "Hematology", icon: "🩸", detail: "Recycled in Spleen ('Graveyard of RBCs') after ~120 days of continuous circulation." },
];

const PHENOMENA_DATA: PhenomenonRow[] = [
  {
    question: "Why is the clear daytime sky blue?",
    law: "Rayleigh Scattering of Light",
    icon: "🌌",
    shortAnswer: "Air molecules scatter short blue wavelengths ~10 times more than red wavelengths.",
    fullReason: "Sunlight is white light composed of all rainbow colors (VIBGYOR). When rays enter Earth's atmosphere, tiny nitrogen and oxygen molecules scatter shorter blue wavelengths (400 nm) in every direction far more than long red wavelengths (700 nm). Because blue light is scattered across the entire hemisphere, our eyes see a blue sky.",
    realLife: "On the airless Moon, the sky is completely pitch-black even in broad daylight!",
  },
  {
    question: "Why are sunsets and danger signals red?",
    law: "Rayleigh Scattering & Wavelength",
    icon: "🌅",
    shortAnswer: "Red light has the longest visible wavelength and scatters the least through fog and dust.",
    fullReason: "At sunset, sunlight must travel through a much thicker slice of atmosphere. Almost all blue and green rays are scattered away before reaching your eyes, leaving only the least-scattered long red and orange rays. Danger lights and brake lights are colored red for the exact same reason: they pierce through smoke, fog, and distance.",
    realLife: "Lighthouse beacons and car emergency tail-lights are universally red.",
  },
  {
    question: "Why do stars twinkle, but planets don't?",
    law: "Atmospheric Refraction of Light",
    icon: "✨",
    shortAnswer: "Turbulent hot and cold air layers continuously bend pinpoint starlight back and forth.",
    fullReason: "Stars are trillions of kilometres away and appear as pinpoint light sources. As starlight passes through swirling atmospheric layers of varying temperature and density, the ray bends randomly (Atmospheric Refraction), making the star appear to flicker. Planets are much closer and appear as larger discs; fluctuations across the disc average out to a steady glow.",
    realLife: "The Hubble and James Webb Space Telescopes are placed above the atmosphere to avoid all twinkling blur.",
  },
  {
    question: "Why does solid ice float on liquid water?",
    law: "Anomalous Expansion of Water",
    icon: "🧊",
    shortAnswer: "Water reaches maximum density at 4°C; freezing below 4°C expands into a lighter cage lattice.",
    fullReason: "Almost all liquids contract and become heavier as they freeze. Water is unique: it contracts until 4°C (maximum density = 1.0 g/cm³). As it cools from 4°C to 0°C, hydrogen bonds lock into an open tetrahedral crystal lattice, making ice less dense (~0.92 g/cm³) than liquid water. Ice floats as an insulating blanket, keeping the pond bottom liquid at 4°C so fish survive freezing winters.",
    realLife: "Icebergs float in the ocean with 90% underwater and 10% exposed above.",
  },
  {
    question: "Why does food cook faster in a pressure cooker?",
    law: "Boiling Point vs Pressure (Gay-Lussac)",
    icon: "🍲",
    shortAnswer: "Trapped steam increases internal pressure to 2 atm, elevating water's boiling point to 120°C.",
    fullReason: "In an open pot, boiling water caps at 100°C because heat escapes with steam. In a sealed pressure cooker, trapped steam pressure builds to 2 atmospheres. Higher ambient pressure forces water molecules to stay liquid up to ~120°C. Cooking at 120°C delivers vastly more thermal energy, cooking pulses and meats in a third of normal time.",
    realLife: "On high mountain peaks, low atmospheric pressure causes water to boil at 85°C, making cooking dal impossible without a pressure cooker.",
  },
  {
    question: "What causes a shimmering mirage on hot roads?",
    law: "Total Internal Reflection (TIR)",
    icon: "🏜️",
    shortAnswer: "Light from the sky bends continuously upward through hot ground air layers.",
    fullReason: "Scorching asphalt heats the air layer directly touching it, making it hot and less dense than the cooler air above. As light from the sky travels downward from denser to rarer air, the rays refract progressively away from the normal. When the incident angle exceeds the critical angle, Total Internal Reflection bounces the ray back up into driver eyes, looking like a puddle of water reflecting the sky.",
    realLife: "Desert travellers hallucinate water oases due to mirage reflection of the blue sky.",
  },
  {
    question: "How does a natural rainbow form in the sky?",
    law: "Dispersion, Refraction & Internal Reflection",
    icon: "🌈",
    shortAnswer: "Millions of spherical raindrops act like miniature prisms, splitting white sunlight into VIBGYOR.",
    fullReason: "When sunlight shines from behind you onto raindrops after a shower, light enters each spherical droplet (Refraction), separates into its 7 component colors because each color bends at a different angle (Dispersion), reflects off the back interior surface of the droplet (Internal Reflection), and refracts out. Red emerges at 42° and violet at 40°.",
    realLife: "A rainbow can only be observed when the Sun is directly behind your back.",
  },
  {
    question: "Why can't sound travel in outer space?",
    law: "Mechanical Nature of Acoustic Waves",
    icon: "🚀",
    shortAnswer: "Sound requires physical matter (molecules) to vibrate; outer space is a vacuum.",
    fullReason: "Sound is a mechanical longitudinal compression wave that propagates only when molecules physically collide and transmit vibrations (in air, liquid, or solids). Outer space is a near-perfect vacuum with virtually zero gas molecules. Astronauts on spacewalks cannot hear each other shouting and must communicate using electromagnetic radio waves.",
    realLife: "Sci-fi movies with loud space explosions are scientifically inaccurate; real space is dead silent.",
  },
];

const PLANETS_DATA: PlanetRow[] = [
  { name: "Mercury", category: "Terrestrial Rocky", icon: "⚪", orbitPeriod: "88 Earth days", dayLength: "59 Earth days", recordFact: "Fastest orbital speed in Solar System (47 km/s); extreme temp swing (−180°C to 430°C).", significance: "Closest planet to Sun; zero atmosphere to retain heat." },
  { name: "Venus", category: "Terrestrial Rocky", icon: "🟡", orbitPeriod: "225 Earth days", dayLength: "243 Earth days", recordFact: "Hottest planet in Solar System (~465°C); rotates East to West (retrograde); day longer than year!", significance: "Runaway CO₂ greenhouse effect (96% CO₂); called 'Earth's Twin' & 'Morning Star'." },
  { name: "Earth", category: "Terrestrial Rocky", icon: "🌍", orbitPeriod: "365.25 days", dayLength: "24 hours", recordFact: "Only known world with liquid water oceans, nitrogen-oxygen air, and life.", significance: "23.5° axial tilt causes seasons; protected by magnetosphere and ozone layer." },
  { name: "Mars", category: "Terrestrial Rocky", icon: "🔴", orbitPeriod: "687 Earth days", dayLength: "24.6 hours", recordFact: "Hosts Olympus Mons (tallest volcano, ~22 km) and two tiny moons: Phobos and Deimos.", significance: "'The Red Planet' due to iron oxide rust; prime target for human colonization." },
  { name: "Jupiter", category: "Gas Giant", icon: "🟠", orbitPeriod: "11.86 Earth years", dayLength: "9.9 hours", recordFact: "Largest planet (1,300 Earths volume); famous 300-year-old Great Red Spot anticyclone.", significance: "Massive magnetic field; moon Ganymede is the largest satellite in the Solar System." },
  { name: "Saturn", category: "Gas Giant", icon: "🪐", orbitPeriod: "29.45 Earth years", dayLength: "10.7 hours", recordFact: "Lowest density of all planets (0.687 g/cm³ - lighter than water, would float in a giant bathtub!).", significance: "Spectacular ring system of ice chunks; moon Titan has liquid methane lakes." },
  { name: "Uranus", category: "Ice Giant", icon: "🔵", orbitPeriod: "84 Earth years", dayLength: "17.2 hours", recordFact: "Axial tilt of 98° (rolls on its side like a ball around the Sun).", significance: "Pale cyan color from atmospheric methane; coldest planetary atmosphere (−224°C)." },
  { name: "Neptune", category: "Ice Giant", icon: "🔷", orbitPeriod: "164.8 Earth years", dayLength: "16.1 hours", recordFact: "Windiest planet with supersonic storms reaching 2,100 km/h; longest orbit (165 yrs).", significance: "Deep azure blue methane atmosphere; moon Triton orbits backwards (retrograde)." },
];

const ISRO_MISSIONS_DATA: ISROMissionRow[] = [
  { mission: "Aryabhata", year: "1975", rocket: "Kosmos-3M (Soviet)", icon: "🛰️", achievement: "India's first unmanned satellite; initiated Indian space era.", significance: "Built wholly in India under Dr. U.R. Rao; launched April 19, 1975." },
  { mission: "SLV-3 (Rohini RS-1)", year: "1980", rocket: "SLV-3 (Indigenous)", icon: "🚀", achievement: "First successful domestic satellite launch into orbit; Project Director Dr. APJ Abdul Kalam.", significance: "Made India the 6th nation with independent orbital launch capability." },
  { mission: "Chandrayaan-1", year: "2008", rocket: "PSLV-C11", icon: "🌕", achievement: "Discovered and confirmed the presence of water molecules (H₂O / OH) on the Moon.", significance: "Carried NASA's M3 spectrometer and India's Moon Impact Probe." },
  { mission: "Mangalyaan (MOM)", year: "2013-14", rocket: "PSLV-C25", icon: "🔴", achievement: "First Asian nation to reach Mars; first nation in the world to succeed on maiden attempt.", significance: "Ultra-frugal budget of ~$74 million (cheaper than Hollywood space movies!)." },
  { mission: "104 Satellites Record", year: "2017", rocket: "PSLV-C37", icon: "✨", achievement: "Historic world record: deployed 104 satellites in a single rocket flight.", significance: "Demonstrated ISRO's world-class commercial launch reliability." },
  { mission: "Chandrayaan-3", year: "2023", rocket: "LVM3-M4 ('Bahubali')", icon: "🏆", achievement: "FIRST soft landing near the lunar South Pole in human history (Aug 23 National Space Day).", significance: "Vikram lander & Pragyan rover; landing spot named 'Shiv Shakti Point'." },
  { mission: "Aditya-L1", year: "2023", rocket: "PSLV-C57", icon: "☀️", achievement: "India's first solar space observatory, stationed at Sun-Earth Lagrange Point 1 (L1).", significance: "Observes the solar corona, flares, and CMEs continuously with zero eclipses." },
  { mission: "Gaganyaan", year: "Upcoming", rocket: "Human-rated LVM3", icon: "👨‍🚀", achievement: "First Indian human spaceflight mission carrying 3 astronauts to 400 km Low Earth Orbit.", significance: "Features female AI humanoid robot 'Vyommitra' for uncrewed safety validation." },
];

const CELESTIAL_MOONS_DATA: CelestialMoonRow[] = [
  { name: "Ganymede", host: "Moon of Jupiter", icon: "🌑", diameter: "5,268 km", feature: "Largest moon in Solar System (bigger than Mercury); only moon with an intrinsic magnetic field." },
  { name: "Titan", host: "Moon of Saturn", icon: "🪐", diameter: "5,150 km", feature: "Dense nitrogen atmosphere; rivers and lakes of liquid methane and ethane." },
  { name: "Europa", host: "Moon of Jupiter", icon: "🧊", diameter: "3,122 km", feature: "Vast liquid saltwater ocean beneath ice crust; prime candidate for extraterrestrial life." },
  { name: "Io", host: "Moon of Jupiter", icon: "🌋", diameter: "3,643 km", feature: "Most volcanically active body in Solar System; over 400 erupting sulfur volcanoes." },
  { name: "The Moon", host: "Earth", icon: "🌕", diameter: "3,474 km", feature: "Tidally locked (same face always points to Earth); Apollo 11 manned landing 1969." },
  { name: "Olympus Mons", host: "Volcano on Mars", icon: "🏔️", diameter: "600 km wide", feature: "Tallest volcano and mountain in Solar System (~22 km tall, 3× Mount Everest)." },
  { name: "Pluto", host: "Kuiper Belt", icon: "❄️", diameter: "2,376 km", feature: "Dwarf planet with heart-shaped nitrogen glacier; demoted in 2006 for not clearing orbital path." },
];

const ALLOYS_DATA: AlloyRow[] = [
  { name: "Brass", composition: "Copper (Cu ~70%) + Zinc (Zn ~30%)", icon: "🎺", properties: "Golden luster, highly malleable, acoustic resonance, non-magnetic.", uses: "Musical instruments (trumpets, saxophones), decorative plumbing taps, locks." },
  { name: "Bronze", composition: "Copper (Cu ~88%) + Tin (Sn ~12%)", icon: "🥉", properties: "Harder than copper, low friction, resists seawater corrosion.", uses: "Statues, coins, Olympic medals, ship propellers, heavy-duty machine bushings." },
  { name: "German Silver", composition: "Copper (~50%) + Zinc (~30%) + Nickel (~20%)", icon: "🥈", properties: "CONTAINS ZERO SILVER (0% Ag)! Silvery appearance, corrosion resistant.", uses: "Imitation jewelry, silverware tableware, musical instruments, zippers." },
  { name: "Solder Wire", composition: "Tin (Sn ~50%) + Lead (Pb ~50%)", icon: "🔌", properties: "Low melting point eutectic (~183°C); bonds copper securely.", uses: "Joining electrical wires, PCB circuit soldering, plumbing pipe joints." },
  { name: "Stainless Steel", composition: "Iron (Fe) + Chromium (Cr ~18%) + Nickel (Ni ~8%)", icon: "🍴", properties: "Rust-proof via self-healing chromium oxide (Cr₂O₃) passive barrier.", uses: "Kitchen utensils, cutlery, surgical tools, architectural paneling." },
  { name: "Duralumin", composition: "Aluminium (Al ~95%) + Copper (Cu ~4%) + Mg + Mn", icon: "✈️", properties: "Featherweight with high tensile strength via precipitation hardening.", uses: "Aircraft airframes, racing car engine blocks, helicopter propeller blades." },
  { name: "Alnico", composition: "Aluminium (Al) + Nickel (Ni) + Cobalt (Co) + Iron", icon: "🧲", properties: "Permanent high magnetic strength and high coercivity.", uses: "Loudspeakers, electric guitar pickups, MRI equipment, magnetic sensors." },
  { name: "Nichrome", composition: "Nickel (Ni ~80%) + Chromium (Cr ~20%)", icon: "🔥", properties: "High electrical resistance; survives glowing 1,200°C without oxidizing.", uses: "Heating coils in toasters, geysers, hair dryers, electric room heaters." },
  { name: "22 Karat Gold", composition: "Pure Gold (91.6%) + Copper/Silver (8.4%)", icon: "👑", properties: "Hallmark 916; hardened for jewelry durability (24K is too soft).", uses: "Indian bridal jewelry, bangles, necklaces, rings, gold ornaments." },
  { name: "Dental Amalgam", composition: "Mercury (Hg ~50%) + Silver (Ag) + Tin + Copper", icon: "🦷", properties: "Liquid metal alloy that hardens inside cavity; stored in iron flasks.", uses: "Dental restorations for filling tooth cavities." },
];

const ORES_DATA: OreRow[] = [
  { ore: "Bauxite", formula: "Al₂O₃ · 2H₂O", metal: "Aluminium (Al)", icon: "⛏️", importance: "Primary commercial ore; electrolyzed via Hall-Héroult process (Odisha leads in India)." },
  { ore: "Hematite", formula: "Fe₂O₃", metal: "Iron (Fe)", icon: "🪨", importance: "Red iron ore; primary blast furnace feedstock to make pig iron and steel." },
  { ore: "Magnetite", formula: "Fe₃O₄", metal: "Iron (Fe)", icon: "🧲", importance: "Black magnetic lodestone with the highest natural iron content (~72%)." },
  { ore: "Cinnabar", formula: "HgS", metal: "Mercury (Hg)", icon: "🔴", importance: "Scarlet mercuric sulfide mineral; roasted in air to liberate pure liquid mercury." },
  { ore: "Galena", formula: "PbS", metal: "Lead (Pb)", icon: "🩶", importance: "Chief lead ore with cubic metallic cleavage; yields silver as a valuable byproduct." },
  { ore: "Pitchblende", formula: "U₃O₈ / UO₂", metal: "Uranium (U)", icon: "☢️", importance: "Radioactive ore from which Marie Curie discovered Radium; nuclear reactor fuel." },
  { ore: "Monazite Sand", formula: "(Ce,La,Nd,Th)PO₄", metal: "Thorium (Th)", icon: "🏖️", importance: "Vast beach placers in Kerala, India; key for Stage 3 indigenous nuclear power." },
  { ore: "Calamine", formula: "ZnCO₃", metal: "Zinc (Zn)", icon: "🧴", importance: "Zinc carbonate ore; historically mined for zinc smelting and soothing skin lotions." },
];

const POLYMERS_DATA: PolymerRow[] = [
  { name: "Teflon", chemicalName: "Polytetrafluoroethylene (PTFE)", icon: "🍳", category: "Thermoplastic", properties: "Extremely slippery, non-stick, chemically inert, withstands 260°C.", uses: "Non-stick frying pans, plumbing thread seal tape, waterproof fabrics." },
  { name: "Bakelite", chemicalName: "Phenol-Formaldehyde Resin", icon: "🔌", category: "Thermoset", properties: "World's first synthetic plastic (1907); never softens on reheating.", uses: "Electrical wall switches, plugs, saucepan handles, automobile distributor caps." },
  { name: "Vulcanized Rubber", chemicalName: "Cross-linked Polyisoprene (Sulfur)", icon: "🛞", category: "Elastomer", properties: "Resilient elasticity, temperature resistant, high mechanical grip.", uses: "Automobile tires, shoe soles, rubber conveyer belts, industrial hoses." },
  { name: "PVC", chemicalName: "Polyvinyl Chloride", icon: "🚰", category: "Thermoplastic", properties: "Rigid, waterproof, flame-retardant, cheap, lightweight.", uses: "Plumbing pipes, drainage conduits, electrical wire sheathing, raincoats." },
  { name: "Nylon-6,6", chemicalName: "Polyamide (Adipic acid + HMD)", icon: "🪢", category: "Synthetic Fibre", properties: "First fully synthetic fiber (1935); exceptional tensile tenacity.", uses: "Toothbrush bristles, parachutes, mountaineering ropes, women's stockings." },
  { name: "Rayon", chemicalName: "Regenerated Cellulose", icon: "👗", category: "Synthetic Fibre", properties: "'Artificial Silk': soft, lustrous, highly breathable and absorbent.", uses: "Summer clothing, bedsheets, medical gauze surgical dressings." },
  { name: "Kevlar", chemicalName: "Poly-paraphenylene terephthalamide", icon: "🛡️", category: "Synthetic Fibre", properties: "5× stronger than steel of equal weight; dissipates bullet kinetic shock.", uses: "Bulletproof body armor vests, combat helmets, racing tires, cut-resistant gloves." },
  { name: "PET", chemicalName: "Polyethylene Terephthalate", icon: "🍶", category: "Thermoplastic", properties: "Clear, shatterproof, gas-impermeable (CO₂ lock), highly recyclable.", uses: "Carbonated soda bottles (recycling code 1), polyester fleece jackets." },
];

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function GeneralScienceViewer({
  chapter,
  onSelectChapter,
}: {
  chapter: NoteChapter;
  onSelectChapter?: (id: string) => void;
}) {
  const [viewMode, setViewMode] = useState<"table" | "cards" | "practice">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedBlood, setSelectedBlood] = useState("O-");

  // Blood compatibility calculation for interactive checker
  const activeBloodData = useMemo(() => {
    return (
      BLOOD_COMPATIBILITY_DATA.find((b) => b.group.startsWith(selectedBlood)) ||
      BLOOD_COMPATIBILITY_DATA[0]
    );
  }, [selectedBlood]);

  // Chapter 1 Filter
  const filteredVitamins = useMemo(() => {
    return VITAMINS_DATA.filter((v) => {
      const matchFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "fat"
          ? v.type === "Fat-Soluble"
          : activeFilter === "water"
          ? v.type === "Water-Soluble"
          : v.type === "Essential Mineral";
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        v.name.toLowerCase().includes(q) ||
        v.chemicalName.toLowerCase().includes(q) ||
        v.deficiency.toLowerCase().includes(q) ||
        v.sources.some((s) => s.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Chapter 2 Filter
  const filteredDiseases = useMemo(() => {
    return DISEASES_DATA.filter((d) => {
      const matchFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "bacterial"
          ? d.category === "Bacterial"
          : activeFilter === "viral"
          ? d.category === "Viral"
          : activeFilter === "mosquito"
          ? d.category === "Mosquito / Parasitic"
          : d.category === "Fungal & Lifestyle";
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        d.name.toLowerCase().includes(q) ||
        d.pathogen.toLowerCase().includes(q) ||
        d.spread.toLowerCase().includes(q) ||
        d.prevention.toLowerCase().includes(q) ||
        d.symptoms.some((s) => s.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Chapter 3 Filter (pH)
  const filteredPH = useMemo(() => {
    return PH_SCALE_DATA.filter((item) => {
      const matchFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "acid-strong"
          ? item.category === "Strong Acid"
          : activeFilter === "acid-mild"
          ? item.category === "Mild Acid"
          : activeFilter === "neutral"
          ? item.category === "Pure Neutral"
          : activeFilter === "alkaline-mild"
          ? item.category === "Mild Alkaline"
          : activeFilter === "alkaline-strong"
          ? item.category === "Strong Alkaline"
          : activeFilter === "all-acids"
          ? item.category.includes("Acid")
          : item.category.includes("Alkaline");
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.fact.toLowerCase().includes(q) ||
        String(item.ph).includes(q);
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Chapter 3 Filter (Chemicals)
  const filteredChemicals = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CHEMICALS_DATA.filter(
      (c) =>
        q === "" ||
        c.commonName.toLowerCase().includes(q) ||
        c.chemicalName.toLowerCase().includes(q) ||
        c.formula.toLowerCase().includes(q) ||
        c.uses.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Chapter 4 Filter (Instruments)
  const filteredInstruments = useMemo(() => {
    return INSTRUMENTS_DATA.filter((ins) => {
      const matchFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "medical"
          ? ins.category === "Medical & Health"
          : activeFilter === "weather"
          ? ins.category === "Weather & Nature"
          : ins.category === "Physics & Aviation";
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        ins.name.toLowerCase().includes(q) ||
        ins.measures.toLowerCase().includes(q) ||
        ins.principle.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Chapter 6 Filter (Phenomena)
  const filteredPhenomena = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PHENOMENA_DATA.filter(
      (p) =>
        q === "" ||
        p.question.toLowerCase().includes(q) ||
        p.law.toLowerCase().includes(q) ||
        p.shortAnswer.toLowerCase().includes(q) ||
        p.fullReason.toLowerCase().includes(q) ||
        p.realLife.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Chapter 7 Filter (Planets & ISRO)
  const filteredPlanets = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PLANETS_DATA.filter(
      (p) =>
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.recordFact.toLowerCase().includes(q) ||
        p.significance.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredMissions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ISRO_MISSIONS_DATA.filter(
      (m) =>
        q === "" ||
        m.mission.toLowerCase().includes(q) ||
        m.rocket.toLowerCase().includes(q) ||
        m.achievement.toLowerCase().includes(q) ||
        m.significance.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Chapter 8 Filter (Alloys & Polymers)
  const filteredAlloys = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALLOYS_DATA.filter(
      (a) =>
        q === "" ||
        a.name.toLowerCase().includes(q) ||
        a.composition.toLowerCase().includes(q) ||
        a.properties.toLowerCase().includes(q) ||
        a.uses.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredPolymers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return POLYMERS_DATA.filter(
      (p) =>
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.chemicalName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.uses.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* ─── Top Control Bar: Mode Toggle & Search ─── */}
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-3 sm:p-4 card-shadow sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 rounded-xl bg-fg/[0.04] p-1 border border-line">
          <button
            type="button"
            onClick={() => {
              haptic("light");
              setViewMode("table");
            }}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition active:scale-95",
              viewMode === "table"
                ? "bg-brand text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <TableIcon className="h-4 w-4" /> Structured Table
          </button>
          <button
            type="button"
            onClick={() => {
              haptic("light");
              setViewMode("cards");
            }}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition active:scale-95",
              viewMode === "cards"
                ? "bg-brand text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <LayoutGrid className="h-4 w-4" /> Card Sheet
          </button>
          <button
            type="button"
            onClick={() => {
              haptic("light");
              setViewMode("practice");
            }}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition active:scale-95",
              viewMode === "practice"
                ? "bg-brand text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <ListChecks className="h-4 w-4" /> Practice Quiz (50)
          </button>
        </div>

        {viewMode !== "practice" ? (
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Live search facts & items..."
              className="w-full rounded-xl border border-line bg-fg/[0.02] pl-10 pr-3.5 py-2 text-xs sm:text-sm text-fg outline-none placeholder:text-subtle focus:border-brand/70"
            />
          </div>
        ) : null}
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* 1. STRUCTURED TABLE VIEW (Strictly Tables Only)                        */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {viewMode === "table" && (
        <div className="space-y-8 animate-fade-in">
          {/* Chapter 1: Vitamins & Minerals Table */}
          {chapter.id === "note-gen-1" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Nutrients" },
                  { id: "fat", label: "🥑 Fat-Soluble (A, D, E, K)" },
                  { id: "water", label: "💧 Water-Soluble (B-Complex, C)" },
                  { id: "mineral", label: "⚡ Minerals (Iron, Calcium, Iodine)" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      haptic("light");
                      setActiveFilter(f.id);
                    }}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95",
                      activeFilter === f.id
                        ? "border-brand bg-brand/[0.12] text-brand-ink font-semibold"
                        : "border-line text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-fg/[0.04]">
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                        Nutrient & Chemical Name
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-64">
                        Top Food Sources
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                        Why Your Body Needs It
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-72">
                        Deficiency Disease & Signs
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {filteredVitamins.map((v) => (
                      <tr key={v.name} className="hover:bg-fg/[0.02] transition">
                        <td className="px-5 py-4 align-top">
                          <div className="flex items-start gap-2.5">
                            <span className="text-2xl shrink-0">{v.icon}</span>
                            <div>
                              <p className="font-bold text-fg text-sm">{v.name}</p>
                              <p className="text-xs text-muted font-mono">{v.chemicalName}</p>
                              <span
                                className={cn(
                                  "inline-block font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md mt-1.5 border",
                                  v.type === "Fat-Soluble"
                                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    : v.type === "Water-Soluble"
                                    ? "bg-sky-500/10 text-sky-500 border-sky-500/20"
                                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                )}
                              >
                                {v.type}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-wrap gap-1.5">
                            {v.sources.map((s) => (
                              <span
                                key={s}
                                className="font-mono text-xs px-2 py-0.5 rounded-md bg-fg/[0.04] text-fg border border-line/60"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top text-xs leading-relaxed text-fg/90">
                          {v.benefit}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-2.5 text-xs text-rose-500 leading-relaxed font-medium">
                            {v.deficiency}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chapter 2: Diseases Table */}
          {chapter.id === "note-gen-2" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Diseases" },
                  { id: "bacterial", label: "🦠 Bacterial (TB, Typhoid, Cholera)" },
                  { id: "viral", label: "🧬 Viral (Rabies, Polio, Dengue)" },
                  { id: "mosquito", label: "🦟 Mosquito / Parasitic (Malaria)" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      haptic("light");
                      setActiveFilter(f.id);
                    }}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95",
                      activeFilter === f.id
                        ? "border-brand bg-brand/[0.12] text-brand-ink font-semibold"
                        : "border-line text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-fg/[0.04]">
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-48">
                        Disease & Pathogen
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                        Transmission Mode
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                        Classic Clinical Symptoms
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-64">
                        Vaccine / Treatment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {filteredDiseases.map((d) => (
                      <tr key={d.name} className="hover:bg-fg/[0.02] transition">
                        <td className="px-5 py-4 align-top">
                          <div className="flex items-start gap-2.5">
                            <span className="text-2xl shrink-0">{d.icon}</span>
                            <div>
                              <p className="font-bold text-fg text-sm">{d.name}</p>
                              <p className="text-xs text-muted font-mono italic">{d.pathogen}</p>
                              <span
                                className={cn(
                                  "inline-block font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md mt-1.5 border",
                                  d.category === "Bacterial"
                                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    : d.category === "Viral"
                                    ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                )}
                              >
                                {d.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">
                          {d.spread}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <ul className="space-y-1 text-xs text-fg/90">
                            {d.symptoms.map((sym, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                                <span>{sym}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-2.5 text-xs text-emerald-600 dark:text-emerald-400 leading-relaxed font-medium">
                            {d.prevention}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chapter 3: pH Scale & Household Chemicals Tables */}
          {chapter.id === "note-gen-3" && (
            <div className="space-y-8">
              {/* TABLE 1: PH VALUES */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Everyday Liquids & Substances pH Guide
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-60">
                          Substance / Liquid
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-36">
                          Exact pH Value
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Nature / Category
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Real-World Science & Daily Significance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {filteredPH.map((item) => {
                        const isAcid = item.category.includes("Acid");
                        const isNeutral = item.category === "Pure Neutral";
                        return (
                          <tr key={item.name} className="hover:bg-fg/[0.02] transition">
                            <td className="px-5 py-4 align-top">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-bold text-fg text-sm">{item.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 align-top">
                              <span
                                className={cn(
                                  "font-mono text-xs font-bold px-2.5 py-1 rounded-lg border",
                                  isAcid
                                    ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                    : isNeutral
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    : "bg-sky-500/10 text-sky-500 border-sky-500/20"
                                )}
                              >
                                pH {item.ph}
                              </span>
                            </td>
                            <td className="px-5 py-4 align-top font-mono text-xs text-subtle font-semibold">
                              {item.category}
                            </td>
                            <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">
                              {item.fact}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 2: COMMON HOUSEHOLD CHEMICALS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Common Household Chemicals & Formulas
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                          Common Household Name
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-60">
                          Scientific Chemical Name
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Chemical Formula
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Everyday Life Uses & Applications
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {filteredChemicals.map((c) => (
                        <tr key={c.commonName} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{c.icon}</span> {c.commonName}
                          </td>
                          <td className="px-5 py-4 align-top text-xs text-muted font-mono">{c.chemicalName}</td>
                          <td className="px-5 py-4 align-top">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-fg/[0.06] text-brand-ink border border-line">
                              {c.formula}
                            </span>
                          </td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">{c.uses}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 3: NATURAL ORGANIC ACIDS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Natural Organic Acids in Daily Foods
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                          Daily Food Source
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-64">
                          Principal Organic Acid
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Everyday Science Significance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {NATURAL_ACIDS_DATA.map((na) => (
                        <tr key={na.source} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{na.icon}</span> {na.source}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-brand-ink font-semibold">
                            {na.acid}
                          </td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">
                            {na.fact}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 4: Instruments & SI Units Tables */}
          {chapter.id === "note-gen-4" && (
            <div className="space-y-8">
              {/* TABLE 1: INSTRUMENTS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Famous Scientific Instruments Reference Table
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                          Scientific Instrument
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                          Physical Quantity Measured
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Domain Category
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Underlying Science & Operating Principle
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {filteredInstruments.map((ins) => (
                        <tr key={ins.name} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{ins.icon}</span> {ins.name}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-brand-ink font-semibold">
                            {ins.measures}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-subtle font-medium">
                            {ins.category}
                          </td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">
                            {ins.principle}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 2: SI UNITS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Standard International (SI) Units Table
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                          Physical Quantity
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Official SI Unit
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-32">
                          Unit Symbol
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Definition & Real-World Example
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {SI_UNITS_DATA.map((u) => (
                        <tr key={u.quantity} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm">{u.quantity}</td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-brand-ink font-semibold">
                            {u.unit}
                          </td>
                          <td className="px-5 py-4 align-top">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-fg/[0.06] text-fg border border-line">
                              {u.symbol}
                            </span>
                          </td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">{u.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5: Blood Transfusion & Anatomy Tables */}
          {chapter.id === "note-gen-5" && (
            <div className="space-y-8">
              {/* TABLE 1: BLOOD COMPATIBILITY */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> ABO & Rh Blood Transfusion Compatibility Table
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-40">
                          Blood Group
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          RBC Antigens
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Plasma Antibodies
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                          Can Safely Donate To
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                          Can Safely Receive From
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {BLOOD_COMPATIBILITY_DATA.map((b) => (
                        <tr
                          key={b.group}
                          className={cn(
                            "hover:bg-fg/[0.02] transition",
                            b.highlight === "donor"
                              ? "bg-rose-500/[0.04]"
                              : b.highlight === "recipient"
                              ? "bg-emerald-500/[0.04]"
                              : ""
                          )}
                        >
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm">
                            <span className="font-mono text-xs px-2.5 py-1 rounded-lg border bg-card text-brand-ink font-bold border-brand/30">
                              {b.group}
                            </span>
                          </td>
                          <td className="px-5 py-4 align-top text-xs text-muted font-mono">{b.antigens}</td>
                          <td className="px-5 py-4 align-top text-xs text-muted font-mono">{b.antibodies}</td>
                          <td className="px-5 py-4 align-top text-xs font-semibold text-fg/90">{b.canGive}</td>
                          <td className="px-5 py-4 align-top text-xs font-semibold text-fg/90">{b.canTake}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 2: BODY RECORDS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Human Body Anatomy & Physiological Records
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                          Anatomical Feature
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                          Record Holder / Value
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-36">
                          Category
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Clinical & Biological Significance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {BODY_RECORDS_DATA.map((rec) => (
                        <tr key={rec.metric} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{rec.icon}</span> {rec.metric}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-brand-ink font-bold">
                            {rec.value}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-subtle">{rec.category}</td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">{rec.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 6: Everyday Science Wonders Table */}
          {chapter.id === "note-gen-6" && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-fg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> Everyday Science Mysteries & Core Principles
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                <table className="w-full min-w-[50rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-fg/[0.04]">
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                        Everyday Phenomenon
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                        Governing Scientific Law
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-64">
                        Quick Summary
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                        Deep Real-World Manifestation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {filteredPhenomena.map((p) => (
                      <tr key={p.question} className="hover:bg-fg/[0.02] transition">
                        <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                          <span>{p.icon}</span> {p.question}
                        </td>
                        <td className="px-5 py-4 align-top font-mono text-xs text-brand-ink font-semibold">
                          {p.law}
                        </td>
                        <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed font-medium">
                          {p.shortAnswer}
                        </td>
                        <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">{p.realLife}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chapter 7: Solar System & ISRO Missions Tables */}
          {chapter.id === "note-gen-7" && (
            <div className="space-y-8">
              {/* TABLE 1: PLANETS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> The 8 Planets of Our Solar System
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Planet Name
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Classification
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-48">
                          Orbital Revolution
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Extreme Astronomical Record & Significance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {filteredPlanets.map((pl) => (
                        <tr key={pl.name} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{pl.icon}</span> {pl.name}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-subtle">{pl.category}</td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-brand-ink font-semibold">
                            {pl.orbitPeriod}
                          </td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">
                            <strong className="text-fg">{pl.recordFact}</strong> {pl.significance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 2: ISRO MISSIONS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Landmark ISRO Space Exploration Missions
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-48">
                          ISRO Mission
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-32">
                          Launch Year
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-48">
                          Launch Rocket
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Historic Global Space Achievement
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {filteredMissions.map((m) => (
                        <tr key={m.mission} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{m.icon}</span> {m.mission}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs font-bold text-brand-ink">{m.year}</td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-muted">{m.rocket}</td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">
                            <strong className="text-fg">{m.achievement}</strong> {m.significance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 8: Alloys, Ores & Polymers Tables */}
          {chapter.id === "note-gen-8" && (
            <div className="space-y-8">
              {/* TABLE 1: ALLOYS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Key Metallic Alloys & Chemical Compositions
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Alloy Name
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-60">
                          Constituent Metals & Composition
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                          Key Properties
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Everyday Applications
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {filteredAlloys.map((al) => (
                        <tr key={al.name} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{al.icon}</span> {al.name}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-brand-ink font-semibold">
                            {al.composition}
                          </td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">{al.properties}</td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">{al.uses}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 2: MINERAL ORES */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Commercial Mineral Ores & Extractions
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Mineral Ore
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-48">
                          Chemical Formula
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-40">
                          Metal Extracted
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Industrial & Geographical Importance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {ORES_DATA.map((o) => (
                        <tr key={o.ore} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{o.icon}</span> {o.ore}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs font-bold text-brand-ink">{o.formula}</td>
                          <td className="px-5 py-4 align-top font-mono text-xs font-semibold text-fg/90">{o.metal}</td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">{o.importance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 3: POLYMERS */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> Everyday Polymers & Synthetic Materials
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                  <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-fg/[0.04]">
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Polymer Name
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-60">
                          Chemical / Monomer Name
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                          Polymer Class
                        </th>
                        <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                          Properties & Everyday Uses
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {filteredPolymers.map((pol) => (
                        <tr key={pol.name} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top font-bold text-fg text-sm flex items-center gap-2">
                            <span>{pol.icon}</span> {pol.name}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-brand-ink font-semibold">
                            {pol.chemicalName}
                          </td>
                          <td className="px-5 py-4 align-top font-mono text-xs text-subtle">{pol.category}</td>
                          <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">
                            <strong className="text-fg">{pol.properties}</strong> {pol.uses}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* 2. CARD SHEET VIEW (Strictly Cards Only — Zero Tables)                 */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {viewMode === "cards" && (
        <div className="space-y-8 animate-fade-in">
          {/* Chapter 1: Vitamin & Mineral Cards */}
          {chapter.id === "note-gen-1" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Nutrients" },
                  { id: "fat", label: "🥑 Fat-Soluble (A, D, E, K)" },
                  { id: "water", label: "💧 Water-Soluble (B-Complex, C)" },
                  { id: "mineral", label: "⚡ Minerals (Iron, Calcium, Iodine)" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      haptic("light");
                      setActiveFilter(f.id);
                    }}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95",
                      activeFilter === f.id
                        ? "border-brand bg-brand/[0.12] text-brand-ink font-semibold"
                        : "border-line text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {filteredVitamins.map((v) => (
                  <div
                    key={v.name}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl">{v.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-base">{v.name}</h4>
                          <span className="font-mono text-xs text-muted">{v.chemicalName}</span>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border",
                          v.type === "Fat-Soluble"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : v.type === "Water-Soluble"
                            ? "bg-sky-500/10 text-sky-500 border-sky-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        )}
                      >
                        {v.type}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-xs font-mono text-subtle uppercase">Top Food Sources:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {v.sources.map((src) => (
                          <span
                            key={src}
                            className="font-mono text-xs px-2 py-0.5 rounded-md bg-fg/[0.04] text-fg border border-line"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-mono text-subtle uppercase">Main Benefit:</p>
                      <p className="text-xs text-fg leading-relaxed">{v.benefit}</p>
                    </div>

                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-3 text-xs text-rose-500 leading-relaxed">
                      <strong>Deficiency Disease:</strong> {v.deficiency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 2: Disease Cards */}
          {chapter.id === "note-gen-2" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Diseases" },
                  { id: "bacterial", label: "🦠 Bacterial" },
                  { id: "viral", label: "🧬 Viral" },
                  { id: "mosquito", label: "🦟 Mosquito / Parasitic" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      haptic("light");
                      setActiveFilter(f.id);
                    }}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95",
                      activeFilter === f.id
                        ? "border-brand bg-brand/[0.12] text-brand-ink font-semibold"
                        : "border-line text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {filteredDiseases.map((d) => (
                  <div
                    key={d.name}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl">{d.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-base">{d.name}</h4>
                          <span className="font-mono text-xs text-muted italic">{d.pathogen}</span>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border",
                          d.category === "Bacterial"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : d.category === "Viral"
                            ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        )}
                      >
                        {d.category}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-mono text-subtle uppercase">Mode of Spread:</p>
                      <p className="text-xs text-muted leading-relaxed">{d.spread}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-mono text-subtle uppercase">Symptoms:</p>
                      <ul className="space-y-1 text-xs text-fg/90">
                        {d.symptoms.map((sym, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                            <span>{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3 text-xs text-emerald-600 dark:text-emerald-400 leading-relaxed">
                      <strong>Prevention / Vaccine:</strong> {d.prevention}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 3: pH & Chemical Cards */}
          {chapter.id === "note-gen-3" && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-fg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> Everyday Substances & pH Levels
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredPH.map((item) => {
                  const isAcid = item.category.includes("Acid");
                  const isNeutral = item.category === "Pure Neutral";
                  return (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="font-bold text-fg text-base">{item.name}</h4>
                            <span className="font-mono text-[10px] uppercase text-subtle font-semibold">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "font-mono text-xs font-bold px-2.5 py-1 rounded-lg border",
                            isAcid
                              ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                              : isNeutral
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : "bg-sky-500/10 text-sky-500 border-sky-500/20"
                          )}
                        >
                          pH {item.ph}
                        </span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{item.fact}</p>
                    </div>
                  );
                })}
              </div>

              <h4 className="text-base font-bold text-fg flex items-center gap-2 pt-4">
                <span className="h-2 w-2 rounded-full bg-brand" /> Common Household Chemicals
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredChemicals.map((c) => (
                  <div
                    key={c.commonName}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{c.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-sm">{c.commonName}</h4>
                          <p className="text-xs text-muted font-mono">{c.chemicalName}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-fg/[0.06] text-brand-ink border border-line">
                        {c.formula}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed pt-1">{c.uses}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 4: Instrument & SI Unit Cards */}
          {chapter.id === "note-gen-4" && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-fg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> Scientific Instruments
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredInstruments.map((ins) => (
                  <div
                    key={ins.name}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{ins.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-sm">{ins.name}</h4>
                          <span className="font-mono text-[10px] text-subtle uppercase">{ins.category}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-brand/10 text-brand-ink border border-brand/20">
                        {ins.measures}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{ins.principle}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-base font-bold text-fg flex items-center gap-2 pt-4">
                <span className="h-2 w-2 rounded-full bg-brand" /> SI Base & Derived Units
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                {SI_UNITS_DATA.map((u) => (
                  <div
                    key={u.quantity}
                    className="rounded-2xl border border-line bg-card p-4 card-shadow space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-fg text-sm">{u.quantity}</span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-fg/[0.06] text-fg border border-line">
                        {u.symbol}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-brand-ink font-semibold">{u.unit}</p>
                    <p className="text-xs text-muted leading-relaxed">{u.example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 5: Blood Groups & Anatomy Cards */}
          {chapter.id === "note-gen-5" && (
            <div className="space-y-6">
              {/* Interactive Blood Transfusion Card */}
              <div className="rounded-2xl border border-line bg-card p-4 sm:p-6 card-shadow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-fg text-base flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-500" /> Interactive Blood Transfusion Checker
                    </h4>
                    <p className="text-xs text-muted">
                      Select any patient blood group to instantly inspect compatible donor and recipient rules.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {BLOOD_COMPATIBILITY_DATA.map((b) => (
                      <button
                        key={b.group}
                        type="button"
                        onClick={() => {
                          haptic("light");
                          setSelectedBlood(b.group.split(" ")[0]);
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded-lg font-mono text-xs font-bold border transition active:scale-95",
                          selectedBlood === b.group.split(" ")[0]
                            ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                            : "bg-fg/[0.02] border-line text-muted hover:text-fg hover:border-line-2"
                        )}
                      >
                        {b.group.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 space-y-1.5">
                    <p className="font-mono text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                      Can Safely Receive Red Cells From:
                    </p>
                    <p className="text-sm font-bold text-fg">{activeBloodData.canTake}</p>
                  </div>
                  <div className="rounded-xl border border-brand/20 bg-brand/[0.04] p-4 space-y-1.5">
                    <p className="font-mono text-xs font-bold uppercase text-brand-ink">
                      Can Safely Donate Red Cells To:
                    </p>
                    <p className="text-sm font-bold text-fg">{activeBloodData.canGive}</p>
                  </div>
                </div>
                <p className="text-xs text-muted italic">{activeBloodData.note}</p>
              </div>

              {/* Anatomy Records Cards */}
              <h4 className="text-base font-bold text-fg flex items-center gap-2 pt-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> Human Body Records
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {BODY_RECORDS_DATA.map((rec) => (
                  <div
                    key={rec.metric}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{rec.icon}</span>
                        <h4 className="font-bold text-fg text-sm">{rec.metric}</h4>
                      </div>
                      <span className="font-mono text-[10px] text-subtle uppercase">{rec.category}</span>
                    </div>
                    <p className="font-mono text-sm font-bold text-brand-ink">{rec.value}</p>
                    <p className="text-xs text-muted leading-relaxed">{rec.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 6: Everyday Science Phenomena Cards */}
          {chapter.id === "note-gen-6" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredPhenomena.map((p) => (
                <div
                  key={p.question}
                  className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-3xl shrink-0">{p.icon}</span>
                    <div>
                      <h4 className="font-bold text-fg text-base">{p.question}</h4>
                      <span className="font-mono text-xs font-semibold text-brand-ink">{p.law}</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-brand/20 bg-brand/[0.04] p-3 text-xs text-fg leading-relaxed">
                    <strong>Quick Answer:</strong> {p.shortAnswer}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{p.fullReason}</p>
                  <p className="text-xs text-subtle italic border-t border-line/60 pt-2">
                    <strong>Real-world fact:</strong> {p.realLife}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Chapter 7: Space & ISRO Cards */}
          {chapter.id === "note-gen-7" && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-fg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> Planets in the Solar System
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredPlanets.map((pl) => (
                  <div
                    key={pl.name}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{pl.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-base">{pl.name}</h4>
                          <span className="font-mono text-[10px] text-subtle uppercase">{pl.category}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-fg/[0.06] text-fg border border-line">
                        Year: {pl.orbitPeriod}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-fg/90">{pl.recordFact}</p>
                    <p className="text-xs text-muted leading-relaxed">{pl.significance}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-base font-bold text-fg flex items-center gap-2 pt-4">
                <span className="h-2 w-2 rounded-full bg-brand" /> Landmark ISRO Missions
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredMissions.map((m) => (
                  <div
                    key={m.mission}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{m.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-base">{m.mission}</h4>
                          <span className="font-mono text-xs text-brand-ink font-bold">{m.year}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-fg/[0.06] text-subtle border border-line">
                        {m.rocket}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-fg/90">{m.achievement}</p>
                    <p className="text-xs text-muted leading-relaxed">{m.significance}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-base font-bold text-fg flex items-center gap-2 pt-4">
                <span className="h-2 w-2 rounded-full bg-brand" /> Extreme Moons & Celestial Bodies
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {CELESTIAL_MOONS_DATA.map((cm) => (
                  <div
                    key={cm.name}
                    className="rounded-2xl border border-line bg-card p-4 card-shadow space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{cm.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-sm">{cm.name}</h4>
                          <span className="font-mono text-[10px] text-subtle">{cm.host}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-fg/[0.04] text-subtle border border-line">
                        {cm.diameter}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{cm.feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 8: Alloys, Ores & Polymers Cards */}
          {chapter.id === "note-gen-8" && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-fg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> Metallic Alloys
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredAlloys.map((al) => (
                  <div
                    key={al.name}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{al.icon}</span>
                        <h4 className="font-bold text-fg text-base">{al.name}</h4>
                      </div>
                      <span className="font-mono text-xs font-bold text-brand-ink px-2 py-0.5 rounded-md bg-brand/10 border border-brand/20">
                        {al.composition}
                      </span>
                    </div>
                    <p className="text-xs text-fg/90 font-medium leading-relaxed">{al.properties}</p>
                    <p className="text-xs text-muted leading-relaxed">{al.uses}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-base font-bold text-fg flex items-center gap-2 pt-4">
                <span className="h-2 w-2 rounded-full bg-brand" /> Mineral Ores
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {ORES_DATA.map((o) => (
                  <div
                    key={o.ore}
                    className="rounded-2xl border border-line bg-card p-4 card-shadow space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{o.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-sm">{o.ore}</h4>
                          <span className="font-mono text-xs font-bold text-brand-ink">{o.formula}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-fg/[0.06] text-fg border border-line">
                        Metal: {o.metal}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{o.importance}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-base font-bold text-fg flex items-center gap-2 pt-4">
                <span className="h-2 w-2 rounded-full bg-brand" /> Everyday Polymers & Plastics
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredPolymers.map((pol) => (
                  <div
                    key={pol.name}
                    className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{pol.icon}</span>
                        <div>
                          <h4 className="font-bold text-fg text-sm">{pol.name}</h4>
                          <span className="font-mono text-xs text-muted">{pol.chemicalName}</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-brand/10 text-brand-ink border border-brand/20">
                        {pol.category}
                      </span>
                    </div>
                    <p className="text-xs text-fg/90 font-medium">{pol.properties}</p>
                    <p className="text-xs text-muted leading-relaxed">{pol.uses}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* 3. PRACTICE ARENA VIEW (50-MCQ Self-Assessment Runner)                 */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {viewMode === "practice" && (
        <GeneralSciencePracticeArena
          chapterId={chapter.id}
          chapterTitle={chapter.title}
        />
      )}
    </div>
  );
}
