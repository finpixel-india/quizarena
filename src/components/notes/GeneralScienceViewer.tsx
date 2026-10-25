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
  Layers,
  Lightbulb,
  ListChecks,
  LucideIcon,
  Search,
  ShieldAlert,
  Sparkles,
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

interface VitaminCardData {
  id: string;
  name: string;
  type: "Fat-Soluble" | "Water-Soluble" | "Mineral";
  chemicalName: string;
  icon: string;
  sources: string[];
  benefit: string;
  deficiency: string;
}

interface DiseaseCardData {
  id: string;
  name: string;
  category: "Bacterial" | "Viral" | "Mosquito / Parasite" | "Fungal & Lifestyle";
  icon: string;
  spread: string;
  symptoms: string[];
  prevention: string;
}

interface PHItemData {
  name: string;
  ph: number | string;
  phValue: number;
  category: "Strong Acid" | "Mild Acid" | "Neutral" | "Mild Alkaline" | "Strong Alkaline";
  fact: string;
}

interface InstrumentData {
  name: string;
  measures: string;
  category: "Medical & Health" | "Weather & Nature" | "Physics & Naval";
  icon: string;
  useCase: string;
}

interface BodyFactData {
  title: string;
  metric: string;
  category: string;
  icon: string;
  detail: string;
}

interface SciencePhenomenonData {
  question: string;
  icon: string;
  shortAnswer: string;
  fullReason: string;
  everydayExample: string;
}

/* -------------------------------------------------------------------------- */
/*                               STATIC DATA                                  */
/* -------------------------------------------------------------------------- */

const VITAMINS_LIST: VitaminCardData[] = [
  {
    id: "vit-a",
    name: "Vitamin A",
    type: "Fat-Soluble",
    chemicalName: "Retinol / β-Carotene",
    icon: "🥕",
    sources: ["Carrots", "Sweet Potato", "Spinach", "Papaya", "Egg Yolk", "Mango"],
    benefit: "Sharp night vision, healthy cornea, and glowing skin.",
    deficiency: "Night Blindness (difficulty seeing in dark), dry eyes.",
  },
  {
    id: "vit-d",
    name: "Vitamin D",
    type: "Fat-Soluble",
    chemicalName: "Calciferol (Sunshine)",
    icon: "☀️",
    sources: ["Morning Sunlight", "Cow's Milk", "Egg Yolk", "Salmon", "Mushrooms"],
    benefit: "Absorbs calcium into bones and teeth to keep them rock-hard.",
    deficiency: "Rickets in kids (bowed legs), weak soft bones in adults.",
  },
  {
    id: "vit-e",
    name: "Vitamin E",
    type: "Fat-Soluble",
    chemicalName: "Tocopherol",
    icon: "🥑",
    sources: ["Almonds", "Sunflower Seeds", "Peanuts", "Olive Oil", "Avocados"],
    benefit: "Powerful antioxidant that protects cells, hair, and youthful skin.",
    deficiency: "Muscle weakness, numbness, and pale skin.",
  },
  {
    id: "vit-k",
    name: "Vitamin K",
    type: "Fat-Soluble",
    chemicalName: "Phylloquinone",
    icon: "🥬",
    sources: ["Spinach (Palak)", "Cabbage", "Broccoli", "Gut Bacteria (natural)"],
    benefit: "Helps blood clot quickly when you get a cut or scrape.",
    deficiency: "Uncontrolled bleeding, easy bruising, slow clotting time.",
  },
  {
    id: "vit-c",
    name: "Vitamin C",
    type: "Water-Soluble",
    chemicalName: "Ascorbic Acid",
    icon: "🍋",
    sources: ["Amla (Highest!)", "Guava", "Lemon", "Oranges", "Green Chilies"],
    benefit: "Boosts immune defense, produces collagen, heals wounds fast.",
    deficiency: "Scurvy: swollen bleeding gums, loose teeth, delayed healing.",
  },
  {
    id: "vit-b1",
    name: "Vitamin B₁",
    type: "Water-Soluble",
    chemicalName: "Thiamine",
    icon: "🌾",
    sources: ["Unpolished Brown Rice", "Whole Wheat", "Pulses", "Nuts"],
    benefit: "Powers heart, brain nerves, and releases energy from carbohydrates.",
    deficiency: "Beriberi: weak leg muscles, fatigue, nerve numbness.",
  },
  {
    id: "vit-b2",
    name: "Vitamin B₂",
    type: "Water-Soluble",
    chemicalName: "Riboflavin",
    icon: "🥛",
    sources: ["Milk & Curd", "Eggs", "Green Leafy Veggies", "Cheese"],
    benefit: "Healthy skin, clear vision, and red blood cell production.",
    deficiency: "Cheilosis: painful cracks at corners of mouth, sore tongue.",
  },
  {
    id: "vit-b3",
    name: "Vitamin B₃",
    type: "Water-Soluble",
    chemicalName: "Niacin",
    icon: "🥜",
    sources: ["Peanuts", "Mushrooms", "Chicken", "Fish", "Whole Grains"],
    benefit: "Healthy digestion, glowing skin, and nervous system energy.",
    deficiency: "Pellagra: rough scaly skin rash, diarrhea, brain fog.",
  },
  {
    id: "vit-b9",
    name: "Vitamin B₉",
    type: "Water-Soluble",
    chemicalName: "Folic Acid / Folate",
    icon: "🌱",
    sources: ["Palak & Methi", "Lentils", "Beans", "Oranges", "Beetroot"],
    benefit: "Crucial for making DNA, new blood cells, and fetal spinal growth.",
    deficiency: "Anemia, extreme fatigue, birth defects in newborn babies.",
  },
  {
    id: "vit-b12",
    name: "Vitamin B₁₂",
    type: "Water-Soluble",
    chemicalName: "Cobalamin (Has Cobalt)",
    icon: "🧀",
    sources: ["Milk & Paneer", "Curd", "Eggs", "Fish", "Zero in plant foods"],
    benefit: "Protects nerve fibers and makes red blood cells with iron.",
    deficiency: "Pernicious Anemia, tingling and numbness in hands and feet.",
  },
  {
    id: "min-iron",
    name: "Iron (Fe)",
    type: "Mineral",
    chemicalName: "Hemoglobin Core",
    icon: "🩸",
    sources: ["Spinach (Palak)", "Jaggery (Gur)", "Beetroot", "Pomegranate", "Dal"],
    benefit: "Carries oxygen in blood from lungs to every organ.",
    deficiency: "Anemia: pale skin, constant tiredness, spoon-shaped nails.",
  },
  {
    id: "min-calcium",
    name: "Calcium (Ca)",
    type: "Mineral",
    chemicalName: "Bone Mineral",
    icon: "🦴",
    sources: ["Milk & Curd", "Ragi (Finger Millet)", "Sesame Seeds (Til)", "Paneer"],
    benefit: "Builds hard bones, strong teeth, and powers muscle movement.",
    deficiency: "Weak porous bones (osteoporosis), tooth decay, muscle cramps.",
  },
  {
    id: "min-iodine",
    name: "Iodine (I)",
    type: "Mineral",
    chemicalName: "Thyroid Essential",
    icon: "🧂",
    sources: ["Iodized Salt", "Seafood", "Seaweed"],
    benefit: "Powers thyroid gland in neck to regulate body energy and growth.",
    deficiency: "Goitre: visible swelling in neck; slow child brain growth.",
  },
];

