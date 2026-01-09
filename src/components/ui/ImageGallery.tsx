"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

export function ImageGallery({ images, isOpen, onClose }: ImageGalleryProps) {
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
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-50"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center bg-neutral-900 text-white">

                {/* <Image src={images[currentIndex]} alt="Gallery" fill className="object-contain" /> */}
                
                <span className="text-xl font-medium text-neutral-500">
                    Mostrando imagen: {images[currentIndex]}
                </span>
                
                <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-neutral-400">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Navegación (Solo si hay más de 1 foto) */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
             {images.map((img, idx) => (
               <button
                 key={idx}
                 onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                 className={`
                    w-16 h-12 rounded-md overflow-hidden border-2 transition-all
                    ${currentIndex === idx ? "border-primary scale-110" : "border-transparent opacity-50 hover:opacity-100"}
                 `}
               >
                 <div className="w-full h-full bg-neutral-800" />
                 {/* <Image src={img} ... /> */}
               </button>
             ))}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}