import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
  description: "Luciano Rodriguez's Portfolio. Frontend Developer specialized in Next.js and React.",
  keywords: ["Luciano Rodriguez", "Frontend Developer", "Next.js", "React", "Portfolio", "Argentina", "PostgreSQL", "TypeScript", "Git", "Node.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // CAMBIO IMPORTANTE: lang="en" para SEO y accesibilidad
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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