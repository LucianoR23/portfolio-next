import type { Locale } from "@/i18n/routing";

export interface GalleryItem {
  url: string;
  type?: "image" | "video";
  description?: string;
  thumbnail?: string;
}

export interface RepoLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string | null;
  repos?: RepoLink[];
  image?: string;
  gallery?: GalleryItem[];
  isPrivate?: boolean;
  cvDescription?: string;
  /** Bullets técnicos opcionales; se muestran como sección en el modal de detalle. */
  highlights?: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    tagline: string;
    description: string;
    location: string;
    email: string;
    availability?: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  skills: string[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO BASE (inglés) — fuente única de los datos estructurales:
// URLs, imágenes, tags, fechas y galería viven SOLO acá.
// El español (más abajo) sobreescribe únicamente los textos traducibles.
// ─────────────────────────────────────────────────────────────────────────────
const en: PortfolioData = {
  personalInfo: {
    name: "Luciano Rodriguez",
    tagline:
      "Frontend Developer. Building modern interfaces and seamless user experiences.",
    description:
      "Passionate developer focused on creating tools that solve real-world problems. Currently working at TelCo SAPEM as a QA Analyst, pursuing a degree in Information Systems, and managing personal software projects.",
    location: "Corrientes, Argentina",
    email: "luciano.rodriguez.dev@gmail.com",
    availability: "Available for freelance projects",
  },
  socials: {
    github: "https://github.com/LucianoR23",
    linkedin: "https://www.linkedin.com/in/luciano-rodriguez-273809251/",
  },
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Git",
    "PostgreSQL",
    "QA Testing",
    "Postman",
    "MongoDB",
    "Golang",
    "Supabase",
    "WebSockets",
  ],
  projects: [
    {
      title: "Ahorro",
      description:
        "Mobile-first PWA for shared household finances. Multi-member households (couples, families, roommates) split expenses and instantly see who owes what, with automatic net-debt calculation and settlement tracking. Features real credit-card installments (closing & due dates per installment), multi-currency support (ARS/USD/EUR) with frozen exchange rates, self-materializing recurring income/expenses via background workers, monthly email reports, and an AI-analysis prompt exporter. Full auth, push notifications, dark mode, and installable PWA. Go domain-driven backend (repository → service → handler) with sqlc and pgx; ~20MB Docker image self-hosted on a VPS with Coolify + Traefik.",
      tags: ["Next.js", "Go", "PostgreSQL", "PWA"],
      link: "https://ahorro.lemydev.com",
      repo: null,
      repos: [
        { label: "Frontend", url: "https://github.com/LucianoR23/ahorra_app" },
        { label: "Backend", url: "https://github.com/LucianoR23/api_go_ahorro" },
      ],
      image: "/ahorro/ahorro-reportes.png",
      gallery: [
        { url: "/ahorro/ahorro-login.jpg" },
        { url: "/ahorro/ahorro-dashboard.jpg" },
        { url: "/ahorro/ahorro-menu.jpg" },
        { url: "/ahorro/ahorro-reportes.png" },
        { url: "/ahorro/ahorro-export-ia.png" },
      ],
      isPrivate: false,
      cvDescription:
        "Mobile-first PWA for shared household finances: net-debt settlement, real credit-card installments, multi-currency with frozen rates, recurring transactions via workers, and email/AI reporting. Go domain-driven backend, ~20MB Docker image self-hosted on a VPS.",
    },
    {
      title: "Soporte",
      description:
        "Centralized, multi-tenant ticketing backend for the Lemydev app ecosystem (RentAR, Ahorro, NutriGo…): every app collects bug reports and improvement requests through one shared service and one operator panel. Two backends share a single Postgres schema — a Go API (chi, pgx, River Queue) serves integrating apps via a published typed SDK, while a Next.js 16 + Drizzle admin panel handles triage. Self-hosted on an Oracle Cloud ARM VPS with Coolify.",
      tags: ["Go", "Next.js", "PostgreSQL", "Multi-tenant"],
      link: "#",
      repo: null,
      isPrivate: true,
      image: "/soporte/soporte-login.png",
      gallery: [
        { url: "/soporte/soporte-login.png" },
        { url: "/soporte/soporte-bandeja.png" },
        { url: "/soporte/soporte-apps.png" },
        { url: "/soporte/soporte-metricas.png" },
        { url: "/soporte/soporte-video.mp4", type: "video", description: "Project demo" },
      ],
      highlights: [
        "Two-backend, one-schema design: the Go API serves integrating apps while the Next.js panel reads Postgres directly via Drizzle, kept consistent by the shared soporte schema.",
        "Atomic ticket creation: files are validated, uploaded to R2, then ticket, attachments and River jobs are committed in a single DB transaction — jobs only fire if the commit succeeds.",
        "Defense-in-depth file validation by magic bytes (PNG/JPEG/WebP/MP4), distrusting client extension and Content-Type, no ffmpeg. Limits: 3 files, 5 MB images, 20 MB video.",
        "Layered rate limiting as chi middleware — per-IP, per-app and per-reporter, with separate ceilings for writes and reads.",
        "Hardened security: hashed app keys, per-app Origin pinning, presigned R2 URLs, and split liveness/readiness health checks.",
      ],
      cvDescription:
        "Multi-tenant ticketing backend for an app ecosystem: a Go API (chi, pgx, River Queue) serves integrating apps through a published typed SDK while a Next.js + Drizzle admin panel handles operator triage — both sharing one Postgres schema. Atomic ticket creation, magic-byte file validation, layered rate limiting, and presigned R2 storage.",
    },
    {
      title: "RentAR Admin",
      description:
        "Internal rental management system built for the Argentine real estate market. Centralizes property administration, contracts, payments, AFIP electronic invoicing (type A and B with CAE), rent price updates via ICL/IPC indices through Arquiler integration, automated email alerts and PDF reports. Self-hosted on Oracle Cloud VPS with Coolify.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Coolify"],
      link: "https://rentar-fliamor.lemydev.com/",
      repo: "https://github.com/LucianoR23/rentar-fliamor",
      image: "/rentar/rentar-primary.webp",
      gallery: [
        { url: "/rentar/rentar-admin.mp4", type: "video", description: "Project demo" },
      ],
      isPrivate: false,
      cvDescription:
        "Real estate management platform with AFIP electronic invoicing, ICL/IPC rent updates, and automated PDF reports. Self-hosted on Oracle Cloud.",
    },
    {
      title: "Commercial Management System (SaaS)",
      description:
        "A comprehensive Progressive Web App (PWA) designed to digitize the entire operation of a natural food franchise. The platform merges a robust admin dashboard for business control with a mobile experience for customers, centralizing sales, inventory, and loyalty programs into a single scalable architecture.",
      tags: ["Next.js", "Supabase", "TypeScript"],
      isPrivate: true,
      cvDescription:
        "PWA SaaS for a natural food franchise: POS, inventory, loyalty program with QR membership, and ARCA electronic billing integration.",
      link: "#",
      repo: null,
      image: "/nutrigo/nutrigo-club.webp",
      gallery: [
        { url: "/nutrigo/nutrigo-club.webp" },
        {
          url: "/nutrigo/nutrigo-invitado.mp4",
          type: "video",
          description:
            "Guest View: Allows browsing and ordering as a guest. Users can register to unlock a 10% discount on their first purchase. A Supabase Edge Function automatically updates their status to a standard membership after the initial transaction.",
        },
        {
          url: "/nutrigo/nutrigo-socio.mp4",
          type: "video",
          description:
            "Member View: Registered users access a digital ID with a scannable QR for verification. Features include real-time point tracking, unified purchase history (online & physical), and access to exclusive member pricing. Every purchase automatically accumulates loyalty points.",
        },
        {
          url: "/nutrigo/admin-login.mp4",
          type: "video",
          description:
            "Admin Panel: Secure login flow powered by Supabase Auth (demonstrating error handling on failed attempts) and redirection to the main dashboard.",
        },
        {
          url: "/nutrigo/partners-view.mp4",
          type: "video",
          description:
            "Admin - Partners: Management of corporate agreements. Configures discounts and membership validity periods. Includes a re-validation logic requiring users to re-scan a QR code once their active period expires.",
        },
        {
          url: "/nutrigo/pos-view.mp4",
          type: "video",
          description:
            "Admin - POS System: Point of Sale interface featuring quick product editing, cart with real-time stock validation, and customer assignment (lookup or quick-create). Supports multiple payment methods and handles automatic discount application based on membership type.",
        },
        {
          url: "/nutrigo/orders-view.mp4",
          type: "video",
          description:
            "Admin - Orders: Unified view of all transactions (online & in-store). Allows editing payment methods, re-generating tickets (view/download/print), and advanced filtering by date, payment type, or specific order ID.",
        },
        {
          url: "/nutrigo/products-view.mp4",
          type: "video",
          description:
            "Admin - Products: Full CRUD for inventory. Features include image upload (auto-converted to WebP), tag management for client-side filtering, 'Promotion Mode' (bypassing standard discounts), and generation of printable QRs for quick scanning at the register.",
        },
        {
          url: "/nutrigo/arca-view.mp4",
          type: "video",
          description:
            "Admin - Billing: Toggle in configuration to enable official invoicing integration via ARCA (Electronic Billing) directly within the orders section.",
        },
        {
          url: "/nutrigo/config-view.mp4",
          type: "video",
          description:
            "Admin - Configuration: Global settings control. Allows updating client-side app links, editing the automated WhatsApp message template, and defining loyalty point rates (differentiating accumulation logic between standard users and corporate partners).",
        },
      ],
    },
    {
      title: "Journal App",
      description:
        "Digital journal application with cloud image upload support. Implements secure authentication via Firebase and handles complex global state management using Redux.",
      tags: ["React", "Redux Toolkit", "Firebase", "Cloudinary"],
      link: "https://journal-lemy.vercel.app",
      repo: null,
      image: "/journal/journal.jpg",
    },
  ],
  experience: [
    {
      company: "TelCo SAPEM",
      role: "Frontend Developer & QA Analyst",
      period: "02/2025 - Present",
      description:
        "Developed an internal meeting room reservation web app with authentication, an interactive calendar for booking, and an admin approval workflow. Conducted manual QA testing across internal systems, identifying and reporting bugs in pre-production environments. Leveraged my development background to inspect technical faults directly and accelerate fix cycles with the dev team. Also working with Go for backend tasks.",
    },
    {
      company: "NutriGo Corrientes",
      role: "Partner & Full Stack Developer",
      period: "11/2025 - Present",
      description:
        "Leading the business technology strategy. End-to-end design and development of a private SaaS platform for inventory, sales, and analytics, automating key operational processes.",
    },
  ],
  education: [
    {
      institution: "Udemy - Fernando Herrera (DevTalles)",
      degree:
        "Full Stack MERN: JavaScript, React, Next.js, Node.js, PostgreSQL & TypeScript",
      period: "2023 - 2025",
    },
    {
      institution: "Udemy - Alex Roel (Roel Code)",
      degree: "Go - From Zero to Advanced (Golang)",
      period: "2025",
    },
    {
      institution: "Teclab Institute",
      degree: "Higher Technical Degree in Programming",
      period: "2026 - 07/2028 (Expected)",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// OVERLAY ESPAÑOL — solo los textos traducibles. Lo estructural se hereda de `en`.
// ─────────────────────────────────────────────────────────────────────────────
type ProjectText = {
  title?: string;
  description: string;
  cvDescription?: string;
  // Por índice de galería; undefined = sin descripción (se mantiene la base).
  galleryDescriptions?: (string | undefined)[];
  // Traducción de los highlights, en el mismo orden que la base.
  highlights?: string[];
};

// Indexado por el `title` (en inglés) del proyecto base.
const esProjects: Record<string, ProjectText> = {
  Ahorro: {
    description:
      "PWA mobile-first para finanzas compartidas del hogar. Hogares con varios miembros (parejas, familias, compañeros de piso) dividen gastos y ven al instante quién debe qué, con cálculo automático de deuda neta y seguimiento de saldos. Incluye cuotas reales de tarjeta de crédito (fechas de cierre y vencimiento por cuota), soporte multimoneda (ARS/USD/EUR) con tipos de cambio congelados, ingresos/gastos recurrentes que se materializan solos mediante workers en segundo plano, reportes mensuales por email y un exportador de prompts para análisis con IA. Autenticación completa, notificaciones push, modo oscuro y PWA instalable. Backend en Go orientado a dominios (repository → service → handler) con sqlc y pgx; imagen Docker de ~20MB self-hosted en un VPS con Coolify + Traefik.",
    cvDescription:
      "PWA mobile-first para finanzas compartidas del hogar: liquidación de deuda neta, cuotas reales de tarjeta, multimoneda con tipos congelados, transacciones recurrentes vía workers y reportes por email/IA. Backend en Go orientado a dominios, imagen Docker de ~20MB self-hosted en un VPS.",
  },
  Soporte: {
    description:
      "Backend de ticketing centralizado y multi-tenant para el ecosistema de apps Lemydev (RentAR, Ahorro, NutriGo…): cada app recolecta reportes de bugs y solicitudes de mejora a través de un único servicio compartido y un solo panel de operadores. Dos backends comparten un mismo schema de Postgres — una API en Go (chi, pgx, River Queue) atiende a las apps integradas mediante un SDK tipado publicado, mientras un panel admin en Next.js 16 + Drizzle se encarga de la triage. Self-hosted en un VPS ARM de Oracle Cloud con Coolify.",
    cvDescription:
      "Backend de ticketing multi-tenant para un ecosistema de apps: una API en Go (chi, pgx, River Queue) atiende a las apps integradas mediante un SDK tipado publicado, y un panel admin en Next.js + Drizzle gestiona la triage de operadores — ambos compartiendo un mismo schema de Postgres. Creación atómica de tickets, validación de archivos por magic bytes, rate limiting por capas y almacenamiento R2 con URLs firmadas.",
    galleryDescriptions: [
      undefined,
      undefined,
      undefined,
      undefined,
      "Demo del proyecto",
    ],
    highlights: [
      "Diseño de dos backends y un schema: la API en Go atiende a las apps integradas mientras el panel en Next.js lee Postgres directo vía Drizzle, consistentes gracias al schema soporte compartido.",
      "Creación atómica de tickets: los archivos se validan, se suben a R2 y luego ticket, adjuntos y jobs de River se confirman en una sola transacción de DB — los jobs solo se disparan si el commit tiene éxito.",
      "Validación de archivos en profundidad por magic bytes (PNG/JPEG/WebP/MP4), desconfiando de la extensión y el Content-Type del cliente, sin ffmpeg. Límites: 3 archivos, 5 MB imágenes, 20 MB video.",
      "Rate limiting por capas como middleware de chi — por IP, por app y por reporter, con techos distintos para escrituras y lecturas.",
      "Seguridad endurecida: app keys hasheadas, Origin pinning por app, URLs firmadas de R2 y health checks separados de liveness/readiness.",
    ],
  },
  "RentAR Admin": {
    description:
      "Sistema interno de gestión de alquileres construido para el mercado inmobiliario argentino. Centraliza la administración de propiedades, contratos, pagos, facturación electrónica AFIP (tipo A y B con CAE), actualización de precios de alquiler vía índices ICL/IPC a través de la integración con Arquiler, alertas automáticas por email y reportes en PDF. Self-hosted en un VPS de Oracle Cloud con Coolify.",
    cvDescription:
      "Plataforma de gestión inmobiliaria con facturación electrónica AFIP, actualizaciones de alquiler por ICL/IPC y reportes PDF automáticos. Self-hosted en Oracle Cloud.",
    galleryDescriptions: ["Demo del proyecto"],
  },
  "Commercial Management System (SaaS)": {
    title: "Sistema de Gestión Comercial (SaaS)",
    description:
      "Una Progressive Web App (PWA) integral diseñada para digitalizar toda la operación de una franquicia de alimentos naturales. La plataforma combina un panel de administración robusto para el control del negocio con una experiencia mobile para los clientes, centralizando ventas, inventario y programas de fidelización en una única arquitectura escalable.",
    cvDescription:
      "PWA SaaS para una franquicia de alimentos naturales: punto de venta, inventario, programa de fidelización con membresía por QR e integración de facturación electrónica ARCA.",
    galleryDescriptions: [
      undefined,
      "Vista de invitado: permite navegar y hacer pedidos como invitado. Los usuarios pueden registrarse para desbloquear un 10% de descuento en su primera compra. Una Edge Function de Supabase actualiza automáticamente su estado a membresía estándar tras la transacción inicial.",
      "Vista de socio: los usuarios registrados acceden a una credencial digital con un QR escaneable para verificación. Incluye seguimiento de puntos en tiempo real, historial unificado de compras (online y físicas) y acceso a precios exclusivos para socios. Cada compra acumula puntos de fidelización automáticamente.",
      "Panel de administración: flujo de login seguro con Supabase Auth (demostrando el manejo de errores ante intentos fallidos) y redirección al dashboard principal.",
      "Admin - Convenios: gestión de acuerdos corporativos. Configura descuentos y períodos de validez de las membresías. Incluye una lógica de revalidación que obliga a los usuarios a volver a escanear un QR una vez vencido su período activo.",
      "Admin - Punto de venta: interfaz de POS con edición rápida de productos, carrito con validación de stock en tiempo real y asignación de clientes (búsqueda o alta rápida). Soporta múltiples medios de pago y aplica descuentos automáticos según el tipo de membresía.",
      "Admin - Pedidos: vista unificada de todas las transacciones (online y en local). Permite editar medios de pago, regenerar tickets (ver/descargar/imprimir) y filtrado avanzado por fecha, tipo de pago o ID de pedido.",
      "Admin - Productos: CRUD completo del inventario. Incluye subida de imágenes (convertidas automáticamente a WebP), gestión de etiquetas para el filtrado del lado del cliente, 'Modo promoción' (que ignora los descuentos estándar) y generación de QRs imprimibles para escaneo rápido en caja.",
      "Admin - Facturación: switch en la configuración para habilitar la integración de facturación oficial vía ARCA (Facturación Electrónica) directamente en la sección de pedidos.",
      "Admin - Configuración: control de ajustes globales. Permite actualizar los links de la app del lado del cliente, editar la plantilla del mensaje automático de WhatsApp y definir las tasas de puntos de fidelización (diferenciando la lógica de acumulación entre usuarios estándar y socios corporativos).",
    ],
  },
  "Journal App": {
    description:
      "Aplicación de diario digital con soporte para subida de imágenes a la nube. Implementa autenticación segura mediante Firebase y maneja un estado global complejo con Redux.",
  },
};

const esExperience: Partial<ExperienceItem>[] = [
  {
    role: "Desarrollador Frontend y Analista de QA",
    period: "02/2025 - Presente",
    description:
      "Desarrollé una aplicación web interna de reserva de salas de reuniones con autenticación, un calendario interactivo para reservar y un flujo de aprobación para administradores. Realicé QA manual sobre sistemas internos, identificando y reportando bugs en entornos de preproducción. Aproveché mi experiencia en desarrollo para inspeccionar fallas técnicas directamente y acelerar los ciclos de corrección junto al equipo de desarrollo. También trabajo con Go en tareas de backend.",
  },
  {
    role: "Socio y Desarrollador Full Stack",
    period: "11/2025 - Presente",
    description:
      "Lidero la estrategia tecnológica del negocio. Diseño y desarrollo de punta a punta de una plataforma SaaS privada para inventario, ventas y analítica, automatizando procesos operativos clave.",
  },
];

const esEducation: Partial<EducationItem>[] = [
  {}, // Udemy MERN: el título del curso se mantiene en inglés
  { degree: "Go - De cero a avanzado (Golang)" },
  {
    institution: "Instituto Teclab",
    degree: "Tecnicatura Superior en Programación",
    period: "2026 - 07/2028 (Estimado)",
  },
];

const es: PortfolioData = {
  ...en,
  personalInfo: {
    ...en.personalInfo,
    tagline:
      "Desarrollador Frontend. Construyo interfaces modernas y experiencias de usuario fluidas.",
    description:
      "Desarrollador apasionado, enfocado en crear herramientas que resuelven problemas reales. Actualmente trabajo en TelCo SAPEM como Analista de QA, curso una carrera en Sistemas de Información y llevo adelante proyectos de software propios.",
    availability: "Disponible para proyectos freelance",
  },
  projects: en.projects.map((p) => {
    const t = esProjects[p.title];
    if (!t) return p;
    return {
      ...p,
      title: t.title ?? p.title,
      description: t.description,
      cvDescription: t.cvDescription ?? p.cvDescription,
      highlights: t.highlights ?? p.highlights,
      gallery: p.gallery?.map((g, i) => {
        const desc = t.galleryDescriptions?.[i];
        return desc !== undefined ? { ...g, description: desc } : g;
      }),
    };
  }),
  experience: en.experience.map((e, i) => ({ ...e, ...esExperience[i] })),
  education: en.education.map((e, i) => ({ ...e, ...esEducation[i] })),
};

const byLocale: Record<Locale, PortfolioData> = { en, es };

/** Devuelve los datos del portfolio ya resueltos en el idioma pedido. */
export function getPortfolio(locale: Locale): PortfolioData {
  return byLocale[locale] ?? en;
}
