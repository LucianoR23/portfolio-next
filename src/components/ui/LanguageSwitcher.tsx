"use client";

import { useLocale } from "next-intl";
import { useLocaleSwitcher } from "@/components/i18n/locale-provider";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const { switchLocale } = useLocaleSwitcher();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    // Fundido solo del texto (la clase la consume globals.css). El cambio de
    // idioma se dispara con el texto apagado (~315ms de la animación de 700ms),
    // y NO navega de ruta → no re-monta el árbol, no hay pestañeo de recarga.
    const root = document.documentElement;
    root.classList.add("lang-switching");
    window.setTimeout(() => switchLocale(next), 315);
    window.setTimeout(() => root.classList.remove("lang-switching"), 720);
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full bg-white/10 p-0.5 border border-white/10">
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            onClick={() => switchTo(loc)}
            aria-pressed={isActive}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer ${
              isActive
                ? "bg-white text-black"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
