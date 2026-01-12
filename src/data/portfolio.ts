

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string | null; 
  image?: string;      
  gallery?: string[];
  isPrivate?: boolean; 
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
    tagline: "Desarrollador Frontend Jr. Ayudo a construir interfaces modernas y experiencias de usuario fluidas.",
    description:
      "Desarrollador apasionado por crear herramientas que resuelven problemas reales. Actualmente trabajando en TelCo SAPEM como Analista QA, cursando Licenciatura en Sistemas y gestionando proyectos propios.",
    location: "Corrientes, Argentina",
    email: "luciano.rodriguez.dev@gmail.com",
    availability: "Disponible para proyectos freelance",
    cv: "/cv_luciano_rodriguez.pdf",
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
  ],
  projects: [
    {
      title: "Sistema de Gestión Comercial (Privado)",
      description:
        "Una Progressive Web App (PWA) integral desarrollada para digitalizar la operación completa de una tienda de alimentos naturales. La plataforma fusiona un panel de administración robusto para el control del negocio con una experiencia móvil para los clientes, centralizando ventas, inventario y fidelización en una sola arquitectura escalable.",
      tags: ["Next.js", "Supabase", "TypeScript"],
      isPrivate: true, 
      link: "#", 
      repo: null,
      image: "/nutrigo/nutrigo-club.webp",
      gallery: [
        "/nutrigo/nutrigo-club.webp",     
        "/sistema-dashboard.png",   
        "/sistema-stock.png",       
        "/sistema-qr.png"           
      ],
    },
    {
      title: "Teslo Shop",
      description: "E-commerce completo con autenticación de usuarios, carrito de compras persistente, pasarela de pagos (sandbox) y panel administrativo para gestión de productos y órdenes. (Proyecto viejo, falta actualizar. NutriGo Club es como una version actualizada y mejorada",
      tags: ["Next.js", "MongoDB", "NextAuth", "PayPal API"],
      link: "https://teslo-shop-lucianor.vercel.app/",
      repo: "https://github.com/LucianoR23/teslo-shop", 
      image: "/shop/teslo-shop.jpg",
      gallery: [
        "/shop/teslo-shop.jpg",     
        "/shop/teslo-item.png",   
        "/shop/teslo-cart.png",
      ],
    },

    
    {
      title: "Ticket System (Sockets)",
      description: "Sistema de gestión de colas en tiempo real utilizando WebSockets. Permite generar tickets y asignarlos a escritorios, actualizando una pantalla pública instantáneamente.",
      tags: ["Node.js", "Socket.io", "Backend", "Express"],
      link: '', 
      repo: "https://github.com/LucianoR23/ticket-program-sockets",
      image: "/tickets/tickets-pantalla.png",
      gallery: [
        "/tickets/tickets-pantalla.png",          
        "/tickets/tickets-generar.png",     
        "/tickets/tickets-atender.png",   
      ],
    },

    
    {
      title: "Journal App",
      description: "Diario digital con soporte para carga de imágenes en la nube. Implementa autenticación segura con Firebase y gestión de estado global compleja con Redux. (journal@prueba.com y prueba123)",
      tags: ["React", "Redux Toolkit", "Firebase", "Cloudinary"],
      link: "https://journal-lemy.vercel.app",
      repo: null,
      image: "/journal/journal.jpg",
    },

    
    {
      title: "Calendar App",
      description: "Clon funcional de Google Calendar. Backend propio para autenticación y CRUD de eventos. Manejo avanzado de fechas y modales. (calendario@prueba.com y calendario123, o registrarse)",
      tags: ["MERN Stack", "React Big Calendar", "JWT"],
      link: "https://calendar-app-delta-seven.vercel.app",
      repo: null,
      image: "/calendar/calendar-app.jpg",
      gallery: [   
        "/calendar/calendar-login.png",   
        "/calendar/calendar-example.png",
      ],
    },

  ],
  experience: [
    {
      company: "TelCo SAPEM",
      role: "QA Analyst",
      period: "02/2025 - Presente",
      description: "Testing manual exhaustivo en ambiente de desarrollo. Aprovecho mis conocimientos en programación para inspeccionar fallos a nivel técnico y facilitar el trabajo a los devs. Soy uno de los encargados de instruir sobre el uso de las nuevas implementaciones."
    },
    {
      company: "NutriGo Club",
      role: "Co-Founder & Full Stack Developer",
      period: "12/2025 - Presente", 
      description: "Liderazgo de la estrategia tecnológica del negocio. Diseño y desarrollo integral de una plataforma SaaS privada para la gestión de inventario, ventas y métricas, automatizando procesos operativos clave."
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
      degree: "Go - De Cero a Avanazado (Golang)",
      period: "2025"
    },
    {
      institution: "Teclab Instituto Técnico Superior",
      degree: "Tecnicatura Superior en Programación",
      period: "2026 - Presente"
    },
  ]
};
