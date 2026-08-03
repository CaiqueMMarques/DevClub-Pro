import { qs, qsa } from '../core/dom.js';
import { initMarquee } from '../core/marquee.js';
import { empresas } from '../data/empresas.js';

const COLUMNS = [
  { direction: 'up', items: [0, 3, 6, 9] },
  { direction: 'down', items: [1, 4, 7] },
  { direction: 'up', items: [2, 5, 8] },
];

function chipHTML(company) {
  return `
    <div class="logo-chip" tabindex="0" data-tooltip="Alunos do DevClub trabalham nesta empresa.">
      <img src="${company.logo}" alt="${company.name}" loading="lazy" decoding="async" />
    </div>
  `;
}

function trackHTML(indices) {
  return indices.map((i) => chipHTML(empresas[i])).join('');
}

export function initEmpresas(root = document) {
  const grid = qs('.empresas__grid', root);
  if (!grid) return;

  grid.innerHTML = COLUMNS.map(
    (col) => `
      <div class="marquee" data-direction="${col.direction}">
        <div class="marquee__strip">
          <div class="marquee__track">${trackHTML(col.items)}</div>
          <div class="marquee__track" aria-hidden="true">${trackHTML(col.items)}</div>
        </div>
      </div>
    `
  ).join('');

  qsa('.marquee', grid).forEach(initMarquee);
}
