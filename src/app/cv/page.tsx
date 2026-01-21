"use client";

import React from "react";
import Link from "next/link";
import { Mail, Github, Linkedin, MapPin, Printer, Globe } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function CVPage() {
  const { personalInfo, experience, education, skills, projects, socials } = portfolioData;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-black p-0 md:p-8 font-sans print:p-0 print:bg-white">
      
      {/* Botón flotante */}
      <div className="fixed bottom-8 right-8 print:hidden z-50">
        <button
          onClick={() => window.print()}
          className="bg-black text-white p-4 rounded-full shadow-xl hover:bg-neutral-800 transition-all flex items-center gap-2 font-bold cursor-pointer"
        >
          <Printer size={20} /> Save as PDF
        </button>
      </div>

      {/* Hoja A4 */}
      <main className="mx-auto max-w-[210mm] bg-white md:shadow-2xl md:p-[20mm] print:shadow-none print:w-full print:max-w-none print:p-0">
        
        {/* ENCABEZADO */}
        <header className="border-b-2 border-black pb-4 mb-5">
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">{personalInfo.name}</h1>
          <p className="text-base text-neutral-600 font-medium mb-3">{personalInfo.tagline}</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-700">
            <div className="flex items-center gap-1">
              <MapPin size={12} /> {personalInfo.location}
            </div>
            <Link href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline">
              <Mail size={12} /> {personalInfo.email}
            </Link>
            <Link href={socials.linkedin} target="_blank" className="flex items-center gap-1 hover:underline">
              <Linkedin size={12} /> LinkedIn
            </Link>
            <Link href={socials.github} target="_blank" className="flex items-center gap-1 hover:underline">
              <Github size={12} /> GitHub
            </Link>
            <Link href="https://luciano-rodriguez.vercel.app" target="_blank" className="flex items-center gap-1 hover:underline">
              <Globe size={12} /> Portfolio
            </Link>
          </div>
        </header>

        {/* 2 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid print:grid-cols-3 print:gap-8">
          
          {/* COLUMNA IZQUIERDA (Principal 2/3) */}
          <div className="md:col-span-2 print:col-span-2 space-y-6">
            
            <section>
              <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-2">Professional Profile</h2>
              <p className="text-xs leading-relaxed text-justify text-neutral-700">
                {personalInfo.description}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-3">Work Experience</h2>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div key={index} className="avoid-break">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-sm">{job.role}</h3>
                      <span className="text-[11px] font-medium bg-neutral-100 px-2 py-0.5 rounded print:border print:border-neutral-200">
                        {job.period}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-800 mb-1">{job.company}</div>
                    <p className="text-xs text-neutral-600 leading-snug text-justify">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-3">Selected Projects</h2>
              <div className="space-y-4">
                {projects.slice(0, 3).map((proj, index) => ( 
                  <div key={index} className="avoid-break">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm">{proj.title}</h3>
                    </div>
                    <p className="text-[10px] text-neutral-500 mb-0.5 font-mono">
                      {proj.tags.slice(0, 4).join(" • ")}
                    </p>
                    <p className="text-xs text-neutral-600 leading-snug text-justify">
                      {proj.description.substring(0, 160)}...
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* COLUMNA DERECHA (Lateral 1/3) */}
          <div className="space-y-6 print:col-span-1">
            
            <section className="avoid-break">
              <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-3">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-xs">{edu.institution}</h3>
                    <p className="text-[11px] text-neutral-600 italic mb-0.5">{edu.degree}</p>
                    <span className="text-[10px] font-medium bg-neutral-100 px-1.5 py-0.5 rounded inline-block border print:border-neutral-200">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="avoid-break">
              <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-3">Technical Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-medium rounded border border-neutral-200">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
            
             <section className="avoid-break">
              <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-3">Languages</h2>
              <ul className="text-xs space-y-1">
                <li className="flex justify-between">
                  <span>Spanish</span>
                  <span className="font-semibold text-neutral-500">Native</span>
                </li>
                <li className="flex justify-between">
                  <span>English</span>
                  <span className="font-semibold text-neutral-500">B1/B2</span>
                </li>
              </ul>
            </section>

          </div>
        </div>

      </main>
      
      {/* ESTILOS DE IMPRESIÓN */}
      <style jsx global>{`
        @media print {
          @page {
            /* AUMENTADO A 20mm (2cm) por lado. Esto debería darte el espacio que falta. */
            margin: 20mm; 
            size: A4;
          }
          body {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
          }
          .avoid-break {
            break-inside: avoid;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}