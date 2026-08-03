import { prefersReducedMotion } from '../core/reducedMotion.js';

const PIXELS_PER_SECOND = 55;

/**
 * Infinite horizontal marquee, full section width. Expects markup:
 *   <div class="testimonial-marquee">
 *     <div class="testimonial-marquee__strip">
 *       <div class="testimonial-marquee__track">...cards...</div>
 *       <div class="testimonial-marquee__track" aria-hidden="true">...same cards, duplicated...</div>
 *     </div>
 *   </div>
 * The duplicated track is what makes the loop seamless (animating exactly
 * -50% of the strip). Hover/focus pauses via CSS animation-play-state,
 * which freezes the current computed position rather than resetting it.
 */
export function initTestimonialMarquee(root) {
  const track = root.querySelector('.testimonial-marquee__track');
  if (!track) return;

  const setDuration = () => {
    const distance = track.getBoundingClientRect().width;
    const duration = prefersReducedMotion() ? 0 : distance / PIXELS_PER_SECOND;
    root.style.setProperty('--testimonial-marquee-duration', `${duration}s`);
  };

  setDuration();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setDuration, 200);
  });
}
