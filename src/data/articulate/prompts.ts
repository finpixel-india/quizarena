export type ArticulateMode = "off-the-cuff" | "deep-research";

export type ArticulateCategory =
  | "all"
  | "general"
  | "philosophy"
  | "technology"
  | "society"
  | "personal"
  | "curveballs";

export interface CategoryMeta {
  id: ArticulateCategory;
  label: string;
  emoji?: string;
  description: string;
}

export const ARTICULATE_CATEGORIES: CategoryMeta[] = [
  { id: "all", label: "General", emoji: "✦", description: "All topics across every category" },
  { id: "philosophy", label: "Philosophy", emoji: "🏛️", description: "Existential, ethical, and deep questions" },
  { id: "technology", label: "Technology", emoji: "⚡", description: "AI, digital culture, and future tech" },
  { id: "society", label: "Society", emoji: "🌐", description: "Culture, human dynamics, and communities" },
  { id: "personal", label: "Personal", emoji: "🌱", description: "Self-reflection, habits, and life lessons" },
  { id: "curveballs", label: "Curveballs", emoji: "🎲", description: "Fun, bizarre, and unorthodox speaking prompts" },
];

export interface ArticulatePrompt {
  id: string;
  title: string;
  category: ArticulateCategory;
  mode: ArticulateMode;
  context?: string;
}

