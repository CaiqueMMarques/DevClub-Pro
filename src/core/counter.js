import { gsap } from './gsapSetup.js';
import { prefersReducedMotion } from './reducedMotion.js';

/**
 * Animates a number into an element when it enters the viewport.
 * options: { from, to, duration, decimals, prefix, suffix, trigger }
 */
export function animateCounter(el, options) {
  const {
    from = 0,
    to,
    duration = 1.6,
    decimals = 0,
    prefix = '',
    suffix = '',
    trigger = el,
    group = false,
  } = options;

  const format = (value) => {
    const number = group
      ? Math.round(value).toLocaleString('pt-BR')
      : value.toFixed(decimals);
    return `${prefix}${number}${suffix}`;
  };

  if (prefersReducedMotion()) {
    el.textContent = format(to);
    return;
  }

  const proxy = { value: from };
  el.textContent = format(from);

  gsap.to(proxy, {
    value: to,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = format(proxy.value);
    },
    scrollTrigger: { trigger, start: 'top 85%', once: true },
  });
}
