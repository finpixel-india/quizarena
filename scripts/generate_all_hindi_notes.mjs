import fs from 'fs';
import path from 'path';

function cleanText(text) {
  if (!text) return '';
  let s = text.trim();
  // Strip bullet markers: "- ", "* ", "+ "
  s = s.replace(/^[-*+]\s+/, '');
  // Fix lone leading asterisk before bold e.g. "*उदाहरण:**" -> "**उदाहरण:**"
  s = s.replace(/^\*([^*]+)\*\*/, '**$1**');
  // Strip lone single asterisk at start (not followed by another asterisk)
  s = s.replace(/^\*(?!\*)\s*/, '');
  // Strip lone single asterisk at end (not preceded by another asterisk)
  s = s.replace(/\s*(?<!\*)\*$/, '');
  // Strip HTML anchors
  s = s.replace(/<a\s+id=[^>]+><\/a>/gi, '').replace(/<a\s+id=[^>]+>/gi, '');
  return s.trim();
}

function parseMarkdownTable(lines) {
  if (lines.length < 2) return null;
  const parseRow = (line) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => cleanText(c));

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
  const isPractice =
    title.includes('अभ्यास') || title.includes('पुनरावृत्ति') || unit.includes('अभ्यास');

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
    let t = cleanText(rawT);
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
        ...(currentTip ? { tip: cleanText(currentTip) } : {}),
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
    const trimmed = cleanText(line);

    // Skip initial header line
    if (i === 0 && (line.trim().startsWith('# ') || line.trim().startsWith('## '))) continue;

    // Filter out anchor tags and answer mentions
    if (
      trimmed.includes('उत्तरमाला भाग 8 में है') ||
      trimmed.includes('उत्तरमाला से मिलाएँ') ||
      trimmed.includes('उत्तर देखें') ||
      trimmed.includes('<a id=') ||
      trimmed.includes('</a>')
    ) {
      continue;
    }

    // Detect subsection header
    if (line.trim().startsWith('## ') || line.trim().startsWith('### ') || line.trim().startsWith('#### ')) {
      const hTitle = line.trim().replace(/^#+\s*/, '').trim();
      flushSection(hTitle);
      continue;
    }

    // Detect table line
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      currentTableLines.push(line.trim());
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
          ...(currentTip ? { tip: cleanText(currentTip) } : {}),
        });
        currentTitle = `${currentTitle} — विवरण एवं उदाहरण`;
        currentPoints = [];
        currentTip = '';
      }
    }

    // Detect blockquote tip
    if (line.trim().startsWith('>')) {
      const tipText = cleanText(line.trim().replace(/^>\s*/, ''));
      if (!currentTip) currentTip = tipText;
      else currentTip += ' ' + tipText;
      continue;
    }

    // Horizontal rule or empty line
    if (trimmed === '---' || !trimmed) continue;

    // First paragraph without markers as overview
    if (!overview && !line.trim().startsWith('#') && !line.trim().startsWith('-') && !line.trim().startsWith('*') && !line.trim().startsWith('|')) {
      overview = trimmed;
      currentPoints.push(trimmed);
      continue;
    }

    // Key terms extraction (only for regular theory chapters, NOT for practice chapters)
    if (!isPractice) {
      const termMatch = trimmed.match(/^[-*]?\s*\*\*([^*]+)\*\*[:—-]\s*(.+)$/);
      if (termMatch && keyTerms.length < 20) {
        const term = cleanText(termMatch[1]);
        const meaning = cleanText(termMatch[2]);
        if (term.length < 40 && meaning.length > 3 && !seenTerms.has(term)) {
          seenTerms.add(term);
          keyTerms.push({ term, meaning });
        }
      }
    }

    // Exam tips extraction (only for regular theory chapters, NOT for practice chapters)
    if (!isPractice) {
      if (
        trimmed.includes('सावधानी') ||
        trimmed.includes('महत्वपूर्ण') ||
        trimmed.includes('याद रखें') ||
        trimmed.includes('परीक्षा') ||
        trimmed.includes('पहचान')
      ) {
        if (examTips.length < 10) {
          const cleanTip = cleanText(trimmed.replace(/^[-*]\s*/, '').replace(/^\*\*|\*\*$/g, ''));
          if (cleanTip.length > 10 && cleanTip.length < 250 && !/^\d+\./.test(cleanTip)) {
            examTips.push(cleanTip);
          }
        }
      }
    }

    currentPoints.push(trimmed);
  }

  flushSection();

  if (!overview) {
    overview = isPractice
      ? `${title} — परीक्षा-उपयोगी अभ्यास प्रश्न एवं स्व-मूल्यांकन।`
      : `${title} — व्याकरण के मुख्य नियम, परिभाषाएँ, उदाहरण एवं अभ्यास प्रश्न।`;
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
    keyTerms: isPractice
      ? []
      : keyTerms.length > 0
      ? keyTerms
      : [
          { term: title, meaning: overview },
          { term: 'व्याकरणिक नियम', meaning: 'शुद्ध भाषा प्रयोग एवं वाक्य-रचना के मानक नियम।' },
        ],
    examTips: isPractice
      ? []
      : examTips.length > 0
      ? examTips
      : [
          'परिभाषा के साथ-साथ उदाहरणों के आधार पर नियम याद रखें।',
          'वाक्य में शब्द का वास्तविक संदर्भ देखकर व्याकरणिक भेद का निर्णय करें।',
        ],
  };
}

