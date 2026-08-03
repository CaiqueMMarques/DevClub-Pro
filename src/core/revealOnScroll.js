import { gsap } from './gsapSetup.js';
import { qsa } from './dom.js';

const VARIANTS = {
  'fade-up': { opacity: 0, y: 44 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.92 },
  left: { opacity: 0, x: -44 },
  right: { opacity: 0, x: 44 },
};

/**
 * Declarative scroll reveals driven by data attributes, so sections never
 * hand-roll their own ScrollTrigger config:
 *   data-reveal="fade-up"       variant, defaults to fade-up
 *   data-reveal-delay="0.2"     seconds
 *   data-reveal-group           parent; staggers its data-reveal-item children
 *   data-reveal-stagger="0.08"  seconds between staggered children
 */
export function initRevealOnScroll(root = document) {
  gsap.matchMedia().add(
    {
      motionOK: '(prefers-reduced-motion: no-preference)',
      motionReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { motionOK } = context.conditions;

      qsa('[data-reveal]', root).forEach((el) => {
        if (el.closest('[data-reveal-group]')) return;
        const variant = VARIANTS[el.dataset.reveal] ?? VARIANTS['fade-up'];
        const delay = parseFloat(el.dataset.revealDelay ?? '0');

        if (!motionOK) {
          gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
          return;
        }

        gsap.from(el, {
          ...variant,
          delay,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      qsa('[data-reveal-group]', root).forEach((group) => {
        const items = qsa('[data-reveal-item]', group);
        if (!items.length) return;
        const stagger = parseFloat(group.dataset.revealStagger ?? '0.08');
        const variant = VARIANTS[group.dataset.reveal] ?? VARIANTS['fade-up'];

        if (!motionOK) {
          gsap.set(items, { opacity: 1, x: 0, y: 0, scale: 1 });
          return;
        }

        gsap.from(items, {
          ...variant,
          stagger,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 80%', once: true },
        });
      });
    }
  );
}