export const ARTICULATE_PROMPTS: ArticulatePrompt[] = [
  /* ─────────────────────────────────────────────────────────────
     OFF THE CUFF (Rapid spark, intuitive, 1-min practice)
  ───────────────────────────────────────────────────────────── */
  // General
  { id: "otc-gen-1", title: "Voicemail", category: "general", mode: "off-the-cuff", context: "Why do we avoid calls and leave voices hanging?" },
  { id: "otc-gen-2", title: "Comfort Zone", category: "general", mode: "off-the-cuff", context: "Is staying comfortable really such a bad thing?" },
  { id: "otc-gen-3", title: "First Impressions", category: "general", mode: "off-the-cuff", context: "How long does it really take to judge a person?" },
  { id: "otc-gen-4", title: "Morning Routines", category: "general", mode: "off-the-cuff", context: "Sacred ritual or productivity theater?" },
  { id: "otc-gen-5", title: "Waiting in Line", category: "general", mode: "off-the-cuff", context: "What human nature reveals when forced to queue." },
  { id: "otc-gen-6", title: "The Art of Apology", category: "general", mode: "off-the-cuff", context: "Why saying sorry is the hardest simple sentence." },
  { id: "otc-gen-7", title: "Unspoken Social Rules", category: "general", mode: "off-the-cuff", context: "The invisible boundaries everyone follows." },
  { id: "otc-gen-8", title: "Sunday Afternoons", category: "general", mode: "off-the-cuff", context: "The bittersweet threshold before Monday begins." },
  { id: "otc-gen-9", title: "Lost Items", category: "general", mode: "off-the-cuff", context: "Where do misplaced things truly vanish?" },
  { id: "otc-gen-10", title: "Silent Cafés", category: "general", mode: "off-the-cuff", context: "Alone together among coffee grinders and laptops." },

  // Philosophy
  { id: "otc-phil-1", title: "Are We Truly Free?", category: "philosophy", mode: "off-the-cuff", context: "Free will versus invisible conditioning." },
  { id: "otc-phil-2", title: "The Meaning of Enough", category: "philosophy", mode: "off-the-cuff", context: "Knowing when to stop striving." },
  { id: "otc-phil-3", title: "Fate vs. Coincidence", category: "philosophy", mode: "off-the-cuff", context: "Does everything happen for a reason?" },
  { id: "otc-phil-4", title: "Does Time Heal All Wounds?", category: "philosophy", mode: "off-the-cuff", context: "Or does it just dull our focus on the scars?" },
  { id: "otc-phil-5", title: "Can Selfishness Be Good?", category: "philosophy", mode: "off-the-cuff", context: "The thin line between self-preservation and greed." },
  { id: "otc-phil-6", title: "The Value of Solitude", category: "philosophy", mode: "off-the-cuff", context: "Why being alone is not the same as loneliness." },
  { id: "otc-phil-7", title: "The Illusion of Control", category: "philosophy", mode: "off-the-cuff", context: "How much of life can you actually steer?" },
  { id: "otc-phil-8", title: "What Defines Home?", category: "philosophy", mode: "off-the-cuff", context: "A physical coordinates or a state of mind?" },
  { id: "otc-phil-9", title: "Optimism as a Duty", category: "philosophy", mode: "off-the-cuff", context: "Choosing hope when cynicism is easier." },

  // Technology
  { id: "otc-tech-1", title: "The Dopamine Loop of Notifications", category: "technology", mode: "off-the-cuff", context: "Why a red badge holds so much psychological power." },
  { id: "otc-tech-2", title: "Living Without a Smartphone", category: "technology", mode: "off-the-cuff", context: "Could you survive 30 days disconnected?" },
  { id: "otc-tech-3", title: "The Lost Art of Remembering Numbers", category: "technology", mode: "off-the-cuff", context: "What outsourcing our memory has cost us." },
  { id: "otc-tech-4", title: "Virtual Avatars vs. Real Identities", category: "technology", mode: "off-the-cuff", context: "Who are you when no one is watching your screen?" },
  { id: "otc-tech-5", title: "Old Tech Nostalgia", category: "technology", mode: "off-the-cuff", context: "Why we miss the tactile click of physical buttons." },
  { id: "otc-tech-6", title: "Should AI Have Personalities?", category: "technology", mode: "off-the-cuff", context: "Tool or companion — where is the line?" },
  { id: "otc-tech-7", title: "Paper Books vs. E-readers", category: "technology", mode: "off-the-cuff", context: "The smell of paper versus carrying an entire library." },
  { id: "otc-tech-8", title: "Smart Home Overkill", category: "technology", mode: "off-the-cuff", context: "When turning on a light bulb requires an app update." },

  // Society
  { id: "otc-soc-1", title: "The Decline of Casual Friendships", category: "society", mode: "off-the-cuff", context: "Why spontaneous hangouts are disappearing." },
  { id: "otc-soc-2", title: "Modern Etiquette on Public Transit", category: "society", mode: "off-the-cuff", context: "Backpacks, loud speakers, and seat defense." },
  { id: "otc-soc-3", title: "Why Gossip is Universal", category: "society", mode: "off-the-cuff", context: "The glue that binds tribes or toxic entertainment?" },
  { id: "otc-soc-4", title: "The Disappearance of Third Places", category: "society", mode: "off-the-cuff", context: "Where can people exist without buying something?" },
  { id: "otc-soc-5", title: "Tipping Culture Gone Wild", category: "society", mode: "off-the-cuff", context: "Screens asking for 25% on a self-service pastry." },
  { id: "otc-soc-6", title: "Why Everyone is in a Rush", category: "society", mode: "off-the-cuff", context: "The obsession with hurry in the 21st century." },
  { id: "otc-soc-7", title: "Neighbors: Strangers or Community?", category: "society", mode: "off-the-cuff", context: "Living inches away through walls without a word." },

  // Personal
  { id: "otc-per-1", title: "A Skill You Wish You Started at Age 10", category: "personal", mode: "off-the-cuff", context: "Instrument, language, code, or sport?" },
  { id: "otc-per-2", title: "Your Most Irrational Fear", category: "personal", mode: "off-the-cuff", context: "The silly panic you can never justify logically." },
  { id: "otc-per-3", title: "The Best Advice You Never Took", category: "personal", mode: "off-the-cuff", context: "When someone was right and you refused to listen." },
  { id: "otc-per-4", title: "An Unpopular Opinion You Secretly Hold", category: "personal", mode: "off-the-cuff", context: "What truth gets you weird looks at dinner parties?" },
  { id: "otc-per-5", title: "What Makes You Lose Track of Time?", category: "personal", mode: "off-the-cuff", context: "Finding flow in the things that captivate you." },
  { id: "otc-per-6", title: "A Compliment You Will Never Forget", category: "personal", mode: "off-the-cuff", context: "Words spoken years ago that still warm your chest." },
  { id: "otc-per-7", title: "Your Relationship with Patience", category: "personal", mode: "off-the-cuff", context: "Are you a calm observer or an internal pacer?" },

  // Curveballs
  { id: "otc-curv-1", title: "Convince Me Pineapples Belong on Pizza", category: "curveballs", mode: "off-the-cuff", context: "Defend sweet and savory culinary blasphemy." },
  { id: "otc-curv-2", title: "Explain the Internet to a Medieval Peasant", category: "curveballs", mode: "off-the-cuff", context: "Light-speed invisible carrier pigeons across oceans." },
  { id: "otc-curv-3", title: "Defend Why Monday is Actually the Best Day", category: "curveballs", mode: "off-the-cuff", context: "A clean slate or weekly punishment?" },
  { id: "otc-curv-4", title: "If Animals Could Talk, Who Would Be the Rudest?", category: "curveballs", mode: "off-the-cuff", context: "Cats, seagulls, or Canadian geese?" },
  { id: "otc-curv-5", title: "Pitch a Theme Park of Mild Inconveniences", category: "curveballs", mode: "off-the-cuff", context: "Wet socks, dead phone chargers, and slow walkers." },
  { id: "otc-curv-6", title: "Invent an 8th Day of the Week", category: "curveballs", mode: "off-the-cuff", context: "What would we call it and what would be forbidden?" },
  { id: "otc-curv-7", title: "Sell Me an Invisible Umbrella", category: "curveballs", mode: "off-the-cuff", context: "Maximum salesmanship for a mythical product." },
  { id: "otc-curv-8", title: "Why Pigeons Secretly Run the World", category: "curveballs", mode: "off-the-cuff", context: "The true intelligence agency behind city squares." },

  /* ─────────────────────────────────────────────────────────────
     DEEP RESEARCH (Analytical, debate, systems thinking, 3-5 min)
  ───────────────────────────────────────────────────────────── */
  // General
  { id: "res-gen-1", title: "The Law of Small Numbers", category: "general", mode: "deep-research", context: "Why humans draw sweeping conclusions from tiny, biased sample sizes." },
  { id: "res-gen-2", title: "The Fermi Paradox & Great Filters", category: "general", mode: "deep-research", context: "Where is everybody? Are we past or ahead of our species extinction barrier?" },
  { id: "res-gen-3", title: "Goodhart's Law: When Metrics Fail", category: "general", mode: "deep-research", context: "When a measure becomes a target, it ceases to be a good measure." },
  { id: "res-gen-4", title: "The Tragedy of the Commons in Orbit", category: "general", mode: "deep-research", context: "Space debris, satellite crowding, and zero-regulation outer atmosphere." },
  { id: "res-gen-5", title: "Chesterton's Fence in Institutional Reform", category: "general", mode: "deep-research", context: "Never destroy a rule until you understand why it was built in the first place." },
  { id: "res-gen-6", title: "Dunbar's Number in the Digital Age", category: "general", mode: "deep-research", context: "Can cognitive limits survive following thousands of humans online?" },
  { id: "res-gen-7", title: "The Cobra Effect: Perverse Incentives", category: "general", mode: "deep-research", context: "How government bounties created snake breeders and economic paradoxes." },

  // Philosophy
  { id: "res-phil-1", title: "The Morality of Artificial Superintelligence", category: "philosophy", mode: "deep-research", context: "Whose values should be encoded when code governs human destiny?" },
  { id: "res-phil-2", title: "Ship of Theseus: Mind Uploading & Identity", category: "philosophy", mode: "deep-research", context: "If every neuron is simulated on silicon, does your consciousness survive?" },
  { id: "res-phil-3", title: "Utilitarianism vs. Deontology in Autonomous Vehicles", category: "philosophy", mode: "deep-research", context: "Programming life-and-death trolley dilemmas into everyday cars." },
  { id: "res-phil-4", title: "The Experience Machine: Would You Plug In?", category: "philosophy", mode: "deep-research", context: "Nozick's thought experiment on pleasure versus authenticity." },
  { id: "res-phil-5", title: "Determinism and the Legitimacy of Criminal Justice", category: "philosophy", mode: "deep-research", context: "If neuroscience eliminates free will, does punishment become retribution or rehabilitation?" },
  { id: "res-phil-6", title: "Rawlsian Veil of Ignorance in AI Governance", category: "philosophy", mode: "deep-research", context: "Designing algorithms assuming you could be the most vulnerable user affected." },

  // Technology
  { id: "res-tech-1", title: "The Alignment Problem in Frontier AI Models", category: "technology", mode: "deep-research", context: "Bridging the gap between what humans ask for and what humanity truly intends." },
  { id: "res-tech-2", title: "Quantum Advantage vs. Classical Cryptography", category: "technology", mode: "deep-research", context: "The ticking clock on RSA encryption and the dawn of post-quantum standards." },
  { id: "res-tech-3", title: "Decentralized Governance: Promise vs. Reality", category: "technology", mode: "deep-research", context: "Do DAOs eliminate corruption or merely reinvent oligarchy with tokens?" },
  { id: "res-tech-4", title: "Neurotechnology & Mental Privacy Protections", category: "technology", mode: "deep-research", context: "When thoughts, EEG waves, and attentional focus become commercial data." },
  { id: "res-tech-5", title: "Compute Infrastructure & Global Energy Grids", category: "technology", mode: "deep-research", context: "Balancing gigawatt data centers against national decarbonization targets." },
  { id: "res-tech-6", title: "Synthetic Biology: Dual-Use Hazards", category: "technology", mode: "deep-research", context: "The democratization of DNA printing: miraculous cures or biosecurity nightmares?" },

  // Society
  { id: "res-soc-1", title: "Universal Basic Income: Freedom or Stagnation?", category: "society", mode: "deep-research", context: "Severing human dignity from market labor — economic miracle or loss of purpose?" },
  { id: "res-soc-2", title: "The Loneliness Epidemic as an Architecture Failure", category: "society", mode: "deep-research", context: "How car-dependent suburbs and zoning killed natural daily human encounters." },
  { id: "res-soc-3", title: "Credentialism: Is Higher Education Signaling or Learning?", category: "society", mode: "deep-research", context: "The economic inflation of degrees and the decline of vocational mastery." },
  { id: "res-soc-4", title: "Demographic Inversion: Shrinking Global Populations", category: "society", mode: "deep-research", context: "What happens to economic growth, pensions, and innovation as birth rates fall?" },
  { id: "res-soc-5", title: "Epistemic Polarization & Algorithmic Sorting", category: "society", mode: "deep-research", context: "How personalized recommendation feeds dismantled shared factual realities." },

  // Personal
  { id: "res-per-1", title: "Metacognition: Designing Personal Feedback Loops", category: "personal", mode: "deep-research", context: "Auditing your own thinking patterns to systematically eliminate self-deception." },
  { id: "res-per-2", title: "The Architecture of Deep Work vs. Chronic Interruption", category: "personal", mode: "deep-research", context: "Why high-level cognitive synthesis is impossible in fragmented 15-minute bursts." },
  { id: "res-per-3", title: "Decision-Making Under Asymmetric Information", category: "personal", mode: "deep-research", context: "Making irreversible career and life choices when 80% of data is unknowable." },
  { id: "res-per-4", title: "The Psychology of Resilience Under Chronic Uncertainty", category: "personal", mode: "deep-research", context: "Distinguishing between stoic endurance and constructive adaptation." },

  // Curveballs
  { id: "res-curv-1", title: "Should AI Be Granted Legal Personhood Like Corporations?", category: "curveballs", mode: "deep-research", context: "Examining legal fictions, liability shields, and algorithmic ownership of assets." },
  { id: "res-curv-2", title: "Simulated Reality: What Empirical Test Could Disprove It?", category: "curveballs", mode: "deep-research", context: "Planck length limits, computational bottlenecks, and metaphysical proofs." },
  { id: "res-curv-3", title: "The Economics of Interstellar Trade: Feasible or Absurd?", category: "curveballs", mode: "deep-research", context: "What commodity could ever justify relativistic fuel costs?" },
  { id: "res-curv-4", title: "Is Silence Becoming a Luxury Good for the Wealthy?", category: "curveballs", mode: "deep-research", context: "Acoustic ecology, noise pollution in dense housing, and private sanctuaries." },
];
