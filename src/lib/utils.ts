import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases condicionales y resuelve conflictos de Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
  e.preventDefault();

  const targetId = href.replace(/^#/, "");

  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  }
};