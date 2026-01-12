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
    tagline: "Junior Frontend Developer. Building modern interfaces and seamless user experiences.",
    description:
      "Passionate developer focused on creating tools that solve real-world problems. Currently working at TelCo SAPEM as a QA Analyst, pursuing a degree in Information Systems, and managing personal software projects.",
    location: "Corrientes, Argentina",
    email: "luciano.rodriguez.dev@gmail.com",
    availability: "Available for freelance projects",
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
      title: "Commercial Management System (SaaS)",
      description:
        "A comprehensive Progressive Web App (PWA) designed to digitize the entire operation of a natural food franchise. The platform merges a robust admin dashboard for business control with a mobile experience for customers, centralizing sales, inventory, and loyalty programs into a single scalable architecture.",
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
      description: "Full-featured e-commerce platform with user authentication, persistent shopping cart, payment gateway integration (sandbox), and an administrative panel for product and order management. (Legacy project; NutriGo Club represents the updated and improved architecture).",
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
      description: "Real-time queue management system using WebSockets. Enables ticket generation and desk assignment, instantly updating a public display screen for waiting customers.",
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
        "/calendar/calendar-login.png",   
        "/calendar/calendar-example.png",
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