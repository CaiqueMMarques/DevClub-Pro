/**
 * Wraps each word of an element's text in its own <span> for stagger
 * animation, while keeping the element screen-reader friendly: the full
 * original text becomes the element's aria-label, and the split markup is
 * hidden from assistive tech (otherwise a screen reader announces word
 * fragments one at a time).
 */
export function splitWords(el) {
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);

  const words = text.split(/\s+/);
  el.innerHTML = '';

  const wordEls = words.map((word, i) => {
    const wrapper = document.createElement('span');
    wrapper.className = 'split-word';
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    wrapper.setAttribute('aria-hidden', 'true');

    const inner = document.createElement('span');
    inner.className = 'split-word__inner';
    inner.style.display = 'inline-block';
    inner.textContent = word;
    wrapper.appendChild(inner);

    el.appendChild(wrapper);
    if (i < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
    }
    return inner;
  });

  return wordEls;
}
