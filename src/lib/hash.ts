/** Stable, cheap fingerprint of a question text (used to avoid repeats). */
export function hashText(input: string): string {
  const s = input.trim().toLowerCase().replace(/\s+/g, " ");
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  let g = 52711;
  for (let i = s.length - 1; i >= 0; i--) g = ((g * 31) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36) + g.toString(36);
}
