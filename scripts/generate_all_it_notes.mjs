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
    title.toLowerCase().includes('practice') ||
    title.toLowerCase().includes('question bank') ||
    title.toLowerCase().includes('questions') ||
    unit.toLowerCase().includes('practice');

  const lines = rawText.split('\n');
  const sections = [];
  const keyTerms = [];
  const examTips = [];

  let currentTitle = 'Overview & Core Concepts';
  let currentPoints = [];
  let currentTip = '';
  let currentTableLines = [];
  let inTable = false;
  let inCode = false;
  let codeLines = [];
  let overview = '';
  const seenTitles = new Set();
  const seenTerms = new Set();

  function getUniqueTitle(rawT) {
    let t = cleanText(rawT);
    if (!t) t = 'Section';
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
    if (currentPoints.length > 0 || table || currentTip || codeLines.length > 0) {
      sections.push({
        title: getUniqueTitle(currentTitle),
        ...(currentPoints.length > 0 ? { points: [...currentPoints] } : {}),
        ...(table ? { table } : {}),
        ...(codeLines.length > 0 ? { formula: [...codeLines] } : {}),
        ...(currentTip ? { tip: cleanText(currentTip) } : {}),
      });
    }
    currentTitle = nextTitle || 'Details & Applications';
    currentPoints = [];
    currentTip = '';
    currentTableLines = [];
    codeLines = [];
    inTable = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = cleanText(line);

    // Skip initial header line
    if (i === 0 && (line.trim().startsWith('# ') || line.trim().startsWith('## '))) continue;

    // Code fence toggle
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    // Filter out anchor tags and answer mentions
    if (
      trimmed.includes('check the answer key') ||
      trimmed.includes('consult the answer key') ||
      trimmed.includes('Attempt these questions after') ||
      trimmed.includes('Attempt these before consulting') ||
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
        currentTitle = `${currentTitle} — Details`;
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

    // Key terms extraction (only for regular theory chapters)
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

    // Exam tips extraction
    if (!isPractice) {
      if (
        trimmed.toLowerCase().includes('important') ||
        trimmed.toLowerCase().includes('remember') ||
        trimmed.toLowerCase().includes('exam') ||
        trimmed.toLowerCase().includes('caution') ||
        trimmed.toLowerCase().includes('checklist')
      ) {
        if (examTips.length < 10) {
          const cleanTip = cleanText(trimmed.replace(/^[-*]\s*/, '').replace(/^\*\*|\*\*$/g, ''));
          if (cleanTip.length > 10 && cleanTip.length < 250 && !/^\d+\./.test(cleanTip)) {
            examTips.push(cleanTip);
          }
        }
      }
    }

    // If in True/False section of Class 9, add (A) True (B) False option helper
    if (isPractice && currentTitle.toLowerCase().includes('true or false')) {
      const tfMatch = trimmed.match(/^(\d+)\.\s*(.+)$/);
      if (tfMatch) {
        currentPoints.push(trimmed);
        currentPoints.push('(A) True  (B) False');
        continue;
      }
    }

    currentPoints.push(trimmed);
  }

  flushSection();

  if (!overview) {
    overview = isPractice
      ? `${title} — Comprehensive practice questions, MCQs, and self-assessment.`
      : `${title} — Fundamental concepts, practical guidelines, and key summaries.`;
  }

  return {
    id: `${idPrefix}-${chapterNo}`,
    subject: 'it',
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
          { term: 'Standard Practice', meaning: 'Industry-standard guidelines and protocols.' },
        ],
    examTips: isPractice
      ? []
      : examTips.length > 0
      ? examTips
      : [
          'Master fundamental concepts before attempting complex workflows.',
          'Verify inputs, outputs, and safety guidelines during practical implementations.',
        ],
  };
}

// -------------------------------------------------------------
// FILE PATHS
// -------------------------------------------------------------
const fileAi = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792146215518_c4516749.md';
const file10 = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792146215519_0b84dfcd.md';
const file9 = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792146215522_4a1e7b65.md';
const fileComp = 'C:/Users/hiii/.gemini/antigravity/brain/8173d0ba-c217-46bd-9fac-384820988f1b/.user_uploaded/media_1792146215523_90ad6ebc.md';

