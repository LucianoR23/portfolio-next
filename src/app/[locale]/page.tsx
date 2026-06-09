import { setRequestLocale } from "next-intl/server";
import { Experience, Footer, Hero, Navbar, Projects, Skills } from "@/components";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const styleVariant =
    (process.env.NEXT_PUBLIC_PORTFOLIO_STYLE as "bento" | "minimal") || "minimal";

  return (
    <main className="min-h-screen bg-background pb-10 relative">
      <div id="top" className="absolute top-0" />

      <Navbar />

      <Hero variant={styleVariant} />

      <Skills variant={styleVariant} />

      <Projects variant={styleVariant} />

      <Experience variant={styleVariant} />

      <Footer />
    </main>
  );
}
