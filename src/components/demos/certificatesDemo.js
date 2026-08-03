/**
 * Mostly static per the brief (certificates, MEC recognition) — the shine
 * sweep is pure CSS (@keyframes), already covered by the global
 * prefers-reduced-motion override in reset.css, so no JS branching needed.
 */
export function mountCertificates(container) {
  container.innerHTML = `
    <div class="demo-cert">
      <div class="demo-cert__card">
        <span class="demo-cert__badge">MEC</span>
        <strong>MBA em Inteligência Artificial</strong>
        <span class="demo-cert__meta">Certificação reconhecida</span>
        <span class="demo-cert__shine" aria-hidden="true"></span>
      </div>
    </div>
  `;
  return () => {};
}
