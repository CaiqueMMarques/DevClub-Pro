import { prefersReducedMotion } from './reducedMotion.js';

const PIXELS_PER_SECOND = 28;

/**
 * Drives one infinite marquee column. Expects markup:
 *   <div class="marquee" data-direction="up|down">
 *     <div class="marquee__track">...items...</div>
 *     <div class="marquee__track" aria-hidden="true">...same items, duplicated...</div>
 *   </div>
 * The duplicated track is what makes the loop seamless (animating exactly -50%).
 */
export function initMarquee(column) {
  const [track] = column.querySelectorAll('.marquee__track');
  if (!track) return;

  const setDuration = () => {
    const distance = track.getBoundingClientRect().height;
    const duration = prefersReducedMotion() ? 0 : distance / PIXELS_PER_SECOND;
    column.style.setProperty('--marquee-duration', `${duration}s`);
  };

  setDuration();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setDuration, 200);
  });
}
