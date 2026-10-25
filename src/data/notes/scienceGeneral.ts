import type { ChapterNote } from "./types";

const U_BIO = "Everyday Biology & Health";
const U_CHEM = "Everyday Chemistry";
const U_PHYS = "Everyday Physics";
const U_NATURE = "Everyday Science Phenomena";

export const notesGeneralScience: ChapterNote[] = [
  {
    id: "note-gen-1",
    classLevel: "general",
    chapterNo: 1,
    title: "Vitamins & Minerals",
    unit: U_BIO,
    overview:
      "A quick visual guide to essential vitamins, daily food sources, health benefits, and deficiency symptoms. Learn which foods give you which vitamins and what happens if you don't get enough.",
    sections: [
      {
        title: "Fat-Soluble Vitamins (A, D, E, K)",
        points: [
          "• **Stored in Body**: Fat-soluble vitamins are stored in the liver and body fat. They don't need to be consumed every single day because the body keeps a reserve.",
          "• **Vitamin A (Retinol / β-Carotene)**: For sharp night vision and healthy glowing skin. Rich in **carrots, sweet potatoes, spinach, papaya, mangoes, and egg yolk**. Lack of it causes **Night Blindness (difficulty seeing in dim light)** and dry eyes.",
          "• **Vitamin D (Sunshine Vitamin / Calciferol)**: Helps bones absorb calcium to stay hard and strong. Made naturally when skin is in **morning sunlight**; also in **salmon, egg yolks, and milk**. Lack of it causes **Rickets in kids (bowed legs)** and **weak bones in adults**.",
          "• **Vitamin E (Tocopherol)**: A powerful antioxidant that protects body cells and promotes healthy skin and hair. Found in **almonds, sunflower seeds, peanuts, and vegetable oils**. Lack of it causes muscle weakness.",
          "• **Vitamin K (Phylloquinone)**: Essential for **blood clotting** so small cuts stop bleeding. Found in **spinach, cabbage, broccoli, and made by gut bacteria**. Lack of it causes **excessive bleeding and slow clotting**."
        ],
        table: {
          head: ["Vitamin", "Common Name", "Best Food Sources", "Main Benefit", "Deficiency Problem"],
          rows: [
            ["Vitamin A", "Retinol / Carotene", "Carrots, papaya, spinach, egg yolk, mango", "Night vision & healthy skin", "Night blindness (can't see in dark), dry eyes"],
            ["Vitamin D", "Calciferol (Sunshine)", "Morning sunlight, milk, egg yolk, fish", "Strong bones & teeth (absorbs calcium)", "Rickets (bowed legs in kids), soft bones"],
            ["Vitamin E", "Tocopherol", "Almonds, sunflower seeds, peanuts, oils", "Glowing skin, hair & cell protection", "Muscle weakness, pale skin"],
            ["Vitamin K", "Phylloquinone", "Spinach, broccoli, cabbage, green veggies", "Helps blood clot when you get a cut", "Cuts keep bleeding; easy bruising"]
          ]
        },
        tip: "Quick Remember: Vitamins K, E, D, and A are fat-soluble (mnemonic: K-E-D-A). They need healthy fats in your diet to be absorbed."
      },
      {
        title: "Water-Soluble Vitamins (Vitamin C & B-Complex)",
        points: [
          "• **Daily Need**: Water-soluble vitamins are not stored in the body (excess is excreted in urine). You need them regularly in your daily meals.",
          "• **Vitamin C (Ascorbic Acid)**: The immunity booster. Builds collagen for gums, skin, and fast healing of wounds. Destroyed by cooking heat! Best in **Amla (richest natural source!), guava, oranges, lemons, and green chilies**. Lack causes **Scurvy (bleeding swollen gums, loose teeth)**.",
          "• **Vitamin B₁ (Thiamine)**: Converts food into energy and powers nerves. Found in **whole wheat, unpolished brown rice, pulses, and nuts**. Lack causes **Beriberi (weak muscles, nerve pain)**.",
          "• **Vitamin B₂ (Riboflavin)**: Gives energy and keeps mouth tissues healthy. Found in **milk, curd, eggs, and green veggies**. Lack causes **cracked lip corners (cheilosis) and sore tongue**.",
          "• **Vitamin B₃ (Niacin)**: Powers brain and digestive metabolism. Found in **peanuts, mushrooms, chicken, and whole grains**. Lack causes **Pellagra (skin rash, diarrhea, memory fog)**.",
          "• **Vitamin B₉ (Folic Acid / Folate)**: Essential for making red blood cells and for baby development in pregnant mothers. Found in **dark green leafy greens (palak, methi), beans, and citrus**. Lack causes **anemia and birth defects**.",
          "• **Vitamin B₁₂ (Cobalamin)**: The only vitamin with a metal (**Cobalt**)! Crucial for brain, nerve fibers, and red blood cells. **Found only in animal/dairy foods (milk, curd, paneer, eggs, fish) — zero in plant foods.** Lack causes **Pernicious Anemia and tingling in hands/feet**."
        ],
        table: {
          head: ["Vitamin", "Scientific Name", "Top Food Sources", "Why Your Body Needs It", "Deficiency Symptom"],
          rows: [
            ["Vitamin C", "Ascorbic Acid", "Amla (Gooseberry), guava, lemon, orange, chili", "Immunity, collagen, fast wound healing", "Scurvy: bleeding gums, loose teeth, slow healing"],
            ["Vitamin B₁", "Thiamine", "Brown rice, whole wheat, pulses, nuts", "Energy release from food, nerve health", "Beriberi: weak legs, fatigue, nerve pain"],
            ["Vitamin B₂", "Riboflavin", "Milk, curd, eggs, green leafy veggies", "Skin and eye health, energy metabolism", "Cracks at corners of mouth, red sore tongue"],
            ["Vitamin B₃", "Niacin", "Peanuts, mushrooms, chicken, whole grains", "Digestive health, skin & brain function", "Pellagra: rough scaly skin rash, diarrhea"],
            ["Vitamin B₉", "Folic Acid", "Spinach, methi, lentils, beans, oranges", "Blood formation; crucial for pregnant mothers", "Anemia, birth defects in babies"],
            ["Vitamin B₁₂", "Cobalamin", "Milk, curd, paneer, eggs, fish (no plants)", "Healthy nerves, brain function & blood cells", "Pernicious anemia, nerve tingling & numbness"]
          ]
        },
        tip: "Kitchen Fact: Amla has nearly 20 times more Vitamin C than an orange! Because Vitamin C is destroyed by heat, eat citrus fruits fresh."
      },
      {
        title: "Essential Minerals in Everyday Food",
        points: [
          "• **Iron (Fe)**: Forms **Hemoglobin** in red blood cells to carry oxygen throughout your body. Found in **spinach, jaggery (gur), beetroot, pomegranate, and lentils**. Deficiency causes **Anemia (constant tiredness, pale face, spoon nails)**.",
          "• **Calcium (Ca)**: Builds strong bones and teeth, powers heart beating and muscle movements. Found in **milk, curd, paneer, ragi (finger millet), and sesame seeds (til)**. Deficiency causes **weak brittle bones (osteoporosis)**.",
          "• **Iodine (I)**: Needed by the thyroid gland in your neck to control body growth and energy. Found in **iodized salt and seafood**. Deficiency causes **Goitre (swollen neck) and stunted child growth**.",
          "• **Potassium (K)**: Balances fluid in cells and stops muscle cramps. Found in **coconut water, bananas, and potatoes**.",
          "• **Sodium (Na)**: Maintains blood pressure and fluid balance. Found in **table salt**. Too much raises blood pressure; too little causes cramps.",
          "• **Zinc (Zn)**: Powers immune defense, taste and smell, and heals cuts. Found in **pumpkin seeds, nuts, and lentils**."
        ],
        table: {
          head: ["Mineral", "What It Does", "Daily Food Sources", "Sign of Low Levels"],
          rows: [
            ["Iron (Fe)", "Carries oxygen in blood via Hemoglobin", "Spinach, jaggery (gur), beetroot, lentils", "Anemia: fatigue, pale skin, spoon nails"],
            ["Calcium (Ca)", "Builds dense bones & teeth; muscle movement", "Milk, curd, ragi, sesame seeds (til), paneer", "Weak fragile bones, tooth decay, muscle cramps"],
            ["Iodine (I)", "Powers thyroid gland & child brain growth", "Iodized salt, marine fish, kelp", "Goitre: swollen neck gland; slow mental growth"],
            ["Potassium (K)", "Prevents muscle cramps, controls heart rhythm", "Tender coconut water, bananas, potatoes", "Muscle cramps, weakness, irregular heartbeat"],
            ["Zinc (Zn)", "Fights colds, heals wounds, gives taste sensation", "Pumpkin seeds, almonds, chickpeas", "Slow wound healing, loss of taste/smell, hair fall"],
            ["Fluorine (F)", "Protects teeth against cavities (~1 ppm)", "Water, tea, toothpaste", "Cavities (<1 ppm); brown stained teeth (>2 ppm)"]
          ]
        },
        tip: "Diet Trick: Vitamin C helps your body absorb plant iron. Adding a squeeze of lemon to your dal or spinach triples iron absorption!"
      },
      {
        title: "Practice Questions (MCQ)",
        points: [
          "**1. Which vitamin is made in your skin when exposed to morning sunlight?**\n(A) Vitamin A · (B) Vitamin D · (C) Vitamin E · (D) Vitamin K",
          "**2. Bleeding, spongy gums and slow wound healing are classic signs of Scurvy, caused by lack of:**\n(A) Vitamin B₁ · (B) Vitamin B₃ · (C) Vitamin C · (D) Vitamin B₁₂",
          "**3. Which of the following is the richest natural food source of Vitamin C?**\n(A) Apple · (B) Amla (Indian Gooseberry) · (C) Milk · (D) Banana",
          "**4. Pellagra causes skin rashes and memory confusion, and is caused by a deficiency of:**\n(A) Vitamin B₁ · (B) Vitamin B₂ · (C) Vitamin B₃ (Niacin) · (D) Vitamin B₆",
          "**5. The essential mineral that forms hemoglobin in red blood cells is:**\n(A) Copper · (B) Iron · (C) Zinc · (D) Magnesium"
        ]
      }
    ],
    keyTerms: [
      { term: "Hemoglobin", meaning: "The iron-rich protein inside red blood cells that carries oxygen from your lungs to every organ in your body." },
      { term: "Antioxidant", meaning: "A compound (like Vitamin C and E) that protects your body cells from damage by harmful free radicals." },
      { term: "Goitre", meaning: "A visible swelling at the base of the neck caused by an enlarged thyroid gland due to lack of iodine in food." },
      { term: "Anemia", meaning: "A condition where blood has too few red blood cells or low hemoglobin, causing pale skin, fatigue, and weakness." }
    ],
    examTips: [
      "Vitamin B₁₂ is found ONLY in animal/dairy products (milk, curd, eggs, meat); vegans need fortified foods or B₁₂ supplements.",
      "Amla has the highest natural concentration of Vitamin C.",
      "Table salt in India is fortified with Potassium Iodate to wipe out iodine deficiency goitre."
    ]
  },
  {
    id: "note-gen-2",
    classLevel: "general",
    chapterNo: 2,
    title: "Diseases & Symptoms",
    unit: U_BIO,
    overview:
      "A clear overview of common illnesses: bacterial, viral, mosquito-borne, and fungal infections. Learn how each disease spreads, key warning signs, simple prevention, and vaccines.",
    sections: [
      {
        title: "Bacterial Diseases: Causes, Spread & Symptoms",
        points: [
          "• **How Bacteria Cause Illness**: Bacteria are single-celled germs that multiply in the body and produce toxins. Bacterial infections can be cured with antibiotics.",
          "• **Tuberculosis (TB)**: Caused by *Mycobacterium tuberculosis*. Spreads through **air droplets** when an infected person coughs. Symptoms: **Cough lasting more than 2 weeks, coughing blood, fever in evening, and night sweats**. Prevented with **BCG vaccine**; treated with DOTS tablets.",
          "• **Typhoid**: Caused by *Salmonella typhi*. Spreads through **contaminated street food, unboiled water, and flies**. Symptoms: **Continuous high step-ladder fever, intense headache, stomach pain, and weakness**. Diagnosed by the **Widal blood test**.",
          "• **Cholera**: Caused by *Vibrio cholerae*. Spreads through **contaminated water and poor sanitation**. Symptoms: **Sudden watery 'rice-water' loose motions and vomiting**, causing rapid dangerous dehydration. Treated immediately with **ORS (Oral Rehydration Solution)**.",
          "• **Tetanus (Lockjaw)**: Caused by *Clostridium tetani* spores living in **soil, street dust, and rusty iron**. Enters deep cuts or puncture wounds. Symptoms: **Painful lockjaw (unable to open mouth) and severe muscle spasms**. Prevented with **Tetanus Toxoid (TT) injection**.",
          "• **Pneumonia**: Infection of the lungs where air sacs fill with fluid. Symptoms: **High fever, violent chills, chest pain, and cough**."
        ],
        table: {
          head: ["Disease", "Germ Type", "How It Spreads", "Key Symptoms", "Prevention / Vaccine"],
          rows: [
            ["Tuberculosis (TB)", "Bacteria (Mycobacterium)", "Air droplets from cough", "Cough >2 weeks, blood in spit, night sweats", "BCG vaccine at birth; DOTS treatment"],
            ["Typhoid", "Bacteria (Salmonella)", "Contaminated food & water", "Step-ladder fever, headache, stomach pain", "Widal test, clean boiled water, typhoid shot"],
            ["Cholera", "Bacteria (Vibrio)", "Dirty water & street food", "Sudden 'rice-water' loose motions, dehydration", "Drink ORS fluids, safe drinking water"],
            ["Tetanus (Lockjaw)", "Bacteria (in soil/rust)", "Deep wounds from rust/dirty metal", "Lockjaw (tight mouth), violent body spasms", "Tetanus injection (TT) within 24 hours of cut"],
            ["Pneumonia", "Bacteria / Virus", "Air droplets & cold exposure", "Chest pain, fever, cough, fast breathing", "Keep warm, pneumonia vaccine"]
          ]
        },
        tip: "First Aid Rule: Whenever you get a cut from rusty iron, dirty glass, or road gravel, wash it thoroughly with soap and get a Tetanus Toxoid (TT) injection within 24–48 hours."
      },
      {
        title: "Viral & Mosquito-Borne Diseases",
        points: [
          "• **Viral Nature**: Viruses are tiny invaders that multiply inside human cells. Antibiotics DO NOT kill viruses; vaccines and body immunity fight them.",
          "• **Dengue**: Spread by the **Female Aedes mosquito (day biter, black & white striped legs)**. Symptoms: **Sudden high fever, severe pain behind the eyes, bone and joint aches ('breakbone fever'), and dropping blood platelets**.",
          "• **Chikungunya**: Also spread by the **Aedes mosquito**. Symptoms: **High fever plus crippling, severe joint pain and swelling** that can last for months.",
          "• **Malaria**: Caused by the **Plasmodium parasite** and spread by the **Female Anopheles mosquito (night biter)**. Symptoms: **Sudden shivering chills followed by high burning fever that repeats every 2 or 3 days**.",
          "• **Rabies**: Caused by rabies virus from the **bite or scratch of an infected dog, cat, or monkey**. The virus attacks the brain causing **Hydrophobia (fear of drinking water due to painful throat spasms)**. Fatal once symptoms start, but 100% preventable if you get the **Anti-Rabies Vaccine course immediately after the bite**.",
          "• **Polio**: Spreads through dirty water and food. Attacks spinal nerves, causing **permanent paralysis of the legs**. Almost eradicated worldwide through **Oral Polio Vaccine (OPV drops)**.",
          "• **Hepatitis (Jaundice)**: Liver infection causing **yellow eyes/skin, dark yellow urine, and nausea**. Hepatitis A spreads through dirty water; Hepatitis B spreads through infected blood and needles."
        ],
        table: {
          head: ["Illness", "Germ / Carrier", "Transmission", "Main Warning Signs", "Best Prevention"],
          rows: [
            ["Dengue", "Virus (Flavivirus)", "Aedes mosquito (day biter, striped legs)", "Pain behind eyes, bone-breaking aches, low platelets", "Clear standing water, mosquito repellent"],
            ["Chikungunya", "Virus", "Aedes mosquito (day biter)", "Severe swelling and crippling joint pain", "Prevent mosquito breeding, long clothing"],
            ["Malaria", "Plasmodium parasite", "Female Anopheles mosquito (night biter)", "Shivering chills followed by high recurring fever", "Mosquito nets, antimalarial tablets (Quinine)"],
            ["Rabies", "Rabies virus", "Bite of rabid dog, monkey or cat", "Agitation, fear of water (hydrophobia)", "Wash bite with soap 15 mins + rabies injections"],
            ["Polio", "Poliovirus", "Dirty water / food (fecal-oral)", "Sudden limp paralysis in legs", "Oral Polio Vaccine (OPV / 'Do Boond')"],
            ["Hepatitis (Jaundice)", "Hepatitis virus", "Dirty water (Hep A) / Blood (Hep B)", "Yellow eyes, dark urine, loss of appetite", "Boiled water, Hepatitis B vaccine"]
          ]
        },
        tip: "Mosquito Guide: Aedes bites during the day (Dengue, Chikungunya). Anopheles bites at night (Malaria). Culex transmits Filariasis (Elephantiasis)."
      },
      {
        title: "Fungal & Lifestyle Conditions",
        points: [
          "• **Ringworm (Daad)**: A common contagious **fungal skin infection** (not a worm!). Symptoms: **Circular, itchy, red scaly rings on skin, neck, or groin**. Thrives in heat, sweat, and moisture. Prevented by keeping skin dry and using antifungal creams.",
          "• **Diabetes Mellitus**: Occurs when the pancreas doesn't make enough **Insulin** (or body cells don't respond to it), causing high sugar in blood. Signs: **Excessive thirst, frequent urination, weight loss, and slow-healing cuts**.",
          "• **High Blood Pressure (Hypertension)**: Normal reading is **120/80 mmHg**. When consistently above 140/90, it strains the heart and blood vessels. Controlled by reducing table salt, exercise, and avoiding stress."
        ],
        table: {
          head: ["Condition", "Category", "What Triggers It", "Common Signs", "How to Manage"],
          rows: [
            ["Ringworm (Daad)", "Fungal Skin Infection", "Sweat, moisture, shared towels", "Circular red itchy rings on skin", "Keep skin dry, use antifungal cream (Clotrimazole)"],
            ["Diabetes", "Hormone / Lifestyle", "Low Insulin from pancreas", "Frequent urination, constant thirst, fatigue", "Diet control, exercise, insulin / tablets"],
            ["High BP (Hypertension)", "Cardiovascular", "Excess salt, obesity, stress", "Headache, dizziness (often silent)", "Reduce salt, walk daily, BP checkup"]
          ]
        },
        tip: "Health Habit: High Blood Pressure and Diabetes are called 'silent killers' because they often cause no early pain. A yearly routine checkup after age 30 is good practice."
      },
      {
        title: "Practice Questions (MCQ)",
        points: [
          "**1. The Mantoux skin test and BCG vaccine are used for which infectious disease?**\n(A) Typhoid · (B) Tuberculosis (TB) · (C) Cholera · (D) Tetanus",
          "**2. Which mosquito species transmits Dengue and Chikungunya during daytime hours?**\n(A) Female Anopheles · (B) Female Aedes aegypti · (C) Female Culex · (D) Housefly",
          "**3. Hydrophobia (fear of drinking water due to throat spasms) is a symptom of:**\n(A) Polio · (B) Tetanus · (C) Rabies · (D) Malaria",
          "**4. Shivering chills followed by high recurring fever in Malaria happens when red blood cells burst and release:**\n(A) Haemozoin · (B) Histamine · (C) Insulin · (D) Pepsin",
          "**5. The Widal blood test is widely used to diagnose:**\n(A) Tuberculosis · (B) Malaria · (C) Typhoid Fever · (D) Dengue"
        ]
      }
    ],
    keyTerms: [
      { term: "Vector", meaning: "An insect or animal (like a mosquito or tick) that carries and spreads a disease-causing germ to humans." },
      { term: "Hydrophobia", meaning: "Severe throat muscle spasms when trying to drink water, the hallmark symptom of rabies infection." },
      { term: "Insulin", meaning: "A hormone made by the pancreas that allows your body to use sugar from carbohydrates and lowers blood glucose." },
      { term: "Platelets", meaning: "Tiny blood cell fragments that stick together to form clots and stop bleeding; their count drops sharply in Dengue." }
    ],
    examTips: [
      "BCG vaccine = Tuberculosis; DPT vaccine = Diphtheria, Pertussis, Tetanus; Widal test = Typhoid.",
      "Rabies is 100% preventable if vaccinated immediately after an animal bite, but fatal once symptoms appear.",
      "Antibiotics kill bacteria, NOT viruses (like colds, flu, dengue, or rabies)."
    ]
  },
  {
    id: "note-gen-3",
    classLevel: "general",
    chapterNo: 3,
    title: "Everyday pH Values & Chemicals",
    unit: U_CHEM,
    overview:
      "A quick reference for the pH scale of everyday liquids, common household chemical names, formulas, and natural acids found in food items like lemons, curd, and vinegar.",
    sections: [
      {
        title: "The Everyday pH Scale (0 to 14)",
        points: [
          "• **How the pH Scale Works**: Measures how acidic or alkaline (basic) a liquid is. **0 to 6.9 is Acidic**, **7.0 is Neutral**, and **7.1 to 14 is Alkaline / Basic**.",
          "• **Stomach Acid (pH 1.2 – 2.0)**: Strong hydrochloric acid ($HCl$) that kills food bacteria and helps digest food.",
          "• **Lemon Juice (pH 2.2 – 2.4)** & **Vinegar (pH 2.4 – 3.0)**: Strong natural food acids (Citric and Acetic acid).",
          "• **Colas & Fizzy Drinks (pH 2.5 – 3.2)**: Highly acidic due to dissolved carbonic and phosphoric acid. Soft drinks can dissolve tooth enamel over time!",
          "• **Tomatoes (pH 4.2)** & **Black Coffee (pH 5.0)**: Mildly acidic.",
          "• **Acid Rain (pH < 5.6)**: Caused by smoke pollution ($SO_2$ and $NO_x$ gases); damages crops and discolors white marble monuments (like the Taj Mahal).",
          "• **Fresh Milk (pH 6.5 – 6.8)**: Turns more acidic (pH ~4.5) when it sours into curd.",
          "• **Human Mouth & Tooth Decay**: Tooth enamel is the hardest substance in the human body. **Tooth decay starts when mouth pH drops below 5.5** after eating sugary foods!",
          "• **Pure Water (pH 7.0)**: Neutral.",
          "• **Human Blood (pH 7.35 – 7.45)**: Slightly alkaline! Your body strictly buffers blood pH; any major shift is dangerous.",
          "• **Toothpaste (pH 8.0 – 9.0)**: Mildly alkaline to neutralize mouth acids and stop cavities.",
          "• **Baking Soda (pH 8.5)** & **Milk of Magnesia (pH 10.5)**: Bases that act as antacids to soothe acidity and heartburn.",
          "• **Bleach (pH 12.5)** & **Drain Cleaner / Lye (pH 14.0)**: Strong corrosive alkalis that dissolve grease and hair."
        ],
        table: {
          head: ["Common Substance", "Exact pH", "Nature", "Daily Life Importance"],
          rows: [
            ["Battery Acid", "0.0 – 0.5", "Strong Acid", "Sulfuric acid inside vehicle batteries"],
            ["Stomach Acid (Gastric)", "1.2 – 2.0", "Strong Acid", "Dilute HCl digests food and kills germs"],
            ["Lemon Juice", "2.2 – 2.4", "Acidic", "Contains citric acid"],
            ["Vinegar (Sirka)", "2.4 – 3.0", "Acidic", "4–8% acetic acid; used in cooking & pickling"],
            ["Cola / Soft Drinks", "2.5 – 3.2", "Acidic", "Phosphoric acid; can erode tooth enamel"],
            ["Acid Rain", "< 5.6", "Acidic Pollution", "Corrodes marble monuments ('marble cancer')"],
            ["Fresh Milk", "6.5 – 6.8", "Near Neutral", "Sours to curd via lactic acid bacteria"],
            ["Human Mouth Danger Level", "< 5.5", "Acidic Threshold", "Tooth decay starts when mouth pH drops below 5.5"],
            ["Pure Water", "7.0", "Pure Neutral", "Pure drinking water balance at 25°C"],
            ["Human Blood & Tears", "7.35 – 7.45", "Slightly Alkaline", "Strictly controlled for body survival"],
            ["Toothpaste", "8.0 – 9.0", "Mildly Alkaline", "Neutralizes bacterial mouth acids after meals"],
            ["Baking Soda Solution", "8.5", "Alkaline", "Mild kitchen base; leavens cakes"],
            ["Milk of Magnesia", "10.5", "Alkaline (Antacid)", "Magnesium hydroxide; cures acidity & heartburn"],
            ["Drain Cleaner / Lye", "13.5 – 14.0", "Strong Alkaline", "Caustic soda (NaOH); unblocks clogged pipes"]
          ]
        },
        tip: "Dental Tip: Brushing teeth after meals with toothpaste (pH 8–9) neutralizes mouth acids and raises pH above 5.5, stopping tooth decay."
      },
      {
        title: "Common Household Chemicals & Formulas",
        points: [
          "• **Baking Soda ($\\text{NaHCO}_3$)**: Sodium Hydrogen Carbonate. Releases $CO_2$ gas when heated, making cakes, bhaturas, and dhoklas soft and fluffy.",
          "• **Washing Soda ($\\text{Na}_2\\text{CO}_3\\cdot 10\\text{H}_2\\text{O}$)**: Sodium Carbonate. Used in detergents and removes permanent hardness from well water.",
          "• **Bleaching Powder ($\\text{CaOCl}_2$)**: Calcium Oxychloride. Smells of chlorine; used to disinfect municipal drinking water and clean drains.",
          "• **Plaster of Paris ($\\text{CaSO}_4\\cdot \\frac{1}{2}\\text{H}_2\\text{O}$)**: Made by heating Gypsum at 100°C. Doctors use it to make plaster casts for fractured bones. Sets rock-hard when mixed with water.",
          "• **Gypsum ($\\text{CaSO}_4\\cdot 2\\text{H}_2\\text{O}$)**: Added to cement so it doesn't set too quickly.",
          "• **Quicklime ($\\text{CaO}$)** & **Slaked Lime [$\\text{Ca(OH)}_2$]**: Used for whitewashing walls.",
          "• **Limestone / Marble / Chalk ($\\text{CaCO}_3$)**: Same chemical compound found in eggshells, seashells, and Taj Mahal marble.",
          "• **Dry Ice (Solid $\\text{CO}_2$)**: Frozen carbon dioxide at −78°C. Sublimes directly into cold smoke without getting wet; used to freeze ice creams and stage fog.",
          "• **Laughing Gas ($\\text{N}_2\\text{O}$)**: Nitrous oxide; dental anesthetic.",
          "• **Potash Alum (Fitkari)**: Purifies muddy water by settling dirt; used as an aftershave to stop small cuts from bleeding."
        ],
        table: {
          head: ["Common Name", "Chemical Name", "Formula", "Daily Life Use"],
          rows: [
            ["Baking Soda", "Sodium Hydrogen Carbonate", "NaHCO₃", "Soft spongy cakes, dhoklas, mild antacid"],
            ["Washing Soda", "Sodium Carbonate Decahydrate", "Na₂CO₃·10H₂O", "Laundry detergent, softens hard water"],
            ["Bleaching Powder", "Calcium Oxychloride", "CaOCl₂", "Disinfecting water tanks & swimming pools"],
            ["Plaster of Paris (POP)", "Calcium Sulphate Hemihydrate", "CaSO₄·½H₂O", "Bone fracture casts, false ceilings, statues"],
            ["Gypsum", "Calcium Sulphate Dihydrate", "CaSO₄·2H₂O", "Slows down cement setting; raw material for POP"],
            ["Quicklime", "Calcium Oxide", "CaO", "Glassmaking, white-wash precursor"],
            ["Slaked Lime", "Calcium Hydroxide", "Ca(OH)₂", "Wall whitewashing, neutralizing sour soil"],
            ["Marble / Chalk", "Calcium Carbonate", "CaCO₃", "Flooring stone, blackboard chalk, eggshells"],
            ["Dry Ice", "Solid Carbon Dioxide", "CO₂ (solid)", "Ice cream storage, cloud stage smoke"],
            ["Laughing Gas", "Nitrous Oxide", "N₂O", "Mild dental anesthesia"],
            ["Fitkari (Alum)", "Potash Alum", "K₂SO₄·Al₂(SO₄)₃·24H₂O", "Water cleaning, stops razor cut bleeding"]
          ]
        },
        tip: "Memory Trick: Gypsum has 2 water molecules ($CaSO_4\\cdot 2H_2O$); Plaster of Paris has a half ($CaSO_4\\cdot \\frac{1}{2}H_2O$)."
      },
      {
        title: "Natural Food Acids in Daily Life",
        points: [
          "• **Lemon & Orange**: **Citric Acid** (gives refreshing sour citrus flavor).",
          "• **Curd & Sour Milk**: **Lactic Acid** (produced by friendly *Lactobacillus* bacteria fermenting milk sugar).",
          "• **Vinegar (Sirka)**: **Acetic Acid** (used in noodles, dressings, and preserves pickles).",
          "• **Tamarind (Imli) & Grapes**: **Tartaric Acid** (mild sour taste).",
          "• **Tomatoes & Spinach**: **Oxalic Acid**.",
          "• **Apples**: **Malic Acid** (gives green apples their crisp tartness).",
          "• **Red Ant Sting & Nettle Leaf**: **Formic Acid (Methanoic Acid)**. Causes a sudden burning itch; rubbed with baking soda or soap to neutralize the acid."
        ],
        table: {
          head: ["Food / Natural Source", "Natural Acid Present", "Daily Fact"],
          rows: [
            ["Lemon, Lime, Orange", "Citric Acid", "Rich in Vitamin C; prevents food browning"],
            ["Curd, Yogurt, Buttermilk", "Lactic Acid", "Fermented by healthy gut bacteria"],
            ["Vinegar (Sirka)", "Acetic Acid (Ethanoic)", "Keeps pickles from spoiling"],
            ["Tamarind (Imli), Raw Mango", "Tartaric Acid", "Used in baking powder & tangy chutneys"],
            ["Tomatoes", "Oxalic Acid", "Gives tomatoes their mild acidity"],
            ["Apples", "Malic Acid", "Found in fresh crisp apples"],
            ["Ant Sting / Nettle Leaves", "Methanoic Acid (Formic)", "Burning sting neutralized by baking soda paste"]
          ]
        },
        tip: "Ant Sting Remedy: If bitten by a red ant, rub a pinch of moist baking soda or soap (mild bases) on the spot to instantly neutralize the formic acid."
      },
      {
        title: "Practice Questions (MCQ)",
        points: [
          "**1. What is the normal physiological pH of healthy human blood?**\n(A) 6.2 – 6.4 · (B) 7.0 · (C) 7.35 – 7.45 · (D) 8.5 – 9.0",
          "**2. What is the chemical formula for Plaster of Paris (POP)?**\n(A) CaSO₄·2H₂O · (B) CaSO₄·½H₂O · (C) CaCO₃ · (D) CaOCl₂",
          "**3. Tooth decay actively starts when the pH in your mouth drops below:**\n(A) 7.0 · (B) 6.5 · (C) 5.5 · (D) 4.0",
          "**4. The burning irritation caused by a red ant bite is due to which acid?**\n(A) Methanoic Acid (Formic Acid) · (B) Citric Acid · (C) Oxalic Acid · (D) Tartaric Acid",
          "**5. Which chemical is added to municipal water to disinfect and kill harmful germs?**\n(A) Baking Soda · (B) Washing Soda · (C) Bleaching Powder (CaOCl₂) · (D) Plaster of Paris"
        ]
      }
    ],
    keyTerms: [
      { term: "pH Scale", meaning: "A 0-to-14 scale measuring how acidic (below 7), neutral (7), or alkaline (above 7) a solution is." },
      { term: "Antacid", meaning: "A mild base (like baking soda or milk of magnesia) taken to soothe stomach acidity and heartburn." },
      { term: "Sublimation", meaning: "The direct change of a solid into gas without turning into liquid first (e.g., Dry Ice, Camphor)." },
      { term: "Neutralization", meaning: "The chemical reaction where an acid and a base cancel each other out to form salt and water." }
    ],
    examTips: [
      "Human blood is slightly alkaline (pH 7.4). Pure water is neutral (pH 7.0).",
      "Baking powder is a mixture of Baking Soda + Tartaric Acid so it doesn't leave a bitter taste.",
      "Tooth enamel is made of Calcium Phosphate (Hydroxyapatite) and dissolves below pH 5.5."
    ]
  },
  {
    id: "note-gen-4",
    classLevel: "general",
    chapterNo: 4,
    title: "SI Units & Scientific Tools",
    unit: U_PHYS,
    overview:
      "A practical guide to standard measurement units, common conversions, and scientific instruments like the blood pressure monitor, barometer, lactometer, and stethoscope.",
    sections: [
      {
        title: "Standard SI Units in Everyday Life",
        points: [
          "• **The 7 Base Units**: Length in **Metres (m)**, Mass in **Kilograms (kg)**, Time in **Seconds (s)**, Electric current in **Amperes (A)**, Temperature in **Kelvin (K)**, Amount in **Moles (mol)**, and Light in **Candela (cd)**.",
          "• **Force**: **Newton (N)**. Weight is also a force measured in Newtons ($W = m \\times g$).",
          "• **Energy & Work**: **Joule (J)**. One commercial unit of electricity (**1 kWh**) on your home meter equals **3,600,000 Joules (3.6 × 10⁶ J)**.",
          "• **Power**: **Watt (W)** (Joules per second). An 8-Watt LED bulb uses 8 Joules each second. 1 Horsepower (**1 HP**) = **746 Watts**.",
          "• **Pressure**: **Pascal (Pa)**. Atmospheric pressure at sea level is about $101,325\\text{ Pa} = 760\\text{ mmHg} = 1\\text{ bar}$.",
          "• **Electric Units**: Voltage in **Volts (V)**, Resistance in **Ohms ($\\Omega$)**, Charge in **Coulombs (C)**.",
          "• **Eyeglass Lens Power**: **Dioptre (D)**. Power = $1 / \\text{focal length in metres}$. Convex glasses have positive (+D), concave have negative (−D)."
        ],
        table: {
          head: ["Quantity", "SI Unit Name", "Symbol", "Everyday Example"],
          rows: [
            ["Force & Weight", "Newton", "N", "Gravitational pull on an apple is ~1 Newton"],
            ["Work & Energy", "Joule", "J", "Lifting a 1 kg bag by 1 metre takes ~10 Joules"],
            ["Electric Power", "Watt", "W", "LED bulb: 9W; Ceiling fan: 75W; AC: 1500W"],
            ["Commercial Energy", "Kilowatt-Hour", "kWh", "1 unit on electricity bill = 3.6 million Joules"],
            ["Pressure", "Pascal", "Pa", "Tyre pressure, atmospheric weather pressure"],
            ["Voltage", "Volt", "V", "AA battery: 1.5V; Smartphone: 5V; Wall socket: 220V"],
            ["Resistance", "Ohm", "Ω", "Electrical wire resistance to current flow"],
            ["Eyeglass Power", "Dioptre", "D", "Lens strength: +1.5D (reading), −2.0D (distance)"],
            ["Sound Frequency", "Hertz", "Hz", "Human audible range: 20 Hz to 20,000 Hz"]
          ]
        },
        tip: "Electricity Bill Math: A 1000-Watt heater running for 1 hour consumes exactly 1 unit of electricity ($1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}$)."
      },
      {
        title: "Scientific Instruments & Their Everyday Uses",
        points: [
          "• **Sphygmomanometer**: The medical arm-cuff machine used by doctors to measure **blood pressure (BP)** in mmHg. Normal adult BP is **120/80 mmHg**.",
          "• **Stethoscope**: Amplifies heartbeats and lung breathing sounds through acoustic reflection. Invented by René Laennec.",
          "• **Barometer**: Measures **atmospheric air pressure**. Invented by Torricelli using mercury. **A sudden sharp drop in barometer pressure warns of an approaching storm or cyclone!**",
          "• **Lactometer**: Tests the **purity and thickness of milk** to check if water was added. Floats higher in pure thick milk (based on Archimedes' Principle).",
          "• **Hygrometer**: Measures the **humidity** (moisture level) in the air.",
          "• **Altimeter**: Measures **altitude (height above sea level)** in airplanes and trekking watches.",
          "• **Anemometer**: Measures **wind speed and direction** at weather stations and airports.",
          "• **Seismograph**: Detects and records **earthquake tremors**; measured on the Richter scale.",
          "• **SONAR**: Uses **ultrasonic sound waves** underwater to measure sea depth and locate submerged submarines ($2d = v \\times t$).",
          "• **Pyrometer**: Measures **extremely high temperatures from a distance** (like blast furnaces or the surface of the Sun) without touching.",
          "• **Ammeter vs Voltmeter**: Ammeter measures electric current (connected in series); Voltmeter measures voltage (connected in parallel)."
        ],
        table: {
          head: ["Tool / Instrument", "What It Measures", "Where It Is Used"],
          rows: [
            ["Sphygmomanometer", "Blood Pressure (mmHg)", "Clinics & hospitals (normal: 120/80 mmHg)"],
            ["Stethoscope", "Heartbeat & lung sounds", "Doctors examining chest sounds"],
            ["Barometer", "Atmospheric air pressure", "Weather stations (sudden drop = storm)"],
            ["Lactometer", "Milk purity & water adulteration", "Dairy collection booths & kitchens"],
            ["Hygrometer", "Air humidity / moisture", "Weather forecasts, greenhouses"],
            ["Altimeter", "Altitude above sea level", "Airplane cockpits, mountain climbing"],
            ["Anemometer", "Wind speed & direction", "Airports, weather towers, sailing ports"],
            ["Seismograph", "Earthquake shockwaves", "Geological earthquake warning centers"],
            ["Pyrometer", "Very high temperatures (>1000°C)", "Steel plants, kiln furnaces, solar research"],
            ["SONAR", "Ocean depth & underwater objects", "Ships & naval submarines using ultrasound"]
          ]
        },
        tip: "Weather Tip: When a mercury barometer drops rapidly, it means a low-pressure zone formed quickly, bringing stormy winds and rain."
      },
      {
        title: "Practice Questions (MCQ)",
        points: [
          "**1. What is the standard SI unit of Electric Resistance?**\n(A) Volt · (B) Ohm (Ω) · (C) Ampere · (D) Farad",
          "**2. A sudden, sharp plunge in the mercury level of a barometer indicates:**\n(A) Extreme hot dry weather · (B) Severe storm or cyclone · (C) Freezing snow · (D) Clear calm skies",
          "**3. Which medical instrument is used to measure arterial blood pressure in mmHg?**\n(A) Stethoscope · (B) Sphygmomanometer · (C) Thermometer · (D) Spirometer",
          "**4. How many Joules of energy equal one commercial unit of electricity (1 kWh)?**\n(A) 3,600 J · (B) 36,000 J · (C) 3,600,000 J (3.6 × 10⁶ J) · (D) 746 J",
          "**5. The purity and density of milk is tested using which instrument?**\n(A) Hydrometer · (B) Lactometer · (C) Hygrometer · (D) Pyrometer"
        ]
      }
    ],
    keyTerms: [
      { term: "Sphygmomanometer", meaning: "An inflatable arm cuff with a pressure gauge used to measure systolic and diastolic blood pressure." },
      { term: "Kilowatt-Hour (kWh)", meaning: "One commercial unit of electrical energy consumed by a 1000W appliance running for 1 hour (3.6 million Joules)." },
      { term: "SONAR", meaning: "Sound Navigation and Ranging; sends underwater ultrasound pulses to find sea depth and submarines." },
      { term: "Dioptre", meaning: "The unit of eyeglass lens power equal to 1 divided by focal length in metres." }
    ],
    examTips: [
      "1 Horsepower (HP) = 746 Watts.",
      "An Ammeter is always wired in Series (low resistance); a Voltmeter is always wired in Parallel (high resistance).",
      "Normal audible sound for human ears is 20 Hz to 20,000 Hz."
    ]
  },
  {
    id: "note-gen-5",
    classLevel: "general",
    chapterNo: 5,
    title: "Human Body: Quick Facts",
    unit: U_BIO,
    overview:
      "Essential facts on human anatomy: blood groups (universal donor & recipient), key body organs, hormones, normal medical numbers, and body records.",
    sections: [
      {
        title: "Blood Groups & The Universal Donor",
        points: [
          "• **Blood Groups (ABO System)**: Discovered by **Karl Landsteiner** in 1900. Your blood type depends on antigens on the surface of your red blood cells.",
          "• **Group A**: Has A antigen; can donate to A and AB.",
          "• **Group B**: Has B antigen; can donate to B and AB.",
          "• **Group AB**: Has both A and B antigens. **Universal Recipient** (can receive blood from any group!).",
          "• **Group O**: Has neither A nor B antigen. **Universal Donor** (can give red cells to any group!).",
          "• **Rh Factor (+ / −)**: If you have the Rh protein, you are Positive ($+$); if not, you are Negative ($-$).",
          "• **True Universal Donor**: **O Negative ($O^-$)** can be given to anyone in an emergency because it has no A, B, or Rh antigens.",
          "• **True Universal Recipient**: **AB Positive ($AB^+$)** can safely receive any blood type.",
          "• **Red Blood Cells (RBCs)**: Carry oxygen using iron-rich Hemoglobin. Live for **~120 days**. Dead RBCs are filtered in the **Spleen** (known as the 'graveyard of RBCs').",
          "• **White Blood Cells (WBCs)**: Soldiers of the body that fight infections.",
          "• **Platelets**: Cell fragments that stick together to clot blood when you bleed."
        ],
        table: {
          head: ["Blood Group", "Antigens on Red Cells", "Can Safely Donate To", "Can Safely Receive From"],
          rows: [
            ["O Negative (O−)", "None (no A, B, or Rh)", "Universal Donor (Everyone!)", "O− only"],
            ["O Positive (O+)", "Rh only", "O+, A+, B+, AB+", "O+, O−"],
            ["A Positive (A+)", "A and Rh", "A+, AB+", "A+, A−, O+, O−"],
            ["A Negative (A−)", "A only", "A+, A−, AB+, AB−", "A−, O−"],
            ["B Positive (B+)", "B and Rh", "B+, AB+", "B+, B−, O+, O−"],
            ["B Negative (B−)", "B only", "B+, B−, AB+, AB−", "B−, O−"],
            ["AB Positive (AB+)", "A, B, and Rh", "AB+ only", "Universal Recipient (Everyone!)"],
            ["AB Negative (AB−)", "A and B", "AB+, AB−", "AB−, A−, B−, O−"]
          ]
        },
        tip: "Emergency Rule: In ambulance trauma care when a patient's blood type is unknown, doctors infuse O Negative (O−) blood because it won't react with the patient's antibodies."
      },
      {
        title: "Master Endocrine Glands & Hormones",
        points: [
          "• **Pituitary Gland ('Master Gland')**: Located at the base of the brain. Secretes **Growth Hormone (GH)** which controls height and body growth.",
          "• **Thyroid Gland**: Butterfly-shaped gland in your neck. Secretes **Thyroxine (T₄)** using Iodine to control how fast your body burns energy (metabolism).",
          "• **Pancreas**: Secretes **Insulin** (which lowers blood sugar by helping cells absorb glucose). Lack of insulin causes **Diabetes**.",
          "• **Adrenal Gland**: Sits on top of each kidney. Secretes **Adrenaline (the 'Fight or Flight' emergency hormone)** when you are scared or excited — your heart beats fast, pupils dilate, and senses sharpen.",
          "• **Pineal Gland**: Makes **Melatonin** in darkness, controlling your natural 24-hour sleep and wake cycle."
        ],
        table: {
          head: ["Gland", "Location", "Key Hormone", "Main Function"],
          rows: [
            ["Pituitary", "Base of brain", "Growth Hormone (GH)", "Controls overall height & body growth"],
            ["Thyroid", "Neck (throat)", "Thyroxine (needs iodine)", "Regulates body energy burning (metabolism)"],
            ["Pancreas", "Behind stomach", "Insulin", "Lowers blood sugar; prevents diabetes"],
            ["Adrenal", "Above kidneys", "Adrenaline (Epinephrine)", "Emergency 'Fight or Flight' energy boost"],
            ["Pineal", "Center of brain", "Melatonin", "Regulates night sleep & morning waking"]
          ]
        },
        tip: "Adrenaline Surge: That sudden racing heartbeat and burst of speed when you see a barking dog or take a roller coaster drop is caused by an instant surge of Adrenaline from your adrenal glands."
      },
      {
        title: "Human Body Records & Normal Numbers",
        points: [
          "• **Largest Organ of the Body**: **Skin** (covers ~1.5 to 2 square metres).",
          "• **Largest Internal Organ & Gland**: **Liver** (~1.5 kg; filters blood, makes bile, processes medicines).",
          "• **Smallest Bone**: **Stapes (Stirrup)** inside your middle ear (~3 millimetres long).",
          "• **Longest & Strongest Bone**: **Femur (Thigh bone)** (supports whole body weight).",
          "• **Hardest Substance in Body**: **Tooth Enamel** (harder than steel or bone).",
          "• **Kidney Filter Unit**: **Nephron** (about 1 million tiny filters in each kidney).",
          "• **Nerve Unit**: **Neuron** (brain cells that send electric signals).",
          "• **Total Bones in Adult**: **206 bones** (babies are born with ~300 bones that fuse together).",
          "• **Normal Body Temperature**: **37°C (98.6°F)**.",
          "• **Normal Blood Pressure**: **120/80 mmHg**.",
          "• **Normal Resting Pulse**: **72 beats per minute** (normal range 60–100)."
        ],
        table: {
          head: ["Record / Measurement", "What It Is", "Exact Number / Name"],
          rows: [
            ["Largest Organ", "Skin", "Covers ~1.8 square metres"],
            ["Largest Internal Organ & Gland", "Liver", "Weighs about 1.5 kg"],
            ["Smallest Bone", "Stapes", "In the middle ear (~3 mm)"],
            ["Longest Bone", "Femur", "Thigh bone (~48 cm)"],
            ["Hardest Substance", "Tooth Enamel", "Harder than bone (96% minerals)"],
            ["Total Bones (Adult)", "Skeleton", "206 bones (infants have ~300)"],
            ["Kidney Filtering Units", "Nephrons", "~1 million per kidney"],
            ["Normal Body Temperature", "Oral / Core", "37°C / 98.6°F"],
            ["Normal Blood Pressure", "Arterial", "120/80 mmHg"],
            ["Average Resting Heart Rate", "Pulse", "~72 beats per minute"]
          ]
        },
        tip: "Memory Check: Skin is the largest organ overall; the Liver is the largest internal organ."
      },
      {
        title: "Practice Questions (MCQ)",
        points: [
          "**1. Which blood group is known as the universal donor because its red cells have no A, B, or Rh antigens?**\n(A) AB Positive · (B) O Positive · (C) O Negative · (D) A Negative",
          "**2. What is the average lifespan of a human red blood cell (erythrocyte)?**\n(A) 30 days · (B) 60 days · (C) 120 days · (D) 365 days",
          "**3. Which hormone is released by the pancreas to lower blood sugar levels?**\n(A) Glucagon · (B) Insulin · (C) Adrenaline · (D) Thyroxine",
          "**4. What is the smallest bone in the human body?**\n(A) Femur · (B) Radius · (C) Stapes (in ear) · (D) Clavicle",
          "**5. The microscopic functional filtering unit of the human kidney is called the:**\n(A) Neuron · (B) Nephron · (C) Alveolus · (D) Platelet"
        ]
      }
    ],
    keyTerms: [
      { term: "Universal Donor", meaning: "A person with blood group O Negative (O−) whose blood can safely be transfused to patients of any blood group." },
      { term: "Nephron", meaning: "The microscopic filtering unit inside your kidney that cleans blood of waste and produces urine." },
      { term: "Insulin", meaning: "The pancreatic hormone that keeps blood sugar in a safe normal range." },
      { term: "Spleen", meaning: "An organ near your stomach that filters blood, stores platelets, and recycles old worn-out red blood cells." }
    ],
    examTips: [
      "Universal Donor = O Negative (O−). Universal Recipient = AB Positive (AB+).",
      "Adults have 206 bones; infants have ~300 that fuse as they grow.",
      "The SA Node in the heart is called the 'natural pacemaker' (generates ~72 beats/min)."
    ]
  },
  {
    id: "note-gen-6",
    classLevel: "general",
    chapterNo: 6,
    title: "Everyday Science: Why It Happens",
    unit: U_NATURE,
    overview:
      "The scientific reasons behind everyday wonders: why the sky is blue, why ice floats, mirages on hot roads, rainbows, pressure cookers, and famous inventions.",
    sections: [
      {
        title: "Everyday Science Wonders Explained",
        points: [
          "• **Why is the Sky Blue?**",
          "  - Sunlight looks white but is a mix of all rainbow colors (VIBGYOR).",
          "  - When sunlight hits tiny gas molecules in Earth's atmosphere, **shorter blue wavelengths scatter in all directions about 10 times more than red light** (**Rayleigh Scattering**).",
          "  - Because blue light is scattered all across the sky, that's the color your eyes see!",
          "• **Why are Sunsets and Danger Lights Red?**",
          "  - At sunset, the Sun is low on the horizon, so light has to travel through a much thicker layer of air. All the blue light gets scattered away before reaching you, leaving only the **longest, least-scattered red and orange rays** to reach your eyes.",
          "  - Danger signals and car brake lights are red because **red light scatters the least through fog, smoke, and air**, making it visible from the farthest distance.",
          "• **Why Do Stars Twinkle, but Planets Don't?**",
          "  - Stars are trillions of kilometres away, so they appear as tiny pinpoint dots of light. As their light passes through constantly moving, swirling layers of hot and cold air, the rays bend back and forth (**Atmospheric Refraction**), making stars appear to flicker and twinkle.",
          "  - Planets are much closer and look like larger discs; light from different points on a planet averages out to a steady shine.",
          "• **Why Does Ice Float on Water?**",
          "  - Almost all liquids shrink and get heavier (denser) when they get cold. Water is special (**Anomalous Expansion of Water**)!",
          "  - Water is at its **heaviest (maximum density) at 4°C**. As it cools from 4°C to 0°C, it expands into an open cage crystal shape, making ice **lighter (less dense) than liquid water**.",
          "  - **Saves Pond Fish in Winter**: Ice floats on top like an insulating blanket, keeping the liquid water underneath at 4°C so fish and turtles survive freezing winters!",
          "• **Why Does Food Cook Faster in a Pressure Cooker?**",
          "  - In an open pot, boiling water can never get hotter than 100°C because steam escapes.",
          "  - In a sealed pressure cooker, trapped steam builds up 2 times normal air pressure. **Higher pressure raises the boiling temperature of water to 120°C!** The hotter water and steam cook pulses and vegetables in a third of the normal time.",
          "• **What Causes a Mirage on a Hot Summer Highway?**",
          "  - On blazing hot days, the dark road heats up the air touching it. Light from the sky bends through these hot air layers and undergoes **Total Internal Reflection (TIR)**, bouncing up into your eyes like a mirror. Your brain thinks it sees a puddle of water reflecting the sky!",
          "• **How Does a Rainbow Form?**",
          "  - When sunlight shines through falling rain after a storm, **millions of tiny raindrops act like miniature glass prisms**. They bend, split (disperse), and reflect white sunlight into its 7 colors (VIBGYOR) with Red on the outside (42°) and Violet inside (40°).",
          "• **Why Can't Sound Travel in Space?**",
          "  - Sound is a physical vibration of air particles. Because outer space is an empty vacuum with no air molecules to vibrate, **sound cannot travel in space**. Astronauts use radio waves (which are electromagnetic and need no air) to talk."
        ],
        table: {
          head: ["Daily Phenomenon", "Core Science Reason", "Everyday Example"],
          rows: [
            ["Blue Sky", "Rayleigh Scattering: Blue light scatters 10× more", "Daytime sky looks bright blue; black in airless space"],
            ["Red Sunset & Danger Lights", "Red light has longest wavelength & scatters least", "Sunset horizon is red; brake lights pierce fog"],
            ["Twinkling of Stars", "Atmospheric Refraction through shifting air", "Distant stars twinkle; closer planets shine steadily"],
            ["Ice Floats on Water", "Water is densest at 4°C; expands as it freezes", "Icebergs float; lake bottoms stay liquid for fish"],
            ["Pressure Cooker", "Higher pressure raises water boiling point to 120°C", "Dal and rice cook in 10 minutes instead of 35"],
            ["Mirage on Hot Roads", "Total Internal Reflection (hot air bends light)", "Apparent puddle of water on dry highway in summer"],
            ["Rainbow", "Raindrops split sunlight (Dispersion + Refraction)", "7-color arc in sky when Sun is behind you"],
            ["Silence in Space", "Sound is a mechanical wave needing air molecules", "No sound in space; astronauts use radio headsets"]
          ]
        },
        tip: "Space Fact: On the Moon, because there is no air atmosphere to scatter sunlight, the sky is completely pitch-black even in broad daylight, and stars are visible next to the Sun!"
      },
      {
        title: "Famous Inventions & Scientific Discoveries",
        points: [
          "• **Penicillin (First Antibiotic)**: Discovered by accident in **1928 by Alexander Fleming** when a green mold killed bacteria in his lab dish. Saved millions of lives from infections.",
          "• **First Vaccine (Smallpox)**: Created in **1796 by Edward Jenner**, who noticed milkmaids exposed to cowpox didn't get deadly smallpox. Founded modern vaccination.",
          "• **Cell Discovery**: **Robert Hooke (1665)** first saw cork cells under a microscope and coined the word 'Cell'. **Antonie van Leeuwenhoek (1674)** first saw living bacteria in pond water.",
          "• **DNA Double Helix**: Discovered in **1953 by Watson, Crick, and Rosalind Franklin**, revealing how living things copy genetic information.",
          "• **X-Rays**: Discovered in **1895 by Wilhelm Röntgen**, allowing doctors to see broken bones inside the human body for the first time.",
          "• **Radioactivity**: Discovered by **Henri Becquerel** and **Marie Curie**. Marie Curie is the only scientist to win Nobel Prizes in both Physics and Chemistry!"
        ],
        table: {
          head: ["Discovery / Invention", "Scientist", "Year", "Why It Changed the World"],
          rows: [
            ["First Vaccine (Smallpox)", "Edward Jenner", "1796", "Started immunization; wiped out smallpox worldwide"],
            ["Cell Discovery", "Robert Hooke", "1665", "Named the basic building block of all life"],
            ["Living Bacteria", "Antonie van Leeuwenhoek", "1674", "First person to see microorganisms in water"],
            ["X-Rays", "Wilhelm Röntgen", "1895", "First medical imaging of human bones"],
            ["Radium & Radioactivity", "Marie & Pierre Curie", "1898", "Radiation cancer therapy; 2 Nobel Prizes"],
            ["Penicillin (First Antibiotic)", "Alexander Fleming", "1928", "Cured fatal bacterial infections and saved millions"],
            ["DNA Double Helix", "Watson, Crick & Franklin", "1953", "Decoded the genetic code of all living organisms"]
          ]
        },
        tip: "Inspiring Record: Marie Curie won the Nobel Prize in Physics (1903) for radioactivity, and then the Nobel Prize in Chemistry (1911) for discovering Radium and Polonium."
      },
      {
        title: "Practice Questions (MCQ)",
        points: [
          "**1. What optical phenomenon makes the clear daytime sky appear blue?**\n(A) Total Internal Reflection · (B) Rayleigh Scattering · (C) Gravitation · (D) Polarisation",
          "**2. At what temperature does liquid water reach its highest density (1.000 g/cm³)?**\n(A) 0°C · (B) 4°C · (C) 100°C · (D) −4°C",
          "**3. A shimmering mirage on a hot summer highway is caused by:**\n(A) Total Internal Reflection · (B) Sound echoes · (C) Rainbow dispersion · (D) X-rays",
          "**4. The world's first life-saving antibiotic, Penicillin, was discovered in 1928 by:**\n(A) Edward Jenner · (B) Louis Pasteur · (C) Alexander Fleming · (D) Robert Koch",
          "**5. Why does food cook significantly faster in a pressure cooker?**\n(A) Heat cannot escape · (B) High pressure raises water's boiling point to ~120°C · (C) Chemical reaction · (D) Decreased pressure"
        ]
      }
    ],
    keyTerms: [
      { term: "Rayleigh Scattering", meaning: "The scattering of light by air molecules, which scatters short blue wavelengths 10 times more than red wavelengths." },
      { term: "Total Internal Reflection", meaning: "When light travelling from dense to rare air bends so far that it completely reflects like a mirror." },
      { term: "Anomalous Expansion", meaning: "The unique property of water where it expands as it cools from 4°C to 0°C, making ice float on water." },
      { term: "Penicillin", meaning: "The first antibiotic discovered from mold by Alexander Fleming that kills infectious bacteria." }
    ],
    examTips: [
      "Danger signals are red because red has the longest wavelength and scatters least in fog and dust.",
      "Water is densest at 4°C, which is why ice floats and pond bottoms stay at 4°C for fish.",
      "Sound cannot travel in outer space because it needs a physical material (air, water, solid) to vibrate."
    ]
  }
];
