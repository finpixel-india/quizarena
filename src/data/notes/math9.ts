import type { ChapterNote } from "./types";

const U9 = "Mathematics · Class 9";

export const mathNotes9: ChapterNote[] = [
  {
    "id": "note-math9-1",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 1,
    "title": "Number Systems",
    "unit": "Mathematics · Class 9",
    "overview": "Number systems classify the universe of real numbers into rational and irrational subsets, explaining their decimal characterisations, geometric representations on the number line, surd rationalisation, and laws of exponents.",
    "sections": [
      {
        "title": "Classification of Real Numbers",
        "points": [
          "**Hierarchy of Real Numbers (R):**",
          "• **Natural Numbers (N):** Counting numbers $\\{1, 2, 3, \\dots\\}$.",
          "• **Whole Numbers (W):** Natural numbers including zero $\\{0, 1, 2, 3, \\dots\\}$.",
          "• **Integers (Z):** Negative and positive whole numbers $\\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$.",
          "• **Rational Numbers (Q):** Any number expressible in the form **$\\frac{p}{q}$**, where $p$ and $q$ are integers and **$q \\neq 0$** (e.g., $-5 = -5/1$, $0 = 0/1$, $2/3$, $0.75 = 3/4$).",
          "• **Irrational Numbers (S):** Real numbers that **cannot** be written in the form $p/q$ (e.g., $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}, \\pi, 0.1010010001\\dots$).",
          "**Infinitude Principle:** Between any two distinct rational numbers, there exist **infinitely many rational and irrational numbers**."
        ]
      },
      {
        "title": "Decimal Expansions: Rational vs Irrational",
        "points": [
          "Every real number has a decimal expansion that uniquely defines its rational or irrational identity:",
          "(1) **Terminating Decimals (Rational):** The division terminates after a finite number of steps (e.g., $7/8 = 0.875$, $1/2 = 0.5$). The denominator in lowest terms has prime factors of only **$2^m \\cdot 5^n$**.",
          "(2) **Non-Terminating Recurring / Repeating Decimals (Rational):** The remainder never becomes zero, but a block of digits repeats periodically (e.g., $1/3 = 0.\\bar{3}$, $1/7 = 0.\\overline{142857}$). Any recurring decimal can be converted back to $p/q$ form.",
          "(3) **Non-Terminating Non-Recurring Decimals (Irrational):** The decimal expansion neither terminates nor exhibits any repeating block of digits (e.g., $\\sqrt{2} = 1.41421356\\dots$, $\\pi = 3.14159265\\dots$).",
          "**Conversion Example (Convert $0.\\bar{6}$ to $p/q$):**",
          "• Let $x = 0.6666\\dots$",
          "• Multiply by 10: $10x = 6.6666\\dots$",
          "• Subtract: $10x - x = 6 \\implies 9x = 6 \\implies x = 6/9 = \\mathbf{2/3}$."
        ]
      },
      {
        "title": "Operations on Real Numbers & Rationalising the Denominator",
        "points": [
          "**Algebraic Properties of Surds:** For positive real numbers $a$ and $b$:",
          "• $\\sqrt{ab} = \\sqrt{a} \\sqrt{b}$ and $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$.",
          "• $(\\sqrt{a} + \\sqrt{b})(\\sqrt{a} - \\sqrt{b}) = a - b$.",
          "• $(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$.",
          "• $(\\sqrt{a} + \\sqrt{b})^2 = a + 2\\sqrt{ab} + b$.",
          "**Rationalising the Denominator:** When a fraction contains a surd in the denominator, multiply both numerator and denominator by its **conjugate** to convert the denominator into an integer:",
          "• To rationalise $\\frac{1}{\\sqrt{a}}$: multiply numerator and denominator by $\\sqrt{a} \\implies \\frac{\\sqrt{a}}{a}$.",
          "• To rationalise $\\frac{1}{a + \\sqrt{b}}$: multiply by conjugate $(a - \\sqrt{b}) \\implies \\frac{a - \\sqrt{b}}{a^2 - b}$.",
          "• To rationalise $\\frac{1}{\\sqrt{a} - \\sqrt{b}}$: multiply by conjugate $(\\sqrt{a} + \\sqrt{b}) \\implies \\frac{\\sqrt{a} + \\sqrt{b}}{a - b}$."
        ],
        "formula": [
          "Conjugate of (a + √b) is (a - √b)",
          "Conjugate of (√a - √b) is (√a + √b)",
          "1 / (√a + √b) = (√a - √b) / (a - b)"
        ]
      },
      {
        "title": "Laws of Rational Exponents",
        "points": [
          "Let $a > 0$ be a real number and $p, q$ be rational numbers:",
          "(1) **Product of Powers:** $a^p \\cdot a^q = a^{p + q}$",
          "(2) **Power of a Power:** $(a^p)^q = a^{pq}$",
          "(3) **Quotient of Powers:** $\\frac{a^p}{a^q} = a^{p - q}$",
          "(4) **Power of a Product:** $a^p \\cdot b^p = (ab)^p$",
          "(5) **Zero Exponent:** $a^0 = 1$ ($a \\neq 0$)",
          "(6) **Negative Exponent:** $a^{-p} = \\frac{1}{a^p}$",
          "(7) **Radical Exponent:** $\\sqrt[n]{a} = a^{1/n}$ and $a^{m/n} = (a^{1/n})^m = \\sqrt[n]{a^m}$."
        ],
        "formula": [
          "aᵖ · aᑫ = aᵖ⁺ᑫ",
          "(aᵖ)ᑫ = aᵖᑫ",
          "aᵖ / aᑫ = aᵖ⁻ᑫ",
          "aᵖ · bᵖ = (ab)ᵖ",
          "a⁻ᵖ = 1 / aᵖ",
          "aᵐ/ⁿ = ⁿ√(aᵐ) = (ⁿ√a)ᵐ"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Number Systems.",
          "**1. Can zero be written in the form p/q, where p and q are integers and q ≠ 0?**",
          "A. Yes, e.g. 0/1 · B. No, zero is not rational · C. Only if q = 0 · D. Undefined",
          "**2. The decimal expansion of the number √2 is:**",
          "A. A finite terminating decimal · B. 1.41421 · C. Non-terminating recurring · D. Non-terminating non-recurring",
          "**3. The value of 0.4777... (0.47̄) in the form p/q is:**",
          "A. 47/99 · B. 43/90 · C. 47/90 · D. 43/99",
          "**4. After rationalising the denominator of 7 / (3√3 - 2√2), we get the denominator as:**",
          "A. 19 · B. 35 · C. 5 · D. 1",
          "**5. The value of (64)^(-1/2) - (-32)^(-4/5) is:**",
          "A. 1/8 · B. 3/8 · C. 1/16 · D. -1/16"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Rational Number",
        "meaning": "A real number expressible as p/q where p and q are integers with denominator q ≠ 0."
      },
      {
        "term": "Irrational Number",
        "meaning": "A real number with a non-terminating, non-recurring decimal expansion that cannot be expressed as a ratio of integers."
      },
      {
        "term": "Conjugate Surd",
        "meaning": "A binomial surd (a - √b) whose product with (a + √b) results in a purely rational value (a² - b)."
      }
    ],
    "examTips": [
      "In Question 4, compute denominator: (3√3)² - (2√2)² = (9 × 3) - (4 × 2) = 27 - 8 = 19.",
      "Do not confuse π with 22/7: π is strictly irrational, while 22/7 is a rational approximation.",
      "Remember that √(a + b) is NOT equal to √a + √b. For example, √(9 + 16) = √25 = 5, not 3 + 4 = 7."
    ]
  },
  {
    "id": "note-math9-2",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 2,
    "title": "Polynomials",
    "unit": "Mathematics · Class 9",
    "overview": "Polynomials are continuous algebraic functions with whole number exponents. This chapter explores degree classification, Remainder and Factor Theorems, middle-term quadratic factorisation, and universal algebraic identities.",
    "sections": [
      {
        "title": "Definition, Degree and Types of Polynomials",
        "points": [
          "**Definition:** An algebraic expression of the form $p(x) = a_n x^n + a_{n-1}x^{n-1} + \\dots + a_1 x + a_0$ is called a polynomial in one variable $x$, provided all exponents $n, n-1, \\dots$ are **whole numbers ($0, 1, 2, \\dots$)** and coefficients $a_i$ are real numbers.",
          "• Expressions like $\\frac{1}{x} = x^{-1}$, $\\sqrt{x} = x^{1/2}$, or $x + \\frac{2}{x}$ are **NOT polynomials** because exponents are negative or fractional.",
          "**Degree of a Polynomial:** The highest power of the variable $x$ in a polynomial with non-zero coefficient.",
          "• Constant Polynomial: $p(x) = c$ ($c \\neq 0$) has degree **0**.",
          "• **Zero Polynomial:** $p(x) = 0$ has degree **not defined**.",
          "• Linear Polynomial: degree 1 ($ax + b$).",
          "• Quadratic Polynomial: degree 2 ($ax^2 + bx + c$).",
          "• Cubic Polynomial: degree 3 ($ax^3 + bx^2 + cx + d$)."
        ]
      },
      {
        "title": "Zeroes of a Polynomial",
        "points": [
          "A real number $c$ is a zero of a polynomial $p(x)$ if **$p(c) = 0$**.",
          "• Zeroes are also called the **roots** of the polynomial equation $p(x) = 0$.",
          "• A non-zero constant polynomial has no zero.",
          "• Every real number is a zero of the zero polynomial.",
          "• A linear polynomial has one and only one zero ($ax + b = 0 \\implies x = -b/a$).",
          "• A polynomial of degree $n$ can have at most $n$ real zeroes."
        ]
      },
      {
        "title": "The Remainder Theorem and Factor Theorem",
        "points": [
          "**Remainder Theorem:** Let $p(x)$ be any polynomial of degree greater than or equal to 1 and let $a$ be any real number. If $p(x)$ is divided by the linear polynomial $(x - a)$, then the **remainder is $p(a)$**.",
          "• *Corollary:* If divided by $(ax + b)$, the remainder is $p(-b/a)$.",
          "**Factor Theorem:** Let $p(x)$ be a polynomial of degree $n \\ge 1$ and $a$ be any real number:",
          "(1) If $p(a) = 0$, then **$(x - a)$ is a factor** of $p(x)$.",
          "(2) Conversely, if $(x - a)$ is a factor of $p(x)$, then **$p(a) = 0$**.",
          "**Factorising Quadratic by Splitting Middle Term:**",
          "To factorise $ax^2 + bx + c$, find numbers $p$ and $q$ such that $p + q = b$ and $pq = ac$.",
          "**Factorising Cubic Polynomials:**",
          "For $p(x) = x^3 - 23x^2 + 142x - 120$: Find an initial root by trial using factors of constant 120 ($\\pm 1, \\pm 2$). Since $p(1) = 0$, $(x - 1)$ is a factor. Divide $p(x)$ by $(x - 1)$ to get quadratic quotient, then split the middle term."
        ]
      },
      {
        "title": "The 8 Master Algebraic Identities",
        "points": [
          "The eight standard algebraic identities indispensable for CBSE examinations:",
          "**(1)** $(x + y)^2 = x^2 + 2xy + y^2$",
          "**(2)** $(x - y)^2 = x^2 - 2xy + y^2$",
          "**(3)** $x^2 - y^2 = (x + y)(x - y)$",
          "**(4)** $(x + a)(x + b) = x^2 + (a + b)x + ab$",
          "**(5)** $(x + y + z)^2 = x^2 + y^2 + z^2 + 2xy + 2yz + 2zx$",
          "**(6)** $(x + y)^3 = x^3 + y^3 + 3xy(x + y) = x^3 + 3x^2y + 3xy^2 + y^3$",
          "**(7)** $(x - y)^3 = x^3 - y^3 - 3xy(x - y) = x^3 - 3x^2y + 3xy^2 - y^3$",
          "**(8)** $x^3 + y^3 + z^3 - 3xyz = (x + y + z)(x^2 + y^2 + z^2 - xy - yz - zx)$",
          "**Special Conditional Identity:**",
          "$$\\mathbf{\\text{If } x + y + z = 0, \\quad \\text{then } x^3 + y^3 + z^3 = 3xyz}$$",
          "• *Example:* Find $(-12)^3 + (7)^3 + (5)^3$. Here $(-12) + 7 + 5 = 0$, so sum is $3(-12)(7)(5) = -1260$."
        ],
        "formula": [
          "(x + y + z)² = x² + y² + z² + 2xy + 2yz + 2zx",
          "(x ± y)³ = x³ ± y³ ± 3xy(x ± y)",
          "x³ + y³ = (x + y)(x² - xy + y²)",
          "x³ - y³ = (x - y)(x² + xy + y²)",
          "If x + y + z = 0, then x³ + y³ + z³ = 3xyz"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Polynomials.",
          "**1. Which of the following expressions is a polynomial in one variable?**",
          "A. x + 2/x + 1 · B. √x + 3 · C. x² + √2 x + 5 · D. y³ + y^(-1)",
          "**2. If p(x) = x³ - 3x² + 2x + 5, what is the value of p(-1)?**",
          "A. 1 · B. -1 · C. 3 · D. -3",
          "**3. If (x - 2) is a factor of the polynomial p(x) = 2x² - 3x + k, then the value of k is:**",
          "A. 2 · B. -2 · C. 1 · D. -1",
          "**4. If x + y + z = 0, then the value of (x³/yz + y³/zx + z³/xy) is:**",
          "A. 0 · B. 1 · C. 3 · D. -3",
          "**5. The factorisation of 4x² + 12xy + 9y² is:**",
          "A. (2x - 3y)² · B. (2x + 3y)² · C. (4x + 9y)² · D. (2x + 3y)(2x - 3y)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Degree",
        "meaning": "The highest non-negative integer exponent of the variable occurring in a polynomial."
      },
      {
        "term": "Remainder Theorem",
        "meaning": "Dividing a polynomial p(x) by a linear divisor (x - a) yields a numerical remainder equal to p(a)."
      },
      {
        "term": "Factor Theorem",
        "meaning": "A linear binomial (x - a) divides polynomial p(x) with zero remainder if and only if p(a) = 0."
      }
    ],
    "examTips": [
      "In Question 4, x³/yz + y³/zx + z³/xy = (x³ + y³ + z³) / (xyz). Since x+y+z=0, numerator is 3xyz, so 3xyz / xyz = 3!",
      "Degree of the zero polynomial is 'NOT DEFINED', while degree of a non-zero constant polynomial is 0.",
      "When using (x - y)³, remember the alternating signs: x³ - 3x²y + 3xy² - y³."
    ]
  },
  {
    "id": "note-math9-3",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 3,
    "title": "Coordinate Geometry",
    "unit": "Mathematics · Class 9",
    "overview": "René Descartes unified algebra and Euclidean geometry through the Cartesian plane. This chapter explores horizontal and vertical axes, coordinates (abscissa and ordinate), sign conventions across quadrants, and plotting point configurations.",
    "sections": [
      {
        "title": "The Cartesian Coordinate System",
        "points": [
          "**Origin and Perpendicular Axes:**",
          "• The horizontal number line $X'OX$ is called the **x-axis**.",
          "• The vertical number line $Y'OY$ is called the **y-axis**.",
          "• The intersection point $O$ of the two axes is called the **origin**, having coordinates **$(0, 0)$**.",
          "• The coordinate axes divide the plane into four infinite regions called **quadrants** numbered counter-clockwise: **I, II, III, IV**."
        ]
      },
      {
        "title": "Coordinates of a Point: Abscissa and Ordinate",
        "points": [
          "Every point $P$ in the Cartesian plane is uniquely represented by an ordered pair of real numbers **$(x, y)$**:",
          "• **Abscissa ($x$-coordinate):** The perpendicular distance of point $P$ from the **y-axis**, measured along the x-axis. (Positive to the right of origin, negative to the left).",
          "• **Ordinate ($y$-coordinate):** The perpendicular distance of point $P$ from the **x-axis**, measured along the y-axis. (Positive above origin, negative below).",
          "**Important Axis Properties:**",
          "(1) For any point on the **x-axis**, its $y$-coordinate is always zero: **$(x, 0)$**.",
          "(2) For any point on the **y-axis**, its $x$-coordinate is always zero: **$(0, y)$**.",
          "(3) At the **origin**, both coordinates are zero: **$(0, 0)$**."
        ],
        "table": {
          "head": [
            "Quadrant",
            "Abscissa (x)",
            "Ordinate (y)",
            "Sign Form",
            "Example Point"
          ],
          "rows": [
            [
              "Quadrant I",
              "Positive (> 0)",
              "Positive (> 0)",
              "(+, +)",
              "(3, 5)"
            ],
            [
              "Quadrant II",
              "Negative (< 0)",
              "Positive (> 0)",
              "(-, +)",
              "(-4, 2)"
            ],
            [
              "Quadrant III",
              "Negative (< 0)",
              "Negative (< 0)",
              "(-, -)",
              "(-3, -7)"
            ],
            [
              "Quadrant IV",
              "Positive (> 0)",
              "Negative (< 0)",
              "(+, -)",
              "(5, -2)"
            ],
            [
              "x-axis",
              "Any real x",
              "Zero (0)",
              "(x, 0)",
              "(6, 0) or (-4, 0)"
            ],
            [
              "y-axis",
              "Zero (0)",
              "Any real y",
              "(0, y)",
              "(0, 8) or (0, -3)"
            ]
          ]
        }
      },
      {
        "title": "Reflections and Distances from Axes",
        "points": [
          "**Perpendicular Distances from Axes:**",
          "• The distance of a point $(x, y)$ from the x-axis is **$|y|$**.",
          "• The distance of a point $(x, y)$ from the y-axis is **$|x|$**.",
          "• *Example:* For point $P(-4, 7)$, distance from x-axis is $|7| = 7$ units, and distance from y-axis is $|-4| = 4$ units.",
          "**Reflections across Axes:**",
          "• Reflection of $(x, y)$ across the x-axis gives **$(x, -y)$**.",
          "• Reflection of $(x, y)$ across the y-axis gives **$(-x, y)$**.",
          "• Reflection of $(x, y)$ across the origin gives **$(-x, -y)$**."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Coordinate Geometry.",
          "**1. The point (-3, 5) lies in which quadrant of the Cartesian plane?**",
          "A. Quadrant I · B. Quadrant II · C. Quadrant III · D. Quadrant IV",
          "**2. What is the perpendicular distance of the point P(3, -4) from the x-axis?**",
          "A. 3 units · B. -4 units · C. 4 units · D. 5 units",
          "**3. A point whose abscissa is zero and ordinate is non-zero will lie on:**",
          "A. x-axis · B. y-axis · C. Origin · D. Quadrant II",
          "**4. If the coordinates of two points are P(-2, 3) and Q(-3, 5), then (abscissa of P) - (abscissa of Q) is:**",
          "A. -5 · B. 1 · C. -1 · D. 2",
          "**5. The points A(0, 0), B(3, 0), and C(0, 4) form which type of geometric figure when joined?**",
          "A. Equilateral triangle · B. Right-angled triangle · C. Scalene obtuse triangle · D. Collinear segment"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Cartesian Plane",
        "meaning": "A two-dimensional geometric plane defined by perpendicular horizontal and vertical coordinate axes intersecting at the origin."
      },
      {
        "term": "Abscissa",
        "meaning": "The signed horizontal x-coordinate of a point measuring its perpendicular distance from the y-axis."
      },
      {
        "term": "Ordinate",
        "meaning": "The signed vertical y-coordinate of a point measuring its perpendicular distance from the x-axis."
      }
    ],
    "examTips": [
      "Distance is ALWAYS non-negative: the distance of (3, -4) from x-axis is |-4| = 4 units, NOT -4.",
      "Remember that (abscissa of P) - (abscissa of Q) = (-2) - (-3) = -2 + 3 = 1.",
      "Points on axes DO NOT belong to any quadrant; they lie strictly on the respective axis."
    ]
  },
  {
    "id": "note-math9-4",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 4,
    "title": "Linear Equations in Two Variables",
    "unit": "Mathematics · Class 9",
    "overview": "Linear equations in two variables characterize straight lines on a Cartesian coordinate plane. This chapter covers standard form, infinite solutions, plotting linear graphs, and equations of lines parallel to coordinate axes.",
    "sections": [
      {
        "title": "Standard Form of a Linear Equation in Two Variables",
        "points": [
          "**Standard Form:** An equation that can be put in the form:",
          "$$\\mathbf{ax + by + c = 0}$$",
          "where $a, b, c$ are real numbers, and $a$ and $b$ are not both zero ($a^2 + b^2 \\neq 0$).",
          "• The degree of each variable $x$ and $y$ is strictly 1.",
          "• Any linear equation in one variable (e.g., $2x + 5 = 0$) can be represented as a linear equation in two variables by introducing coefficient 0: $2x + 0\\cdot y + 5 = 0$."
        ]
      },
      {
        "title": "Solutions of a Linear Equation in Two Variables",
        "points": [
          "A **solution** is an ordered pair of numbers $(\\alpha, \\beta)$ such that substituting $x = \\alpha$ and $y = \\beta$ makes the LHS equal to RHS.",
          "**Fundamental Property:** A linear equation in two variables has **infinitely many solutions**.",
          "• To find solutions: assign any arbitrary real value to $x$ and solve the resulting single-variable equation for $y$ (or vice versa).",
          "• *Example:* For $2x + y = 6$:",
          "  - If $x = 0 \\implies y = 6 \\implies (0, 6)$.",
          "  - If $x = 1 \\implies 2(1) + y = 6 \\implies y = 4 \\implies (1, 4)$.",
          "  - If $y = 0 \\implies 2x = 6 \\implies x = 3 \\implies (3, 0)$."
        ]
      },
      {
        "title": "Graph of a Linear Equation in Two Variables",
        "points": [
          "**Geometrical Nature:** The graph of every linear equation in two variables $ax + by + c = 0$ is a **straight line**.",
          "• Every point $(x, y)$ that lies on the line is a solution of the equation.",
          "• Every solution of the equation corresponds to a point lying on the line.",
          "• Any point not lying on the line is NOT a solution.",
          "• Two distinct points are sufficient to determine a line uniquely, but finding a third point serves as an essential check against arithmetic errors."
        ]
      },
      {
        "title": "Equations of Lines Parallel to Coordinate Axes",
        "points": [
          "(1) **Equation of the x-axis:** On the x-axis, the y-coordinate of every point is 0. Hence, equation is **$y = 0$**.",
          "(2) **Equation of the y-axis:** On the y-axis, the x-coordinate of every point is 0. Hence, equation is **$x = 0$**.",
          "(3) **Line Parallel to y-axis:** Equation is **$x = a$** (a vertical straight line at distance $a$ from the y-axis).",
          "(4) **Line Parallel to x-axis:** Equation is **$y = b$** (a horizontal straight line at distance $b$ from the x-axis).",
          "(5) **Line Passing Through Origin:** Any line of the form **$y = mx$** or $ax + by = 0$ has $c = 0$ and passes through the origin $(0, 0)$."
        ],
        "table": {
          "head": [
            "Equation Form",
            "Graphical Orientation",
            "Intersection with Axes",
            "Special Feature"
          ],
          "rows": [
            [
              "y = 0",
              "Horizontal (coincides with x-axis)",
              "All points on x-axis",
              "The x-axis itself"
            ],
            [
              "x = 0",
              "Vertical (coincides with y-axis)",
              "All points on y-axis",
              "The y-axis itself"
            ],
            [
              "x = a",
              "Vertical line (parallel to y-axis)",
              "Cuts x-axis at (a, 0)",
              "Constant abscissa a"
            ],
            [
              "y = b",
              "Horizontal line (parallel to x-axis)",
              "Cuts y-axis at (0, b)",
              "Constant ordinate b"
            ],
            [
              "y = mx",
              "Sloping straight line",
              "Passes through (0, 0)",
              "Line passes through origin"
            ]
          ]
        }
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Linear Equations in Two Variables.",
          "**1. The linear equation 2x - 5y = 7 has:**",
          "A. A unique solution · B. Two solutions · C. Infinitely many solutions · D. No solution",
          "**2. The graph of the linear equation 2x + 3y = 6 cuts the y-axis at the point:**",
          "A. (2, 0) · B. (0, 3) · C. (3, 0) · D. (0, 2)",
          "**3. If (2, 0) is a solution of the linear equation 2x + 3y = k, then the value of k is:**",
          "A. 4 · B. 6 · C. 5 · D. 2",
          "**4. The equation of the line passing through the origin is of the form:**",
          "A. x + y = 1 · B. y = mx · C. x = c · D. y = c",
          "**5. Any point on the line y = x is of the form:**",
          "A. (a, -a) · B. (0, a) · C. (a, 0) · D. (a, a)"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Linear Equation in Two Variables",
        "meaning": "An equation ax + by + c = 0 where a and b are not both zero, whose graphical plot is a straight line."
      },
      {
        "term": "Solution of Linear Equation",
        "meaning": "An ordered pair (α, β) satisfying the equality when substituted for variables x and y."
      },
      {
        "term": "y-intercept",
        "meaning": "The point where the graph of an equation intersects the y-axis, obtained by setting x = 0."
      }
    ],
    "examTips": [
      "A linear equation in TWO variables ALWAYS has infinitely many solutions, whereas in ONE variable it has exactly one unique root.",
      "To find where a line cuts the y-axis, put x = 0: 2(0) + 3y = 6 => y = 2 => point is (0, 2).",
      "Any line with zero constant term (c = 0) passes directly through the origin (0, 0)."
    ]
  },
  {
    "id": "note-math9-5",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 5,
    "title": "Introduction to Euclid's Geometry",
    "unit": "Mathematics · Class 9",
    "overview": "Euclidean geometry establishes deductive mathematical reasoning from primitive undefined concepts to self-evident axioms and geometric postulates. This chapter explores Euclid's Elements, his seven axioms, five postulates, and Playfair's parallel axiom.",
    "sections": [
      {
        "title": "Euclid's Definitions and the Undefined Geometric Terms",
        "points": [
          "**Historical Genesis:** Around 300 BCE, **Euclid**, a Greek mathematician teaching at Alexandria in Egypt, collected all known mathematics of his time into 13 books called **The Elements**.",
          "**Euclid's Basic Definitions:**",
          "(1) A *point* is that which has no part.",
          "(2) A *line* is breadthless length.",
          "(3) The ends of a line are points.",
          "(4) A *straight line* is a line which lies evenly with the points on itself.",
          "(5) A *surface* is that which has length and breadth only.",
          "(6) The edges of a surface are lines.",
          "(7) A *plane surface* is a surface which lies evenly with the straight lines on itself.",
          "• In modern geometry, **point**, **line**, and **plane** are taken as **undefined terms** to avoid circular definitions."
        ]
      },
      {
        "title": "Euclid's Seven Axioms (Universal Assumptions)",
        "points": [
          "**Axioms:** Self-evident assumptions used throughout all branches of mathematics (not specific to geometry):",
          "(1) **Things which are equal to the same thing are equal to one another.** (If $a = c$ and $b = c$, then $a = b$).",
          "(2) **If equals are added to equals, the wholes are equal.** (If $a = b$, then $a + c = b + c$).",
          "(3) **If equals are subtracted from equals, the remainders are equal.** (If $a = b$, then $a - c = b - c$).",
          "(4) **Things which coincide with one another are equal to one another.** (Principle of superposition).",
          "(5) **The whole is greater than the part.** (If $a = b + c$ with $c > 0$, then $a > b$).",
          "(6) **Things which are double of the same things are equal to one another.** (If $a = 2x$ and $b = 2x$, then $a = b$).",
          "(7) **Things which are halves of the same things are equal to one another.** (If $a = x/2$ and $b = x/2$, then $a = b$)."
        ]
      },
      {
        "title": "Euclid's Five Postulates (Geometric Assumptions)",
        "points": [
          "**Postulates:** Assumptions specific to geometry:",
          "• **Postulate 1:** A straight line may be drawn from any one point to any other point. (*Axiom 5.1:* Given two distinct points, there is a unique line that passes through them).",
          "• **Postulate 2:** A terminated line can be produced indefinitely (can be extended indefinitely in both directions).",
          "• **Postulate 3:** A circle can be drawn with any centre and any radius.",
          "• **Postulate 4:** All right angles are equal to one another ($90^\\circ$).",
          "• **Postulate 5 (The Parallel Postulate):** If a straight line falling on two straight lines makes the interior angles on the same side of it taken together less than two right angles ($< 180^\\circ$), then the two straight lines, if produced indefinitely, meet on that side on which the sum of angles is less than two right angles.",
          "**Equivalent Version — Playfair's Axiom:** For every line $l$ and for every point $P$ not lying on $l$, there exists a **unique line $m$ passing through $P$ and parallel to $l$**."
        ],
        "formula": [
          "Postulate 5 Condition: If ∠1 + ∠2 < 180°, lines intersect on that side",
          "If ∠1 + ∠2 = 180°, lines are parallel and never meet",
          "Axiom 1: a = c and b = c => a = b"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Euclid's Geometry.",
          "**1. The number of dimensions of a surface according to Euclid is:**",
          "A. 1 · B. 2 · C. 3 · D. 0",
          "**2. 'Things which are equal to the same thing are equal to one another' is Euclid's:**",
          "A. Axiom 1 · B. Postulate 1 · C. Postulate 5 · D. Theorem 1",
          "**3. How many lines can pass through two distinct given points?**",
          "A. Only one · B. Two · C. Infinitely many · D. None",
          "**4. If a point C lies between two points A and B such that AC = BC, then which of the following is true?**",
          "A. AC = AB · B. AC = 1/2 AB · C. AB = 1/3 AC · D. AC = 2 AB",
          "**5. The famous treatise 'The Elements' written by Euclid was divided into how many books (chapters)?**",
          "A. 10 · B. 12 · C. 13 · D. 15"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Axiom",
        "meaning": "A fundamental mathematical statement accepted as true without proof, applicable across all domains of science and mathematics."
      },
      {
        "term": "Postulate",
        "meaning": "A self-evident geometric assumption specific solely to spatial lines, angles, circles, and figures."
      },
      {
        "term": "Playfair's Axiom",
        "meaning": "An equivalent formulation of Euclid's fifth postulate stating that through a point outside a line, only one parallel line can be drawn."
      }
    ],
    "examTips": [
      "Remember dimensional counts: Solid has 3 dimensions (length, breadth, height); Surface has 2; Line has 1; Point has 0 dimensions.",
      "Postulates are specifically geometric, while Axioms are general mathematical truths.",
      "If AC = BC and C is between A and B, then AC + BC = AB => 2AC = AB => AC = 1/2 AB."
    ]
  },
  {
    "id": "note-math9-6",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 6,
    "title": "Lines and Angles",
    "unit": "Mathematics · Class 9",
    "overview": "Angular relationships govern planar geometry. This chapter covers angle classifications, the Linear Pair Axiom, formal proof of vertically opposite angles, transversal interactions with parallel lines, and angle sum properties.",
    "sections": [
      {
        "title": "Basic Terminology and Types of Angles",
        "points": [
          "**Collinear Points:** Three or more points lying on the same straight line.",
          "**Angle:** Formed when two rays originate from the same common end point (vertex).",
          "**Angle Classifications:**",
          "• **Acute Angle:** $0^\\circ < \\theta < 90^\\circ$.",
          "• **Right Angle:** $\\theta = 90^\\circ$.",
          "• **Obtuse Angle:** $90^\\circ < \\theta < 180^\\circ$.",
          "• **Straight Angle:** $\\theta = 180^\\circ$ (forms a straight line).",
          "• **Reflex Angle:** $180^\\circ < \\theta < 360^\\circ$.",
          "• **Complementary Angles:** Two angles whose sum is **$90^\\circ$**.",
          "• **Supplementary Angles:** Two angles whose sum is **$180^\\circ$**."
        ]
      },
      {
        "title": "Linear Pair Axiom and Vertically Opposite Angles Theorem",
        "points": [
          "**Axiom 6.1 (Linear Pair Axiom):** If a ray stands on a line, then the sum of two adjacent angles so formed is **$180^\\circ$**.",
          "• *Converse (Axiom 6.2):* If the sum of two adjacent angles is $180^\\circ$, then the non-common arms of the angles form a straight line.",
          "**Theorem 6.1 (Vertically Opposite Angles):** If two lines intersect each other, then the vertically opposite angles are equal.",
          "• **Given:** Two lines $AB$ and $CD$ intersect at point $O$.",
          "• **To Prove:** $\\angle AOC = \\angle BOD$ and $\\angle AOD = \\angle BOC$.",
          "• **Proof:**",
          "  - Ray $OA$ stands on line $CD \\implies \\angle AOC + \\angle AOD = 180^\\circ$ (Linear pair).",
          "  - Ray $OD$ stands on line $AB \\implies \\angle AOD + \\angle BOD = 180^\\circ$ (Linear pair).",
          "  - Equating: $\\angle AOC + \\angle AOD = \\angle AOD + \\angle BOD$.",
          "  - Subtracting $\\angle AOD$ from both sides: $\\mathbf{\\angle AOC = \\angle BOD}$."
        ],
        "formula": [
          "Linear Pair: ∠1 + ∠2 = 180°",
          "Vertically Opposite Angles: ∠AOC = ∠BOD and ∠AOD = ∠BOC",
          "Complementary: ∠A + ∠B = 90°",
          "Supplementary: ∠A + ∠B = 180°"
        ]
      },
      {
        "title": "Parallel Lines and a Transversal",
        "points": [
          "**Transversal:** A line which intersects two or more lines at distinct points.",
          "When a transversal $t$ intersects two parallel lines $l$ and $m$ ($l \\parallel m$):",
          "(1) **Corresponding Angles Axiom:** Corresponding angles are equal (e.g., $\\angle 1 = \\angle 5, \\; \\angle 2 = \\angle 6$).",
          "(2) **Alternate Interior Angles Theorem:** Alternate interior angles are equal ($\\mathbf{\\angle 3 = \\angle 5, \\; \\angle 4 = \\angle 6}$).",
          "(3) **Consecutive Interior (Co-Interior) Angles:** Interior angles on the same side of the transversal are **supplementary**: $\\mathbf{\\angle 4 + \\angle 5 = 180^\\circ}$ and $\\mathbf{\\angle 3 + \\angle 6 = 180^\\circ}$.",
          "**Lines Parallel to the Same Line (Theorem 6.6):** Lines which are parallel to the same line are parallel to each other ($l \\parallel m$ and $m \\parallel n \\implies l \\parallel n$)."
        ],
        "table": {
          "head": [
            "Angle Pair Type",
            "Angles Identified",
            "Condition for Parallelism (l ∥ m)",
            "Converse Theorem"
          ],
          "rows": [
            [
              "Corresponding Angles",
              "∠1 & ∠5, ∠2 & ∠6",
              "Corresponding angles are equal",
              "If equal => lines are parallel"
            ],
            [
              "Alternate Interior Angles",
              "∠3 & ∠5, ∠4 & ∠6",
              "Alternate interior angles are equal",
              "If equal => lines are parallel"
            ],
            [
              "Co-Interior Angles",
              "∠4 & ∠5, ∠3 & ∠6",
              "Angles on same side sum to 180°",
              "If sum is 180° => lines are parallel"
            ]
          ]
        }
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Lines and Angles.",
          "**1. An angle is equal to one-third of its supplement. The measure of the angle is:**",
          "A. 30° · B. 45° · C. 60° · D. 75°",
          "**2. In the given figure, two straight lines AB and CD intersect at O. If ∠AOC + ∠COB + ∠BOD = 270°, then ∠AOD is equal to:**",
          "A. 70° · B. 80° · C. 90° · D. 100°",
          "**3. If two interior angles on the same side of a transversal intersecting two parallel lines are in the ratio 2 : 3, then the larger of two angles is:**",
          "A. 72° · B. 108° · C. 120° · D. 136°",
          "**4. If one of the angles of a linear pair is an acute angle, then the other angle must be:**",
          "A. Acute angle · B. Right angle · C. Obtuse angle · D. Straight angle",
          "**5. The reflex angle corresponding to an angle of 75° is:**",
          "A. 105° · B. 185° · C. 255° · D. 285°"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Linear Pair",
        "meaning": "A pair of adjacent angles whose non-common arms form opposite collinear rays, summing to 180°."
      },
      {
        "term": "Transversal",
        "meaning": "A straight line that cuts across two or more coplanar lines at distinct points."
      },
      {
        "term": "Reflex Angle",
        "meaning": "An angle measuring strictly greater than 180° and strictly less than 360°."
      }
    ],
    "examTips": [
      "In Question 1: Let angle be x. Supplement is (180 - x). x = (1/3)(180 - x) => 3x = 180 - x => 4x = 180 => x = 45°.",
      "Reflex angle = 360° - angle: Reflex of 75° = 360° - 75° = 285°.",
      "Remember: sum of all angles around a single point on a plane is strictly 360°."
    ]
  },
  {
    "id": "note-math9-7",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 7,
    "title": "Triangles",
    "unit": "Mathematics · Class 9",
    "overview": "Triangles form the fundamental building blocks of polygonal geometry. This chapter covers the five criteria for congruence of triangles (SAS, ASA, AAS, SSS, RHS), the properties of isosceles triangles, and deductive geometric proofs.",
    "sections": [
      {
        "title": "Congruence of Triangles and CPCTC",
        "points": [
          "**Congruent Figures:** Two geometric figures are congruent if they have the **same shape and the same size** (superimposing one on the other covers it completely).",
          "**Congruence of Triangles:** $\\triangle ABC \\cong \\triangle PQR$ means:",
          "• Corresponding vertices: $A \\leftrightarrow P, \\; B \\leftrightarrow Q, \\; C \\leftrightarrow R$.",
          "• Corresponding sides are equal: $AB = PQ, \\; BC = QR, \\; AC = PR$.",
          "• Corresponding angles are equal: $\\angle A = \\angle P, \\; \\angle B = \\angle Q, \\; \\angle C = \\angle R$.",
          "**CPCTC:** Stands for **Corresponding Parts of Congruent Triangles are Congruent**. Once congruence is established via any three elements, all remaining corresponding sides and angles are immediately equal."
        ]
      },
      {
        "title": "Five Criteria for Congruence of Triangles",
        "points": [
          "**(1) SAS Congruence Axiom (Side-Angle-Side):** Two triangles are congruent if two sides and the **included angle** of one triangle are equal to two sides and the included angle of the other triangle.",
          "• *Warning:* The angle MUST be included between the two sides. 'SSA' or 'ASS' is NOT a valid congruence criterion!",
          "**(2) ASA Congruence Theorem (Angle-Side-Angle):** Two triangles are congruent if two angles and the **included side** of one triangle are equal to two angles and the included side of the other triangle.",
          "**(3) AAS Congruence Theorem (Angle-Angle-Side):** Two triangles are congruent if any two pairs of angles and one pair of corresponding sides are equal (follows from ASA because third angle is fixed by angle sum property).",
          "**(4) SSS Congruence Theorem (Side-Side-Side):** If three sides of one triangle are equal to the three sides of another triangle, then the two triangles are congruent.",
          "**(5) RHS Congruence Theorem (Right angle-Hypotenuse-Side):** If in two right triangles, the **hypotenuse and one side** of one triangle are equal to the hypotenuse and one side of the other triangle, the two triangles are congruent."
        ],
        "table": {
          "head": [
            "Congruence Rule",
            "Required Equal Elements",
            "Position Requirement",
            "Validity Status"
          ],
          "rows": [
            [
              "SAS",
              "2 Sides + 1 Angle",
              "Angle must be strictly INCLUDED between sides",
              "Valid Axiom"
            ],
            [
              "ASA",
              "2 Angles + 1 Side",
              "Side must be strictly INCLUDED between angles",
              "Valid Theorem"
            ],
            [
              "AAS",
              "2 Angles + 1 Side",
              "Side can be non-included",
              "Valid Theorem"
            ],
            [
              "SSS",
              "3 Sides",
              "All 3 pairs of corresponding sides equal",
              "Valid Theorem"
            ],
            [
              "RHS",
              "Right angle + Hypotenuse + 1 Side",
              "Applicable strictly to right-angled triangles",
              "Valid Theorem"
            ],
            [
              "AAA",
              "3 Angles",
              "Shapes are similar, NOT necessarily congruent",
              "INVALID for congruence"
            ]
          ]
        }
      },
      {
        "title": "Properties of Isosceles Triangles",
        "points": [
          "**Theorem 7.2:** Angles opposite to equal sides of an isosceles triangle are equal.",
          "• **Given:** In $\\triangle ABC$, $AB = AC$.",
          "• **To Prove:** $\\angle B = \\angle C$.",
          "• **Proof:** Draw the bisector $AD$ of $\\angle A$ meeting $BC$ at $D$. In $\\triangle ABD$ and $\\triangle ACD$:",
          "  - $AB = AC$ (given).",
          "  - $\\angle BAD = \\angle CAD$ (by construction).",
          "  - $AD = AD$ (common).",
          "  - Therefore, $\\triangle ABD \\cong \\triangle ACD$ by **SAS axiom**.",
          "  - Hence, $\\mathbf{\\angle B = \\angle C}$ by CPCTC.",
          "**Theorem 7.3 (Converse):** The sides opposite to equal angles of a triangle are equal ($AB = AC$ if $\\angle B = \\angle C$).",
          "• *Corollary:* Each angle of an equilateral triangle is equal to $60^\\circ$."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Triangles.",
          "**1. Which of the following is NOT a criterion for congruence of triangles?**",
          "A. SAS · B. ASA · C. SSS · D. SSA",
          "**2. In △ABC, AB = AC and ∠B = 50°. Then ∠A is equal to:**",
          "A. 40° · B. 50° · C. 80° · D. 130°",
          "**3. If △ABC ≅ △PQR and △ABC is not congruent to △RPQ, then which of the following is not true?**",
          "A. BC = QR · B. AC = PR · C. AB = PQ · D. AB = QR",
          "**4. In △PQR, ∠R = ∠P and QR = 4 cm and PR = 5 cm. Then the length of PQ is:**",
          "A. 4 cm · B. 5 cm · C. 2 cm · D. 2.5 cm",
          "**5. In right-angled triangles △ABC and △DEF, hypotenuse AB = EF and side AC = DE. By which criterion are they congruent?**",
          "A. SAS · B. RHS · C. SSS · D. ASA"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Congruence",
        "meaning": "Geometric equality in both shape and size such that one figure coincides exactly with the other."
      },
      {
        "term": "CPCTC",
        "meaning": "Corresponding Parts of Congruent Triangles are Congruent."
      },
      {
        "term": "Isosceles Triangle",
        "meaning": "A triangle possessing at least two sides of equal length, having equal opposite angles."
      }
    ],
    "examTips": [
      "AAA and SSA (or ASS) are NEVER valid congruence criteria. Only SAS, ASA, AAS, SSS, and RHS are valid.",
      "In Question 2, since AB = AC, ∠C = ∠B = 50°. Sum of angles = 180°, so ∠A = 180° - (50° + 50°) = 80°.",
      "In Question 4, ∠R = ∠P implies sides opposite to them are equal: PQ = QR = 4 cm."
    ]
  },
  {
    "id": "note-math9-8",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 8,
    "title": "Quadrilaterals",
    "unit": "Mathematics · Class 9",
    "overview": "Four-sided planar polygons encompass versatile geometric families. This chapter covers the angle sum property of quadrilaterals, types and properties of parallelograms, rectangles, rhombuses, and squares, and the foundational Mid-Point Theorem.",
    "sections": [
      {
        "title": "Angle Sum Property and Types of Quadrilaterals",
        "points": [
          "**Angle Sum Property:** The sum of all four interior angles of a quadrilateral is **$360^\\circ$**.",
          "• *Proof:* Draw a diagonal dividing the quadrilateral into two triangles; each triangle has angle sum $180^\\circ$, so $180^\\circ + 180^\\circ = 360^\\circ$.",
          "**Classification of Quadrilaterals:**",
          "(1) **Trapezium:** A quadrilateral with one pair of opposite sides parallel.",
          "(2) **Parallelogram:** A quadrilateral in which both pairs of opposite sides are parallel.",
          "(3) **Rhombus:** A parallelogram having all four sides equal in length.",
          "(4) **Rectangle:** A parallelogram with each interior angle equal to a right angle ($90^\\circ$).",
          "(5) **Square:** A parallelogram having all four sides equal and all four angles equal to $90^\\circ$ (both a rectangle and a rhombus).",
          "(6) **Kite:** A quadrilateral with two pairs of equal adjacent sides, but opposite sides unequal."
        ]
      },
      {
        "title": "Comprehensive Properties of Parallelograms",
        "points": [
          "In a parallelogram $ABCD$:",
          "• **Theorem 8.1:** A diagonal of a parallelogram divides it into two congruent triangles ($\\triangle ABC \\cong \\triangle CDA$).",
          "• **Theorem 8.2:** In a parallelogram, opposite sides are equal ($AB = CD$ and $AD = BC$).",
          "• **Theorem 8.4:** In a parallelogram, opposite angles are equal ($\\angle A = \\angle C$ and $\\angle B = \\angle D$).",
          "• Consecutive interior angles are supplementary ($\\angle A + \\angle B = 180^\\circ$).",
          "• **Theorem 8.6:** The diagonals of a parallelogram **bisect each other** ($OA = OC$ and $OB = OD$).",
          "**Conditions to Prove a Quadrilateral is a Parallelogram:**",
          "(1) Both pairs of opposite sides are equal, OR",
          "(2) Both pairs of opposite angles are equal, OR",
          "(3) Diagonals bisect each other, OR",
          "(4) **One pair of opposite sides is both equal AND parallel** ($AB = CD$ and $AB \\parallel CD$)."
        ]
      },
      {
        "title": "Special Parallelograms: Diagonals Comparison",
        "points": [
          "Crucial diagonal characteristics tested in board exams:"
        ],
        "table": {
          "head": [
            "Quadrilateral",
            "Opposite Sides",
            "All Angles 90°?",
            "Diagonals Equal?",
            "Diagonals Perpendicular (90°)?"
          ],
          "rows": [
            [
              "Parallelogram",
              "Equal & Parallel",
              "No",
              "No",
              "No"
            ],
            [
              "Rectangle",
              "Equal & Parallel",
              "Yes",
              "Yes (AC = BD)",
              "No"
            ],
            [
              "Rhombus",
              "All 4 sides equal",
              "No",
              "No",
              "Yes (AC ⊥ BD)"
            ],
            [
              "Square",
              "All 4 sides equal",
              "Yes",
              "Yes (AC = BD)",
              "Yes (AC ⊥ BD)"
            ]
          ]
        }
      },
      {
        "title": "The Mid-Point Theorem and Its Converse",
        "points": [
          "**Theorem 8.8 (The Mid-Point Theorem):** The line segment joining the mid-points of two sides of a triangle is parallel to the third side and is equal to half of it.",
          "• **Given:** In $\\triangle ABC$, $E$ and $F$ are mid-points of $AB$ and $AC$ respectively.",
          "• **Result:** $\\mathbf{EF \\parallel BC \\quad \\text{and} \\quad EF = \\frac{1}{2}BC}$.",
          "**Theorem 8.9 (Converse of Mid-Point Theorem):** The line drawn through the mid-point of one side of a triangle parallel to another side bisects the third side.",
          "• **Major Application:** The quadrilateral formed by joining the mid-points of the sides of ANY quadrilateral, in order, is **always a parallelogram**."
        ],
        "formula": [
          "Mid-Point Theorem: EF || BC and EF = (1/2) BC",
          "Converse: Line through midpoint of AB parallel to BC bisects AC at F"
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Quadrilaterals.",
          "**1. The four angles of a quadrilateral are in the ratio 3 : 5 : 9 : 13. The smallest angle of the quadrilateral is:**",
          "A. 12° · B. 36° · C. 60° · D. 108°",
          "**2. If diagonals of a quadrilateral bisect each other at right angles, then it must be a:**",
          "A. Rectangle · B. Trapezium · C. Rhombus · D. Kite",
          "**3. In △ABC, D and E are mid-points of sides AB and AC respectively. If BC = 8.6 cm, then the length of DE is:**",
          "A. 4.3 cm · B. 8.6 cm · C. 17.2 cm · D. 2.15 cm",
          "**4. Diagonals of which quadrilateral are equal in length and also bisect each other at right angles?**",
          "A. Rectangle · B. Rhombus · C. Parallelogram · D. Square",
          "**5. In a parallelogram ABCD, if ∠A = (2x + 25)° and ∠B = (3x - 5)°, then the value of x is:**",
          "A. 28 · B. 32 · C. 36 · D. 42"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Parallelogram",
        "meaning": "A four-sided polygon whose opposite sides are parallel and congruent, and whose diagonals bisect each other."
      },
      {
        "term": "Rhombus",
        "meaning": "An equilateral parallelogram whose diagonals bisect each other perpendicularly at 90°."
      },
      {
        "term": "Mid-Point Theorem",
        "meaning": "A theorem stating that a line connecting the midpoints of two sides of a triangle is parallel to and half the length of the base."
      }
    ],
    "examTips": [
      "In Question 1: Total ratio parts = 3 + 5 + 9 + 13 = 30 parts = 360° => 1 part = 12°. Smallest angle = 3 × 12° = 36°.",
      "In Question 5: Consecutive angles in a parallelogram are supplementary: (2x + 25) + (3x - 5) = 180° => 5x + 20 = 180° => 5x = 160° => x = 32.",
      "Diagonals equal ONLY in Rectangle and Square. Diagonals perpendicular ONLY in Rhombus and Square. Both equal AND perpendicular ONLY in Square."
    ]
  },
  {
    "id": "note-math9-9",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 9,
    "title": "Circles",
    "unit": "Mathematics · Class 9",
    "overview": "Circles encompass locus geometry of points equidistant from a centre. This chapter explores perpendicular chord bisections, subtended arc angles at the centre vs circumference, angles in a semicircle, and cyclic quadrilateral properties.",
    "sections": [
      {
        "title": "Chords and Their Distances from the Centre",
        "points": [
          "**Circle Basics:** A circle is the collection of all points in a plane which are at a fixed distance (radius $r$) from a fixed point (centre $O$).",
          "• **Chord:** A line segment joining any two points on a circle. The longest chord passing through the centre is the **diameter** ($d = 2r$).",
          "**Theorem 9.1 (Perpendicular Chord Bisector):** The perpendicular drawn from the centre of a circle to a chord **bisects the chord**.",
          "• *Converse (Theorem 9.2):* The line drawn through the centre of a circle to bisect a chord is perpendicular to the chord.",
          "• *Pythagorean Relation:* If chord length is $2L$, distance from centre is $d$, and radius is $r$:",
          "$$r^2 = d^2 + L^2 \\implies d = \\sqrt{r^2 - L^2}$$",
          "**Theorem 9.5 (Equal Chords and Distance):** Equal chords of a circle (or of congruent circles) are **equidistant from the centre** ($AB = CD \\implies OL = OM$).",
          "• *Converse (Theorem 9.6):* Chords equidistant from the centre of a circle are equal in length."
        ],
        "formula": [
          "Perpendicular from centre bisects chord: AL = LB = (1/2) AB",
          "In right △OLA: r² = d² + (AB/2)²",
          "Equal chords are equidistant from centre: If AB = CD then OL = OM"
        ]
      },
      {
        "title": "Angle Subtended by an Arc of a Circle",
        "points": [
          "**Theorem 9.7 (Angle at Centre is Double Angle at Circumference):** The angle subtended by an arc at the centre is **double** the angle subtended by it at any point on the remaining part of the circle.",
          "$$\\mathbf{\\angle AOB = 2 \\times \\angle APB}$$",
          "**Key Direct Deductions:**",
          "(1) **Theorem 9.8 (Angles in Same Segment):** Angles in the same segment of a circle are **equal** ($\\angle APB = \\angle AQB$).",
          "(2) **Angle in a Semicircle is a Right Angle:** When arc $AB$ is a semicircle (diameter $AB$), central angle is $180^\\circ$. Therefore, the angle subtended at the circumference is:",
          "$$\\angle APB = \\frac{1}{2}(180^\\circ) = \\mathbf{90^\\circ}$$",
          "(3) An angle subtended by a major arc in the minor segment is an obtuse angle; an angle in the major segment is an acute angle."
        ],
        "formula": [
          "Central angle: ∠AOB = 2 × ∠APB",
          "Angles in the same segment are equal: ∠APB = ∠AQB",
          "Angle in a semicircle = 90°"
        ]
      },
      {
        "title": "Cyclic Quadrilaterals",
        "points": [
          "**Definition:** A quadrilateral $ABCD$ is called **cyclic** if all four of its vertices lie on the circumference of a circle.",
          "**Theorem 9.11 (Opposite Angles Sum to 180°):** The sum of either pair of opposite angles of a cyclic quadrilateral is **$180^\\circ$** (supplementary).",
          "$$\\mathbf{\\angle A + \\angle C = 180^\\circ \\quad \\text{and} \\quad \\angle B + \\angle D = 180^\\circ}$$",
          "• *Converse (Theorem 9.12):* If the sum of a pair of opposite angles of a quadrilateral is $180^\\circ$, the quadrilateral is cyclic.",
          "**Crucial Corollary on Exterior Angle:** An exterior angle of a cyclic quadrilateral is equal to its **interior opposite angle**."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Circles.",
          "**1. In the given figure, ∠AOB = 100° where O is the centre of the circle. The measure of ∠APB (where P lies on the major arc) is:**",
          "A. 100° · B. 50° · C. 80° · D. 200°",
          "**2. In a cyclic quadrilateral ABCD, if ∠A = (2x + 4)° and ∠C = (3x + 11)°, then the value of x is:**",
          "A. 30 · B. 33 · C. 35 · D. 40",
          "**3. A chord of length 16 cm is drawn in a circle of radius 10 cm. The distance of the chord from the centre of the circle is:**",
          "A. 6 cm · B. 8 cm · C. 5 cm · D. 12 cm",
          "**4. If ABCD is a cyclic quadrilateral such that AB is a diameter of the circle and ∠ADC = 140°, then ∠BAC is:**",
          "A. 40° · B. 50° · C. 60° · D. 80°",
          "**5. The length of a chord which is at a distance of 5 cm from the centre of a circle of radius 13 cm is:**",
          "A. 12 cm · B. 24 cm · C. 10 cm · D. 26 cm"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Cyclic Quadrilateral",
        "meaning": "A four-sided polygon whose vertices all lie consecutively on the circumference of a common circle."
      },
      {
        "term": "Subtended Angle",
        "meaning": "The angle formed at a given vertex by drawing rays to the two endpoints of an arc or chord."
      },
      {
        "term": "Semicircle Angle",
        "meaning": "The inscribed angle subtended by a diameter at any point on the circle, always equal to 90°."
      }
    ],
    "examTips": [
      "In Question 1, central angle ∠AOB = 100° => ∠APB = 100° / 2 = 50°.",
      "In Question 4: In cyclic ABCD, ∠B = 180° - 140° = 40°. Since AB is diameter, ∠ACB = 90°. In △ABC: ∠BAC = 180° - (90° + 40°) = 50°.",
      "In chord distance problems, always use half chord: for chord 16 cm, half is 8 cm. Distance d = √(10² - 8²) = √(100 - 64) = √36 = 6 cm."
    ]
  },
  {
    "id": "note-math9-10",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 10,
    "title": "Heron's Formula",
    "unit": "Mathematics · Class 9",
    "overview": "Heron's formula computes triangular areas purely from three side lengths without requiring an altitude. This chapter covers semi-perimeter definitions, scalene area calculations, and applications to composite polygonal lands.",
    "sections": [
      {
        "title": "Traditional Area vs Heron's Formula",
        "points": [
          "**Traditional Formula:** $\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height}$.",
          "• Requires calculating or constructing an altitude, which is cumbersome for scalene triangles where altitude is not given.",
          "• For right triangle: $\\text{Area} = \\frac{1}{2} \\times \\text{product of perpendicular sides}$.",
          "• For equilateral triangle of side $a$: $\\text{Area} = \\frac{\\sqrt{3}}{4} a^2$ and altitude $h = \\frac{\\sqrt{3}}{2} a$.",
          "• For isosceles triangle with equal sides $a$ and base $b$: $\\text{Area} = \\frac{b}{4}\\sqrt{4a^2 - b^2}$."
        ]
      },
      {
        "title": "Heron of Alexandria's Formula",
        "points": [
          "**Heron's Formula:** Let $a, b, c$ be the lengths of the three sides of a triangle.",
          "• Step 1: Calculate the **Semi-Perimeter ($s$)**:",
          "$$\\mathbf{s = \\frac{a + b + c}{2}}$$",
          "• Step 2: Compute the area using the square root of the continued product:",
          "$$\\mathbf{\\text{Area} = \\sqrt{s(s - a)(s - b)(s - c)}}$$",
          "**Worked Example:** Find the area of a triangle with sides $a = 13\\text{ cm}, \\; b = 14\\text{ cm}, \\; c = 15\\text{ cm}$.",
          "• $s = \\frac{13 + 14 + 15}{2} = \\frac{42}{2} = 21\\text{ cm}$.",
          "• Differences: $s - a = 21 - 13 = 8$, $\\; s - b = 21 - 14 = 7$, $\\; s - c = 21 - 15 = 6$.",
          "• $\\text{Area} = \\sqrt{21 \\times 8 \\times 7 \\times 6} = \\sqrt{(7 \\times 3) \\times (2^3) \\times 7 \\times (2 \\times 3)} = \\sqrt{7^2 \\times 3^2 \\times 2^4} = 7 \\times 3 \\times 4 = \\mathbf{84\\text{ cm}^2}$."
        ],
        "formula": [
          "Semi-perimeter: s = (a + b + c) / 2",
          "Heron's Formula: Area = √[s(s - a)(s - b)(s - c)]",
          "Equilateral triangle Area = (√3 / 4) × a²",
          "Altitude of triangle from base: h = (2 × Area) / base"
        ]
      },
      {
        "title": "Finding the Altitude to the Longest or Shortest Side",
        "points": [
          "Once the area is calculated using Heron's formula, the height ($h$) corresponding to any side can be calculated immediately:",
          "$$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times h \\implies \\mathbf{h = \\frac{2 \\times \\text{Area}}{\\text{base}}}}$$",
          "• The altitude is **shortest** when drawn to the **longest side**.",
          "• The altitude is **longest** when drawn to the **shortest side**."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Heron's Formula.",
          "**1. The sides of a triangle are in the ratio 12 : 17 : 25 and its perimeter is 540 cm. Its area is:**",
          "A. 9000 cm² · B. 6000 cm² · C. 4500 cm² · D. 12000 cm²",
          "**2. The area of an equilateral triangle having each side equal to 2√3 cm is:**",
          "A. 3√3 cm² · B. 6 cm² · C. 3 cm² · D. 2√3 cm²",
          "**3. The edges of a triangular board are 6 cm, 8 cm, and 10 cm. The cost of painting it at the rate of 9 paise per cm² is:**",
          "A. ₹ 2.16 · B. ₹ 2.48 · C. ₹ 3.00 · D. ₹ 1.80",
          "**4. If the perimeter of an equilateral triangle is 60 m, then its area is:**",
          "A. 10√3 m² · B. 100√3 m² · C. 15√3 m² · D. 200√3 m²",
          "**5. The height corresponding to the longest side (15 cm) of a triangle having sides 13 cm, 14 cm, and 15 cm is:**",
          "A. 11.2 cm · B. 12 cm · C. 9.6 cm · D. 8.4 cm"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Semi-Perimeter (s)",
        "meaning": "Half the perimeter of a polygon; for a triangle, s = (a + b + c)/2."
      },
      {
        "term": "Heron's Formula",
        "meaning": "An explicit algebraic formula determining the area of a triangle directly from its three side lengths."
      },
      {
        "term": "Altitude",
        "meaning": "The perpendicular line segment drawn from a vertex of a triangle to its opposite base."
      }
    ],
    "examTips": [
      "In Question 1: 12x + 17x + 25x = 540 => 54x = 540 => x = 10. Sides are 120, 170, 250 cm. s = 270. Area = √(270 × 150 × 100 × 20) = 9000 cm².",
      "In Question 3: 6, 8, 10 forms a right triangle (6² + 8² = 10²)! Area = (1/2) × 6 × 8 = 24 cm². Cost = 24 × 9 paise = 216 paise = ₹ 2.16.",
      "Always factor numbers inside the square root instead of multiplying them into massive multi-digit numbers!"
    ]
  },
  {
    "id": "note-math9-11",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 11,
    "title": "Surface Areas and Volumes",
    "unit": "Mathematics · Class 9",
    "overview": "Curved surface areas and volumetric bounds for right circular solids. This chapter details formulas, derivations, and problem solving for cylinders, cones, spheres, and hemispheres.",
    "sections": [
      {
        "title": "Surface Area and Volume of a Right Circular Cylinder",
        "points": [
          "A right circular cylinder of base radius $r$ and height $h$:",
          "• **Curved Surface Area (CSA):** Unrolls into a rectangle of length $2\\pi r$ and width $h$:",
          "$$\\mathbf{\\text{CSA} = 2\\pi r h}$$",
          "• **Total Surface Area (TSA):** CSA plus two circular flat bases:",
          "$$\\mathbf{\\text{TSA} = 2\\pi r h + 2\\pi r^2 = 2\\pi r(r + h)}$$",
          "• **Volume:** $\\text{Base area} \\times \\text{height}$:",
          "$$\\mathbf{V = \\pi r^2 h}$$",
          "• **Hollow Cylindrical Pipe (Inner radius $r$, Outer radius $R$):**",
          "  - Volume of metal $= \\pi(R^2 - r^2)h$.",
          "  - Total Surface Area $= 2\\pi R h + 2\\pi r h + 2\\pi(R^2 - r^2)$."
        ],
        "formula": [
          "Cylinder CSA = 2πrh",
          "Cylinder TSA = 2πr(r + h)",
          "Cylinder Volume = πr²h",
          "Hollow Cylinder Metal Volume = π(R² - r²)h"
        ]
      },
      {
        "title": "Surface Area and Volume of a Right Circular Cone",
        "points": [
          "A right circular cone with base radius $r$, vertical height $h$, and slant height $l$:",
          "• **Pythagorean Slant Height Relation:**",
          "$$\\mathbf{l = \\sqrt{r^2 + h^2}}$$",
          "• **Curved Surface Area (CSA):** $\\mathbf{\\text{CSA} = \\pi r l}$.",
          "• **Total Surface Area (TSA):** CSA plus one flat circular base:",
          "$$\\mathbf{\\text{TSA} = \\pi r l + \\pi r^2 = \\pi r(l + r)}$$",
          "• **Volume:** Exactly one-third of the volume of a cylinder with identical base and height:",
          "$$\\mathbf{V = \\frac{1}{3}\\pi r^2 h}$$"
        ],
        "formula": [
          "Slant height: l = √(r² + h²)",
          "Cone CSA = πrl",
          "Cone TSA = πr(l + r)",
          "Cone Volume = (1/3)πr²h"
        ]
      },
      {
        "title": "Surface Area and Volume of Sphere and Hemisphere",
        "points": [
          "**Sphere (Radius $r$):**",
          "• Surface Area $= \\mathbf{4\\pi r^2}$ (equal to the area of four circles of radius $r$).",
          "• Volume $= \\mathbf{\\frac{4}{3}\\pi r^3}$.",
          "**Hemisphere (Radius $r$):**",
          "• **Curved Surface Area (CSA):** $\\mathbf{2\\pi r^2}$.",
          "• **Total Surface Area (TSA):** Curved surface plus flat top circular base:",
          "$$\\mathbf{\\text{TSA} = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2}$$",
          "• **Volume:** $\\mathbf{V = \\frac{2}{3}\\pi r^3}$."
        ],
        "table": {
          "head": [
            "Solid Shape",
            "Curved Surface Area (CSA)",
            "Total Surface Area (TSA)",
            "Volume (V)"
          ],
          "rows": [
            [
              "Cylinder (r, h)",
              "2πrh",
              "2πr(r + h)",
              "πr²h"
            ],
            [
              "Cone (r, h, l)",
              "πrl",
              "πr(l + r)",
              "(1/3)πr²h"
            ],
            [
              "Sphere (r)",
              "4πr²",
              "4πr²",
              "(4/3)πr³"
            ],
            [
              "Hemisphere (r)",
              "2πr²",
              "3πr²",
              "(2/3)πr³"
            ]
          ]
        }
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Surface Areas and Volumes.",
          "**1. The radius of a sphere is 2r, then its volume will be:**",
          "A. 4/3 πr³ · B. 4πr³ · C. 8πr³ / 3 · D. 32/3 πr³",
          "**2. The total surface area of a solid hemisphere of radius r is:**",
          "A. 2πr² · B. 3πr² · C. 4πr² · D. 2/3 πr³",
          "**3. If the curved surface area of a right circular cone of slant height 14 cm is 308 cm², then its base diameter is:**",
          "A. 7 cm · B. 14 cm · C. 21 cm · D. 28 cm",
          "**4. The height of a cone is 15 cm. If its volume is 1570 cm³, find the radius of the base (use π = 3.14):**",
          "A. 5 cm · B. 10 cm · C. 15 cm · D. 20 cm",
          "**5. In a cylinder, if radius is halved and height is doubled, the curved surface area will be:**",
          "A. Halved · B. Doubled · C. Same · D. Four times"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Slant Height",
        "meaning": "The diagonal distance from the apex of a cone along its curved surface to any point on its circular base rim."
      },
      {
        "term": "Hemisphere",
        "meaning": "Exact half of a sphere obtained by slicing it through a great circle plane passing through the centre."
      },
      {
        "term": "Capacity",
        "meaning": "The internal storage volume of a hollow vessel, measured in litres or cubic units (1 m³ = 1000 litres)."
      }
    ],
    "examTips": [
      "In Question 1: V = (4/3)π(2r)³ = (4/3)π(8r³) = 32/3 πr³.",
      "In Question 5: New CSA = 2π(r/2)(2h) = 2πrh = Same! It remains unchanged.",
      "Pay strict attention to SOLID vs HOLLOW hemisphere: TSA of a solid hemisphere is 3πr², while CSA is 2πr²."
    ]
  },
  {
    "id": "note-math9-12",
    "subject": "math",
    "classLevel": 9,
    "chapterNo": 12,
    "title": "Statistics",
    "unit": "Mathematics · Class 9",
    "overview": "Descriptive statistics organizes raw data into visual and frequency structures. This chapter details frequency distribution tables, bar graphs, histograms for uniform and varying class intervals, and frequency polygons.",
    "sections": [
      {
        "title": "Collection and Presentation of Data",
        "points": [
          "**Primary Data:** Data collected by the investigator personally with a definite objective in mind (first-hand, highly reliable).",
          "**Secondary Data:** Data gathered from existing sources, records, published journals, or government archives.",
          "**Range of Data:** The difference between the highest (maximum) and lowest (minimum) values in a data set: $\\mathbf{\\text{Range} = \\text{Maximum Value} - \\text{Minimum Value}}$.",
          "**Grouped Frequency Distributions:**",
          "(1) **Inclusive (Discontinuous) Form:** e.g., 1–10, 11–20, 21–30 (both limits included). To convert to continuous: subtract $0.5$ from lower limit and add $0.5$ to upper limit $\\implies 0.5–10.5, 10.5–20.5$.",
          "(2) **Exclusive (Continuous) Form:** e.g., 0–10, 10–20, 20–30 (upper limit is excluded from that class and included in the next succeeding class)."
        ]
      },
      {
        "title": "Bar Graphs and Histograms",
        "points": [
          "**Bar Graph:** A pictorial representation of data using rectangular bars of uniform width drawn with equal spacing between them. The height of each bar is proportional to the corresponding frequency or value.",
          "**Histogram:** A graphical representation of a continuous frequency distribution where rectangles are erected over adjacent class intervals on the x-axis without any gaps:",
          "• The area of each rectangle is proportional to the corresponding frequency.",
          "• **Histograms with Varying Base Widths (Adjusted Frequency):**",
          "When class intervals have unequal widths, the height of the rectangle cannot be simply the frequency (which would distort area proportions). The height must be adjusted:",
          "$$\\mathbf{\\text{Adjusted Length (Height) of Rectangle} = \\frac{\\text{Minimum Class Size}}{\\text{Class Size of this class}} \\times \\text{Frequency}}$$"
        ],
        "formula": [
          "Range = Maximum value - Minimum value",
          "Class Mark = (Upper limit + Lower limit) / 2",
          "Adjusted Frequency = (Minimum class width / Current class width) × Frequency"
        ]
      },
      {
        "title": "Frequency Polygons",
        "points": [
          "**Frequency Polygon:** A line graph visualising the distribution of frequencies across class intervals.",
          "• **Construction Method 1 (Using Histogram):** Join the mid-points of the top horizontal sides of all adjacent rectangles in a histogram by straight line segments. Complete the polygon by joining the endpoints to the class marks of two hypothetical class intervals with zero frequency at both extremes.",
          "• **Construction Method 2 (Without Histogram):** Calculate the class mark $x_i = \\frac{\\text{Upper limit} + \\text{Lower limit}}{2}$ for each class interval. Plot the coordinate points $(x_i, f_i)$ on the graph and connect consecutive points with straight line segments."
        ]
      },
      {
        "title": "Board Exam & Practice Arena",
        "points": [
          "**Instructions:** Practice these high-yield board multiple-choice questions on Statistics.",
          "**1. The class mark of the class interval 130 - 150 is:**",
          "A. 130 · B. 135 · C. 140 · D. 145",
          "**2. In a frequency distribution, the mid-value of a class is 10 and the width of the class is 6. The lower limit of the class is:**",
          "A. 6 · B. 7 · C. 8 · D. 12",
          "**3. The range of the data: 25, 18, 20, 22, 16, 6, 17, 15, 12, 30, 32, 10, 19, 8, 11, 20 is:**",
          "A. 10 · B. 15 · C. 26 · D. 32",
          "**4. In a histogram with varying class widths, the height of a rectangle is proportional to:**",
          "A. Class width · B. Frequency of the class · C. Frequency density (adjusted frequency) · D. Cumulative frequency",
          "**5. To construct a frequency polygon without drawing a histogram, we plot the frequencies along with:**",
          "A. Upper class limits · B. Lower class limits · C. Class marks · D. Class sizes"
        ]
      }
    ],
    "keyTerms": [
      {
        "term": "Class Mark",
        "meaning": "The exact midpoint value of a class interval: (Upper class limit + Lower class limit) / 2."
      },
      {
        "term": "Range",
        "meaning": "The statistical spread of a dataset, calculated as the difference between the highest and lowest observations."
      },
      {
        "term": "Frequency Polygon",
        "meaning": "A closed planar line graph constructed by connecting the midpoints of class intervals plotted against frequencies."
      }
    ],
    "examTips": [
      "In Question 2: Mid-value = 10, class width = 6. Lower limit = Mid-value - Width/2 = 10 - 3 = 7. Upper limit = 10 + 3 = 13.",
      "In Question 3: Maximum = 32, Minimum = 6. Range = 32 - 6 = 26.",
      "Remember: frequency polygon is ALWAYS a closed figure; remember to connect to the baseline at adjacent hypothetical zero-frequency class marks."
    ]
  }
];
