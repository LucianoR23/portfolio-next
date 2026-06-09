import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers de navegación que respetan el locale activo automáticamente.
// Usar estos en vez de los de "next/link" / "next/navigation".
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