const contentAi = fs.readFileSync(fileAi, 'utf8');
const content10 = fs.readFileSync(file10, 'utf8');
const content9 = fs.readFileSync(file9, 'utf8');
const contentComp = fs.readFileSync(fileComp, 'utf8');

const IT_ANSWERS = {};

// Helper to split markdown into top-level # chapters (ignoring # inside code fences)
function splitH1Chapters(content) {
  const lines = content.split('\n');
  const chapters = [];
  let currentHeader = '';
  let currentLines = [];
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      currentLines.push(line);
      continue;
    }

    if (!inCode && line.startsWith('# ')) {
      if (currentHeader || currentLines.length > 0) {
        chapters.push({
          header: currentHeader || 'Introduction',
          raw: currentLines.join('\n')
        });
      }
      currentHeader = line.replace(/^#\s+/, '').trim();
      currentLines = [line];
    } else {
      currentLines.push(line);
    }
  }

  if (currentHeader || currentLines.length > 0) {
    chapters.push({
      header: currentHeader || 'Introduction',
      raw: currentLines.join('\n')
    });
  }

  return chapters;
}

// -------------------------------------------------------------
// 1. CLASS 9 IT
// -------------------------------------------------------------
console.log('Processing Class 9 IT...');
const rawChapters9 = splitH1Chapters(content9);
const parsed9 = [];
let chNo9 = 0;
let practiceId9 = '';

for (const ch of rawChapters9) {
  const title = ch.header;
  // Skip top document title and answer key
  if (title.startsWith('CBSE Class 9 Information Technology') || title.startsWith('Part F — Answer key')) {
    continue;
  }

  chNo9++;
  let unit = 'CBSE Class 9 IT (402)';
  if (title.startsWith('Part 0')) unit = 'Part 0 — Course Map & Assessment';
  else if (title.startsWith('Part A') || title.includes('Skills I')) unit = 'Part A — Employability Skills';
  else if (title.startsWith('Part B') || title.includes('Industry') || title.includes('Keyboarding') || title.includes('Documentation') || title.includes('Spreadsheet') || title.includes('Presentation')) unit = 'Part B — Subject-Specific Skills';
  else if (title.startsWith('Part C')) unit = 'Part C — Practical Workbook';
  else if (title.startsWith('Part D')) unit = 'Part D — Quick Revision';
  else if (title.startsWith('Part E')) unit = 'Part E — Practice Questions';
  else if (title.startsWith('Glossary') || title.startsWith('Official')) unit = 'Reference & Glossary';

  const note = parseChapterBody(ch.raw, unit, 9, chNo9, title, 'note-it9');
  if (title.startsWith('Part E')) {
    practiceId9 = note.id;
  }
  parsed9.push(note);
}

// Parse answer key from Part F using practiceId9
const p9AnsStart = content9.indexOf('# Part F — Answer key');
const p9GlossaryStart = content9.indexOf('# Glossary');
if (p9AnsStart !== -1 && p9GlossaryStart !== -1 && practiceId9) {
  const ansChunk = content9.slice(p9AnsStart, p9GlossaryStart);
  for (const line of ansChunk.split('\n')) {
    if (line.includes('|')) {
      const parts = line.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 2 && /^\d+$/.test(parts[0])) {
        const qNum = parts[0];
        const opt = parts[1];
        const expl = parts.slice(2).join(' | ');
        if (['A','B','C','D'].includes(opt)) {
          IT_ANSWERS[`${practiceId9}-${qNum}`] = { correctKey: opt, explanation: cleanText(expl) };
        } else if (['True','False'].includes(opt)) {
          IT_ANSWERS[`${practiceId9}-${qNum}`] = { correctKey: opt === 'True' ? 'A' : 'B', explanation: cleanText(expl) };
        } else {
          IT_ANSWERS[`${practiceId9}-${qNum}`] = { solution: cleanText(opt + (expl ? ' — ' + expl : '')) };
        }
      }
    } else {
      const m = line.trim().match(/^\*\*(\d+)\.\*\*\s+(.+)$/);
      if (m) {
        IT_ANSWERS[`${practiceId9}-${m[1]}`] = { solution: cleanText(m[2]) };
      }
    }
  }
}

