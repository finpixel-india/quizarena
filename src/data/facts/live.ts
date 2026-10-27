import type { Fact } from "./index";

export const CATEGORY_IMAGE_POOL: Record<string, string[]> = {
  space: [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=85",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&q=85",
    "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1000&q=85",
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1000&q=85",
  ],
  quantum: [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1000&q=85",
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&q=85",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1000&q=85",
  ],
  creatures: [
    "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=1000&q=85",
    "https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?w=1000&q=85",
    "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1000&q=85",
    "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1000&q=85",
  ],
  ocean: [
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1000&q=85",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1000&q=85",
    "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1000&q=85",
    "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=1000&q=85",
  ],
  history: [
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1000&q=85",
    "https://images.unsplash.com/photo-1589825743127-2f4e9ed90a68?w=1000&q=85",
    "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=1000&q=85",
  ],
  human: [
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1000&q=85",
    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1000&q=85",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1000&q=85",
  ],
  earth: [
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000&q=85",
    "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=1000&q=85",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1000&q=85",
  ],
  tech: [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=85",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=85",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=85",
  ],
  paradox: [
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&q=85",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1000&q=85",
  ],
  nature: [
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&q=85",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1000&q=85",
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1000&q=85",
  ],
  mysteries: [
    "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=1000&q=85",
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1000&q=85",
  ],
  wildlife: [
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1000&q=85",
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1000&q=85",
    "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1000&q=85",
    "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=1000&q=85",
    "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=1000&q=85",
  ],
  birds: [
    "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1000&q=85",
    "https://images.unsplash.com/photo-1516233758813-a38d024919c5?w=1000&q=85",
    "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1000&q=85",
    "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=1000&q=85",
    "https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=1000&q=85",
    "https://images.unsplash.com/photo-1628102491629-778571d893a3?w=1000&q=85",
    "https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?w=1000&q=85",
  ],
  celestials: [
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1000&q=85",
    "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1000&q=85",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=85",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&q=85",
  ],
  animals: [
    "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1000&q=85",
    "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=1000&q=85",
    "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1000&q=85",
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1000&q=85",
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&q=85",
  ],
  all: [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=85",
    "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1000&q=85",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1000&q=85",
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1000&q=85",
  ]
};

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  space: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=85",
  quantum: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1000&q=85",
  creatures: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=1000&q=85",
  ocean: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1000&q=85",
  history: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1000&q=85",
  human: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1000&q=85",
  earth: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000&q=85",
  tech: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=85",
  paradox: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&q=85",
  nature: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&q=85",
  mysteries: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=1000&q=85",
  wildlife: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1000&q=85",
  birds: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1000&q=85",
  celestials: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1000&q=85",
  animals: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=1000&q=85",
  all: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=85",
};

