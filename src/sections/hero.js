import { gsap } from '../core/gsapSetup.js';
import { qs, qsa } from '../core/dom.js';
import { splitWords } from '../core/splitText.js';
import { prefersReducedMotion } from '../core/reducedMotion.js';
import { initHeroCycle } from '../components/heroCycle.js';

const PARTICLE_COUNT_DESKTOP = 46;
const PARTICLE_COUNT_MOBILE = 20;

export function initHero(root = document) {
  const hero = qs('.hero', root);
  if (!hero) return;

  gsap.context(() => {
    animateEntrance(hero);
    initHeroCycle(qs('.hero__cycle', hero));
    initParticles(hero);
    initCodeParallax(hero);
    initScrollExit(hero);
  }, hero);
}

function animateEntrance(hero) {
  const mark = qs('.hero__mark', hero);
  const headlineStatic = qs('.hero__headline-static', hero);
  const cycle = qs('.hero__cycle', hero);
  const subtitle = qs('.hero__subtitle', hero);
  const actions = qsa('.hero__actions .btn', hero);

  if (prefersReducedMotion()) {
    gsap.set([mark, headlineStatic, cycle, subtitle, ...actions], { opacity: 1, y: 0, scale: 1 });
    return;
  }

  // The cycling word (.hero__cycle) is deliberately excluded from the split —
  // splitWords rebuilds innerHTML from textContent, which would flatten it
  // and hand its typing loop a static string instead. It gets its own simple
  // fade-in below and its own infinite typewriter loop (see initHeroCycle).
  const words = splitWords(headlineStatic);
  gsap.set(words, { yPercent: 110 });
  gsap.set(mark, { opacity: 0, scale: 0.7 });
  gsap.set(cycle, { opacity: 0, y: 14 });
  gsap.set(subtitle, { opacity: 0, y: 24 });
  gsap.set(actions, { opacity: 0, y: 18 });

  gsap
    .timeline({ delay: 0.15 })
    .to(mark, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' })
    .to(words, { yPercent: 0, duration: 0.85, stagger: 0.06, ease: 'power4.out' }, '-=0.35')
    .to(cycle, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to(subtitle, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45')
    .to(actions, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
    .add(() => breathe(mark), '-=0.1');
}

function breathe(mark) {
  gsap.to(mark, {
    scale: 1.05,
    y: -6,
    duration: 2.6,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

function initParticles(hero) {
  const canvas = qs('.hero__particles', hero);
  if (!canvas || prefersReducedMotion()) return;

  const ctx2d = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;
  let running = false;

  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    const count = isMobile() ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      a: 0.25 + Math.random() * 0.4,
    }));
  }

  function draw() {
    ctx2d.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx2d.beginPath();
      ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx2d.fillStyle = `rgba(0, 229, 255, ${p.a})`;
      ctx2d.shadowColor = 'rgba(0, 229, 255, 0.8)';
      ctx2d.shadowBlur = 6;
      ctx2d.fill();
    });
    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(draw);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  resize();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && document.visibilityState === 'visible') start();
      else stop();
    },
    { threshold: 0.05 }
  ).observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') stop();
    else if (hero.getBoundingClientRect().bottom > 0) start();
  });
}

function initCodeParallax(hero) {
  if (prefersReducedMotion()) return;
  const snippets = qsa('.hero__code', hero);
  if (!snippets.length) return;

  let rafId = null;
  let pointerX = 0;
  let pointerY = 0;

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    if (!rafId) rafId = requestAnimationFrame(apply);
  });

  function apply() {
    snippets.forEach((el) => {
      const depth = parseFloat(el.dataset.depth ?? '40');
      el.style.transform = `translate(${pointerX * depth}px, ${pointerY * depth}px)`;
    });
    rafId = null;
  }
}

function initScrollExit(hero) {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const bg = qs('.hero__bg', hero);
    gsap.to(bg, {
      yPercent: 12,
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}
