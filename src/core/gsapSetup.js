import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function setupGsap() {
  if (registered) return gsap;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger };
