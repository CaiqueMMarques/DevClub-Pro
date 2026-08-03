/**
 * Delegated ripple for every .btn on the page, present now or mounted later
 * (e.g. inside a Formações demo). One listener, no per-button wiring.
 */
export function initButtonRipple(root = document) {
  root.addEventListener('pointerdown', (event) => {
    const btn = event.target.closest('.btn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--rx', `${event.clientX - rect.left}px`);
    btn.style.setProperty('--ry', `${event.clientY - rect.top}px`);

    btn.classList.remove('is-rippling');
    // eslint-disable-next-line no-unused-expressions
    btn.offsetWidth; // restart the CSS transition if clicked again quickly
    btn.classList.add('is-rippling');
  });
}
