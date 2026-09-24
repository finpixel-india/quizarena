import type { ChapterNote } from "./types";

const U1 = "Unit 1 · Chemical Substances";
const U2 = "Unit 2 · World of Living";
const U3 = "Unit 3 · Natural Phenomena";
const U4 = "Unit 4 · Effects of Current";
const U5 = "Unit 5 · Natural Resources";

export const notes10: ChapterNote[] = [
  {
    id: "note10-1",
    classLevel: 10,
    chapterNo: 1,
    title: "Chemical Reactions and Equations",
    unit: U1,
    overview:
      "A chemical reaction forms new substances with new properties. This chapter teaches how to write and balance equations and the main types of reactions.",
    diagram: "reaction-types",
    sections: [
      {
        title: "Chemical reactions and how we recognise them",
        points: [
          "A **chemical reaction** is a change in which one or more new substances with new properties are formed.",
          "Signs: change in **state, colour, temperature**, evolution of a **gas**, formation of a **precipitate**.",
          "**Reactants** are written on the left and **products** on the right of an arrow (→). The arrow shows the direction of the reaction.",
          "Examples: burning of magnesium ribbon, souring of milk, rusting of iron, respiration, digestion of food.",
        ],
      },
      {
        title: "Balancing chemical equations",
        points: [
          "A balanced equation has the **same number of atoms of each element** on both sides — it obeys the law of conservation of mass.",
          "**Skeletal equation:** unbalanced form, e.g. Mg + O₂ → MgO.",
          "**Balanced equation:** 2Mg + O₂ → 2MgO.",
          "Balancing is done by the **hit-and-trial method**: start with the compound having the maximum number of atoms.",
          "State symbols are written for clarity: (s) solid, (l) liquid, (g) gas, (aq) aqueous solution, and conditions like heat (Δ) or light are written above the arrow.",
        ],
        tip: "Never change the subscripts of a formula while balancing — only the coefficients in front of the formulae may be changed.",
      },
      {
        title: "Types of chemical reactions",
        table: {
          head: ["Type", "What happens", "Example"],
          rows: [
            ["Combination", "Two or more reactants form a single product", "CaO + H₂O → Ca(OH)₂ + heat; 2Mg + O₂ → 2MgO"],
            ["Decomposition", "One compound breaks into simpler substances", "2FeSO₄ → Fe₂O₃ + SO₂ + SO₃ (thermal), 2AgCl → 2Ag + Cl₂ (photolytic), 2H₂O → 2H₂ + O₂ (electrolytic)"],
            ["Displacement", "A more reactive element displaces a less reactive one", "Fe + CuSO₄ → FeSO₄ + Cu"],
            ["Double displacement", "Ions are exchanged between two compounds", "Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl"],
            ["Exothermic", "Heat is released", "Burning of natural gas, respiration, CaO + H₂O"],
            ["Endothermic", "Heat is absorbed", "Decomposition of calcium carbonate, photosynthesis"],
            ["Redox", "Oxidation and reduction occur together", "ZnO + C → Zn + CO"],
          ],
        },
      },
      {
        title: "Oxidation, reduction and redox",
        points: [
          "**Oxidation** is the gain of oxygen or loss of hydrogen/electrons; **reduction** is the loss of oxygen or gain of hydrogen/electrons.",
          "In a **redox** reaction one substance is oxidised and another is reduced at the same time.",
          "Example: CuO + H₂ → Cu + H₂O — CuO is reduced and H₂ is oxidised.",
          "The substance that gives oxygen is the **oxidising agent**; the one that removes oxygen is the **reducing agent**.",
        ],
      },
      {
        title: "Effects of oxidation in everyday life",
        points: [
          "**Corrosion:** a metal is attacked by moisture, air, acids and chemicals — rusting of iron, green coating on copper, black coating on silver.",
          "Rusting needs both **air (oxygen) and moisture**; it is prevented by painting, oiling, galvanisation and alloying.",
          "**Rancidity:** fats and oils in food get oxidised and their smell and taste change.",
          "Rancidity is prevented by adding **antioxidants**, keeping food in **airtight containers**, refrigeration, and flushing packets with **nitrogen** (as in chips packets).",
        ],
      },
    ],
    keyTerms: [
      { term: "Chemical equation", meaning: "Symbolic representation of a chemical reaction using formulae." },
      { term: "Balanced equation", meaning: "Equation with an equal number of atoms of each element on both sides." },
      { term: "Combination reaction", meaning: "Two or more reactants combine to form a single product." },
      { term: "Decomposition reaction", meaning: "A single compound breaks down into two or more simpler substances." },
      { term: "Displacement reaction", meaning: "A more reactive element displaces a less reactive element from its compound." },
      { term: "Double displacement", meaning: "Reaction in which ions of two compounds are exchanged." },
      { term: "Oxidation / Reduction", meaning: "Gain of oxygen / loss of oxygen (also electron transfer)." },
      { term: "Rancidity", meaning: "Change in smell and taste of fats and oils due to oxidation." },
    ],
    examTips: [
      "Balancing an equation is a guaranteed 1–2 mark question: count atoms element by element, and check at the end.",
      "For decomposition, mention the **form of energy** used (heat, light, electricity) — that is where marks are given.",
      "Learn two prevention methods each for corrosion and rancidity with reasons.",
    ],
  },
  {
    id: "note10-2",
    classLevel: 10,
    chapterNo: 2,
    title: "Acids, Bases and Salts",
    unit: U1,
    overview:
      "Acids are sour, bases are bitter and soapy, and their reaction gives salts and water. This chapter covers indicators, the pH scale, and important salts used in daily life.",
    diagram: "ph-scale",
    sections: [
      {
        title: "Acids and bases — how to identify them",
        points: [
          "**Acids** are sour in taste and turn **blue litmus red**; examples: HCl, H₂SO₄, HNO₃, citric acid (lemon), acetic acid (vinegar), lactic acid (curd), oxalic acid (tomato).",
          "**Bases** are bitter, soapy to touch, and turn **red litmus blue**; bases soluble in water are **alkalis** — NaOH, KOH, Ca(OH)₂, NH₄OH.",
          "**Indicators** tell us whether a solution is acidic or basic: litmus, methyl orange (red in acid, yellow in base), phenolphthalein (colourless in acid, **pink** in base).",
          "**Olfactory indicators** change smell — onion, vanilla essence, clove oil.",
          "Acids give **H⁺ (H₃O⁺)** ions in water; bases give **OH⁻** ions. This is the basis of the Arrhenius definition.",
        ],
      },
      {
        title: "Reactions of acids and bases",
        points: [
          "**Acid + Metal → Salt + Hydrogen gas** (the gas burns with a pop sound): Zn + H₂SO₄ → ZnSO₄ + H₂.",
          "**Acid + Metal carbonate / hydrogencarbonate → Salt + Water + CO₂** (lime water turns milky with CO₂).",
          "**Acid + Base → Salt + Water** — this is **neutralisation**; heat is released.",
          "**Acid + Metal oxide → Salt + Water**: CuO + HCl → CuCl₂ + H₂O.",
          "**Base + Non-metal oxide → Salt + Water**: CO₂ + 2NaOH → Na₂CO₃ + H₂O.",
        ],
        formula: ["Neutralisation: Acid + Base → Salt + Water + heat"],
      },
      {
        title: "The pH scale",
        points: [
          "pH measures how acidic or basic a solution is: pH < 7 acidic, pH = 7 **neutral**, pH > 7 basic.",
          "The scale runs from 0 to 14; the lower the pH the more acidic, the higher the pH the more basic.",
          "**pH paper (universal indicator)** gives the approximate pH; a pH meter gives a more exact value.",
          "Strong acids have pH 0–3 (HCl, H₂SO₄); strong bases have pH 11–14 (NaOH, KOH).",
        ],
      },
      {
        title: "Importance of pH in everyday life",
        points: [
          "**Tooth decay** starts when the pH of the mouth falls below **5.5**; brushing with a basic toothpaste neutralises the acid formed from sugar.",
          "**Acid rain** has pH less than 5.6; it is harmful for crops, buildings and aquatic life.",
          "**Stomach acidity:** HCl helps digest food; excess acid causes indigestion — treated with **antacids (mild bases)** such as milk of magnesia.",
          "**Plants and animals** survive only in a narrow pH range; aquatic life is harmed if water becomes too acidic or too basic.",
          "Bee and ant stings inject acid — applying a mild base such as baking soda reduces the pain; a nettle sting is treated with a mild acid.",
        ],
      },
      {
        title: "Important salts and chemicals",
        table: {
          head: ["Name", "Formula", "Use"],
          rows: [
            ["Bleaching powder", "CaOCl₂", "Disinfecting drinking water, bleaching cotton and linen"],
            ["Baking soda", "NaHCO₃", "Baking (releases CO₂), antacid, fire extinguisher"],
            ["Washing soda", "Na₂CO₃·10H₂O", "Cleaning, softening hard water, glass, soap and paper industry"],
            ["Plaster of Paris", "CaSO₄·½H₂O", "Setting fractured bones, making toys, decorative moulds"],
            ["Common salt", "NaCl", "Raw material for NaOH, Cl₂, H₂, HCl and baking soda"],
            ["Chlor-alkali products", "NaOH, Cl₂, H₂", "Soap and detergents, water treatment, PVC, fuels"],
          ],
        },
      },
      {
        title: "Preparation reactions to remember",
        points: [
          "Bleaching powder: **Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O**.",
          "Baking soda: **NaCl + H₂O + CO₂ + NH₃ → NH₄Cl + NaHCO₃**.",
          "Washing soda: heating baking soda gives Na₂CO₃, which on recrystallisation gives **Na₂CO₃·10H₂O**.",
          "Plaster of Paris: heating gypsum, **CaSO₄·2H₂O → CaSO₄·½H₂O** at 373 K.",
          "Chlor-alkali process: **2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂** (electrolysis of brine).",
        ],
        tip: "**Water of crystallisation** is the fixed number of water molecules present in one formula unit of a salt — 10 in washing soda, 5 in blue vitriol (CuSO₄·5H₂O), ½ in Plaster of Paris.",
      },
      {
        title: "Salts and their nature",
        points: [
          "A salt formed from a strong acid and a strong base is **neutral** (NaCl, pH 7).",
          "From a strong acid and weak base it is **acidic** (NH₄Cl); from a weak acid and strong base it is **basic** (CH₃COONa).",
          "**Family of salts:** Na₂SO₄ and K₂SO₄ are salts of sulphuric acid; NaCl and KCl are chlorides.",
          "**Are crystals of salts really dry?** Copper sulphate turns white on heating as it loses its water of crystallisation and returns to blue when water is added.",
        ],
      },
    ],
    keyTerms: [
      { term: "Indicator", meaning: "Substance that changes colour or smell in acidic or basic solution." },
      { term: "Alkali", meaning: "A base that dissolves in water, e.g. NaOH." },
      { term: "Neutralisation", meaning: "Reaction of an acid with a base to give salt and water." },
      { term: "pH scale", meaning: "0–14 scale measuring the acidity or basicity of a solution." },
      { term: "Water of crystallisation", meaning: "Fixed number of water molecules in one formula unit of a salt." },
      { term: "Antacid", meaning: "A mild base taken to neutralise excess stomach acid." },
      { term: "Chlor-alkali process", meaning: "Electrolysis of brine to give NaOH, Cl₂ and H₂." },
    ],
    examTips: [
      "Learn the four preparations (bleaching powder, baking soda, washing soda, Plaster of Paris) with balanced equations.",
      "pH-based reasoning questions always want: the value, whether acidic/basic, and one everyday consequence.",
      "Write chemical names along with common names — both are accepted, but the formula must be correct.",
    ],
  },
  {
    id: "note10-3",
    classLevel: 10,
    chapterNo: 3,
    title: "Metals and Non-metals",
    unit: U1,
    overview:
      "Metals and non-metals differ in physical and chemical properties. This chapter covers the reactivity series, ionic bonding, metallurgy and corrosion.",
    diagram: "reactivity-series",
    sections: [
      {
        title: "Physical properties",
        table: {
          head: ["Property", "Metals", "Non-metals"],
          rows: [
            ["Lustre", "Shiny (can be polished)", "Not shiny (iodine is an exception)"],
            ["Hardness", "Generally hard (Na, K soft)", "Generally soft (diamond is very hard)"],
            ["Malleability & ductility", "Can be beaten into sheets and drawn into wires", "Brittle, not malleable or ductile"],
            ["Conductivity", "Good conductors of heat and electricity (best: silver and copper)", "Poor conductors (graphite is a good conductor)"],
            ["Melting & boiling point", "Generally high (mercury is liquid at room temperature)", "Generally low (bromine is liquid; carbon, silicon high)"],
            ["Density", "Generally high", "Generally low"],
            ["Sonority", "Sonorous (ring when struck)", "Not sonorous"],
          ],
        },
      },
      {
        title: "Chemical properties of metals",
        points: [
          "**With oxygen:** metals form basic oxides; Na and K catch fire, so they are stored in kerosene. Amphoteric oxides such as Al₂O₃ and ZnO react with both acids and bases.",
          "**With water:** K, Na and Ca react with cold water; Mg reacts with hot water; Zn, Fe, Al react with steam; Pb, Cu, Ag, Au do not react.",
          "**With dilute acids:** metals above hydrogen in the reactivity series displace hydrogen from dilute acids; copper, silver and gold do not.",
          "**Displacement:** a more reactive metal displaces a less reactive metal from its salt solution — Fe + CuSO₄ → FeSO₄ + Cu.",
        ],
        formula: ["Metal + Oxygen → Metal oxide (basic)", "Metal + Acid → Salt + Hydrogen"],
      },
      {
        title: "The reactivity (activity) series",
        points: [
          "Order of decreasing reactivity: **K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Hg > Ag > Au**.",
          "Metals above hydrogen displace hydrogen from dilute acids; metals below it do not.",
          "Metals at the top are obtained by **electrolysis**, middle ones by **reduction with carbon**, and the least reactive occur in the **free (native) state**.",
        ],
        tip: "Remember the series as: **K**indly **Na**tional **Ca**pital **Mg**ives **Al**l **Zn**ebras **Fe**rrous **Pb**, but **H**appy **Cu**stomers **Hg**ave **Ag**old **Au**dience.",
      },
      {
        title: "Ionic (electrovalent) compounds",
        points: [
          "Metals lose electrons to form **cations**; non-metals gain electrons to form **anions**; the oppositely charged ions attract and form an **ionic bond**.",
          "Example: Na → Na⁺ + e⁻ ; Cl + e⁻ → Cl⁻ ; Na⁺ + Cl⁻ → NaCl.",
          "Ionic compounds have **high melting and boiling points**, are **soluble in water**, conduct electricity in molten or aqueous state, and are generally **brittle**.",
          "The strong electrostatic force between ions explains the high melting points; free ions in solution or melt conduct electricity.",
        ],
      },
      {
        title: "Occurrence of metals and metallurgy",
        points: [
          "Elements occur in the Earth's crust as **minerals**; a mineral from which a metal can be extracted profitably is an **ore**.",
          "**Gangue** is the unwanted material (sand, clay, rock) mixed with the ore.",
          "Steps of metallurgy: **concentration of ore → extraction of metal → refining (purification)**.",
          "**Roasting** heats a sulphide ore strongly in the presence of air; **calcination** heats a carbonate ore in limited air.",
          "**Reduction:** metal oxides are reduced to metals using carbon, or by more reactive metals (thermite reaction: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + heat).",
          "**Refining:** electrolytic refining gives very pure metal — impure metal is the anode, pure metal the cathode, and a salt solution of the metal is the electrolyte.",
        ],
      },
      {
        title: "Non-metals and their reactions",
        points: [
          "Non-metals form **acidic or neutral oxides** (CO₂, SO₂, NO₂ are acidic); some do not react with acids.",
          "Non-metals react with hydrogen to form **covalent hydrides** (HCl, H₂O, NH₃, CH₄).",
          "**Chlorine** is more reactive than carbon, so it displaces carbon from carbon disulphide; hydrogen displaces copper from copper oxide.",
          "**Carbon**: diamond (hardest natural substance) and graphite (good conductor, soft and slippery, used as a lubricant).",
          "**Iodine**: lustrous non-metal; **bromine**: liquid non-metal; **white phosphorus**: stored under water as it catches fire in air.",
        ],
      },
      {
        title: "Corrosion and prevention",
        points: [
          "**Corrosion** is the eating away of the surface of a metal by moisture, air, acids or other chemicals; rusting of iron requires both **air and moisture**.",
          "Prevention: **painting, oiling, greasing, galvanisation (zinc coating), anodising and alloying (stainless steel)**.",
          "**Alloys:** brass = copper + zinc; bronze = copper + tin; solder = lead + tin (low melting point, used to weld wires); stainless steel = iron + nickel + chromium.",
          "Alloying changes the properties: it improves hardness, strength or resistance to corrosion.",
        ],
      },
    ],
    keyTerms: [
      { term: "Malleability", meaning: "Ability of a metal to be beaten into thin sheets." },
      { term: "Ductility", meaning: "Ability of a metal to be drawn into thin wires." },
      { term: "Ore", meaning: "A mineral from which a metal can be extracted profitably." },
      { term: "Gangue", meaning: "Unwanted impurities such as sand and clay present in an ore." },
      { term: "Roasting / Calcination", meaning: "Heating a sulphide ore in air / heating a carbonate ore in limited air." },
      { term: "Thermite reaction", meaning: "Reduction of iron oxide with aluminium, producing molten iron to join rails." },
      { term: "Anode", meaning: "In electrolytic refining, the impure metal slab acting as the positive electrode." },
      { term: "Amphoteric oxide", meaning: "An oxide that reacts with both acids and bases, e.g. Al₂O₃, ZnO." },
      { term: "Galvanisation", meaning: "Coating iron or steel with a thin layer of zinc to prevent rusting." },
    ],
    examTips: [
      "Learn the reactivity series in order with its memory trick — displacement questions depend on it.",
      "For ionic compound properties, link every property back to the strong electrostatic force between ions.",
      "Write metallurgy answers step by step with the chemical equation of roasting/calcination and reduction.",
    ],
  },
  {
    id: "note10-4",
    classLevel: 10,
    chapterNo: 4,
    title: "Carbon and its Compounds",
    unit: U1,
    overview:
      "Carbon forms a vast number of compounds because of catenation and tetravalency. This chapter covers covalent bonding, homologous series, functional groups and important carbon compounds.",
    diagram: "carbon-bonds",
    sections: [
      {
        title: "Why carbon is special",
        points: [
          "Carbon has **4 valence electrons** — it is **tetravalent** and forms four bonds.",
          "It shows **catenation**: the ability to bond with other carbon atoms forming long chains and rings.",
          "Because of these two properties, more than **three million** carbon compounds are known.",
          "Carbon is a small atom, so the bonds it forms are strong and the compounds are stable.",
        ],
      },
      {
        title: "Covalent bonding",
        points: [
          "Carbon shares electrons with other atoms to attain a noble-gas configuration, forming **covalent bonds**.",
          "Covalent compounds have **low melting and boiling points**, are generally **poor conductors**, and are mostly **insoluble in water** but soluble in organic solvents.",
          "Examples: H₂, Cl₂, O₂, N₂, CH₄, H₂O, NH₃, CO₂ — all formed by sharing electron pairs.",
          "Shared electron pairs can be single (**—**), double (**=**) or triple (**≡**): ethane (C–C), ethene (C=C), ethyne (C≡C).",
        ],
      },
      {
        title: "Hydrocarbons: saturated and unsaturated",
        table: {
          head: ["Class", "General formula", "Bond type", "Example"],
          rows: [
            ["Alkane (saturated)", "CₙH₂ₙ₊₂", "Only single bonds", "Methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀"],
            ["Alkene (unsaturated)", "CₙH₂ₙ", "At least one C=C", "Ethene C₂H₄, propene C₃H₆"],
            ["Alkyne (unsaturated)", "CₙH₂ₙ₋₂", "At least one C≡C", "Ethyne C₂H₂, propyne C₃H₄"],
            ["Cyclic", "varies", "Closed ring", "Cyclohexane C₆H₁₂, benzene C₆H₆"],
          ],
        },
        tip: "Unsaturated hydrocarbons burn with a **yellow smoky flame** and add hydrogen; saturated ones burn with a clean **blue flame**.",
      },
      {
        title: "Homologous series and functional groups",
        points: [
          "A **homologous series** is a family of compounds with the same functional group and similar chemical properties, in which successive members differ by one **–CH₂–** unit (mass 14 u).",
          "Members show a gradual change in physical properties and similar chemical properties.",
          "A **functional group** is an atom or group of atoms that gives a compound its characteristic chemical properties.",
        ],
        table: {
          head: ["Functional group", "Formula", "Families", "Example"],
          rows: [
            ["Alcohol", "–OH", "Alkanol", "Ethanol C₂H₅OH"],
            ["Aldehyde", "–CHO", "Alkanal", "Ethanal CH₃CHO"],
            ["Ketone", "–CO–", "Alkanone", "Propanone CH₃COCH₃"],
            ["Carboxylic acid", "–COOH", "Alkanoic acid", "Ethanoic acid CH₃COOH"],
            ["Halide", "–Cl, –Br", "Haloalkane", "Chloroethane C₂H₅Cl"],
          ],
        },
      },
      {
        title: "Nomenclature (IUPAC naming)",
        points: [
          "Prefix + word root + suffix describes a compound: number of C atoms (meth, eth, prop, but…) and the functional group.",
          "Saturated: –ane (propane); one double bond: –ene (propene); one triple bond: –yne (propyne); alcohol: –ol (propanol); acid: –oic acid (propanoic acid).",
          "Substituents such as –Cl are written as prefixes with their position number, e.g. 2-chloropropane.",
        ],
      },
      {
        title: "Important carbon compounds",
        points: [
          "**Ethanol (C₂H₅OH):** liquid at room temperature, soluble in water; formed by fermentation of sugar. It reacts with sodium to give sodium ethoxide and hydrogen, and on heating with excess conc. H₂SO₄ at 443 K gives ethene (dehydration).",
          "**Ethanoic acid (CH₃COOH):** also called **acetic acid**; a 5–8% solution in water is **vinegar**. It is a weak acid that partially ionises.",
          "Ethanoic acid + ethanol ⇌ ethyl ethanoate (a **sweet-smelling ester**) + water, in the presence of an acid catalyst — this is **esterification**.",
          "Ester + base (NaOH) → alcohol + sodium salt of the acid — this is **saponification**, used to make soap.",
          "**Soaps** are sodium/potassium salts of long-chain carboxylic acids; **detergents** are salts of sulphonic acids.",
        ],
      },
      {
        title: "Soaps, micelles and hard water",
        points: [
          "A soap molecule has a **hydrophilic (ionic) end** that dissolves in water and a **hydrophobic (hydrocarbon) end** that dissolves in oil or grease.",
          "In water, soap molecules arrange themselves into a **micelle** — the oily dirt is trapped inside and rinsed away.",
          "In **hard water** (which contains Ca²⁺ and Mg²⁺ salts), soap forms an insoluble **scum**, so it does not lather well. Detergents work in hard water as well.",
          "Soaps are biodegradable; detergents are generally non-biodegradable and cause water pollution.",
        ],
      },
    ],
    keyTerms: [
      { term: "Tetravalency", meaning: "Ability of carbon to form four covalent bonds." },
      { term: "Catenation", meaning: "Self-linking of carbon atoms to form long chains or rings." },
      { term: "Covalent bond", meaning: "Bond formed by sharing a pair of electrons." },
      { term: "Hydrocarbon", meaning: "Compound made only of carbon and hydrogen." },
      { term: "Isomer", meaning: "Compounds with the same molecular formula but different structures, e.g. butane and isobutane." },
      { term: "Homologous series", meaning: "Family of compounds with the same functional group differing by CH₂ units." },
      { term: "Functional group", meaning: "Atom or group giving a compound its chemical character, e.g. –OH, –COOH." },
      { term: "Esterification", meaning: "Reaction of an acid with an alcohol to form a sweet-smelling ester." },
      { term: "Micelle", meaning: "Cluster of soap molecules trapping oily dirt in water." },
    ],
    examTips: [
      "Learn to draw the electron-dot structures of H₂, O₂, N₂, H₂O, CH₄, CO₂, C₂H₆ — a very common question.",
      "Practise IUPAC naming for at least ten compounds including –ol and –oic acid suffixes.",
      "For soap questions, draw the micelle and label both ends of the soap molecule.",
    ],
  },
  {
    id: "note10-5",
    classLevel: 10,
    chapterNo: 5,
    title: "Life Processes",
    unit: U2,
    overview:
      "Life processes are the basic activities that maintain life: nutrition, respiration, transport and excretion. This chapter compares plant and human systems in detail.",
    diagram: "human-heart",
    sections: [
      {
        title: "Nutrition: autotrophic and heterotrophic",
        points: [
          "**Photosynthesis** uses CO₂ + water + sunlight + chlorophyll to make glucose, releasing oxygen.",
          "Steps: absorption of light by chlorophyll → conversion of light energy to chemical energy and splitting of water into hydrogen and oxygen → reduction of CO₂ into carbohydrates.",
          "The site is the **chloroplast**; the raw materials are taken in through **stomata** (CO₂) and **roots** (water and minerals).",
          "**Heterotrophs** depend on others: saprophytic (Rhizopus, yeast), parasitic (Cuscuta, ticks, lice) and holozoic (Amoeba, humans).",
          "Human **digestion**: mouth (salivary amylase digests starch) → stomach (HCl + pepsin digest protein) → small intestine (bile emulsifies fats, pancreatic and intestinal enzymes complete digestion) → absorption through **villi** → large intestine absorbs water.",
        ],
        formula: ["6CO₂ + 12H₂O --light/chlorophyll--> C₆H₁₂O₆ + 6O₂ + 6H₂O"],
      },
      {
        title: "Respiration",
        points: [
          "**Aerobic respiration:** glucose is broken down in the presence of oxygen into CO₂, water and a large amount of energy (in mitochondria).",
          "**Anaerobic respiration:** glucose breaks into ethanol + CO₂ + little energy in yeast (fermentation), and into lactic acid + little energy in our muscles during vigorous exercise.",
          "Glucose is first converted to **pyruvate** in the cytoplasm; pyruvate then enters mitochondria (aerobic) or is converted to lactic acid/ethanol.",
          "**Breathing** is the mechanical process of taking in oxygen and giving out CO₂ (through alveoli in lungs); respiration is the biochemical process inside cells.",
        ],
        formula: ["Glucose → pyruvate (cytoplasm)", "Pyruvate + O₂ → CO₂ + H₂O + energy (mitochondria)"],
      },
      {
        title: "Transport in plants",
        points: [
          "**Xylem** transports water and minerals upward from roots; **phloem** translocates food from leaves to storage and growing parts.",
          "Water movement: root hair → root cortex → xylem → stem → leaves → transpiration pull.",
          "**Transpiration** is the loss of water vapour from leaves; it creates a suction force that pulls water upward and helps in cooling the plant.",
          "**Translocation** in phloem is an energy-using (ATP) process; it is bi-directional.",
        ],
      },
      {
        title: "Transport in humans: heart and blood vessels",
        points: [
          "The human heart has **four chambers**: two atria (upper) and two ventricles (lower), preventing the mixing of oxygenated and deoxygenated blood — needed for efficient oxygen supply to a warm-blooded body.",
          "**Double circulation:** blood passes through the heart twice in one complete cycle — pulmonary circulation (heart ↔ lungs) and systemic circulation (heart ↔ body).",
          "**Arteries** carry blood away from the heart (thick, elastic walls); **veins** bring blood back (valves prevent backflow); **capillaries** are one-cell-thick and allow exchange of materials.",
          "**Blood** = plasma + RBC (transport oxygen with haemoglobin), WBC (fight infection) and platelets (clotting).",
          "**Lymph** is a colourless fluid that carries digested fats and drains into veins; it also helps in immunity.",
        ],
      },
      {
        title: "Excretion in humans and plants",
        points: [
          "The **kidneys** filter blood and remove urea, excess salts and water as urine; the **nephron** is the basic filtration unit.",
          "Path: blood → glomerulus (filtration) → Bowman's capsule → tubule (selective reabsorption of glucose, amino acids, salts and water) → collecting duct → ureter → urinary bladder → urethra.",
          "The liver converts harmful ammonia into **urea**; sweat glands also remove water, salts and urea.",
          "Plants remove waste by storing it in leaves that fall, in bark, in gums and resins, and by releasing CO₂ and water through stomata. **Kidney stones** are masses of crystallised salts such as calcium oxalate.",
        ],
      },
    ],
    keyTerms: [
      { term: "Photosynthesis", meaning: "Process by which green plants make food using light, CO₂ and water." },
      { term: "Stomata", meaning: "Tiny pores on leaves for gas exchange and transpiration." },
      { term: "Villi", meaning: "Finger-like projections of the small intestine that increase the absorptive surface." },
      { term: "Peristalsis", meaning: "Rhythmic contraction of the alimentary canal pushing food forward." },
      { term: "Double circulation", meaning: "Blood passing through the heart twice in one complete cycle." },
      { term: "Transpiration", meaning: "Loss of water vapour from the aerial parts of a plant." },
      { term: "Nephron", meaning: "Basic filtration unit of the kidney." },
      { term: "Anaerobic respiration", meaning: "Breakdown of glucose without oxygen, giving less energy." },
    ],
    examTips: [
      "Draw and label the heart, nephron and the alimentary canal — these three diagrams cover most long questions.",
      "Compare aerobic and anaerobic respiration and arteries and veins in tables.",
      "In heart answers, correctly identify the right side as the deoxygenated side and mention double circulation.",
    ],
  },
  {
    id: "note10-6",
    classLevel: 10,
    chapterNo: 6,
    title: "Control and Coordination",
    unit: U2,
    overview:
      "Animals use the nervous and endocrine systems for control and coordination, while plants use chemical coordination through hormones. This chapter explains reflexes, the brain and hormones.",
    diagram: "reflex-arc",
    sections: [
      {
        title: "Nervous tissue and the neuron",
        points: [
          "The nervous system is made of specialised cells called **neurons** (nerve cells), which carry information as electrical impulses.",
          "Structure: **cell body** (with nucleus) → **dendrites** (receive impulses) → **axon** (carries impulse away) → nerve endings at the synapse.",
          "Information travels as a chemical signal across the **synapse** between two neurons.",
        ],
      },
      {
        title: "Reflex action and reflex arc",
        points: [
          "A **reflex action** is a sudden, automatic response to a stimulus that does not involve thinking, e.g. withdrawing your hand from a hot object, blinking, sneezing.",
          "**Reflex arc** is the pathway: **receptor → sensory neuron → spinal cord (CNS) → motor neuron → effector (muscle/gland)**.",
          "Since the signal is processed in the **spinal cord**, the response is much faster than a brain-controlled response.",
        ],
      },
      {
        title: "Human nervous system",
        points: [
          "**CNS** = brain + spinal cord; **PNS** = cranial nerves + spinal nerves connecting the CNS to the body.",
          "**Cerebrum (forebrain):** the main thinking part; controls voluntary actions, memory, intelligence and the senses.",
          "**Cerebellum (hindbrain):** controls **posture, balance** and precision of voluntary actions.",
          "**Medulla (hindbrain):** controls **involuntary actions** such as blood pressure, salivation, vomiting, heartbeat and breathing.",
          "**Hypothalamus (forebrain):** controls hunger, thirst and body temperature.",
        ],
      },
      {
        title: "Hormones: chemical coordination",
        table: {
          head: ["Gland", "Hormone", "Function"],
          rows: [
            ["Pituitary", "Growth hormone, and hormones that control other glands", "Body growth and development; deficiency causes dwarfism, excess causes gigantism"],
            ["Thyroid", "Thyroxin", "Regulates carbohydrate, protein and fat metabolism; needs **iodine**; deficiency causes goitre"],
            ["Pancreas", "Insulin", "Lowers blood sugar; deficiency causes diabetes"],
            ["Adrenal", "Adrenaline", "Prepares the body for emergencies: faster heartbeat and breathing"],
            ["Testes (male)", "Testosterone", "Male reproductive development (puberty)"],
            ["Ovaries (female)", "Oestrogen / Progesterone", "Female reproductive development and the menstrual cycle"],
          ],
        },
        tip: "The **pituitary** is called the master gland because it also controls the secretions of other endocrine glands.",
      },
      {
        title: "Coordination in plants",
        points: [
          "Plants do not have a nervous system; they respond to stimuli by **growth** (tropic movements) or by quick changes in water content.",
          "**Phototropism** — growth towards light (shoots) or away from it (roots). **Geotropism** — growth in response to gravity (roots grow downward).",
          "**Hydrotropism** — movement of roots towards water; **chemotropism** — response to a chemical, e.g. pollen tube growing towards ovule.",
          "**Nastic movement** — non-directional, e.g. folding of the touch-me-not leaves caused by changes in water content of cells.",
          "**Plant hormones:** auxin (cell elongation, bending towards light), gibberellin (stem growth), cytokinin (cell division), abscisic acid (inhibits growth, promotes dormancy and wilting).",
        ],
      },
    ],
    keyTerms: [
      { term: "Neuron", meaning: "Structural and functional unit of the nervous system." },
      { term: "Synapse", meaning: "Junction between two neurons or a neuron and a muscle." },
      { term: "Reflex action", meaning: "Automatic, quick response to a stimulus, controlled by the spinal cord." },
      { term: "Cerebrum", meaning: "Part of the forebrain for thinking, memory and voluntary action." },
      { term: "Cerebellum", meaning: "Hindbrain part that maintains posture and balance." },
      { term: "Medulla", meaning: "Hindbrain part controlling involuntary actions." },
      { term: "Hormone", meaning: "Chemical messenger secreted by an endocrine gland into the blood." },
      { term: "Tropic movement", meaning: "Growth movement of a plant in response to a directional stimulus." },
    ],
    examTips: [
      "Draw the reflex arc with arrows and label receptor, sensory neuron, spinal cord, motor neuron and effector.",
      "Learn the gland–hormone–function table; one row each is a common one-mark question.",
      "Distinguish nervous (fast, electrical) and hormonal (slow, chemical, long-lasting) coordination in one line each.",
    ],
  },
  {
    id: "note10-7",
    classLevel: 10,
    chapterNo: 7,
    title: "How do Organisms Reproduce?",
    unit: U2,
    overview:
      "Reproduction makes new individuals and passes on traits to the next generation. This chapter covers asexual, sexual and human reproduction with reproductive health.",
    diagram: "flower-parts",
    sections: [
      {
        title: "Asexual reproduction",
        points: [
          "A single parent produces offspring that are genetically almost identical (**clones**).",
          "**Fission:** binary fission splits the parent into two (Amoeba, Paramecium); multiple fission splits it into many (Plasmodium).",
          "**Fragmentation:** the body breaks into pieces that grow into new individuals (Spirogyra).",
          "**Regeneration:** a full organism grows from a body part (Planaria, Hydra) with specialised cells.",
          "**Budding:** a bud grows out of the parent and detaches (Hydra, yeast).",
          "**Vegetative propagation:** new plants from roots, stems or leaves — potato (eyes), sugarcane, rose, Bryophyllum (leaf notches). Useful because the new plants flower and fruit earlier.",
          "**Spore formation:** in Rhizopus the sporangium bursts and spores grow into new individuals.",
        ],
      },
      {
        title: "Sexual reproduction in flowering plants",
        points: [
          "A flower is the **reproductive organ** of a plant; the stamen is male and the pistil (carpel) is female.",
          "**Stamen** = anther (produces pollen grains) + filament. **Pistil** = stigma + style + ovary (contains ovules).",
          "**Pollination** is the transfer of pollen grains from anther to stigma; **self-pollination** happens in the same flower/plant, **cross-pollination** between plants.",
          "After germination of the pollen grain, a **pollen tube** grows through the style and delivers the male gamete to the ovule — this is **fertilisation**.",
          "After fertilisation: **ovule → seed**, **ovary → fruit**, and the petals, sepals, stamens and style usually wither and fall.",
          "**Double fertilisation** (unique to flowering plants): one male gamete fuses with the egg to form the zygote, the other fuses with the polar nuclei to form the endosperm, which nourishes the embryo.",
        ],
      },
      {
        title: "Human male reproductive system",
        points: [
          "Organs: a pair of **testes** (in the scrotum), vas deferens, seminal vesicles, prostate gland and the penis.",
          "**Testes** produce sperms and the hormone **testosterone**; they lie outside the abdomen because sperm formation needs a **lower temperature** than the body.",
          "Blocked vas deferens after vasectomy provides a surgical contraception method.",
          "Sperm is a small motile cell with a head (nucleus), middle piece (mitochondria for energy) and a tail for movement.",
        ],
      },
      {
        title: "Human female reproductive system",
        points: [
          "Organs: a pair of **ovaries**, fallopian tubes (oviducts), uterus, cervix and vagina.",
          "**Ovaries** produce eggs (one per month) and the hormones **oestrogen and progesterone**.",
          "**Fertilisation** normally happens in the **oviduct**; the zygote then divides and gets implanted in the lining of the uterus.",
          "**Placenta** is a disc embedded in the uterine wall that provides nutrition and oxygen to the embryo and removes its waste through the mother's blood.",
          "**Menstruation** is the monthly shedding of the uterine lining when the egg is not fertilised; it begins at puberty and stops permanently at menopause (around 45–50 years).",
          "Gestation is about **9 months** in humans; the baby is born after strong muscular contractions of the uterus.",
        ],
      },
      {
        title: "Reproductive health",
        points: [
          "**Contraception** avoids unwanted pregnancy: barrier methods (condom, diaphragm), hormonal methods (oral pills), IUCD (copper-T loop) and surgical methods (vasectomy, tubectomy).",
          "Condoms also protect against **sexually transmitted diseases (STDs)** such as gonorrhoea, syphilis, warts and HIV-AIDS.",
          "**STDs** spread through sexual contact, blood transfusion, sharing needles and from mother to child; some are bacterial (gonorrhoea, syphilis) and some viral (Warts, HIV-AIDS).",
          "Unscientific sex determination of the unborn child is illegal and morally wrong in India — female foeticide disturbs the sex ratio.",
        ],
      },
    ],
    keyTerms: [
      { term: "Asexual reproduction", meaning: "Reproduction with a single parent producing genetically identical offspring." },
      { term: "Fission", meaning: "Division of the parent cell/body into two or more new individuals." },
      { term: "Vegetative propagation", meaning: "New plants from vegetative parts such as roots, stems or leaves." },
      { term: "Pollination", meaning: "Transfer of pollen grains from the anther to the stigma." },
      { term: "Fertilisation", meaning: "Fusion of male and female gametes to form a zygote." },
      { term: "Placenta", meaning: "Structure that exchanges nutrients, oxygen and wastes between mother and embryo." },
      { term: "Menstruation", meaning: "Monthly flow of blood and mucus when the released egg is not fertilised." },
      { term: "Contraception", meaning: "Methods used to avoid pregnancy." },
    ],
    examTips: [
      "Draw a labelled longitudinal section of a flower and mark pollen tube and ovule — a frequent 3-mark diagram.",
      "For human reproductive systems, learn the path of sperm and the path of the egg separately; questions often ask the site of fertilisation.",
      "In benefits-of-vegetative-propagation answers, mention earlier flowering/fruiting and preservation of desired variety.",
    ],
  },
  {
    id: "note10-8",
    classLevel: 10,
    chapterNo: 8,
    title: "Heredity",
    unit: U2,
    overview:
      "Heredity explains how traits pass from parents to offspring. This chapter covers Mendel's experiments, monohybrid and dihybrid crosses and sex determination.",
    diagram: "monohybrid-cross",
    sections: [
      {
        title: "Variation and inheritance",
        points: [
          "Offspring differ slightly from parents — this is **variation**. Variation is the basis of evolution and of the survival of a species.",
          "Characters are passed on by units called **genes**, present on **chromosomes** inside the nucleus.",
          "Every individual has two copies of each gene (one from each parent); a gene determines one trait.",
          "**Genotype** is the gene combination (TT, Tt, tt) and **phenotype** is the visible character (tall or short).",
        ],
      },
      {
        title: "Mendel's experiments",
        points: [
          "**Gregor Johann Mendel** worked with garden peas and crossed plants with contrasting characters such as tall/short, round/wrinkled seeds.",
          "**Monohybrid cross** (one character): TT × tt → F₁ all **Tt (tall)**, and F₁ self-pollinated → F₂ shows **3 tall : 1 short**.",
          "**Dihybrid cross** (two characters): round-yellow × wrinkled-green → F₂ ratio **9 : 3 : 3 : 1**.",
          "Conclusions: traits are inherited independently; a trait may be **dominant** or **recessive**; the F₁ plants carried the recessive gene hidden (**Tt**).",
          "The F₂ genotypic ratio in a monohybrid cross is **1 TT : 2 Tt : 1 tt**.",
        ],
        tip: "Tall/short nonsense aside — remember: dominant trait is expressed in F₁, recessive reappears in F₂ in the 3 : 1 ratio.",
      },
      {
        title: "Understanding the ratios",
        table: {
          head: ["Cross", "F₁ result", "F₂ phenotypic ratio", "F₂ genotypic ratio"],
          rows: [
            ["Monohybrid (TT × tt)", "All Tt tall", "3 tall : 1 short", "1 TT : 2 Tt : 1 tt"],
            ["Dihybrid (RRYY × rryy)", "All RrYy round-yellow", "9 : 3 : 3 : 1", "More complex, 9 genotypes"],
            ["Test cross (Tt × tt)", "1 tall : 1 short", "—", "1 Tt : 1 tt"],
          ],
        },
      },
      {
        title: "How do traits travel?",
        points: [
          "Each parent contributes one copy of each gene through the gamete; gametes carry only **one** allele of each gene.",
          "During gamete formation the two alleles separate, and at fertilisation the pair is restored — this is why recessive characters can skip a generation.",
          "Traits are of two kinds: **acquired** (learned during life, e.g. riding a cycle — not passed on) and **inherited** (present in the genes — passed on).",
          "Acquired traits are not inherited because they do not change the DNA of the germ cells.",
        ],
      },
      {
        title: "Sex determination in humans",
        points: [
          "Humans have **23 pairs** of chromosomes: 22 pairs of **autosomes** and one pair of **sex chromosomes**.",
          "Females are **XX** and males are **XY**. The mother always contributes X; the father contributes X or Y.",
          "If the father's sperm carries **X**, the child is a **girl** (XX); if it carries **Y**, the child is a **boy** (XY).",
          "So the **sex of the child is determined by the father**, not the mother — a common myth busted by genetics.",
          "In some animals (e.g. some reptiles) the sex is determined by **environmental temperature** during incubation rather than by chromosomes.",
        ],
      },
    ],
    keyTerms: [
      { term: "Heredity", meaning: "Transmission of characters from parents to offspring." },
      { term: "Gene", meaning: "Unit of inheritance present on a chromosome." },
      { term: "Allele", meaning: "One of two or more forms of a gene, e.g. T and t." },
      { term: "Dominant trait", meaning: "Trait that expresses itself even when only one copy is present." },
      { term: "Recessive trait", meaning: "Trait that shows only when both copies are identical recessive alleles." },
      { term: "Genotype / Phenotype", meaning: "Genetic makeup / visible character of an organism." },
      { term: "Dihybrid cross", meaning: "Cross involving two pairs of contrasting characters." },
      { term: "Autosome", meaning: "Any chromosome other than the sex chromosomes." },
    ],
    examTips: [
      "Practise drawing Punnett squares for monohybrid and dihybrid crosses — the table itself carries marks.",
      "Always write the F₁ and F₂ generations separately, and label the ratio below the square.",
      "For sex determination, state clearly that the father's sperm decides the sex of the child.",
    ],
  },
  {
    id: "note10-9",
    classLevel: 10,
    chapterNo: 9,
    title: "Light – Reflection and Refraction",
    unit: U3,
    overview:
      "Light travels in straight lines and shows reflection at mirrors and refraction at lenses. This chapter develops the mirror and lens formulae, magnification and power of a lens.",
    diagram: "mirror-lens-ray",
    sections: [
      {
        title: "Reflection of light",
        points: [
          "**Laws of reflection:** the angle of incidence equals the angle of reflection, and the incident ray, reflected ray and normal all lie in the same plane.",
          "In a **plane mirror** the image is virtual, erect, of the same size and laterally inverted, at the same distance behind the mirror as the object is in front.",
          "**Spherical mirrors:** concave (reflecting surface curves inward) and convex (curves outward).",
          "Important terms: **pole (P), centre of curvature (C), radius of curvature (R), principal axis, principal focus (F)** and **aperture**.",
          "**R = 2f** — the radius of curvature is twice the focal length.",
        ],
      },
      {
        title: "Image formation by concave and convex mirrors",
        table: {
          head: ["Position of object", "Concave mirror image", "Convex mirror image"],
          rows: [
            ["At infinity", "At F, real, inverted, highly diminished", "At F behind the mirror, virtual, erect, highly diminished"],
            ["Beyond C", "Between F and C, real, inverted, diminished", "Between P and F, virtual, erect, diminished"],
            ["At C", "At C, real, inverted, same size", "Between P and F, virtual, erect, diminished"],
            ["Between C and F", "Beyond C, real, inverted, enlarged", "Between P and F, virtual, erect, diminished"],
            ["At F", "At infinity, highly enlarged", "Between P and F, virtual, erect, diminished"],
            ["Between P and F", "Behind the mirror, virtual, erect, enlarged", "Between P and F, virtual, erect, diminished"],
          ],
        },
        tip: "A convex mirror always forms a **virtual, erect and diminished** image and gives a **wider field of view** — that is why it is used as a rear-view mirror.",
      },
      {
        title: "Uses of spherical mirrors",
        points: [
          "**Concave mirrors:** dentist's mirror, shaving mirror, headlights and searchlights as reflectors, solar furnaces (to concentrate light).",
          "**Convex mirrors:** rear-view mirrors in vehicles, security mirrors in shops, street light reflectors (to spread light).",
        ],
      },
      {
        title: "Refraction of light",
        points: [
          "**Refraction** is the bending of light when it travels from one transparent medium to another because its **speed changes**.",
          "Light bends **towards the normal** when it enters a denser medium (air → glass) and **away from the normal** when it enters a rarer medium.",
          "**Refractive index (n)** = speed of light in vacuum ÷ speed of light in the medium; it indicates the optical density of the medium.",
          "**Snell's law:** the ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for a given pair of media.",
          "Everyday effects: a coin in water appears raised, a pencil looks bent in water, and a pool of water appears shallower.",
        ],
        formula: ["n = c / v", "n₁ sin i = n₂ sin r"],
      },
      {
        title: "Lenses",
        points: [
          "A **convex lens** is thicker in the middle and **converges** light; a **concave lens** is thinner in the middle and **diverges** light.",
          "A convex lens forms a real, inverted image for objects beyond F, and a virtual, erect, enlarged image for objects between F and the lens (used as a magnifying glass).",
          "A concave lens always forms a **virtual, erect and diminished** image.",
          "Terms: optical centre (O), principal axis, principal focus (F₁, F₂), centre of curvature (2F).",
        ],
      },
      {
        title: "Sign conventions, formulae and magnification",
        points: [
          "Sign convention: distances measured in the direction of the incident light are positive; heights measured upward are positive.",
          "Concave mirror and convex lens have negative and positive focal lengths respectively (as per the convention used in NCERT numericals).",
          "**Linear magnification** = height of image ÷ height of object. Negative magnification means the image is inverted (real).",
        ],
        formula: ["Mirror formula: 1/v + 1/u = 1/f", "Lens formula: 1/v − 1/u = 1/f", "Magnification, m = h′/h (mirror); m = v/u", "Power of a lens: P = 1/f (f in metres), unit dioptre (D)"],
      },
      {
        title: "Solved numerical patterns",
        points: [
          "A concave mirror of R = 20 cm has f = **10 cm**.",
          "Power of a convex lens of f = 50 cm: P = 1/0.5 = **+2 D**.",
          "An object at 30 cm from a convex lens of f = 10 cm forms an image at v = 15 cm (using 1/v − 1/u = 1/f), m = −0.5 → real, inverted and diminished.",
        ],
      },
    ],
    keyTerms: [
      { term: "Reflection", meaning: "Bouncing back of light from a surface." },
      { term: "Refraction", meaning: "Change in the direction of light due to a change in its speed in a new medium." },
      { term: "Principal focus", meaning: "Point on the principal axis where rays parallel to the axis meet (or appear to meet) after reflection/refraction." },
      { term: "Focal length", meaning: "Distance between the pole/optical centre and the principal focus; f = R/2 for mirrors." },
      { term: "Refractive index", meaning: "Ratio of the speed of light in vacuum to that in the medium." },
      { term: "Magnification", meaning: "Ratio of the height of the image to the height of the object." },
      { term: "Power of a lens", meaning: "Reciprocal of the focal length in metres, measured in dioptres." },
      { term: "Dioptre", meaning: "SI unit of the power of a lens, 1 D = 1 m⁻¹." },
    ],
    examTips: [
      "Draw ray diagrams with arrows on the rays, and mark P, F and C clearly — unlabelled diagrams lose marks.",
      "In numericals, follow the sign convention strictly and write the formula before substituting values.",
      "Learn the six cases of image formation by a concave mirror; the table is the fastest way to answer.",
    ],
  },
  {
    id: "note10-10",
    classLevel: 10,
    chapterNo: 10,
    title: "The Human Eye and the Colourful World",
    unit: U3,
    overview:
      "This chapter explains how the eye focusses light, the defects of vision and their correction, and the beautiful phenomena of dispersion, scattering and atmospheric refraction.",
    diagram: "human-eye",
    sections: [
      {
        title: "Structure of the human eye",
        points: [
          "**Cornea:** transparent front bulge that most of the refraction takes place at.",
          "**Iris and pupil:** the iris controls the size of the pupil, which regulates the amount of light entering.",
          "**Eye lens:** a crystalline lens that fine-tunes the focus by changing its curvature — this ability is the **power of accommodation**.",
          "**Retina:** light-sensitive screen at the back with rods (dim light) and cones (colour and bright light); the image formed is **real and inverted**.",
          "**Ciliary muscles** change the focal length of the eye lens; the optic nerve carries signals to the brain, which interprets the image as erect.",
          "The least distance of distinct vision for a normal young adult eye is about **25 cm** (also called the near point).",
        ],
      },
      {
        title: "Defects of vision and their correction",
        table: {
          head: ["Defect", "Problem", "Cause", "Correction"],
          rows: [
            ["Myopia (short-sightedness)", "Distant objects look blurred; image forms in front of the retina", "Excessive curvature of the eye lens or elongation of the eyeball", "Concave lens of suitable power"],
            ["Hypermetropia (long-sightedness)", "Nearby objects look blurred; image forms behind the retina", "Low converging power of the lens or short eyeball", "Convex lens of suitable power"],
            ["Presbyopia", "Both near and distant objects are difficult to see", "Weakening of ciliary muscles and loss of flexibility with age", "Bifocal lenses (concave upper part + convex lower part)"],
            ["Cataract", "Clouding of the lens; vision becomes foggy", "Ageing or injury", "Cataract surgery with an artificial intraocular lens"],
          ],
        },
      },
      {
        title: "Refraction through a prism and dispersion",
        points: [
          "A **glass prism** has two triangular bases and three rectangular lateral surfaces; the angle between the two refracting surfaces is the **angle of the prism**.",
          "The path of light through a prism is not parallel to the incident ray — it bends twice.",
          "**Dispersion** is the splitting of white light into its component colours: **VIBGYOR** (violet, indigo, blue, green, yellow, orange, red).",
          "Different colours bend by different amounts — **violet bends the most, red the least** — because their speeds in glass differ.",
          "The **rainbow** is a natural spectrum formed by dispersion of sunlight by water droplets, followed by internal reflection and refraction.",
        ],
        tip: "Order of deviation: **violet > indigo > blue > green > yellow > orange > red**. Order of wavelength is the reverse.",
      },
      {
        title: "Atmospheric refraction",
        points: [
          "The atmosphere bends light continuously because its refractive index changes with height and temperature.",
          "This is why the Sun is visible about **2 minutes before sunrise** and after sunset, and why the Sun's disc appears flattened at sunrise and sunset.",
          "**Twinkling of stars:** starlight passes through layers of fluctuating air, so the apparent brightness and position keep changing.",
          "**Planets do not twinkle:** they are closer and act as extended sources — the variations from different points average out.",
        ],
      },
      {
        title: "Scattering of light",
        points: [
          "**Scattering** is the throwing of light in different directions by particles present in its path.",
          "The sky looks **blue** because fine air molecules scatter blue (shorter wavelength) much more strongly than red.",
          "At sunrise and sunset the light travels a longer path, so most blue is scattered away and the Sun and sky look **reddish**.",
          "**Danger signals are red** because red light is scattered the least by fog or smoke and is visible from far away.",
          "The sky above the atmosphere appears **dark/black** to astronauts because there are no molecules to scatter light.",
        ],
      },
    ],
    keyTerms: [
      { term: "Power of accommodation", meaning: "Ability of the eye lens to change its focal length to focus on near and far objects." },
      { term: "Myopia", meaning: "Short-sightedness, corrected with a concave lens." },
      { term: "Hypermetropia", meaning: "Long-sightedness, corrected with a convex lens." },
      { term: "Presbyopia", meaning: "Age-related loss of the eye's power of accommodation." },
      { term: "Dispersion", meaning: "Splitting of white light into its component colours by a prism." },
      { term: "Atmospheric refraction", meaning: "Bending of light due to changing refractive index of air layers." },
      { term: "Scattering", meaning: "Deflection of light in many directions by particles in its path." },
      { term: "Tyndall effect", meaning: "Scattering that makes a beam of light visible through a colloid." },
    ],
    examTips: [
      "Draw and label the human eye and the prism dispersion diagram; both are very common.",
      "For defect-correction questions, name the defect, the lens used and the reason in three short lines.",
      "Remember: blue sky and red danger signals both come from scattering, but the particle sizes differ.",
    ],
  },
  {
    id: "note10-11",
    classLevel: 10,
    chapterNo: 11,
    title: "Electricity",
    unit: U4,
    overview:
      "Electric current is the flow of charge. This chapter develops Ohm's law, the combination of resistors, heating effects of current and electric power with numerical practice.",
    diagram: "electric-circuit",
    sections: [
      {
        title: "Electric charge, current and potential difference",
        points: [
          "Electric **current** is the rate of flow of electric charge: I = Q/t. Its SI unit is the **ampere (A)**: 1 A = 1 C/s.",
          "Charge on one electron = **1.6 × 10⁻¹⁹ C**; a current of 1 A means 6.25 × 10¹⁸ electrons pass per second.",
          "**Potential difference** between two points is the work done to move a unit charge from one point to the other: V = W/Q; unit **volt (V)**.",
          "An **ammeter** measures current and is connected **in series**; a **voltmeter** measures potential difference and is connected **in parallel**.",
          "Current flows from the positive to the negative terminal of a cell in a circuit (conventional current).",
        ],
        formula: ["I = Q / t", "V = W / Q"],
      },
      {
        title: "Ohm's law and resistance",
        points: [
          "**Ohm's law:** at constant temperature, the current through a conductor is directly proportional to the potential difference across its ends: **V = IR**.",
          "**Resistance** is the property that opposes the flow of current; its SI unit is the **ohm (Ω)**: 1 Ω = 1 V/A.",
          "Resistance depends on **length** (directly), **area of cross-section** (inversely), the **material** (resistivity) and **temperature**.",
          "A **rheostat** is a variable resistance used to change the current in a circuit.",
          "Resistivity (ρ) is the resistance of a conductor of unit length and unit area; its SI unit is ohm-metre (Ω m).",
        ],
        formula: ["V = IR", "R = ρl / A"],
      },
      {
        title: "Resistors in series and parallel",
        points: [
          "**Series:** the current is the same through each resistor and the total potential difference is the sum. Equivalent resistance is larger than the largest resistor.",
          "**Parallel:** the potential difference is the same across each resistor and the total current is the sum of branches. Equivalent resistance is smaller than the smallest resistor.",
          "Household appliances are connected in **parallel** so that each gets the full voltage and can be switched on or off separately.",
        ],
        formula: ["Series: Rₛ = R₁ + R₂ + R₃", "Parallel: 1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃"],
      },
      {
        title: "Heating effect of electric current",
        points: [
          "When current flows through a resistor, electrical energy is converted into **heat** — this is the heating effect of current.",
          "The heat produced depends on the square of the current, the resistance and the time (Joule's law).",
          "Applications: electric iron, heater, toaster, electric bulb (tungsten filament glows), electric fuse (a wire of low melting point that melts and breaks the circuit).",
          "The filament of a bulb is made of **tungsten** because of its very high melting point (3380 °C).",
        ],
        formula: ["H = I²Rt", "H = VIt", "H = V²t / R"],
      },
      {
        title: "Electric power and energy",
        points: [
          "**Power** is the rate at which electrical energy is consumed: P = VI; unit **watt (W)**. 1 W = 1 V × 1 A.",
          "For a resistor, P = I²R = V²/R.",
          "**Electrical energy** used = power × time; the commercial unit is the **kilowatt-hour (kWh)**, 1 kWh = 3.6 × 10⁶ J.",
          "The rating “100 W, 220 V” on an appliance means it consumes 100 W when used at 220 V.",
        ],
        formula: ["P = VI = I²R = V²/R", "Energy = P × t", "1 kWh = 3.6 × 10⁶ J"],
      },
      {
        title: "Solved numerical patterns",
        points: [
          "Charge in 10 minutes at 0.5 A: Q = 0.5 × 600 = **300 C**.",
          "Resistors 2 Ω, 3 Ω, 5 Ω in series → **10 Ω**; two 4 Ω in parallel → **2 Ω**.",
          "Total resistance of 6 Ω and 3 Ω in parallel = (6 × 3)/(6 + 3) = **2 Ω**.",
          "Energy used by a 1000 W heater for 2 h = 2 kWh = **7.2 × 10⁶ J**.",
        ],
        tip: "For two resistors in parallel, use the shortcut Rₚ = (R₁ × R₂) / (R₁ + R₂) to save time in the exam.",
      },
    ],
    keyTerms: [
      { term: "Electric current", meaning: "Rate of flow of electric charge, unit ampere." },
      { term: "Potential difference", meaning: "Work done to move a unit charge between two points; unit volt." },
      { term: "Ohm's law", meaning: "V = IR at constant temperature." },
      { term: "Resistance", meaning: "Opposition to the flow of current; unit ohm." },
      { term: "Resistivity", meaning: "Resistance of a unit cube of the material; unit Ω m." },
      { term: "Electric fuse", meaning: "Safety device with a low-melting wire that breaks the circuit on overload." },
      { term: "Electric power", meaning: "Rate of consumption of electrical energy, P = VI; unit watt." },
      { term: "1 kWh", meaning: "Commercial unit of electrical energy, equal to 3.6 × 10⁶ J." },
    ],
    examTips: [
      "Learn both combination formulae and the two-resistor shortcut; draw the circuit cleanly with symbols.",
      "Always mention ammeter in series and voltmeter in parallel with a reason.",
      "In power numericals write the formula, substitute units, and convert time to seconds or hours as required.",
    ],
  },
  {
    id: "note10-12",
    classLevel: 10,
    chapterNo: 12,
    title: "Magnetic Effects of Electric Current",
    unit: U4,
    overview:
      "Electric current creates a magnetic field. This chapter explains field patterns, the rules for finding directions, the working of motors and generators, and domestic wiring safety.",
    diagram: "magnetic-field-wire",
    sections: [
      {
        title: "Magnetic field and field lines",
        points: [
          "A **magnetic field** is the region around a magnet or current-carrying conductor where its magnetic force can be detected; it is a vector quantity, measured in tesla (T).",
          "**Field lines** are the paths along which a free magnetic north pole would move; they emerge from the **north pole** and merge at the **south pole** outside the magnet.",
          "Field lines never intersect — if they did, a compass at the crossing point would show two directions, which is impossible.",
          "Inside the magnet, field lines run from south to north, so field lines form closed loops.",
          "The closer the field lines, the **stronger** the field.",
        ],
      },
      {
        title: "Magnetic field due to current: rules",
        points: [
          "A straight current-carrying wire produces **concentric circular** field lines around it; the field strength **decreases** with distance.",
          "**Right-hand thumb rule:** hold the wire in your right hand with the thumb pointing along the current; the curled fingers give the direction of the field lines.",
          "In a **solenoid** the field is uniform inside and the solenoid behaves like a **bar magnet**; the field is used to make **electromagnets**.",
          "**Electromagnet:** a soft iron core inside a current-carrying coil; it is a strong magnet while current flows and loses magnetism when the current stops.",
        ],
      },
      {
        title: "Force on a current-carrying conductor",
        points: [
          "A current-carrying conductor placed in a magnetic field experiences a **force** (because the field of the magnet interacts with the field of the current).",
          "**Fleming's left-hand rule:** stretch the thumb, forefinger and middle finger of the left hand mutually perpendicular; forefinger = magnetic field, middle finger = current, thumb = force (motion).",
          "The force is largest when the conductor is **perpendicular** to the field.",
          "An **electric motor** converts electrical energy into mechanical energy using this force; a **loudspeaker** also works on this principle.",
        ],
      },
      {
        title: "Electromagnetic induction and the generator",
        points: [
          "**Electromagnetic induction:** a changing magnetic field in a coil induces a potential difference (and a current in a closed circuit) — discovered by **Michael Faraday**.",
          "**Fleming's right-hand rule:** forefinger = magnetic field, thumb = motion of the conductor, middle finger = direction of the induced current.",
          "An **electric generator** converts mechanical energy into electrical energy. In a **DC generator**, a split-ring commutator is used; in an **AC generator**, slip rings are used.",
          "In India, the direction of AC changes every 1/100 second, i.e. the frequency of AC is **50 Hz**.",
        ],
        tip: "Left hand → electric **motor** (current + field → motion). Right hand → **generator** (motion + field → current).",
      },
      {
        title: "Domestic electric circuits and safety",
        points: [
          "Domestic supply in India is **220 V, 50 Hz** AC, delivered through three wires: **live (red), neutral (black) and earth (green)**.",
          "The **potential difference between live and neutral is 220 V**; appliances are connected in **parallel** so that each gets full voltage.",
          "The **earth wire** is a safety measure: it provides a low-resistance path for current to the ground, protecting the user from shocks if the appliance's metal body becomes live.",
          "An **electric fuse** protects circuits from overload and short-circuiting by melting when the current exceeds the safe value.",
          "**Overloading** happens when too many appliances draw current from one socket, or when the supply voltage rises; it can cause fires.",
        ],
      },
      {
        title: "Rules to remember quickly",
        table: {
          head: ["Rule", "Hand used", "Used to find"],
          rows: [
            ["Right-hand thumb rule", "Right hand", "Direction of magnetic field around a current-carrying conductor"],
            ["Fleming's left-hand rule", "Left hand", "Direction of force on a current-carrying conductor (motor)"],
            ["Fleming's right-hand rule", "Right hand", "Direction of induced current (generator)"],
          ],
        },
      },
    ],
    keyTerms: [
      { term: "Magnetic field", meaning: "Region around a magnet or current-carrying conductor where magnetic force acts." },
      { term: "Magnetic field lines", meaning: "Curved paths showing the direction of the magnetic field." },
      { term: "Solenoid", meaning: "A coil of many circular turns of insulated wire, acting like a bar magnet." },
      { term: "Electromagnet", meaning: "Magnet made by passing current through a coil wound on a soft iron core." },
      { term: "Fleming's left-hand rule", meaning: "Gives the direction of force on a current-carrying conductor in a magnetic field." },
      { term: "Electromagnetic induction", meaning: "Production of a potential difference by changing the magnetic field through a coil." },
      { term: "Commutator", meaning: "Split ring in a DC generator/motor that reverses current direction periodically." },
      { term: "Earth wire", meaning: "Safety wire connecting the metal body of an appliance to the ground." },
    ],
    examTips: [
      "Draw concentric circular field lines around a straight wire with arrows; label the direction correctly with the right-hand thumb rule.",
      "Never mix the left-hand and right-hand rules. Write “motor-left” and “generator-right” in the margin as a reminder.",
      "Domestic circuit answers must include: 220 V, 50 Hz, three wires with colours, and the role of the earth wire and fuse.",
    ],
  },
  {
    id: "note10-13",
    classLevel: 10,
    chapterNo: 13,
    title: "Our Environment",
    unit: U5,
    overview:
      "Living organisms and their surroundings form an ecosystem in which energy flows and materials cycle. This chapter covers food chains, energy transfer, harmful wastes and ozone depletion.",
    diagram: "food-chain",
    sections: [
      {
        title: "Ecosystem and its components",
        points: [
          "All interacting organisms in an area together with the non-living components of their surroundings form an **ecosystem**.",
          "**Biotic components:** producers (green plants), consumers (herbivores, carnivores, omnivores, parasites) and decomposers (bacteria and fungi).",
          "**Abiotic components:** sunlight, air, water, soil and temperature.",
          "**Decomposers** break down dead plants and animals; they keep the environment clean and return nutrients such as nitrogen and phosphorus to the soil.",
          "Ecosystems can be **natural** (forest, pond, lake) or **human-made/artificial** (crop field, garden, aquarium).",
        ],
      },
      {
        title: "Food chains and food webs",
        points: [
          "A **food chain** shows the transfer of food (energy) from one organism to the next: grass → deer → lion.",
          "Each step is a **trophic level**: producers (1st), herbivores (2nd), carnivores (3rd, 4th).",
          "A **food web** is a network of interconnected food chains — more realistic in nature.",
          "Food chains show how organisms have a specific place and food habit in the ecosystem, and how harmful chemicals move along them.",
        ],
      },
      {
        title: "How much energy is transferred?",
        points: [
          "Energy flows from producers to consumers; about **10% of the energy** is transferred from one trophic level to the next (the 10 percent law).",
          "Most energy is lost as **heat** and used in the organism's life processes such as respiration and digestion.",
          "Because so much energy is lost, food chains usually have only **3 or 4 trophic levels**.",
          "The flow of energy is **unidirectional** — energy does not return from consumers to the Sun.",
        ],
      },
      {
        title: "Accumulation of harmful chemicals",
        points: [
          "Substances such as **pesticides** are non-biodegradable and cannot be broken down by micro-organisms.",
          "They enter the soil, then crops (producers), then humans — this is **biological magnification**.",
          "Their concentration **increases at every trophic level**, so humans who are at the top of the food chain receive the maximum amount.",
          "Solutions: use biological pest control, organic farming and safer alternatives instead of persistent chemical pesticides.",
        ],
      },
      {
        title: "Biodegradable and non-biodegradable wastes",
        table: {
          head: ["Biodegradable", "Non-biodegradable"],
          rows: [
            ["Break down by the action of micro-organisms", "Cannot be decomposed by micro-organisms"],
            ["Example: food waste, vegetable peels, paper, cotton, wool", "Example: plastics, DDT, glass, aluminium foil, polythene bags"],
            ["Do not accumulate in the environment for long", "Persist for many years and cause pollution"],
            ["Can be used to make compost and manure", "Require recycling or safe disposal"],
          ],
        },
      },
      {
        title: "Ozone layer depletion",
        points: [
          "The **ozone layer (O₃)** is present in the upper atmosphere and **protects us from harmful ultraviolet (UV) radiation**.",
          "UV radiation can cause **skin cancer, cataracts, damage to the immune system** and harm crops.",
          "The layer is depleted mainly by **chlorofluorocarbons (CFCs)** used as refrigerants and in fire extinguishers.",
          "In 1987, **UNEP** succeeded in forging an agreement (the Montreal Protocol) to **freeze CFC production at 1986 levels**.",
          "Steps to protect the ozone layer: avoid CFCs, use ozone-friendly refrigerants, and dispose of old refrigerators and air conditioners properly.",
        ],
        tip: "The ozone layer is not the same as the greenhouse effect: ozone **blocks UV** while greenhouse gases **trap heat**.",
      },
      {
        title: "Managing the garbage we produce",
        points: [
          "Waste is of two kinds — biodegradable and non-biodegradable; separate them at home before disposal.",
          "Better solutions: **reduce** use, **reuse** items, **recycle** materials, and compost biodegradable waste.",
          "Changes in our lifestyle (say no to plastic bags, use cloth bags, avoid throwing e-waste) reduce the load on the environment, and everyone can contribute at an individual level.",
        ],
      },
    ],
    keyTerms: [
      { term: "Ecosystem", meaning: "A self-contained area in which biotic and abiotic components interact." },
      { term: "Trophic level", meaning: "Each successive level in a food chain at which energy is transferred." },
      { term: "Food web", meaning: "Network of interconnected food chains in an ecosystem." },
      { term: "10 percent law", meaning: "Only about 10% of the energy is transferred from one trophic level to the next." },
      { term: "Biological magnification", meaning: "Increase in the concentration of a harmful chemical at each trophic level." },
      { term: "Biodegradable waste", meaning: "Waste that can be broken down by micro-organisms." },
      { term: "Ozone hole", meaning: "Depletion of the ozone layer, mainly due to CFCs." },
      { term: "UNEP", meaning: "United Nations Environment Programme, which framed the 1987 agreement to freeze CFC production." },
    ],
    examTips: [
      "Draw a food chain with arrows pointing in the direction of energy flow, and mark the trophic levels.",
      "For biological magnification, always name the pesticide (or chemical), the producers, and mention humans as the most affected.",
      "Distinguish biodegradable and non-biodegradable waste with two examples each — a very common 3-mark question.",
    ],
  },
];
