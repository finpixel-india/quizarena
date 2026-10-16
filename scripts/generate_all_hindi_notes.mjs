import fs from 'fs';
import path from 'path';

function parseMarkdownTable(lines) {
  if (lines.length < 2) return null;
  const parseRow = (line) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());

  const head = parseRow(lines[0]);
  const rows = [];
  const startIndex =
    lines.length > 1 && /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(lines[1].trim()) ? 2 : 1;

  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes('|')) {
      const row = parseRow(lines[i]);
      if (row.length > 0) {
        while (row.length < head.length) row.push('');
        rows.push(row.slice(0, head.length));
      }
    }
  }
  return head.length && rows.length ? { head, rows } : null;
}

function parseChapterBody(rawText, unit, classLevel, chapterNo, title, idPrefix) {
  const lines = rawText.split('\n');
  const sections = [];
  const keyTerms = [];
  const examTips = [];

  let currentTitle = 'परिचय एवं मुख्य अवधारणा';
  let currentPoints = [];
  let currentTip = '';
  let currentTableLines = [];
  let inTable = false;
  let overview = '';
  const seenTitles = new Set();
  const seenTerms = new Set();

  function getUniqueTitle(rawT) {
    let t = rawT.trim();
    if (!seenTitles.has(t)) {
      seenTitles.add(t);
      return t;
    }
    let counter = 2;
    while (seenTitles.has(`${t} (${counter})`)) {
      counter++;
    }
    const finalTitle = `${t} (${counter})`;
    seenTitles.add(finalTitle);
    return finalTitle;
  }

  function flushSection(nextTitle) {
    let table = null;
    if (currentTableLines.length >= 2) {
      table = parseMarkdownTable(currentTableLines);
    }
    if (currentPoints.length > 0 || table || currentTip) {
      sections.push({
        title: getUniqueTitle(currentTitle),
        ...(currentPoints.length > 0 ? { points: [...currentPoints] } : {}),
        ...(table ? { table } : {}),
        ...(currentTip ? { tip: currentTip } : {}),
      });
    }
    currentTitle = nextTitle || 'विस्तार एवं उदाहरण';
    currentPoints = [];
    currentTip = '';
    currentTableLines = [];
    inTable = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip initial header line
    if (i === 0 && (trimmed.startsWith('# ') || trimmed.startsWith('## '))) continue;

    // Detect subsection header
    if (trimmed.startsWith('## ') || trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
      const hTitle = trimmed.replace(/^#+\s*/, '').trim();
      flushSection(hTitle);
      continue;
    }

    // Detect table line
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      currentTableLines.push(trimmed);
      continue;
    } else if (inTable) {
      inTable = false;
      const table = parseMarkdownTable(currentTableLines);
      currentTableLines = [];
      if (table) {
        sections.push({
          title: getUniqueTitle(currentTitle),
          ...(currentPoints.length > 0 ? { points: [...currentPoints] } : {}),
          table,
          ...(currentTip ? { tip: currentTip } : {}),
        });
        currentTitle = `${currentTitle} — विवरण एवं उदाहरण`;
        currentPoints = [];
        currentTip = '';
      }
    }

    // Detect blockquote tip
    if (trimmed.startsWith('>')) {
      const tipText = trimmed.replace(/^>\s*/, '').trim();
      if (!currentTip) currentTip = tipText;
      else currentTip += ' ' + tipText;
      continue;
    }

    // Horizontal rule or empty line
    if (trimmed === '---' || !trimmed) continue;

    // First paragraph without markers as overview
    if (!overview && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.startsWith('|')) {
      overview = trimmed;
      currentPoints.push(trimmed);
      continue;
    }

    // Key terms extraction
    const termMatch = trimmed.match(/^[-*]?\s*\*\*([^*]+)\*\*[:—-]\s*(.+)$/);
    if (termMatch && keyTerms.length < 20) {
      const term = termMatch[1].trim();
      const meaning = termMatch[2].trim();
      if (term.length < 40 && meaning.length > 3 && !seenTerms.has(term)) {
        seenTerms.add(term);
        keyTerms.push({ term, meaning });
      }
    }

    // Exam tips extraction
    if (
      trimmed.includes('सावधानी') ||
      trimmed.includes('महत्वपूर्ण') ||
      trimmed.includes('याद रखें') ||
      trimmed.includes('परीक्षा') ||
      trimmed.includes('पहचान')
    ) {
      if (examTips.length < 10) {
        const cleanTip = trimmed.replace(/^[-*]\s*/, '').replace(/^\*\*|\*\*$/g, '');
        if (cleanTip.length > 10 && cleanTip.length < 250) {
          examTips.push(cleanTip);
        }
      }
    }

    // Clean point
    const pointText = trimmed.replace(/^[-*]\s*/, '');
    currentPoints.push(pointText);
  }

  flushSection();

  if (!overview) {
    overview = `${title} — व्याकरण के मुख्य नियम, परिभाषाएँ, उदाहरण एवं अभ्यास प्रश्न।`;
  }

  return {
    id: `${idPrefix}-${chapterNo}`,
    subject: 'hindi',
    classLevel,
    chapterNo,
    title,
    unit,
    overview,
    sections,
    keyTerms:
      keyTerms.length > 0
        ? keyTerms
        : [
            { term: title, meaning: overview },
            { term: 'व्याकरणिक नियम', meaning: 'शुद्ध भाषा प्रयोग एवं वाक्य-रचना के मानक नियम।' }
          ],
    examTips:
      examTips.length > 0
        ? examTips
        : [
            'परिभाषा के साथ-साथ उदाहरणों के आधार पर नियम याद रखें।',
            'वाक्य में शब्द का वास्तविक संदर्भ देखकर व्याकरणिक भेद का निर्णय करें।'
          ],
  };
}

