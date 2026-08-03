import { prefersReducedMotion } from '../core/reducedMotion.js';

const WORDS = ['Front-end', 'Back-end', 'JavaScript'];
// Stay inside the site's own cyan family (tokens.css --primary/--primary-light/
// --primary-dark) rather than reaching for unrelated hues per word — keeps the
// hero on-brand while still giving each word its own identity.
const COLORS = ['#00e5ff', '#66f5ff', '#00c8ff'];
const TYPE_MS = 85;
const ERASE_MS = 40;
const HOLD_MS = 1400;
const GAP_MS = 300;

/**
 * Infinite typewriter cycle for the hero headline's tech-name slot: types a
 * word letter by letter, holds, erases, then types the next — forever.
 * `el` must be aria-hidden with the meaningful text already covered by an
 * aria-label on an ancestor (see index.html), since this content changes
 * continuously and must never be exposed to assistive tech as a live region.
 */
export function initHeroCycle(el) {
  if (!el) return;

  if (prefersReducedMotion()) {
    el.textContent = WORDS[0];
    el.style.color = COLORS[0];
    return;
  }

  let wordIndex = 0;

  const type = (word, onDone) => {
    let i = 0;
    const step = () => {
      el.textContent = word.slice(0, i);
      i += 1;
      if (i <= word.length) setTimeout(step, TYPE_MS);
      else onDone();
    };
    step();
  };

  const erase = (word, onDone) => {
    let i = word.length;
    const step = () => {
      el.textContent = word.slice(0, i);
      i -= 1;
      if (i >= 0) setTimeout(step, ERASE_MS);
      else onDone();
    };
    step();
  };

  const cycle = () => {
    const word = WORDS[wordIndex];
    el.style.color = COLORS[wordIndex];
    type(word, () => {
      setTimeout(() => {
        erase(word, () => {
          wordIndex = (wordIndex + 1) % WORDS.length;
          setTimeout(cycle, GAP_MS);
        });
      }, HOLD_MS);
    });
  };

  cycle();
}
