// Endpoint liviano para el HEALTHCHECK del contenedor (ver Dockerfile).
// Fuera de `[locale]`, así que el proxy de i18n no lo prefija ni redirige.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" });
}
