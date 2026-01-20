"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
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