// -------------------------------------------------------------
// FILE PATHS
// -------------------------------------------------------------
const file9 = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792143099445_c4fa66cf.md';
const file10 = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792143099444_390108c0.md';
const fileComp = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792143099447_61d1063b.md';

const content9 = fs.readFileSync(file9, 'utf8');
const content10 = fs.readFileSync(file10, 'utf8');
const contentComp = fs.readFileSync(fileComp, 'utf8');

// -------------------------------------------------------------
// BUILD HINDI_ANSWERS MAPPING
// -------------------------------------------------------------
console.log('Building HINDI_ANSWERS lookup map...');
const HINDI_ANSWERS = {};

// 1. Class 9 (Ch 20 questions) from Ch 21
const p9Ans = content9.indexOf('# अध्याय 21');
const p9Shabd = content9.indexOf('# अध्याय 22');
if (p9Ans !== -1 && p9Shabd !== -1) {
  const chunk21 = content9.slice(p9Ans, p9Shabd);
  for (const line of chunk21.split('\n')) {
    const trimmed = line.trim();
    const m = trimmed.match(/^(\d+)\.\s*(.+)$/);
    if (m) {
      const qNum = m[1];
      const rest = m[2];
      const mcqMatch = rest.match(/^\*\*\(?([क-घA-D])\)?\s*([^*]+)?\*\*\s*[:\u2014-]?\s*(.*)$/);
      if (mcqMatch) {
        HINDI_ANSWERS['note-hi9-20-' + qNum] = {
          correctKey: mcqMatch[1],
          explanation: cleanText(((mcqMatch[2] ? mcqMatch[2].trim() + ' — ' : '') + mcqMatch[3]).trim()),
        };
      } else {
        HINDI_ANSWERS['note-hi9-20-' + qNum] = {
          solution: cleanText(rest.replace(/^\*\*|\*\*$/g, '').trim()),
        };
      }
    }
  }
}

