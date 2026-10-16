// Verified answer key and explanations for CBSE Class 9 and Class 10 Mathematics Practice Arenas
export interface MathAnswerItem {
  correctKey: string;
  explanation: string;
}

export const MATH_ANSWERS: Record<string, MathAnswerItem> = {
  "note-math10-1-1": {
    "correctKey": "B",
    "explanation": "HCF is the product of the smallest power of each common prime factor. For a = x³y² and b = xy³, common factors are x¹ and y². Hence, HCF(a, b) = xy²."
  },
  "note-math10-1-2": {
    "correctKey": "A",
    "explanation": "Using HCF(a, b) × LCM(a, b) = a × b: 9 × LCM = 306 × 657 => LCM = (306 × 657) / 9 = 34 × 657 = 22,338."
  },
  "note-math10-1-3": {
    "correctKey": "C",
    "explanation": "The denominator is 2¹ × 5⁴. The decimal expansion of a rational number p / (2ⁿ · 5ᵐ) terminates after max(n, m) places. Here max(1, 4) = 4 decimal places."
  },
  "note-math10-1-4": {
    "correctKey": "C",
    "explanation": "3 + √5 is the sum of a non-zero rational number (3) and an irrational number (√5), which is strictly irrational. 22/7 and 3.1416 are rational, and √(4/9) = 2/3 is rational."
  },
  "note-math10-1-5": {
    "correctKey": "A",
    "explanation": "The required number divides (70 - 5 = 65) and (125 - 8 = 117) exactly. HCF(65, 117) = HCF(13 × 5, 13 × 9) = 13."
  },
  "note-math10-2-1": {
    "correctKey": "B",
    "explanation": "Since 2 is a zero of p(x) = x² + 3x + k, p(2) = 0 => (2)² + 3(2) + k = 0 => 4 + 6 + k = 0 => k = -10."
  },
  "note-math10-2-2": {
    "correctKey": "B",
    "explanation": "For 2x² + 5x - 12: α + β = -b/a = -5/2, and αβ = c/a = -12/2 = -6. 1/α + 1/β = (α + β) / (αβ) = (-5/2) / (-6) = 5/12."
  },
  "note-math10-2-3": {
    "correctKey": "B",
    "explanation": "A quadratic polynomial with sum of zeroes S = -5 and product P = 6 is given by k[x² - Sx + P] = k[x² - (-5)x + 6] = x² + 5x + 6 (for k = 1)."
  },
  "note-math10-2-4": {
    "correctKey": "C",
    "explanation": "Each point where the graph intersects the x-axis corresponds to a real zero, and each point of contact (touching) corresponds to coincident real zeroes. Total real zeroes = 3 + 2 = 5."
  },
  "note-math10-2-5": {
    "correctKey": "C",
    "explanation": "For equal zeroes, the discriminant D = b² - 4ac = 0 => 4ac = b². Since b² > 0 for real non-zero b, 4ac must be positive, which means 'a' and 'c' must have the same sign."
  },
  "note-math10-3-1": {
    "correctKey": "C",
    "explanation": "For infinitely many solutions, a₁/a₂ = b₁/b₂ = c₁/c₂. Thus 2/(k+1) = 3/(2k-1) = 7/(4k+1). Solving 2(2k - 1) = 3(k + 1) gives 4k - 2 = 3k + 3 => k = 5. Checking: 2/6 = 3/9 = 7/21 = 1/3."
  },
  "note-math10-3-2": {
    "correctKey": "C",
    "explanation": "For lines to be parallel, a₁/a₂ = b₁/b₂ ≠ c₁/c₂. Here 3/2 = 2k/5 => 4k = 15 => k = 15/4. (And c₁/c₂ = -2/1 ≠ 3/2, so condition holds)."
  },
  "note-math10-3-3": {
    "correctKey": "B",
    "explanation": "Let stream speed be y km/h. Upstream speed = (8 - y), downstream speed = (8 + y). 30/(8 - y) + 44/(8 + y) = 10. For y = 3: 30/5 + 44/11 = 6 + 4 = 10. Thus stream speed is 3 km/h."
  },
  "note-math10-3-4": {
    "correctKey": "D",
    "explanation": "a₁/a₂ = 1/(-3) = -1/3; b₁/b₂ = 2/(-6) = -1/3; c₁/c₂ = 5/1 = 5. Since a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are parallel and have no solution."
  },
  "note-math10-3-5": {
    "correctKey": "B",
    "explanation": "Let digits be x and y (x + y = 9). Number is 10x + y. Adding 27: (10x + y) + 27 = 10y + x => 9y - 9x = 27 => y - x = 3. Solving x + y = 9 and y - x = 3 yields x = 3, y = 6. The number is 36."
  },
  "note-math10-4-1": {
    "correctKey": "D",
    "explanation": "Expanding (D): x³ - x² = x³ - 3x²(1) + 3x(1)² - 1³ => x³ - x² = x³ - 3x² + 3x - 1 => 2x² - 3x + 1 = 0, which is of degree 2 (quadratic)."
  },
  "note-math10-4-2": {
    "correctKey": "D",
    "explanation": "For equal roots, D = b² - 4ac = 0. Here (-k)² - 4(2)(k) = 0 => k² - 8k = 0 => k(k - 8) = 0 => k = 0 or k = 8."
  },
  "note-math10-4-3": {
    "correctKey": "A",
    "explanation": "D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8."
  },
  "note-math10-4-4": {
    "correctKey": "A",
    "explanation": "Substitute x = 1/2: (1/2)² + k(1/2) - 5/4 = 0 => 1/4 + k/2 - 5/4 = 0 => k/2 - 1 = 0 => k/2 = 1 => k = 2."
  },
  "note-math10-4-5": {
    "correctKey": "C",
    "explanation": "Let integers be x and x + 1. x² + (x + 1)² = 365 => 2x² + 2x + 1 = 365 => 2x² + 2x - 364 = 0 => x² + x - 182 = 0 => (x + 14)(x - 13) = 0. Positive integer x = 13, next is 14."
  },
  "note-math10-5-1": {
    "correctKey": "B",
    "explanation": "In 10, 7, 4, ..., -62: l = -62, d = -3. The 11th term from the end is a₁₁' = l - (n - 1)d = -62 - (11 - 1)(-3) = -62 - 10(-3) = -62 + 30 = -32."
  },
  "note-math10-5-2": {
    "correctKey": "B",
    "explanation": "a₁₅ = S₁₅ - S₁₄ = [3(15)² + 5(15)] - [3(14)² + 5(14)] = [3(225) + 75] - [3(196) + 70] = 750 - 658 = 92."
  },
  "note-math10-5-3": {
    "correctKey": "D",
    "explanation": "Since terms are in AP: (x + 10) - 2x = (3x + 2) - (x + 10) => 10 - x = 2x - 8 => 3x = 18 => x = 6."
  },
  "note-math10-5-4": {
    "correctKey": "B",
    "explanation": "Two-digit multiples of 3 are 12, 15, ..., 99. Here a = 12, d = 3, l = 99. aₙ = a + (n - 1)d => 99 = 12 + (n - 1)3 => 87 = 3(n - 1) => n - 1 = 29 => n = 30."
  },
  "note-math10-5-5": {
    "correctKey": "A",
    "explanation": "In 10, 6, 2, ...: a = 10, d = 6 - 10 = -4. S₁₆ = (16/2)[2(10) + (16 - 1)(-4)] = 8[20 + 15(-4)] = 8[20 - 60] = 8(-40) = -320."
  },
  "note-math10-6-1": {
    "correctKey": "B",
    "explanation": "By BPT: AD/DB = AE/EC => 3/4 = 6/EC => 3 EC = 24 => EC = 8 cm."
  },
  "note-math10-6-2": {
    "correctKey": "A",
    "explanation": "AB/QR = BC/PR = CA/PQ. The vertices correspond as: B ↔ R, A ↔ Q, and C ↔ P. Thus, △PQR ~ △CAB."
  },
  "note-math10-6-3": {
    "correctKey": "B",
    "explanation": "At the same time, sun elevation is identical, so pole and tower form similar right triangles (AA similarity): (Height of pole)/(Shadow of pole) = (Height of tower)/(Shadow of tower) => 6/4 = h/28 => h = (6 × 28)/4 = 42 m."
  },
  "note-math10-6-4": {
    "correctKey": "C",
    "explanation": "Since △ABC ~ △EDF, AB/ED = BC/DF = AC/EF. Cross-multiplying: AB · DF = BC · ED, and BC · EF = AC · DF, and AB · EF = AC · DE. But BC · DE = AB · EF is NOT true (it equates non-corresponding cross products)."
  },
  "note-math10-6-5": {
    "correctKey": "A",
    "explanation": "Ratio of perimeters of similar triangles equals ratio of corresponding sides: Perimeter(△ABC) / Perimeter(△PQR) = AB / PQ => 36 / 24 = AB / 10 => 3/2 = AB / 10 => AB = 15 cm."
  },
  "note-math10-7-1": {
    "correctKey": "C",
    "explanation": "Distance from origin (0, 0) is d = √(x² + y²) = √((-6)² + 8²) = √(36 + 64) = √100 = 10 units."
  },
  "note-math10-7-2": {
    "correctKey": "C",
    "explanation": "By section formula for ratio 1 : 2: x = [1(-7) + 2(2)] / (1 + 2) = (-7 + 4) / 3 = -3/3 = -1. Since P is (k, 0), k = -1."
  },
  "note-math10-7-3": {
    "correctKey": "B",
    "explanation": "On the y-axis, x = 0. Let the ratio be k : 1. Using section formula for x: x = [k(-1) + 1(5)] / (k + 1) = 0 => -k + 5 = 0 => k = 5. Hence, ratio is 5 : 1."
  },
  "note-math10-7-4": {
    "correctKey": "D",
    "explanation": "Diagonals of a parallelogram bisect each other: Midpoint of AC = Midpoint of BD => (6 + 9)/2 = (8 + p)/2 => 15 = 8 + p => p = 7."
  },
  "note-math10-7-5": {
    "correctKey": "A",
    "explanation": "Centroid G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3) = ((0 + 8 + 8)/3, (6 + 12 + 0)/3) = (16/3, 18/3) = (16/3, 6)."
  },
  "note-math10-8-1": {
    "correctKey": "B",
    "explanation": "cos θ = Base/Hypotenuse = 4/5. Perpendicular = √(5² - 4²) = √(25 - 16) = √9 = 3. tan θ = Perpendicular/Base = 3/4."
  },
  "note-math10-8-2": {
    "correctKey": "B",
    "explanation": "sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1. Value = 1/2 + 1/2 - 1 = 1 - 1 = 0."
  },
  "note-math10-8-3": {
    "correctKey": "B",
    "explanation": "Using identity sec² θ - tan² θ = 1 => (sec θ - tan θ)(sec θ + tan θ) = 1. Since sec θ + tan θ = p, sec θ - tan θ = 1/p."
  },
  "note-math10-8-4": {
    "correctKey": "B",
    "explanation": "9 sec² A - 9 tan² A = 9(sec² A - tan² A). By identity sec² A - tan² A = 1, this equals 9(1) = 9."
  },
  "note-math10-8-5": {
    "correctKey": "C",
    "explanation": "sin θ - cos θ = 0 => sin θ = cos θ => tan θ = 1 => θ = 45°. sin⁴ 45° + cos⁴ 45° = (1/√2)⁴ + (1/√2)⁴ = 1/4 + 1/4 = 2/4 = 1/2."
  },
  "note-math10-9-1": {
    "correctKey": "B",
    "explanation": "tan θ = Height / Shadow. When height = shadow, tan θ = 1, which corresponds to θ = 45°."
  },
  "note-math10-9-2": {
    "correctKey": "B",
    "explanation": "The ladder makes 60° with the wall. The wall is adjacent to the 60° angle. cos 60° = (Height of wall) / (Length of ladder) => 1/2 = h / 15 => h = 15/2 m."
  },
  "note-math10-9-3": {
    "correctKey": "C",
    "explanation": "Angle of depression = angle of elevation = 30°. In the right triangle: tan 30° = 75 / d => 1/√3 = 75 / d => d = 75√3 m."
  },
  "note-math10-9-4": {
    "correctKey": "A",
    "explanation": "tan 60° = (Height of tower) / 100 => √3 = h / 100 => h = 100√3 m."
  },
  "note-math10-9-5": {
    "correctKey": "B",
    "explanation": "Let distance between building and tower be d. Bottom of tower: tan 60° = 60 / d => √3 = 60 / d => d = 60/√3 = 20√3 m. Top of tower: height above tower is x. tan 30° = x / d => 1/√3 = x / (20√3) => x = 20 m. Height of tower = 60 - x = 60 - 20 = 40 m."
  },
  "note-math10-10-1": {
    "correctKey": "A",
    "explanation": "The radius, tangent, and line from centre to external point form a right triangle: OP² = OQ² + tangent² => 25² = r² + 24² => 625 = r² + 576 => r² = 49 => r = 7 cm."
  },
  "note-math10-10-2": {
    "correctKey": "A",
    "explanation": "In quadrilateral OAPB: ∠AOB = 180° - 80° = 100° (since radii are perpendicular to tangents). Line OP bisects ∠AOB, so ∠POA = 100° / 2 = 50°."
  },
  "note-math10-10-3": {
    "correctKey": "D",
    "explanation": "In right △OPA, ∠OPA = 60° / 2 = 30° and OA = 3 cm. tan 30° = OA / PA => 1/√3 = 3 / PA => PA = 3√3 cm."
  },
  "note-math10-10-4": {
    "correctKey": "B",
    "explanation": "For a quadrilateral circumscribing a circle, sum of opposite sides are equal: AB + CD = AD + BC => 6 + 4 = AD + 7 => 10 = AD + 7 => AD = 3 cm."
  },
  "note-math10-10-5": {
    "correctKey": "B",
    "explanation": "A parallelogram circumscribing a circle has AB + CD = AD + BC => 2AB = 2AD => AB = AD. A parallelogram with adjacent sides equal is necessarily a Rhombus."
  },
  "note-math10-11-1": {
    "correctKey": "A",
    "explanation": "Given Perimeter = Area => 2πr = πr² => 2r = r² (for r > 0) => r = 2 units."
  },
  "note-math10-11-2": {
    "correctKey": "D",
    "explanation": "Area of sector = (θ/360) × πR². For θ = p: (p/360) × πR² = (p/720) × 2πR² (multiplying numerator and denominator by 2)."
  },
  "note-math10-11-3": {
    "correctKey": "A",
    "explanation": "In 60 minutes, minute hand sweeps 360°, so in 5 minutes it sweeps θ = (360/60) × 5 = 30°. Area = (30/360) × πr² = (1/12) × (22/7) × (14)² = (1/12) × (22/7) × 196 = (1/12) × 616 = 154/3 cm²."
  },
  "note-math10-11-4": {
    "correctKey": "C",
    "explanation": "Circumference doubles (2π to 4π), so radius doubles (r to 2r). Area is proportional to r², so new area = π(2r)² = 4(πr²), which is four times the original."
  },
  "note-math10-11-5": {
    "correctKey": "A",
    "explanation": "The largest inscribed triangle in a semicircle has base equal to the diameter (2r) and height equal to the radius (r). Area = (1/2) × base × height = (1/2) × 2r × r = r²."
  },
  "note-math10-12-1": {
    "correctKey": "B",
    "explanation": "Volume of each cube = a³ = 64 => a = 4 cm. When joined end to end, the cuboid has l = 4 + 4 = 8 cm, b = 4 cm, h = 4 cm. TSA = 2(lb + bh + hl) = 2(32 + 16 + 32) = 2(80) = 160 cm²."
  },
  "note-math10-12-2": {
    "correctKey": "B",
    "explanation": "Original volume = πr²h. Reduced radius is r/2, so reduced volume = π(r/2)²h = (1/4)πr²h. Ratio = (1/4)πr²h : πr²h = 1 : 4."
  },
  "note-math10-12-3": {
    "correctKey": "A",
    "explanation": "Number of balls = (Volume of large sphere) / (Volume of small sphere) = [(4/3)π(3)³] / [(4/3)π(0.6)³] = 27 / 0.216 = 27000 / 216 = 125."
  },
  "note-math10-12-4": {
    "correctKey": "A",
    "explanation": "TSA of article = CSA of cylinder + 2 × (CSA of hemisphere) = 2πrh + 2(2πr²) = 2πr(h + 2r) = 2 × (22/7) × 3.5 × [10 + 2(3.5)] = 22 × (10 + 7) = 22 × 17 = 374 cm²."
  },
  "note-math10-12-5": {
    "correctKey": "B",
    "explanation": "Surface area of sphere = 4πr² = 616 => 4 × (22/7) × r² = 616 => r² = (616 × 7) / 88 = 49 => r = 7 cm. Diameter = 2r = 14 cm."
  },
  "note-math10-13-1": {
    "correctKey": "B",
    "explanation": "Using Karl Pearson's empirical relation: 3 Median = Mode + 2 Mean => 3 Median = 24 + 2(24) = 72 => Median = 24."
  },
  "note-math10-13-2": {
    "correctKey": "C",
    "explanation": "The maximum frequency is 20, corresponding to the class interval 30 - 40. The lower limit of this modal class is 30."
  },
  "note-math10-13-3": {
    "correctKey": "B",
    "explanation": "Mode = 3 Median - 2 Mean = 3(38) - 2(35) = 114 - 70 = 44."
  },
  "note-math10-13-4": {
    "correctKey": "C",
    "explanation": "In the Assumed Mean formula, dᵢ = xᵢ - a, representing the deviation of each class mark xᵢ from the chosen assumed mean a."
  },
  "note-math10-13-5": {
    "correctKey": "C",
    "explanation": "In grouped data calculations, each continuous class interval is statistically represented by its central midpoint (class mark xᵢ), assuming frequencies are centred at class marks."
  },
  "note-math10-14-1": {
    "correctKey": "B",
    "explanation": "The probability of an event must strictly satisfy 0 ≤ P(E) ≤ 1. A negative number (-1.5) cannot represent probability."
  },
  "note-math10-14-2": {
    "correctKey": "A",
    "explanation": "P(not E) = 1 - P(E) = 1 - 0.05 = 0.95."
  },
  "note-math10-14-3": {
    "correctKey": "B",
    "explanation": "There are 12 face cards in total (4 Kings, 4 Queens, 4 Jacks). Half of them are black (6 cards: 2 spades, 2 clubs). P(black face card) = 6/52 = 3/26."
  },
  "note-math10-14-4": {
    "correctKey": "A",
    "explanation": "Total outcomes on rolling two dice = 36. Favourable outcomes with sum 8 are (2, 6), (3, 5), (4, 4), (5, 3), (6, 2) => 5 outcomes. P(sum 8) = 5/36."
  },
  "note-math10-14-5": {
    "correctKey": "B",
    "explanation": "Total marbles = 3 + 2 + 4 = 9. Non-white marbles = blue (3) + red (4) = 7. P(not white) = 7/9 (or 1 - P(white) = 1 - 2/9 = 7/9)."
  },
  "note-math9-1-1": {
    "correctKey": "A",
    "explanation": "Zero can be written as 0/1, 0/2, 0/(-5), etc., where 0 and q are integers and q ≠ 0. Hence, zero is a rational number."
  },
  "note-math9-1-2": {
    "correctKey": "D",
    "explanation": "√2 is an irrational number, so its decimal expansion is non-terminating and non-recurring."
  },
  "note-math9-1-3": {
    "correctKey": "B",
    "explanation": "Let x = 0.4777... 10x = 4.777... and 100x = 47.777... Subtracting gives 90x = 43 => x = 43/90."
  },
  "note-math9-1-4": {
    "correctKey": "A",
    "explanation": "Multiplying by conjugate (3√3 + 2√2): Denominator = (3√3)² - (2√2)² = (9 × 3) - (4 × 2) = 27 - 8 = 19."
  },
  "note-math9-1-5": {
    "correctKey": "C",
    "explanation": "64^(-1/2) = 1/√64 = 1/8. (-32)^(-4/5) = 1/[(-32)^(4/5)] = 1/[(-2)⁴] = 1/16. Value = 1/8 - 1/16 = 2/16 - 1/16 = 1/16."
  },
  "note-math9-2-1": {
    "correctKey": "C",
    "explanation": "x² + √2 x + 5 has exponents 2 and 1 (whole numbers) on variable x, so it is a polynomial. The other options contain negative powers or fractional powers (√x = x^(1/2), 1/x = x^(-1))."
  },
  "note-math9-2-2": {
    "correctKey": "B",
    "explanation": "p(-1) = (-1)³ - 3(-1)² + 2(-1) + 5 = -1 - 3(1) - 2 + 5 = -1 - 3 - 2 + 5 = -1."
  },
  "note-math9-2-3": {
    "correctKey": "B",
    "explanation": "By Factor Theorem, (x - 2) is a factor => p(2) = 0 => 2(2)² - 3(2) + k = 0 => 8 - 6 + k = 0 => k = -2."
  },
  "note-math9-2-4": {
    "correctKey": "C",
    "explanation": "x³/yz + y³/zx + z³/xy = (x³ + y³ + z³) / (xyz). Since x + y + z = 0, x³ + y³ + z³ = 3xyz. Hence, 3xyz / xyz = 3."
  },
  "note-math9-2-5": {
    "correctKey": "B",
    "explanation": "4x² + 12xy + 9y² = (2x)² + 2(2x)(3y) + (3y)² = (2x + 3y)²."
  },
  "note-math9-3-1": {
    "correctKey": "B",
    "explanation": "In (-3, 5), the abscissa is negative (-3 < 0) and ordinate is positive (5 > 0), which defines Quadrant II."
  },
  "note-math9-3-2": {
    "correctKey": "C",
    "explanation": "The perpendicular distance of any point (x, y) from the x-axis is |y|. For P(3, -4), distance is |-4| = 4 units."
  },
  "note-math9-3-3": {
    "correctKey": "B",
    "explanation": "Every point with abscissa zero (x = 0) lies on the y-axis, having coordinates (0, y)."
  },
  "note-math9-3-4": {
    "correctKey": "B",
    "explanation": "Abscissa of P is -2. Abscissa of Q is -3. (Abscissa of P) - (Abscissa of Q) = (-2) - (-3) = -2 + 3 = 1."
  },
  "note-math9-3-5": {
    "correctKey": "B",
    "explanation": "A(0, 0) is the origin, B(3, 0) lies along the x-axis, and C(0, 4) lies along the y-axis. The angle between coordinate axes at the origin is 90°, forming a right-angled triangle."
  },
  "note-math9-4-1": {
    "correctKey": "C",
    "explanation": "A linear equation in two variables has infinitely many solutions (every point on its straight line graph represents a valid solution)."
  },
  "note-math9-4-2": {
    "correctKey": "D",
    "explanation": "The graph cuts the y-axis where x = 0: 2(0) + 3y = 6 => 3y = 6 => y = 2. The point is (0, 2)."
  },
  "note-math9-4-3": {
    "correctKey": "A",
    "explanation": "Substitute x = 2 and y = 0 into 2x + 3y = k: 2(2) + 3(0) = k => 4 + 0 = k => k = 4."
  },
  "note-math9-4-4": {
    "correctKey": "B",
    "explanation": "Any linear equation of the form y = mx has c = 0, so substituting (0, 0) gives 0 = 0. Thus, y = mx always passes through the origin."
  },
  "note-math9-4-5": {
    "correctKey": "D",
    "explanation": "For any point on the line y = x, the abscissa equals the ordinate, so the point is of the form (a, a)."
  },
  "note-math9-5-1": {
    "correctKey": "B",
    "explanation": "According to Euclid's definitions: a solid has 3 dimensions, a surface has 2 dimensions (length and breadth), a line has 1, and a point has 0 dimensions."
  },
  "note-math9-5-2": {
    "correctKey": "A",
    "explanation": "'Things which are equal to the same thing are equal to one another' is the first axiom (Axiom 1) in Euclid's Elements."
  },
  "note-math9-5-3": {
    "correctKey": "A",
    "explanation": "According to Axiom 5.1 (derived from Postulate 1), given two distinct points, there is a unique line that passes through them."
  },
  "note-math9-5-4": {
    "correctKey": "B",
    "explanation": "Since C is between A and B, AC + BC = AB. Given AC = BC, we get AC + AC = AB => 2AC = AB => AC = 1/2 AB."
  },
  "note-math9-5-5": {
    "correctKey": "C",
    "explanation": "Euclid organized the mathematical knowledge of his time into his monumental treatise 'The Elements', which consists of 13 books."
  },
  "note-math9-6-1": {
    "correctKey": "B",
    "explanation": "Let the angle be x. Its supplement is (180° - x). x = (1/3)(180° - x) => 3x = 180° - x => 4x = 180° => x = 45°."
  },
  "note-math9-6-2": {
    "correctKey": "C",
    "explanation": "The sum of all angles around a point O is 360°. (∠AOC + ∠COB + ∠BOD) + ∠AOD = 360° => 270° + ∠AOD = 360° => ∠AOD = 360° - 270° = 90°."
  },
  "note-math9-6-3": {
    "correctKey": "B",
    "explanation": "Interior angles on the same side of a transversal are supplementary: 2x + 3x = 180° => 5x = 180° => x = 36°. The larger angle is 3x = 3 × 36° = 108°."
  },
  "note-math9-6-4": {
    "correctKey": "C",
    "explanation": "In a linear pair, angle₁ + angle₂ = 180°. If one angle is acute (< 90°), the other must be 180° - (acute) > 90°, which is an obtuse angle."
  },
  "note-math9-6-5": {
    "correctKey": "D",
    "explanation": "The reflex angle corresponding to an angle θ is 360° - θ. Reflex of 75° = 360° - 75° = 285°."
  },
  "note-math9-7-1": {
    "correctKey": "D",
    "explanation": "SSA (Side-Side-Angle) is not a valid criterion because it does not guarantee a unique triangle. The valid criteria are SAS, ASA, AAS, SSS, and RHS."
  },
  "note-math9-7-2": {
    "correctKey": "C",
    "explanation": "In △ABC, AB = AC implies ∠C = ∠B = 50° (angles opposite to equal sides are equal). ∠A = 180° - (50° + 50°) = 180° - 100° = 80°."
  },
  "note-math9-7-3": {
    "correctKey": "D",
    "explanation": "△ABC ≅ △PQR gives corresponding sides AB = PQ, BC = QR, AC = PR. Therefore, AB = QR is not true."
  },
  "note-math9-7-4": {
    "correctKey": "A",
    "explanation": "In △PQR, ∠R = ∠P implies that sides opposite to them are equal: PQ = QR. Since QR = 4 cm, PQ = 4 cm."
  },
  "note-math9-7-5": {
    "correctKey": "B",
    "explanation": "In right triangles, equality of hypotenuse (AB = EF) and one side (AC = DE) establishes congruence by the RHS (Right angle - Hypotenuse - Side) criterion."
  },
  "note-math9-8-1": {
    "correctKey": "B",
    "explanation": "Sum of angles = 360°. Let angles be 3x, 5x, 9x, 13x. 30x = 360° => x = 12°. The smallest angle is 3x = 3 × 12° = 36°."
  },
  "note-math9-8-2": {
    "correctKey": "C",
    "explanation": "A quadrilateral whose diagonals bisect each other perpendicularly at right angles is a Rhombus."
  },
  "note-math9-8-3": {
    "correctKey": "A",
    "explanation": "By the Mid-Point Theorem, the line segment joining the midpoints of two sides of a triangle is half of the third side: DE = (1/2)BC = 8.6 / 2 = 4.3 cm."
  },
  "note-math9-8-4": {
    "correctKey": "D",
    "explanation": "A Square is the only quadrilateral whose diagonals are both equal in length AND bisect each other at right angles (90°)."
  },
  "note-math9-8-5": {
    "correctKey": "B",
    "explanation": "Adjacent angles in a parallelogram are supplementary: (2x + 25) + (3x - 5) = 180° => 5x + 20 = 180° => 5x = 160° => x = 32."
  },
  "note-math9-9-1": {
    "correctKey": "B",
    "explanation": "The angle subtended by an arc at the centre is double the angle subtended at the circumference: ∠APB = (1/2)∠AOB = 100° / 2 = 50°."
  },
  "note-math9-9-2": {
    "correctKey": "B",
    "explanation": "Opposite angles of a cyclic quadrilateral are supplementary: ∠A + ∠C = 180° => (2x + 4) + (3x + 11) = 180° => 5x + 15 = 180° => 5x = 165° => x = 33."
  },
  "note-math9-9-3": {
    "correctKey": "A",
    "explanation": "The perpendicular from the centre bisects the chord: half chord L = 16 / 2 = 8 cm. In right triangle: r² = d² + L² => 10² = d² + 8² => 100 = d² + 64 => d² = 36 => d = 6 cm."
  },
  "note-math9-9-4": {
    "correctKey": "B",
    "explanation": "In cyclic ABCD, ∠B = 180° - 140° = 40°. Since AB is a diameter, angle in semicircle ∠ACB = 90°. In right △ABC, ∠BAC = 180° - (90° + 40°) = 50°."
  },
  "note-math9-9-5": {
    "correctKey": "B",
    "explanation": "In right triangle formed by radius, distance, and half chord: r² = d² + L² => 13² = 5² + L² => 169 = 25 + L² => L² = 144 => L = 12 cm. Full chord length = 2L = 24 cm."
  },
  "note-math9-10-1": {
    "correctKey": "A",
    "explanation": "Let sides be 12x, 17x, 25x. 54x = 540 => x = 10. Sides are 120, 170, 250 cm. s = 540/2 = 270 cm. Area = √[270(270 - 120)(270 - 170)(270 - 250)] = √[270 × 150 × 100 × 20] = √[81,000,000] = 9000 cm²."
  },
  "note-math9-10-2": {
    "correctKey": "A",
    "explanation": "Area of equilateral triangle = (√3/4)a² = (√3/4)(2√3)² = (√3/4)(12) = 3√3 cm²."
  },
  "note-math9-10-3": {
    "correctKey": "A",
    "explanation": "Sides 6, 8, 10 satisfy 6² + 8² = 10², forming a right triangle. Area = (1/2) × 6 × 8 = 24 cm². Cost = 24 × 9 paise = 216 paise = ₹ 2.16."
  },
  "note-math9-10-4": {
    "correctKey": "B",
    "explanation": "Perimeter = 60 m => side a = 60 / 3 = 20 m. Area = (√3/4)a² = (√3/4)(20)² = (√3/4)(400) = 100√3 m²."
  },
  "note-math9-10-5": {
    "correctKey": "A",
    "explanation": "For sides 13, 14, 15: s = 21 cm, Area = 84 cm². Area = (1/2) × base × height => 84 = (1/2) × 15 × h => h = (2 × 84) / 15 = 168 / 15 = 11.2 cm."
  },
  "note-math9-11-1": {
    "correctKey": "D",
    "explanation": "Radius is R = 2r. Volume of sphere = (4/3)πR³ = (4/3)π(2r)³ = (4/3)π(8r³) = 32/3 πr³."
  },
  "note-math9-11-2": {
    "correctKey": "B",
    "explanation": "Total surface area of a solid hemisphere = CSA + base area = 2πr² + πr² = 3πr²."
  },
  "note-math9-11-3": {
    "correctKey": "B",
    "explanation": "CSA of cone = πrl => 308 = (22/7) × r × 14 => 308 = 44r => r = 7 cm. Base diameter = 2r = 14 cm."
  },
  "note-math9-11-4": {
    "correctKey": "B",
    "explanation": "Volume of cone = (1/3)πr²h => 1570 = (1/3)(3.14)r²(15) => 1570 = 15.7 r² => r² = 100 => r = 10 cm."
  },
  "note-math9-11-5": {
    "correctKey": "C",
    "explanation": "Original CSA = 2πrh. New radius is r/2 and new height is 2h: New CSA = 2π(r/2)(2h) = 2πrh = Same."
  },
  "note-math9-12-1": {
    "correctKey": "C",
    "explanation": "Class mark = (Upper limit + Lower limit) / 2 = (150 + 130) / 2 = 280 / 2 = 140."
  },
  "note-math9-12-2": {
    "correctKey": "B",
    "explanation": "Mid-value = 10 and width = 6. Lower limit = Mid-value - (width/2) = 10 - 3 = 7. (Upper limit = 10 + 3 = 13)."
  },
  "note-math9-12-3": {
    "correctKey": "C",
    "explanation": "Range = Maximum value - Minimum value. Highest value = 32, lowest value = 6. Range = 32 - 6 = 26."
  },
  "note-math9-12-4": {
    "correctKey": "C",
    "explanation": "When class widths vary in a histogram, the rectangle heights must be adjusted so that area represents frequency. Hence, height is proportional to frequency density (adjusted frequency)."
  },
  "note-math9-12-5": {
    "correctKey": "C",
    "explanation": "A frequency polygon can be constructed directly by plotting the class marks of the intervals along with their corresponding frequencies, then joining points with line segments."
  }
};
