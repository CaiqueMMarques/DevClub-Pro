import { gsap } from '../core/gsapSetup.js';
import { qs, qsa } from '../core/dom.js';

export function initSalario(root = document) {
  const section = qs('.salario', root);
  if (!section) return;

  const chart = qs('.salario__chart', section);
  const bars = qsa('.salario-bar__rect', section);
  const labels = qsa('.salario-bar__label', section);
  const ceiling = qs('.salario-bar__ceiling', section);
  if (!bars.length) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.set(bars, { transformOrigin: '50% 100%', scaleY: 0 });
    gsap.set(labels, { opacity: 0, y: 10 });
    if (ceiling) gsap.set(ceiling, { opacity: 0 });

    // Scrubbed to the scroll position (starts at zero, tracks the wheel/
    // trackpad) but ranged tightly on the chart itself — not the whole
    // section, which also includes the heading and footnote — so growth
    // finishes while the chart is arriving on screen, not after the user
    // has already scrolled past it.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chart || section,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 0.4,
      },
    });

    tl.to(bars, { scaleY: 1, stagger: 0.25, ease: 'none' }).to(
      labels,
      { opacity: 1, y: 0, stagger: 0.25, ease: 'none' },
      '<0.15'
    );
    if (ceiling) tl.to(ceiling, { opacity: 1, ease: 'none' }, '<');
  });
}