console.log(`Class 9 generated: ${parsed9.length} chapters. Practice ID: ${practiceId9}`);
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/it9.ts', `import type { ChapterNote } from "./types";\n\nexport const itNotes9: ChapterNote[] = ${JSON.stringify(parsed9, null, 2)};\n`, 'utf8');

// -------------------------------------------------------------
// 2. CLASS 10 IT
// -------------------------------------------------------------
console.log('Processing Class 10 IT...');
const rawChapters10 = splitH1Chapters(content10);
const parsed10 = [];
let chNo10 = 0;
let practiceId10 = '';

for (const ch of rawChapters10) {
  const title = ch.header;
  // Skip top document title and answer key
  if (title.startsWith('CBSE Class 10 Information Technology') || title.startsWith('Answer Key with Explanations')) {
    continue;
  }

  chNo10++;
  let unit = 'CBSE Class 10 IT (402)';
  if (title.includes('Official Syllabus') || title.includes('How to Use')) unit = 'Course Overview & Assessment';
  else if (title.includes('Unit A') || title.includes('Skills II')) unit = 'Part A — Employability Skills';
  else if (title.includes('Unit B1') || title.includes('Styles') || title.includes('Images') || title.includes('Writer')) unit = 'Unit B1 — Digital Documentation (Advanced)';
  else if (title.includes('Unit B2') || title.includes('Scenarios') || title.includes('Macros') || title.includes('Calc')) unit = 'Unit B2 — Electronic Spreadsheet (Advanced)';
  else if (title.includes('Unit B3') || title.includes('DBMS') || title.includes('Tables') || title.includes('Base') || title.includes('Queries') || title.includes('Reports')) unit = 'Unit B3 — Database Management System (Base)';
  else if (title.includes('Unit B4') || title.includes('Health') || title.includes('Quality') || title.includes('Accidents')) unit = 'Unit B4 — Workplace Safety & Health';
  else if (title.includes('Part C')) unit = 'Part C — Practical Laboratory Manual';
  else if (title.includes('Part D')) unit = 'Part D — Project & Portfolio';
  else if (title.includes('High-Yield')) unit = 'High-Yield Revision Tables';
  else if (title.includes('Practice Question')) unit = 'Practice & Self-Assessment';
  else if (title.includes('Glossary') || title.includes('Official Sources')) unit = 'Reference & Glossary';

  const note = parseChapterBody(ch.raw, unit, 10, chNo10, title, 'note-it10');
  if (title.includes('Practice Question')) {
    practiceId10 = note.id;
  }
  parsed10.push(note);
}

// Parse answer key from Class 10 using practiceId10
const p10AnsStart = content10.indexOf('# Answer Key with Explanations');
const p10GlossaryStart = content10.indexOf('# Glossary');
if (p10AnsStart !== -1 && p10GlossaryStart !== -1 && practiceId10) {
  const ansChunk = content10.slice(p10AnsStart, p10GlossaryStart);
  for (const line of ansChunk.split('\n')) {
    if (line.includes('|')) {
      const parts = line.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 2 && /^\d+$/.test(parts[0])) {
        const qNum = parts[0];
        const opt = parts[1];
        const expl = parts.slice(2).join(' | ');
        IT_ANSWERS[`${practiceId10}-${qNum}`] = { correctKey: opt, explanation: cleanText(expl) };
      }
    } else {
      const m = line.trim().match(/^\*\*(\d+)\.\*\*\s+(.+)$/);
      if (m) {
        IT_ANSWERS[`${practiceId10}-${m[1]}`] = { solution: cleanText(m[2]) };
      }
    }
  }
}

console.log(`Class 10 generated: ${parsed10.length} chapters. Practice ID: ${practiceId10}`);
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/it10.ts', `import type { ChapterNote } from "./types";\n\nexport const itNotes10: ChapterNote[] = ${JSON.stringify(parsed10, null, 2)};\n`, 'utf8');

// -------------------------------------------------------------
// 3. COMPETITIVE IT
// -------------------------------------------------------------
console.log('Processing Competitive IT...');
const rawChaptersComp = splitH1Chapters(contentComp);
const parsedComp = [];
let chNoComp = 0;
let practiceIdComp = '';

