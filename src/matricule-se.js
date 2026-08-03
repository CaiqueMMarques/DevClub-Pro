import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import './styles/main.css';
import './styles/sections/matricule.css';

import { initButtonRipple } from './components/buttonRipple.js';
import { initMatriculeSe } from './pages/matriculeSe.js';

initButtonRipple();
initMatriculeSe();