const DISEASES_LIST: DiseaseCardData[] = [
  {
    id: "dis-tb",
    name: "Tuberculosis (TB)",
    category: "Bacterial",
    icon: "🫁",
    spread: "Air droplets when an infected person coughs or sneezes",
    symptoms: ["Cough lasting more than 2 weeks", "Coughing up blood (hemoptysis)", "Evening fever and night sweats", "Rapid weight loss"],
    prevention: "BCG vaccine at birth; complete DOTS course",
  },
  {
    id: "dis-typhoid",
    name: "Typhoid Fever",
    category: "Bacterial",
    icon: "🌡️",
    spread: "Contaminated street food, unboiled drinking water, and houseflies",
    symptoms: ["Continuous high step-ladder fever", "Severe headache & stomach pain", "Loss of appetite", "Weakness"],
    prevention: "Widal blood test, drink boiled water, typhoid vaccine",
  },
  {
    id: "dis-cholera",
    name: "Cholera",
    category: "Bacterial",
    icon: "💧",
    spread: "Water contaminated with human waste and poor hygiene",
    symptoms: ["Sudden profuse 'rice-water' loose motions", "Projectile vomiting", "Rapid severe dehydration", "Sunken eyes & cramps"],
    prevention: "Immediate ORS (Oral Rehydration Solution) & safe clean water",
  },
  {
    id: "dis-tetanus",
    name: "Tetanus (Lockjaw)",
    category: "Bacterial",
    icon: "🔩",
    spread: "Spores from soil, road dust, or rusty metal entering deep cuts",
    symptoms: ["Lockjaw (tight jaw muscles, cannot open mouth)", "Agonizing body muscle spasms", "Stiff neck and back arching"],
    prevention: "Tetanus Toxoid (TT injection) within 24–48 hours of any cut",
  },
  {
    id: "dis-dengue",
    name: "Dengue Fever",
    category: "Viral",
    icon: "🦟",
    spread: "Female Aedes mosquito (day biter, white striped legs)",
    symptoms: ["Sudden burning high fever", "Intense pain behind the eyes", "Severe joint & bone aches ('breakbone')", "Rapid platelet drop"],
    prevention: "Clear standing water in coolers/pots; mosquito repellent",
  },
  {
    id: "dis-chikungunya",
    name: "Chikungunya",
    category: "Viral",
    icon: "🦵",
    spread: "Female Aedes mosquito (day biter)",
    symptoms: ["High fever", "Severe crippling joint pain and swelling", "Inability to walk straight", "Body rash"],
    prevention: "Prevent mosquito breeding, long sleeve clothing",
  },
  {
    id: "dis-malaria",
    name: "Malaria",
    category: "Mosquito / Parasite",
    icon: "🩸",
    spread: "Female Anopheles mosquito (night biter)",
    symptoms: ["Violent shivering chills", "High burning fever repeating every 2–3 days", "Heavy sweating when fever drops", "Headache"],
    prevention: "Mosquito nets, antimalarial tablets (Quinine, Artemisinin)",
  },
  {
    id: "dis-rabies",
    name: "Rabies",
    category: "Viral",
    icon: "🐕",
    spread: "Bite or scratch from an infected rabid dog, cat, or monkey",
    symptoms: ["Agitation and confusion", "Hydrophobia: painful throat spasms when seeing/drinking water", "100% fatal once symptoms start"],
    prevention: "Wash bite with soap under running tap 15 mins + rabies injections",
  },
  {
    id: "dis-polio",
    name: "Polio",
    category: "Viral",
    icon: "🩺",
    spread: "Contaminated drinking water and food (fecal-oral route)",
    symptoms: ["Attacks spinal nerves", "Sudden irreversible limp paralysis in legs", "Deformed limbs"],
    prevention: "Oral Polio Vaccine (OPV drops — 'Do Boond Zindagi Ki')",
  },
  {
    id: "dis-ringworm",
    name: "Ringworm (Daad)",
    category: "Fungal & Lifestyle",
    icon: "🍄",
    spread: "Skin contact, sweat, damp clothes, and shared towels",
    symptoms: ["Circular red itchy scaly rings on skin", "Intense burning itch", "Thrives in body folds and groin"],
    prevention: "Keep skin dry, bathe daily, antifungal creams (Clotrimazole)",
  },
];

