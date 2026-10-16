import type { ChapterNote } from "./types";

const U1 = "Unit 1 · Chemical Substances";
const U2 = "Unit 2 · World of Living";
const U3 = "Unit 3 · Natural Phenomena";
const U4 = "Unit 4 · Effects of Current";
const U5 = "Unit 5 · Natural Resources";

export const notes10: ChapterNote[] = [
  {
    "id": "note10-1",
    "classLevel": 10,
    "chapterNo": 1,
    "title": "Chemical Reactions and Equations",
    "unit": "Unit 1 · Chemical Substances",
    "overview": "A chemical reaction involves breaking old chemical bonds and forming new ones to produce substances with entirely distinct chemical and physical properties. This chapter covers writing balanced chemical equations, stoichiometry, classifications of reactions (combination, decomposition, displacement, double displacement, redox), and everyday oxidative degradation (corrosion and rancidity).",
    "diagram": "reaction-types",
    "sections": [
      {
        "title": "Chemical Reactions: Observable Indicators & Word Equations",
        "points": [
          "A **chemical reaction** occurs when one or more substances (reactants) undergo molecular transformation to form new substances (products) with entirely different chemical identities.",
          "**Key Observable Signs of a Reaction**:",
          "• **Change in State**: Formation of water liquid from gaseous hydrogen and oxygen: 2H₂(g) + O₂(g) → 2H₂O(l).",
          "• **Change in Colour**: Rusting of iron; displacement of copper from blue CuSO₄ by zinc to yield colourless ZnSO₄ and reddish-brown Cu: CuSO₄(aq) [blue] + Zn(s) → ZnSO₄(aq) [colourless] + Cu(s) [reddish-brown].",
          "• **Evolution of a Gas**: Granulated zinc reacting with dilute sulphuric acid produces vigorous effervescence of hydrogen gas: Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂↑. Hydrogen burns with a distinctive 'pop' sound when exposed to a burning splint.",
          "• **Change in Temperature**: Quicklime (calcium oxide) reacting vigorously with water releases immense heat (exothermic), boiling the water: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat.",
          "• **Formation of a Precipitate**: Mixing clear solutions of lead nitrate and potassium iodide instantly forms a bright yellow precipitate of lead iodide: Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂↓ [yellow ppt] + 2KNO₃(aq)."
        ],
        "tip": "NCERT Activity Alert: When a 2 cm magnesium ribbon is burned in air, clean it first with sandpaper to remove the inert protective layer of basic magnesium carbonate. It burns with a dazzling white flame to form white magnesium oxide powder: 2Mg(s) + O₂(g) → 2MgO(s)."
      },
      {
        "title": "Balancing Chemical Equations & Law of Conservation of Mass",
        "points": [
          "**Law of Conservation of Mass**: Matter can neither be created nor destroyed in a chemical reaction. Therefore, the total mass of the products must equal the total mass of the reactants, meaning the number of atoms of each element must remain identical before and after the reaction.",
          "**Skeletal Equation**: A qualitative equation that represents the identities of reactants and products without balancing atom counts (e.g., Fe + H₂O → Fe₃O₄ + H₂).",
          "**Step-by-Step Hit-and-Trial Balancing Method**:",
          "1. Draw boxes around all chemical formulas; never alter any subscripts inside the formulas.",
          "2. Count the atoms of each element on reactant and product sides in a tabular tally.",
          "3. Begin balancing with the compound containing the maximum number of atoms (here, Fe₃O₄ has 4 oxygen atoms).",
          "4. Balance Oxygen: Multiply H₂O by 4: Fe + 4H₂O → Fe₃O₄ + H₂.",
          "5. Balance Hydrogen: Multiply H₂ on product side by 4: Fe + 4H₂O → Fe₃O₄ + 4H₂.",
          "6. Balance Iron: Multiply Fe by 3: 3Fe + 4H₂O → Fe₃O₄ + 4H₂.",
          "7. Verify counts: Reactants (3 Fe, 8 H, 4 O) = Products (3 Fe, 8 H, 4 O).",
          "**Physical States & Reaction Conditions**: Use (s) for solid, (l) for liquid, (g) for gas, and (aq) for aqueous solution. Reaction conditions such as temperature (Δ), pressure (e.g., 340 atm in methanol synthesis: CO(g) + 2H₂(g) xrightarrow{340 atm} CH₃OH(l)), or catalysts are written above or below the reaction arrow."
        ],
        "formula": [
          "Balanced Rusting/Steam Reaction: 3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)",
          "Photosynthesis: 6CO₂(aq) + 12H₂O(l) xrightarrow{Chlorophyll, Sunlight} C₆H₁₂O₆(aq) + 6O₂(aq) + 6H₂O(l)"
        ]
      },
      {
        "title": "Combination & Decomposition Reactions (Thermal, Electrolytic, Photolytic)",
        "points": [
          "**Combination Reaction**: Two or more reactants combine to yield a single product: A + B → AB.",
          "• Calcium oxide (Quicklime) slakes with water to form calcium hydroxide (Slaked lime): CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat.",
          "• **Whitewashing Application**: Slaked lime applied to walls reacts slowly with atmospheric carbon dioxide over 2–3 days to form a thin, shiny layer of calcium carbonate: Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l).",
          "• Other examples: Burning of coal (C(s) + O₂(g) → CO₂(g)) and formation of water (2H₂(g) + O₂(g) → 2H₂O(l)).",
          "**Decomposition Reaction**: A single reactant breaks down under energy input to produce two or more simpler products: AB → A + B.",
          "• **Thermal Decomposition (Heat Δ)**:",
          "  1. Green ferrous sulphate crystals (FeSO₄·7H₂O) lose water of crystallisation to turn white, then decompose upon strong heating to reddish-brown ferric oxide and choking, suffocating gases (SO₂ and SO₃): 2FeSO₄(s) xrightarrow{Δ} Fe₂O₃(s) + SO₂(g) + SO₃(g).",
          "  2. Limestone decomposes to quicklime and carbon dioxide: CaCO₃(s) xrightarrow{Δ} CaO(s) + CO₂(g).",
          "  3. White lead nitrate decomposes with crackling sound into yellow lead monoxide, brown fumes of nitrogen dioxide, and oxygen: 2Pb(NO₃)₂(s) xrightarrow{Δ} 2PbO(s) + 4NO₂(g) [brown fumes] + O₂(g).",
          "• **Electrolytic Decomposition (Electricity)**: Electrolysis of acidified water. Hydrogen gas collects at the cathode (-) and oxygen at the anode (+) in a 2:1 volume ratio: 2H₂O(l) xrightarrow{Electric Current} 2H₂(g) [cathode] + O₂(g) [anode].",
          "• **Photolytic Decomposition (Light hν)**: White silver chloride turns grey in sunlight due to decomposition into silver and chlorine: 2AgCl(s) xrightarrow{Sunlight} 2Ag(s) + Cl₂(g). Similarly, 2AgBr(s) xrightarrow{Sunlight} 2Ag(s) + Br₂(g). These reactions form the basis of black-and-white photography."
        ],
        "tip": "Exothermic reactions release thermal energy (respiration, decomposition of vegetable matter into compost, combustion of methane: CH₄ + 2O₂ → CO₂ + 2H₂O + Heat). Endothermic reactions absorb energy (all photolytic, electrolytic, and most thermal decompositions)."
      },
      {
        "title": "Displacement & Double Displacement Reactions",
        "points": [
          "**Displacement Reaction**: A more reactive chemical element displaces a less reactive element from its aqueous salt solution: A + BC → AC + B.",
          "• When clean iron nails are immersed in blue copper sulphate solution, iron displaces copper. The blue colour fades to pale green (formation of FeSO₄), and a reddish-brown crust of copper deposits on the nail: Fe(s) + CuSO₄(aq) [blue] → FeSO₄(aq) [pale green] + Cu(s) [reddish-brown].",
          "• Zinc and lead are more reactive than copper and displace it: Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s); Pb(s) + CuCl₂(aq) → PbCl₂(aq) + Cu(s).",
          "**Double Displacement Reaction**: Two ionic compounds in aqueous solution exchange ions to generate two new compounds: AB + CD → AD + CB.",
          "• **Precipitation Reactions**: Mixing aqueous sodium sulphate with barium chloride produces an insoluble white precipitate of barium sulphate: Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ [white precipitate] + 2NaCl(aq).",
          "• **Neutralisation as Double Displacement**: Acid + Base → Salt + Water: HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)."
        ],
        "table": {
          "head": [
            "Reaction Class",
            "General Equation",
            "Distinctive Characteristic",
            "NCERT Classic Benchmark"
          ],
          "rows": [
            [
              "Combination",
              "A + B → AB",
              "Single product formed; often exothermic",
              "CaO(s) + H₂O(l) → Ca(OH)₂(aq)"
            ],
            [
              "Thermal Decomposition",
              "AB xrightarrow{Δ} A + B",
              "Requires heat; single reactant split",
              "2FeSO₄(s) → Fe₂O₃ + SO₂ + SO₃"
            ],
            [
              "Electrolytic Decomposition",
              "AB xrightarrow{Current} A + B",
              "Electrical splitting into elements",
              "2H₂O(l) → 2H₂(g) + O₂(g) (2:1 vol)"
            ],
            [
              "Photolytic Decomposition",
              "AB xrightarrow{Sunlight} A + B",
              "Light-activated cleavage",
              "2AgCl(s) → 2Ag(s) + Cl₂(g)"
            ],
            [
              "Displacement",
              "A + BC → AC + B",
              "Governed by metal reactivity series",
              "Fe(s) + CuSO₄(aq) → FeSO₄ + Cu"
            ],
            [
              "Double Displacement",
              "AB + CD → AD + CB",
              "Mutual ion exchange; precipitate formed",
              "Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl"
            ]
          ]
        }
      },
      {
        "title": "Redox Reactions: Oxidation, Reduction, Oxidising & Reducing Agents",
        "points": [
          "**Classical Definitions**:",
          "• **Oxidation**: Gain of oxygen or loss of hydrogen by a substance.",
          "• **Reduction**: Loss of oxygen or gain of hydrogen by a substance.",
          "**Modern Electronic Concept**: Oxidation is Loss of electrons (OIL); Reduction is Gain of electrons (RIG).",
          "**Redox Reaction**: A reaction where oxidation and reduction occur simultaneously.",
          "• When black copper(II) oxide is heated with hydrogen gas, copper metal and water are formed: CuO(s) + H₂(g) xrightarrow{Δ} Cu(s) + H₂O(g).",
          "  - CuO loses oxygen → Reduced to Cu (CuO is the **oxidising agent**).",
          "  - H₂ gains oxygen → Oxidised to H₂O (H₂ is the **reducing agent**).",
          "• Reaction of Zinc oxide with Carbon: ZnO + C → Zn + CO. Carbon is oxidised to CO (reducing agent); ZnO is reduced to Zn (oxidising agent).",
          "• Reaction of Manganese dioxide with Hydrochloric acid: MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂. HCl is oxidised to Cl₂ (loses H); MnO₂ is reduced to MnCl₂ (loses O)."
        ]
      },
      {
        "title": "Everyday Oxidative Degradation: Corrosion and Rancidity",
        "points": [
          "**Corrosion**: The slow deterioration of metals caused by chemical or electrochemical reaction with atmospheric moisture, oxygen, acids, and gases.",
          "• **Rusting of Iron**: Iron exposed to moist air forms a brown, flaky coating of hydrated ferric oxide: 4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O. Rust does not adhere tightly; it flakes off, exposing fresh metal to progressive destruction.",
          "• **Tarnishing of Silver**: Silver articles turn black after some time due to reaction with atmospheric hydrogen sulphide (H₂S) forming a black coating of silver sulphide: 2Ag + H₂S → Ag₂S [black] + H₂.",
          "• **Corrosion of Copper**: Copper objects react slowly with moist carbon dioxide in air to develop a green protective patina of basic copper carbonate: 2Cu + H₂O + CO₂ + O₂ → CuCO₃·Cu(OH)₂ [green layer].",
          "• **Corrosion Prevention**: Painting, oiling, greasing, electroplating, anodising, and **galvanisation** (coating iron/steel with a thin sacrificial protective layer of zinc).",
          "**Rancidity**: The aerial oxidation of fats and oils in food items, resulting in unpleasant smell, sour taste, and toxic byproducts.",
          "• **Prevention of Rancidity**:",
          "  1. Adding synthetic antioxidants such as BHA (butylated hydroxyanisole) and BHT.",
          "  2. Flushing food packages with unreactive nitrogen gas (e.g., potato chip bags flushed with N₂ to displace O₂).",
          "  3. Storing food in airtight containers in cool, dark environments (refrigeration) to retard oxidative reaction rates."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. When green ferrous sulphate crystals are heated in a dry boiling tube, what sequence of observations occurs? (A) White crystals turn green and smell of burning sulfur (B) Green crystals turn white, then reddish-brown with suffocating gas emissions (C) Immediate melting into a blue liquid (D) A yellow precipitate forms with no gas evolved",
          "2. Electrolysis of water is an electrolytic decomposition reaction. The mole ratio of hydrogen gas collected at the cathode to oxygen gas collected at the anode is: (A) 1:1 (B) 1:2 (C) 2:1 (D) 4:1",
          "3. In the reaction: MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂, identify the oxidising agent and the reducing agent: (A) MnO₂ is oxidising agent; HCl is reducing agent (B) HCl is oxidising agent; MnO₂ is reducing agent (C) Both are reducing agents (D) Cl₂ is oxidising agent; MnCl₂ is reducing agent",
          "4. When aqueous solutions of sodium sulphate and barium chloride are mixed together: (A) A clear colourless mixture remains without precipitate (B) An insoluble yellow precipitate of barium sulphate forms (C) An insoluble white precipitate of barium sulphate forms instantaneously (D) Sulphur dioxide gas evolves vigorously",
          "5. Potato chip manufacturers flush packets with which gas to prevent rancidity through oxidation? (A) Oxygen (B) Hydrogen (C) Chlorine (D) Nitrogen"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Law of Conservation of Mass",
        "meaning": "Matter cannot be created or destroyed; reactant mass equals product mass."
      },
      {
        "term": "Skeletal Equation",
        "meaning": "Unbalanced chemical equation indicating reactants and products only."
      },
      {
        "term": "Combination Reaction",
        "meaning": "Reaction where two or more substances synthesize a single unified compound."
      },
      {
        "term": "Decomposition Reaction",
        "meaning": "Cleavage of a single compound into multiple simpler constituents using heat, light, or electricity."
      },
      {
        "term": "Displacement Reaction",
        "meaning": "Reaction in which an element displaces a less reactive element from its aqueous salt solution."
      },
      {
        "term": "Double Displacement",
        "meaning": "Reaction where two ionic partners mutually exchange ions, often forming a precipitate."
      },
      {
        "term": "Precipitate",
        "meaning": "An insoluble solid product that separates from an aqueous liquid mixture."
      },
      {
        "term": "Redox Reaction",
        "meaning": "Coupled reaction involving simultaneous oxidation of one reactant and reduction of another."
      },
      {
        "term": "Oxidising Agent",
        "meaning": "A chemical species that removes electrons/hydrogen or provides oxygen, being reduced in the process."
      },
      {
        "term": "Galvanisation",
        "meaning": "Applying a sacrificial surface layer of zinc onto iron or steel to avert rusting."
      },
      {
        "term": "Rancidity",
        "meaning": "Spontaneous atmospheric oxidation of unsaturated fats and oils causing foul taste and odor."
      }
    ],
    "examTips": [
      "Always specify physical states (s, l, g, aq) and reaction conditions (Δ, sunlight) when writing balanced equations in board exams.",
      "In redox identification questions, remember that the substance oxidised is the reducing agent, and the substance reduced is the oxidising agent.",
      "Thermal decomposition of ferrous sulphate releases two gases: SO₂ and SO₃. The solid residue is reddish-brown Fe₂O₃."
    ]
  },
  {
    "id": "note10-2",
    "classLevel": 10,
    "chapterNo": 2,
    "title": "Acids, Bases and Salts",
    "unit": "Unit 1 · Chemical Substances",
    "overview": "Acids and bases are chemical opposites whose interactions define aqueous chemistry. This chapter investigates natural and synthetic indicators, chemical properties of acids and bases, the logarithmic pH scale, universal indicators, acid-base physiology, and industrial synthesis of major sodium salts (chlor-alkali process, bleaching powder, baking soda, washing soda, and plaster of Paris).",
    "diagram": "ph-scale",
    "sections": [
      {
        "title": "Indicators: Natural, Synthetic & Olfactory",
        "points": [
          "**Acids**: Sour in taste, turn blue litmus red, conduct electricity in aqueous medium, produce hydronium ions (H₃O⁺).",
          "**Bases**: Bitter in taste, soapy to touch, turn red litmus blue, produce hydroxide ions (OH⁻) in water. Bases soluble in water are called **alkalis** (e.g., NaOH, KOH, Ca(OH)₂).",
          "**Classification of Indicators**:",
          "• **Natural Indicators**:",
          "  - **Litmus**: Extracted from lichens (division Thallophyta); purple dye in neutral state. Turns **red** in acid, **blue** in base.",
          "  - **Turmeric**: Yellow in neutral/acid; turns **reddish-brown** in basic solution (e.g., soap washed over a curry stain).",
          "  - **Red Cabbage Leaf Extract**: Red in acid, green in base.",
          "• **Synthetic Indicators**:",
          "  - **Phenolphthalein**: Colourless in acidic/neutral solution; turns **deep pink** in basic solution.",
          "  - **Methyl Orange**: Turns **red** in acidic solution; turns **yellow** in basic solution.",
          "• **Olfactory Indicators**: Substances whose characteristic odour changes in acidic or basic media. Vanilla essence, onion juice, and clove oil retain their distinct smell in acidic medium, but their odour is completely destroyed in basic medium (e.g., NaOH)."
        ],
        "table": {
          "head": [
            "Indicator",
            "Colour / Smell in Acidic Solution",
            "Colour / Smell in Basic Solution"
          ],
          "rows": [
            [
              "Blue Litmus",
              "Red",
              "Blue (No change)"
            ],
            [
              "Red Litmus",
              "Red (No change)",
              "Blue"
            ],
            [
              "Phenolphthalein",
              "Colourless",
              "Deep Pink"
            ],
            [
              "Methyl Orange",
              "Red",
              "Yellow"
            ],
            [
              "Turmeric",
              "Yellow (No change)",
              "Reddish-Brown"
            ],
            [
              "Vanilla Essence / Onion",
              "Characteristic smell retained",
              "Odour completely destroyed"
            ]
          ]
        }
      },
      {
        "title": "Chemical Reactions of Acids and Bases",
        "points": [
          "**Reaction with Metals**:",
          "• Acid + Metal → Salt + Hydrogen gas↑: Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂↑. Hydrogen gas tested by bringing burning matchstick; burns with a 'pop' sound.",
          "• Bases react only with certain active amphoteric metals: 2NaOH(aq) + Zn(s) xrightarrow{Δ} Na₂ZnO₂(aq) [Sodium Zincate] + H₂↑.",
          "• Nitric acid (HNO₃) generally does not evolve H₂ gas with metals because it is a strong oxidising agent that oxidises H₂ to H₂O, getting reduced to nitrogen oxides (NO₂, N₂O, NO). However, very dilute HNO₃ reacts with Magnesium and Manganese to liberate H₂ gas: Mg + 2HNO₃(very dilute) → Mg(NO₃)₂ + H₂↑.",
          "**Reaction with Metal Carbonates & Hydrogen Carbonates**:",
          "• Acid + Metal Carbonate → Salt + H₂O + CO₂↑: Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)↑.",
          "• Acid + Metal Hydrogencarbonate → Salt + H₂O + CO₂↑: NaHCO₃(s) + HCl(aq) → NaCl(aq) + H₂O(l) + CO₂(g)↑.",
          "• **Carbon Dioxide Confirmation (Limewater Test)**: Passing evolved CO₂ gas through clear limewater turns it milky due to the formation of insoluble calcium carbonate: Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ [white precipitate] + H₂O(l).",
          "• **Excess CO₂ Effect**: On prolonged bubbling of excess CO₂, milkiness disappears because insoluble CaCO₃ converts to water-soluble calcium hydrogen carbonate: CaCO₃(s) + H₂O(l) + CO₂(g) → Ca(HCO₃)₂(aq) [soluble, clear].",
          "**Neutralisation Reaction**: Acid + Base → Salt + Water: HCl + NaOH → NaCl + H₂O.",
          "**Reaction with Oxides**:",
          "• Metal oxide + Acid → Salt + Water (Metal oxides are **basic oxides**, e.g., CuO + 2HCl → CuCl₂ [blue-green] + H₂O).",
          "• Non-metal oxide + Base → Salt + Water (Non-metal oxides are **acidic oxides**, e.g., Ca(OH)₂ + CO₂ → CaCO₃ + H₂O)."
        ]
      },
      {
        "title": "Ionisation in Solution, Dilution Safety & Nature of H⁺/OH⁻ Ions",
        "points": [
          "**Why do acidic properties manifest only in water?** Hydrogen ions (H⁺) cannot exist in isolation. In aqueous medium, an acid dissociates, and H⁺ immediately associates with water molecules to form hydronium ions (H₃O⁺): HCl + H₂O → H₃O⁺ + Cl⁻.",
          "• **Dry HCl vs Litmus**: Dry HCl gas has no effect on dry blue litmus paper because free H⁺/H₃O⁺ ions are absent without moisture. Moist blue litmus turns red instantly.",
          "• **Electrolytic Conduction**: Aqueous solutions of acids (HCl, H₂SO₄) and bases (NaOH) conduct electric current due to mobile free ions. Aqueous glucose (C₆H₁₂O₆) and alcohol (C₂H₅OH) do not conduct electricity because they do not ionise into free ions despite having hydrogen atoms.",
          "**Safe Dilution Protocol (Strict Warning)**:",
          "• Dilution of a concentrated acid (especially concentrated H₂SO₄) is an **extremely exothermic** process.",
          "• **RULE**: **ALWAYS add concentrated acid slowly to water** with continuous stirring. NEVER add water to concentrated acid. If water is poured into concentrated acid, localized boiling occurs, causing the acid to splash out violently and crack the glass container, leading to severe chemical burns."
        ],
        "tip": "Mixing an acid or base with water results in a decrease in the concentration of ions (H₃O⁺ / OH⁻) per unit volume. This process is called dilution."
      },
      {
        "title": "The pH Scale, Universal Indicator & Real-World Applications",
        "points": [
          "**The pH Concept**: 'p' stands for 'potenz' (German for power). pH is a logarithmic measure of the molar hydrogen ion concentration: pH = -log₁₀[H⁺].",
          "• Neutral water at 25°C: [H⁺] = 10⁻⁷ M → pH = 7.",
          "• Acidic solutions: [H⁺] > 10⁻⁷ M → pH < 7. Lower pH indicates stronger acidity.",
          "• Basic solutions: [H⁺] < 10⁻⁷ M, [OH⁻] > 10⁻⁷ M → pH > 7. Higher pH indicates stronger basicity.",
          "• **Universal Indicator**: A blended mixture of several dyes that exhibits distinct continuous colour changes across the entire pH range from 0 to 14 (Red at pH 1–2, Yellow at pH 4–5, Green at pH 7, Blue at pH 9–10, Violet/Purple at pH 13–14).",
          "**Critical Everyday Importance of pH**:",
          "• **Human Body Range**: Physiological processes operate within a narrow homeostasis range of pH 7.0 to 7.8.",
          "• **Acid Rain**: When the pH of rainwater drops below **5.6**, it is called acid rain. It lowers river pH, killing aquatic life, and corrodes marble monuments (marble cancer: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂).",
          "• **Soil pH**: Optimal plant growth requires a specific soil pH (~6.5–7.2). Excessively acidic soil is treated with quicklime (CaO), slaked lime (Ca(OH)₂), or chalk (CaCO₃). Basic soil is amended with decaying organic matter (compost).",
          "• **Human Digestive System**: Stomach produces hydrochloric acid (pH ~1.2 to 2.0) to activate pepsin. Overeating causes hyperacidity. Antacids (mild bases like milk of magnesia [Mg(OH)₂] or baking soda [NaHCO₃]) neutralise excess acid.",
          "• **Tooth Decay**: Enamel (calcium hydroxyapatite, crystalline calcium phosphate) is the hardest substance in the human body. Bacteria degrade leftover food particles producing acids; tooth decay begins when mouth pH falls below **5.5**. Basic toothpastes neutralise this acid.",
          "• **Biological Self-Defence**: Honeybee stings and nettle hair leaves inject **methanoic acid (formic acid)**, causing intense burning pain. Treated by applying mild basic baking soda or dock plant leaf extract."
        ]
      },
      {
        "title": "Industrial Chemicals from Common Salt (NaCl)",
        "points": [
          "Sodium chloride (NaCl) is the fundamental starting material for manufacturing numerous essential industrial chemicals.",
          "**1. Chlor-Alkali Process (Manufacture of NaOH)**:",
          "• Passing electric current through cold concentrated brine (aqueous NaCl) results in decomposition:",
          "  2NaCl(aq) + 2H₂O(l) xrightarrow{Electrolysis} 2NaOH(aq) + Cl₂(g) [Anode] + H₂(g) [Cathode].",
          "• **Products and Uses**:",
          "  - Cl₂ gas (at Anode): Water disinfection, PVC, CFCs, swimming pool sanitation, bleaching agent.",
          "  - H₂ gas (at Cathode): Ammonia synthesis for fertilisers, margarine, rocket fuel.",
          "  - NaOH solution (near Cathode): Soap and detergent manufacturing, paper de-inking, artificial fibres (rayon), degreasing metals.",
          "**2. Bleaching Powder (CaOCl₂)**:",
          "• Produced by the action of chlorine gas on dry slaked lime: Ca(OH)₂(s) + Cl₂(g) → CaOCl₂(s) + H₂O(l).",
          "• Uses: Bleaching cotton and linen in textile industry; wood pulp in paper factories; sterilizing drinking water (germicide); strong oxidising agent in chemical synthesis.",
          "**3. Baking Soda (Sodium Hydrogencarbonate, NaHCO₃)**:",
          "• Synthesised via the Solvay Process: NaCl + H₂O + CO₂ + NH₃ → NH₄Cl + NaHCO₃↓.",
          "• Properties: Non-corrosive mild basic salt. On heating during cooking, it releases CO₂:",
          "  2NaHCO₃(s) xrightarrow{Δ} Na₂CO₃(s) + H₂O(l) + CO₂(g)↑.",
          "• **Baking Powder**: A mixture of baking soda (NaHCO₃) and a mild edible acid like tartaric acid. When moistened and heated, CO₂ evolves smoothly without leaving a bitter alkaline taste of Na₂CO₃ (tartaric acid neutralises Na₂CO₃ forming sodium tartrate): NaHCO₃ + H⁺ → Na⁺ + H₂O + CO₂↑. The trapped CO₂ causes bread and cakes to rise, making them soft and spongy.",
          "• Uses: Ingredient in antacids; component in soda-acid fire extinguishers.",
          "**4. Washing Soda (Sodium Carbonate Decahydrate, Na₂CO₃·10H₂O)**:",
          "• Prepared by recrystallisation of sodium carbonate obtained from thermal decomposition of baking soda: Na₂CO₃ + 10H₂O → Na₂CO₃·10H₂O.",
          "• Uses: Glass, soap, and paper industries; domestic laundry detergent; **permanent hardness removal** from water by precipitating Ca²⁺ and Mg²⁺ ions as insoluble carbonates.",
          "**5. Plaster of Paris (CaSO₄·½H₂O) & Water of Crystallisation**:",
          "• **Water of Crystallisation**: The fixed number of water molecules chemically bonded in one formula unit of a crystalline salt (e.g., blue CuSO₄·5H₂O turns white anhydrous CuSO₄ when heated; green FeSO₄·7H₂O; white Gypsum CaSO₄·2H₂O).",
          "• **Plaster of Paris (POP)**: Manufactured by carefully heating Gypsum (CaSO₄·2H₂O) at **373 K (100°C)**: CaSO₄·2H₂O xrightarrow{373 K} CaSO₄·½H₂O + 1½H₂O.",
          "• Note: If heated above 373 K, gypsum loses all water to form anhydrous calcium sulphate (CaSO₄), called 'dead burnt plaster', which lacks setting properties.",
          "• **Setting of POP**: When mixed with water, POP re-hydrates with expansion, setting into a hard solid mass of gypsum within 10–15 minutes: CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O.",
          "• Uses: Orthopaedic casts for fractured bones; dental moulds; decorative ceiling plasterworks; fireproofing materials."
        ],
        "formula": [
          "Chlor-Alkali: 2NaCl(aq) + 2H₂O(l) → 2NaOH(aq) + Cl₂(g) + H₂(g)",
          "Bleaching Powder: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O",
          "Thermal Cleavage of Baking Soda: 2NaHCO₃ xrightarrow{Δ} Na₂CO₃ + H₂O + CO₂",
          "Plaster of Paris Setting: CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O"
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. Tooth decay starts when the pH in the mouth falls below: (A) 7.0 (B) 6.5 (C) 5.5 (D) 4.0",
          "2. During the Chlor-Alkali process of aqueous NaCl electrolysis, the products liberated at the anode and cathode respectively are: (A) H₂ at anode, Cl₂ at cathode (B) Cl₂ at anode, H₂ at cathode (C) O₂ at anode, H₂ at cathode (D) Cl₂ at anode, Na metal at cathode",
          "3. Plaster of Paris is formed by heating Gypsum at what temperature, and what is its chemical formula? (A) 273 K, CaSO₄·H₂O (B) 373 K, CaSO₄·½H₂O (C) 473 K, CaSO₄·2H₂O (D) 373 K, 2CaSO₄·H₂O",
          "4. An aqueous solution turns red litmus blue. Excess addition of which of the following reagents would reverse the change? (A) Baking powder (B) Lime (C) Ammonium hydroxide solution (D) Hydrochloric acid",
          "5. What happens when excess carbon dioxide gas is passed through clear lime water? (A) Milkiness intensifies indefinitely (B) The milkiness disappears due to formation of soluble Ca(HCO₃)₂ (C) A yellow precipitate of lead carbonate settles down (D) A pop sound is heard"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Alkali",
        "meaning": "A base that dissolves completely in water to yield hydroxide ions (OH⁻)."
      },
      {
        "term": "Olfactory Indicator",
        "meaning": "A substance whose characteristic smell shifts depending on whether it is in an acidic or alkaline medium."
      },
      {
        "term": "Hydronium Ion (H₃O⁺)",
        "meaning": "The species formed when a free proton attaches to an aqueous water molecule."
      },
      {
        "term": "pH Scale",
        "meaning": "A logarithmic metric (0–14) measuring hydrogen ion concentration in solution."
      },
      {
        "term": "Universal Indicator",
        "meaning": "A mixture of organic dyes displaying a rainbow sequence of colours across the entire pH spectrum."
      },
      {
        "term": "Chlor-Alkali Process",
        "meaning": "Industrial electrolysis of brine producing chlorine gas, hydrogen gas, and sodium hydroxide."
      },
      {
        "term": "Water of Crystallisation",
        "meaning": "A fixed stoichiometric number of water molecules chemically coordinated inside a crystal lattice unit."
      },
      {
        "term": "Plaster of Paris",
        "meaning": "Calcium sulphate hemihydrate (CaSO₄·½H₂O) which sets into gypsum on hydration."
      },
      {
        "term": "Antacid",
        "meaning": "A mild basic drug that neutralises hyperacidity in the stomach without causing caustic harm."
      }
    ],
    "examTips": [
      "Never add water directly to concentrated acid; always add concentrated acid slowly to water with constant stirring to prevent explosive splash-back.",
      "Dry HCl gas does not change the colour of dry blue litmus paper because free H⁺ / H₃O⁺ ions are formed only in the presence of water.",
      "Plaster of Paris formula is CaSO₄·½H₂O; heating gypsum above 373 K removes all water to form inactive 'dead burnt plaster'."
    ]
  },
  {
    "id": "note10-3",
    "classLevel": 10,
    "chapterNo": 3,
    "title": "Metals and Non-metals",
    "unit": "Unit 1 · Chemical Substances",
    "overview": "Metals and non-metals form the structural foundation of chemistry. This chapter investigates physical properties and notable anomalies, chemical reactivity with oxygen, water, and acids, the reactivity series, electrovalent (ionic) bond mechanisms, metallurgy (ore extraction, roasting, calcination, thermite process, electrolytic refining), and corrosion prevention through alloying and galvanisation.",
    "diagram": "reactivity-series",
    "sections": [
      {
        "title": "Physical Properties & Critical Anomalous Exceptions",
        "points": [
          "**Typical Metallic Properties**: High tensile strength, malleability (hammered into ultra-thin sheets; gold and silver are the most malleable), ductility (drawn into fine wires; 1 g gold can yield a 2 km wire), high melting/boiling points, high electrical and thermal conductivity (silver is the best conductor, followed by copper; lead and mercury are poor conductors), metallic lustre, sonorous nature.",
          "**Typical Non-metallic Properties**: Brittle, poor conductors of heat and electricity, non-lustrous, non-sonorous, exist in solid, liquid, or gaseous states.",
          "**CRITICAL EXCEPTIONS (High-Yield Board Highlights)**:",
          "• **Liquid State at Room Temperature**: Mercury (Hg) is the only liquid metal. Bromine (Br₂) is the only liquid non-metal.",
          "• **Lustre Exception**: Iodine (I₂) is a non-metal but possesses high metallic lustre.",
          "• **Melting Point Exception**: Gallium (Ga) and Caesium (Cs) are metals with such low melting points (30°C and 28.4°C) that they melt on human palms.",
          "• **Hardness Exception**: Alkali metals (Lithium, Sodium, Potassium) are soft metals with low densities that can be cut effortlessly with a knife. Diamond (an allotrope of non-metal carbon) is the hardest naturally occurring substance known, with an extraordinarily high melting point.",
          "• **Electrical Conductivity Exception**: Graphite (allotrope of carbon) is a non-metal that conducts electricity exceptionally well due to free delocalised electrons between its hexagonal sheet layers."
        ]
      },
      {
        "title": "Chemical Properties of Metals: Air, Water, and Acids",
        "points": [
          "**1. Reaction with Air (Oxygen)**: Metal + O₂ → Metal Oxide (generally basic oxides).",
          "• Sodium and Potassium react so vigorously with oxygen that they catch fire spontaneously in moist air; they are stored immersed under kerosene oil to prevent accidental fires.",
          "• Magnesium, Aluminium, Zinc, and Lead form a thin, inert protective oxide layer on their surface preventing further oxidation.",
          "• Iron does not burn on heating, but iron filings sprinkled in a flame burn vigorously.",
          "• **Amphoteric Oxides**: Metal oxides that react with BOTH acids and bases to yield salt and water:",
          "  - Aluminium oxide with acid: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O.",
          "  - Aluminium oxide with base: Al₂O₃ + 2NaOH → 2NaAlO₂ [Sodium Aluminate] + H₂O.",
          "  - Zinc oxide behaves similarly: ZnO + 2NaOH → Na₂ZnO₂ [Sodium Zincate] + H₂O.",
          "• **Anodising**: Electrolytic process of creating a thick, corrosion-resistant oxide film on aluminium using dilute H₂SO₄.",
          "**2. Reaction with Water**:",
          "• **Cold Water**: 2Na + 2H₂O → 2NaOH + H₂ + Immense Heat (H₂ catches fire instantly). Calcium reacts less violently; Ca floats because bubbles of evolved H₂ gas stick to its surface.",
          "• **Hot Water**: Magnesium reacts with hot water to form Mg(OH)₂ + H₂; it also floats due to clinging H₂ bubbles.",
          "• **Steam Only**: Aluminium, Iron, and Zinc react only with steam to produce metal oxide and hydrogen: 2Al + 3H₂O(g) → Al₂O₃ + 3H₂; 3Fe + 4H₂O(g) → Fe₃O₄ [Magnetic oxide] + 4H₂.",
          "• **No Reaction**: Lead, Copper, Silver, and Gold do not react with water or steam at all.",
          "**3. Reaction with Acids & Aqua Regia**:",
          "• Metal + Dilute Acid → Metal Salt + H₂↑.",
          "• Copper, Silver, Gold, and Platinum lie below hydrogen in the reactivity series and cannot displace hydrogen from dilute HCl or H₂SO₄.",
          "• **Aqua Regia (Royal Water)**: A freshly prepared fuming mixture of concentrated Hydrochloric acid and concentrated Nitric acid in a **3:1 volume ratio**. It can dissolve noble metals like Gold (Au) and Platinum (Pt) due to nascent chlorine formation."
        ]
      },
      {
        "title": "The Reactivity (Activity) Series & Displacement Principles",
        "points": [
          "The **Reactivity Series** is an empirical arrangement of metals in decreasing order of their chemical reactivity (tendency to lose electrons to form positive ions):",
          "**K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au**.",
          "• Any metal higher in the series can displace any metal lower in the series from its aqueous salt solution: Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s).",
          "• A metal below hydrogen cannot displace H₂ gas from dilute mineral acids."
        ],
        "tip": "Mnemonic to master the series: 'Please Stop Calling Me A Zebra, Instead Learn How Copper Saves Gold' (Potassium, Sodium, Calcium, Magnesium, Aluminium, Zinc, Iron, Lead, Hydrogen, Copper, Silver, Gold)."
      },
      {
        "title": "Ionic Bonding: Formation, Electron-Dot Structures & Properties",
        "points": [
          "**Ionic (Electrovalent) Bond**: Formed by the complete transfer of one or more valence electrons from a metal atom (which forms a positive cation) to a non-metal atom (which forms a negative anion) to achieve a stable noble gas octet.",
          "• **Formation of NaCl**: Na (2,8,1) → Na⁺ (2,8) + e⁻; Cl (2,8,7) + e⁻ → Cl⁻ (2,8,8). Electrostatic attraction: Na⁺ + Cl⁻ → NaCl.",
          "• **Formation of MgCl₂**: Mg (2,8,2) → Mg²⁺ (2,8) + 2e⁻; 2Cl (2,8,7) + 2e⁻ → 2Cl⁻ (2,8,8). Formula: Mg²⁺[Cl⁻]₂.",
          "**Characteristics of Ionic Compounds**:",
          "1. **Physical Nature**: Hard, brittle crystalline solids due to strong inter-ionic electrostatic attractive forces.",
          "2. **Melting and Boiling Points**: Extremely high (NaCl MP is 1074 K) because significant thermal energy is required to overcome strong ionic lattice attractions.",
          "3. **Solubility**: Readily soluble in polar solvents (water), but completely insoluble in non-polar organic solvents (kerosene, petrol, benzene).",
          "4. **Electrical Conductivity**: In solid state, ions are locked rigidly in position within the crystal lattice; hence, ionic solids **do not conduct electricity**. In molten state or aqueous solution, electrostatic bonds break, and free mobile ions conduct electricity readily."
        ]
      },
      {
        "title": "Metallurgy: Extraction of Metals from Ores",
        "points": [
          "**Minerals**: Naturally occurring inorganic compounds of metals in Earth's crust. **Ores**: Minerals from which metals can be extracted profitably and conveniently. **Gangue**: Unwanted rocky, sandy, or earthy impurities associated with mined ore.",
          "**Extraction Based on Position in Reactivity Series**:",
          "• **1. Low Reactivity Metals (Unreactive: Cu, Hg)**: Extracted by simple thermal reduction of their sulphide ores in air.",
          "  - Cinnabar (HgS): 2HgS + 3O₂ xrightarrow{Δ} 2HgO + 2SO₂; followed by 2HgO xrightarrow{Δ} 2Hg + O₂.",
          "  - Copper glance (Cu₂S): 2Cu₂S + 3O₂ xrightarrow{Δ} 2Cu₂O + 2SO₂; auto-reduction: 2Cu₂O + Cu₂S xrightarrow{Δ} 6Cu + SO₂.",
          "• **2. Medium Reactivity Metals (Zn, Fe, Pb)**: Ores are typically sulphides or carbonates. First converted to oxides because oxides are far easier to reduce.",
          "  - **Roasting**: Heating sulphide ore strongly in **excess air**: 2ZnS(s) [Zinc blende] + 3O₂ xrightarrow{Δ} 2ZnO(s) + 2SO₂(g)↑.",
          "  - **Calcination**: Heating carbonate ore strongly in **limited/absence of air**: ZnCO₃(s) [Calamine] xrightarrow{Δ} ZnO(s) + CO₂(g)↑.",
          "  - **Reduction with Carbon (Coke)**: ZnO + C → Zn + CO.",
          "  - **Thermite Process (Aluminothermic Reduction)**: Highly exothermic reduction of metal oxides using aluminium powder. The metal is produced in the molten liquid state. Used for welding broken railway tracks and cracked heavy machinery parts: Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Immense Heat.",
          "• **3. High Reactivity Metals (K, Na, Ca, Mg, Al)**: Oxides are too stable to be reduced by carbon (metals have higher affinity for oxygen than carbon). Extracted by **electrolytic reduction of their molten chlorides** (e.g., Down's cell for molten NaCl: Cathode (-): Na⁺ + e⁻ → Na; Anode (+): 2Cl⁻ → Cl₂ + 2e⁻).",
          "• **4. Refining of Impure Metals (Electrolytic Refining of Copper)**:",
          "  - **Anode**: Thick slab of impure copper.",
          "  - **Cathode**: Thin strip of pure copper.",
          "  - **Electrolyte**: Acidified aqueous copper sulphate (CuSO₄) solution.",
          "  - On passing current: Cu²⁺ ions from electrolyte deposit onto cathode as pure Cu; an equivalent amount of Cu dissolves from impure anode. Insoluble impurities settle below the anode as **anode mud** (contains precious metals like Ag, Au, Pt)."
        ]
      },
      {
        "title": "Alloying & Advanced Corrosion Prevention",
        "points": [
          "**Alloy**: A homogeneous mixture of two or more metals, or a metal and a non-metal, prepared by mixing the components in molten state in definite proportions.",
          "• **Alloying Alters Properties**: Pure iron is soft and stretches easily when hot. Adding ~0.05% carbon makes it hard and strong. Adding 18% Chromium and 8% Nickel produces **Stainless Steel**, which is hard and completely rust-free.",
          "• **Common Alloys Table**:",
          "  - **Brass**: Cu (70–80%) + Zn (20–30%) — decorative hardware, musical instruments.",
          "  - **Bronze**: Cu (90%) + Sn (10%) — statues, medals, coins (poor electrical conductor compared to pure Cu).",
          "  - **Solder**: Pb (50%) + Sn (50%) — has a very low melting point, used for joining electrical wires.",
          "  - **Amalgam**: Any alloy containing Mercury (Hg) as one constituent (e.g., sodium amalgam, dental amalgam).",
          "  - **Gold Purity**: Pure 24-carat gold is too soft for making jewellery. It is alloyed with 2 parts copper or silver to produce **22-carat gold** (22 parts pure gold + 2 parts Cu/Ag), imparting structural rigidity."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. An alloy which consists of lead and tin and has a notably low melting point used for fusing electrical circuit joints is: (A) Brass (B) Bronze (C) Solder (D) Stainless steel",
          "2. Which pair of metal oxides are amphoteric, reacting with both dilute hydrochloric acid and sodium hydroxide? (A) Na₂O and K₂O (B) CaO and MgO (C) Al₂O₃ and ZnO (D) Fe₂O₃ and CuO",
          "3. In the electrolytic refining of blister copper, the pure metal is deposited on: (A) The graphite anode (B) The thin pure copper cathode (C) In the anode mud residue (D) Directly in the electrolytic bath",
          "4. A non-metal that is liquid at room temperature and an element that conducts electricity despite being a non-metal are respectively: (A) Chlorine and Diamond (B) Bromine and Graphite (C) Mercury and Silicon (D) Iodine and Sulphur",
          "5. The thermite reaction used to weld cracked railway tracks involves the reduction of iron(III) oxide by: (A) Carbon monoxide (B) Hydrogen gas (C) Aluminium powder (D) Magnesium ribbon"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Malleability",
        "meaning": "Ability of a substance to be hammered or rolled into thin sheets without fracturing."
      },
      {
        "term": "Ductility",
        "meaning": "Capacity of a material to be drawn into slender, continuous wires."
      },
      {
        "term": "Amphoteric Oxide",
        "meaning": "A metal oxide displaying dual chemical behavior, reacting with both acids and bases to yield salts."
      },
      {
        "term": "Aqua Regia",
        "meaning": "A 3:1 volumetric mixture of concentrated HCl and HNO₃ capable of dissolving noble metals."
      },
      {
        "term": "Ionic Compound",
        "meaning": "A crystalline salt formed by electrovalent electron transfer between metallic cations and non-metallic anions."
      },
      {
        "term": "Roasting",
        "meaning": "Thermal oxidation of sulphide ores below melting point in excess air."
      },
      {
        "term": "Calcination",
        "meaning": "Thermal decomposition of carbonate or hydrated ores in limited/absent air."
      },
      {
        "term": "Thermite Reaction",
        "meaning": "Exothermic reduction of metal oxides using aluminium powder generating molten metal."
      },
      {
        "term": "Alloy",
        "meaning": "A homogeneous metallic blend of two or more metals or metal with non-metal."
      },
      {
        "term": "Anode Mud",
        "meaning": "Insoluble precious metal residue collecting beneath the anode during electrolytic refining."
      }
    ],
    "examTips": [
      "Remember the amphoteric oxides Al₂O₃ and ZnO; write both reactions with HCl and with NaOH (forming sodium aluminate and sodium zincate).",
      "In the thermite reaction, aluminium acts as the reducing agent reducing Fe₂O₃ to molten iron for welding railway tracks.",
      "Ionic compounds do not conduct electricity in solid state due to fixed ions, but conduct efficiently in molten or aqueous state."
    ]
  },
  {
    "id": "note10-4",
    "classLevel": 10,
    "chapterNo": 4,
    "title": "Carbon and its Compounds",
    "unit": "Unit 1 · Chemical Substances",
    "overview": "Carbon forms the chemical backbone of all terrestrial organic life and petrochemicals. This chapter explores covalent bonding, carbon's tetravalency and catenation, allotropes (diamond, graphite, fullerenes), nomenclature and isomerism of hydrocarbons, functional groups, chemical properties (combustion, oxidation, addition, substitution), ethanol, ethanoic acid, and the micellar cleaning mechanics of soaps and detergents.",
    "diagram": "carbon-bonds",
    "sections": [
      {
        "title": "Covalent Bonding & Carbon's Unique Versatility",
        "points": [
          "**Atomic Basis**: Carbon has atomic number $Z = 6$ with electronic configuration $(2, 4)$. To achieve a stable noble gas configuration (Neon: 2, 8 or Helium: 2), it requires 4 electrons.",
          "• **Why Carbon Does Not Form Ionic Bonds**:",
          "  - It cannot gain 4 electrons to form $C^{4-}$ anion because a nucleus with only 6 protons cannot stably hold 10 electrons ($6$ protons holding $10$ electrons causes immense electrostatic repulsion).",
          "  - It cannot lose 4 electrons to form $C^{4+}$ cation because an immense amount of energy would be required to remove 4 successive electrons from a tiny atom, leaving a bare nucleus with 6 protons holding just 2 electrons.",
          "• **Resolution: Covalent Bonding**: Carbon overcomes this by **sharing its valence electrons** with other carbon atoms or other non-metal atoms (H, O, N, S, halogens). A shared electron pair constitutes a single covalent bond.",
          "**Two Prime Factors Behind the Multitude of Carbon Compounds**:",
          "1. **Catenation**: The unique ability of carbon atoms to form stable covalent bonds with other carbon atoms, creating extensive open chains, branched chains, or closed rings. Carbon-carbon single bonds are exceptionally strong ($347\\text{ kJ/mol}$) and stable due to carbon's compact atomic radius.",
          "2. **Tetravalency**: With 4 valence electrons, carbon can form covalent bonds with four other monovalent atoms, or form double and triple bonds with polyvalent atoms (oxygen, nitrogen, sulphur)."
        ],
        "tip": "Silicon also exhibits catenation with hydrogen (silanes), but due to silicon's larger atomic size, the Si-Si bonds are weak, highly reactive, and unstable. Carbon compounds are exceptionally stable."
      },
      {
        "title": "Allotropes of Carbon: Diamond, Graphite, and Fullerenes",
        "points": [
          "**Allotropy**: The existence of an element in two or more distinct physical forms having identical chemical properties but profoundly different physical structures.",
          "• **1. Diamond**:",
          "  - Structure: Each carbon atom is covalently bonded to four other carbon atoms in a rigid, three-dimensional tetrahedral cage lattice ($sp^3$ hybridised).",
          "  - Properties: The hardest naturally occurring material known; exceptionally high refractive index (2.42) giving brilliant sparkle; extremely high melting point (~3820 K); complete electrical insulator because all 4 valence electrons are locked into localised covalent bonds.",
          "• **2. Graphite**:",
          "  - Structure: Each carbon atom is bonded to three other carbon atoms in the same plane, creating flat hexagonal arrays of rings ($sp^2$ hybridised). Layers are held together by weak van der Waals forces.",
          "  - Properties: Soft, slippery, and greasy to the touch; layers slide over one another easily, making graphite an excellent dry lubricant for high-temperature machinery. Excellent conductor of electricity because each carbon retains one free, mobile, delocalised valence electron.",
          "• **3. Fullerenes**:",
          "  - First identified: **Buckminsterfullerene (C₆₀)**, featuring 60 carbon atoms arranged in a spherical cage resembling a geodesic architectural dome designed by Buckminster Fuller.",
          "  - Structure: Consists of 20 six-membered hexagonal rings and 12 five-membered pentagonal rings fused into a hollow soccer-ball geometry."
        ]
      },
      {
        "title": "Hydrocarbons: Alkanes, Alkenes, Alkynes & Isomerism",
        "points": [
          "**Hydrocarbons**: Organic compounds composed exclusively of carbon and hydrogen.",
          "• **Saturated Hydrocarbons (Alkanes)**: Carbon atoms linked solely by single covalent bonds (C–C). General formula: $\\text{C}_n\\text{H}_{2n+2}$. They burn with a clean, non-sooty blue flame. Examples: Methane (CH₄), Ethane (C₂H₆), Propane (C₃H₈), Butane (C₄H₁₀).",
          "• **Unsaturated Hydrocarbons**: Contain at least one multiple carbon-carbon bond. Burn with a luminous yellow, sooty flame due to incomplete combustion of high carbon content.",
          "  - **Alkenes**: Contain at least one carbon-carbon double bond (C=C). General formula: $\\text{C}_n\\text{H}_{2n}$. Example: Ethene (C₂H₄), Propene (C₃H₆).",
          "  - **Alkynes**: Contain at least one carbon-carbon triple bond (C≡C). General formula: $\\text{C}_n\\text{H}_{2n-2}$. Example: Ethyne (Acetylene, C₂H₂), Propyne (C₃H₄).",
          "• **Structural Isomerism**: Compounds possessing the exact same molecular formula but different structural arrangements of atoms in space.",
          "  - Butane (C₄H₁₀) exhibits 2 structural isomers: n-butane (unbranched straight chain: $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$) and Isobutane / 2-Methylpropane (branched: $\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}_3$).",
          "• **Cyclic Hydrocarbons**: Saturated ring: Cyclohexane (C₆H₁₂); Unsaturated aromatic ring: Benzene (C₆H₆) with alternating single and double bonds."
        ],
        "formula": [
          "Alkane: C_n H_{2n+2}",
          "Alkene: C_n H_{2n}",
          "Alkyne: C_n H_{2n-2}"
        ]
      },
      {
        "title": "Functional Groups & The Homologous Series",
        "points": [
          "**Heteroatom & Functional Groups**: An atom or group of atoms (other than carbon and hydrogen) that replaces hydrogen in a hydrocarbon and confers specific characteristic chemical properties to the molecule:",
          "• **Haloalkanes**: $-\\text{Cl}$ (chloro), $-\\text{Br}$ (bromo).",
          "• **Alcohols**: $-\\text{OH}$ (suffix: -ol, e.g., Methanol $\\text{CH}_3\\text{OH}$, Ethanol $\\text{C}_2\\text{H}_5\\text{OH}$).",
          "• **Aldehydes**: $-\\text{CHO}$ (suffix: -al, e.g., Methanal $\\text{HCHO}$, Ethanal $\\text{CH}_3\\text{CHO}$).",
          "• **Ketones**: $>\text{C}=\text{O}$ attached to two carbon chains (suffix: -one, e.g., Propanone / Acetone $\\text{CH}_3\\text{COCH}_3$).",
          "• **Carboxylic Acids**: $-\\text{COOH}$ (suffix: -oic acid, e.g., Methanoic acid $\\text{HCOOH}$, Ethanoic acid $\\text{CH}_3\\text{COOH}$).",
          "**Homologous Series**: A family of organic compounds having the same functional group and similar chemical properties in which consecutive members differ by a $-\\text{CH}_2-$ methylene unit and $14\\text{ u}$ in molecular mass.",
          "• Gradation: As molecular mass increases along the series, melting points, boiling points, and densities increase systematically due to greater van der Waals attractions; chemical properties remain largely constant."
        ]
      },
      {
        "title": "Chemical Reactions of Carbon Compounds",
        "points": [
          "**1. Combustion**: Carbon and hydrocarbons burn in oxygen releasing carbon dioxide, water, heat, and light: $\\text{CH}_4 + 2\\text{O}_2 \\to \\text{CO}_2 + 2\\text{H}_2\\text{O} + \\text{Heat} + \\text{Light}$. Saturated hydrocarbons burn with clean blue flame; insufficient air leads to sooty flame.",
          "**2. Oxidation**: Alcohols are oxidised to carboxylic acids using powerful oxidising agents like alkaline potassium permanganate ($\\text{KMnO}_4 + \\Delta$) or acidified potassium dichromate ($\\text{K}_2\\text{Cr}_2\\text{O}_7 + \\Delta$):",
          "  $\\text{CH}_3\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Alkaline } \\text{KMnO}_4 + \\Delta} \\text{CH}_3\\text{COOH}$.",
          "**3. Addition Reaction**: Unsaturated hydrocarbons add hydrogen across their double or triple bonds in the presence of nickel (Ni) or palladium (Pd) catalyst at elevated temperature to yield saturated hydrocarbons:",
          "  $\\text{R}_2\\text{C}=\\text{CR}_2 + \\text{H}_2 \\xrightarrow{\\text{Ni catalyst}} \\text{R}_2\\text{CH}-\\text{CHR}_2$.",
          "  - **Industrial Application**: Hydrogenation of vegetable oils (liquid unsaturated fats) to form vanaspati ghee (solid saturated fat). Animal fats contain saturated fatty acids harmful to cardiovascular health; vegetable oils with unsaturated fatty acids are healthy.",
          "**4. Substitution Reaction**: Saturated alkanes are unreactive, but in the presence of sunlight (UV light), chlorine replaces hydrogen atoms one by one in rapid succession:",
          "  $\\text{CH}_4 + \\text{Cl}_2 \\xrightarrow{\\text{Sunlight}} \\text{CH}_3\\text{Cl} + \\text{HCl}$ (continues to form $\\text{CH}_2\\text{Cl}_2$, $\\text{CHCl}_3$, $\\text{CCl}_4$)."
        ]
      },
      {
        "title": "Ethanol, Ethanoic Acid, Soaps & Detergents",
        "points": [
          "**Ethanol (\\text{C}_2\\text{H}_5\\text{OH})**:",
          "• Liquid at room temp (BP 78°C), good solvent (tincture of iodine, cough syrups).",
          "• Reaction with Sodium: $2\\text{Na} + 2\\text{C}_2\\text{H}_5\\text{OH} \\to 2\\text{C}_2\\text{H}_5\\text{ONa}$ [Sodium ethoxide] $+ \\text{H}_2\\uparrow$.",
          "• Dehydration: Heating with concentrated $\\text{H}_2\\text{SO}_4$ at $443\\text{ K} (170^\\circ\\text{C})$ removes water, forming ethene: $\\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. } \\text{H}_2\\text{SO}_4, 443\\text{ K}} \\text{CH}_2=\\text{CH}_2 + \\text{H}_2\\text{O}$.",
          "**Ethanoic Acid (\\text{CH}_3\\text{COOH})**:",
          "• 5–8% solution in water is **vinegar**. Melting point is 290 K (17°C); freezes in cold climates, hence named **glacial acetic acid**.",
          "• **Esterification**: Reaction with an alcohol in the presence of concentrated $\\text{H}_2\\text{SO}_4$ generates sweet, fruity-smelling **esters**: $\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{Acid}} \\text{CH}_3\\text{COOC}_2\\text{H}_5$ [Ethyl ethanoate] $+ \\text{H}_2\\text{O}$. Used in perfumes and artificial flavouring agents.",
          "• **Saponification**: Alkaline hydrolysis of an ester with NaOH yields soap and alcohol: $\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{NaOH} \\to \\text{CH}_3\\text{COONa} + \\text{C}_2\\text{H}_5\\text{OH}$.",
          "**Soaps and Detergents (Mechanism of Cleansing)**:",
          "• **Soap**: Sodium or potassium salt of long-chain fatty acids (e.g., sodium stearate $\\text{C}_{17}\\text{H}_{35}\\text{COO}^-\\text{Na}^+$).",
          "• Dual Molecular Ends: (1) Long non-polar hydrocarbon tail — **Hydrophobic** (water-repelling, oil-soluble). (2) Ionic carboxylate head ($-\\text{COO}^-\\text{Na}^+$) — **Hydrophilic** (water-attracting).",
          "• **Micelle Formation**: In water, soap molecules cluster into spherical aggregates called **micelles**. Hydrophobic tails embed inward into the oily/greasy dirt droplet, while hydrophilic ionic heads face outward into water. The grease droplet is emulsified and lifted off the fabric into suspension.",
          "• **Hard Water Limitation**: Hard water contains dissolved $\\text{Ca}^{2+}$ and $\\text{Mg}^{2+}$ ions which react with soap to produce an insoluble curd-like precipitate called **scum**, wasting soap.",
          "• **Detergents**: Sodium salts of alkyl sulphonic acids or ammonium salts. They do not precipitate with $\\text{Ca}^{2+}$ and $\\text{Mg}^{2+}$, cleansing effectively in both soft and hard water."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. Structural isomerism in alkanes is possible only starting from which hydrocarbon? (A) Methane (B) Ethane (C) Propane (D) Butane",
          "2. When ethanol is heated with excess concentrated sulphuric acid at 443 K, the product formed along with water is: (A) Ethanoic acid (B) Ethene (C) Ethyne (D) Diethyl ether",
          "3. Which functional group is present in butanone (CH₃COCH₂CH₃)? (A) Aldehyde (B) Carboxylic acid (C) Alcohol (D) Ketone",
          "4. The cleansing action of soap is hindered in hard water due to the formation of an insoluble precipitate (scum) with: (A) Sodium and potassium ions (B) Calcium and magnesium ions (C) Iron and lead ions (D) Aluminium and zinc ions",
          "5. The conversion of vegetable oil into solid vegetable ghee involves which chemical process? (A) Oxidation using alkaline KMnO₄ (B) Esterification using concentrated H₂SO₄ (C) Addition reaction (hydrogenation) in presence of nickel catalyst (D) Substitution reaction using chlorine"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Catenation",
        "meaning": "Unique property of carbon atoms to form strong covalent bonds with one another into chains or rings."
      },
      {
        "term": "Tetravalency",
        "meaning": "Possessing four valence electrons, permitting four covalent bonding sites."
      },
      {
        "term": "Allotrope",
        "meaning": "Different structural forms of the same chemical element exhibiting divergent physical characteristics."
      },
      {
        "term": "Structural Isomer",
        "meaning": "Molecules sharing identical chemical formulas but exhibiting different spatial atomic connectivity."
      },
      {
        "term": "Homologous Series",
        "meaning": "A series of organic compounds with identical functional group differing by -CH₂- units."
      },
      {
        "term": "Esterification",
        "meaning": "Condensation reaction between a carboxylic acid and alcohol yielding a sweet-smelling ester."
      },
      {
        "term": "Saponification",
        "meaning": "Alkaline ester cleavage yielding sodium carboxylate soap and glycerol."
      },
      {
        "term": "Micelle",
        "meaning": "Radial colloidal cluster of soap molecules trapping oil at hydrophobic core with ionic heads outside."
      },
      {
        "term": "Scum",
        "meaning": "Insoluble curdy precipitate formed when soap reacts with calcium or magnesium ions in hard water."
      }
    ],
    "examTips": [
      "Carbon cannot form C⁴⁺ or C⁴⁻ ions due to severe nuclear electrostatic instability; it shares electrons forming strong covalent bonds.",
      "In esterification, concentrated H₂SO₄ acts as both an acid catalyst and a dehydrating agent to shift equilibrium towards ester formation.",
      "In soap micelles, hydrophobic hydrocarbon tails point inwards towards the oil droplet, while hydrophilic ionic heads face outward."
    ]
  },
  {
    "id": "note10-5",
    "classLevel": 10,
    "chapterNo": 5,
    "title": "Life Processes",
    "unit": "Unit 2 · World of Living",
    "overview": "Life processes are the essential physiological maintenance functions required to sustain an organism's life and avert molecular breakdown. This chapter provides exhaustive, rigorous coverage of autotrophic and heterotrophic nutrition, human digestive mechanics, aerobic and anaerobic respiration pathways, the human respiratory system, cardiovascular double circulation, plant vascular transport (xylem and phloem), and nephron ultrafiltration in the excretory system.",
    "diagram": "human-heart",
    "sections": [
      {
        "title": "Criteria of Living & Modes of Nutrition (Autotrophic & Heterotrophic)",
        "points": [
          "**Molecular Movements**: Invisible movements of molecules within cells and tissues are the defining criterion of being alive. Viruses lack molecular movements outside a host, showing no signs of life until they infect a living cell.",
          "**Autotrophic Nutrition**: Organisms synthesise organic nutrients from simple inorganic raw materials (CO₂ and H₂O) using sunlight trapped by chlorophyll.",
          "• **Master Photosynthesis Equation**: $6\\text{CO}_2 + 12\\text{H}_2\\text{O} \\xrightarrow{\\text{Chlorophyll, Sunlight}} \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ [Glucose]} + 6\\text{O}_2 + 6\\text{H}_2\\text{O}$. Excess carbohydrates are stored as **starch** in plants, and as **glycogen** in animals.",
          "• **Three Sequential Photosynthetic Events**:",
          "  1. Absorption of light energy by chlorophyll.",
          "  2. Conversion of light energy into chemical energy and photolytic splitting of water into hydrogen and oxygen ($2\\text{H}_2\\text{O} \\to 4\\text{H}^+ + 4e^- + \\text{O}_2$).",
          "  3. Reduction of carbon dioxide to carbohydrates by chemical assimilatory power.",
          "  *(Note: Desert plants take up CO₂ at night to prevent transpirational water loss and prepare an intermediate compound, which is acted upon by energy absorbed by chlorophyll during the day).*",
          "• **Stomata and Guard Cells**: Gas exchange occurs through microscopic stomatal pores on leaves. Each stoma is flanked by a pair of **kidney-shaped guard cells**. When water flows into guard cells, they swell, curve outwards, and open the pore; when they lose water, they shrink and become flaccid, closing the pore.",
          "**Heterotrophic Nutrition**:",
          "• **Holozoic**: Ingestion of complex food, internal digestion and absorption (e.g., *Amoeba* uses temporary finger-like extensions called **pseudopodia** to engulf food into a food vacuole; *Paramoecium* sweeps food to a specific spot using cilia; humans).",
          "• **Saprophytic**: Organisms break down food material outside the body and absorb the soluble nutrients (fungi, bread mould *Rhizopus*, yeast, mushrooms).",
          "• **Parasitic**: Derive nutrition from host organisms without killing them (e.g., *Cuscuta* / amarbel, ticks, lice, leeches, tapeworms)."
        ],
        "tip": "NCERT Iodine Starch Test: To test that sunlight and chlorophyll are necessary for photosynthesis, destarch a potted plant by keeping it in complete darkness for 3 days. Expose it to light, boil the leaf in alcohol over a water bath to decolourise chlorophyll, and add iodine solution. Only light-exposed green areas turn blue-black."
      },
      {
        "title": "Human Alimentary Canal & Digestive Biochemistry",
        "points": [
          "The human alimentary canal is a continuous muscular tube (~9 metres) executing coordinated peristaltic contractions:",
          "• **1. Mouth (Oral Cavity)**: Teeth mechanically masticate food; tongue mixes it with saliva secreted by salivary glands. Saliva contains the enzyme **salivary amylase (ptyalin)**, which hydrolyses complex starch into maltose sugar at pH ~6.8: $\\text{Starch} \\xrightarrow{\\text{Salivary Amylase}} \\text{Maltose}$.",
          "• **2. Oesophagus**: Rhythmic contraction and relaxation of muscular walls (**peristalsis**) pushes food (bolus) down to the stomach without any enzymatic digestion.",
          "• **3. Stomach**: Muscular walls churn food with acidic gastric juice containing:",
          "  - **Hydrochloric Acid (HCl)**: Creates an acidic medium (pH 1.5–2.5) essential for activating pepsinogen into active **pepsin**, and kills ingested pathogens.",
          "  - **Pepsin**: A proteolytic enzyme that digests proteins into peptones and proteoses.",
          "  - **Mucus**: Secreted by goblet cells; forms a protective barrier preventing HCl from corroding the stomach lining.",
          "  - Pyloric sphincter regulates exit of acidic food (chyme) into the small intestine in small quantities.",
          "• **4. Small Intestine (Site of Complete Digestion)**: Longest part (~6 m, coiled). Herbivores have a longer small intestine to allow complete digestion of tough cellulose; carnivores have a shorter intestine because meat is digested faster.",
          "  - **Bile from Liver**: Stored in gall bladder. Bile contains no enzymes, but performs two indispensable functions: (a) Neutralises acidic chyme to make it alkaline for pancreatic enzymes, and (b) **Emulsifies fats**: Breaks large fat globules into tiny droplets, increasing surface area for enzyme action.",
          "  - **Pancreatic Juice from Pancreas**: Contains **Pancreatic Amylase** (digests starch), **Trypsin** (digests proteins to peptides), and **Lipase** (breaks down emulsified fats).",
          "  - **Intestinal Juice (Succus Entericus)**: Contains enzymes that complete the final conversion: Proteins → Amino acids; Complex carbohydrates → Glucose; Fats → Fatty acids and Glycerol.",
          "• **Absorption through Villi**: Inner wall of ileum has millions of microscopic finger-like projections called **villi** and microvilli, which vastly amplify absorptive surface area. Villi are richly supplied with blood capillaries (absorb glucose and amino acids) and central **lacteals** (lymph vessels that absorb fatty acids and glycerol).",
          "• **5. Large Intestine & Egestion**: Unabsorbed waste enters the colon where water is reabsorbed. Solid faeces are stored in the rectum and expelled through the anus, regulated by the anal sphincter."
        ]
      },
      {
        "title": "Respiration: Glycolysis, Aerobic vs Anaerobic Pathways & Human Lungs",
        "points": [
          "**Respiration**: Biochemical oxidation of absorbed nutrients (glucose) inside cells to release energy stored in ATP molecules.",
          "• **Universal First Step (Glycolysis in Cytoplasm)**: One molecule of 6-carbon Glucose is cleaved into two molecules of 3-carbon **Pyruvate** with a net yield of 2 ATP. Occurs without oxygen in all living cells.",
          "• **Three Divergent Fates of Pyruvate**:",
          "  1. **Anaerobic (Yeast / Fermentation)**: In absence of oxygen, pyruvate is converted into **Ethanol + Carbon Dioxide + 2 ATP**: $\\text{Pyruvate} \\to \\text{C}_2\\text{H}_5\\text{OH} + \\text{CO}_2 + \\text{Energy}$.",
          "  2. **Anaerobic in Human Muscle Cells**: Under intense physical exertion where oxygen supply is deficient, pyruvate is converted into **Lactic Acid (3-carbon) + 2 ATP**. Accumulation of lactic acid in muscle fibres causes acute **muscle cramps**.",
          "  3. **Aerobic Respiration (Mitochondria)**: In the presence of oxygen, pyruvate enters mitochondria and is completely oxidised into **Carbon Dioxide + Water + 38 ATP**: $\\text{Pyruvate} + \\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 38\\text{ ATP}$. Aerobic respiration generates vastly more energy (~19 times) than anaerobic respiration.",
          "• **ATP (Adenosine Triphosphate)**: The universal energy currency of cellular processes. Hydrolysis of the terminal phosphate releases $30.5\\text{ kJ/mol}$ of free energy to drive endothermic reactions.",
          "**Human Respiratory Mechanics**:",
          "• Air pathway: External nostrils → Nasal cavity (lined with fine hairs and mucus that filter dust and warm the air) → Pharynx → Larynx (voice box) → Trachea (supported by **C-shaped cartilaginous rings** that prevent airway collapse during low pressure) → Bronchi → Bronchioles → **Alveoli**.",
          "• **Alveoli**: Balloon-like terminal sacs surrounded by extensive capillary networks. Provide ~80 m² surface area for gas exchange. Thin alveolar walls allow O₂ to diffuse into blood and CO₂ to diffuse out.",
          "• **Inhalation vs Exhalation**:",
          "  - Inhalation: Ribs lift up and outwards, diaphragm contracts and flattens down → Thoracic cavity expands → Pressure falls below atmospheric pressure → Air rushes in.",
          "  - Exhalation: Ribs move down, diaphragm relaxes into dome shape → Thoracic volume contracts → Pressure rises → Air expelled.",
          "• **Respiratory Pigment (Haemoglobin)**: In large multicellular animals, diffusion alone cannot transport oxygen (it would take 3 years for oxygen to diffuse from lungs to toes). Haemoglobin inside RBCs has an exceptionally high affinity for O₂, binding 4 O₂ molecules to form oxyhaemoglobin. CO₂ is more soluble in water and is transported largely in dissolved form in blood plasma."
        ]
      },
      {
        "title": "Circulation in Humans: Heart, Double Circulation & Blood Vessels",
        "points": [
          "**Human Heart**: A muscular organ the size of a clenched fist, divided into 4 chambers to completely separate oxygenated and deoxygenated blood, ensuring high energy efficiency for warm-blooded endothermy:",
          "• **Chambers**: Upper thin-walled atria (Left Atrium, Right Atrium) and lower thick-walled muscular ventricles (Left Ventricle, Right Ventricle). Left ventricle has the thickest muscular wall because it must pump blood under high pressure to all systemic organs.",
          "• **Double Circulation Cycle**:",
          "  1. **Pulmonary Circuit**: Deoxygenated blood from the body enters the **Right Atrium** via superior and inferior vena cava → passes through tricuspid valve into **Right Ventricle** → pumped via **Pulmonary Artery** to lungs for oxygenation → oxygenated blood returns via **Pulmonary Veins** to the **Left Atrium**.",
          "  2. **Systemic Circuit**: Oxygenated blood passes through bicuspid (mitral) valve from Left Atrium into **Left Ventricle** → pumped under high systolic pressure into the **Aorta** → distributed to tissues throughout the body → deoxygenated blood collected back by vena cava.",
          "• **Significance**: Blood travels through the heart **twice** during one complete cardiac cycle. Separating oxygenated and deoxygenated blood maintains high arterial pressure and rapid oxygen supply.",
          "• **Valves**: Atrioventricular and semilunar valves ensure blood flows strictly unidirectionally, preventing backflow.",
          "**Blood Vessels**:",
          "• **Arteries**: Thick, elastic, muscular walls; carry high-pressure blood away from the heart to tissues; no valves (except at heart exit).",
          "• **Veins**: Thin walls, large lumen; carry low-pressure blood towards the heart; contain internal pocket valves to prevent backward pooling.",
          "• **Capillaries**: Microscopic single-cell-thick endothelial walls allowing rapid diffusion of nutrients, gases, and wastes between blood and tissue fluid.",
          "• **Blood Pressure**: Measured using a **sphygmomanometer**. Normal resting values: Systolic pressure = $120\\text{ mm Hg}$; Diastolic pressure = $80\\text{ mm Hg}$. Persistent elevation above 140/90 is **hypertension**, which can cause internal haemorrhage or stroke.",
          "• **Lymph (Tissue Fluid)**: Intercellular fluid filtered out of capillaries into tissue spaces. Colourless, contains less protein than plasma, no RBCs. Carries digested fats absorbed by lacteals and drains excess fluid back into major veins."
        ]
      },
      {
        "title": "Vascular Transport in Plants: Xylem vs Phloem",
        "points": [
          "Plants lack active circulatory pumping organs and have lower energy requirements because a large proportion of plant tissues are dead supportive cells.",
          "• **Xylem (Transport of Water & Minerals)**:",
          "  - Composed of vessels, tracheids, xylem parenchyma, and xylem fibres. Vessels and tracheids form continuous conduits.",
          "  - **Root Pressure**: Active uptake of ions by root cells creates a hypertonic concentration gradient, drawing water into roots from soil by osmosis. Generates positive pressure, driving water upwards mainly during night.",
          "  - **Transpiration Pull (Cohesion-Tension Theory)**: During daylight, evaporation of water molecules through stomata (**transpiration**) creates suction pressure in xylem vessels. Coupled with water's cohesive forces, this tension pulls continuous water columns up trees reaching over 100 metres.",
          "• **Phloem (Translocation of Photosynthates)**:",
          "  - Transports soluble products of photosynthesis (sucrose, amino acids, phytohormones) from leaves (sources) to growing tissues and storage organs (sinks: roots, fruits, seeds).",
          "  - Composed of sieve tubes and companion cells.",
          "  - **Active Mechanism**: Translocation requires metabolic energy in the form of **ATP**. Sucrose is actively pumped into phloem sieve tubes, creating hypertonicity. Water enters by osmosis, generating high osmotic pressure that drives sap towards low-pressure regions (bidirectional transport)."
        ]
      },
      {
        "title": "Excretion in Humans (Nephron Architecture) & Plants",
        "points": [
          "**Excretion**: The biological process of eliminating toxic metabolic nitrogenous wastes (urea, uric acid) from the body.",
          "• **Human Excretory System**: Comprises a pair of kidneys, a pair of ureters, a urinary bladder, and a urethra.",
          "• **Nephron Structure & Urine Formation**: The nephron is the microscopic functional filtration unit of the kidney (~1 million nephrons per kidney):",
          "  1. **Glomerular Ultrafiltration**: Blood enters through wide afferent arteriole into the **glomerulus** (capillary tuft) enclosed by the cup-shaped **Bowman's capsule**. High hydrostatic pressure forces water, glucose, amino acids, mineral salts, and urea through the basement membrane into the capsule to form initial filtrate (~180 litres/day in adults).",
          "  2. **Selective Tubular Reabsorption**: As filtrate flows through the coiled renal tubule (proximal convoluted tubule, Loop of Henle, distal convoluted tubule), essential substances (100% of glucose, amino acids, essential ions, and ~99% of water) are actively and selectively reabsorbed back into peritubular capillaries. Final urine volume excreted is only ~1 to 1.5 litres per day.",
          "  3. **Tubular Secretion**: Extra waste ions (K⁺, H⁺, ammonia) are actively secreted into the tubule to regulate blood pH and electrolyte balance.",
          "• **Artificial Kidney (Haemodialysis)**: In cases of renal failure, a dialyser removes nitrogenous wastes from the patient's blood. Blood pumped through semi-permeable cellulose tubes bathed in dialysing solution containing identical osmotic pressure and electrolyte composition to plasma, but **devoid of nitrogenous wastes**. Urea diffuses out into dialysing fluid. *(Note: Dialysis does NOT involve tubular reabsorption)*.",
          "• **Excretion in Plants**: Produce oxygen as a photosynthetic byproduct; lose excess water via transpiration; store waste products in dead leaves that periodically fall off, cellular vacuoles, and resins/gums in old non-functional xylem."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. Which step of cellular respiration is common to both aerobic and anaerobic pathways, and where does it occur? (A) Krebs cycle in mitochondria (B) Electron transport chain in cristae (C) Glycolysis in the cytoplasm (D) Fermentation in yeast vacuoles",
          "2. What is the role of bile juice in human digestion? (A) Digestion of starch into maltose (B) Acidifying chyme and digesting proteins (C) Emulsification of fats and providing an alkaline medium for pancreatic enzymes (D) Absorption of amino acids into blood capillaries",
          "3. In human nephrons, the initial filtrate formed in Bowman's capsule is about 180 litres per day, but final urine excreted is only 1.5 litres. This dramatic reduction is due to: (A) Evaporation through sweat glands (B) Selective tubular reabsorption of water and solutes (C) Rapid destruction in the urinary bladder (D) Ultrafiltration in the collecting duct",
          "4. Deoxygenated blood from the systemic tissues enters which chamber of the human heart first? (A) Left atrium (B) Left ventricle (C) Right atrium (D) Right ventricle",
          "5. The opening and closing of stomatal pores is governed directly by: (A) Atmospheric temperature (B) Water turgidity changes inside guard cells (C) Carbon dioxide concentration in phloem (D) The rate of translocation in xylem"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Autotroph",
        "meaning": "Organism capable of synthesizing its own food from inorganic CO₂ and water via photosynthesis."
      },
      {
        "term": "Peristalsis",
        "meaning": "Rhythmic, wave-like muscular contractions of the digestive tract wall pushing food forward."
      },
      {
        "term": "Pepsin",
        "meaning": "Proteolytic gastric enzyme that digests proteins into peptones in an acidic environment."
      },
      {
        "term": "Emulsification",
        "meaning": "Breakdown of large dietary fat droplets into microscopic micelles by bile salts."
      },
      {
        "term": "Glycolysis",
        "meaning": "Enzymatic cleavage of 6-carbon glucose into 3-carbon pyruvate in the cytoplasm yielding 2 ATP."
      },
      {
        "term": "Double Circulation",
        "meaning": "Cardiovascular circuit where blood travels twice through the heart during each complete cycle."
      },
      {
        "term": "Translocation",
        "meaning": "Energy-dependent active transport of photosynthates (sucrose) through phloem sieve tubes."
      },
      {
        "term": "Nephron",
        "meaning": "The microscopic structural and functional filtration and reabsorption unit of the kidney."
      },
      {
        "term": "Ultrafiltration",
        "meaning": "High-pressure filtration of blood through glomerular capillaries into Bowman's capsule."
      },
      {
        "term": "Haemodialysis",
        "meaning": "Artificial clinical blood filtration removing accumulated urea and metabolic toxins."
      }
    ],
    "examTips": [
      "Aerobic respiration in mitochondria yields 38 ATP per glucose, while anaerobic respiration in cytoplasm yields only 2 ATP.",
      "Left ventricle has the thickest muscular wall in the heart because it pumps high-pressure blood to all systemic organs.",
      "In nephrons, the initial filtrate is 180 L/day, but 99% of water and all glucose/amino acids are reabsorbed, yielding only 1.5 L urine."
    ]
  },
  {
    "id": "note10-6",
    "classLevel": 10,
    "chapterNo": 6,
    "title": "Control and Coordination",
    "unit": "Unit 2 · World of Living",
    "overview": "Living organisms coordinate rapid responses to environmental stimuli through integrated neural and chemical endocrine mechanisms. This chapter covers the anatomy of a neuron and synaptic transmission, the rapid reflex arc, structural divisions of the human brain (forebrain, midbrain, hindbrain) and spinal cord protection, plant phytohormones (auxins, gibberellins, cytokinins, abscisic acid), plant tropisms, nastic movements, and endocrine glands with hormone feedback loops.",
    "diagram": "reflex-arc",
    "sections": [
      {
        "title": "Nervous System Architecture: Neurons, Impulse Conduction & Synapses",
        "points": [
          "**Need for Coordination**: Multicellular organisms must coordinate activities across organ systems to respond effectively to environmental stimuli.",
          "**Neuron (Nerve Cell)**: The structural and functional unit of the nervous system:",
          "• **Dendrites**: Branching cytoplasmic projections that perceive external environmental stimuli through specialized receptors (gustatory for taste, olfactory for smell, photoreceptors for light, phonoreceptors for sound, thigmoreceptors for touch).",
          "• **Cell Body (Cyton)**: Contains nucleus and cytoplasm; converts acquired chemical stimulus into an electrical impulse.",
          "• **Axon**: Long cylindrical nerve fibre transmitting the electrical impulse away from the cyton towards nerve endings. May be insulated by a myelin sheath.",
          "• **Synapse**: The microscopic gap between the terminal arborisation of one neuron and the dendrites of the adjacent neuron.",
          "• **Synaptic Chemical Transmission**: Electrical impulses cannot cross physical gaps. When the electrical signal reaches the axonal end, it triggers the release of neurotransmitter chemicals (e.g., acetylcholine) into the synapse. These chemical molecules diffuse across the synaptic cleft and bind to receptors on the dendrite of the next neuron, triggering a new electrical impulse. This ensures strictly unidirectional impulse transmission."
        ]
      },
      {
        "title": "Reflex Actions & The Reflex Arc",
        "points": [
          "**Reflex Action**: An extremely rapid, automatic, involuntary motor response to a dangerous or noxious environmental stimulus executed without conscious cerebral thought (e.g., withdrawing hand instantly upon touching a hot stove; blinking when an object approaches eye; knee-jerk reflex).",
          "**Reflex Arc**: The anatomical neural pathway followed by nerve impulses during a reflex action:",
          "• **Pathway Sequence**:",
          "  1. **Receptor**: Detects stimulus (heat receptors / thermoreceptors in skin).",
          "  2. **Sensory Neuron**: Conducts message from receptor to the spinal cord.",
          "  3. **Relay (Interneuron) in Spinal Cord**: Processes sensory input and initiates immediate motor signal.",
          "  4. **Motor Neuron**: Transmits command impulse from spinal cord to effector organ.",
          "  5. **Effector (Muscle / Gland)**: Responds (biceps muscle contracts to pull hand away).",
          "• **Evolutionary Value**: Reflex arcs evolved because the thinking process of the complex brain is too slow to avert tissue damage. The signal is processed instantly at the spinal cord level, while an informative signal is simultaneously forwarded to the cerebrum for conscious awareness."
        ]
      },
      {
        "title": "The Human Brain: Forebrain, Midbrain, Hindbrain & Protection",
        "points": [
          "The **Central Nervous System (CNS)** consists of the Brain and the Spinal Cord. The **Peripheral Nervous System (PNS)** consists of Cranial nerves (12 pairs arising from brain) and Spinal nerves (31 pairs arising from spinal cord).",
          "**Protective Anatomy**: The brain is encased in a bony skull (**cranium**), surrounded by three protective membranes (**meninges**), and cushioned by shock-absorbing **cerebrospinal fluid (CSF)**. The spinal cord is protected within the bony **vertebral column** (backbone).",
          "**Structural Divisions and Functions of the Brain**:",
          "• **1. Forebrain (Cerebrum)**: Largest and most prominent part; divided into two cerebral hemispheres.",
          "  - Functions: Seat of conscious intelligence, logical reasoning, memory, emotions, speech, and voluntary motor actions.",
          "  - Sensory reception: Separate localized sensory areas for vision, hearing, smell, taste, and somatic touch.",
          "  - Contains the dedicated **hunger centre** that detects blood glucose levels and fullness of the stomach.",
          "• **2. Midbrain**: Connects forebrain to hindbrain. Controls involuntary visual, auditory, and pupillary reflexes (pupil dilation and constriction).",
          "• **3. Hindbrain**:",
          "  - **Cerebellum**: Coordinates precision of voluntary muscular movements, maintaining balance, posture, and equilibrium (e.g., walking in a straight line, riding a bicycle, picking up a pen).",
          "  - **Pons**: Bridges cerebellum and cerebrum; regulates respiratory rhythm.",
          "  - **Medulla Oblongata**: Brainstem base controlling vital involuntary autonomic functions: heartbeat, blood pressure, peristalsis, and reflex centres for swallowing, coughing, sneezing, and vomiting."
        ]
      },
      {
        "title": "Plant Hormones (Phytohormones) & Chemical Communication",
        "points": [
          "Plants lack a nervous system and specialized muscle cells. They coordinate growth and movement using chemical messengers called **phytohormones**:",
          "• **Auxin**: Synthesised at growing shoot and root tips. Promotes cellular elongation and apical dominance.",
          "  - **Mechanism of Phototropism**: When unilateral light shines on a shoot, auxin diffuses to the **shaded side** of the shoot. Higher auxin concentration on the shaded side stimulates cells there to elongate faster than cells on the illuminated side, causing the shoot tip to bend toward light.",
          "• **Gibberellins**: Synthesised in seeds and young leaves; promote stem elongation, leaf expansion, and breaking seed dormancy.",
          "• **Cytokinins**: Promote active cell division. Present in high concentrations in regions of rapid cell division (fruits, seeds, developing buds); delay leaf senescence.",
          "• **Abscisic Acid (ABA)**: General plant **growth inhibitor**. Inhibits growth, promotes leaf wilting and abscission (falling of leaves), and triggers stomatal closure during water stress."
        ]
      },
      {
        "title": "Plant Movements: Tropic (Directional) vs Nastic (Non-directional)",
        "points": [
          "**1. Tropic Movements (Tropisms)**: Directional growth movements where the direction of response is determined by the direction of the stimulus. Slow growth-dependent movements:",
          "• **Phototropism**: Growth response to light (Shoots show positive phototropism; Roots show negative phototropism).",
          "• **Geotropism**: Growth response to Earth's gravity (Roots show positive geotropism; Shoots show negative geotropism).",
          "• **Hydrotropism**: Growth response to moisture (Roots grow toward water sources).",
          "• **Chemotropism**: Growth response to chemical stimuli (e.g., growth of pollen tube down through style toward ovule driven by sugary chemicals secreted by the female gametophyte).",
          "• **Thigmotropism**: Growth response to touch (Tendrils of pea and passionflower coil around physical supports due to slower growth at the contact point and faster growth on the outer side).",
          "**2. Nastic Movements**: Non-directional movements independent of the direction of the stimulus. Rapid, growth-independent, reversible:",
          "• **Seismonastic / Thigmonastic Movement**: Folding and drooping of leaves in *Mimosa pudica* ('touch-me-not' / chhui-mui) upon physical contact.",
          "• **Mechanism**: Cells at the swollen leaf base (**pulvinus**) undergo sudden loss of turgor pressure. Electrical-chemical signals cause cells in the lower half of the pulvinus to lose water to intercellular spaces, collapsing the leaf immediately."
        ]
      },
      {
        "title": "Animal Hormones & Endocrine Feedback Loops",
        "points": [
          "**Endocrine Glands**: Ductless glands that secrete chemical hormones directly into the bloodstream for targeted delivery to distant effector organs.",
          "• **Major Endocrine Glands and Hormones**:",
          "  - **Pituitary Gland ('Master Gland')**: Located at brain base; secretes **Growth Hormone (GH)**. Hyposecretion in childhood results in **dwarfism**; hypersecretion results in **gigantism**.",
          "  - **Thyroid Gland**: Secretes **Thyroxin**. Regulates carbohydrate, protein, and fat metabolism for optimal development. Synthesis requires dietary **iodine**. Iodine deficiency leads to simple **goitre** (swelling of thyroid gland in neck). Salt is iodised with potassium iodate to prevent this.",
          "  - **Pancreas**: Secretes **Insulin** (from beta cells of Islets of Langerhans) and Glucagon. Insulin lowers blood glucose levels by promoting cellular glucose uptake and glycogen storage. Hyposecretion causes **Diabetes Mellitus**, treated with dietary regulation and insulin injections.",
          "  - **Adrenal Glands**: Located atop kidneys; secrete **Adrenaline** (the emergency 'fight-or-flight' hormone). Increases heart rate to pump more oxygen to muscles; dilates pupils and bronchioles; diverts blood from skin and digestive organs to skeletal muscles.",
          "  - **Testes (in Males)**: Secrete **Testosterone**. Controls sperm maturation and secondary sexual characteristics at puberty (facial hair, voice deepening).",
          "  - **Ovaries (in Females)**: Secrete **Oestrogen** (controls ovum maturation and female secondary sexual traits) and **Progesterone** (maintains uterine endometrium for pregnancy).",
          "• **Hormonal Feedback Regulation**: Hormones must be released in precise amounts at specific times. Example: When blood glucose levels rise, pancreatic beta-cells detect it and secrete insulin, promoting glucose clearance. As blood sugar drops back to normal, insulin secretion is switched off (negative feedback)."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. The chemical substance that diffuses across the synaptic gap to transmit a nerve impulse to the next neuron is a: (A) Hormone (B) Neurotransmitter (C) Lymphocyte (D) Turgor solute",
          "2. Which part of the human brain is primarily responsible for maintaining posture, balance, and precision of voluntary motor movements? (A) Cerebrum (B) Medulla oblongata (C) Cerebellum (D) Hypothalamus",
          "3. Phototropism in plant shoots is caused by the asymmetric accumulation of which hormone on the shaded side of the stem? (A) Gibberellin (B) Abscisic acid (C) Cytokinin (D) Auxin",
          "4. A person showing symptoms of swollen neck due to goitre is suffering from the deficiency of which element required for thyroxin synthesis? (A) Iron (B) Calcium (C) Iodine (D) Phosphorus",
          "5. The rapid drooping and folding of leaves in the touch-me-not plant (Mimosa pudica) is caused by: (A) Directional cell growth (B) Rapid change in turgor pressure at the pulvinus base (C) Cell division stimulated by auxin (D) Breakdown of chlorophyll"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Neuron",
        "meaning": "Structural and functional cellular unit of the nervous system conducting electrical impulses."
      },
      {
        "term": "Synapse",
        "meaning": "Microscopic gap between adjacent neurons across which neurotransmitters diffuse."
      },
      {
        "term": "Reflex Arc",
        "meaning": "Neural circuit governing a rapid involuntary motor response directly via the spinal cord."
      },
      {
        "term": "Cerebellum",
        "meaning": "Hindbrain structure coordinating muscular equilibrium, balance, and motor precision."
      },
      {
        "term": "Medulla Oblongata",
        "meaning": "Brainstem base controlling autonomic vital involuntary processes like heart rate and vomiting."
      },
      {
        "term": "Phototropism",
        "meaning": "Directional growth movement of plant shoots towards light mediated by auxin diffusion."
      },
      {
        "term": "Thigmonasty",
        "meaning": "Rapid non-directional turgor-driven movement in response to mechanical touch."
      },
      {
        "term": "Thyroxin",
        "meaning": "Iodine-dependent thyroid hormone regulating baseline metabolic rate."
      },
      {
        "term": "Insulin",
        "meaning": "Pancreatic endocrine hormone regulating glucose absorption from the bloodstream."
      }
    ],
    "examTips": [
      "The reflex arc pathway is: Receptor → Sensory neuron → Spinal cord (relay neuron) → Motor neuron → Effector muscle.",
      "Auxin stimulates cell elongation on the shaded side of plant shoots, causing positive phototropic bending towards light.",
      "The cerebellum controls posture, equilibrium, and precision of voluntary movements; medulla oblongata controls involuntary vitals."
    ]
  },
  {
    "id": "note10-7",
    "classLevel": 10,
    "chapterNo": 7,
    "title": "How do Organisms Reproduce?",
    "unit": "Unit 2 · World of Living",
    "overview": "Reproduction ensures the continuity of species and the introduction of genetic variation essential for evolutionary adaptability. This chapter covers DNA replication accuracy, asexual reproduction modes (fission, fragmentation, regeneration, budding, vegetative propagation, spore formation), sexual reproduction in angiosperms (flower morphology, pollination, double fertilisation, seed development), human reproductive anatomy, gametogenesis, menstrual cycle, embryonic placenta, and contraceptive methods.",
    "diagram": "flower-parts",
    "sections": [
      {
        "title": "DNA Replication, Genetic Variation & Importance of Reproduction",
        "points": [
          "**Reproduction**: Biological process through which an organism produces offspring genetically similar to itself.",
          "• **DNA Copying Mechanism**: The core event in reproduction is the replication of deoxyribonucleic acid (DNA) inside the cell nucleus. Each dividing cell synthesises an identical duplicate DNA copy and creates a secondary cellular apparatus before cell cleavage.",
          "• **Origin of Variations**: Biochemical DNA replication mechanisms are highly accurate but not completely error-free. Subtle replication discrepancies produce minor DNA sequence variations in daughter cells. These variations accumulate across generations.",
          "• **Significance of Variation in Evolution**: In an ecological niche, sudden environmental shifts (global temperature rise, water shortage, meteorite strike) could eliminate a uniform population. Individuals carrying slight genetic variations may survive the altered environment, preserving the species and driving natural selection."
        ]
      },
      {
        "title": "Asexual Reproduction: Fission, Budding, Spores & Vegetative Propagation",
        "points": [
          "Asexual reproduction involves a single parent producing genetically identical offspring (clones) without gamete fusion:",
          "• **1. Binary Fission**: Parent cell divides into two equal daughter cells.",
          "  - *Amoeba*: Can divide in any plane during mitosis.",
          "  - *Leishmania* (causes Kala-azar): Has a whip-like flagellum at one end; divides along a specific longitudinal orientation.",
          "• **2. Multiple Fission**: Parent divides into numerous daughter cells simultaneously (e.g., *Plasmodium*, the malarial parasite, divides within a protective cyst under unfavourable conditions).",
          "• **3. Fragmentation**: Simple multicellular organisms with unspecialised cell structures break into fragments upon maturation; each fragment regenerates into a new individual (e.g., filamentous green alga *Spirogyra*).",
          "• **4. Regeneration**: Ability of an organism to regrow into a complete individual from cut body fragments using specialised regenerative cells (e.g., *Planaria*, *Hydra*). Regeneration is not considered standard reproduction because fragmentation occurs through accidental injury.",
          "• **5. Budding**: Repeated cell division at one specific site produces an outgrowth (bud). The bud develops into a miniature individual and detaches upon maturation (e.g., *Hydra*, *Yeast*).",
          "• **6. Spore Formation**: In bread mould (*Rhizopus*), non-reproductive thread-like structures called **hyphae** develop bulbous knobs called **sporangia**. Inside sporangia, thick-walled spores develop that withstand extreme conditions until landing on a moist, nutritious surface.",
          "• **7. Vegetative Propagation**: New plants develop from vegetative parts (roots, stems, leaves) without seeds:",
          "  - Natural: Roots (Sweet potato), Stems (Potato eyes, Ginger rhizome, Onion bulb), Leaves (*Bryophyllum* develops adventitious buds in marginal leaf notches that root when touching soil).",
          "  - Artificial: Cutting (Rose), Layering (Jasmine), Grafting (Mango, Apple).",
          "  - Advantages: Propagates seedless varieties (Banana, Orange, Rose, Jasmine); preserves desired parental traits; faster than seed germination.",
          "• **8. Tissue Culture (Micropropagation)**: Isolated plant cells/tissue grown in sterile nutrient medium with hormones to form an undifferentiated mass (**callus**), which differentiates into plantlets. Used for disease-free propagation and endangered ornamental species."
        ]
      },
      {
        "title": "Sexual Reproduction in Flowering Plants (Angiosperms)",
        "points": [
          "Flowers are the reproductive structures of angiosperms:",
          "• **Whorls of a Flower**:",
          "  1. **Calyx (Sepals)**: Outermost green leaves; protect the flower bud.",
          "  2. **Corolla (Petals)**: Brightly coloured, fragrant leaves; attract insect pollinators.",
          "  3. **Androecium (Stamens)**: Male reproductive organ. Each stamen consists of a filament and an **anther** containing pollen sacs that produce yellow pollen grains (microspores containing male gametes).",
          "  4. **Gynoecium / Pistil (Carpel)**: Female reproductive organ located in the centre. Comprises a sticky **stigma** (receptive landing surface for pollen), a slender neck **style**, and a swollen basal **ovary** containing one or more **ovules** (each housing an embryo sac with a female egg cell).",
          "• **Pollination**: Transfer of pollen grains from anther to stigma.",
          "  - **Self-pollination**: Pollen transferred to stigma of same flower or another flower on same plant (e.g., pea).",
          "  - **Cross-pollination**: Pollen transferred to stigma of a different flower of the same species by external agents (wind, water, insects, birds).",
          "• **Fertilisation Process**:",
          "  - Pollen lands on stigma, absorbs sugary secretion, and germinates into a **pollen tube**.",
          "  - Pollen tube grows down the style into the ovary, entering the ovule through the micropyle.",
          "  - Releases two male gamete nuclei into the embryo sac.",
          "• **Double Fertilisation (Unique to Angiosperms)**:",
          "  1. **Syngamy**: One male gamete fuses with the female egg cell to form a diploid (2n) **zygote**.",
          "  2. **Triple Fusion**: Second male gamete fuses with two polar nuclei to form a triploid (3n) **primary endosperm nucleus (PEN)**, which develops into nutritive endosperm.",
          "• **Post-Fertilisation Changes**:",
          "  - Zygote divides mitotically to form an **embryo** inside the ovule.",
          "  - Ovule develops a tough protective coat to become the **Seed** (containing embryo with future shoot plumule, future root radicle, and food-storing cotyledons).",
          "  - Ovary enlarges and ripens into the **Fruit**.",
          "  - Petals, sepals, stamens, style, and stigma wither and fall off."
        ]
      },
      {
        "title": "Human Reproductive Systems (Male & Female)",
        "points": [
          "**Puberty**: The developmental phase during adolescence when reproductive organs mature under hormonal surges (testosterone in males, oestrogen/progesterone in females).",
          "**Male Reproductive System**:",
          "• **Testes**: Paired organs located outside the abdominal cavity in a pouch of skin called the **scrotum**. The scrotum maintains a temperature $2-2.5^\\circ\\text{C}$ lower than core body temperature, required for viable **spermatogenesis**.",
          "• **Vas Deferens**: Conveys mature sperms from the epididymis towards the urethra.",
          "• **Accessory Glands**:",
          "  - **Prostate Gland & Seminal Vesicles**: Secrete alkaline seminal fluid containing fructose, calcium, and enzymes that nourish sperms, facilitate motility, and neutralise acidic vaginal secretions.",
          "• **Urethra & Penis**: Urethra serves as a common conduit for both urine and semen, terminating through the erectile penis.",
          "**Female Reproductive System**:",
          "• **Ovaries**: Paired organs in the lower abdominal cavity producing one mature ovum alternate months and secreting oestrogen and progesterone.",
          "• **Fallopian Tubes (Oviducts)**: Ciliated funnel collects released ovum. **Fertilisation occurs in the ampullary region of the fallopian tube**.",
          "• **Uterus (Womb)**: Muscular, inverted pear-shaped organ where the fertilized zygote implants and develops into a foetus.",
          "• **Cervix & Vagina**: Cervix connects uterus to the vagina (the muscular birth canal that receives the penis during copulation)."
        ]
      },
      {
        "title": "Fertilisation, Placenta, Menstrual Cycle & Contraception",
        "points": [
          "**Fertilisation and Implantation**: Millions of sperms enter the vagina; one penetrates the ovum in the fallopian tube, forming a diploid zygote. Zygote undergoes cleavage into a blastocyst, which embeds (**implants**) into the vascular uterine wall (**endometrium**).",
          "• **Placenta**: A specialized disc-shaped vascular organ embedded in the uterine wall connecting foetus and mother:",
          "  - Structure: Features microscopic villi on the embryo's side surrounded by blood spaces on the mother's side, providing an immense surface area.",
          "  - Functions: Facilitates transfer of glucose, amino acids, and oxygen from maternal blood to the embryo, and transfers metabolic wastes (urea, CO₂) from embryonic blood to maternal circulation. Gestation period in humans is ~9 months (~280 days).",
          "• **Menstrual Cycle (When Fertilisation Does Not Occur)**:",
          "  - Each month, the uterine endometrium thickens and develops dense blood capillaries to receive a potential fertilized embryo.",
          "  - If the ovum is not fertilized, the corpus luteum degenerates, progesterone levels plunge, and the spongy uterine lining sloughs off.",
          "  - Expelled through the vagina as blood and mucus over 3 to 5 days (**menstruation**). Cycle repeats every ~28 days.",
          "• **Contraceptive Methods & Reproductive Health**:",
          "  - **Barrier Methods**: Condoms, diaphragms, cervical caps. Block sperm entry into the female tract and protect against sexually transmitted infections (STIs: gonorrhoea, syphilis, HIV-AIDS).",
          "  - **Chemical / Hormonal Methods**: Oral contraceptive pills alter hormonal balance to inhibit ovulation (may carry metabolic side effects).",
          "  - **Intrauterine Devices (IUCDs)**: Copper-T or hormone-releasing coils placed inside the uterus by a doctor to prevent implantation.",
          "  - **Surgical Methods (Sterilisation)**: Permanent contraception.",
          "    * **Vasectomy**: Small portion of vas deferens in males cut and tied; blocks sperm passage.",
          "    * **Tubectomy**: Small portion of fallopian tubes in females cut and tied; blocks egg transit."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. The site of normal fertilisation between a human sperm and an ovum is the: (A) Uterus (B) Ovary (C) Fallopian tube (oviduct) (D) Vagina",
          "2. Double fertilisation in flowering plants involves: (A) Fusion of two male gametes with one egg (B) Syngamy forming a diploid zygote and triple fusion forming a triploid endosperm (C) Two sperms fertilising two different ovules simultaneously (D) Pollination followed immediately by fruit formation",
          "3. In human males, testes are situated outside the abdominal cavity in the scrotum because: (A) They require higher temperature for hormone secretion (B) Sperm formation requires a temperature 2 to 2.5°C lower than internal body temperature (C) It provides direct connection to urinary bladder (D) To protect from abdominal enzymes",
          "4. Which of the following contraceptive methods prevents sperm entry and also protects against Sexually Transmitted Infections (STIs)? (A) Oral contraceptive pills (B) Copper-T intrauterine device (C) Condom (barrier method) (D) Tubectomy",
          "5. Vegetative propagation through adventitious buds developed in the notches of leaf margins occurs naturally in: (A) Potato (B) Bryophyllum (C) Ginger (D) Rose"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Binary Fission",
        "meaning": "Asexual division of a single-celled organism into two equal daughter cells."
      },
      {
        "term": "Spore",
        "meaning": "Microscopic reproductive body protected by a thick wall to survive adverse environments."
      },
      {
        "term": "Double Fertilisation",
        "meaning": "Characteristic angiosperm process involving syngamy and triple fusion."
      },
      {
        "term": "Placenta",
        "meaning": "Vascular organ connecting developing foetus to uterine wall for nutrient and gas exchange."
      },
      {
        "term": "Spermatogenesis",
        "meaning": "Production of mature spermatozoa in the seminiferous tubules of the testes."
      },
      {
        "term": "Vasectomy",
        "meaning": "Surgical excision and ligation of a portion of the male vas deferens."
      },
      {
        "term": "Menstruation",
        "meaning": "Periodic cyclical shedding of the vascular uterine endometrium when fertilization fails."
      },
      {
        "term": "Bryophyllum",
        "meaning": "Plant reproducing vegetatively via foliar adventitious buds along leaf margins."
      }
    ],
    "examTips": [
      "Angiosperms undergo double fertilisation: syngamy (egg + sperm → 2n zygote) and triple fusion (2 polar nuclei + sperm → 3n endosperm).",
      "Human testes lie in the scrotum outside the abdomen because spermatogenesis requires a temperature 2–2.5°C below core body temperature.",
      "Placenta villi provide a vast surface area for maternal-foetal exchange of glucose, O₂, and nitrogenous waste excretion."
    ]
  },
  {
    "id": "note10-8",
    "classLevel": 10,
    "chapterNo": 8,
    "title": "Heredity",
    "unit": "Unit 2 · World of Living",
    "overview": "Heredity is the biological transmission of physical and physiological traits from parents to offspring. This chapter explores Gregor Mendel's seminal experiments with the garden pea, dominant vs recessive alleles, monohybrid and dihybrid genetic crosses, phenotypic and genotypic segregation ratios, the molecular mechanism of gene expression, and human chromosomal sex determination.",
    "diagram": "monohybrid-cross",
    "sections": [
      {
        "title": "Heredity, Inherited Traits & Gregor Mendel's Experiments",
        "points": [
          "**Heredity**: Transmission of genetically determined characters and traits from parents to their progeny across generations.",
          "**Inherited vs Acquired Traits**:",
          "• **Inherited Traits**: Features determined by genetic alterations in reproductive germ cells (DNA); passed on to subsequent generations (e.g., eye colour, blood group, earlobe attachment).",
          "• **Acquired Traits**: Characteristics acquired during an individual's lifetime due to environmental influences or physical use/disuse (e.g., muscular physique, scar tissue, learning a language). These involve changes in somatic cells, do not alter germ-cell DNA, and **cannot be inherited**.",
          "**Gregor Johann Mendel (Father of Genetics)**:",
          "• Conducted breeding experiments from 1856 to 1863 using the **Garden Pea (*Pisum sativum*)**.",
          "• **Reasons for Choosing Garden Pea**:",
          "  1. Clear, easily distinguishable contrasting traits.",
          "  2. Short life cycle yielding rapid results across generations.",
          "  3. Bisexual flowers naturally undergoing self-pollination, but easily cross-pollinated manually.",
          "  4. Produces abundant fertile offspring in each generation.",
          "• Mendel investigated 7 pairs of contrasting traits: Seed shape (Round/Wrinkled), Seed colour (Yellow/Green), Flower colour (Violet/White), Pod shape (Inflated/Constricted), Pod colour (Green/Yellow), Flower position (Axial/Terminal), Stem height (Tall/Dwarf)."
        ]
      },
      {
        "title": "Monohybrid Cross: Segregation, Dominance & Ratios",
        "points": [
          "**Monohybrid Cross**: A genetic cross between two parent plants differing in a single pair of contrasting characteristics (e.g., Plant Height: Tall vs Dwarf).",
          "• **Parental Generation (P)**: Pure-breeding Tall ($TT$) $\\times$ Pure-breeding Dwarf ($tt$).",
          "• **First Filial Generation ($F_1$)**: All progeny are Tall ($Tt$).",
          "  - Conclusion: The trait for dwarfness did not disappear; it was masked. The trait expressed in $F_1$ is **Dominant** ($T$), while the trait suppressed is **Recessive** ($t$).",
          "• **Second Filial Generation ($F_2$)**: Self-pollination of $F_1$ plants ($Tt \\times Tt$):",
          "  - Gametes produced: $50\\%\\ T$ and $50\\%\\ t$.",
          "  - Punnett Square combinations: $1\\ TT$, $2\\ Tt$, $1\\ tt$.",
          "• **Mendelian Ratios in $F_2$**:",
          "  - **Phenotypic Ratio**: $3\\text{ Tall} : 1\\text{ Dwarf}$ ($75\\% : 25\\%$).",
          "  - **Genotypic Ratio**: $1\\ TT : 2\\ Tt : 1\\ tt$ ($1:2:1$).",
          "• **Mendel's Laws Deduced**:",
          "  1. **Law of Dominance**: In a heterozygous individual, only the dominant allele expresses its phenotype; the recessive allele remains masked.",
          "  2. **Law of Segregation (Purity of Gametes)**: Alleles of a gene pair separate during gametogenesis such that each gamete receives only one allele."
        ],
        "table": {
          "head": [
            "Generation",
            "Genotypes Present",
            "Phenotypes",
            "Ratio"
          ],
          "rows": [
            [
              "Parental (P)",
              "TT × tt",
              "Pure Tall × Pure Dwarf",
              "Homogeneous"
            ],
            [
              "F₁ Progeny",
              "Tt (All heterozygous)",
              "100% Tall",
              "Uniform"
            ],
            [
              "F₂ Phenotypic",
              "TT, Tt, tt",
              "3 Tall : 1 Dwarf",
              "3 : 1"
            ],
            [
              "F₂ Genotypic",
              "1 TT : 2 Tt : 1 tt",
              "Homozygous Tall : Heterozygous Tall : Dwarf",
              "1 : 2 : 1"
            ]
          ]
        }
      },
      {
        "title": "Dihybrid Cross & Law of Independent Assortment",
        "points": [
          "**Dihybrid Cross**: A cross involving parent plants differing simultaneously in two pairs of contrasting characteristics (e.g., Seed Shape and Seed Colour).",
          "• **Parental Cross (P)**: Pure Round Yellow seeds ($RRYY$) $\\times$ Pure Wrinkled Green seeds ($rryy$).",
          "• **F₁ Generation**: All progeny produce Round Yellow seeds ($RrYy$).",
          "• **F₂ Generation (Selfing $RrYy \\times RrYy$)**:",
          "  - Each parent produces 4 types of gametes in equal proportions ($25\\%$ each): $RY$, $Ry$, $rY$, $ry$.",
          "  - A $4 \\times 4$ Punnett square yields 16 combinations.",
          "• **F₂ Phenotypic Ratio**: **9 : 3 : 3 : 1**:",
          "  - 9 Round Yellow (Parental phenotype)",
          "  - 3 Round Green (New recombinant phenotype)",
          "  - 3 Wrinkled Yellow (New recombinant phenotype)",
          "  - 1 Wrinkled Green (Parental phenotype)",
          "• **Law of Independent Assortment**: When two pairs of traits are combined in a hybrid, segregation of one pair of alleles is completely independent of the segregation of the other pair during gamete formation."
        ],
        "formula": [
          "Dihybrid F_2 Phenotypic Ratio: 9 : 3 : 3 : 1",
          "Number of Genotypic Combinations = 16"
        ]
      },
      {
        "title": "Molecular Mechanism of Gene Expression",
        "points": [
          "**How Do Genes Control Physical Traits?**",
          "• Cellular DNA contains the instructional master code for synthesising proteins.",
          "• A specific segment of DNA that codes for a functional protein or polypeptide is called a **Gene**.",
          "• **Pathway from Gene to Trait**:",
          "  1. A gene carries the genetic instructions for a specific **enzyme**.",
          "  2. If the gene allele is functioning efficiently (dominant allele $T$), it synthesises normal amounts of active enzyme.",
          "  3. The active enzyme catalyses the biochemical synthesis of abundant plant growth hormone (e.g., gibberellin).",
          "  4. Ample growth hormone stimulates vigorous stem elongation, resulting in a **Tall plant**.",
          "  5. If the gene carries a mutation (recessive allele $t$), it produces an inefficient or non-functional enzyme → Less growth hormone is made → Stem does not elongate, resulting in a **Dwarf plant**.",
          "• Therefore, genes control phenotypic traits by regulating enzyme efficiency and biochemical syntheses."
        ]
      },
      {
        "title": "Sex Determination in Humans (Chromosomal Basis)",
        "points": [
          "**Chromosomal Composition in Humans**: Human somatic cells contain **46 chromosomes** arranged in **23 pairs**:",
          "• **22 Pairs of Autosomes**: Identical in both biological males and females; govern general somatic traits.",
          "• **1 Pair of Sex Chromosomes (Allosomes)**: Direct the development of biological sex.",
          "  - Human females have a perfect homologous pair of sex chromosomes: **XX**.",
          "  - Human males have a mismatched heterologous pair: one normal-sized **X** chromosome and one distinctly smaller **Y** chromosome: **XY**.",
          "• **Mechanism of Sex Determination**:",
          "  - All female gametes (ova) carry a single X chromosome: ($22 + X$).",
          "  - Male gametes (sperms) are of two distinct types produced in equal ($50:50$) proportions:",
          "    1. $50\\%$ of sperms carry an X chromosome: ($22 + X$).",
          "    2. $50\\%$ of sperms carry a Y chromosome: ($22 + Y$).",
          "  - **Fertilisation Outcomes**:",
          "    * If an X-bearing sperm fertilises an ovum: $(22+X) + (22+X) = 44 + XX \\implies$ **Female Child**.",
          "    * If a Y-bearing sperm fertilises an ovum: $(22+Y) + (22+X) = 44 + XY \\implies$ **Male Child**.",
          "• **Biological Reality**: The sex of a child is determined entirely by which type of paternal sperm fertilises the ovum. **The father's sperm determines the sex of the child**, and females have no biological responsibility for the child's sex.",
          "• **Environmental Sex Determination in Other Animals**:",
          "  - In some reptiles (e.g., crocodiles, turtles), the incubation temperature of fertilised eggs determines sex.",
          "  - Snails can change their sex during their lifetime, proving sex is not strictly genetically fixed in all species."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. When a pure tall pea plant (TT) is crossed with a pure dwarf pea plant (tt), what is the phenotypic ratio obtained in the F₂ generation? (A) 1 : 2 : 1 (B) 3 : 1 (C) 9 : 3 : 3 : 1 (D) 1 : 1",
          "2. The sex of a human newborn child is determined biologically by: (A) The age of the mother (B) The chromosome composition of the fertilising paternal sperm (C) The temperature of the uterus (D) The nutritional status of the maternal ovum",
          "3. In a dihybrid cross between round yellow seeded pea plants (RRYY) and wrinkled green seeded pea plants (rryy), the phenotypic ratio in the F₂ generation is: (A) 3 : 1 (B) 1 : 2 : 1 (C) 9 : 3 : 3 : 1 (D) 1 : 1 : 1 : 1",
          "4. Which of the following is an example of an acquired trait that cannot be inherited by progeny? (A) Eye colour (B) Blood group (C) Reduction in body weight due to starvation (D) Free or attached earlobes",
          "5. In peas, a pure tall plant (TT) is crossed with a short plant (tt). The ratio of pure tall plants to heterozygous tall plants in the F₂ generation is: (A) 1 : 1 (B) 1 : 2 (C) 2 : 1 (D) 3 : 1"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Allele",
        "meaning": "One of two or more alternative versions of a gene occupying the same chromosome locus."
      },
      {
        "term": "Dominant Trait",
        "meaning": "An allele that manifests phenotypically in both homozygous and heterozygous states."
      },
      {
        "term": "Recessive Trait",
        "meaning": "An allele expressed phenotypically only in the homozygous state."
      },
      {
        "term": "Phenotype",
        "meaning": "The observable physical or biochemical manifestation of an inherited trait."
      },
      {
        "term": "Genotype",
        "meaning": "The exact allelic and genetic constitution of an organism."
      },
      {
        "term": "Law of Segregation",
        "meaning": "Mendelian principle stating allele pairs disjoin cleanly into separate gametes."
      },
      {
        "term": "Autosomes",
        "meaning": "Non-sex chromosomes (22 pairs in humans) regulating non-gonadal somatic traits."
      },
      {
        "term": "Sex Chromosomes",
        "meaning": "Chromosomal pair (XX in females, XY in males) dictating biological sex determination."
      }
    ],
    "examTips": [
      "In Mendel's monohybrid cross, the F₂ phenotypic ratio is 3:1, while the genotypic ratio is 1 TT : 2 Tt : 1 tt (1:2:1).",
      "Human sex is determined entirely by the paternal sperm: an X-bearing sperm produces a female (XX), and a Y-bearing sperm produces a male (XY).",
      "Dihybrid cross F₂ phenotypic ratio is 9:3:3:1, proving the Law of Independent Assortment."
    ]
  },
  {
    "id": "note10-9",
    "classLevel": 10,
    "chapterNo": 9,
    "title": "Light – Reflection and Refraction",
    "unit": "Unit 3 · Natural Phenomena",
    "overview": "Light is an electromagnetic radiation enabling vision through interactions with matter. This chapter covers the fundamental laws of reflection and refraction, ray trace analysis for spherical mirrors (concave and convex), the New Cartesian Sign Convention, mirror formula, magnification, Snell's law of refraction, absolute and relative refractive indices, lateral displacement, lens formula, power of lenses, and image formation algorithms.",
    "diagram": "mirror-lens-ray",
    "sections": [
      {
        "title": "Laws of Reflection & Spherical Mirror Terminology",
        "points": [
          "**Laws of Reflection of Light**:",
          "1. The angle of incidence ($\\angle i$) is strictly equal to the angle of reflection ($\\angle r$): $\\angle i = \\angle r$.",
          "2. The incident ray, the reflected ray, and the normal to the reflecting surface at the point of incidence all lie in the same geometrical plane.",
          "*(These laws apply universally to all reflecting surfaces, including plane and spherical mirrors).*",
          "**Spherical Mirrors**: Curved reflecting surfaces forming part of a hollow sphere of glass:",
          "• **Concave Mirror (Converging)**: Reflecting surface curves **inwards** towards the centre of the sphere.",
          "• **Convex Mirror (Diverging)**: Reflecting surface curves **outwards** away from the centre.",
          "**Key Geometric Definitions**:",
          "• **Pole ($P$)**: The geometric centre of the reflecting surface of a spherical mirror.",
          "• **Centre of Curvature ($C$)**: The centre of the hollow sphere of which the mirror forms a part. (Concave $C$ lies in front; Convex $C$ lies behind).",
          "• **Radius of Curvature ($R$)**: Distance from pole to centre of curvature ($PC = R$).",
          "• **Principal Axis**: Straight line passing through the pole and the centre of curvature.",
          "• **Principal Focus ($F$)**: The point on the principal axis where rays incident parallel to the principal axis converge (concave mirror) or appear to diverge from (convex mirror) after reflection.",
          "• **Focal Length ($f$)**: The linear distance between the pole and the principal focus ($PF = f$). For spherical mirrors of small aperture: **$R = 2f$** (or $f = R/2$)."
        ]
      },
      {
        "title": "Concave & Convex Mirror Ray Diagrams & Practical Applications",
        "points": [
          "**Four Fundamental Rules for Ray Diagrams**:",
          "1. A ray parallel to the principal axis passes through $F$ (concave) or appears to diverge from $F$ (convex) after reflection.",
          "2. A ray passing through $F$ emerges parallel to the principal axis after reflection.",
          "3. A ray passing through $C$ reflects back along its own path (normal incidence $\\angle i = 0^\\circ \\implies \\angle r = 0^\\circ$).",
          "4. A ray incident obliquely at the pole $P$ reflects obliquely obeying $\\angle i = \\angle r$.",
          "**Image Formation by Concave Mirror (6 Positions)**:",
          "• Object at $\\infty$: Image at $F$; real, inverted, highly diminished (point-sized).",
          "• Object beyond $C$: Image between $F$ and $C$; real, inverted, diminished.",
          "• Object at $C$: Image at $C$; real, inverted, **same size as object**.",
          "• Object between $C$ and $F$: Image beyond $C$; real, inverted, enlarged.",
          "• Object at $F$: Image at $\\infty$; real, inverted, infinitely magnified.",
          "• **Object between $P$ and $F$**: Image behind mirror; **virtual, erect, enlarged**.",
          "**Applications of Concave Mirrors**: Torches, searchlights, and vehicle headlights (bulb at $F$ produces a powerful parallel beam); shaving/makeup mirrors and dentist mirrors (object placed within focal length yields virtual, erect, magnified image); solar furnaces (large concave mirrors concentrate sunlight at focus to generate high temperatures).",
          "**Image Formation by Convex Mirror**: Always forms a **virtual, erect, and diminished** image behind the mirror between $P$ and $F$ for all real object positions.",
          "**Applications of Convex Mirrors**: Rear-view mirrors in automobiles because they provide a much wider field of view than a plane mirror and consistently form an erect, albeit diminished, image."
        ],
        "tip": "Dentists use concave mirrors to inspect enlarged views of teeth; rear-view car mirrors are convex to provide a wide panoramic field of view."
      },
      {
        "title": "New Cartesian Sign Convention & Mirror Formula",
        "points": [
          "**New Cartesian Sign Convention**:",
          "1. All linear distances are measured from the **Pole ($P$)** as origin.",
          "2. Distances measured in the direction of incident light are positive ($+$); distances opposite to incident light are negative ($-$).",
          "3. Heights measured vertically upwards perpendicular to the principal axis are positive ($+$); downwards are negative ($-$).",
          "• **Crucial Defaults**:",
          "  - Object distance ($u$) is **always negative** ($-$).",
          "  - Focal length of Concave mirror: **$f$ is always negative** ($-$).",
          "  - Focal length of Convex mirror: **$f$ is always positive** ($+$).",
          "**The Mirror Formula**: Relationship between object distance ($u$), image distance ($v$), and focal length ($f$):",
          "$$\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$$",
          "**Linear Magnification ($m$)**:",
          "$$m = \\frac{\\text{Height of image } (h_i)}{\\text{Height of object } (h_o)} = -\\frac{v}{u}$$",
          "• Interpretation of $m$:",
          "  - If $m$ is negative, image is **real and inverted**.",
          "  - If $m$ is positive, image is **virtual and erect**.",
          "  - If $|m| > 1$, image is enlarged; $|m| = 1$, same size; $|m| < 1$, diminished."
        ],
        "formula": [
          "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}",
          "m = \\frac{h_i}{h_o} = -\\frac{v}{u}",
          "R = 2f"
        ]
      },
      {
        "title": "Refraction of Light, Snell's Law & Refractive Index",
        "points": [
          "**Refraction**: The change in direction (bending) of a ray of light when it passes obliquely from one transparent medium to another due to a difference in the speed of light in the two media.",
          "• **Laws of Refraction**:",
          "  1. The incident ray, the refracted ray, and the normal at the point of incidence all lie in the same plane.",
          "  2. **Snell's Law**: The ratio of the sine of angle of incidence to the sine of angle of refraction is a constant for light of a given colour and pair of media:",
          "  $$\\frac{\\sin i}{\\sin r} = \\text{constant} = n_{21} = \\frac{n_2}{n_1}$$",
          "• **Bending Rules**:",
          "  - Rare to Denser: Light slows down $\\implies$ bends **towards the normal** ($i > r$).",
          "  - Denser to Rarer: Light speeds up $\\implies$ bends **away from the normal** ($i < r$).",
          "• **Refraction Through a Glass Slab**: Light undergoes two refractions (air-glass and glass-air). The emergent ray is **parallel** to the incident ray because extent of bending at opposite parallel faces is equal and opposite. The perpendicular displacement between the original incident path and emergent ray is called **lateral displacement** (increases with slab thickness, refractive index, and angle of incidence).",
          "• **Absolute Refractive Index ($n$)**: Ratio of speed of light in vacuum ($c = 3 \\times 10^8\\text{ m/s}$) to speed of light in the medium ($v$):",
          "  $$n = \\frac{c}{v}$$",
          "  *(Refractive index of water = 1.33; crown glass = 1.52; diamond has the highest index at 2.42).*",
          "• **Optical Density vs Mass Density**: Optical density is the measure of the ability of a medium to refract light; it does not correlate with physical mass density. For example, kerosene has a lower mass density than water (floats on water), but its refractive index ($1.44$) is higher than water ($1.33$), making kerosene **optically denser** than water."
        ]
      },
      {
        "title": "Spherical Lenses, Lens Formula & Power of a Lens",
        "points": [
          "**Lenses**: Transparent refracting media bounded by two spherical surfaces.",
          "• **Convex Lens (Converging)**: Thicker in the middle, thinner at edges. Converges parallel rays to a real focus ($f > 0$).",
          "• **Concave Lens (Diverging)**: Thicker at edges, thinner in the middle. Diverges parallel rays; rays appear to meet at virtual focus ($f < 0$).",
          "**Image Formation by Convex Lens (6 Cases)**:",
          "• At $\\infty$ $\\to$ at $F_2$ (real, inverted, point).",
          "• Beyond $2F_1$ $\\to$ between $F_2$ and $2F_2$ (real, inverted, diminished).",
          "• At $2F_1$ $\\to$ at $2F_2$ (real, inverted, **same size**).",
          "• Between $F_1$ and $2F_1$ $\\to$ beyond $2F_2$ (real, inverted, enlarged).",
          "• At $F_1$ $\\to$ at $\\infty$ (real, inverted, highly magnified).",
          "• **Between optical centre $O$ and $F_1$** $\\to$ on same side as object (virtual, erect, magnified — **simple microscope**).",
          "**Image Formation by Concave Lens**: Always forms a virtual, erect, diminished image between $O$ and $F_1$ for all real object positions.",
          "**The Lens Formula**:",
          "$$\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}$$",
          "**Linear Magnification of Lens ($m$)**:",
          "$$m = \\frac{h_i}{h_o} = +\\frac{v}{u}$$",
          "**Power of a Lens ($P$)**: The degree of convergence or divergence of light rays achieved by a lens, defined as the reciprocal of focal length expressed in metres:",
          "$$P = \\frac{1}{f\\text{ (in metres)}}$$",
          "• SI Unit: **Dioptre (D)**. $1\\text{ D} = 1\\text{ m}^{-1}$.",
          "• A convex lens has positive focal length $\\implies$ **Positive Power ($+P$)**.",
          "• A concave lens has negative focal length $\\implies$ **Negative Power ($-P$)**.",
          "• **Lens Combination**: For multiple thin lenses in contact: $P_{\\text{total}} = P_1 + P_2 + P_3 + \\dots$."
        ],
        "formula": [
          "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}",
          "m = \\frac{v}{u} = \\frac{h_i}{h_o}",
          "P = \\frac{1}{f\\text{ (m)}}",
          "P_{\\text{total}} = P_1 + P_2"
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. A concave mirror produces a real, inverted image of the same size as the object when the object is placed: (A) At the principal focus (B) Between focus and pole (C) At the centre of curvature (D) Beyond the centre of curvature",
          "2. The focal length of a spherical mirror whose radius of curvature is 30 cm is: (A) 60 cm (B) 15 cm (C) 30 cm (D) 10 cm",
          "3. A convex lens forms a sharp image on a screen. If the focal length of the lens is +20 cm, what is its optical power? (A) +0.05 D (B) +2 D (C) +5 D (D) -5 D",
          "4. An optical medium A has a refractive index of 1.33, and medium B has 1.50. When light passes obliquely from medium A into medium B, the light ray will: (A) Bend away from the normal (B) Bend towards the normal because B is optically denser (C) Pass straight without any refraction (D) Undergo total reflection back into A",
          "5. To obtain a virtual, erect, and magnified image of an object using a concave mirror, where should the object be positioned? (A) Beyond C (B) At C (C) At F (D) Between the pole P and principal focus F"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Principal Focus",
        "meaning": "Point where paraxial rays converge or appear to diverge from after reflection/refraction."
      },
      {
        "term": "Snell's Law",
        "meaning": "Law stating the ratio of sine of incidence to sine of refraction is constant (sin i / sin r = n)."
      },
      {
        "term": "Refractive Index",
        "meaning": "Ratio of the speed of light in vacuum to the speed of light in a specified medium."
      },
      {
        "term": "Lateral Displacement",
        "meaning": "Perpendicular distance between incident ray path and parallel emergent ray from a slab."
      },
      {
        "term": "Dioptre (D)",
        "meaning": "SI unit of optical lens power equal to the reciprocal of focal length in metres."
      },
      {
        "term": "Magnification",
        "meaning": "Ratio of the height of an optical image to the height of the object."
      },
      {
        "term": "Optical Centre",
        "meaning": "The central point of a lens through which light rays pass undeflected."
      }
    ],
    "examTips": [
      "In mirror formula (1/v + 1/u = 1/f) and lens formula (1/v - 1/u = 1/f), always apply the New Cartesian Sign Convention: u is always negative.",
      "Focal length of a concave mirror or lens is always negative; for a convex mirror or lens, focal length and power are always positive.",
      "A concave mirror forms a virtual, erect, magnified image ONLY when the object is placed between the pole P and principal focus F."
    ]
  },
  {
    "id": "note10-10",
    "classLevel": 10,
    "chapterNo": 10,
    "title": "The Human Eye and the Colourful World",
    "unit": "Unit 3 · Natural Phenomena",
    "overview": "The human eye is an extraordinary optical organ functioning as a variable-focal-length camera. This chapter covers the anatomical optics of the eye, power of accommodation, optical vision defects (myopia, hypermetropia, presbyopia, cataract) and their corrective lens mechanics, refraction through glass prisms, dispersion of white light, rainbow formation, atmospheric refraction (twinkling of stars, early sunrise), and the Tyndall scattering effect.",
    "diagram": "human-eye",
    "sections": [
      {
        "title": "Anatomy and Optical Function of the Human Eye",
        "points": [
          "The human eye acts like an optical camera forming a real, inverted image on a light-sensitive screen called the **retina**:",
          "• **Cornea**: The transparent spherical dome-shaped outer membrane covering the front of the eye. Most of the optical refraction (~80%) occurs at the outer surface of the cornea.",
          "• **Iris**: A dark muscular diaphragm located behind the cornea. Regulates the diameter and size of the pupil to control light intake.",
          "• **Pupil**: The central aperture surrounded by the iris. Appears black because no light reflects out. In dim light, the iris dilates the pupil to admit more light; in bright sunlight, the iris constricts the pupil to protect internal receptors.",
          "• **Crystalline Lens**: A flexible, transparent, biconvex lens composed of fibrous jelly-like protein material. Provides fine optical focusing onto the retina.",
          "• **Ciliary Muscles**: Ring-like muscles anchoring the crystalline lens; modify the lens curvature and focal length.",
          "• **Retina**: Delicate inner light-sensitive membrane containing ~125 million photoreceptor cells:",
          "  - **Rods**: Highly sensitive to dim light (scotopic vision); do not detect colour.",
          "  - **Cones**: Sensitive to bright light and detect distinct colours (photopic vision).",
          "• **Optic Nerve**: Transmits electrical impulses generated by photoreceptors to the visual cortex of the brain.",
          "• **Blind Spot**: Junction where the optic nerve leaves the eyeball; devoid of photoreceptors; insensitive to light."
        ]
      },
      {
        "title": "Power of Accommodation, Near Point & Far Point",
        "points": [
          "**Accommodation**: The physiological ability of the crystalline eye lens to adjust its focal length via contraction and relaxation of ciliary muscles to focus objects at varying distances sharply on the retina:",
          "• **Viewing Distant Objects (Relaxed Eye)**: Ciliary muscles relax → Suspensory ligaments pull tight → Lens becomes thin and flattened → Radius of curvature increases → Focal length increases to maximum (~2.5 cm) → Parallel rays from distant objects focus cleanly on retina.",
          "• **Viewing Nearby Objects (Accommodated Eye)**: Ciliary muscles contract → Suspensory ligaments loosen → Lens thickens and becomes more convex → Radius of curvature decreases → Focal length decreases → Diverging rays from close object converge sharply on retina.",
          "• **Near Point (Least Distance of Distinct Vision, $D$)**: The minimum distance at which an object can be seen clearly and comfortably without ocular strain. For a normal young adult eye, **$D = 25\\text{ cm}$**.",
          "• **Far Point**: The maximum distance up to which an eye can see objects distinctly. For a normal eye, the far point is at **Infinity ($\\infty$)**."
        ]
      },
      {
        "title": "Defects of Vision & Optical Corrections (Myopia, Hypermetropia, Presbyopia)",
        "points": [
          "**1. Myopia (Near-sightedness)**:",
          "• A person can see nearby objects distinctly, but cannot focus on distant objects (far point shifts from $\\infty$ to a finite distance $d$).",
          "• **Causes**: (a) Excessive curvature of the cornea/lens, or (b) Elongation of the eyeball.",
          "• **Optical Consequence**: Parallel rays from distant objects converge **in front of the retina**.",
          "• **Correction**: Using a **Concave Lens** of suitable power/focal length ($f = -d$, where $d$ is the defective far point). The concave lens diverges incoming rays so they appear to originate from the eye's defective far point.",
          "**2. Hypermetropia (Far-sightedness)**:",
          "• A person can see distant objects clearly, but cannot read nearby text comfortably (near point recedes beyond 25 cm, e.g., to 1 metre).",
          "• **Causes**: (a) Focal length of eye lens too long (insufficient convergence), or (b) Eyeball too short.",
          "• **Optical Consequence**: Rays from a nearby object focus **behind the retina**.",
          "• **Correction**: Using a **Convex Lens** of suitable power. The convex lens provides additional converging power, focusing the image precisely on the retina.",
          "**3. Presbyopia (Old-Age Hypermetropia)**:",
          "• The gradual receding of the near point with advancing age due to gradual weakening of ciliary muscles and diminishing flexibility of the crystalline lens.",
          "• **Correction**: Simple convex reading glasses, or **Bifocal Lenses** (if person has both myopia and presbyopia: upper portion contains a concave lens for distant vision, lower portion contains a convex lens for reading).",
          "**4. Cataract**: The crystalline lens of elderly people turns cloudy, milky, and opaque due to protein membrane aggregation, causing progressive vision loss. Corrected by surgical removal of cloudy lens and implantation of an artificial Intraocular Lens (IOL)."
        ],
        "table": {
          "head": [
            "Defect",
            "Symptom",
            "Focal Point",
            "Corrective Lens Type"
          ],
          "rows": [
            [
              "Myopia",
              "Distant blurred; near clear",
              "In front of retina",
              "Concave Lens (Diverging, -P)"
            ],
            [
              "Hypermetropia",
              "Near blurred; distant clear",
              "Behind retina",
              "Convex Lens (Converging, +P)"
            ],
            [
              "Presbyopia",
              "Loss of accommodation with age",
              "Behind retina for near reading",
              "Convex / Bifocal Lenses"
            ],
            [
              "Cataract",
              "Opaque cloudy crystalline lens",
              "Scattered / blocked",
              "Surgical Intraocular Lens (IOL)"
            ]
          ]
        }
      },
      {
        "title": "Refraction Through a Prism & Dispersion of White Light",
        "points": [
          "**Refraction Through a Glass Prism**:",
          "• A triangular glass prism has two triangular bases and three rectangular lateral refracting faces inclined at an angle called the **Angle of the Prism ($A$)**.",
          "• Key ray angles: Angle of incidence ($i$), angle of emergence ($e$), and the **Angle of Deviation ($D$)** (the angle between the direction of the incident ray and the emergent ray).",
          "• Relation: $A + D = i + e$.",
          "**Dispersion of Light**:",
          "• Splitting of white light into its constituent component spectrum of colours when passing through a dispersive medium (glass prism).",
          "• The spectrum comprises **VIBGYOR** (Violet, Indigo, Blue, Green, Yellow, Orange, Red).",
          "• **Physical Cause**: Different colours of light travel with the exact same speed in vacuum, but have **different speeds in glass**. Red light has the longest visible wavelength and travels fastest in glass; hence it **deviates the least**. Violet light has the shortest wavelength, travels slowest in glass, and **deviates the most**.",
          "• **Newton's Recombination Experiment**: Sir Isaac Newton placed an identical second prism in an inverted position relative to the first prism. The second inverted prism recombined all the separated colours back into a beam of pure **white light**, proving white light is composed of 7 spectral colours.",
          "**Rainbow Formation (Natural Dispersion)**:",
          "• An atmospheric meteorological phenomenon observed in the sky opposite the Sun after rain showers.",
          "• Suspended tiny raindrops act as miniature optical prisms: Sunlight entering a raindrop undergoes (1) **Refraction and Dispersion** at front surface, (2) **Internal Reflection** at the back surface, and (3) **Refraction** exiting the drop towards the observer's eye."
        ]
      },
      {
        "title": "Atmospheric Refraction & Scattering of Light (Tyndall Effect)",
        "points": [
          "**Atmospheric Refraction**: Refraction of light caused by continuous variations in the optical density of Earth's air layers with temperature and altitude:",
          "• **Twinkling of Stars**: Star is a point source of light located light-years away. Light passes through turbulent, fluctuating atmospheric layers of changing refractive index. The path of light continuously shifts, causing apparent star position and brightness to fluctuate rapidly, perceived as **twinkling**.",
          "• **Why Planets Do Not Twinkle**: Planets are much closer to Earth and act as extended disc sources consisting of numerous point sources of light. Brightness variations from different points average out to zero, nullifying the twinkling sensation.",
          "• **Advanced Sunrise & Delayed Sunset**: Sunlight refracts through atmosphere when Sun is slightly below horizon. The apparent position is raised by ~0.5°. The Sun is visible ~**2 minutes before actual sunrise** and remains visible ~**2 minutes after actual sunset**, lengthening apparent daytime by **4 minutes**. Causes the apparent oval/flattened shape of the Sun at horizon.",
          "**Scattering of Light & Tyndall Effect**:",
          "• Scattering: Absorption and re-emission of light in all directions by particulate matter.",
          "• **Tyndall Effect**: The scattering of a visible light beam by colloidal particles, illuminating the path of the beam (e.g., sunlight entering a dusty room through a chink; sunlight piercing through dense forest canopy).",
          "• **Rayleigh's Law of Scattering**: For particles smaller than the wavelength of light, the intensity of scattered light is inversely proportional to the fourth power of wavelength: **$I \\propto 1/\\lambda^4$**.",
          "• **Why Sky Appears Blue**: Molecules of nitrogen and oxygen in the upper atmosphere have sizes smaller than visible light wavelengths. They scatter short-wavelength blue light ~16 times more strongly than red light. The scattered blue light enters our eyes.",
          "• **Why Sun Appears Red at Sunrise and Sunset**: At horizon, sunlight travels the maximum thickness of atmosphere. Shorter blue and violet wavelengths are completely scattered away along the path, allowing predominantly longer red wavelengths to reach our eyes.",
          "• **Danger Signals are Red**: Red light has the longest wavelength among visible colours and suffers the least scattering by fog, smoke, and dust, remaining visible from the greatest distance."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. A person suffering from myopia cannot clearly see objects placed beyond 1.2 m. What type and power of corrective lens is required? (A) Convex lens of power +0.83 D (B) Concave lens of power -0.83 D (C) Concave lens of power -1.2 D (D) Convex lens of power +1.2 D",
          "2. The least distance of distinct vision for a young adult with normal vision is approximately: (A) 25 m (B) 2.5 cm (C) 25 cm (D) 2.5 m",
          "3. Which physical phenomenon is primarily responsible for the twinkling of stars at night? (A) Dispersion of light by water droplets (B) Total internal reflection within space (C) Atmospheric refraction of starlight through air layers of fluctuating densities (D) Rayleigh scattering by dust particles",
          "4. During the dispersion of white light by a glass prism, which colour suffers the maximum deviation from its original path? (A) Red (B) Yellow (C) Green (D) Violet",
          "5. The sky appears dark or black to astronauts in space because: (A) Sunlight is absent in space (B) There is no atmosphere to cause scattering of light (C) All light is absorbed by cosmic dust (D) Eyes lose the power of accommodation"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Accommodation",
        "meaning": "Ability of ciliary muscles to adjust crystalline lens curvature to focus variable distances."
      },
      {
        "term": "Least Distance of Distinct Vision",
        "meaning": "Shortest distance (25 cm for normal human eye) for strain-free clear optical viewing."
      },
      {
        "term": "Myopia",
        "meaning": "Visual defect where distant images converge in front of retina, corrected by concave lens."
      },
      {
        "term": "Hypermetropia",
        "meaning": "Visual defect where nearby images focus behind retina, corrected by convex lens."
      },
      {
        "term": "Presbyopia",
        "meaning": "Age-related loss of accommodation due to ciliary muscle stiffness, corrected by bifocals."
      },
      {
        "term": "Dispersion",
        "meaning": "Splitting of polychromatic white light into constituent spectral wavelengths across a prism."
      },
      {
        "term": "Tyndall Effect",
        "meaning": "Optical phenomenon where light beam trajectory becomes illuminated via colloidal scattering."
      },
      {
        "term": "Rayleigh Scattering",
        "meaning": "Scattering inversely proportional to the fourth power of wavelength (I ∝ 1/λ⁴)."
      }
    ],
    "examTips": [
      "Myopia (near-sightedness) is corrected with a concave lens; hypermetropia (far-sightedness) is corrected with a convex lens.",
      "Stars twinkle due to atmospheric refraction of starlight through turbulent air layers; planets do not twinkle because they are extended sources.",
      "The sky appears blue because atmospheric gas molecules scatter shorter blue wavelengths ~16 times more strongly than red (Rayleigh's Law)."
    ]
  },
  {
    "id": "note10-11",
    "classLevel": 10,
    "chapterNo": 11,
    "title": "Electricity",
    "unit": "Unit 4 · Effects of Current",
    "overview": "Electricity is the technological cornerstone of modern civilization. This chapter covers electric charge, current, potential difference, Ohm's law, electrical resistance and factors governing resistivity, resistors in series and parallel networks, Joule's heating effect and its domestic appliances, electric power, and commercial kilowatt-hour billing calculations.",
    "diagram": "electric-circuit",
    "sections": [
      {
        "title": "Electric Charge, Electric Current & Circuit Fundamentals",
        "points": [
          "**Electric Charge ($Q$)**: Fundamental property of matter. Two types: positive (protons) and negative (electrons). Elementary charge $e = 1.6 \\times 10^{-19}\\text{ C}$. SI unit: **Coulomb (C)**.",
          "• **Quantisation of Charge**: $Q = ne$, where $n$ is an integer.",
          "• 1 Coulomb of charge contains $n = \\frac{1}{1.6 \\times 10^{-19}} = 6.25 \\times 10^{18}\\text{ electrons}$.",
          "**Electric Current ($I$)**: The rate of flow of electric charge across a cross-section of a conductor:",
          "$$I = \\frac{Q}{t}$$",
          "• SI Unit: **Ampere (A)** ($1\\text{ A} = 1\\text{ C/s}$).",
          "• Smaller units: Milliampere ($1\\text{ mA} = 10^{-3}\\text{ A}$), Microampere ($1\\text{ }\\mu\\text{A} = 10^{-6}\\text{ A}$).",
          "• **Direction of Current**: Conventional current flows from positive terminal to negative terminal, which is **opposite to the direction of electron drift**.",
          "• **Ammeter**: Device used to measure electric current. Has extremely low resistance and is **always connected in series** in the circuit."
        ]
      },
      {
        "title": "Electric Potential Difference & Voltmeter",
        "points": [
          "**Electric Potential Difference ($V$)**: The amount of work done ($W$) in moving a unit positive charge from one point to another in an electrostatic field:",
          "$$V = \\frac{W}{Q}$$",
          "• SI Unit: **Volt (V)** ($1\\text{ V} = 1\\text{ J/C}$). One volt is defined as the potential difference between two points when 1 Joule of work is done to move 1 Coulomb of charge from one point to the other.",
          "• **Voltmeter**: Instrument used to measure potential difference across two points. Has extraordinarily high resistance and is **always connected in parallel** across the circuit component."
        ]
      },
      {
        "title": "Ohm's Law, Resistance & Factors Governing Resistivity",
        "points": [
          "**Ohm's Law (Georg Simon Ohm, 1827)**: At constant temperature and physical conditions, the electric current ($I$) flowing through a metallic conductor is directly proportional to the potential difference ($V$) across its ends:",
          "$$V \\propto I \\implies V = IR$$",
          "• $V-I$ graph for an ohmic conductor is a straight line passing through the origin. The slope of the $V-I$ graph equals resistance: $\\text{Slope} = \\frac{V}{I} = R$.",
          "**Electrical Resistance ($R$)**: The property of a conductor to oppose the flow of electric charges through it. SI Unit: **Ohm ($\\Omega$)** ($1\\ \\Omega = 1\\text{ V/A}$).",
          "**Factors Governing Resistance of a Conductor**:",
          "1. **Length ($l$)**: Resistance is directly proportional to length: $R \\propto l$. Doubling length doubles resistance.",
          "2. **Area of Cross-section ($A$)**: Resistance is inversely proportional to cross-sectional area: $R \\propto \\frac{1}{A} = \\frac{1}{\\pi r^2}$. Doubling diameter quadruples area and quarters resistance.",
          "3. **Nature of Material & Temperature**: Combining factors:",
          "$$R = \\rho \\frac{l}{A}$$",
          "• **Resistivity (Specific Resistance, $\\rho$)**: The resistance of a conductor of unit length and unit cross-sectional area. SI Unit: **$\\Omega\\cdot\\text{m}$**.",
          "• Resistivity is an intrinsic material property that **depends only on the material and temperature**, NOT on length or cross-sectional dimensions.",
          "• **Resistivity Comparisons**:",
          "  - Metals (Copper, Silver, Aluminium): Extremely low resistivity ($10^{-8} - 10^{-6}\\ \\Omega\\cdot\\text{m}$); excellent conductors used for electrical transmission lines.",
          "  - Alloys (Nichrome: Ni-Cr-Mn-Fe, Constantan, Manganin): Resistivity significantly higher than constituent metals. **Alloys do not oxidise (burn) easily at high temperatures** and have low temperature coefficients of resistance; hence used as heating elements in electric irons, toasters, and heaters.",
          "  - Insulators (Rubber, Glass, Ebonite): Extremely high resistivity ($10^{12} - 10^{17}\\ \\Omega\\cdot\\text{m}$).",
          "  - Tungsten: High melting point ($3422^\\circ\\text{C}$); emits white glow without melting, used exclusively for incandescent lamp filaments."
        ],
        "formula": [
          "V = IR",
          "R = \\rho \\frac{l}{A}",
          "\\rho = \\frac{R A}{l}"
        ]
      },
      {
        "title": "Resistor Networks: Series vs Parallel Combinations",
        "points": [
          "**1. Resistors in Series**:",
          "• Connected end-to-end in a single continuous circuit loop.",
          "• Same electric current ($I$) flows through each resistor.",
          "• Total voltage drops: $V = V_1 + V_2 + V_3$.",
          "• **Equivalent Resistance**: **$R_s = R_1 + R_2 + R_3$**.",
          "• The equivalent resistance is **greater than the greatest individual resistance** in the combination.",
          "• **Major Disadvantages in Domestic Wiring**:",
          "  - If one component fails or burns out, the entire circuit breaks and all appliances stop functioning.",
          "  - All appliances receive the exact same current regardless of their power ratings.",
          "  - Individual appliances cannot be operated independently with separate switches.",
          "**2. Resistors in Parallel**:",
          "• Connected between two common electrical nodes.",
          "• Potential difference ($V$) across each branch is identical (equals mains voltage).",
          "• Total current divides: $I = I_1 + I_2 + I_3$.",
          "• **Equivalent Resistance**: **$\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$**.",
          "• The equivalent resistance is **smaller than the smallest individual resistance** in the combination.",
          "• **Major Advantages in Domestic Wiring**:",
          "  - Each appliance receives the full mains voltage ($220\\text{ V}$ in India).",
          "  - Each appliance can be switched on/off independently.",
          "  - If one appliance fails, other parallel branches continue working normally.",
          "  - Reduces total circuit resistance, allowing appropriate current draw based on each appliance's rating."
        ],
        "table": {
          "head": [
            "Parameter",
            "Series Combination",
            "Parallel Combination"
          ],
          "rows": [
            [
              "Current (I)",
              "Identical across all resistors",
              "Divides inversely with resistance (I = I₁ + I₂)"
            ],
            [
              "Voltage (V)",
              "Divides across resistors (V = V₁ + V₂)",
              "Identical across all branches"
            ],
            [
              "Equivalent Resistance",
              "Rₛ = R₁ + R₂ + R₃ (Maximum)",
              "1/Rₚ = 1/R₁ + 1/R₂ (Minimum)"
            ],
            [
              "Component Failure",
              "Entire circuit shuts down",
              "Other branches continue operating unaffected"
            ],
            [
              "Domestic Application",
              "Decorative fairy lights",
              "Household mains wiring"
            ]
          ]
        }
      },
      {
        "title": "Joule's Law of Heating, Electric Power & Billing Calculations",
        "points": [
          "**Heating Effect of Electric Current (Joule's Law)**: When an electric current flows through a purely resistive conductor, electrical energy is dissipated entirely as heat:",
          "$$H = VIt = I^2Rt = \\frac{V^2}{R}t$$",
          "• **Joule's Law Statement**: The heat produced in a resistor is directly proportional to: (1) square of current ($I^2$), (2) resistance ($R$), and (3) time ($t$).",
          "• **Practical Applications**:",
          "  - Heating appliances: Electric heater, geyser, iron, toaster use coiled Nichrome wire.",
          "  - Incandescent bulbs: Tungsten filament heated to high temperature emits white light; filled with inactive nitrogen and argon gas to prolong filament life.",
          "  - **Electric Fuse**: A safety device made of an alloy of lead and tin having a low melting point. Always connected in series with the live wire. If current exceeds rated capacity (1A, 2A, 5A, 15A) due to short-circuiting or overloading, Joule heating melts the fuse wire, breaking the circuit and protecting appliances from fire.",
          "**Electric Power ($P$)**: Rate at which electrical energy is consumed in a circuit:",
          "$$P = VI = I^2R = \\frac{V^2}{R}$$",
          "• SI Unit: **Watt (W)** ($1\\text{ W} = 1\\text{ J/s} = 1\\text{ V}\\times 1\\text{ A}$).",
          "• Higher units: Kilowatt ($1\\text{ kW} = 1000\\text{ W}$), Megawatt ($1\\text{ MW} = 10^6\\text{ W}$).",
          "**Commercial Unit of Electrical Energy (Kilowatt-Hour, kWh)**:",
          "• 1 'Board of Trade Unit' = **$1\\text{ kWh}$**: Energy consumed by a 1000 W appliance operating for 1 hour:",
          "$$1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3.6 \\times 10^6\\text{ Joules (J)}$$",
          "• **Electricity Bill Formula**: $\\text{Units (kWh)} = \\frac{\\text{Total Power (Watts)} \\times \\text{Hours/day} \\times \\text{Days}}{1000}$."
        ],
        "formula": [
          "H = I^2 R t",
          "P = VI = I^2 R = \\frac{V^2}{R}",
          "1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}"
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. If a wire of resistance R is stretched uniformly to double its original length, its new electrical resistance becomes: (A) R/2 (B) 2R (C) 4R (D) R/4",
          "2. Two electric bulbs rated 220 V, 100 W and 220 V, 40 W are connected in parallel to a 220 V supply. Which bulb draws more current and has lower resistance? (A) The 40 W bulb (B) The 100 W bulb (C) Both draw identical current (D) Neither conducts current",
          "3. Three resistors of values 2 Ω, 3 Ω, and 6 Ω are connected in parallel. What is their equivalent resistance? (A) 11 Ω (B) 1 Ω (C) 0.5 Ω (D) 1.5 Ω",
          "4. An electric heater rated 1500 W operates for 2 hours daily. How much electrical energy in commercial units (kWh) does it consume in a month of 30 days? (A) 30 kWh (B) 60 kWh (C) 90 kWh (D) 180 kWh",
          "5. An electric fuse wire is made of an alloy of lead and tin chosen specifically because of its: (A) High melting point and low resistance (B) Low melting point and high resistivity (C) High ductility and low resistivity (D) Immunity to Joule heating"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Electric Current",
        "meaning": "Net rate of flow of electric charges across a conductor cross-section (I = Q/t)."
      },
      {
        "term": "Ohm's Law",
        "meaning": "Physical law stating current is directly proportional to applied voltage at constant temperature."
      },
      {
        "term": "Resistivity (ρ)",
        "meaning": "Intrinsic resistance of a material of unit length and unit cross-sectional area (Ω·m)."
      },
      {
        "term": "Joule's Law",
        "meaning": "Heat generated in a resistor is proportional to the square of current, resistance, and time (H = I²Rt)."
      },
      {
        "term": "Kilowatt-Hour (kWh)",
        "meaning": "Commercial unit of electricity equal to 3.6 × 10⁶ Joules."
      },
      {
        "term": "Electric Fuse",
        "meaning": "Sacrificial low-melting alloy safety wire protecting circuits against current surges."
      }
    ],
    "examTips": [
      "When a wire is stretched to double its length, its area halves and resistance quadruples (R' = 4R).",
      "An ammeter has low resistance and is always connected in series; a voltmeter has high resistance and is always connected in parallel.",
      "In domestic circuits, appliances are connected in parallel so each receives 220 V and can be operated independently."
    ]
  },
  {
    "id": "note10-12",
    "classLevel": 10,
    "chapterNo": 12,
    "title": "Magnetic Effects of Electric Current",
    "unit": "Unit 4 · Effects of Current",
    "overview": "Electricity and magnetism are intrinsically coupled physical phenomena. This chapter covers magnetic fields and continuous field lines, Hans Christian Oersted's discovery, right-hand thumb rule, magnetic fields around straight wires, circular coils, and solenoids, electromagnetism, Lorentz force on a current-carrying conductor, Fleming's left-hand rule, and domestic AC circuits with earthing safety.",
    "diagram": "magnetic-field-wire",
    "sections": [
      {
        "title": "Magnetic Field, Field Lines & Oersted's Discovery",
        "points": [
          "**Hans Christian Oersted's Discovery (1820)**: A compass needle placed near a current-carrying wire deflected, demonstrating that an electric current produces a **magnetic field** in surrounding space.",
          "**Magnetic Field (\\vec{B})**: The region around a magnet or current-carrying conductor where magnetic forces can be detected. It is a **vector quantity** having both magnitude and direction.",
          "**Properties of Magnetic Field Lines**:",
          "1. Continuous closed loops: Outside the magnet, they emerge from the **North pole** and enter the **South pole**; inside the magnet, they travel from South to North.",
          "2. Direction at any point is given by the direction of the north pole of a magnetic compass needle placed at that point.",
          "3. Closeness of field lines indicates the relative strength of the field: where field lines are crowded (near poles), the field is strongest.",
          "4. **No two magnetic field lines ever intersect**: If they crossed, a compass needle placed at the intersection point would point in two different directions simultaneously, which is physically impossible."
        ]
      },
      {
        "title": "Magnetic Fields of Straight Wires, Loops & Solenoids",
        "points": [
          "**1. Straight Current-Carrying Conductor**:",
          "• Field forms **concentric circular field lines** centred on the wire.",
          "• Field strength $B$ is directly proportional to current ($B \\propto I$) and inversely proportional to distance from the wire ($B \\propto \\frac{1}{r}$).",
          "• **Right-Hand Thumb Rule (Maxwell's Corkscrew Rule)**: Imagine holding the current-carrying wire in your right hand with the thumb pointing in the direction of current. Then your curled fingers encircle the wire in the direction of magnetic field lines.",
          "**2. Circular Loop Carrying Current**:",
          "• Field lines are concentric circles near the wire; as you move toward the centre, arcs grow larger and straighten out.",
          "• At the centre of the loop, field lines are **straight and parallel**, indicating a uniform field perpendicular to the loop plane.",
          "• Strength $B$ is proportional to current ($I$) and number of turns ($n$). A coil with $n$ turns produces an $n$-fold stronger field.",
          "• **Clock Face Rule**: Looking at a face of the loop: If current flows clockwise, that face behaves as a **South pole**; if counter-clockwise, it behaves as a **North pole**.",
          "**3. Solenoid**:",
          "• A cylindrical coil of many circular turns of insulated copper wire closely wrapped in the shape of a helix.",
          "• The magnetic field pattern is **identical to that of a bar magnet**, exhibiting distinct North and South poles at opposite ends.",
          "• Inside the solenoid, field lines are parallel straight lines, indicating a **completely uniform magnetic field** throughout the core."
        ]
      },
      {
        "title": "Electromagnets vs Permanent Magnets",
        "points": [
          "**Electromagnet**: Formed by inserting a **soft iron core** into the interior of a current-carrying solenoid.",
          "• Soft iron has high magnetic permeability: it magnetises strongly when current flows and loses all magnetism immediately when current is switched off (**temporary magnet**).",
          "• The magnetic field strength of an electromagnet can be increased by: (1) increasing the number of coil turns ($n$), (2) increasing current ($I$), or (3) using high-grade soft iron.",
          "• Used in electric bells, cranes for scrap iron lifting, MRI machines, and particle accelerators.",
          "• **Permanent Magnet**: Made of hard steel, Alnico (Al-Ni-Co), or NdFeB alloys. Retains magnetism permanently once magnetized; cannot be switched off easily."
        ],
        "table": {
          "head": [
            "Property",
            "Electromagnet (Temporary)",
            "Permanent Magnet"
          ],
          "rows": [
            [
              "Magnetism Duration",
              "Temporary; lost when current is interrupted",
              "Permanent; retains magnetism persistently"
            ],
            [
              "Core Material",
              "Soft iron",
              "Carbon steel, Alnico, Ferrites"
            ],
            [
              "Field Strength",
              "Easily adjusted by varying current or turns",
              "Fixed; cannot be altered easily"
            ],
            [
              "Polarity",
              "Reversible by reversing current direction",
              "Fixed North and South poles"
            ],
            [
              "Typical Applications",
              "Electric bells, scrap-metal cranes, relays",
              "Compasses, audio speakers, galvanometers"
            ]
          ]
        }
      },
      {
        "title": "Force on a Conductor in a Magnetic Field & Fleming's Left-Hand Rule",
        "points": [
          "**Ampère's Hypothesis (Lorentz Force)**: A current-carrying conductor placed in a magnetic field experiences a mechanical force, because the magnetic field of the wire interacts with the external magnetic field. (By Newton's third law, the magnet experiences an equal and opposite force).",
          "• Force magnitude: $F = B I l \\sin\\theta$, where $\\theta$ is the angle between conductor and field.",
          "  - **Maximum Force**: When the conductor is perpendicular to the magnetic field ($\\theta = 90^\\circ \\implies \\sin 90^\\circ = 1$).",
          "  - **Zero Force**: When the conductor is parallel to the magnetic field ($\\theta = 0^\\circ \\implies \\sin 0^\\circ = 0$).",
          "• **Fleming's Left-Hand Rule (Electric Motors)**: Stretch the thumb, forefinger, and centre finger of your left hand mutually perpendicular to one another:",
          "  - **Forefinger** $\\to$ Direction of Magnetic Field (\\vec{B}).",
          "  - **Centre finger** $\\to$ Direction of Current ($I$).",
          "  - **Thumb** $\\to$ Direction of Motion / Force (\\vec{F}) acting on the conductor.",
          "  *(Mnemonic: **F-B-I** — Force, Field, Current; or Father, Mother, Child).*",
          "• **Electric Motor**: A rotating device that converts electrical energy into mechanical energy using Fleming's left-hand rule. Operates on the torque experienced by a rectangular coil in a magnetic field."
        ]
      },
      {
        "title": "Domestic Electric Circuits & Electrical Safety Protocols",
        "points": [
          "**Mains Supply Specifications in India**:",
          "• Potential difference: **220 V** AC.",
          "• Alternating Current (AC) frequency: **50 Hz** (current reverses direction every $1/100\\text{ s}$, completing 50 full cycles/second).",
          "**Three-Wire Supply Cable**:",
          "1. **Live Wire (Phase)**: Red or brown insulation; maintains a potential of $+220\\text{ V}$.",
          "2. **Neutral Wire**: Black or light blue insulation; maintained at zero potential ($0\\text{ V}$).",
          "3. **Earth Wire**: Green or yellow insulation; safety grounding wire connected to a metal plate buried deep in the earth near the building.",
          "**Two Domestic Circuit Ratings**:",
          "• **15 A Power Circuit**: For high-power heating and cooling appliances (geysers, air conditioners, refrigerators).",
          "• **5 A Lighting Circuit**: For low-power appliances (fans, LED bulbs, computers).",
          "**Function of the Earth Wire (Vital Safety Protocol)**:",
          "• The earth wire is securely bonded to the metallic casing of electrical appliances (electric iron, refrigerator, washing machine).",
          "• If live wire insulation fails and contacts the metal casing, current immediately flows through the low-resistance earth wire directly into the ground rather than through a user's body.",
          "• This surge of current trips the circuit breaker (MCB) or blows the fuse, preventing fatal electric shocks.",
          "**Overloading vs Short-Circuiting**:",
          "• **Short-Circuiting**: Occurs when the live wire comes into direct electrical contact with the neutral wire (due to damaged insulation or appliance fault). Circuit resistance plunges to near zero, causing a massive current surge that can spark electrical fires.",
          "• **Overloading**: Occurs when too many high-power appliances are switched on simultaneously on a single circuit socket, or when supply voltage fluctuates excessively, exceeding the cable's safe current-carrying capacity."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. A positively charged alpha-particle projected towards the west is deflected towards the north by a magnetic field. The direction of the magnetic field is: (A) Towards south (B) Towards east (C) Downward (D) Upward",
          "2. According to Fleming's Left-Hand Rule, the forefinger, centre finger, and thumb represent respectively: (A) Magnetic Field, Electric Current, Force (Motion) (B) Electric Current, Magnetic Field, Force (C) Force, Magnetic Field, Current (D) Motion, Induced Current, Field",
          "3. The magnetic field inside a long straight current-carrying solenoid is: (A) Zero at the centre (B) Decreases as we move towards its ends (C) Increases as we move towards its ends (D) The same at all points (uniform)",
          "4. What is the fundamental function of the green/yellow earth wire connected to the metallic casing of domestic appliances? (A) Completes the neutral circuit (B) Provides low-resistance path to ground, preventing fatal electric shocks during insulation faults (C) Regulates voltage fluctuations in the live wire (D) Enhances electrical energy conservation",
          "5. In India, AC mains power alternates direction at a frequency of 50 Hz. How many times does the current reverse its direction in one second? (A) 50 times (B) 100 times (C) 25 times (D) 200 times"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Magnetic Field Line",
        "meaning": "Imaginary continuous closed curve whose tangent points along the local magnetic field vector."
      },
      {
        "term": "Right-Hand Thumb Rule",
        "meaning": "Mnemonic rule mapping thumb along current to curled fingers encircling magnetic field."
      },
      {
        "term": "Solenoid",
        "meaning": "Helical coil of insulated wire generating a uniform internal magnetic field when energised."
      },
      {
        "term": "Electromagnet",
        "meaning": "Temporary strong magnet produced by energising a solenoid with a soft iron core."
      },
      {
        "term": "Fleming's Left-Hand Rule",
        "meaning": "Mutual perpendicular rule linking Field, Current, and resulting mechanical Force."
      },
      {
        "term": "Earth Wire",
        "meaning": "Low-resistance safety grounding wire bonded to metallic appliance housings."
      },
      {
        "term": "Short-Circuit",
        "meaning": "Direct low-resistance contact between live and neutral wires causing extreme current surges."
      }
    ],
    "examTips": [
      "Magnetic field lines never intersect; if they did, a compass at the intersection would point in two directions simultaneously.",
      "Use Fleming's Left-Hand Rule for electric motors (Forefinger = Field, Centre = Current, Thumb = Force/Motion).",
      "The earth wire is a safety feature bonded to metallic appliance housings to direct leakage currents safely to ground, tripping the fuse."
    ]
  },
  {
    "id": "note10-13",
    "classLevel": 10,
    "chapterNo": 13,
    "title": "Our Environment",
    "unit": "Unit 5 · Natural Resources",
    "overview": "The biosphere is a fragile web of ecological interdependencies. This chapter covers ecosystems (biotic and abiotic components), food chains and food webs, trophic levels, Lindeman's 10% law of unidirectional energy transfer, biological magnification of toxic pesticides, stratospheric ozone formation and CFC-induced depletion, and solid waste management (biodegradable vs non-biodegradable wastes).",
    "diagram": "food-chain",
    "sections": [
      {
        "title": "Ecosystem Architecture: Biotic & Abiotic Components",
        "points": [
          "**Ecosystem**: A structural and functional ecological unit where living organisms (biotic community) interact continuously with each other and with their physical non-living environment (abiotic components).",
          "• **Types of Ecosystems**:",
          "  - Natural: Aquatic (oceans, freshwater lakes, ponds, rivers) and Terrestrial (forests, grasslands, deserts).",
          "  - Artificial (Man-made): Crop fields, aquariums, botanical gardens, zoos.",
          "• **Abiotic Components**: Non-living physical and chemical factors: sunlight, temperature, rainfall, humidity, wind, soil minerals, and water pH.",
          "• **Biotic Components (Classified by Nutritional Roles)**:",
          "  1. **Producers (Autotrophs)**: Green plants and photosynthetic cyanobacteria. Convert solar radiant energy into chemical food energy via photosynthesis.",
          "  2. **Consumers (Heterotrophs)**: Depend directly or indirectly on producers:",
          "     - Primary Consumers (**Herbivores**): Feed directly on plants (deer, rabbits, cattle, zooplankton).",
          "     - Secondary Consumers (**Small Carnivores**): Feed on primary consumers (frogs, foxes, small fish).",
          "     - Tertiary / Quaternary Consumers (**Top Carnivores**): Apex predators not preyed upon by others (lions, tigers, eagles).",
          "     - Omnivores: Feed on both plants and animals (humans, crows, bears).",
          "  3. **Decomposers (Saprotrophs)**: Microorganisms (bacteria and fungi) that break down complex dead organic remains and metabolic wastes into simple inorganic substances that return to soil and water. Decomposers prevent ecological choking and sustain global nutrient recycling."
        ]
      },
      {
        "title": "Food Chains, Trophic Levels & Lindeman's 10% Energy Law",
        "points": [
          "**Food Chain**: A linear sequential pathway of organisms through which food energy is transferred as one organism consumes another.",
          "• Terrestrial Example: Grass (Producer) → Deer (Herbivore) → Tiger (Top Carnivore).",
          "• Aquatic Example: Phytoplankton → Zooplankton → Small Fish → Large Fish / Bird.",
          "**Trophic Levels**: Distinct feeding steps or transfer links in a food chain:",
          "• First Trophic Level ($T_1$): Producers.",
          "• Second Trophic Level ($T_2$): Primary consumers (Herbivores).",
          "• Third Trophic Level ($T_3$): Secondary consumers (Carnivores).",
          "• Fourth Trophic Level ($T_4$): Tertiary consumers (Top carnivores).",
          "**Lindeman's 10% Law of Energy Transfer (Raymond Lindeman, 1942)**:",
          "• Green plants capture only about **1% of total incident solar energy** falling on their foliage and convert it into chemical food energy.",
          "• When herbivores consume producers, an average of only **10% of the energy** entering that trophic level is stored as biomass available to the next trophic level.",
          "• The remaining **90% of energy is lost** as metabolic heat to the environment during life processes (cellular respiration, digestion, movement, growth, reproduction).",
          "• **Ecological Ramifications**:",
          "  1. **Unidirectional Flow of Energy**: Energy captured from sunlight cannot revert back to the Sun; energy moving to herbivores cannot return to producers.",
          "  2. **Food Chain Length Limitation**: Energy diminishes exponentially at each transfer step. After 3 to 4 trophic levels, residual energy is insufficient to support viable predator populations. Hence, food chains rarely exceed 4 or 5 steps.",
          "  3. **Pyramid of Energy**: Always upright because usable energy decreases progressively up the trophic ladder."
        ],
        "formula": [
          "Energy Transfer Law: E_{n+1} = 0.10 \\times E_n",
          "Solar Capture: E_{\\text{producers}} \\approx 0.01 \\times E_{\\text{solar}}"
        ]
      },
      {
        "title": "Food Webs & Biological Magnification (Biomagnification)",
        "points": [
          "**Food Web**: In natural ecosystems, feeding relationships are rarely isolated linear chains. Instead, individual organisms feed on multiple species and are preyed upon by diverse predators. These interconnected food chains form a branching ecological network called a **food web**.",
          "• **Significance**: Imparts stability to the ecosystem. If one prey population crashes due to disease, predators can switch to alternative prey species.",
          "**Biological Magnification (Biomagnification)**:",
          "• The progressive increase in the concentration of non-biodegradable toxic synthetic chemicals (e.g., DDT, organochlorine pesticides, mercury, cadmium) at successive trophic levels of a food chain.",
          "• **Mechanism**:",
          "  1. Non-biodegradable pesticides applied to crops wash into soil and water bodies.",
          "  2. Absorbed by aquatic plants / phytoplankton along with water and minerals.",
          "  3. Herbivores consume vast quantities of plants, concentrating the toxin in their fatty tissues because it cannot be metabolised or excreted.",
          "  4. Carnivores consume multiple herbivores, further concentrating the toxin.",
          "  5. Humans and apex carnivores occupy the **highest trophic level** and therefore accumulate the **maximum concentration of toxic chemicals**, causing neurological disorders, endocrine disruption, and cancer."
        ]
      },
      {
        "title": "Stratospheric Ozone Depletion & The Montreal Protocol",
        "points": [
          "**Ozone Molecule (\\text{O}_3)**: A deadly poison at ground level, but performs an indispensable protective role in the stratosphere (15–30 km altitude).",
          "• **Protective Shield Function**: The ozone layer absorbs high-energy **ultraviolet (UV) radiation** emitted by the Sun (specifically UV-B), shielding terrestrial life from severe biological damage (skin cancer, cataracts, immune suppression in humans, and damage to crops and phytoplankton).",
          "• **Photochemical Formation of Ozone**:",
          "  1. High-energy UV radiation splits molecular oxygen into free reactive nascent oxygen atoms:",
          "     $$\\text{O}_2 \\xrightarrow{\\text{UV}} \\text{O} + \\text{O}$$",
          "  2. Nascent oxygen atom combines with molecular oxygen to form ozone:",
          "     $$\\text{O} + \\text{O}_2 \\to \\text{O}_3$$",
          "• **Ozone Depletion Mechanism**:",
          "  - Synthetic chemicals called **Chlorofluorocarbons (CFCs)**, widely used as non-toxic refrigerants, fire extinguishers, and aerosol propellants, diffuse into the stratosphere.",
          "  - Stratospheric UV radiation cleaves CFCs, releasing highly reactive **free chlorine atoms** ($\\text{Cl}^\\bullet$).",
          "  - A single free chlorine radical catalytically destroys over $100,000$ ozone molecules via a chain reaction: $\\text{Cl} + \\text{O}_3 \\to \\text{ClO} + \\text{O}_2$; $\\text{ClO} + \\text{O} \\to \\text{Cl} + \\text{O}_2$.",
          "• **The Montreal Protocol (1987)**: International treaty sponsored by the United Nations Environment Programme (UNEP) that froze CFC production at 1986 levels and mandated the transition to ozone-safe hydrofluorocarbons (HFCs)."
        ]
      },
      {
        "title": "Solid Waste Management: Biodegradable vs Non-Biodegradable",
        "points": [
          "Human lifestyle improvements have generated enormous volumes of domestic and industrial solid wastes:",
          "• **Biodegradable Wastes**: Substances that can be decomposed and broken down into non-toxic simpler constituents by the biological activity of decomposer saprophytes (bacteria and fungi) over time (e.g., fruit and vegetable peels, paper, cattle dung, cotton, sewage). Enzymatic action is specific: specific enzymes break specific chemical bonds.",
          "• **Non-Biodegradable Wastes**: Substances that cannot be broken down by biological catalysts (enzymes) due to synthetic covalent structures. They persist inertly in the environment for centuries (e.g., plastics, polythene bags, nylon, glass bottles, heavy metals, radioactive wastes).",
          "• **Environmental Hazards of Non-Biodegradables**:",
          "  - Clogging of urban sewage drains causing water-logging and epidemics.",
          "  - Release of carcinogenic dioxins when plastics are burnt openly.",
          "  - Ingestion by stray cattle leading to fatal intestinal blockage.",
          "  - Leaching of toxic plasticisers into groundwater from unlined landfills.",
          "• **Modern Scientific Waste Disposal Strategies**:",
          "  1. **Source Segregation**: Separating green bins (biodegradable wet waste) and blue bins (dry recyclable waste).",
          "  2. **Biogas & Composting**: Decomposing wet organic kitchen and agricultural waste in anaerobic digesters yielding clean methane fuel and rich compost.",
          "  3. **Incineration**: High-temperature burning of infectious hospital and biomedical wastes in closed incinerators, converting hazardous organic materials into harmless ash.",
          "  4. **Recycling**: Reprocessing discarded plastics, glass, paper, and metal cans into new commodities.",
          "  5. **Sanitary Landfills**: Waste packed into engineered clay-lined pits covered with soil layers to prevent environmental contamination."
        ]
      },
      {
        "title": "Practice Questions (MCQs)",
        "points": [
          "1. If 20,000 Joules of solar energy falls on green foliage, how much energy is transferred to the primary carnivores (third trophic level) in that food chain? (A) 20,000 J (B) 2,000 J (C) 20 J (D) 2 J",
          "2. The progressive accumulation and increase in concentration of non-biodegradable toxic pesticides like DDT across successive trophic levels is called: (A) Eutrophication (B) Biological magnification (Biomagnification) (C) Bioremediation (D) Thermal pollution",
          "3. In the stratosphere, ozone (O₃) is formed photochemically by the action of: (A) Infrared rays on carbon dioxide (B) Ultraviolet radiation splitting molecular oxygen into nascent oxygen atoms (C) Cosmic rays on nitrogen oxides (D) Solar wind on chlorofluorocarbons",
          "4. In 1987, which landmark global international agreement was forged under UNEP to freeze the production of ozone-depleting CFCs? (A) Kyoto Protocol (B) Paris Climate Accord (C) Montreal Protocol (D) Geneva Convention",
          "5. Which of the following groups of materials contains only non-biodegradable items? (A) Wood, paper, leather (B) Polythene bag, PVC pipe, bakelite switch (C) Plastic cup, banana peel, cotton shirt (D) Grass clippings, plastic straw, bread crust"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Ecosystem",
        "meaning": "Self-sustaining ecological unit of interacting biotic communities and abiotic environment."
      },
      {
        "term": "Trophic Level",
        "meaning": "Specific functional tier occupied by an organism within a feeding food chain."
      },
      {
        "term": "10% Law",
        "meaning": "Principle that on average only 10% of chemical energy transfers to the next trophic level."
      },
      {
        "term": "Biomagnification",
        "meaning": "Progressive bioaccumulation of persistent non-biodegradable toxins up the food web."
      },
      {
        "term": "Ozone (O₃)",
        "meaning": "Stratospheric triatomic oxygen allotrope absorbing deleterious solar UV radiation."
      },
      {
        "term": "CFCs",
        "meaning": "Synthetic chlorofluorocarbon compounds releasing ozone-destroying free chlorine radicals."
      },
      {
        "term": "Incineration",
        "meaning": "Controlled high-temperature thermal disposal of infectious hospital and biomedical waste."
      }
    ],
    "examTips": [
      "By Lindeman's 10% law, only 10% of energy is transferred to the next trophic level; food chains rarely exceed 4–5 levels.",
      "Biological magnification is highest at the top trophic level (apex predators and humans) because toxins cannot be metabolised or excreted.",
      "CFCs release free chlorine radicals in the stratosphere, catalytically destroying the protective ozone (O₃) layer."
    ]
  }
];
