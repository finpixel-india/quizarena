import type { NoteSection } from "./types";

export const expandedMath: Record<string, NoteSection[]> = {
  /* -------------------------------- CLASS 9 -------------------------------- */
  "note-math9-1": [
    { title: "Rational and irrational numbers in detail", points: [
      "A rational number can be written as p/q in lowest terms, with p and q integers and q ≠ 0. Integers, terminating decimals and recurring decimals are rational.",
      "Irrational numbers such as √2, √3 and π cannot be written as a ratio of integers; their decimals neither terminate nor repeat.",
      "The real number line contains both rational and irrational numbers. Between any two distinct real numbers there are infinitely many rational and irrational numbers.",
      "For a rational p/q in lowest terms, the decimal terminates exactly when q has only 2s and/or 5s as prime factors; otherwise it is recurring. Example: 13/40 terminates because 40 = 2³×5.",
    ] },
    { title: "Surds, rationalisation and laws of exponents", points: [
      "For positive a and b: √a × √b = √(ab), √a/√b = √(a/b), and (√a)² = a. Simplify square factors before combining surds.",
      "To rationalise 1/√a, multiply numerator and denominator by √a. For 1/(√a+√b), multiply by the conjugate (√a−√b).",
      "Exponent laws apply to non-zero bases where required: powers add during multiplication and subtract during division; a negative exponent means reciprocal.",
      "A common error is √(a+b)=√a+√b, which is false. For example, √(9+16)=5, not 7.",
    ], tip: "When proving √p is irrational for prime p, assume √p=a/b in lowest terms; squaring forces p to divide both a and b, a contradiction." },
  ],
  "note-math9-2": [
    { title: "Types, degree and zeroes of polynomials", points: [
      "A polynomial has real coefficients and variable powers that are non-negative integers. Expressions such as 1/x and √x are not polynomials in x.",
      "A non-zero constant has degree 0; the zero polynomial has no defined degree. Terms with the same power are like terms and can be combined.",
      "A zero of p(x) is a number α such that p(α)=0. Graphically, a zero is the x-coordinate where the graph meets the x-axis.",
      "A non-zero polynomial of degree n has at most n zeroes. A line may meet the x-axis once, a parabola at most twice, and a cubic curve at most three times.",
    ] },
    { title: "Identities, factorisation and verification", points: [
      "Use identities to expand and factor expressions; choose the identity whose pattern matches the terms.",
      "For x²+(a+b)x+ab, factor as (x+a)(x+b). For a²−b², factor as (a−b)(a+b).",
      "The remainder theorem says the remainder on division by (x−a) is p(a). If p(a)=0, the factor theorem says (x−a) is a factor.",
      "After factorising, multiply the factors back or substitute a value to verify the result.",
    ], formula: ["(a+b)³ = a³+3a²b+3ab²+b³", "a³+b³ = (a+b)(a²−ab+b²)", "a³−b³ = (a−b)(a²+ab+b²)"] },
  ],
  "note-math9-3": [
    { title: "Plotting and reading points", points: [
      "To plot (x,y), move x units horizontally from the origin, then y units vertically. Positive directions are right and up; negative directions left and down.",
      "On the x-axis, y=0; on the y-axis, x=0. A point on an axis is not in any quadrant.",
      "The origin is the common starting point of the axes. A point's distance from an axis is the absolute value of its other coordinate: distance from x-axis is |y|.",
      "Reflection in the x-axis changes (x,y) to (x,−y); reflection in the y-axis changes it to (−x,y); reflection in the origin gives (−x,−y).",
    ] },
    { title: "Coordinate diagrams and applications", points: [
      "Use equal scales on both axes unless the question specifies otherwise. Label the scale, axes and points clearly.",
      "Coordinates can represent locations on a map or grid, such as a classroom seating plan, city map or position of a moving object.",
      "Check the sign of both coordinates before deciding the quadrant: I (+,+), II (−,+), III (−,−), IV (+,−).",
    ], tip: "Read an ordered pair in the stated order: the first coordinate is always horizontal (x), the second vertical (y)." },
  ],
  "note-math9-4": [
    { title: "Finding and graphing solutions", points: [
      "A linear equation in two variables has infinitely many solutions. If y=2x+1, choosing x=0, 1, 2 gives y=1, 3, 5 and points (0,1), (1,3), (2,5).",
      "Plot two solutions and join them with a straight line; every point on the line represents a solution.",
      "An equation can be written in general form ax+by+c=0. If b≠0, solve for y to identify the slope and y-intercept.",
      "Real-life example: two adult tickets and one child ticket cost $25; define ticket prices and form an equation from the total.",
    ] },
    { title: "Intercepts and special lines", points: [
      "The x-intercept is found by setting y=0; the y-intercept by setting x=0.",
      "Equations x=a and y=b are vertical and horizontal lines respectively. The line x=0 is the y-axis; y=0 is the x-axis.",
      "A point belongs to the line only if substituting its coordinates makes the equation true.",
    ], tip: "A straight line needs only two distinct points, but calculate a third point to check for plotting mistakes." },
  ],
  "note-math9-5": [
    { title: "Euclid's definitions, axioms and postulates", points: [
      "Euclid described a point as that which has no part, a line as breadthless length, and a surface as having length and breadth only.",
      "Axioms are accepted truths used throughout mathematics; postulates are assumptions specific to geometry.",
      "Euclid's first postulate permits a straight line from any point to any other point; the second allows a finite line to be extended; the third allows a circle with any centre and radius.",
      "The fourth says all right angles are equal. The fifth (parallel postulate) is the most complex and concerns lines cut by a transversal.",
    ] },
    { title: "Equivalent forms and proof structure", points: [
      "An equivalent statement can express the same postulate differently; learning these helps identify when a theorem depends on the parallel postulate.",
      "A mathematical proof begins with accepted facts and definitions, then uses logical steps to establish a conclusion.",
      "For example, if two lines intersect, they cannot both be parallel to a third line through the same point — this follows from uniqueness of a parallel line.",
    ], tip: "Use precise language: an axiom/postulate is accepted without proof, while a theorem must be proved." },
  ],
  "note-math9-6": [
    { title: "Angle pairs and parallel-line tests", points: [
      "A transversal crossing two lines creates eight angles. Corresponding angles are in matching positions; alternate interior angles lie between the lines on opposite sides.",
      "For parallel lines, corresponding and alternate interior angles are equal, and co-interior angles sum to 180°.",
      "Conversely, equality of a corresponding or alternate interior pair proves the two lines parallel; supplementary co-interior angles also prove parallelism.",
      "Vertically opposite angles are equal; adjacent angles on a straight line form a linear pair and sum to 180°.",
    ] },
    { title: "Using angle facts in triangle proofs", points: [
      "Draw an auxiliary line parallel to one side of a triangle to use corresponding or alternate angles and prove the angle-sum property.",
      "The exterior angle of a triangle equals the sum of the two remote interior angles and is greater than either one individually.",
      "Use a clear chain of statements and reasons: identify the pair of angles, state the rule, then calculate the unknown angle.",
    ], tip: "Mark equal angles with matching arcs before writing a proof; it makes the relationship visible." },
  ],
  "note-math9-7": [
    { title: "Congruence rules and choosing the correct one", points: [
      "SSS: all three corresponding sides equal. SAS: two sides and their included angle equal. ASA: two angles and their included side equal.",
      "RHS applies only to right triangles: equal hypotenuse and one corresponding side are sufficient.",
      "AAA proves similarity, not congruence: equal angles fix shape but not size. SSA is not generally a valid congruence rule.",
      "When triangles are congruent, CPCT gives equality of their remaining corresponding sides and angles.",
    ] },
    { title: "Triangle inequalities and special triangles", points: [
      "The sum of any two sides must exceed the third; this test tells whether three proposed lengths can form a triangle.",
      "The difference of two sides is less than the third side. The third side must therefore lie strictly between their difference and sum.",
      "In an isosceles triangle, the equal sides face equal angles. If two angles are equal, their opposite sides are equal.",
      "An equilateral triangle has three 60° angles; a right triangle follows Pythagoras' theorem in later chapters.",
    ], tip: "Write the order of vertices consistently, e.g. ΔABC ≅ ΔPQR, so A↔P, B↔Q, C↔R." },
  ],
  "note-math9-8": [
    { title: "Recognising and proving parallelograms", points: [
      "In a parallelogram, opposite sides are parallel and equal; opposite angles are equal; adjacent angles are supplementary.",
      "Its diagonals bisect each other. If diagonals of a quadrilateral bisect each other, the quadrilateral is a parallelogram.",
      "A quadrilateral is a parallelogram if one pair of opposite sides is both equal and parallel, or if both pairs of opposite sides are equal.",
      "Rectangle: all angles 90° and diagonals equal. Rhombus: all sides equal and diagonals perpendicular. Square: both rectangle and rhombus properties.",
    ] },
    { title: "Midpoint theorem and applications", points: [
      "The segment joining the midpoints of two sides of a triangle is parallel to the third side and half of its length.",
      "Conversely, a line through the midpoint of one side and parallel to another side bisects the third side.",
      "Use the theorem in constructions and to prove a quadrilateral is a parallelogram by drawing a diagonal and comparing midpoints.",
    ], tip: "Do not assume every quadrilateral with equal diagonals is a rectangle; extra conditions may be required." },
  ],
  "note-math9-9": [
    { title: "Area theorems and their use", points: [
      "Parallelograms on the same base and between the same parallels have equal area because they share the same base and perpendicular height.",
      "Triangles on the same base and between the same parallels also have equal area; each is half the area of the corresponding parallelogram.",
      "Triangles with equal bases and equal heights have equal areas, even if their shapes look different.",
      "If triangles share a height, their area ratio equals the ratio of their bases; if they share a base, ratio equals the ratio of heights.",
    ] },
    { title: "Proof strategy and common mistakes", points: [
      "Draw the perpendicular height; a sloping side is not the height unless it is perpendicular to the base.",
      "Use congruence or equal-base/equal-height arguments to show two triangles have equal area.",
      "Area of a triangle inside a parallelogram can be compared to the whole parallelogram as 1:2 when they share base and height.",
    ], formula: ["Area triangle = ½ × base × perpendicular height", "Area parallelogram = base × perpendicular height"] },
  ],
  "note-math9-10": [
    { title: "Chords, angles and distance from centre", points: [
      "Equal chords subtend equal angles at the centre, and equal central angles subtend equal chords.",
      "A perpendicular from the centre to a chord bisects it. The converse also holds: a line through the centre and midpoint of a chord is perpendicular to it.",
      "Equal chords are equidistant from the centre; chords equidistant from the centre are equal.",
      "The perpendicular bisector of a chord passes through the centre. Therefore two perpendicular bisectors of different chords locate a circle's centre.",
    ] },
    { title: "Circle constructions and proof steps", points: [
      "Three non-collinear points determine exactly one circle: construct perpendicular bisectors of two joining segments; their intersection is the centre.",
      "When proving chord results, join the centre to both endpoints. The radii form isosceles triangles that can be compared.",
      "A diameter is the longest chord because it passes through the centre; its length is twice the radius.",
    ], tip: "Every radius is equal, so use radii as the equal sides when proving triangles congruent." },
  ],
  "note-math9-11": [
    { title: "Construction method and justification", points: [
      "To construct the perpendicular bisector of AB, use the same compass radius greater than half AB from A and B; join the two arc intersections.",
      "To bisect an angle, draw an arc from its vertex cutting both arms, then draw equal arcs from those two points and join the intersection to the vertex.",
      "For SSS, draw the base, then arcs with the other two side lengths; their intersection is the third vertex.",
      "For SAS or ASA, construct the given angle(s) with a protractor or compass construction and mark the known side lengths.",
    ] },
    { title: "Accuracy checklist", points: [
      "Keep compass width fixed while drawing matching arcs and leave the construction arcs visible.",
      "Use a ruler for straight segments and label every vertex and given length.",
      "Write why the construction is valid: equal radii give equal distances; angle bisectors create equal angles; triangle congruence establishes uniqueness.",
    ], tip: "A neat construction is part of the answer: label the result and do not erase the arcs that prove it." },
  ],
  "note-math9-12": [
    { title: "Applying Heron's formula", points: [
      "Heron's formula is useful when all three side lengths are known but height is not given or is difficult to calculate.",
      "Find s first, then calculate each positive factor s−a, s−b and s−c; their product with s goes under the square root.",
      "For sides 13 cm, 14 cm and 15 cm, s=21 and area=√(21×8×7×6)=84 cm².",
      "For a quadrilateral, draw a diagonal and calculate the areas of the two triangles separately, then add or subtract as required.",
    ] },
    { title: "Checking whether lengths form a triangle", points: [
      "Before using the formula, verify that every pair of sides sums to more than the third side.",
      "A zero factor means the points are collinear and the area is zero; a negative factor indicates the lengths do not form a triangle.",
      "The equilateral-triangle shortcut follows by setting all three sides equal: area = (√3/4)a².",
    ], formula: ["s = (a+b+c)/2", "A = √[s(s−a)(s−b)(s−c)]"] },
  ],
  "note-math9-13": [
    { title: "Solids and their nets", points: [
      "A cuboid has six rectangular faces; a cube has six square faces. A cylinder's curved surface unwraps into a rectangle of length 2πr and height h.",
      "A cone's curved surface unwraps into a sector of radius slant height l; l²=r²+h².",
      "Sphere and hemisphere surface area depend on radius; a hemisphere's total area includes its circular base, while curved area does not.",
      "For combined solids, identify joined surfaces that are hidden and should not be counted in exposed surface area.",
    ] },
    { title: "Unit conversion and volume applications", points: [
      "1 cm³ = 1 mL; 1000 cm³ = 1 L; 1 m³ = 1000 L. Convert before calculating if units differ.",
      "Capacity of tanks, water displacement and material required for painting are common applications.",
      "For recasting, the amount of material stays constant, so the original volume equals the sum of new volumes.",
    ], formula: ["Cylinder: CSA=2πrh, TSA=2πr(r+h), V=πr²h", "Cone: l=√(r²+h²), CSA=πrl, V=⅓πr²h", "Sphere: SA=4πr², V=⁴⁄₃πr³"] },
  ],
  "note-math9-14": [
    { title: "Choosing the right average", points: [
      "Mean uses every observation and is affected by very large or small values; median is robust to extreme values; mode identifies the most common value.",
      "For an odd number of ordered observations, median is the middle value; for an even number, it is the average of the two middle values.",
      "For grouped data, the mean can be estimated using class marks and frequencies; the total frequency is the number of observations.",
      "A histogram represents continuous intervals with touching rectangles; a frequency polygon joins points at class marks.",
    ] },
    { title: "Reading and presenting data", points: [
      "Always arrange data in ascending order before identifying the median.",
      "Frequency tables reduce large lists into manageable groups; choose non-overlapping class intervals of consistent size.",
      "Graphs need a title, labelled axes, units and a sensible scale. Do not begin a bar graph at an arbitrary value without showing a break.",
    ], formula: ["Mean = Σx/n", "Mean for frequency table = Σfx/Σf", "Median position (ungrouped) = (n+1)/2"] },
  ],
  "note-math9-15": [
    { title: "Sample space and probability", points: [
      "List all equally likely outcomes before counting: a coin has {H,T}; a die has {1,2,3,4,5,6}; two coins have four ordered outcomes.",
      "An event may contain one outcome (getting a 6) or several outcomes (getting an even number: {2,4,6}).",
      "For a fair die, P(even)=3/6=1/2; P(number greater than 4)=2/6=1/3.",
      "The sum of probabilities of all mutually exclusive outcomes in a sample space is 1.",
    ] },
    { title: "Complement and fair outcomes", points: [
      "If E is an event, 'not E' contains every outcome outside E; P(E)+P(not E)=1.",
      "A fair coin or die has equally likely outcomes; a biased object does not, so simple favourable/total counting may not apply.",
      "Probability describes chance, not certainty of what will happen in one trial; repeated experiments tend to approach the theoretical value.",
    ], tip: "The total number of outcomes must be counted with the same level of detail as the favourable outcomes." },
  ],

  /* -------------------------------- CLASS 10 -------------------------------- */
  "note-math10-1": [
    { title: "Euclid's division algorithm and HCF", points: [
      "For positive integers a and b, write a=bq+r with 0≤r<b; repeat division until the remainder is zero. The last non-zero remainder is HCF.",
      "Example: 225=135×1+90; 135=90×1+45; 90=45×2+0, so HCF=45.",
      "Prime factorisation is unique apart from order; it helps calculate HCF using common prime powers and LCM using greatest powers.",
      "For two numbers, HCF×LCM equals their product. This relation is not generally used for three or more numbers.",
    ] },
    { title: "Rational numbers and decimal expansion", points: [
      "Reduce p/q to lowest terms. The decimal terminates if the denominator's only prime factors are 2 and 5; the decimal places needed depend on the larger exponent.",
      "If the denominator contains any other prime factor, the decimal expansion is non-terminating recurring.",
      "The square root of a prime number is irrational; proof uses contradiction and the fact that a prime dividing a² also divides a.",
    ], tip: "Always simplify a fraction before checking its denominator's prime factors." },
  ],
  "note-math10-2": [
    { title: "Zeroes and coefficient relations", points: [
      "The graph of a quadratic polynomial y=ax²+bx+c is a parabola. Its intersections with the x-axis are its real zeroes.",
      "A parabola can cut the x-axis at two points, touch it at one point, or not meet it; this matches two, equal or no real roots.",
      "If α and β are zeroes, construct a polynomial with those zeroes using x²−(α+β)x+αβ, then multiply by any non-zero constant.",
      "For cubics, sum of roots = −b/a, pairwise-product sum = c/a and product = −d/a.",
    ] },
    { title: "Division algorithm for polynomials", points: [
      "Divide one polynomial by another using long division, arranging terms by descending powers and including missing powers with coefficient zero.",
      "Check the answer by multiplying divisor × quotient and adding the remainder; it must equal the dividend.",
      "A factor (x−a) can be tested quickly by evaluating p(a). If p(a)=0, it is a factor.",
    ], formula: ["p(x) = g(x)q(x) + r(x)", "For ax²+bx+c: sum of zeroes = −b/a; product = c/a"] },
  ],
  "note-math10-3": [
    { title: "Solving pairs by different methods", points: [
      "Substitution: express one variable from one equation and substitute in the other. Best when a variable has coefficient 1 or −1.",
      "Elimination: multiply equations to make one pair of coefficients equal/opposite, then add or subtract.",
      "Cross-multiplication is useful for standard form but sign accuracy is crucial; write all numerators before simplifying.",
      "Graphically, intersecting lines give one solution, parallel lines none, coincident lines infinitely many.",
    ] },
    { title: "Forming equations from word problems", points: [
      "Translate phrases carefully: sum, difference, twice, consecutive, speed×time=distance, and total cost are common relationships.",
      "Define variables with units, build two independent equations, solve, then check the values in the original context.",
      "If ratios of coefficients indicate parallel lines, avoid elimination: the pair may have no solution or infinitely many.",
    ], formula: ["Unique solution: a₁/a₂ ≠ b₁/b₂", "No solution: a₁/a₂ = b₁/b₂ ≠ c₁/c₂", "Infinite solutions: a₁/a₂ = b₁/b₂ = c₁/c₂"] },
  ],
  "note-math10-4": [
    { title: "Solving and interpreting roots", points: [
      "Factorisation solves a quadratic when it can be written as a product of two linear factors; set each factor to zero.",
      "Completing the square converts ax²+bx+c into a perfect-square form, useful for deriving the quadratic formula.",
      "The quadratic formula works for every quadratic equation with a≠0; retain both the plus and minus roots.",
      "For word problems, reject roots that do not fit the situation (for example a negative length or time).",
    ] },
    { title: "Discriminant and nature of roots", points: [
      "D=b²−4ac >0 gives two distinct real roots; D=0 gives equal real roots; D<0 gives no real roots.",
      "When D is a perfect square, roots are rational; when positive but not a perfect square, roots are irrational.",
      "The product and sum of roots can verify a solution without fully expanding the factors.",
    ], formula: ["D = b²−4ac", "Roots = [−b±√D]/2a", "α+β=−b/a; αβ=c/a"] },
  ],
  "note-math10-5": [
    { title: "Finding the first term and common difference", points: [
      "Given two terms aₘ and aₙ, subtract their equations: aₙ−aₘ=(n−m)d, then solve for d and substitute to find a.",
      "The nth term is useful for deciding whether a number occurs in an AP: solve n and check it is a positive integer.",
      "For an AP, terms equidistant from the beginning and end have equal sum: a₁+aₙ=a₂+aₙ₋₁.",
      "An AP can increase (d>0), decrease (d<0), or remain constant (d=0).",
    ] },
    { title: "Applications of sums", points: [
      "Use Sₙ for total savings, total seats, total objects arranged in rows, or distances covered in stages.",
      "If the last term is given, use Sₙ=n/2(a+l); otherwise use the formula containing d.",
      "Check whether the problem asks for the nth term or the sum of the first n terms — they are different quantities.",
    ], formula: ["aₙ=a+(n−1)d", "Sₙ=n/2[2a+(n−1)d]", "Sₙ=n/2(a+l)"] },
  ],
  "note-math10-6": [
    { title: "Similarity criteria and proportionality", points: [
      "AAA similarity: if corresponding angles are equal, triangles are similar. SAS: included angle equal and surrounding sides proportional. SSS: all corresponding sides proportional.",
      "In similar triangles, corresponding sides are in the same ratio, perimeters follow the same ratio and areas follow the square of the ratio.",
      "BPT: a line parallel to one side divides the other two sides proportionally; its converse proves parallelism from equal ratios.",
      "Similarity is not congruence: similar figures have the same shape but may differ in size.",
    ] },
    { title: "Pythagoras theorem and proof practice", points: [
      "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.",
      "The converse says if the square of the longest side equals the sum of the squares of the other two, the triangle is right-angled.",
      "Many proofs draw an altitude to the hypotenuse, creating two smaller triangles similar to the original.",
      "Label corresponding vertices consistently before writing side ratios.",
    ], formula: ["a²+b²=c² (right triangle)", "Area ratio of similar triangles = square of corresponding-side ratio"] },
  ],
  "note-math10-7": [
    { title: "Coordinate applications", points: [
      "Distance formula is Pythagoras theorem applied to horizontal difference x₂−x₁ and vertical difference y₂−y₁.",
      "A point dividing a segment internally in ratio m:n is closer to the endpoint with the larger share of the ratio opposite it; verify with simple examples.",
      "Midpoint formula is a special case of section formula with m=n=1.",
      "For collinearity, calculate triangle area; if area equals zero, the three points lie on one straight line.",
    ] },
    { title: "Choosing a coordinate strategy", points: [
      "To prove a quadrilateral is a rectangle, compare opposite sides/diagonals; coordinate slopes may also show perpendicular sides if the method is known.",
      "The area formula works regardless of whether the triangle is acute, right or obtuse because absolute value is used.",
      "Keep fractions exact until the final step to avoid rounding errors.",
    ], formula: ["Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)", "Area triangle = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|"] },
  ],
  "note-math10-8": [
    { title: "Standard trigonometric values", points: [
      "Know the table of sin, cos and tan for 0°, 30°, 45°, 60° and 90°. Cosec, sec and cot are reciprocals and may be undefined when denominator is zero.",
      "Complementary-angle relations: sin(90°−θ)=cosθ, cos(90°−θ)=sinθ, tan(90°−θ)=cotθ.",
      "Use identities to simplify: divide sin²θ+cos²θ=1 by cos²θ to obtain 1+tan²θ=sec²θ.",
      "Trigonometric ratios in Class 10 are defined for acute angles of a right triangle; side labels change with the chosen angle.",
    ] },
    { title: "Identity proofs and ratio conversion", points: [
      "Convert all ratios to sin and cos if stuck, simplify algebraically, and avoid changing only one side of an identity.",
      "From one ratio, draw a right triangle to find others using Pythagoras: if tanθ=3/4, opposite=3, adjacent=4, hypotenuse=5.",
      "Check denominators before using reciprocal ratios; secθ and tanθ are undefined at 90° in this right-triangle context.",
    ], formula: ["sin²θ+cos²θ=1", "1+tan²θ=sec²θ", "1+cot²θ=cosec²θ", "tanθ=sinθ/cosθ"] },
  ],
  "note-math10-9": [
    { title: "Setting up height-and-distance diagrams", points: [
      "Draw a horizontal baseline from the observer and a vertical line for the object; label the right angle at the base.",
      "The angle of elevation is between the horizontal and upward line of sight; angle of depression is between the horizontal and downward line of sight.",
      "For two observation points, use the same object's height and relate the two right triangles through a common vertical side.",
      "If the observer stands on a platform or building, total height is platform height plus calculated height above eye level.",
    ] },
    { title: "Choosing ratios and checking answers", points: [
      "Use tanθ when opposite and adjacent sides are involved, sinθ for opposite/hypotenuse and cosθ for adjacent/hypotenuse.",
      "Do not confuse distance from the object with height; identify each side relative to the given angle.",
      "Round only at the end and check the result is physically sensible (height should be positive, and larger angle usually means closer object for fixed height).",
    ], tip: "Always state the final answer with units and the object referred to." },
  ],
  "note-math10-10": [
    { title: "Tangent theorems and proof", points: [
      "At the point of contact, a tangent is perpendicular to the radius through that point; use the 90° angle in right-triangle proofs.",
      "Tangents from an external point are equal. Join the external point to the centre and compare the two right triangles using RHS congruence.",
      "A circle can have infinitely many tangents, but exactly one tangent at a particular point on the circle.",
      "A line whose distance from the centre is less than the radius is a secant; equal to the radius is tangent; greater than the radius does not meet the circle.",
    ] },
    { title: "Applying tangent results", points: [
      "If PA and PB are tangents from P, then PA=PB; this can help find perimeter of a circumscribed triangle or quadrilateral.",
      "Radii to contact points often form isosceles or right triangles; mark all equal radii before proving.",
      "A circle inscribed in a triangle touches all three sides; tangent segments from the same vertex are equal.",
    ], formula: ["OA ⟂ PA", "PA = PB for tangents from P", "Tangent length² = OP² − r²"] },
  ],
  "note-math10-11": [
    { title: "Dividing a line segment in a ratio", points: [
      "Draw a ray from one endpoint and mark m+n equal arcs. Join the last point to the other endpoint, then draw a parallel through the mth point.",
      "The parallel divides the original segment internally in the ratio m:n by the Basic Proportionality Theorem.",
      "For a scale factor k, construct a similar triangle with sides k times the original; k<1 gives a reduction and k>1 an enlargement.",
      "To construct tangents from P to a circle, join P to the centre O, find midpoint M of OP, draw circle centred at M through O/P; intersections with original circle give contact points.",
    ] },
    { title: "Construction quality checklist", points: [
      "Use the stated scale factor accurately and label corresponding vertices in the same order.",
      "Keep compass arcs and mark the parallel/perpendicular symbols in the final figure.",
      "State the theorem used to justify the construction and show the ratio or right angle it guarantees.",
    ], tip: "The construction is not complete without clear labels and visible auxiliary arcs." },
  ],
  "note-math10-12": [
    { title: "Sector, arc and segment problems", points: [
      "A central angle θ is a fraction θ/360 of a complete turn, so the sector area and arc length use the same fraction of the full circle.",
      "A minor segment is sector area minus the triangle formed by the two radii and chord; a major segment is circle area minus minor segment.",
      "An annulus is the region between concentric circles; its area is the outer-circle area minus inner-circle area.",
      "For a wire bent into a circle, circumference is conserved; when reshaped into a square, set circle circumference equal to square perimeter.",
    ] },
    { title: "Composite regions and unit checks", points: [
      "Split a shaded figure into familiar sectors, triangles and rectangles, then add or subtract their areas.",
      "Convert degrees to fractions of 360° before calculating; keep π exact until the final answer if possible.",
      "Length answers use units such as cm; areas use cm². Never report an area in linear units.",
    ], formula: ["Arc length = (θ/360)2πr", "Sector area = (θ/360)πr²", "Annulus area = π(R²−r²)"] },
  ],
  "note-math10-13": [
    { title: "Frustum and combined-solid reasoning", points: [
      "A frustum is formed by cutting a smaller cone parallel to its base. Its two radii are R and r; vertical height is h and slant height is l.",
      "A capsule/cylinder with hemispherical ends has volume of cylinder plus volumes of two hemispheres (one sphere).",
      "When a solid is hollow, subtract inner volume from outer volume; when painting, count only exposed surface area.",
      "For melting and recasting, equate original volume to total new volume, even if the density/material is unchanged.",
    ] },
    { title: "Selecting surface area correctly", points: [
      "A closed cylinder includes both circular ends in TSA; an open cylinder may have one or neither base exposed.",
      "A hemisphere's curved area is 2πr²; its total area including the flat circular base is 3πr².",
      "A cone's slant height is not its vertical height; use l=√(r²+h²) when required.",
    ], formula: ["Frustum l = √[h²+(R−r)²]", "Frustum volume = ⅓πh(R²+r²+Rr)"] },
  ],
  "note-math10-14": [
    { title: "Grouped-data mean methods", points: [
      "Direct method: calculate class marks xᵢ, multiply by frequency fᵢ, and use Σfᵢxᵢ/Σfᵢ.",
      "Assumed-mean method uses dᵢ=xᵢ−a to simplify arithmetic: mean = a + Σfᵢdᵢ/Σfᵢ.",
      "Step-deviation method uses uᵢ=(xᵢ−a)/h: mean = a + h(Σfᵢuᵢ/Σfᵢ), useful for equal class widths.",
      "Class mark is midpoint, not lower class limit. Convert inclusive intervals into continuous boundaries when needed.",
    ] },
    { title: "Median and mode of grouped data", points: [
      "Median class is identified from cumulative frequency at N/2; l is its lower boundary, cf is cumulative frequency before it, f is its frequency and h class width.",
      "Modal class has the largest frequency. f₁ is modal-class frequency, f₀ preceding and f₂ succeeding frequency.",
      "The empirical relation Mode ≈ 3 Median − 2 Mean is approximate and applies to moderately skewed distributions.",
    ], formula: ["Median = l + [(N/2−cf)/f]h", "Mode = l + [(f₁−f₀)/(2f₁−f₀−f₂)]h", "Mean (step deviation) = a + hΣfu/Σf"] },
  ],
  "note-math10-15": [
    { title: "Counting outcomes carefully", points: [
      "For coins, distinguish ordered outcomes: two coins give HH, HT, TH, TT. If order does not matter in the question, still count each equally likely experiment outcome correctly.",
      "For two dice there are 36 ordered pairs, not 21; events such as sum=7 have six favourable outcomes.",
      "A deck has 52 cards: 4 suits, 13 cards each, 26 red and 26 black; face cards are J, Q and K (12 total).",
      "For a number chosen from 1 to n, count favourable integers inclusively and make sure endpoints are handled correctly.",
    ] },
    { title: "Complementary and compound events", points: [
      "The complement method is efficient when an event is easier to describe as 'not occurring', such as at least one head = 1 − probability of no heads.",
      "For mutually exclusive outcomes, probabilities of alternatives can be added; for independent sequential events, probabilities are multiplied when appropriate.",
      "The classical formula assumes all outcomes are equally likely; use the experimental frequency approach when the question gives observed trials.",
    ], formula: ["P(E)=favourable outcomes / total equally likely outcomes", "P(not E)=1−P(E)", "0≤P(E)≤1"] },
  ],
};