const PH_SCALE_ITEMS: PHItemData[] = [
  { name: "Battery Acid", ph: "0.0 – 0.5", phValue: 0.2, category: "Strong Acid", fact: "Concentrated sulfuric acid inside automotive batteries" },
  { name: "Stomach Acid (Gastric)", ph: "1.2 – 2.0", phValue: 1.5, category: "Strong Acid", fact: "Dilute HCl kills food germs and activates pepsin to digest food" },
  { name: "Lemon Juice", ph: "2.2 – 2.4", phValue: 2.3, category: "Strong Acid", fact: "Rich in natural citric acid; dissolves kitchen grease" },
  { name: "Vinegar (Sirka)", ph: "2.4 – 3.0", phValue: 2.7, category: "Strong Acid", fact: "4–8% acetic acid; preserves pickles from spoiling" },
  { name: "Cola / Fizzy Drinks", ph: "2.5 – 3.2", phValue: 2.8, category: "Strong Acid", fact: "Contains phosphoric acid; dissolves tooth enamel over time" },
  { name: "Tomato Juice", ph: "4.1 – 4.4", phValue: 4.2, category: "Mild Acid", fact: "Contains mild oxalic and citric acids" },
  { name: "Black Coffee", ph: "5.0", phValue: 5.0, category: "Mild Acid", fact: "Mildly acidic natural beverage" },
  { name: "Acid Rain", ph: "< 5.6", phValue: 5.2, category: "Mild Acid", fact: "Caused by smoke pollution; discolors Taj Mahal marble" },
  { name: "Tooth Decay Danger Point", ph: "< 5.5", phValue: 5.4, category: "Mild Acid", fact: "Tooth enamel dissolves and cavities start when mouth pH drops below 5.5" },
  { name: "Fresh Cow's Milk", ph: "6.5 – 6.8", phValue: 6.6, category: "Neutral", fact: "Sours into curd (pH ~4.5) via lactic acid bacteria" },
  { name: "Pure Distilled Water", ph: "7.0", phValue: 7.0, category: "Neutral", fact: "The exact neutral baseline of the pH scale at 25°C" },
  { name: "Human Blood & Tears", ph: "7.35 – 7.45", phValue: 7.4, category: "Neutral", fact: "Strictly buffered slightly alkaline fluid; essential for survival" },
  { name: "Sea Water", ph: "7.8 – 8.3", phValue: 8.0, category: "Mild Alkaline", fact: "Slightly basic due to dissolved carbonate and salt minerals" },
  { name: "Toothpaste", ph: "8.0 – 9.0", phValue: 8.5, category: "Mild Alkaline", fact: "Neutralizes mouth acids after meals to prevent tooth decay" },
  { name: "Baking Soda Solution", ph: "8.5", phValue: 8.5, category: "Mild Alkaline", fact: "Mild kitchen base; leavens cakes and soothes bee stings" },
  { name: "Milk of Magnesia", ph: "10.5", phValue: 10.5, category: "Strong Alkaline", fact: "Magnesium hydroxide; classic antacid that cures stomach acidity" },
  { name: "Household Ammonia", ph: "11.5", phValue: 11.5, category: "Strong Alkaline", fact: "Powerful cleaning liquid for grease and glass windows" },
  { name: "Drain Cleaner / Lye", ph: "13.5 – 14.0", phValue: 13.8, category: "Strong Alkaline", fact: "Caustic soda (NaOH); dissolves hair and grease clogs in pipes" },
];

