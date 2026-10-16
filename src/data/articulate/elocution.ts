export type ElocutionType = "tongue-twister" | "hard-sentence" | "vocab-dense";
export type ElocutionDifficulty = "easy" | "medium" | "hard";

export interface ElocutionTypeMeta {
  id: ElocutionType;
  label: string;
  emoji: string;
  description: string;
}

export const ELOCUTION_TYPES: ElocutionTypeMeta[] = [
  { id: "tongue-twister", label: "Tongue Twisters", emoji: "⚡", description: "Speed, vocal muscle agility and sharp enunciation" },
  { id: "hard-sentence",  label: "Hard Sentences",  emoji: "🏛️", description: "Complex syntax, breathing cadence and multi-clause flow" },
  { id: "vocab-dense",    label: "Vocab Density",   emoji: "💎", description: "Sentences packed with advanced, articulate vocabulary" },
];

export interface ElocutionItem {
  id: string;
  type: ElocutionType;
  difficulty: ElocutionDifficulty;
  title: string;
  text: string;
  focus?: string;
  keyWords?: string[];
}

export const ELOCUTION_ITEMS: ElocutionItem[] = [
  /* ─────────────────────────────────────────────────────────────
     TONGUE TWISTERS (Speed, motor articulation, tricky consonants)
  ───────────────────────────────────────────────────────────── */
  // Easy
  {
    id: "tt-e-1",
    type: "tongue-twister",
    difficulty: "easy",
    title: "Red & Yellow Lorry",
    text: "Red lorry, yellow lorry, red lorry, yellow lorry, red lorry, yellow lorry.",
    focus: "R and L tongue transitions",
  },
  {
    id: "tt-e-2",
    type: "tongue-twister",
    difficulty: "easy",
    title: "Seashore Shells",
    text: "She sells seashells by the seashore, and the shells she sells are surely seashells.",
    focus: "S vs SH sibilant precision",
  },
  {
    id: "tt-e-3",
    type: "tongue-twister",
    difficulty: "easy",
    title: "Ice Cream Screams",
    text: "I scream, you scream, we all scream for ice cream on a sunny summer stream.",
    focus: "S and SCR consonant clusters",
  },
  {
    id: "tt-e-4",
    type: "tongue-twister",
    difficulty: "easy",
    title: "Fuzzy Wuzzy",
    text: "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't very fuzzy, was he?",
    focus: "F and Z buzzing friction",
  },
  {
    id: "tt-e-5",
    type: "tongue-twister",
    difficulty: "easy",
    title: "Copper Coffee Pot",
    text: "A proper copper coffee pot from a proper antique copper coffee shop.",
    focus: "P and K plosive crispness",
  },
  {
    id: "tt-e-6",
    type: "tongue-twister",
    difficulty: "easy",
    title: "Six Slippery Snails",
    text: "Six slippery snails slid slowly seaward across the smooth stone surface.",
    focus: "SL consonant glide",
  },

  // Medium
  {
    id: "tt-m-1",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Wicked Witch Wishes",
    text: "Which witch wished which wicked wish whilst whisking warm white winter whiskey?",
    focus: "W and WH lip rounding",
  },
  {
    id: "tt-m-2",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Peter Piper's Peppers",
    text: "Peter Piper picked a peck of pickled peppers. Where is the peck of pickled peppers Peter Piper picked?",
    focus: "Rapid P-P plosive control",
  },
  {
    id: "tt-m-3",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Betty's Bitter Butter",
    text: "Betty Botter bought some butter, but she said the butter's bitter; so she bought a bit of better butter to make her bitter butter better.",
    focus: "B and T flap agility",
  },
  {
    id: "tt-m-4",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Woodchuck Chucking",
    text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood? As much wood as a woodchuck would chuck if a woodchuck could chuck wood.",
    focus: "W and CH rhythmic cadence",
  },
  {
    id: "tt-m-5",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Nearly Eerie Ear",
    text: "Near an ear, a nearer ear, a nearly eerie ear appeared right next to her dear mirror.",
    focus: "Liquid R and vowel tension",
  },
  {
    id: "tt-m-6",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Selfish Shellfish",
    text: "Selfish shellfish seldom share shellfish shells, so selfish shellfish shells stay strictly sealed.",
    focus: "S vs SH rapid alternations",
  },

  // Hard
  {
    id: "tt-h-1",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Pad Kid Poured Curd",
    text: "Pad kid poured curd pulled cod; a pedantic pupil picked plump purple plums promptly at pub.",
    focus: "P-K-T rapid tongue-tip shifts",
  },
  {
    id: "tt-h-2",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Warrior & Worrier",
    text: "Rory the rural warrior and Roger the rural worrier were reared wrongly in a rural brewery.",
    focus: "Extreme liquid R acrobatics",
  },
  {
    id: "tt-h-3",
    type: "tongue-twister",
    difficulty: "hard",
    title: "The Sixth Sick Sheik",
    text: "The sixth sick sheik's sixth sheep's sick, sleek, and strikingly slender in the sun.",
    focus: "TH, S, SH, and K collision",
  },
  {
    id: "tt-h-4",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Three Free Fleas",
    text: "Through three cheese trees three free fleas flew, while freeze breeze blew and made these three trees freeze.",
    focus: "THR, CH, FR, and FL transitions",
  },
  {
    id: "tt-h-5",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Solemn Silence",
    text: "To sit in solemn silence in a dull, dark dock, in a pestilential prison with a lifelong lock, awaiting the sensation of a short, sharp shock.",
    focus: "Gilbertian cadence and S-D-P precision",
  },
  {
    id: "tt-h-6",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Brave Brigadiers",
    text: "Brisk brave brigadiers brandished broad bright blades and blitzed brazenly through the bitter blizzard.",
    focus: "BR and BL explosive stops",
  },

  /* ─────────────────────────────────────────────────────────────
     HARD SENTENCES (Cadence, multi-clause breathing, complex syntax)
  ───────────────────────────────────────────────────────────── */
  // Easy
  {
    id: "hs-e-1",
    type: "hard-sentence",
    difficulty: "easy",
    title: "The Solitary Traveler",
    text: "Though the bitter wind howled fiercely through the canyon, the solitary traveler refused to quicken his steady, deliberate pace.",
    focus: "Breath pacing across two clauses",
  },
  {
    id: "hs-e-2",
    type: "hard-sentence",
    difficulty: "easy",
    title: "Before Morning Sun",
    text: "Before the morning sun could pierce the dense forest canopy, the quiet valley echoed with a distant rumble of rolling thunder.",
    focus: "Smooth introductory clause transitions",
  },
  {
    id: "hs-e-3",
    type: "hard-sentence",
    difficulty: "easy",
    title: "Resolute Pursuit",
    text: "Neither the dazzling promise of sudden wealth nor the looming threat of social isolation could deter her resolute pursuit of scientific truth.",
    focus: "Correlative 'neither/nor' rhythmic balance",
  },
  {
    id: "hs-e-4",
    type: "hard-sentence",
    difficulty: "easy",
    title: "The Final Bell",
    text: "As the final bell tolled across the stone courtyard, every scholar paused in profound, expectant silence before stepping into the rain.",
    focus: "Pausing and emphasis on commas",
  },

  // Medium
  {
    id: "hs-m-1",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Diplomatic Composure",
    text: "The seasoned diplomat navigated the volatile summit with remarkable composure, deftly neutralizing hostile accusations before fragile consensus dissolved into rancor.",
    focus: "Cadence control through adverbial clauses",
  },
  {
    id: "hs-m-2",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Structural Resonance",
    text: "Had the structural engineers anticipated the catastrophic harmonic resonance, the suspension bridge might well have withstood the turbulent oceanic gale.",
    focus: "Inverted conditional clause cadence",
  },
  {
    id: "hs-m-3",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Museum Provenance",
    text: "Beneath the museum's serene classical facade lay decades of disputed provenance, contentious cross-border acquisitions, and heavily classified archival dossiers.",
    focus: "Tripartite parallel list delivery",
  },
  {
    id: "hs-m-4",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Terrestrial Limits",
    text: "While theoretical physics continuously formulates multidimensional geometries, empirical validation remains rigorously bounded by the sensitivity of terrestrial instrumentation.",
    focus: "Polysyllabic cadence and breathing",
  },

  // Hard
  {
    id: "hs-h-1",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Enigmatic Scholar",
    text: "The enigmatic philosopher, having vehemently disavowed all affiliation with the clandestine circle, inadvertently corroborated their most scrutinized axiom during an uncharacteristically impassioned symposium.",
    focus: "Nested appositive clause breath management",
  },
  {
    id: "hs-h-2",
    type: "hard-sentence",
    difficulty: "hard",
    title: "Fiscal Austerity",
    text: "Notwithstanding the unprecedented fiscal austerity implemented throughout the province, administrative redundancies continued to proliferate at an unsustainable, self-reinforcing cadence.",
    focus: "Opening prepositional phrase into dense polysyllables",
  },
  {
    id: "hs-h-3",
    type: "hard-sentence",
    difficulty: "hard",
    title: "Conscious Inquiry",
    text: "Whether human subjective consciousness emerges from quantum micro-tubular coherence or purely algorithmic neural computation remains humanity's most intoxicating and philosophically fraught inquiry.",
    focus: "Subject-clause complexity and sustained breath",
  },
  {
    id: "hs-h-4",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Fragile Ceasefire",
    text: "Amidst deafening cacophony and escalating geopolitical friction, the beleaguered delegation painstakingly negotiated a fragile, multifaceted ceasefire that defied every cynical prediction.",
    focus: "Alternating consonant friction and vowelled release",
  },

  /* ─────────────────────────────────────────────────────────────
     VOCAB DENSITY (Prose packed with advanced, articulate words)
  ───────────────────────────────────────────────────────────── */
  // Easy
  {
    id: "vd-e-1",
    type: "vocab-dense",
    difficulty: "easy",
    title: "Candid Remarks",
    text: "Her candid remarks disarmed the skeptical audience and steadily transformed their palpable cynicism into genuine, infectious enthusiasm.",
    focus: "Candid, palpable, cynicism",
    keyWords: ["candid", "palpable", "cynicism"],
  },
  {
    id: "vd-e-2",
    type: "vocab-dense",
    difficulty: "easy",
    title: "Pragmatic Demeanor",
    text: "His persistent diligence and pragmatic demeanor steadily dismantled every institutional obstacle encountered throughout his demanding trajectory.",
    focus: "Diligence, pragmatic, trajectory",
    keyWords: ["diligence", "pragmatic", "trajectory"],
  },
  {
    id: "vd-e-3",
    type: "vocab-dense",
    difficulty: "easy",
    title: "Sudden Epiphany",
    text: "The sudden epiphany rendered previous anxieties trivial and endowed him with an unshakeable sense of clarity and purpose.",
    focus: "Epiphany, trivial, endowed",
    keyWords: ["epiphany", "trivial", "endowed"],
  },
  {
    id: "vd-e-4",
    type: "vocab-dense",
    difficulty: "easy",
    title: "Transient Pleasures",
    text: "Such transient pleasures pale in comparison to the profound serenity cultivated through deliberate contemplation and disciplined self-restraint.",
    focus: "Transient, serenity, contemplation",
    keyWords: ["transient", "serenity", "contemplation"],
  },

  // Medium
  {
    id: "vd-m-1",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Disingenuous Facade",
    text: "His ostensibly altruistic benevolence was merely an ingenious facade designed to obfuscate his avaricious ambitions from unsuspecting peers.",
    focus: "Ostensibly, obfuscate, avaricious",
    keyWords: ["ostensibly", "benevolence", "obfuscate", "avaricious"],
  },
  {
    id: "vd-m-2",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Luminous Serendipity",
    text: "The author's poignant memoir juxtaposes profound melancholy with unexpected moments of luminous serendipity that linger long after reading.",
    focus: "Juxtaposes, melancholy, serendipity",
    keyWords: ["juxtaposes", "melancholy", "luminous", "serendipity"],
  },
  {
    id: "vd-m-3",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Insatiable Curiosity",
    text: "An insatiable intellectual curiosity compelled the researcher to scrutinize dogmatic paradigms that contemporaries accepted without question.",
    focus: "Insatiable, scrutinize, dogmatic, paradigms",
    keyWords: ["insatiable", "scrutinize", "dogmatic", "paradigms"],
  },
  {
    id: "vd-m-4",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Circuitous Rhetoric",
    text: "The politician's circuitous rhetoric served only to exacerbate public skepticism regarding the administration's claims of uncompromising transparency.",
    focus: "Circuitous, rhetoric, exacerbate",
    keyWords: ["circuitous", "rhetoric", "exacerbate"],
  },

  // Hard
  {
    id: "vd-h-1",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Insidious Hegemony",
    text: "The autocratic magnate maintained an insidious hegemony over the consortium, summarily ostracizing any subordinate who dared exhibit cognitive independence.",
    focus: "Autocratic, insidious, hegemony, ostracizing",
    keyWords: ["autocratic", "insidious", "hegemony", "ostracizing"],
  },
  {
    id: "vd-h-2",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Ephemeral Aberration",
    text: "Far from being an ephemeral aberration, the systemic malaise was an indelible consequence of bureaucratic inertia and pervasive sycophancy.",
    focus: "Ephemeral, aberration, malaise, sycophancy",
    keyWords: ["ephemeral", "aberration", "malaise", "sycophancy"],
  },
  {
    id: "vd-h-3",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Eloquent Polemic",
    text: "Her eloquent polemic dismantled the specious arguments of the sophists with devastating analytical rigor and impeccable, unruffled equanimity.",
    focus: "Polemic, specious, sophists, equanimity",
    keyWords: ["polemic", "specious", "sophists", "equanimity"],
  },
  {
    id: "vd-h-4",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Reductive Fallacy",
    text: "To attribute macroscopic socioeconomic upheavals solely to fortuitous coincidences is a reductive fallacy that egregiously trivializes historical causality.",
    focus: "Fortuitous, reductive, fallacy, egregiously",
    keyWords: ["fortuitous", "reductive", "fallacy", "egregiously"],
  },
];
