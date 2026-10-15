export interface Fact {
  id: string;
  category: string;
  title: string;
  body: string;
  /** Unsplash or external image URL */
  image: string;
  source?: string;
  isLive?: boolean;
}

export interface FactCategory {
  id: string;
  label: string;
  emoji: string;
  description: string;
  accent: string;
}

export const FACT_CATEGORIES: FactCategory[] = [
  { id: "all",       label: "All Facts",            emoji: "🌐", description: "Explore everything across all dimensions", accent: "from-amber-500/20 to-orange-500/20" },
  { id: "space",     label: "Space & Cosmos",       emoji: "🚀", description: "Black holes, rogue worlds & cosmic anomalies", accent: "from-purple-500/20 to-indigo-500/20" },
  { id: "quantum",   label: "Quantum & Physics",    emoji: "⚛️", description: "Reality-breaking experiments & particles", accent: "from-cyan-500/20 to-blue-500/20" },
  { id: "creatures", label: "Alien Creatures",      emoji: "🐙", description: "Bizarre biological marvels on our own planet", accent: "from-emerald-500/20 to-teal-500/20" },
  { id: "ocean",     label: "Abyss & Deep Ocean",   emoji: "🌊", description: "The crushing, lightless mysteries of the sea", accent: "from-blue-600/20 to-cyan-600/20" },
  { id: "history",   label: "History Glitches",     emoji: "🏛️", description: "Coincidences & bizarre events lost in time", accent: "from-amber-600/20 to-yellow-600/20" },
  { id: "human",     label: "Human Mind & Body",    emoji: "🧠", description: "Neurological quirks & bio-mechanical wonders", accent: "from-rose-500/20 to-pink-500/20" },
  { id: "earth",     label: "Forbidden Earth",      emoji: "🌋", description: "Extreme, surreal & deadly terrestrial locations", accent: "from-orange-600/20 to-red-600/20" },
  { id: "tech",      label: "Tech & Cyber Lore",    emoji: "💻", description: "Weird computing history & futuristic tech", accent: "from-sky-500/20 to-indigo-500/20" },
  { id: "paradox",   label: "Paradoxes & Math",     emoji: "🌀", description: "Logical impossibilities & number theory", accent: "from-violet-500/20 to-fuchsia-500/20" },
  { id: "nature",    label: "Lethal Botany & Flora",emoji: "🌿", description: "Venomous trees, zombie fungi & wild ecology", accent: "from-green-500/20 to-lime-500/20" },
  { id: "mysteries", label: "Unsolved Mysteries",   emoji: "🛸", description: "Phenomena that science still cannot explain", accent: "from-zinc-500/20 to-stone-500/20" },
];

