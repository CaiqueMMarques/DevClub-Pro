import { ScrollTrigger } from '../core/gsapSetup.js';
import { qs, qsa, on } from '../core/dom.js';
import { scrollToSelector } from '../core/smoothScroll.js';

export function initNavbar(root = document) {
  const nav = qs('.navbar', root);
  if (!nav) return;

  const toggle = qs('.navbar__toggle', nav);
  const links = qs('.navbar__links', nav);

  if (toggle && links) {
    on(toggle, 'click', () => {
      const isOpen = nav.classList.toggle('is-menu-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    qsa('a', links).forEach((link) => {
      on(link, 'click', () => {
        nav.classList.remove('is-menu-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Route same-page anchors through Lenis so navbar links match the rest of the scroll feel
  qsa('a[href^="#"]', nav).forEach((link) => {
    on(link, 'click', (event) => {
      const href = link.getAttribute('href');
      if (href.length > 1 && qs(href)) {
        event.preventDefault();
        scrollToSelector(href);
      }
    });
  });

  let lastDirection = -1;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      if (self.scroll() < 80) {
        nav.classList.remove('is-hidden');
        return;
      }
      if (self.direction !== lastDirection) {
        nav.classList.toggle('is-hidden', self.direction === 1);
        lastDirection = self.direction;
      }
    },
  });
}
