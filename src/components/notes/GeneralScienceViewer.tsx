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
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Table as TableIcon,
  Thermometer,
  Zap,
} from "lucide-react";
import type { NoteChapter } from "@/data/notes";
import { GENERAL_SCIENCE_ANSWERS } from "@/data/notes/scienceGeneralAnswers";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";

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
  category: "Strong Acid" | "Mild Acid" | "Pure Neutral" | "Mild Alkaline" | "Strong Alkaline";
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
    sources: ["Almonds", "Sunflower Seeds", "Peanuts", "Olive Oil", "Avocados"],
    benefit: "Powerful antioxidant that shields cell membranes from damage, powers hair & skin health.",
    deficiency: "Muscle weakness, numbness, premature cell aging, pale skin.",
  },
  {
    name: "Vitamin K",
    chemicalName: "Phylloquinone",
    type: "Fat-Soluble",
    icon: "🥬",
    sources: ["Spinach", "Cabbage", "Broccoli", "Cauliflower", "Gut Bacteria (natural)"],
    benefit: "Produces prothrombin so blood clots quickly when you get a cut or wound.",
    deficiency: "Uncontrolled bleeding from minor cuts, easy skin bruising, dangerously slow clotting time.",
  },
  {
    name: "Vitamin C",
    chemicalName: "Ascorbic Acid",
    type: "Water-Soluble",
    icon: "🍋",
    sources: ["Amla (Highest source!)", "Guava", "Lemon & Limes", "Oranges", "Green Chilies"],
    benefit: "Builds collagen for gums and blood vessels, fights cold infections, accelerates wound healing.",
    deficiency: "Scurvy: swollen bleeding spongy gums, loose teeth, delayed wound healing, joint pains.",
  },
  {
    name: "Vitamin B₁",
    chemicalName: "Thiamine",
    type: "Water-Soluble",
    icon: "🌾",
    sources: ["Unpolished Brown Rice", "Whole Wheat", "Pulses & Dal", "Nuts", "Seeds"],
    benefit: "Powers heart function, nerve signaling, and releases energy from carbohydrates.",
    deficiency: "Beriberi: severe muscle weakness in legs, extreme fatigue, nerve swelling.",
  },
  {
    name: "Vitamin B₂",
    chemicalName: "Riboflavin",
    type: "Water-Soluble",
    icon: "🥛",
    sources: ["Milk & Curd", "Eggs", "Green Leafy Vegetables", "Cheese"],
    benefit: "Healthy skin tissues, clear eye vision, and cellular energy breakdown.",
    deficiency: "Cheilosis: painful cracks and sores at corners of the mouth, red swollen tongue.",
  },
  {
    name: "Vitamin B₃",
    chemicalName: "Niacin / Nicotinic Acid",
    type: "Water-Soluble",
    icon: "🥜",
    sources: ["Peanuts", "Mushrooms", "Chicken", "Fish", "Whole Grains"],
    benefit: "Maintains healthy digestive tract, glowing skin, and brain metabolism.",
    deficiency: "Pellagra (the 3 D's: Dermatitis / scaly skin rashes, Diarrhea, and Dementia / brain fog).",
  },
  {
    name: "Vitamin B₉",
    chemicalName: "Folic Acid / Folate",
    type: "Water-Soluble",
    icon: "🌱",
    sources: ["Spinach & Methi", "Lentils", "Beans", "Oranges", "Beetroot"],
    benefit: "Forms red blood cells and synthesizes DNA; critical for baby spine development in pregnancy.",
    deficiency: "Megaloblastic Anemia, persistent fatigue, birth defects in newborn infants.",
  },
  {
    name: "Vitamin B₁₂",
    chemicalName: "Cobalamin (Contains Cobalt)",
    type: "Water-Soluble",
    icon: "🧀",
    sources: ["Milk, Curd & Paneer", "Eggs", "Fish", "Meat", "Zero in natural plant foods"],
    benefit: "Builds protective myelin nerve sheath and collaborates with iron to produce red blood cells.",
    deficiency: "Pernicious Anemia, tingling and 'pins-and-needles' numbness in hands and feet.",
  },
  {
    name: "Iron (Fe)",
    chemicalName: "Hemoglobin Core Element",
    type: "Essential Mineral",
    icon: "🩸",
    sources: ["Spinach (Palak)", "Jaggery (Gur)", "Beetroot", "Pomegranate", "Lentils (Dal)"],
    benefit: "Forms the center of Hemoglobin in blood, ferrying oxygen from lungs to every living cell.",
    deficiency: "Anemia: pale yellowish skin, chronic fatigue, shortness of breath, brittle spoon-shaped nails.",
  },
  {
    name: "Calcium (Ca)",
    chemicalName: "Bone Mineral",
    type: "Essential Mineral",
    icon: "🦴",
    sources: ["Milk & Curd", "Ragi (Finger Millet)", "Sesame Seeds (Til)", "Paneer"],
    benefit: "Constructs dense bones and teeth, powers heart muscle contractions, and enables blood clotting.",
    deficiency: "Osteoporosis (brittle porous bones), dental cavities, involuntary muscle cramps and spasms.",
  },
  {
    name: "Iodine (I)",
    chemicalName: "Thyroid Essential",
    type: "Essential Mineral",
    icon: "🧂",
    sources: ["Iodized Salt", "Seafood", "Seaweed"],
    benefit: "Synthesizes thyroxine hormone in the neck to control body growth, brain speed, and metabolism.",
    deficiency: "Goitre: visible swelling in lower neck gland; stunted physical and mental growth in children.",
  },
];

