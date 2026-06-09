import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Idiomas soportados
  locales: ["en", "es"],

  // Idioma por defecto (la raíz "/" sirve inglés sin prefijo)
  defaultLocale: "en",

  // "as-needed": el idioma por defecto NO lleva prefijo (/ , /cv),
  // el resto sí (/es , /es/cv). Preserva las URLs actuales y su SEO.
  localePrefix: "as-needed",

  // Sin detección automática por cookie/navegador: la raíz siempre es inglés
  // y el idioma se elige con el selector. Evita que la cookie NEXT_LOCALE=es
  // rebote "/" de vuelta a "/es" al intentar pasar a inglés.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

// Zona horaria global de la app. Fuente única usada tanto por el config de
// server (request.ts) como por el NextIntlClientProvider del lado cliente
// (locale-provider.tsx). Sin pasarla al provider de cliente, next-intl emite
// el warning ENVIRONMENT_FALLBACK al prerenderizar componentes cliente.
export const timeZone = "America/Argentina/Buenos_Aires";
