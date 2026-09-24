import type { NoteSection } from "./types";

/** Additional NCERT-aligned depth: observations, examples, processes and common misconceptions. */
export const expandedScience: Record<string, NoteSection[]> = {
  "note9-1": [
    { title: "Particle motion, pressure and change of state", points: [
      "Particles in a solid vibrate about fixed positions; heating increases vibration until the forces holding them in place are overcome at the melting point.",
      "Liquids have a definite volume but no fixed shape because their particles remain close yet slide past each other. Gases are highly compressible because there is a great deal of empty space between particles.",
      "Increasing pressure can bring gas particles closer and turn a gas into a liquid. LPG and CNG are stored under pressure; dry ice is solid CO₂ kept at low temperature.",
      "During melting or boiling, supplied heat increases potential energy by overcoming attraction rather than raising temperature. Once the change is complete, temperature rises again.",
      "At the same temperature, lighter particles usually diffuse faster. Heating speeds diffusion, which is why perfume spreads faster in a warm room.",
    ], formula: ["K = °C + 273", "K = °C + 273.15 (approximately 273 K in school numericals)"] },
  ],
  "note9-2": [
    { title: "Choosing and using separation methods", points: [
      "Use a separating funnel when two liquids are **immiscible** and have different densities; the denser layer settles at the bottom and is drained first.",
      "Simple distillation separates a solvent from dissolved solids or liquids with a large boiling-point difference. Fractional distillation uses a fractionating column when boiling points are close.",
      "Chromatography separates substances because they travel at different speeds with a moving solvent. A baseline is drawn in pencil; the solvent must not cover the spots at the start.",
      "Crystallisation is better than simply evaporating to dryness when a solid may decompose on strong heating; slow cooling gives larger, purer crystals.",
      "A colloid looks uniform but scatters light. Smoke is solid particles in gas, fog is liquid droplets in gas and milk is liquid droplets in liquid.",
    ], tip: "Choose a method from the physical property that differs: particle size (filtration), boiling point (distillation), solubility (crystallisation) or density (separating funnel)." },
  ],
  "note9-3": [
    { title: "Writing formulae and mole calculations step by step", points: [
      "For an ionic formula, write the positive ion first, criss-cross the valencies as subscripts, reduce to the simplest whole-number ratio, and use brackets around repeated polyatomic ions.",
      "Example: aluminium sulphate uses Al³⁺ and SO₄²⁻, so the formula is Al₂(SO₄)₃. Calcium hydroxide uses Ca²⁺ and OH⁻, so it is Ca(OH)₂.",
      "A molecule is not the same as a formula unit: water consists of molecules, while solid sodium chloride is an ionic lattice described by formula units.",
      "In a mole problem identify the given quantity, convert it to moles using molar mass, then convert moles to particles using Avogadro's constant.",
      "The number of atoms in a sample may be found by multiplying molecules by atoms per molecule; 1 mole of O₂ contains 2 moles of oxygen atoms.",
    ], formula: ["n = mass / molar mass", "Particles = n × 6.022 × 10²³", "For O₂: moles of O atoms = 2 × moles of O₂ molecules"] },
  ],
  "note9-4": [
    { title: "Models, electronic configuration and isotopes", points: [
      "Thomson's model explained electrical neutrality but could not explain why most alpha particles passed through gold foil while a few were strongly deflected.",
      "Rutherford concluded that nearly all the positive charge and mass occupy a very small nucleus; the electrons occupy the much larger surrounding space.",
      "Bohr proposed fixed energy shells. In the school-level shell model, electrons fill K first, then L, then M; the outer shell of these elements is completed to an octet where possible.",
      "Valency can be found from the outer-shell count: 1–4 electrons are generally used/lost/shared; 5–7 electrons need 8 minus that number; a full outer shell has valency zero.",
      "Isotopes behave similarly in chemical reactions because they have the same electrons and atomic number, but their physical properties can differ because their masses differ.",
    ], formula: ["Z = protons = electrons (neutral atom)", "A = protons + neutrons", "Neutrons = A − Z"] },
  ],
  "note9-5": [
    { title: "Membrane transport and cell organisation", points: [
      "Diffusion moves particles from higher to lower concentration without using cellular energy; oxygen entering a cell is one example.",
      "Osmosis is specifically the movement of water through a selectively permeable membrane from a dilute solution (more free water) towards a concentrated solution.",
      "A plant cell in a hypotonic solution takes in water and becomes turgid; in a hypertonic solution it loses water and the membrane pulls away from the wall (plasmolysis).",
      "The cell membrane controls entry and exit, while the plant cell wall gives extra mechanical support and prevents bursting in dilute surroundings.",
      "Prokaryotes such as bacteria have a nucleoid region without a nuclear membrane; eukaryotes have a membrane-bound nucleus and organelles.",
    ], tip: "Osmosis is the movement of water only; diffusion can describe movement of many kinds of particles." },
  ],
  "note9-6": [
    { title: "Plant transport and tissue identification", points: [
      "Xylem vessels and tracheids conduct water and minerals from roots to leaves. Their thick lignified walls also support the plant.",
      "Phloem transports soluble food from leaves to growing or storage regions. Movement can be upward or downward and requires energy.",
      "Stomata are pores controlled by guard cells. When guard cells take up water they become turgid and the pore opens; loss of water closes it.",
      "Parenchyma with chlorophyll is called chlorenchyma; air-filled parenchyma in aquatic plants is aerenchyma and helps with buoyancy.",
      "Animal connective tissues have cells embedded in a matrix: plasma in blood, hard minerals in bone, flexible matrix in cartilage and fibres in tendons/ligaments.",
    ], tip: "At the tip of a growing root or shoot, expect apical meristem; for increase in girth, expect lateral meristem/cambium." },
  ],
  "note9-7": [
    { title: "Interpreting motion graphs and selecting equations", points: [
      "A horizontal distance–time graph means the object's position is not changing. A straight sloping line means constant speed; a curve means speed is changing.",
      "For a velocity–time graph, slope is acceleration. A line sloping upward shows positive acceleration; a downward slope shows retardation.",
      "The area under a velocity–time graph is displacement. For a rectangle use length × height; for a triangle use ½ × base × height.",
      "Use v=u+at when displacement is not needed; s=ut+½at² when final velocity is not needed; 2as=v²−u² when time is not needed.",
      "For circular motion the speed can be constant but velocity changes because direction changes, so a centripetal acceleration exists towards the centre.",
    ], formula: ["Average speed = total distance / total time", "Average velocity = total displacement / total time", "1 km/h = 5/18 m/s"] },
  ],
  "note9-8": [
    { title: "Impulse, momentum and everyday applications", points: [
      "A force acting for a time changes momentum. The product of force and contact time is called impulse, and equals the change in momentum.",
      "A fielder pulls the hands backward while catching a ball to increase stopping time; for the same momentum change the force on the hands becomes smaller.",
      "Seat belts and airbags increase the time over which a passenger stops during a collision, reducing the force on the body.",
      "A rocket pushes gases backward; the gases exert an equal and opposite force on the rocket, propelling it forward even in space.",
      "In a collision, momentum before equals momentum after for an isolated system; energy may transform into sound, heat or deformation.",
    ], formula: ["Impulse = F × t = change in momentum", "F = (mv − mu) / t", "Total momentum before = total momentum after"] },
  ],
  "note9-9": [
    { title: "Mass, weight, pressure and buoyancy", points: [
      "Mass is the amount of matter and remains the same on Earth and Moon; weight is gravitational force and changes with g.",
      "An object of mass 60 kg weighs about 588 N on Earth (g=9.8 m/s²) but about 98 N on the Moon (g≈1.63 m/s²).",
      "Pressure increases when the same force acts on a smaller area. A sharp knife cuts better and a camel's broad feet reduce pressure on sand.",
      "Buoyant force acts upward because fluid pressure is greater at the lower surface of an immersed object than at the upper surface.",
      "A floating object displaces fluid whose weight equals the object's weight; a fully immersed sinking object has weight greater than the buoyant force.",
    ], formula: ["W = mg", "Pressure = thrust / area", "Relative density = density of substance / density of water"] },
  ],
  "note9-10": [
    { title: "Work, energy and power in detail", points: [
      "Work is zero when there is no displacement, even if force is applied; it is also zero if force is perpendicular to displacement.",
      "Kinetic energy depends on both mass and the square of speed. A moving vehicle has more KE when faster; stopping it requires more work.",
      "Potential energy depends on the chosen reference height. Raising an object increases its gravitational potential energy by mgh.",
      "In a swinging pendulum, energy continually changes between kinetic and potential forms; small losses to air resistance and friction become heat and sound.",
      "Power compares how quickly work is done: two people may do the same work, but the one who does it in less time has greater power.",
    ], formula: ["W = Fs (same direction)", "Eₖ = ½mv²", "Eₚ = mgh", "P = W/t"] },
  ],
  "note9-11": [
    { title: "Wave quantities, echoes and sound applications", points: [
      "Frequency is the number of vibrations per second; time period is the time for one vibration. They are reciprocals.",
      "Loudness depends chiefly on amplitude; pitch depends on frequency; quality/timbre helps distinguish two instruments playing the same note.",
      "A distinct echo requires the reflected sound to arrive at least 0.1 s after the original. At 344 m/s, the reflector must be about 17.2 m away.",
      "Ultrasound can image internal organs, clean delicate machine parts and detect cracks in metal blocks because it reflects from boundaries.",
      "SONAR sends a pulse and measures the time for its echo to return; divide the total travelled distance by two to find the depth.",
    ], formula: ["v = frequency × wavelength", "T = 1/f", "Distance to reflector = v × echo time / 2"] },
  ],
  "note9-12": [
    { title: "Nutrients, irrigation and sustainable crop production", points: [
      "Macronutrients needed in large amounts include nitrogen, phosphorus, potassium, calcium, magnesium and sulphur; micronutrients include iron, manganese, boron, zinc and copper.",
      "Manure adds humus and improves soil texture; fertilisers supply concentrated nutrients quickly. Excess fertiliser can leach into water and harm ecosystems.",
      "Irrigation sources include wells, tube wells, canals, tanks and river-lift systems; drip and sprinkler systems reduce water wastage.",
      "Crop rotation with legumes such as gram or peas helps restore soil nitrogen; intercropping reduces pests and makes better use of light and nutrients.",
      "Good storage requires drying grain, cleaning, pest control, moisture-proof bins and periodic inspection to prevent fungal growth and insect damage.",
    ], tip: "An improved variety alone is not enough: seed, soil nutrients, water, pest control and storage all affect final yield." },
  ],

  "note10-1": [
    { title: "Writing, balancing and classifying reactions", points: [
      "Write correct formulae first, count atoms on each side, then balance using coefficients. Reduce coefficients to the smallest whole-number ratio.",
      "Combination: CaO + H₂O → Ca(OH)₂. Decomposition: 2AgCl → 2Ag + Cl₂ in sunlight. Displacement: Zn + CuSO₄ → ZnSO₄ + Cu.",
      "Double displacement often forms a precipitate, gas or water; BaSO₄ is a white precipitate when sodium sulphate reacts with barium chloride.",
      "Exothermic reactions release heat, such as respiration and combustion. Endothermic reactions absorb heat, such as photosynthesis and thermal decomposition.",
      "Add state symbols and conditions when supplied: CaCO₃(s) —heat→ CaO(s)+CO₂(g).",
    ], tip: "Before changing coefficients, check that every reactant and product formula is chemically correct." },
  ],
  "note10-2": [
    { title: "Indicators, ionisation and salt formation", points: [
      "Acids show acidic behaviour in water because they produce H⁺/H₃O⁺ ions; dry HCl gas does not change dry litmus because ions need water.",
      "Bases dissolve or ionise in water to provide OH⁻ ions. Strong acids/bases ionise more completely than weak ones.",
      "Acid plus metal carbonate gives salt, water and carbon dioxide. Pass CO₂ through limewater: it turns milky due to calcium carbonate.",
      "A neutralisation reaction is generally exothermic. The salt's nature depends on the strengths of the acid and base that formed it.",
      "pH is logarithmic: a solution at pH 3 is more acidic than pH 4, not just one unit in a simple linear sense.",
    ], formula: ["H⁺ + OH⁻ → H₂O", "Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O", "NaHCO₃ + HCl → NaCl + H₂O + CO₂"] },
  ],
  "note10-3": [
    { title: "Reactivity, ionic bonds and extraction", points: [
      "Metal atoms lose electrons to form positive ions; non-metals gain electrons to form negative ions. Electrostatic attraction holds an ionic compound together.",
      "Ionic compounds are hard but brittle: shifting layers brings like charges together and the crystal breaks.",
      "Metals high in the reactivity series (K, Na, Ca, Mg, Al) cannot be reduced by carbon and are extracted by electrolysis of molten compounds.",
      "Middle-reactivity metals such as Zn, Fe and Pb are commonly extracted by roasting/calcination followed by reduction with carbon or carbon monoxide.",
      "Least-reactive metals such as gold occur in native/free form. Electrolytic refining uses an impure anode, pure cathode and metal-salt electrolyte.",
    ], tip: "A more reactive metal displaces a less reactive metal from its salt, but not the reverse." },
  ],
  "note10-4": [
    { title: "Combustion, oxidation and reactions of carbon compounds", points: [
      "Saturated hydrocarbons usually burn with a clean flame when oxygen is sufficient; limited oxygen causes incomplete combustion, carbon monoxide and soot.",
      "Unsaturated hydrocarbons decolourise bromine water because bromine adds across a double or triple bond.",
      "Addition of hydrogen converts vegetable oils into saturated fats (hydrogenation), usually with a nickel catalyst.",
      "Ethanol oxidises to ethanoic acid; ethanol also reacts with sodium to release hydrogen and reacts with ethanoic acid to form an ester.",
      "Soaps work by forming micelles: hydrophobic tails trap grease while hydrophilic ionic heads remain in water. Calcium/magnesium ions in hard water form scum.",
    ], formula: ["Complete combustion: hydrocarbon + O₂ → CO₂ + H₂O + heat", "Esterification: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O"] },
  ],
  "note10-5": [
    { title: "Nutrition and respiration: trace each pathway", points: [
      "In plants, stomata allow carbon dioxide to enter and oxygen to leave; guard cells control their opening. Chlorophyll traps light energy in chloroplasts.",
      "In humans, food travels mouth → oesophagus → stomach → small intestine → large intestine. Peristalsis pushes it along the alimentary canal.",
      "Bile from the liver emulsifies fats and makes the medium alkaline; pancreatic enzymes digest carbohydrates, proteins and fats.",
      "During respiration, glucose first becomes pyruvate in cytoplasm; with oxygen, mitochondria release much more energy than anaerobic pathways.",
      "Alveoli have thin moist walls, a large surface area and rich blood supply for rapid gas exchange; haemoglobin carries oxygen in red blood cells.",
    ], tip: "Do not confuse breathing (air movement) with cellular respiration (chemical energy release)." },
  ],
  "note10-6": [
    { title: "Nerve impulses, reflexes and brain protection", points: [
      "A stimulus creates an electrical impulse in a receptor. Dendrites carry it to the cell body, then along the axon to its ending.",
      "At a synapse, chemicals carry the message across the tiny gap to the next neuron; the impulse is then electrical again.",
      "The skull protects the brain, the vertebral column protects the spinal cord, and three meninges plus cerebrospinal fluid cushion the CNS.",
      "Reflexes are rapid protective responses. The brain is informed after the spinal cord initiates the response, so awareness may follow the movement.",
      "Voluntary actions are controlled by the forebrain; balance and precision by cerebellum; involuntary functions like breathing by medulla.",
    ] },
    { title: "Endocrine feedback and plant movements", points: [
      "Hormones travel in blood and act on target organs. Their levels are controlled by feedback: high blood sugar stimulates insulin release, which lowers sugar.",
      "Iodine is needed to make thyroxine; inadequate iodine may enlarge the thyroid gland (goitre). Adrenaline prepares the body for emergency action.",
      "Auxin accumulates on the shaded side of a shoot, cells elongate there and the shoot bends towards light (positive phototropism).",
      "Roots show positive geotropism and often positive hydrotropism; shoots show negative geotropism. These movements depend on growth direction.",
    ], tip: "Negative tropism means growth away from the stimulus, not absence of response." },
  ],
  "note10-7": [
    { title: "Asexual reproduction and its variations", points: [
      "Asexual reproduction is quick and needs one parent, but offspring have little genetic variation; a new disease or environmental change can affect many similarly.",
      "Binary fission divides one cell into two; multiple fission produces many offspring at once. In Plasmodium, division occurs inside a protective cyst.",
      "Regeneration is possible in simple organisms with specialised regenerative cells; it is not the usual way complex animals reproduce.",
      "Vegetative propagation can be natural (runner, tuber, bulb, leaf bud) or artificial (cutting, layering, grafting, tissue culture).",
      "Spore walls protect spores from unfavourable conditions; when moisture and warmth return, spores germinate.",
    ] },
    { title: "Human reproductive health and development", points: [
      "Fertilisation forms a zygote in the oviduct; repeated cell division creates an embryo that implants in the uterine lining.",
      "The placenta exchanges oxygen, nutrients and wastes between maternal and foetal blood without normally mixing the two blood supplies.",
      "Menstrual cycle averages about 28 days but varies; ovulation generally occurs around the middle of the cycle.",
      "Contraceptive choices include barrier, hormonal, intrauterine and surgical methods; condoms also reduce risk of sexually transmitted infections.",
    ], tip: "Mention that contraceptive methods should be safe, informed and chosen with appropriate health guidance." },
  ],
  "note10-8": [
    { title: "Mendel's laws and cross interpretation", points: [
      "A pure tall plant (TT) forms only T gametes; a pure short plant (tt) forms only t gametes. Every F₁ offspring is Tt and tall.",
      "When F₁ plants form gametes, alleles separate: half carry T and half t. Random fertilisation produces TT, Tt, Tt and tt.",
      "Dominance explains phenotype, while segregation explains why recessive traits reappear. The monohybrid phenotype ratio is 3:1 and genotype ratio 1:2:1.",
      "In a dihybrid cross, independent assortment gives 9:3:3:1 when the genes assort independently and each trait has complete dominance.",
      "Acquired characteristics such as learned skills do not usually alter reproductive-cell DNA, so they are not inherited genetically.",
    ] },
    { title: "DNA, chromosomes and sex inheritance", points: [
      "Genes are segments of DNA arranged on chromosomes. DNA copies are passed from parents through gametes to offspring.",
      "Human gametes carry 23 chromosomes. The egg always contributes X; sperm contributes X or Y, giving approximately equal chance of XX or XY.",
      "A child inherits traits from both parents; dominant does not mean better or more common, only that one copy can affect the observed trait.",
      "Environmental sex determination occurs in some organisms, such as certain reptiles where incubation temperature affects development.",
    ], tip: "Use uppercase for dominant alleles and lowercase for recessive alleles; show gametes before filling the Punnett square." },
  ],
  "note10-9": [
    { title: "Ray-diagram rules and sign convention", points: [
      "For mirrors: a ray parallel to the principal axis reflects through F (concave) or appears to come from F (convex); a ray through C retraces its path.",
      "For lenses: a ray parallel to the axis refracts through F₂ (convex) or appears from F₁ (concave); a ray through optical centre travels undeviated.",
      "Cartesian sign convention: pole/optical centre is origin; direction of incident light is positive; heights above axis positive and below negative.",
      "A real image can be caught on a screen and is usually inverted; a virtual image cannot be caught on a screen and is erect.",
    ] },
    { title: "Numerical workflow for mirrors and lenses", points: [
      "Identify the device, write sign of u and f, substitute into the correct formula and solve for v; then calculate magnification if asked.",
      "Mirror formula uses 1/v+1/u=1/f; lens formula uses 1/v−1/u=1/f under the NCERT Cartesian convention.",
      "Power is positive for a converging convex lens and negative for a diverging concave lens. Convert focal length from centimetres to metres first.",
      "Check the sign and size of the image against the expected ray diagram to catch arithmetic mistakes.",
    ], formula: ["Mirror: 1/v + 1/u = 1/f", "Lens: 1/v − 1/u = 1/f", "m (mirror) = −v/u; m (lens) = v/u", "P = 1/f(metres) in dioptres"] },
  ],
  "note10-10": [
    { title: "Accommodation, near point and far point", points: [
      "For a nearby object, ciliary muscles contract, the eye lens becomes thicker and its focal length decreases; for a distant object the lens becomes thinner.",
      "The near point of a normal adult is about 25 cm and the far point is infinity. The retina is where the image is focused.",
      "In myopia, a distant object's image forms before the retina; a concave lens diverges incoming rays so the eye focuses them on the retina.",
      "In hypermetropia, a nearby object's image would form behind the retina; a convex lens converges rays before they enter the eye.",
      "With age, presbyopia reduces accommodation; bifocals can correct distant vision in the upper segment and near vision in the lower segment.",
    ] },
    { title: "Dispersion, scattering and atmospheric effects", points: [
      "White light contains many wavelengths. A prism refracts each wavelength differently, producing a spectrum; violet deviates most and red least.",
      "Small air molecules scatter shorter wavelengths (blue/violet) more strongly; our eyes are more sensitive to blue, making the daytime sky appear blue.",
      "At sunset, light passes through more atmosphere and most short wavelengths scatter away, leaving red/orange light reaching the observer.",
      "Star twinkling is atmospheric refraction; planets appear steadier because they are extended sources and their light variations average out.",
    ], tip: "Scattering is by particles in the medium; dispersion is separation of colours due to wavelength-dependent refraction." },
  ],
  "note10-11": [
    { title: "Circuit reading, resistance and household safety", points: [
      "A series circuit has one path: same current through all components, voltage divides and one broken component stops the whole circuit.",
      "A parallel circuit has branches: each branch gets the same voltage, currents divide, and one failed appliance does not stop others.",
      "Resistance increases with length and decreases with cross-sectional area. Alloys such as nichrome have high resistivity and resist oxidation at high temperature.",
      "A fuse is connected in series in the live wire; excess current heats it until it melts and breaks the circuit.",
      "The heating element's power depends on voltage and resistance; household appliances should match the rated voltage.",
    ] },
    { title: "Selecting electricity formulas", points: [
      "If current and resistance are known, use V=IR. If charge and time are given, use I=Q/t. If energy and charge are given, use V=W/Q.",
      "Use P=VI when voltage and current are known; P=I²R or V²/R when resistance is involved.",
      "Convert minutes to seconds for joules, but use hours when calculating kilowatt-hours for electricity bills.",
      "Domestic wiring is parallel because each appliance needs full voltage and independent switching.",
    ], formula: ["Q=It", "V=IR", "P=VI=I²R=V²/R", "H=I²Rt", "1 unit = 1 kWh"] },
  ],
  "note10-12": [
    { title: "Electromagnetism, motor and generator", points: [
      "Field around a straight wire is circular; around a solenoid it resembles a bar magnet. Increasing current or coil turns strengthens the field.",
      "A current-carrying conductor in a magnetic field experiences force; reversing current or field reverses motion.",
      "An electric motor uses Fleming's left-hand rule and converts electrical energy to mechanical energy; the split-ring commutator reverses current every half-turn.",
      "Electromagnetic induction occurs when magnetic flux through a coil changes by moving a magnet/coil or changing field strength.",
      "A generator uses Fleming's right-hand rule to determine induced current; AC reverses direction periodically while DC flows one direction.",
    ] },
    { title: "Domestic circuit risks and protection", points: [
      "Short circuit occurs when live and neutral wires touch, causing a sudden large current. Overloading occurs when too many appliances draw current from one circuit.",
      "Fuse or circuit breaker interrupts excessive current. Earthing connects exposed metal body to ground through low resistance.",
      "Never touch switches with wet hands; damaged insulation and overloaded sockets can cause shock or fire.",
      "Earth wire carries leakage current safely away and helps the fuse/breaker operate.",
    ], tip: "Remember the hand rules: left hand → motor force; right hand → induced current in generator." },
  ],
  "note10-13": [
    { title: "Food webs, trophic levels and ecosystem balance", points: [
      "Producers capture solar energy through photosynthesis. Consumers obtain energy by eating plants or other animals; decomposers return nutrients to soil.",
      "Food webs give ecosystems stability because an organism may have more than one food source and predator.",
      "Removing one species can affect the whole chain: killing snakes may increase rats, which damage crops and stored food.",
      "Only a fraction of energy becomes biomass at the next trophic level; energy is lost through respiration, movement, waste and heat.",
    ] },
    { title: "Waste, ozone and individual action", points: [
      "Biodegradable wastes can be composted, but too much organic waste in water can use oxygen during decomposition and harm aquatic life.",
      "Non-biodegradable plastics and pesticides persist and accumulate; reduce single-use plastics, reuse materials and recycle safely.",
      "Ozone forms and breaks down naturally in the stratosphere. CFCs release chlorine radicals that accelerate ozone breakdown.",
      "Protecting the environment includes saving energy and water, segregating waste, avoiding litter, using public transport and supporting biodiversity.",
    ], tip: "Do not confuse ozone depletion with global warming: they are different environmental problems with different causes." },
  ],
};
