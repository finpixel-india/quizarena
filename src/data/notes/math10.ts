import type { ChapterNote } from "./types";

const U10 = "Mathematics · Class 10";

export const mathNotes10: ChapterNote[] = [
  {
    "id": "note-math10-1",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 1,
    "title": "Real Numbers",
    "unit": "Mathematics · Class 10",
    "overview": "Real numbers form the foundational bedrock of arithmetic and algebra. This chapter explores the Fundamental Theorem of Arithmetic, prime factorisation for computing HCF and LCM, and rigorous contradiction proofs for the irrationality of radicals.",
    "sections": [
      {
        "title": "The Fundamental Theorem of Arithmetic",
        "points": [
          "**Statement of the Theorem:** Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.",
          "**Canonical Representation:** Any composite number $x$ can be written as $x = p_1^{k_1} \\cdot p_2^{k_2} \\cdots p_n^{k_n}$, where $p_1 < p_2 < \\dots < p_n$ are distinct prime numbers and $k_i$ are positive integers.",
          "**Crucial Application — Checking Divisibility and Powers ($4^n$ or $6^n$ ending in 0):**",
          "• For any number to end with the digit 0, its prime factorisation must contain both the prime factors 2 and 5 (since $10 = 2 \times 5$).",
          "• For $4^n = (2^2)^n = 2^{2n}$: The only prime factor is 2. By the uniqueness of the Fundamental Theorem of Arithmetic, there are no other prime factors, so 5 cannot be a factor. Hence, $4^n$ can never end with the digit 0 for any natural number $n$.",
          "• Similarly for $6^n = (2 \times 3)^n$: Prime factors are only 2 and 3; lacking 5, $6^n$ never ends in 0."
        ],
        "formula": [
          "Composite Number = p₁ᵏ¹ · p₂ᵏ² ··· pₙᵏⁿ  (Fundamental Theorem of Arithmetic)",
          "Condition to end with digit 0: Prime factorisation must contain factors 2ᵐ × 5ⁿ (m, n ≥ 1)"
        ]
      },
      {
        "title": "HCF and LCM by Prime Factorisation Method",
        "points": [
          "**Highest Common Factor (HCF):** Product of the smallest power of each common prime factor involved in the numbers.",
          "**Lowest Common Multiple (LCM):** Product of the greatest power of each prime factor involved in the numbers.",
          "**Fundamental Relation for Two Positive Integers $a$ and $b$:**",
          "$$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$$",
          "**Important Warning:** This product relation holds **strictly for two numbers only**. For three numbers $p, q, r$, in general $\\text{HCF}(p, q, r) \\times \\text{LCM}(p, q, r) \\neq p \\times q \\times r$.",
          "**Worked Example:** Find HCF and LCM of 120 and 144.",
          "• $120 = 2^3 \\times 3^1 \\times 5^1$",
          "• $144 = 2^4 \\times 3^2$",
          "• $\\text{HCF}(120, 144) = 2^3 \\times 3^1 = 8 \\times 3 = 24$.",
          "• $\\text{LCM}(120, 144) = 2^4 \\times 3^2 \\times 5^1 = 16 \\times 9 \\times 5 = 720$.",
          "• Verification: $24 \\times 720 = 17,280 = 120 \\times 144$."
        ],
        "formula": [
          "HCF(a, b) × LCM(a, b) = a × b",
          "LCM(a, b) = (a × b) / HCF(a, b)",
          "HCF(a, b) = (a × b) / LCM(a, b)"
        ]
      },
      {
        "title": "Revisiting Irrational Numbers: Contradiction Proofs",
        "points": [
          "**Fundamental Theorem on Divisibility by Primes:** Let $p$ be a prime number. If $p$ divides $a^2$, then $p$ divides $a$, where $a$ is a positive integer.",
          "**Standard Proof: Prove that $\\sqrt{2}$ is irrational:**",
          "(1) *Assumption:* Assume on the contrary that $\\sqrt{2}$ is rational. Then $\\sqrt{2} = \\frac{a}{b}$, where $a$ and $b$ are co-prime integers ($b \\neq 0$, $\\text{HCF}(a, b) = 1$).",
          "(2) *Squaring:* $2 = \\frac{a^2}{b^2} \\implies 2b^2 = a^2$. Therefore, 2 divides $a^2$, which implies 2 divides $a$.",
          "(3) *Substitution:* So we can write $a = 2c$ for some integer $c$. Substituting gives $2b^2 = (2c)^2 = 4c^2 \\implies b^2 = 2c^2$.",
          "(4) *Contradiction:* This means 2 divides $b^2$, so 2 divides $b$. Thus, 2 is a common factor of both $a$ and $b$, contradicting our initial fact that $a$ and $b$ are co-prime.",
          "(5) *Conclusion:* Hence, our assumption is false; $\\sqrt{2}$ is irrational.",
          "**Proving Composite Forms (e.g., $3 + 2\\sqrt{5}$ or $\\frac{1}{\\sqrt{2}}$):**",
          "Assume $3 + 2\\sqrt{5} = \\frac{a}{b}$ is rational ($b \\neq 0$). Then $2\\sqrt{5} = \\frac{a}{b} - 3 = \\frac{a - 3b}{b} \\implies \\sqrt{5} = \\frac{a - 3b}{2b}$. Since $a$ and $b$ are integers, $\\frac{a-3b}{2b}$ is rational, implying $\\sqrt{5}$ is rational. But this contradicts the known fact that $\\sqrt{5}$ is irrational. Thus, $3 + 2\\sqrt{5}$ is irrational."
        ]
      },
      {
        "title": "Decimal Expansions of Rational Numbers",
        "points": [
          "Let $x = \\frac{p}{q}$ be a rational number in lowest reduced form ($\text{HCF}(p, q) = 1$):",
          "(1) **Terminating Decimal:** $x$ has a terminating decimal expansion if and only if the prime factorisation of $q$ is of the form **$2^n \\cdot 5^m$**, where $n$ and $m$ are non-negative integers.",
          "(2) **Non-Terminating Repeating (Recurring) Decimal:** If the prime factorisation of $q$ contains any prime factor other than 2 or 5 (e.g., 3, 7, 11), the decimal expansion is non-terminating recurring.",
          "**Number of Decimal Places Before Termination:** For $q = 2^n \\cdot 5^m$, the decimal expansion terminates after **$\\max(n, m)$** decimal places.",
          "• *Example:* $\\frac{13}{125} = \\frac{13}{5^3} = \\frac{13 \\times 2^3}{5^3 \\times 2^3} = \\frac{104}{10^3} = 0.104$ (terminates after $\\max(0, 3) = 3$ places)."
        ],
        "table": {
          "head": [
            "Fraction (p/q)",
            "Prime Factorisation of q",
            "Type of Decimal Expansion",
            "Decimal Value"
          ],
          "rows": [
            [
              "3/8",
              "2³ × 5⁰",
              "Terminating (after 3 places)",
              "0.375"
            ],
            [
              "13/125",
              "2⁰ × 5³",
              "Terminating (after 3 places)",
              "0.104"
            ],
            [
              "7/80",
              "2⁴ × 5¹",
              "Terminating (after 4 places)",
              "0.0875"
            ],
            [
              "17/6",
              "2¹ × 3¹ (contains 3)",
              "Non-terminating recurring",
              "2.8333..."
            ],
            [
              "29/343",
              "7³ (contains 7)",
              "Non-terminating recurring",
              "0.0845..."
            ]
          ]
        }
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Real Numbers.",
          "**1. If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:**",
          "A. xy · B. xy² · C. x³y³ · D. x²y²",
          "**2. If HCF(306, 657) = 9, what is the LCM(306, 657)?**",
          "A. 22338 · B. 21148 · C. 22838 · D. 24538",
          "**3. The decimal expansion of the rational number 14587 / (2¹ × 5⁴) will terminate after how many decimal places?**",
          "A. 1 place · B. 2 places · C. 4 places · D. 5 places",
          "**4. Which of the following is an irrational number?**",
          "A. 22/7 · B. 3.1416 · C. 3 + √5 · D. √(4/9)",
          "**5. The largest number which divides 70 and 125, leaving remainders 5 and 8 respectively, is:**",
          "A. 13 · B. 65 · C. 875 · D. 1750"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Fundamental Theorem of Arithmetic",
        "meaning": "Every composite number can be uniquely factored into a product of primes, regardless of the order of factors."
      },
      {
        "term": "Co-prime Integers",
        "meaning": "Two positive integers a and b having no common positive divisor other than 1, i.e., HCF(a, b) = 1."
      },
      {
        "term": "Irrational Number",
        "meaning": "A real number that cannot be expressed as a ratio p/q of two integers; its decimal expansion is non-terminating and non-recurring."
      },
      {
        "term": "Terminating Decimal",
        "meaning": "A decimal fraction that contains a finite number of digits after the decimal point, occurring when denominator q = 2ⁿ · 5ᵐ."
      }
    ],
    "examTips": [
      "Remember: HCF(a, b) × LCM(a, b) = a × b holds ONLY for two numbers, never write this for three numbers.",
      "In proving irrationality of √p, clearly write: 'Let a and b be co-prime integers with b ≠ 0'; forgetting to state co-prime loses marks.",
      "For decimal termination questions, always reduce p/q to lowest terms first before inspecting factors of q."
    ]
  },
  {
    "id": "note-math10-2",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 2,
    "title": "Polynomials",
    "unit": "Mathematics · Class 10",
    "overview": "Polynomials bridge geometry and algebra; this chapter focuses on the geometric meaning of zeroes as x-intercepts, symmetric relations between zeroes and coefficients, and constructing polynomials from root properties.",
    "sections": [
      {
        "title": "Degree and Geometrical Meaning of Zeroes",
        "points": [
          "**Polynomial Degree:** For $p(x) = a_n x^n + \\dots + a_1 x + a_0$ ($a_n \neq 0$), the highest power of $x$ is the degree.",
          "• Linear ($n=1$): at most 1 zero; graph is a straight line.",
          "• Quadratic ($n=2$): at most 2 zeroes; graph is a U-shaped curve called a **parabola**.",
          "• Cubic ($n=3$): at most 3 zeroes.",
          "**Geometrical Significance:** The real zeroes of a polynomial $p(x)$ are precisely the **x-coordinates of the points where the graph of $y = p(x)$ intersects the x-axis**.",
          "**Parabola Orientation for Quadratic $y = ax^2 + bx + c$:**",
          "• If $a > 0$, the parabola opens **upwards** $\\cup$.",
          "• If $a < 0$, the parabola opens **downwards** $\\cap$.",
          "• Number of zeroes corresponds to x-axis intersections: 2 distinct points ($D > 0$), touches at 1 point ($D = 0$, coincident zeroes), or does not touch/cut x-axis ($D < 0$, 0 real zeroes)."
        ]
      },
      {
        "title": "Relationship Between Zeroes and Coefficients: Quadratic Polynomials",
        "points": [
          "Let $\\alpha$ and $\\beta$ be the zeroes of the quadratic polynomial $p(x) = ax^2 + bx + c$ ($a \\neq 0$).",
          "By the Factor Theorem, $(x - \\alpha)$ and $(x - \\beta)$ are factors of $p(x)$:",
          "$$ax^2 + bx + c = k(x - \\alpha)(x - \\beta) = k[x^2 - (\\alpha + \\beta)x + \\alpha\\beta]$$",
          "Comparing coefficients of like powers of $x$:",
          "$$\\mathbf{\\text{Sum of Zeroes: } \\alpha + \\beta = -\\frac{b}{a} = -\\frac{\\text{Coefficient of } x}{\\text{Coefficient of } x^2}}$$",
          "$$\\mathbf{\\text{Product of Zeroes: } \\alpha\\beta = \\frac{c}{a} = \\frac{\\text{Constant term}}{\\text{Coefficient of } x^2}}$$",
          "**Constructing a Quadratic Polynomial Given Zeroes:**",
          "If sum of zeroes is $S = \\alpha + \\beta$ and product is $P = \\alpha\\beta$, the quadratic family is:",
          "$$p(x) = k[x^2 - Sx + P] = k[x^2 - (\\alpha + \\beta)x + \\alpha\\beta] \\quad (k \\neq 0)$$"
        ],
        "formula": [
          "Sum of zeroes: α + β = -b/a",
          "Product of zeroes: αβ = c/a",
          "Polynomial equation: p(x) = k[x² - (α + β)x + αβ]"
        ]
      },
      {
        "title": "Symmetric Functions and Important Algebraic Manipulations of Zeroes",
        "points": [
          "Examiners frequently test expressions involving zeroes $\\alpha$ and $\\beta$ without finding individual roots:",
          "(1) **Sum of Squares:**",
          "$$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = \\left(-\\frac{b}{a}\\right)^2 - 2\\left(\\frac{c}{a}\\right) = \\frac{b^2 - 2ac}{a^2}$$",
          "(2) **Difference of Zeroes:**",
          "$$(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta \\implies |\\alpha - \\beta| = \\sqrt{(\\alpha + \\beta)^2 - 4\\alpha\\beta} = \\frac{\\sqrt{b^2 - 4ac}}{|a|}$$",
          "(3) **Sum of Reciprocals:**",
          "$$\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{-b/a}{c/a} = -\\frac{b}{c}$$",
          "(4) **Sum of Cubes:**",
          "$$\\alpha^3 + \\beta^3 = (\\alpha + \\beta)(\\alpha^2 - \\alpha\\beta + \\beta^2) = (\\alpha + \\beta)[(\\alpha + \\beta)^2 - 3\\alpha\\beta]$$"
        ],
        "formula": [
          "α² + β² = (α + β)² - 2αβ",
          "(α - β)² = (α + β)² - 4αβ",
          "1/α + 1/β = (α + β) / (αβ)",
          "α/β + β/α = (α² + β²) / (αβ) = [(α + β)² - 2αβ] / (αβ)"
        ]
      },
      {
        "title": "Cubic Polynomials (Relationships for Reference)",
        "points": [
          "For a cubic polynomial $p(x) = ax^3 + bx^2 + cx + d$ ($a \\neq 0$) with zeroes $\\alpha, \\beta, \\gamma$:",
          "(1) **Sum of Zeroes:** $\\alpha + \\beta + \\gamma = -\\frac{b}{a}$",
          "(2) **Sum of Products Taken Two at a Time:** $\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac{c}{a}$",
          "(3) **Product of Zeroes:** $\\alpha\\beta\\gamma = -\\frac{d}{a}$",
          "• The cubic polynomial is formed by: $p(x) = k[x^3 - (\\alpha+\\beta+\\gamma)x^2 + (\\alpha\\beta+\\beta\\gamma+\\gamma\\alpha)x - \\alpha\\beta\\gamma]$."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Polynomials.",
          "**1. If one zero of the quadratic polynomial x² + 3x + k is 2, then the value of k is:**",
          "A. 10 · B. -10 · C. -7 · D. -2",
          "**2. If α and β are the zeroes of the polynomial p(x) = 2x² + 5x - 12, then the value of (1/α + 1/β) is:**",
          "A. -5/12 · B. 5/12 · C. -12/5 · D. 5/2",
          "**3. A quadratic polynomial whose sum of zeroes is -5 and product of zeroes is 6 is:**",
          "A. x² - 5x + 6 · B. x² + 5x + 6 · C. x² + 5x - 6 · D. x² - 5x - 6",
          "**4. If the graph of a polynomial intersects the x-axis at 3 points and touches it at 2 other points, the total number of real zeroes is:**",
          "A. 3 · B. 2 · C. 5 · D. 1",
          "**5. If the zeroes of the quadratic polynomial ax² + bx + c (c ≠ 0) are equal, then:**",
          "A. c and a have opposite signs · B. c and d have opposite signs · C. c and a have the same sign · D. b and c have the same sign"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Zero of a Polynomial",
        "meaning": "A real number k such that p(k) = 0, representing the x-coordinate where the graph cuts or touches the x-axis."
      },
      {
        "term": "Parabola",
        "meaning": "The characteristic U-shaped curved graph formed by a quadratic function y = ax² + bx + c."
      },
      {
        "term": "Quadratic Polynomial",
        "meaning": "A polynomial of degree 2 having the standard form ax² + bx + c where a, b, c are real numbers and a ≠ 0."
      }
    ],
    "examTips": [
      "Always include 'k' when constructing a polynomial: p(x) = k[x² - Sx + P], since infinitely many polynomials share the same zeroes.",
      "If zeroes are equal (α = β), the discriminant b² - 4ac = 0, which means 4ac = b² > 0, so 'a' and 'c' MUST have the same sign.",
      "Be careful with negative signs: sum of zeroes is -b/a, while product is +c/a."
    ]
  },
  {
    "id": "note-math10-3",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 3,
    "title": "Pair of Linear Equations in Two Variables",
    "unit": "Mathematics · Class 10",
    "overview": "Systems of two linear equations model interdependent constraints in two dimensions; this chapter covers consistency conditions via coefficient ratios, algebraic solutions via substitution and elimination, and upstream/downstream word problems.",
    "sections": [
      {
        "title": "General Form and Graphical Interpretation",
        "points": [
          "A pair of linear equations in two variables $x$ and $y$ has the general form:",
          "$$a_1 x + b_1 y + c_1 = 0 \\quad \\text{and} \\quad a_2 x + b_2 y + c_2 = 0$$",
          "where $a_1, b_1, c_1, a_2, b_2, c_2$ are real numbers and $a_1^2 + b_1^2 \\neq 0$, $a_2^2 + b_2^2 \\neq 0$.",
          "**Three Geometric Possibilities for Two Lines on a Plane:**",
          "(1) **Intersecting Lines:** Intersect at a single unique point $(x, y)$, yielding exactly **one unique solution**.",
          "(2) **Coincident Lines:** The two lines overlap entirely, yielding **infinitely many solutions**.",
          "(3) **Parallel Lines:** The lines never meet, yielding **no solution**."
        ]
      },
      {
        "title": "Algebraic Conditions for Consistency and Inconsistency",
        "points": [
          "Without plotting graphs, comparing the ratios $\\frac{a_1}{a_2}$, $\\frac{b_1}{b_2}$, and $\\frac{c_1}{c_2}$ directly determines consistency:",
          "(1) **Unique Solution (Consistent System):**",
          "$$\\mathbf{\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}}$$",
          "Lines intersect at one point; the system is independent and consistent.",
          "(2) **Infinitely Many Solutions (Consistent & Dependent System):**",
          "$$\\mathbf{\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}}$$",
          "Lines are coincident; every point on the line is a solution.",
          "(3) **No Solution (Inconsistent System):**",
          "$$\\mathbf{\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}}$$",
          "Lines are parallel; no common point exists, so system is inconsistent."
        ],
        "table": {
          "head": [
            "Ratio Comparison",
            "Graphical Representation",
            "Algebraic Interpretation",
            "Consistency Status"
          ],
          "rows": [
            [
              "a₁/a₂ ≠ b₁/b₂",
              "Intersecting lines",
              "Exactly one unique solution",
              "Consistent"
            ],
            [
              "a₁/a₂ = b₁/b₂ = c₁/c₂",
              "Coincident lines",
              "Infinitely many solutions",
              "Consistent (Dependent)"
            ],
            [
              "a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
              "Parallel lines",
              "No solution",
              "Inconsistent"
            ]
          ]
        }
      },
      {
        "title": "Algebraic Methods: Substitution and Elimination",
        "points": [
          "**Method 1: Substitution Method:**",
          "• Step 1: Express one variable (say $y$) in terms of the other variable ($x$) from one equation.",
          "• Step 2: Substitute this value of $y$ into the other equation to get a single linear equation in $x$.",
          "• Step 3: Solve for $x$, then substitute back to determine $y$.",
          "**Method 2: Elimination Method (Most Efficient):**",
          "• Step 1: Multiply both equations by suitable non-zero constants to make the coefficients of one variable numerically equal.",
          "• Step 2: Add or subtract the equations to eliminate that variable.",
          "• Step 3: Solve the resulting linear equation in one variable, then back-substitute to find the remaining variable."
        ]
      },
      {
        "title": "High-Yield Word Problem Formulations",
        "points": [
          "**(A) Upstream and Downstream Boat Problems:**",
          "Let speed of boat in still water $= x\\text{ km/h}$, and speed of stream $= y\\text{ km/h}$ ($x > y$).",
          "• Speed Upstream (against current) $= (x - y)\\text{ km/h}$.",
          "• Speed Downstream (with current) $= (x + y)\\text{ km/h}$.",
          "• Time $= \\frac{\\text{Distance}}{\\text{Speed}}$. Formulation: $\\frac{D_1}{x - y} + \\frac{D_2}{x + y} = T$.",
          "**(B) Two-Digit Number Reversal Problems:**",
          "Let tens digit $= x$ and units digit $= y$. Original Number $= 10x + y$.",
          "• Number formed by reversing digits $= 10y + x$.",
          "• Note: Sum of original and reversed number is always a multiple of 11: $(10x+y) + (10y+x) = 11(x+y)$.",
          "• Difference is always a multiple of 9: $(10x+y) - (10y+x) = 9(x-y)$.",
          "**(C) Fraction Problems:** Let fraction be $\\frac{x}{y}$ ($y \\neq 0$); set up equations according to alterations in numerator and denominator."
        ],
        "formula": [
          "Upstream Speed = x - y  (km/h)",
          "Downstream Speed = x + y  (km/h)",
          "Two-Digit Number = 10x + y  (Reversed: 10y + x)"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Linear Equations.",
          "**1. For what value of k will the following pair of equations have infinitely many solutions? 2x + 3y = 7 and (k+1)x + (2k-1)y = 4k + 1**",
          "A. k = 2 · B. k = 3 · C. k = 5 · D. k = 7",
          "**2. If the lines given by 3x + 2ky = 2 and 2x + 5y + 1 = 0 are parallel, then the value of k is:**",
          "A. -5/4 · B. 2/5 · C. 15/4 · D. 3/2",
          "**3. A boat goes 30 km upstream and 44 km downstream in 10 hours. In still water, the speed of the boat is 8 km/h. What is the speed of the stream?**",
          "A. 2 km/h · B. 3 km/h · C. 4 km/h · D. 5 km/h",
          "**4. The pair of equations x + 2y + 5 = 0 and -3x - 6y + 1 = 0 has:**",
          "A. A unique solution · B. Exactly two solutions · C. Infinitely many solutions · D. No solution",
          "**5. The sum of the digits of a two-digit number is 9. If 27 is added to it, the digits are reversed. The number is:**",
          "A. 63 · B. 36 · C. 45 · D. 27"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Consistent System",
        "meaning": "A system of linear equations that has at least one valid solution (either unique or infinitely many)."
      },
      {
        "term": "Inconsistent System",
        "meaning": "A system of linear equations that has zero solutions, representing parallel lines on a graph."
      },
      {
        "term": "Coincident Lines",
        "meaning": "Two geometric lines that lie directly on top of each other, having identical slopes and intercepts."
      },
      {
        "term": "Upstream",
        "meaning": "Moving in the direction opposite to the flow of the water current, resulting in reduced effective speed (x - y)."
      },
      {
        "term": "Downstream",
        "meaning": "Moving in the same direction as the water current, resulting in increased effective speed (x + y)."
      }
    ],
    "examTips": [
      "Before comparing ratios, make sure BOTH equations have constants on the same side: both c₁ and c₂ on LHS or both on RHS.",
      "For parallel lines (no solution), ensure you check a₁/a₂ = b₁/b₂ ≠ c₁/c₂; checking only a₁/a₂ = b₁/b₂ might include coincident lines.",
      "In boat problems, speed in still water MUST be strictly greater than stream speed (x > y); otherwise, the boat cannot move upstream."
    ]
  },
  {
    "id": "note-math10-4",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 4,
    "title": "Quadratic Equations",
    "unit": "Mathematics · Class 10",
    "overview": "Quadratic equations model parabolic projectile trajectories, optimized area layouts, and kinetic relationships; this chapter covers standard form, factorisation, the Quadratic Formula, and root nature governed by the discriminant.",
    "sections": [
      {
        "title": "Standard Form and Checking Quadratic Nature",
        "points": [
          "**Standard Form:** A quadratic equation in the variable $x$ is an equation of the form:",
          "$$ax^2 + bx + c = 0 \\quad (a, b, c \\in \\mathbb{R}, \\; a \\neq 0)$$*",
          "• The condition $a \\neq 0$ is mandatory; if $a = 0$, the equation degenerates into a linear equation.",
          "• To check whether a given equation is quadratic, expand and simplify all brackets and collect all terms on the LHS in descending powers of $x$.",
          "• *Example:* $(x - 2)^2 + 1 = 2x - 3 \\implies x^2 - 4x + 4 + 1 = 2x - 3 \\implies x^2 - 6x + 8 = 0$, which is quadratic.",
          "• *Example:* $x(x + 1) + 8 = (x + 2)(x - 2) \\implies x^2 + x + 8 = x^2 - 4 \\implies x + 12 = 0$, which is linear (not quadratic)."
        ]
      },
      {
        "title": "Solution by Factorisation (Splitting the Middle Term)",
        "points": [
          "To solve $ax^2 + bx + c = 0$ by splitting the middle term:",
          "• Step 1: Find two numbers $p$ and $q$ such that $p + q = b$ (the coefficient of $x$) and $p \\times q = ac$ (product of coefficient of $x^2$ and constant term).",
          "• Step 2: Write $bx$ as $px + qx$ and factor by grouping pairs of terms.",
          "• Step 3: Set each linear factor equal to zero and solve for $x$.",
          "**Worked Example with Radicals:** Solve $\\sqrt{2}x^2 + 7x + 5\\sqrt{2} = 0$.",
          "• Product $ac = \\sqrt{2} \\times 5\\sqrt{2} = 5 \\times 2 = 10$. Sum $b = 7$.",
          "• Factors are 5 and 2 ($5 \\times 2 = 10$, $5 + 2 = 7$).",
          "• Split: $\\sqrt{2}x^2 + 2x + 5x + 5\\sqrt{2} = 0 \\implies \\sqrt{2}x(x + \\sqrt{2}) + 5(x + \\sqrt{2}) = 0$.",
          "• Factors: $(\\sqrt{2}x + 5)(x + \\sqrt{2}) = 0 \\implies x = -\\sqrt{2}$ or $x = -\\frac{5}{\\sqrt{2}} = -\\frac{5\\sqrt{2}}{2}$."
        ]
      },
      {
        "title": "The Quadratic Formula (Shreedharacharya's Rule)",
        "points": [
          "For any quadratic equation $ax^2 + bx + c = 0$ ($a \\neq 0$):",
          "$$\\mathbf{x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}}$$",
          "The quantity inside the radical $D = b^2 - 4ac$ is called the **Discriminant**.",
          "**Step-by-Step Derivation by Completing the Square:**",
          "(1) Divide by $a$: $x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0$.",
          "(2) Shift constant: $x^2 + \\frac{b}{a}x = -\\frac{c}{a}$.",
          "(3) Add $\\left(\\frac{b}{2a}\\right)^2$ to both sides: $x^2 + 2\\cdot x \\cdot \\frac{b}{2a} + \\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2} - \\frac{c}{a} = \\frac{b^2 - 4ac}{4a^2}$.",
          "(4) Take square roots: $\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2} \\implies x + \\frac{b}{2a} = \\frac{\\pm \\sqrt{b^2 - 4ac}}{2a}$.",
          "(5) Thus, $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$."
        ],
        "formula": [
          "Discriminant: D = b² - 4ac",
          "Quadratic Formula: x = (-b ± √D) / (2a)"
        ]
      },
      {
        "title": "Discriminant and Nature of Roots",
        "points": [
          "The discriminant $D = b^2 - 4ac$ uniquely determines the nature of the roots:",
          "(1) **Case 1: $D > 0$** $\\implies$ Two distinct, unequal real roots: $x = \\frac{-b + \\sqrt{D}}{2a}$ and $x = \\frac{-b - \\sqrt{D}}{2a}$. (If $a, b, c$ are rational and $D$ is a perfect square, roots are rational).",
          "(2) **Case 2: $D = 0$** $\\implies$ Two equal (coincident) real roots: $x = -\\frac{b}{2a}$. (The expression $ax^2 + bx + c$ is a perfect square trinomial).",
          "(3) **Case 3: $D < 0$** $\\implies$ **No real roots** (roots are complex/imaginary conjugate numbers)."
        ],
        "table": {
          "head": [
            "Discriminant Value (D = b² - 4ac)",
            "Nature of Roots",
            "Formula for Roots",
            "Graphical Consequence"
          ],
          "rows": [
            [
              "D > 0",
              "Two distinct real roots",
              "x = (-b ± √D) / 2a",
              "Parabola cuts x-axis at 2 points"
            ],
            [
              "D = 0",
              "Two equal real roots",
              "x = -b / (2a)",
              "Parabola touches x-axis at 1 point"
            ],
            [
              "D < 0",
              "No real roots",
              "No real values",
              "Parabola does not touch or cross x-axis"
            ]
          ]
        }
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Quadratic Equations.",
          "**1. Which of the following is a quadratic equation?**",
          "A. x² + 2x + 1 = (4 - x)² + 3 · B. -2x² = (5 - x)(2x - 2/5) · C. (k + 1)x² + 3/2 x = 7 (where k = -1) · D. x³ - x² = (x - 1)³",
          "**2. If the quadratic equation 2x² - kx + k = 0 has equal roots, then the values of k are:**",
          "A. 0 only · B. 4 only · C. 8 only · D. 0 or 8",
          "**3. The discriminant of the quadratic equation 2x² - 4x + 3 = 0 is:**",
          "A. -8 · B. 10 · C. -16 · D. 8",
          "**4. If 1/2 is a root of the equation x² + kx - 5/4 = 0, then the value of k is:**",
          "A. 2 · B. -2 · C. 1/4 · D. 1/2",
          "**5. The sum of the squares of two consecutive positive integers is 365. The integers are:**",
          "A. 11, 12 · B. 12, 13 · C. 13, 14 · D. 14, 15"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Discriminant (D)",
        "meaning": "The algebraic quantity D = b² - 4ac that determines the nature and existence of real roots for ax² + bx + c = 0."
      },
      {
        "term": "Roots of an Equation",
        "meaning": "The values of the variable x that satisfy the equation ax² + bx + c = 0."
      },
      {
        "term": "Equal Roots",
        "meaning": "A condition occurring when D = 0, where both roots merge into a single coincident value x = -b/(2a)."
      }
    ],
    "examTips": [
      "When expanding (x - 1)³, do not stop at x²; x³ - x² = (x - 1)³ simplifies to 2x² - 3x + 1 = 0, which is indeed quadratic!",
      "When finding 'k' for equal roots (D = 0), do not divide out 'k': k² - 8k = 0 gives k(k - 8) = 0, so k = 0 OR k = 8. Forgetting 0 loses marks.",
      "In word problems, reject non-physical roots (e.g., negative speed, negative age, negative length)."
    ]
  },
  {
    "id": "note-math10-5",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 5,
    "title": "Arithmetic Progressions",
    "unit": "Mathematics · Class 10",
    "overview": "Arithmetic Progressions govern linear sequences with constant additive increments. This chapter details general term derivations, sum of n terms formulas, properties of three and four term selections, and real-life financial and spatial applications.",
    "sections": [
      {
        "title": "Definition and General Term of an AP",
        "points": [
          "**Definition:** An Arithmetic Progression (AP) is a sequence of numbers in which each term is obtained by adding a fixed number $d$ (common difference) to the preceding term, except the first term $a$.",
          "• First term: $a_1 = a$.",
          "• Common difference: $d = a_{k+1} - a_k = a_2 - a_1 = a_3 - a_2 = \\dots$",
          "• $d$ can be **positive** (increasing AP), **negative** (decreasing AP), or **zero** (constant AP).",
          "**General Form of an AP:** $a, \\; a+d, \\; a+2d, \\; a+3d, \\; \\dots, \\; a+(n-1)d$.",
          "**The $n$-th Term (General Term) Formula:**",
          "$$\\mathbf{a_n = a + (n - 1)d}$$",
          "where $a$ is the first term, $d$ is the common difference, and $n$ is the number of terms ($n \\in \\mathbb{N}$).",
          "**$n$-th Term from the End of an AP:**",
          "If an AP has a last term $l$ and common difference $d$, the $n$-th term from the end is:",
          "$$a_n' = l - (n - 1)d$$"
        ],
        "formula": [
          "Common difference: d = aₙ - aₙ₋₁",
          "n-th term: aₙ = a + (n - 1)d",
          "n-th term from the end: aₙ' = l - (n - 1)d"
        ]
      },
      {
        "title": "Sum of First $n$ Terms of an AP",
        "points": [
          "**Derivation of Sum Formula (Gauss Method):**",
          "Let $S_n = a + (a+d) + (a+2d) + \\dots + [a+(n-1)d]$.",
          "Writing in reverse: $S_n = [a+(n-1)d] + [a+(n-2)d] + \\dots + a$.",
          "Adding the two equations term-by-term:",
          "$2S_n = [2a + (n-1)d] + [2a + (n-1)d] + \\dots + [2a + (n-1)d]$ ($n$ times).",
          "$$2S_n = n[2a + (n - 1)d] \\implies \\mathbf{S_n = \\frac{n}{2}[2a + (n - 1)d]}$$",
          "**Alternative Form (When First Term $a$ and Last Term $l$ are Known):**",
          "$$\\mathbf{S_n = \\frac{n}{2}(a + l)}$$",
          "**Connecting $n$-th Term and Sum:**",
          "The $n$-th term can be found directly from the sum formula without finding $a$ or $d$ first:",
          "$$\\mathbf{a_n = S_n - S_{n-1}} \\quad (\\text{for } n \\ge 2, \\text{ and } a_1 = S_1)$$"
        ],
        "formula": [
          "Sₙ = (n/2)[2a + (n - 1)d]",
          "Sₙ = (n/2)(a + l)",
          "aₙ = Sₙ - Sₙ₋₁",
          "Sum of first n positive integers: Sₙ = n(n + 1) / 2"
        ]
      },
      {
        "title": "Arithmetic Mean & Choosing Terms in AP",
        "points": [
          "**Arithmetic Mean (AM):** If three numbers $a, b, c$ are in AP, then $b - a = c - b \\implies 2b = a + c \\implies \\mathbf{b = \\frac{a + c}{2}}$. Here, $b$ is the arithmetic mean of $a$ and $c$.",
          "**Convenient Selection of Terms (Symmetry around 0):**",
          "• **3 terms in AP:** Choose $(a - d), \\; a, \\; (a + d)$. (Common difference is $d$; their sum is simply $3a$, which eliminates $d$ instantly).",
          "• **4 terms in AP:** Choose $(a - 3d), \\; (a - d), \\; (a + d), \\; (a + 3d)$. (Common difference is $2d$; sum is $4a$).",
          "• **5 terms in AP:** Choose $(a - 2d), \\; (a - d), \\; a, \\; (a + d), \\; (a + 2d)$. (Common difference is $d$; sum is $5a$)."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Arithmetic Progressions.",
          "**1. What is the 11th term from the end of the AP: 10, 7, 4, ..., -62?**",
          "A. -25 · B. -32 · C. -16 · D. 0",
          "**2. If the sum of first n terms of an AP is given by Sₙ = 3n² + 5n, then its 15th term is:**",
          "A. 86 · B. 92 · C. 96 · D. 102",
          "**3. If 2x, x + 10, and 3x + 2 are in Arithmetic Progression, then the value of x is:**",
          "A. 0 · B. 2 · C. 4 · D. 6",
          "**4. How many two-digit positive numbers are divisible by 3?**",
          "A. 29 · B. 30 · C. 31 · D. 33",
          "**5. The sum of the first 16 terms of the AP: 10, 6, 2, ... is:**",
          "A. -320 · B. 320 · C. -352 · D. -400"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Common Difference (d)",
        "meaning": "The constant difference obtained by subtracting any term from its succeeding term in an AP."
      },
      {
        "term": "Finite AP",
        "meaning": "An arithmetic progression that possesses a finite number of terms and terminates at a last term l."
      },
      {
        "term": "Arithmetic Mean",
        "meaning": "The middle term b of three consecutive terms in AP, equal to the average of the two extremes: b = (a + c)/2."
      }
    ],
    "examTips": [
      "Always state the sign of d carefully: if sequence decreases (10, 7, 4...), d = 7 - 10 = -3, not +3.",
      "To find if a number is a term of an AP, solve aₙ = x for n; if n is not a positive integer (e.g. fraction or negative), the number is not a term.",
      "Use aₙ = Sₙ - Sₙ₋₁ for finding general terms from sum expressions: for Sₙ = 3n² + 5n, aₙ = (3n² + 5n) - [3(n-1)² + 5(n-1)] = 6n + 2."
    ]
  },
  {
    "id": "note-math10-6",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 6,
    "title": "Triangles",
    "unit": "Mathematics · Class 10",
    "overview": "Geometric similarity formalizes scale preservation independent of size. This chapter details the Basic Proportionality Theorem (Thales Theorem), its converse, similarity criteria (AAA, SSS, SAS), and proportional ratio theorems.",
    "sections": [
      {
        "title": "Similarity of Figures and Triangles",
        "points": [
          "**Congruence vs Similarity:**",
          "• Congruent figures have the **same shape and the same size** (scale factor = 1).",
          "• Similar figures have the **same shape, but not necessarily the same size**.",
          "• All congruent figures are similar, but similar figures need not be congruent.",
          "• Two circles of different radii, two squares of different sides, and all equilateral triangles are always similar.",
          "**Conditions for Similarity of Two Polygons:**",
          "(1) Their corresponding angles are equal, and",
          "(2) The ratios of their corresponding sides are equal (i.e., corresponding sides are proportional).",
          "**Notation:** $\\triangle ABC \\sim \\triangle DEF$ means $\\angle A = \\angle D, \\; \\angle B = \\angle E, \\; \\angle C = \\angle F$, and $\\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF}$."
        ]
      },
      {
        "title": "Basic Proportionality Theorem (BPT / Thales Theorem)",
        "points": [
          "**Theorem 6.1 (BPT):** If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.",
          "**Given:** In $\\triangle ABC$, a line $DE \\parallel BC$ intersects $AB$ at $D$ and $AC$ at $E$.",
          "**To Prove:** $\\mathbf{\\frac{AD}{DB} = \\frac{AE}{EC}}$.",
          "**Proof Outline:**",
          "• Join $BE$ and $CD$. Draw $DM \\perp AC$ and $EN \\perp AB$.",
          "• $\\text{Area}(\\triangle ADE) = \\frac{1}{2} \\times AD \\times EN$, and $\\text{Area}(\\triangle BDE) = \\frac{1}{2} \\times DB \\times EN$.",
          "• Thus, $\\frac{\\text{Area}(\\triangle ADE)}{\\text{Area}(\\triangle BDE)} = \\frac{AD}{DB}$.",
          "• Similarly, $\\frac{\\text{Area}(\\triangle ADE)}{\\text{Area}(\\triangle DEC)} = \\frac{AE}{EC}$.",
          "• Since $\\triangle BDE$ and $\\triangle DEC$ are on the same base $DE$ and between the same parallels $DE$ and $BC$, $\\text{Area}(\\triangle BDE) = \\text{Area}(\\triangle DEC)$.",
          "• Therefore, $\\mathbf{\\frac{AD}{DB} = \\frac{AE}{EC}}$.",
          "**Useful Corollaries:**",
          "• $\\frac{AB}{AD} = \\frac{AC}{AE}$ and $\\frac{AB}{DB} = \\frac{AC}{EC}$.",
          "**Converse of BPT (Theorem 6.2):** If a line divides any two sides of a triangle in the same ratio, then the line is parallel to the third side."
        ],
        "formula": [
          "BPT: If DE || BC, then AD / DB = AE / EC",
          "Corollary: AB / AD = AC / AE  and  AB / DB = AC / EC",
          "Converse of BPT: If AD / DB = AE / EC, then DE || BC"
        ]
      },
      {
        "title": "Criteria for Similarity of Triangles",
        "points": [
          "**(1) AAA Similarity Criterion (Theorem 6.3):** If in two triangles, corresponding angles are equal, then their corresponding sides are in the same ratio, and hence the two triangles are similar.",
          "• **AA Similarity Criterion:** If two angles of one triangle are respectively equal to two angles of another triangle, the third angles are automatically equal (angle sum property), so the triangles are similar ($\triangle ABC \\sim \\triangle DEF$).",
          "**(2) SSS Similarity Criterion (Theorem 6.4):** If in two triangles, sides of one triangle are proportional to (i.e., in the same ratio of) the sides of the other triangle, then their corresponding angles are equal, and the triangles are similar.",
          "**(3) SAS Similarity Criterion (Theorem 6.5):** If one angle of a triangle is equal to one angle of the other triangle and the sides including these angles are proportional, then the two triangles are similar."
        ],
        "table": {
          "head": [
            "Similarity Criterion",
            "Required Conditions",
            "Symbolic Formulation",
            "Consequence"
          ],
          "rows": [
            [
              "AA / AAA",
              "2 (or 3) corresponding angles equal",
              "∠A = ∠D, ∠B = ∠E",
              "Corresponding sides proportional"
            ],
            [
              "SSS",
              "All 3 pairs of sides proportional",
              "AB/DE = BC/EF = AC/DF",
              "Corresponding angles equal"
            ],
            [
              "SAS",
              "1 angle equal + 2 adjacent sides proportional",
              "∠A = ∠D and AB/DE = AC/DF",
              "Triangles are similar"
            ]
          ]
        }
      },
      {
        "title": "Key Properties of Similar Triangles",
        "points": [
          "If $\\triangle ABC \\sim \\triangle DEF$ with similarity ratio $k = \\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF}$:",
          "(1) Ratio of perimeters: $\\frac{\\text{Perimeter}(\\triangle ABC)}{\\text{Perimeter}(\\triangle DEF)} = k$.",
          "(2) Ratio of corresponding altitudes: $\\frac{h_1}{h_2} = k$.",
          "(3) Ratio of corresponding medians: $\\frac{m_1}{m_2} = k$.",
          "(4) Ratio of corresponding angle bisectors: $\\frac{b_1}{b_2} = k$."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Triangles.",
          "**1. In △ABC, DE ∥ BC intersecting AB at D and AC at E. If AD = 3 cm, DB = 4 cm, and AE = 6 cm, then EC is:**",
          "A. 7 cm · B. 8 cm · C. 9 cm · D. 10 cm",
          "**2. If in two triangles ABC and PQR, AB/QR = BC/PR = CA/PQ, then:**",
          "A. △PQR ~ △CAB · B. △PQR ~ △ABC · C. △CBA ~ △PQR · D. △BCA ~ △PQR",
          "**3. A vertical pole of length 6 m casts a shadow 4 m long on the ground, and at the same time a tower casts a shadow 28 m long. The height of the tower is:**",
          "A. 40 m · B. 42 m · C. 48 m · D. 56 m",
          "**4. If △ABC ~ △EDF and △ABC is not similar to △DEF, then which of the following is NOT true?**",
          "A. BC · EF = AC · FD · B. AB · EF = AC · DE · C. BC · DE = AB · EF · D. BC · DE = AB · FD",
          "**5. The perimeters of two similar triangles △ABC and △PQR are 36 cm and 24 cm respectively. If PQ = 10 cm, then AB is:**",
          "A. 15 cm · B. 12 cm · C. 18 cm · D. 20 cm"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Similarity",
        "meaning": "The geometric property of two figures having identical shape, equal corresponding angles, and strictly proportional corresponding sides."
      },
      {
        "term": "Basic Proportionality Theorem (Thales)",
        "meaning": "A line parallel to one side of a triangle divides the other two sides in equal proportion."
      },
      {
        "term": "Scale Factor",
        "meaning": "The constant ratio of any linear dimension in a similar figure to the corresponding dimension in the original figure."
      }
    ],
    "examTips": [
      "In similarity, letter ordering is strictly critical: writing △ABC ~ △PQR means A↔P, B↔Q, C↔R. If AB/QR = BC/PR, then B↔R, A↔Q, C↔P, so △ABC ~ △QRP.",
      "In BPT problems, do not confuse DB with AB: if AD/DB = 3/4, then AD/AB = 3/7.",
      "For sunlight shadow problems, the sun's altitude angle is identical at the same instant, so AA similarity applies immediately."
    ]
  },
  {
    "id": "note-math10-7",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 7,
    "title": "Coordinate Geometry",
    "unit": "Mathematics · Class 10",
    "overview": "Coordinate geometry links algebraic expressions to two-dimensional spatial configurations. This chapter explores the distance formula, internal section formula, midpoint and centroid calculations, and geometric figure characterisation.",
    "sections": [
      {
        "title": "The Distance Formula and Its Geometric Applications",
        "points": [
          "**Distance Formula:** The distance between any two points $P(x_1, y_1)$ and $Q(x_2, y_2)$ in the Cartesian plane is given by the hypotenuse in Pythagoras' theorem:",
          "$$\\mathbf{d = PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}}$$",
          "• Distance of a point $P(x, y)$ from the origin $O(0, 0)$ is: $OP = \\sqrt{x^2 + y^2}$.",
          "**Testing Collinearity of Three Points $A, B, C$:**",
          "Calculate $AB$, $BC$, and $AC$. If the sum of any two distances equals the third largest distance (e.g., $AB + BC = AC$), the points $A, B, C$ are **collinear** (lie on a single straight line).",
          "**Testing Geometric Figures via Distance:**",
          "• *Equilateral Triangle:* $AB = BC = CA$.",
          "• *Isosceles Triangle:* Any two sides are equal.",
          "• *Right-Angled Triangle:* Sum of squares of two smaller sides equals square of largest side ($AB^2 + BC^2 = AC^2$).",
          "• *Parallelogram:* Opposite sides equal ($AB = CD$ and $BC = DA$), diagonals unequal ($AC \\neq BD$).",
          "• *Rectangle:* Opposite sides equal and diagonals are equal ($AC = BD$).",
          "• *Rhombus:* All four sides equal ($AB=BC=CD=DA$), diagonals unequal.",
          "• *Square:* All four sides equal and diagonals are equal ($AC = BD$)."
        ],
        "formula": [
          "Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
          "Distance from origin (0, 0): d = √(x² + y²)",
          "Collinearity condition: AB + BC = AC"
        ]
      },
      {
        "title": "Section Formula (Internal Division)",
        "points": [
          "**Section Formula:** The coordinates of the point $P(x, y)$ which divides the line segment joining points $A(x_1, y_1)$ and $B(x_2, y_2)$ internally in the ratio $m_1 : m_2$ are:",
          "$$\\mathbf{x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\quad y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}}$$",
          "**Ratio Trick ($k : 1$ Method):**",
          "When finding the unknown ratio in which a point divides a segment, assume the ratio to be **$k : 1$**:",
          "$$P = \\left(\\frac{k x_2 + x_1}{k + 1}, \\; \\frac{k y_2 + y_1}{k + 1}\\right)$$",
          "• If divided by the **x-axis**, set $y$-coordinate to zero: $\\frac{k y_2 + y_1}{k + 1} = 0 \\implies k = -\\frac{y_1}{y_2}$.",
          "• If divided by the **y-axis**, set $x$-coordinate to zero: $\\frac{k x_2 + x_1}{k + 1} = 0 \\implies k = -\\frac{x_1}{x_2}$."
        ],
        "formula": [
          "Section formula: P(x, y) = ((m₁x₂ + m₂x₁) / (m₁ + m₂), (m₁y₂ + m₂y₁) / (m₁ + m₂))",
          "Using ratio k : 1: P = ((kx₂ + x₁) / (k + 1), (ky₂ + y₁) / (k + 1))",
          "Points of trisection divide segment in ratios 1 : 2 and 2 : 1"
        ]
      },
      {
        "title": "Mid-Point Formula and Centroid of a Triangle",
        "points": [
          "**Mid-Point Formula:** When $P$ is the exact midpoint of $AB$, $m_1 = m_2 = 1$ ($1 : 1$ ratio):",
          "$$\\mathbf{M = \\left(\\frac{x_1 + x_2}{2}, \\; \\frac{y_1 + y_2}{2}\\right)}$$",
          "**Crucial Application to Parallelograms:** Diagonals of a parallelogram bisect each other. Therefore:",
          "$$\\text{Midpoint of diagonal } AC = \\text{Midpoint of diagonal } BD$$",
          "This provides a rapid single-step equation to find an unknown vertex coordinate.",
          "**Centroid of a Triangle:** The centroid $G$ is the point of concurrence of the three medians of $\\triangle ABC$. It divides each median in the ratio $2 : 1$ from the vertex:",
          "$$\\mathbf{G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\; \\frac{y_1 + y_2 + y_3}{3}\\right)}$$"
        ],
        "formula": [
          "Midpoint: M = ((x₁ + x₂) / 2, (y₁ + y₂) / 2)",
          "Centroid of triangle: G = ((x₁ + x₂ + x₃) / 3, (y₁ + y₂ + y₃) / 3)"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Coordinate Geometry.",
          "**1. The distance of the point P(-6, 8) from the origin is:**",
          "A. 8 · B. 2√7 · C. 10 · D. 6",
          "**2. If the point P(k, 0) divides the line segment joining A(2, -2) and B(-7, 4) in the ratio 1 : 2, then the value of k is:**",
          "A. 1 · B. 2 · C. -1 · D. -2",
          "**3. In what ratio does the y-axis divide the line segment joining the points A(5, -6) and B(-1, -4)?**",
          "A. 1 : 5 · B. 5 : 1 · C. 2 : 3 · D. 3 : 2",
          "**4. If the points A(6, 1), B(8, 2), C(9, 4), and D(p, 3) are the vertices of a parallelogram taken in order, the value of p is:**",
          "A. 4 · B. 5 · C. 6 · D. 7",
          "**5. The coordinates of the centroid of a triangle whose vertices are (0, 6), (8, 12), and (8, 0) are:**",
          "A. (16/3, 6) · B. (4, 6) · C. (16/3, 18) · D. (8, 6)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Section Formula",
        "meaning": "A mathematical formula giving the coordinates of a point that partitions a line segment in a specified numerical ratio."
      },
      {
        "term": "Centroid",
        "meaning": "The center of mass and geometric intersection point of the three medians of a triangle, dividing medians in ratio 2:1."
      },
      {
        "term": "Collinear Points",
        "meaning": "Three or more distinct points that lie on the exact same straight line."
      }
    ],
    "examTips": [
      "Points on x-axis always have coordinates (x, 0); points on y-axis always have coordinates (0, y).",
      "When finding the fourth vertex of a parallelogram, equate midpoints of diagonals: ((x₁+x₃)/2, (y₁+y₃)/2) = ((x₂+x₄)/2, (y₂+y₄)/2).",
      "Trisection points divide the line segment into 3 equal parts: use ratio 1:2 for the first point and 2:1 for the second point."
    ]
  },
  {
    "id": "note-math10-8",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 8,
    "title": "Introduction to Trigonometry",
    "unit": "Mathematics · Class 10",
    "overview": "Trigonometry establishes ratios between the sides and angles of a right-angled triangle. This chapter covers the six fundamental trigonometric ratios, exact values for standard acute angles, and algebraic proofs involving Pythagorean trigonometric identities.",
    "sections": [
      {
        "title": "Trigonometric Ratios of an Acute Angle",
        "points": [
          "Consider a right triangle $ABC$, right-angled at $B$. Let $\\angle A = \\theta$ be an acute angle:",
          "• **Hypotenuse ($H$):** Side opposite to the right angle (always the longest side $AC$).",
          "• **Opposite Side / Perpendicular ($P$):** Side opposite to the angle $\\theta$ ($BC$).",
          "• **Adjacent Side / Base ($B$):** Side adjacent to the angle $\\theta$ ($AB$).",
          "**The Six Trigonometric Ratios:**",
          "(1) $\\sin \\theta = \\frac{\\text{Perpendicular}}{\\text{Hypotenuse}} = \\frac{P}{H}$",
          "(2) $\\cos \\theta = \\frac{\\text{Base}}{\\text{Hypotenuse}} = \\frac{B}{H}$",
          "(3) $\\tan \\theta = \\frac{\\text{Perpendicular}}{\\text{Base}} = \\frac{P}{B} = \\frac{\\sin \\theta}{\\cos \\theta}$",
          "(4) $\\text{cosec } \\theta = \\frac{1}{\\sin \\theta} = \\frac{\\text{Hypotenuse}}{\\text{Perpendicular}} = \\frac{H}{P}$",
          "(5) $\\sec \\theta = \\frac{1}{\\cos \\theta} = \\frac{\\text{Hypotenuse}}{\\text{Base}} = \\frac{H}{B}$",
          "(6) $\\cot \\theta = \\frac{1}{\\tan \\theta} = \\frac{\\text{Base}}{\\text{Perpendicular}} = \\frac{B}{P} = \\frac{\\cos \\theta}{\\sin \\theta}$",
          "• Notice: The values of $\\sin \\theta$ and $\\cos \\theta$ can **never exceed 1**, because the hypotenuse is the longest side of a right triangle."
        ],
        "formula": [
          "sin θ = P / H,   cos θ = B / H,   tan θ = P / B",
          "cosec θ = 1 / sin θ,   sec θ = 1 / cos θ,   cot θ = 1 / tan θ",
          "tan θ = sin θ / cos θ,   cot θ = cos θ / sin θ"
        ]
      },
      {
        "title": "Trigonometric Ratios of Specific Angles (0°, 30°, 45°, 60°, 90°)",
        "points": [
          "Standard values derived geometrically from equilateral and isosceles right triangles:",
          "• **30° and 60°:** Derived from an equilateral triangle split by an altitude ($P = a, \\; B = a\\sqrt{3}, \\; H = 2a$).",
          "• **45°:** Derived from an isosceles right triangle with equal sides $a, a$ and hypotenuse $a\\sqrt{2}$."
        ],
        "table": {
          "head": [
            "Angle (θ)",
            "0°",
            "30°",
            "45°",
            "60°",
            "90°"
          ],
          "rows": [
            [
              "sin θ",
              "0",
              "1/2",
              "1/√2",
              "√3/2",
              "1"
            ],
            [
              "cos θ",
              "1",
              "√3/2",
              "1/√2",
              "1/2",
              "0"
            ],
            [
              "tan θ",
              "0",
              "1/√3",
              "1",
              "√3",
              "Not defined (∞)"
            ],
            [
              "cosec θ",
              "Not defined",
              "2",
              "√2",
              "2/√3",
              "1"
            ],
            [
              "sec θ",
              "1",
              "2/√3",
              "√2",
              "2",
              "Not defined"
            ],
            [
              "cot θ",
              "Not defined",
              "√3",
              "1",
              "1/√3",
              "0"
            ]
          ]
        }
      },
      {
        "title": "Fundamental Pythagorean Trigonometric Identities",
        "points": [
          "In right $\\triangle ABC$, by Pythagoras theorem: $P^2 + B^2 = H^2$.",
          "Dividing throughout by $H^2$, $B^2$, and $P^2$ yields the **three fundamental identities**:",
          "**(1) First Identity:**",
          "$$\\mathbf{\\sin^2 \\theta + \\cos^2 \\theta = 1}$$",
          "• $\\sin^2 \\theta = 1 - \\cos^2 \\theta \\implies \\sin \\theta = \\sqrt{1 - \\cos^2 \\theta}$",
          "• $\\cos^2 \\theta = 1 - \\sin^2 \\theta \\implies \\cos \\theta = \\sqrt{1 - \\sin^2 \\theta}$",
          "**(2) Second Identity:**",
          "$$\\mathbf{1 + \\tan^2 \\theta = \\sec^2 \\theta} \\quad (0^\\circ \\le \\theta < 90^\\circ)$$*",
          "• $\\sec^2 \\theta - \\tan^2 \\theta = 1 \\implies (\\sec \\theta - \\tan \\theta)(\\sec \\theta + \\tan \\theta) = 1$",
          "• Therefore: $\\mathbf{\\sec \\theta - \\tan \\theta = \\frac{1}{\\sec \\theta + \\tan \\theta}}$ (extremely high-yield board trick!)",
          "**(3) Third Identity:**",
          "$$\\mathbf{1 + \\cot^2 \\theta = \\text{cosec}^2 \\theta} \\quad (0^\\circ < \\theta \\le 90^\\circ)$$*",
          "• $\\text{cosec}^2 \\theta - \\cot^2 \\theta = 1 \\implies \\mathbf{\\text{cosec } \\theta - \\cot \\theta = \\frac{1}{\\text{cosec } \\theta + \\cot \\theta}}$"
        ],
        "formula": [
          "sin² θ + cos² θ = 1",
          "sec² θ - tan² θ = 1   =>   sec θ - tan θ = 1 / (sec θ + tan θ)",
          "cosec² θ - cot² θ = 1   =>   cosec θ - cot θ = 1 / (cosec θ + cot θ)"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Introduction to Trigonometry.",
          "**1. If cos θ = 4/5, then the value of tan θ is:**",
          "A. 3/5 · B. 3/4 · C. 4/3 · D. 5/3",
          "**2. The value of (sin 30° + cos 60° - tan 45°) is:**",
          "A. 1 · B. 0 · C. 1/2 · D. -1",
          "**3. If sec θ + tan θ = p, then the value of sec θ - tan θ is:**",
          "A. p² · B. 1/p · C. p - 1 · D. 1/p²",
          "**4. The expression 9 sec² A - 9 tan² A is equal to:**",
          "A. 1 · B. 9 · C. 8 · D. 0",
          "**5. If sin θ - cos θ = 0, then the value of (sin⁴ θ + cos⁴ θ) is:**",
          "A. 1 · B. 3/4 · C. 1/2 · D. 1/4"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Trigonometric Ratio",
        "meaning": "A ratio comparing the lengths of two sides of a right-angled triangle relative to a specified acute angle."
      },
      {
        "term": "Trigonometric Identity",
        "meaning": "An equation involving trigonometric ratios that holds true for all valid values of the involved angle θ."
      },
      {
        "term": "Hypotenuse",
        "meaning": "The side of a right-angled triangle that is opposite the right angle, representing the triangle's longest side."
      }
    ],
    "examTips": [
      "Remember: sin² θ + cos² θ = 1 holds for ALL angles, but sec² θ - tan² θ = 1 requires θ ≠ 90°, and cosec² θ - cot² θ = 1 requires θ ≠ 0°.",
      "If sin θ - cos θ = 0, then sin θ = cos θ, which means tan θ = 1, so θ = 45°. This makes sin⁴ 45° + cos⁴ 45° = (1/√2)⁴ + (1/√2)⁴ = 1/4 + 1/4 = 1/2.",
      "Always identify the correct opposite and adjacent sides: if looking from angle C, the perpendicular is AB, NOT BC."
    ]
  },
  {
    "id": "note-math10-9",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 9,
    "title": "Some Applications of Trigonometry",
    "unit": "Mathematics · Class 10",
    "overview": "Trigonometric ratios enable non-invasive measurement of inaccessible heights, distances, and celestial baselines. This chapter details angles of elevation and depression, standard geometric sight-triangles, and multi-tier trigonometric problem solving.",
    "sections": [
      {
        "title": "Line of Sight, Angle of Elevation, and Angle of Depression",
        "points": [
          "**Line of Sight:** The imaginary straight line drawn from the eye of an observer to the point on the object being viewed.",
          "**Angle of Elevation:** When the object being viewed is **above the horizontal level** (observer looking upwards), the angle formed by the line of sight with the horizontal plane is the **Angle of Elevation**.",
          "**Angle of Depression:** When the object being viewed is **below the horizontal level** (observer looking downwards from a height, such as a cliff, roof, or aeroplane), the angle formed by the line of sight with the horizontal plane is the **Angle of Depression**.",
          "**Critical Geometric Identity (Alternate Interior Angles):**",
          "Because the horizontal line at the observer's eye level is strictly parallel to the ground horizontal plane:",
          "$$\\mathbf{\\text{Angle of Depression from top to bottom} = \\text{Angle of Elevation from bottom to top}}$$",
          "Always draw the horizontal line at the top when representing an angle of depression!"
        ]
      },
      {
        "title": "Solving One-Triangle and Two-Triangle Problems",
        "points": [
          "Most board exam questions rely on the standard values: $\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}$, $\\tan 45^\\circ = 1$, and $\\tan 60^\\circ = \\sqrt{3}$.",
          "**Case 1: Single Right Triangle (Direct Calculation):**",
          "• If tower height $= h$ and shadow length $= s$, then $\\tan \\theta = \\frac{h}{s}$.",
          "• When height equals shadow length ($h = s$), $\\tan \\theta = 1 \\implies \\theta = 45^\\circ$.",
          "• When shadow $= \\sqrt{3} \\times \\text{height}$, $\\tan \\theta = \\frac{1}{\\sqrt{3}} \\implies \\theta = 30^\\circ$.",
          "**Case 2: Two Positions of Observation (Moving Observer):**",
          "• A tower $AB$ of height $h$. An observer moves from $D$ to $C$ closer to the tower, where angle of elevation increases from $30^\\circ$ to $60^\\circ$.",
          "• In $\\triangle ABC$: $\\tan 60^\\circ = \\frac{h}{BC} \\implies BC = \\frac{h}{\\sqrt{3}}$.",
          "• In $\\triangle ABD$: $\\tan 30^\\circ = \\frac{h}{BD} = \\frac{h}{CD + BC} \\implies CD + \\frac{h}{\\sqrt{3}} = h\\sqrt{3}$.",
          "• Distance moved $CD = h\\sqrt{3} - \\frac{h}{\\sqrt{3}} = \\frac{2h}{\\sqrt{3}}$.",
          "**Case 3: Tower with a Flagstaff / Pedestal with a Statue:**",
          "• Statue of height $s$ stands on top of pedestal of height $h$. From a point on ground, elevation of top of pedestal is $\\alpha$ and top of statue is $\\beta$.",
          "• $\\tan \\alpha = \\frac{h}{x}$ and $\\tan \\beta = \\frac{h + s}{x}$. Equating $x$: $\\frac{h}{\\tan \\alpha} = \\frac{h + s}{\\tan \\beta} \\implies h = \\frac{s \\tan \\alpha}{\\tan \\beta - \\tan \\alpha}$."
        ],
        "formula": [
          "tan θ = Height / Distance = Opposite / Adjacent",
          "When θ = 45°: Height = Distance",
          "When θ = 30°: Distance = Height × √3",
          "When θ = 60°: Height = Distance × √3"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Applications of Trigonometry.",
          "**1. If the length of the shadow of a tree is equal to its height, the angle of elevation of the sun is:**",
          "A. 30° · B. 45° · C. 60° · D. 90°",
          "**2. A ladder 15 m long just reaches the top of a vertical wall. If the ladder makes an angle of 60° with the wall, the height of the wall is:**",
          "A. 15√3/2 m · B. 15/2 m · C. 15√3 m · D. 30 m",
          "**3. The angle of depression of a car standing on the ground from the top of a 75 m high tower is 30°. The distance of the car from the base of the tower is:**",
          "A. 25√3 m · B. 50√3 m · C. 75√3 m · D. 150 m",
          "**4. If the angle of elevation of a tower from a distance of 100 m from its foot is 60°, then the height of the tower is:**",
          "A. 100√3 m · B. 100/√3 m · C. 50√3 m · D. 200 m",
          "**5. From the top of a building 60 m high, the angles of depression of the top and bottom of a tower are observed to be 30° and 60° respectively. The height of the tower is:**",
          "A. 20 m · B. 40 m · C. 45 m · D. 50 m"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Line of Sight",
        "meaning": "The direct optical ray drawn from the observer's eye to the specific target point on the observed object."
      },
      {
        "term": "Angle of Elevation",
        "meaning": "The upward angle between the horizontal line of sight and the observer's line of vision to an elevated object."
      },
      {
        "term": "Angle of Depression",
        "meaning": "The downward angle between the horizontal line of sight and the observer's line of vision to an object below eye level."
      }
    ],
    "examTips": [
      "In Question 2, read carefully: 'makes an angle of 60° with the WALL'. Here cos 60° = Height / 15 => Height = 15/2 m. Misreading it as 'with the ground' gives 15√3/2 m!",
      "Never forget to draw the horizontal line at the top when an angle of depression is given, and mark alternate interior angle at the base.",
      "Substitute √3 = 1.732 and √2 = 1.414 only at the very final step of calculation if specified in the question."
    ]
  },
  {
    "id": "note-math10-10",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 10,
    "title": "Circles",
    "unit": "Mathematics · Class 10",
    "overview": "Tangents to circles represent limiting secant configurations where intersection points coincide. This chapter details radius-tangent perpendicularity, external point tangent congruences, and cyclic circumscription theorems.",
    "sections": [
      {
        "title": "Tangent to a Circle and Point of Contact",
        "points": [
          "**Definition of Tangent:** A tangent to a circle is a straight line that intersects the circle at **only one point**. The unique common point between the circle and the tangent line is called the **point of contact**.",
          "• **Secant:** A straight line that intersects a circle in two distinct points.",
          "• **Limiting Secant Concept:** A tangent is the limiting position of a secant when the two endpoints of its corresponding chord coincide.",
          "• At any point on a circle, there can be **one and only one tangent**.",
          "• A circle can have at most **two parallel tangents** at the opposite ends of a diameter.",
          "**Number of Tangents from a Point to a Circle:**",
          "(1) Point lying *inside* the circle $\\implies$ **Zero tangents**.",
          "(2) Point lying *on* the circle $\\implies$ **Exactly one tangent**.",
          "(3) Point lying *outside* the circle $\\implies$ **Exactly two tangents**."
        ]
      },
      {
        "title": "Theorem 10.1 (Radius-Tangent Perpendicularity)",
        "points": [
          "**Theorem 10.1:** The tangent at any point of a circle is perpendicular to the radius through the point of contact.",
          "**Given:** A circle with centre $O$ and a tangent $XY$ to the circle at a point $P$.",
          "**To Prove:** $OP \\perp XY$.",
          "**Proof:**",
          "• Take a point $Q$ on $XY$ other than $P$, and join $OQ$.",
          "• The point $Q$ must lie outside the circle. (If $Q$ lay inside or on the circle, $XY$ would be a secant, not a tangent).",
          "• Therefore, the distance $OQ$ is strictly greater than the radius of the circle $OP$: $OQ > OP$.",
          "• Since this holds for every point on line $XY$ except point $P$, $OP$ is the **shortest distance** of the centre $O$ to the line $XY$.",
          "• By geometry, the shortest distance between a point and a line is the perpendicular distance.",
          "• Hence, $\\mathbf{OP \\perp XY}$."
        ]
      },
      {
        "title": "Theorem 10.2 (Lengths of Tangents from an External Point)",
        "points": [
          "**Theorem 10.2:** The lengths of tangents drawn from an external point to a circle are equal.",
          "**Given:** A circle with centre $O$, an external point $P$, and two tangents $PQ$ and $PR$ touching the circle at $Q$ and $R$.",
          "**To Prove:** $\\mathbf{PQ = PR}$.",
          "**Proof:**",
          "• Join $OP, OQ,$ and $OR$.",
          "• In right $\\triangle OQP$ and right $\\triangle ORP$:",
          "  (1) $\\angle OQP = \\angle ORP = 90^\\circ$ (by Theorem 10.1, radius is perpendicular to tangent).",
          "  (2) $OQ = OR$ (radii of the same circle).",
          "  (3) $OP = OP$ (common hypotenuse).",
          "• Therefore, $\\triangle OQP \\cong \\triangle ORP$ by **RHS congruence criterion**.",
          "• By CPCTC, $\\mathbf{PQ = PR}$.",
          "**Key Corollaries:**",
          "• $\\angle OPQ = \\angle OPR$: $OP$ is the angle bisector of $\\angle QPR$ (tangents are equally inclined to the line joining point to centre).",
          "• $\\angle QOP = \\angle ROP$: Tangents subtend equal angles at the centre.",
          "• $\\angle QPR + \\angle QOR = 180^\\circ$: In quadrilateral $OQPR$, opposite angles are supplementary (since $\\angle OQP + \\angle ORP = 180^\\circ$)."
        ],
        "formula": [
          "Lengths of tangents from external point: PQ = PR",
          "Right triangle relation: OP² = PQ² + OQ²  (Hypotenuse² = Tangent² + Radius²)",
          "Supplementary angle property: ∠QPR + ∠QOR = 180°"
        ]
      },
      {
        "title": "High-Yield Circumscribing Theorems",
        "points": [
          "**(A) Tangential Quadrilateral Theorem:** If a quadrilateral $ABCD$ circumscribes a circle touching at $P, Q, R, S$, the sum of opposite sides are equal:",
          "$$\\mathbf{AB + CD = AD + BC}$$",
          "**(B) Parallelogram Circumscribing a Circle is a Rhombus:**",
          "Since $ABCD$ is a parallelogram, $AB = CD$ and $AD = BC$. From (A), $AB + CD = AD + BC \\implies 2AB = 2AD \\implies AB = AD$. A parallelogram with adjacent sides equal is a **rhombus**.",
          "**(C) Opposite Sides of a Circumscribing Quadrilateral Subtend Supplementary Angles at the Centre:**",
          "In quadrilateral $ABCD$ circumscribing a circle with centre $O$:",
          "$$\\mathbf{\\angle AOB + \\angle COD = 180^\\circ \\quad \\text{and} \\quad \\angle BOC + \\angle AOD = 180^\\circ}$$"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Circles.",
          "**1. From a point Q, the length of the tangent to a circle is 24 cm and the distance of Q from the centre is 25 cm. The radius of the circle is:**",
          "A. 7 cm · B. 12 cm · C. 15 cm · D. 24.5 cm",
          "**2. If tangents PA and PB from a point P to a circle with centre O are inclined to each other at an angle of 80°, then ∠POA is equal to:**",
          "A. 50° · B. 60° · C. 70° · D. 80°",
          "**3. If two tangents inclined at an angle of 60° are drawn to a circle of radius 3 cm, then the length of each tangent is:**",
          "A. 3/2 √3 cm · B. 6 cm · C. 3 cm · D. 3√3 cm",
          "**4. A quadrilateral ABCD is drawn to circumscribe a circle. If AB = 6 cm, BC = 7 cm, and CD = 4 cm, then the length of AD is:**",
          "A. 2 cm · B. 3 cm · C. 4 cm · D. 5 cm",
          "**5. If a parallelogram circumscribes a circle, then it must necessarily be a:**",
          "A. Rectangle · B. Rhombus · C. Square · D. Trapezium"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Tangent",
        "meaning": "A coplanar straight line that touches a circle at exactly one unique point."
      },
      {
        "term": "Point of Contact",
        "meaning": "The exact geometric point where a tangent intersects the circle."
      },
      {
        "term": "Secant",
        "meaning": "A straight line that cuts through a circle intersecting it at two distinct points."
      },
      {
        "term": "Circumscribed Polygon",
        "meaning": "A polygon whose sides are all tangent to an enclosed inscribed circle."
      }
    ],
    "examTips": [
      "In Question 2, remember that ∠AOB = 180° - 80° = 100°. The line OP bisects ∠AOB, so ∠POA = 100° / 2 = 50°, NOT 100°!",
      "For quadrilateral circumscribing circle: AB + CD = AD + BC (Sum of opposite sides are equal).",
      "Radius is ALWAYS perpendicular to the tangent at the point of contact; mark 90° immediately on your diagram."
    ]
  },
  {
    "id": "note-math10-11",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 11,
    "title": "Areas Related to Circles",
    "unit": "Mathematics · Class 10",
    "overview": "Curvilinear planar mensuration relies on circular arc fractions. This chapter details sector areas, segment calculations, arc lengths, and geometric applications to clock hands, pendulums, and combined circular designs.",
    "sections": [
      {
        "title": "Perimeter and Area of a Circle Review",
        "points": [
          "**Circumference (Perimeter) of a Circle:** $C = 2\\pi r = \\pi d$, where $r$ is radius and $d$ is diameter.",
          "• The ratio $\\frac{\\text{Circumference}}{\\text{Diameter}} = \\pi$ (constant for all circles). Value $\\pi \\approx \\frac{22}{7}$ or $3.1416$.",
          "**Area of a Circle:** $A = \\pi r^2$.",
          "**Semicircle:** Perimeter $= \\pi r + 2r = r(\\pi + 2)$, Area $= \\frac{1}{2}\\pi r^2$.",
          "**Quadrant of a Circle:** Perimeter $= \\frac{\\pi r}{2} + 2r = r\\left(\\frac{\\pi}{2} + 2\\right)$, Area $= \\frac{1}{4}\\pi r^2$.",
          "**Circular Ring (Track / Annulus):** Area between two concentric circles of radii $R$ and $r$ ($R > r$):",
          "$$\\mathbf{\\text{Area of Ring} = \\pi(R^2 - r^2) = \\pi(R - r)(R + r)}$$"
        ]
      },
      {
        "title": "Sector of a Circle and Length of an Arc",
        "points": [
          "**Sector:** The portion of the circular region enclosed by two radii and the corresponding arc.",
          "• **Minor Sector:** Sector with central angle $\\theta < 180^\\circ$.",
          "• **Major Sector:** Sector with central angle $360^\\circ - \\theta$.",
          "**Length of an Arc of a Sector of Angle $\\theta$:**",
          "$$\\mathbf{l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r = \\frac{\\theta}{180^\\circ} \\times \\pi r}$$",
          "**Area of a Sector of Angle $\\theta$:**",
          "$$\\mathbf{A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2}$$",
          "**Connection Between Arc Length $l$ and Sector Area $A$:**",
          "$$\\mathbf{A = \\frac{1}{2} l r}$$"
        ],
        "formula": [
          "Arc length: l = (θ / 360°) × 2πr",
          "Sector Area: A = (θ / 360°) × πr²",
          "Sector Area in terms of arc length: A = (1/2) × l × r",
          "Perimeter of Sector: P = l + 2r = (θ/360°)×2πr + 2r"
        ]
      },
      {
        "title": "Segment of a Circle and Area Calculations",
        "points": [
          "**Segment:** The portion of the circular region enclosed between a chord and the corresponding arc.",
          "• **Minor Segment:** Enclosed by chord and minor arc.",
          "• **Major Segment:** Enclosed by chord and major arc.",
          "**Area of Minor Segment $APB$:**",
          "$$\\mathbf{\\text{Area of Minor Segment} = \\text{Area of Sector } OAPB - \\text{Area of } \\triangle OAB}$$",
          "$$\\mathbf{\\text{Area of Minor Segment} = \\frac{\\theta}{360^\\circ}\\pi r^2 - \\frac{1}{2}r^2 \\sin \\theta}$$",
          "• When $\\theta = 60^\\circ$: $\\triangle OAB$ is equilateral, so $\\text{Area}(\\triangle OAB) = \\frac{\\sqrt{3}}{4}r^2$.",
          "• When $\\theta = 90^\\circ$: $\\triangle OAB$ is right-angled isosceles, so $\\text{Area}(\\triangle OAB) = \\frac{1}{2}r^2$.",
          "• When $\\theta = 120^\\circ$: $\\text{Area}(\\triangle OAB) = \\frac{1}{2}r^2 \\sin 120^\\circ = \\frac{1}{2}r^2 \\cos 30^\\circ = \\frac{\\sqrt{3}}{4}r^2$.",
          "**Area of Major Segment:** $\\text{Area of Circle} - \\text{Area of Minor Segment}$."
        ],
        "formula": [
          "Area of Minor Segment = (θ/360°)πr² - (1/2)r² sin θ",
          "For θ = 60°: Area of △OAB = (√3/4)r²",
          "For θ = 90°: Area of △OAB = (1/2)r²",
          "For θ = 120°: Area of △OAB = (√3/4)r²"
        ]
      },
      {
        "title": "Clock Hand Motions and Real-World Applications",
        "points": [
          "**Minute Hand of a Clock:**",
          "• Complete rotation ($360^\\circ$) in 60 minutes.",
          "• Angle swept in 1 minute $= \\frac{360^\\circ}{60} = \\mathbf{6^\\circ}$.",
          "• Angle swept in $m$ minutes $= 6m^\\circ$.",
          "**Hour Hand of a Clock:**",
          "• Complete rotation ($360^\\circ$) in 12 hours ($720$ minutes).",
          "• Angle swept in 1 minute $= \\frac{360^\\circ}{720} = \\mathbf{0.5^\\circ} = \\left(\\frac{1}{2}\\right)^\\circ$."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Areas Related to Circles.",
          "**1. If the perimeter and the area of a circle are numerically equal, then the radius of the circle is:**",
          "A. 2 units · B. π units · C. 4 units · D. 7 units",
          "**2. Area of a sector of angle p (in degrees) of a circle with radius R is:**",
          "A. (p/180) × 2πR · B. (p/180) × πR² · C. (p/360) × 2πR · D. (p/720) × 2πR²",
          "**3. The length of the minute hand of a clock is 14 cm. The area swept by the minute hand in 5 minutes is:**",
          "A. 154/3 cm² · B. 154 cm² · C. 77/3 cm² · D. 308/3 cm²",
          "**4. If the circumference of a circle increases from 2π to 4π, its area becomes:**",
          "A. Doubled · B. Tripled · C. Four times · D. Half",
          "**5. The area of the largest triangle that can be inscribed in a semicircle of radius r is:**",
          "A. r² · B. 1/2 r² · C. 2r² · D. √2 r²"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Sector",
        "meaning": "A portion of a circle bounded by two radius line segments and the intercepted arc between them."
      },
      {
        "term": "Segment",
        "meaning": "A region of a circle bounded by a straight chord and the corresponding circular arc."
      },
      {
        "term": "Annulus",
        "meaning": "The flat ring-shaped region bounded between two concentric circles of unequal radii."
      }
    ],
    "examTips": [
      "In Question 2, notice option D: (p/720) × 2πR² simplifies to (p/360) × πR²! NCERT loves this trap.",
      "Area swept by minute hand in 5 mins: Angle θ = 5 × 6° = 30°. Area = (30/360) × (22/7) × 14² = (1/12) × (22/7) × 196 = 154/3 cm².",
      "In perimeter of a sector, remember to add 2r: Perimeter = l + 2r, NOT just l."
    ]
  },
  {
    "id": "note-math10-12",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 12,
    "title": "Surface Areas and Volumes",
    "unit": "Mathematics · Class 10",
    "overview": "Spatial mensuration computes envelope boundaries and volumetric capacities of composite three-dimensional geometries. This chapter covers combinations of cylinders, cones, spheres, hemispheres, and cuboids.",
    "sections": [
      {
        "title": "Master Formula Reference for Standard 3D Solids",
        "points": [
          "A comprehensive reference table of essential formulas required for composite shapes:"
        ],
        "table": {
          "head": [
            "Solid Geometric Shape",
            "Curved Surface Area (CSA)",
            "Total Surface Area (TSA)",
            "Volume (V)"
          ],
          "rows": [
            [
              "Cube (side a)",
              "4a²",
              "6a²",
              "a³"
            ],
            [
              "Cuboid (l, b, h)",
              "2h(l + b)",
              "2(lb + bh + hl)",
              "l × b × h"
            ],
            [
              "Right Circular Cylinder (r, h)",
              "2πrh",
              "2πr(r + h)",
              "πr²h"
            ],
            [
              "Right Circular Cone (r, h, l)",
              "πrl  (l = √(r² + h²))",
              "πr(l + r)",
              "(1/3)πr²h"
            ],
            [
              "Sphere (radius r)",
              "4πr²",
              "4πr²",
              "(4/3)πr³"
            ],
            [
              "Hemisphere (radius r)",
              "2πr²",
              "3πr²",
              "(2/3)πr³"
            ]
          ]
        }
      },
      {
        "title": "Surface Area of Combinations of Solids",
        "points": [
          "**Golden Rule for Surface Area:**",
          "$$\\mathbf{\\text{Total Surface Area of Composite Solid} = \\sum (\\text{Exposed Visible Surface Areas})}$$",
          "**CRUCIAL MISTAKE TO AVOID:** Never add the total surface areas of the individual shapes! The glued or contact interface disappears inside the composite solid and is no longer part of the surface.",
          "**Common Board Combinations:**",
          "(1) **Solid Cone Mounted on a Hemisphere (Toy / Spinning Top):**",
          "• $\\text{TSA of Toy} = \\text{CSA of Cone} + \\text{CSA of Hemisphere} = \\pi r l + 2\\pi r^2 = \\pi r(l + 2r)$.",
          "(2) **Cylinder with Two Hemispherical Ends (Capsule / Boiler):**",
          "• $\\text{TSA of Capsule} = \\text{CSA of Cylinder} + 2 \\times (\\text{CSA of Hemisphere}) = 2\\pi r h + 2(2\\pi r^2) = 2\\pi r(h + 2r)$.",
          "(3) **Cube with a Hemispherical Depression Cut Out:**",
          "• $\\text{Surface Area} = \\text{TSA of Cube} - \\text{Base area of hemisphere} + \\text{CSA of inner hemisphere} = 6a^2 - \\pi r^2 + 2\\pi r^2 = \\mathbf{6a^2 + \\pi r^2}$."
        ]
      },
      {
        "title": "Volume of Combinations and Melting/Recasting",
        "points": [
          "**Golden Rule for Volume:**",
          "Unlike surface area, volume is strictly additive: the total volume of a combined solid is simply the sum of the volumes of the constituent components.",
          "$$\\mathbf{\\text{Volume of Combination} = V_1 + V_2}$$",
          "• Volume of toy (cone on hemisphere) $= \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3 = \\frac{1}{3}\\pi r^2(h + 2r)$.",
          "**Melting and Recasting (Conservation of Volume):**",
          "When a solid is melted and recast into new shapes (without wastage), **volume remains strictly invariant**.",
          "$$\\text{Volume of original solid} = n \\times (\\text{Volume of each new small solid})$$",
          "$$\\mathbf{n = \\frac{\\text{Volume of original solid}}{\\text{Volume of one small solid}}}$$"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Surface Areas and Volumes.",
          "**1. Two cubes each of volume 64 cm³ are joined end to end. The total surface area of the resulting cuboid is:**",
          "A. 128 cm² · B. 160 cm² · C. 192 cm² · D. 216 cm²",
          "**2. If the radius of the base of a right circular cylinder is halved, keeping the height same, the ratio of the volume of the reduced cylinder to that of the original cylinder is:**",
          "A. 1 : 2 · B. 1 : 4 · C. 1 : 8 · D. 2 : 1",
          "**3. A solid spherical ball of radius 3 cm is melted and recast into smaller spherical balls of radius 0.6 cm each. The number of balls formed is:**",
          "A. 125 · B. 100 · C. 50 · D. 25",
          "**4. A wooden article was made by scooping out a hemisphere from each end of a solid cylinder. If the height of the cylinder is 10 cm and its base radius is 3.5 cm, the total surface area of the article is:**",
          "A. 374 cm² · B. 462 cm² · C. 528 cm² · D. 574 cm²",
          "**5. If the surface area of a sphere is 616 cm², then its diameter is (taking π = 22/7):**",
          "A. 7 cm · B. 14 cm · C. 21 cm · D. 28 cm"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Curved Surface Area (CSA)",
        "meaning": "The area of all curved surfaces of a solid, excluding the flat top and bottom circular bases."
      },
      {
        "term": "Total Surface Area (TSA)",
        "meaning": "The sum of all external boundaries (curved surfaces plus all flat planar faces) of a three-dimensional body."
      },
      {
        "term": "Slant Height (l)",
        "meaning": "The diagonal distance from the apex of a cone along its surface to any point on its circular base rim: l = √(r² + h²)."
      }
    ],
    "examTips": [
      "In two joined cubes (each vol 64 cm³ => side a = 4 cm): the cuboid has l = 8, b = 4, h = 4. TSA = 2(32 + 16 + 32) = 160 cm².",
      "When scooping out a hemispherical depression from a cylinder, the surface area INCREASES (the hollow bowl adds curved surface area 2πr²).",
      "Be vigilant on radius vs diameter: if question gives 'diameter 14 cm', use r = 7 cm in all formulas."
    ]
  },
  {
    "id": "note-math10-13",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 13,
    "title": "Statistics",
    "unit": "Mathematics · Class 10",
    "overview": "Statistics formalizes quantitative data distribution through measures of central tendency. This chapter covers the Direct and Assumed Mean methods, Mode of grouped distributions, Median via cumulative frequencies, and the fundamental empirical formula.",
    "sections": [
      {
        "title": "Mean of Grouped Data: Direct and Assumed Mean Methods",
        "points": [
          "**Class Mark ($x_i$):** Mid-value of each class interval: $\\mathbf{x_i = \\frac{\\text{Upper limit} + \\text{Lower limit}}{2}}$.",
          "**(1) Direct Method:**",
          "$$\\mathbf{\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}}$$",
          "Suitable when numerical values of $f_i$ and $x_i$ are small.",
          "**(2) Assumed Mean Method:**",
          "Choose an assumed mean $a$ from the centre of the $x_i$ column. Compute deviations $\\mathbf{d_i = x_i - a}$.",
          "$$\\mathbf{\\bar{x} = a + \\frac{\\sum f_i d_i}{\\sum f_i}}$$",
          "**(3) Step-Deviation Method:**",
          "When all $d_i$ share a common factor $h$ (class size): $u_i = \\frac{x_i - a}{h}$.",
          "$$\\mathbf{\\bar{x} = a + \\left(\\frac{\\sum f_i u_i}{\\sum f_i}\\right) \\times h}$$"
        ],
        "formula": [
          "Class Mark: xᵢ = (Upper limit + Lower limit) / 2",
          "Direct Mean: x̄ = (∑fᵢxᵢ) / (∑fᵢ)",
          "Assumed Mean: x̄ = a + (∑fᵢdᵢ) / (∑fᵢ)  [dᵢ = xᵢ - a]",
          "Step-Deviation Mean: x̄ = a + [(∑fᵢuᵢ) / (∑fᵢ)] × h  [uᵢ = (xᵢ - a)/h]"
        ]
      },
      {
        "title": "Mode of Grouped Data",
        "points": [
          "**Modal Class:** The class interval possessing the **maximum frequency**.",
          "**Formula for Mode:**",
          "$$\\mathbf{\\text{Mode} = l + \\left(\\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\right) \\times h}$$",
          "where:",
          "• $l = $ lower limit of the modal class,",
          "• $h = $ size of the class interval,",
          "• $f_1 = $ frequency of the modal class,",
          "• $f_0 = $ frequency of the class preceding the modal class,",
          "• $f_2 = $ frequency of the class succeeding the modal class.",
          "• *Condition:* The class intervals must be continuous (exclusive)."
        ]
      },
      {
        "title": "Median of Grouped Data",
        "points": [
          "**Median Class:** Find $\\frac{n}{2} = \\frac{\\sum f_i}{2}$. The median class is the class interval whose cumulative frequency ($cf$) is **just greater than (or equal to) $\\frac{n}{2}$**.",
          "**Formula for Median:**",
          "$$\\mathbf{\\text{Median} = l + \\left(\\frac{\\frac{n}{2} - cf}{f}\\right) \\times h}$$",
          "where:",
          "• $l = $ lower limit of the median class,",
          "• $n = \\sum f_i = $ total frequency,",
          "• $cf = $ cumulative frequency of the class **preceding** the median class,",
          "• $f = $ frequency of the median class,",
          "• $h = $ class size."
        ],
        "formula": [
          "Median = l + [(n/2 - cf) / f] × h",
          "Empirical Relationship: 3 × Median = Mode + 2 × Mean",
          "Mode = 3 × Median - 2 × Mean"
        ]
      },
      {
        "title": "Empirical Relationship Between the Three Central Tendencies",
        "points": [
          "For moderately skewed frequency distributions, Karl Pearson's empirical relation holds:",
          "$$\\mathbf{3 \\times \\text{Median} = \\text{Mode} + 2 \\times \\text{Mean}}$$",
          "• $\\text{Mode} = 3\\text{Median} - 2\\text{Mean}$.",
          "• $\\text{Mean} = \\frac{3\\text{Median} - \\text{Mode}}{2}$.",
          "• *Example:* If $\\text{Mean} = 28$ and $\\text{Median} = 30$, then $\\text{Mode} = 3(30) - 2(28) = 90 - 56 = 34$."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Statistics.",
          "**1. If the mode of a data distribution is 24 and the mean is 24, then its median is:**",
          "A. 20 · B. 24 · C. 28 · D. 48",
          "**2. For the following distribution, what is the lower limit of the modal class? (Classes: 0-10: 5, 10-20: 8, 20-30: 12, 30-40: 20, 40-50: 9)**",
          "A. 10 · B. 20 · C. 30 · D. 40",
          "**3. If 35 is the mean of a distribution and 38 is its median, then the value of mode is:**",
          "A. 40 · B. 44 · C. 42 · D. 46",
          "**4. In the formula for finding the mean of grouped data x̄ = a + (∑fᵢdᵢ)/∑fᵢ, the term dᵢ represents:**",
          "A. Deviations from lower limit · B. Deviations from class mark · C. Deviations of xᵢ from assumed mean a · D. Frequencies",
          "**5. While computing the mean of grouped data, it is assumed that the frequencies are:**",
          "A. Centred at the lower limit of the class · B. Centred at the upper limit of the class · C. Centred at the class marks of the classes · D. Evenly spread over all numbers"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Class Mark",
        "meaning": "The exact central midpoint of a class interval: (Upper limit + Lower limit) / 2."
      },
      {
        "term": "Modal Class",
        "meaning": "The class interval that contains the highest individual frequency in a grouped distribution."
      },
      {
        "term": "Cumulative Frequency",
        "meaning": "The running total of frequencies accumulated from the first class interval up to the current class interval."
      }
    ],
    "examTips": [
      "Memorize the empirical relation: 3 Median = Mode + 2 Mean. A great mnemonic: 3 letters in Med(ian) vs 4 in Mode and Mean.",
      "In the median formula, cf is the cumulative frequency of the PRECEDING class, while f is the frequency of the median class itself. Confusing them is a common blunder.",
      "If class intervals are discontinuous (e.g. 1-10, 11-20), convert to continuous classes (0.5-10.5, 10.5-20.5) before computing median or mode."
    ]
  },
  {
    "id": "note-math10-14",
    "subject": "math",
    "classLevel": 10,
    "chapterNo": 14,
    "title": "Probability",
    "unit": "Mathematics · Class 10",
    "overview": "Probability quantifies the likelihood of occurrence of random events. This chapter covers classical theoretical probability, sample spaces for coins, dice, and playing cards, complementary events, and mutually exclusive outcomes.",
    "sections": [
      {
        "title": "Classical Theoretical Probability and Range",
        "points": [
          "**Theoretical (Classical) Probability of an Event $E$:**",
          "$$\\mathbf{P(E) = \\frac{\\text{Number of outcomes favourable to } E}{\\text{Number of all possible outcomes of the experiment}} = \\frac{n(E)}{n(S)}}$$",
          "This definition assumes that all outcomes of the experiment are **equally likely**.",
          "**Fundamental Properties of Probability:**",
          "(1) **Range:** The probability of any event $E$ is a number between 0 and 1 inclusive:",
          "$$\\mathbf{0 \\le P(E) \\le 1}$$",
          "• Probability can **never be negative**, and can **never exceed 1** (e.g., $-1.5$ or $1.2$ can never represent probabilities).",
          "(2) **Impossible Event:** An event that cannot happen has probability **0**: $P(\\phi) = 0$ (e.g., getting a number 7 on rolling a standard 6-sided die).",
          "(3) **Sure (Certain) Event:** An event that is guaranteed to happen has probability **1**: $P(S) = 1$ (e.g., getting a number less than 7 on a standard die).",
          "(4) **Sum of Elementary Events:** The sum of probabilities of all elementary events of an experiment is strictly equal to **1**."
        ],
        "formula": [
          "P(E) = n(E) / n(S)",
          "0 ≤ P(E) ≤ 1",
          "P(Impossible Event) = 0,   P(Sure Event) = 1",
          "∑ P(Eᵢ) = 1"
        ]
      },
      {
        "title": "Complementary Events: $P(E) + P(\\bar{E}) = 1$",
        "points": [
          "For any event $E$, the event 'Not $E$' is called the **complementary event** of $E$, denoted by $\\bar{E}$ or $E'$:",
          "$$\\mathbf{P(E) + P(\\bar{E}) = 1 \\implies P(\\bar{E}) = 1 - P(E)}$$",
          "• *Example:* If the probability of winning a game is $0.62$, the probability of losing is $1 - 0.62 = 0.38$."
        ]
      },
      {
        "title": "High-Yield Sample Spaces: Coins, Dice, and 52-Card Deck",
        "points": [
          "**(A) Tossing Coins:**",
          "• One coin: $\\{H, T\\}$, $n(S) = 2^1 = 2$.",
          "• Two coins: $\\{HH, HT, TH, TT\\}$, $n(S) = 2^2 = 4$.",
          "• Three coins: $\\{HHH, HHT, HTH, THH, HTT, THT, TTH, TTT\\}$, $n(S) = 2^3 = 8$.",
          "**(B) Rolling Dice:**",
          "• One die: $\\{1, 2, 3, 4, 5, 6\\}$, $n(S) = 6$.",
          "• Prime numbers on a die: $\\{2, 3, 5\\} \\implies P(\\text{prime}) = \\frac{3}{6} = \\frac{1}{2}$ (1 is neither prime nor composite!).",
          "• Two dice thrown simultaneously: $n(S) = 6 \\times 6 = 36$ outcomes.",
          "  - Doublets: $(1,1), (2,2), (3,3), (4,4), (5,5), (6,6) \\implies P(\\text{doublet}) = \\frac{6}{36} = \\frac{1}{6}$.",
          "  - Sum equal to 7: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) \\implies \\frac{6}{36} = \\frac{1}{6}$.",
          "**(C) Deck of 52 Playing Cards:**",
          "• Total cards $= 52$, divided into **4 suits** of 13 cards each:",
          "  - **Red Cards (26):** Hearts (13) and Diamonds (13).",
          "  - **Black Cards (26):** Spades (13) and Clubs (13).",
          "• **Face Cards (12):** Kings (4), Queens (4), and Jacks (4). (6 red face cards, 6 black face cards).",
          "• **Aces (4):** One in each suit. Note: An Ace is **NOT a face card**!"
        ],
        "table": {
          "head": [
            "Card Category",
            "Constituent Details",
            "Total Count",
            "Probability P(E) = n(E)/52"
          ],
          "rows": [
            [
              "Red Cards",
              "13 Hearts + 13 Diamonds",
              "26",
              "26/52 = 1/2"
            ],
            [
              "Black Cards",
              "13 Spades + 13 Clubs",
              "26",
              "26/52 = 1/2"
            ],
            [
              "Face Cards",
              "4 Kings + 4 Queens + 4 Jacks",
              "12",
              "12/52 = 3/13"
            ],
            [
              "Red Face Cards",
              "2 Kings + 2 Queens + 2 Jacks",
              "6",
              "6/52 = 3/26"
            ],
            [
              "Aces",
              "1 in each suit (not face card)",
              "4",
              "4/52 = 1/13"
            ]
          ]
        }
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Probability.",
          "**1. Which of the following cannot be the probability of an event?**",
          "A. 2/3 · B. -1.5 · C. 15% · D. 0.7",
          "**2. If P(E) = 0.05, what is the probability of 'not E'?**",
          "A. 0.95 · B. 0.05 · C. 0.50 · D. 0.90",
          "**3. A card is drawn from a well-shuffled deck of 52 playing cards. The probability of getting a black face card is:**",
          "A. 3/13 · B. 3/26 · C. 1/26 · D. 3/52",
          "**4. Two dice are thrown simultaneously. What is the probability of getting a sum of 8?**",
          "A. 5/36 · B. 1/6 · C. 7/36 · D. 1/9",
          "**5. A box contains 3 blue, 2 white, and 4 red marbles. If a marble is drawn at random, the probability that it will not be white is:**",
          "A. 2/9 · B. 7/9 · C. 5/9 · D. 4/9"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Elementary Event",
        "meaning": "An outcome of a random experiment that consists of exactly one single sample point."
      },
      {
        "term": "Complementary Event",
        "meaning": "The event that occurs if and only if the specified event E does not occur, satisfying P(E) + P(not E) = 1."
      },
      {
        "term": "Sample Space",
        "meaning": "The set of all possible outcomes of a random conceptual experiment."
      }
    ],
    "examTips": [
      "In cards, remember Aces are NOT face cards. Face cards are strictly Kings, Queens, and Jacks (total 12 cards).",
      "Probability of getting a sum of 8 on 2 dice: Favourable pairs are (2,6), (3,5), (4,4), (5,3), (6,2) => 5 pairs => 5/36.",
      "Probability of non-white marble = 1 - P(white) = 1 - 2/9 = 7/9 (or P(blue) + P(red) = (3+4)/9 = 7/9)."
    ]
  }
];
