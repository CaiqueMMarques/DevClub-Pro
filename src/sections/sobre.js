import { qs } from '../core/dom.js';
import { initAnimatedText } from '../components/animatedText.js';

export function initSobre(root = document) {
  const lead = qs('.sobre__lead', root);
  if (lead) initAnimatedText(lead);
}
