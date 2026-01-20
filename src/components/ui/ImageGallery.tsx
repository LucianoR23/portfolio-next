"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Info, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/data/portfolio";

interface ImageGalleryProps {
  images: (string | GalleryItem)[]; 
  isOpen: boolean;
  onClose: () => void;
  title?: string; 
}

export function ImageGallery({ images, isOpen, onClose, title = "Project" }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCurrentData = (item: string | GalleryItem) => {
    if (typeof item === 'string') {
      return { 
        url: item, 
        type: "image", 
        description: null,
        thumbnail: item 
      };
    }
    return { 
      url: item.url, 
      type: item.type || "image", 
      description: item.description,
      thumbnail: item.thumbnail || null
    };
  };

  const currentItem = getCurrentData(images[currentIndex]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-auto max-h-[80vh] bg-neutral-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center bg-black min-h-[300px]">
                
                {currentItem.type === "video" ? (
                  <video
                    src={currentItem.url}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full max-h-[80vh] object-contain" 
                    poster={currentItem.thumbnail || undefined}
                  >
                    Your browser does not support videos.
                  </video>
                ) : (
                  
                  <div className="relative w-full h-full min-h-[50vh]">
                    <Image 
                        src={currentItem.url} 
                        alt={`${title} - View ${currentIndex + 1}`} 
                        fill 
                        className="object-contain" 
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority 
                    />
                  </div>
                )}
                
                {currentItem.description && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-white/10 p-4 md:p-6 transition-transform z-10 pointer-events-none">
                    <div className="max-w-4xl mx-auto flex gap-3 items-start">
                        <Info className="shrink-0 text-primary mt-0.5" size={20} />
                        <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
                          {currentItem.description}
                        </p>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 left-4 pointer-events-none z-20">
                    <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        {currentIndex + 1} / {images.length}
                    </span>
                </div>
            </div>

            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm border border-white/10 z-20 group"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm border border-white/10 z-20 group"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>

          <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto py-2 z-50 pointer-events-auto">
             {images.map((img, idx) => {
               const itemData = getCurrentData(img);
               const isVideo = itemData.type === "video";
               
               return (
                 <button
                   key={idx}
                   onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                   className={`
                      relative w-16 h-12 rounded-md overflow-hidden border-2 transition-all shrink-0 bg-neutral-900
                      ${currentIndex === idx ? "border-primary scale-110 ring-2 ring-primary/20" : "border-transparent opacity-50 hover:opacity-100"}
                   `}
                 >
                   {isVideo ? (
                     <div className="w-full h-full relative flex items-center justify-center">
                        {itemData.thumbnail ? (
                           <Image 
                              src={itemData.thumbnail} 
                              alt={`Video thumbnail ${idx + 1}`} 
                              fill
                              className="object-cover opacity-70" 
                           />
                        ) : (
                           
                           <div className="absolute inset-0 bg-neutral-800" />
                        )}
                        <Play size={16} className="text-white relative z-10 drop-shadow-md" fill="white" />
                     </div>
                   ) : (
                     <Image 
                        src={itemData.url} 
                        alt={`Thumbnail ${idx + 1}`} 
                        fill
                        className="object-cover" 
                        sizes="100px"
                     />
                   )}
                 </button>
               );
             })}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}