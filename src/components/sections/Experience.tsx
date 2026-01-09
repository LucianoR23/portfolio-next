"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

interface ExperienceProps {
  variant?: "bento" | "minimal" | string;
}

export const Experience = ({ variant = "minimal" }: ExperienceProps) => {
  const { experience, education } = portfolioData;
  const isBento = variant === "bento";

  return (
    <section id="experience" className="w-full py-20">
      <div className={`container mx-auto px-4 ${isBento ? 'max-w-6xl' : 'max-w-3xl'}`}>
        
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trayectoria
          </h2>
          <p className="text-muted-foreground">
            Mi camino profesional combinando desarrollo, calidad y negocios.
          </p>
        </motion.div>

        <div className={`grid gap-12 ${isBento ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          
          
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold mb-6 text-primary">
              <Briefcase size={20} /> Experiencia Laboral
            </h3>
            
            <div className="space-y-8 border-l-2 border-border ml-3 pl-8 relative">
              {experience.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  
                  <span className="absolute -left-10.25 top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
                  
                  <div className={`
                    ${isBento ? "bg-card p-6 rounded-xl border border-border" : ""}
                  `}>
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                      <Calendar size={12} /> {item.period}
                    </span>
                    <h4 className="text-lg font-bold text-foreground">{item.role}</h4>
                    <p className="text-sm font-medium text-primary mb-2">{item.company}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          
          <div>
             <h3 className="flex items-center gap-2 text-xl font-semibold mb-6 text-primary">
              <GraduationCap size={20} /> Educación
            </h3>
            
            <div className="space-y-8 border-l-2 border-border ml-3 pl-8 relative">
              {education.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-10.25 top-1 h-5 w-5 rounded-full border-4 border-background bg-muted-foreground" />
                  
                  <div className={`
                    ${isBento ? "bg-card p-6 rounded-xl border border-border" : ""}
                  `}>
                    <span className="text-xs font-medium text-muted-foreground mb-1 block">
                      {item.period}
                    </span>
                    <h4 className="text-lg font-bold text-foreground">{item.institution}</h4>
                    <p className="text-muted-foreground text-sm">
                      {item.degree}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}