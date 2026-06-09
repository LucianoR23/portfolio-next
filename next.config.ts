import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Salida autocontenida para imagen Docker chica: copia solo el server y
  // sus dependencias trazadas a `.next/standalone` (ver Dockerfile).
  output: "standalone",
};

export default withNextIntl(nextConfig);
