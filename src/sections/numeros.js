import { qsa } from '../core/dom.js';
import { animateCounter } from '../core/counter.js';

export function initNumeros(root = document) {
  qsa('[data-counter]', root).forEach((el) => {
    animateCounter(el, {
      to: parseFloat(el.dataset.to),
      decimals: Number(el.dataset.decimals ?? 0),
      prefix: el.dataset.prefix ?? '',
      suffix: el.dataset.suffix ?? '',
      group: el.dataset.group === 'true',
    });
  });
}
