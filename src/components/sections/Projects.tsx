"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getPortfolio } from "@/data/portfolio";
import type { Locale } from "@/i18n/routing";
import { ProjectCard } from "@/components";

const INITIAL_COUNT = 4;

interface ProjectsProps {
  variant?: "bento" | "minimal" | string;
}

export function Projects({ variant = "minimal" }: ProjectsProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Projects");
  const { projects } = getPortfolio(locale);
  const [showAll, setShowAll] = useState(false);
  const firstGroup = projects.slice(0, INITIAL_COUNT);
  const secondGroup = projects.slice(INITIAL_COUNT);
  const hasMore = secondGroup.length > 0;

  const gridClass =
    variant === "bento"
      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
      : "flex flex-col gap-12";

  const btnBase =
    "inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-accent/10 transition-all cursor-pointer";

  return (
    <section id="projects" className="w-full py-20 md:py-32">
      <div className={`container mx-auto px-4 ${variant === "bento" ? "max-w-6xl" : "max-w-3xl"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Primeros 4: siempre visibles */}
        <div className={gridClass}>
          {firstGroup.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              variant={variant}
              index={index}
            />
          ))}
        </div>

        {/* Show all: solo cuando está colapsado */}
        {hasMore && !showAll && (
          <div className="flex justify-center mt-12">
            <button onClick={() => setShowAll(true)} className={btnBase}>
              <ChevronDown size={16} />
              {t("showAll", { count: secondGroup.length })}
            </button>
          </div>
        )}

        {/* Proyectos extra + Show less al fondo */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <div className={`${gridClass} ${variant === "bento" ? "mt-6" : "mt-12"}`}>
                {secondGroup.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    variant={variant}
                    index={INITIAL_COUNT + index}
                  />
                ))}
              </div>

              {/* Show less al fondo, cerca de Experience — sin scroll */}
              <div className="flex justify-center mt-12">
                <button onClick={() => { setShowAll(false); setTimeout(() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }), 300); }} className={btnBase}>
                  <ChevronUp size={16} />
                  {t("showLess")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
