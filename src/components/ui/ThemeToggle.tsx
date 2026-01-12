"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Esperamos a que el componente se monte para evitar errores de hidratación
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/80 transition-colors focus:outline-none"
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {/* Ícono del SOL (Visible en Light Mode) */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,     // Si es oscuro, se achica a 0
          rotate: isDark ? 90 : 0,   // Si es oscuro, gira 90 grados
          opacity: isDark ? 0 : 1    // Si es oscuro, desaparece
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun size={22} className="text-yellow-500" /> {/* Le puse color amarillo al sol */}
      </motion.div>

      {/* Ícono de la LUNA (Visible en Dark Mode) */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,      // Si es oscuro, crece a tamaño normal
          rotate: isDark ? 0 : -90,   // Si es oscuro, vuelve a rotación 0
          opacity: isDark ? 1 : 0     // Si es oscuro, aparece
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon size={22} className="text-blue-400" /> {/* Le puse color azulito a la luna */}
      </motion.div>
    </button>
  );
}