// -------------------------------------------------------------
// 1. GENERATE CLASS 9
// -------------------------------------------------------------
console.log('Generating Class 9 notes...');
const file9 = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792143099445_c4fa66cf.md';
const content9 = fs.readFileSync(file9, 'utf8');
const chunks9 = content9.split(/\n(?=# (?:अध्याय|स्रोत))/g);

const units9 = [
  { max: 3, unit: 'इकाई 1: भाषा, वर्ण एवं वर्तनी' },
  { max: 6, unit: 'इकाई 2: शब्द-रचना एवं पद-भेद' },
  { max: 11, unit: 'इकाई 3: विकारी एवं अविकारी पद' },
  { max: 13, unit: 'इकाई 4: वाक्य एवं अलंकार' },
  { max: 15, unit: 'इकाई 5: शब्द-भंडार एवं मुहावरे' },
  { max: 18, unit: 'इकाई 6: व्याकरणिक कोटियाँ एवं वाक्य-शुद्धि' },
  { max: 99, unit: 'इकाई 7: त्वरित पुनरावृत्ति, अभ्यास एवं शब्दावली' },
];

function getUnit9(chNo) {
  for (const u of units9) {
    if (chNo <= u.max) return u.unit;
  }
  return 'हिंदी व्याकरण · कक्षा 9';
}

const parsed9 = [];
for (let i = 1; i < chunks9.length; i++) {
  let raw = chunks9[i];
  const firstLine = raw.trim().split('\n')[0].replace(/^#\s*/, '').trim();
  
  // If it's chunk 23 (# स्रोत और पाठ्यक्रम-सीमा) and chunk 22 is chapter 22, we can merge or make it chapter 23
  if (firstLine.startsWith('स्रोत')) {
    // Append to previous chapter 22
    if (parsed9.length > 0) {
      const prev = parsed9[parsed9.length - 1];
      const extra = parseChapterBody(raw, prev.unit, 9, prev.chapterNo, 'स्रोत एवं पाठ्यक्रम-निर्देशिका', 'note-hi9');
      prev.sections.push(...extra.sections);
      continue;
    }
  }

  const parts = firstLine.split('—');
  const title = parts[1] ? parts[1].trim() : firstLine;
  const chNo = parsed9.length + 1;
  const unit = getUnit9(chNo);
  const note = parseChapterBody(raw, unit, 9, chNo, title, 'note-hi9');
  parsed9.push(note);
}

console.log(`Class 9 generated: ${parsed9.length} chapters.`);

const code9 = `import type { ChapterNote } from "./types";

export const hindiNotes9: ChapterNote[] = ${JSON.stringify(parsed9, null, 2)};
`;
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/hindi9.ts', code9, 'utf8');

// -------------------------------------------------------------
// 2. GENERATE CLASS 10
// -------------------------------------------------------------
console.log('Generating Class 10 notes...');
const file10 = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792143099444_390108c0.md';
const content10 = fs.readFileSync(file10, 'utf8');
const chunks10 = content10.split(/\n(?=# (?:अध्याय|अभ्यास|मिश्रित|उत्तरमाला|शब्दावली|आधिकारिक))/g);

const units10 = [
  { max: 6, unit: 'इकाई 1: वाक्य-विचार, पदबंध एवं वाच्य' },
  { max: 9, unit: 'इकाई 2: समास, मुहावरे एवं अलंकार' },
  { max: 13, unit: 'इकाई 3: पद-परिचय आधार एवं भाषा-शुद्धि' },
  { max: 99, unit: 'इकाई 4: अभ्यास-पत्र एवं उत्तरमाला' },
];

function getUnit10(chNo) {
  for (const u of units10) {
    if (chNo <= u.max) return u.unit;
  }
  return 'हिंदी व्याकरण · कक्षा 10';
}

const parsed10 = [];
for (let i = 1; i < chunks10.length; i++) {
  const raw = chunks10[i];
  const firstLine = raw.trim().split('\n')[0].replace(/^#\s*/, '').trim();

  // If chunk is 'आधिकारिक स्रोत', append to previous chapter (शब्दावली)
  if (firstLine.startsWith('आधिकारिक')) {
    if (parsed10.length > 0) {
      const prev = parsed10[parsed10.length - 1];
      const extra = parseChapterBody(raw, prev.unit, 10, prev.chapterNo, 'आधिकारिक स्रोत एवं पाठ्यक्रम-निर्देशिका', 'note-hi10');
      prev.sections.push(...extra.sections);
      continue;
    }
  }

  const parts = firstLine.split('—');
  const title = parts[1] ? `${parts[0].trim()} — ${parts[1].trim()}`.replace(/^अध्याय \d+\s*—\s*/, '') : firstLine;
  const chNo = parsed10.length + 1;
  const unit = getUnit10(chNo);
  const note = parseChapterBody(raw, unit, 10, chNo, title, 'note-hi10');
  parsed10.push(note);
}

console.log(`Class 10 generated: ${parsed10.length} chapters.`);

const code10 = `import type { ChapterNote } from "./types";

export const hindiNotes10: ChapterNote[] = ${JSON.stringify(parsed10, null, 2)};
`;
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/hindi10.ts', code10, 'utf8');

// -------------------------------------------------------------
// 3. GENERATE COMPETITIVE (MASTER NOTES)
// -------------------------------------------------------------
console.log('Generating Competitive notes...');
const fileComp = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792143099447_61d1063b.md';
const contentComp = fs.readFileSync(fileComp, 'utf8');

const parsedComp = [];

// Find chapters 1 to 30
// Each is marked by `## अध्याय <N>. <Title>`
for (let i = 1; i <= 30; i++) {
  const curRegex = new RegExp(`## अध्याय ${i}\\.\\s*([^\\n]+)`);
  const curMatch = curRegex.exec(contentComp);
  if (!curMatch) continue;

  const title = curMatch[1].trim();
  const startIdx = curMatch.index;

  let endIdx = contentComp.length;
  if (i < 30) {
    const nextRegex = new RegExp(`## अध्याय ${i + 1}\\.`);
    const nextMatch = nextRegex.exec(contentComp);
    if (nextMatch) endIdx = nextMatch.index;
  } else {
    // For 30, end is '# भाग 7 — अभ्यास-संग्रह'
    const p7Idx = contentComp.indexOf('# भाग 7 — अभ्यास-संग्रह');
    if (p7Idx !== -1) endIdx = p7Idx;
  }

  // Determine which Part it belongs to by inspecting content before startIdx
  const preceding = contentComp.slice(0, startIdx);
  const partMatch = [...preceding.matchAll(/# (भाग \d+ — [^\n]+)/g)];
  const unit = partMatch.length > 0 ? partMatch[partMatch.length - 1][1].trim() : 'प्रतियोगी हिंदी व्याकरण';

  const raw = contentComp.slice(startIdx, endIdx);
  const note = parseChapterBody(raw, unit, 'competitive', i, title, 'note-hicomp');
  parsedComp.push(note);
}

// Chapter 31: भाग 7 — अभ्यास-संग्रह
const p7Start = contentComp.indexOf('# भाग 7 — अभ्यास-संग्रह');
const p8Start = contentComp.indexOf('# भाग 8 — उत्तरमाला और व्याख्या');
if (p7Start !== -1 && p8Start !== -1) {
  const rawP7 = contentComp.slice(p7Start, p8Start);
  const note31 = parseChapterBody(
    rawP7,
    'भाग 7 — अभ्यास-संग्रह',
    'competitive',
    31,
    'अभ्यास-पत्र 1 से 6 — सम्पूर्ण प्रतियोगी अभ्यास-संग्रह',
    'note-hicomp'
  );
  parsedComp.push(note31);
}

// Chapter 32: भाग 8 — उत्तरमाला और व्याख्या
const appAStart = contentComp.indexOf('# परिशिष्ट A — त्वरित पुनरावृत्ति सारणियाँ');
if (p8Start !== -1 && appAStart !== -1) {
  const rawP8 = contentComp.slice(p8Start, appAStart);
  const note32 = parseChapterBody(
    rawP8,
    'भाग 8 — उत्तरमाला और व्याख्या',
    'competitive',
    32,
    'उत्तरमाला एवं विस्तृत व्याख्या — सभी अभ्यास-पत्र व अध्याय',
    'note-hicomp'
  );
  parsedComp.push(note32);
}

// Chapter 33: परिशिष्ट A — त्वरित पुनरावृत्ति सारणियाँ
const appBStart = contentComp.indexOf('# परिशिष्ट B — पारिभाषिक शब्दावली');
if (appAStart !== -1 && appBStart !== -1) {
  const rawAppA = contentComp.slice(appAStart, appBStart);
  const note33 = parseChapterBody(
    rawAppA,
    'परिशिष्ट — त्वरित पुनरावृत्ति एवं शब्दावली',
    'competitive',
    33,
    'परिशिष्ट A — त्वरित पुनरावृत्ति सारणियाँ (A.1 से A.8)',
    'note-hicomp'
  );
  parsedComp.push(note33);
}

// Chapter 34: परिशिष्ट B — पारिभाषिक शब्दावली एवं संदर्भ
if (appBStart !== -1) {
  const rawAppB = contentComp.slice(appBStart);
  const note34 = parseChapterBody(
    rawAppB,
    'परिशिष्ट — त्वरित पुनरावृत्ति एवं शब्दावली',
    'competitive',
    34,
    'परिशिष्ट B — पारिभाषिक शब्दावली, संदर्भ एवं अध्ययन-स्रोत',
    'note-hicomp'
  );
  parsedComp.push(note34);
}

console.log(`Competitive generated: ${parsedComp.length} chapters.`);

const codeComp = `import type { ChapterNote } from "./types";

export const hindiNotesComp: ChapterNote[] = ${JSON.stringify(parsedComp, null, 2)};
`;
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/hindiComp.ts', codeComp, 'utf8');

console.log('ALL HINDI NOTES GENERATED SUCCESSFULLY!');