const DISEASES_DATA: DiseaseRow[] = [
  {
    name: "Tuberculosis (TB)",
    pathogen: "Mycobacterium tuberculosis (Bacterium)",
    category: "Bacterial",
    icon: "🫁",
    spread: "Airborne droplets when an infected person coughs, sneezes, or talks",
    symptoms: ["Persistent cough lasting > 2 weeks", "Coughing up blood (hemoptysis)", "Evening low fever and drenching night sweats", "Unexplained rapid weight loss"],
    prevention: "BCG vaccine at birth; full 6-month DOTS antibiotic course without skipping",
  },
  {
    name: "Typhoid Fever",
    pathogen: "Salmonella Typhi (Bacterium)",
    category: "Bacterial",
    icon: "🌡️",
    spread: "Contaminated street food, untreated water, and houseflies carrying bacteria",
    symptoms: ["Continuous high step-ladder fever", "Severe headache & abdominal stomach pain", "Loss of appetite", "Weakness and tiredness"],
    prevention: "Confirmed by Widal blood test; drink boiled or filtered water; Typhoid conjugate vaccine",
  },
  {
    name: "Cholera",
    pathogen: "Vibrio cholerae (Comma-shaped Bacterium)",
    category: "Bacterial",
    icon: "💧",
    spread: "Water and food contaminated with human sewage; poor sanitation",
    symptoms: ["Sudden, continuous 'rice-water' watery loose motions", "Projectile vomiting", "Extreme rapid dehydration", "Sunken eyes and severe muscle cramps"],
    prevention: "Immediate ORS (Oral Rehydration Solution) to replace lost fluids; clean boiled water",
  },
  {
    name: "Tetanus (Lockjaw)",
    pathogen: "Clostridium tetani (Spore-forming Bacterium)",
    category: "Bacterial",
    icon: "🔩",
    spread: "Bacterial spores present in soil, street dust, or rusted metal entering deep cuts",
    symptoms: ["Lockjaw (stiff painful jaw muscles, unable to open mouth)", "Agonizing involuntary body muscle spasms", "Arching of the back (opisthotonos)"],
    prevention: "Tetanus Toxoid (TT injection) within 24–48 hours of any cut; DPT vaccine in childhood",
  },
  {
    name: "Dengue Fever",
    pathogen: "Dengue Flavivirus (DEN-1 to DEN-4)",
    category: "Viral",
    icon: "🦟",
    spread: "Bite of infected female Aedes mosquito (day biter with distinct white-striped legs)",
    symptoms: ["Sudden high burning fever", "Severe piercing pain behind the eyes", "Intense muscle and joint aches ('breakbone fever')", "Rapid dangerous drop in blood platelet count"],
    prevention: "Eliminate standing water in coolers, plant pots, and discarded tyres; apply mosquito repellent",
  },
  {
    name: "Chikungunya",
    pathogen: "Chikungunya Alphavirus",
    category: "Viral",
    icon: "🦵",
    spread: "Bite of female Aedes mosquito during daytime hours",
    symptoms: ["Sudden high fever", "Crippling, severe swelling and pain in multiple joints", "Inability to stand or walk straight", "Red skin rash"],
    prevention: "Prevent mosquito breeding, wear full-sleeved protective clothing, use bed nets",
  },
  {
    name: "Malaria",
    pathogen: "Plasmodium protozoan (P. vivax, P. falciparum)",
    category: "Mosquito / Parasitic",
    icon: "🩸",
    spread: "Bite of infected female Anopheles mosquito (bites predominantly at night and dusk)",
    symptoms: ["Violent shivering and tooth-chattering chills", "High burning fever repeating in 48–72 hour cycles", "Heavy profuse sweating as fever breaks", "Anemia"],
    prevention: "Sleep under insecticide-treated bed nets; antimalarial medicines (Artemisinin, Quinine)",
  },
  {
    name: "Rabies",
    pathogen: "Rabies Lyssavirus (Bullet-shaped Virus)",
    category: "Viral",
    icon: "🐕",
    spread: "Saliva from a bite, scratch, or open wound lick by an infected rabid dog, cat, or monkey",
    symptoms: ["Extreme mental agitation and hallucinations", "Hydrophobia: agonizing throat spasms when attempting to drink or see water", "100% fatal once clinical symptoms begin"],
    prevention: "Immediately wash wound under running tap water with soap for 15 minutes; prompt Post-Exposure Rabies Vaccine series",
  },
  {
    name: "Polio (Poliomyelitis)",
    pathogen: "Poliovirus (Types 1, 2, 3)",
    category: "Viral",
    icon: "🩺",
    spread: "Contaminated food and drinking water via the fecal-oral route",
    symptoms: ["Virus invades spinal cord motor nerves", "Sudden irreversible limp paralysis, usually in one leg", "Lifelong muscle wasting and deformity"],
    prevention: "Oral Polio Vaccine (OPV drops — 'Do Boond Zindagi Ki') and Injectable Inactivated Polio Vaccine (IPV)",
  },
  {
    name: "Ringworm (Daad)",
    pathogen: "Trichophyton & Microsporum (Fungi)",
    category: "Fungal & Lifestyle",
    icon: "🍄",
    spread: "Direct skin contact, sweat, damp clothing, or sharing infected towels and combs",
    symptoms: ["Circular red, itchy, scaly ring-like patches on skin", "Intense burning and scratching urge", "Common in skin folds, groin, and between toes"],
    prevention: "Keep skin clean and dry; do not share towels; apply topical antifungal creams (Clotrimazole)",
  },
];

const PH_SCALE_DATA: PHRow[] = [
  { name: "Battery Acid", ph: "0.0 – 0.5", phValue: 0.2, category: "Strong Acid", icon: "⚡", fact: "Concentrated sulfuric acid (H₂SO₄) used inside automotive vehicle batteries." },
  { name: "Stomach Acid (Gastric Juice)", ph: "1.2 – 2.0", phValue: 1.5, category: "Strong Acid", icon: "🫁", fact: "Dilute hydrochloric acid (HCl) produced by stomach lining; destroys food pathogens and activates pepsin to digest proteins." },
  { name: "Lemon Juice", ph: "2.2 – 2.4", phValue: 2.3, category: "Strong Acid", icon: "🍋", fact: "Rich in natural citric acid (5–6%); dissolves mineral grease and prevents sliced fruits like apples from browning." },
  { name: "Vinegar (Sirka)", ph: "2.4 – 3.0", phValue: 2.7, category: "Strong Acid", icon: "🥗", fact: "4% to 8% acetic acid (CH₃COOH); used in Asian culinary cooking and acts as a natural preservative preventing pickles from spoiling." },
  { name: "Cola / Carbonated Soft Drinks", ph: "2.5 – 3.2", phValue: 2.8, category: "Strong Acid", icon: "🥤", fact: "Contains dissolved carbonic and phosphoric acids; highly corrosive to tooth enamel over prolonged exposure." },
  { name: "Tomato Juice", ph: "4.1 – 4.4", phValue: 4.2, category: "Mild Acid", icon: "🍅", fact: "Contains gentle natural citric and oxalic acids, giving ripe tomatoes their pleasant tang." },
  { name: "Black Coffee", ph: "5.0", phValue: 5.0, category: "Mild Acid", icon: "☕", fact: "Naturally mildly acidic due to chlorogenic and caffeic acids released during coffee bean roasting." },
  { name: "Acid Rain Danger Level", ph: "< 5.6", phValue: 5.2, category: "Mild Acid", icon: "🌧️", fact: "Formed when factory and vehicle smoke (SO₂ and NOₓ) dissolves in cloud moisture; corrodes white marble monuments like the Taj Mahal ('marble cancer')." },
  { name: "Tooth Decay Danger Point", ph: "< 5.5", phValue: 5.4, category: "Mild Acid", icon: "🦷", fact: "CRITICAL THRESHOLD: Tooth enamel is made of calcium hydroxyapatite. When oral bacteria ferment food sugar and drop mouth pH below 5.5, enamel dissolves and cavities begin." },
  { name: "Fresh Cow's Milk", ph: "6.5 – 6.8", phValue: 6.6, category: "Pure Neutral", icon: "🥛", fact: "Slightly acidic near neutral; ferments into sour curd (pH ~4.5) when Lactobacillus bacteria convert milk lactose into lactic acid." },
  { name: "Pure Distilled Water", ph: "7.0", phValue: 7.0, category: "Pure Neutral", icon: "💧", fact: "The exact universal neutral baseline of the pH scale at 25°C, where hydrogen ions (H⁺) perfectly balance hydroxide ions (OH⁻)." },
  { name: "Human Blood & Tears", ph: "7.35 – 7.45", phValue: 7.4, category: "Pure Neutral", icon: "🩸", fact: "Strictly regulated slightly alkaline fluid; maintained by bicarbonate buffers and lungs. Any shift below 7.2 or above 7.6 is life-threatening." },
  { name: "Sea Water", ph: "7.8 – 8.3", phValue: 8.0, category: "Mild Alkaline", icon: "🌊", fact: "Slightly basic because oceans hold dissolved bicarbonate, carbonate, and magnesium mineral salts." },
  { name: "Toothpaste", ph: "8.0 – 9.0", phValue: 8.5, category: "Mild Alkaline", icon: "🪥", fact: "Engineered to be mildly alkaline to immediately neutralize bacterial mouth acids after eating, raising oral pH safely above 5.5." },
  { name: "Baking Soda Solution", ph: "8.5", phValue: 8.5, category: "Mild Alkaline", icon: "🧁", fact: "Sodium Hydrogen Carbonate (NaHCO₃); a safe kitchen base that leavens cakes, soothes acid heartburn, and neutralizes bee stings." },
  { name: "Milk of Magnesia", ph: "10.5", phValue: 10.5, category: "Strong Alkaline", icon: "💊", fact: "Magnesium Hydroxide [Mg(OH)₂]; classic medical antacid suspension that neutralizes excess stomach hydrochloric acid without damaging tissue." },
  { name: "Household Ammonia Cleaner", ph: "11.5", phValue: 11.5, category: "Strong Alkaline", icon: "🧼", fact: "Ammonium hydroxide solution; powerful degreaser used to strip kitchen grease, ovens, and streak-free window glass." },
  { name: "Drain Cleaner / Caustic Lye", ph: "13.5 – 14.0", phValue: 13.8, category: "Strong Alkaline", icon: "🚰", fact: "Concentrated Sodium Hydroxide (NaOH); highly caustic alkali that dissolves hair, fats, and organic plugs inside blocked plumbing pipes." },
];

