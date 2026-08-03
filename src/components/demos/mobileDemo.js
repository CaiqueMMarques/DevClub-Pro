import { prefersReducedMotion } from '../../core/reducedMotion.js';

const SCREENS = [
  { title: 'DevClub App', body: 'Bem-vindo de volta!' },
  { title: 'Formações', body: 'Front-end, Back-end e Mobile.' },
];

export function mountMobile(container) {
  container.innerHTML = `
    <div class="demo-mobile">
      <div class="demo-mobile__frame">
        <div class="demo-mobile__notch"></div>
        <div class="demo-mobile__screen is-visible">
          <strong></strong>
          <span></span>
        </div>
      </div>
    </div>
  `;

  const screenEl = container.querySelector('.demo-mobile__screen');
  const titleEl = screenEl.querySelector('strong');
  const bodyEl = screenEl.querySelector('span');

  let i = 0;
  const render = () => {
    const screen = SCREENS[i % SCREENS.length];
    titleEl.textContent = screen.title;
    bodyEl.textContent = screen.body;
  };
  render();

  if (prefersReducedMotion()) return () => {};

  const timer = setInterval(() => {
    screenEl.classList.remove('is-visible');
    setTimeout(() => {
      i += 1;
      render();
      screenEl.classList.add('is-visible');
    }, 260);
  }, 2200);

  return () => clearInterval(timer);
}
