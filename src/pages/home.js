import { setupGsap, ScrollTrigger } from '../core/gsapSetup.js';
import { initSmoothScroll } from '../core/smoothScroll.js';
import { initRevealOnScroll } from '../core/revealOnScroll.js';
import { qs, qsa } from '../core/dom.js';
import { initNavbar } from '../sections/navbar.js';
import { initHero } from '../sections/hero.js';
import { initSobre } from '../sections/sobre.js';
import { initRodolfoCard } from '../sections/rodolfoCard.js';
import { initFernanda } from '../sections/fernanda.js';
import { initDupla } from '../sections/dupla.js';
import { initFormacoes } from '../sections/formacoes.js';
import { initNumeros } from '../sections/numeros.js';
import { initEmpregabilidade } from '../sections/empregabilidade.js';
import { initSalario } from '../sections/salario.js';
import { initEmpresas } from '../sections/empresas.js';
import { initDepoimentos } from '../sections/depoimentos.js';
import { initButtonRipple } from '../components/buttonRipple.js';
import { initPlaceholderMedia } from '../components/placeholderMedia.js';
import { initMagnet } from '../components/magnet.js';
import { initScrollHandoff } from '../components/scrollHandoff.js';

export function initHome() {
  setupGsap();
  initSmoothScroll();
  initNavbar();
  initButtonRipple();

  // Sections that render their own markup from data first, so the
  // cross-cutting wiring below (placeholder fallbacks, scroll reveals)
  // sees the final DOM rather than missing dynamically-injected nodes.
  initEmpresas();
  initDepoimentos();

  initPlaceholderMedia();

  initHero();
  initSobre();
  initRodolfoCard();
  initFernanda();
  initDupla();
  initFormacoes();
  initNumeros();
  initEmpregabilidade();
  initSalario();

  // Connects the two founder sections into one gesture: as Rodolfo's card
  // scrolls out, Fernanda's portrait rises into place in the same breath.
  initScrollHandoff({
    outEl: qs('.rodolfo .flip-card'),
    inEl: qs('.fernanda__portrait'),
    trigger: qs('#fernanda'),
  });

  // Magnetic pull on the highest-stakes CTAs — replaces the plain CSS hover
  // lift on these specific buttons with a mouse-following one instead.
  qsa('.hero__actions .btn, .cta-final__actions .btn').forEach((btn) =>
    initMagnet(btn, { padding: 60, strength: 4 })
  );

  initRevealOnScroll();

  // Webfont swap can reflow text after triggers are first measured; resync once loaded.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
