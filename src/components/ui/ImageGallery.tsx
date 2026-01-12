"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  title?: string; 
}

export function ImageGallery({ images, isOpen, onClose, title = "Proyecto" }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
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
            className="relative w-full max-w-6xl aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center"
          >
            <div className="relative w-full h-full">
                <Image 
                    src={images[currentIndex]} 
                    alt={`${title} - Captura ${currentIndex + 1}`} 
                    fill 
                    className="object-contain" 
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority 
                />
                
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                    <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        {currentIndex + 1} / {images.length}
                    </span>
                </div>
            </div>

            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm border border-white/10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm border border-white/10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto py-2">
             {images.map((img, idx) => (
               <button
                 key={idx}
                 onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                 className={`
                    relative w-16 h-12 rounded-md overflow-hidden border-2 transition-all shrink-0
                    ${currentIndex === idx ? "border-primary scale-110 ring-2 ring-primary/20" : "border-transparent opacity-50 hover:opacity-100"}
                 `}
               >
                 <Image 
                    src={img} 
                    alt={`Miniatura ${idx + 1}`} 
                    fill
                    className="object-cover" 
                    sizes="100px"
                 />
               </button>
             ))}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}