import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Aplica a todo salvo rutas internas de Next, la API, las rutas de metadata
  // sin extensión (icon, sitemap, robots) y archivos con extensión
  // (imágenes, videos, etc.). Sin excluir `icon`, el proxy prefijaría
  // /icon → /es/icon (404) y rompería el favicon.
  matcher: ["/((?!api|_next|_vercel|icon|sitemap|robots|.*\\..*).*)"],
};