// 2. Class 10 (Ch 14 to 19) from Ch 20
const p10Ans = content10.indexOf('# उत्तरमाला और व्याख्या');
const p10Shabd = content10.indexOf('# शब्दावली');
if (p10Ans !== -1 && p10Shabd !== -1) {
  const chunkAns = content10.slice(p10Ans, p10Shabd);
  const lines10 = chunkAns.split('\n');
  let currentSec = '';
  for (const line of lines10) {
    if (line.startsWith('## ')) {
      currentSec = line.trim();
      continue;
    }
    if (currentSec.includes('अभ्यास A') && line.includes('|')) {
      const parts = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((s) => s.trim());
      if (parts.length >= 3 && /^\d+$/.test(parts[0])) {
        const optMatch = parts[1].match(/\(?([क-घA-D])\)?/);
        HINDI_ANSWERS['note-hi10-14-' + parts[0]] = {
          correctKey: optMatch ? optMatch[1] : parts[1],
          explanation: cleanText(parts[2]),
        };
      }
    } else if (currentSec.includes('अभ्यास B')) {
      const m = line.trim().match(/^(\d+)\.\s*(.+)$/);
      if (m) HINDI_ANSWERS['note-hi10-15-' + m[1]] = { solution: cleanText(m[2]) };
    } else if (currentSec.includes('अभ्यास C')) {
      const m = line.trim().match(/^(\d+)\.\s*(.+)$/);
      if (m) HINDI_ANSWERS['note-hi10-16-' + m[1]] = { solution: cleanText(m[2]) };
    } else if (currentSec.includes('अभ्यास D')) {
      const m = line.trim().match(/^(\d+)\.\s*(.+)$/);
      if (m) HINDI_ANSWERS['note-hi10-17-' + m[1]] = { solution: cleanText(m[2]) };
    } else if (currentSec.includes('अभ्यास E')) {
      const m = line.trim().match(/^(\d+)\.\s*(.+)$/);
      if (m) HINDI_ANSWERS['note-hi10-18-' + m[1]] = { solution: cleanText(m[2]) };
    } else if (currentSec.includes('मिश्रित पुनरावृत्ति-पत्र')) {
      const m = line.trim().match(/^(\d+)\.\s*(.+)$/);
      if (m) HINDI_ANSWERS['note-hi10-19-' + m[1]] = { solution: cleanText(m[2]) };
    }
  }
}

