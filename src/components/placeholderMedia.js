import { qsa } from '../core/dom.js';

/**
 * Wires the graceful photo -> initials fallback for every [data-media] slot:
 * a real <img> pointed at the expected file; if it 404s (or the file is
 * simply not there yet), swap to a gradient/glow block with initials. Same
 * mechanism reused for every photo and logo slot on the site.
 */
export function initPlaceholderMedia(root = document) {
  qsa('[data-media]', root).forEach((frame) => {
    const img = frame.querySelector('img');
    if (!img) return;

    img.addEventListener(
      'error',
      () => {
        img.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'media-frame__fallback';
        fallback.innerHTML = `<span>${frame.dataset.initials ?? '?'}</span>`;
        frame.appendChild(fallback);
      },
      { once: true }
    );
  });
}