const INSTRUMENTS_LIST: InstrumentData[] = [
  { name: "Sphygmomanometer", measures: "Blood Pressure (mmHg)", category: "Medical & Health", icon: "🫀", useCase: "Inflatable arm cuff used in clinics. Normal reading is 120/80 mmHg." },
  { name: "Stethoscope", measures: "Heartbeats & Lung Sounds", category: "Medical & Health", icon: "🩺", useCase: "Amplifies heart 'lub-dub' sounds via sound reflection. Invented by Laennec." },
  { name: "Barometer", measures: "Atmospheric Air Pressure", category: "Weather & Nature", icon: "🌡️", useCase: "Weather forecasting. A sudden sharp drop warns of an approaching storm or cyclone!" },
  { name: "Lactometer", measures: "Purity & Density of Milk", category: "Weather & Nature", icon: "🥛", useCase: "Floats higher in pure thick milk; sinks deeper if water was added (Archimedes' law)." },
  { name: "Hygrometer", measures: "Air Humidity / Moisture", category: "Weather & Nature", icon: "💧", useCase: "Measures percentage of moisture in air for weather forecasts and greenhouse farming." },
  { name: "Altimeter", measures: "Altitude Above Sea Level", category: "Physics & Naval", icon: "✈️", useCase: "Cockpit instrument in aircraft showing flight height based on atmospheric pressure drop." },
  { name: "Anemometer", measures: "Wind Speed & Velocity", category: "Weather & Nature", icon: "💨", useCase: "Spinning cup wheel at airports and weather towers measuring wind velocity." },
  { name: "Seismograph", measures: "Earthquake Tremors", category: "Weather & Nature", icon: "📈", useCase: "Detects and draws ground shockwaves during earthquakes; graded on Richter scale." },
  { name: "Pyrometer", measures: "Extremely High Temperatures (>1000°C)", category: "Physics & Naval", icon: "🔥", useCase: "Measures blast furnaces or the surface of the Sun remotely from a distance without touching." },
  { name: "SONAR", measures: "Ocean Depth & Underwater Objects", category: "Physics & Naval", icon: "🌊", useCase: "Ships and submarines send ultrasonic sound echoes into the deep sea (2d = v × t)." },
];

const BODY_RECORDS_LIST: BodyFactData[] = [
  { title: "Largest Organ", metric: "Skin", category: "Surface & Barrier", icon: "🛡️", detail: "Covers about 1.8 square metres and makes up 16% of your body weight." },
  { title: "Largest Internal Organ", metric: "Liver (1.5 kg)", category: "Metabolism", icon: "🫀", detail: "Makes bile for digestion, stores glycogen, and cleans medicines and toxins." },
  { title: "Smallest Bone", metric: "Stapes (3 mm)", category: "Hearing", icon: "👂", detail: "Located inside your middle ear. Vibrates to send sound to your inner ear." },
  { title: "Longest & Strongest Bone", metric: "Femur (Thigh bone)", category: "Skeleton", icon: "🦴", detail: "Supports your full body weight during walking, running, and jumping." },
  { title: "Hardest Substance", metric: "Tooth Enamel", category: "Dental", icon: "🦷", detail: "Harder than bone or steel (96% minerals). Dissolves when mouth pH < 5.5." },
  { title: "Kidney Filtering Units", metric: "1 Million Nephrons", category: "Excretion", icon: "💧", detail: "Microscopic filters in each kidney cleaning about 180 litres of blood daily." },
  { title: "Normal Body Temp", metric: "37°C / 98.6°F", category: "Vitals", icon: "🌡️", detail: "Controlled by the hypothalamus in the brain to keep enzymes working perfectly." },
  { title: "Normal Blood Pressure", metric: "120/80 mmHg", category: "Vitals", icon: "💓", detail: "120 is pumping pressure (systolic); 80 is resting pressure (diastolic)." },
  { title: "Average Heart Rate", metric: "72 beats / min", category: "Vitals", icon: "⚡", detail: "Triggered by the SA Node in your right atrium (your natural pacemaker)." },
  { title: "Total Adult Bones", metric: "206 Bones", category: "Skeleton", icon: "💀", detail: "Babies are born with ~300 soft bones that fuse together as they grow." },
];