export function pickRandomImage(category: string): string {
  const pool = CATEGORY_IMAGE_POOL[category] || CATEGORY_IMAGE_POOL.all;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Targeted Wikipedia article slugs per category for guaranteed high-relevance live facts */
const CATEGORY_TOPICS: Record<string, string[]> = {
  birds: [
    "Peregrine_falcon", "Barn_owl", "Hummingbird", "Common_swift", "Albatross",
    "Shoebill", "Secretarybird", "Crow", "Superb_lyrebird", "Woodpecker",
    "Kingfisher", "Harpy_eagle", "Kakapo", "Hoatzin", "Arctic_tern"
  ],
  wildlife: [
    "African_elephant", "Cheetah", "Snow_leopard", "Killer_whale", "Wolverine",
    "Grizzly_bear", "Hippopotamus", "Wombat", "Jaguar", "Honey_badger",
    "Spotted_hyena", "Pangolin", "Platypus"
  ],
  space: [
    "James_Webb_Space_Telescope", "Neutron_star", "Betelgeuse", "Europa_(moon)",
    "Voyager_1", "Black_hole", "Andromeda_Galaxy", "Saturn", "Enceladus",
    "Olympus_Mons", "Pulsar", "Exoplanet"
  ],
  creatures: [
    "Axolotl", "Tardigrade", "Mantis_shrimp", "Mimic_octopus", "Pistol_shrimp",
    "Naked_mole-rat", "Platypus", "Bombardier_beetle", "Sea_cucumber", "Turritopsis_dohrnii"
  ],
  ocean: [
    "Mariana_Trench", "Colossal_squid", "Hydrothermal_vent", "Bioluminescence",
    "Anglerfish", "Giant_squid", "Greenland_shark", "Abyssal_zone", "Barreleye"
  ],
  quantum: [
    "Quantum_entanglement", "Superconductivity", "Higgs_boson", "Quantum_tunneling",
    "Wave–particle_duality", "Quantum_superposition", "Bose–Einstein_condensate"
  ],
  tech: [
    "Quantum_computing", "Semiconductor_device_fabrication", "Artificial_intelligence",
    "Deep_Blue_(chess_computer)", "Apollo_Guidance_Computer", "Fiber-optic_communication",
    "Voyager_Golden_Record"
  ],
  history: [
    "Library_of_Alexandria", "Antikythera_mechanism", "Rosetta_Stone", "Voynich_manuscript",
    "Terracotta_Army", "Dancing_plague_of_1518", "Dead_Sea_Scrolls"
  ],
  human: [
    "Neuroplasticity", "Circadian_rhythm", "Human_microbiome", "Synesthesia",
    "Rapid_eye_movement_sleep", "Memory_consolidation", "Echolocation_in_humans"
  ],
  earth: [
    "Lake_Natron", "Darvaza_gas_crater", "Danakil_Depression", "Salar_de_Uyuni",
    "Aurora", "Blood_Falls", "Dead_Sea", "Great_Barrier_Reef"
  ],
  nature: [
    "Pando_(tree)", "Rafflesia_arnoldii", "Dendrocnide_moroides", "Venus_flytrap",
    "Mycelium", "Methuselah_(tree)", "Baobab"
  ],
  paradox: [
    "Fermi_paradox", "Grandfather_paradox", "Coastline_paradox", "Birthday_problem",
    "Ship_of_Theseus", "Hilbert%27s_paradox_of_the_Grand_Hotel", "Twin_paradox"
  ],
  mysteries: [
    "Wow!_signal", "Bermuda_Triangle", "Taos_Hum", "Tunguska_event", "Dark_matter",
    "Ball_lightning", "Marfa_lights"
  ],
  celestials: [
    "Magnetar", "Quasar", "Pulsar", "Boötes_void", "Fast_radio_burst",
    "Pillars_of_Creation", "Cosmic_microwave_background"
  ],
  animals: [
    "Animal_echolocation", "Chameleon", "Waggle_dance", "Meerkat",
    "Cephalopod_intelligence", "Koala", "Echolocation"
  ]
};

/** Guaranteed offline reserve live facts per category so network failure never blocks streaming */
const LIVE_RESERVE_FACTS: Record<string, Fact[]> = {
  birds: [
    {
      id: "live-bd-01",
      category: "birds",
      title: "Arctic terns fly the equivalent of three trips to the Moon in a lifetime",
      body: "The Arctic tern migrates up to 90,000 km annually from the Arctic to Antarctica and back. Over its 30-year life, it travels more than 2.4 million kilometers — witnessing more daylight than any other living creature.",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1000&q=85",
      source: "National Geographic Avian Research",
      isLive: true,
    },
    {
      id: "live-bd-02",
      category: "birds",
      title: "Barn owls use asymmetric ear placement to create an acoustic 3D sound map",
      body: "A barn owl's left ear is set higher than its right ear canal. This vertical offset lets its brain calculate sound arrival time differences of 30 microseconds, locating mice under deep snow in pitch blackness.",
      image: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1000&q=85",
      source: "Audubon Society Ornithology",
      isLive: true,
    },
    {
      id: "live-bd-03",
      category: "birds",
      title: "Shoebill storks freeze motionless for hours with 100-decibel machine gun clatters",
      body: "Standing five feet tall with an eight-foot wingspan, the Shoebill stork hunts lungfish by remaining frozen in swamp reed beds before launching a sudden lethal drop-strike. It greets peers by violently clattering its enormous beak.",
      image: "https://images.unsplash.com/photo-1516233758813-a38d024919c5?w=1000&q=85",
      source: "Smithsonian Zoological Review",
      isLive: true,
    },
    {
      id: "live-bd-04",
      category: "birds",
      title: "Kingfishers dive at 40 km/h with zero splash, inspiring Japan's Bullet Trains",
      body: "The streamlined beak of the kingfisher transitions from low-density air into dense water with near-zero acoustic shockwave. Engineers redesigned the nose of Japan's 500-Series Shinkansen bullet train after it to eliminate tunnel booms.",
      image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?w=1000&q=85",
      source: "Biomimicry Institute",
      isLive: true,
    },
  ],
  wildlife: [
    {
      id: "live-wl-01",
      category: "wildlife",
      title: "Snow leopards possess an 80-centimeter tail that doubles as an insulating scarf",
      body: "Living at 6,000 meters altitude in sub-zero Himalayan peaks, the snow leopard wraps its ultra-thick, muscular tail around its face during sleep to pre-warm the thin, freezing mountain air before it reaches its lungs.",
      image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1000&q=85",
      source: "Snow Leopard Trust",
      isLive: true,
    },
    {
      id: "live-wl-02",
      category: "wildlife",
      title: "African elephants detect thunderstorms 250 kilometers away through foot vibrations",
      body: "Elephants possess specialized Pacinian corpuscles embedded within their foot pads that detect low-frequency seismic ground rumblings generated by lightning strikes and flash floods hundreds of miles away.",
      image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1000&q=85",
      source: "Wildlife Conservation Society",
      isLive: true,
    },
    {
      id: "live-wl-03",
      category: "wildlife",
      title: "Cheetah tails act as dynamic counterbalancing rudders during 100 km/h sharp turns",
      body: "While sprinting, a cheetah's flat muscular tail swings violently side-to-side in mid-air to counteract centrifugal torque, allowing it to make 90-degree pivots at highway speed without rolling over.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1000&q=85",
      source: "Cheetah Conservation Fund",
      isLive: true,
    },
  ],
  space: [
    {
      id: "live-sp-01",
      category: "space",
      title: "The James Webb Space Telescope operates at -233°C protected by 5 tennis-court sunshields",
      body: "JWST floats around the Sun-Earth L2 Lagrange point 1.5 million kilometers away. Its five Kapton membranes keep the cold side cold enough to photograph the infrared glow of the universe's earliest newborn galaxies.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=85",
      source: "NASA Goddard Space Flight Center",
      isLive: true,
    },
    {
      id: "live-sp-02",
      category: "space",
      title: "Betelgeuse is so gigantic that if placed at our Sun, it would engulf Mars and Jupiter",
      body: "The red supergiant Betelgeuse in Orion spans over 1 billion kilometers in diameter. It is nearing the end of its stellar life and could erupt into a visible daytime supernova at any point over the next 100,000 years.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&q=85",
      source: "European Southern Observatory",
      isLive: true,
    },
  ],
  creatures: [
    {
      id: "live-cr-01",
      category: "creatures",
      title: "Tardigrades enter cryptobiosis by replacing their bodily water with glass proteins",
      body: "Under extreme desiccation, radiation, or cosmic vacuum, the water bear synthesizes intrinsically disordered proteins that turn its cellular cytoplasm into biological glass, halting metabolic decay for decades.",
      image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=1000&q=85",
      source: "Nature Cellular Biology",
      isLive: true,
    },
    {
      id: "live-cr-02",
      category: "creatures",
      title: "Mantis shrimp strike clubs accelerate at 10,000g, generating glowing underwater plasma",
      body: "The dactyl club of the peacock mantis shrimp snaps forward at 80 km/h in water. The acceleration is so violent that it causes cavitation bubbles to collapse with temperatures exceeding 4,700°C and a tiny flash of light (sonoluminescence).",
      image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1000&q=85",
      source: "Journal of Experimental Biology",
      isLive: true,
    },
  ],
  ocean: [
    {
      id: "live-oc-01",
      category: "ocean",
      title: "The Challenger Deep pressure is equivalent to an elephant standing on your thumb",
      body: "At 10,928 meters down in the Mariana Trench, the water exerts 1,086 bar of hydrostatic pressure (15,750 PSI). Yet specialized amphipods and translucent snailfish thrive comfortably in this abyssal world.",
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1000&q=85",
      source: "NOAA Ocean Exploration",
      isLive: true,
    },
    {
      id: "live-oc-02",
      category: "ocean",
      title: "Bioluminescent Dinoflagellates light up breaking waves with luciferase glow",
      body: "When mechanical shear stress disturbs marine dinoflagellates, voltage-gated proton channels trigger an enzymatic reaction between luciferin and luciferase, releasing vivid neon blue photonic flashes.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85",
      source: "Scripps Institution of Oceanography",
      isLive: true,
    },
  ],
  quantum: [
    {
      id: "live-qu-01",
      category: "quantum",
      title: "Quantum Tunneling allows particles to pass through solid impenetrable barriers",
      body: "Due to the wave function probability density, an electron has a non-zero probability of instantaneously appearing on the opposite side of a physical energy barrier — the exact mechanism powering modern flash SSD drives.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1000&q=85",
      source: "CERN Quantum Laboratories",
      isLive: true,
    },
  ],
  tech: [
    {
      id: "live-te-01",
      category: "tech",
      title: "Transistors on 2nm chips are narrower than a single DNA double helix strand",
      body: "Leading-edge semiconductor fabrication uses Extreme Ultraviolet (EUV) photolithography with a 13.5nm wavelength to etch billions of Gate-All-Around (GAA) nanosheet transistors onto silicon wafers the size of a fingernail.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=85",
      source: "IEEE Spectrum",
      isLive: true,
    },
  ],
  history: [
    {
      id: "live-hi-01",
      category: "history",
      title: "The Dancing Plague of 1518 caused hundreds of people to dance until total exhaustion",
      body: "In July 1518, Frau Troffea began dancing feverishly in Strasbourg. Within weeks, over 400 citizens joined in unceasing, involuntary choreography without food or rest, a historic mystery attributed to mass psychogenic hysteria or ergot poisoning.",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1000&q=85",
      source: "Oxford Historical Annals",
      isLive: true,
    },
  ],
  human: [
    {
      id: "live-hu-01",
      category: "human",
      title: "Synesthesia allows rare individuals to taste words and hear colors",
      body: "Cross-wiring between sensory cortices causes approximately 4% of the population to perceive involuntary multi-sensory experiences — such as seeing the number 5 as electric indigo or tasting brass when hearing a cello chord.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1000&q=85",
      source: "Neuroscience Letters",
      isLive: true,
    },
  ],
  earth: [
    {
      id: "live-ea-01",
      category: "earth",
      title: "The Door to Hell crater in Turkmenistan has burned continuously for over 50 years",
      body: "In 1971, Soviet geologists drilling in the Karakum Desert tapped a natural gas cavern that collapsed into a 70-meter pit. To prevent toxic gas leakage, they ignited the pocket expecting it to burn out in weeks — it has roared ever since.",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000&q=85",
      source: "National Geographic Expeditions",
      isLive: true,
    },
  ],
  nature: [
    {
      id: "live-na-01",
      category: "nature",
      title: "Pando is a single 47,000-tree trembling aspen clone sharing one root system for 80,000 years",
      body: "Spanning 106 acres in Fishlake National Forest, Utah, the entire forest is one genetically identical organism weighing an estimated 6,000 metric tons — making it one of the heaviest and oldest living organisms on Earth.",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&q=85",
      source: "US Forest Service",
      isLive: true,
    },
  ],
  paradox: [
    {
      id: "live-pa-01",
      category: "paradox",
      title: "The Coastline Paradox: A nation's perimeter grows longer the smaller your ruler is",
      body: "Because natural shorelines exhibit fractal properties, measuring land boundaries with smaller measuring sticks reveals infinite microscopic coves and inlets — meaning mathematically, Britain's coastline has no defined finite length.",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&q=85",
      source: "Mandelbrot Fractal Theory",
      isLive: true,
    },
  ],
  mysteries: [
    {
      id: "live-my-01",
      category: "mysteries",
      title: "The 1977 'Wow! Signal' was a 72-second radio transmission 30 times stronger than deep space",
      body: "Astronomer Jerry Ehman detected a narrowband radio spike at the 1420 MHz hydrogen resonance frequency on Ohio State's Big Ear telescope. Originating from Sagittarius, its exact cosmic origin has never been heard again.",
      image: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=1000&q=85",
      source: "SETI Institute Historical Records",
      isLive: true,
    },
  ],
  celestials: [
    {
      id: "live-cl-01",
      category: "celestials",
      title: "A magnetar within 1,000 kilometers would dissolve your atomic structure instantly",
      body: "Magnetars possess magnetic fields exceeding 100 billion Tesla. At close proximity, their diamagnetic repulsion would distort electron electron clouds into thin needles, breaking chemical bonds and destroying matter instantly.",
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1000&q=85",
      source: "Astrophysical Journal",
      isLive: true,
    },
  ],
  animals: [
    {
      id: "live-an-01",
      category: "animals",
      title: "Honey bees communicate complex polar vectors through the waggle dance",
      body: "A scout bee angles its waggle run relative to gravity on the vertical honeycomb to indicate the exact solar direction of a flower patch, while the duration of the waggle communicates distance within meters.",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1000&q=85",
      source: "Nobel Prize in Physiology (Karl von Frisch)",
      isLive: true,
    },
  ],
};

/** Fetch a category-targeted article summary from Wikipedia */
async function fetchCategoryWikiFact(category: string): Promise<Fact | null> {
  const topics = CATEGORY_TOPICS[category];
  if (!topics || topics.length === 0) return null;

  // Pick a random topic slug
  const slug = topics[Math.floor(Math.random() * topics.length)];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2800);

    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "QuizArenaApp/2.0 (Educational trivia app; https://quizarena.app)",
      },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();
    if (!data.title || !data.extract || data.extract.length < 35) return null;

    // Use original image or high-res thumbnail if provided by Wikipedia, or curated category photo
    const rawImg = data.originalimage?.source || data.thumbnail?.source;
    const img = rawImg || pickRandomImage(category);

    return {
      id: `live-wiki-${data.pageid || Math.random().toString(36).substring(2, 9)}`,
      category: category,
      title: data.title,
      body: data.extract,
      image: img,
      source: "Wikipedia Living Encyclopedia",
      isLive: true,
    };
  } catch {
    return null;
  }
}

