import type { ChapterNote } from "./types";

const U1 = "Unit 1 · Matter — Its Nature and Behaviour";
const U2 = "Unit 2 · Organisation in the Living World";
const U3 = "Unit 3 · Motion, Force and Work";
const U4 = "Unit 4 · Food; Food Production";

export const notes9: ChapterNote[] = [
  {
    id: "note9-1",
    classLevel: 9,
    chapterNo: 1,
    title: "Matter in Our Surroundings",
    unit: U1,
    overview:
      "Everything around us is matter: it has mass and occupies space. This chapter explains the three states of matter, how particles behave in each state, and how matter changes state on heating or cooling.",
    diagram: "states-of-matter",
    sections: [
      {
        title: "What is matter?",
        points: [
          "**Matter** is anything that has **mass** and **occupies space** (volume). Air, water, chalk, sugar and even smell are matter.",
          "Matter is made of tiny particles (atoms and molecules). These particles are **very small**, have **spaces between them** and are in **continuous motion**.",
          "Particles of matter **attract each other**. The force of attraction is strongest in solids, weaker in liquids and weakest in gases.",
          "Early Indian thinkers classified matter as **panch tatva**: air, earth, fire, sky and water.",
        ],
      },
      {
        title: "Physical nature of matter: particles and their evidence",
        points: [
          "**Particles are very small:** dissolve a little potassium permanganate in water — it colours a huge volume of water while the particles keep dividing.",
          "**Particles have spaces between them:** sugar dissolves in water and the water level does not rise much; the sugar particles occupy the spaces between water particles.",
          "**Particles are constantly moving:** the smell of hot food reaches us several metres away — particles of aroma move through air (diffusion).",
          "**Diffusion** is the intermixing of particles of two different types of matter on their own. It increases with temperature because particles move faster.",
        ],
      },
      {
        title: "The three states of matter",
        table: {
          head: ["Property", "Solid", "Liquid", "Gas"],
          rows: [
            ["Shape", "Definite", "Takes the shape of the container", "Fills the whole container"],
            ["Volume", "Definite", "Definite", "Not definite"],
            ["Packing of particles", "Closely packed, ordered", "Loosely packed", "Very far apart, random"],
            ["Force of attraction", "Strongest", "Moderate", "Negligible"],
            ["Compressibility", "Almost none", "Very little", "Very high"],
            ["Rigidity / Fluidity", "Rigid, fixed position", "Fluid, flows easily", "Highly fluid"],
            ["Diffusion", "Very slow", "Slow", "Very fast"],
          ],
        },
      },
      {
        title: "Change of state and the effect of temperature",
        points: [
          "On **heating**, particles gain kinetic energy, overcome the force of attraction and the state changes: **solid → liquid → gas**.",
          "**Melting (fusion):** solid changes into liquid at the **melting point**. Ice melts at **0 °C = 273.15 K**.",
          "**Boiling (vaporisation):** liquid changes into vapour at the **boiling point**. Water boils at **100 °C = 373 K** at normal atmospheric pressure.",
          "**Condensation:** gas changes into liquid on cooling. **Freezing:** liquid changes into solid on cooling.",
          "**Sublimation:** a solid changes directly into gas without becoming liquid, e.g. **camphor, naphthalene balls, ammonium chloride, dry ice**. The reverse is **deposition**.",
        ],
      },
      {
        title: "Latent heat",
        points: [
          "During a change of state the temperature does **not** rise even though heat is supplied. This hidden heat is called **latent heat**.",
          "**Latent heat of fusion** — heat needed to change 1 kg of a solid into liquid at its melting point, at normal atmospheric pressure (ice: 3.34 × 10⁵ J/kg).",
          "**Latent heat of vaporisation** — heat needed to change 1 kg of a liquid into vapour at its boiling point (water: 22.5 × 10⁵ J/kg).",
        ],
        formula: ["Q = m × L", "where L = latent heat, m = mass"],
      },
      {
        title: "Evaporation and cooling",
        points: [
          "**Evaporation** is the change of a liquid into vapour at any temperature below its boiling point, from the **surface** of the liquid.",
          "Evaporation **increases** with temperature, surface area and wind speed, and **decreases** with humidity.",
          "Evaporation causes **cooling** because the escaping particles take away energy from the liquid: this is why we feel cool after sweating, and why earthen pots keep water cool.",
        ],
        tip: "Evaporation is a surface phenomenon, boiling happens throughout the liquid at one fixed temperature.",
      },
      {
        title: "Evaporation vs boiling",
        table: {
          head: ["Evaporation", "Boiling"],
          rows: [
            ["Takes place at all temperatures", "Takes place at one fixed temperature (boiling point)"],
            ["Only from the surface", "Throughout the bulk of the liquid"],
            ["A slow, silent process", "A fast process with bubbles"],
            ["Causes cooling", "Temperature stays constant"],
          ],
        },
      },
    ],
    keyTerms: [
      { term: "Matter", meaning: "Anything that has mass and occupies space." },
      { term: "Diffusion", meaning: "Spontaneous intermixing of particles of two different kinds of matter." },
      { term: "Melting point", meaning: "Temperature at which a solid becomes liquid at normal atmospheric pressure." },
      { term: "Latent heat", meaning: "Heat absorbed or released at constant temperature during a change of state." },
      { term: "Sublimation", meaning: "Solid changing directly into gas without passing through the liquid state." },
      { term: "Evaporation", meaning: "Change of liquid into vapour below its boiling point, from the surface." },
      { term: "Interparticle force", meaning: "Force of attraction between the particles of matter." },
    ],
    examTips: [
      "Learn the temperature conversions: K = °C + 273 and 0 °C = 273 K.",
      "For “why?” questions, always link the answer to **particle motion, spaces between particles and forces of attraction**.",
      "Write units carefully: °C, K, J/kg. Marks are often cut for missing or wrong units.",
    ],
  },
  {
    id: "note9-2",
    classLevel: 9,
    chapterNo: 2,
    title: "Is Matter Around Us Pure?",
    unit: U1,
    overview:
      "Matter around us is mostly a mixture. This chapter separates mixtures into solutions, colloids and suspensions, explains concentration, and describes the techniques used to get pure substances.",
    diagram: "mixtures-classification",
    sections: [
      {
        title: "Pure substances and mixtures",
        points: [
          "A **pure substance** is made of only one kind of particle: an **element** (e.g. oxygen, iron) or a **compound** (e.g. water, salt).",
          "A **mixture** contains two or more substances physically mixed in any proportion, e.g. air, sea water, brass.",
          "In a **homogeneous** mixture the composition is the same throughout (salt solution, air). In a **heterogeneous** mixture it is not (sand in water, oil and water).",
          "In a compound the constituents are combined chemically in a **fixed ratio** and can be separated only by chemical means; in a mixture they can be separated by physical means.",
        ],
      },
      {
        title: "Solutions, colloids and suspensions",
        table: {
          head: ["Property", "True solution", "Colloid", "Suspension"],
          rows: [
            ["Particle size", "Less than 1 nm", "1 nm to 1000 nm", "More than 1000 nm"],
            ["Nature", "Homogeneous", "Heterogeneous (but looks uniform)", "Heterogeneous"],
            ["Visibility of particles", "Not visible", "Not visible to the naked eye", "Visible to the naked eye"],
            ["Tyndall effect", "Not shown", "Shown", "Shown (if particles settle)"],
            ["Settling down", "Does not settle", "Does not settle", "Settles on standing"],
            ["Separation", "Cannot be separated by filtration", "Separated by centrifugation", "Separated by filtration"],
            ["Example", "Salt in water, sugar in water", "Milk, fog, smoke, blood, jelly", "Sand in water, chalk powder in water"],
          ],
        },
        tip: "The **Tyndall effect** — scattering of light so that its path becomes visible — is the quickest test for a colloid.",
      },
      {
        title: "Concentration of a solution",
        points: [
          "**Concentration** tells how much solute is dissolved in a given amount of solvent or solution.",
          "A solution with a small amount of solute is **dilute**; with a large amount it is **concentrated**.",
          "A saturated solution cannot dissolve more solute at a fixed temperature; an **unsaturated** solution can.",
          "**Solubility** is the maximum amount of solute that can be dissolved in 100 g of solvent at a fixed temperature.",
        ],
        formula: ["Mass by mass % = (mass of solute / mass of solution) × 100", "Mass by volume % = (mass of solute / volume of solution) × 100"],
      },
      {
        title: "Separating the components of a mixture",
        points: [
          "**Evaporation** — separates a dissolved solid from its solvent (salt from salt water).",
          "**Centrifugation** — spins the mixture fast; denser particles move to the bottom (cream from milk, blood cells from plasma).",
          "**Chromatography** — separates solutes that dissolve in the same solvent; used to separate dyes in black ink and pigments in a flower.",
          "**Distillation** — separates a liquid from a solution by evaporating and then condensing it (pure water from sea water).",
          "**Fractional distillation** — separates two miscible liquids whose boiling points differ by less than 25 K (different gases from air, petrol from crude oil).",
          "**Separating funnel** — separates two immiscible liquids (oil and water).",
          "**Sublimation** — separates a sublimable solid such as camphor or ammonium chloride from a non-sublimable solid.",
          "**Filtration** — separates an insoluble solid from a liquid; **sieving** is used for solids of different grain size.",
        ],
      },
      {
        title: "How can we obtain pure substances?",
        points: [
          "All separation techniques give a mixture richer in one component, not a pure substance.",
          "**Crystallisation** gives pure crystals: impure copper sulphate crystals are dissolved in water, the solution is filtered and allowed to evaporate slowly. It is used to purify salt from sea water (to remove impurities) and in the pharmaceutical industry.",
          "**Simple distillation** gives pure water from salt water; fractional distillation separates liquids with close boiling points.",
        ],
      },
      {
        title: "Elements, compounds and their classification",
        points: [
          "An **element** is a pure substance that cannot be broken down into simpler substances by chemical or physical means; there are 118 known elements.",
          "Elements are broadly **metals** (copper, iron, aluminium), **non-metals** (sulphur, carbon, oxygen) and **metalloids** (boron, silicon, germanium).",
          "Elements can exist as **atoms** (sodium, carbon) or **molecules** (oxygen O₂, ozone O₃).",
          "A **compound** is a pure substance formed when two or more elements combine chemically in a fixed ratio, e.g. water (H₂O), ammonia (NH₃).",
          "**Mixtures** are classified as homogeneous (air, brass) or heterogeneous (sand in water, gunpowder).",
        ],
      },
      {
        title: "Physical and chemical changes",
        table: {
          head: ["Physical change", "Chemical change"],
          rows: [
            ["No new substance is formed", "One or more new substances are formed"],
            ["Change is usually reversible", "Change is usually irreversible"],
            ["Only physical properties change", "Composition and chemical properties change"],
            ["Example: melting of ice, dissolving sugar", "Example: burning of paper, rusting of iron, souring of milk"],
          ],
        },
      },
    ],
    keyTerms: [
      { term: "Solute / solvent", meaning: "The substance dissolved / the medium in which it dissolves." },
      { term: "Tyndall effect", meaning: "Scattering of light making its path visible; shown by colloids." },
      { term: "Centrifugation", meaning: "Separation by spinning, denser particles settle at the bottom." },
      { term: "Chromatography", meaning: "Separation of dissolved solutes using a solvent travelling on filter paper." },
      { term: "Fractional distillation", meaning: "Separation of miscible liquids with boiling points differing by less than 25 K." },
      { term: "Crystallisation", meaning: "Obtaining pure crystals of a substance by slow evaporation of its solution." },
      { term: "Alloy", meaning: "A homogeneous mixture of two or more metals, or a metal and a non-metal, e.g. brass." },
    ],
    examTips: [
      "Learn the solution / colloid / suspension table — it is asked as a compare-and-contrast question almost every year.",
      "In numericals, mass by mass % uses mass of **solution** (solute + solvent), not just the solvent.",
      "Give one clear example with each separation technique; examples earn marks easily.",
    ],
  },
  {
    id: "note9-3",
    classLevel: 9,
    chapterNo: 3,
    title: "Atoms and Molecules",
    unit: U1,
    overview:
      "This chapter explains the laws of chemical combination, the concept of the mole, writing chemical formulae and the difference between atoms and molecules.",
    diagram: "atom-molecule",
    sections: [
      {
        title: "Laws of chemical combination",
        points: [
          "**Law of conservation of mass** (Lavoisier): mass is neither created nor destroyed in a chemical reaction.",
          "**Law of constant proportions** (Proust): a chemical compound always contains the same elements in fixed proportions by mass, e.g. water is always hydrogen : oxygen = 1 : 8 by mass.",
          "These laws led to the idea that matter is made of indivisible particles called **atoms**.",
        ],
      },
      {
        title: "Dalton's atomic theory",
        points: [
          "All matter is made of very small **indivisible particles called atoms**.",
          "Atoms of a given element are **identical in mass and chemical properties**.",
          "Atoms of different elements have **different masses and chemical properties**.",
          "Atoms combine in **fixed whole-number ratios** to form compounds.",
          "Atoms are **neither created nor destroyed** in a chemical reaction.",
        ],
        tip: "Dalton's theory could not explain the existence of isotopes and is called a **postulate**, not a proven law.",
      },
      {
        title: "Atoms and their symbols",
        points: [
          "An **atom** is the smallest particle of an element that can take part in a chemical reaction.",
          "**Atomic radius** is measured in **nanometres** (1 nm = 10⁻⁹ m); hydrogen is the smallest atom.",
          "Symbols are the short forms of elements. Many come from Latin names: **Na** (natrium), **K** (kalium), **Fe** (ferrum), **Cu** (cuprum), **Ag** (argentum), **Au** (aurum), **Pb** (plumbum), **Sn** (stannum).",
          "The symbol represents the element and also **one atom** of that element.",
        ],
      },
      {
        title: "Atomic mass",
        points: [
          "One atomic mass unit (u) is **1/12 of the mass of one carbon-12 atom**.",
          "Atomic masses are relative masses compared with C-12: H = 1 u, C = 12 u, N = 14 u, O = 16 u, Na = 23 u, Cl = 35.5 u.",
          "The average mass of an element's atoms is the **average atomic mass**.",
        ],
      },
      {
        title: "Molecules and ions",
        points: [
          "A **molecule** is the smallest particle of a substance that has the properties of that substance and can exist independently.",
          "**Atomicity** is the number of atoms in one molecule: monoatomic (He, Ne), diatomic (O₂, H₂, N₂), triatomic (O₃, H₂O), tetra-atomic (P₄), polyatomic (S₈).",
          "A molecule of a compound contains atoms of different elements in a fixed ratio, e.g. H₂O, CO₂, NH₃.",
          "**Ions** are charged particles: a **cation** loses electrons and carries a positive charge (Na⁺, Ca²⁺), an **anion** gains electrons and carries a negative charge (Cl⁻, O²⁻).",
          "A **polyatomic ion** is a group of atoms carrying a fixed charge, e.g. SO₄²⁻, NO₃⁻, NH₄⁺, CO₃²⁻.",
        ],
      },
      {
        title: "Writing chemical formulae",
        points: [
          "Write the symbols of the cation first and the anion next, then **criss-cross the valencies**.",
          "Example: Al³⁺ and O²⁻ → **Al₂O₃**; Ca²⁺ and Cl⁻ → **CaCl₂**.",
          "For a polyatomic ion, use brackets when the number of ions is more than one: Ca(OH)₂, (NH₄)₂SO₄.",
        ],
      },
      {
        title: "Molecular mass, mole concept and the mole formula",
        points: [
          "**Molecular mass** is the sum of the atomic masses of all atoms in a molecule; for H₂O it is 2(1) + 16 = **18 u**.",
          "**Formula unit mass** is used for ionic compounds; for NaCl it is 23 + 35.5 = **58.5 u**.",
          "One **mole** of any substance contains **6.022 × 10²³** particles — the **Avogadro constant**.",
          "The **molar mass** of a substance is its molecular mass in grams; 1 mole of water = 18 g = 6.022 × 10²³ molecules.",
        ],
        formula: ["Number of moles, n = Given mass (g) / Molar mass (g mol⁻¹)", "Mass = number of moles × molar mass", "Number of particles = n × 6.022 × 10²³"],
      },
      {
        title: "Mole — worked example",
        points: [
          "Moles in 46 g of sodium: n = 46 / 23 = **2 moles**.",
          "Mass of 0.5 mole of water: 0.5 × 18 = **9 g**.",
          "Number of molecules in 9 g of water: n = 0.5, molecules = 0.5 × 6.022 × 10²³ = **3.011 × 10²³**.",
        ],
      },
    ],
    keyTerms: [
      { term: "Atom", meaning: "Smallest particle of an element that can take part in a chemical reaction." },
      { term: "Molecule", meaning: "Group of two or more atoms chemically joined, which can exist independently." },
      { term: "Atomicity", meaning: "Number of atoms present in one molecule of a substance." },
      { term: "Ion", meaning: "An atom or group of atoms carrying a positive or negative charge." },
      { term: "Valency", meaning: "Combining capacity of an element, equal to the number of electrons lost, gained or shared." },
      { term: "Mole", meaning: "Amount of substance containing 6.022 × 10²³ particles." },
      { term: "Molar mass", meaning: "Mass of one mole of a substance, numerically equal to its molecular mass in grams." },
    ],
    examTips: [
      "Practise criss-cross formulas for at least 20 compounds — this is a guaranteed question.",
      "In numericals write: formula → substitution → answer with unit. Formula marks are given even if arithmetic slips.",
      "Memorise: 6.022 × 10²³ (Avogadro constant) and molar masses of water, CO₂, NaCl, O₂.",
    ],
  },
  {
    id: "note9-4",
    classLevel: 9,
    chapterNo: 4,
    title: "Structure of the Atom",
    unit: U1,
    overview:
      "This chapter describes how the electron, proton and neutron were discovered, the models of the atom, and how electrons are arranged in shells to explain valency and isotopes.",
    diagram: "bohr-atom",
    sections: [
      {
        title: "Charged particles in matter",
        points: [
          "The **electron** was discovered by **J.J. Thomson** (1897) using cathode rays; it carries a charge of −1.6 × 10⁻¹⁹ C and its mass is about 1/2000 that of a hydrogen atom.",
          "**Canal rays** (positive rays) were discovered by **E. Goldstein** (1886), which led to the discovery of the **proton** (charge +1.6 × 10⁻¹⁹ C, mass ≈ 1 u).",
          "The **neutron** was discovered by **James Chadwick** (1932): no charge, mass nearly equal to that of a proton.",
        ],
      },
      {
        title: "Thomson's model of the atom",
        points: [
          "Thomson proposed that the atom is a **uniform sphere of positive charge** with electrons embedded in it — compared to a **watermelon or plum pudding**.",
          "Limitation: it could not explain the results of later scattering experiments.",
        ],
      },
      {
        title: "Rutherford's alpha-particle scattering experiment",
        points: [
          "Fast-moving **alpha particles** were directed at a thin **gold foil**.",
          "Observations: most particles passed straight through; some were deflected by small angles; **a very few (about 1 in 12,000) bounced back**.",
          "Conclusions: **most of the space inside the atom is empty**; the positive charge and almost all the mass are concentrated in a very small central **nucleus**.",
          "Rutherford's model could not explain the stability of the atom and the arrangement of electrons.",
        ],
        tip: "The bouncing back of a few alpha particles is the key observation — it proves the nucleus is tiny, dense and positively charged.",
      },
      {
        title: "Bohr's model of the atom",
        points: [
          "Electrons revolve around the nucleus only in certain **fixed orbits (shells)** called **energy levels** — they do not radiate energy while revolving.",
          "Shells are represented as **K, L, M, N…** or n = 1, 2, 3, 4…",
          "The **maximum number of electrons** in a shell is given by the formula **2n²**.",
          "Electrons are filled in a step-wise manner; the outermost shell can hold a maximum of 8 electrons (an octet gives stability).",
        ],
        formula: ["Maximum electrons in a shell = 2n²", "K shell: 2, L shell: 8, M shell: 18"],
      },
      {
        title: "Electronic configuration of the first 20 elements",
        table: {
          head: ["Element", "Symbol", "Atomic number", "Configuration", "Valency"],
          rows: [
            ["Hydrogen", "H", "1", "1", "1"],
            ["Helium", "He", "2", "2", "0"],
            ["Lithium", "Li", "3", "2, 1", "1"],
            ["Carbon", "C", "6", "2, 4", "4"],
            ["Nitrogen", "N", "7", "2, 5", "3"],
            ["Oxygen", "O", "8", "2, 6", "2"],
            ["Sodium", "Na", "11", "2, 8, 1", "1"],
            ["Magnesium", "Mg", "12", "2, 8, 2", "2"],
            ["Chlorine", "Cl", "17", "2, 8, 7", "1"],
            ["Calcium", "Ca", "20", "2, 8, 8, 2", "2"],
          ],
        },
      },
      {
        title: "Valency, atomic number and mass number",
        points: [
          "**Valency** is the combining capacity of an atom; it is the number of electrons needed to complete the octet, or the number of electrons in the outermost shell if that number is 4 or less.",
          "**Atomic number (Z)** = number of **protons** in the nucleus = number of electrons in a neutral atom.",
          "**Mass number (A)** = number of **protons + neutrons** (together called **nucleons**).",
          "In an atom, the number of **neutrons = A − Z**.",
        ],
      },
      {
        title: "Isotopes and isobars",
        table: {
          head: ["Isotopes", "Isobars"],
          rows: [
            ["Atoms of the same element", "Atoms of different elements"],
            ["Same atomic number, different mass numbers", "Different atomic numbers, same mass number"],
            ["Different number of neutrons", "Different number of protons and neutrons"],
            ["Example: protium ¹H, deuterium ²H, tritium ³H; chlorine-35 and chlorine-37", "Example: calcium-40 and argon-40"],
            ["Uses: iodine-131 in goitre, cobalt-60 in cancer treatment, uranium-235 in nuclear power", "—"],
          ],
        },
      },
      {
        title: "Average atomic mass",
        points: [
          "Chlorine occurs as 75% Cl-35 and 25% Cl-37, so its average atomic mass = (0.75 × 35) + (0.25 × 37) = **35.5 u**.",
        ],
      },
    ],
    keyTerms: [
      { term: "Electron", meaning: "Negatively charged particle revolving around the nucleus." },
      { term: "Proton", meaning: "Positively charged particle present in the nucleus." },
      { term: "Neutron", meaning: "Neutral particle of the nucleus; mass ≈ 1 u." },
      { term: "Atomic number", meaning: "Number of protons in an atom; equal to the number of electrons in a neutral atom." },
      { term: "Mass number", meaning: "Sum of protons and neutrons in the nucleus." },
      { term: "Isotopes", meaning: "Atoms of the same element with the same atomic number but different mass numbers." },
      { term: "Isobars", meaning: "Atoms of different elements with the same mass number but different atomic numbers." },
      { term: "Valency", meaning: "Combining capacity of an atom, decided by its outermost electrons." },
    ],
    examTips: [
      "Be ready to write configurations for Z = 1 to 20. Valency follows automatically from the last shell.",
      "For Rutherford's experiment, write observation → conclusion in two clear lines.",
      "Isotopes vs isobars is a very common 3-mark question — use the table format.",
    ],
  },
  {
    id: "note9-5",
    classLevel: 9,
    chapterNo: 5,
    title: "The Fundamental Unit of Life",
    unit: U2,
    overview:
      "The cell is the basic structural and functional unit of life. This chapter covers the discovery of cells, their structure, organelles and the difference between plant and animal cells.",
    diagram: "plant-cell",
    sections: [
      {
        title: "Discovery and the cell theory",
        points: [
          "**Robert Hooke** (1665) observed cork under his own microscope and saw tiny compartments which he named **cells**.",
          "**Leeuwenhoek** (1674) first saw free-living cells such as bacteria and protozoa.",
          "**Robert Brown** (1831) discovered the **nucleus**.",
          "**Schleiden and Schwann** proposed the cell theory: all plants and animals are made of cells.",
          "**Virchow** (1855) explained that **all cells arise from pre-existing cells** (**Omnis cellula-e cellula**).",
        ],
      },
      {
        title: "Unicellular and multicellular organisms",
        points: [
          "**Unicellular:** a single cell performs all life activities — Amoeba, Paramecium, yeast, bacteria.",
          "**Multicellular:** many cells; cells group into tissues that perform specialised functions — plants, animals and humans.",
          "**Division of labour** among cells allows multicellular organisms to grow bigger and perform complex functions.",
          "Shape and size of cells are related to their specific function: nerve cells are long, red blood cells are round, muscle cells are spindle-shaped.",
        ],
      },
      {
        title: "Structure of the cell",
        points: [
          "**Plasma membrane (cell membrane):** the outer living boundary. It is **selectively permeable** and made mainly of lipids and proteins.",
          "**Diffusion** lets gases move in and out of the cell along a concentration gradient; **osmosis** is the movement of water through a selectively permeable membrane.",
          "**Cell wall:** present only in plant cells; made of **cellulose**; rigid, gives shape and protection, and allows plants to withstand hypotonic conditions without bursting.",
          "**Nucleus:** contains **chromosomes** (DNA + protein), which carry **genes** — the units of inheritance. It carries the **nuclear membrane** with pores, **nucleoplasm** and **nucleolus**.",
          "**Cytoplasm:** jelly-like material between the membrane and the nucleus where all cell reactions happen.",
        ],
      },
      {
        title: "Cell organelles and their functions",
        table: {
          head: ["Organelle", "Main function"],
          rows: [
            ["Endoplasmic reticulum (ER)", "Makes and transports proteins (rough ER has ribosomes) and lipids (smooth ER); acts as the internal transport system"],
            ["Golgi apparatus", "Packages, modifies and dispatches proteins and lipids; forms lysosomes"],
            ["Lysosomes", "Digestive enzymes that break down waste and worn-out cell parts — called **suicide bags**"],
            ["Mitochondria", "Release energy as ATP — called the **powerhouse of the cell**"],
            ["Plastids", "Chloroplasts (green, photosynthesis), leucoplasts (colourless, store starch/oil/protein), chromoplasts (coloured)"],
            ["Vacuoles", "Storage of sap, water, waste; in plant cells a large central vacuole provides turgidity"],
          ],
        },
        tip: "All of these organelles are **membrane-bound**; prokaryotic cells such as bacteria have none of them and no true nucleus.",
      },
      {
        title: "Cell division",
        points: [
          "**Mitosis** produces two identical daughter cells and is used for growth and repair of the body.",
          "**Meiosis** produces four cells with half the number of chromosomes and forms gametes (sperm and egg).",
          "Cell division is needed for growth, replacement of dead cells and reproduction.",
        ],
      },
      {
        title: "Plant cell vs animal cell",
        table: {
          head: ["Plant cell", "Animal cell"],
          rows: [
            ["Has a rigid cell wall of cellulose", "No cell wall; only a flexible cell membrane"],
            ["Usually a large central vacuole", "Small, many vacuoles (or none)"],
            ["Plastids and chloroplasts present", "Plastids absent"],
            ["Nucleus is usually at the side (pushed by the vacuole)", "Nucleus is usually in the centre"],
            ["Centrosome absent", "Centrosome present"],
            ["Mostly fixed in position", "Mostly can move"],
          ],
        },
      },
    ],
    keyTerms: [
      { term: "Cell", meaning: "Basic structural and functional unit of all living organisms." },
      { term: "Selectively permeable membrane", meaning: "A membrane that allows only some substances to pass through it." },
      { term: "Osmosis", meaning: "Movement of water across a selectively permeable membrane from higher to lower water concentration." },
      { term: "Plasmolysis", meaning: "Shrinking of the cell contents when the cell is kept in a hypertonic solution." },
      { term: "Prokaryote", meaning: "Cell with no true nucleus or membrane-bound organelles, e.g. bacteria." },
      { term: "Eukaryote", meaning: "Cell with a true nucleus and membrane-bound organelles, e.g. plant and animal cells." },
      { term: "Mitochondria", meaning: "Organelle that releases energy as ATP; the powerhouse of the cell." },
      { term: "Lysosome", meaning: "Organelle with digestive enzymes; the suicide bag of the cell." },
    ],
    examTips: [
      "Learn to draw and label the plant cell and the animal cell — 3 to 5 marks are usually reserved for this.",
      "Remember the osmosis experiment with raisins or egg in three solutions: hypotonic (swells), isotonic (same), hypertonic (shrinks).",
      "Write the organelle-function table in the answer; two columns make it easy for the examiner to award marks.",
    ],
  },
  {
    id: "note9-6",
    classLevel: 9,
    chapterNo: 6,
    title: "Tissues",
    unit: U2,
    overview:
      "A group of similar cells that work together to perform a specific function is a tissue. This chapter describes plant tissues (meristematic, parenchyma, sclerenchyma, xylem, phloem) and animal tissues (epithelial, connective, muscular, nervous).",
    diagram: "neuron",
    sections: [
      {
        title: "Plant tissues: meristematic tissue",
        points: [
          "Cells divide actively, have thin walls, dense cytoplasm and no vacuoles (or very small ones).",
          "**Apical meristem** — at the tip of roots and shoots; increases **length**.",
          "**Lateral meristem (cambium)** — along the sides; increases **girth (thickness)**.",
          "**Intercalary meristem** — at the base of leaves or internodes, e.g. grass; helps in regrowth.",
        ],
      },
      {
        title: "Simple permanent tissues",
        table: {
          head: ["Tissue", "Cells", "Function"],
          rows: [
            ["Parenchyma", "Living, thin-walled, loosely packed", "Photosynthesis and storage; provides support in some cases (chlorenchyma)"],
            ["Collenchyma", "Living, irregularly thickened at corners", "Flexibility and mechanical support — allows bending without breaking"],
            ["Sclerenchyma", "Dead, long, walls thickened with **lignin**", "Makes the plant hard and stiff — husk of coconut, pear's gritty fruit"],
            ["Epidermis", "Single layer of living cells", "Protection, waterproofing (with cutin) and gas exchange through stomata"],
            ["Cork (cambium-made)", "Dead, compact, no intercellular space", "Protection from mechanical injury, heat and germs; contains suberin"],
          ],
        },
      },
      {
        title: "Complex permanent tissues: xylem and phloem",
        points: [
          "**Xylem** conducts water and minerals **upward from the roots** to all parts. It is made of **tracheids, vessels, xylem parenchyma and xylem fibres**.",
          "**Phloem** transports food prepared in the leaves to other parts (**translocation**). It consists of **sieve tubes, companion cells, phloem parenchyma and phloem fibres**.",
          "Xylem is mostly dead tissue; phloem contains living cells except the fibres.",
          "Together, xylem, phloem and cambium form the **vascular bundle**.",
        ],
      },
      {
        title: "Animal tissues: epithelial and connective",
        points: [
          "**Epithelium** covers and lines: simple squamous (mouth lining, skin), cuboidal (kidney tubules, salivary glands), columnar (small intestine, cilia), glandular (glands) and stratified (skin).",
          "Epithelial cells are tightly packed and form a continuous sheet; they act as a **barrier** and help in absorption, secretion and protection.",
          "**Areolar tissue**: between skin and muscles, fills space, repairs tissue and supports internal organs.",
          "**Adipose tissue**: fat storage below the skin and between organs; acts as an insulator.",
          "**Blood**: a fluid connective tissue — plasma (liquid matrix) + RBC, WBC and platelets; it transports food, oxygen, hormones and waste.",
          "**Bone**: hard, strong, porous; forms the framework and anchors muscles. **Cartilage**: provides flexible support (nose, ear, joints).",
          "**Tendon** joins muscle to bone; **ligament** joins bone to bone (elastic, strong).",
        ],
      },
      {
        title: "Muscular tissue",
        table: {
          head: ["Type", "Location", "Nature"],
          rows: [
            ["Striated (skeletal)", "Attached to bones", "Voluntary, striped, long fibres, many nuclei, fatigue quickly"],
            ["Smooth (unstriated)", "Stomach, intestine, blood vessels, iris", "Involuntary, spindle-shaped, single nucleus"],
            ["Cardiac", "Heart", "Involuntary but striated, branched, rhythmic contraction, never tires"],
          ],
        },
      },
      {
        title: "Nervous tissue",
        points: [
          "The nervous tissue carries messages very quickly through **neurons** (nerve cells) and **neuroglia**.",
          "A neuron has a **cell body**, **dendrites** (receive messages) and a long **axon** (carries the impulse away).",
          "In animals, nervous tissue is responsible for **control and coordination** of the body's activities.",
        ],
      },
    ],
    keyTerms: [
      { term: "Tissue", meaning: "A group of similar cells that work together to perform a particular function." },
      { term: "Meristematic tissue", meaning: "Dividing tissue found in growing regions of plants." },
      { term: "Parenchyma", meaning: "Simple living plant tissue for storage and photosynthesis." },
      { term: "Sclerenchyma", meaning: "Dead plant tissue with lignin-thickened walls giving hardness." },
      { term: "Xylem", meaning: "Plant tissue that conducts water and minerals upward." },
      { term: "Phloem", meaning: "Plant tissue that translocates food from leaves to other parts." },
      { term: "Voluntary muscle", meaning: "Muscle under our conscious control, e.g. striated muscles." },
      { term: "Neuron", meaning: "Structural and functional unit of nervous tissue; carries nerve impulses." },
    ],
    examTips: [
      "Draw the three muscle types (striated, smooth, cardiac) — the striations and branching are the identifying points to label.",
      "Learn at least one example for each tissue type, e.g. collenchyma in tendrils, cardiac muscle in the heart.",
      "For “difference between” questions always answer in a two-column table.",
    ],
  },
  {
    id: "note9-7",
    classLevel: 9,
    chapterNo: 7,
    title: "Motion",
    unit: U3,
    overview:
      "This chapter defines distance, displacement, speed, velocity and acceleration, and develops the three equations of motion used to solve numerical problems. It also introduces uniform circular motion.",
    diagram: "distance-time-graph",
    sections: [
      {
        title: "Rest, motion and reference point",
        points: [
          "An object is in **motion** if its position changes with time with respect to a **reference point**; otherwise it is at **rest**.",
          "Rest and motion are **relative** — a passenger in a moving bus is at rest with respect to the bus and in motion with respect to the road.",
        ],
      },
      {
        title: "Distance, displacement and speed",
        points: [
          "**Distance** is the total length of the path travelled; it is a **scalar** (only magnitude).",
          "**Displacement** is the shortest straight-line distance from the initial to the final position, with direction; it is a **vector**.",
          "Displacement is always **less than or equal to** distance and can be zero even when distance is not zero.",
          "**Speed** = distance ÷ time (scalar). **Velocity** = displacement ÷ time (vector). The SI units are m/s and km/h; 1 km/h = 5/18 m/s.",
          "**Average speed** = total distance ÷ total time; **uniform motion** means equal distances in equal intervals of time.",
        ],
      },
      {
        title: "Acceleration",
        points: [
          "**Acceleration** = change in velocity ÷ time taken; the SI unit is **m/s²**.",
          "Acceleration in the direction of motion speeds up the object; opposite to motion it slows it down — **retardation (negative acceleration)**.",
          "**Uniform acceleration** means velocity changes by equal amounts in equal intervals of time.",
        ],
        formula: ["a = (v − u) / t"],
      },
      {
        title: "The three equations of motion",
        points: [
          "These equations apply only to **uniformly accelerated** motion along a straight line.",
          "u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement.",
        ],
        formula: ["v = u + at", "s = ut + ½at²", "2as = v² − u²"],
      },
      {
        title: "Graphical representation of motion",
        points: [
          "**Distance–time graph:** slope = speed. A straight line means uniform speed, a curved line means non-uniform (changing) speed. A horizontal line means the object is at rest.",
          "**Velocity–time graph:** slope = acceleration; **area under the graph = distance travelled**.",
          "A straight inclined v–t line = uniform acceleration; a horizontal v–t line = uniform velocity (zero acceleration).",
        ],
      },
      {
        title: "Uniform circular motion",
        points: [
          "When an object moves in a circular path with constant speed, its motion is called **uniform circular motion**.",
          "The direction of motion changes continuously, so the velocity changes: the motion is **accelerated** even though the speed is constant.",
          "Examples: a stone whirled on a string, the moon revolving around the Earth, the tip of a clock's hand.",
        ],
      },
      {
        title: "Solved numerical patterns",
        points: [
          "A car accelerates uniformly from 18 km/h to 36 km/h in 5 s: u = 5 m/s, v = 10 m/s, a = (10 − 5)/5 = **1 m/s²**.",
          "A body starting from rest with a = 2 m/s² for 5 s reaches v = 0 + 2 × 5 = **10 m/s**.",
          "A train covers 120 km in 2 h: average speed = **60 km/h**.",
        ],
        tip: "Always convert km/h into m/s (multiply by 5/18) before putting values into the equations.",
      },
    ],
    keyTerms: [
      { term: "Distance", meaning: "Total length of the actual path covered; a scalar quantity." },
      { term: "Displacement", meaning: "Shortest distance between initial and final positions, with direction." },
      { term: "Speed / Velocity", meaning: "Rate of change of distance / of displacement." },
      { term: "Acceleration", meaning: "Rate of change of velocity; SI unit m/s²." },
      { term: "Retardation", meaning: "Negative acceleration, when velocity decreases with time." },
      { term: "Uniform motion", meaning: "Motion with equal distances covered in equal intervals of time." },
      { term: "Uniform circular motion", meaning: "Motion in a circle with constant speed but changing velocity." },
    ],
    examTips: [
      "In graph questions label the axes with quantity **and** unit, and mark the scale clearly.",
      "Area under a v–t graph gives distance — this single line can fetch marks even when the arithmetic is long.",
      "Write the formula, substitute values with units, then state the answer. Never skip the unit.",
    ],
  },
  {
    id: "note9-8",
    classLevel: 9,
    chapterNo: 8,
    title: "Force and Laws of Motion",
    unit: U3,
    overview:
      "Force changes the state of rest or motion. This chapter develops Newton's three laws of motion, the idea of inertia, momentum, and the conservation of momentum with practical examples.",
    diagram: "forces-free-body",
    sections: [
      {
        title: "Force and its effects",
        points: [
          "A **force** is a push or a pull that tends to change the state of rest or of uniform motion, the speed, or the direction/shape of an object.",
          "Forces can act through contact (muscular, friction) or at a distance (gravitational, magnetic, electrostatic).",
          "The **net force** is the resultant of all forces; if it is zero, the object stays at rest or in uniform motion.",
          "The SI unit of force is the **newton (N)**: 1 N = 1 kg m/s².",
        ],
      },
      {
        title: "Inertia and Newton's first law",
        points: [
          "**Inertia** is the natural tendency of an object to resist a change in its state of rest or motion; it depends on **mass**.",
          "**Newton's first law (law of inertia):** an object continues to be in a state of rest or of uniform motion in a straight line unless acted upon by an unbalanced external force.",
          "Examples: passengers fall forward when a moving bus brakes suddenly (inertia of motion) and fall backward when it starts suddenly (inertia of rest).",
          "A heavier object has more inertia — it is harder to set moving or to stop.",
        ],
      },
      {
        title: "Momentum",
        points: [
          "**Momentum (p)** is the product of mass and velocity; it is a vector along the direction of velocity.",
          "A cricket ball hurts more than a tennis ball at the same speed because it has greater momentum.",
        ],
        formula: ["p = m × v", "SI unit: kg m/s"],
      },
      {
        title: "Newton's second law and the third law",
        points: [
          "**Second law:** the rate of change of momentum of an object is directly proportional to the applied unbalanced force and takes place in the direction of the force.",
          "From this, **F = ma** is derived. It explains why a lighter object accelerates more for the same force.",
          "**Third law:** to every action there is an equal and opposite reaction, acting on two different bodies.",
          "Examples: recoil of a gun, walking (we push the ground backward), a rocket moving forward by pushing gases backward.",
        ],
        formula: ["F = ma", "F = (mv − mu) / t"],
      },
      {
        title: "Conservation of momentum",
        points: [
          "In the absence of an external unbalanced force, the **total momentum of a system remains constant**.",
          "For two colliding bodies: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂.",
          "This law follows from Newton's third law and explains collisions, bullet-gun recoil and rocket propulsion.",
        ],
      },
      {
        title: "Common applications to remember",
        points: [
          "Seat belts and airbags increase the time of impact → less force on the passenger.",
          "A fielder moves his hands backwards while catching a ball → longer time, smaller force.",
          "A karate player strikes with a fast blow → large momentum change in a very short time gives a huge force.",
          "When a horse pulls a cart, the cart also pulls the horse; the cart moves because the horse pushes the ground harder.",
        ],
      },
      {
        title: "Solved numerical patterns",
        points: [
          "F = 10 N on m = 2 kg → a = F/m = **5 m/s²**.",
          "Momentum of a 1000 kg car at 10 m/s = **10,000 kg m/s**.",
          "Recoil: a 4 kg rifle firing a 0.02 kg bullet at 400 m/s recoils with v = −(0.02 × 400)/4 = **−2 m/s**.",
        ],
      },
    ],
    keyTerms: [
      { term: "Force", meaning: "An external agent that changes or tends to change the state of rest or motion." },
      { term: "Inertia", meaning: "The tendency of a body to resist a change in its state of rest or motion." },
      { term: "Momentum", meaning: "Product of the mass and velocity of a body; a vector quantity." },
      { term: "Newton's first law", meaning: "A body continues in its state of rest or uniform motion unless an unbalanced force acts." },
      { term: "Newton's second law", meaning: "Force equals the rate of change of momentum; F = ma." },
      { term: "Newton's third law", meaning: "Every action has an equal and opposite reaction on another body." },
      { term: "Conservation of momentum", meaning: "Total momentum of an isolated system stays constant." },
    ],
    examTips: [
      "Always say **which body** the reaction force acts on in third-law answers — action and reaction act on different bodies.",
      "For momentum numericals, write the equation m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ before substituting.",
      "Learn two daily-life applications of each law — they carry 2–3 marks.",
    ],
  },
  {
    id: "note9-9",
    classLevel: 9,
    chapterNo: 9,
    title: "Gravitation",
    unit: U3,
    overview:
      "Every object attracts every other object. This chapter covers the universal law of gravitation, free fall, the value of g, thrust and pressure, and Archimedes' principle.",
    diagram: "buoyancy",
    sections: [
      {
        title: "Universal law of gravitation",
        points: [
          "Every object in the universe attracts every other object with a force that is **directly proportional to the product of their masses** and **inversely proportional to the square of the distance** between them.",
          "The force acts along the line joining the centres and is always **attractive**.",
          "G is the **universal gravitational constant**: G = 6.673 × 10⁻¹¹ N m² kg⁻². Its value is the same everywhere in the universe.",
        ],
        formula: ["F = G m₁m₂ / d²"],
      },
      {
        title: "Free fall and acceleration due to gravity",
        points: [
          "**Free fall** is the motion of an object under the force of gravity alone (air resistance ignored).",
          "The acceleration due to gravity is **g = 9.8 m/s²** near the Earth's surface; on the moon it is about **1/6 of g**.",
          "Equations for free fall: v = u + gt, h = ut + ½gt², v² = u² + 2gh.",
          "**Mass** is the quantity of matter and does not change; **weight** = m × g and changes from place to place (it is zero in free fall).",
          "g decreases with height and depth, and is maximum at the **poles** and minimum at the **equator** because the Earth is not a perfect sphere.",
        ],
        formula: ["W = m × g", "SI unit of weight: newton (N)"],
      },
      {
        title: "Thrust and pressure",
        points: [
          "**Thrust** is the force acting perpendicular to a surface; **pressure** = thrust ÷ area.",
          "The SI unit of pressure is the **pascal (Pa)**: 1 Pa = 1 N/m².",
          "The same force on a smaller area produces greater pressure — a nail has a sharp tip, a camel has broad feet, and tractors have wide tyres.",
          "Fluids exert pressure in all directions; pressure increases with depth.",
        ],
      },
      {
        title: "Buoyancy and Archimedes' principle",
        points: [
          "When an object is immersed in a fluid, it experiences an upward force called **buoyant force (upthrust)**.",
          "**Archimedes' principle:** the buoyant force on an object is equal to the **weight of the fluid displaced** by it.",
          "An object **floats** if its density is less than that of the fluid (cork on water), **sinks** if denser (iron nail), and **stays in equilibrium** if the densities are equal.",
          "The buoyant force depends on the **volume of the object** and the **density of the fluid**, not on the material of the object.",
          "Applications: ships (hollow shape increases volume and displaces more water), submarines (ballast tanks), hot-air balloons, life jackets.",
        ],
        tip: "**Relative density** = density of substance ÷ density of water. It has **no unit** because it is a ratio of two densities.",
      },
      {
        title: "Solved numerical patterns",
        points: [
          "If the distance between two objects is doubled, the force becomes **one-fourth** (F ∝ 1/d²).",
          "Weight of a 10 kg object on Earth: 10 × 9.8 = **98 N**; on the moon ≈ 16.3 N.",
          "Density of a body of mass 500 g and volume 100 cm³ = 5 g/cm³ — it will sink in water.",
        ],
      },
    ],
    keyTerms: [
      { term: "Gravitation", meaning: "The mutual attractive force between any two objects in the universe." },
      { term: "Free fall", meaning: "Motion under gravity alone, with no other force acting." },
      { term: "Acceleration due to gravity (g)", meaning: "Acceleration produced by Earth's gravity, 9.8 m/s²." },
      { term: "Weight", meaning: "Force with which the Earth attracts an object; W = mg." },
      { term: "Thrust", meaning: "Force acting perpendicular to a surface." },
      { term: "Buoyant force", meaning: "Upward force exerted by a fluid on an immersed object." },
      { term: "Archimedes' principle", meaning: "Buoyant force equals the weight of the fluid displaced." },
      { term: "Relative density", meaning: "Ratio of the density of a substance to the density of water; no unit." },
    ],
    examTips: [
      "Remember G is universal but g changes with height, depth and latitude — a favourite one-mark question.",
      "In float/sink answers, always compare densities, not weights.",
      "State Archimedes' principle in the exact wording, then give one application such as a ship or submarine.",
    ],
  },
  {
    id: "note9-10",
    classLevel: 9,
    chapterNo: 10,
    title: "Work and Energy",
    unit: U3,
    overview:
      "This chapter defines work, energy, power and the law of conservation of energy, and links them to kinetic and potential energy with practical applications.",
    diagram: "energy-conversion",
    sections: [
      {
        title: "Work done by a force",
        points: [
          "**Work** is said to be done when a force acting on an object displaces it in the direction of the force.",
          "W = F × s (when force and displacement are in the same direction). The SI unit of work is the **joule (J)**: 1 J = 1 N m.",
          "If the displacement is zero, no work is done — a coolie carrying a load on his head and walking on level ground does **no work against gravity**.",
          "If the force acts at an angle θ, work = F s cos θ. Work done by a force perpendicular to displacement (θ = 90°) is **zero**.",
          "Work is **positive** when force and displacement are in the same direction, and **negative** when they are opposite (e.g. friction).",
        ],
      },
      {
        title: "Energy: kinetic and potential",
        points: [
          "**Energy** is the capacity to do work; the SI unit is the joule.",
          "**Kinetic energy** is the energy possessed by a moving object and depends on the square of velocity — a small increase in speed increases KE a lot.",
          "**Potential energy** is the energy stored due to position or configuration; for a body at height h, Eₚ = mgh.",
          "Doubling the velocity makes the kinetic energy **four times** larger.",
        ],
        formula: ["Eₖ = ½mv²", "Eₚ = mgh"],
      },
      {
        title: "Law of conservation of energy",
        points: [
          "Energy can neither be created nor destroyed; it can only be **transformed** from one form into another.",
          "The total energy of an isolated system remains constant.",
          "For a freely falling object: potential energy gradually converts into kinetic energy, and the total mechanical energy stays the same.",
          "For a pendulum: at the extremes all energy is potential; at the mean position all energy is kinetic.",
        ],
        tip: "In conversions, always account for energy “lost” as heat or sound — it is still conserved, just not useful.",
      },
      {
        title: "Power and the commercial unit of energy",
        points: [
          "**Power** is the rate of doing work: P = W/t. Its SI unit is the **watt (W)**: 1 W = 1 J/s.",
          "1 kilowatt = 1000 W; 1 horsepower ≈ 746 W.",
          "The commercial unit of electrical energy is the **kilowatt-hour (kWh)**, called 1 unit: 1 kWh = 3.6 × 10⁶ J.",
          "Your electricity bill is calculated in kWh — a 100 W bulb used for 10 hours consumes 1 kWh.",
        ],
        formula: ["P = W / t", "1 kWh = 3.6 × 10⁶ J", "P = F × v (average)"],
      },
      {
        title: "Useful energy transformations",
        table: {
          head: ["Device", "Energy transformation"],
          rows: [
            ["Electric cell / battery", "Chemical → electrical"],
            ["Electric motor", "Electrical → mechanical"],
            ["Electric generator", "Mechanical → electrical"],
            ["Loudspeaker", "Electrical → sound"],
            ["Solar cell", "Solar → electrical"],
            ["Green plant", "Solar → chemical (food)"],
            ["Hydro power plant", "Potential energy of water → electrical"],
          ],
        },
      },
      {
        title: "Solved numerical patterns",
        points: [
          "KE of a 2 kg ball at 3 m/s = ½ × 2 × 9 = **9 J**.",
          "PE of a 10 kg object at 5 m (g = 10 m/s²) = 10 × 10 × 5 = **500 J**.",
          "Power of a machine that does 600 J of work in 20 s = **30 W**.",
        ],
      },
    ],
    keyTerms: [
      { term: "Work", meaning: "Product of force and displacement in the direction of the force; unit joule." },
      { term: "Energy", meaning: "Capacity of a body to do work; unit joule." },
      { term: "Kinetic energy", meaning: "Energy possessed by a body by virtue of its motion, ½mv²." },
      { term: "Potential energy", meaning: "Energy possessed by a body by virtue of its position or state, mgh." },
      { term: "Power", meaning: "Rate of doing work or of transferring energy; unit watt." },
      { term: "Law of conservation of energy", meaning: "Energy can be neither created nor destroyed, only transformed." },
      { term: "1 kWh", meaning: "Commercial unit of energy equal to 3.6 × 10⁶ J." },
    ],
    examTips: [
      "For “is work done?” questions, check the angle between force and displacement — 90° means zero work.",
      "In conservation-of-energy answers, write the statement of the law first, then substitute Eₚ = Eₖ.",
      "Memorise 1 kWh = 3.6 × 10⁶ J. Numericals on electricity bills use this conversion.",
    ],
  },
  {
    id: "note9-11",
    classLevel: 9,
    chapterNo: 11,
    title: "Sound",
    unit: U3,
    overview:
      "Sound is a form of energy produced by vibration and travels as a longitudinal wave through a medium. This chapter covers production, propagation, speed, reflection (echo), and applications like SONAR.",
    diagram: "sound-wave",
    sections: [
      {
        title: "Production and propagation of sound",
        points: [
          "Sound is produced by **vibration** of an object; vibrating objects produce sound, and the sound stops when vibrations stop.",
          "Sound needs a **material medium** (solid, liquid or gas) to travel; it **cannot travel in vacuum**.",
          "In air, a vibrating object creates **compressions** (high pressure) and **rarefactions** (low pressure) — a **longitudinal wave**.",
          "Sound travels faster in solids than in liquids, and faster in liquids than in gases because of the closer packing of particles.",
          "Speed of sound in air ≈ **344 m/s** at 22 °C; in water ≈ 1500 m/s; in steel ≈ 5000 m/s.",
        ],
      },
      {
        title: "Characteristics of a sound wave",
        table: {
          head: ["Feature", "Depends on", "Effect"],
          rows: [
            ["Loudness", "Amplitude", "A larger amplitude means a louder sound; measured in decibels (dB)"],
            ["Pitch", "Frequency", "Higher frequency = higher (shriller) pitch"],
            ["Quality (timbre)", "Waveform / mixture of frequencies", "Lets us recognise a voice or instrument"],
            ["Speed", "Medium and temperature", "Increases with temperature of the medium"],
          ],
        },
        formula: ["v = λ × ν", "T = 1 / ν", "where λ = wavelength, ν = frequency, T = time period"],
      },
      {
        title: "Audible and inaudible sound",
        points: [
          "Humans hear frequencies from **20 Hz to 20,000 Hz** — the **audible range**.",
          "**Infrasonic** sounds are below 20 Hz (earthquakes, volcanoes, whales and elephants).",
          "**Ultrasonic** sounds are above 20,000 Hz (bats, dolphins, ultrasound scanners).",
          "Ultrasound is used in medicine (sonography, breaking kidney stones), engineering (cleaning, detecting cracks) and by animals for navigation.",
        ],
      },
      {
        title: "Reflection of sound: echo and reverberation",
        points: [
          "Sound bounces off hard surfaces just like light — **reflection of sound** obeys the laws of reflection.",
          "An **echo** is the distinct repetition of sound heard after reflection; it needs a minimum distance of about **17.2 m** from a large reflecting surface (at 344 m/s).",
          "**Reverberation** is the persistence of sound due to repeated reflections in a large hall; it is reduced with sound-absorbing materials (curtains, carpets, acoustic panels).",
          "The sensation of sound persists in our brain for about **0.1 s**, which is how the 17.2 m figure is calculated.",
        ],
        formula: ["2d = v × t  (for echoes)"],
      },
      {
        title: "SONAR and applications of sound reflection",
        points: [
          "**SONAR** (Sound Navigation And Ranging) uses ultrasonic waves to measure the depth of the sea and to locate underwater objects.",
          "The transmitted pulse is reflected by the seabed or object and the echo is received; depth = (v × t) ÷ 2.",
          "Similar principles are used in **ultrasound scanning** of the human body, in the **stethoscope**, and by **bats** for navigation.",
        ],
      },
      {
        title: "Structure of the human ear (working)",
        points: [
          "The **pinna** collects sound; it travels through the ear canal to the **eardrum (tympanum)**, which vibrates.",
          "These vibrations pass through the three tiny bones — **hammer, anvil and stirrup** — and are amplified.",
          "They reach the **cochlea** in the inner ear, where they are converted into electrical signals and sent to the brain by the **auditory nerve**.",
        ],
      },
    ],
    keyTerms: [
      { term: "Vibration", meaning: "Rapid to-and-fro motion of an object, which produces sound." },
      { term: "Compression", meaning: "Region of high pressure in a longitudinal wave." },
      { term: "Rarefaction", meaning: "Region of low pressure in a longitudinal wave." },
      { term: "Wavelength", meaning: "Distance between two consecutive compressions or rarefactions." },
      { term: "Frequency", meaning: "Number of vibrations per second, measured in hertz (Hz)." },
      { term: "Amplitude", meaning: "Maximum displacement of particles from their mean position; decides loudness." },
      { term: "Echo", meaning: "Repetition of sound due to reflection from a distant surface." },
      { term: "Reverberation", meaning: "Persistence of sound in a hall due to repeated reflections." },
      { term: "SONAR", meaning: "Technique using ultrasonic waves to measure sea depth and find underwater objects." },
    ],
    examTips: [
      "Learn the human ear diagram and the v = λ × ν formula — both are asked frequently.",
      "For echo numericals, remember the sound travels **twice** the distance (to the surface and back).",
      "Write units in Hz, m and m/s; and never forget to mention that sound needs a medium.",
    ],
  },
  {
    id: "note9-12",
    classLevel: 9,
    chapterNo: 12,
    title: "Improvement in Food Resources",
    unit: U4,
    overview:
      "This chapter explains how food production is improved through better crop varieties, cropping patterns, fertilisers, irrigation, and management of livestock, poultry and fish.",
    diagram: "cropping-patterns",
    sections: [
      {
        title: "Food from where?",
        points: [
          "Plants provide cereals, pulses, oilseeds, vegetables, fruits, sugar, spices and fodder; animals provide milk, eggs, meat and fish.",
          "India needs high production due to a rising population — production must increase without harming resources.",
          "Improvement is achieved through better crop varieties, improved cultivation practices and protection from pests.",
        ],
      },
      {
        title: "Crop seasons and major crops",
        table: {
          head: ["Season", "Months", "Crops"],
          rows: [
            ["Kharif", "June to October (rainy)", "Paddy, maize, jowar, bajra, tur, moong, cotton, jute, groundnut"],
            ["Rabi", "November to March (winter)", "Wheat, barley, peas, gram, mustard, linseed"],
            ["Zaid", "April to June (summer)", "Watermelon, muskmelon, cucumber, fodder crops"],
          ],
        },
      },
      {
        title: "Crop variety improvement",
        points: [
          "Done by **hybridisation** (crossing genetically different parents) and **genetic modification** (introducing a gene for a desired trait).",
          "Aim: higher yield, better quality, resistance to biotic (pests, diseases) and abiotic (drought, salinity) stress, shorter maturity and wider adaptability.",
          "Hybrid varieties of wheat (e.g. from Mexican dwarf varieties and Indian wheat) helped in the **Green Revolution**.",
        ],
      },
      {
        title: "Crop production management",
        points: [
          "**Manure** is organic (cattle dung, plant waste); it enriches the soil with humus and improves water-holding capacity.",
          "**Fertilisers** are chemical nutrient suppliers (urea, NPK); overuse causes **soil and water pollution**.",
          "**Organic farming** avoids chemical fertilisers and pesticides and uses organic manure, bio-fertilisers and crop rotation.",
          "**Irrigation** supplies water: canals, wells, tube wells, tanks, and drip/sprinkler systems that save water.",
          "**Cropping patterns:** mixed cropping (two or more crops together), intercropping (definite rows) and crop rotation (planned succession to maintain fertility).",
        ],
      },
      {
        title: "Crop protection and storage",
        points: [
          "Pests (insects, rodents, birds, weeds) are controlled by chemicals (pesticides), biological methods and resistant varieties.",
          "**Weedicides** remove weeds; **biological pest control** uses natural predators instead of chemicals.",
          "Stored grains are damaged by insects, rodents, fungi and moisture — controlled by **proper drying, airtight storage and fumigation**.",
        ],
      },
      {
        title: "Animal husbandry: cattle and poultry",
        points: [
          "**Cattle** breeds: indigenous (Sahiwal, Red Sindhi, Gir) and exotic (Jersey, Brown Swiss). Milch animals give milk; draught animals work in fields.",
          "Requirements: shelter, fodder (roughage + concentrate), clean water, minerals and regular health care.",
          "**Poultry** — layers are for eggs, broilers for meat. Good housing, feeding and disease control give high yields.",
          "**Bee-keeping (apiculture)** provides honey and wax; Italian bees are commonly reared for honey.",
        ],
      },
      {
        title: "Fisheries",
        points: [
          "**Capture fishing** (natural waters) and **culture fishing** (ponds, cages) both contribute.",
          "**Composite fish culture** rears several species together: catla (surface feeder), rohu (middle), mrigal and common carp (bottom).",
          "Breeding of fish is done by using **induced breeding** (hypophysation) so that seed is available throughout the year.",
        ],
      },
    ],
    keyTerms: [
      { term: "Kharif crop", meaning: "Crops grown in the rainy season, June to October." },
      { term: "Rabi crop", meaning: "Crops grown in the winter season, November to March." },
      { term: "Hybridisation", meaning: "Crossing two genetically different parents to get an improved variety." },
      { term: "Manure", meaning: "Organic matter added to soil to supply nutrients and improve its texture." },
      { term: "Compost", meaning: "Manure prepared from decomposed plant and animal waste." },
      { term: "Vermicompost", meaning: "Compost prepared using earthworms." },
      { term: "Intercropping", meaning: "Growing two or more crops in definite rows on the same field." },
      { term: "Apiculture", meaning: "Rearing of honeybees for honey and wax." },
      { term: "Composite fish culture", meaning: "Rearing different fish species together in one pond." },
    ],
    examTips: [
      "Learn the kharif / rabi / zaid table with at least four crops each.",
      "Distinguish manure and fertiliser, and mixed cropping vs intercropping vs crop rotation — very common 3-mark questions.",
      "Give one Indian breed name for cattle and one for poultry to score the example mark.",
    ],
  },
];
