"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Images, Lock, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { type Project } from "@/data/portfolio";
import { useEntrance } from "@/lib/use-entrance";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { ImageGallery } from "@/components/ui/ImageGallery";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  variant: "bento" | "minimal" | string;
  index: number;
  /** En bento (carrusel) la card entera abre el detalle; sin esto se comporta como antes. */
  onOpenDetail?: () => void;
}

export function ProjectCard({ project, variant, index, onOpenDetail }: ProjectCardProps) {
  const t = useTranslations("ProjectCard");
  const isBento = variant === "bento";
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const entrance = useEntrance();
  const fadeInView = entrance
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1 },
      }
    : {};

  const hasGallery = project.gallery && project.gallery.length > 0;
  const hasLink = project.link && project.link !== "#";
  const hasRepo = project.repo && project.repo !== "#";
  const repoLinks =
    project.repos && project.repos.length > 0
      ? project.repos
      : hasRepo
        ? [{ label: t("code"), url: project.repo! }]
        : [];

  // Distingue arrastre (carrusel) de click real para no abrir el detalle al deslizar.
  const pointerDown = useRef<{ x: number; y: number } | null>(null);
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDown.current = { x: e.clientX, y: e.clientY };
  };
  const handleClick = (e: React.MouseEvent) => {
    const start = pointerDown.current;
    if (start) {
      const dist = Math.hypot(e.clientX - start.x, e.clientY - start.y);
      if (dist > 10) return; // fue un drag, no un click
    }
    onOpenDetail?.();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenDetail?.();
    }
  };

  // ── Bento: card como superficie clickeable que abre el detalle ──────────────
  if (isBento) {
    return (
      <motion.div
        {...fadeInView}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={project.title}
        className="group relative flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted transition-all group-hover:shadow-lg">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Image of ${project.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 88vw, (max-width: 1024px) 70vw, 58vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 text-muted-foreground">
              <span className="text-sm">{t("imageNotAvailable")}</span>
            </div>
          )}

          {project.isPrivate && (
            <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-white shadow-sm backdrop-blur-md">
              <Lock size={12} />
              <span>{t("proprietary")}</span>
            </div>
          )}

          {/* Hint de expansión */}
          <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex translate-y-2 items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-md transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <Maximize2 size={14} />
            {t("viewDetails")}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-3 line-clamp-1 text-xl font-bold transition-colors group-hover:text-primary md:text-2xl">
            {project.title}
          </h3>

          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Minimal: layout original con acciones y galería propia ──────────────────
  return (
    <>
      <motion.div
        {...fadeInView}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:bg-accent/5 md:grid md:grid-cols-2 md:gap-8 md:p-6"
      >
        <div className="relative aspect-video h-full w-full overflow-hidden rounded-xl border border-border/50 bg-muted transition-all group-hover:shadow-lg md:aspect-auto">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Image of ${project.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 text-muted-foreground">
              <span className="text-sm">{t("imageNotAvailable")}</span>
            </div>
          )}

          {project.isPrivate && (
            <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-white shadow-sm backdrop-blur-md">
              <Lock size={12} />
              <span>{t("proprietary")}</span>
            </div>
          )}

          {hasGallery && (
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="absolute bottom-3 right-3 z-20 flex translate-y-2 items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-md transition-all hover:bg-black/90 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer"
            >
              <Images size={14} />
              {t("viewGallery")}
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between py-4 md:py-0">
          <div>
            <div className="mb-3 flex items-start justify-between">
              <h3 className="line-clamp-1 text-xl font-bold transition-colors group-hover:text-primary md:text-2xl">
                {project.title}
              </h3>

              {hasLink && (
                <Link href={project.link!} target="_blank" className="shrink-0 rounded-full bg-secondary p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                  <ArrowUpRight size={20} />
                </Link>
              )}
            </div>

            <p className="mb-5 line-clamp-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.description}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            {hasLink ? (
              <Link href={project.link!} target="_blank" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90">
                <ExternalLink size={16} /> {t("viewDemo")}
              </Link>
            ) : hasGallery ? (
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 cursor-pointer"
              >
                <Images size={16} /> {t("viewScreens")}
              </button>
            ) : (
              <button disabled className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground opacity-50">
                <Lock size={16} /> {t("confidential")}
              </button>
            )}

            {!project.isPrivate &&
              repoLinks.map((repo) => (
                <Link key={repo.url} href={repo.url} target="_blank" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border/50 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                  <GithubIcon size={16} /> {repo.label}
                </Link>
              ))}
          </div>
        </div>
      </motion.div>

      {hasGallery && (
        <ImageGallery
          images={project.gallery || []}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          title={project.title}
        />
      )}
    </>
  );
}
