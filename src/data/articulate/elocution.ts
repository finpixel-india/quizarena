export type ElocutionType = "tongue-twister" | "hard-sentence" | "vocab-dense";
export type ElocutionDifficulty = "easy" | "medium" | "hard";

export interface ElocutionTypeMeta {
  id: ElocutionType;
  label: string;
  emoji: string;
  description: string;
}

export const ELOCUTION_TYPES: ElocutionTypeMeta[] = [
  { id: "tongue-twister", label: "Tongue Twisters", emoji: "⚡", description: "Speed, vocal muscle agility, and rapid enunciation" },
  { id: "hard-sentence",  label: "Hard Sentences",  emoji: "🏛️", description: "Complex syntax, breathing cadence, and periodic sentence flow" },
  { id: "vocab-dense",    label: "Vocab Density",   emoji: "💎", description: "Expansive sentences packed with sophisticated, articulate vocabulary" },
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
     TONGUE TWISTERS (Speed, motor articulation, consonant precision)
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
    text: "She sells seashells by the seashore, and the shells she sells are surely seashells from the seashore.",
    focus: "S vs SH sibilant precision",
  },
  {
    id: "tt-e-3",
    type: "tongue-twister",
    difficulty: "easy",
    title: "Ice Cream Screams",
    text: "I scream, you scream, we all scream for ice cream on a sunny summer stream down by the green valley.",
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
    text: "A proper copper coffee pot from a proper antique copper coffee shop on a proper cobblestone corner.",
    focus: "P and K plosive crispness",
  },
  {
    id: "tt-e-6",
    type: "tongue-twister",
    difficulty: "easy",
    title: "Six Slippery Snails",
    text: "Six slippery snails slid slowly seaward across the smooth stone surface without stopping for sleep.",
    focus: "SL consonant glide",
  },

  // Medium
  {
    id: "tt-m-1",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Wicked Witch Wishes",
    text: "Which witch wished which wicked wish whilst whisking warm white winter whiskey across the windy wilderness?",
    focus: "W and WH lip rounding",
  },
  {
    id: "tt-m-2",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Peter Piper's Peppers",
    text: "Peter Piper picked a peck of pickled peppers. If Peter Piper picked a peck of pickled peppers, where's the peck of pickled peppers Peter Piper picked?",
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
    text: "Near an ear, a nearer ear, a nearly eerie ear appeared right next to her dear mirror on the southern pier.",
    focus: "Liquid R and vowel tension",
  },
  {
    id: "tt-m-6",
    type: "tongue-twister",
    difficulty: "medium",
    title: "Selfish Shellfish",
    text: "Selfish shellfish seldom share shellfish shells, so selfish shellfish shells stay strictly sealed within the sandy shallows.",
    focus: "S vs SH rapid alternations",
  },

  // Hard
  {
    id: "tt-h-1",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Pad Kid Poured Curd",
    text: "Pad kid poured curd pulled cod; a pedantic pupil picked plump purple plums promptly at the public pavilion.",
    focus: "P-K-T rapid tongue-tip shifts",
  },
  {
    id: "tt-h-2",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Warrior & Worrier",
    text: "Rory the rural warrior and Roger the rural worrier were reared wrongly in a rural brewing brewery beneath the roaring rapids.",
    focus: "Extreme liquid R acrobatics",
  },
  {
    id: "tt-h-3",
    type: "tongue-twister",
    difficulty: "hard",
    title: "The Sixth Sick Sheik",
    text: "The sixth sick sheik's sixth sheep's sick, sleek, and strikingly slender in the sizzling summer sunshine.",
    focus: "TH, S, SH, and K collision",
  },
  {
    id: "tt-h-4",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Three Free Fleas",
    text: "Through three cheese trees three free fleas flew, while freeze breeze blew through the three trees and made the three free fleas freeze.",
    focus: "THR, CH, FR, and FL transitions",
  },
  {
    id: "tt-h-5",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Solemn Silence",
    text: "To sit in solemn silence in a dull, dark dock, in a pestilential prison with a lifelong lock, awaiting the sensation of a short, sharp shock from a cheap and chippy chopper on a big black block.",
    focus: "Gilbertian cadence and S-D-P precision",
  },
  {
    id: "tt-h-6",
    type: "tongue-twister",
    difficulty: "hard",
    title: "Brave Brigadiers",
    text: "Brisk brave brigadiers brandished broad bright blades and blitzed brazenly through the bitter, blinding blizzard to breach the barricade.",
    focus: "BR and BL explosive stops",
  },

  /* ─────────────────────────────────────────────────────────────
     HARD SENTENCES (Large periodic sentences, breath control, multi-clause cadence)
  ───────────────────────────────────────────────────────────── */
  // Easy
  {
    id: "hs-e-1",
    type: "hard-sentence",
    difficulty: "easy",
    title: "The Solitary Traveler",
    text: "Though the bitter mountain wind howled fiercely through the canyon and darkness began to settle across the ridges, the solitary traveler refused to quicken his steady, deliberate pace, knowing that quiet endurance mattered far more than reckless haste.",
    focus: "Breath pacing across compound adverbial clauses",
  },
  {
    id: "hs-e-2",
    type: "hard-sentence",
    difficulty: "easy",
    title: "Before Morning Sun",
    text: "Before the morning sun could pierce the dense canopy of ancient pines, the quiet mountain valley echoed with the distant rumble of rolling thunder, prompting every villager to secure their livestock and shutter their wooden windows against the approaching storm.",
    focus: "Smooth introductory transitions into main predicate",
  },
  {
    id: "hs-e-3",
    type: "hard-sentence",
    difficulty: "easy",
    title: "Resolute Pursuit",
    text: "Neither the dazzling promise of sudden prestige nor the looming threat of prolonged social isolation could deter her resolute pursuit of scientific truth, for she recognized that genuine discovery demands unwavering loyalty to empirical evidence above all popular acclaim.",
    focus: "Correlative 'neither/nor' rhythmic balance across clauses",
  },
  {
    id: "hs-e-4",
    type: "hard-sentence",
    difficulty: "easy",
    title: "The Final Bell",
    text: "As the final bronze bell tolled solemnly across the stone courtyard of the ancient monastery, every scholar paused in profound, expectant silence, carefully setting aside their parchment scrolls before stepping into the gentle evening rain together.",
    focus: "Deliberate comma cadence and participial flow",
  },

  // Medium
  {
    id: "hs-m-1",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Diplomatic Composure",
    text: "The seasoned diplomat navigated the volatile international summit with remarkable composure, deftly neutralizing hostile accusations from rival factions while painstakingly constructing a balanced framework of compromise before the fragile ceasefire could dissolve into open diplomatic rancor.",
    focus: "Cadence control across adverbial and participial clauses",
  },
  {
    id: "hs-m-2",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Structural Resonance",
    text: "Had the structural engineers anticipated the catastrophic harmonic resonance triggered by the unprecedented crosswinds, the suspension bridge might well have withstood the oceanic gale; however, decades of regulatory complacency had blinded the oversight committee to warnings repeatedly sounded by independent metallurgists.",
    focus: "Inverted conditional cadence into antithetical semicolon clause",
  },
  {
    id: "hs-m-3",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Museum Provenance",
    text: "Beneath the museum's serene classical facade lay decades of bitterly disputed provenance, questionable cross-border acquisitions during colonial conflicts, and heavily classified archival dossiers that consecutive generations of curators had vehemently refused to disclose to international restitution tribunals.",
    focus: "Tripartite parallel list delivery under sustained breath",
  },
  {
    id: "hs-m-4",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Terrestrial Limits",
    text: "While theoretical astrophysicists continuously formulate elegant multi-dimensional models to explain dark matter, empirical validation remains rigorously constrained by the technological sensitivity of our terrestrial observatories, forcing researchers to wait decades for observational confirmation.",
    focus: "Polysyllabic cadence, subordinate contrast, and breathing control",
  },
  {
    id: "hs-m-5",
    type: "hard-sentence",
    difficulty: "medium",
    title: "The Royal Assembly",
    text: "Even as the royal ministers debated the economic ramifications of the newly enacted maritime tariffs, an uneasy murmur swept through the assembled courtiers, who understood that any disruption to transatlantic commerce would inevitably ignite peasant rebellions across the southern provinces.",
    focus: "Subordinate concession leading into restrictive relative clauses",
  },
  {
    id: "hs-m-6",
    type: "hard-sentence",
    difficulty: "medium",
    title: "Constitutional Mandate",
    text: "By explicitly separating judicial review from executive prerogative, the framers sought to construct a self-correcting constitutional republic wherein no transient political majority, regardless of its electoral fervor, could abrogate the fundamental liberties guaranteed to individual citizens.",
    focus: "Prepositional opening into complex parenthetical interruption",
  },

  // Hard
  {
    id: "hs-h-1",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Enigmatic Scholar",
    text: "Although the enigmatic philosopher had repeatedly and vehemently disavowed all ideological affiliation with the clandestine academy during an uncharacteristically impassioned symposium in Geneva, he inadvertently corroborated their most scrutinized ontological axiom when cross-examined by an unrelenting panel of logicians, whose piercing skepticism laid bare not only the deep metaphysical contradictions inherent in his newly published thesis, but also the startling reality that his entire epistemological worldview rested upon the very presuppositions he had spent four decades publicly attempting to dismantle.",
    focus: "Nested concessive appositive breath pacing and correlative 'not only... but also' cadence",
  },
  {
    id: "hs-h-2",
    type: "hard-sentence",
    difficulty: "hard",
    title: "Fiscal Austerity",
    text: "Notwithstanding the unprecedented fiscal austerity implemented throughout the metropolitan province—an emergency stabilization program ostensibly engineered to eliminate sovereign deficits within three fiscal quarters through aggressive expenditure reductions—administrative redundancies continued to proliferate at an unsustainable cadence, compelling senior treasury ministers to draft punitive emergency measures that not only threatened municipal healthcare networks, but also risked alienating the moderate parliamentary coalitions whose legislative backing remained utterly indispensable for preserving national creditworthiness in the face of volatile global bond markets.",
    focus: "Em-dash parenthetical suspension, subordinate consequence, and sustained polysyllabic momentum",
  },
  {
    id: "hs-h-3",
    type: "hard-sentence",
    difficulty: "hard",
    title: "Conscious Inquiry",
    text: "Whether human subjective consciousness arises from microscopic quantum coherence within biological microtubules or develops strictly as an emergent computational property of billions of synaptic connections firing across complex cortical networks remains humanity’s most intoxicating, enduring, and philosophically contentious inquiry—an unresolved existential conundrum that continues to confound empirical neurobiologists and speculative metaphysicians alike, while fundamentally challenging our prevailing legal doctrines regarding intentionality, moral culpability, and the prospective rights of synthetic sentient entities.",
    focus: "Substantive noun-clause subject, em-dash appositive suspension, and tripartite closing cadence",
  },
  {
    id: "hs-h-4",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Fragile Armistice",
    text: "Amidst the catastrophic thunder of border artillery and an escalating spiral of geopolitical brinkmanship that had brought neighboring superpowers to the precipice of mutually assured destruction, the exhausted diplomatic corps persevered through three grueling weeks of nocturnal negotiations, painstakingly drafting a comprehensive thirty-point armistice that reconciled century-old territorial grievances, demilitarized disputed oceanic straits under international maritime oversight, and averted an irrevocable continental catastrophe through sheer oratorical perseverance, disciplined composure, and unprecedented mutual concessions.",
    focus: "Prepositional temporal opening into tripartite parallel verb phrases requiring sustained diaphragm support",
  },
  {
    id: "hs-h-5",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Revolutionary Archive",
    text: "Although subsequent historical revisions have frequently characterized the Great Autumnal Uprising as a spontaneous, uncoordinated revolt mounted exclusively by impoverished agrarian laborers and disenfranchised urban artisans, newly deciphered diplomatic dossiers discovered within the imperial chancellery demonstrate conclusively that the insurrection was systematically orchestrated, funded through illicit merchant cartels, and tactically directed by a clandestine coalition of disaffected aristocratic officers who operated discreetly from neutral border provinces to dismantle the monarchy's feudal monopolies without jeopardizing their own hereditary estates.",
    focus: "Sustained subordinate contrast followed by tripartite passive verbs and relative restrictive clause",
  },
  {
    id: "hs-h-6",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Ecological Dilemma",
    text: "Insofar as contemporary industrial civilization remains inextricably tethered to the relentless extraction and combustion of finite subterranean fossil reserves, the international community confronts an agonizing existential trilemma: either mandate draconian regulatory decarbonization that imperils immediate economic stability across developing nations, finance speculative planetary geo-engineering technologies that carry catastrophic atmospheric risks, or court an irreversible trajectory of ecological disruption that will permanently displace coastal civilizations and impoverish the global biosphere for generations to come.",
    focus: "Correlative trilemma structure separated by colons and disjunctions under periodic rhetorical pressure",
  },
  {
    id: "hs-h-7",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Jurisprudential Dilemma",
    text: "By steadfastly refusing to interpret constitutional guarantees through the narrow prism of contemporary partisan expediency, the dissenting supreme magistrate delivered an eighty-page opinion of towering intellectual clarity, arguing passionately that once fundamental civil protections are subordinated to transient legislative majorities under the guise of temporary emergency measures, the structural integrity of the republic suffers an irreparable wound from which neither executive contrition nor subsequent judicial reinterpretation can ever truly recover.",
    focus: "Participial introductory clause leading into hypotactic subordinate progression and correlative neither/nor cadence",
  },
  {
    id: "hs-h-8",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Architecture of Oblivion",
    text: "Wandering through the crumbling colosseum at twilight, where ancient marble archways cast long, melancholic shadows across desolate cobblestones once trodden by triumphant Roman legions, the solitary antiquarian couldn't help but marvel at the unrelenting vanity of human ambition—a poignant realization that even the mightiest empires, whose monumental edifices were constructed to withstand eternity itself, eventually dissolve into quiet ruins, leaving behind only fractured inscriptions and weathered statues for distant descendants to decipher amid the whispering wind.",
    focus: "Emotive periodic suspension with relative descriptive clauses and soft terminal alliteration",
  },
  {
    id: "hs-h-9",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Quantum Singularity",
    text: "Even after half a century of rigorous mathematical modeling and trillions of dollars invested in subterranean particle colliders, theoretical physicists still cannot definitively reconcile general relativity’s smooth geometric curvature of spacetime with the erratic, probabilistic indeterminacy governing the subatomic quantum realm—a baffling intellectual stalemate that compels leading cosmologists to acknowledge that our prevailing conceptions of time, space, and physical causality may represent merely superficial approximations of a far more intricate, higher-dimensional reality that currently eludes empirical instrumentation.",
    focus: "Concessive adverbial clause into appositive em-dash suspension and polysyllabic terminology",
  },
  {
    id: "hs-h-10",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Venetian Ledger",
    text: "Upon unsealing the humidity-damaged leather dispatch case recovered from the sunken seventeenth-century Venetian galleon, maritime archivists discovered an astonishingly well-preserved ledger of Mediterranean commerce, containing meticulously detailed inventories of Levantine spice shipments, astronomical navigational logs, and encrypted diplomatic correspondence that conclusively proved the merchant vessel was doubling as a clandestine reconnaissance platform deployed by the Doge’s inner circle to monitor Ottoman naval deployments throughout the Aegean archipelago.",
    focus: "Participial temporal setup into multi-tiered descriptive object list and polysyllabic historical cadence",
  },
  {
    id: "hs-h-11",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Algorithmic Panopticon",
    text: "As autonomous predictive algorithms increasingly determine credit authorizations, penal sentencing recommendations, and employment hiring pipelines across multinational corporations, legal scholars and computational ethicists vigorously caution that democratic society is sleepwalking into an insidious digital panopticon—a computerized regime wherein historic structural prejudices are mathematically canonized into opaque proprietary models that execute automated decisions with chilling precision, yet remain utterly insulated from citizen oversight, constitutional accountability, or judicial redress.",
    focus: "Temporal subordinate opening into metaphoric appositive clause and tripartite prepositional cadence",
  },
  {
    id: "hs-h-12",
    type: "hard-sentence",
    difficulty: "hard",
    title: "The Symphony of the Cosmos",
    text: "Standing beneath the pristine crystalline darkness of the Atacama Desert plateau while gazing into the breathtaking luminosity of the galactic core, the solitary astronomer experiences an overwhelming wave of philosophical humility, recognizing that all recorded human history—our bloodiest wars, our greatest philosophical triumphs, and our deepest poetic yearnings—has transpired upon a minuscule rocky speck suspended in a silent, indifferent celestial ocean spanning billions of light-years across unfathomable aeons of cosmic time.",
    focus: "Participial contemplative introduction, parenthetical em-dash catalogue, and majestic periodic conclusion",
  },

  /* ─────────────────────────────────────────────────────────────
     VOCAB DENSITY (Expansive, elegant sentences packed with advanced vocabulary)
  ───────────────────────────────────────────────────────────── */
  // Easy
  {
    id: "vd-e-1",
    type: "vocab-dense",
    difficulty: "easy",
    title: "Candid Appraisal",
    text: "Her candid remarks regarding the executive council's chronic procrastination disarmed the skeptical assembly, steadily transforming their palpable apprehension into an earnest willingness to embrace pragmatic structural reforms.",
    focus: "Candid, procrastination, palpable, pragmatic",
    keyWords: ["candid", "procrastination", "palpable", "pragmatic"],
  },
  {
    id: "vd-e-2",
    type: "vocab-dense",
    difficulty: "easy",
    title: "Pragmatic Demeanor",
    text: "His persistent diligence and pragmatic demeanor steadily dismantled every institutional impediment encountered throughout his demanding trajectory, proving that unyielding perseverance frequently surpasses innate genius in overcoming bureaucratic adversity.",
    focus: "Diligence, pragmatic, impediment, trajectory, adversity",
    keyWords: ["diligence", "pragmatic", "impediment", "trajectory", "adversity"],
  },
  {
    id: "vd-e-3",
    type: "vocab-dense",
    difficulty: "easy",
    title: "Sudden Epiphany",
    text: "The sudden epiphany experienced during his solitary walk rendered previous professional anxieties utterly trivial, endowing him with an unshakeable sense of philosophical serenity and renewed moral clarity.",
    focus: "Epiphany, trivial, endowing, serenity",
    keyWords: ["epiphany", "trivial", "endowing", "serenity"],
  },
  {
    id: "vd-e-4",
    type: "vocab-dense",
    difficulty: "easy",
    title: "Transient Pleasures",
    text: "Such transient material pleasures invariably pale in comparison to the profound equanimity cultivated through disciplined contemplation, intellectual humility, and an enduring commitment to benevolence toward one's fellow citizens.",
    focus: "Transient, equanimity, contemplation, benevolence",
    keyWords: ["transient", "equanimity", "contemplation", "benevolence"],
  },

  // Medium
  {
    id: "vd-m-1",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Disingenuous Facade",
    text: "His ostensibly altruistic benevolence was merely an ingenious facade designed to obfuscate his avaricious ambitions from unsuspecting peers, allowing him to quietly consolidate influence while masquerading as an unpretentious philanthropist.",
    focus: "Ostensibly, altruistic, obfuscate, avaricious, masquerading",
    keyWords: ["ostensibly", "altruistic", "obfuscate", "avaricious", "masquerading"],
  },
  {
    id: "vd-m-2",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Luminous Serendipity",
    text: "The author's poignant memoir masterfully juxtaposes pervasive melancholy with unexpected moments of luminous serendipity, inviting readers to perceive profound transcendent beauty even amidst the mundane sorrows of human transience.",
    focus: "Poignant, juxtaposes, melancholy, serendipity, transience",
    keyWords: ["poignant", "juxtaposes", "melancholy", "luminous", "serendipity", "transience"],
  },
  {
    id: "vd-m-3",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Insatiable Curiosity",
    text: "An insatiable intellectual curiosity compelled the maverick scientist to relentlessly scrutinize dogmatic paradigms that his complacent contemporaries had long accepted without question, ultimately precipitating an unprecedented conceptual revolution across evolutionary biology.",
    focus: "Insatiable, scrutinize, dogmatic, paradigms, precipitating",
    keyWords: ["insatiable", "scrutinize", "dogmatic", "paradigms", "precipitating"],
  },
  {
    id: "vd-m-4",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Circuitous Rhetoric",
    text: "The senator's circuitous rhetoric served only to exacerbate public skepticism, leaving seasoned journalists convinced that the administration was actively attempting to conceal widespread ethical malfeasance beneath a veneer of patriotic platitudes.",
    focus: "Circuitous, rhetoric, exacerbate, malfeasance, platitudes",
    keyWords: ["circuitous", "rhetoric", "exacerbate", "malfeasance", "platitudes"],
  },
  {
    id: "vd-m-5",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Ephemeral Hubris",
    text: "Blinded by ephemeral prosperity and intoxicated by their own hubris, the oligarchs foolishly dismissed the burgeoning social resentment that would soon culminate in the cataclysmic overthrow of their privileged regime.",
    focus: "Ephemeral, hubris, burgeoning, culminate, cataclysmic",
    keyWords: ["ephemeral", "hubris", "burgeoning", "culminate", "cataclysmic"],
  },
  {
    id: "vd-m-6",
    type: "vocab-dense",
    difficulty: "medium",
    title: "Superfluous Ostentation",
    text: "Rejecting the superfluous ostentation of modern aristocratic galas, the reclusive scholar preferred an austere existence dedicated entirely to the rigorous pursuit of classical literature and uncompromising philosophical inquiry.",
    focus: "Superfluous, ostentation, austere, rigorous, inquiry",
    keyWords: ["superfluous", "ostentation", "austere", "rigorous", "inquiry"],
  },

  // Hard
  {
    id: "vd-h-1",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Insidious Hegemony",
    text: "The autocratic magnate maintained an insidious hegemony over the commercial consortium, summarily ostracizing any independent executive who dared question his unilateral decrees, thereby fostering an atmosphere of pernicious sycophancy that ultimately precipitated their collective insolvency.",
    focus: "Autocratic, insidious, hegemony, ostracizing, pernicious, sycophancy, insolvency",
    keyWords: ["autocratic", "insidious", "hegemony", "ostracizing", "pernicious", "sycophancy", "insolvency"],
  },
  {
    id: "vd-h-2",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Ephemeral Aberration",
    text: "Far from being an ephemeral aberration easily rectified by incremental legislative reforms, the systemic malaise afflicting the republic was an indelible consequence of entrenched bureaucratic inertia, institutionalized mendacity, and profound socio-economic enervation.",
    focus: "Ephemeral, aberration, malaise, indelible, mendacity, enervation",
    keyWords: ["ephemeral", "aberration", "malaise", "indelible", "mendacity", "enervation"],
  },
  {
    id: "vd-h-3",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Eloquent Polemic",
    text: "Her eloquent polemic dismantled the specious dialectics of the modern sophists with devastating analytical incisiveness, exposing their superficial erudition while preserving an immaculate posture of unruffled equanimity and dignified restraint.",
    focus: "Polemic, specious, sophists, incisiveness, erudition, equanimity",
    keyWords: ["polemic", "specious", "sophists", "incisiveness", "erudition", "equanimity"],
  },
  {
    id: "vd-h-4",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Reductive Fallacy",
    text: "To attribute complex macroscopic socioeconomic transformations solely to fortuitous coincidences is a dangerously reductive fallacy that egregiously trivializes historical causality while obfuscating the systemic inequities underlying the societal upheaval.",
    focus: "Macroscopic, fortuitous, reductive, fallacy, egregiously, obfuscating",
    keyWords: ["macroscopic", "fortuitous", "reductive", "fallacy", "egregiously", "obfuscating"],
  },
  {
    id: "vd-h-5",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Pusillanimous Reticence",
    text: "His pusillanimous reticence in the face of flagrant demagoguery was widely condemned by peers as an unconscionable abdication of moral duty, demonstrating that timid acquiescence in times of moral crisis is tantamount to overt complicity.",
    focus: "Pusillanimous, reticence, demagoguery, unconscionable, acquiescence, tantamount",
    keyWords: ["pusillanimous", "reticence", "demagoguery", "unconscionable", "acquiescence", "tantamount"],
  },
  {
    id: "vd-h-6",
    type: "vocab-dense",
    difficulty: "hard",
    title: "Inchoate Periphrasis",
    text: "Lost in an intricate labyrinth of inchoate periphrasis and labyrinthine disquisitions, the verbose academic failed to articulate his core thesis, alienating an exhausted audience that had anticipated trenchant philosophical illumination.",
    focus: "Inchoate, periphrasis, disquisitions, verbose, trenchant",
    keyWords: ["inchoate", "periphrasis", "disquisitions", "verbose", "trenchant"],
  },
];
