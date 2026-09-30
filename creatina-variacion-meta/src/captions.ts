import {GUION} from './config';
import vozTimings from './voz-timings.json';

export type Word = {text: string; startMs: number; endMs: number; highlight: boolean};
export type Page = {startMs: number; endMs: number; words: Word[]};

const MAX_WORDS_PER_PAGE = 3;

// Reparte cada frase en palabras (tiempo proporcional a la longitud)
// y agrupa en "páginas" de 3 palabras estilo TikTok/Reels.
export const buildPages = (): Page[] => {
  const pages: Page[] = [];
  const allWords: Word[] = [];
  const lineWords: Word[][] = [];
  for (const line of GUION) {
    const raw = line.text.split(/\s+/).filter(Boolean);
    const weights = raw.map((w) => w.replace(/\*/g, '').length + 2);
    const total = weights.reduce((a, b) => a + b, 0);
    const span = (line.end - line.start) * 1000;
    let t = line.start * 1000;
    const words: Word[] = raw.map((w, i) => {
      const d = (weights[i] / total) * span;
      const word = {
        text: w.replace(/\*/g, ''),
        startMs: t,
        endMs: t + d,
        highlight: w.startsWith('*') || w.endsWith('*'),
      };
      t += d;
      return word;
    });
    // palabras resaltadas con varios tokens: *más energía*
    let open = false;
    raw.forEach((w, i) => {
      if (w.startsWith('*')) open = true;
      if (open) words[i].highlight = true;
      if (w.endsWith('*')) open = false;
    });
    // los emojis se pegan a la palabra anterior (la voz no los lee)
    for (let i = words.length - 1; i > 0; i--) {
      if (!/[\p{L}\p{N}]/u.test(words[i].text)) {
        words[i - 1].text += ' ' + words[i].text;
        words.splice(i, 1);
      }
    }
    allWords.push(...words);
    lineWords.push(words);
  }

  // Si existe la voz generada, usa sus tiempos reales palabra por palabra
  const timings = vozTimings as {startMs: number; endMs: number}[] | null;
  if (timings && timings.length === allWords.length) {
    allWords.forEach((w, i) => {
      w.startMs = timings[i].startMs;
      w.endMs = i + 1 < timings.length ? Math.max(timings[i].endMs, timings[i + 1].startMs) : timings[i].endMs + 400;
    });
  } else if (timings) {
    console.warn(`voz-timings.json tiene ${timings.length} palabras y el GUION ${allWords.length}: se usan tiempos estimados`);
  }

  for (const words of lineWords) {
    for (let i = 0; i < words.length; i += MAX_WORDS_PER_PAGE) {
      const chunk = words.slice(i, i + MAX_WORDS_PER_PAGE);
      pages.push({startMs: chunk[0].startMs, endMs: chunk[chunk.length - 1].endMs, words: chunk});
    }
  }
  return pages;
};
