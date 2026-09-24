import type { Difficulty } from "./types";
import { pick, randInt as r, shuffle } from "./random";

export type MathGenKey = "arithmetic" | "fractions" | "percent" | "powers" | "algebra";
type Level = 1 | 2 | 3;

export interface GeneratedQuestion {
  question: string;
  answer: string;
  distractors: string[];
  hint: string;
  explanation: string;
  level: Level;
}

/* ----------------------------- helpers ----------------------------- */

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function fmt(n: number): string {
  const v = Math.round(n * 1000) / 1000;
  if (Number.isInteger(v) && Math.abs(v) >= 10000) return v.toLocaleString("en-IN");
  return String(v);
}

function numOptions(answer: number, extras: number[], opts: { negative?: boolean; decimal?: boolean } = {}): string[] {
  const out: string[] = [];
  const seen = new Set<string>([fmt(answer)]);
  const push = (n: number) => {
    if (out.length >= 3 || !Number.isFinite(n)) return;
    if (!opts.negative && n < 0) return;
    const v = Math.round(n * 1000) / 1000;
    if (!opts.decimal && !Number.isInteger(v)) return;
    const s = fmt(v);
    if (seen.has(s)) return;
    seen.add(s);
    out.push(s);
  };
  extras.forEach(push);
  const mag = Math.max(1, Math.round(Math.abs(answer) * 0.1));
  shuffle([answer + 1, answer - 1, answer + 2, answer - 2, answer + mag, answer - mag, answer + 10, answer - 10, answer + 2 * mag]).forEach(push);
  for (let k = 3; out.length < 3 && k < 500; k++) {
    push(answer + k);
    push(answer - k);
  }
  return out;
}

type Frac = [number, number];

function simp([n, d]: Frac): Frac {
  const g = gcd(n, d);
  let a = n / g;
  let b = d / g;
  if (b < 0) {
    a = -a;
    b = -b;
  }
  return [a, b];
}

function fs(f: Frac): string {
  const [n, d] = simp(f);
  return d === 1 ? String(n) : `${n}/${d}`;
}

