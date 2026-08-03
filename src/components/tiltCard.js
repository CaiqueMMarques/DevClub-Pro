import { gsap } from '../core/gsapSetup.js';
import { prefersReducedMotion } from '../core/reducedMotion.js';

/**
 * Pointer-tilt on a card: rotateX/rotateY follow the cursor position inside
 * the element, spring back to flat on leave. Desktop-with-mouse only —
 * skipped under reduced motion and on touch/coarse pointers, where "tilt
 * toward a cursor that doesn't exist" has no meaning.
 *
 * Uses GSAP's own rotateX/rotateY/scale properties (not raw inline
 * style.transform) so this composes safely with any other GSAP tween
 * touching the same element's transform, e.g. a scroll-driven scale.
 */
export function initTiltCard(el, { max = 8 } = {}) {
  if (!el) return;
  if (prefersReducedMotion()) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  gsap.set(el, { transformPerspective: 900 });

  const onMove = (event) => {
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    gsap.to(el, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: (0.5 - py) * max * 2,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const onLeave = () => {
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
  };

  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);
}
