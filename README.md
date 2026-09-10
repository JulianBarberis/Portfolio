# Julian Barberis — Software Developer Portfolio

[![Deploy](https://github.com/JulianBarberis/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/JulianBarberis/Portfolio/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

> Portfolio profesional bilingüe (Español / Inglés) de alto rendimiento con modo oscuro y claro, construido con **Next.js 16 (Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS v4** y **Framer Motion**. Desplegado automáticamente en **GitHub Pages**.

🌐 **Sitio en vivo:** [https://julianbarberis.github.io/Portfolio/](https://julianbarberis.github.io/Portfolio/)

---

## ✨ Características Principales

### 🎨 Diseño & Experiencia Visual
- **Modo Oscuro / Claro** con paleta Apple Glassmorphism: obsidiana profunda (`#05060d`), azul twilight (`#3744bd`) y rosa eléctrico (`#f8559f`), con persistencia en `localStorage` sin parpadeo (FOUC).
- **Superficies Apple Glass** con `backdrop-filter: blur(24px) saturate(190%)`, bordes especulares y sombras líquidas dinámicas.
- **Microinteracciones** con física de resorte (`Framer Motion`): pastillas deslizantes, ciclo de subtítulos cinético y transiciones animadas fluidas.
- **Accesibilidad**: Contraste verificado según **WCAG 2.1 AA** en ambos modos y navegación completa por teclado.

### 🌐 Internacionalización (EN / ES)
- Cambio de idioma instantáneo en tiempo real sin recarga.
- Traducciones completas en cada sección: Hero, Sobre mí, Experiencia, Habilidades, Proyectos y Contacto.
- Toda la información desacoplada y centralizada en [`src/data/portfolioData.ts`](src/data/portfolioData.ts).

### 🗂️ Secciones del Portfolio
| Sección | Descripción |
|---|---|
| **Hero** | Presentación de alto impacto con badge de disponibilidad pulsante y tarjeta bento de arquitectura técnica |
| **Sobre mí** | Perfil profesional, formación académica (UNSAM, Coderhouse) y trayectoria |
| **Experiencia** | Bento grid con línea de tiempo y transición de proyectista eléctrico CAD a desarrollador de software con Clean Architecture |
| **Habilidades** | Matriz interactiva de tecnologías con filtrado por categoría e íconos de marca |
| **Proyectos** | Carrusel dual (modo Fluido con física magnética / modo Coverflow 3D) con modales de arquitectura detallados y enlaces seguros |
| **Contacto** | Formulario interactivo con saneamiento de entradas, copia rápida al portapapeles y animación confetti |

### 🛠️ Stack Tecnológico
| Capa | Tecnologías |
|---|---|
| **Framework** | Next.js 16.3 (App Router, exportación estática con Turbopack) |
| **UI** | React 19, Tailwind CSS v4, Framer Motion |
| **Lenguaje** | TypeScript 5.9 (modo estricto) |
| **Tipografía** | Inter (`--font-sans`) + JetBrains Mono (`--font-mono`) vía `next/font/google` |
| **Íconos** | `react-icons/si`, Lucide React |
| **Seguridad** | Doble capa CSP (headers + meta tags), sanitización WHATWG de URLs y headers HTTP estrictos |
| **Deploy** | GitHub Actions → GitHub Pages |

---

## 🚀 Instalación y Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/JulianBarberis/Portfolio.git
cd Portfolio

# 2. Instalar dependencias (requiere pnpm)
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev

# 4. Compilar para producción (exportación estática)
pnpm build

# 5. Ejecutar linter
pnpm lint
```

> **Requisitos:** Node.js ≥ 20 y pnpm ≥ 9.

---

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Tokens CSS: paleta, Apple Glass, tipografía
│   ├── layout.tsx           # Configuración de fuentes (Inter + JetBrains Mono)
│   └── page.tsx             # Composición de secciones
├── components/
│   ├── Hero.tsx             # Sección hero con bento de arquitectura
│   ├── About.tsx            # Formación académica + foto de perfil
│   ├── Experience.tsx       # Bento grid de trayectoria técnica
│   ├── Skills.tsx           # Matriz interactiva de habilidades
│   ├── Projects.tsx         # Escaparate de proyectos + selector de carrusel
│   ├── Contact.tsx          # Formulario de contacto + redes sociales
│   ├── Navbar.tsx           # Navbar flotante con switcher de idioma y tema
│   ├── Footer.tsx           # Footer minimalista
│   ├── TechIcon.tsx         # Íconos SVG de marcas tecnológicas
│   └── carousel/
│       ├── CoverflowCarousel.tsx    # Carrusel 3D estilo coverflow
│       └── ProjectCard.tsx          # Tarjeta de proyecto individual
├── context/
│   ├── LanguageContext.tsx  # Contexto global de idioma (EN/ES)
│   └── ThemeContext.tsx     # Contexto global de tema (dark/light)
└── data/
    ├── portfolioData.ts     # Única fuente de verdad para todo el contenido
    └── types.ts             # Tipos TypeScript del portfolio
```

---

## 📬 Contacto & Redes

**Julian Barberis** — Desarrollador de Software · Buenos Aires, Argentina

- 🌐 **Portfolio:** [julianbarberis.github.io/Portfolio](https://julianbarberis.github.io/Portfolio/)
- 💼 **LinkedIn:** [linkedin.com/in/julian-barberis](https://www.linkedin.com/in/julian-barberis/)
- 🐙 **GitHub:** [github.com/JulianBarberis](https://github.com/JulianBarberis)
- 📧 **Email:** [jbarberis.tech@gmail.com](mailto:jbarberis.tech@gmail.com)

