import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import type { CVData, CVLink } from "./mappers";

// ─────────────────────────────────────────────────────────────────────────────
// Labels de sección (chrome del documento, NO contenido de portfolio.ts).
// Encabezados estándar reconocidos por los ATS, por idioma.
// ─────────────────────────────────────────────────────────────────────────────
type SectionLabels = {
  summary: string;
  skills: string;
  experience: string;
  projects: string;
  education: string;
  languages: string;
  stack: string;
};

const LABELS: Record<CVData["locale"], SectionLabels> = {
  en: {
    summary: "Summary",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    languages: "Languages",
    stack: "Tech",
  },
  es: {
    summary: "Perfil",
    skills: "Habilidades",
    experience: "Experiencia",
    projects: "Proyectos",
    education: "Educación",
    languages: "Idiomas",
    stack: "Stack",
  },
};

const FONT = "Calibri";
// docx mide en half-points: 22 = 11pt, 20 = 10pt, etc.
const SIZE_BODY = 22;
const SIZE_NAME = 44; // 22pt
const SIZE_H1 = 26; // 13pt
const SIZE_CONTACT = 20; // 10pt
const BLACK = "000000";

// Une links a texto plano "Label: url · Label: url" (ATS-safe, URL visible).
function linksLine(links: CVLink[]): string {
  return links.map((l) => `${l.label}: ${l.url}`).join("  ·  ");
}

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 260, after: 100 },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, font: FONT, color: BLACK }),
    ],
  });
}

function bodyParagraph(runs: TextRun[], opts?: { spacingAfter?: number }): Paragraph {
  return new Paragraph({
    spacing: { after: opts?.spacingAfter ?? 80 },
    children: runs,
  });
}

export async function generateDocx(data: CVData): Promise<Buffer> {
  const L = LABELS[data.locale];
  const children: Paragraph[] = [];

  // ── Header / contacto ──────────────────────────────────────────────────────
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: data.name, bold: true, font: FONT, size: SIZE_NAME, color: BLACK }),
      ],
    }),
  );

  if (data.role) {
    children.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: data.role, font: FONT, size: SIZE_H1, color: BLACK })],
      }),
    );
  }

  // Contacto en texto plano, en el cuerpo (nunca en header/footer de Word).
  const contactParts = [data.location, data.email, data.phone].filter(Boolean);
  if (contactParts.length) {
    children.push(
      bodyParagraph(
        [new TextRun({ text: contactParts.join("  ·  "), font: FONT, size: SIZE_CONTACT, color: BLACK })],
        { spacingAfter: 40 },
      ),
    );
  }

  if (data.links.length) {
    children.push(
      bodyParagraph(
        [new TextRun({ text: linksLine(data.links), font: FONT, size: SIZE_CONTACT, color: BLACK })],
        { spacingAfter: 80 },
      ),
    );
  }

  // ── Summary ─────────────────────────────────────────────────────────────────
  if (data.summary) {
    children.push(sectionHeading(L.summary));
    children.push(
      bodyParagraph([new TextRun({ text: data.summary, font: FONT, size: SIZE_BODY, color: BLACK })]),
    );
  }

  // ── Skills ──────────────────────────────────────────────────────────────────
  if (data.skills.length) {
    children.push(sectionHeading(L.skills));
    children.push(
      bodyParagraph([
        new TextRun({ text: data.skills.join("  ·  "), font: FONT, size: SIZE_BODY, color: BLACK }),
      ]),
    );
  }

  // ── Experience ──────────────────────────────────────────────────────────────
  if (data.experience.length) {
    children.push(sectionHeading(L.experience));
    for (const exp of data.experience) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 0 },
          children: [
            new TextRun({ text: exp.role, bold: true, font: FONT, size: SIZE_BODY, color: BLACK }),
            new TextRun({ text: ` — ${exp.company}`, font: FONT, size: SIZE_BODY, color: BLACK }),
          ],
        }),
      );
      if (exp.period) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: exp.period, italics: true, font: FONT, size: SIZE_CONTACT, color: BLACK }),
            ],
          }),
        );
      }
      if (exp.description) {
        children.push(
          bodyParagraph([new TextRun({ text: exp.description, font: FONT, size: SIZE_BODY, color: BLACK })]),
        );
      }
    }
  }

  // ── Projects ────────────────────────────────────────────────────────────────
  if (data.projects.length) {
    children.push(sectionHeading(L.projects));
    for (const proj of data.projects) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 0 },
          children: [
            new TextRun({ text: proj.title, bold: true, font: FONT, size: SIZE_BODY, color: BLACK }),
          ],
        }),
      );
      if (proj.stack) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `${L.stack}: ${proj.stack}`,
                italics: true,
                font: FONT,
                size: SIZE_CONTACT,
                color: BLACK,
              }),
            ],
          }),
        );
      }
      if (proj.description) {
        children.push(
          bodyParagraph(
            [new TextRun({ text: proj.description, font: FONT, size: SIZE_BODY, color: BLACK })],
            { spacingAfter: proj.links.length ? 20 : 80 },
          ),
        );
      }
      if (proj.links.length) {
        children.push(
          bodyParagraph(
            [new TextRun({ text: linksLine(proj.links), font: FONT, size: SIZE_CONTACT, color: BLACK })],
            { spacingAfter: 80 },
          ),
        );
      }
    }
  }

  // ── Education ───────────────────────────────────────────────────────────────
  if (data.education.length) {
    children.push(sectionHeading(L.education));
    for (const edu of data.education) {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 0 },
          children: [
            new TextRun({ text: edu.degree, bold: true, font: FONT, size: SIZE_BODY, color: BLACK }),
          ],
        }),
      );
      const eduLine = [edu.institution, edu.period].filter(Boolean).join("  ·  ");
      if (eduLine) {
        children.push(
          bodyParagraph(
            [new TextRun({ text: eduLine, font: FONT, size: SIZE_CONTACT, color: BLACK })],
            { spacingAfter: 40 },
          ),
        );
      }
    }
  }

  // ── Languages ───────────────────────────────────────────────────────────────
  if (data.languages.length) {
    children.push(sectionHeading(L.languages));
    children.push(
      bodyParagraph([
        new TextRun({
          text: data.languages.map((l) => `${l.name}: ${l.level}`).join("  ·  "),
          font: FONT,
          size: SIZE_BODY,
          color: BLACK,
        }),
      ]),
    );
  }

  const doc = new Document({
    creator: data.name,
    title: `${data.name} — CV`,
    styles: {
      default: {
        document: { run: { font: FONT, size: SIZE_BODY, color: BLACK } },
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: FONT, size: SIZE_H1, bold: true, color: BLACK },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } },
        },
        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
}
