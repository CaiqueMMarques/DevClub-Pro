import { animate } from 'motion';
import { qs } from '../core/dom.js';
import { prefersReducedMotion } from '../core/reducedMotion.js';

const AUTO_FLIP_INTERVAL = 2500;

/**
 * Accessible 3D flip that also loops on its own: a real <button> still
 * toggles state on click/tap/Enter/Space for anyone who wants control, but
 * the card additionally auto-flips every few seconds so the back (the
 * founder's photo) surfaces without requiring a hover. Hovering/focusing
 * pauses the auto-cycle (WCAG 2.2.2 — auto-updating content needs a pause),
 * and it's fully disabled under prefers-reduced-motion.
 */
export function initFlipCard(card) {
  const inner = qs('.flip-card__inner', card);
  const back = qs('[data-flip-back]', card);
  let flipped = false;
  let timer = null;

  const applyInert = () => {
    if (flipped) back.removeAttribute('inert');
    else back.setAttribute('inert', '');
  };
  applyInert();

  const setFlipped = (value) => {
    if (value === flipped) return;
    flipped = value;
    card.setAttribute('aria-pressed', String(flipped));
    applyInert();

    if (prefersReducedMotion()) {
      inner.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
      return;
    }

    animate(inner, { rotateY: flipped ? 180 : 0 }, { type: 'spring', stiffness: 140, damping: 16 });
  };

  const startAuto = () => {
    if (timer || prefersReducedMotion()) return;
    timer = setInterval(() => setFlipped(!flipped), AUTO_FLIP_INTERVAL);
  };

  const stopAuto = () => {
    clearInterval(timer);
    timer = null;
  };

  card.addEventListener('click', () => setFlipped(!flipped));
  card.addEventListener('pointerenter', stopAuto);
  card.addEventListener('pointerleave', startAuto);
  card.addEventListener('focusin', stopAuto);
  card.addEventListener('focusout', startAuto);

  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });

  if (!prefersReducedMotion()) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAuto();
        else stopAuto();
      },
      { threshold: 0.4 }
    ).observe(card);
  }
}
