import { gsap } from '../core/gsapSetup.js';
import { qs, qsa } from '../core/dom.js';

export function initEmpregabilidade(root = document) {
  const section = qs('.empregabilidade', root);
  if (!section) return;

  const paths = qsa('.map-arc', section);
  if (!paths.length) return;

  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.3,
      stagger: 0.22,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 65%', once: true },
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    paths.forEach((path) => {
      path.style.strokeDashoffset = '0';
    });
  });
}
