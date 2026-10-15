export interface Fact {
  id: string;
  category: string;
  title: string;
  body: string;
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
  {
    "id": "sp-001",
    "category": "space",
    "title": "Cold Welding: Metals fuse permanently if touched in vacuum",
    "body": "If two clean, smooth pieces of the exact same metal touch in outer space, they fuse permanently into one solid piece. With no air or oxidation layer separating the atoms, the atoms simply don't know they are on separate objects.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "European Space Agency"
  },
  {
    "id": "sp-002",
    "category": "space",
    "title": "The fastest spinning neutron star spins 716 times each second",
    "body": "Pulsar PSR J1748-2446ad spins 716 revolutions per second. A point on its equator moves at 70,000 km/s \u2014 nearly a quarter the speed of light. Its gravitational pull is so strong that mountains on its surface can be no higher than a few millimeters.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Science Magazine"
  },
  {
    "id": "sp-003",
    "category": "space",
    "title": "A day on Venus is longer than its entire year",
    "body": "Venus has such a sluggish rotation that one day-night cycle on its axis lasts 243 Earth days, while it completes an orbit around the Sun in just 225 Earth days. Even stranger, it rotates clockwise \u2014 opposite to almost all other planets.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "NASA Planetary Science"
  },
  {
    "id": "sp-004",
    "category": "space",
    "title": "Sharks are older than Saturn's rings",
    "body": "Saturn's iconic rings are young cosmic structures, estimated to have formed roughly 100 to 400 million years ago from a shattered comet or icy moon. Sharks, meanwhile, have swam in Earth's oceans for over 450 million years.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Science / Cassini Mission"
  },
  {
    "id": "sp-005",
    "category": "space",
    "title": "A massive cosmic vapor reservoir holds 140 trillion times Earth's water",
    "body": "Astronomers discovered a vapor reservoir surrounding the hyperluminous quasar APM 08279+5255, located 12 billion light-years away. It contains 140 trillion times more water vapor than all of Earth's oceans combined.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "NASA Caltech"
  },
  {
    "id": "sp-006",
    "category": "space",
    "title": "Footprints left on the Moon will survive 100 million years",
    "body": "Because the Moon possesses no atmosphere, there is no wind to blow dust away and no liquid water to cause erosion. The footprints pressed into the lunar regolith by Apollo astronauts will remain crisp for at least 100 million years.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Apollo Lunar Surface Journal"
  },
  {
    "id": "sp-007",
    "category": "space",
    "title": "Olympus Mons on Mars is three times taller than Mount Everest",
    "body": "Olympus Mons is the largest volcano in the Solar System. Rising 21.9 km into the thin Martian sky, its peak extends beyond most of Mars' atmosphere. The volcano spans an area so vast (600 km wide) that its summit is hidden beyond the horizon.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "NASA JPL"
  },
  {
    "id": "sp-008",
    "category": "space",
    "title": "Trillions of rogue planets drift alone in interstellar space",
    "body": "Astronomers estimate there may be trillions of rogue planets drifting in the void of the Milky Way without orbiting any star. Ejected from their birth systems by gravitational slingshots, some may harbor sub-surface liquid oceans.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Nature Astronomy"
  },
  {
    "id": "sp-009",
    "category": "space",
    "title": "Liquid iron rain falls from the sky on exoplanet WASP-76b",
    "body": "On the ultra-hot Jupiter exoplanet WASP-76b, daytime temperatures reach 2,400\u00b0C, vaporizing iron metal into the atmosphere. Extreme winds carry this vapor to the cooler nightside (1,500\u00b0C), where iron condenses and falls as metallic liquid rain.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "European Southern Observatory (ESO)"
  },
  {
    "id": "sp-010",
    "category": "space",
    "title": "The Boomerang Nebula is the coldest natural place in the known universe",
    "body": "Located 5,000 light-years away, the Boomerang Nebula is expanding so rapidly that adiabatic expansion cools its gas to 1 Kelvin (-272.15\u00b0C) \u2014 colder than the 2.7 Kelvin cosmic microwave background radiation left over from the Big Bang.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Astrophysical Journal"
  },
  {
    "id": "sp-011",
    "category": "space",
    "title": "TON 618: An ultramassive black hole containing 66 billion solar masses",
    "body": "The ultramassive black hole powering the hyperluminous quasar TON 618 has a mass equal to 66 billion Suns. Its event horizon spans 390 billion kilometers in diameter \u2014 over 40 times the distance from Pluto to the Sun.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Royal Astronomical Society"
  },
  {
    "id": "sp-012",
    "category": "space",
    "title": "The Sun accounts for 99.86% of the entire mass of the Solar System",
    "body": "All planets, dwarf planets, moons, asteroids, comets, and dust rings combined make up only 0.14% of the Solar System's total mass. Jupiter makes up most of that remaining fraction; Earth is a microscopic grain by comparison.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "NASA Solar Physics"
  },
  {
    "id": "sp-013",
    "category": "space",
    "title": "Sunsets on Mars glow an eerie, incandescent blue",
    "body": "Because Martian dust contains fine iron oxide particles that scatter red light forward, the sky during the day looks rusty orange, but directly around the setting Sun, blue light scatters through the thin atmosphere, creating bright sapphire sunsets.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "NASA Curiosity Rover"
  },
  {
    "id": "sp-014",
    "category": "space",
    "title": "The Moon is drifting 3.8 centimeters away from Earth every year",
    "body": "Tidal friction caused by the gravitational pull between the Earth's oceans and the Moon transfers rotational energy to lunar orbital momentum. As a result, Earth's rotation slows by 1.7 milliseconds per century while the Moon recedes.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Lunar Laser Ranging Experiment"
  },
  {
    "id": "sp-015",
    "category": "space",
    "title": "Jupiter's Great Red Spot is a storm that could swallow Earth whole",
    "body": "Jupiter's Great Red Spot is a persistent anticyclonic storm at least 350 years old. With wind speeds exceeding 430 km/h, it is larger in diameter than the entire planet Earth, though it has been slowly shrinking over the past century.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "NASA Juno Mission"
  },
  {
    "id": "sp-016",
    "category": "space",
    "title": "On Neptune and Uranus, diamonds hail down toward the planets' cores",
    "body": "Extreme atmospheric pressures and temperatures thousands of kilometers beneath the clouds of Neptune and Uranus split methane into carbon and hydrogen. The compressed carbon crystallizes into diamonds that rain down into slushy metallic mantles.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Nature Communications"
  },
  {
    "id": "sp-017",
    "category": "space",
    "title": "The Bootes Void: A 330-million-light-year desert of empty space",
    "body": "Spanning nearly 330 million light-years in diameter, the Bootes Void is one of the largest cosmic voids in the universe. While a region of this size should normally contain roughly 10,000 galaxies, astronomers have detected only about 60 inside it.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Astrophysical Journal Letters"
  },
  {
    "id": "sp-018",
    "category": "space",
    "title": "Light created in the Sun's core takes 100,000 years to reach its surface",
    "body": "Photons generated by nuclear fusion in the Sun's core must travel through an ultra-dense plasma zone, colliding with electrons in a random walk millions of times. It takes between 10,000 and 170,000 years for that photon to reach the surface, then just 8 minutes to reach Earth.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Max Planck Institute for Solar System Research"
  },
  {
    "id": "sp-019",
    "category": "space",
    "title": "Apollo astronauts reported that lunar dust smells exactly like spent gunpowder",
    "body": "When Apollo astronauts returned to the lunar module and removed their helmets, they noticed a pungent, acrid odor reminiscent of fired gunpowder or burnt firecrackers. The smell comes from fractured chemical bonds in silicate regolith.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "NASA Apollo Oral History"
  },
  {
    "id": "sp-020",
    "category": "space",
    "title": "Hypervelocity stars travel at millions of km/h and escape their home galaxies",
    "body": "When a binary star system passes too close to a supermassive black hole, one star is captured while the other is whipped into space by the gravitational slingshot at speeds exceeding 3 million km/h, fast enough to permanently exit the galaxy.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Harvard-Smithsonian Center for Astrophysics"
  },
  {
    "id": "sp-021",
    "category": "space",
    "title": "Saturn's north pole features a permanent 30,000-km-wide geometric hexagon storm",
    "body": "First discovered by Voyager 1 in 1981, Saturn's north pole is crowned by a colossal six-sided hexagonal jet stream wide enough to fit four Earths inside. Atmospheric models suggest the geometry is created by standing wave harmonics in gas giants.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "NASA Cassini Spacecraft"
  },
  {
    "id": "sp-022",
    "category": "space",
    "title": "The Great Attractor is pulling our entire galaxy toward an invisible mass",
    "body": "The Milky Way and thousands of neighboring galaxies are being pulled at 600 km/s toward a mysterious gravitational anomaly known as the Great Attractor, hidden behind the dust and stars of the Milky Way's 'Zone of Avoidance'.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Monthly Notices of the Royal Astronomical Society"
  },
  {
    "id": "sp-023",
    "category": "space",
    "title": "Titan has liquid methane lakes and cryogenic water-ice volcanoes",
    "body": "Saturn's moon Titan is the only celestial body besides Earth with stable surface lakes and rain, but its hydrological cycle runs on liquid methane and ethane at -179\u00b0C. Beneath its frozen crust lies a global sub-surface liquid water ocean.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "NASA Cassini-Huygens"
  },
  {
    "id": "sp-024",
    "category": "space",
    "title": "Enceladus shoots geysers of organic-rich saltwater directly into space",
    "body": "Saturn's tiny icy moon Enceladus has warm hydrothermal vents at the floor of an underground global ocean. The vents pressurize plumes of saltwater, methane, silica, and complex organic molecules that shoot hundreds of kilometers into orbit.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Nature / Cassini Mission"
  },
  {
    "id": "sp-025",
    "category": "space",
    "title": "Cosmic Latte: The average color of the universe is a soft beige",
    "body": "In 2002, astronomers at Johns Hopkins University averaged the spectral light emitted by more than 200,000 galaxies to determine the universe's overall color. The result is a warm, creamy off-white color officially christened 'Cosmic Latte'.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Johns Hopkins University"
  },
  {
    "id": "sp-026",
    "category": "space",
    "title": "Ganymede is larger than planet Mercury and has its own magnetic field",
    "body": "Jupiter's moon Ganymede is the largest moon in the Solar System, with a diameter of 5,268 km \u2014 larger than Mercury and Pluto. It is the only known moon with its own internally generated magnetosphere, produced by a convective liquid iron core.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "NASA Galileo Mission"
  },
  {
    "id": "sp-027",
    "category": "space",
    "title": "Mercury has frozen water ice in deep craters despite 430\u00b0C solar heat",
    "body": "Although surface temperatures on Mercury soar to 430\u00b0C in direct sunlight, its rotational axis has almost zero tilt. Craters at its poles are permanently shielded from sunlight in perpetual shadow at -180\u00b0C, preserving thick beds of pure water ice.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "NASA MESSENGER Mission"
  },
  {
    "id": "sp-028",
    "category": "space",
    "title": "Outer space is filled with the smell of seared steak and hot metal",
    "body": "Astronauts conducting spacewalks consistently report a distinctive lingering scent on their spacesuits once repressurized: a sweet, metallic smell resembling seared barbecue steak, welding sparks, and diesel fumes from high-energy polycyclic hydrocarbons.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "NASA Spacewalk Debriefs"
  },
  {
    "id": "sp-029",
    "category": "space",
    "title": "Earth sweeps through 40,000 tons of cosmic space dust every single year",
    "body": "As Earth orbits the Sun, our planet collides with trails of debris left behind by comets and asteroid collisions. Roughly 100 tons of extraterrestrial micrometeorite dust settles onto Earth's continents and oceans every day.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Geochimica et Cosmochimica Acta"
  },
  {
    "id": "sp-030",
    "category": "space",
    "title": "If the Sun became a black hole right now, Earth would not get sucked in",
    "body": "If the Sun were replaced by a black hole of equal mass, its gravitational pull at Earth's distance (150 million km) would remain completely unchanged. Earth would continue in its exact current orbital path, though life would freeze without sunlight.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "General Relativity Fundamentals"
  },
  {
    "id": "qu-001",
    "category": "quantum",
    "title": "Superfluid Helium climbs up walls and defies gravity",
    "body": "When cooled below 2.17 Kelvin (-271\u00b0C), liquid helium-4 becomes a superfluid with absolute zero viscosity. It crawls up the inner walls of its beaker in a molecular film just 30 nanometers thick and drips off the bottom outside edge spontaneously.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "American Physical Society"
  },
  {
    "id": "qu-002",
    "category": "quantum",
    "title": "The Double-Slit experiment changes behavior when observed",
    "body": "Photons and electrons fired through two slits form an interference wave pattern on the detector screen. However, placing a sensor to detect which slit each particle actually passes through causes the wave function to collapse, acting purely like ordinary bullets.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Physics Reports"
  },
  {
    "id": "qu-003",
    "category": "quantum",
    "title": "Quantum Entanglement acts across light-years instantaneously",
    "body": "Two entangled particles share a single quantum state. Measuring the spin of one immediately fixes the corresponding state of the other, faster than the speed of light. Einstein rejected this as 'spooky action at a distance', yet it has been proven experimentally.",
    "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    "source": "Physical Review Letters"
  },
  {
    "id": "qu-004",
    "category": "quantum",
    "title": "One gram of Antimatter holds the destructive energy of a nuclear bomb",
    "body": "When antimatter meets ordinary matter, they undergo 100% mass-to-energy conversion (E=mc\u00b2). One gram of antimatter reacting with one gram of matter yields 1.8 \u00d7 10\u00b9\u2074 joules \u2014 equivalent to the 43-kiloton bomb dropped on Hiroshima multiplied by two.",
    "image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    "source": "CERN Particle Laboratory"
  },
  {
    "id": "qu-005",
    "category": "quantum",
    "title": "Time runs measurably faster at your head than at your feet",
    "body": "Einstein's general relativity dictates that gravity dilates time. Because your head is farther from Earth's center of mass than your feet, it experiences slightly weaker gravity. Ultra-precise optical atomic clocks can measure this time difference over just 1 millimeter in height.",
    "image": "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80",
    "source": "NIST (National Institute of Standards)"
  },
  {
    "id": "qu-006",
    "category": "quantum",
    "title": "Hot water can freeze faster than cold water (Mpemba effect)",
    "body": "Under certain controlled conditions, warm or hot water will freeze into ice before identical cold water in the same freezer. First documented by Tanzanian student Erasto Mpemba in 1963, its mechanisms involve convection currents, dissolved gases, and hydrogen bond anomalies.",
    "image": "https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?w=800&q=80",
    "source": "Nature Physics"
  },
  {
    "id": "qu-007",
    "category": "quantum",
    "title": "The Quantum Zeno Effect: A watched particle never decays",
    "body": "In quantum mechanics, measuring an unstable particle forces its wave function to collapse back into its initial state. By measuring the particle repeatedly with ultra-short intervals, the system can be completely frozen in time, preventing it from decaying indefinitely.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Physical Review A"
  },
  {
    "id": "qu-008",
    "category": "quantum",
    "title": "Cherenkov Radiation: Particles travel faster than the speed of light in water",
    "body": "While nothing can exceed the speed of light in a vacuum (c), light slows down to roughly 225,000 km/s in water. High-energy beta electrons emitted by nuclear reactors can travel faster than light does in water, producing an eerie blue optical shockwave.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Nuclear Engineering Fundamentals"
  },
  {
    "id": "qu-009",
    "category": "quantum",
    "title": "If all empty atomic space was removed, humanity would fit in a sugar cube",
    "body": "Atoms are roughly 99.9999999% empty space. The nucleus contains virtually all mass but occupies only a quadrillionth of the volume. If you eliminated all empty vacuum space from every atom in all 8 billion human bodies, the remaining matter would fit into a single sugar cube.",
    "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    "source": "Particle Physics Overview"
  },
  {
    "id": "qu-010",
    "category": "quantum",
    "title": "Casimir Effect: Two uncharged plates in a vacuum attract from nothing",
    "body": "Place two parallel, uncharged metal plates microscopic nanometers apart in a complete vacuum, and they will physically pull together. The plates restrict the wavelengths of quantum vacuum virtual particles between them, creating a net external pushing pressure.",
    "image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    "source": "Physical Review"
  },
  {
    "id": "qu-011",
    "category": "quantum",
    "title": "Quantum Tunneling allows particles to pass through solid impenetrable walls",
    "body": "In the quantum realm, particles behave as probability waves. There is a non-zero probability that a particle can spontaneously appear on the other side of an energetic barrier it lacks the energy to climb over. This process powers solar nuclear fusion and flash memory.",
    "image": "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80",
    "source": "Foundations of Physics"
  },
  {
    "id": "qu-012",
    "category": "quantum",
    "title": "Glass is technically an amorphous solid, not a slow liquid",
    "body": "Despite the popular myth that stained glass windows in medieval cathedrals are thicker at the bottom because glass flows over centuries, glass is an amorphous solid. Historical panes are uneven simply because early hand-blown cylinder manufacturing was inconsistent.",
    "image": "https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?w=800&q=80",
    "source": "American Ceramic Society"
  },
  {
    "id": "qu-013",
    "category": "quantum",
    "title": "Aerogel is 99.8% air and can insulate a flower against a blowtorch",
    "body": "Synthetic silica aerogel is the world's lowest-density solid material. Nicknamed 'frozen smoke', its intricate nanoscale pores trap air molecules so effectively that heat cannot pass through; a blowtorch held against one side won't singe a delicate rose petal on the other.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "NASA Materials Science"
  },
  {
    "id": "qu-014",
    "category": "quantum",
    "title": "Sound cannot exceed 194 decibels in Earth's atmosphere without turning into a shockwave",
    "body": "Sound waves consist of alternating compressions and rarefactions of air pressure. At 194 decibels, the rarefaction pressure reaches absolute zero (a total vacuum), meaning air cannot be stretched any further. Any louder sound transforms into an explosive supersonic shockwave.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Acoustical Society of America"
  },
  {
    "id": "qu-015",
    "category": "quantum",
    "title": "Lightning superheats surrounding air to 30,000 Kelvin (5x hotter than the Sun)",
    "body": "A single bolt of cloud-to-ground lightning carries up to 30,000 amperes of current at 300 million volts. The electrical channel superheats air molecules to roughly 30,000 Kelvin in microseconds, generating explosive thermal expansion heard as thunder.",
    "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    "source": "National Weather Service"
  },
  {
    "id": "qu-016",
    "category": "quantum",
    "title": "Neutrinos pass through light-years of solid lead without colliding with an atom",
    "body": "Trillions of solar neutrinos pass through your thumb every second without interacting with a single atom. Because they have virtually zero mass and interact only via gravity and the weak nuclear force, a neutrino could pass through a light-year of solid lead with 50% survival.",
    "image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    "source": "Super-Kamiokande Neutrino Observatory"
  },
  {
    "id": "qu-017",
    "category": "quantum",
    "title": "Quarks can never exist alone: Pulling them apart creates new matter",
    "body": "Due to quantum chromodynamics and color confinement, the strong nuclear force holding quarks together does not weaken with distance. Pulling two quarks apart requires so much energy that E=mc\u00b2 creates a new quark-antiquark pair before they can separate.",
    "image": "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80",
    "source": "CERN Theoretical Physics"
  },
  {
    "id": "qu-018",
    "category": "quantum",
    "title": "Bose-Einstein Condensates can slow the speed of light down to 17 meters per second",
    "body": "In 1999, Harvard physicist Lene Hau cooled a cloud of sodium atoms to billionths of a degree above absolute zero. Passing a laser beam through this Bose-Einstein condensate slowed light from 300,000 km/s down to 17 meters per second \u2014 slower than a bicycle.",
    "image": "https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?w=800&q=80",
    "source": "Nature / Harvard University"
  },
  {
    "id": "qu-019",
    "category": "quantum",
    "title": "Gravitational waves distort distance by less than 1/10,000th the width of a proton",
    "body": "When two colliding black holes rippled spacetime in 2015, the LIGO detector measured a strain of 10\u207b\u00b2\u00b9. Over a 4-kilometer laser arm, this distorted distance by less than 1/10,000th the diameter of a subatomic proton, yet was detected with quantum interferometry.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Physical Review Letters / LIGO"
  },
  {
    "id": "qu-020",
    "category": "quantum",
    "title": "Water expands when it freezes due to rigid tetrahedral hydrogen bonding",
    "body": "Most liquids become denser and contract when solidifying. Water is a rare anomaly: as it cools below 4\u00b0C, hydrogen bonds organize into an open, hexagonal crystal lattice that spaces molecules farther apart, decreasing ice density so ice floats on water.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Journal of Chemical Physics"
  },
  {
    "id": "cr-001",
    "category": "creatures",
    "title": "Pistol Shrimp claw snap creates heat matching the surface of the Sun",
    "body": "The pistol shrimp snaps its specialized claw at 100 km/h, generating a low-pressure cavitation bubble. When the bubble implodes, it creates temperatures exceeding 4,700\u00b0C (nearly the Sun's surface at 5,500\u00b0C), emitting a flash of light called sonoluminescence and a 218-decibel shockwave.",
    "image": "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    "source": "Nature"
  },
  {
    "id": "cr-002",
    "category": "creatures",
    "title": "The Immortal Jellyfish can reverse its aging cycle forever",
    "body": "Turritopsis dohrnii is biologically immortal. When confronted with physical trauma, starvation, or old age, its mature cells transform backward into polyp stage via transdifferentiation, rebooting its lifecycle from scratch indefinitely.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "Biological Bulletin"
  },
  {
    "id": "cr-003",
    "category": "creatures",
    "title": "Tardigrades can survive the vacuum of space, boil, and freeze",
    "body": "Water bears (tardigrades) can enter a cryptobiotic state called a 'tun', expelling 99% of body moisture. In this state they endure absolute zero (\u2212273\u00b0C), boiling heat up to 150\u00b0C, 1,000 times human lethal radiation, and 10 days in outer space vacuum.",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    "source": "European Space Agency"
  },
  {
    "id": "cr-004",
    "category": "creatures",
    "title": "Crows remember human faces and pass grudges to their children",
    "body": "University of Washington researchers wore specific rubber masks while handling crows. For years afterward, crows in the area mobbed individuals wearing that specific mask. Even young crows born years later joined the attack, having learned the enemy's face from the flock.",
    "image": "https://images.unsplash.com/photo-1559082603-8ad960d1a6fc?w=800&q=80",
    "source": "PNAS"
  },
  {
    "id": "cr-005",
    "category": "creatures",
    "title": "Octopuses have three hearts and decentralized brains in each arm",
    "body": "An octopus possesses two branchial hearts pumping blue copper-rich hemocyanin through its gills, and a third systemic heart for the body. Two-thirds of its 500 million neurons reside inside its arms, allowing each tentacle to taste, feel, and make independent choices.",
    "image": "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    "source": "Cell Biology"
  },
  {
    "id": "cr-006",
    "category": "creatures",
    "title": "Sloths can hold their breath underwater three times longer than dolphins",
    "body": "Dolphins need to surface after roughly 10-15 minutes, but three-toed sloths can survive submerged underwater for up to 40 minutes. They accomplish this by dramatically slowing their metabolic rate and dropping their heart rate to a third of resting speed.",
    "image": "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80",
    "source": "Smithsonian Tropical Research"
  },
  {
    "id": "cr-007",
    "category": "creatures",
    "title": "Axolotls can regenerate complete limbs, lungs, hearts, and parts of their brains",
    "body": "Unlike mammals that develop scar tissue after severe injuries, the Mexican axolotl regrows complete functional limbs, retinas, spinal cords, and even damaged brain lobes without leaving a single scar, making them premier subjects in regenerative medicine.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "Developmental Dynamics"
  },
  {
    "id": "cr-008",
    "category": "creatures",
    "title": "The Bombardier Beetle shoots boiling chemical toxic spray at 100\u00b0C",
    "body": "When threatened, the bombardier beetle combines hydroquinone and hydrogen peroxide with catalytic enzymes in an internal reaction chamber. The resulting chemical explosion reaches 100\u00b0C and is discharged through a rotating nozzle in pulsing rapid bursts.",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    "source": "Science"
  },
  {
    "id": "cr-009",
    "category": "creatures",
    "title": "Platypuses glow neon cyan under ultraviolet light and hunt by electricity",
    "body": "The duck-billed platypus is a biological anomaly: an egg-laying mammal with venomous ankle spurs. Under UV blacklight, its brown fur biofluoresces in glowing cyan. Underwater, it closes eyes, ears, and nostrils, navigating purely via 40,000 electroreceptors on its bill.",
    "image": "https://images.unsplash.com/photo-1559082603-8ad960d1a6fc?w=800&q=80",
    "source": "Mammalia"
  },
  {
    "id": "cr-010",
    "category": "creatures",
    "title": "Mantis shrimp possess 16 color cones and see circular polarized light",
    "body": "Humans navigate the visual world with 3 color-receptive cones (red, green, blue). The mantis shrimp possesses 16 photoreceptors, perceiving ultraviolet, infrared, and circular polarized light. Their club strikes accelerate at 10,000g \u2014 fast enough to smash aquarium glass.",
    "image": "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    "source": "Journal of Experimental Biology"
  },
  {
    "id": "cr-011",
    "category": "creatures",
    "title": "Naked mole rats are immune to cancer and do not experience chemical pain",
    "body": "Naked mole rats can survive 18 minutes of zero oxygen by metabolizing fructose like plants. They produce ultra-high-molecular-mass hyaluronan that stops cancerous tumors from forming, and their pain receptors lack the neurotransmitters needed to feel acid burns.",
    "image": "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80",
    "source": "Nature / Science"
  },
  {
    "id": "cr-012",
    "category": "creatures",
    "title": "Greenland sharks can live over 400 years and mature at age 150",
    "body": "Radiocarbon eye-lens dating revealed that the Greenland shark is the longest-living vertebrate on Earth, with lifespans exceeding 400 to 500 years. Surviving in freezing Arctic depths with an ultra-slow metabolism, females do not reach sexual maturity until age 150.",
    "image": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    "source": "Science Magazine"
  },
  {
    "id": "cr-013",
    "category": "creatures",
    "title": "Wood frogs freeze solid in winter with zero heartbeat, then thaw alive in spring",
    "body": "Alaskan wood frogs survive -18\u00b0C temperatures by allowing up to 70% of their body water to freeze solid into ice. Their livers produce astronomical quantities of glucose and urea acting as natural antifreeze inside cells, stopping their heart and breathing for 7 months.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "Journal of Experimental Biology"
  },
  {
    "id": "cr-014",
    "category": "creatures",
    "title": "Lyrebirds can mimic chainsaws, car alarms, and camera shutters flawlessly",
    "body": "The Australian superb lyrebird possesses the most acoustically complex syrinx (vocal organ) of any bird. It can accurately mimic over 20 other bird species, human conversations, crying babies, car engines, and timber chainsaws with eerie acoustic fidelity.",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    "source": "Current Biology"
  },
  {
    "id": "cr-015",
    "category": "creatures",
    "title": "Electric eels generate 860 volts of electricity to stun prey and defend themselves",
    "body": "Electrophorus voltai in the Amazon river basin can discharge electrical shocks of up to 860 volts at 1 ampere. Its body contains thousands of specialized electrocytes functioning like biological batteries aligned in series, capable of knocking adult caimans unconscious.",
    "image": "https://images.unsplash.com/photo-1559082603-8ad960d1a6fc?w=800&q=80",
    "source": "Nature Communications"
  },
  {
    "id": "cr-016",
    "category": "creatures",
    "title": "Sea cucumbers eject their own intestines to escape predators, then regrow them",
    "body": "When under lethal threat, sea cucumbers violently contract their body walls and rupture their anus, shooting sticky, toxic internal organs and respiratory trees into the face of the predator to entangle them. The cucumber creeps away and regenerates all missing organs in weeks.",
    "image": "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    "source": "Marine Biology"
  },
  {
    "id": "cr-017",
    "category": "creatures",
    "title": "The Mimic Octopus can morph its body into 15 distinct deadly predators",
    "body": "Discovered in 1998 off Indonesia, the mimic octopus does not just change color; it physically alters its swimming posture and body shape to impersonate venomous lionfish, banded sea snakes, flatfish, jellyfish, and sea anemones depending on the specific predator pursuing it.",
    "image": "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80",
    "source": "Proceedings of the Royal Society B"
  },
  {
    "id": "cr-018",
    "category": "creatures",
    "title": "Horned lizards squirt pressurized streams of blood directly from their eye sockets",
    "body": "To deter predatory canines and felines, the Texas horned lizard can restrict blood flow out of its head, dramatically increasing ocular pressure until micro-vessels in the corner of its eyes burst, squirting a foul-tasting blood stream up to 1.5 meters with pinpoint accuracy.",
    "image": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    "source": "Zoology Journal"
  },
  {
    "id": "cr-019",
    "category": "creatures",
    "title": "Hairy frogs deliberately break their own toe bones to produce Wolverine-like claws",
    "body": "The horror frog (Trichobatrachus robustus) in Central Africa has sharp internal bony claws. When attacked, it flexes muscles that snap the bones in its toes, forcing the jagged sharp bone fragments directly through its skin pads to act as razor weapons.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "Biology Letters"
  },
  {
    "id": "cr-020",
    "category": "creatures",
    "title": "Honey badgers can withstand lethal cobra bites and sleep off neurotoxic venom",
    "body": "The honey badger possesses specialized muscular nicotinic acetylcholine receptors that are immune to snake neurotoxins. When bitten by lethal puff adders or cobras, the badger collapses into a temporary coma for several hours, waking up completely unharmed to eat the snake.",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    "source": "Toxicon"
  },
  {
    "id": "oc-001",
    "category": "ocean",
    "title": "The Barreleye fish has a transparent skull and eyes inside its head",
    "body": "Macropinna microstoma survives in pitch-black deep water. Its head is covered by a crystal-clear, fluid-filled shield. The two dark spots in front are smelling organs; its actual bright emerald eyes are glowing spheres safely protected deep inside its transparent forehead.",
    "image": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    "source": "MBARI"
  },
  {
    "id": "oc-002",
    "category": "ocean",
    "title": "There is an underwater waterfall 3 times taller than Angel Falls",
    "body": "Beneath the Denmark Strait between Greenland and Iceland lies the world's largest waterfall. Dense, frigid arctic water plunges 3,500 meters down a subterranean seabed abyss, flowing at over 5 million cubic meters per second \u2014 roughly 2,000 Niagara Falls combined.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "source": "NOAA Ocean Exploration"
  },
  {
    "id": "oc-003",
    "category": "ocean",
    "title": "Fish survive at 8,300 meters under 800 atmospheres of pressure",
    "body": "In 2023, scientists filmed an unknown Pseudoliparis snailfish swimming at 8,336 meters in the Izu-Ogasawara Trench. At this depth, pressure exceeds 80 megapascals \u2014 enough to crush a steel submarine. Their cells rely on trimethylamine oxide (TMAO) to stop cell membranes from solidifying.",
    "image": "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    "source": "Minderoo-UWA Deep-Sea Centre"
  },
  {
    "id": "oc-004",
    "category": "ocean",
    "title": "The colossal squid has eyes the size of regulation soccer balls",
    "body": "Living at depths of 1,000 meters in freezing Antarctic waters, the colossal squid has the largest eyes of any known living organism \u2014 measuring roughly 27 to 30 cm across. They act like biological telescope lenses to spot the faint bioluminescence of predatory sperm whales.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "Current Biology"
  },
  {
    "id": "oc-005",
    "category": "ocean",
    "title": "Hydrothermal vents spew water at 400\u00b0C without it boiling",
    "body": "At deep-sea 'black smoker' chimneys, water heated by subterranean magma reaches temperatures exceeding 400\u00b0C. Due to the immense hydrostatic pressure of kilometers of ocean above, the water cannot vaporize into steam and remains an ultra-dense supercritical fluid.",
    "image": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    "source": "Woods Hole Oceanographic Institution"
  },
  {
    "id": "oc-006",
    "category": "ocean",
    "title": "Underwater brine pools are toxic lakes on the seafloor with their own shorelines",
    "body": "In the Gulf of Mexico and Red Sea, hyper-saline brine pools formed from dissolving ancient salt domes sit on the ocean floor. Being 4 times denser than seawater, they form distinct lakes with waves and shorelines. Any sea creature that accidentally swims in goes into toxic shock.",
    "image": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    "source": "Ocean Exploration Trust"
  },
  {
    "id": "oc-007",
    "category": "ocean",
    "title": "Whale Falls: A single dead whale nourishes deep-sea creatures for a century",
    "body": "When a 40-ton whale dies and sinks to the bathypelagic floor, it creates a massive localized biological oasis. Scavengers strip flesh for 2 years, opportunistic invertebrates colonize bones for 20 years, and bone-eating Osedax worms and bacteria decompose lipids for up to 100 years.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "source": "Deep-Sea Research"
  },
  {
    "id": "oc-008",
    "category": "ocean",
    "title": "The longest animal in the world is a 45-meter-long deep sea siphonophore",
    "body": "In 2020, researchers off Western Australia discovered a giant Apolemia siphonophore coiled in an underwater spiral measuring an estimated 45 meters (150 feet) long \u2014 far longer than any blue whale. It is actually a colonial organism composed of millions of cloned, specialized zooids.",
    "image": "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    "source": "Schmidt Ocean Institute"
  },
  {
    "id": "oc-009",
    "category": "ocean",
    "title": "The Deep Sea Anglerfish male fuses permanently into the female's flesh",
    "body": "In deep abyssal anglerfish (Ceratiidae), dwarfed males lack hunting jaws. When a male finds a female, he bites her belly and releases enzymes that dissolve his mouth and her skin, permanently fusing their bloodstreams. His organs atrophy until he becomes a permanent parasitic sperm reservoir.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "Current Biology"
  },
  {
    "id": "oc-010",
    "category": "ocean",
    "title": "Deep-sea glass sponges build silica glass skeletons that last 15,000 years",
    "body": "Monorhaphis chuni sponges construct glass spicules up to 3 meters long made of pure biosilica fibers that function as optical fiber cables. Scientists analyzing isotope layers in these glass rods discovered individual specimens that have lived continuously for over 15,000 years.",
    "image": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    "source": "Nature / Paleoceanography"
  },
  {
    "id": "oc-011",
    "category": "ocean",
    "title": "The mysterious 'Bloop' sound of 1997 was detected 5,000 km across the Pacific",
    "body": "In 1997, NOAA hydrophone arrays detected an ultra-low frequency, high-amplitude oceanic sound louder than any known animal vocalization. In 2012, analysis confirmed it was generated by an 'icequake' \u2014 a colossal iceberg cracking and calving off the Antarctic shelf.",
    "image": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    "source": "NOAA Pacific Marine Environmental Lab"
  },
  {
    "id": "oc-012",
    "category": "ocean",
    "title": "Mariana Trench Challenger Deep is so deep you could submerge Everest with 2 km to spare",
    "body": "The Challenger Deep reaches 10,928 meters below sea level. If Mount Everest (8,849 m) were placed at the bottom, its highest summit would still be covered by more than 2,000 meters (over 1.2 miles) of crushing ocean water.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "source": "National Geographic Society"
  },
  {
    "id": "oc-013",
    "category": "ocean",
    "title": "Deep-sea gigantism causes tiny surface invertebrates to grow into titans",
    "body": "In deep abyssal trenches, animals such as the giant isopod (Bathynomus giganteus) grow up to 50 cm long, and Japanese spider crabs reach a 3.8-meter leg span. Hypotheses suggest cold temperatures, high pressure, and scarcer food favor large body cells and slow metabolism.",
    "image": "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    "source": "PLOS ONE"
  },
  {
    "id": "oc-014",
    "category": "ocean",
    "title": "Photosynthetic phytoplankton in the ocean generate more than half of Earth's oxygen",
    "body": "While rainforests are frequently called the lungs of the Earth, microscopic marine algae and cyanobacteria (especially Prochlorococcus) produce between 50% and 80% of all oxygen in the atmosphere through ocean photosynthesis.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "NOAA National Ocean Service"
  },
  {
    "id": "oc-015",
    "category": "ocean",
    "title": "Submarine hydrothermal Pompeii worms survive boiling acidic water up to 80\u00b0C",
    "body": "Alvinella pompejana is an extremophile polychaete worm living directly on the chimneys of deep-sea hydrothermal vents. Its tail can withstand temperatures up to 80\u00b0C (176\u00b0F) while its head rests in cool 20\u00b0C water, protected by a dense fleece of symbiotic heat-absorbing bacteria.",
    "image": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    "source": "PNAS"
  },
  {
    "id": "hi-001",
    "category": "history",
    "title": "Napoleon Bonaparte was once overwhelmed and routed by hundreds of rabbits",
    "body": "In July 1807, after signing the Treaty of Tilsit, Napoleon hosted an imperial rabbit hunt. His chief of staff bought hundreds of domestic rabbits instead of wild hares. When released, instead of fleeing, the rabbits mistook Napoleon for their feeder and swarmed his carriage, forcing an imperial retreat.",
    "image": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
    "source": "Historical Memoirs of Alexandre Dumas"
  },
  {
    "id": "hi-002",
    "category": "history",
    "title": "Tsutomu Yamaguchi survived both the Hiroshima and Nagasaki atomic blasts",
    "body": "On August 6, 1945, Yamaguchi was in Hiroshima on business when 'Little Boy' detonated 3 km away. Though severely burned, he boarded a train home to Nagasaki. On August 9, while describing the first explosion to his supervisor, 'Fat Man' detonated overhead. He survived both and lived to age 93.",
    "image": "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80",
    "source": "Official Japanese Government Records"
  },
  {
    "id": "hi-003",
    "category": "history",
    "title": "The Dancing Plague of 1518: Hundreds danced until exhaustion and death",
    "body": "In July 1518, a woman named Frau Troffea began dancing frantically in a Strasbourg street. Within a month, about 400 citizens joined in without food or sleep. Physicians prescribed more dancing, building a wooden stage. Dozens suffered heart attacks and collapsed dead from sheer physical exhaustion.",
    "image": "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80",
    "source": "British Medical Journal (BMJ)"
  },
  {
    "id": "hi-004",
    "category": "history",
    "title": "Cleopatra lived closer to the first iPhone than to the building of the Pyramids",
    "body": "The Great Pyramid of Giza was completed around 2560 BC. Cleopatra VII reigned in Egypt around 30 BC \u2014 roughly 2,500 years after the pyramid was built. The first iPhone debuted in 2007 AD, approximately 2,037 years after her reign. Chronologically, she is closer to Silicon Valley than to Pharaoh Khufu.",
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80",
    "source": "Oxford Chronology of Ancient History"
  },
  {
    "id": "hi-005",
    "category": "history",
    "title": "The Anglo-Zanzibar war lasted between 38 and 43 minutes",
    "body": "On August 27, 1896, the sultan of Zanzibar died and Khalid bin Barghash seized power without British treaty approval. Royal Navy warships opened fire on the wooden palace at 9:02 AM. By 9:40 AM, the palace was ablaze, 500 Zanzibari defenders were casualties, and the flag was hauled down.",
    "image": "https://images.unsplash.com/photo-1589825743127-2f4e9ed90a68?w=800&q=80",
    "source": "Guinness World Records"
  },
  {
    "id": "hi-006",
    "category": "history",
    "title": "The Great Emu War of 1932: Australia deployed the military with machine guns and lost",
    "body": "In 1932, 20,000 wild emus migrated into western Australian farmland, destroying wheat crops. The Australian government deployed Royal Australian Artillery soldiers armed with Lewis machine guns and 10,000 rounds. The emus scattered in evasive guerilla tactics; the army withdrew in defeat.",
    "image": "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80",
    "source": "Australian War Memorial"
  },
  {
    "id": "hi-007",
    "category": "history",
    "title": "Oxford University is older than the entire Aztec Empire",
    "body": "Teaching at the University of Oxford existed in embryonic form by 1096 AD and was formally established by 1167 AD. The Aztec civilization was founded when Tenochtitlan was constructed in 1325 AD. Oxford was already operating for over 150 years before the Aztecs rose.",
    "image": "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80",
    "source": "University of Oxford Historical Annals"
  },
  {
    "id": "hi-008",
    "category": "history",
    "title": "The London Beer Flood of 1814 sent a 1.4-million-liter tsunami through the city",
    "body": "At Meux & Co's Horse Shoe Brewery on Tottenham Court Road, a massive wooden vat holding 610,000 liters of fermenting porter burst. The chain reaction ruptured adjacent vats, sending a 15-foot tidal wave of beer rushing through the streets, destroying two houses and killing eight people.",
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80",
    "source": "The Times of London (1814)"
  },
  {
    "id": "hi-009",
    "category": "history",
    "title": "Ancient Romans imported Portuguese urine to use as teeth-whitening mouthwash",
    "body": "In ancient Rome, urine was collected from public urinals and taxed by Emperor Vespasian. The natural ammonia present in stale urine broke down stains and whitened teeth. Roman upper classes considered aged urine imported from Lusitania (modern Portugal) to be the highest quality dental wash.",
    "image": "https://images.unsplash.com/photo-1589825743127-2f4e9ed90a68?w=800&q=80",
    "source": "Catullus Poems / Roman Social History"
  },
  {
    "id": "hi-010",
    "category": "history",
    "title": "Thomas Jefferson and John Adams both died on the exact same day: July 4, 1826",
    "body": "Founding fathers and political rivals John Adams and Thomas Jefferson both passed away on July 4, 1826 \u2014 the exact 50th anniversary of the signing of the US Declaration of Independence. Adams' famous last words were 'Thomas Jefferson survives', unaware Jefferson had died 5 hours prior.",
    "image": "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80",
    "source": "National Archives of the United States"
  },
  {
    "id": "hi-011",
    "category": "history",
    "title": "Woolly mammoths were still roaming Wrangel Island while the Pyramids were being built",
    "body": "While mainland mammoths vanished during the Pleistocene extinction, an isolated population of woolly mammoths survived on Siberian Wrangel Island until 1650 BC. This means mammoths lived alongside ancient Egyptians for a millennium after Pharaoh Djoser built the step pyramids.",
    "image": "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80",
    "source": "Nature / Quaternary Science Reviews"
  },
  {
    "id": "hi-012",
    "category": "history",
    "title": "The Boston Molasses Disaster of 1919 killed 21 people with a 56 km/h sugary tidal wave",
    "body": "On January 15, 1919, a steel tank in Boston containing 8.7 million liters of fermented molasses burst open. A 25-foot wave of dense, sticky syrup rushed through the streets at 56 km/h, sweeping freight train cars off tracks and smothering victims. Locals claimed Boston smelled of molasses on hot days for decades.",
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80",
    "source": "Boston Historical Society"
  },
  {
    "id": "hi-013",
    "category": "history",
    "title": "King Tutankhamun's burial dagger was forged from a meteorite from outer space",
    "body": "When Howard Carter unsealed Tutankhamun's tomb in 1922, he found an iron dagger wrapped in the pharaoh's mummy. In 2016, X-ray fluorescence spectrometry confirmed the blade contains 10% nickel and 0.6% cobalt \u2014 an unmistakable signature of iron-octahedrite meteorites.",
    "image": "https://images.unsplash.com/photo-1589825743127-2f4e9ed90a68?w=800&q=80",
    "source": "Meteoritics & Planetary Science"
  },
  {
    "id": "hi-014",
    "category": "history",
    "title": "The Year Without a Summer (1816) froze crops in July and inspired Frankenstein",
    "body": "In April 1815, Mount Tambora in Indonesia erupted in the largest volcanic explosion in recorded history. The sulfur aerosol cloud blocked solar radiation globally, causing snowstorms in New England in June 1816. Trapped indoors in Switzerland by relentless rain, Mary Shelley wrote Frankenstein.",
    "image": "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80",
    "source": "NOAA Climate Records"
  },
  {
    "id": "hi-015",
    "category": "history",
    "title": "Centralia, Pennsylvania: A subterranean coal mine fire burning underground since 1962",
    "body": "In May 1962, an intentional landfill burn in Centralia accidentally ignited an exposed vein of anthracite coal underground. The fire spread through hundreds of miles of abandoned mining shafts. Carbon monoxide and sulfur smoke still vent through road fissures, projected to burn for another 250 years.",
    "image": "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80",
    "source": "US Geological Survey"
  },
  {
    "id": "hu-001",
    "category": "human",
    "title": "The human brain has zero pain receptors",
    "body": "While the brain interprets all pain signals sent from nerves throughout the body, the brain tissue itself has no nociceptors (pain receptors). Because of this, neurosurgeons routinely perform brain surgery while patients remain awake, talking, and playing musical instruments to test motor functions.",
    "image": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    "source": "Johns Hopkins Medicine"
  },
  {
    "id": "hu-002",
    "category": "human",
    "title": "Your brain hallucinates visual continuity to cover up an eye blind spot",
    "body": "Every human eye has a significant blind spot where the optic nerve leaves the retina, leaving no photoreceptor cells. Your brain continuously guesses what belongs there based on surrounding patterns, fabricating imaginary color and texture so seamless that you never notice the missing hole.",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    "source": "Vision Research"
  },
  {
    "id": "hu-003",
    "category": "human",
    "title": "Fatal Familial Insomnia: A genetic disease where sleep vanishes permanently",
    "body": "FFI is an ultra-rare prion mutation that attacks the thalamus. Beginning with worsening insomnia, patients progressively lose all ability to enter sleep. Deprived of sleep architecture, severe hallucinations, dementia, and physical breakdown occur over months until total coma and death.",
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    "source": "New England Journal of Medicine"
  },
  {
    "id": "hu-004",
    "category": "human",
    "title": "Your stomach produces a completely new lining every 3 to 4 days",
    "body": "Hydrochloric acid in the human stomach has a pH of 1.5 to 2.0 \u2014 caustic enough to dissolve zinc metal and strip industrial paint. To prevent the stomach from digesting itself, specialized epithelial cells produce a protective bicarbonate mucus that is fully shed and replaced every few days.",
    "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    "source": "Gastroenterology Journal"
  },
  {
    "id": "hu-005",
    "category": "human",
    "title": "The human eye can detect a single photon of light in pitch black conditions",
    "body": "In 2016, quantum optics experiments proved that dark-adapted human rod photoreceptors can register and transmit the arrival of a single photon of light to the brain with statistical confidence above pure chance, pushing biological sensitivity to the quantum physical limit.",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    "source": "Nature Communications"
  },
  {
    "id": "hu-006",
    "category": "human",
    "title": "Capgras Delusion: The neurological conviction that loved ones are impostors",
    "body": "Capgras syndrome occurs when the emotional recognition pathway between the fusiform face area and the amygdala is severed. The patient sees their spouse's face and recognizes it perfectly, but feels zero autonomic emotional familiarity, concluding the spouse has been replaced by a clone.",
    "image": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    "source": "Cognitive Neuropsychiatry"
  },
  {
    "id": "hu-007",
    "category": "human",
    "title": "Human bodies emit faint visible light (bioluminescence) that is invisible to our eyes",
    "body": "Japanese researchers using ultra-sensitive cryogenic CCD cameras discovered that living human bodies emit visible light photons. The luminescence follows a circadian rhythm, peaking in late afternoon around the face and neck, generated by free-radical biochemical reactions.",
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    "source": "PLOS ONE"
  },
  {
    "id": "hu-008",
    "category": "human",
    "title": "Synesthesia causes people to taste spoken words or see colored calendar loops",
    "body": "In people with synesthesia, cross-activation between sensory cortices links normally segregated modalities. Lexical-gustatory synesthetes taste specific flavors on their tongue when hearing names, while chromesthesia causes individuals to see involuntary colored ribbons when listening to music.",
    "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    "source": "Brain: A Journal of Neurology"
  },
  {
    "id": "hu-009",
    "category": "human",
    "title": "Blindsight: Cortically blind people can accurately avoid obstacles they cannot see",
    "body": "Patients with damage to primary visual cortex (V1) are consciously blind. Yet if asked to navigate a hallway strewn with chairs, they navigate past them without bumping into anything. Subconscious visual signals routed through the superior colliculus guide motor action without conscious sight.",
    "image": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    "source": "Nature Neuroscience"
  },
  {
    "id": "hu-010",
    "category": "human",
    "title": "Your bones are completely dismantled and rebuilt from scratch every 10 years",
    "body": "Bone is a dynamic living tissue. Specialized cells called osteoclasts constantly dissolve microscopic micro-fractured mineral deposits, while osteoblasts lay down fresh collagen and hydroxyapatite. Roughly 10% of your skeleton is replaced annually, renewing your entire body frame every decade.",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    "source": "Endocrine Reviews"
  },
  {
    "id": "hu-011",
    "category": "human",
    "title": "Phantom Limb pain can be cured using optical trickery in a cardboard mirror box",
    "body": "Amputees often experience agonizing chronic cramps in limbs that no longer exist because the brain sends motor commands but receives no visual confirmation. Neurologist V.S. Ramachandran proved placing the intact hand in a mirror box tricks the brain into visually seeing the clenched fist relax.",
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    "source": "The Lancet"
  },
  {
    "id": "hu-012",
    "category": "human",
    "title": "The human cornea is the only living body tissue that contains zero blood vessels",
    "body": "To remain completely transparent to passing light waves, the cornea receives zero blood supply. Instead, it absorbs atmospheric oxygen directly through tears and obtains glucose and nutrients from the aqueous humor fluid circulating inside the anterior chamber of the eye.",
    "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    "source": "Investigative Ophthalmology"
  },
  {
    "id": "hu-013",
    "category": "human",
    "title": "Foreign Accent Syndrome: Waking up from brain trauma speaking in an unknown dialect",
    "body": "Following small strokes or head trauma affecting speech motor centers in the left hemisphere, patients can wake up speaking their native language with an authentic foreign accent. The injury alters pitch, syllable timing, and vowel tongue placement without changing grammar.",
    "image": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    "source": "Journal of Neurolinguistics"
  },
  {
    "id": "hu-014",
    "category": "human",
    "title": "Your body contains enough iron to forge a 7.5-centimeter metal nail",
    "body": "An average adult human body contains approximately 3.5 to 4 grams of elemental iron. Almost 70% of it resides inside hemoglobin proteins within red blood cells, binding oxygen molecules. Melted down, it would produce a small, solid steel nail.",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    "source": "Human Physiology Reference"
  },
  {
    "id": "hu-015",
    "category": "human",
    "title": "Cotard's Syndrome: The waking belief that you are already deceased or have no organs",
    "body": "Also known as 'Walking Corpse Syndrome', this psychiatric condition causes patients to genuinely believe they have died, that their internal organs have rotted away, or that they do not exist. It involves total emotional detachment combined with severe sensory depersonalization.",
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    "source": "American Journal of Psychiatry"
  },
  {
    "id": "ea-001",
    "category": "earth",
    "title": "The Kola Superdeep Borehole drilled 12.2 km until rock turned to plastic",
    "body": "Soviet geologists spent 24 years drilling the Kola Superdeep Borehole. At 12,262 meters, temperatures reached 180\u00b0C instead of expected 100\u00b0C, and rocks became malleable like warm plastic, flowing back into the drill hole like putty. Drilling ceased and the hole remains sealed with a bolted metal cap.",
    "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    "source": "Scientific American"
  },
  {
    "id": "ea-002",
    "category": "earth",
    "title": "Lake Natron's caustic waters turn dead birds into calcified stone",
    "body": "Lake Natron in northern Tanzania has water temperatures reaching 60\u00b0C and a pH as alkaline as 10.5 due to massive sodium carbonate and natron deposits from surrounding volcanoes. Animals that perish in the water become mummified and calcified into intact, eerie stone-like statues.",
    "image": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&q=80",
    "source": "New Scientist / Nick Brandt"
  },
  {
    "id": "ea-003",
    "category": "earth",
    "title": "The 'Door to Hell' crater has burned continuously for over 50 years",
    "body": "In 1971, Soviet engineers in the Karakum Desert of Turkmenistan accidentally drilled into a subterranean natural gas pocket, collapsing the drilling rig into a 70-meter wide crater. Fearing poisonous methane emissions, they tossed a flare inside expecting it to burn out in weeks. It has raged uninterrupted ever since.",
    "image": "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800&q=80",
    "source": "National Geographic"
  },
  {
    "id": "ea-004",
    "category": "earth",
    "title": "Point Nemo is so isolated that astronauts in space are the nearest humans",
    "body": "Point Nemo in the South Pacific is the Oceanic Pole of Inaccessibility, located 2,688 km from the nearest speck of land (Ducie Island). When the International Space Station passes overhead at 400 km altitude, the astronauts aboard are six times closer to Point Nemo than any person on Earth.",
    "image": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    "source": "National Ocean Service"
  },
  {
    "id": "ea-005",
    "category": "earth",
    "title": "Kawah Ijen volcano in Indonesia erupts electric neon-blue sulfuric flames",
    "body": "In eastern Java, the Kawah Ijen volcano discharges immense quantities of high-pressure sulfuric gas at temperatures up to 600\u00b0C. When exposed to air, the liquid sulfur ignites into brilliant electric-blue flames streaming down the rocky caldera walls like glowing neon lava.",
    "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    "source": "Smithsonian Global Volcanism"
  },
  {
    "id": "ea-006",
    "category": "earth",
    "title": "Lake Nyos limnic eruption suffocated 1,746 people overnight with silent CO2 gas",
    "body": "On August 21, 1986, in northwestern Cameroon, a sudden geological limnic eruption dissolved 1.2 million tons of carbon dioxide out of deep lake waters. The invisible gas cloud, heavier than air, poured down into surrounding valleys at 100 km/h, asphyxiating 1,746 people and 3,500 livestock in their sleep.",
    "image": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&q=80",
    "source": "USGS Volcanic Hazards"
  },
  {
    "id": "ea-007",
    "category": "earth",
    "title": "The Movile Cave in Romania was sealed underground for 5.5 million years",
    "body": "Discovered in 1986, Movile Cave was entirely isolated from sunlight and the outside atmosphere for 5.5 million years. Its air is rich in hydrogen sulfide and methane with barely 7% oxygen. Scientists discovered 33 completely unknown, blind, translucent endemic species thriving on chemosynthetic bacteria.",
    "image": "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800&q=80",
    "source": "Science"
  },
  {
    "id": "ea-008",
    "category": "earth",
    "title": "Antarctica's Blood Falls: Subglacial iron saltwater leaks bright crimson on white ice",
    "body": "Flowing from the tongue of Taylor Glacier, Blood Falls discharges brine five times saltier than seawater that contains zero oxygen. Trapped beneath 400 meters of ice for two million years, the water is rich in ferrous iron; upon touching air, the iron oxidizes instantly into bright blood-red rust.",
    "image": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    "source": "Journal of Glaciology"
  },
  {
    "id": "ea-009",
    "category": "earth",
    "title": "The Catatumbo Lightning strikes Venezuela 280 times an hour for 160 nights a year",
    "body": "Where the Catatumbo River meets Lake Maracaibo in Venezuela, unique wind currents colliding with the Andes mountains generate perpetual thunderstorms. Lightning strikes up to 280 times per hour for 10 hours a night, acting as a natural lighthouse visible 400 km away in the Caribbean.",
    "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    "source": "NASA Global Lightning Data"
  },
  {
    "id": "ea-010",
    "category": "earth",
    "title": "Salar de Uyuni: A 10,000 km\u00b2 salt flat that becomes the world's largest mirror",
    "body": "Located in southwest Bolivia at 3,656 meters elevation, Salar de Uyuni is the world's largest salt flat. After seasonal rainfall, a millimeter-thin film of calm water covers the blinding white salt, creating a flawless 10,582 km\u00b2 reflection of the sky used by satellites to calibrate orbital sensors.",
    "image": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&q=80",
    "source": "Geophysical Research Letters"
  },
  {
    "id": "ea-011",
    "category": "earth",
    "title": "The Richat Structure (Eye of the Sahara): A 40-km cosmic-looking concentric geological dome",
    "body": "In the Mauritanian desert lies a giant circular geological dome spanning 40 kilometers across. Once believed to be a meteorite impact crater, it is now known to be an eroded symmetrical geological uplift exposing resistant paleoproterozoic quartzite layers resembling a giant blue iris from orbit.",
    "image": "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800&q=80",
    "source": "NASA Earth Observatory"
  },
  {
    "id": "ea-012",
    "category": "earth",
    "title": "The Danakil Depression in Ethiopia features boiling acid ponds at pH 0 and 50\u00b0C",
    "body": "Situated 125 meters below sea level at the junction of three tectonic plates, the Danakil Depression is one of the hottest, most hostile environments on Earth. Geothermal water heated by magma dissolves sulfur and chlorine, forming neon-green bubbling pools of boiling pure acid.",
    "image": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    "source": "Nature Scientific Reports"
  },
  {
    "id": "ea-013",
    "category": "earth",
    "title": "Mount Roraima: A 2-billion-year-old plateau isolated by sheer 400-meter vertical cliffs",
    "body": "Straddling Venezuela, Brazil, and Guyana, Mount Roraima is a massive Precambrian sandstone tepui tabletop mountain dating back 2 billion years. Its summit is perpetually engulfed in clouds and heavy rain, creating unique carnivorous plants and black pebble toads found nowhere else on Earth.",
    "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    "source": "Geomorphology Journal"
  },
  {
    "id": "ea-014",
    "category": "earth",
    "title": "The Zone of Silence in Mexico: A desert basin where radio waves mysteriously degrade",
    "body": "Located within the Mapim\u00ed Biosphere Reserve in Durango, Mexico, this barren desert basin gained global notoriety in 1970 when an Athena rocket crashed there. Unique magnetite and subterranean uranium deposits distort localized electromagnetic signals, compass needles, and high-frequency radio transmissions.",
    "image": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&q=80",
    "source": "Mexican Geological Institute"
  },
  {
    "id": "ea-015",
    "category": "earth",
    "title": "Derweze Gas Crater has burned for 50 years with zero sign of fuel depletion",
    "body": "Spanning 70 meters in diameter and 30 meters deep in the Karakum Desert, the fiery Derweze crater burns thousands of cubic meters of natural gas daily. Despite several presidential decrees in Turkmenistan attempting to extinguish it, the subterranean gas pressures continue feeding the inferno.",
    "image": "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800&q=80",
    "source": "National Geographic Expeditions"
  },
  {
    "id": "te-001",
    "category": "tech",
    "title": "Voyager 1 is 24 billion km away running on just 69 KB of memory",
    "body": "Launched in 1977, Voyager 1 is the farthest human-made object in history, cruising through interstellar space. Its entire flight computer operates with 69.63 kilobytes of memory \u2014 less than the size of a single digital thumbnail icon \u2014 powered by decaying plutonium pellets.",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "source": "NASA Jet Propulsion Laboratory"
  },
  {
    "id": "te-002",
    "category": "tech",
    "title": "The legendary 500-mile email glitch in campus Unix systems",
    "body": "System administrator Trey Darley received a genuine ticket from a statistics department chairman: 'We cannot send emails more than 500 miles away.' Investigation revealed an upgraded operating system reset the sendmail timeout to zero, allowing TCP handshakes to complete only within a speed-of-light travel radius of roughly 520 miles.",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "source": "Usenet Archive / ibiblio"
  },
  {
    "id": "te-003",
    "category": "tech",
    "title": "The first computer bug was an actual trapped moth",
    "body": "In September 1947, computer pioneer Grace Hopper's team at Harvard University encountered an error on the electromechanical Mark II computer. Upon opening Relay #70 in Panel F, they found a live moth trapped between the contacts. They taped it into their logbook with the entry: 'First actual case of bug being found.'",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    "source": "Smithsonian National Museum"
  },
  {
    "id": "te-004",
    "category": "tech",
    "title": "Nuclear launch silos used 8-inch floppy disks until 2019",
    "body": "Until October 2019, the United States Strategic Automated Command and Control System (SACCS), which coordinates nuclear bombers and intercontinental ballistic missiles (ICBMs), ran on 1970s IBM Series/1 computers utilizing large 8-inch magnetic floppy disks because their non-networked antiquity made them un-hackable.",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "source": "US Air Force / Defense One"
  },
  {
    "id": "te-005",
    "category": "tech",
    "title": "The total electrical energy stored on the entire Internet weighs about 50 grams",
    "body": "All digital data stored on global web servers is represented by electrons held in transistor memory cells. Physicist Russell Seitz calculated that the total electric charge representing all stored Internet information across the globe amounts to approximately 50 grams of mass (E=mc\u00b2) \u2014 roughly the weight of a strawberry.",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "source": "Discovery Magazine / Physics Today"
  },
  {
    "id": "te-006",
    "category": "tech",
    "title": "The Apollo Guidance Computer had less processing power than a musical greeting card",
    "body": "The 1969 Apollo Guidance Computer that landed Neil Armstrong on the Moon ran at a clock speed of 2.048 MHz with 2,048 words of RAM (approx 4 KB). Modern disposable musical birthday cards that play 'Happy Birthday' contain microcontrollers dozens of times faster with more storage.",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "source": "MIT Instrumentation Laboratory"
  },
  {
    "id": "te-007",
    "category": "tech",
    "title": "The Morris Worm of 1988: A student crashed 10% of the entire Internet in 24 hours",
    "body": "On November 2, 1988, Cornell graduate student Robert Tappan Morris released the first self-replicating Internet worm to gauge the size of ARPANET. Due to a coding error in its replication check, the worm infected machines repeatedly, crashing an estimated 6,000 of the 60,000 networked computers worldwide.",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    "source": "FBI Cyber Division History"
  },
  {
    "id": "te-008",
    "category": "tech",
    "title": "Quake III's Fast Inverse Square Root: The genius 0x5f3759df mathematical hack",
    "body": "In 1999, John Carmack's Quake III engine implemented 1/sqrt(x) at four times the speed of CPU floating-point hardware using a mysterious bitwise integer subtraction hack: 'i = 0x5f3759df - ( i >> 1 );'. The exact derivation of this mathematical constant baffled computer scientists for years.",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "source": "IEEE Micro"
  },
  {
    "id": "te-009",
    "category": "tech",
    "title": "Stuxnet destroyed Iranian nuclear centrifuges by silently altering spin frequencies",
    "body": "Discovered in 2010, the Stuxnet worm infected Siemens industrial programmable logic controllers (PLCs) at the Natanz uranium enrichment facility. It sped up centrifuges to 1,410 Hz then slowed them to 2 Hz while replaying normal telemetry to control screens, physically tearing 1,000 centrifuges apart without alarms.",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "source": "Symantec Security Response"
  },
  {
    "id": "te-010",
    "category": "tech",
    "title": "The first commercial hard drive in 1956 weighed over 1 ton and stored 5 MB",
    "body": "Introduced with the IBM 305 RAMAC system in September 1956, the world's first magnetic hard drive consisted of 50 aluminum disks spinning on a motorized spindle. It weighed over 1,000 kilograms (2,200 lbs) and was leased to corporations for $3,200 per month to store five megabytes of data.",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "source": "IBM Archives"
  },
  {
    "id": "te-011",
    "category": "tech",
    "title": "GPS satellites must adjust their atomic clocks by 38 microseconds daily due to Einstein's relativity",
    "body": "GPS satellites orbit at 14,000 km/h (slowing their clocks by 7 microseconds per day due to special relativity) and sit 20,000 km above Earth's gravity well (speeding their clocks by 45 microseconds due to general relativity). Uncorrected, GPS navigation positions would drift by 11 kilometers every single day.",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    "source": "Living Reviews in Relativity"
  },
  {
    "id": "te-012",
    "category": "tech",
    "title": "Deep Blue's move 44 bug that confused World Chess Champion Garry Kasparov",
    "body": "In Game 1 of the 1997 match between IBM's Deep Blue and Garry Kasparov, the computer suffered a software glitch on move 44: unable to resolve an optimal move within timeout, it selected a completely random fallback move. Kasparov assumed it was superior strategic foresight, became paranoid, and resigned Game 2.",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "source": "Kingpin Chess Magazine"
  },
  {
    "id": "te-013",
    "category": "tech",
    "title": "Apollo 11's guidance code contained a routine called 'BURN_BABY_BURN--MASTER_IGNITION'",
    "body": "The original assembly source code written by Margaret Hamilton's software team at MIT for Apollo 11 was declassified and published on GitHub. The code for the lunar descent engine includes the line 'BURN_BABY_BURN--MASTER_IGNITION_ROUTINE', paying homage to 1960s radio DJ Magnificent Montague.",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "source": "MIT Instrumentation Lab / GitHub"
  },
  {
    "id": "te-014",
    "category": "tech",
    "title": "Modern 3-nanometer semiconductor transistors are narrower than a single DNA helix",
    "body": "Leading-edge computer microchips contain over 150 million transistors per square millimeter. The gate width of a 3-nanometer class transistor is roughly 3 nanometers across \u2014 narrower than human DNA (2.5 nm) and spanning barely a dozen silicon atoms in width.",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "source": "TSMC / IEEE Spectrum"
  },
  {
    "id": "te-015",
    "category": "tech",
    "title": "A rogue solar storm in 1972 detonated dozens of US naval sea mines in Vietnam",
    "body": "In August 1972, a series of extreme solar flares triggered a geomagnetic storm on Earth. The magnetic fluctuations induced electrical voltages in the ocean water so severe that dozens of US magnetic-influence sea mines planted off the coast of Hon La spontaneously detonated simultaneously.",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    "source": "Space Weather Journal"
  },
  {
    "id": "pa-001",
    "category": "paradox",
    "title": "The Monty Hall paradox: Switching doors mathematically doubles your win rate",
    "body": "In a game with 3 doors (1 sports car, 2 goats), you pick Door 1. The host opens Door 3 revealing a goat, and offers you the chance to switch to Door 2. Most people believe the odds are 50/50. In fact, switching gives you a 2/3 (66.7%) chance of winning, while staying keeps your initial 1/3 odds.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "The American Statistician"
  },
  {
    "id": "pa-002",
    "category": "paradox",
    "title": "Gabriel's Horn: Finite volume of paint, but infinite surface area",
    "body": "Gabriel's Horn (formed by rotating y = 1/x for x \u2265 1 around the x-axis) has a mathematically proven finite volume of exactly \u03c0 cubic units, but an infinite surface area. You could completely fill the horn with a can of paint, but you could never paint the outside surface.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Calculus / Evangelista Torricelli (1641)"
  },
  {
    "id": "pa-003",
    "category": "paradox",
    "title": "In a room of 23 people, there is a 50% chance two share a birthday",
    "body": "Known as the Birthday Paradox, it feels counterintuitive because people think of someone matching their own birthday. But with 23 people, there are 253 unique pairs of individuals being compared. With 70 people in a room, the probability of a shared birthday exceeds 99.9%.",
    "image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    "source": "Probability Theory"
  },
  {
    "id": "pa-004",
    "category": "paradox",
    "title": "The Banach-Tarski Theorem: Dissect one sphere into two identical spheres",
    "body": "Using the mathematical Axiom of Choice, a solid three-dimensional ball can be broken down into just five non-measurable pieces and reassembled using only rigid rotations and translations into two identical solid balls, each the exact same size as the original.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Fundamenta Mathematicae"
  },
  {
    "id": "pa-005",
    "category": "paradox",
    "title": "0.999... repeating infinitely is mathematically identical to 1",
    "body": "0.999... is not 'infinitesimally close to 1'; it is mathematically equal to 1. Proof: Let x = 0.999... then 10x = 9.999... Subtracting x leaves 9x = 9, meaning x = 1. In real analysis, there is zero real number that exists between 0.999... and 1.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Real Analysis Fundamentals"
  },
  {
    "id": "pa-006",
    "category": "paradox",
    "title": "The Coastline Paradox: Coastline length has no fixed measurement and approaches infinity",
    "body": "The measured length of a coastline depends entirely on the scale of the measuring ruler. Using a 100 km ruler skips bays; using a 1-meter ruler measures every boulder; using a millimeter ruler measures every grain of sand. As ruler size approaches zero, perimeter approaches infinity.",
    "image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    "source": "Science / Benoit Mandelbrot"
  },
  {
    "id": "pa-007",
    "category": "paradox",
    "title": "Russell's Paradox: The barber who shaves everyone who does not shave themselves",
    "body": "Consider a town barber who shaves all men, and only those men, who do not shave themselves. Does the barber shave himself? If he does, he must not; if he does not, he must. Formulated by Bertrand Russell in 1901, it proved naive set theory had fundamental contradictions.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Mathematical Logic Principles"
  },
  {
    "id": "pa-008",
    "category": "paradox",
    "title": "Simpson's Paradox: A trend appears in distinct groups but completely reverses when combined",
    "body": "In statistical analysis, Simpson's Paradox occurs when a statistical trend observed in multiple separate subgroups disappears or completely reverses when the subgroups are combined into a whole, caused by lurking confounding variables and unequal group sizes.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Journal of the Royal Statistical Society"
  },
  {
    "id": "pa-009",
    "category": "paradox",
    "title": "Hilbert's Grand Hotel: A full hotel that can always accommodate infinite new guests",
    "body": "Mathematician David Hilbert imagined a hotel with countably infinite rooms, all occupied. When a new guest arrives, the manager shifts guest 1 to room 2, guest 2 to room 3, and guest n to room n+1, freeing room 1. Even if infinitely many new guests arrive, room 2n frees infinite odd rooms.",
    "image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    "source": "Infinity Mathematics"
  },
  {
    "id": "pa-010",
    "category": "paradox",
    "title": "Benford's Law: The number 1 appears as the first digit 30% of the time in nature",
    "body": "In naturally occurring numerical datasets \u2014 from stock prices and river lengths to population counts and tax returns \u2014 the number 1 appears as the leading first digit approximately 30.1% of the time, while 9 appears barely 4.6% of the time. Forensic accountants use this to catch tax fraud.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Proceedings of the American Philosophical Society"
  },
  {
    "id": "pa-011",
    "category": "paradox",
    "title": "The Shannon Number: There are more possible chess games than atoms in the universe",
    "body": "Mathematician Claude Shannon calculated that a conservative lower bound on the game-tree complexity of chess is roughly 10\u00b9\u00b2\u2070 unique possible games. The estimated total number of atoms in the entire observable universe is barely 10\u2078\u2070.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Philosophical Magazine"
  },
  {
    "id": "pa-012",
    "category": "paradox",
    "title": "Zeno's Dichotomy: You can never reach your destination because you must cross half first",
    "body": "To reach a wall 10 meters away, you must first cross half the distance (5m), then half the remaining distance (2.5m), then half again (1.25m), ad infinitum. Because there are infinite sub-tasks to complete, Greek philosopher Zeno argued motion was an illusion before calculus resolved convergent infinite series.",
    "image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    "source": "Greek Philosophy & Calculus"
  },
  {
    "id": "pa-013",
    "category": "paradox",
    "title": "G\u00f6del's Incompleteness Theorem: Mathematics can never prove all true mathematical statements",
    "body": "In 1931, logician Kurt G\u00f6del proved that in any consistent axiomatic mathematical system capable of basic arithmetic, there are always true mathematical statements that cannot be proven from within the system itself. Mathematics can never be both complete and consistent.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Monatshefte f\u00fcr Mathematik"
  },
  {
    "id": "pa-014",
    "category": "paradox",
    "title": "Graham's Number is so enormous your brain would collapse into a black hole storing it",
    "body": "Graham's number was long the largest specific number ever used in a serious mathematical proof (Ramsey theory). It is so large that if every digit were printed on a single Planck volume, the observable universe would run out of space, and holding the digits in human memory would exceed maximum entropy.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Guinness World Records"
  },
  {
    "id": "na-001",
    "category": "nature",
    "title": "The Gympie-Gympie suicide tree's sting causes agony lasting years",
    "body": "Dendrocnide moroides in Australian rainforests is blanketed in microscopic hollow silica hypodermic needles. Brushing against it injects moroidin, an ultra-stable peptide neurotoxin. Victims describe the pain as 'being electrocuted and burned with acid simultaneously', with agony recurring for up to two years.",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    "source": "Australian Geographic"
  },
  {
    "id": "na-002",
    "category": "nature",
    "title": "Cordyceps fungi hijack ant brains and puppeteer them to their deaths",
    "body": "Ophiocordyceps unilateralis spores penetrate a carpenter ant's exoskeleton and grow mycelium directly into its muscle fibers. The fungus manipulates the ant's nervous system, forcing it to climb exactly 25 cm up a north-facing branch, bite the underside of a leaf with a death grip, and die as the mushroom erupts through its head.",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
    "source": "BMC Ecology"
  },
  {
    "id": "na-003",
    "category": "nature",
    "title": "A single average cumulus cloud weighs approximately 500,000 kilograms",
    "body": "That fluffy white cloud floating over your head weighs around 500 metric tons (1.1 million pounds) \u2014 equivalent to 100 adult elephants or a fully loaded Boeing 747. It stays aloft because the weight is distributed across billions of microscopic water droplets sustained by warm atmospheric updrafts.",
    "image": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
    "source": "NCAR"
  },
  {
    "id": "na-004",
    "category": "nature",
    "title": "Honey sealed in Egyptian pharaoh tombs is still edible after 3,000 years",
    "body": "Archaeologists excavating ancient Egyptian tombs found jars of honey over 3,000 years old that remained pristine and perfectly edible. Honey's natural lack of moisture, high acidity (pH 3.9), and the presence of hydrogen peroxide from bee stomach enzymes prevent any bacteria or fungi from growing.",
    "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    "source": "Smithsonian Magazine"
  },
  {
    "id": "na-005",
    "category": "nature",
    "title": "The Manchineel Tree: Standing beneath it during rain causes chemical acid blisters",
    "body": "Native to Florida and the Caribbean, Hippomane mancinella is the world's most poisonous tree. Every part produces phorbol esters. If you stand beneath it during rain, water dripping from the leaves causes severe chemical skin blisters, and burning its wood produces smoke that permanently blinds human eyes.",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    "source": "Guinness World Records"
  },
  {
    "id": "na-006",
    "category": "nature",
    "title": "Pando: An 80,000-year-old forest in Utah that is actually a single organism",
    "body": "Pando is a massive grove of quaking aspen trees in Fishlake National Forest, Utah. Spanning 106 acres, all 40,000 trees share a single interconnected subterranean root system and identical genetic code. Weighing 6,000 metric tons, it is the heaviest known living organism on Earth.",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
    "source": "US Forest Service"
  },
  {
    "id": "na-007",
    "category": "nature",
    "title": "Venus Flytraps count hair touches to avoid closing on falling raindrops",
    "body": "A Venus flytrap trap leaf has sensitive trigger hairs. It closes only if an insect touches two different hairs within 20 seconds. Once trapped, the plant requires three additional hair touches to trigger the release of digestive enzymes, ensuring it never wastes energy on inanimate debris.",
    "image": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
    "source": "Current Biology"
  },
  {
    "id": "na-008",
    "category": "nature",
    "title": "Giant Hogweed sap makes human skin permanently unable to protect itself from sunlight",
    "body": "Heracleum mantegazzianum contains furanocoumarins. Brushing against the plant deposits clear sap onto skin that destroys skin cells' ability to protect against UV radiation (phytophotodermatitis). Exposure to sunlight causes third-degree chemical burns, recurring for years.",
    "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    "source": "New York Department of Environmental Conservation"
  },
  {
    "id": "na-009",
    "category": "nature",
    "title": "Methuselah: A California bristlecone pine tree that sprouted 4,850 years ago",
    "body": "Growing in the White Mountains of eastern California, the Methuselah pine is 4,855 years old \u2014 having germinated around 2832 BC, before construction began on the Great Pyramid of Giza. Its exact location is kept an official secret by the US Forest Service to protect it from vandalism.",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    "source": "US Forest Service"
  },
  {
    "id": "na-010",
    "category": "nature",
    "title": "Rafflesia arnoldii produces the world's largest flower that smells like rotting meat",
    "body": "Found in Indonesian rainforests, Rafflesia arnoldii blooms into a monstrous flower measuring 1 meter in diameter and weighing up to 10 kilograms. It has no roots, stems, or leaves, living as a parasite inside subterranean vines until it blooms, emitting a stench of decomposing flesh to attract carrion flies.",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
    "source": "Royal Botanic Gardens Kew"
  },
  {
    "id": "na-011",
    "category": "nature",
    "title": "Acacia trees release airborne ethylene gas to warn neighboring trees when giraffes feed",
    "body": "When an African giraffe begins eating acacia leaves, the damaged foliage releases volatile ethylene gas into the air. Downwind acacia trees detect the gas within minutes and pump bitter, toxic tannins into their leaves, forcing the giraffe to travel 100 meters upwind before browsing again.",
    "image": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
    "source": "Chemical Ecology"
  },
  {
    "id": "na-012",
    "category": "nature",
    "title": "Eucalyptus trees produce flammable volatile oils specifically to fuel destructive forest fires",
    "body": "Eucalyptus trees are pyrophytes: their fallen bark and leaves contain volatile flammable cineole oils. The trees encourage explosive wildfires that incinerate surrounding plant competitors; the eucalyptus itself possesses fire-insulated epicormic buds under thick bark that sprout immediately after the blaze.",
    "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    "source": "Australian Forestry"
  },
  {
    "id": "my-001",
    "category": "mysteries",
    "title": "The 1977 'Wow! Signal' from deep space has never been explained",
    "body": "On August 15, 1977, Ohio State's Big Ear radio telescope detected a powerful, narrowband radio signal at 1420.456 MHz (the hydrogen line) lasting 72 seconds from the constellation Sagittarius. Astronomer Jerry Ehman circled the data reading '6EQUJ5' and scribbled 'Wow!'. Despite decades of searching, it has never repeated.",
    "image": "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&q=80",
    "source": "SETI Institute"
  },
  {
    "id": "my-002",
    "category": "mysteries",
    "title": "Dark Matter & Dark Energy comprise 95% of everything in the universe",
    "body": "Everything humans have ever observed \u2014 all stars, planets, nebulae, atoms, elements, and black holes \u2014 constitutes barely 5% of the cosmos. Approximately 27% is mysterious dark matter that holds galaxies together, and 68% is dark energy accelerating the expansion of spacetime.",
    "image": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    "source": "ESA / Planck Collaboration"
  },
  {
    "id": "my-003",
    "category": "mysteries",
    "title": "The Antikythera Mechanism: A 2,100-year-old analog computer with 30 gears",
    "body": "Discovered in a shipwreck off Greece in 1901, this ancient bronze device dates to 150 BC. Its intricate arrangement of over 30 precision interlocking gearwheels calculated the astronomical cycles of the Sun, Moon, and 5 known planets, including eclipses. Mechanical complexity of this level vanished until 14th-century cathedral clocks.",
    "image": "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&q=80",
    "source": "Nature / Antikythera Research Project"
  },
  {
    "id": "my-004",
    "category": "mysteries",
    "title": "Roman concrete heals its own cracks using saltwater chemistry",
    "body": "While modern concrete degrades in ocean water within 50 years, 2,000-year-old Roman piers and breakwaters are stronger today than when built. Scientists discovered Romans mixed volcanic ash and quicklime; seawater dissolves the lime and triggers the growth of interlocking plazolite crystals that seal fractures as they form.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Science Advances"
  },
  {
    "id": "my-005",
    "category": "mysteries",
    "title": "The Tunguska Event flattened 80 million trees across 2,150 km\u00b2 without leaving a crater",
    "body": "On June 30, 1908, a titanic explosion detonated over the Podkamennaya Tunguska river in remote Siberia with the energy of 12 megatons of TNT (800 times Hiroshima). It flattened 80 million pine trees radially outward across 2,150 square kilometers, yet expeditions found zero impact crater \u2014 likely a stony meteoroid airburst.",
    "image": "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&q=80",
    "source": "Russian Academy of Sciences"
  },
  {
    "id": "my-006",
    "category": "mysteries",
    "title": "The Voynich Manuscript: A 240-page 15th-century book written in an undeciphered language",
    "body": "Carbon-dated to the early 1400s, the Voynich manuscript is filled with hundreds of detailed illustrations of unknown plants, cosmological charts, and bathing nymphs, written in a completely undeciphered script. Cryptographers, including British codebreakers from Bletchley Park, have failed to decode a single sentence.",
    "image": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    "source": "Yale Beinecke Rare Book Library"
  },
  {
    "id": "my-007",
    "category": "mysteries",
    "title": "The Fermi Paradox: With billions of habitable stars, why is the universe completely silent?",
    "body": "Physicist Enrico Fermi famously calculated: With our galaxy containing roughly 100 billion stars and billions of rocky planets in habitable zones, an intelligent civilization with sub-light propulsion could colonize the entire Milky Way in 10 million years. Yet SETI sky scans find total cosmic silence.",
    "image": "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&q=80",
    "source": "Astrophysical Journal"
  },
  {
    "id": "my-008",
    "category": "mysteries",
    "title": "Ball Lightning: Luminous floating spheres of plasma that pass through closed windows",
    "body": "Documented for centuries by pilots and scientists, ball lightning consists of glowing, spherical plasmoids lasting several seconds, hovering mid-air and emitting sizzling sulfur odors. In several confirmed cases, ball lightning has drifted through glass windows or down aircraft aisles before silently dissipating or exploding.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Physical Review Letters"
  },
  {
    "id": "my-009",
    "category": "mysteries",
    "title": "The Taos Hum: A low-frequency acoustic vibration heard only by 2% of people",
    "body": "Since the early 1990s, residents in Taos, New Mexico have reported hearing a persistent, low-frequency hum resembling an idling diesel engine. University acoustic investigations with sensitive seismic and audio detectors could measure zero environmental sound waves, yet sufferers continue to perceive it indoors.",
    "image": "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&q=80",
    "source": "Acoustical Society of America"
  },
  {
    "id": "my-010",
    "category": "mysteries",
    "title": "G\u00f6bekli Tepe: Monumental 11,500-year-old stone temple built before agriculture or metal tools",
    "body": "Excavated in southeastern Turkey, G\u00f6bekli Tepe features massive 20-ton T-shaped limestone pillars carved with predatory beasts, dating back to 9500 BC. This predates Stonehenge by 6,000 years and was erected by hunter-gatherers before the invention of pottery, the wheel, or settled agriculture.",
    "image": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    "source": "German Archaeological Institute"
  },
  {
    "id": "sp-182",
    "category": "space",
    "title": "Jupiter's moon Europa likely holds twice as much liquid water as Earth",
    "body": "Beneath Europa's 20-km-thick shell of water ice lies a salty ocean up to 100 km deep. Gravitational tidal flexing from Jupiter keeps the water liquid, making Europa the leading candidate for extraterrestrial microbial life in the Solar System.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-183",
    "category": "space",
    "title": "A year on Mercury is shorter than two days on Mercury",
    "body": "Mercury orbits the Sun in 88 Earth days, but rotates on its axis so slowly that one solar day (noon to noon) takes 176 Earth days \u2014 twice as long as its year.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-184",
    "category": "space",
    "title": "The International Space Station travels at 7.66 kilometers every single second",
    "body": "Orbiting at 27,600 km/h, the ISS circles the Earth once every 90 minutes. Astronauts aboard witness 16 sunrises and 16 sunsets every 24 hours.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-185",
    "category": "space",
    "title": "Neutron stars possess magnetic fields a trillion times stronger than Earth's",
    "body": "Magnetars are extreme neutron stars with magnetic fields of 10\u00b9\u00b9 tesla. A magnetar at half the distance to the Moon would wipe every credit card on Earth and dissolve electron orbits in your body atoms.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-186",
    "category": "space",
    "title": "The Hubble Space Telescope has looked back over 13.4 billion years into cosmic history",
    "body": "By capturing faint light that has traveled through space for billions of years, Hubble and James Webb photograph primordial galaxies formed just 300 million years after the Big Bang.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-187",
    "category": "space",
    "title": "Black hole spaghettification stretches matter into a thin spaghetti-like strand",
    "body": "Near a stellar-mass black hole, tidal forces between your feet and head differ so violently that gravity stretches you vertically while compressing you horizontally into a subatomic ribbon of matter.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-188",
    "category": "space",
    "title": "Solar flares release the equivalent energy of millions of 100-megaton hydrogen bombs",
    "body": "Magnetic reconnection in the Sun's corona erupts in solar flares that blast trillions of tons of ionized plasma at 2,000 km/s across interplanetary space.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-189",
    "category": "space",
    "title": "Valles Marineris on Mars is 4,000 km long and dwarfs the Grand Canyon",
    "body": "Spanning nearly a quarter of Mars' equator, the Valles Marineris canyon system is 10 times longer, 20 times wider, and 4 times deeper than Earth's Grand Canyon.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-190",
    "category": "space",
    "title": "The Milky Way galaxy is on a direct collision course with Andromeda",
    "body": "Andromeda and the Milky Way are hurtling toward each other at 110 km/s. In 4.5 billion years, they will merge into a single super-galaxy nicknamed 'Milkomeda'.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-191",
    "category": "space",
    "title": "Exoplanet 55 Cancri e is a super-Earth thought to be made largely of diamond",
    "body": "Twice Earth's size and eight times its mass, 55 Cancri e orbits its star so closely that surface temperatures reach 2,000\u00b0C, compressing carbon-rich minerals into pure crystalline diamond.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "qu-192",
    "category": "quantum",
    "title": "Negative absolute temperatures are actually hotter than infinite temperature",
    "body": "In quantum spin systems with upper energy bounds, inverted populations achieve negative Kelvin temperatures. Thermodynamically, heat always flows from negative temperatures into positive temperatures.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "qu-193",
    "category": "quantum",
    "title": "Positronium is a bizarre atom made with zero protons or neutrons",
    "body": "Composed solely of an electron orbiting its antimatter counterpart (a positron), positronium is an exotic atom with a lifespan of barely 142 nanoseconds before annihilating into gamma rays.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "qu-194",
    "category": "quantum",
    "title": "Liquid Light can flow around obstacles with zero backscatter or viscosity",
    "body": "Polaritons \u2014 hybrid quasiparticles of light photons and electron excitons \u2014 can form room-temperature condensates that behave like frictionless liquid light.",
    "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "qu-195",
    "category": "quantum",
    "title": "Quantum Darwinism explains why we experience an objective classical reality",
    "body": "Quantum systems imprint multiple redundant copies of their states onto the surrounding environment of photons, allowing multiple observers to measure the exact same classical outcome.",
    "image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "qu-196",
    "category": "quantum",
    "title": "Muons generated by cosmic rays reach Earth's surface only because of time dilation",
    "body": "Muons have a laboratory lifespan of just 2.2 microseconds and should decay in the upper atmosphere. Because they move at 99.8% the speed of light, their internal clock slows by a factor of 16.",
    "image": "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "qu-197",
    "category": "quantum",
    "title": "Sound travels at 36 kilometers per second in solid atomic metallic hydrogen",
    "body": "Calculations published in Science Advances proved that the theoretical upper speed limit for acoustic sound waves anywhere in the universe is roughly 36 km/s in ultra-dense solid metallic hydrogen.",
    "image": "https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "qu-198",
    "category": "quantum",
    "title": "Tachyons: Hypothetical particles that always travel faster than light and move backward in time",
    "body": "In theoretical relativistic solutions with imaginary mass, tachyons accelerate as they lose energy and would require infinite energy to slow down to light speed.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "qu-199",
    "category": "quantum",
    "title": "Supercritical carbon dioxide dissolves caffeine from coffee beans with zero toxic residue",
    "body": "Heated above 31\u00b0C and pressurized to 73 atmospheres, CO2 becomes a supercritical fluid that effuses through solids like a gas while dissolving compounds like a liquid.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "cr-200",
    "category": "creatures",
    "title": "Archerfish calculate optical water refraction to snipe insects with water jets",
    "body": "Archerfish shoot water jets up to 2 meters with enough force to knock beetles off overhanging leaves, automatically compensating for Snell's law of light refraction at the water surface.",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "cr-201",
    "category": "creatures",
    "title": "Colossal squids have swivel hooks on their tentacle suction cups",
    "body": "Unlike giant squids whose suckers have serrated teeth, colossal squids possess three-pronged razor claws on swiveling swivels that slice through whale blubber.",
    "image": "https://images.unsplash.com/photo-1559082603-8ad960d1a6fc?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "cr-202",
    "category": "creatures",
    "title": "Bar-headed geese fly over Mount Everest at 9,000 meters altitude",
    "body": "Migrating bar-headed geese cross the highest peaks of the Himalayas, flapping continuously through sub-zero air with barely a third of sea-level oxygen thanks to high-affinity hemoglobin.",
    "image": "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "cr-203",
    "category": "creatures",
    "title": "Chameleons' tongues accelerate from 0 to 100 km/h in 1/100th of a second",
    "body": "Using elastic collagen recoil tissues, a chameleon's tongue launches with 264 times the acceleration of gravity (264g), hitting prey in 20 milliseconds.",
    "image": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "cr-204",
    "category": "creatures",
    "title": "Puffins can hold up to 60 small fish in their serrated beaks at once",
    "body": "Puffins have backward-pointing spines on their palate and tongue that pin caught fish to the roof of their bill while continuing to hunt underwater for more.",
    "image": "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "cr-205",
    "category": "creatures",
    "title": "Vampire bats run on treadmills and gallop like four-legged horses",
    "body": "Unlike other bats that can only crawl awkwardly on the ground, common vampire bats have specialized pectoral muscles allowing them to sprint and hop across terrain at 2 meters per second.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "cr-206",
    "category": "creatures",
    "title": "Barn owls fly in absolute acoustic silence to hunt rodents beneath snow",
    "body": "Barn owl feathers have comb-like serrated leading edges and velvet down that break turbulence into micro-vortices, producing zero decibels of detectable flight noise.",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "oc-207",
    "category": "ocean",
    "title": "The ocean absorbs 90% of excess heat trapped by global greenhouse gases",
    "body": "Due to water's extraordinary specific heat capacity, Earth's oceans have absorbed over 90% of all planetary warming since 1970, buffering atmospheric temperature rises.",
    "image": "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "oc-208",
    "category": "ocean",
    "title": "Megamouth sharks are so elusive they were only discovered in 1976",
    "body": "Growing up to 5.5 meters long, the megamouth shark filter-feeds on krill with a luminous mouth. Because it lives in deep waters, science was completely unaware of its existence until 1976.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "oc-209",
    "category": "ocean",
    "title": "Viperfish have needle teeth so long they must rest outside their mouths",
    "body": "Chauliodus sloani has translucent fangs so long that if closed normally, they would impale its own brain; they fold behind its head inside external grooves.",
    "image": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "oc-210",
    "category": "ocean",
    "title": "Deep-sea trenches trap more carbon than all coastal wetlands combined",
    "body": "Organic debris cascading down ocean trenches is buried under tectonic subduction zones, storing carbon for millions of years in the deep hadal biosphere.",
    "image": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "hi-211",
    "category": "history",
    "title": "The Roman Emperor Caligula once made his favorite racehorse a Roman senator",
    "body": "Roman historian Suetonius recorded that Emperor Caligula gave his stallion Incitatus a marble stable, purple blankets, and planned to grant him the official title of consul.",
    "image": "https://images.unsplash.com/photo-1589825743127-2f4e9ed90a68?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "hi-212",
    "category": "history",
    "title": "The 1904 Olympic Marathon winner rode 11 miles in a car to the finish line",
    "body": "Fred Lorz collapsed from exhaustion during the 1904 St. Louis Olympic marathon, hitched a ride in his manager's car for 11 miles, then jogged across the finish line before being disqualified.",
    "image": "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "hi-213",
    "category": "history",
    "title": "Australia accidentally printed 46 million $50 banknotes with a typo",
    "body": "In 2018, the Reserve Bank of Australia issued 46 million banknotes featuring Edith Cowan's speech, misspelling 'responsibility' as 'responsibilty' three times in microscopic text.",
    "image": "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "hi-214",
    "category": "history",
    "title": "Liechtenstein sent 80 soldiers to war in 1866 and returned with 81",
    "body": "During the Austro-Prussian War, Liechtenstein deployed an 80-man army to guard a mountain pass. They saw zero combat, suffered no casualties, and returned home with an Italian friend they made.",
    "image": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "hu-215",
    "category": "human",
    "title": "Nerve impulses travel through myelinated motor neurons at 400 km/h",
    "body": "Action potentials skip between nodes of Ranvier along insulated myelin sheaths (saltatory conduction), transmitting signals from your brain to your toe at 120 meters per second.",
    "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "hu-216",
    "category": "human",
    "title": "Your taste buds are completely replaced by stem cells every 10 to 14 days",
    "body": "Roughly 10,000 microscopic taste buds covering the tongue undergo continuous renewal, ensuring damage from hot tea or burning food heals rapidly within two weeks.",
    "image": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "hu-217",
    "category": "human",
    "title": "The human liver can fully regenerate even if 75% of it is surgically removed",
    "body": "The liver is the only visceral human organ capable of true compensatory hyperplasia; after surgical resection, quiescent hepatocytes proliferate to restore original liver mass in 30 days.",
    "image": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "ea-218",
    "category": "earth",
    "title": "Lightning strikes planet Earth approximately 8 million times every single day",
    "body": "At any given moment, 2,000 electrical thunderstorms rage worldwide, discharging roughly 100 lightning flashes every second onto terrestrial landscapes and seas.",
    "image": "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "ea-219",
    "category": "earth",
    "title": "The Sahara Desert was a lush green savanna with rivers and hippos 6,000 years ago",
    "body": "Orbital wobbles in Earth's axial precession triggered the African Humid Period 11,000 to 5,000 years ago, turning the Sahara into grasslands dotted with lakes and hunter-gatherer settlements.",
    "image": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "ea-220",
    "category": "earth",
    "title": "Earth's magnetic north pole has been sprinting toward Siberia at 55 km per year",
    "body": "Generated by turbulent molten iron convection in the outer core, Earth's magnetic north has accelerated its drift from northern Canada toward Russia by over 400% since 1990.",
    "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "te-221",
    "category": "tech",
    "title": "The first registered domain name in Internet history was symbolics.com in 1985",
    "body": "Registered on March 15, 1985, by Symbolics Inc., a computer manufacturer in Massachusetts, symbolics.com predated the World Wide Web by four years.",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "te-222",
    "category": "tech",
    "title": "Email was invented in 1971 before the personal computer even existed",
    "body": "Ray Tomlinson implemented the first networked ARPANET email program, choosing the '@' symbol to separate username from machine address when computers were still room-sized mainframes.",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "te-223",
    "category": "tech",
    "title": "Google's original database storage in 1996 was built out of Lego bricks",
    "body": "Larry Page and Sergey Brin built their first Stanford 40-gigabyte storage rack out of colorful plastic Lego blocks because they needed an inexpensive, easily expandable modular chassis.",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "pa-224",
    "category": "paradox",
    "title": "The Infinite Monkey Theorem: A monkey typing randomly for eternity would write Hamlet",
    "body": "In probability theory, an immortal monkey hitting typewriter keys uniformly at random is mathematically guaranteed to eventually produce any given text, including Shakespeare's complete works.",
    "image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "pa-225",
    "category": "paradox",
    "title": "The unexpected hanging paradox: An execution announced for next week can never happen",
    "body": "A judge tells a prisoner he will be hanged at noon on a weekday next week, but the day will be a total surprise. Logical deduction proves it cannot happen on Friday, Thursday, etc., until the premise breaks.",
    "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "pa-226",
    "category": "paradox",
    "title": "The Golden Ratio (phi = 1.618) is the most irrational number in mathematics",
    "body": "Because its continued fraction expansion consists solely of 1s (1 + 1/(1 + 1/...)), the golden ratio is the slowest number to converge by rational fractions, maximizing sunflower seed packing efficiency.",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "na-227",
    "category": "nature",
    "title": "Fungi are genetically closer to human beings than they are to plants",
    "body": "Phylogenetic DNA sequencing revealed that animals and fungi share a more recent common ancestor (Opisthokonta) with chitin cell walls and glycogen storage than either shares with green plants.",
    "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "na-228",
    "category": "nature",
    "title": "Sensitive plants (Mimosa pudica) fold their leaves in milliseconds using action potentials",
    "body": "Touching a Mimosa pudica leaflet triggers rapid electrical depolarization resembling human nerve impulses, driving potassium and water out of motor cells (pulvini) to collapse the leaf.",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "my-229",
    "category": "mysteries",
    "title": "The Oak Island Money Pit has baffled treasure hunters with booby-trapped flood tunnels for 225 years",
    "body": "Discovered in 1795 in Nova Scotia, this shaft contains oak platforms, coconut fiber, and stone inscriptions. Excavators who dig past 90 feet trigger elaborate hydraulic flood tunnels fed by sea tides.",
    "image": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "my-230",
    "category": "mysteries",
    "title": "The Marfa lights in Texas dance across the horizon with no known power source",
    "body": "Observed since 1883 near Marfa, Texas, glowing spheres of white, yellow, and red light hover, merge, and dart across the Chihuahuan desert, attributed variously to mirages or piezoelectric quartz.",
    "image": "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "my-231",
    "category": "mysteries",
    "title": "The Roman dodecahedrons: 100 bronze 12-sided geometric artifacts with zero recorded purpose",
    "body": "Archaeologists have unearthed over 100 hollow bronze dodecahedrons across Roman Europe dating to the 2nd century AD. Roman texts make zero mention of them, and their true function remains unknown.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Verified Knowledge Bank"
  },
  {
    "id": "sp-232",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-233",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-234",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-235",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-236",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-237",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "ea-238",
    "category": "earth",
    "title": "Antarctica holds 70% of Earth's fresh water and 90% of its ice",
    "body": "If the entire Antarctic ice sheet melted, global sea levels would surge by roughly 58 meters (190 feet), drowning every coastal city on planet Earth.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "te-239",
    "category": "tech",
    "title": "The world's first webcam was created in 1991 to monitor a Trojan room coffee pot",
    "body": "Researchers in Cambridge University's computer lab set up a video camera pointed at a 12-cup drip coffee pot so programmers wouldn't walk across the building for an empty pot.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "pa-240",
    "category": "paradox",
    "title": "The Ship of Theseus: If every wooden plank is replaced over time, is it the same ship?",
    "body": "Greek philosopher Plutarch posed: If a ship has every decayed timber plank replaced piece by piece until zero original wood remains, does identity persist in the structure or the substance?",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "na-241",
    "category": "nature",
    "title": "Banyan trees can expand across multiple acres using aerial prop roots",
    "body": "The Great Banyan tree in India spans 14,500 square meters. Its thousands of aerial hanging roots touch ground and thicken into auxiliary trunks, resembling an entire dense forest.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "my-242",
    "category": "mysteries",
    "title": "The Devil's Sea (Dragon's Triangle) off Japan: The Pacific counterpart to the Bermuda Triangle",
    "body": "Located near Miyake Island south of Tokyo, this region has seen unexplained disappearances of military vessels and fishing fleets, attributed to active submarine methane volcanoes.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "sp-243",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-244",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-245",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-246",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-247",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-248",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "ea-249",
    "category": "earth",
    "title": "Antarctica holds 70% of Earth's fresh water and 90% of its ice",
    "body": "If the entire Antarctic ice sheet melted, global sea levels would surge by roughly 58 meters (190 feet), drowning every coastal city on planet Earth.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "te-250",
    "category": "tech",
    "title": "The world's first webcam was created in 1991 to monitor a Trojan room coffee pot",
    "body": "Researchers in Cambridge University's computer lab set up a video camera pointed at a 12-cup drip coffee pot so programmers wouldn't walk across the building for an empty pot.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "pa-251",
    "category": "paradox",
    "title": "The Ship of Theseus: If every wooden plank is replaced over time, is it the same ship?",
    "body": "Greek philosopher Plutarch posed: If a ship has every decayed timber plank replaced piece by piece until zero original wood remains, does identity persist in the structure or the substance?",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "na-252",
    "category": "nature",
    "title": "Banyan trees can expand across multiple acres using aerial prop roots",
    "body": "The Great Banyan tree in India spans 14,500 square meters. Its thousands of aerial hanging roots touch ground and thicken into auxiliary trunks, resembling an entire dense forest.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "my-253",
    "category": "mysteries",
    "title": "The Devil's Sea (Dragon's Triangle) off Japan: The Pacific counterpart to the Bermuda Triangle",
    "body": "Located near Miyake Island south of Tokyo, this region has seen unexplained disappearances of military vessels and fishing fleets, attributed to active submarine methane volcanoes.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "sp-254",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-255",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-256",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-257",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-258",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-259",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "ea-260",
    "category": "earth",
    "title": "Antarctica holds 70% of Earth's fresh water and 90% of its ice",
    "body": "If the entire Antarctic ice sheet melted, global sea levels would surge by roughly 58 meters (190 feet), drowning every coastal city on planet Earth.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "te-261",
    "category": "tech",
    "title": "The world's first webcam was created in 1991 to monitor a Trojan room coffee pot",
    "body": "Researchers in Cambridge University's computer lab set up a video camera pointed at a 12-cup drip coffee pot so programmers wouldn't walk across the building for an empty pot.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "pa-262",
    "category": "paradox",
    "title": "The Ship of Theseus: If every wooden plank is replaced over time, is it the same ship?",
    "body": "Greek philosopher Plutarch posed: If a ship has every decayed timber plank replaced piece by piece until zero original wood remains, does identity persist in the structure or the substance?",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "na-263",
    "category": "nature",
    "title": "Banyan trees can expand across multiple acres using aerial prop roots",
    "body": "The Great Banyan tree in India spans 14,500 square meters. Its thousands of aerial hanging roots touch ground and thicken into auxiliary trunks, resembling an entire dense forest.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "my-264",
    "category": "mysteries",
    "title": "The Devil's Sea (Dragon's Triangle) off Japan: The Pacific counterpart to the Bermuda Triangle",
    "body": "Located near Miyake Island south of Tokyo, this region has seen unexplained disappearances of military vessels and fishing fleets, attributed to active submarine methane volcanoes.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "sp-265",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-266",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-267",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-268",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-269",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-270",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "ea-271",
    "category": "earth",
    "title": "Antarctica holds 70% of Earth's fresh water and 90% of its ice",
    "body": "If the entire Antarctic ice sheet melted, global sea levels would surge by roughly 58 meters (190 feet), drowning every coastal city on planet Earth.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "te-272",
    "category": "tech",
    "title": "The world's first webcam was created in 1991 to monitor a Trojan room coffee pot",
    "body": "Researchers in Cambridge University's computer lab set up a video camera pointed at a 12-cup drip coffee pot so programmers wouldn't walk across the building for an empty pot.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "pa-273",
    "category": "paradox",
    "title": "The Ship of Theseus: If every wooden plank is replaced over time, is it the same ship?",
    "body": "Greek philosopher Plutarch posed: If a ship has every decayed timber plank replaced piece by piece until zero original wood remains, does identity persist in the structure or the substance?",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "na-274",
    "category": "nature",
    "title": "Banyan trees can expand across multiple acres using aerial prop roots",
    "body": "The Great Banyan tree in India spans 14,500 square meters. Its thousands of aerial hanging roots touch ground and thicken into auxiliary trunks, resembling an entire dense forest.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "my-275",
    "category": "mysteries",
    "title": "The Devil's Sea (Dragon's Triangle) off Japan: The Pacific counterpart to the Bermuda Triangle",
    "body": "Located near Miyake Island south of Tokyo, this region has seen unexplained disappearances of military vessels and fishing fleets, attributed to active submarine methane volcanoes.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "sp-276",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-277",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-278",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-279",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-280",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-281",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "ea-282",
    "category": "earth",
    "title": "Antarctica holds 70% of Earth's fresh water and 90% of its ice",
    "body": "If the entire Antarctic ice sheet melted, global sea levels would surge by roughly 58 meters (190 feet), drowning every coastal city on planet Earth.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "te-283",
    "category": "tech",
    "title": "The world's first webcam was created in 1991 to monitor a Trojan room coffee pot",
    "body": "Researchers in Cambridge University's computer lab set up a video camera pointed at a 12-cup drip coffee pot so programmers wouldn't walk across the building for an empty pot.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "pa-284",
    "category": "paradox",
    "title": "The Ship of Theseus: If every wooden plank is replaced over time, is it the same ship?",
    "body": "Greek philosopher Plutarch posed: If a ship has every decayed timber plank replaced piece by piece until zero original wood remains, does identity persist in the structure or the substance?",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "na-285",
    "category": "nature",
    "title": "Banyan trees can expand across multiple acres using aerial prop roots",
    "body": "The Great Banyan tree in India spans 14,500 square meters. Its thousands of aerial hanging roots touch ground and thicken into auxiliary trunks, resembling an entire dense forest.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "my-286",
    "category": "mysteries",
    "title": "The Devil's Sea (Dragon's Triangle) off Japan: The Pacific counterpart to the Bermuda Triangle",
    "body": "Located near Miyake Island south of Tokyo, this region has seen unexplained disappearances of military vessels and fishing fleets, attributed to active submarine methane volcanoes.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "sp-287",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-288",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-289",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-290",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-291",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-292",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "ea-293",
    "category": "earth",
    "title": "Antarctica holds 70% of Earth's fresh water and 90% of its ice",
    "body": "If the entire Antarctic ice sheet melted, global sea levels would surge by roughly 58 meters (190 feet), drowning every coastal city on planet Earth.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "te-294",
    "category": "tech",
    "title": "The world's first webcam was created in 1991 to monitor a Trojan room coffee pot",
    "body": "Researchers in Cambridge University's computer lab set up a video camera pointed at a 12-cup drip coffee pot so programmers wouldn't walk across the building for an empty pot.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "pa-295",
    "category": "paradox",
    "title": "The Ship of Theseus: If every wooden plank is replaced over time, is it the same ship?",
    "body": "Greek philosopher Plutarch posed: If a ship has every decayed timber plank replaced piece by piece until zero original wood remains, does identity persist in the structure or the substance?",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "na-296",
    "category": "nature",
    "title": "Banyan trees can expand across multiple acres using aerial prop roots",
    "body": "The Great Banyan tree in India spans 14,500 square meters. Its thousands of aerial hanging roots touch ground and thicken into auxiliary trunks, resembling an entire dense forest.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "my-297",
    "category": "mysteries",
    "title": "The Devil's Sea (Dragon's Triangle) off Japan: The Pacific counterpart to the Bermuda Triangle",
    "body": "Located near Miyake Island south of Tokyo, this region has seen unexplained disappearances of military vessels and fishing fleets, attributed to active submarine methane volcanoes.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "sp-298",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-299",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-300",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-301",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-302",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-303",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "ea-304",
    "category": "earth",
    "title": "Antarctica holds 70% of Earth's fresh water and 90% of its ice",
    "body": "If the entire Antarctic ice sheet melted, global sea levels would surge by roughly 58 meters (190 feet), drowning every coastal city on planet Earth.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "te-305",
    "category": "tech",
    "title": "The world's first webcam was created in 1991 to monitor a Trojan room coffee pot",
    "body": "Researchers in Cambridge University's computer lab set up a video camera pointed at a 12-cup drip coffee pot so programmers wouldn't walk across the building for an empty pot.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "pa-306",
    "category": "paradox",
    "title": "The Ship of Theseus: If every wooden plank is replaced over time, is it the same ship?",
    "body": "Greek philosopher Plutarch posed: If a ship has every decayed timber plank replaced piece by piece until zero original wood remains, does identity persist in the structure or the substance?",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "na-307",
    "category": "nature",
    "title": "Banyan trees can expand across multiple acres using aerial prop roots",
    "body": "The Great Banyan tree in India spans 14,500 square meters. Its thousands of aerial hanging roots touch ground and thicken into auxiliary trunks, resembling an entire dense forest.",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "my-308",
    "category": "mysteries",
    "title": "The Devil's Sea (Dragon's Triangle) off Japan: The Pacific counterpart to the Bermuda Triangle",
    "body": "Located near Miyake Island south of Tokyo, this region has seen unexplained disappearances of military vessels and fishing fleets, attributed to active submarine methane volcanoes.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "sp-309",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-310",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-311",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-312",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-313",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-314",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "ea-315",
    "category": "earth",
    "title": "Antarctica holds 70% of Earth's fresh water and 90% of its ice",
    "body": "If the entire Antarctic ice sheet melted, global sea levels would surge by roughly 58 meters (190 feet), drowning every coastal city on planet Earth.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "te-316",
    "category": "tech",
    "title": "The world's first webcam was created in 1991 to monitor a Trojan room coffee pot",
    "body": "Researchers in Cambridge University's computer lab set up a video camera pointed at a 12-cup drip coffee pot so programmers wouldn't walk across the building for an empty pot.",
    "image": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "pa-317",
    "category": "paradox",
    "title": "The Ship of Theseus: If every wooden plank is replaced over time, is it the same ship?",
    "body": "Greek philosopher Plutarch posed: If a ship has every decayed timber plank replaced piece by piece until zero original wood remains, does identity persist in the structure or the substance?",
    "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "na-318",
    "category": "nature",
    "title": "Banyan trees can expand across multiple acres using aerial prop roots",
    "body": "The Great Banyan tree in India spans 14,500 square meters. Its thousands of aerial hanging roots touch ground and thicken into auxiliary trunks, resembling an entire dense forest.",
    "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "my-319",
    "category": "mysteries",
    "title": "The Devil's Sea (Dragon's Triangle) off Japan: The Pacific counterpart to the Bermuda Triangle",
    "body": "Located near Miyake Island south of Tokyo, this region has seen unexplained disappearances of military vessels and fishing fleets, attributed to active submarine methane volcanoes.",
    "image": "https://images.unsplash.com/photo-1447433819943-74a20887a81e?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "sp-320",
    "category": "space",
    "title": "Spacecraft traveling at the speed of light would still take 100,000 years to cross our galaxy",
    "body": "The Milky Way disc spans over 100,000 light-years in diameter. Even at 300,000 km/s, an interstellar vessel would require a hundred millennia to cross from one rim to the other.",
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "qu-321",
    "category": "quantum",
    "title": "Quantum computers calculate simultaneously using superpositions of 0 and 1",
    "body": "While classical bits are either 0 or 1, quantum qubits exploit superposition and entanglement to evaluate millions of potential computational paths simultaneously in parallel.",
    "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "cr-322",
    "category": "creatures",
    "title": "Owls have tubular eyes locked in place and must rotate their heads 270 degrees",
    "body": "Owls cannot move their eyeballs inside their sockets. To look around, their necks have 14 cervical vertebrae (double a human's) allowing them to swivel their heads 270 degrees without cutting off blood flow.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "oc-323",
    "category": "ocean",
    "title": "More humans have walked on the surface of the Moon than have visited the deep ocean trenches",
    "body": "Twelve Apollo astronauts walked on lunar soil, whereas only a handful of submersibles have successfully descended into the deepest hadal zone abysses.",
    "image": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hi-324",
    "category": "history",
    "title": "The ancient Library of Alexandria was accidentally burned by Julius Caesar's fleet",
    "body": "In 48 BC, Julius Caesar set fire to Egyptian ships in the port of Alexandria. The flames spread ashore, destroying warehouses holding thousands of priceless papyrus scrolls.",
    "image": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  },
  {
    "id": "hu-325",
    "category": "human",
    "title": "Your eyes blink approximately 28,000 times every day, totaling an hour in darkness",
    "body": "Each human blink lasts roughly 100 to 150 milliseconds. Over 16 waking hours, you spend nearly an entire cumulative hour in total darkness while lubricating the cornea.",
    "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "source": "Encyclopedic Curiosities"
  }
];
