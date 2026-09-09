import { PortfolioData } from "./types";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Julian Barberis",
    title: {
      en: "Software Developer",
      es: "Desarrollador de Software",
    },
    subtitles: {
      en: [
        "Backend APIs • Kotlin & Spring Boot",
        "Modern Frontends • React & TypeScript",
        "Clean Architecture & Docker Systems",
        "AI Integration & LLM Workflows",
      ],
      es: [
        "APIs Backend • Kotlin & Spring Boot",
        "Frontends Modernos • React & TypeScript",
        "Arquitectura Limpia & Entornos Docker",
        "Integración de IA & Flujos con LLMs",
      ],
    },
    location: {
      en: "Buenos Aires, Argentina",
      es: "Buenos Aires, Argentina",
    },
    email: "jbarberis.tech@gmail.com",
    statusBadge: {
      en: "Available for new opportunities",
      es: "Disponible para nuevas oportunidades",
    },
    shortBio: {
      en: "Im a Software Developer. Building scalable backends with Kotlin & JAVA with Spring Boot, modern interfaces with React, Next & TypeScript, and containerized Docker systems.",
      es: "Soy Desarrollador de Software. Construyo backends escalables en Kotlin & JAVA con Spring Boot, interfaces modernas en React, Next & TypeScript y sistemas en Docker.",
    },
    fullBio: {
      en: [
        "Computer Programming student at Universidad Nacional de San Martín (UNSAM) with strong foundations in algorithms, database design, and Clean Architecture.",
        "Experienced building robust backend services (Kotlin, Spring Boot, Node.js, NestJS), relational databases (PostgreSQL, MySQL), and fluid interfaces with React and TypeScript.",
        "Technical engineering background drafting precision CAD blueprints and technical documentation at M-Electrica.",
      ],
      es: [
        "Desarrollador de Software recibido en la Universidad Nacional de San Martín (UNSAM) con sólida formación en algoritmos, bases de datos y Clean Architecture.",
        "Experiencia en servicios backend robustos (Kotlin, Spring Boot, Node.js, NestJS), bases de datos (PostgreSQL, MySQL, MongoDB) e interfaces fluidas en React, Next TypeScript.",
        "Experiencia previa en ingeniería técnica elaborando planos de precisión CAD y documentación en M-Electrica.",
      ],
    },
    social: {
      github: "https://github.com/JulianBarberis",
      linkedin: "https://www.linkedin.com/in/julian-barberis/",
      email: "mailto:jbarberis.tech@gmail.com",
    },
    stats: [
      {
        value: "50+",
        suffix: "",
        label: {
          en: "Technical Blueprints",
          es: "Planos Técnicos",
        },
      },
      {
        value: "4+",
        suffix: "yrs",
        label: {
          en: "Coding & Engineering",
          es: "Años en Código e Ingeniería",
        },
      },
      {
        value: "UNSAM",
        suffix: "",
        label: {
          en: "Computer Programming",
          es: "Programación Informática",
        },
      },
      {
        value: "100%",
        suffix: "",
        label: {
          en: "Code Quality & Compliance",
          es: "Calidad y Cumplimiento",
        },
      },
    ],
  },
  navigation: {
    about: { en: "About", es: "Sobre mí" },
    skills: { en: "Skills", es: "Habilidades" },
    experience: { en: "Experience", es: "Experiencia" },
    education: { en: "Education", es: "Educación" },
    projects: { en: "Projects", es: "Proyectos" },
    contact: { en: "Contact", es: "Contacto" },
    cvButton: { en: "CV", es: "CV" },
  },
  education: [
    {
      id: "unsam",
      institution: {
        en: "UNSAM (Universidad Nacional de San Martín)",
        es: "UNSAM (Universidad Nacional de San Martín)",
      },
      degree: {
        en: "Associate Degree in Computer Programming",
        es: "Tecnicatura Universitaria en Programación Informática",
      },
      period: {
        en: "2023 – 2026",
        es: "2023 – 2026",
      },
      status: {
        en: "Graduated",
        es: "Graduado",
      },
      location: {
        en: "Buenos Aires, Argentina",
        es: "Buenos Aires, Argentina",
      },
      badge: {
        en: "University",
        es: "Universidad",
      },
      description: {
        en: "Core computer science fundamentals, algorithms, relational/NoSQL databases, networking, and clean code paradigms.",
        es: "Fundamentos de computación, algoritmos, bases de datos SQL/NoSQL, redes y paradigmas de código limpio.",
      },
      highlights: {
        en: [
          "Algorithms, Data Structures & Complexity Analysis",
          "Relational Database Modeling, SQL & Indexing",
          "Computer Networks, Protocols & Sockets",
          "Clean Architecture & OOP (SOLID)",
        ],
        es: [
          "Algoritmos, Estructuras de Datos y Complejidad",
          "Modelado de Bases de Datos Relacionales, SQL e Índices",
          "Redes de Computadoras, Protocolos y Sockets",
          "Arquitectura Limpia y POO (SOLID)",
        ],
      },
    },
    {
      id: "coderhouse",
      institution: {
        en: "Coderhouse",
        es: "Coderhouse",
      },
      degree: {
        en: "Full Stack Developer Certification",
        es: "Certificación Desarrollador Full Stack",
      },
      period: {
        en: "2023",
        es: "2023",
      },
      status: {
        en: "Graduated",
        es: "Graduado",
      },
      location: {
        en: "Remote",
        es: "Remoto",
      },
      badge: {
        en: "Certification",
        es: "Certificación",
      },
      description: {
        en: "Practical full-stack development covering React, Node.js APIs, asynchronous data, and Git workflows.",
        es: "Desarrollo full-stack práctico con React, APIs en Node.js, datos asíncronos y flujos Git.",
      },
      highlights: {
        en: [
          "React Component Architecture & Hooks",
          "Node.js & Express RESTful APIs",
          "MongoDB & SQL Integration",
          "Git Version Control & Workflows",
        ],
        es: [
          "Arquitectura de Componentes React & Hooks",
          "APIs RESTful con Node.js & Express",
          "Integración con MongoDB & SQL",
          "Control de Versiones y Flujos con Git",
        ],
      },
    },
  ],
  experience: [
    {
      id: "m-electrica",
      company: "M-Electrica",
      role: {
        en: "AutoCAD Electrical Drafter",
        es: "Proyectista Eléctrico AutoCAD",
      },
      period: {
        en: "Aug 2022 – Present",
        es: "Ago 2022 – Presente",
      },
      location: {
        en: "Buenos Aires, Argentina",
        es: "Buenos Aires, Argentina",
      },
      type: {
        en: "Engineering Drafting",
        es: "Ingeniería Técnica",
      },
      description: {
        en: "Technical blueprint drafting and engineering documentation for residential and commercial infrastructure.",
        es: "Diseño técnico de planos y documentación de ingeniería para infraestructura residencial y comercial.",
      },
      highlights: {
        en: [
          "Drafted comprehensive blueprints for 50+ residential and commercial buildings.",
          "Designed topographic electrical panel layouts ensuring 100% safety compliance.",
          "Conducted rigorous technical tracking matching on-site execution with project scope.",
        ],
        es: [
          "Elaboración de planos integrales para más de 50 edificios residenciales y comerciales.",
          "Diseño topográfico de tableros eléctricos con 100% de cumplimiento normativo.",
          "Seguimiento técnico riguroso asegurando la exacta ejecución en obra.",
        ],
      },
      skills: ["AutoCAD", "Blueprint Drafting", "Safety Compliance", "QA Tracking"],
    },
  ],
  skillCategories: [
    {
      id: "languages",
      title: {
        en: "Languages",
        es: "Lenguajes",
      },
      iconName: "Code2",
      description: {
        en: "Core programming and scripting languages.",
        es: "Lenguajes de programación y scripting.",
      },
      skills: [
        { name: "Kotlin", featured: true, category: "languages" },
        { name: "Java", featured: true, category: "languages" },
        { name: "TypeScript", featured: true, category: "languages" },
        { name: "JavaScript", featured: true, category: "languages" },
        { name: "Python", featured: false, category: "languages" },
        { name: "C / C++", featured: false, category: "languages" },
        { name: "SQL", featured: true, category: "languages" },
        { name: "HTML5 / CSS3", featured: false, category: "languages" },
      ],
    },
    {
      id: "frameworks",
      title: {
        en: "Frameworks / Libraries",
        es: "Frameworks / Librerías",
      },
      iconName: "Layout",
      description: {
        en: "Modern frontend and backend frameworks.",
        es: "Frameworks modernos de backend y frontend.",
      },
      skills: [
        { name: "Spring Boot", featured: true, category: "frameworks" },
        { name: "React", featured: true, category: "frameworks" },
        { name: "Next.js", featured: true, category: "frameworks" },
        { name: "NestJS", featured: true, category: "frameworks" },
        { name: "Node.js", featured: true, category: "frameworks" },
        { name: "Svelte", featured: true, category: "frameworks" },
        { name: "Tailwind CSS", featured: true, category: "frameworks" },
        { name: "Material UI", featured: false, category: "frameworks" },
        { name: "Chakra UI", featured: false, category: "frameworks" },
      ],
    },
    {
      id: "databases",
      title: {
        en: "Databases",
        es: "Bases de Datos",
      },
      iconName: "Database",
      description: {
        en: "Relational, document, and cache storage.",
        es: "Almacenamiento relacional, documental y caché.",
      },
      skills: [
        { name: "PostgreSQL", featured: true, category: "databases" },
        { name: "MySQL", featured: false, category: "databases" },
        { name: "MongoDB", featured: false, category: "databases" },
        { name: "Redis", featured: false, category: "databases" },
        { name: "GraphQL", featured: false, category: "databases" },
      ],
    },
    {
      id: "devops",
      title: {
        en: "Cloud / DevOps",
        es: "Cloud / DevOps",
      },
      iconName: "Terminal",
      description: {
        en: "Containerization, CI/CD, and infrastructure.",
        es: "Contenerización, CI/CD e infraestructura.",
      },
      skills: [
        { name: "Docker Compose", featured: true, category: "devops" },
        { name: "Git & GitHub", featured: true, category: "devops" },
        { name: "GitHub Actions", featured: true, category: "devops" },
        { name: "Postman", featured: false, category: "devops" },
      ],
    },
    {
      id: "ai",
      title: {
        en: "AI & Architecture",
        es: "IA & Arquitectura",
      },
      iconName: "Sparkles",
      description: {
        en: "LLMs, prompt engineering, and clean system architecture.",
        es: "LLMs, prompt engineering y arquitectura de software.",
      },
      skills: [
        { name: "Clean Architecture", featured: true, category: "ai" },
        { name: "DDD (Domain-Driven)", featured: true, category: "ai" },
        { name: "Spec Driven Development", featured: true, category: "ai" },
        { name: "Prompt Engineering", featured: true, category: "ai" },
        { name: "Gemini AI API", featured: true, category: "ai" },
        { name: "OpenAI / Claude APIs", featured: false, category: "ai" },
        { name: "Context Injection", featured: false, category: "ai" },
      ],
    },
  ],
  projects: [
    {
      id: "studyquest",
      title: "StudyQuest",
      category: "Full-Stack",
      year: "2026",
      featured: true,
      status: "in_development",
      demoUrl: undefined,
      githubUrl: "https://github.com/LorenGrz/StudyQuest",
      tagline: {
        en: "Collaborative Study Platform with Real-Time Matchmaking & AI-Generated Quests",
        es: "Plataforma de estudio colaborativo con matchmaking en tiempo real y quests generados por IA",
      },
      description: {
        en: "Full-stack collaborative study platform with real-time party matchmaking, study rooms, enriched chat, and AI-generated quizzes from notes or PDF files. Features a competitive ELO system, gamified leagues, leaderboards, and skill trees built with NestJS, React, PostgreSQL and WebSockets.",
        es: "Plataforma full-stack de estudio colaborativo con matchmaking en tiempo real, salas de estudio (parties), chat enriquecido y quizzes/quests generados dinámicamente por IA a partir de apuntes o PDFs. Incluye sistema ELO competitivo, ligas gamificadas, leaderboards y árbol de habilidades — NestJS, React, PostgreSQL y WebSockets.",
      },
      technologies: [
        "NestJS",
        "TypeScript",
        "React 19",
        "PostgreSQL",
        "TypeORM",
        "Socket.IO",
        "Gemini AI",
        "Zustand",
        "Tailwind CSS",
        "Docker",
        "Vite",
        "Framer Motion",
      ],
      architectureHighlights: {
        en: [
          "Real-time WebSocket party rooms with Socket.IO — matchmaking, study sessions & live quiz sync.",
          "AI quest generation pipeline: PDF → MarkItDown sidecar → Google Gemini 2.5 Flash → structured trivia.",
          "Competitive ELO rating engine with leagues, win rates, activity streaks & unlockable badge system.",
          "Clean decoupled architecture: NestJS backend + React SPA + PostgreSQL with ACID-compliant XP/ELO transactions.",
          "Zustand 5 lightweight state management with Recharts data visualization and Framer Motion animations.",
        ],
        es: [
          "Salas en tiempo real con WebSockets (Socket.IO) — matchmaking, sesiones de estudio y sincronización de quizzes en vivo.",
          "Pipeline de generación de quests con IA: PDF → sidecar MarkItDown → Google Gemini 2.5 Flash → trivia estructurada.",
          "Motor ELO competitivo con ligas, win rates, rachas de actividad y sistema de medallas desbloqueables.",
          "Arquitectura desacoplada limpia: backend NestJS + SPA React + PostgreSQL con transacciones ACID para XP y ELO.",
          "Estado global ligero con Zustand 5, visualización de datos con Recharts y animaciones con Framer Motion.",
        ],
      },
      roadmap: {
        en: [
          "Cloud container deployment (Render / Railway) for backend API and PostgreSQL.",
          "Frontend deployment to Vercel with environment-based API URL injection.",
          "Tournaments module and real-time leaderboard refresh via WebSockets.",
        ],
        es: [
          "Despliegue en contenedores cloud (Render / Railway) para API backend y PostgreSQL.",
          "Despliegue del frontend en Vercel con inyección de URL de API por entorno.",
          "Módulo de torneos y actualización en tiempo real del leaderboard vía WebSockets.",
        ],
      },
    },
    {
      id: "booklibre",
      title: "BookLibre",
      category: "Full-Stack",
      year: "2026",
      featured: true,
      status: "coming_soon",
      demoUrl: undefined,
      githubUrl: "https://github.com/JulianBarberis",
      tagline: {
        en: "DDD-driven Book Sharing Platform with Gamified Engine",
        es: "Plataforma de libros basada en DDD con motor de reputación",
      },
      description: {
        en: "Full-stack book-sharing platform built with Kotlin, Spring Boot, React, and PostgreSQL using Domain-Driven Design (DDD).",
        es: "Plataforma para compartir libros desarrollada con Kotlin, Spring Boot, React y PostgreSQL bajo principios DDD.",
      },
      technologies: ["Kotlin", "Spring Boot", "React", "PostgreSQL", "Flyway", "Docker", "JWT"],
      architectureHighlights: {
        en: [
          "'BiblioKarma' dynamic user reputation scoring engine.",
          "PostgreSQL native functions, views, triggers, and Flyway migrations.",
          "Stateless JWT RBAC security & Spring @Scheduled tasks.",
        ],
        es: [
          "Motor 'BiblioKarma' de reputación gamificada según reservas y libros.",
          "Funciones nativas, vistas, triggers y migraciones Flyway en PostgreSQL.",
          "Seguridad JWT RBAC sin estado y tareas programadas @Scheduled.",
        ],
      },
      roadmap: {
        en: [
          "Configuring cloud container deployment on Render / Railway.",
          "Publishing live preview upon database migration.",
        ],
        es: [
          "Configurando contenedores en Render / Railway.",
          "Publicación de demo en vivo al completar migraciones.",
        ],
      },
    },
    {
      id: "sqlify",
      title: "SQLify",
      category: "AI",
      year: "2025",
      featured: true,
      status: "coming_soon",
      demoUrl: undefined,
      githubUrl: "https://github.com/JulianBarberis/SQLify",
      tagline: {
        en: "Natural Language to SQL Query Engine with Google Gemini AI",
        es: "Traductor de lenguaje natural a SQL con Google Gemini AI",
      },
      description: {
        en: "Full-stack application using React, TypeScript, Express, and MySQL that translates natural queries into safe SQL using Gemini AI.",
        es: "Aplicación full-stack en React, TypeScript, Express y MySQL que traduce preguntas a consultas SQL seguras con Gemini AI.",
      },
      technologies: ["React", "TypeScript", "Node.js", "Express", "Gemini AI", "MySQL"],
      architectureHighlights: {
        en: [
          "Google Gemini AI pipeline with schema context injection.",
          "SQL string normalization and read-only execution guardrails.",
          "Real-time tabular results with query latency metrics.",
        ],
        es: [
          "Pipeline Gemini AI con inyección de contexto de esquema.",
          "Normalización de SQL y sandbox de solo lectura seguro.",
          "Resultados tabulares en tiempo real con métricas de latencia.",
        ],
      },
      roadmap: {
        en: [
          "Packaging serverless API endpoints with database sandbox.",
          "Deploying client and API to cloud hosting.",
        ],
        es: [
          "Empaquetado serverless con sandbox de base de datos.",
          "Despliegue de cliente y API en la nube.",
        ],
      },
    },
    {
      id: "portfolio-gta6",
      title: "Vice City Portfolio",
      category: "Frontend",
      year: "2026",
      featured: true,
      status: "live",
      demoUrl: "https://JulianBarberis.github.io/portfolio/",
      githubUrl: "https://github.com/JulianBarberis",
      tagline: {
        en: "Apple Glassmorphism Portfolio with GTA 6 Palette & GitHub Pages CI/CD",
        es: "Portfolio estilo Apple Glass con paleta GTA 6 y CI/CD en GitHub Pages",
      },
      description: {
        en: "Minimalist Apple-inspired glass portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS with full EN/ES internationalization.",
        es: "Portfolio minimalista estilo Apple Glass desarrollado con Next.js 15, React 19, TypeScript y Tailwind CSS con i18n EN/ES.",
      },
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Apple Glass", "i18n"],
      architectureHighlights: {
        en: [
          "Liquid Glass surfaces with specular hairline borders and multi-layer backdrop blur.",
          "Static export architecture for automated zero-cost GitHub Pages hosting.",
          "Bilingual context with localStorage theme and language persistence.",
        ],
        es: [
          "Superficies Liquid Glass con bordes especulares y desenfoque multicapa.",
          "Arquitectura de exportación estática para hosting gratuito en GitHub Pages.",
          "Contexto bilingüe con persistencia de tema e idioma en localStorage.",
        ],
      },
    },
    {
      id: "algo-que-pedir",
      title: "AlgoQuePedir",
      category: "Backend",
      year: "2025",
      featured: true,
      status: "live",
      demoUrl: undefined,
      githubUrl: "https://github.com/JulianBarberis/JulianBarberis-AlgoQuePedir_Algoritmos2y3",
      tagline: {
        en: "Order Management System with Advanced Data Structures — UNSAM Algorithms 2 & 3",
        es: "Sistema de gestión de pedidos con estructuras de datos avanzadas — Algoritmos 2 y 3 UNSAM",
      },
      description: {
        en: "Academic project for the Algorithms 2 & 3 course at UNSAM. Implements a full order management system applying advanced data structures (trees, heaps, graphs) and algorithmic paradigms such as greedy, dynamic programming, and backtracking to solve real-world ordering and routing problems.",
        es: "Proyecto académico para la materia Algoritmos 2 y 3 de la UNSAM. Implementa un sistema completo de gestión de pedidos aplicando estructuras de datos avanzadas (árboles, heaps, grafos) y paradigmas algorítmicos como greedy, programación dinámica y backtracking para resolver problemas reales de pedidos y ruteo.",
      },
      technologies: ["Kotlin", "Data Structures", "Graphs", "Algorithms", "OOP", "UNSAM"],
      architectureHighlights: {
        en: [
          "Advanced data structures: trees, heaps, priority queues and graph representations.",
          "Algorithmic paradigms: greedy heuristics, dynamic programming and backtracking strategies.",
          "Object-oriented design with clean separation of domain entities and algorithm logic.",
        ],
        es: [
          "Estructuras de datos avanzadas: árboles, heaps, colas de prioridad y representaciones de grafos.",
          "Paradigmas algorítmicos: heurísticas greedy, programación dinámica y estrategias de backtracking.",
          "Diseño orientado a objetos con separación limpia entre entidades de dominio y lógica algorítmica.",
        ],
      },
    },
  ],
  contact: {
    title: {
      en: "Let's Connect",
      es: "Hablemos",
    },
    subtitle: {
      en: "Open for software engineering opportunities, backend development, and collaborations.",
      es: "Disponible para oportunidades de ingeniería de software, desarrollo backend y colaboraciones.",
    },
    formName: { en: "Name", es: "Nombre" },
    formEmail: { en: "Email", es: "Email" },
    formMessage: { en: "Message", es: "Mensaje" },
    sendButton: { en: "Send Message", es: "Enviar Mensaje" },
    sending: { en: "Sending...", es: "Enviando..." },
    successMessage: {
      en: "Message sent! I'll get back to you soon.",
      es: "¡Mensaje enviado! Te responderé a la brevedad.",
    },
    copyEmail: { en: "Copy Email", es: "Copiar Email" },
    copiedEmail: { en: "Copied!", es: "¡Copiado!" },
    locationLabel: { en: "Location", es: "Ubicación" },
    timezone: { en: "UTC-3 (Buenos Aires)", es: "UTC-3 (Buenos Aires)" },
  },
};