for (const ch of rawChaptersComp) {
  const title = ch.header;
  // Skip top document title and answer key
  if (title.startsWith('The Complete IT & Computer Science') || title.startsWith('45. Answer key')) {
    continue;
  }

  chNoComp++;
  let unit = 'IT & Computer Science Master Notes';
  const matchNum = title.match(/^(\d+)\./);
  if (matchNum) {
    const num = parseInt(matchNum[1], 10);
    if (num <= 6) unit = 'Unit 1: Foundations of IT & Hardware';
    else if (num <= 9) unit = 'Unit 2: Software, OS & Data Representation';
    else if (num <= 11) unit = 'Unit 3: Productivity Tools & Databases';
    else if (num <= 15) unit = 'Unit 4: Internet, Networks & Cybersecurity';
    else if (num <= 19) unit = 'Unit 5: Computational Thinking & Algorithms';
    else if (num <= 27) unit = 'Unit 6: Python Programming (Basics to OOP)';
    else if (num <= 33) unit = 'Unit 7: Data Structures, SQL & Web Development';
    else if (num <= 41) unit = 'Unit 8: Languages, DevOps, Cloud & Emerging Tech';
    else if (num <= 44) unit = 'Unit 9: Projects, Revision & Practice';
    else unit = 'Unit 10: Advanced Systems, Linux & Careers';
  }

  const note = parseChapterBody(ch.raw, unit, 'competitive', chNoComp, title, 'note-itcomp');
  if (title.includes('Practice questions')) {
    practiceIdComp = note.id;
  }
  parsedComp.push(note);
}

// Parse answer key from Comp using practiceIdComp
const pCompAnsStart = contentComp.indexOf('# 45. Answer key and worked explanations');
const pCompGlossaryStart = contentComp.indexOf('# 46. Glossary');
if (pCompAnsStart !== -1 && pCompGlossaryStart !== -1 && practiceIdComp) {
  const ansChunk = contentComp.slice(pCompAnsStart, pCompGlossaryStart);
  let currentQ = '';
  let currentSol = [];

  for (const line of ansChunk.split('\n')) {
    const mOpt = line.trim().match(/^(\d+)\.\s+\*\*([A-D])\*\*\s+[—-]\s+(.+)$/);
    if (mOpt) {
      if (currentQ) IT_ANSWERS[`${practiceIdComp}-${currentQ}`] = { solution: cleanText(currentSol.join('\n')) };
      currentQ = '';
      currentSol = [];
      IT_ANSWERS[`${practiceIdComp}-${mOpt[1]}`] = { correctKey: mOpt[2], explanation: cleanText(mOpt[3]) };
      continue;
    }

    const mNum = line.trim().match(/^(\d+)\.\s*(.*)$/);
    if (mNum) {
      if (currentQ) IT_ANSWERS[`${practiceIdComp}-${currentQ}`] = { solution: cleanText(currentSol.join('\n')) };
      currentQ = mNum[1];
      currentSol = mNum[2] ? [mNum[2]] : [];
      continue;
    }

    if (currentQ) {
      if (line.trim().startsWith('## ')) {
        IT_ANSWERS[`${practiceIdComp}-${currentQ}`] = { solution: cleanText(currentSol.join('\n')) };
        currentQ = '';
        currentSol = [];
      } else {
        currentSol.push(line);
      }
    }
  }
  if (currentQ) IT_ANSWERS[`${practiceIdComp}-${currentQ}`] = { solution: cleanText(currentSol.join('\n')) };
}

console.log(`Competitive IT generated: ${parsedComp.length} chapters. Practice ID: ${practiceIdComp}`);
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/itComp.ts', `import type { ChapterNote } from "./types";\n\nexport const itNotesComp: ChapterNote[] = ${JSON.stringify(parsedComp, null, 2)};\n`, 'utf8');

// -------------------------------------------------------------
// 4. ARTIFICIAL INTELLIGENCE (AI)
// -------------------------------------------------------------
console.log('Processing AI Master Notes...');
const rawChaptersAi = splitH1Chapters(contentAi);
const parsedAi = [];
let chNoAi = 0;
let practiceIdAi = '';

