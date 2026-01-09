"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  variant?: "bento" | "minimal" | string;
}

export function Projects({ variant = "minimal" }: ProjectsProps) {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="w-full py-20 md:py-32">
      <div className={`container mx-auto px-4 ${variant === 'bento' ? 'max-w-6xl' : 'max-w-3xl'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Una selección de soluciones que he construido, desde herramientas de negocio hasta aplicaciones experimentales.
          </p>
        </motion.div>

        <div className={
          variant === "bento" 
            ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
            : "flex flex-col gap-12"
        }>
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              variant={variant} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}