import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsapSetup.js';
import { prefersReducedMotion } from './reducedMotion.js';

let lenis = null;

export function initSmoothScroll() {
  if (prefersReducedMotion()) {
    // Reduced-motion users generally want native scroll physics restored,
    // not just a slower version of the hijacked scroll.
    return null;
  }

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToSelector(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: -72, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}
