/**
 * Minimal hand-drawn icon set: one consistent visual family (24x24, 1.6px
 * stroke, currentColor) so every icon on the site reads as the same system,
 * per the brief's own "ícones outline, ciano, glow discreto" spec.
 */
const ICONS = {
  code: '<path d="M9 18 3 12l6-6M15 6l6 6-6 6"/>',
  layers: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 16l9 5 9-5"/><path d="M3 12l9 5 9-5"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".5" fill="currentColor"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4.5a2 2 0 0 1 4 0V17M12 17v-7"/>',
  file: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  chat: '<path d="M4 4h16v12H8l-4 4V4Z"/>',
  network: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.2 10.2 16M16 7.2 13.8 16M8.5 6h7"/>',
  trendUp: '<path d="M4 17 10 11l4 4 6-8"/><path d="M15 7h5v5"/>',
  star: '<path d="M12 3.5 14.7 9l6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.9l6-.9L12 3.5Z"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z"/><path d="M20 18H6.5A2.5 2.5 0 0 0 4 20.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 13h18"/>',
};

export function icon(name, { size = 24, className = '' } = {}) {
  const paths = ICONS[name] ?? '';
  return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}
