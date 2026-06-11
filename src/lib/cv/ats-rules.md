# ATS Rules — CV `.docx` (research May–June 2026)

Reglas aplicadas a `generate-docx.ts`. Fuente de verdad del contenido: `src/data/portfolio.ts`.

## Formato del archivo

- **`.docx` es la opción más segura en 2026** (~96.7% de parse rate promedio vs ~91.3% de PDF de texto). Generamos `.docx`.
- **Single column. Sin tablas. Sin text boxes. Sin imágenes/iconos/gráficos.** El contenido dentro de tablas/text boxes suele ser invisible al parser; los iconos se leen como basura (`&%$#`).
- **Sin headers/footers de Word.** Muchos ATS ignoran su contenido — el email/teléfono ahí puede no extraerse nunca. Todo el contacto va en el cuerpo, arriba.
- **Fuente estándar:** Calibri o Arial. Body 11pt, nombre ~20–22pt. Usamos estilos **nativos** de Word (`Title`, `Heading 1`/`Heading 2`) para que el parser detecte la jerarquía.
- **Sin colores, sin bordes, sin formas, sin subrayado** (el subrayado confunde a algunos parsers). Negrita y mayúsculas sí son seguras.
- **Bullets nativos** (lista de Word). Nada de emojis, flechas o checkboxes como viñetas — se eliminan o se vuelven basura.
- **Headings de sección estándar y reconocibles:** `Summary`, `Skills`, `Experience`, `Projects`, `Education`, `Languages`. Evitar títulos creativos ("My Journey") — rompen la detección de secciones.

## Orden de secciones (fullstack 2026)

1. **Contact / Header** — nombre, rol, ubicación, email, teléfono, LinkedIn, GitHub (texto plano, en el cuerpo).
2. **Summary** — 2–3 líneas: rango técnico + valor de negocio.
3. **Skills** — lista de tecnologías en texto plano (idealmente front/back, pero `portfolio.ts` las tiene planas → un solo bloque separado por `·`/coma).
4. **Experience** — empresa, rol, período, logros. Impacto > tareas (métricas suben la tasa de respuesta ~40%).
5. **Projects** — relevante para perfil dev; título, stack, descripción corta (`cvDescription`), links públicos.
6. **Education**.
7. **Languages**.

## Links / URLs

- Los ATS **extraen el texto visible** del link, no siguen la URL. Si el texto dice "Click here", el ATS guarda "Click here" sin contexto.
- **Regla:** escribir la **URL completa en texto plano** (`github.com/usuario`, `https://demo.com`), no anchor text oculto. Puede además ir hyperlinkeada, pero el texto visible debe ser la URL.
- Sin estilo azul/subrayado que confunda el parser (texto plano).
- Pocos links estratégicos en el header (LinkedIn, GitHub). En Projects, incluir **repo público + demo si existen** (decisión confirmada por el usuario); proyectos privados / `link === "#"` van sin URL.

## Keywords relevantes — perfil fullstack JS/TS/Go

Deben aparecer naturalmente (vienen de `portfolio.ts`, no se inventan): `JavaScript`, `TypeScript`, `React`, `Next.js`, `Node.js`, `Go (Golang)`, `PostgreSQL`, `MongoDB`, `Supabase`, `Tailwind CSS`, `REST API`, `WebSockets`, `Docker`, `PWA`, `QA Testing`, `Postman`, `Git`, `CI/CD`, `multi-tenant`, `domain-driven`.

## Contact info — reglas

- Email profesional, teléfono, ciudad/país, LinkedIn y GitHub en **texto plano** en el cuerpo (no en header/footer de Word).

## Fuentes consultadas

- Sedona Staffing — *How to Refresh Your Resume for 2026: An ATS-Friendly Guide* — https://www.sedonastaffing.com/how-to-refresh-your-resume-for-2026-an-ats-friendly-guide-that-actually-works
- Jobscan — *Anatomy of an ATS Friendly Resume Format (Checklist 2026)* — https://www.jobscan.co/blog/20-ats-friendly-resume-templates/
- Scale.jobs — *ATS Resume Format 2026: What Works (and What Doesn't)* — https://scale.jobs/blog/ats-resume-format-2026-design-guide
- ResumeAdapter — *ATS Resume Formatting Rules 2026* — https://www.resumeadapter.com/blog/ats-resume-formatting-rules-2026
- CVCraft — *PDF vs DOCX for ATS in 2026* — https://cvcraft.roynex.com/blog/pdf-vs-docx-resume-ats-2026
- JobShinobi — *LaTeX vs Word Resume for ATS Parsing (What Actually Breaks Parsing)* — https://www.jobshinobi.com/blog/latex-vs-word-resume-for-ats-parsing
- Medium / Di Reshtei — *Resume for Full-Stack Developer: ATS Keywords & Section-by-Section Guide (2026)* — https://medium.com/@reshtei/resume-for-full-stack-developer-examples-ats-keywords-c70d7b6c82e6
- ResumeWorded — *Full Stack Developer Resume Examples 2026* — https://resumeworded.com/full-stack-developer-resume-examples
- cv4me — *Hyperlinks in Resumes: When to Use Them (2026 Guide)* — https://cv4me.pro/blog/hyperlinks-in-resume-guide
- Hireflow — *How to Include Links in an ATS Resume Safely* — https://hireflow.net/blog/how-to-include-links-in-an-ats-resume-safely
