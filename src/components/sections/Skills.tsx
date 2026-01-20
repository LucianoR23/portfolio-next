"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

interface SkillsProps {
  variant?: "bento" | "minimal" | string;
}

export function Skills({ variant = "minimal" }: SkillsProps) {
  const { skills } = portfolioData;

  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half);
  const row2 = skills.slice(half);

  if (variant === "bento") {
    return (
      <section id="skills" className="w-full py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 pl-1">
            Tech Stack
          </h3>

          <div className="bg-card border border-border rounded-2xl py-8 shadow-sm overflow-hidden relative group">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-card to-transparent z-10 pointer-events-none transition-opacity group-hover:opacity-0" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-card to-transparent z-10 pointer-events-none transition-opacity group-hover:opacity-0" />

            <div className="flex overflow-hidden mb-4 mask-gradient">
              <div 
                className="flex gap-4 pr-4 w-max animate-scroll-left hover:[animation-play-state:paused]"
              >
                {[...row1, ...row1, ...row1, ...row1].map((skill, i) => (
                  <SkillTag key={`r1-${skill}-${i}`} name={skill} />
                ))}
              </div>
            </div>

            <div className="flex overflow-hidden">
              <div 
                className="flex gap-4 pr-4 w-max animate-scroll-right hover:[animation-play-state:paused]"
              >
                {[...row2, ...row2, ...row2, ...row2].map((skill, i) => (
                  <SkillTag key={`r2-${skill}-${i}`} name={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-6 text-primary">Technical Skills</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                <span className="text-muted-foreground font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillTag({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 bg-secondary/30 rounded-full border border-border whitespace-nowrap hover:bg-secondary/60 hover:border-primary/50 transition-colors cursor-default">
      <span className="font-semibold text-secondary-foreground">{name}</span>
    </div>
  );
}