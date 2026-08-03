import { qsa } from '../core/dom.js';
import { tecnologias } from '../data/tecnologias.js';

function chipHTML(key) {
  const tech = tecnologias[key];
  if (!tech) return '';

  const svgAttrs = tech.fill
    ? 'fill="currentColor"'
    : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

  const inner = tech.text
    ? `<span class="tech-chip__text">${tech.text}</span>`
    : `<svg viewBox="0 0 24 24" ${svgAttrs}>${tech.icon}</svg>`;

  return `
    <li class="tech-chip tech-chip--${tech.cls}">
      <span class="tech-chip__icon">${inner}</span>
      ${tech.label}
    </li>
  `;
}

/** Renders icon badges for every [data-techs="key,key,..."] list, per the tech map. */
export function renderTechChips(root = document) {
  qsa('[data-techs]', root).forEach((list) => {
    const keys = list.dataset.techs.split(',').map((key) => key.trim()).filter(Boolean);
    list.innerHTML = keys.map(chipHTML).join('');
  });
}
