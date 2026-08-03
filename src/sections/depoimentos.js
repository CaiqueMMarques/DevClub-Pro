import { qs } from '../core/dom.js';
import { initTestimonialMarquee } from '../components/testimonialMarquee.js';
import { depoimentos } from '../data/depoimentos.js';

function cardHTML(item, i, hidden) {
  return `
    <article class="testimonial card" ${hidden ? 'aria-hidden="true"' : 'tabindex="0"'}>
      <div class="testimonial__head">
        <div class="testimonial__avatar media-frame" data-media data-initials="${item.iniciais}">
          <img src="/images/testimonials/avatar-${String(i + 1).padStart(2, '0')}.jpg" alt="${item.nome}" loading="lazy" decoding="async" />
        </div>
        <div>
          <p class="h4">${item.nome}</p>
          <p class="body-sm text-secondary">${item.cidade} &middot; ${item.cargo} na ${item.empresa}</p>
        </div>
      </div>
      <div class="testimonial__body">
        <div>
          <p class="eyebrow">Antes do DevClub</p>
          <p class="body-sm">${item.antes}</p>
        </div>
        <div>
          <p class="eyebrow">Depois do DevClub</p>
          <p class="body-sm">${item.depois}</p>
        </div>
      </div>
    </article>
  `;
}

function trackHTML(hidden) {
  return depoimentos.map((item, i) => cardHTML(item, i, hidden)).join('');
}

export function initDepoimentos(root = document) {
  const marquee = qs('.testimonial-marquee', root);
  const strip = qs('.testimonial-marquee__strip', marquee ?? undefined);
  if (!marquee || !strip) return;

  strip.innerHTML = `
    <div class="testimonial-marquee__track">${trackHTML(false)}</div>
    <div class="testimonial-marquee__track" aria-hidden="true">${trackHTML(true)}</div>
  `;

  initTestimonialMarquee(marquee);
}