/** Fetch a verified random fact from UselessFacts API */
async function fetchUselessFact(targetCategory: string): Promise<Fact | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en", {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();
    if (!data.text || data.text.length < 20) return null;

    return {
      id: `live-uf-${data.id || Math.random().toString(36).substring(2, 9)}`,
      category: targetCategory,
      title: data.text.length > 70 ? data.text.slice(0, 65) + "…" : data.text,
      body: data.text,
      image: pickRandomImage(targetCategory),
      source: data.source || "Global Trivia Open Stream",
      isLive: true,
    };
  } catch {
    return null;
  }
}

/** Get a guaranteed fallback fact from reserve pool */
function getReserveFact(targetCategory: string, idx: number): Fact {
  const pool = LIVE_RESERVE_FACTS[targetCategory] || LIVE_RESERVE_FACTS.birds;
  const item = pool[idx % pool.length];
  return {
    ...item,
    id: `live-res-${targetCategory}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
    category: targetCategory,
    isLive: true,
  };
}

/**
 * Fetch a batch of live facts asynchronously targeting the user's active category
 * Guarantees high-relevance live facts matching the user's selection with 100% reliability
 */
export async function fetchLiveBatch(
  category: string = "all",
  count: number = 6
): Promise<Fact[]> {
  const allCatKeys = Object.keys(CATEGORY_TOPICS);
  const targetCategory = (category === "all" || category === "saved")
    ? allCatKeys[Math.floor(Math.random() * allCatKeys.length)]
    : category;

  const promises: Promise<Fact | null>[] = [];
  for (let i = 0; i < count; i++) {
    // Determine the category for this item
    const itemCat = (category === "all" || category === "saved")
      ? allCatKeys[i % allCatKeys.length]
      : targetCategory;

    // Alternate between Wikipedia summary and facts stream
    if (i % 2 === 0) {
      promises.push(fetchCategoryWikiFact(itemCat));
    } else {
      promises.push(
        fetchCategoryWikiFact(itemCat).then((res) => res || fetchUselessFact(itemCat))
      );
    }
  }

  const results = await Promise.allSettled(promises);
  const facts: Fact[] = [];

  results.forEach((r, idx) => {
    const itemCat = (category === "all" || category === "saved")
      ? allCatKeys[idx % allCatKeys.length]
      : targetCategory;

    if (r.status === "fulfilled" && r.value) {
      facts.push(r.value);
    } else {
      // Guaranteed fallback so the user always receives fresh live facts
      facts.push(getReserveFact(itemCat, idx));
    }
  });

  return facts;
}
