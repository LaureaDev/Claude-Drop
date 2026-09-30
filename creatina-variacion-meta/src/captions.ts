import {GUION} from './config';

export type Word = {text: string; startMs: number; endMs: number; highlight: boolean};
export type Page = {startMs: number; endMs: number; words: Word[]};

const MAX_WORDS_PER_PAGE = 3;

// Reparte cada frase en palabras (tiempo proporcional a la longitud)
// y agrupa en "páginas" de 3 palabras estilo TikTok/Reels.
export const buildPages = (): Page[] => {
  const pages: Page[] = [];
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
    for (let i = 0; i < words.length; i += MAX_WORDS_PER_PAGE) {
      const chunk = words.slice(i, i + MAX_WORDS_PER_PAGE);
      pages.push({startMs: chunk[0].startMs, endMs: chunk[chunk.length - 1].endMs, words: chunk});
    }
  }
  return pages;
};