const CHEMICALS_DATA: ChemicalRow[] = [
  { commonName: "Baking Soda", chemicalName: "Sodium Hydrogen Carbonate", formula: "NaHCO₃", icon: "🧁", uses: "Releases CO₂ gas when heated, making cakes and dhoklas soft and fluffy; acts as a mild antacid and fire extinguisher." },
  { commonName: "Washing Soda", chemicalName: "Sodium Carbonate Decahydrate", formula: "Na₂CO₃·10H₂O", icon: "🧺", uses: "Used in laundry detergents and soaps; permanently softens hard well water by precipitating calcium and magnesium." },
  { commonName: "Bleaching Powder", chemicalName: "Calcium Oxychloride", formula: "CaOCl₂", icon: "🧽", uses: "Smells of chlorine gas; sterilizes municipal drinking water tanks and swimming pools; bleaches textiles and cotton." },
  { commonName: "Plaster of Paris (POP)", chemicalName: "Calcium Sulphate Hemihydrate", formula: "CaSO₄·½H₂O", icon: "🦴", uses: "Made by heating Gypsum at 100°C; doctors use it for setting bone fracture casts; sculptors use it for false ceilings and statues." },
  { commonName: "Gypsum", chemicalName: "Calcium Sulphate Dihydrate", formula: "CaSO₄·2H₂O", icon: "🧱", uses: "Added to cement during manufacturing to slow down its setting time; also the raw material used to manufacture POP." },
  { commonName: "Quicklime", chemicalName: "Calcium Oxide", formula: "CaO", icon: "🔥", uses: "Vigorously reacts with water releasing intense heat (slaking); used in glassmaking and manufacturing slaked lime." },
  { commonName: "Slaked Lime", chemicalName: "Calcium Hydroxide", formula: "Ca(OH)₂", icon: "🖌️", uses: "Mixed with water for whitewashing house walls; turns milky when exposed to CO₂; neutralizes overly acidic farm soil." },
  { commonName: "Marble / Limestone / Chalk", chemicalName: "Calcium Carbonate", formula: "CaCO₃", icon: "🏛️", uses: "Same natural chemical found in eggshells, sea pearls, blackboard chalk, and Taj Mahal marble." },
  { commonName: "Dry Ice", chemicalName: "Solid Carbon Dioxide", formula: "CO₂ (solid)", icon: "🧊", uses: "Frozen at −78.5°C; sublimes straight into cold smoke without melting into liquid; keeps ice cream frozen during shipment." },
  { commonName: "Laughing Gas", chemicalName: "Nitrous Oxide", formula: "N₂O", icon: "😄", uses: "Mild medical and dental anesthetic; also used as a booster oxidizer in high-performance sports car racing." },
  { commonName: "Fitkari (Potash Alum)", chemicalName: "Hydrated Potassium Aluminum Sulfate", formula: "K₂SO₄·Al₂(SO₄)₃·24H₂O", icon: "💎", uses: "Rapidly settles suspended clay dirt in muddy water (coagulation); used as an aftershave to stop razor bleeding." },
];

const NATURAL_ACIDS_DATA: NaturalAcidRow[] = [
  { source: "Lemon, Lime & Orange", acid: "Citric Acid", icon: "🍋", fact: "Natural antioxidant rich in Vitamin C; prevents enzymatic browning on cut fruit." },
  { source: "Curd, Yogurt & Sour Milk", acid: "Lactic Acid", icon: "🥛", fact: "Formed when beneficial Lactobacillus bacteria ferment milk lactose sugar." },
  { source: "Vinegar (Sirka)", acid: "Acetic Acid (Ethanoic Acid)", icon: "🥗", fact: "4–8% solution; gives street chowmein its tang and stops pickle mold from growing." },
  { source: "Tamarind (Imli) & Raw Mango", acid: "Tartaric Acid", icon: "🥭", fact: "Natural souring agent; mixed with baking soda to manufacture double-acting baking powder." },
  { source: "Tomatoes & Raw Spinach", acid: "Oxalic Acid", icon: "🍅", fact: "Gentle organic plant acid; gives tomatoes their mild acidity." },
  { source: "Apples", acid: "Malic Acid", icon: "🍏", fact: "Abundant in crisp green apples; used in sour hard candies." },
  { source: "Red Ant Sting & Nettle Leaf", acid: "Methanoic Acid (Formic Acid)", icon: "🐜", fact: "Causes a sharp burning skin sting; rubbed with baking soda or soap (mild bases) to neutralize the pain." },
];

const INSTRUMENTS_DATA: InstrumentRow[] = [
  { name: "Sphygmomanometer", measures: "Arterial Blood Pressure (mmHg)", category: "Medical & Health", icon: "🫀", principle: "Inflatable arm cuff and mercury/aneroid dial. Normal adult reading is 120 mmHg (systolic pumping) over 80 mmHg (diastolic resting)." },
  { name: "Stethoscope", measures: "Heartbeat Sounds & Lung Respiration", category: "Medical & Health", icon: "🩺", principle: "Amplifies heart 'lub-dub' valve valve closures and lung crackles via acoustic sound reflection. Invented by René Laennec in 1816." },
  { name: "Barometer", measures: "Atmospheric Air Pressure", category: "Weather & Nature", icon: "🌡️", principle: "Measures weight of air using a mercury column. CRITICAL RULE: A sudden sharp plunge in barometer reading warns of an approaching storm or cyclone!" },
  { name: "Lactometer", measures: "Purity & Relative Density of Milk", category: "Weather & Nature", icon: "🥛", principle: "A specialized glass hydrometer based on Archimedes' principle. It floats higher in pure thick milk and sinks deeper if water was mixed in." },
  { name: "Hygrometer", measures: "Air Humidity / Atmospheric Moisture %", category: "Weather & Nature", icon: "💧", principle: "Measures percentage of water vapor moisture in air for meteorology weather forecasting and greenhouse crop climate control." },
  { name: "Altimeter", measures: "Altitude Above Sea Level", category: "Physics & Aviation", icon: "✈️", principle: "Cockpit gauge in aircraft indicating altitude by measuring the gradual drop in atmospheric pressure as height increases." },
  { name: "Anemometer", measures: "Wind Speed & Wind Direction", category: "Weather & Nature", icon: "💨", principle: "Spinning three-cup or propeller mechanism at airports and meteorological stations measuring horizontal wind velocity." },
  { name: "Seismograph", measures: "Earthquake Tremors & Ground Vibrations", category: "Weather & Nature", icon: "📈", principle: "Suspended inertia pendulum that records seismic shockwaves during earthquakes; tremor strength is graded on the logarithmic Richter Scale." },
  { name: "Pyrometer", measures: "Extremely High Temperatures (>1000°C)", category: "Physics & Aviation", icon: "🔥", principle: "Measures thermal radiation from a distance without physical contact; used for blast furnaces, molten steel, or measuring the Sun's surface." },
  { name: "SONAR", measures: "Ocean Depth & Submerged Objects", category: "Physics & Aviation", icon: "🌊", principle: "Sound Navigation and Ranging. Naval ships send ultrasonic sound pulses into deep sea and calculate distance via echo time (2d = v × t)." },
];

