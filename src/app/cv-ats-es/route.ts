import { getCVDataES } from "@/lib/cv/mappers";
import { generateDocx } from "@/lib/cv/generate-docx";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const buffer = await generateDocx(getCVDataES());
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="luciano-rodriguez-cv-es.docx"',
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
