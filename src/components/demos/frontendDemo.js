import { prefersReducedMotion } from '../../core/reducedMotion.js';

const STAGES = [
  { label: 'HTML', code: '<div class="card">' },
  { label: 'CSS', code: 'border-radius: 16px;' },
  { label: 'JavaScript', code: 'card.classList.add("active")' },
  { label: 'React', code: '<Card active />' },
];

export function mountFrontend(container) {
  container.innerHTML = `
    <div class="demo-frontend">
      <div class="demo-frontend__code">
        <span class="demo-frontend__tag"></span>
        <code></code>
      </div>
      <div class="demo-frontend__preview">
        <div class="demo-frontend__box"></div>
      </div>
    </div>
  `;

  const tagEl = container.querySelector('.demo-frontend__tag');
  const codeEl = container.querySelector('.demo-frontend__code code');
  const box = container.querySelector('.demo-frontend__box');

  let i = 0;
  const step = () => {
    const stage = STAGES[i % STAGES.length];
    tagEl.textContent = stage.label;
    codeEl.textContent = stage.code;
    box.className = `demo-frontend__box is-stage-${i % STAGES.length}`;
    i += 1;
  };

  step();
  if (prefersReducedMotion()) return () => {};

  const timer = setInterval(step, 1400);
  return () => clearInterval(timer);
}
