"use client";

import { useLocale } from "next-intl";
import { usePathname, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    // Navegación dura a propósito: cambiar de idioma re-renderiza el layout
    // raíz, y una nav "soft" haría que next-themes reinyecte su <script>
    // anti-flash en el cliente (React 19 lo prohíbe). Una recarga real deja
    // que el server pinte de cero con el lang y el tema correctos, sin flash.
    // `pathname` viene sin prefijo de idioma; getPathname agrega el correcto.
    const href = getPathname({ href: pathname, locale: next });
    window.location.assign(href);
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
