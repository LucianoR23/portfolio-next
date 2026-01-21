export interface GalleryItem {
  url: string;
  type?: "image" | "video";
  description?: string;
  thumbnail?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string | null; 
  image?: string;      
  gallery?: GalleryItem[];
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
    tagline: "Junior Frontend Developer. Building modern interfaces and seamless user experiences.",
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
  ],
  projects: [
    {
      title: "Commercial Management System (SaaS)",
      description:
        "A comprehensive Progressive Web App (PWA) designed to digitize the entire operation of a natural food franchise. The platform merges a robust admin dashboard for business control with a mobile experience for customers, centralizing sales, inventory, and loyalty programs into a single scalable architecture.",
      tags: ["Next.js", "Supabase", "TypeScript"],
      isPrivate: true, 
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
      role: "QA Analyst",
      period: "02/2025 - Present",
      description: "Conducting exhaustive manual testing in development environments. I leverage my programming background to inspect technical faults, streamline developer workflows, and lead training on new feature implementations."
    },
    {
      company: "NutriGo Club",
      role: "Co-Founder & Full Stack Developer",
      period: "12/2025 - Present", 
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
      period: "2026 - Present"
    },
  ]
};