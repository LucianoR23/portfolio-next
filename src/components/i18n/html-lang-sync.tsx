"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/**
 * Mantiene el atributo `lang` del <html> en sync con el locale activo.
 * El root layout renderiza el <html> con el idioma por defecto (es estable y no
 * conoce el locale de la ruta); este efecto lo corrige en cliente — incluido el
 * caso de navegación soft entre idiomas, donde el root layout no se re-renderiza.
 */
export function HtmlLangSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
