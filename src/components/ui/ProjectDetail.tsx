"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Lock, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
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
  const tNav = useTranslations("Projects");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  // Distingue arrastre de click para no abrir el lightbox al draggear el carrusel.
  const pointerDown = useRef<{ x: number; y: number } | null>(null);

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

  const gallery = project?.gallery ?? [];
  // El carrusel muestra la galería; si no hay, cae a la portada como slide único.
  const slides =
    gallery.length > 0 ? gallery : project?.image ? [{ url: project.image }] : [];
  const hasSlides = slides.length > 0;
  const hasLink = project?.link && project.link !== "#";
  const hasRepo = project?.repo && project.repo !== "#";
  const repoLinks =
    project?.repos && project.repos.length > 0
      ? project.repos
      : hasRepo
        ? [{ label: t("code"), url: project!.repo! }]
        : [];

  const onSlidePointerDown = (e: React.PointerEvent) => {
    pointerDown.current = { x: e.clientX, y: e.clientY };
  };

  const openLightbox = (idx: number) => (e: React.MouseEvent) => {
    const start = pointerDown.current;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) return;
    setLightboxIndex(idx);
  };

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
                className="absolute right-4 top-4 z-30 rounded-full bg-black/50 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Carrusel principal (reemplaza la imagen estática + galería de abajo) */}
              <div className="relative bg-muted">
                {hasSlides ? (
                  <>
                    <div className="overflow-hidden" ref={emblaRef}>
                      <div className="flex">
                        {slides.map((item, idx) => {
                          const isVideo = item.type === "video";
                          return (
                            <div
                              key={idx}
                              className="relative aspect-video w-full shrink-0 grow-0 basis-full"
                            >
                              {isVideo ? (
                                <video
                                  src={item.url}
                                  controls
                                  muted
                                  playsInline
                                  preload="metadata"
                                  poster={item.thumbnail}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <button
                                  type="button"
                                  onPointerDown={onSlidePointerDown}
                                  onClick={openLightbox(idx)}
                                  aria-label={`${project.title} — ${idx + 1}`}
                                  className="group/slide relative block h-full w-full cursor-pointer overflow-hidden"
                                >
                                  <Image
                                    src={item.thumbnail || item.url}
                                    alt={`${project.title} — ${idx + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-out group-hover/slide:scale-[1.04]"
                                    sizes="(max-width: 768px) 100vw, 768px"
                                  />
                                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/slide:bg-black/35">
                                    <span className="flex translate-y-1.5 items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/slide:translate-y-0 group-hover/slide:opacity-100">
                                      <Maximize2 size={14} /> {t("expand")}
                                    </span>
                                  </span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {slides.length > 1 && (
                      <>
                        <button
                          onClick={() => emblaApi?.scrollPrev()}
                          disabled={!canPrev}
                          aria-label={tNav("prev")}
                          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/90 backdrop-blur-md transition-all hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0 cursor-pointer"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => emblaApi?.scrollNext()}
                          disabled={!canNext}
                          aria-label={tNav("next")}
                          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/90 backdrop-blur-md transition-all hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0 cursor-pointer"
                        >
                          <ChevronRight size={20} />
                        </button>

                        <span className="absolute bottom-3 right-3 z-20 rounded-full bg-black/55 px-2.5 py-0.5 text-xs text-white/90 backdrop-blur-sm">
                          {selectedIndex + 1} / {slides.length}
                        </span>

                        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
                          {slides.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => emblaApi?.scrollTo(i)}
                              aria-label={`${tNav("goToSlide")} ${i + 1}`}
                              aria-current={selectedIndex === i}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                selectedIndex === i
                                  ? "w-6 bg-white"
                                  : "w-2 bg-white/40 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center bg-secondary/30 text-sm text-muted-foreground">
                    {t("imageNotAvailable")}
                  </div>
                )}

                {project.isPrivate && (
                  <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-white shadow-sm backdrop-blur-md">
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

                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="mb-3 text-sm font-semibold text-foreground">
                      {t("highlights")}
                    </h4>
                    <ul className="space-y-2.5">
                      {project.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-primary/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
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
          </motion.div>
        )}
      </AnimatePresence>

      {project && hasSlides && (
        <ImageGallery
          images={slides}
          isOpen={lightboxIndex !== null}
          initialIndex={lightboxIndex ?? 0}
          onClose={() => setLightboxIndex(null)}
          title={project.title}
        />
      )}
    </>
  );
}
