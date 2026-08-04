<div align="center">

# DevClub — Landing Page

**"Do zero ao profissional em tecnologia"**

Landing page institucional recriada com JavaScript puro, animações avançadas com GSAP e uma arquitetura modular por seções — sem frameworks de UI.

[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![License](https://img.shields.io/badge/license-Unlicensed-lightgrey)](#-licença)

</div>

---

## 📖 Sobre

Este projeto é uma recriação da landing page da **DevClub**, focada em reproduzir fielmente as microinterações, animações de rolagem e transições de uma página institucional de alto padrão visual — usando apenas HTML, CSS e JavaScript organizados em módulos ES.

Não há framework de componentes (React, Vue, etc.): cada seção da página é um módulo independente que monta seu próprio DOM, registra suas animações e se conecta ao restante da aplicação através de funções `init*()` explícitas.

## ✨ Funcionalidades

- **Animações orientadas a scroll** com [GSAP](https://gsap.com/) + `ScrollTrigger` (reveals, pinos, transições encadeadas entre seções)
- **Smooth scroll** com [Lenis](https://github.com/darkroomengineering/lenis)
- **Efeitos de texto**: split text, word reveal e animações de digitação/troca de linhas
- **Componentes interativos**: cards com flip 3D, tilt no mouse, botões com efeito ripple, elementos "magnéticos" que seguem o cursor
- **Demos animadas por área** (frontend, backend, mobile, pipeline, certificados) renderizadas dinamicamente
- **Marquees infinitos** para logos de empresas parceiras e depoimentos
- **Conteúdo orientado a dados**: empresas, depoimentos e tecnologias vêm de módulos de dados isolados (`src/data`), facilitando manutenção
- **Respeito à acessibilidade de movimento**: animações desativadas/reduzidas quando `prefers-reduced-motion` está ativo
- **Página secundária** de matrícula (`matricule-se.html`) com sua própria sequência de texto animado
- **SEO básico**: meta tags Open Graph, `robots.txt` e `sitemap.xml`

## 🛠️ Stack

| Categoria | Tecnologia |
| --- | --- |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Linguagem | JavaScript (ES Modules) |
| Animação | [GSAP](https://gsap.com/) (+ ScrollTrigger), [anime.js](https://animejs.com/), [Motion](https://motion.dev/) |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Tipografia | [Inter Variable](https://fontsource.org/fonts/inter), [Space Grotesk Variable](https://fontsource.org/fonts/space-grotesk), [JetBrains Mono](https://fontsource.org/fonts/jetbrains-mono) (via Fontsource) |
| Ícones | [Simple Icons](https://simpleicons.org/) |
| Estilos | CSS puro (tokens, componentes e seções organizados por arquivo) |

## 📁 Estrutura de pastas

```
DevClub Pro/
├── index.html              # Página principal (landing page)
├── matricule-se.html        # Página de matrícula
├── vite.config.js           # Configuração do Vite (multi-page build)
├── public/                  # Assets estáticos servidos como estão
│   └── images/               # logo, empresas, time, depoimentos
└── src/
    ├── main.js               # Entry point da landing page
    ├── matricule-se.js        # Entry point da página de matrícula
    ├── core/                  # Infra reaproveitável (scroll, DOM, GSAP setup, etc.)
    ├── components/            # Peças de UI reutilizáveis (cards, chips, demos, ripple...)
    ├── sections/               # Uma seção da landing page por arquivo (hero, navbar, salario...)
    ├── pages/                  # Orquestração de cada página (home, matriculeSe)
    ├── data/                   # Conteúdo estruturado (empresas, depoimentos, tecnologias)
    └── styles/                 # CSS: tokens, base, componentes e seções
```

## 🚀 Como rodar

**Pré-requisitos:** [Node.js](https://nodejs.org/) 18+ e npm.

```bash
# Clonar o repositório
git clone https://github.com/CaiqueMMarques/DevClub-Pro.git
cd DevClub-Pro

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Acesse a URL exibida no terminal (por padrão `http://localhost:5173`).

## 📦 Build & Deploy

```bash
# Gerar build de produção (index.html + matricule-se.html)
npm run build

# Pré-visualizar o build de produção localmente
npm run preview
```

Os arquivos otimizados são gerados na pasta `dist/`, prontos para deploy em qualquer hospedagem de arquivos estáticos (Vercel, Netlify, GitHub Pages, etc.).

## 🤝 Contribuindo

Contribuições são bem-vindas! Para propor uma mudança:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Faça commit das suas alterações (`git commit -m 'feat: minha feature'`)
4. Faça push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é uma recriação com fins de estudo/portfólio e não possui afiliação oficial com a DevClub. Todos os direitos sobre a marca e o conteúdo original pertencem aos seus respectivos donos.

---

<div align="center">

Feito por [Caique Marques](https://github.com/CaiqueMMarques)

</div>