export const FACTS: Fact[] = [
  // ─── SPACE & COSMOS ──────────────────────────────────────────────────────────
  {
    id: "sp-001",
    category: "space",
    title: "Cold Welding: Metals fuse permanently if touched in vacuum",
    body: "If two clean, smooth pieces of the exact same metal touch in outer space, they fuse permanently into one solid piece. With no air or oxidation layer separating the atoms, the atoms simply don't know they are on separate objects.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    source: "European Space Agency",
  },
  {
    id: "sp-002",
    category: "space",
    title: "The fastest spinning neutron star spins 716 times each second",
    body: "Pulsar PSR J1748-2446ad spins 716 revolutions per second. A point on its equator moves at 70,000 km/s — nearly a quarter the speed of light. Its gravitational pull is so strong that mountain bumps on its surface can be no higher than a few millimeters.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    source: "Science Magazine",
  },
  {
    id: "sp-003",
    category: "space",
    title: "A day on Venus is longer than its entire year",
    body: "Venus has such a sluggish rotation that one day-night cycle on its axis lasts 243 Earth days, while it completes an orbit around the Sun in just 225 Earth days. Even stranger, it rotates clockwise — opposite to almost all other planets.",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    source: "NASA Planetary Science",
  },
  {
    id: "sp-004",
    category: "space",
    title: "Sharks are older than Saturn's rings",
    body: "Saturn's iconic rings are young cosmic structures, estimated to have formed roughly 100 to 400 million years ago from a shattered comet or icy moon. Sharks, meanwhile, have swam in Earth's oceans for over 450 million years.",
    image: "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    source: "Science / Cassini Mission",
  },
  {
    id: "sp-005",
    category: "space",
    title: "There is a massive water cloud in space holding 140 trillion times Earth's oceans",
    body: "Astronomers discovered a vapor reservoir surrounding the hyperluminous quasar APM 08279+5255, located 12 billion light-years away. It contains 140 trillion times more water vapor than all of Earth's oceans combined.",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    source: "NASA Caltech",
  },
  {
    id: "sp-006",
    category: "space",
    title: "Footprints left on the Moon will survive 100 million years",
    body: "Because the Moon possesses no atmosphere, there is no wind to blow dust away and no liquid water to cause erosion. The footprints pressed into the lunar regolith by Apollo astronauts will remain crisp for at least 100 million years.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    source: "Apollo Lunar Surface Journal",
  },
  {
    id: "sp-007",
    category: "space",
    title: "Olympus Mons on Mars is three times taller than Mount Everest",
    body: "Olympus Mons is the largest volcano in the Solar System. Rising 21.9 km into the thin Martian sky, its peak extends beyond most of Mars' atmosphere. The volcano spans an area so vast (600 km wide) that you cannot see its peak from the base due to the planet's curvature.",
    image: "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    source: "NASA JPL",
  },
  {
    id: "sp-008",
    category: "space",
    title: "Rogue planets drift through deep space with no host star",
    body: "Astronomers estimate there may be trillions of rogue planets drifting in the void of the Milky Way without orbiting any star. Ejected from their birth systems by gravitational slingshots, some may harbor sub-surface liquid oceans heated by radioactive cores.",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    source: "Nature Astronomy",
  },

  // ─── QUANTUM & PHYSICS ────────────────────────────────────────────────────────
  {
    id: "qp-001",
    category: "quantum",
    title: "Superfluid Helium climbs up walls and defies gravity",
    body: "When cooled below 2.17 Kelvin (-271°C), liquid helium-4 becomes a superfluid with absolute zero viscosity. It crawls up the inner walls of its beaker in a molecular film just 30 nanometers thick and drips off the bottom outside edge spontaneously.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    source: "American Physical Society",
  },
  {
    id: "qp-002",
    category: "quantum",
    title: "The Double-Slit experiment changes behavior when observed",
    body: "Photons and electrons fired through two slits form an interference wave pattern on the detector screen. However, placing a sensor to detect which slit each particle actually passes through causes the wave function to collapse, acting purely like ordinary bullets.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    source: "Physics Reports",
  },
  {
    id: "qp-003",
    category: "quantum",
    title: "Quantum Entanglement acts across light-years instantaneously",
    body: "Two entangled particles share a single quantum state. Measuring the spin of one immediately fixes the corresponding state of the other, faster than the speed of light. Einstein rejected this as 'spooky action at a distance', yet it has been proven up to 1,200 km via satellite.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    source: "Physical Review Letters",
  },
  {
    id: "qp-004",
    category: "quantum",
    title: "One gram of Antimatter holds the destructive power of a nuclear warhead",
    body: "When antimatter meets ordinary matter, they undergo 100% mass-to-energy conversion (E=mc²). One gram of antimatter reacting with one gram of matter yields 1.8 × 10¹⁴ joules — equivalent to the 43-kiloton bomb dropped on Hiroshima multiplied by two.",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    source: "CERN Particle Laboratory",
  },
  {
    id: "qp-005",
    category: "quantum",
    title: "Time runs measurably faster at your head than at your feet",
    body: "Einstein's general relativity dictates that gravity dilates time. Because your head is farther from Earth's center of mass than your feet, it experiences slightly weaker gravity. Ultra-precise optical atomic clocks can measure this time difference over just 1 millimeter in height.",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80",
    source: "NIST (National Institute of Standards)",
  },
  {
    id: "qp-006",
    category: "quantum",
    title: "Hot water can freeze faster than cold water (Mpemba effect)",
    body: "Under certain controlled conditions, warm or hot water will freeze into ice before identical cold water in the same freezer. First documented by Tanzanian student Erasto Mpemba in 1963, its mechanisms involve convection currents, dissolved gases, and hydrogen bond anomalies.",
    image: "https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?w=800&q=80",
    source: "Nature Physics",
  },

  // ─── ALIEN CREATURES ─────────────────────────────────────────────────────────
  {
    id: "cr-001",
    category: "creatures",
    title: "Pistol Shrimp punch snaps create heat matching the surface of the Sun",
    body: "The pistol shrimp snaps its specialized claw at 100 km/h, generating a low-pressure cavitation bubble. When the bubble implodes, it creates temperatures exceeding 4,700°C (nearly the Sun's surface at 5,500°C), emitting a flash of light called sonoluminescence and a 218-decibel shockwave.",
    image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    source: "Nature",
  },
  {
    id: "cr-002",
    category: "creatures",
    title: "The Immortal Jellyfish can reverse its aging cycle forever",
    body: "Turritopsis dohrnii is biologically immortal. When confronted with physical trauma, starvation, or old age, its mature cells transform backward into polyp stage via transdifferentiation, rebooting its lifecycle from scratch indefinitely.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    source: "Biological Bulletin",
  },
  {
    id: "cr-003",
    category: "creatures",
    title: "Tardigrades can survive the vacuum of space, boil, and freeze",
    body: "Water bears (tardigrades) can enter a cryptobiotic state called a 'tun', expelling 99% of body moisture. In this state they endure absolute zero (−273°C), boiling heat up to 150°C, 1,000 times human lethal radiation, and 10 days in outer space vacuum.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    source: "European Space Agency",
  },
  {
    id: "cr-004",
    category: "creatures",
    title: "Crows remember human faces and pass grudges to their children",
    body: "University of Washington researchers wore specific rubber masks while handling crows. For years afterward, crows in the area mobbed individuals wearing that specific mask. Even young crows born years later joined the attack, having learned the enemy's face from the flock.",
    image: "https://images.unsplash.com/photo-1559082603-8ad960d1a6fc?w=800&q=80",
    source: "Proceedings of the National Academy of Sciences",
  },
  {
    id: "cr-005",
    category: "creatures",
    title: "Octopuses have three hearts and decentralized brains in each arm",
    body: "An octopus possesses two branchial hearts pumping blue copper-rich hemocyanin through its gills, and a third systemic heart for the body. Two-thirds of its 500 million neurons reside inside its arms, allowing each tentacle to taste, feel, and make independent choices.",
    image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    source: "Cell Biology",
  },
  {
    id: "cr-006",
    category: "creatures",
    title: "Sloths can hold their breath underwater three times longer than dolphins",
    body: "Dolphins need to surface after roughly 10-15 minutes, but three-toed sloths can survive submerged underwater for up to 40 minutes. They accomplish this by dramatically slowing their metabolic rate and dropping their heart rate to a third of resting speed.",
    image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80",
    source: "Smithsonian Tropical Research",
  },

  // ─── ABYSS & DEEP OCEAN ──────────────────────────────────────────────────────
  {
    id: "oc-001",
    category: "ocean",
    title: "The Barreleye fish has a transparent skull and eyes inside its head",
    body: "Macropinna microstoma survives in pitch-black deep water. Its head is covered by a crystal-clear, fluid-filled shield. The two dark spots in front are smelling organs; its actual bright emerald eyes are glowing spheres safely protected deep inside its transparent forehead.",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    source: "Monterey Bay Aquarium Research (MBARI)",
  },
  {
    id: "oc-002",
    category: "ocean",
    title: "There is an underwater waterfall 3 times taller than Angel Falls",
    body: "Beneath the Denmark Strait between Greenland and Iceland lies the world's largest waterfall. Dense, frigid arctic water plunges 3,500 meters down a subterranean seabed abyss, flowing at over 5 million cubic meters per second — roughly 2,000 Niagara Falls combined.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    source: "NOAA Ocean Exploration",
  },
  {
    id: "oc-003",
    category: "ocean",
    title: "Fish survive at 8,300 meters under 800 atmospheres of pressure",
    body: "In 2023, scientists filmed an unknown Pseudoliparis snailfish swimming at 8,336 meters in the Izu-Ogasawara Trench. At this depth, pressure exceeds 80 megapascals — enough to crush a steel submarine. Their cells rely on trimethylamine oxide (TMAO) to stop cell membranes from solidifying.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    source: "Minderoo-UWA Deep-Sea Centre",
  },
  {
    id: "oc-004",
    category: "ocean",
    title: "The colossal squid has eyes the size of regulation soccer balls",
    body: "Living at depths of 1,000 meters in freezing Antarctic waters, the colossal squid has the largest eyes of any known living organism — measuring roughly 27 to 30 cm across. They act like biological telescope lenses to spot the faint bioluminescence of predatory sperm whales.",
    image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    source: "Te Papa Museum / Current Biology",
  },
  {
    id: "oc-005",
    category: "ocean",
    title: "Hydrothermal vents spew water at 400°C without it boiling",
    body: "At deep-sea 'black smoker' chimneys, water heated by subterranean magma reaches temperatures exceeding 400°C. Due to the immense hydrostatic pressure of kilometers of ocean above, the water cannot vaporize into steam and remains an ultra-dense supercritical fluid.",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    source: "Woods Hole Oceanographic Institution",
  },

  // ─── HISTORY GLITCHES ────────────────────────────────────────────────────────
  {
    id: "hi-001",
    category: "history",
    title: "Napoleon Bonaparte was once overwhelmed by hundreds of rabbits",
    body: "In July 1807, after signing the Treaty of Tilsit, Napoleon hosted an imperial rabbit hunt. His chief of staff bought hundreds of domestic rabbits instead of wild hares. When released, instead of fleeing, the rabbits mistook Napoleon for their feeder and swarmed his carriage, forcing an imperial retreat.",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
    source: "Historical Archives / Alexandre Dumas memoirs",
  },
  {
    id: "hi-002",
    category: "history",
    title: "Tsutomu Yamaguchi survived both the Hiroshima and Nagasaki atomic blasts",
    body: "On August 6, 1945, Yamaguchi was in Hiroshima on business when 'Little Boy' detonated 3 km away. Though severely burned, he boarded a train home to Nagasaki. On August 9, while describing the first explosion to his supervisor, 'Fat Man' detonated overhead. He survived both and lived to age 93.",
    image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80",
    source: "Official Japanese Government Records",
  },
  {
    id: "hi-003",
    category: "history",
    title: "The Dancing Plague of 1518: Hundreds danced until exhaustion and death",
    body: "In July 1518, a woman named Frau Troffea began dancing frantically in a Strasbourg street. Within a month, about 400 citizens joined in without food or sleep. Physicians prescribed more dancing, building a wooden stage. Dozens suffered heart attacks and collapsed dead from sheer physical exhaustion.",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80",
    source: "British Medical Journal (BMJ)",
  },
  {
    id: "hi-004",
    category: "history",
    title: "Cleopatra lived closer to the first iPhone than to the building of the Pyramids",
    body: "The Great Pyramid of Giza was completed around 2560 BC. Cleopatra VII reigned in Egypt around 30 BC — roughly 2,500 years after the pyramid was built. The first iPhone debuted in 2007 AD, approximately 2,037 years after her reign. Chronologically, she is closer to Silicon Valley than to Pharaoh Khufu.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80",
    source: "Oxford Chronology of Ancient History",
  },
  {
    id: "hi-005",
    category: "history",
    title: "The Anglo-Zanzibar war lasted between 38 and 43 minutes",
    body: "On August 27, 1896, the sultan of Zanzibar died and Khalid bin Barghash seized power without British treaty approval. Royal Navy warships opened fire on the wooden palace at 9:02 AM. By 9:40 AM, the palace was ablaze, 500 Zanzibari defenders were casualties, and the flag was hauled down.",
    image: "https://images.unsplash.com/photo-1589825743127-2f4e9ed90a68?w=800&q=80",
    source: "Guinness World Records",
  },

  // ─── HUMAN MIND & BODY ───────────────────────────────────────────────────────
  {
    id: "hm-001",
    category: "human",
    title: "The human brain has zero pain receptors",
    body: "While the brain interprets all pain signals sent from nerves throughout the body, the brain tissue itself has no nociceptors (pain receptors). Because of this, neurosurgeons routinely perform brain surgery while patients remain awake, talking, and playing musical instruments to test motor functions.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    source: "Johns Hopkins Medicine",
  },
  {
    id: "hm-002",
    category: "human",
    title: "Your brain hallucinating your vision to fill in an eye blind spot",
    body: "Every human eye has a significant blind spot where the optic nerve leaves the retina, leaving no photoreceptor cells. Your brain continuously guesses what belongs there based on surrounding patterns, fabricating imaginary color and texture so seamless that you never notice the missing hole.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    source: "Vision Research",
  },
  {
    id: "hm-003",
    category: "human",
    title: "Fatal Familial Insomnia: A genetic disease where sleep vanishes permanently",
    body: "FFI is an ultra-rare prion mutation that attacks the thalamus. Beginning with worsening insomnia, patients progressively lose all ability to enter sleep. Deprived of sleep architecture, severe hallucinations, dementia, and physical breakdown occur over months until total coma and death.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    source: "New England Journal of Medicine",
  },
  {
    id: "hm-004",
    category: "human",
    title: "Your stomach produces a completely new lining every 3 to 4 days",
    body: "Hydrochloric acid in the human stomach has a pH of 1.5 to 2.0 — caustic enough to dissolve zinc metal and strip industrial paint. To prevent the stomach from digesting itself, specialized epithelial cells produce a protective bicarbonate mucus that is fully shed and replaced every few days.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    source: "Gastroenterology Journal",
  },

  // ─── FORBIDDEN EARTH ─────────────────────────────────────────────────────────
  {
    id: "ea-001",
    category: "earth",
    title: "The Kola Superdeep Borehole drilled 12.2 km until rock turned to plastic",
    body: "Soviet geologists spent 24 years drilling the Kola Superdeep Borehole. At 12,262 meters, temperatures reached 180°C instead of expected 100°C, and rocks became malleable like warm plastic, flowing back into the drill hole like putty. Drilling ceased and the hole remains sealed with a bolted metal cap.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    source: "Scientific American",
  },
  {
    id: "ea-002",
    category: "earth",
    title: "Lake Natron's caustic waters turn dead birds into calcified stone",
    body: "Lake Natron in northern Tanzania has water temperatures reaching 60°C and a pH as alkaline as 10.5 due to massive sodium carbonate and natron deposits from surrounding volcanoes. Animals that perish in the water become mummified and calcified into intact, eerie stone-like statues.",
    image: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&q=80",
    source: "New Scientist / Nick Brandt photography",
  },
  {
    id: "ea-003",
    category: "earth",
    title: "The 'Door to Hell' crater has burned continuously for over 50 years",
    body: "In 1971, Soviet engineers in the Karakum Desert of Turkmenistan accidentally drilled into a subterranean natural gas pocket, collapsing the drilling rig into a 70-meter wide crater. Fearing poisonous methane emissions, they tossed a flare inside expecting it to burn out in weeks. It has raged uninterrupted ever since.",
    image: "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800&q=80",
    source: "National Geographic",
  },
  {
    id: "ea-004",
    category: "earth",
    title: "Point Nemo is so isolated that astronauts in space are the nearest humans",
    body: "Point Nemo in the South Pacific is the Oceanic Pole of Inaccessibility, located 2,688 km from the nearest speck of land (Ducie Island). When the International Space Station passes overhead at 400 km altitude, the astronauts aboard are six times closer to Point Nemo than any person on Earth.",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    source: "National Ocean Service",
  },

  // ─── TECH & CYBER LORE ───────────────────────────────────────────────────────
  {
    id: "tc-001",
    category: "tech",
    title: "Voyager 1 is 24 billion km away running on just 69 KB of memory",
    body: "Launched in 1977, Voyager 1 is the farthest human-made object in history, cruising through interstellar space. Its entire flight computer operates with 69.63 kilobytes of memory — less than the size of a single digital thumbnail icon — powered by decaying plutonium pellets.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    source: "NASA Jet Propulsion Laboratory",
  },
  {
    id: "tc-002",
    category: "tech",
    title: "The legendary 500-mile email glitch in campus Unix systems",
    body: "System administrator Trey Darley received a genuine ticket from a statistics department chairman: 'We cannot send emails more than 500 miles away.' Investigation revealed an upgraded operating system reset the sendmail timeout to zero, allowing TCP handshakes to complete only within a speed-of-light travel radius of roughly 520 miles.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    source: "Usenet Archive / ibiblio",
  },
  {
    id: "tc-003",
    category: "tech",
    title: "The first computer bug was an actual trapped moth",
    body: "In September 1947, computer pioneer Grace Hopper's team at Harvard University encountered an error on the electromechanical Mark II computer. Upon opening Relay #70 in Panel F, they found a live moth trapped between the contacts. They taped it into their logbook with the entry: 'First actual case of bug being found.'",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    source: "Smithsonian National Museum of American History",
  },
  {
    id: "tc-004",
    category: "tech",
    title: "Nuclear launch silos used 8-inch floppy disks until 2019",
    body: "Until October 2019, the United States Strategic Automated Command and Control System (SACCS), which coordinates nuclear bombers and intercontinental ballistic missiles (ICBMs), ran on 1970s IBM Series/1 computers utilizing large 8-inch magnetic floppy disks because their non-networked antiquity made them un-hackable.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    source: "US Air Force / Defense One",
  },

  // ─── PARADOXES & MATH ────────────────────────────────────────────────────────
  {
    id: "pa-001",
    category: "paradox",
    title: "The Monty Hall paradox: Switching doors mathematically doubles your win rate",
    body: "In a game with 3 doors (1 sports car, 2 goats), you pick Door 1. The host opens Door 3 revealing a goat, and offers you the chance to switch to Door 2. Most people believe the odds are 50/50. In fact, switching gives you a 2/3 (66.7%) chance of winning, while staying keeps your initial 1/3 odds.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    source: "The American Statistician",
  },
  {
    id: "pa-002",
    category: "paradox",
    title: "Gabriel's Horn: Finite volume of paint, but infinite surface area",
    body: "Gabriel's Horn (formed by rotating y = 1/x for x ≥ 1 around the x-axis) has a mathematically proven finite volume of exactly π cubic units, but an infinite surface area. You could completely fill the horn with a can of paint, but you could never paint the outside surface.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    source: "Calculus / Evangelista Torricelli (1641)",
  },
  {
    id: "pa-003",
    category: "paradox",
    title: "In a room of 23 people, there is a 50% chance two share a birthday",
    body: "Known as the Birthday Paradox, it feels counterintuitive because people think of someone matching their own birthday. But with 23 people, there are 253 unique pairs of individuals being compared. With 70 people in a room, the probability of a shared birthday exceeds 99.9%.",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    source: "Probability Theory",
  },
  {
    id: "pa-004",
    category: "paradox",
    title: "The Banach-Tarski Theorem: Dissect one sphere into two identical spheres",
    body: "Using the mathematical Axiom of Choice, a solid three-dimensional ball can be broken down into just five non-measurable pieces and reassembled using only rigid rotations and translations into two identical solid balls, each the exact same size as the original.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    source: "Fundamenta Mathematicae",
  },

  // ─── LETHAL BOTANY & NATURE ──────────────────────────────────────────────────
  {
    id: "na-001",
    category: "nature",
    title: "The Gympie-Gympie suicide tree's sting causes agony lasting years",
    body: "Dendrocnide moroides in Australian rainforests is blanketed in microscopic hollow silica hypodermic needles. Brushing against it injects moroidin, an ultra-stable peptide neurotoxin. Victims describe the pain as 'being electrocuted and burned with acid simultaneously', with agony recurring for up to two years.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    source: "Australian Geographic",
  },
  {
    id: "na-002",
    category: "nature",
    title: "Cordyceps fungi hijack ant brains and puppeteer them to their deaths",
    body: "Ophiocordyceps unilateralis spores penetrate a carpenter ant's exoskeleton and grow mycelium directly into its muscle fibers. The fungus manipulates the ant's nervous system, forcing it to climb exactly 25 cm up a north-facing branch, bite the underside of a leaf with a death grip, and die as the mushroom erupts through its head.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
    source: "BMC Ecology",
  },
  {
    id: "na-003",
    category: "nature",
    title: "A single average cumulus cloud weighs approximately 500,000 kilograms",
    body: "That fluffy white cloud floating over your head weighs around 500 metric tons (1.1 million pounds) — equivalent to 100 adult elephants or a fully loaded Boeing 747. It stays aloft because the weight is distributed across billions of microscopic water droplets sustained by warm atmospheric updrafts.",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
    source: "National Center for Atmospheric Research (NCAR)",
  },
  {
    id: "na-004",
    category: "nature",
    title: "Honey sealed in Egyptian pharaoh tombs is still edible after 3,000 years",
    body: "Archaeologists excavating ancient Egyptian tombs found jars of honey over 3,000 years old that remained pristine and perfectly edible. Honey's natural lack of moisture, high acidity (pH 3.9), and the presence of hydrogen peroxide from bee stomach enzymes prevent any bacteria or fungi from growing.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    source: "Smithsonian Magazine",
  },

  // ─── UNSOLVED MYSTERIES ──────────────────────────────────────────────────────
  {
    id: "my-001",
    category: "mysteries",
    title: "The 1977 'Wow! Signal' from deep space has never been explained",
    body: "On August 15, 1977, Ohio State's Big Ear radio telescope detected a powerful, narrowband radio signal at 1420.456 MHz (the hydrogen line) lasting 72 seconds from the constellation Sagittarius. Astronomer Jerry Ehman circled the data reading '6EQUJ5' and scribbled 'Wow!'. Despite decades of searching, it has never repeated.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    source: "SETI Institute",
  },
  {
    id: "my-002",
    category: "mysteries",
    title: "Dark Matter & Dark Energy comprise 95% of everything in the universe",
    body: "Everything humans have ever observed — all stars, planets, nebulae, atoms, elements, and black holes — constitutes barely 5% of the cosmos. Approximately 27% is mysterious dark matter that holds galaxies together, and 68% is dark energy accelerating the expansion of spacetime.",
    image: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&q=80",
    source: "ESA / Planck Collaboration",
  },
  {
    id: "my-003",
    category: "mysteries",
    title: "The Antikythera Mechanism: A 2,100-year-old analog computer with 30 gears",
    body: "Discovered in a shipwreck off Greece in 1901, this ancient bronze device dates to 150 BC. Its intricate arrangement of over 30 precision interlocking gearwheels calculated the astronomical cycles of the Sun, Moon, and 5 known planets, including eclipses. Mechanical complexity of this level vanished until 14th-century cathedral clocks.",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    source: "Nature / Antikythera Research Project",
  },
  {
    id: "my-004",
    category: "mysteries",
    title: "Roman concrete heals its own cracks using saltwater chemistry",
    body: "While modern concrete degrades in ocean water within 50 years, 2,000-year-old Roman piers and breakwaters are stronger today than when built. Scientists discovered Romans mixed volcanic ash and quicklime; seawater dissolves the lime and triggers the growth of interlocking plazolite crystals that seal fractures as they form.",
    image: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&q=80",
    source: "Science Advances",
  },
];
