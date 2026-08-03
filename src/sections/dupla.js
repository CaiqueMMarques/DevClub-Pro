import { qs } from '../core/dom.js';
import { initWordReveal } from '../components/wordReveal.js';
import { initAnimatedText } from '../components/animatedText.js';
import { initTiltCard } from '../components/tiltCard.js';

export function initDupla(root = document) {
  const section = qs('.dupla', root);
  if (!section) return;

  initWordReveal(qs('#dupla-heading', section));
  initAnimatedText(qs('.dupla__text', section));
  initTiltCard(qs('.dupla__photo', section));
}
