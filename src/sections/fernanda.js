import { qs } from '../core/dom.js';
import { initWordReveal } from '../components/wordReveal.js';
import { initAnimatedText } from '../components/animatedText.js';
import { initTiltCard } from '../components/tiltCard.js';

export function initFernanda(root = document) {
  const section = qs('.fernanda', root);
  if (!section) return;

  initWordReveal(qs('#fernanda-heading', section));
  initAnimatedText(qs('.fernanda__lead', section));
  initTiltCard(qs('.fernanda__portrait', section));
}
