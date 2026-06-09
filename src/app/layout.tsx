import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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

// Root layout ESTABLE: vive por encima del segmento [locale], así que NO se
// re-renderiza al cambiar de idioma. Por eso el <script> anti-flash de
// next-themes (dentro de ThemeProvider) se monta una sola vez y no rompe en
// React 19 durante la navegación soft entre idiomas.
// El `lang` arranca en el idioma por defecto y se ajusta por locale en cliente
// vía <HtmlLangSync /> (ver app/[locale]/layout.tsx).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={routing.defaultLocale}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
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
      </body>
    </html>
  );
}
