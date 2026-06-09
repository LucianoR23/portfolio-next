"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getPortfolio } from "@/data/portfolio";
import type { Locale } from "@/i18n/routing";
import { useEntrance } from "@/lib/use-entrance";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { DevSignature } from "@/components/ui/dev-signature";

export function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Footer");
  const { personalInfo, socials } = getPortfolio(locale);
  const entrance = useEntrance();
  const fadeInView = entrance
    ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
    : {};

  return (
    <footer id="contact" className="w-full py-3 border-t border-border bg-card/30">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div {...fadeInView} className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t("body")}
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Mail size={18} />
              {t("sendEmail")}
            </Link>
          </div>

          <div className="flex justify-center items-center gap-6 pt-8">
             <Link href={socials.github} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <GithubIcon size={24} />
             </Link>
             <Link href={socials.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <LinkedinIcon size={24} />
             </Link>
          </div>

          <DevSignature className="pt-8" />
        </motion.div>
      </div>
    </footer>
  );
}