const SI_UNITS_DATA: SIUnitRow[] = [
  { quantity: "Force & Weight", unit: "Newton", symbol: "N", example: "Gravitational pull on a medium apple (~100g) is approximately 1 Newton (W = m × g)." },
  { quantity: "Work & Energy", unit: "Joule", symbol: "J", example: "Lifting a 1 kg textbook vertically by 1 metre requires roughly 10 Joules of energy." },
  { quantity: "Electric Power", unit: "Watt", symbol: "W", example: "Rate of energy consumption (1 Joule/sec). LED bulb: 9W; Ceiling fan: 75W; 1 Horsepower (1 HP) = 746 Watts." },
  { quantity: "Commercial Electrical Energy", unit: "Kilowatt-Hour", symbol: "kWh", example: "1 commercial unit on your home electric meter = 1000W × 3600s = 3,600,000 Joules (3.6 × 10⁶ J)." },
  { quantity: "Pressure", unit: "Pascal", symbol: "Pa", example: "1 Newton per square metre (N/m²). Standard atmospheric air pressure at sea level is ~101,325 Pa (1.013 bar)." },
  { quantity: "Voltage / Potential Difference", unit: "Volt", symbol: "V", example: "AA battery: 1.5V; USB phone charger: 5V; Indian household wall socket: 220–240V AC." },
  { quantity: "Electric Resistance", unit: "Ohm", symbol: "Ω", example: "Opposition to current flow in a wire. Governed by Ohm's Law: V = I × R." },
  { quantity: "Eyeglass Lens Power", unit: "Dioptre", symbol: "D", example: "Equal to 1 / focal length in metres. Convex lenses have positive power (+D); concave lenses have negative (−D)." },
  { quantity: "Sound Frequency", unit: "Hertz", symbol: "Hz", example: "Cycles per second. Human audible hearing range spans 20 Hz to 20,000 Hz." },
];

const BLOOD_COMPATIBILITY_DATA: BloodCompatibilityRow[] = [
  {
    group: "O Negative (O−)",
    antigens: "None (No A, B, or Rh)",
    antibodies: "Anti-A, Anti-B",
    canGive: "Universal Red Cell Donor (Everyone: O−, O+, A−, A+, B−, B+, AB−, AB+)",
    canTake: "O− only",
    note: "TRUE UNIVERSAL DONOR: Because its red cells carry zero foreign surface antigens, it is transfused in trauma emergencies when the victim's blood type is unknown.",
    highlight: "donor",
  },
  {
    group: "O Positive (O+)",
    antigens: "Rh factor only",
    antibodies: "Anti-A, Anti-B",
    canGive: "O+, A+, B+, AB+",
    canTake: "O+, O−",
    note: "The most common blood group worldwide. Safe for all Rh-positive patients.",
  },
  {
    group: "A Positive (A+)",
    antigens: "A and Rh",
    antibodies: "Anti-B",
    canGive: "A+, AB+",
    canTake: "A+, A−, O+, O−",
    note: "Second most common type. Plasma contains anti-B antibodies.",
  },
  {
    group: "A Negative (A−)",
    antigens: "A only",
    antibodies: "Anti-B",
    canGive: "A+, A−, AB+, AB−",
    canTake: "A−, O−",
    note: "Can donate to both positive and negative A and AB recipients.",
  },
  {
    group: "B Positive (B+)",
    antigens: "B and Rh",
    antibodies: "Anti-A",
    canGive: "B+, AB+",
    canTake: "B+, B−, O+, O−",
    note: "Very common across South Asia. Plasma contains anti-A antibodies.",
  },
  {
    group: "B Negative (B−)",
    antigens: "B only",
    antibodies: "Anti-A",
    canGive: "B+, B−, AB+, AB−",
    canTake: "B−, O−",
    note: "Rare blood group; can donate to B and AB recipients.",
  },
  {
    group: "AB Positive (AB+)",
    antigens: "A, B, and Rh (All present)",
    antibodies: "None (Zero antibodies in plasma)",
    canGive: "AB+ only",
    canTake: "Universal Recipient (Everyone! A+, A−, B+, B−, AB+, AB−, O+, O−)",
    note: "TRUE UNIVERSAL RECIPIENT: Because its plasma lacks antibodies to attack donor red cells, AB+ individuals can safely receive blood from any group in the world.",
    highlight: "recipient",
  },
  {
    group: "AB Negative (AB−)",
    antigens: "A and B",
    antibodies: "None",
    canGive: "AB+, AB−",
    canTake: "AB−, A−, B−, O−",
    note: "The rarest blood group globally (< 1% of population).",
  },
];

const BODY_RECORDS_DATA: BodyRecordRow[] = [
  { metric: "Largest Organ", value: "Skin", category: "Surface & Barrier", icon: "🛡️", detail: "Covers roughly 1.8 square metres and accounts for 16% of total body weight." },
  { metric: "Largest Internal Organ & Gland", value: "Liver (1.5 kg)", category: "Metabolism", icon: "🫀", detail: "Produces digestive bile, stores energy glycogen, and purifies medicines and waste." },
  { metric: "Smallest Bone", value: "Stapes (Stirrup — 3 mm)", category: "Skeleton & Senses", icon: "👂", detail: "Tucked inside the middle ear. Vibrates to pass sound into the fluid of the inner ear." },
  { metric: "Longest & Strongest Bone", value: "Femur (Thigh bone)", category: "Skeleton", icon: "🦴", detail: "Carries your entire body weight during running, jumping, and standing." },
  { metric: "Hardest Substance in Body", value: "Tooth Enamel", category: "Dental", icon: "🦷", detail: "Harder than bone (96% mineral hydroxyapatite). Dissolves when mouth pH falls below 5.5." },
  { metric: "Kidney Filtering Units", value: "1 Million Nephrons", category: "Excretion", icon: "💧", detail: "Microscopic filters in each kidney cleaning about 180 litres of body fluids daily." },
  { metric: "Normal Body Temperature", value: "37°C (98.6°F)", category: "Vitals", icon: "🌡️", detail: "Maintained by the hypothalamus in the brain to keep cellular enzymes working efficiently." },
  { metric: "Normal Blood Pressure", value: "120/80 mmHg", category: "Vitals", icon: "💓", detail: "120 is systolic pumping pressure; 80 is diastolic resting pressure between beats." },
  { metric: "Average Resting Heart Rate", value: "72 beats / min", category: "Vitals", icon: "⚡", detail: "Generated automatically by the SA Node in the heart (the body's natural pacemaker)." },
  { metric: "Total Adult Bones", value: "206 Bones", category: "Skeleton", icon: "💀", detail: "Infants are born with ~300 soft cartilage bones that fuse together as they mature." },
];

