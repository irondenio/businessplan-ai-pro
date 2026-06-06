import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, TableCell, TableRow, Table,
  WidthType, ShadingType
} from "docx";
import { GeneratedBusinessPlan, FinancialData } from "@/types";
import { formatCurrency } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { planId } = await req.json();
    const plan = await prisma.businessPlan.findFirst({
      where: { id: planId, userId: session.user.id },
    });

    if (!plan || !plan.generatedContent) {
      return NextResponse.json({ error: "Plan non trouvé ou non généré" }, { status: 404 });
    }

    const content = plan.generatedContent as unknown as GeneratedBusinessPlan;
    const financial = plan.financialData as unknown as FinancialData;
    const formData = plan.formData as Record<string, unknown>;

    const children: Paragraph[] = [
      new Paragraph({
        text: "BUSINESS PLAN",
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [new TextRun({ text: String(formData.projectName || plan.title), bold: true, size: 36 })],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [new TextRun({ text: `Promoteur : ${String(formData.promoterName || "")}`, size: 24 })],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: `${String(formData.country || "")} | ${String(formData.sector || "")} | ${new Date().toLocaleDateString("fr-FR")}`, color: "808080", size: 20 })],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "1. RÉSUMÉ EXÉCUTIF", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.executiveSummary }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "2. PRÉSENTATION DU PROJET", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.projectPresentation }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "3. ANALYSE SWOT", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: "Forces", heading: HeadingLevel.HEADING_2 }),
      ...content.swotAnalysis.strengths.map(s => new Paragraph({ text: `• ${s}`, bullet: { level: 0 } })),
      new Paragraph({ text: "Faiblesses", heading: HeadingLevel.HEADING_2 }),
      ...content.swotAnalysis.weaknesses.map(w => new Paragraph({ text: `• ${w}`, bullet: { level: 0 } })),
      new Paragraph({ text: "Opportunités", heading: HeadingLevel.HEADING_2 }),
      ...content.swotAnalysis.opportunities.map(o => new Paragraph({ text: `• ${o}`, bullet: { level: 0 } })),
      new Paragraph({ text: "Menaces", heading: HeadingLevel.HEADING_2 }),
      ...content.swotAnalysis.threats.map(t => new Paragraph({ text: `• ${t}`, bullet: { level: 0 } })),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "4. ÉTUDE DE MARCHÉ", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.marketStudy }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "5. ANALYSE CONCURRENTIELLE", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.competitiveAnalysis }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "6. STRATÉGIE MARKETING", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.marketingStrategy }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "7. PLAN OPÉRATIONNEL", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.operationalPlan }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "8. ORGANISATION RH", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.hrOrganization }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "9. GESTION DES RISQUES", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.riskManagement }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "10. CONCLUSION", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: content.conclusion }),
    ];

    if (financial) {
      children.push(
        new Paragraph({ text: "" }),
        new Paragraph({ text: "11. PRÉVISIONS FINANCIÈRES", heading: HeadingLevel.HEADING_1 }),
      );

      const years = [
        { label: "Année 1", data: financial.year1 },
        { label: "Année 3", data: financial.year3 },
        { label: "Année 5", data: financial.year5 },
      ];

      years.forEach(({ label, data }) => {
        children.push(
          new Paragraph({ text: label, heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: `Chiffre d'affaires : ${formatCurrency(data.revenue)}` }),
          new Paragraph({ text: `Charges : ${formatCurrency(data.expenses)}` }),
          new Paragraph({ text: `Résultat net : ${formatCurrency(data.netProfit)}` }),
          new Paragraph({ text: `Cash-flow : ${formatCurrency(data.cashFlow)}` }),
          new Paragraph({ text: "" }),
        );
      });

      children.push(
        new Paragraph({ text: "Indicateurs Clés", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: `Seuil de rentabilité : ${financial.breakEvenPoint} mois` }),
        new Paragraph({ text: `ROI : ${financial.roi}%` }),
        new Paragraph({ text: `Besoin en fonds de roulement : ${formatCurrency(financial.workingCapitalNeed)}` }),
      );
    }

    const doc = new Document({
      creator: "BusinessPlan AI Pro",
      title: plan.title,
      description: "Business Plan généré par BusinessPlan AI Pro",
      sections: [{ children }],
    });

    const buffer = await Packer.toBuffer(doc);
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;

    await prisma.export.create({
      data: {
        userId: session.user.id,
        businessPlanId: planId,
        format: "WORD",
      },
    });

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="business-plan-${plan.title.replace(/\s+/g, "-")}.docx"`,
      },
    });
  } catch (error) {
    console.error("Word export error:", error);
    return NextResponse.json({ error: "Erreur lors de l'export Word" }, { status: 500 });
  }
}
