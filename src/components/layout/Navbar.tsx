"use client";

import { smoothScroll } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { name: "Inicio", href: "#top", icon: Home },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Proyectos", href: "#projects", icon: User },
  { name: "Contacto", href: "#contact", icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
      if (scrolled) setIsMobileOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isExpanded = !isScrolled || isHovered || isMobileOpen;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-start pointer-events-none">
      <motion.nav
        ref={navRef}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => {
            if (!isExpanded) setIsMobileOpen(true);
        }}
        layout
        transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 18, 
            mass: 0.8
        }}
        className={`
            pointer-events-auto cursor-pointer
            w-fit mx-auto min-w-12
            flex items-center justify-center
            bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl
            overflow-hidden relative
        `}
        style={{
            borderRadius: 9999,
        }}
        animate={{
            width: isExpanded ? "auto" : 48,
            height: 48,
            padding: isExpanded ? "0 6px" : "0", 
            gap: isExpanded ? 4 : 0
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isExpanded ? (
            <motion.div
                key="full-menu"
                
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }} 
                className="flex items-center gap-1 whitespace-nowrap px-1" 
            >
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                                smoothScroll(e, item.href); 
                                setIsMobileOpen(false);     
                            }}
                              className="relative px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:bg-white/20 transition-colors flex items-center gap-2 group"
                          >
                            <Icon size={16} className="text-white" />
                            <span className="hidden sm:inline">{item.name}</span>
                        </Link>
                    );
                })}
            </motion.div>
          ) : (
            <motion.div
                key="collapsed-menu"
                initial={{ opacity: 0, rotate: -90, filter: "blur(10px)" }}
                animate={{ opacity: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, rotate: 90, filter: "blur(10px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Menu size={20} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}