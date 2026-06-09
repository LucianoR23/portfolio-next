# syntax=docker/dockerfile:1

# Imagen base: Node 22 sobre Alpine + pnpm via corepack (fija la versión del
# campo "packageManager" de package.json → build reproducible, sin el mismatch
# de pnpm que rompía nixpacks).
FROM node:22-alpine AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

# --- deps: instala dependencias con el lockfile congelado ---
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# --- builder: compila la app Next (salida standalone) ---
FROM base AS builder
# Las NEXT_PUBLIC_* se hornean en build, no en runtime. Default: bento (el layout
# de producción). Para forzar minimal, definila como "Build Variable" en Coolify
# y se inyecta acá vía --build-arg.
ARG NEXT_PUBLIC_PORTFOLIO_STYLE=bento
ENV NEXT_PUBLIC_PORTFOLIO_STYLE=$NEXT_PUBLIC_PORTFOLIO_STYLE
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# --- runner: imagen mínima de producción ---
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# La salida standalone trae su propio server.js + node_modules trazados.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Healthcheck con el fetch nativo de Node (sin depender de curl/wget).
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
