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
