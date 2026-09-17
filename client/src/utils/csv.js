/**
 * Minimal, dependency-free CSV parser for exam question import.
 * Expected columns (header row required, case-insensitive):
 *   question, optionA, optionB, optionC, optionD, correct(A/B/C/D), marks,
 *   negativeMarks, difficulty, explanation, questionImageUrl,
 *   optionAImageUrl, optionBImageUrl, optionCImageUrl, optionDImageUrl
 *
 * Returns rows shaped for the API: { questionText, options[4], correctAnswer, ... }
 */
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // ignore
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name) => header.indexOf(name);

  const col = {
    question: idx("question") >= 0 ? idx("question") : idx("questiontext"),
    a: idx("optiona"),
    b: idx("optionb"),
    c: idx("optionc"),
    d: idx("optiond"),
    correct: idx("correct"),
    marks: idx("marks"),
    negative: idx("negativemarks"),
    difficulty: idx("difficulty"),
    explanation: idx("explanation"),
    qImage: idx("questionimageurl"),
    ai: idx("optionaimageurl"),
    bi: idx("optionbimageurl"),
    ci: idx("optioncimageurl"),
    di: idx("optiondimageurl"),
  };

  const toLetterIndex = (v) => {
    if (v === undefined || v === null) return 0;
    const s = String(v).trim().toUpperCase();
    if (["A", "B", "C", "D"].includes(s)) return s.charCodeAt(0) - 65;
    const n = parseInt(s, 10);
    if (!isNaN(n) && n >= 0 && n <= 3) return n;
    return 0;
  };

  const get = (r, i) => (i >= 0 ? (r[i] || "").trim() : "");

  return rows
    .slice(1)
    .map((r) => ({
      questionText: get(r, col.question),
      options: [
        { text: get(r, col.a), imageUrl: get(r, col.ai) || undefined },
        { text: get(r, col.b), imageUrl: get(r, col.bi) || undefined },
        { text: get(r, col.c), imageUrl: get(r, col.ci) || undefined },
        { text: get(r, col.d), imageUrl: get(r, col.di) || undefined },
      ],
      correctAnswer: toLetterIndex(get(r, col.correct)),
      marks: col.marks >= 0 ? Number(get(r, col.marks)) || 4 : 4,
      negativeMarks: col.negative >= 0 ? Number(get(r, col.negative)) || 1 : 1,
      difficulty: get(r, col.difficulty) || "Medium",
      explanation: get(r, col.explanation) || undefined,
      questionImageUrl: get(r, col.qImage) || undefined,
    }))
    .filter((q) => q.questionText && q.options.some((o) => o.text));
}

export const CSV_TEMPLATE =
  "question,optionA,optionB,optionC,optionD,correct,marks,negativeMarks,difficulty,explanation,questionImageUrl,optionAImageUrl,optionBImageUrl,optionCImageUrl,optionDImageUrl\n" +
  '"Which organelle is the powerhouse of the cell?",Mitochondria,Ribosome,Nucleus,Golgi body,A,4,1,Medium,"Mitochondria produce ATP via respiration.",,,,,\n' +
  '"Dimensions of Planck\'s constant are:",MLT-1,ML2T-1,ML2T-2,MLT,2,4,1,Easy,"[p] = kg m2 s-1",,,,,\n';

export function downloadCSVTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "neetvidya-questions-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}
