import anime from 'animejs';
import { prefersReducedMotion } from '../../core/reducedMotion.js';

export function mountBackend(container) {
  container.innerHTML = `
    <div class="demo-backend">
      <div class="demo-backend__nodes">
        <span class="demo-backend__node">Cliente</span>
        <span class="demo-backend__node">Node/Express</span>
        <span class="demo-backend__node">Banco de dados</span>
      </div>
      <div class="demo-backend__track"><div class="demo-backend__dot"></div></div>
      <div class="demo-backend__json">{ "status": 200 }</div>
    </div>
  `;

  const dot = container.querySelector('.demo-backend__dot');
  const json = container.querySelector('.demo-backend__json');

  if (prefersReducedMotion()) {
    json.classList.add('is-visible');
    return () => {};
  }

  const tl = anime.timeline({ loop: true, easing: 'easeInOutQuad' });
  tl.add({ targets: dot, left: ['0%', '100%'], duration: 900 })
    .add({ targets: json, opacity: [0, 1], translateY: [8, 0], duration: 400 })
    .add({ targets: dot, left: ['100%', '0%'], duration: 900, delay: 500 })
    .add({ targets: json, opacity: [1, 0], duration: 300 }, '-=200');

  return () => tl.pause();
}
