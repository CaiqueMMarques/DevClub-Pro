import { gsap } from '../core/gsapSetup.js';
import { prefersReducedMotion } from '../core/reducedMotion.js';

/**
 * Word-by-word "rise into place" reveal for headings — each word sits in an
 * overflow-hidden mask and slides up from below as it enters view. Unlike
 * animatedText.js (char-by-char, scroll-scrubbed, sized for body copy), this
 * is a single staggered play-once entrance sized for large display type.
 */
export function initWordReveal(el) {
  if (!el || prefersReducedMotion()) return;

  // Normalize whitespace first: source markup often wraps heading text
  // across multiple indented lines, and a naive split(' ') would otherwise
  // turn each run of indentation into empty "words".
  const text = el.textContent.replace(/\s+/g, ' ').trim();
  el.setAttribute('aria-label', text);

  el.innerHTML = text
    .split(' ')
    .map((word) => `<span class="word-mask" aria-hidden="true"><span class="word-mask__inner">${word}</span></span>`)
    .join(' ');

  const inners = el.querySelectorAll('.word-mask__inner');
  gsap.set(inners, { yPercent: 110, opacity: 0 });

  gsap.to(inners, {
    yPercent: 0,
    opacity: 1,
    duration: 0.9,
    stagger: 0.07,
    ease: 'power4.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });
}
