import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Aplica a todo salvo rutas internas de Next, la API, las rutas de metadata
  // sin extensión (icon, sitemap, robots), los route handlers de CV ATS y
  // archivos con extensión (imágenes, videos, etc.). Sin excluir `icon`, el
  // proxy prefijaría /icon → /es/icon (404) y rompería el favicon. Igual con
  // `cv-ats`: sin excluirlo, /cv-ats-es se reescribiría a /en/cv-ats-es (404),
  // porque esos route handlers viven fuera de `[locale]`.
  matcher: ["/((?!api|cv-ats|_next|_vercel|icon|sitemap|robots|.*\\..*).*)"],
};
