import { getPortfolio } from "@/data/portfolio";
import type { Locale } from "@/i18n/routing";

// ─────────────────────────────────────────────────────────────────────────────
// CVData — forma intermedia que consume `generate-docx.ts`.
// Toda string de CONTENIDO viene de `portfolio.ts`. Nada se inventa:
// si un campo no existe, queda como "" o se omite del array.
// ─────────────────────────────────────────────────────────────────────────────

export interface CVLink {
  label: string;
  url: string;
}

export interface CVExperience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface CVProject {
  title: string;
  stack: string;
  description: string;
  links: CVLink[];
}

export interface CVEducation {
  institution: string;
  degree: string;
  period: string;
}

export interface CVLanguage {
  name: string;
  level: string;
}

export interface CVData {
  locale: Locale;
  name: string;
  role: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  links: CVLink[];
  skills: string[];
  experience: CVExperience[];
  projects: CVProject[];
  education: CVEducation[];
  languages: CVLanguage[];
}

/** Rol = texto antes del primer punto del tagline. Sin punto → tagline completo. */
function roleFromTagline(tagline: string): string {
  const dot = tagline.indexOf(".");
  return (dot === -1 ? tagline : tagline.slice(0, dot)).trim();
}

/** Normaliza una URL a texto plano legible por ATS (sin protocolo). */
function plainUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function mapCV(locale: Locale): CVData {
  const p = getPortfolio(locale);
  const { personalInfo, socials } = p;

  const links: CVLink[] = [];
  if (socials.linkedin) links.push({ label: "LinkedIn", url: socials.linkedin });
  if (socials.github) links.push({ label: "GitHub", url: socials.github });

  const projects: CVProject[] = p.projects.map((proj) => {
    const projLinks: CVLink[] = [];

    // Demo: solo si hay link real (no placeholder "#").
    if (proj.link && proj.link !== "#") {
      projLinks.push({ label: "Demo", url: proj.link });
    }

    // Repos: solo de proyectos públicos.
    if (!proj.isPrivate) {
      if (proj.repo) projLinks.push({ label: "Repo", url: proj.repo });
      if (proj.repos) {
        for (const r of proj.repos) {
          if (r.url) projLinks.push({ label: r.label, url: r.url });
        }
      }
    }

    return {
      title: proj.title,
      stack: proj.tags.join(", "),
      // Versión corta pensada para CV; fallback a la descripción completa.
      description: proj.cvDescription ?? proj.description,
      links: projLinks,
    };
  });

  return {
    locale,
    name: personalInfo.name,
    role: roleFromTagline(personalInfo.tagline),
    summary: personalInfo.description,
    location: personalInfo.location,
    email: personalInfo.email,
    phone: personalInfo.phone ?? "",
    links: links.map((l) => ({ label: l.label, url: plainUrl(l.url) })),
    skills: p.skills,
    experience: p.experience.map((e) => ({
      company: e.company,
      role: e.role,
      period: e.period,
      description: e.description,
    })),
    projects: projects.map((proj) => ({
      ...proj,
      links: proj.links.map((l) => ({ label: l.label, url: plainUrl(l.url) })),
    })),
    education: p.education.map((e) => ({
      institution: e.institution,
      degree: e.degree,
      period: e.period,
    })),
    languages: p.languages.map((l) => ({ name: l.name, level: l.level })),
  };
}

export function getCVDataEN(): CVData {
  return mapCV("en");
}

export function getCVDataES(): CVData {
  return mapCV("es");
}
