import { gsap } from '../core/gsapSetup.js';
import { prefersReducedMotion } from '../core/reducedMotion.js';

/**
 * Character-by-character scroll reveal: each letter eases from dim to full
 * opacity as the element crosses the viewport, scrubbed to scroll position
 * rather than played once — inspired by motionsites.ai-style cinematic
 * scroll pages. Skips entirely under reduced motion (full text, static).
 */
export function initAnimatedText(el) {
  if (prefersReducedMotion()) return;

  // Normalize whitespace first: source markup wraps paragraphs across
  // multiple indented lines, and textContent keeps every one of those
  // indentation spaces literally. Left as-is, each one becomes its own
  // non-breaking &nbsp; span below — rigid, non-collapsing width that
  // shows up as a staircase indent at every line break in the source.
  const text = el.textContent.replace(/\s+/g, ' ').trim();
  el.setAttribute('aria-label', text);

  // A literal space (not &nbsp;) here: &nbsp; is specifically a *no-break*
  // space, so wrapping this into &nbsp; spans — one per word gap — was
  // silently killing every line-wrap opportunity in the paragraph. It only
  // looked fine before because stray newlines from the source markup's own
  // indentation happened to force breaks at those few spots; the real word
  // boundaries never wrapped at all.
  el.innerHTML = text
    .split('')
    .map((ch) => `<span class="char" aria-hidden="true">${ch}</span>`)
    .join('');

  const chars = el.querySelectorAll('.char');
  gsap.set(chars, { opacity: 0.22 });

  gsap.to(chars, {
    opacity: 1,
    stagger: 0.015,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      end: 'bottom 55%',
      scrub: 0.3,
    },
  });
}
