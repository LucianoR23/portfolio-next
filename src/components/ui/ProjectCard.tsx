"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Images, Lock } from "lucide-react"; 
import Link from "next/link";
import { useState } from "react"; 
import { type Project } from "@/data/portfolio";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { ImageGallery } from "@/components/ui/ImageGallery"; 
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  variant: "bento" | "minimal" | string;
  index: number;
}

export function ProjectCard({ project, variant, index }: ProjectCardProps) {
  const isBento = variant === "bento";
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); 

  const hasGallery = project.gallery && project.gallery.length > 0;
  const hasLink = project.link && project.link !== "#";
  const hasRepo = project.repo && project.repo !== "#";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`
          group relative overflow-hidden rounded-2xl border border-border bg-card flex flex-col h-full
          ${!isBento && "md:grid md:grid-cols-2 md:gap-8 md:p-6 hover:bg-accent/5 transition-colors"}
        `}
      >
        <div className={`
          relative overflow-hidden bg-muted group-hover:shadow-lg transition-all
          ${isBento ? "aspect-video w-full border-b border-border" : "aspect-video md:aspect-auto h-full w-full rounded-xl border border-border/50"}
        `}>
          
          {project.image ? (
            <Image 
              src={project.image} 
              alt={`Imagen de ${project.title}`}
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/30">
               <span className="text-sm">Imagen no disponible</span>
            </div>
          )}

          {project.isPrivate && (
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10 z-10 shadow-sm">
              <Lock size={12} />
              <span>Proprietary Soft</span>
            </div>
          )}

          {hasGallery && (
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md transition-all z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer"
            >
              <Images size={14} />
              Ver Galería
            </button>
          )}
        </div>

        <div className={`flex flex-col flex-1 justify-between ${isBento ? "p-6" : "py-4 md:py-0"}`}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </h3>
              
              {!isBento && hasLink && (
                 <Link href={project.link!} target="_blank" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors shrink-0">
                   <ArrowUpRight size={20} />
                 </Link>
              )}
            </div>

            <p className="text-muted-foreground mb-5 text-sm md:text-base leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-secondary/50 text-secondary-foreground border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-auto">
            
            {hasLink ? (
               <Link href={project.link!} target="_blank" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 shadow-sm transition-all hover:-translate-y-0.5">
                  <ExternalLink size={16} /> Ver Demo
               </Link>
            ) : hasGallery ? (
              <button 
                  onClick={() => setIsGalleryOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer"
              >
                <Images size={16} /> Ver Pantallas
              </button>
            ) : (
              <button disabled className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary text-muted-foreground font-medium text-sm opacity-50 cursor-not-allowed">
                <Lock size={16} /> Confidencial
              </button>
            )}

            {!project.isPrivate && hasRepo && (
              <Link href={project.repo!} target="_blank" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 border border-border/50 transition-colors">
                <GithubIcon size={16} /> Código
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {hasGallery && (
        <ImageGallery 
            images={project.gallery || []} 
            isOpen={isGalleryOpen} 
            onClose={() => setIsGalleryOpen(false)} 
        />
      )}
    </>
  );
}