const PHENOMENA_LIST: SciencePhenomenonData[] = [
  {
    question: "Why is the clear sky blue?",
    icon: "🌅",
    shortAnswer: "Blue light scatters 10 times more than red light.",
    fullReason: "Sunlight is made of all rainbow colors. When light hits tiny air molecules in Earth's atmosphere, short blue wavelengths scatter in all directions (Rayleigh Scattering) far more than red light. That scattered blue light is what your eyes see.",
    everydayExample: "On the Moon with no atmosphere, the sky looks completely pitch-black even in daytime!",
  },
  {
    question: "Why are sunsets and brake lights red?",
    icon: "🌇",
    shortAnswer: "Red light has the longest wavelength and scatters the least.",
    fullReason: "At sunset, sunlight travels through a very thick layer of air. All the blue and violet light gets scattered away before reaching you, leaving only red and orange rays. Danger lights and brake lights are red so they pierce through fog, dust, and smoke from the farthest distance.",
    everydayExample: "Railway signals and airport beacons use red so drivers can see them in thick winter fog.",
  },
  {
    question: "Why do stars twinkle while planets don't?",
    icon: "✨",
    shortAnswer: "Atmospheric air layers bend tiny pinpoint starlight back and forth.",
    fullReason: "Stars are trillions of kilometres away, appearing as tiny pinpoint dots. Moving layers of warm and cool air constantly refract (bend) that pinpoint beam, making it flicker. Planets are much closer and act as larger discs whose light averages out to a steady shine.",
    everydayExample: "Looking through the hot air rising above a campfire makes background objects look like they are shivering.",
  },
  {
    question: "Why does ice float on water?",
    icon: "🧊",
    shortAnswer: "Water expands as it freezes, making ice lighter than liquid water.",
    fullReason: "Water is special: it reaches its heaviest density at 4°C. As it cools down to 0°C, it expands into an open cage crystal lattice, making ice about 9% lighter (less dense) than liquid water. This keeps lake bottoms liquid at 4°C so fish survive freezing winters!",
    everydayExample: "Ice cubes always float at the top of your glass of cold lemonade.",
  },
  {
    question: "Why does food cook faster in a pressure cooker?",
    icon: "🍲",
    shortAnswer: "Trapped steam raises the boiling temperature of water from 100°C to 120°C.",
    fullReason: "In an open pot, boiling water can never get hotter than 100°C because steam escapes. In a sealed pressure cooker, trapped steam builds up 2 times normal atmospheric pressure, forcing water to boil at 120°C. That extra heat cooks dal and rice in one-third the time.",
    everydayExample: "Cooking dal on high mountain altitudes takes hours without a pressure cooker because water boils at only 90°C there.",
  },
  {
    question: "What causes a mirage on hot summer highways?",
    icon: "🏜️",
    shortAnswer: "Hot ground air bends light like a mirror (Total Internal Reflection).",
    fullReason: "Sunlight bakes the asphalt road, creating a thin layer of scorching, less dense air near the ground. Downward light rays from the sky bend progressively through the air until they reflect completely upward into your eye. Your brain interprets this reflection as a shimmering puddle of water.",
    everydayExample: "Desert travelers seeing illusions of oases on sand dunes.",
  },
  {
    question: "How does a rainbow form?",
    icon: "🌈",
    shortAnswer: "Raindrops act like tiny glass prisms that split white sunlight into 7 colors.",
    fullReason: "When sunlight enters a raindrop, it bends (refracts), reflects off the back of the drop, and bends again as it exits (dispersion), separating white light into Red on the outside (42°) and Violet on the inside (40°).",
    everydayExample: "A garden hose spraying fine mist in the sun creates an instant mini-rainbow.",
  },
  {
    question: "Why can't sound travel through space?",
    icon: "🔇",
    shortAnswer: "Sound needs air or matter particles to vibrate; space is an empty vacuum.",
    fullReason: "Sound is a physical mechanical wave that moves by vibrating air molecules. Outer space is a near-total vacuum with no air molecules. Astronauts must use radio headsets because radio waves are electromagnetic and travel freely through space.",
    everydayExample: "Hollywood movies with noisy explosions in space are scientifically inaccurate!",
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
  const [viewMode, setViewMode] = useState<"visual" | "table" | "practice">("visual");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedBlood, setSelectedBlood] = useState("O-");

  // Blood compatibility calculation
  const bloodCompatibility = useMemo(() => {
    switch (selectedBlood) {
      case "O-":
        return {
          type: "O Negative (O−)",
          badge: "Universal Red Cell Donor",
          canGive: "Everyone (O−, O+, A−, A+, B−, B+, AB−, AB+)",
          canTake: "O− only",
          note: "Carries no A, B, or Rh antigens. Safe for emergency transfusions without typing.",
        };
      case "O+":
        return {
          type: "O Positive (O+)",
          badge: "Most Common Blood Group",
          canGive: "O+, A+, B+, AB+",
          canTake: "O+, O−",
          note: "Has Rh antigen but no A or B antigens.",
        };
      case "A+":
        return {
          type: "A Positive (A+)",
          badge: "Common Type",
          canGive: "A+, AB+",
          canTake: "A+, A−, O+, O−",
          note: "Has A and Rh antigens; plasma has anti-B antibodies.",
        };
      case "A-":
        return {
          type: "A Negative (A−)",
          badge: "Rare Type",
          canGive: "A+, A−, AB+, AB−",
          canTake: "A−, O−",
          note: "Has A antigen only.",
        };
      case "B+":
        return {
          type: "B Positive (B+)",
          badge: "Common Type",
          canGive: "B+, AB+",
          canTake: "B+, B−, O+, O−",
          note: "Has B and Rh antigens; plasma has anti-A antibodies.",
        };
      case "B-":
        return {
          type: "B Negative (B−)",
          badge: "Rare Type",
          canGive: "B+, B−, AB+, AB−",
          canTake: "B−, O−",
          note: "Has B antigen only.",
        };
      case "AB+":
        return {
          type: "AB Positive (AB+)",
          badge: "Universal Recipient",
          canGive: "AB+ only",
          canTake: "Everyone! (Universal Recipient: A+, A−, B+, B−, AB+, AB−, O+, O−)",
          note: "Has A, B, and Rh antigens, meaning it has zero antibodies in plasma to attack donor blood.",
        };
      case "AB-":
        return {
          type: "AB Negative (AB−)",
          badge: "Rarest Blood Group",
          canGive: "AB+, AB−",
          canTake: "AB−, A−, B−, O−",
          note: "Lacks Rh factor but has both A and B antigens.",
        };
      default:
        return {
          type: "O Negative (O−)",
          badge: "Universal Donor",
          canGive: "Everyone",
          canTake: "O− only",
          note: "Universal donor.",
        };
    }
  }, [selectedBlood]);

  // Chapter 1: Filtered Vitamins
  const filteredVitamins = useMemo(() => {
    return VITAMINS_LIST.filter((v) => {
      const matchFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "fat"
          ? v.type === "Fat-Soluble"
          : activeFilter === "water"
          ? v.type === "Water-Soluble"
          : v.type === "Mineral";
      const matchSearch =
        searchQuery === ""
          ? true
          : v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.chemicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.deficiency.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.sources.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Chapter 2: Filtered Diseases
  const filteredDiseases = useMemo(() => {
    return DISEASES_LIST.filter((d) => {
      const matchFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "bacterial"
          ? d.category === "Bacterial"
          : activeFilter === "viral"
          ? d.category === "Viral"
          : activeFilter === "mosquito"
          ? d.category === "Mosquito / Parasite"
          : d.category === "Fungal & Lifestyle";
      const matchSearch =
        searchQuery === ""
          ? true
          : d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.spread.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.prevention.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Chapter 3: Filtered pH scale
  const filteredPH = useMemo(() => {
    return PH_SCALE_ITEMS.filter((item) => {
      const matchFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "acid"
          ? item.category.includes("Acid")
          : activeFilter === "neutral"
          ? item.category === "Neutral"
          : item.category.includes("Alkaline");
      const matchSearch =
        searchQuery === ""
          ? true
          : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.fact.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(item.ph).includes(searchQuery);
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Chapter 4: Filtered Instruments
  const filteredInstruments = useMemo(() => {
    return INSTRUMENTS_LIST.filter((ins) => {
      const matchFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "medical"
          ? ins.category === "Medical & Health"
          : activeFilter === "weather"
          ? ins.category === "Weather & Nature"
          : ins.category === "Physics & Naval";
      const matchSearch =
        searchQuery === ""
          ? true
          : ins.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ins.measures.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ins.useCase.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Chapter 6: Filtered Phenomena
  const filteredPhenomena = useMemo(() => {
    return PHENOMENA_LIST.filter((p) => {
      return (
        searchQuery === "" ||
        p.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fullReason.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* ─── Top Control Bar: Mode Toggle & Search ─── */}
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-3 sm:p-4 card-shadow sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-xl bg-fg/[0.04] p-1 border border-line">
          <button
            type="button"
            onClick={() => {
              haptic("light");
              setViewMode("visual");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition active:scale-95",
              viewMode === "visual"
                ? "bg-brand text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" /> Visual Cards
          </button>
          <button
            type="button"
            onClick={() => {
              haptic("light");
              setViewMode("table");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition active:scale-95",
              viewMode === "table"
                ? "bg-brand text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <Layers className="h-3.5 w-3.5" /> Reference Table
          </button>
          <button
            type="button"
            onClick={() => {
              haptic("light");
              setViewMode("practice");
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition active:scale-95",
              viewMode === "practice"
                ? "bg-brand text-white shadow-sm"
                : "text-muted hover:text-fg"
            )}
          >
            <ListChecks className="h-3.5 w-3.5" /> Practice MCQs
          </button>
        </div>

        {viewMode !== "practice" ? (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-subtle" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in this chapter..."
              className="w-full rounded-xl border border-line bg-fg/[0.02] pl-8 pr-3 py-1.5 text-xs sm:text-sm text-fg outline-none placeholder:text-subtle focus:border-brand/70"
            />
          </div>
        ) : null}
      </div>

      {/* ─── CHAPTER 1: VITAMINS & MINERALS ─── */}
      {chapter.id === "note-gen-1" && (
        <div className="space-y-6">
          {viewMode === "visual" && (
            <div className="space-y-5">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Nutrients" },
                  { id: "fat", label: "🥑 Fat-Soluble (A, D, E, K)" },
                  { id: "water", label: "💧 Water-Soluble (B, C)" },
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
                      "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95",
                      activeFilter === f.id
                        ? "border-brand bg-brand/[0.1] text-brand-ink"
                        : "border-line text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Visual Nutrient Cards Grid */}
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredVitamins.map((v) => (
                  <div
                    key={v.id}
                    className="flex flex-col justify-between rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow transition hover:border-brand/40 hover:bg-brand/[0.02]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fg/[0.04] text-xl border border-line">
                            {v.icon}
                          </span>
                          <div>
                            <h4 className="text-base font-bold text-fg leading-tight">{v.name}</h4>
                            <p className="font-mono text-[11px] text-brand-ink font-semibold">{v.chemicalName}</p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase",
                            v.type === "Fat-Soluble"
                              ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              : v.type === "Water-Soluble"
                              ? "bg-sky-500/10 text-sky-500 border border-sky-500/20"
                              : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          )}
                        >
                          {v.type}
                        </span>
                      </div>

                      {/* Best Food Sources Chips */}
                      <div className="mt-3.5">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-subtle mb-1.5">Top Food Sources:</p>
                        <div className="flex flex-wrap gap-1">
                          {v.sources.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-line bg-fg/[0.02] px-2 py-0.5 text-[11px] font-medium text-fg"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Benefit */}
                      <p className="mt-3 text-xs leading-relaxed text-muted">
                        <strong className="text-fg">Benefit:</strong> {v.benefit}
                      </p>
                    </div>

                    {/* Deficiency alert */}
                    <div className="mt-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 p-2.5 text-xs text-rose-500 flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span><strong>Deficiency:</strong> {v.deficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── CHAPTER 2: DISEASES & SYMPTOMS ─── */}
      {chapter.id === "note-gen-2" && (
        <div className="space-y-6">
          {viewMode === "visual" && (
            <div className="space-y-5">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Diseases" },
                  { id: "bacterial", label: "🦠 Bacterial (TB, Typhoid, Tetanus)" },
                  { id: "viral", label: "🧬 Viral (Dengue, Rabies, Polio)" },
                  { id: "mosquito", label: "🦟 Mosquito Parasite (Malaria)" },
                  { id: "fungal", label: "🍄 Fungal (Ringworm)" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      haptic("light");
                      setActiveFilter(f.id);
                    }}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95",
                      activeFilter === f.id
                        ? "border-brand bg-brand/[0.1] text-brand-ink"
                        : "border-line text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Disease Cards Grid */}
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDiseases.map((d) => (
                  <div
                    key={d.id}
                    className="flex flex-col justify-between rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow transition hover:border-brand/40"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fg/[0.04] text-xl border border-line">
                            {d.icon}
                          </span>
                          <div>
                            <h4 className="text-base font-bold text-fg leading-tight">{d.name}</h4>
                            <span className="font-mono text-[10px] text-subtle uppercase">{d.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Transmission */}
                      <div className="mt-3 rounded-lg border border-line/60 bg-fg/[0.02] p-2 text-xs text-muted">
                        <strong className="text-fg">How it spreads:</strong> {d.spread}
                      </div>

                      {/* Symptoms List */}
                      <div className="mt-3">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-subtle mb-1.5">Key Warning Signs:</p>
                        <ul className="space-y-1 text-xs text-muted">
                          {d.symptoms.map((symp, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                              <span>{symp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Prevention Pill */}
                    <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-start gap-2">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span><strong>Prevention:</strong> {d.prevention}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── CHAPTER 3: PH VALUES & CHEMICALS ─── */}
      {chapter.id === "note-gen-3" && (
        <div className="space-y-6">
          {viewMode === "visual" && (
            <div className="space-y-6">
              {/* Interactive pH Scale Bar Banner */}
              <div className="rounded-2xl border border-line bg-card p-4 sm:p-6 card-shadow space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-fg flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-brand-ink" /> The pH Scale Spectrum (0 to 14)
                    </h3>
                    <p className="text-xs text-muted">
                      Tap any range to filter liquids from dangerous acids to heavy cleaners.
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-brand/10 text-brand-ink border border-brand/20">
                    7.0 = Neutral (Pure Water)
                  </span>
                </div>

                {/* pH Spectrum Bar */}
                <div className="h-4 w-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-sky-500 to-purple-600 shadow-inner" />

                {/* Tappable pH Category Filters */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { id: "all", label: "All Items", range: "0 – 14" },
                    { id: "acid", label: "Acidic (< 7.0)", range: "Lemon, Coffee, Colas" },
                    { id: "neutral", label: "Neutral (7.0 – 7.4)", range: "Pure Water, Blood" },
                    { id: "alkaline", label: "Alkaline (> 7.0)", range: "Toothpaste, Antacids" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => {
                        haptic("light");
                        setActiveFilter(btn.id);
                      }}
                      className={cn(
                        "flex flex-col items-start rounded-xl border p-2.5 sm:p-3 text-left transition active:scale-95",
                        activeFilter === btn.id
                          ? "border-brand bg-brand/[0.08] glow"
                          : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:text-fg"
                      )}
                    >
                      <span className="text-xs font-bold text-fg">{btn.label}</span>
                      <span className="font-mono text-[10px] text-subtle truncate">{btn.range}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* pH Cards List */}
              <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPH.map((item) => {
                  const isAcid = item.phValue < 6.9;
                  const isNeutral = item.phValue >= 6.9 && item.phValue <= 7.45;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card p-3.5 transition hover:border-brand/40"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-fg truncate">{item.name}</h4>
                          <span
                            className={cn(
                              "font-mono text-[10px] px-1.5 py-0.2 rounded font-semibold",
                              isAcid
                                ? "bg-rose-500/10 text-rose-500"
                                : isNeutral
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-sky-500/10 text-sky-500"
                            )}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted line-clamp-1 mt-0.5">{item.fact}</p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-lg px-2.5 py-1 font-mono text-xs font-bold border",
                          isAcid
                            ? "border-rose-500/30 bg-rose-500/10 text-rose-500"
                            : isNeutral
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                            : "border-sky-500/30 bg-sky-500/10 text-sky-500"
                        )}
                      >
                        pH {item.ph}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── CHAPTER 4: SI UNITS & INSTRUMENTS ─── */}
      {chapter.id === "note-gen-4" && (
        <div className="space-y-6">
          {viewMode === "visual" && (
            <div className="space-y-5">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Instruments" },
                  { id: "medical", label: "🩺 Medical (BP, Heart, Stethoscope)" },
                  { id: "weather", label: "🌡️ Weather (Barometer, Milk, Wind)" },
                  { id: "physics", label: "✈️ Aviation & Naval (SONAR, Heat)" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      haptic("light");
                      setActiveFilter(f.id);
                    }}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95",
                      activeFilter === f.id
                        ? "border-brand bg-brand/[0.1] text-brand-ink"
                        : "border-line text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Instrument Cards Grid */}
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInstruments.map((ins) => (
                  <div
                    key={ins.name}
                    className="flex flex-col justify-between rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow transition hover:border-brand/40"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fg/[0.04] text-xl border border-line">
                            {ins.icon}
                          </span>
                          <div>
                            <h4 className="text-base font-bold text-fg leading-tight">{ins.name}</h4>
                            <span className="font-mono text-[10px] text-brand-ink font-semibold">{ins.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 rounded-lg border border-line/60 bg-fg/[0.02] p-2 text-xs">
                        <p className="font-mono text-[10px] uppercase text-subtle">What It Measures:</p>
                        <p className="text-xs font-bold text-fg mt-0.5">{ins.measures}</p>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-muted">{ins.useCase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── CHAPTER 5: HUMAN BODY QUICK FACTS ─── */}
      {chapter.id === "note-gen-5" && (
        <div className="space-y-6">
          {viewMode === "visual" && (
            <div className="space-y-6">
              {/* Interactive Blood Group Transfusion Checker */}
              <div className="rounded-2xl border border-line bg-card p-4 sm:p-6 card-shadow space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-fg flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-500" /> Interactive Blood Compatibility Checker
                    </h3>
                    <p className="text-xs text-muted">
                      Tap your blood group to immediately see who you can safely donate to or receive from:
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                    O− = Universal Donor
                  </span>
                </div>

                {/* Blood Group Buttons */}
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
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

                {/* Compatibility Result Box */}
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-fg">{bloodCompatibility.type}</span>
                    <span className="font-mono text-[10px] font-semibold text-rose-500 uppercase px-2 py-0.5 rounded bg-rose-500/10">
                      {bloodCompatibility.badge}
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 pt-1 text-xs">
                    <div className="rounded-lg border border-line bg-card p-2.5">
                      <p className="font-mono text-[10px] uppercase text-emerald-600 font-bold">✓ Can Safely Donate To:</p>
                      <p className="font-semibold text-fg mt-0.5">{bloodCompatibility.canGive}</p>
                    </div>
                    <div className="rounded-lg border border-line bg-card p-2.5">
                      <p className="font-mono text-[10px] uppercase text-sky-600 font-bold">✓ Can Safely Receive From:</p>
                      <p className="font-semibold text-fg mt-0.5">{bloodCompatibility.canTake}</p>
                    </div>
                  </div>
                  <p className="text-muted text-[11px] pt-1">{bloodCompatibility.note}</p>
                </div>
              </div>

              {/* Body Records Grid */}
              <div>
                <h4 className="text-base font-bold text-fg mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-ink" /> Human Body Record Book
                </h4>
                <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {BODY_RECORDS_LIST.map((b) => (
                    <div
                      key={b.title}
                      className="rounded-xl border border-line bg-card p-3.5 transition hover:border-brand/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-subtle font-mono">{b.title}</span>
                        <span className="text-base">{b.icon}</span>
                      </div>
                      <p className="text-sm font-bold text-fg mt-1">{b.metric}</p>
                      <p className="text-[11px] text-muted mt-1 leading-snug">{b.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── CHAPTER 6: EVERYDAY SCIENCE PHENOMENA ─── */}
      {chapter.id === "note-gen-6" && (
        <div className="space-y-6">
          {viewMode === "visual" && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                {filteredPhenomena.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow transition hover:border-brand/40"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{item.icon}</span>
                        <h4 className="text-base font-bold text-fg leading-tight">{item.question}</h4>
                      </div>

                      <div className="mt-3 rounded-xl border border-brand/20 bg-brand/[0.04] p-3 text-xs">
                        <p className="font-mono text-[10px] uppercase font-bold text-brand-ink">In One Line:</p>
                        <p className="font-semibold text-fg mt-0.5">{item.shortAnswer}</p>
                      </div>

                      <p className="mt-3 text-xs text-muted leading-relaxed">{item.fullReason}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-line/60 flex items-center gap-2 text-[11px] text-subtle">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>{item.everydayExample}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TABLE VIEW: Clean Structured Tables for Any Chapter ─── */}
      {viewMode === "table" && (
        <div className="space-y-6 animate-fade-in">
          {chapter.sections.map((section, sIdx) =>
            section.table ? (
              <div key={sIdx} className="space-y-3">
                <h4 className="text-base font-bold text-fg flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand" /> {section.title}
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-line bg-card card-shadow">
                  <table className="w-full min-w-[32rem] sm:min-w-[40rem] border-collapse text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-fg/[0.04] border-b border-line">
                        {section.table.head.map((th) => (
                          <th key={th} className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-subtle">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-fg/[0.02] transition">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={cn("px-4 py-3 leading-relaxed", cIdx === 0 ? "font-bold text-fg" : "text-muted")}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      {/* ─── PRACTICE ARENA: Embedded MCQ Test ─── */}
      {viewMode === "practice" && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-2xl border border-brand/30 bg-brand/[0.04] p-4 text-xs sm:text-sm text-fg flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ListChecks className="h-5 w-5 text-brand-ink shrink-0" />
              <div>
                <p className="font-bold text-fg">Self-Assessment Arena</p>
                <p className="text-muted text-xs">Tap an option to immediately test your understanding.</p>
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
    <div className="rounded-2xl border border-line bg-card p-4 sm:p-5 card-shadow space-y-3">
      <div className="flex items-start gap-2.5">
        <span className="font-mono text-xs font-bold text-brand-ink bg-brand/10 px-2 py-0.5 rounded-md shrink-0">
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
              btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold";
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
              {hasAnswered && isActualCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      {hasAnswered && answer && (
        <div className="mt-3 rounded-xl border border-line-2 bg-fg/[0.03] p-3.5 text-xs animate-fade-in space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-fg">
            {isCorrect ? (
              <span className="text-emerald-500 flex items-center gap-1">✓ Correct!</span>
            ) : (
              <span className="text-rose-500 flex items-center gap-1">✗ Incorrect. Correct is ({answer.correctKey})</span>
            )}
          </p>
          <p className="text-muted leading-relaxed">{answer.explanation}</p>
        </div>
      )}
    </div>
  );
}