function fracOptions(ans: Frac, extras: Frac[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>([fs(ans)]);
  const push = (f: Frac) => {
    if (out.length >= 3 || f[1] === 0 || f[0] <= 0 || f[1] < 0) return;
    const s = fs(f);
    if (seen.has(s)) return;
    seen.add(s);
    out.push(s);
  };
  extras.forEach(push);
  const [n, d] = simp(ans);
  shuffle<Frac>([[n + 1, d], [n - 1, d], [n, d + 1], [n, d - 1], [d, n], [n + 2, d], [n * 2, d + 1]]).forEach(push);
  for (let k = 3; out.length < 3 && k < 100; k++) push([n + k, d]);
  return out;
}

const q = (question: string, answer: string, distractors: string[], hint: string, explanation: string, level: Level): GeneratedQuestion => ({
  question,
  answer,
  distractors,
  hint,
  explanation,
  level,
});

/* ---------------------------- generators ---------------------------- */

function arithmetic(lv: Level): GeneratedQuestion {
  const kinds = lv === 1 ? ["add", "sub", "mul", "div"] : lv === 2 ? ["add", "sub", "mul", "div", "bodmas"] : ["add", "sub", "mul", "div", "bodmas", "brackets"];
  const kind = pick(kinds);
  if (kind === "add" || kind === "sub") {
    const [lo, hi] = lv === 1 ? [10, 99] : lv === 2 ? [100, 999] : [1000, 9999];
    let a = r(lo, hi);
    let b = r(lo, hi);
    if (kind === "sub" && b > a) [a, b] = [b, a];
    if (kind === "sub" && a === b) a += r(1, 9);
    const ans = kind === "add" ? a + b : a - b;
    const sym = kind === "add" ? "+" : "−";
    return q(
      `What is ${fmt(a)} ${sym} ${fmt(b)}?`,
      fmt(ans),
      numOptions(ans, [ans + 10, ans - 10, kind === "sub" ? ans + 100 : ans - 100]),
      `Work place by place, starting with the ones digits (${a % 10} ${sym} ${b % 10})${kind === "sub" ? " — borrow if needed" : " — carry if needed"}.`,
      `${fmt(a)} ${sym} ${fmt(b)} = ${fmt(ans)}.`,
      lv,
    );
  }
  if (kind === "mul") {
    const a = lv === 1 ? r(2, 12) : lv === 2 ? r(11, 25) : r(21, 99);
    const b = lv === 1 ? r(2, 12) : lv === 2 ? r(3, 15) : r(11, 49);
    const ans = a * b;
    const tens = Math.floor(b / 10) * 10;
    const ones = b % 10;
    const hint =
      b >= 10 && ones > 0
        ? `Split ${b} into ${tens} + ${ones}: ${a} × ${tens} + ${a} × ${ones}.`
        : `Think of the ${a} times table, or double and halve to make it easier.`;
    return q(`What is ${a} × ${b}?`, fmt(ans), numOptions(ans, [a * (b + 1), a * (b - 1), (a + 1) * b]), hint, `${a} × ${b} = ${fmt(ans)}.`, lv);
  }
  if (kind === "div") {
    const d = lv === 1 ? r(2, 10) : lv === 2 ? r(3, 15) : r(12, 30);
    const quo = lv === 1 ? r(2, 12) : lv === 2 ? r(6, 30) : r(12, 60);
    const n = d * quo;
    return q(
      `What is ${fmt(n)} ÷ ${d}?`,
      fmt(quo),
      numOptions(quo, [quo + 1, quo - 1, quo + 10]),
      `Ask yourself: ${d} × ? = ${fmt(n)}.`,
      `${d} × ${quo} = ${fmt(n)}, so ${fmt(n)} ÷ ${d} = ${quo}.`,
      lv,
    );
  }
  if (kind === "bodmas") {
    const a = r(2, 30);
    const b = r(2, 12);
    const c = r(2, 12);
    const ans = a + b * c;
    return q(
      `Evaluate: ${a} + ${b} × ${c}`,
      fmt(ans),
      numOptions(ans, [(a + b) * c, ans + c, ans - b]),
      "BODMAS: do the multiplication before the addition.",
      `${b} × ${c} = ${b * c}; then ${a} + ${b * c} = ${ans}.`,
      lv,
    );
  }
  const a = r(2, 20);
  const b = r(2, 20);
  const c = r(2, 9);
  const d = r(1, 30);
  const ans = (a + b) * c - d;
  return q(
    `Evaluate: (${a} + ${b}) × ${c} − ${d}`,
    fmt(ans),
    numOptions(ans, [a + b * c - d, (a + b) * (c - d), ans + d], { negative: true }),
    "Solve the brackets first, then multiply, then subtract.",
    `(${a} + ${b}) = ${a + b}; ${a + b} × ${c} = ${(a + b) * c}; ${(a + b) * c} − ${d} = ${ans}.`,
    lv,
  );
}

function fractions(lv: Level): GeneratedQuestion {
  const kinds = lv === 1 ? ["addLike", "ofNumber", "simplify", "toDecimal"] : lv === 2 ? ["addUnlike", "mul", "ofNumber", "toDecimal", "decimalAdd"] : ["addUnlike", "subUnlike", "mul", "div", "decimalMul"];
  const kind = pick(kinds);
  switch (kind) {
    case "addLike": {
      const d = r(3, 12);
      const a = r(1, d - 1);
      const b = r(1, d - 1);
      const ans: Frac = [a + b, d];
      return q(`What is ${a}/${d} + ${b}/${d}?`, fs(ans), fracOptions(ans, [[a + b, 2 * d], [a * b, d]]), "Denominators are the same — add only the numerators.", `${a}/${d} + ${b}/${d} = ${a + b}/${d} = ${fs(ans)}.`, lv);
    }
    case "addUnlike":
    case "subUnlike": {
      const b = r(2, 9);
      let d = r(2, 9);
      if (d === b) d = b + 1;
      const a = r(1, b);
      const c = r(1, d);
      if (kind === "subUnlike") {
        return a / b >= c / d ? fractionsSub(a, b, c, d, lv) : fractionsSub(c, d, a, b, lv);
      }
      const ans: Frac = [a * d + c * b, b * d];
      return q(
        `What is ${a}/${b} + ${c}/${d}?`,
        fs(ans),
        fracOptions(ans, [[a + c, b + d], [a * d + c * b, b + d]]),
        `Make the denominators equal first — use ${b * d / gcd(b, d)} as the common denominator.`,
        `${a}/${b} + ${c}/${d} = ${a * d + c * b}/${b * d} = ${fs(ans)}.`,
        lv,
      );
    }
    case "mul": {
      const a = r(1, 9);
      const b = r(2, 10);
      const c = r(1, 9);
      const d = r(2, 10);
      const ans: Frac = [a * c, b * d];
      return q(`What is ${a}/${b} × ${c}/${d}?`, fs(ans), fracOptions(ans, [[a * d, b * c], [a + c, b + d]]), "Multiply numerator × numerator and denominator × denominator, then simplify.", `(${a} × ${c})/(${b} × ${d}) = ${a * c}/${b * d} = ${fs(ans)}.`, lv);
    }
    case "div": {
      const a = r(1, 9);
      const b = r(2, 10);
      const c = r(1, 9);
      const d = r(2, 10);
      const ans: Frac = [a * d, b * c];
      return q(`What is ${a}/${b} ÷ ${c}/${d}?`, fs(ans), fracOptions(ans, [[a * c, b * d], [b * c, a * d]]), "Dividing by a fraction = multiplying by its reciprocal.", `${a}/${b} × ${d}/${c} = ${a * d}/${b * c} = ${fs(ans)}.`, lv);
    }
    case "ofNumber": {
      const d = pick([2, 3, 4, 5, 6, 8, 10]);
      const n = r(1, d - 1);
      const whole = d * r(lv === 1 ? 2 : 5, lv === 1 ? 12 : 30);
      const ans = (whole / d) * n;
      return q(`What is ${n}/${d} of ${whole}?`, fmt(ans), numOptions(ans, [whole / d, ans + whole / d, whole - ans]), `First find 1/${d} of ${whole}, then multiply by ${n}.`, `${whole} ÷ ${d} = ${whole / d}; × ${n} = ${ans}.`, lv);
    }
    case "simplify": {
      const [a, b] = pick<Frac>([[1, 2], [2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 7], [5, 8], [7, 9]]);
      const k = r(2, 9);
      const ans: Frac = [a, b];
      return q(`Simplify ${a * k}/${b * k} to its lowest terms.`, fs(ans), fracOptions(ans, [[a * 2, b * 3], [b, a], [a + 1, b + 1]]), `Divide the numerator and denominator by their HCF (${k}).`, `${a * k}/${b * k} = ${a}/${b} after dividing both by ${k}.`, lv);
    }
    case "toDecimal": {
      const [a, b] = pick<Frac>([[1, 4], [3, 4], [1, 5], [2, 5], [3, 8], [5, 8], [7, 20], [9, 25], [1, 8], [7, 10], [3, 20], [11, 20]]);
      const ans = a / b;
      return q(`Convert ${a}/${b} into a decimal.`, fmt(ans), numOptions(ans, [ans / 10, ans + 0.1, b / 100 + a / 100], { decimal: true }), `Divide ${a} by ${b}, or make the denominator 10, 100 or 1000.`, `${a} ÷ ${b} = ${fmt(ans)}.`, lv);
    }
    case "decimalAdd": {
      const a = r(11, 99) / 10;
      const b = r(101, 999) / 100;
      const ans = Math.round((a + b) * 100) / 100;
      return q(`What is ${fmt(a)} + ${fmt(b)}?`, fmt(ans), numOptions(ans, [ans + 0.1, ans - 0.1, ans + 1], { decimal: true }), "Line up the decimal points before adding.", `${fmt(a)} + ${fmt(b)} = ${fmt(ans)}.`, lv);
    }
    default: {
      const a = r(11, 99) / 10;
      const b = r(2, 9) / 10;
      const ans = Math.round(a * b * 100) / 100;
      return q(`What is ${fmt(a)} × ${fmt(b)}?`, fmt(ans), numOptions(ans, [ans * 10, ans / 10, ans + 0.1], { decimal: true }), "Multiply as whole numbers, then place the decimal point (count decimal places).", `${fmt(a)} × ${fmt(b)} = ${fmt(ans)}.`, lv);
    }
  }
}

function fractionsSub(a: number, b: number, c: number, d: number, lv: Level): GeneratedQuestion {
  const num = a * d - c * b;
  if (num <= 0) return fractions(lv);
  const ans: Frac = [num, b * d];
  return q(
    `What is ${a}/${b} − ${c}/${d}?`,
    fs(ans),
    fracOptions(ans, [[Math.abs(a - c) || 1, Math.abs(b - d) || 1], [num, b + d]]),
    "Convert both fractions to a common denominator, then subtract the numerators.",
    `${a}/${b} − ${c}/${d} = ${a * d}/${b * d} − ${c * b}/${b * d} = ${fs(ans)}.`,
    lv,
  );
}

function percent(lv: Level): GeneratedQuestion {
  const kinds = lv === 1 ? ["of", "whatPercent", "discount"] : lv === 2 ? ["of", "whatPercent", "increase", "ratio", "discount"] : ["increase", "ratio", "si", "profit", "whatPercent"];
  const kind = pick(kinds);
  if (kind === "of") {
    const p = pick(lv === 1 ? [10, 20, 25, 50, 75] : [5, 12, 15, 30, 35, 40, 45, 60, 80]);
    const base = 20 * r(lv === 1 ? 2 : 3, lv === 1 ? 20 : 40);
    const ans = (p * base) / 100;
    return q(`What is ${p}% of ${fmt(base)}?`, fmt(ans), numOptions(ans, [ans * 10, ans + base / 10, base - ans], { decimal: true }), `10% of ${fmt(base)} is ${fmt(base / 10)}. Build ${p}% from that.`, `${p}/100 × ${fmt(base)} = ${fmt(ans)}.`, lv);
  }
  if (kind === "whatPercent") {
    const p = pick([10, 20, 25, 40, 50, 60, 75, 80, 5, 15, 35, 45]);
    const whole = 20 * r(2, 25);
    const part = (p * whole) / 100;
    return q(
      `${fmt(part)} is what percent of ${fmt(whole)}?`,
      `${p}%`,
      numOptions(p, [100 - p, p + 5, p * 2]).map((s) => `${s}%`),
      `Percent = (part ÷ whole) × 100.`,
      `(${fmt(part)} ÷ ${fmt(whole)}) × 100 = ${p}%.`,
      lv,
    );
  }
  if (kind === "discount") {
    const mrp = 100 * r(2, 30);
    const p = pick([10, 20, 25, 30, 40, 50]);
    const ans = mrp - (mrp * p) / 100;
    return q(`A shirt marked ₹${fmt(mrp)} is sold at a ${p}% discount. What is the selling price (in ₹)?`, fmt(ans), numOptions(ans, [(mrp * p) / 100, mrp + (mrp * p) / 100, ans - 50]), `Find ${p}% of ₹${fmt(mrp)} and subtract it from the marked price.`, `Discount = ₹${fmt((mrp * p) / 100)}; SP = ₹${fmt(mrp)} − ₹${fmt((mrp * p) / 100)} = ₹${fmt(ans)}.`, lv);
  }
  if (kind === "increase") {
    const base = 50 * r(2, 40);
    const p = pick([10, 20, 25, 15, 30, 40, 5]);
    const ans = base + (base * p) / 100;
    return q(`A price of ₹${fmt(base)} increases by ${p}%. What is the new price (in ₹)?`, fmt(ans), numOptions(ans, [(base * p) / 100, base - (base * p) / 100, base + p]), `New value = old value × (1 + ${p}/100).`, `Increase = ₹${fmt((base * p) / 100)}; new price = ₹${fmt(ans)}.`, lv);
  }
  if (kind === "ratio") {
    const a = r(1, 7);
    let b = r(1, 7);
    if (a === b) b = a + 1;
    const unit = r(4, 25);
    const total = (a + b) * unit;
    const larger = Math.max(a, b) * unit;
    return q(`Divide ₹${fmt(total)} in the ratio ${a} : ${b}. What is the larger share (in ₹)?`, fmt(larger), numOptions(larger, [Math.min(a, b) * unit, total / 2, larger + unit]), `Total parts = ${a} + ${b} = ${a + b}. Find the value of one part first.`, `One part = ₹${fmt(total)} ÷ ${a + b} = ₹${unit}; larger share = ${Math.max(a, b)} × ${unit} = ₹${fmt(larger)}.`, lv);
  }
  if (kind === "si") {
    const P = 1000 * r(1, 20);
    const R = pick([4, 5, 6, 8, 10, 12]);
    const T = r(2, 5);
    const ans = (P * R * T) / 100;
    return q(`Find the simple interest on ₹${fmt(P)} at ${R}% per annum for ${T} years (in ₹).`, fmt(ans), numOptions(ans, [P + ans, (P * R) / 100, ans + (P * R) / 100]), "SI = (P × R × T) / 100.", `SI = (${fmt(P)} × ${R} × ${T}) / 100 = ₹${fmt(ans)}.`, lv);
  }
  const cp = 100 * r(2, 20);
  const p = pick([10, 20, 25, 40, 50, 15]);
  const sp = cp + (cp * p) / 100;
  return q(
    `An item bought for ₹${fmt(cp)} is sold for ₹${fmt(sp)}. What is the profit percentage?`,
    `${p}%`,
    numOptions(p, [Math.round(((sp - cp) / sp) * 100), p + 5, p * 2]).map((s) => `${s}%`),
    "Profit % = (Profit ÷ Cost Price) × 100.",
    `Profit = ₹${fmt(sp - cp)}; (${fmt(sp - cp)} ÷ ${fmt(cp)}) × 100 = ${p}%.`,
    lv,
  );
}

function powers(lv: Level): GeneratedQuestion {
  const kinds = lv === 1 ? ["square", "sqrt", "cube", "pow2"] : lv === 2 ? ["square", "sqrt", "cube", "cbrt", "pow2"] : ["square", "sqrt", "cbrt", "law", "pow2"];
  const kind = pick(kinds);
  if (kind === "square") {
    const n = lv === 1 ? r(2, 20) : lv === 2 ? r(11, 30) : r(25, 99);
    const ans = n * n;
    return q(`What is ${n}²?`, fmt(ans), numOptions(ans, [n * 2, (n + 1) * (n + 1), (n - 1) * (n - 1)]), n % 10 === 5 ? `For numbers ending in 5: multiply the tens digit by (itself + 1), then attach 25.` : `(a + b)² = a² + 2ab + b² — split ${n} into ${Math.floor(n / 10) * 10} + ${n % 10}.`, `${n} × ${n} = ${fmt(ans)}.`, lv);
  }
  if (kind === "sqrt") {
    const n = lv === 1 ? r(2, 20) : lv === 2 ? r(11, 30) : r(25, 60);
    return q(`What is √${fmt(n * n)}?`, String(n), numOptions(n, [n + 1, n - 1, n + 2]), `Which number multiplied by itself gives ${fmt(n * n)}? Look at the last digit.`, `${n} × ${n} = ${fmt(n * n)}, so √${fmt(n * n)} = ${n}.`, lv);
  }
  if (kind === "cube") {
    const n = lv === 1 ? r(2, 10) : r(4, 12);
    const ans = n ** 3;
    return q(`What is ${n}³?`, fmt(ans), numOptions(ans, [n * 3, n * n, (n + 1) ** 3]), `${n}³ = ${n} × ${n} × ${n}.`, `${n} × ${n} × ${n} = ${fmt(ans)}.`, lv);
  }
  if (kind === "cbrt") {
    const n = lv === 2 ? r(2, 10) : r(6, 15);
    return q(`What is ∛${fmt(n ** 3)}?`, String(n), numOptions(n, [n + 1, n - 1, n * 3]), "Which number multiplied by itself three times gives this value?", `${n} × ${n} × ${n} = ${fmt(n ** 3)}.`, lv);
  }
  if (kind === "pow2") {
    const n = r(5, 12);
    const ans = 2 ** n;
    return q(`What is 2^${n}?`, fmt(ans), numOptions(ans, [2 ** (n - 1), 2 ** (n + 1), 2 * n]), `Keep doubling: 2, 4, 8, 16, 32… (${n} times).`, `2^${n} = ${fmt(ans)}.`, lv);
  }
  const base = pick([2, 3, 5, 7, 10]);
  const m = r(2, 9);
  const n = r(2, 9);
  const ans = m + n;
  return q(`Simplify: ${base}^${m} × ${base}^${n} = ${base}^?`, String(ans), numOptions(ans, [m * n, Math.abs(m - n), ans + 1]), "When multiplying powers with the same base, add the exponents.", `aᵐ × aⁿ = aᵐ⁺ⁿ → ${m} + ${n} = ${ans}.`, lv);
}

function algebra(lv: Level): GeneratedQuestion {
  const kinds = lv === 1 ? ["xPlus", "ax"] : lv === 2 ? ["axb", "bracket", "ax"] : ["axb", "bracket", "bothSides", "evaluate"];
  const kind = pick(kinds);
  if (kind === "xPlus") {
    const x = r(1, 50);
    const a = r(1, 50);
    return q(`Solve for x: x + ${a} = ${x + a}`, String(x), numOptions(x, [x + 2 * a, a, x + 1]), `Subtract ${a} from both sides.`, `x = ${x + a} − ${a} = ${x}.`, lv);
  }
  if (kind === "ax") {
    const x = r(2, 15);
    const a = r(2, 12);
    return q(`Solve for x: ${a}x = ${a * x}`, String(x), numOptions(x, [a * x - a, x + a, a]), `Divide both sides by ${a}.`, `x = ${a * x} ÷ ${a} = ${x}.`, lv);
  }
  if (kind === "axb") {
    const x = r(-5, 15) || 3;
    const a = r(2, 9);
    const b = r(1, 30);
    const c = a * x + b;
    return q(`Solve for x: ${a}x + ${b} = ${c}`, String(x), numOptions(x, [(c + b) / a, c - b, x + 1], { negative: true }), `First subtract ${b} from both sides, then divide by ${a}.`, `${a}x = ${c} − ${b} = ${c - b}; x = ${c - b} ÷ ${a} = ${x}.`, lv);
  }
  if (kind === "bracket") {
    const x = r(1, 12);
    const a = r(2, 8);
    const b = r(1, 10);
    const c = a * (x + b);
    return q(`Solve for x: ${a}(x + ${b}) = ${c}`, String(x), numOptions(x, [c / a + b, c - b, x + b], { negative: true }), `Divide both sides by ${a} first, then subtract ${b}.`, `x + ${b} = ${c} ÷ ${a} = ${c / a}; x = ${c / a} − ${b} = ${x}.`, lv);
  }
  if (kind === "bothSides") {
    const x = r(1, 12);
    const a = r(4, 9);
    const c = r(1, a - 1);
    const b = r(1, 20);
    const d = (a - c) * x + b;
    return q(`Solve for x: ${a}x + ${b} = ${c}x + ${d}`, String(x), numOptions(x, [(d + b) / (a - c), (d - b) / (a + c), x + 1], { negative: true }), `Move the x terms to one side: (${a} − ${c})x = ${d} − ${b}.`, `${a - c}x = ${d - b}; x = ${x}.`, lv);
  }
  const x = r(-4, 6) || 2;
  const a = r(1, 5);
  const b = r(1, 9);
  const c = r(1, 9);
  const ans = a * x * x - b * x + c;
  return q(`If x = ${x}, find the value of ${a === 1 ? "" : a}x² − ${b}x + ${c}.`, String(ans), numOptions(ans, [a * x * x + b * x + c, a * 2 * x - b * x + c, ans + 2], { negative: true }), `Substitute x = ${x} carefully; remember x² = ${x * x}.`, `${a}(${x * x}) − ${b}(${x}) + ${c} = ${a * x * x} − ${b * x} + ${c} = ${ans}.`, lv);
}

const GENERATORS: Record<MathGenKey, (lv: Level) => GeneratedQuestion> = {
  arithmetic,
  fractions,
  percent,
  powers,
  algebra,
};

function levelFor(difficulty: Difficulty): Level {
  if (difficulty === "easy") return 1;
  if (difficulty === "medium") return 2;
  if (difficulty === "hard") return 3;
  const roll = Math.random();
  return roll < 0.35 ? 1 : roll < 0.8 ? 2 : 3;
}

export const LEVEL_NAME: Record<Level, string> = { 1: "easy", 2: "medium", 3: "hard" };

/** Generate `count` unique questions for a generator key. */
export function generateMath(key: MathGenKey, count: number, difficulty: Difficulty): GeneratedQuestion[] {
  const out: GeneratedQuestion[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (out.length < count && guard < count * 25) {
    guard++;
    const item = GENERATORS[key](levelFor(difficulty));
    if (seen.has(item.question) || item.distractors.length < 3) continue;
    seen.add(item.question);
    out.push(item);
  }
  return out;
}

export const MATH_GEN_KEYS: MathGenKey[] = ["arithmetic", "fractions", "percent", "powers", "algebra"];
