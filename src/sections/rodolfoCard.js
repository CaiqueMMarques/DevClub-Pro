import { qs } from '../core/dom.js';
import { initFlipCard } from '../components/flipCard.js';

export function initRodolfoCard(root = document) {
  const card = qs('.rodolfo .flip-card', root);
  if (card) initFlipCard(card);
}
