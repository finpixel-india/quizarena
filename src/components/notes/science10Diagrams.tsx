import { Arrow, Box, Defs, Dot, Ellipse, L, Leader, Path, T } from "./DiagramKit";
import type { DiagramEntry } from "@/data/notes/types";

export const science10Diagrams: DiagramEntry[] = [
  {
    id: "reaction-types",
    title: "Four important types of chemical reactions",
    caption: "Combination joins reactants into one product, decomposition breaks one compound into simpler substances, displacement replaces a less reactive element, and double displacement exchanges ions.",
    labels: ["Combination", "Decomposition", "Displacement", "Double displacement", "Precipitate (↓)", "Balanced equation"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Recognise a reaction by what happens to the reactants
        </T>

        {[
          { x: 26, y: 50, title: "COMBINATION", a: "2Mg + O₂", b: "2MgO", note: "two reactants → one product" },
          { x: 330, y: 50, title: "DECOMPOSITION", a: "CaCO₃", b: "CaO + CO₂", note: "heat / light / electricity" },
          { x: 26, y: 196, title: "DISPLACEMENT", a: "Fe + CuSO₄", b: "FeSO₄ + Cu", note: "more reactive metal wins" },
          { x: 330, y: 196, title: "DOUBLE DISPLACEMENT", a: "Na₂SO₄ + BaCl₂", b: "BaSO₄↓ + 2NaCl", note: "ions exchange; precipitate forms" },
        ].map((p) => (
          <g key={p.title}>
            <Box x={p.x} y={p.y} w={284} h={128} />
            <T x={p.x + 16} y={p.y + 26} size={10.5} bold>
              {p.title}
            </T>
            <T x={p.x + 16} y={p.y + 58} size={11}>
              {p.a}
            </T>
            <Arrow x1={p.x + 118} y1={p.y + 54} x2={p.x + 168} y2={p.y + 54} marker="ar-reaction-types" />
            <T x={p.x + 190} y={p.y + 58} size={11} bold>
              {p.b}
            </T>
            <T x={p.x + 16} y={p.y + 88} size={9.5} opacity={0.8}>
              {p.note}
            </T>
            <T x={p.x + 16} y={p.y + 108} size={9} opacity={0.65}>
              {p.title === "DISPLACEMENT" ? "Fe is more reactive than Cu" : p.title === "COMBINATION" ? "Mg burns with a dazzling white flame" : p.title === "DECOMPOSITION" ? "endothermic (heat absorbed)" : "white precipitate of BaSO₄"}
            </T>
          </g>
        ))}

        <T x={26} y={348} size={10.5}>
          Oxidation = gain of oxygen · Reduction = loss of oxygen · Both together = redox reaction (also explains corrosion and rancidity)
        </T>
      </>
    ),
  },
  {
    id: "ph-scale",
    title: "The pH scale with everyday examples",
    caption: "pH below 7 is acidic, 7 is neutral and above 7 is basic. Tooth decay begins below pH 5.5, and antacids are mild bases used to neutralise stomach acid.",
    labels: ["pH 0–3: strong acids (HCl, H₂SO₄)", "pH 5.6: acid rain below this", "pH 7: neutral (pure water)", "pH 8–11: mild bases (soap, milk of magnesia)", "pH 12–14: strong bases (NaOH)", "Indicator: litmus, phenolphthalein"],
    Svg: () => (
      <>
        <T x={320} y={26} anchor="middle" size={12} bold>
          Measuring acidity and basicity — the pH scale
        </T>

        <linearGradient id="phbar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="70%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <rect x={40} y={120} width={560} height={34} rx={8} fill="url(#phbar)" opacity={0.85} />
        {Array.from({ length: 15 }, (_, i) => (
          <g key={`t${i}`}>
            <L x1={40 + i * 40} y1={154} x2={40 + i * 40} y2={166} w={1.2} opacity={0.6} />
            <T x={40 + i * 40} y={182} anchor="middle" size={10} bold={i === 7}>
              {i}
            </T>
          </g>
        ))}
        <T x={60} y={104} size={10.5} bold>
          ACIDIC
        </T>
        <T x={320} y={104} anchor="middle" size={10.5}>
          NEUTRAL
        </T>
        <T x={580} y={104} anchor="end" size={10.5} bold>
          BASIC
        </T>

        {[
          { x: 60, y1: 120, y2: 64, label: "Lemon juice · gastric juice (pH ~2)" },
          { x: 172, y1: 120, y2: 92, label: "Vinegar ~3 · tomato ~4.5" },
          { x: 300, y1: 120, y2: 64, label: "Milk ~6.5" },
          { x: 360, y1: 120, y2: 92, label: "Pure water 7" },
          { x: 460, y1: 120, y2: 64, label: "Soap ~10 · milk of magnesia 10" },
          { x: 580, y1: 120, y2: 92, label: "NaOH 14 · lime water 12" },
        ].map((p) => (
          <g key={p.label}>
            <L x1={p.x} y1={p.y1} x2={p.x} y2={p.y2} w={1.2} opacity={0.65} dashed />
            <T x={p.x} y={p.y2 - 6} anchor={p.x > 520 ? "end" : p.x < 90 ? "start" : "middle"} size={9.5}>
              {p.label}
            </T>
          </g>
        ))}

        <L x1={26} y1={210} x2={614} y2={210} dashed opacity={0.4} />
        <T x={26} y={232} size={10.5}>
          • Stomach acidity → antacid (mild base) · Bee sting (acid) → baking soda (mild base)
        </T>
        <T x={26} y={252} size={10.5}>
          • Tooth enamel corrodes when the mouth pH falls below 5.5 — brush with a basic toothpaste
        </T>
        <T x={26} y={272} size={10.5}>
          • Indicators: blue litmus → red in acid; red litmus → blue in base; phenolphthalein is pink in base
        </T>
        <T x={26} y={300} size={10.5}>
          • Baking soda NaHCO₃ · washing soda Na₂CO₃·10H₂O · bleaching powder CaOCl₂ · Plaster of Paris CaSO₄·½H₂O
        </T>
        <T x={26} y={324} size={10.5}>
          • Chlor-alkali: 2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂
        </T>
      </>
    ),
  },
  {
    id: "reactivity-series",
    title: "Reactivity (activity) series of metals",
    caption: "Metals at the top are the most reactive and are extracted by electrolysis; those at the bottom occur in the free state. A metal can displace any metal below it from its salt solution.",
    labels: ["Most reactive — K, Na", "Displace hydrogen from dilute acids", "Carbon reduction for middle metals", "Least reactive — Au, Ag in free state", "Displacement direction: top → bottom"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Decreasing reactivity from top to bottom
        </T>

        {[
          { i: 0, s: "K", n: "Potassium", note: "reacts vigorously with cold water" },
          { i: 1, s: "Na", n: "Sodium", note: "stored in kerosene" },
          { i: 2, s: "Ca", n: "Calcium", note: "reacts with cold water" },
          { i: 3, s: "Mg", n: "Magnesium", note: "reacts with hot water / steam" },
          { i: 4, s: "Al", n: "Aluminium", note: "amphoteric oxide; thermite reaction" },
          { i: 5, s: "Zn", n: "Zinc", note: "used for galvanisation" },
          { i: 6, s: "Fe", n: "Iron", note: "displaces Cu from CuSO₄" },
          { i: 7, s: "Pb", n: "Lead", note: "reacts slowly with acids" },
          { i: 8, s: "H", n: "Hydrogen (reference)", note: "metals above it displace H₂" },
          { i: 9, s: "Cu", n: "Copper", note: "not displaced by Fe below it" },
          { i: 10, s: "Ag", n: "Silver", note: "occurs in free state" },
          { i: 11, s: "Au", n: "Gold", note: "least reactive; found native" },
        ].map((row) => {
          const y = 44 + row.i * 24;
          const highlight = row.s === "H";
          return (
            <g key={row.s}>
              <rect
                x={120}
                y={y}
                width={120}
                height={21}
                rx={5}
                fill={highlight ? "rgb(249 115 22 / 0.16)" : "currentColor"}
                fillOpacity={highlight ? 1 : 0.04}
                stroke="currentColor"
                strokeOpacity={highlight ? 0.7 : 0.35}
              />
              <T x={136} y={y + 15} size={10.5} bold>
                {row.s}
              </T>
              <T x={162} y={y + 15} size={10} opacity={0.85}>
                {row.n}
              </T>
              <T x={252} y={y + 15} size={9.5} opacity={0.65}>
                {row.note}
              </T>
            </g>
          );
        })}

        <Arrow x1={92} y1={52} x2={92} y2={322} marker="ar-reactivity-series" />
        <T x={78} y={70} size={10} anchor="end">
          most
        </T>
        <T x={78} y={86} size={10} anchor="end">
          reactive
        </T>
        <T x={78} y={300} size={10} anchor="end">
          least
        </T>
        <T x={78} y={316} size={10} anchor="end">
          reactive
        </T>

        <T x={410} y={62} size={10.5} bold>
          Extraction method
        </T>
        <T x={410} y={84} size={10} opacity={0.85}>
          K, Na, Ca → electrolysis
        </T>
        <T x={410} y={102} size={10} opacity={0.85}>
          Mg, Al, Zn, Fe, Pb
        </T>
        <T x={410} y={120} size={10} opacity={0.85}>
          → reduction with carbon
        </T>
        <T x={410} y={138} size={10} opacity={0.85}>
          Cu, Ag, Au → free state
        </T>

        <T x={410} y={186} size={10.5} bold>
          Displacement example
        </T>
        <T x={410} y={208} size={10}>
          Fe + CuSO₄ → FeSO₄ + Cu
        </T>
        <T x={410} y={226} size={9.5} opacity={0.75}>
          blue colour fades, red-brown Cu forms
        </T>
        <T x={410} y={266} size={10.5} bold>
          Ionic compounds
        </T>
        <T x={410} y={288} size={10} opacity={0.85}>
          high m.p./b.p., soluble in water,
        </T>
        <T x={410} y={306} size={10} opacity={0.85}>
          conduct in molten/aqueous state
        </T>
      </>
    ),
  },
  {
    id: "carbon-bonds",
    title: "Tetravalency, catenation and types of carbon bonds",
    caption: "Carbon has four valence electrons, so it forms four bonds. It also links with other carbon atoms to form long chains — together these two properties create millions of compounds.",
    labels: ["Tetravalency — 4 bonds", "Catenation — C–C chains", "Single bond (alkane)", "Double bond (alkene)", "Triple bond (alkyne)", "Functional groups –OH, –COOH"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Why carbon forms so many compounds
        </T>

        <circle cx={110} cy={140} r={30} fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeOpacity={0.7} />
        <T x={110} y={146} anchor="middle" size={13} bold>
          C
        </T>
        {[[110, 70], [110, 210], [40, 140], [180, 140]].map(([x, y], i) => (
          <g key={`b${i}`}>
            <L x1={110} y1={140} x2={x} y2={y} w={1.8} opacity={0.7} />
            <Dot cx={x} cy={y} r={9} />
          </g>
        ))}
        <T x={110} y={246} anchor="middle" size={10.5} bold>
          Tetravalent carbon
        </T>

        <Box x={232} y={62} w={190} h={110} />
        <T x={327} y={86} anchor="middle" size={10.5} bold>
          CATENATION
        </T>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`ch${i}`}>
            <Dot cx={274 + i * 27} cy={130} r={8} />
            <T x={274 + i * 27} y={134} anchor="middle" size={8.5}>C</T>
            {i < 4 ? <L x1={282 + i * 27} y1={130} x2={293 + i * 27} y2={130} w={1.6} opacity={0.75} /> : null}
          </g>
        ))}
        <T x={327} y={158} anchor="middle" size={9.5} opacity={0.8}>
          long chains and rings (CₙH₂ₙ₊₂)
        </T>

        <Box x={446} y={62} w={168} h={110} />
        <T x={530} y={86} anchor="middle" size={10.5} bold>
          BONDS
        </T>
        <L x1={470} y1={110} x2={520} y2={110} w={2.6} opacity={0.8} />
        <T x={534} y={114} size={10}>single — ethane</T>
        <L x1={470} y1={132} x2={520} y2={132} w={2.6} opacity={0.8} />
        <L x1={470} y1={138} x2={520} y2={138} w={2.6} opacity={0.8} />
        <T x={534} y={140} size={10}>double — ethene</T>
        <L x1={470} y1={156} x2={520} y2={156} w={2.6} opacity={0.8} />
        <L x1={470} y1={162} x2={520} y2={156} w={2.6} opacity={0.8} />
        <L x1={470} y1={170} x2={520} y2={156} w={2.6} opacity={0.8} />
        <T x={534} y={166} size={10}>triple — ethyne</T>

        <L x1={26} y1={194} x2={614} y2={194} dashed opacity={0.4} />

        <T x={26} y={216} size={10.5} bold>
          Hydrocarbons
        </T>
        <T x={26} y={238} size={10}>
          Alkane CₙH₂ₙ₊₂ (saturated, clean blue flame) · Alkene CₙH₂ₙ · Alkyne CₙH₂ₙ₋₂ (unsaturated, yellow smoky flame)
        </T>

        <T x={26} y={266} size={10.5} bold>
          Functional groups
        </T>
        <T x={26} y={288} size={10}>
          –OH alcohol (ethanol) · –CHO aldehyde · –CO– ketone · –COOH carboxylic acid (ethanoic acid = vinegar) · –Cl haloalkane
        </T>

        <T x={26} y={314} size={10.5} bold>
          Reactions to remember
        </T>
        <T x={26} y={336} size={10}>
          Esterification: acid + alcohol → sweet-smelling ester + water · Saponification: ester + NaOH → alcohol + soap
        </T>
      </>
    ),
  },
  {
    id: "human-heart",
    title: "Human heart — four chambers and double circulation",
    caption: "Deoxygenated blood enters the right atrium, is pumped to the lungs, returns to the left atrium and is pumped by the left ventricle to the whole body. This is double circulation.",
    labels: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle", "Aorta (to body)", "Pulmonary artery (to lungs)", "Pulmonary vein (from lungs)", "Vena cava (from body)", "Valves prevent backflow"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Section of the human heart (right side carries deoxygenated blood)
        </T>

        <Path d="M240 60 q-90 0 -110 90 q-16 84 40 140 q56 56 150 40 q94 -16 108 -96 q12 -74 -52 -132 q-64 -52 -136 -42 Z" opacity={0.55} />
        <Path d="M296 66 L296 322" opacity={0.4} />
        <Path d="M232 196 L360 196" opacity={0.4} />

        <rect x={176} y={92} width={108} height={92} rx={14} fill="rgb(59 130 246 / 0.16)" stroke="currentColor" strokeOpacity={0.5} />
        <T x={230} y={144} anchor="middle" size={10.5} bold>
          RA
        </T>
        <rect x={176} y={206} width={108} height={104} rx={14} fill="rgb(59 130 246 / 0.16)" stroke="currentColor" strokeOpacity={0.5} />
        <T x={230} y={262} anchor="middle" size={10.5} bold>
          RV
        </T>
        <rect x={306} y={92} width={112} height={92} rx={14} fill="rgb(239 68 68 / 0.14)" stroke="currentColor" strokeOpacity={0.5} />
        <T x={362} y={144} anchor="middle" size={10.5} bold>
          LA
        </T>
        <rect x={306} y={206} width={112} height={104} rx={14} fill="rgb(239 68 68 / 0.14)" stroke="currentColor" strokeOpacity={0.5} />
        <T x={362} y={262} anchor="middle" size={10.5} bold>
          LV
        </T>

        <Path d="M232 186 L232 206" w={2} opacity={0.6} />
        <Path d="M362 186 L362 206" w={2} opacity={0.6} />
        <Path d="M232 310 L232 340 L200 340" opacity={0.6} />
        <Path d="M362 310 L362 340 L400 340" opacity={0.6} />

        <Arrow x1={150} y1={138} x2={172} y2={138} marker="ar-human-heart" />
        <T x={146} y={132} size={10} anchor="end">
          vena cava
        </T>
        <T x={146} y={148} size={9} opacity={0.75} anchor="end">
          from body
        </T>

        <Arrow x1={172} y1={70} x2={140} y2={46} marker="ar-human-heart" />
        <T x={136} y={42} size={10} anchor="end" bold>
          pulmonary artery
        </T>
        <T x={136} y={58} size={9} opacity={0.75} anchor="end">
          to lungs (deoxygenated)
        </T>

        <Arrow x1={442} y1={60} x2={470} y2={92} marker="ar-human-heart" />
        <T x={474} y={56} size={10} bold>
          pulmonary vein
        </T>
        <T x={474} y={72} size={9} opacity={0.75}>
          from lungs (oxygenated)
        </T>

        <Arrow x1={420} y1={150} x2={482} y2={150} marker="ar-human-heart" />
        <T x={486} y={144} size={10} bold>
          aorta
        </T>
        <T x={486} y={160} size={9} opacity={0.75}>
          to whole body
        </T>

        <Leader x1={70} y1={228} x2={176} y2={238} />
        <T x={66} y={224} size={10} anchor="end">
          valves
        </T>
        <T x={66} y={240} size={9} opacity={0.75} anchor="end">
          no backflow
        </T>

        <L x1={26} y1={330} x2={614} y2={330} dashed opacity={0.4} />
        <T x={26} y={350} size={10}>
          Double circulation: heart → lungs → heart → body → heart. Walls of the left ventricle are the thickest because it pumps blood to the whole body.
        </T>
      </>
    ),
  },
  {
    id: "reflex-arc",
    title: "Reflex arc — pathway of a reflex action",
    caption: "In a reflex action the impulse travels from the receptor through a sensory neuron to the spinal cord, and back through a motor neuron to the effector — without waiting for the brain.",
    labels: ["Receptor (skin)", "Sensory neuron", "Spinal cord (CNS)", "Motor neuron", "Effector (muscle)", "Response — hand pulled back", "Faster than thinking"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Reflex arc — withdrawal of the hand from a hot object
        </T>

        <rect x={40} y={90} width={86} height={200} rx={16} fill="currentColor" fillOpacity={0.05} stroke="currentColor" strokeOpacity={0.55} />
        <T x={83} y={78} anchor="middle" size={10.5} bold>
          Skin
        </T>
        <Path d="M126 150 q70 -18 140 0" opacity={0.7} w={2} />
        <T x={196} y={140} anchor="middle" size={9.5}>
          dendrite
        </T>
        <circle cx={300} cy={170} r={22} fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeOpacity={0.6} />
        <T x={300} y={175} anchor="middle" size={10}>
          N
        </T>
        <T x={300} y={216} anchor="middle" size={10}>
          sensory
        </T>
        <T x={300} y={230} anchor="middle" size={10}>
          neuron
        </T>
        <T x={300} y={150} anchor="middle" size={9} opacity={0.75}>
          cell body
        </T>

        <Arrow x1={126} y1={200} x2={278} y2={186} marker="ar-reflex-arc" />
        <T x={200} y={216} anchor="middle" size={9.5} opacity={0.85}>
          impulse
        </T>

        <rect x={368} y={132} width={104} height={110} rx={16} fill="rgb(249 115 22 / 0.12)" stroke="currentColor" strokeOpacity={0.6} />
        <T x={420} y={168} anchor="middle" size={10.5} bold>
          SPINAL
        </T>
        <T x={420} y={186} anchor="middle" size={10.5} bold>
          CORD
        </T>
        <T x={420} y={208} anchor="middle" size={9} opacity={0.75}>
          (relay neuron)
        </T>
        <Path d="M322 170 L366 170" w={1.6} opacity={0.7} />

        <Path d="M472 200 q52 26 40 74" opacity={0.7} w={2} />
        <circle cx={512} cy={290} r={24} fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeOpacity={0.6} />
        <T x={512} y={294} anchor="middle" size={10}>
          M
        </T>
        <T x={560} y={294} size={10}>
          effector
        </T>
        <T x={560} y={310} size={10}>
          (muscle)
        </T>

        <Arrow x1={470} y1={182} x2={492} y2={252} marker="ar-reflex-arc" />
        <T x={540} y={150} size={10.5} bold>
          motor neuron
        </T>

        <Path d="M84 250 q80 40 300 34" opacity={0.35} dashed />
        <T x={200} y={300} size={10} opacity={0.8}>
          hand pulled back
        </T>

        <T x={26} y={330} size={10.5}>
          Receptor → sensory neuron → spinal cord → motor neuron → effector → response
        </T>
        <T x={26} y={350} size={10.5}>
          The brain is not involved, so the response is much faster than a voluntary action.
        </T>
      </>
    ),
  },
  {
    id: "flower-parts",
    title: "Longitudinal section of a flower with pollination and fertilisation",
    caption: "Pollen from the anther lands on the stigma, germinates and grows a pollen tube to the ovule. After fertilisation the ovule becomes the seed and the ovary becomes the fruit.",
    labels: ["Stigma", "Style", "Ovary", "Ovule", "Anther", "Filament", "Pollen grain", "Pollen tube", "Petal", "Sepal"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Sexual reproduction in a flowering plant
        </T>

        <Path d="M120 320 q60 -260 200 -260 q140 0 200 260" opacity={0.35} />
        <Path d="M120 320 q80 -150 200 -150 q120 0 200 150" opacity={0.25} />
        <T x={96} y={318} size={10} anchor="end">
          sepal
        </T>
        <T x={96} y={132} size={10} anchor="end">
          petal
        </T>

        <ellipse cx={320} cy={150} rx={44} ry={22} fill="none" stroke="currentColor" strokeOpacity={0.65} />
        <T x={320} y={154} anchor="middle" size={9.5}>
          stigma
        </T>
        <Dot cx={320} cy={138} r={6} />
        <T x={344} y={128} size={9.5}>
          pollen grain
        </T>

        <Path d="M320 172 L320 236" w={2.2} opacity={0.7} />
        <Leader x1={392} y1={196} x2={324} y2={196} />
        <T x={396} y={192} size={9.5}>
          style
        </T>

        <Path d="M320 236 q30 14 22 34" w={2} opacity={0.7} />
        <T x={356} y={276} size={9.5}>
          pollen tube
        </T>
        <Dot cx={344} cy={272} r={5} />

        <ellipse cx={320} cy={296} rx={52} ry={30} fill="rgb(249 115 22 / 0.10)" stroke="currentColor" strokeOpacity={0.6} />
        <ellipse cx={320} cy={300} rx={16} ry={12} fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeOpacity={0.55} />
        <T x={320} y={304} anchor="middle" size={9}>
          ovule
        </T>
        <Leader x1={244} y1={330} x2={282} y2={306} />
        <T x={240} y={334} size={9.5} anchor="end">
          ovary
        </T>

        <Path d="M420 210 L420 118" w={2.2} opacity={0.7} />
        <ellipse cx={420} cy={104} rx={22} ry={16} fill="none" stroke="currentColor" strokeOpacity={0.6} />
        {[[412, 96], [420, 92], [428, 98]].map(([x, y], i) => (
          <Dot key={`pg${i}`} cx={x} cy={y} r={3.6} />
        ))}
        <Leader x1={486} y1={150} x2={434} y2={176} />
        <T x={490} y={146} size={9.5}>
          filament
        </T>
        <T x={490} y={110} size={9.5} bold>
          anther
        </T>

        <Arrow x1={300} y1={72} x2={244} y2={106} marker="ar-flower-parts" />
        <T x={300} y={62} size={10} bold>
          pollination: pollen → stigma
        </T>

        <T x={26} y={348} size={10}>
          After fertilisation: ovule → seed · ovary → fruit · petals, sepals, stamens and style wither and fall
        </T>
      </>
    ),
  },
  {
    id: "monohybrid-cross",
    title: "Monohybrid cross (TT × tt) and the 3 : 1 ratio",
    caption: "Tall (T) is dominant over short (t). The F₁ generation is all tall but carries the recessive allele, so the F₂ generation shows tall and short plants in the ratio 3 : 1.",
    labels: ["P generation: TT × tt", "F₁: all Tt (tall)", "F₂: 3 tall : 1 short", "Genotypic ratio 1 TT : 2 Tt : 1 tt", "Dominant allele T", "Recessive allele t"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Mendel's monohybrid cross
        </T>

        <Box x={26} y={44} w={92} h={108} />
        <T x={72} y={68} anchor="middle" size={10.5} bold>
          P
        </T>
        <T x={72} y={94} anchor="middle" size={12}>
          Tall
        </T>
        <T x={72} y={116} anchor="middle" size={11} bold>
          TT
        </T>
        <T x={72} y={138} anchor="middle" size={9.5} opacity={0.75}>
          homozygous
        </T>
        <T x={130} y={104} anchor="middle" size={14} bold>
          ×
        </T>
        <Box x={156} y={44} w={92} h={108} />
        <T x={202} y={68} anchor="middle" size={10.5} bold>
          P
        </T>
        <T x={202} y={94} anchor="middle" size={12}>
          Short
        </T>
        <T x={202} y={116} anchor="middle" size={11} bold>
          tt
        </T>
        <T x={202} y={138} anchor="middle" size={9.5} opacity={0.75}>
          homozygous
        </T>

        <Arrow x1={252} y1={98} x2={296} y2={98} marker="ar-monohybrid-cross" />

        <Box x={302} y={44} w={120} h={108} tone="brand" />
        <T x={362} y={68} anchor="middle" size={10.5} bold>
          F₁
        </T>
        <T x={362} y={94} anchor="middle" size={12}>
          All tall
        </T>
        <T x={362} y={116} anchor="middle" size={11} bold>
          Tt
        </T>
        <T x={362} y={138} anchor="middle" size={9.5} opacity={0.75}>
          heterozygous
        </T>

        <Arrow x1={428} y1={98} x2={462} y2={98} marker="ar-monohybrid-cross" />
        <T x={445} y={86} anchor="middle" size={9}>
          self
        </T>
        <T x={445} y={118} anchor="middle" size={9}>
          pollinated
        </T>

        <T x={540} y={72} anchor="middle" size={10.5} bold>
          F₂ (Tt × Tt)
        </T>
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <g key={`f2${r}${c}`}>
              <rect
                x={470 + c * 66}
                y={84 + r * 34}
                width={62}
                height={30}
                rx={6}
                fill={r === 1 && c === 1 ? "currentColor" : "rgb(249 115 22 / 0.14)"}
                fillOpacity={r === 1 && c === 1 ? 0.06 : 1}
                stroke="currentColor"
                strokeOpacity={0.5}
              />
              <T x={501 + c * 66} y={104 + r * 34} anchor="middle" size={11} bold>
                {["TT", "Tt"][c] && r === 0 ? ["TT", "Tt"][c] : ["Tt", "tt"][c]}
              </T>
            </g>
          )),
        )}
        <T x={470} y={76} size={9} opacity={0.75}>
          T
        </T>
        <T x={536} y={76} size={9} opacity={0.75}>
          t
        </T>
        <T x={454} y={104} size={9} opacity={0.75}>
          T
        </T>
        <T x={454} y={138} size={9} opacity={0.75}>
          t
        </T>

        <L x1={26} y1={172} x2={614} y2={172} dashed opacity={0.4} />
        <T x={26} y={194} size={10.5} bold>
          Results of the F₂ generation
        </T>
        <T x={26} y={216} size={10.5}>
          • Phenotype: tall (TT + Tt) : short (tt) = 3 : 1
        </T>
        <T x={26} y={236} size={10.5}>
          • Genotype: 1 TT : 2 Tt : 1 tt — i.e. 25% pure tall, 50% mixed tall, 25% short
        </T>
        <T x={26} y={256} size={10.5}>
          • The short trait skips one generation because it is recessive (hidden in Tt)
        </T>

        <T x={26} y={286} size={10.5} bold>
          Dihybrid cross (RRYY × rryy)
        </T>
        <T x={26} y={308} size={10.5}>
          F₂ phenotypic ratio = 9 : 3 : 3 : 1 — round-yellow : round-green : wrinkled-yellow : wrinkled-green
        </T>

        <T x={26} y={338} size={10.5} bold>
          Sex determination in humans
        </T>
        <T x={26} y={356} size={10.5}>
          22 pairs autosomes + XX (girl) or XY (boy). The father's sperm (X or Y) decides the sex of the child.
        </T>
      </>
    ),
  },
  {
    id: "mirror-lens-ray",
    title: "Ray diagram for a concave mirror and a convex lens",
    caption: "Rays parallel to the principal axis pass through the focus after reflection or refraction. Ray diagrams let us predict the size, nature and position of the image.",
    labels: ["Principal axis", "Pole (P) / optical centre (O)", "Principal focus (F)", "Centre of curvature (C) / 2F", "Concave mirror — reflects", "Convex lens — refracts", "R = 2f", "1/v − 1/u = 1/f (lens)"],
    Svg: () => (
      <>
        <T x={160} y={26} anchor="middle" size={11.5} bold>
          Concave mirror
        </T>
        <T x={480} y={26} anchor="middle" size={11.5} bold>
          Convex lens
        </T>

        <L x1={30} y1={170} x2={300} y2={170} w={1.4} opacity={0.55} dashed />
        <Path d="M262 74 q46 96 0 192" opacity={0.85} w={2.4} />
        <T x={272} y={62} size={10}>
          mirror
        </T>
        <Dot cx={262} cy={170} r={3.6} />
        <T x={262} y={192} anchor="middle" size={9.5}>
          P
        </T>
        <Dot cx={190} cy={170} r={3.6} />
        <T x={190} y={192} anchor="middle" size={9.5}>
          F
        </T>
        <Dot cx={118} cy={170} r={3.6} />
        <T x={118} y={192} anchor="middle" size={9.5}>
          C
        </T>
        <Arrow x1={40} y1={110} x2={252} y2={110} marker="ar-mirror-lens-ray" />
        <T x={44} y={102} size={9.5}>
          incident ray
        </T>
        <Arrow x1={256} y1={112} x2={196} y2={166} marker="ar-mirror-lens-ray" />
        <T x={148} y={128} size={9.5}>
          reflected through F
        </T>
        <Arrow x1={190} y1={170} x2={60} y2={228} marker="ar-mirror-lens-ray" />
        <T x={62} y={246} size={9.5}>
          reflected ray
        </T>
        <T x={160} y={272} anchor="middle" size={9.5} opacity={0.8}>
          f = R/2 → 1/v + 1/u = 1/f
        </T>

        <L x1={350} y1={170} x2={620} y2={170} w={1.4} opacity={0.55} dashed />
        <Path d="M470 66 q34 104 0 208 q-34 -104 0 -208 Z" opacity={0.35} fill="currentColor" />
        <Path d="M470 66 q34 104 0 208" opacity={0.85} w={2.2} />
        <Path d="M470 66 q-34 104 0 208" opacity={0.85} w={2.2} />
        <T x={470} y={300} anchor="middle" size={9.5}>
          convex lens
        </T>
        <Dot cx={470} cy={170} r={3.6} />
        <T x={470} y={192} anchor="middle" size={9.5}>
          O
        </T>
        <Dot cx={400} cy={170} r={3.6} />
        <T x={400} y={192} anchor="middle" size={9.5}>
          F₁
        </T>
        <Dot cx={540} cy={170} r={3.6} />
        <T x={540} y={192} anchor="middle" size={9.5}>
          F₂
        </T>
        <Arrow x1={324} y1={110} x2={462} y2={110} marker="ar-mirror-lens-ray" />
        <T x={330} y={102} size={9.5}>
          parallel ray
        </T>
        <Arrow x1={474} y1={112} x2={534} y2={166} marker="ar-mirror-lens-ray" />
        <Arrow x1={470} y1={250} x2={596} y2={210} marker="ar-mirror-lens-ray" />
        <T x={530} y={244} size={9.5}>
          refracted through F₂
        </T>
        <T x={480} y={326} anchor="middle" size={9.5} opacity={0.8}>
          Power P = 1/f (metre) in dioptre
        </T>

        <L x1={26} y1={338} x2={614} y2={338} dashed opacity={0.4} />
        <T x={26} y={358} size={10}>
          Magnification m = h′/h = −v/u (mirror) or v/u (lens). Negative m means a real, inverted image.
        </T>
      </>
    ),
  },
  {
    id: "human-eye",
    title: "Structure of the human eye and defects of vision",
    caption: "Most refraction happens at the cornea; the eye lens fine-tunes the focus and the retina converts light into signals. Myopia is corrected with a concave lens and hypermetropia with a convex lens.",
    labels: ["Cornea", "Aqueous humour", "Iris and pupil", "Eye lens", "Ciliary muscles", "Retina (rods and cones)", "Optic nerve", "Vitreous humour", "Least distance of distinct vision = 25 cm"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Human eye — image is formed on the retina (real and inverted)
        </T>

        <circle cx={320} cy={180} r={128} fill="currentColor" fillOpacity={0.04} stroke="currentColor" strokeOpacity={0.55} />
        <Path d="M192 180 q-38 -60 6 -96 q40 -34 90 -14" opacity={0.75} w={3} />
        <T x={176} y={92} size={10} anchor="end" bold>
          cornea
        </T>

        <Path d="M262 96 q-26 84 0 168" opacity={0.7} w={2.6} />
        <T x={252} y={78} size={10} anchor="end">
          iris
        </T>
        <ellipse cx={270} cy={180} rx={16} ry={30} fill="currentColor" fillOpacity={0.18} stroke="currentColor" strokeOpacity={0.6} />
        <T x={270} y={248} anchor="middle" size={9.5}>
          lens
        </T>
        <Path d="M234 116 q22 12 20 32" opacity={0.6} />
        <Path d="M234 244 q22 -12 20 -32" opacity={0.6} />
        <T x={214} y={272} size={9.5} anchor="end">
          ciliary muscles
        </T>

        <Path d="M318 60 q120 20 122 120 q-2 100 -122 120" opacity={0.65} />
        <T x={452} y={78} size={10}>
          retina (rods & cones)
        </T>
        <T x={452} y={272} size={10}>
          optic nerve
        </T>
        <Path d="M440 220 q46 16 66 40" opacity={0.7} w={2.4} />
        <T x={330} y={300} anchor="middle" size={9.5} opacity={0.8}>
          vitreous humour
        </T>
        <T x={250} y={120} size={9.5} opacity={0.8}>
          aqueous humour
        </T>

        <Arrow x1={150} y1={180} x2={244} y2={180} marker="ar-human-eye" />
        <T x={146} y={200} anchor="end" size={9.5}>
          light
        </T>
        <Path d="M270 150 L420 168" opacity={0.35} />
        <Path d="M270 210 L420 192" opacity={0.35} />
        <Path d="M420 168 L420 192" opacity={0.5} />

        <Box x={26} y={248} w={150} h={92} />
        <T x={42} y={272} size={10} bold>
          Defects
        </T>
        <T x={42} y={292} size={9.5} opacity={0.85}>
          Myopia → concave lens
        </T>
        <T x={42} y={310} size={9.5} opacity={0.85}>
          Hypermetropia → convex
        </T>
        <T x={42} y={328} size={9.5} opacity={0.85}>
          Presbyopia → bifocal
        </T>

        <L x1={26} y1={352} x2={614} y2={352} dashed opacity={0.4} />
      </>
    ),
  },
  {
    id: "electric-circuit",
    title: "Electric circuit with a battery, bulbs, ammeter and voltmeter",
    caption: "The ammeter is connected in series to measure current, and the voltmeter in parallel to measure the potential difference across a component. Appliances at home are connected in parallel.",
    labels: ["Battery (source of potential difference)", "Bulbs in series", "Ammeter in series", "Voltmeter in parallel", "Switch / key", "V = IR (Ohm's law)", "Series: R = R₁ + R₂", "Parallel: 1/R = 1/R₁ + 1/R₂"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Measuring current and potential difference
        </T>

        <L x1={90} y1={110} x2={520} y2={110} w={2} opacity={0.75} />
        <L x1={90} y1={110} x2={90} y2={270} w={2} opacity={0.75} />
        <L x1={520} y1={110} x2={520} y2={270} w={2} opacity={0.75} />
        <L x1={90} y1={270} x2={520} y2={270} w={2} opacity={0.75} />

        <g>
          <L x1={148} y1={102} x2={148} y2={118} w={2.4} opacity={0.8} />
          <L x1={164} y1={94} x2={164} y2={126} w={2.4} opacity={0.8} />
          <T x={156} y={84} anchor="middle" size={9.5}>
            battery
          </T>
        </g>

        <g>
          <circle cx={280} cy={110} r={15} fill="none" stroke="currentColor" strokeOpacity={0.7} />
          <L x1={272} y1={118} x2={288} y2={102} w={1.4} opacity={0.7} />
          <T x={280} y={84} anchor="middle" size={9.5}>
            bulb 1
          </T>
        </g>
        <g>
          <circle cx={400} cy={110} r={15} fill="none" stroke="currentColor" strokeOpacity={0.7} />
          <L x1={392} y1={118} x2={408} y2={102} w={1.4} opacity={0.7} />
          <T x={400} y={84} anchor="middle" size={9.5}>
            bulb 2
          </T>
        </g>

        <g>
          <circle cx={250} cy={270} r={17} fill="rgb(249 115 22 / 0.14)" stroke="currentColor" strokeOpacity={0.7} />
          <T x={250} y={275} anchor="middle" size={11} bold>
            A
          </T>
          <T x={250} y={306} anchor="middle" size={9.5}>
            ammeter (series)
          </T>
        </g>

        <g>
          <L x1={330} y1={200} x2={330} y2={270} w={1.6} opacity={0.7} />
          <L x1={470} y1={200} x2={470} y2={270} w={1.6} opacity={0.7} />
          <circle cx={400} cy={200} r={17} fill="rgb(59 130 246 / 0.14)" stroke="currentColor" strokeOpacity={0.7} />
          <T x={400} y={205} anchor="middle" size={11} bold>
            V
          </T>
          <T x={400} y={176} anchor="middle" size={9.5}>
            voltmeter (parallel)
          </T>
        </g>

        <g>
          <L x1={430} y1={270} x2={448} y2={262} w={2} opacity={0.8} />
          <T x={470} y={296} anchor="middle" size={9.5}>
            switch
          </T>
        </g>

        <T x={120} y={146} size={10} opacity={0.85}>
          current I
        </T>

        <T x={26} y={330} size={10.5}>
          V = IR · Series: R = R₁ + R₂ (same current) · Parallel: 1/R = 1/R₁ + 1/R₂ (same potential difference)
        </T>
        <T x={26} y={350} size={10.5}>
          H = I²Rt (heating effect) · P = VI = I²R = V²/R · 1 kWh = 3.6 × 10⁶ J
        </T>
      </>
    ),
  },
  {
    id: "magnetic-field-wire",
    title: "Magnetic field around a current-carrying straight wire",
    caption: "The field lines are concentric circles around the wire and become farther apart with distance. The right-hand thumb rule gives the direction of the field.",
    labels: ["Current-carrying straight wire", "Concentric circular field lines", "Right-hand thumb rule", "Field weakens with distance", "Solenoid behaves like a bar magnet", "Fleming's left-hand rule → motor"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Right-hand thumb rule: thumb along current, curled fingers give the field
        </T>

        <L x1={330} y1={54} x2={330} y2={320} w={3.4} opacity={0.85} />
        <Arrow x1={330} y1={300} x2={330} y2={92} marker="ar-magnetic-field-wire" />
        <T x={344} y={72} size={10.5} bold>
          current I (upward)
        </T>

        {[52, 94, 138].map((r, i) => (
          <g key={`ring${r}`}>
            <Ellipse cx={300} cy={188} rx={r} ry={r * 0.42} opacity={0.65 - i * 0.12} />
            <Arrow x1={300 + r - 4} y1={188 - r * 0.16} x2={300 + r - 14} y2={188 - r * 0.3} marker="ar-magnetic-field-wire" />
            <Arrow x1={300 - r + 4} y1={188 + r * 0.16} x2={300 - r + 14} y2={188 + r * 0.3} marker="ar-magnetic-field-wire" />
          </g>
        ))}
        <Leader x1={172} y1={120} x2={282} y2={158} />
        <T x={168} y={116} size={10} anchor="end">
          field lines
        </T>
        <T x={168} y={132} size={9} opacity={0.75} anchor="end">
          (concentric circles)
        </T>

        <T x={62} y={206} size={10} opacity={0.85}>
          closer lines
        </T>
        <T x={62} y={222} size={10} opacity={0.85}>
          = stronger field
        </T>

        <rect x={396} y={92} width={218} height={100} rx={12} fill="currentColor" fillOpacity={0.03} stroke="currentColor" strokeOpacity={0.45} />
        <T x={412} y={116} size={10.5} bold>
          Right-hand thumb rule
        </T>
        <T x={412} y={138} size={10} opacity={0.85}>
          Thumb → direction of current
        </T>
        <T x={412} y={156} size={10} opacity={0.85}>
          Curled fingers → direction of field
        </T>
        <T x={412} y={178} size={10} opacity={0.85}>
          Field ∝ 1/distance from the wire
        </T>

        <rect x={396} y={204} width={218} height={116} rx={12} fill="rgb(249 115 22 / 0.08)" stroke="currentColor" strokeOpacity={0.45} />
        <T x={412} y={228} size={10.5} bold>
          Rules to remember
        </T>
        <T x={412} y={250} size={10} opacity={0.85}>
          Left hand → motor (F = BIL)
        </T>
        <T x={412} y={268} size={10} opacity={0.85}>
          Right hand → generator (induction)
        </T>
        <T x={412} y={286} size={10} opacity={0.85}>
          Solenoid → uniform field inside
        </T>
        <T x={412} y={304} size={10} opacity={0.85}>
          Electromagnet: soft iron + coil
        </T>

        <T x={26} y={342} size={10.5}>
          Domestic supply: 220 V, 50 Hz · live (red), neutral (black), earth (green) · fuse and earth wire protect the user
        </T>
      </>
    ),
  },
  {
    id: "food-chain",
    title: "Food chain, trophic levels and the 10 percent law",
    caption: "Energy flows from producers to consumers, and only about 10% of the energy passes to the next trophic level. Harmful non-biodegradable chemicals become more concentrated at every level.",
    labels: ["Producer (1st trophic level)", "Primary consumer — herbivore (2nd)", "Secondary consumer — carnivore (3rd)", "Energy flow is unidirectional", "10 percent law", "Decomposers break down wastes", "Biological magnification"],
    Svg: () => (
      <>
        <T x={320} y={24} anchor="middle" size={12} bold>
          Energy flow in a grassland food chain
        </T>

        <Box x={26} y={70} w={150} h={110} />
        <T x={101} y={104} anchor="middle" size={11.5} bold>
          Grass
        </T>
        <T x={101} y={124} anchor="middle" size={9.5} opacity={0.85}>
          producer
        </T>
        <T x={101} y={146} anchor="middle" size={9.5} opacity={0.75}>
          photosynthesis
        </T>
        <T x={101} y={164} anchor="middle" size={9.5} opacity={0.75}>
          traps solar energy
        </T>

        <Arrow x1={182} y1={124} x2={232} y2={124} marker="ar-food-chain" />
        <T x={207} y={110} anchor="middle" size={9}>
          10%
        </T>

        <Box x={238} y={70} w={150} h={110} />
        <T x={313} y={104} anchor="middle" size={11.5} bold>
          Deer
        </T>
        <T x={313} y={124} anchor="middle" size={9.5} opacity={0.85}>
          primary consumer
        </T>
        <T x={313} y={146} anchor="middle" size={9.5} opacity={0.75}>
          herbivore
        </T>
        <T x={313} y={164} anchor="middle" size={9.5} opacity={0.75}>
          2nd trophic level
        </T>

        <Arrow x1={394} y1={124} x2={444} y2={124} marker="ar-food-chain" />
        <T x={419} y={110} anchor="middle" size={9}>
          10%
        </T>

        <Box x={450} y={70} w={164} h={110} tone="brand" />
        <T x={532} y={104} anchor="middle" size={11.5} bold>
          Lion
        </T>
        <T x={532} y={124} anchor="middle" size={9.5} opacity={0.85}>
          secondary consumer
        </T>
        <T x={532} y={146} anchor="middle" size={9.5} opacity={0.75}>
          carnivore
        </T>
        <T x={532} y={164} anchor="middle" size={9.5} opacity={0.75}>
          3rd trophic level
        </T>

        <Arrow x1={470} y1={232} x2={556} y2={232} marker="ar-food-chain" />
        <T x={513} y={222} anchor="middle" size={9}>
          energy lost as heat
        </T>

        <Box x={330} y={196} w={128} h={70} />
        <T x={394} y={222} anchor="middle" size={10.5} bold>
          Decomposers
        </T>
        <T x={394} y={242} anchor="middle" size={9.5} opacity={0.8}>
          bacteria & fungi
        </T>
        <T x={200} y={240} anchor="middle" size={9.5} opacity={0.8}>
          dead remains
        </T>
        <Arrow x1={272} y1={232} x2={328} y2={232} marker="ar-food-chain" />

        <L x1={26} y1={284} x2={614} y2={284} dashed opacity={0.4} />
        <T x={26} y={306} size={10.5}>
          • Only about 10% of the energy is transferred to the next level, so food chains have only 3–4 trophic levels
        </T>
        <T x={26} y={326} size={10.5}>
          • Flow of energy is unidirectional: Sun → producers → herbivores → carnivores
        </T>
        <T x={26} y={346} size={10.5}>
          • Pesticides are non-biodegradable → biological magnification → highest concentration in humans
        </T>
      </>
    ),
  },
];
