# Julian Barberis — Software Developer Portfolio (GTA VI Edition) 🌴🌆

A modern, high-performance, bilingual (English / Spanish) developer portfolio with Dark / Light mode, styled with the vibrant color palette and aesthetic of **GTA VI (Vice City)**.

Built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**, optimized for static export and automated deployment to **GitHub Pages**.

---

## 🎨 GTA 6 Color Palette

| Token | Hex | Role |
|---|---|---|
| `--ocean-twilight` | `#3744bd` | Deep Indigo / Electric Twilight Accent & Buttons |
| `--deep-pink` | `#f8559f` | Vice City Neon Pink Glows, Badges & Highlights |
| `--ruby-red` | `#a31621` | Crimson Ruby Accents & Danger / Status Highlights |
| `--dust-grey` | `#dbcdc6` | Muted Warm Grey & Secondary Details |
| `--porcelain` | `#fbfef9` | Crisp Porcelain Text & Light Mode Canvas |

---

## 🌟 Key Features

1. **Light & Dark Mode**:
   - **Dark Mode**: Atmospheric Vice City Cyber Night with glowing neon borders, ambient gradient blurs, and glassmorphism.
   - **Light Mode**: Ultra-crisp porcelain background with soft tinted borders and high-contrast indigo typography.
   - Persistent across reloads via `localStorage`.

2. **Bilingual Support (EN / ES)**:
   - Real-time language switch button (🇺🇸 EN / 🇦🇷 ES) in the navigation bar.
   - Complete translations for every section: Hero, About, Experience (M-Electrica), Education (UNSAM & Coderhouse), Skills, Projects, and Contact.

3. **CV Integration**:
   - **Education**: UNSAM Associate Degree in Computer Programming (Tecnicatura Universitaria en Programación Informática, 2023–2026) and Coderhouse Full Stack Certification.
   - **Experience**: AutoCAD Electrical Drafter at M-Electrica (50+ blueprints, panel layouts, technical compliance).
   - **Skills**: Filterable matrix spanning Frontend, Backend & Databases, DevOps & Tools, and AI Integration.

4. **Smart Project Showcase**:
   - Includes featured projects (*BookLibre* DDD platform, *SQLify* AI SQL Generator, *GTA VI Portfolio*).
   - Dynamic **Deployment Status**:
     - `Live Demo`: Directly opens deployed apps.
     - `Deploy in Progress`: Opens an interactive **Project Architecture & Deployment Roadmap Modal** instead of a dead link.

5. **Direct Contact & Copy-to-Clipboard**:
   - 1-click email copy button (`jbarberis.tech@gmail.com`) with instant toast feedback.
   - Interactive message form with celebratory confetti animation.

---

## 🚀 Getting Started (Local Development)

```bash
# 1. Install dependencies
pnpm install

# 2. Start the local development server
pnpm dev

# 3. Open http://localhost:3000 in your browser
```

---

## 📦 How to Deploy to GitHub Pages (100% Free & Automated)

This repository includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Steps to Deploy:
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: GTA 6 bilingual developer portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub.
   - Click on **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.

3. **That's it!** GitHub Actions will automatically build the static website and deploy it to `https://<your-username>.github.io/<your-repo-name>/`.

---

## ⚙️ How to Customize Your Content & Projects

All bilingual texts, personal info, education, skills, and projects are centralized in a single configuration file:

📁 **[`src/data/portfolioData.ts`](src/data/portfolioData.ts)**

### Adding or Updating a Project:
```ts
{
  id: "my-new-project",
  title: "Project Name",
  category: "Full-Stack", // "Full-Stack" | "Backend" | "Frontend" | "AI"
  year: "2026",
  featured: true,
  status: "live", // "live" | "coming_soon" | "in_development"
  demoUrl: "https://my-live-demo.com", // Set to undefined if deploy is pending
  githubUrl: "https://github.com/jbarberis/my-project",
  tagline: {
    en: "Short English tagline",
    es: "Descripción corta en español",
  },
  description: {
    en: "Detailed English overview...",
    es: "Descripción detallada en español...",
  },
  technologies: ["Kotlin", "Spring Boot", "React", "PostgreSQL", "Docker"],
  architectureHighlights: {
    en: ["Key technical feature 1", "Key technical feature 2"],
    es: ["Característica técnica clave 1", "Característica técnica clave 2"],
  },
  roadmap: {
    en: ["Step 1: Containerizing API", "Step 2: Deploying to cloud"],
    es: ["Paso 1: Contenerizando API", "Paso 2: Desplegando en la nube"],
  }
}
```

---

## 💡 Note on Next.js vs. NestJS

- **Next.js** (used here): Leading React framework for building frontend applications, static websites (perfect for GitHub Pages), and full-stack React apps.
- **NestJS**: Backend Node.js framework for architecting scalable REST APIs, microservices, and server-side logic (often paired with PostgreSQL, Docker, and Spring Boot / Kotlin principles).
