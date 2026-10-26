import type { GenScienceQuestion } from "./types";

export const CH6_QUESTIONS: GenScienceQuestion[] = [
  {
    "id": "gen-6-1",
    "chapterId": "note-gen-6",
    "topic": "Atmospheric Optics",
    "question": "Why does the clear daytime sky appear bright blue to our eyes?",
    "options": [
      {
        "key": "A",
        "label": "Rayleigh scattering: nitrogen and oxygen molecules scatter short blue wavelengths ~10× more than red light"
      },
      {
        "key": "B",
        "label": "Oceans reflect blue water onto the clouds"
      },
      {
        "key": "C",
        "label": "Ozone gas absorbs all blue light"
      },
      {
        "key": "D",
        "label": "Air contains blue dust particles"
      }
    ],
    "correctKey": "A",
    "explanation": "Rayleigh scattering is inversely proportional to the 4th power of wavelength (1/λ⁴). Short blue wavelengths scatter in all directions, bathing the sky in blue."
  },
  {
    "id": "gen-6-2",
    "chapterId": "note-gen-6",
    "topic": "Atmospheric Optics",
    "question": "Why do sunsets, sunrises, and emergency brake lights appear intensely red?",
    "options": [
      {
        "key": "A",
        "label": "Red light has the longest visible wavelength and scatters the least through dust and fog"
      },
      {
        "key": "B",
        "label": "The Sun burns red hydrogen at dusk"
      },
      {
        "key": "C",
        "label": "Earth moves faster at sunset"
      },
      {
        "key": "D",
        "label": "Red light travels faster than all other colors"
      }
    ],
    "correctKey": "A",
    "explanation": "At sunset, sunlight traverses a thick atmospheric path. Shorter blue and green wavelengths scatter away, leaving long red rays that pierce through fog and distance."
  },
  {
    "id": "gen-6-3",
    "chapterId": "note-gen-6",
    "topic": "Astronomical Optics",
    "question": "Why do distant stars twinkle in the night sky while planets shine with a steady brightness?",
    "options": [
      {
        "key": "A",
        "label": "Starlight suffers continuous Atmospheric Refraction through turbulent hot and cold air layers"
      },
      {
        "key": "B",
        "label": "Stars physically pulse on and off"
      },
      {
        "key": "C",
        "label": "Planets emit their own laser light"
      },
      {
        "key": "D",
        "label": "Space dust blocks stars intermittently"
      }
    ],
    "correctKey": "A",
    "explanation": "Stars appear as single optical points whose narrow beams wander through swirling air pockets. Closer planets appear as larger discs whose fluctuations average out."
  },
  {
    "id": "gen-6-4",
    "chapterId": "note-gen-6",
    "topic": "Water Physics & Ecology",
    "question": "Why does ice float on top of water bodies, allowing fish and aquatic life to survive frozen winters underneath?",
    "options": [
      {
        "key": "A",
        "label": "Anomalous expansion: water is densest at 4°C and expands into a lighter cage lattice as it freezes at 0°C"
      },
      {
        "key": "B",
        "label": "Ice contains trapped oxygen bubbles only"
      },
      {
        "key": "C",
        "label": "Fish breathe warm air toward the surface"
      },
      {
        "key": "D",
        "label": "Surface water is saltier"
      }
    ],
    "correctKey": "A",
    "explanation": "Water reaches peak density at 4°C. Below 4°C, hydrogen bonds organize into a spacious crystal lattice, making ice less dense (~0.92 g/cm³) so it floats as an insulating blanket."
  },
  {
    "id": "gen-6-5",
    "chapterId": "note-gen-6",
    "topic": "Thermodynamics in Cooking",
    "question": "Why does food cook significantly faster in a sealed pressure cooker compared to an open boiling pot?",
    "options": [
      {
        "key": "A",
        "label": "Trapped steam increases internal pressure, raising water's boiling point from 100°C to ~120°C"
      },
      {
        "key": "B",
        "label": "Cooker metal reacts chemically with food"
      },
      {
        "key": "C",
        "label": "Heat cannot escape from the bottom"
      },
      {
        "key": "D",
        "label": "Pressure crushes vegetables into paste"
      }
    ],
    "correctKey": "A",
    "explanation": "In an open pot, boiling water caps at 100°C. A pressure cooker locks in steam up to 2 atmospheres, elevating the boiling temperature to ~120°C for much faster cooking."
  },
  {
    "id": "gen-6-6",
    "chapterId": "note-gen-6",
    "topic": "High-Altitude Physics",
    "question": "Why does it take longer to boil potatoes or dal on high mountain peaks (like Leh or Mount Everest)?",
    "options": [
      {
        "key": "A",
        "label": "Low atmospheric pressure at high altitudes causes water to boil below 100°C (e.g. at 85°C)"
      },
      {
        "key": "B",
        "label": "Mountain gravity is too weak"
      },
      {
        "key": "C",
        "label": "Oxygen is completely absent"
      },
      {
        "key": "D",
        "label": "Cold air cools the flame instantly"
      }
    ],
    "correctKey": "A",
    "explanation": "Lower barometric pressure allows water to vaporize at cooler temperatures. Water simmering at 80–85°C supplies less thermal energy, requiring longer cooking times."
  },
  {
    "id": "gen-6-7",
    "chapterId": "note-gen-6",
    "topic": "Optical Phenomena",
    "question": "The shimmering illusion of a pool of water on a scorching desert highway (a Mirage) is caused by:",
    "options": [
      {
        "key": "A",
        "label": "Total Internal Reflection (TIR) of light as it bends upward through hot, less dense ground air"
      },
      {
        "key": "B",
        "label": "Steam rising from underground pipes"
      },
      {
        "key": "C",
        "label": "Light polarization by asphalt"
      },
      {
        "key": "D",
        "label": "Optical diffraction"
      }
    ],
    "correctKey": "A",
    "explanation": "Intensely hot asphalt creates low-density air near the ground. Sky rays bend continuously away from the normal until TIR bounces them upward into driver eyes."
  },
  {
    "id": "gen-6-8",
    "chapterId": "note-gen-6",
    "topic": "Gemology & Optics",
    "question": "Why do properly cut diamonds exhibit extraordinary brilliance and multi-colored sparkle?",
    "options": [
      {
        "key": "A",
        "label": "Total Internal Reflection due to a very high refractive index (2.42) and tiny critical angle (24.4°)"
      },
      {
        "key": "B",
        "label": "Diamonds are radioactive"
      },
      {
        "key": "C",
        "label": "They are coated with reflective silver"
      },
      {
        "key": "D",
        "label": "They store sunlight and glow"
      }
    ],
    "correctKey": "A",
    "explanation": "With a high refractive index of 2.42, light entering a diamond strikes faceted interior surfaces at angles above 24.4°, repeatedly reflecting internally before escaping."
  },
  {
    "id": "gen-6-9",
    "chapterId": "note-gen-6",
    "topic": "Telecommunications & Optics",
    "question": "High-speed broadband Internet transmits data across continents through fiber optic cables utilizing:",
    "options": [
      {
        "key": "A",
        "label": "Total Internal Reflection (TIR)"
      },
      {
        "key": "B",
        "label": "Radio waves"
      },
      {
        "key": "C",
        "label": "Electric conduction"
      },
      {
        "key": "D",
        "label": "Sound echoes"
      }
    ],
    "correctKey": "A",
    "explanation": "Laser light pulses bounce along ultra-pure silica glass cores clad in lower-index glass, maintaining signal integrity over thousands of kilometers without radiative loss."
  },
  {
    "id": "gen-6-10",
    "chapterId": "note-gen-6",
    "topic": "Meteorological Optics",
    "question": "What sequence of physical optical phenomena produces a natural rainbow in the sky after a rainstorm?",
    "options": [
      {
        "key": "A",
        "label": "Refraction, Dispersion (splitting into colors), and Total Internal Reflection inside raindrops"
      },
      {
        "key": "B",
        "label": "Polarization and diffraction alone"
      },
      {
        "key": "C",
        "label": "Interference of light from the Sun"
      },
      {
        "key": "D",
        "label": "Reflection off cloud bottoms"
      }
    ],
    "correctKey": "A",
    "explanation": "Spherical raindrops act as prisms: sunlight refracts upon entry, disperses into component wavelengths (VIBGYOR), internally reflects off the droplet back, and refracts out."
  },
  {
    "id": "gen-6-11",
    "chapterId": "note-gen-6",
    "topic": "Lunar Astrophysics",
    "question": "Why is the sky on the Moon pitch-black even when the Sun is blazing in full daylight?",
    "options": [
      {
        "key": "A",
        "label": "The Moon has no atmosphere, so there are no air molecules to scatter sunlight"
      },
      {
        "key": "B",
        "label": "Moon rocks absorb all light"
      },
      {
        "key": "C",
        "label": "The Moon is too cold"
      },
      {
        "key": "D",
        "label": "Solar light cannot reach the Moon"
      }
    ],
    "correctKey": "A",
    "explanation": "Without gas molecules to cause Rayleigh scattering, sunlight travels in straight lines; space remains black and stars are clearly visible alongside the Sun."
  },
  {
    "id": "gen-6-12",
    "chapterId": "note-gen-6",
    "topic": "Acoustics & Space Physics",
    "question": "Why can astronauts not hear each other talking in the open vacuum of outer space without radio headsets?",
    "options": [
      {
        "key": "A",
        "label": "Sound is a mechanical pressure wave that requires a material medium (air, liquid, solid) to travel"
      },
      {
        "key": "B",
        "label": "Space helmets muffle voices"
      },
      {
        "key": "C",
        "label": "Sound waves freeze in low temperatures"
      },
      {
        "key": "D",
        "label": "Gravity pulls sound downward"
      }
    ],
    "correctKey": "A",
    "explanation": "Sound waves are physical longitudinal vibrations of matter. Space is a near-perfect vacuum; astronauts use electromagnetic radio waves, which require no medium."
  },
  {
    "id": "gen-6-13",
    "chapterId": "note-gen-6",
    "topic": "Evaporative Cooling",
    "question": "Why does sweating (perspiring) cool down the human body on a hot humid day?",
    "options": [
      {
        "key": "A",
        "label": "Evaporating sweat molecules absorb Latent Heat of Vaporization directly from the skin"
      },
      {
        "key": "B",
        "label": "Sweat is naturally refrigerated at 0°C"
      },
      {
        "key": "C",
        "label": "Sweat closes all skin pores"
      },
      {
        "key": "D",
        "label": "Sweat reflects sunlight away"
      }
    ],
    "correctKey": "A",
    "explanation": "To convert 1 gram of liquid sweat into vapor requires ~540 calories of latent heat, extracted from subcutaneous capillaries, cooling core body temperature."
  },
  {
    "id": "gen-6-14",
    "chapterId": "note-gen-6",
    "topic": "Everyday Physics",
    "question": "Why does water kept in a traditional earthen clay pot (Matka) remain refreshingly cool during hot Indian summers?",
    "options": [
      {
        "key": "A",
        "label": "Water continuously oozes through thousands of microscopic pores and evaporates, carrying away latent heat"
      },
      {
        "key": "B",
        "label": "Clay contains natural chemical cooling salts"
      },
      {
        "key": "C",
        "label": "Clay blocks infrared light"
      },
      {
        "key": "D",
        "label": "Clay absorbs cold air at night"
      }
    ],
    "correctKey": "A",
    "explanation": "Porous unglazed clay allows water to seep out; steady surface evaporation absorbs latent heat from the remaining reservoir inside the pot."
  },
  {
    "id": "gen-6-15",
    "chapterId": "note-gen-6",
    "topic": "Everyday Lighting",
    "question": "Why are traditional incandescent electric light bulbs filled with inert gases like Argon or Nitrogen rather than air?",
    "options": [
      {
        "key": "A",
        "label": "To prevent the white-hot Tungsten filament from oxidizing and burning up at 2,500°C"
      },
      {
        "key": "B",
        "label": "To make the bulb lighter"
      },
      {
        "key": "C",
        "label": "To change the color to yellow"
      },
      {
        "key": "D",
        "label": "To conduct electricity across the glass"
      }
    ],
    "correctKey": "A",
    "explanation": "Oxygen in air would immediately react with incandescent tungsten (W + O₂ → WO₃), vaporizing the wire in milliseconds. Inert argon retards tungsten evaporation."
  },
  {
    "id": "gen-6-16",
    "chapterId": "note-gen-6",
    "topic": "Materials Science",
    "question": "Why is Tungsten (Wolfram, W) universally chosen as the filament material for traditional incandescent bulbs?",
    "options": [
      {
        "key": "A",
        "label": "Highest melting point of all metals (3,422°C) and high electrical resistance"
      },
      {
        "key": "B",
        "label": "Cheapest available metal"
      },
      {
        "key": "C",
        "label": "Best conductor of electricity"
      },
      {
        "key": "D",
        "label": "Liquid at room temperature"
      }
    ],
    "correctKey": "A",
    "explanation": "Tungsten glows white-hot at 2,500°C without melting, thanks to its extraordinary 3,422°C melting point and tensile strength."
  },
  {
    "id": "gen-6-17",
    "chapterId": "note-gen-6",
    "topic": "Thermometry",
    "question": "Why is Mercury historically preferred inside clinical and laboratory liquid-in-glass thermometers?",
    "options": [
      {
        "key": "A",
        "label": "Uniform thermal expansion, wide liquid range (−39°C to 357°C), does not wet glass, and is easily visible"
      },
      {
        "key": "B",
        "label": "Low density and transparent color"
      },
      {
        "key": "C",
        "label": "Safe to ingest"
      },
      {
        "key": "D",
        "label": "Boils at 50°C"
      }
    ],
    "correctKey": "A",
    "explanation": "Mercury expands predictably, exhibits strong cohesive forces so it doesn't stick to capillary glass, and its silver sheen is easily read on temperature markings."
  },
  {
    "id": "gen-6-18",
    "chapterId": "note-gen-6",
    "topic": "Thermal Expansion",
    "question": "Why does a thick glass tumbler often shatter when boiling tea or water is suddenly poured into it?",
    "options": [
      {
        "key": "A",
        "label": "Unequal thermal expansion: the inner surface heats and expands rapidly while the outer glass remains cold"
      },
      {
        "key": "B",
        "label": "Glass dissolves in boiling water"
      },
      {
        "key": "C",
        "label": "Air pressure crushes the glass"
      },
      {
        "key": "D",
        "label": "Chemical reaction with tea"
      }
    ],
    "correctKey": "A",
    "explanation": "Glass is a poor conductor of heat. Sudden thermal shock creates massive tensile stress between the rapidly expanding inner layer and the cold outer layer."
  },
  {
    "id": "gen-6-19",
    "chapterId": "note-gen-6",
    "topic": "Civil Engineering & Physics",
    "question": "Why are small expansion gaps intentionally left between adjacent steel rails on railway tracks?",
    "options": [
      {
        "key": "A",
        "label": "To allow the steel rails to expand linearly during hot summer days without buckling"
      },
      {
        "key": "B",
        "label": "To let rainwater drain away"
      },
      {
        "key": "C",
        "label": "To create the rhythmic train sound"
      },
      {
        "key": "D",
        "label": "To reduce track weight"
      }
    ],
    "correctKey": "A",
    "explanation": "Linear thermal expansion (ΔL = α L ΔT) causes steel rails to lengthen in summer. Without expansion gaps, immense compressive forces buckle and derail trains."
  },
  {
    "id": "gen-6-20",
    "chapterId": "note-gen-6",
    "topic": "Winter Chemistry",
    "question": "Why do highway authorities spread rock salt (NaCl or CaCl₂) over snow-covered roadways in freezing winter?",
    "options": [
      {
        "key": "A",
        "label": "Depression of Freezing Point: dissolved salt lowers the freezing point of water below 0°C, melting the ice"
      },
      {
        "key": "B",
        "label": "Salt sets fire to the snow"
      },
      {
        "key": "C",
        "label": "Salt creates traction without melting"
      },
      {
        "key": "D",
        "label": "Salt neutralizes road acid"
      }
    ],
    "correctKey": "A",
    "explanation": "Adding a non-volatile solute lowers the chemical potential of water, depressing the freezing point so ice melts even at −5°C or −10°C."
  },
  {
    "id": "gen-6-21",
    "chapterId": "note-gen-6",
    "topic": "Culinary Chemistry",
    "question": "Why do cut apple and potato slices turn dark brown when left exposed to air?",
    "options": [
      {
        "key": "A",
        "label": "Enzymatic browning: Polyphenol Oxidase (PPO) oxidizes plant phenols into brown melanin pigments"
      },
      {
        "key": "B",
        "label": "Dust settles on the surface"
      },
      {
        "key": "C",
        "label": "Bacteria consume all vitamins"
      },
      {
        "key": "D",
        "label": "Sugar caramelizes at room temperature"
      }
    ],
    "correctKey": "A",
    "explanation": "Damaged plant cells release polyphenol oxidase, which in the presence of atmospheric oxygen oxidizes phenols into dark brown melanins. Lemon juice (Vitamin C) halts this reaction."
  },
  {
    "id": "gen-6-22",
    "chapterId": "note-gen-6",
    "topic": "Kitchen Science",
    "question": "Why does chopping raw onions make your eyes burn and trigger uncontrollable tearing?",
    "options": [
      {
        "key": "A",
        "label": "Volatile Syn-propanethial-S-oxide gas mixes with eye moisture to produce irritating dilute sulfuric acid"
      },
      {
        "key": "B",
        "label": "Onion skin releases mustard gas"
      },
      {
        "key": "C",
        "label": "Pollen grains enter the eye"
      },
      {
        "key": "D",
        "label": "Capsaicin spice burns the cornea"
      }
    ],
    "correctKey": "A",
    "explanation": "Crushing onion cells mixes alliinase enzymes with amino acid sulfoxides, synthesizing volatile syn-propanethial-S-oxide which activates ocular lacrimal glands."
  },
  {
    "id": "gen-6-23",
    "chapterId": "note-gen-6",
    "topic": "Surface Chemistry",
    "question": "Why do laundry detergents clean greasy, oily fabric stains far better than plain water?",
    "options": [
      {
        "key": "A",
        "label": "Detergent surfactants lower water surface tension and form micelles with hydrophobic tails trapping grease"
      },
      {
        "key": "B",
        "label": "Detergents boil cold water"
      },
      {
        "key": "C",
        "label": "Detergents dissolve the cotton fibers"
      },
      {
        "key": "D",
        "label": "Detergents generate magnetic fields"
      }
    ],
    "correctKey": "A",
    "explanation": "Surfactant molecules have a water-hating (hydrophobic) hydrocarbon tail that embeds into oil and a water-loving (hydrophilic) ionic head that stays in water, washing dirt away."
  },
  {
    "id": "gen-6-24",
    "chapterId": "note-gen-6",
    "topic": "History of Medicine",
    "question": "The world's very first vaccine, developed against deadly smallpox in 1796, was pioneered by:",
    "options": [
      {
        "key": "A",
        "label": "Edward Jenner"
      },
      {
        "key": "B",
        "label": "Louis Pasteur"
      },
      {
        "key": "C",
        "label": "Robert Koch"
      },
      {
        "key": "D",
        "label": "Paul Ehrlich"
      }
    ],
    "correctKey": "A",
    "explanation": "English physician Edward Jenner inoculated eight-year-old James Phipps with benign cowpox lesions, conferring cross-immunity against smallpox."
  },
  {
    "id": "gen-6-25",
    "chapterId": "note-gen-6",
    "topic": "History of Antibiotics",
    "question": "Penicillin, the first wonder antibiotic that saved millions of soldier lives in World War II, was discovered in 1928 by:",
    "options": [
      {
        "key": "A",
        "label": "Sir Alexander Fleming"
      },
      {
        "key": "B",
        "label": "Howard Florey"
      },
      {
        "key": "C",
        "label": "Ernst Chain"
      },
      {
        "key": "D",
        "label": "Joseph Lister"
      }
    ],
    "correctKey": "A",
    "explanation": "Fleming observed that Penicillium notatum fungal mould contaminated a staphylococcal petri plate, secreting a bactericidal compound he named Penicillin."
  },
  {
    "id": "gen-6-26",
    "chapterId": "note-gen-6",
    "topic": "Cytology History",
    "question": "Who first observed cellular honeycomb chambers in thin slices of bottle cork in 1665, coining the term 'Cell'?",
    "options": [
      {
        "key": "A",
        "label": "Robert Hooke"
      },
      {
        "key": "B",
        "label": "Antonie van Leeuwenhoek"
      },
      {
        "key": "C",
        "label": "Theodor Schwann"
      },
      {
        "key": "D",
        "label": "Matthias Schleiden"
      }
    ],
    "correctKey": "A",
    "explanation": "In his book 'Micrographia' (1665), Robert Hooke noted dead plant cell walls resembling small monk rooms in a monastery, calling them cells."
  },
  {
    "id": "gen-6-27",
    "chapterId": "note-gen-6",
    "topic": "Microbiology History",
    "question": "Who was the first human to observe living single-celled protozoa and bacteria ('animalcules') in pond water using a single-lens microscope in 1674?",
    "options": [
      {
        "key": "A",
        "label": "Antonie van Leeuwenhoek"
      },
      {
        "key": "B",
        "label": "Robert Brown"
      },
      {
        "key": "C",
        "label": "Louis Pasteur"
      },
      {
        "key": "D",
        "label": "Gregor Mendel"
      }
    ],
    "correctKey": "A",
    "explanation": "Dutch tradesman Antonie van Leeuwenhoek ground precision tiny glass spheres, becoming the father of microbiology by discovering swimming bacteria and red blood cells."
  },
  {
    "id": "gen-6-28",
    "chapterId": "note-gen-6",
    "topic": "Medical Imaging History",
    "question": "Who discovered X-Rays in 1895, taking the world's first radiograph of his wife's hand and winning the inaugural Nobel Prize in Physics in 1901?",
    "options": [
      {
        "key": "A",
        "label": "Wilhelm Conrad Röntgen"
      },
      {
        "key": "B",
        "label": "Henri Becquerel"
      },
      {
        "key": "C",
        "label": "Max Planck"
      },
      {
        "key": "D",
        "label": "Niels Bohr"
      }
    ],
    "correctKey": "A",
    "explanation": "Röntgen discovered unknown rays passing through cardboard and human flesh while experimenting with cathode-ray tubes, naming them 'X-rays'."
  },
  {
    "id": "gen-6-29",
    "chapterId": "note-gen-6",
    "topic": "Nobel History",
    "question": "Who is the only scientist in history to be honored with Nobel Prizes in two different scientific disciplines (Physics in 1903 and Chemistry in 1911)?",
    "options": [
      {
        "key": "A",
        "label": "Marie Curie"
      },
      {
        "key": "B",
        "label": "Albert Einstein"
      },
      {
        "key": "C",
        "label": "Linus Pauling"
      },
      {
        "key": "D",
        "label": "Ernest Rutherford"
      }
    ],
    "correctKey": "A",
    "explanation": "Marie Curie shared the 1903 Physics Nobel for radioactivity research, then won the 1911 Chemistry Nobel for isolating Radium and Polonium."
  },
  {
    "id": "gen-6-30",
    "chapterId": "note-gen-6",
    "topic": "Molecular Genetics",
    "question": "The double helix twisted-ladder molecular structure of DNA was resolved in 1953 by:",
    "options": [
      {
        "key": "A",
        "label": "James Watson and Francis Crick (using X-ray data from Rosalind Franklin)"
      },
      {
        "key": "B",
        "label": "Gregor Mendel"
      },
      {
        "key": "C",
        "label": "Thomas Hunt Morgan"
      },
      {
        "key": "D",
        "label": "Frederick Sanger"
      }
    ],
    "correctKey": "A",
    "explanation": "Watson and Crick solved the complementary base-pairing (A-T, G-C) double helix model relying on Photo 51 captured by Rosalind Franklin."
  },
  {
    "id": "gen-6-31",
    "chapterId": "note-gen-6",
    "topic": "Subatomic Physics",
    "question": "The subatomic negatively charged Electron was discovered in 1897 through cathode-ray tube experiments by:",
    "options": [
      {
        "key": "A",
        "label": "J.J. Thomson"
      },
      {
        "key": "B",
        "label": "Ernest Rutherford"
      },
      {
        "key": "C",
        "label": "James Chadwick"
      },
      {
        "key": "D",
        "label": "John Dalton"
      }
    ],
    "correctKey": "A",
    "explanation": "Sir J.J. Thomson calculated the charge-to-mass ratio (e/m) of cathode rays, proving they were subatomic particles much lighter than hydrogen atoms."
  },
  {
    "id": "gen-6-32",
    "chapterId": "note-gen-6",
    "topic": "Nuclear Physics",
    "question": "Who discovered the dense atomic nucleus through the famous alpha-particle gold foil scattering experiment in 1911?",
    "options": [
      {
        "key": "A",
        "label": "Ernest Rutherford"
      },
      {
        "key": "B",
        "label": "Niels Bohr"
      },
      {
        "key": "C",
        "label": "James Chadwick"
      },
      {
        "key": "D",
        "label": "Enrico Fermi"
      }
    ],
    "correctKey": "A",
    "explanation": "Rutherford discovered that positive alpha particles occasionally deflected backwards, demonstrating that positive atomic charge and mass are concentrated in a tiny central nucleus."
  },
  {
    "id": "gen-6-33",
    "chapterId": "note-gen-6",
    "topic": "Nuclear Physics",
    "question": "The uncharged subatomic particle, the Neutron, was discovered in 1932 by:",
    "options": [
      {
        "key": "A",
        "label": "James Chadwick"
      },
      {
        "key": "B",
        "label": "J.J. Thomson"
      },
      {
        "key": "C",
        "label": "Ernest Rutherford"
      },
      {
        "key": "D",
        "label": "Otto Hahn"
      }
    ],
    "correctKey": "A",
    "explanation": "Chadwick bombarded beryllium with alpha particles, releasing penetrating neutral radiation with a mass nearly equal to a proton (the neutron)."
  },
  {
    "id": "gen-6-34",
    "chapterId": "note-gen-6",
    "topic": "Periodic Classification",
    "question": "Who formulated the first Periodic Law in 1869, arranging chemical elements in order of increasing atomic masses?",
    "options": [
      {
        "key": "A",
        "label": "Dmitri Mendeleev"
      },
      {
        "key": "B",
        "label": "Henry Moseley"
      },
      {
        "key": "C",
        "label": "John Newlands"
      },
      {
        "key": "D",
        "label": "Antoine Lavoisier"
      }
    ],
    "correctKey": "A",
    "explanation": "Russian chemist Dmitri Mendeleev predicted the existence and properties of undiscovered elements (like Gallium and Germanium) with astonishing accuracy."
  },
  {
    "id": "gen-6-35",
    "chapterId": "note-gen-6",
    "topic": "Indian Science History",
    "question": "India celebrates 'National Science Day' on February 28 every year to commemorate which historic discovery in 1928?",
    "options": [
      {
        "key": "A",
        "label": "Sir C.V. Raman's discovery of the Raman Effect (inelastic scattering of light)"
      },
      {
        "key": "B",
        "label": "The launch of Aryabhata satellite"
      },
      {
        "key": "C",
        "label": "Homi Bhabha's first nuclear reactor"
      },
      {
        "key": "D",
        "label": "APJ Abdul Kalam's missile test"
      }
    ],
    "correctKey": "A",
    "explanation": "On Feb 28, 1928, Sir C.V. Raman discovered that scattered light changes wavelength due to molecular vibrational energy shifts, winning the 1930 Nobel Prize in Physics."
  },
  {
    "id": "gen-6-36",
    "chapterId": "note-gen-6",
    "topic": "Indian Space History",
    "question": "Who is revered as the visionary 'Father of the Indian Space Program'?",
    "options": [
      {
        "key": "A",
        "label": "Dr. Vikram Sarabhai"
      },
      {
        "key": "B",
        "label": "Dr. Homi J. Bhabha"
      },
      {
        "key": "C",
        "label": "Dr. A.P.J. Abdul Kalam"
      },
      {
        "key": "D",
        "label": "Prof. Satish Dhawan"
      }
    ],
    "correctKey": "A",
    "explanation": "Dr. Vikram Sarabhai established the Physical Research Laboratory (PRL), founded ISRO in 1969, and initiated India's space and satellite revolution."
  },
  {
    "id": "gen-6-37",
    "chapterId": "note-gen-6",
    "topic": "Indian Nuclear History",
    "question": "Who is known as the 'Father of the Indian Nuclear Program', establishing TIFR and initiating India's three-stage nuclear power program?",
    "options": [
      {
        "key": "A",
        "label": "Dr. Homi Jehangir Bhabha"
      },
      {
        "key": "B",
        "label": "Dr. Vikram Sarabhai"
      },
      {
        "key": "C",
        "label": "Dr. Shanti Swaroop Bhatnagar"
      },
      {
        "key": "D",
        "label": "Dr. Raja Ramanna"
      }
    ],
    "correctKey": "A",
    "explanation": "Dr. Homi Bhabha laid the scientific foundation for India's atomic energy architecture and designed the utilization of abundant indigenous Thorium reserves."
  },
  {
    "id": "gen-6-38",
    "chapterId": "note-gen-6",
    "topic": "Indian Defense & Missiles",
    "question": "Dr. A.P.J. Abdul Kalam earned the enduring title 'Missile Man of India' for successfully directing which historic project?",
    "options": [
      {
        "key": "A",
        "label": "Integrated Guided Missile Development Programme (IGMDP: Agni, Prithvi, Akash, Trishul, Nag)"
      },
      {
        "key": "B",
        "label": "Chandrayaan-1"
      },
      {
        "key": "C",
        "label": "Green Revolution"
      },
      {
        "key": "D",
        "label": "White Revolution"
      }
    ],
    "correctKey": "A",
    "explanation": "Dr. Kalam spearheaded the indigenous development of India's strategic ballistic missile systems (Prithvi surface-to-surface and Agni intermediate-range missiles)."
  },
  {
    "id": "gen-6-39",
    "chapterId": "note-gen-6",
    "topic": "Electromagnetic Inventions",
    "question": "Who patented the commercial Telephone in 1876 with the famous words 'Mr. Watson, come here, I want to see you'?",
    "options": [
      {
        "key": "A",
        "label": "Alexander Graham Bell"
      },
      {
        "key": "B",
        "label": "Thomas Alva Edison"
      },
      {
        "key": "C",
        "label": "Guglielmo Marconi"
      },
      {
        "key": "D",
        "label": "Samuel Morse"
      }
    ],
    "correctKey": "A",
    "explanation": "Alexander Graham Bell transformed acoustic sound waves into variable electric currents that traveled over copper wires to vibrate an electromagnetic diaphragm."
  },
  {
    "id": "gen-6-40",
    "chapterId": "note-gen-6",
    "topic": "Electrical Power Inventions",
    "question": "Who invented the Polyphase Alternating Current (AC) induction motor and transformer transmission system that powers modern electrical grids?",
    "options": [
      {
        "key": "A",
        "label": "Nikola Tesla"
      },
      {
        "key": "B",
        "label": "Thomas Edison"
      },
      {
        "key": "C",
        "label": "Michael Faraday"
      },
      {
        "key": "D",
        "label": "James Watt"
      }
    ],
    "correctKey": "A",
    "explanation": "Nikola Tesla pioneered multi-phase alternating currents and rotating magnetic field induction motors, winning the 'War of Currents' against Edison's direct current (DC)."
  },
  {
    "id": "gen-6-41",
    "chapterId": "note-gen-6",
    "topic": "Wireless Inventions",
    "question": "Which Indian polymath pioneered millimetre-wavelength microwave radio transmission and the Crescograph (plant growth detector) in 1895?",
    "options": [
      {
        "key": "A",
        "label": "Sir Jagadish Chandra Bose"
      },
      {
        "key": "B",
        "label": "Satyendra Nath Bose"
      },
      {
        "key": "C",
        "label": "Meghnad Saha"
      },
      {
        "key": "D",
        "label": "P.C. Ray"
      }
    ],
    "correctKey": "A",
    "explanation": "Sir J.C. Bose ignited gunpowder remotely in Calcutta using 60 GHz microwaves and invented semiconductor galena crystal radio wave receivers."
  },
  {
    "id": "gen-6-42",
    "chapterId": "note-gen-6",
    "topic": "Television History",
    "question": "The world's first working electromechanical television system was publicly demonstrated in London in 1926 by:",
    "options": [
      {
        "key": "A",
        "label": "John Logie Baird"
      },
      {
        "key": "B",
        "label": "Philo Farnsworth"
      },
      {
        "key": "C",
        "label": "Guglielmo Marconi"
      },
      {
        "key": "D",
        "label": "Charles Babbage"
      }
    ],
    "correctKey": "A",
    "explanation": "Scottish engineer John Logie Baird used spinning Nipkow scanning discs to transmit moving silhouette images of a ventriloquist's dummy across wires."
  },
  {
    "id": "gen-6-43",
    "chapterId": "note-gen-6",
    "topic": "Explosives & Nobel Foundation",
    "question": "Alfred Nobel invented which stabilized, safer blasting explosive in 1867 by absorbing nitroglycerin into kieselguhr diatomaceous earth?",
    "options": [
      {
        "key": "A",
        "label": "Dynamite"
      },
      {
        "key": "B",
        "label": "Gunpowder"
      },
      {
        "key": "C",
        "label": "TNT"
      },
      {
        "key": "D",
        "label": "RDX"
      }
    ],
    "correctKey": "A",
    "explanation": "Nobel transformed dangerous, shock-sensitive nitroglycerin into safe dynamite sticks. His will established the prestigious annual Nobel Prizes in 1895."
  },
  {
    "id": "gen-6-44",
    "chapterId": "note-gen-6",
    "topic": "Polio Eradication History",
    "question": "Who developed the first inactivated injectable Polio vaccine (IPV) in 1953, famously refusing to patent it so children worldwide could receive it affordably?",
    "options": [
      {
        "key": "A",
        "label": "Dr. Jonas Salk"
      },
      {
        "key": "B",
        "label": "Dr. Albert Sabin"
      },
      {
        "key": "C",
        "label": "Alexander Fleming"
      },
      {
        "key": "D",
        "label": "Robert Koch"
      }
    ],
    "correctKey": "A",
    "explanation": "When asked who owned the patent, Dr. Jonas Salk famously answered: 'Well, the people, I would say. There is no patent. Could you patent the sun?'"
  },
  {
    "id": "gen-6-45",
    "chapterId": "note-gen-6",
    "topic": "Polio Eradication History",
    "question": "Who developed the convenient sweet Oral Polio Vaccine (OPV drops) in 1961 that spearheaded global pulse polio campaigns?",
    "options": [
      {
        "key": "A",
        "label": "Dr. Albert Sabin"
      },
      {
        "key": "B",
        "label": "Dr. Jonas Salk"
      },
      {
        "key": "C",
        "label": "Louis Pasteur"
      },
      {
        "key": "D",
        "label": "Edward Jenner"
      }
    ],
    "correctKey": "A",
    "explanation": "Dr. Albert Sabin's live-attenuated oral drops triggered mucosal gut immunity, enabling easy mass immunization that wiped out wild poliovirus in India and worldwide."
  },
  {
    "id": "gen-6-46",
    "chapterId": "note-gen-6",
    "topic": "Computer History",
    "question": "Who is universally recognized as the 'Father of the Modern Computer' for designing the Mechanical Analytical Engine with memory and ALU in 1837?",
    "options": [
      {
        "key": "A",
        "label": "Charles Babbage"
      },
      {
        "key": "B",
        "label": "Alan Turing"
      },
      {
        "key": "C",
        "label": "John von Neumann"
      },
      {
        "key": "D",
        "label": "Ada Lovelace"
      }
    ],
    "correctKey": "A",
    "explanation": "English mathematician Charles Babbage designed the Analytical Engine using punch cards, featuring a store (memory) and a mill (processor)."
  },
  {
    "id": "gen-6-47",
    "chapterId": "note-gen-6",
    "topic": "Computer History",
    "question": "Who is celebrated as the world's first computer programmer for writing an algorithm to compute Bernoulli numbers on Charles Babbage's engine?",
    "options": [
      {
        "key": "A",
        "label": "Ada Lovelace"
      },
      {
        "key": "B",
        "label": "Grace Hopper"
      },
      {
        "key": "C",
        "label": "Katherine Johnson"
      },
      {
        "key": "D",
        "label": "Margaret Hamilton"
      }
    ],
    "correctKey": "A",
    "explanation": "Augusta Ada Lovelace realized that computers could manipulate symbols beyond numbers, publishing the first computer algorithm in 1843."
  },
  {
    "id": "gen-6-48",
    "chapterId": "note-gen-6",
    "topic": "Modern Theoretical Physics",
    "question": "Albert Einstein was awarded the 1921 Nobel Prize in Physics specifically for his theoretical explanation of:",
    "options": [
      {
        "key": "A",
        "label": "The Law of the Photoelectric Effect"
      },
      {
        "key": "B",
        "label": "The General Theory of Relativity"
      },
      {
        "key": "C",
        "label": "The Special Theory of Relativity"
      },
      {
        "key": "D",
        "label": "Brownian Motion"
      }
    ],
    "correctKey": "A",
    "explanation": "Einstein demonstrated that light consists of discrete energy packets (photons: E = hν) capable of ejecting electrons from metal surfaces, confirming quantum theory."
  },
  {
    "id": "gen-6-49",
    "chapterId": "note-gen-6",
    "topic": "Quantum Statistics & Indian Physics",
    "question": "Which Indian theoretical physicist collaborated with Albert Einstein in 1924 to formulate the quantum statistics describing 'Boson' particles?",
    "options": [
      {
        "key": "A",
        "label": "Satyendra Nath Bose"
      },
      {
        "key": "B",
        "label": "Homi Bhabha"
      },
      {
        "key": "C",
        "label": "Subrahmanyan Chandrasekhar"
      },
      {
        "key": "D",
        "label": "Prasanta Chandra Mahalanobis"
      }
    ],
    "correctKey": "A",
    "explanation": "S.N. Bose derived Planck's quantum law without classical electrodynamics. Einstein expanded it to atoms, predicting the Bose-Einstein Condensate (BEC)."
  },
  {
    "id": "gen-6-50",
    "chapterId": "note-gen-6",
    "topic": "Astrophysics & Nobel History",
    "question": "The 'Chandrasekhar Limit' (1.44 solar masses), defining the maximum stability mass of a white dwarf star before supernova collapse, was calculated by:",
    "options": [
      {
        "key": "A",
        "label": "Subrahmanyan Chandrasekhar (1983 Nobel Prize in Physics)"
      },
      {
        "key": "B",
        "label": "C.V. Raman"
      },
      {
        "key": "C",
        "label": "Stephen Hawking"
      },
      {
        "key": "D",
        "label": "Arthur Eddington"
      }
    ],
    "correctKey": "A",
    "explanation": "At age 19, S. Chandrasekhar combined relativity and electron degeneracy pressure to prove that dead stars exceeding 1.44 solar masses must collapse into neutron stars or black holes."
  }
];
