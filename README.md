# Julian Barberis — Portfolio de Desarrollador de Software

> Portfolio profesional bilingüe (Español / Inglés) con modo oscuro y claro, construido con **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4** y **Framer Motion**. Desplegado automáticamente en **GitHub Pages** mediante GitHub Actions.

---

## ✨ Características Principales

### 🎨 Diseño & Experiencia Visual
- **Modo Oscuro / Claro** con paleta Apple Glassmorphism: obsidiana profunda (`#05060d`), azul twilight (`#3744bd`) y rosa eléctrico (`#f8559f`), con persistencia en `localStorage`.
- **Superficies Apple Glass** con `backdrop-filter: blur(24px) saturate(190%)`, bordes especulares de 1px y sombras líquidas multicapa.
- **Microinteracciones** con física de resorte (`Framer Motion`): pastillas deslizantes, ciclo de subtítulos cinético y transiciones de layout animadas.
- **Contraste WCAG 2.1 AA** verificado matemáticamente en ambos modos.

### 🌐 Internacionalización (EN / ES)
- Cambio de idioma en tiempo real desde la barra de navegación.
- Traducciones completas en cada sección: Hero, Sobre mí, Experiencia, Educación, Habilidades, Proyectos y Contacto.
- Toda la información personal y de proyectos centralizada en [`src/data/portfolioData.ts`](src/data/portfolioData.ts).

### 🗂️ Secciones del Portfolio
| Sección | Descripción |
|---|---|
| **Hero** | Presentación con jerarquía tipográfica de alto impacto, badge de disponibilidad pulsante y tarjeta bento de arquitectura técnica |
| **Sobre mí** | Formación académica (UNSAM y Coderhouse), foto de perfil e historial educativo |
| **Experiencia** | Bento grid de trayectoria técnica: de proyectista eléctrico CAD a desarrollador de software con Clean Architecture |
| **Habilidades** | Matriz interactiva filtrable por categoría con iconos SVG de marca auténticos |
| **Proyectos** | Carrusel dual (modo Fluido con física magnética / modo Coverflow 3D) con modales de arquitectura detallados |
| **Contacto** | Formulario interactivo con validación, copia al portapapeles y animación confetti |

### 🛠️ Stack Tecnológico
| Capa | Tecnologías |
|---|---|
| **Framework** | Next.js 16.3 (App Router, exportación estática) |
| **UI** | React 19, Tailwind CSS v4, Framer Motion |
| **Lenguaje** | TypeScript estricto |
| **Tipografía** | Inter (`--font-sans`) + JetBrains Mono (`--font-mono`) vía `next/font/google` |
| **Íconos** | `react-icons/si`, Lucide React |
| **Deploy** | GitHub Actions → GitHub Pages |

---

## 🚀 Instalación y Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/jbarberis/portfolio.git
cd portfolio

# 2. Instalar dependencias (requiere pnpm)
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev

# 4. Abrir en el navegador
# http://localhost:3000
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

## ⚙️ Personalización del Contenido

Todo el contenido bilingüe está centralizado en un único archivo de configuración:

📁 **[`src/data/portfolioData.ts`](src/data/portfolioData.ts)**

### Agregar o actualizar un proyecto

```ts
{
  id: "mi-nuevo-proyecto",
  title: "Nombre del Proyecto",
  category: "Full-Stack", // "Full-Stack" | "Backend" | "Frontend" | "AI"
  year: "2026",
  featured: true,
  status: "live",          // "live" | "coming_soon" | "in_development"
  demoUrl: "https://mi-demo.com",     // undefined si el deploy está pendiente
  githubUrl: "https://github.com/jbarberis/mi-proyecto",
  tagline: {
    en: "Short English tagline",
    es: "Descripción corta en español",
  },
  description: {
    en: "Detailed English description...",
    es: "Descripción detallada en español...",
  },
  technologies: ["Kotlin", "Spring Boot", "React", "PostgreSQL", "Docker"],
  architectureHighlights: {
    en: ["Key technical feature 1", "Key technical feature 2"],
    es: ["Característica técnica clave 1", "Característica técnica clave 2"],
  },
  roadmap: {
    en: ["Step 1: Containerize API", "Step 2: Deploy to cloud"],
    es: ["Paso 1: Contenerizar API", "Paso 2: Desplegar en la nube"],
  }
}
```

---

## 🌍 Deploy en GitHub Pages (Gratis y Automatizado)

El repositorio incluye un workflow de GitHub Actions listo para usar en `.github/workflows/deploy.yml`.

### Pasos para desplegar

1. **Subir el código a GitHub:**
   ```bash
   git add .
   git commit -m "feat: primer despliegue del portfolio"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
   git push -u origin main
   ```

2. **Habilitar GitHub Pages en el repositorio:**
   - Ir a **Settings → Pages** (barra lateral izquierda).
   - En **Build and deployment → Source**, seleccionar **GitHub Actions**.

3. **¡Listo!** El workflow construirá el sitio estático y lo publicará automáticamente en:
   ```
   https://<tu-usuario>.github.io/<tu-repo>/
   ```

---

## 🔧 Scripts Disponibles

```bash
pnpm dev      # Servidor de desarrollo en http://localhost:3000
pnpm build    # Build de producción (exportación estática)
pnpm start    # Servidor de producción local
pnpm lint     # Verificación de ESLint (0 errores, 0 advertencias)
```

---

## 📬 Contacto

**Julian Barberis** — Desarrollador de Software · Buenos Aires, Argentina

- 📧 [jbarberis.tech@gmail.com](mailto:jbarberis.tech@gmail.com)
- 💼 [linkedin.com/in/julian-barberis](https://linkedin.com/in/julian-barberis)
- 🐙 [github.com/jbarberis](https://github.com/jbarberis)
