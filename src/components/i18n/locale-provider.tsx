"use client";

import { createContext, useContext, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { routing, timeZone, type Locale } from "@/i18n/routing";
import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";

const messagesByLocale: Record<Locale, typeof enMessages> = {
  en: enMessages,
  es: esMessages,
};

type LocaleContextValue = {
  locale: Locale;
  switchLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocaleSwitcher() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleSwitcher debe usarse dentro de <LocaleProvider>");
  }
  return ctx;
}

/**
 * Cambia el idioma con estado de cliente, SIN navegación de ruta. Así el árbol
 * de React no se re-monta (no se reinicia el video, ni las animaciones de
 * entrada, ni hay scroll-reset ni pestañeo de recarga): solo se re-renderiza el
 * texto con los nuevos mensajes. La URL se sincroniza con history.replaceState
 * para que siga siendo compartible y correcta en una carga directa (SSR sigue
 * resolviendo el idioma por la ruta `[locale]`).
 */
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    // Ruta lógica (sin prefijo de idioma), leída del navegador en el click.
    // Se lee acá —y no con un hook en el render— para no romper el prerender
    // estático (next-intl usePathname no es compatible con SSG en este árbol).
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments[0] && (routing.locales as readonly string[]).includes(segments[0])) {
      segments.shift();
    }
    const logicalPath = `/${segments.join("/")}`; // "/" o "/cv"
    const base =
      next === routing.defaultLocale
        ? logicalPath
        : `/${next}${logicalPath === "/" ? "" : logicalPath}`;
    const url = `${base}${window.location.search}${window.location.hash}`;
    // Actualiza la URL sin navegar (no toca el router de Next → no re-monta).
    window.history.replaceState(window.history.state, "", url);
    setLocale(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      <NextIntlClientProvider
        locale={locale}
        timeZone={timeZone}
        messages={messagesByLocale[locale]}
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
