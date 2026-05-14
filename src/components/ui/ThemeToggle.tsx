"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { scanlineSweepTransition } from "@/lib/scanline-sweep-transition";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    const next = isDark ? "light" : "dark";
    scanlineSweepTransition(() => {
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      setTheme(next);
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="cursor-pointer relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/80 transition-colors focus:outline-none"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,     
          rotate: isDark ? 90 : 0,   
          opacity: isDark ? 0 : 1    
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun size={22} className="text-yellow-500" /> 
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,      
          rotate: isDark ? 0 : -90,   
          opacity: isDark ? 1 : 0     
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon size={22} className="text-blue-400" /> 
      </motion.div>
    </button>
  );
}