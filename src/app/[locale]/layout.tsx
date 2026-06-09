import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed top-0 left-0 w-full h-20 bg-linear-to-b from-background to-transparent z-50 pointer-events-none print:hidden" />
            {children}
            <div className="fixed bottom-0 left-0 w-full h-20 bg-linear-to-t from-background to-transparent z-50 pointer-events-none print:hidden" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
