import { gsap } from 'gsap';
import { qs } from '../core/dom.js';
import { prefersReducedMotion } from '../core/reducedMotion.js';

const SEQUENCE = [
  { text: 'Quando eu for contratado coloco aqui o link do WhatsApp 😂', hold: 2.6 },
  { text: 'Brincadeiras à parte.', hold: 1.8 },
  { text: 'Deus abençoe.', hold: 1.8 },
  { text: 'Rodolfo.', hold: 0, glow: true },
];

export function initMatriculeSe(root = document) {
  const line = qs('[data-line]', root);
  const backBtn = qs('[data-back]', root);
  if (!line) return;

  if (prefersReducedMotion()) {
    const last = SEQUENCE.at(-1);
    line.textContent = last.text;
    line.classList.add('is-glow');
    line.style.opacity = 1;
    backBtn?.classList.add('is-visible');
    return;
  }

  const tl = gsap.timeline({ delay: 0.4 });

  SEQUENCE.forEach((step, i) => {
    if (i === 0) {
      tl.to(line, { opacity: 1, duration: 0.8 });
    } else {
      tl.to(line, { opacity: 0, duration: 0.5 }).call(() => {
        line.textContent = step.text;
        if (step.glow) line.classList.add('is-glow');
      });
      tl.to(line, { opacity: 1, duration: 0.8 });
    }
    if (step.hold) tl.to({}, { duration: step.hold });
  });

  tl.call(() => backBtn?.classList.add('is-visible'));
}