// 3. Competitive (Ch 31) from Part 8
const pCompAns = contentComp.indexOf('# भाग 8 — उत्तरमाला और व्याख्या');
const pCompApp = contentComp.indexOf('# परिशिष्ट A — त्वरित पुनरावृत्ति सारणियाँ');
if (pCompAns !== -1 && pCompApp !== -1) {
  const chunkComp = contentComp.slice(pCompAns, pCompApp);
  let compSec = '';
  for (const line of chunkComp.split('\n')) {
    if (line.startsWith('## ') || line.startsWith('### ')) {
      compSec = line.trim();
      continue;
    }
    if (compSec.includes('अभ्यास-पत्र 1') && line.includes('|')) {
      const parts = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((s) => s.trim());
      if (parts.length >= 3 && /^\d+$/.test(parts[0])) {
        const optMatch = parts[1].match(/\(?([क-घA-D])\)?/);
        HINDI_ANSWERS['note-hicomp-31-' + parts[0]] = {
          correctKey: optMatch ? optMatch[1] : parts[1],
          explanation: cleanText(parts[2]),
        };
      }
    } else if (compSec.includes('अभ्यास-पत्र')) {
      const m = line.trim().match(/^(\d+)\.\s*(.+)$/);
      if (m) HINDI_ANSWERS['note-hicomp-31-' + m[1]] = { solution: cleanText(m[2]) };
    }
  }

  // Add rubrics for Q111-120 in Ch 31
  for (let q = 111; q <= 119; q++) {
    HINDI_ANSWERS['note-hicomp-31-' + q] = {
      solution:
        'व्यक्तिगत उत्तर जाँच: माँगा गया व्याकरणिक रूप सही संदर्भ में हो, वाक्य का अर्थ स्पष्ट हो, लिंग-वचन/कारक/क्रिया का मेल सही हो। वाच्य-परिवर्तन में मूल अर्थ सुरक्षित रखें; वाक्य-रचना बदलते समय संयोजक संबंध न बदलें।',
    };
  }
  HINDI_ANSWERS['note-hicomp-31-120'] = {
    solution:
      'अनुच्छेद मूल्यांकन-मानदंड: विचार-क्रम, उदाहरण, निष्कर्ष, वर्तनी, वाक्य-संगति और विराम-चिह्न के आधार पर जाँचें (अनुशंसित शब्द सीमा: 120–150 शब्द)।',
  };

  // Add chapterwise exercise answers for Competitive Ch 1 to 30
  const idxChStart = chunkComp.indexOf('## अध्यायवार अभ्यास — उत्तर-संकेत');
  if (idxChStart !== -1) {
    const chunkCh = chunkComp.slice(idxChStart);
    let chNo = 0;
    for (const line of chunkCh.split('\n')) {
      const chMatch = line.match(/^###\s*अध्याय\s*(\d+)/);
      if (chMatch) {
        chNo = parseInt(chMatch[1], 10);
        continue;
      }
      const qm = line.trim().match(/^(\d+)\.\s*(.+)$/);
      if (qm && chNo > 0) {
        HINDI_ANSWERS[`note-hicomp-${chNo}-${qm[1]}`] = {
          solution: cleanText(qm[2]),
        };
      }
    }
  }
}

console.log(`Generated ${Object.keys(HINDI_ANSWERS).length} answers in lookup.`);

const codeAnswers = `export interface HindiAnswerItem {
  correctKey?: string;
  explanation?: string;
  solution?: string;
}

export const HINDI_ANSWERS: Record<string, HindiAnswerItem> = ${JSON.stringify(HINDI_ANSWERS, null, 2)};
`;
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/hindiAnswers.ts', codeAnswers, 'utf8');

// -------------------------------------------------------------
// 1. GENERATE CLASS 9
// -------------------------------------------------------------
console.log('Generating Class 9 notes (without answers chapter)...');
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

  // EXCLUDE answers chapter (उत्तरमाला और समाधान)
  if (firstLine.includes('उत्तरमाला')) {
    continue;
  }

  // If it's chunk 23 (# स्रोत और पाठ्यक्रम-सीमा), append to previous chapter (शब्दावली)
  if (firstLine.startsWith('स्रोत')) {
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
console.log('Generating Class 10 notes (without answers chapter)...');
const chunks10 = content10.split(/\n(?=# (?:अध्याय|अभ्यास|मिश्रित|उत्तरमाला|शब्दावली|आधिकारिक))/g);

const units10 = [
  { max: 6, unit: 'इकाई 1: वाक्य-विचार, पदबंध एवं वाच्य' },
  { max: 9, unit: 'इकाई 2: समास, मुहावरे एवं अलंकार' },
  { max: 13, unit: 'इकाई 3: पद-परिचय आधार एवं भाषा-शुद्धि' },
  { max: 99, unit: 'इकाई 4: अभ्यास-पत्र एवं पुनरावृत्ति' },
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

  // EXCLUDE answers chapter (उत्तरमाला और व्याख्या)
  if (firstLine.includes('उत्तरमाला')) {
    continue;
  }

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
console.log('Generating Competitive notes (without answers chapter)...');
const parsedComp = [];

// Find chapters 1 to 30
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
    const p7Idx = contentComp.indexOf('# भाग 7 — अभ्यास-संग्रह');
    if (p7Idx !== -1) endIdx = p7Idx;
  }

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

// Skip Chapter 32 (भाग 8 — उत्तरमाला और व्याख्या) per user instruction

// Next Chapter 32: परिशिष्ट A — त्वरित पुनरावृत्ति सारणियाँ
const appAStart = contentComp.indexOf('# परिशिष्ट A — त्वरित पुनरावृत्ति सारणियाँ');
const appBStart = contentComp.indexOf('# परिशिष्ट B — पारिभाषिक शब्दावली');
if (appAStart !== -1 && appBStart !== -1) {
  const rawAppA = contentComp.slice(appAStart, appBStart);
  const note32 = parseChapterBody(
    rawAppA,
    'परिशिष्ट — त्वरित पुनरावृत्ति एवं शब्दावली',
    'competitive',
    32,
    'परिशिष्ट A — त्वरित पुनरावृत्ति सारणियाँ (A.1 से A.8)',
    'note-hicomp'
  );
  parsedComp.push(note32);
}

// Next Chapter 33: परिशिष्ट B — पारिभाषिक शब्दावली एवं संदर्भ
if (appBStart !== -1) {
  const rawAppB = contentComp.slice(appBStart);
  const note33 = parseChapterBody(
    rawAppB,
    'परिशिष्ट — त्वरित पुनरावृत्ति एवं शब्दावली',
    'competitive',
    33,
    'परिशिष्ट B — पारिभाषिक शब्दावली, संदर्भ एवं अध्ययन-स्रोत',
    'note-hicomp'
  );
  parsedComp.push(note33);
}

console.log(`Competitive generated: ${parsedComp.length} chapters.`);

const codeComp = `import type { ChapterNote } from "./types";

export const hindiNotesComp: ChapterNote[] = ${JSON.stringify(parsedComp, null, 2)};
`;
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/hindiComp.ts', codeComp, 'utf8');

console.log('ALL HINDI NOTES & HINDI_ANSWERS GENERATED CLEANLY!');
