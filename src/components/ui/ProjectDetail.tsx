"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Lock, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { type Project } from "@/data/portfolio";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { ImageGallery } from "@/components/ui/ImageGallery";

interface ProjectDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetail({ project, isOpen, onClose }: ProjectDetailProps) {
  const t = useTranslations("ProjectCard");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Bloquea el scroll de la página de fondo mientras el modal está abierto
  // (evita el "scroll chaining" que saltaba a la página principal).
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const gallery = project?.gallery ?? [];
  const hasGallery = gallery.length > 0;
  const hasLink = project?.link && project.link !== "#";
  const hasRepo = project?.repo && project.repo !== "#";
  const repoLinks =
    project?.repos && project.repos.length > 0
      ? project.repos
      : hasRepo
        ? [{ label: t("code"), url: project!.repo! }]
        : [];

  return (
    <>
      <AnimatePresence>
        {isOpen && project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 sm:items-center sm:p-4"
          >
            <motion.div
              initial={{ y: 48, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 48, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="scrollbar-custom relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-2xl border border-border bg-card shadow-2xl sm:max-h-[88vh] sm:rounded-2xl"
            >
              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Imagen principal */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`Image of ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 text-sm text-muted-foreground">
                    {t("imageNotAvailable")}
                  </div>
                )}
                {project.isPrivate && (
                  <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-white shadow-sm backdrop-blur-md">
                    <Lock size={12} />
                    <span>{t("proprietary")}</span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                {/* Título + acciones (sin scroll para alcanzarlas) */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {project.title}
                  </h3>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {hasLink ? (
                      <Link
                        href={project.link!}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
                      >
                        <ExternalLink size={15} /> {t("viewDemo")}
                      </Link>
                    ) : (
                      project.isPrivate && (
                        <span className="inline-flex items-center gap-2 rounded-lg bg-secondary px-3.5 py-2 text-sm font-medium text-muted-foreground opacity-70">
                          <Lock size={15} /> {t("confidential")}
                        </span>
                      )
                    )}

                    {!project.isPrivate &&
                      repoLinks.map((repo) => (
                        <Link
                          key={repo.url}
                          href={repo.url}
                          target="_blank"
                          className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                        >
                          <GithubIcon size={15} /> {repo.label}
                        </Link>
                      ))}
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.description}
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Galería embebida */}
                {hasGallery && (
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-foreground">
                      {t("gallery")}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {gallery.map((item, idx) => {
                        const isVideo = typeof item !== "string" && item.type === "video";
                        const url = typeof item === "string" ? item : item.url;
                        const thumbnail = typeof item === "string" ? undefined : item.thumbnail;

                        return (
                          <button
                            key={idx}
                            onClick={() => setLightboxIndex(idx)}
                            aria-label={`${project.title} — ${idx + 1}`}
                            className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-muted cursor-pointer"
                          >
                            {isVideo && !thumbnail ? (
                              <video
                                src={url}
                                muted
                                playsInline
                                preload="metadata"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <Image
                                src={thumbnail || url}
                                alt={`${project.title} — ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 50vw, 240px"
                              />
                            )}
                            {isVideo && (
                              <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                                <span className="rounded-full bg-black/60 p-2 backdrop-blur-sm">
                                  <Play size={16} className="text-white" fill="white" />
                                </span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {project && hasGallery && (
        <ImageGallery
          images={gallery}
          isOpen={lightboxIndex !== null}
          initialIndex={lightboxIndex ?? 0}
          onClose={() => setLightboxIndex(null)}
          title={project.title}
        />
      )}
    </>
  );
}
