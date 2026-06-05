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
    cv: string;
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

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Luciano Rodriguez",
    tagline: "Frontend Developer. Building modern interfaces and seamless user experiences.",
    description:
      "Passionate developer focused on creating tools that solve real-world problems. Currently working at TelCo SAPEM as a QA Analyst, pursuing a degree in Information Systems, and managing personal software projects.",
    location: "Corrientes, Argentina",
    email: "luciano.rodriguez.dev@gmail.com",
    availability: "Available for freelance projects",
    cv: "/cv.pdf",
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
      title: "RentAR Admin",
      description: "Internal rental management system built for the Argentine real estate market. Centralizes property administration, contracts, payments, AFIP electronic invoicing (type A and B with CAE), rent price updates via ICL/IPC indices through Arquiler integration, automated email alerts and PDF reports. Self-hosted on Oracle Cloud VPS with Coolify.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Coolify"],
      link: "https://rentar-fliamor.lemydev.com/",  
      repo: "https://github.com/LucianoR23/rentar-fliamor",  
      image: "/rentar/rentar-primary.webp",
      gallery: [
        { url: "/rentar/rentar-admin.mp4", type: "video", description: "Project demo" },
      ],
      isPrivate: false,
      cvDescription: "Real estate management platform with AFIP electronic invoicing, ICL/IPC rent updates, and automated PDF reports. Self-hosted on Oracle Cloud.",
    },
    {
      title: "Commercial Management System (SaaS)",
      description:
        "A comprehensive Progressive Web App (PWA) designed to digitize the entire operation of a natural food franchise. The platform merges a robust admin dashboard for business control with a mobile experience for customers, centralizing sales, inventory, and loyalty programs into a single scalable architecture.",
      tags: ["Next.js", "Supabase", "TypeScript"],
      isPrivate: true,
      cvDescription: "PWA SaaS for a natural food franchise: POS, inventory, loyalty program with QR membership, and ARCA electronic billing integration.",
      link: "#",
      repo: null,
      image: "/nutrigo/nutrigo-club.webp",
      gallery: [
        { url: "/nutrigo/nutrigo-club.webp" },     
        { 
          url: "/nutrigo/nutrigo-invitado.mp4", 
          type: "video", 
          description: "Guest View: Allows browsing and ordering as a guest. Users can register to unlock a 10% discount on their first purchase. A Supabase Edge Function automatically updates their status to a standard membership after the initial transaction." 
        },
        { 
          url: "/nutrigo/nutrigo-socio.mp4", 
          type: "video", 
          description: "Member View: Registered users access a digital ID with a scannable QR for verification. Features include real-time point tracking, unified purchase history (online & physical), and access to exclusive member pricing. Every purchase automatically accumulates loyalty points." 
        },
        { 
          url: "/nutrigo/admin-login.mp4", 
          type: "video", 
          description: "Admin Panel: Secure login flow powered by Supabase Auth (demonstrating error handling on failed attempts) and redirection to the main dashboard." 
        },
        { 
          url: "/nutrigo/partners-view.mp4", 
          type: "video", 
          description: "Admin - Partners: Management of corporate agreements. Configures discounts and membership validity periods. Includes a re-validation logic requiring users to re-scan a QR code once their active period expires." 
        },
        { 
          url: "/nutrigo/pos-view.mp4", 
          type: "video", 
          description: "Admin - POS System: Point of Sale interface featuring quick product editing, cart with real-time stock validation, and customer assignment (lookup or quick-create). Supports multiple payment methods and handles automatic discount application based on membership type." 
        },
        { 
          url: "/nutrigo/orders-view.mp4", 
          type: "video", 
          description: "Admin - Orders: Unified view of all transactions (online & in-store). Allows editing payment methods, re-generating tickets (view/download/print), and advanced filtering by date, payment type, or specific order ID." 
        },
        { 
          url: "/nutrigo/products-view.mp4", 
          type: "video", 
          description: "Admin - Products: Full CRUD for inventory. Features include image upload (auto-converted to WebP), tag management for client-side filtering, 'Promotion Mode' (bypassing standard discounts), and generation of printable QRs for quick scanning at the register." 
        },
        { 
          url: "/nutrigo/arca-view.mp4", 
          type: "video", 
          description: "Admin - Billing: Toggle in configuration to enable official invoicing integration via ARCA (Electronic Billing) directly within the orders section." 
        },
        { 
          url: "/nutrigo/config-view.mp4", 
          type: "video", 
          description: "Admin - Configuration: Global settings control. Allows updating client-side app links, editing the automated WhatsApp message template, and defining loyalty point rates (differentiating accumulation logic between standard users and corporate partners)." 
        },
      ],
    },
    {
      title: "Teslo Shop",
      description: "Full-featured e-commerce platform with user authentication, persistent shopping cart, payment gateway integration (sandbox), and an administrative panel for product and order management. (Legacy project; NutriGo Club represents the updated and improved architecture).",
      tags: ["Next.js", "MongoDB", "NextAuth", "PayPal API"],
      link: "https://teslo-shop-lucianor.vercel.app/",
      repo: "https://github.com/LucianoR23/teslo-shop", 
      image: "/shop/teslo-shop.jpg",
      gallery: [
        { url: "/shop/teslo-shop.jpg" },
        { url: "/shop/teslo-item.png" },
        { url: "/shop/teslo-cart.png" },
      ],
      cvDescription: "Full e-commerce with auth, persistent cart, PayPal sandbox integration, and admin panel for product and order management.",
    },
    {
      title: "Ticket System (Sockets)",
      description: "Real-time queue management system using WebSockets. Enables ticket generation and desk assignment, instantly updating a public display screen for waiting customers.",
      tags: ["Node.js", "Socket.io", "Backend", "Express"],
      link: '', 
      repo: "https://github.com/LucianoR23/ticket-program-sockets",
      image: "/tickets/tickets-pantalla.png",
      gallery: [
        { url: "/tickets/tickets-pantalla.png" },          
        { url: "/tickets/tickets-generar.png" },     
        { url: "/tickets/tickets-atender.png" },   
      ],
    },
    {
      title: "Journal App",
      description: "Digital journal application with cloud image upload support. Implements secure authentication via Firebase and handles complex global state management using Redux.",
      tags: ["React", "Redux Toolkit", "Firebase", "Cloudinary"],
      link: "https://journal-lemy.vercel.app",
      repo: null,
      image: "/journal/journal.jpg",
    },
    {
      title: "Calendar App",
      description: "Functional clone of Google Calendar. Features a custom backend for authentication and event CRUD operations. Includes advanced date handling and modal interactions.",
      tags: ["MERN Stack", "React Big Calendar", "JWT"],
      link: "https://calendar-app-delta-seven.vercel.app",
      repo: null,
      image: "/calendar/calendar-app.jpg",
      gallery: [   
        { url: "/calendar/calendar-login.png" },   
        { url: "/calendar/calendar-example.png" },
      ],
    },
  ],
  experience: [
    {
      company: "TelCo SAPEM",
      role: "Frontend Developer & QA Analyst",
      period: "02/2025 - Present",
      description: "Developed an internal meeting room reservation web app with authentication, an interactive calendar for booking, and an admin approval workflow. Conducted manual QA testing across internal systems, identifying and reporting bugs in pre-production environments. Leveraged my development background to inspect technical faults directly and accelerate fix cycles with the dev team. Also working with Go for backend tasks."
    },
    {
      company: "NutriGo Club",
      role: "Co-Founder & Full Stack Developer",
      period: "11/2025 - Present",
      description: "Leading the business technology strategy. End-to-end design and development of a private SaaS platform for inventory, sales, and analytics, automating key operational processes."
    },
  ],
  education: [
    {
      institution: "Udemy - Fernando Herrera (DevTalles)",
      degree: "Full Stack MERN: JavaScript, React, Next.js, Node.js, PostgreSQL & TypeScript",
      period: "2023 - 2025"
    },
    {
      institution: "Udemy - Alex Roel (Roel Code)",
      degree: "Go - From Zero to Advanced (Golang)",
      period: "2025"
    },
    {
      institution: "Teclab Institute",
      degree: "Higher Technical Degree in Programming",
      period: "2026 - 07/2028 (Expected)"
    },
  ]
};