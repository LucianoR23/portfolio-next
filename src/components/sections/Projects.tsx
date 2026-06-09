"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale, useTranslations } from "next-intl";
import { getPortfolio, type Project } from "@/data/portfolio";
import type { Locale } from "@/i18n/routing";
import { useEntrance } from "@/lib/use-entrance";
import { ProjectCard, ProjectDetail } from "@/components";

const INITIAL_COUNT = 4;

interface ProjectsProps {
  variant?: "bento" | "minimal" | string;
}

export function Projects({ variant = "minimal" }: ProjectsProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Projects");
  const { projects } = getPortfolio(locale);
  const entrance = useEntrance();
  const isBento = variant === "bento";
  const fadeInView = entrance
    ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
    : {};

  return (
    <section id="projects" className="w-full py-20 md:py-32">
      <div className={`container mx-auto px-4 ${isBento ? "max-w-6xl" : "max-w-3xl"}`}>
        <motion.div {...fadeInView} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.div>

        {isBento ? (
          <ProjectsCarousel projects={projects} entrance={entrance} />
        ) : (
          <MinimalProjects projects={projects} />
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BENTO — carrusel con drag, peek lateral y detalle en modal
// ─────────────────────────────────────────────────────────────────────────────
function ProjectsCarousel({ projects, entrance }: { projects: Project[]; entrance: boolean }) {
  const t = useTranslations("Projects");
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [detail, setDetail] = useState<Project | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <motion.div
      initial={entrance ? { opacity: 0, y: 20 } : false}
      whileInView={entrance ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("title")}
    >
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-stretch -ml-4 py-4 md:-ml-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                role="group"
                aria-roledescription="slide"
                className="min-w-0 flex-[0_0_88%] pl-4 sm:flex-[0_0_70%] md:pl-6 lg:flex-[0_0_58%]"
              >
                <div
                  className={`h-full transition-all duration-300 ${
                    selectedIndex === index ? "scale-100 opacity-100" : "scale-[0.92] opacity-50"
                  }`}
                >
                  <ProjectCard
                    project={project}
                    variant="bento"
                    index={index}
                    onOpenDetail={() => setDetail(project)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flechas (desktop) */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label={t("prev")}
          className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-30 md:flex cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label={t("next")}
          className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-30 md:flex cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {projects.map((project, i) => (
          <button
            key={project.title}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`${t("goToSlide")} ${i + 1}`}
            aria-current={selectedIndex === i}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              selectedIndex === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-foreground/30"
            }`}
          />
        ))}
      </div>

      <ProjectDetail project={detail} isOpen={detail !== null} onClose={() => setDetail(null)} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MINIMAL — grid vertical con "ver todos / ver menos" (comportamiento original)
// ─────────────────────────────────────────────────────────────────────────────
function MinimalProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const [showAll, setShowAll] = useState(false);
  const firstGroup = projects.slice(0, INITIAL_COUNT);
  const secondGroup = projects.slice(INITIAL_COUNT);
  const hasMore = secondGroup.length > 0;

  const btnBase =
    "inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-accent/10 transition-all cursor-pointer";

  return (
    <>
      <div className="flex flex-col gap-12">
        {firstGroup.map((project, index) => (
          <ProjectCard key={project.title} project={project} variant="minimal" index={index} />
        ))}
      </div>

      {hasMore && !showAll && (
        <div className="mt-12 flex justify-center">
          <button onClick={() => setShowAll(true)} className={btnBase}>
            <ChevronDown size={16} />
            {t("showAll", { count: secondGroup.length })}
          </button>
        </div>
      )}

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mt-12 flex flex-col gap-12">
              {secondGroup.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  variant="minimal"
                  index={INITIAL_COUNT + index}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button
                onClick={() => {
                  setShowAll(false);
                  setTimeout(() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }), 300);
                }}
                className={btnBase}
              >
                <ChevronUp size={16} />
                {t("showLess")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