const PHENOMENA_DATA: PhenomenonRow[] = [
  {
    question: "Why is the clear daytime sky blue?",
    law: "Rayleigh Scattering of Light",
    icon: "🌅",
    shortAnswer: "Shallow blue light wavelengths scatter 10 times more intensely than red light.",
    fullReason: "Sunlight is composed of all rainbow colors. When light enters Earth's atmosphere, tiny nitrogen and oxygen gas molecules scatter short-wavelength blue and violet light in every direction far more than long red waves. Your eyes perceive this widely scattered blue light.",
    realLife: "On the airless Moon with no atmosphere, the sky looks completely pitch-black even in broad daylight, with stars clearly visible alongside the Sun!",
  },
  {
    question: "Why are sunsets, sunrises, and danger signals red?",
    law: "Least Scattering of Long Wavelengths",
    icon: "🌇",
    shortAnswer: "Red light has the longest wavelength and penetrates through fog and smoke without scattering.",
    fullReason: "At sunset, sunlight must travel through a much thicker slice of air atmosphere. All blue and green light gets scattered away before reaching your vantage point, leaving only long red and orange rays to reach your eyes. Danger and railway signals use red so drivers can spot them from the maximum distance through winter fog and smoke.",
    realLife: "Airport runway beacons, lighthouse signals, and automobile brake lights universally use red.",
  },
  {
    question: "Why do stars twinkle while planets shine steadily?",
    law: "Atmospheric Refraction of Point Light",
    icon: "✨",
    shortAnswer: "Turbulent layers of hot and cold air constantly bend tiny pinpoint starlight back and forth.",
    fullReason: "Stars are trillions of kilometres away and appear as microscopic pinpoint dots of light. Shifting warm and cold air currents in the atmosphere continually refract (bend) that narrow ray, making it flicker. Planets are much closer and appear as larger discs; the refraction from different edges averages out to a steady glow.",
    realLife: "Looking at objects across a campfire makes them appear to shiver due to rising hot air currents.",
  },
  {
    question: "Why does ice float on water instead of sinking?",
    law: "Anomalous Expansion of Water (Densest at 4°C)",
    icon: "🧊",
    shortAnswer: "Water expands as it freezes, making solid ice about 9% lighter (less dense) than liquid water.",
    fullReason: "Most liquids shrink and become heavier as they freeze. Water is unique: it attains its maximum density at 4°C. As it cools from 4°C down to 0°C, hydrogen bonds lock into an open hexagonal cage structure that expands volume, making ice less dense than water.",
    realLife: "Floating ice acts as an insulating blanket on freezing lakes, keeping the bottom water at 4°C so fish and turtles survive harsh winters!",
  },
  {
    question: "Why does food cook 3 times faster in a pressure cooker?",
    law: "Higher Pressure Raises Boiling Point of Water",
    icon: "🍲",
    shortAnswer: "Trapped steam builds up 2 atmospheres of pressure, raising water's boiling point from 100°C to 120°C.",
    fullReason: "In an open kitchen pot, boiling water can never exceed 100°C because steam escapes freely. In a tightly sealed pressure cooker, accumulated trapped steam doubles internal air pressure, forcing water to boil at 120°C. That significantly higher temperature cooks dal and potatoes in a fraction of normal time.",
    realLife: "Cooking dal on high mountain altitudes takes hours without a pressure cooker because low air pressure causes water to boil at a cooler 90°C.",
  },
  {
    question: "What causes a shimmering mirage on hot summer highways?",
    law: "Total Internal Reflection (TIR) through Heated Air",
    icon: "🏜️",
    shortAnswer: "Scorching asphalt tarmac heats the air, bending downward light upward like a mirror.",
    fullReason: "Blazing sunlight heats the dark asphalt road, creating a thin layer of scorching, less dense air directly above the ground. Downward light rays from the sky bend progressively as they travel through these warm layers until they undergo Total Internal Reflection, bouncing up into your eye. Your brain interprets this reflection of the sky as a pool of water.",
    realLife: "Desert travelers seeing false illusions of shimmering water oases on hot sand dunes.",
  },
  {
    question: "How does a rainbow form in the sky?",
    law: "Dispersion, Refraction & Internal Reflection in Raindrops",
    icon: "🌈",
    shortAnswer: "Millions of suspended raindrops act as miniature prisms, splitting white sunlight into 7 colors.",
    fullReason: "When sunlight strikes a falling raindrop, it bends (refracts), reflects off the inner back surface of the water droplet, and bends again as it emerges (dispersion), separating white light into Red on the outer edge (42°) and Violet on the inner edge (40°).",
    realLife: "Spraying a fine water mist from a garden hose with the sun behind you generates an instant rainbow.",
  },
  {
    question: "Why can't sound travel in outer space?",
    law: "Sound is a Mechanical Wave Needing Matter",
    icon: "🔇",
    shortAnswer: "Sound travels by vibrating physical air or solid molecules; outer space is an empty vacuum.",
    fullReason: "Sound is a pressure vibration that requires molecules (air, water, or steel) to transfer energy. Outer space is a near-total vacuum with virtually no particles. Astronauts on spacewalks must speak using radio headsets because radio waves are electromagnetic and travel freely through empty space.",
    realLife: "Movie scenes with booming explosive sounds during spaceship battles in space are scientifically inaccurate!",
  },
  {
    question: "Why does a freshly sliced apple turn brown?",
    law: "Enzymatic Oxidation (Polyphenol Oxidase)",
    icon: "🍏",
    shortAnswer: "Cutting breaks plant cells, allowing iron-rich enzymes to react with atmospheric oxygen.",
    fullReason: "When an apple is sliced, its inner cells rupture. The enzyme polyphenol oxidase (PPO) reacts with oxygen in the air, converting natural plant phenols into brown melanin pigments.",
    realLife: "Squeezing a few drops of lemon juice (Vitamin C antioxidant) over apple slices stops browning completely!",
  },
  {
    question: "Why do we cry when cutting fresh onions?",
    law: "Volatile Sulfur Gas forming Mild Sulfuric Acid",
    icon: "🧅",
    shortAnswer: "Cutting mixes onion enzymes, producing a sulfur gas that reacts with eye tears to form mild acid.",
    fullReason: "Chopping an onion breaks cell membranes, allowing alliinase enzymes to produce a gas called Syn-propanethial-S-oxide. When this gas drifts into your eyes, it reacts with natural tear moisture to create trace sulfuric acid, triggering tear glands to flush it away.",
    realLife: "Chilling onions in the fridge before cutting or using a razor-sharp knife reduces cell ruptures and tear gas.",
  },
  {
    question: "Why do massive steel ships float while a small iron nail sinks?",
    law: "Archimedes' Principle & Buoyant Displacement",
    icon: "🚢",
    shortAnswer: "A ship's hollow hull displaces a volume of water whose weight is greater than the entire ship.",
    fullReason: "An iron nail is solid and dense; it displaces very little water, so the upward buoyant force is less than its weight, and it sinks. A steel ship is designed with a massive hollow hull filled with air. Its wide shape displaces huge amounts of water, generating an upward buoyant push greater than the entire ship's weight.",
    realLife: "Loading cargo causes a ship to sink slightly deeper until the extra water displaced balances the new weight.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function GeneralScienceViewer({
  chapter,
  onSelectChapter,
}: {
  chapter: NoteChapter;
  onSelectChapter: (id: string) => void;
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
            <ListChecks className="h-4 w-4" /> Practice Quiz
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
      {/* CHAPTER 1: VITAMINS & MINERALS                                        */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {chapter.id === "note-gen-1" && (
        <div className="space-y-8">
          {/* Filter Pills */}
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

          {/* TABLE VIEW */}
          {viewMode === "table" && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
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
                          <div className="flex items-start gap-3">
                            <span className="text-2xl shrink-0 mt-0.5">{v.icon}</span>
                            <div>
                              <p className="font-bold text-fg text-base">{v.name}</p>
                              <p className="font-mono text-xs text-brand-ink font-medium mt-0.5">
                                {v.chemicalName}
                              </p>
                              <span
                                className={cn(
                                  "inline-block mt-2 font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md border",
                                  v.type === "Fat-Soluble"
                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                                    : v.type === "Water-Soluble"
                                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30"
                                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
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
                                className="rounded-lg bg-fg/[0.04] border border-line/70 px-2 py-1 text-xs text-fg font-medium"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top leading-relaxed text-fg">
                          {v.benefit}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-3 text-xs leading-relaxed text-rose-700 dark:text-rose-300">
                            <strong>⚠️ Risk:</strong> {v.deficiency}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CARDS VIEW */}
          {viewMode === "cards" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredVitamins.map((v) => (
                <div
                  key={v.name}
                  className="rounded-2xl border border-line bg-card p-5 card-shadow space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{v.icon}</span>
                      <div>
                        <h4 className="text-lg font-bold text-fg">{v.name}</h4>
                        <p className="font-mono text-xs text-brand-ink">{v.chemicalName}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase border",
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

                  <div>
                    <p className="font-mono text-[11px] uppercase text-subtle font-semibold">
                      Best Food Sources:
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {v.sources.map((s) => (
                        <span
                          key={s}
                          className="rounded-lg bg-fg/[0.04] border border-line px-2 py-0.5 text-xs text-fg"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-[11px] uppercase text-subtle font-semibold">
                      Body Function:
                    </p>
                    <p className="mt-1 text-xs text-fg leading-relaxed">{v.benefit}</p>
                  </div>

                  <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-3 text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
                    <strong>Deficiency:</strong> {v.deficiency}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* High-Yield Memory Callout */}
          <div className="rounded-2xl border border-brand/30 bg-brand/[0.04] p-4 sm:p-5 flex items-start gap-3.5">
            <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-fg leading-relaxed space-y-1">
              <p className="font-bold">Quick Exam Memory Trick:</p>
              <p>
                • Fat-soluble vitamins are <strong>K, E, D, and A</strong> (Mnemonic:{" "}
                <strong>K-E-D-A</strong>). They are stored in liver fat.
              </p>
              <p>
                • Water-soluble vitamins are <strong>B-Complex and C</strong>. They cannot be stored in
                the body and must be consumed daily.
              </p>
              <p>
                • Adding a squeeze of lemon (Vitamin C) to dal triples plant iron absorption!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* CHAPTER 2: COMMON DISEASES & SYMPTOMS                                 */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {chapter.id === "note-gen-2" && (
        <div className="space-y-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Diseases" },
              { id: "bacterial", label: "🧫 Bacterial (TB, Typhoid, Cholera, Tetanus)" },
              { id: "viral", label: "🦠 Viral (Dengue, Rabies, Polio)" },
              { id: "mosquito", label: "🦟 Mosquito-Borne (Malaria, Chikungunya)" },
              { id: "fungal", label: "🍄 Fungal & Skin" },
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

          {/* TABLE VIEW */}
          {viewMode === "table" && (
            <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
              <table className="w-full min-w-[50rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-fg/[0.04]">
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                      Disease & Causative Pathogen
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                      How It Spreads (Transmission)
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                      Key Warning Symptoms to Identify
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-64">
                      Prevention & Vaccines
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {filteredDiseases.map((d) => (
                    <tr key={d.name} className="hover:bg-fg/[0.02] transition">
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl shrink-0 mt-0.5">{d.icon}</span>
                          <div>
                            <p className="font-bold text-fg text-base">{d.name}</p>
                            <p className="text-xs text-subtle mt-0.5 leading-snug">{d.pathogen}</p>
                            <span className="inline-block mt-2 font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-fg/[0.04] border border-line text-brand-ink">
                              {d.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top text-xs text-muted leading-relaxed">
                        {d.spread}
                      </td>
                      <td className="px-5 py-4 align-top">
                        <ul className="space-y-1.5 text-xs text-fg">
                          {d.symptoms.map((s, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3 text-xs leading-relaxed text-emerald-700 dark:text-emerald-300">
                          <strong>🛡️ Protection:</strong> {d.prevention}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CARDS VIEW */}
          {viewMode === "cards" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredDiseases.map((d) => (
                <div
                  key={d.name}
                  className="rounded-2xl border border-line bg-card p-5 card-shadow space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{d.icon}</span>
                      <div>
                        <h4 className="text-lg font-bold text-fg">{d.name}</h4>
                        <p className="text-xs text-subtle">{d.pathogen}</p>
                      </div>
                    </div>
                    <span className="rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase bg-fg/[0.04] border border-line text-brand-ink">
                      {d.category}
                    </span>
                  </div>

                  <div className="rounded-xl border border-line/60 bg-fg/[0.02] p-3 text-xs">
                    <p className="font-mono text-[10px] uppercase text-subtle font-bold">Spread Route:</p>
                    <p className="text-fg mt-0.5">{d.spread}</p>
                  </div>

                  <div>
                    <p className="font-mono text-[11px] uppercase text-subtle font-semibold mb-1">
                      Key Warning Symptoms:
                    </p>
                    <ul className="space-y-1 text-xs text-fg">
                      {d.symptoms.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3 text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    <strong>🛡️ Prevention:</strong> {d.prevention}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* CHAPTER 3: EVERYDAY PH VALUES & CHEMICALS                             */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {chapter.id === "note-gen-3" && (
        <div className="space-y-8">
          {/* Visual pH Scale Gradient Banner with Key Markers */}
          <div className="rounded-2xl border border-line bg-card p-4 sm:p-6 card-shadow space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-fg flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-brand-ink" /> The Everyday pH Scale (0 to 14)
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Universal scale from highly corrosive acids to powerful alkaline cleaners.
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                pH 7.0 = Pure Water (Exact Neutral)
              </span>
            </div>

            {/* pH Rainbow Spectrum Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="h-5 w-full rounded-full bg-gradient-to-r from-rose-600 via-amber-500 via-emerald-500 via-sky-500 to-purple-600 shadow-inner" />
              <div className="flex justify-between font-mono text-[11px] text-subtle px-1">
                <span>0 (Strong Acid)</span>
                <span>3.5 (Mild Acid)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">7.0 (Neutral)</span>
                <span>10.5 (Antacid)</span>
                <span>14 (Strong Base)</span>
              </div>
            </div>

            {/* Tappable Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {[
                { id: "all", label: "All Items (18)" },
                { id: "acid-strong", label: "🔴 Strong Acids (0 – 3.0)" },
                { id: "acid-mild", label: "🟠 Mild Acids (3.1 – 6.9)" },
                { id: "neutral", label: "🟢 Neutral (7.0 – 7.4)" },
                { id: "alkaline-mild", label: "🔵 Mild Alkaline (7.5 – 9.0)" },
                { id: "alkaline-strong", label: "🟣 Strong Alkaline (9.1 – 14.0)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    haptic("light");
                    setActiveFilter(btn.id);
                  }}
                  className={cn(
                    "rounded-full border px-3.5 py-1 text-xs sm:text-sm font-medium transition active:scale-95",
                    activeFilter === btn.id
                      ? "border-brand bg-brand/[0.12] text-brand-ink font-semibold"
                      : "border-line text-muted hover:border-line-2 hover:text-fg"
                  )}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE 1: PH VALUES REFERENCE TABLE */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Everyday Liquids & Substances pH Guide
            </h4>

            {viewMode === "table" ? (
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
                      const isStrongBase = item.category === "Strong Alkaline";
                      return (
                        <tr key={item.name} className="hover:bg-fg/[0.02] transition">
                          <td className="px-5 py-4 align-top">
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl">{item.icon}</span>
                              <span className="font-bold text-fg text-base">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 align-top">
                            <span
                              className={cn(
                                "inline-block font-mono text-xs font-bold px-3 py-1 rounded-lg border",
                                isAcid
                                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                                  : isNeutral
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                  : isStrongBase
                                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30"
                                  : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30"
                              )}
                            >
                              pH {item.ph}
                            </span>
                          </td>
                          <td className="px-5 py-4 align-top">
                            <span
                              className={cn(
                                "inline-block font-mono text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-md",
                                isAcid
                                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                  : isNeutral
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                              )}
                            >
                              {item.category}
                            </span>
                          </td>
                          <td className="px-5 py-4 align-top leading-relaxed text-fg">
                            {item.fact}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* CARDS VIEW FOR PH */
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
            )}
          </div>

          {/* TABLE 2: COMMON HOUSEHOLD CHEMICALS & FORMULAS */}
          <div className="space-y-3 pt-4">
            <h4 className="text-base font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Common Household Chemicals & Chemical Formulas
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
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{c.icon}</span>
                          <span className="font-bold text-fg text-base">{c.commonName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top text-fg font-medium">
                        {c.chemicalName}
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-brand/10 text-brand-ink border border-brand/20">
                          {c.formula}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top leading-relaxed text-muted text-xs sm:text-sm">
                        {c.uses}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE 3: NATURAL FOOD ACIDS */}
          <div className="space-y-3 pt-4">
            <h4 className="text-base font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Natural Organic Acids in Daily Foods
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-fg/[0.04]">
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-64">
                      Food / Natural Source
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                      Natural Acid Present
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                      Daily Fact & Remedy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {NATURAL_ACIDS_DATA.map((na) => (
                    <tr key={na.source} className="hover:bg-fg/[0.02] transition">
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{na.icon}</span>
                          <span className="font-bold text-fg">{na.source}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          {na.acid}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top text-xs sm:text-sm text-muted leading-relaxed">
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

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* CHAPTER 4: SI UNITS & SCIENTIFIC INSTRUMENTS                          */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {chapter.id === "note-gen-4" && (
        <div className="space-y-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Instruments" },
              { id: "medical", label: "🩺 Medical (BP, Heart, Stethoscope)" },
              { id: "weather", label: "🌡️ Weather (Barometer, Milk, Wind)" },
              { id: "physics", label: "⚡ Physics & Navigation (SONAR, Pyrometer)" },
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

          {/* TABLE 1: SCIENTIFIC INSTRUMENTS */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Essential Scientific Instruments & Gauges
            </h4>

            {viewMode === "table" ? (
              <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-fg/[0.04]">
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                        Instrument Name
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-60">
                        What It Measures
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                        Field Category
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                        Working Principle & Everyday Use
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {filteredInstruments.map((ins) => (
                      <tr key={ins.name} className="hover:bg-fg/[0.02] transition">
                        <td className="px-5 py-4 align-top">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{ins.icon}</span>
                            <span className="font-bold text-fg text-base">{ins.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top font-semibold text-fg">
                          {ins.measures}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <span className="font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-fg/[0.04] border border-line text-brand-ink">
                            {ins.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 align-top text-xs sm:text-sm text-muted leading-relaxed">
                          {ins.principle}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredInstruments.map((ins) => (
                  <div
                    key={ins.name}
                    className="rounded-2xl border border-line bg-card p-5 card-shadow space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{ins.icon}</span>
                      <div>
                        <h4 className="font-bold text-fg text-base">{ins.name}</h4>
                        <span className="font-mono text-[10px] uppercase text-subtle font-semibold">
                          {ins.category}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border border-line/60 bg-fg/[0.02] p-3 text-xs">
                      <p className="font-mono text-[10px] uppercase text-subtle font-bold">Measures:</p>
                      <p className="font-bold text-fg mt-0.5">{ins.measures}</p>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{ins.principle}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TABLE 2: CORE SI UNITS */}
          <div className="space-y-3 pt-4">
            <h4 className="text-base font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Core SI Units & Everyday Conversions
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-fg/[0.04]">
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                      Physical Quantity
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                      SI Unit Name
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-28">
                      Symbol
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                      Real-Life Example & Formula
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {SI_UNITS_DATA.map((u) => (
                    <tr key={u.quantity} className="hover:bg-fg/[0.02] transition">
                      <td className="px-5 py-4 align-top font-bold text-fg">{u.quantity}</td>
                      <td className="px-5 py-4 align-top font-semibold text-fg">{u.unit}</td>
                      <td className="px-5 py-4 align-top">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-brand/10 text-brand-ink border border-brand/20">
                          {u.symbol}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top text-xs sm:text-sm text-muted leading-relaxed">
                        {u.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* CHAPTER 5: HUMAN BODY QUICK FACTS & BLOOD GROUPS                      */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {chapter.id === "note-gen-5" && (
        <div className="space-y-8">
          {/* Interactive Blood Compatibility Checker */}
          <div className="rounded-2xl border border-line bg-card p-4 sm:p-6 card-shadow space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-fg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" /> Interactive Blood Compatibility Checker
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Tap any blood group to instantly see compatible donors and recipients.
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                O− = Universal Donor · AB+ = Universal Recipient
              </span>
            </div>

            {/* Blood Group Tappable Selector */}
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 pt-1">
              {["O-", "O+", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => {
                    haptic("light");
                    setSelectedBlood(bg);
                  }}
                  className={cn(
                    "rounded-xl border py-2.5 text-center font-mono text-sm font-bold transition active:scale-95",
                    selectedBlood === bg
                      ? "border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-500/30"
                      : "border-line bg-fg/[0.02] text-fg hover:border-rose-500/50"
                  )}
                >
                  {bg}
                </button>
              ))}
            </div>

            {/* Result Box */}
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-4 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-fg">{activeBloodData.group}</span>
                {activeBloodData.highlight === "donor" ? (
                  <span className="font-mono text-[10px] font-bold text-rose-500 uppercase px-2.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    Universal Donor
                  </span>
                ) : activeBloodData.highlight === "recipient" ? (
                  <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Universal Recipient
                  </span>
                ) : null}
              </div>

              <div className="grid gap-2 sm:grid-cols-2 text-xs">
                <div className="rounded-lg border border-line bg-card p-3">
                  <p className="font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ Can Safely Donate To:
                  </p>
                  <p className="font-bold text-fg mt-1 text-sm">{activeBloodData.canGive}</p>
                </div>
                <div className="rounded-lg border border-line bg-card p-3">
                  <p className="font-mono text-[10px] uppercase text-sky-600 dark:text-sky-400 font-bold">
                    ✓ Can Safely Receive From:
                  </p>
                  <p className="font-bold text-fg mt-1 text-sm">{activeBloodData.canTake}</p>
                </div>
              </div>

              <p className="text-muted text-xs leading-relaxed">{activeBloodData.note}</p>
            </div>
          </div>

          {/* TABLE 1: BLOOD GROUP TRANSFUSION MATRIX */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Complete ABO & Rh Blood Compatibility Reference
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
              <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-fg/[0.04]">
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-36">
                      Blood Group
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-44">
                      Red Cell Antigens
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-40">
                      Plasma Antibodies
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                      Safe To Donate To
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-60">
                      Safe To Receive From
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
                          ? "bg-rose-500/[0.03]"
                          : b.highlight === "recipient"
                          ? "bg-emerald-500/[0.03]"
                          : ""
                      )}
                    >
                      <td className="px-5 py-4 align-top font-mono font-bold text-base text-fg">
                        {b.group}
                      </td>
                      <td className="px-5 py-4 align-top text-xs text-fg">{b.antigens}</td>
                      <td className="px-5 py-4 align-top text-xs text-subtle">{b.antibodies}</td>
                      <td className="px-5 py-4 align-top text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {b.canGive}
                      </td>
                      <td className="px-5 py-4 align-top text-xs font-semibold text-sky-600 dark:text-sky-400">
                        {b.canTake}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE 2: BODY RECORDS & NORMAL NUMBERS */}
          <div className="space-y-3 pt-4">
            <h4 className="text-base font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Human Body Record Book & Standard Vitals
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
              <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-fg/[0.04]">
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-60">
                      Body Metric / Record
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-52">
                      Standard Value / Organ
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-40">
                      Category
                    </th>
                    <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                      Physiological Significance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {BODY_RECORDS_DATA.map((rec) => (
                    <tr key={rec.metric} className="hover:bg-fg/[0.02] transition">
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{rec.icon}</span>
                          <span className="font-bold text-fg text-base">{rec.metric}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top font-bold text-brand-ink">
                        {rec.value}
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-fg/[0.04] border border-line text-subtle">
                          {rec.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top text-xs sm:text-sm text-muted leading-relaxed">
                        {rec.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* CHAPTER 6: EVERYDAY SCIENCE PHENOMENA (WHY IT HAPPENS)                */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {chapter.id === "note-gen-6" && (
        <div className="space-y-8">
          <div className="space-y-3">
            <h4 className="text-base font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> Real-World Scientific Phenomena Explained
            </h4>

            {viewMode === "table" ? (
              <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm">
                <table className="w-full min-w-[50rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-fg/[0.04]">
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-64">
                        Daily Question & Observation
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-56">
                        Scientific Principle
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle">
                        Plain-English Scientific Explanation
                      </th>
                      <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-subtle w-64">
                        Everyday Real-Life Example
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {filteredPhenomena.map((p) => (
                      <tr key={p.question} className="hover:bg-fg/[0.02] transition">
                        <td className="px-5 py-4 align-top">
                          <div className="flex items-start gap-2.5">
                            <span className="text-2xl shrink-0 mt-0.5">{p.icon}</span>
                            <span className="font-bold text-fg text-base">{p.question}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-brand/10 text-brand-ink border border-brand/20">
                            {p.law}
                          </span>
                        </td>
                        <td className="px-5 py-4 align-top text-xs sm:text-sm text-fg leading-relaxed">
                          {p.fullReason}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="rounded-xl border border-line/60 bg-fg/[0.02] p-3 text-xs text-muted leading-relaxed flex items-start gap-2">
                            <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{p.realLife}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredPhenomena.map((p) => (
                  <div
                    key={p.question}
                    className="rounded-2xl border border-line bg-card p-5 card-shadow space-y-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.icon}</span>
                      <h4 className="font-bold text-fg text-base leading-snug">{p.question}</h4>
                    </div>

                    <div className="rounded-xl border border-brand/20 bg-brand/[0.04] p-3 text-xs">
                      <p className="font-mono text-[10px] uppercase font-bold text-brand-ink">
                        Core Law: {p.law}
                      </p>
                      <p className="font-semibold text-fg mt-1">{p.shortAnswer}</p>
                    </div>

                    <p className="text-xs text-muted leading-relaxed">{p.fullReason}</p>

                    <div className="rounded-xl border border-line/60 bg-fg/[0.02] p-3 text-xs text-subtle flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{p.realLife}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* PRACTICE ARENA: MCQs WITH INSTANT VALIDATION                          */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {viewMode === "practice" && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-2xl border border-brand/30 bg-brand/[0.04] p-4 text-xs sm:text-sm text-fg flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ListChecks className="h-5 w-5 text-brand-ink shrink-0" />
              <div>
                <p className="font-bold text-fg">Self-Assessment Arena</p>
                <p className="text-muted text-xs">
                  Tap an option to immediately test your retention of this chapter.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-brand/10 text-brand-ink">
              5 Questions
            </span>
          </div>

          <div className="space-y-4">
            {chapter.sections
              .flatMap((s) => s.points || [])
              .filter((p) => p.startsWith("**") && p.includes("\n("))
              .map((raw, idx) => {
                const qNum = String(idx + 1);
                const qKey = `${chapter.id}-${qNum}`;
                const ans = GENERAL_SCIENCE_ANSWERS[qKey];
                return (
                  <PracticeQuestionItem
                    key={qKey}
                    index={idx + 1}
                    rawText={raw}
                    answer={ans}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                        PRACTICE QUESTION ITEM HELPER                       */
/* -------------------------------------------------------------------------- */

function PracticeQuestionItem({
  index,
  rawText,
  answer,
}: {
  index: number;
  rawText: string;
  answer?: { correctKey: string; explanation: string };
}) {
  const [picked, setPicked] = useState<string | null>(null);

  // Parse question text and options
  const parts = rawText.split("\n");
  const questionTitle = parts[0].replace(/^\*\*\d+\.\s*/, "").replace(/\*\*$/, "").trim();
  const optionsLine = parts[1] || "";

  // Extract (A) ... (B) ... (C) ... (D) ...
  const optionMatches = [...optionsLine.matchAll(/\(([A-D])\)\s*([^·()]+)/g)];
  const options = optionMatches.map((m) => ({ key: m[1], label: m[2].trim() }));

  const hasAnswered = picked !== null;
  const isCorrect = picked === answer?.correctKey;

  return (
    <div className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-3.5">
      <div className="flex items-start gap-2.5">
        <span className="font-mono text-xs font-bold text-brand-ink bg-brand/10 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
          Q{index}
        </span>
        <h4 className="text-sm sm:text-base font-semibold text-fg leading-snug">{questionTitle}</h4>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 pt-1">
        {options.map((opt) => {
          const isSelected = picked === opt.key;
          const isActualCorrect = answer?.correctKey === opt.key;

          let btnClass = "border-line bg-card text-muted hover:border-line-2 hover:text-fg";
          if (hasAnswered) {
            if (isActualCorrect) {
              btnClass =
                "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold";
            } else if (isSelected) {
              btnClass = "border-rose-500 bg-rose-500/10 text-rose-500";
            } else {
              btnClass = "border-line opacity-50 cursor-not-allowed";
            }
          }

          return (
            <button
              key={opt.key}
              type="button"
              disabled={hasAnswered}
              onClick={() => {
                haptic("light");
                setPicked(opt.key);
              }}
              className={cn(
                "flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs sm:text-sm transition active:scale-98",
                btnClass
              )}
            >
              <span className="font-mono text-xs font-bold shrink-0">({opt.key})</span>
              <span className="flex-1">{opt.label}</span>
              {hasAnswered && isActualCorrect && (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {hasAnswered && answer && (
        <div className="mt-3 rounded-xl border border-line-2 bg-fg/[0.03] p-3.5 text-xs animate-fade-in space-y-1.5">
          <p className="font-bold flex items-center gap-1.5 text-fg">
            {isCorrect ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                ✓ Correct!
              </span>
            ) : (
              <span className="text-rose-500 flex items-center gap-1">
                ✗ Incorrect. Correct answer is ({answer.correctKey})
              </span>
            )}
          </p>
          <p className="text-muted leading-relaxed">{answer.explanation}</p>
        </div>
      )}
    </div>
  );
}
