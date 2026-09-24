import { Arrow, Box, Defs, Dot, Ellipse, L, Leader, Path, T } from "./DiagramKit";
import type { DiagramEntry } from "@/data/notes/types";

export const science9Diagrams: DiagramEntry[] = [
  {
    id: "states-of-matter",
    title: "Three states of matter and interconversion",
    caption: "Particles are closest in solids, loosely packed in liquids and far apart in gases. Heating changes the state in one direction and cooling reverses it.",
    labels: ["Solid — fixed shape", "Liquid — fixed volume", "Gas — fills container", "Melting / fusion", "Boiling / vaporisation", "Condensation", "Freezing", "Sublimation"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Arrangement of particles and change of state
        </T>
        <Box x={24} y={60} w={170} h={170} label="SOLID" sub="closely packed, ordered" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => <Dot key={`s${r}${c}`} cx={62 + c * 34} cy={112 + r * 34} r={7} />),
        )}

        <Box x={235} y={60} w={170} h={170} label="LIQUID" sub="loosely packed" />
        {[
          [58, 108], [92, 112], [126, 106], [68, 142], [104, 146], [140, 140], [58, 176], [96, 180], [132, 174], [156, 112],
        ].map(([dx, dy], i) => <Dot key={`l${i}`} cx={235 + dx} cy={dy} r={7} />)}

        <Box x={446} y={60} w={170} h={170} label="GAS" sub="far apart, random motion" />
        {[
          [50, 96], [102, 88], [152, 100], [66, 132], [118, 138], [156, 150], [46, 170], [96, 182], [140, 190], [80, 210],
        ].map(([dx, dy], i) => <Dot key={`g${i}`} cx={446 + dx} cy={dy} r={7} />)}

        <Arrow x1={196} y1={112} x2={233} y2={112} marker="ar-states-of-matter" />
        <Arrow x1={407} y1={112} x2={444} y2={112} marker="ar-states-of-matter" />
        <T x={214} y={102} anchor="middle" size={10}>
          melting
        </T>
        <T x={425} y={102} anchor="middle" size={10}>
          boiling
        </T>
        <Arrow x1={233} y1={190} x2={196} y2={190} marker="ar-states-of-matter" />
        <Arrow x1={444} y1={190} x2={407} y2={190} marker="ar-states-of-matter" />
        <T x={214} y={206} anchor="middle" size={10}>
          freezing
        </T>
        <T x={425} y={206} anchor="middle" size={10}>
          condensation
        </T>

        <L x1={80} y1={248} x2={560} y2={248} dashed />
        <Arrow x1={90} y1={262} x2={540} y2={262} marker="ar-states-of-matter" />
        <T x={320} y={282} anchor="middle" size={11} bold>
          HEAT (increase temperature) →
        </T>
        <T x={320} y={316} anchor="middle" size={11} bold>
          ← COOL (decrease temperature)
        </T>
        <T x={320} y={344} anchor="middle" size={10} opacity={0.7}>
          Sublimation: solid ⇄ gas directly (camphor, naphthalene, dry ice)
        </T>
      </>
    ),
  },
  {
    id: "mixtures-classification",
    title: "Solution, colloid and suspension",
    caption: "The three kinds of mixtures are told apart by particle size, whether the particles settle, and the Tyndall effect. Only colloids and suspensions scatter a beam of light.",
    labels: ["True solution — less than 1 nm", "Colloid — 1 nm to 1000 nm", "Suspension — above 1000 nm", "Tyndall effect shown", "Particles settle on standing", "Homogeneous mixture"],
    Svg: () => (
      <>
        <T x={320} y={26} anchor="middle" size={12} bold>
          Particle size decides the type of mixture
        </T>

        <Box x={26} y={58} w={182} h={210} />
        <T x={117} y={82} anchor="middle" size={11.5} bold>
          TRUE SOLUTION
        </T>
        <T x={117} y={100} anchor="middle" size={10} opacity={0.7}>
          salt / sugar in water
        </T>
        {Array.from({ length: 40 }, (_, i) => (
          <Dot key={`sol${i}`} cx={49 + (i % 8) * 20} cy={132 + Math.floor(i / 8) * 20} r={2.6} />
        ))}
        <T x={117} y={252} anchor="middle" size={10}>
          &lt; 1 nm · transparent
        </T>

        <Box x={228} y={58} w={182} h={210} tone="brand" />
        <T x={319} y={82} anchor="middle" size={11.5} bold>
          COLLOID
        </T>
        <T x={319} y={100} anchor="middle" size={10} opacity={0.7}>
          milk / fog / blood
        </T>
        {Array.from({ length: 22 }, (_, i) => (
          <Dot key={`col${i}`} cx={252 + (i % 6) * 27} cy={134 + Math.floor(i / 6) * 30} r={6} />
        ))}
        <T x={319} y={252} anchor="middle" size={10}>
          1–1000 nm · translucent
        </T>

        <Box x={430} y={58} w={184} h={210} />
        <T x={522} y={82} anchor="middle" size={11.5} bold>
          SUSPENSION
        </T>
        <T x={522} y={100} anchor="middle" size={10} opacity={0.7}>
          sand / chalk in water
        </T>
        {Array.from({ length: 9 }, (_, i) => (
          <Dot key={`sus${i}`} cx={458 + (i % 3) * 62} cy={140 + Math.floor(i / 3) * 46} r={10} />
        ))}
        <T x={522} y={252} anchor="middle" size={10}>
          &gt; 1000 nm · opaque
        </T>

        <L x1={24} y1={292} x2={614} y2={292} dashed />
        <T x={26} y={316} size={10.5}>
          • True solution: particles cannot be seen, do not settle, separated by evaporation
        </T>
        <T x={26} y={334} size={10.5}>
          • Colloid: shows the Tyndall effect, separated by centrifugation
        </T>
        <T x={26} y={352} size={10.5}>
          • Suspension: particles visible, settle down, separated by filtration
        </T>
      </>
    ),
  },
  {
    id: "atom-molecule",
    title: "Atoms combine to form molecules",
    caption: "Atoms of elements combine in fixed whole-number ratios to form molecules of compounds. The same atoms alone form molecules of elements.",
    labels: ["Hydrogen atom (H)", "Oxygen atom (O)", "Hydrogen molecule (H₂)", "Oxygen molecule (O₂)", "Water molecule (H₂O)", "Law of constant proportions"],
    Svg: () => (
      <>
        <T x={320} y={26} anchor="middle" size={12} bold>
          Atoms → molecules of elements and compounds
        </T>

        <Box x={26} y={54} w={270} h={128} />
        <T x={161} y={78} anchor="middle" size={11} bold>
          ATOMS (single particles)
        </T>
        <Dot cx={96} cy={128} r={13} />
        <T x={96} y={132} anchor="middle" size={10}>
          H
        </T>
        <Dot cx={136} cy={128} r={13} />
        <T x={136} y={132} anchor="middle" size={10}>
          H
        </T>
        <Dot cx={216} cy={128} r={20} />
        <T x={216} y={133} anchor="middle" size={11}>
          O
        </T>
        <T x={161} y={170} anchor="middle" size={10} opacity={0.7}>
          Hydrogen (1 u) and oxygen (16 u)
        </T>

        <Arrow x1={306} y1={118} x2={344} y2={118} marker="ar-atom-molecule" />
        <T x={325} y={104} anchor="middle" size={10}>
          combine
        </T>

        <Box x={354} y={54} w={262} h={128} tone="brand" />
        <T x={485} y={78} anchor="middle" size={11} bold>
          MOLECULES
        </T>
        <Dot cx={410} cy={126} r={12} />
        <Dot cx={440} cy={126} r={12} />
        <T x={425} y={152} anchor="middle" size={10}>
          H₂ (element)
        </T>
        <Dot cx={512} cy={126} r={19} />
        <Dot cx={548} cy={126} r={19} />
        <T x={530} y={152} anchor="middle" size={10}>
          O₂ (element)
        </T>

        <Box x={26} y={196} w={590} h={64} />
        <T x={42} y={222} size={11} bold>
          Compound molecule
        </T>
        <Dot cx={210} cy={224} r={12} />
        <Dot cx={252} cy={224} r={19} />
        <Dot cx={294} cy={224} r={12} />
        <T x={318} y={229} size={11}>
          = H₂O (water) — 2 hydrogen atoms + 1 oxygen atom in a fixed ratio 2 : 1
        </T>
        <T x={42} y={246} size={10} opacity={0.7}>
          In water, hydrogen : oxygen = 1 : 8 by mass (law of constant proportions)
        </T>

        <T x={320} y={292} anchor="middle" size={10.5} opacity={0.85}>
          Mole = 6.022 × 10²³ particles. Molar mass of H₂O = 2(1) + 16 = 18 g mol⁻¹
        </T>
        <T x={320} y={316} anchor="middle" size={10.5} opacity={0.85}>
          1 mole H₂O = 18 g = 6.022 × 10²³ molecules = 2 mol H atoms
        </T>
        <T x={320} y={342} anchor="middle" size={10.5} opacity={0.85}>
          Number of moles n = given mass ÷ molar mass
        </T>
      </>
    ),
  },
  {
    id: "bohr-atom",
    title: "Bohr model of the atom (sodium: 2, 8, 1)",
    caption: "Electrons revolve in fixed shells around a small, dense nucleus. The maximum electrons in a shell follow 2n², and the outermost shell decides the valency.",
    labels: ["Nucleus (protons + neutrons)", "K shell (n = 1) — 2 electrons", "L shell (n = 2) — 8 electrons", "M shell (n = 3) — 1 electron", "Valence electron", "Atomic number Z = 11", "Mass number A = 23"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Distribution of electrons in shells — Sodium (Na)
        </T>

        <Ellipse cx={280} cy={190} rx={44} ry={44} opacity={0.8} />
        <Ellipse cx={280} cy={190} rx={100} ry={100} opacity={0.55} />
        <Ellipse cx={280} cy={190} rx={158} ry={158} opacity={0.4} />
        <circle cx={280} cy={190} r={26} fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeOpacity={0.8} />
        <T x={280} y={186} anchor="middle" size={9} bold>
          p⁺ n⁰
        </T>
        <T x={280} y={199} anchor="middle" size={8.5} opacity={0.8}>
          nucleus
        </T>

        <Dot cx={280} cy={146} r={5} />
        <Dot cx={280} cy={234} r={5} />
        <Dot cx={380} cy={190} r={5} />
        <Dot cx={180} cy={190} r={5} />
        <Dot cx={351} cy={261} r={5} />
        <Dot cx={209} cy={261} r={5} />
        <Dot cx={351} cy={119} r={5} />
        <Dot cx={209} cy={119} r={5} />
        <Dot cx={438} cy={190} r={5} />
        <Dot cx={122} cy={190} r={5} />
        <Dot cx={280} cy={32} r={5} />

        <Leader x1={470} y1={92} x2={408} y2={136} />
        <T x={474} y={88} size={10.5} bold>
          K shell — 2 e⁻
        </T>
        <Leader x1={470} y1={132} x2={392} y2={176} />
        <T x={474} y={144} size={10.5} bold>
          L shell — 8 e⁻
        </T>
        <Leader x1={470} y1={196} x2={446} y2={190} />
        <T x={474} y={200} size={10.5} bold>
          M shell — 1 e⁻
        </T>
        <T x={474} y={220} size={10} opacity={0.8}>
          (valence electron)
        </T>

        <Box x={26} y={54} w={100} h={52} />
        <T x={76} y={74} anchor="middle" size={10} bold>
          Z = 11
        </T>
        <T x={76} y={90} anchor="middle" size={9.5} opacity={0.75}>
          11 protons
        </T>
        <Box x={26} y={116} w={100} h={52} />
        <T x={76} y={136} anchor="middle" size={10} bold>
          A = 23
        </T>
        <T x={76} y={152} anchor="middle" size={9.5} opacity={0.75}>
          12 neutrons
        </T>
        <T x={76} y={196} anchor="middle" size={9.5} opacity={0.8}>
          n = 2n² rule
        </T>
        <T x={76} y={214} anchor="middle" size={9.5} opacity={0.8}>
          K 2, L 8, M 18
        </T>

        <L x1={26} y1={252} x2={614} y2={252} dashed />
        <T x={26} y={272} size={10.5}>
          • Configuration 2, 8, 1 → valency 1 (it loses the single outer electron to form Na⁺)
        </T>
        <T x={26} y={292} size={10.5}>
          • Electrons are filled step-wise; the outermost shell takes a maximum of 8 electrons (octet rule)
        </T>
        <T x={26} y={316} size={10.5}>
          • Rutherford's α-scattering: most particles passed straight through → most of the atom is empty space
        </T>
        <T x={26} y={340} size={10.5}>
          • A very few α-particles bounced back → a tiny, dense, positively charged nucleus at the centre
        </T>
      </>
    ),
  },
  {
    id: "plant-cell",
    title: "Plant cell (labelled)",
    caption: "A plant cell has a rigid cellulose cell wall, a large central vacuole and plastids. Organelles such as mitochondria and the nucleus carry out the life processes.",
    labels: ["Cell wall (cellulose)", "Plasma membrane", "Cytoplasm", "Nucleus with nucleolus", "Large central vacuole", "Chloroplast (plastid)", "Mitochondrion", "Golgi apparatus", "Endoplasmic reticulum"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Plant cell — structural unit of a plant
        </T>

        <rect x={140} y={44} width={360} height={272} rx={26} fill="currentColor" fillOpacity={0.03} stroke="currentColor" strokeOpacity={0.75} strokeWidth={3} />
        <rect x={152} y={56} width={336} height={248} rx={20} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.4} />

        <ellipse cx={252} cy={132} rx={52} ry={44} fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeOpacity={0.7} />
        <circle cx={252} cy={132} r={17} fill="currentColor" fillOpacity={0.25} />
        <T x={252} y={205} anchor="middle" size={10}>
          Nucleus
        </T>

        <ellipse cx={398} cy={150} rx={78} ry={66} fill="currentColor" fillOpacity={0.05} stroke="currentColor" strokeOpacity={0.5} strokeDasharray="6 4" />
        <T x={398} y={154} anchor="middle" size={10} opacity={0.85}>
          Vacuole (sap)
        </T>

        {[
          [206, 232], [250, 258], [300, 236],
        ].map(([cx, cy], i) => (
          <ellipse key={`ch${i}`} cx={cx} cy={cy} rx={22} ry={13} fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeOpacity={0.6} />
        ))}
        <T x={252} y={288} anchor="middle" size={10}>
          Chloroplasts
        </T>

        <Path d="M300 88 q22 -14 44 0 q22 14 44 0" opacity={0.6} />
        <ellipse cx={430} cy={92} rx={16} ry={10} fill="none" stroke="currentColor" strokeOpacity={0.6} />
        <ellipse cx={182} cy={188} rx={15} ry={9} fill="none" stroke="currentColor" strokeOpacity={0.6} />

        <Leader x1={62} y1={70} x2={142} y2={70} />
        <T x={58} y={66} size={10} anchor="end">
          Cell wall
        </T>
        <Leader x1={62} y1={104} x2={153} y2={100} />
        <T x={58} y={100} size={10} anchor="end">
          Plasma membrane
        </T>
        <Leader x1={62} y1={152} x2={198} y2={150} />
        <T x={58} y={148} size={10} anchor="end">
          Nucleolus
        </T>
        <Leader x1={62} y1={252} x2={185} y2={232} />
        <T x={58} y={248} size={10} anchor="end">
          Mitochondrion
        </T>
        <Leader x1={62} y1={300} x2={200} y2={286} />
        <T x={58} y={296} size={10} anchor="end">
          Cytoplasm
        </T>

        <Leader x1={578} y1={70} x2={486} y2={70} />
        <T x={582} y={66} size={10}>
          Endoplasmic reticulum
        </T>
        <Leader x1={578} y1={132} x2={470} y2={140} />
        <T x={582} y={128} size={10}>
          Vacuole membrane
        </T>
        <Leader x1={578} y1={196} x2={446} y2={96} />
        <T x={582} y={192} size={10}>
          Plastid
        </T>
        <Leader x1={578} y1={248} x2={320} y2={246} />
        <T x={582} y={244} size={10}>
          Golgi apparatus
        </T>
        <Leader x1={578} y1={300} x2={440} y2={92} />
        <T x={582} y={296} size={10}>
          Cell organelles
        </T>

        <L x1={26} y1={326} x2={614} y2={326} dashed />
        <T x={320} y={348} anchor="middle" size={10} opacity={0.8}>
          Animal cell differs: no cell wall, no plastids, small vacuoles, nucleus in the centre
        </T>
      </>
    ),
  },
  {
    id: "neuron",
    title: "Structure of a neuron (nerve cell)",
    caption: "Dendrites receive messages, the cell body holds the nucleus, and the long axon carries the impulse away to the next cell across a synapse.",
    labels: ["Dendrites", "Cell body (cytoplasm + nucleus)", "Nucleus", "Axon", "Myelin sheath", "Nerve endings", "Synapse", "Direction of impulse"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Neuron — structural and functional unit of nervous tissue
        </T>

        <ellipse cx={150} cy={170} rx={58} ry={52} fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.65} />
        <circle cx={150} cy={170} r={20} fill="currentColor" fillOpacity={0.22} />
        <T x={150} y={175} anchor="middle" size={10}>
          N
        </T>
        <T x={150} y={252} anchor="middle" size={10.5} bold>
          Cell body
        </T>

        {[
          [92, 110], [64, 148], [78, 226], [108, 244], [70, 190],
        ].map(([x, y], i) => (
          <g key={`d${i}`}>
            <Path d={`M150 170 Q${(x + 150) / 2} ${(y + 170) / 2 - 14} ${x} ${y}`} opacity={0.6} />
            <Path d={`M${x} ${y} q-16 -6 -22 -20`} opacity={0.45} />
            <Path d={`M${x} ${y} q-6 18 -20 24`} opacity={0.45} />
          </g>
        ))}
        <T x={52} y={86} size={10.5} bold>
          Dendrites
        </T>

        <Path d="M208 170 L470 170" w={9} opacity={0.18} />
        <Path d="M208 170 L470 170" w={2.4} opacity={0.75} />
        {[250, 300, 350, 400].map((x) => (
          <ellipse key={`my${x}`} cx={x} cy={170} rx={22} ry={10} fill="none" stroke="currentColor" strokeOpacity={0.6} />
        ))}
        <T x={320} y={150} anchor="middle" size={10.5} bold>
          Axon
        </T>
        <T x={320} y={206} anchor="middle" size={10}>
          Myelin sheath
        </T>

        {[196, 220].map((y, i) => (
          <g key={`n${i}`}>
            <Path d={`M470 170 L520 ${y - 4}`} opacity={0.6} />
            <Path d={`M520 ${y - 4} l16 -14`} opacity={0.5} />
            <Path d={`M520 ${y - 4} l18 0`} opacity={0.5} />
            <Path d={`M520 ${y - 4} l14 16`} opacity={0.5} />
          </g>
        ))}
        <T x={556} y={128} size={10.5} bold>
          Nerve endings
        </T>

        <Arrow x1={236} y1={290} x2={430} y2={290} marker="ar-neuron" />
        <T x={333} y={310} anchor="middle" size={10.5}>
          Direction of impulse
        </T>
        <T x={44} y={300} size={10} opacity={0.8}>
          Dendrite → cell body → axon → synapse → next neuron
        </T>
        <T x={44} y={326} size={10} opacity={0.8}>
          The gap between two neurons is the synapse; the signal crosses it as a chemical
        </T>
      </>
    ),
  },
  {
    id: "distance-time-graph",
    title: "Distance–time graph and velocity–time graph",
    caption: "In a distance–time graph the slope gives speed: a straight line means uniform speed and a curve means changing speed. In a velocity–time graph the area under the line gives distance.",
    labels: ["Distance axis (m)", "Time axis (s)", "Uniform speed — straight line", "Object at rest — horizontal line", "Non-uniform speed — curved line", "Slope = speed", "Area under v–t graph = distance"],
    Svg: () => (
      <>
        <T x={170} y={26} anchor="middle" size={11.5} bold>
          Distance–time graph
        </T>
        <T x={470} y={26} anchor="middle" size={11.5} bold>
          Velocity–time graph
        </T>

        <L x1={60} y1={240} x2={60} y2={50} w={1.8} opacity={0.85} />
        <L x1={60} y1={240} x2={286} y2={240} w={1.8} opacity={0.85} />
        <T x={170} y={262} anchor="middle" size={10}>
          time (s) →
        </T>
        <T x={22} y={146} size={10}>
          ↑ distance (m)
        </T>
        <Path d="M60 240 L250 60" opacity={0.9} w={2} />
        <Path d="M60 200 q70 0 130 -60 q40 -38 70 -96" opacity={0.6} w={2} />
        <L x1={60} y1={140} x2={286} y2={140} dashed opacity={0.35} />
        <T x={292} y={70} size={10}>
          uniform speed
        </T>
        <T x={292} y={118} size={10} opacity={0.8}>
          non-uniform speed
        </T>
        <T x={292} y={150} size={10} opacity={0.8}>
          at rest
        </T>
        <T x={150} y={286} size={10}>
          slope = speed
        </T>

        <L x1={360} y1={240} x2={360} y2={50} w={1.8} opacity={0.85} />
        <L x1={360} y1={240} x2={600} y2={240} w={1.8} opacity={0.85} />
        <T x={480} y={262} anchor="middle" size={10}>
          time (s) →
        </T>
        <T x={318} y={146} size={10}>
          ↑ velocity (m/s)
        </T>
        <Path d="M360 220 L470 140 L560 140" opacity={0.9} w={2} />
        <Path d="M360 220 L470 140 L560 140 L560 240 L360 240 Z" opacity={1} fill="rgb(249 115 22 / 0.12)" />
        <Arrow x1={420} y1={205} x2={420} y2={175} marker="ar-distance-time-graph" />
        <T x={428} y={222} size={10}>
          area = distance
        </T>
        <T x={470} y={126} anchor="middle" size={10} opacity={0.85}>
          uniform velocity
        </T>

        <L x1={26} y1={300} x2={614} y2={300} dashed opacity={0.4} />
        <T x={26} y={322} size={10.5}>
          v = u + at  ·  s = ut + ½at²  ·  2as = v² − u²
        </T>
        <T x={26} y={344} size={10.5}>
          Convert km/h to m/s by multiplying with 5/18
        </T>
      </>
    ),
  },
  {
    id: "forces-free-body",
    title: "Forces acting on a block (free-body diagram)",
    caption: "Newton's first law: if the net force is zero the block stays at rest or moves with uniform velocity. A bigger applied force than friction gives acceleration, F = ma.",
    labels: ["Applied force (F)", "Frictional force (f)", "Weight (mg) acting down", "Normal reaction (N) acting up", "Net force = F − f", "F = ma"],
    Svg: () => (
      <>
        <T x={320} y={26} anchor="middle" size={12} bold>
          Forces on a body resting on a surface
        </T>

        <L x1={150} y1={250} x2={520} y2={250} w={2.4} opacity={0.85} />
        {Array.from({ length: 14 }, (_, i) => (
          <L key={`h${i}`} x1={158 + i * 26} y1={250} x2={144 + i * 26} y2={264} w={1.2} opacity={0.45} />
        ))}

        <rect x={260} y={180} width={150} height={70} rx={8} fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.7} />
        <T x={335} y={222} anchor="middle" size={11} bold>
          m = 5 kg
        </T>

        <Arrow x1={250} y1={215} x2={140} y2={215} marker="ar-forces-free-body" />
        <T x={186} y={204} anchor="middle" size={10.5} bold>
          F (applied)
        </T>
        <Arrow x1={420} y1={235} x2={512} y2={235} marker="ar-forces-free-body" />
        <T x={468} y={224} anchor="middle" size={10.5} bold>
          f (friction)
        </T>
        <Arrow x1={335} y1={262} x2={335} y2={330} marker="ar-forces-free-body" />
        <T x={345} y={306} size={10.5} bold>
          W = mg (weight)
        </T>
        <Arrow x1={335} y1={168} x2={335} y2={82} marker="ar-forces-free-body" />
        <T x={345} y={108} size={10.5} bold>
          N (normal reaction)
        </T>

        <Box x={26} y={54} w={92} h={52} />
        <T x={72} y={76} anchor="middle" size={10}>
          m = 5 kg
        </T>
        <T x={72} y={94} anchor="middle" size={10} opacity={0.8}>
          g = 10 m/s²
        </T>

        <L x1={26} y1={296} x2={614} y2={296} dashed opacity={0.45} />
        <T x={26} y={316} size={10.5}>
          • Weight W = 5 × 10 = 50 N downward; normal reaction N = 50 N upward → they balance
        </T>
        <T x={26} y={334} size={10.5}>
          • If F = 20 N and f = 5 N → net force = 15 N → a = F/m = 3 m/s²
        </T>
        <T x={26} y={352} size={10.5}>
          • Momentum p = mv (kg m/s); in a collision, total momentum stays the same
        </T>
      </>
    ),
  },
  {
    id: "buoyancy",
    title: "Buoyant force and Archimedes' principle",
    caption: "A fluid exerts an upward buoyant force equal to the weight of the fluid displaced. An object floats if its density is less than the fluid's, and sinks if it is greater.",
    labels: ["Buoyant force (upthrust)", "Weight of the object", "Fluid displaced", "Floats: density lower than fluid", "Sinks: density greater than fluid", "Relative density has no unit"],
    Svg: () => (
      <>
        <T x={320} y={26} anchor="middle" size={12} bold>
          Why objects float or sink
        </T>

        <path d="M120 60 L120 300 L360 300 L360 60" fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={2} />
        <path d="M120 140 L360 140 L360 300 L120 300 Z" fill="rgb(59 130 246 / 0.10)" />
        <L x1={120} y1={140} x2={360} y2={140} w={1.4} opacity={0.7} dashed />
        <T x={354} y={132} anchor="end" size={10}>
          water surface
        </T>

        <rect x={196} y={168} width={88} height={88} rx={6} fill="rgb(249 115 22 / 0.14)" stroke="currentColor" strokeOpacity={0.7} />
        <T x={240} y={218} anchor="middle" size={10}>
          block
        </T>
        <Arrow x1={240} y1={166} x2={240} y2={92} marker="ar-buoyancy" />
        <T x={250} y={112} size={10.5} bold>
          buoyant force (up)
        </T>
        <Arrow x1={310} y1={262} x2={310} y2={330} marker="ar-buoyancy" />
        <T x={320} y={306} size={10.5} bold>
          weight (down)
        </T>

        <T x={400} y={84} size={10.5} bold>
          Floats
        </T>
        <T x={400} y={102} size={10} opacity={0.85}>
          density of object
        </T>
        <T x={400} y={118} size={10} opacity={0.85}>
          &lt; density of fluid
        </T>
        <T x={400} y={140} size={10} opacity={0.85}>
          (cork on water, ship)
        </T>
        <T x={400} y={180} size={10.5} bold>
          Sinks
        </T>
        <T x={400} y={198} size={10} opacity={0.85}>
          density of object
        </T>
        <T x={400} y={214} size={10} opacity={0.85}>
          &gt; density of fluid
        </T>
        <T x={400} y={236} size={10} opacity={0.85}>
          (iron nail, stone)
        </T>

        <L x1={26} y1={300} x2={360} y2={300} dashed opacity={0.4} />
        <T x={26} y={322} size={10.5}>
          Archimedes' principle: buoyant force = weight of the fluid displaced
        </T>
        <T x={26} y={342} size={10.5}>
          Relative density = density of substance ÷ density of water (no unit)
        </T>
      </>
    ),
  },
  {
    id: "energy-conversion",
    title: "Conservation of energy in a swinging pendulum",
    caption: "At the extreme positions the bob has maximum potential energy and no kinetic energy; at the mean position all the energy is kinetic. The total mechanical energy stays constant.",
    labels: ["Highest point: Eₚ maximum, Eₖ = 0", "Mean position: Eₖ maximum, Eₚ minimum", "Energy lost as heat and sound", "Eₚ = mgh", "Eₖ = ½mv²", "Total energy remains constant"],
    Svg: () => (
      <>
        <T x={320} y={26} anchor="middle" size={12} bold>
          Energy changes form but is never lost
        </T>

        <L x1={140} y1={60} x2={520} y2={60} w={2.4} opacity={0.8} />
        {Array.from({ length: 13 }, (_, i) => (
          <L key={`s${i}`} x1={152 + i * 30} y1={60} x2={140 + i * 30} y2={72} w={1.1} opacity={0.4} />
        ))}

        <L x1={330} y1={60} x2={330} y2={250} w={1.6} opacity={0.7} dashed />
        <Dot cx={330} cy={250} r={13} fill="rgb(249 115 22 / 0.85)" />
        <L x1={330} y1={60} x2={200} y2={140} w={1.6} opacity={0.7} />
        <Dot cx={200} cy={140} r={13} />
        <L x1={330} y1={60} x2={460} y2={140} w={1.6} opacity={0.7} />
        <Dot cx={460} cy={140} r={13} />

        <Path d="M200 140 q130 130 260 0" opacity={0.35} />
        <T x={200} y={118} anchor="middle" size={10.5} bold>
          Eₚ max
        </T>
        <T x={200} y={102} anchor="middle" size={9.5} opacity={0.8}>
          Eₖ = 0
        </T>
        <T x={330} y={286} anchor="middle" size={10.5} bold>
          Eₖ max · Eₚ min
        </T>
        <T x={460} y={118} anchor="middle" size={10.5} bold>
          Eₚ max
        </T>
        <T x={460} y={102} anchor="middle" size={9.5} opacity={0.8}>
          Eₖ = 0
        </T>
        <T x={330} y={46} anchor="middle" size={10}>
          support
        </T>

        <Box x={486} y={186} w={128} h={98} />
        <T x={550} y={210} anchor="middle" size={10} bold>
          Energy bar
        </T>
        <rect x={500} y={222} width={44} height={12} rx={3} fill="rgb(249 115 22 / 0.7)" />
        <T x={548} y={232} size={9.5}>
          Eₚ
        </T>
        <rect x={500} y={244} width={44} height={12} rx={3} fill="currentColor" fillOpacity={0.35} />
        <T x={548} y={254} size={9.5}>
          Eₖ
        </T>
        <T x={550} y={272} anchor="middle" size={9.5} opacity={0.8}>
          total stays same
        </T>

        <T x={26} y={322} size={10.5}>
          Eₚ = mgh  ·  Eₖ = ½mv²  ·  P = W/t (unit: watt, W)  ·  1 kWh = 3.6 × 10⁶ J
        </T>
        <T x={26} y={344} size={10.5}>
          Work is zero when the force acts at 90° to the displacement
        </T>
      </>
    ),
  },
  {
    id: "sound-wave",
    title: "Sound as a longitudinal wave (compressions and rarefactions)",
    caption: "Vibrating particles create regions of high pressure (compressions) and low pressure (rarefactions). The distance between two compressions is the wavelength, and loudness depends on amplitude.",
    labels: ["Compression — high pressure", "Rarefaction — low pressure", "Wavelength (λ)", "Amplitude (A)", "Crest / trough", "v = λ × ν", "Audible range 20 Hz to 20 000 Hz"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Sound needs a medium — it cannot travel through vacuum
        </T>

        <T x={26} y={62} size={10.5} bold>
          Compression
        </T>
        <T x={148} y={62} size={10.5} bold>
          Rarefaction
        </T>
        {[
          { x: 40, dense: true }, { x: 118, dense: false }, { x: 196, dense: true }, { x: 274, dense: false }, { x: 352, dense: true }, { x: 430, dense: false },
        ].map((g, i) => (
          <g key={`c${i}`}>
            {Array.from({ length: 7 }, (_, j) => (
              <Dot key={`p${i}-${j}`} cx={g.x + j * (g.dense ? 5 : 14)} cy={132 + (j % 2) * 16} r={4.4} />
            ))}
          </g>
        ))}
        <L x1={40} y1={172} x2={196} y2={172} w={1.4} opacity={0.7} />
        <L x1={40} y1={166} x2={40} y2={178} w={1.4} opacity={0.7} />
        <L x1={196} y1={166} x2={196} y2={178} w={1.4} opacity={0.7} />
        <T x={118} y={192} anchor="middle" size={10.5} bold>
          λ (wavelength)
        </T>

        <L x1={26} y1={212} x2={614} y2={212} dashed opacity={0.45} />

        <L x1={60} y1={330} x2={60} y2={232} w={1.6} opacity={0.8} />
        <L x1={60} y1={300} x2={600} y2={300} w={1.6} opacity={0.8} />
        <Path d="M60 300 q45 -60 90 0 t90 0 t90 0 t90 0 t90 0" opacity={0.85} w={2} />
        <L x1={60} y1={258} x2={150} y2={258} w={1.2} opacity={0.7} dashed />
        <Arrow x1={150} y1={258} x2={150} y2={300} marker="ar-sound-wave" />
        <T x={158} y={278} size={10}>
          amplitude (A)
        </T>
        <T x={320} y={252} anchor="middle" size={10} opacity={0.85}>
          crest
        </T>
        <T x={230} y={330} anchor="middle" size={10} opacity={0.85}>
          trough
        </T>

        <Box x={408} y={232} w={206} h={60} />
        <T x={424} y={256} size={10} bold>
          v = λ × ν
        </T>
        <T x={424} y={276} size={10} opacity={0.85}>
          loudness ↔ amplitude
        </T>
        <T x={424} y={292} size={10} opacity={0.85}>
          pitch ↔ frequency
        </T>

        <T x={26} y={352} size={10}>
          Speed of sound: solids &gt; liquids &gt; gases (air ≈ 344 m/s). Echo needs about 17.2 m; SONAR uses ultrasound.
        </T>
      </>
    ),
  },
  {
    id: "cropping-patterns",
    title: "Cropping patterns: mixed cropping, intercropping and crop rotation",
    caption: "Mixed cropping sows two or more crops together with no fixed pattern, intercropping uses definite rows, and crop rotation grows different crops in a planned sequence to keep the soil fertile.",
    labels: ["Mixed cropping — no row pattern", "Intercropping — definite rows", "Crop rotation — planned succession", "Legumes fix nitrogen", "Reduces risk of crop failure", "Maintains soil fertility"],
    Svg: () => (
      <>
        <T x={320} y={26} anchor="middle" size={12} bold>
          Three ways of growing crops on the same land
        </T>

        <Box x={26} y={52} w={186} h={216} />
        <T x={119} y={76} anchor="middle" size={11} bold>
          MIXED CROPPING
        </T>
        {[
          [112, 118], [62, 150], [162, 152], [112, 186], [70, 216], [158, 214], [112, 248],
        ].map(([cx, cy], i) => (
          <g key={`mx${i}`}>
            <L x1={cx} y1={cy + 14} x2={cx} y2={cy - 8} w={1.6} opacity={0.7} />
            <Dot cx={cx} cy={cy - 12} r={5} />
          </g>
        ))}
        <T x={119} y={252} anchor="middle" size={9.5} opacity={0.85}>
          two or more crops together
        </T>

        <Box x={228} y={52} w={186} h={216} tone="brand" />
        <T x={321} y={76} anchor="middle" size={11} bold>
          INTERCROPPING
        </T>
        {[246, 286, 326, 366, 400].map((x, i) => (
          <g key={`ic${x}`}>
            <L x1={x} y1={250} x2={x} y2={108} w={i % 2 === 0 ? 2.2 : 1.4} opacity={i % 2 === 0 ? 0.75 : 0.45} />
            {i % 2 === 0 ? <Dot cx={x} cy={100} r={5} /> : <Dot cx={x} cy={100} r={3.4} />}
          </g>
        ))}
        <T x={321} y={258} anchor="middle" size={9.5} opacity={0.85}>
          crop A · crop B · crop A · crop B
        </T>

        <Box x={430} y={52} w={184} h={216} />
        <T x={522} y={76} anchor="middle" size={11} bold>
          CROP ROTATION
        </T>
        {["Wheat", "Pulses", "Maize", "Pulses"].map((lbl, i) => (
          <g key={lbl + i}>
            <rect x={454} y={96 + i * 40} width={136} height={28} rx={6} fill="currentColor" fillOpacity={i % 2 === 0 ? 0.12 : 0.04} stroke="currentColor" strokeOpacity={0.45} />
            <T x={522} y={115 + i * 40} anchor="middle" size={10}>
              {lbl}
            </T>
          </g>
        ))}
        <T x={522} y={258} anchor="middle" size={9.5} opacity={0.85}>
          season by season
        </T>

        <T x={26} y={296} size={10.5}>
          • Kharif: paddy, maize, cotton (June–Oct) · Rabi: wheat, gram, mustard (Nov–Mar) · Zaid: melons (Apr–Jun)
        </T>
        <T x={26} y={316} size={10.5}>
          • Manure = organic matter (adds humus) · Fertiliser = chemical nutrients (overuse pollutes soil and water)
        </T>
        <T x={26} y={336} size={10.5}>
          • Composite fish culture: catla (surface) + rohu (middle) + mrigal/carp (bottom) in one pond
        </T>
      </>
    ),
  },
];