for (const ch of rawChaptersAi) {
  const title = ch.header;
  // Skip top document title and answer key
  if (title.startsWith('Artificial Intelligence Master Notes') || title.startsWith('55. Answer Key and Explanations')) {
    continue;
  }

  chNoAi++;
  let unit = 'Artificial Intelligence Master Curriculum';
  const matchNum = title.match(/^(\d+)\./);
  if (matchNum) {
    const num = parseInt(matchNum[1], 10);
    if (num <= 6) unit = 'Unit 1: AI Foundations, History & Lifecycle';
    else if (num <= 11) unit = 'Unit 2: Math, Programming & Ethics for AI';
    else if (num <= 20) unit = 'Unit 3: Machine Learning (Supervised, Unsupervised, RL)';
    else if (num <= 22) unit = 'Unit 4: Deep Learning & Computer Vision';
    else if (num <= 25) unit = 'Unit 5: NLP, Speech, Audio & Time Series';
    else if (num <= 30) unit = 'Unit 6: Transformers, Generative AI & LLMs';
    else if (num <= 36) unit = 'Unit 7: Prompting, RAG & Vector Databases';
    else if (num <= 42) unit = 'Unit 8: APIs, Tool Use & AI Agents';
    else if (num <= 49) unit = 'Unit 9: Evaluation, Security & Governance';
    else if (num <= 54) unit = 'Unit 10: Projects, Recipes & Practice';
    else unit = 'Unit 11: AI Reference & Appendices';
  } else if (title.includes('Appendix') || title.includes('Final') || title.includes('Closing')) {
    unit = 'Unit 11: AI Reference & Appendices';
  }

  const note = parseChapterBody(ch.raw, unit, 'ai', chNoAi, title, 'note-itai');
  if (title.includes('Practice Questions')) {
    practiceIdAi = note.id;
  }
  parsedAi.push(note);
}

// Parse answer key from AI using practiceIdAi
const pAiAnsStart = contentAi.indexOf('# 55. Answer Key and Explanations');
const pAiGlossaryStart = contentAi.indexOf('# 56. AI Glossary');
if (pAiAnsStart !== -1 && pAiGlossaryStart !== -1 && practiceIdAi) {
  const ansChunk = contentAi.slice(pAiAnsStart, pAiGlossaryStart);
  let currentQ = '';
  let currentSol = [];

  for (const line of ansChunk.split('\n')) {
    const mNum = line.trim().match(/^(\d+)\.\s*(.*)$/);
    if (mNum) {
      if (currentQ) IT_ANSWERS[`${practiceIdAi}-${currentQ}`] = { solution: cleanText(currentSol.join('\n')) };
      currentQ = mNum[1];
      currentSol = mNum[2] ? [mNum[2]] : [];
      continue;
    }

    if (currentQ) {
      if (line.trim().startsWith('## ')) {
        IT_ANSWERS[`${practiceIdAi}-${currentQ}`] = { solution: cleanText(currentSol.join('\n')) };
        currentQ = '';
        currentSol = [];
      } else {
        currentSol.push(line);
      }
    }
  }
  if (currentQ) IT_ANSWERS[`${practiceIdAi}-${currentQ}`] = { solution: cleanText(currentSol.join('\n')) };
}

console.log(`AI generated: ${parsedAi.length} chapters. Practice ID: ${practiceIdAi}`);
fs.writeFileSync('c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/itAi.ts', `import type { ChapterNote } from "./types";\n\nexport const itNotesAi: ChapterNote[] = ${JSON.stringify(parsedAi, null, 2)};\n`, 'utf8');

// -------------------------------------------------------------
// 5. WRITE IT_ANSWERS LOOKUP MAP
// -------------------------------------------------------------
console.log(`Total IT Answers parsed: ${Object.keys(IT_ANSWERS).length}`);
fs.writeFileSync(
  'c:/Users/hiii/OneDrive/Documents/Apps/Quiz Arena/src/data/notes/itAnswers.ts',
  `export interface AnswerItem {\n  correctKey?: string;\n  explanation?: string;\n  solution?: string;\n}\n\nexport const IT_ANSWERS: Record<string, AnswerItem> = ${JSON.stringify(IT_ANSWERS, null, 2)};\n`,
  'utf8'
);

console.log('ALL 4 IT SECTIONS & IT_ANSWERS SUCCESSFULLY GENERATED!');
