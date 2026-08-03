import { ScrollTrigger } from '../core/gsapSetup.js';
import { qs, qsa } from '../core/dom.js';
import { mountDemo } from '../components/demos/index.js';
import { renderTechChips } from '../components/techChip.js';

/**
 * Mounts at most one demo per card, and only while the card is actually in
 * view — the concrete answer to "don't turn five formações into five
 * mini-apps running simultaneously."
 */
export function initFormacoes(root = document) {
  renderTechChips(root);

  qsa('.formacao-card', root).forEach((card) => {
    const mountEl = qs('[data-demo-mount]', card);
    const type = card.dataset.demo;
    if (!mountEl || !type) return;

    let destroy = null;

    const mount = () => {
      if (destroy) return;
      destroy = mountDemo(type, mountEl);
    };

    const unmount = () => {
      destroy?.();
      destroy = null;
      mountEl.innerHTML = '';
    };

    ScrollTrigger.create({
      trigger: card,
      start: 'top 75%',
      end: 'bottom 25%',
      onEnter: mount,
      onEnterBack: mount,
      onLeave: unmount,
      onLeaveBack: unmount,
    });
  });
}
