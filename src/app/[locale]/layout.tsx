import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { HtmlLangSync } from "@/components/i18n/html-lang-sync";

export const metadata: Metadata = {
  title: "Luciano Rodriguez | Frontend Developer",
  description:
    "Luciano Rodriguez's Portfolio. Frontend Developer specialized in Next.js and React.",
  keywords: [
    "Luciano Rodriguez",
    "Frontend Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Argentina",
    "PostgreSQL",
    "TypeScript",
    "Git",
    "Node.js",
  ],
};

// Pre-renderiza ambos idiomas en build (SSG).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Este layout SÍ se re-renderiza al cambiar de idioma (el segmento [locale]
// cambia), por eso vive acá el provider de i18n: en una navegación soft los
// textos se actualizan al nuevo idioma sin recargar la página. El <html> y el
// ThemeProvider quedan en el root layout (estable) para no reinyectar el script
// de tema en cliente.
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Habilita el renderizado estático con next-intl.
  setRequestLocale(locale);

  return (
    <LocaleProvider initialLocale={locale as Locale}>
      <HtmlLangSync />
      {children}
    </LocaleProvider>
  );
}
