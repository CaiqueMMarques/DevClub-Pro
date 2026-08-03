import { mountPipeline } from './pipelineDemo.js';
import { mountFrontend } from './frontendDemo.js';
import { mountBackend } from './backendDemo.js';
import { mountMobile } from './mobileDemo.js';
import { mountCertificates } from './certificatesDemo.js';

const REGISTRY = {
  pipeline: mountPipeline,
  frontend: mountFrontend,
  backend: mountBackend,
  mobile: mountMobile,
  certificates: mountCertificates,
};

/** Single contract every Formações card relies on: mountDemo(type, el) -> destroy() */
export function mountDemo(type, container) {
  const mount = REGISTRY[type];
  if (!mount) return () => {};
  return mount(container);
}
