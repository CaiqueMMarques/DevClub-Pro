import anime from 'animejs';
import { prefersReducedMotion } from '../../core/reducedMotion.js';

const STEPS = ['HTML', 'CSS', 'JS', 'React', 'Node.js', 'DB', 'Deploy'];

export function mountPipeline(container) {
  container.innerHTML = `<div class="demo-pipeline">${STEPS.map(
    (step) => `<span class="demo-pipeline__chip">${step}</span>`
  ).join('<span class="demo-pipeline__arrow">&#8250;</span>')}</div>`;

  const chips = container.querySelectorAll('.demo-pipeline__chip');

  if (prefersReducedMotion()) {
    chips.forEach((chip) => chip.classList.add('is-active'));
    return () => {};
  }

  const anim = anime({
    targets: chips,
    keyframes: [
      { backgroundColor: 'rgba(0,229,255,0.18)', color: '#00E5FF', borderColor: 'rgba(0,229,255,0.5)' },
      { backgroundColor: 'rgba(255,255,255,0.03)', color: '#BDBDBD', borderColor: 'rgba(255,255,255,0.08)' },
    ],
    duration: 900,
    delay: anime.stagger(320),
    loop: true,
    easing: 'easeInOutQuad',
  });

  return () => anim.pause();
}
