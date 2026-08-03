import { prefersReducedMotion } from '../core/reducedMotion.js';

/**
 * Mouse-following magnetic pull: the element eases toward the pointer once
 * it enters `padding` px around it, and eases back out on exit. Sets the
 * transform as an inline style, so don't also drive this element's
 * transform from GSAP/CSS at the same time (they'd fight for control).
 */
export function initMagnet(el, { padding = 100, strength = 3 } = {}) {
  if (prefersReducedMotion()) return;

  let active = false;

  const onMove = (event) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const reach = Math.max(rect.width, rect.height) / 2 + padding;
    const distance = Math.hypot(dx, dy);

    if (distance < reach) {
      if (!active) {
        active = true;
        el.style.willChange = 'transform';
        el.style.transition = 'transform 0.3s ease-out';
      }
      el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
    } else if (active) {
      active = false;
      el.style.transition = 'transform 0.6s ease-in-out';
      el.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  window.addEventListener('pointermove', onMove, { passive: true });
}
