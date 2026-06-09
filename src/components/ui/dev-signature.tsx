"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LemyLogo } from "@/components/ui/lemy-logo";

export function DevSignature({
  className,
  size = 11,
}: {
  className?: string;
  size?: number;
}) {
  const t = useTranslations("DevSignature");

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 text-muted-foreground/60",
        className,
      )}
      style={{ fontSize: size }}
    >
      <span>{t("developedBy")}</span>
      {/* Sin asLink: ya estamos en el portfolio, no enlaza a sí mismo. */}
      <LemyLogo size={size} />
    </div>
  );
}
