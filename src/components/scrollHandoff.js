import { gsap } from '../core/gsapSetup.js';
import { prefersReducedMotion } from '../core/reducedMotion.js';

/**
 * Scroll-scrubbed "handoff" between two adjacent sections: while the
 * incoming section's top travels from the bottom of the viewport to the
 * top — exactly the one-screen-height window where the outgoing section
 * leaves and the incoming one arrives — the outgoing card drifts up and
 * fades while the incoming card rises into place. Reads as one connected
 * gesture (leaving Rodolfo, arriving at Fernanda) instead of two unrelated
 * reveals that happen to be adjacent.
 */
export function initScrollHandoff({ outEl, inEl, trigger }) {
  if (!outEl || !inEl || !trigger) return;
  if (prefersReducedMotion()) return;

  gsap.set(inEl, { opacity: 0, scale: 0.86, y: 70 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.4,
      },
    })
    .to(outEl, { opacity: 0.15, scale: 0.85, y: -70, ease: 'none' }, 0)
    .to(inEl, { opacity: 1, scale: 1, y: 0, ease: 'none' }, 0);
}
