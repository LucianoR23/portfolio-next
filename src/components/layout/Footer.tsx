"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getPortfolio } from "@/data/portfolio";
import type { Locale } from "@/i18n/routing";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Footer");
  const { personalInfo, socials } = getPortfolio(locale);

  return (
    <footer id="contact" className="w-full py-3 border-t border-border bg-card/30">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
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

          <p className="text-sm text-muted-foreground pt-8">
            {t("copyright", { year: new Date().getFullYear(), name: personalInfo.name })}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}