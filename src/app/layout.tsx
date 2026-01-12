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
  title: "Luciano Rodriguez | Desarrollador Web",
  description: "Portfolio de Luciano Rodriguez. Desarrollador Frontend especializado en Next.js y React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
        <div className="fixed top-0 left-0 w-full h-20 bg-linear-to-b from-background to-transparent z-50 pointer-events-none" />
        {children}
        <div className="fixed bottom-0 left-0 w-full h-20 bg-linear-to-t from-background to-transparent z-50 pointer-events-none" />
        </ThemeProvider>
      </body>
    </html>
  );
}