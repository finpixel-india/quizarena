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
  { id: "all", label: "General", description: "All topics across every category" },
  { id: "philosophy", label: "Philosophy", emoji: "🏛️", description: "Existential, ethical, and deep questions" },
  { id: "technology", label: "Technology", emoji: "⚡", description: "AI, digital culture, and future tech" },
  { id: "society", label: "Society", emoji: "🌐", description: "Culture, human dynamics, and communities" },
  { id: "personal", label: "Personal", emoji: "🌱", description: "Self-reflection, habits, and life lessons" },
  { id: "curveballs", label: "Curveballs", emoji: "🎲", description: "Thought-provoking curiosities and unorthodox sparks" },
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
     OFF THE CUFF (Rapid spark, intuitive, 1-3 word high-impact vocabs)
  ───────────────────────────────────────────────────────────── */
  // General
  { id: "otc-gen-1", title: "Cognitive Dissonance", category: "general", mode: "off-the-cuff", context: "The psychological tension when actions contradict our core values." },
  { id: "otc-gen-2", title: "Serendipity", category: "general", mode: "off-the-cuff", context: "Finding unexpected, fortunate value while searching for something else." },
  { id: "otc-gen-3", title: "Ephemeral", category: "general", mode: "off-the-cuff", context: "The fleeting, precious nature of moments that cannot be preserved." },
  { id: "otc-gen-4", title: "Status Quo Bias", category: "general", mode: "off-the-cuff", context: "The irrational preference for keeping things as they currently are." },
  { id: "otc-gen-5", title: "First Principles", category: "general", mode: "off-the-cuff", context: "Deconstructing assumptions down to fundamental, undeniable truths." },
  { id: "otc-gen-6", title: "Confirmation Bias", category: "general", mode: "off-the-cuff", context: "The subconscious urge to only seek evidence confirming what we believe." },
  { id: "otc-gen-7", title: "Paradox of Choice", category: "general", mode: "off-the-cuff", context: "Why having too many options paralyses decision-making and diminishes joy." },
  { id: "otc-gen-8", title: "Sunk Cost Fallacy", category: "general", mode: "off-the-cuff", context: "Refusing to quit a failing effort because of past time or money invested." },
  { id: "otc-gen-9", title: "Active Listening", category: "general", mode: "off-the-cuff", context: "Hearing to deeply comprehend rather than merely waiting to reply." },
  { id: "otc-gen-10", title: "Occam's Razor", category: "general", mode: "off-the-cuff", context: "Why the simplest explanation with fewest assumptions is usually true." },
  { id: "otc-gen-11", title: "Pareto Principle", category: "general", mode: "off-the-cuff", context: "The universal pattern where 80 percent of outcomes stem from 20 percent of causes." },
  { id: "otc-gen-12", title: "Procrastination", category: "general", mode: "off-the-cuff", context: "The emotional conflict between immediate relief and long-term consequence." },

  // Philosophy
  { id: "otc-phil-1", title: "Stoicism", category: "philosophy", mode: "off-the-cuff", context: "Focusing strictly on internal reaction when external outcomes are uncontrollable." },
  { id: "otc-phil-2", title: "Equanimity", category: "philosophy", mode: "off-the-cuff", context: "Maintaining unshakeable mental composure in the face of sudden crisis." },
  { id: "otc-phil-3", title: "Memento Mori", category: "philosophy", mode: "off-the-cuff", context: "How remembering mortality brings urgent clarity to everyday choices." },
  { id: "otc-phil-4", title: "Nihilism", category: "philosophy", mode: "off-the-cuff", context: "The absence of objective meaning: a source of despair or total freedom?" },
  { id: "otc-phil-5", title: "Solipsism", category: "philosophy", mode: "off-the-cuff", context: "The radical philosophical doubt that anything exists outside your own mind." },
  { id: "otc-phil-6", title: "Altruism", category: "philosophy", mode: "off-the-cuff", context: "Does pure selflessness exist, or is all goodwill secretly self-benefiting?" },
  { id: "otc-phil-7", title: "Amor Fati", category: "philosophy", mode: "off-the-cuff", context: "Not merely tolerating hardships, but enthusiastically loving your fate." },
  { id: "otc-phil-8", title: "Eudaimonia", category: "philosophy", mode: "off-the-cuff", context: "Human flourishing achieved through moral virtue rather than fleeting hedonism." },
  { id: "otc-phil-9", title: "Determinism", category: "philosophy", mode: "off-the-cuff", context: "If physical causality governs the universe, is free will merely an illusion?" },
  { id: "otc-phil-10", title: "Catharsis", category: "philosophy", mode: "off-the-cuff", context: "The profound emotional purification sparked by tragedy, art, or honesty." },
  { id: "otc-phil-11", title: "Moral Relativism", category: "philosophy", mode: "off-the-cuff", context: "Are ethical truths universal or just arbitrary cultural conventions?" },

  // Technology
  { id: "otc-tech-1", title: "Attention Economy", category: "technology", mode: "off-the-cuff", context: "When human focus and consciousness become the most exploited commodity." },
  { id: "otc-tech-2", title: "Digital Detox", category: "technology", mode: "off-the-cuff", context: "The mental friction and liberation of stepping away from screens." },
  { id: "otc-tech-3", title: "Surveillance Capitalism", category: "technology", mode: "off-the-cuff", context: "Monetizing private human experience as behavioral raw material." },
  { id: "otc-tech-4", title: "Techno-Optimism", category: "technology", mode: "off-the-cuff", context: "The conviction that human ingenuity can engineer a solution to every crisis." },
  { id: "otc-tech-5", title: "Algorithmic Feeds", category: "technology", mode: "off-the-cuff", context: "How automated recommendation engines subtly reshape human taste and belief." },
  { id: "otc-tech-6", title: "Planned Obsolescence", category: "technology", mode: "off-the-cuff", context: "Designing hardware to prematurely fail and compel endless consumption." },
  { id: "otc-tech-7", title: "Automation Anxiety", category: "technology", mode: "off-the-cuff", context: "The existential dread of human labor being rendered obsolete by machines." },
  { id: "otc-tech-8", title: "Digital Footprint", category: "technology", mode: "off-the-cuff", context: "The indelible trail of personal data left across online services." },
  { id: "otc-tech-9", title: "Dopamine Loops", category: "technology", mode: "off-the-cuff", context: "How micro-rewards and notifications rewire the human reward pathway." },
  { id: "otc-tech-10", title: "Virtual Personhood", category: "technology", mode: "off-the-cuff", context: "The boundary between authentic human identity and curated digital avatars." },

  // Society
  { id: "otc-soc-1", title: "Echo Chambers", category: "society", mode: "off-the-cuff", context: "How intellectual silos amplify dogmatism and dismantle civil consensus." },
  { id: "otc-soc-2", title: "Social Fabric", category: "society", mode: "off-the-cuff", context: "The invisible bonds of civic trust and mutual goodwill that hold society together." },
  { id: "otc-soc-3", title: "Hyper-Individualism", category: "society", mode: "off-the-cuff", context: "When individual ambition displaces communal responsibility and empathy." },
  { id: "otc-soc-4", title: "Bystander Effect", category: "society", mode: "off-the-cuff", context: "The psychological diffusion of responsibility in crowded emergencies." },
  { id: "otc-soc-5", title: "Status Anxiety", category: "society", mode: "off-the-cuff", context: "The relentless fear of being judged as unsuccessful in the social hierarchy." },
  { id: "otc-soc-6", title: "Meritocracy", category: "society", mode: "off-the-cuff", context: "Is success truly earned through talent and effort, or driven by hidden privilege?" },
  { id: "otc-soc-7", title: "Tribalism", category: "society", mode: "off-the-cuff", context: "The ancient human instinct to divide communities into in-groups and out-groups." },
  { id: "otc-soc-8", title: "Civic Virtue", category: "society", mode: "off-the-cuff", context: "The duties and moral habits expected of citizens in a democratic republic." },
  { id: "otc-soc-9", title: "Cultural Hegemony", category: "society", mode: "off-the-cuff", context: "How dominant social classes dictate cultural norms and worldview." },
  { id: "otc-soc-10", title: "Third Places", category: "society", mode: "off-the-cuff", context: "The vanishing physical spaces outside home and work where community thrives." },

  // Personal
  { id: "otc-per-1", title: "Imposter Syndrome", category: "personal", mode: "off-the-cuff", context: "Feeling like an unqualified fraud despite proven competence and accolades." },
  { id: "otc-per-2", title: "Antifragility", category: "personal", mode: "off-the-cuff", context: "Systems and people that grow stronger and more capable when exposed to stress." },
  { id: "otc-per-3", title: "Hedonic Treadmill", category: "personal", mode: "off-the-cuff", context: "Why emotional satisfaction rapidly resets to baseline following major triumphs." },
  { id: "otc-per-4", title: "Radical Candor", category: "personal", mode: "off-the-cuff", context: "Caring deeply about someone while challenging them directly without malice." },
  { id: "otc-per-5", title: "Locus of Control", category: "personal", mode: "off-the-cuff", context: "Believing destiny is steered by internal effort versus external forces." },
  { id: "otc-per-6", title: "Flow State", category: "personal", mode: "off-the-cuff", context: "The euphoric mental state where time dissolves and focus becomes effortless." },
  { id: "otc-per-7", title: "Metacognition", category: "personal", mode: "off-the-cuff", context: "The discipline of actively auditing your own thought processes and biases." },
  { id: "otc-per-8", title: "Emotional Agility", category: "personal", mode: "off-the-cuff", context: "Navigating difficult thoughts and emotions with flexibility rather than denial." },
  { id: "otc-per-9", title: "Vulnerability", category: "personal", mode: "off-the-cuff", context: "The courage to reveal authentic truth when outcomes cannot be guaranteed." },
  { id: "otc-per-10", title: "Grit", category: "personal", mode: "off-the-cuff", context: "The potent combination of sustained passion and perseverance toward long goals." },

  // Curveballs
  { id: "otc-curv-1", title: "Schadenfreude", category: "curveballs", mode: "off-the-cuff", context: "The secret, guilty satisfaction derived from another person's misfortune." },
  { id: "otc-curv-2", title: "Sonder", category: "curveballs", mode: "off-the-cuff", context: "The sudden realization that every stranger lives a life as complex as your own." },
  { id: "otc-curv-3", title: "Defamiliarization", category: "curveballs", mode: "off-the-cuff", context: "Viewing mundane everyday objects as if encountering them for the first time." },
  { id: "otc-curv-4", title: "Déjà Vu", category: "curveballs", mode: "off-the-cuff", context: "The uncanny neurological sensation that a new experience has already been lived." },
  { id: "otc-curv-5", title: "Petrichor", category: "curveballs", mode: "off-the-cuff", context: "The distinct earthy scent of rain hitting parched soil, and why it stirs nostalgia." },
  { id: "otc-curv-6", title: "Lucid Dreaming", category: "curveballs", mode: "off-the-cuff", context: "Waking into conscious awareness inside the architecture of your own dream." },
  { id: "otc-curv-7", title: "Semantic Satiation", category: "curveballs", mode: "off-the-cuff", context: "When repeating a single word renders it into meaningless acoustic gibberish." },
  { id: "otc-curv-8", title: "Pareidolia", category: "curveballs", mode: "off-the-cuff", context: "The brain's tendency to perceive recognizable human faces in inanimate shapes." },
  { id: "otc-curv-9", title: "Tsundoku", category: "curveballs", mode: "off-the-cuff", context: "The art of collecting books and allowing them to accumulate unread." },
  { id: "otc-curv-10", title: "Cryptesthesia", category: "curveballs", mode: "off-the-cuff", context: "An intuitive sixth sense or subconscious perception of hidden reality." },

  /* ─────────────────────────────────────────────────────────────
     DEEP RESEARCH (Analytical, systems thinking, 1-3 word rigorous vocabs)
  ───────────────────────────────────────────────────────────── */
  // General
  { id: "res-gen-1", title: "Goodhart's Law", category: "general", mode: "deep-research", context: "When a measurement metric becomes a target, it ceases to be an effective measure." },
  { id: "res-gen-2", title: "Tragedy of Commons", category: "general", mode: "deep-research", context: "Shared resources depleted by individuals acting purely in rational self-interest." },
  { id: "res-gen-3", title: "Chesterton's Fence", category: "general", mode: "deep-research", context: "Never abolish an existing rule or institution until you grasp why it was established." },
  { id: "res-gen-4", title: "Dunbar's Number", category: "general", mode: "deep-research", context: "The biological cognitive ceiling restricting stable human social groups to around 150." },
  { id: "res-gen-5", title: "Cobra Effect", category: "general", mode: "deep-research", context: "When an intervention inadvertently exacerbates the original crisis through perverse incentives." },
  { id: "res-gen-6", title: "Diminishing Returns", category: "general", mode: "deep-research", context: "The inflection point where each incremental input yields progressively smaller output." },
  { id: "res-gen-7", title: "Emergence Theory", category: "general", mode: "deep-research", context: "How simple microscopic interactions spontaneously produce complex macroscopic order." },
  { id: "res-gen-8", title: "Entropy", category: "general", mode: "deep-research", context: "The irreversible thermodynamic tendency of isolated systems toward decay and disorder." },
  { id: "res-gen-9", title: "Asymmetric Information", category: "general", mode: "deep-research", context: "Market failure arising when one transaction party holds vital private insight." },
  { id: "res-gen-10", title: "Zero-Sum Game", category: "general", mode: "deep-research", context: "Mathematical competitive dynamics where one participant's victory demands an exact loss." },

  // Philosophy
  { id: "res-phil-1", title: "Ship of Theseus", category: "philosophy", mode: "deep-research", context: "If every component of an entity is gradually replaced, does its core identity endure?" },
  { id: "res-phil-2", title: "Trolley Problem", category: "philosophy", mode: "deep-research", context: "Utilitarian calculation versus deontological moral duties in life-and-death dilemmas." },
  { id: "res-phil-3", title: "Veil of Ignorance", category: "philosophy", mode: "deep-research", context: "Designing just societal rules assuming you could occupy the most vulnerable status." },
  { id: "res-phil-4", title: "Simulation Hypothesis", category: "philosophy", mode: "deep-research", context: "The metaphysical proposition that our universe is an advanced computer simulation." },
  { id: "res-phil-5", title: "Panpsychism", category: "philosophy", mode: "deep-research", context: "The philosophical doctrine that consciousness is a fundamental property of matter." },
  { id: "res-phil-6", title: "Epistemic Injustice", category: "philosophy", mode: "deep-research", context: "When someone's testimony or lived truth is systematically discounted due to bias." },
  { id: "res-phil-7", title: "Absurdism", category: "philosophy", mode: "deep-research", context: "Albert Camus's pursuit of authentic meaning in an indifferent, silent universe." },
  { id: "res-phil-8", title: "Experience Machine", category: "philosophy", mode: "deep-research", context: "Robert Nozick's paradox: choosing simulated paradise over the raw struggle of reality." },
  { id: "res-phil-9", title: "Categorical Imperative", category: "philosophy", mode: "deep-research", context: "Immanuel Kant's test: acting only on maxims you would want as universal moral law." },

  // Technology
  { id: "res-tech-1", title: "Quantum Supremacy", category: "technology", mode: "deep-research", context: "Programmable quantum processors calculating tasks intractable for classical supercomputers." },
  { id: "res-tech-2", title: "Alignment Problem", category: "technology", mode: "deep-research", context: "Ensuring autonomous artificial superintelligence shares and safeguards human values." },
  { id: "res-tech-3", title: "Post-Quantum Cryptography", category: "technology", mode: "deep-research", context: "Constructing mathematical encryption protocols immune to future quantum decryption." },
  { id: "res-tech-4", title: "Synthetic Biology", category: "technology", mode: "deep-research", context: "Engineering artificial DNA sequences and cellular machinery for human application." },
  { id: "res-tech-5", title: "Singularity", category: "technology", mode: "deep-research", context: "The runaway theoretical event horizon where recursive self-improving AI surpasses humanity." },
  { id: "res-tech-6", title: "Neurotechnology", category: "technology", mode: "deep-research", context: "Brain-machine interfaces and the uncharted boundary of cognitive neural privacy." },
  { id: "res-tech-7", title: "Distributed Consensus", category: "technology", mode: "deep-research", context: "How decentralized nodes agree on state without reliance on central authorities." },
  { id: "res-tech-8", title: "Zero-Knowledge Proofs", category: "technology", mode: "deep-research", context: "Proving cryptographic validity of confidential data without disclosing the data itself." },
  { id: "res-tech-9", title: "Neuromorphic Computing", category: "technology", mode: "deep-research", context: "Designing silicon microchips mirroring the neural and synaptic architecture of the human brain." },
  { id: "res-tech-10", title: "Algorithmic Monoculture", category: "technology", mode: "deep-research", context: "Systemic vulnerability created when global infrastructure relies on uniform models." },

  // Society
  { id: "res-soc-1", title: "Universal Basic Income", category: "society", mode: "deep-research", context: "Unconditional cash stipends severing survival from market labor in an automated era." },
  { id: "res-soc-2", title: "Demographic Inversion", category: "society", mode: "deep-research", context: "Economic, fiscal, and cultural impacts of collapsing fertility rates across developed nations." },
  { id: "res-soc-3", title: "Epistemic Polarization", category: "society", mode: "deep-research", context: "The breakdown of shared objective reality driven by personalized algorithmic media." },
  { id: "res-soc-4", title: "Credentialism", category: "society", mode: "deep-research", context: "The institutional reliance on academic degrees as economic signals over demonstrated competence." },
  { id: "res-soc-5", title: "Circular Economy", category: "society", mode: "deep-research", context: "Redesigning industrial systems to eliminate waste by keeping raw materials in perpetual reuse." },
  { id: "res-soc-6", title: "Urban Sprawl", category: "society", mode: "deep-research", context: "How car-centric spatial zoning dissolved natural neighborhood encounters and walkable communities." },
  { id: "res-soc-7", title: "Gentrification", category: "society", mode: "deep-research", context: "Capital reinvestment in urban cores causing displacement of longtime working-class communities." },
  { id: "res-soc-8", title: "Brain Drain", category: "society", mode: "deep-research", context: "The economic consequences of high-skilled human capital emigrating from developing regions." },
  { id: "res-soc-9", title: "Surveillance State", category: "society", mode: "deep-research", context: "The creeping normalization of state surveillance and facial biometric tracking." },
  { id: "res-soc-10", title: "Institutional Decay", category: "society", mode: "deep-research", context: "The generational erosion of public trust, procedural integrity, and civic competence." },

  // Personal
  { id: "res-per-1", title: "Deep Work", category: "personal", mode: "deep-research", context: "The disciplined capacity to maintain distraction-free focus on cognitively demanding problems." },
  { id: "res-per-2", title: "Neuroplasticity", category: "personal", mode: "deep-research", context: "The human brain's remarkable capacity to rewire structural neural circuits across adulthood." },
  { id: "res-per-3", title: "Growth Mindset", category: "personal", mode: "deep-research", context: "The cognitive belief that intellectual mastery expands through deliberate practice and feedback." },
  { id: "res-per-4", title: "Burnout Syndrome", category: "personal", mode: "deep-research", context: "The neurochemical and psychological exhaustion triggered by chronic, unresolved workplace strain." },
  { id: "res-per-5", title: "Delayed Gratification", category: "personal", mode: "deep-research", context: "The profound psychological ability to forego immediate dopamine for compounding future value." },
  { id: "res-per-6", title: "Cognitive Load", category: "personal", mode: "deep-research", context: "Managing limited working memory capacity to prevent decision fatigue and mental paralysis." },
  { id: "res-per-7", title: "Habit Stacking", category: "personal", mode: "deep-research", context: "Anchoring a desired new behavior onto an already entrenched automatic neural routine." },
  { id: "res-per-8", title: "Self-Efficacy", category: "personal", mode: "deep-research", context: "An individual's deep-seated conviction in their capacity to master adversity and achieve goals." },
  { id: "res-per-9", title: "Restorative Sleep", category: "personal", mode: "deep-research", context: "The neurobiological role of slow-wave sleep and glymphatic clearance in cognitive performance." },
  { id: "res-per-10", title: "Emotional Regulation", category: "personal", mode: "deep-research", context: "Consciously modulating emotional volatility through cognitive reappraisal and mindfulness." },

  // Curveballs
  { id: "res-curv-1", title: "Fermi Paradox", category: "curveballs", mode: "deep-research", context: "The stark contradiction between the statistical likelihood of alien life and zero empirical evidence." },
  { id: "res-curv-2", title: "Great Filter", category: "curveballs", mode: "deep-research", context: "The theoretical evolutionary barrier preventing civilizations from achieving interstellar survival." },
  { id: "res-curv-3", title: "Acoustic Ecology", category: "curveballs", mode: "deep-research", context: "The study of sonic environments and why natural silence has become a rare luxury good." },
  { id: "res-curv-4", title: "Biocentrism", category: "curveballs", mode: "deep-research", context: "Robert Lanza's theory that life and consciousness are central to creating physical reality." },
  { id: "res-curv-5", title: "Kardashev Scale", category: "curveballs", mode: "deep-research", context: "Ranking planetary civilizations by their mastery over planetary, stellar, and galactic energy." },
  { id: "res-curv-6", title: "Quantum Entanglement", category: "curveballs", mode: "deep-research", context: "Einstein's 'spooky action at a distance' linking particle states across cosmic distances instantly." },
  { id: "res-curv-7", title: "Memetics", category: "curveballs", mode: "deep-research", context: "How cultural ideas, paradigms, and behaviors replicate and mutate like biological genes." },
  { id: "res-curv-8", title: "Chaos Theory", category: "curveballs", mode: "deep-research", context: "How microscopic variance in initial conditions generates exponentially unpredictable outcomes." },
  { id: "res-curv-9", title: "Dark Matter", category: "curveballs", mode: "deep-research", context: "The mysterious invisible substance comprising 85 percent of all cosmic matter yet defying detection." },
  { id: "res-curv-10", title: "Morphogenetic Fields", category: "curveballs", mode: "deep-research", context: "The controversial biological hypothesis of unseen organizing fields directing organic structure." },
];
