import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import jsPDF from "jspdf";
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

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 0;

    const addPage = () => {
      pdf.addPage();
      y = 20;
    };

    const checkPageBreak = (needed = 20) => {
      if (y + needed > 270) addPage();
    };

    const addTitle = (text: string, size = 14) => {
      checkPageBreak(15);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(size);
      pdf.setTextColor(15, 76, 129);
      pdf.text(text, margin, y);
      y += size * 0.5 + 4;
      pdf.setTextColor(0, 0, 0);
    };

    const addText = (text: string, size = 10) => {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(size);
      pdf.setTextColor(50, 50, 50);
      const lines = pdf.splitTextToSize(text, contentWidth);
      lines.forEach((line: string) => {
        checkPageBreak(6);
        pdf.text(line, margin, y);
        y += 5;
      });
      y += 3;
    };

    const addSeparator = () => {
      checkPageBreak(5);
      pdf.setDrawColor(15, 76, 129);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 5;
    };

    // Cover page
    pdf.setFillColor(15, 76, 129);
    pdf.rect(0, 0, pageWidth, 80, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);
    pdf.setTextColor(255, 255, 255);
    pdf.text("BUSINESS PLAN", pageWidth / 2, 35, { align: "center" });
    pdf.setFontSize(18);
    pdf.text(String(formData.projectName || plan.title), pageWidth / 2, 55, { align: "center" });
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Promoteur : ${String(formData.promoterName || "")}`, pageWidth / 2, 68, { align: "center" });

    pdf.setTextColor(80, 80, 80);
    pdf.setFontSize(10);
    pdf.text(`Généré par BusinessPlan AI Pro | ${new Date().toLocaleDateString("fr-FR")}`, pageWidth / 2, 200, { align: "center" });
    pdf.text(`${String(formData.country || "")} | ${String(formData.sector || "")}`, pageWidth / 2, 210, { align: "center" });

    addPage();

    // Executive Summary
    addTitle("1. RÉSUMÉ EXÉCUTIF", 16);
    addSeparator();
    addText(content.executiveSummary);

    // Project Presentation
    addTitle("2. PRÉSENTATION DU PROJET", 16);
    addSeparator();
    addText(content.projectPresentation);

    // SWOT
    addTitle("3. ANALYSE SWOT", 16);
    addSeparator();

    const swotData = [
      { title: "Forces", items: content.swotAnalysis.strengths, color: [39, 174, 96] as [number, number, number] },
      { title: "Faiblesses", items: content.swotAnalysis.weaknesses, color: [231, 76, 60] as [number, number, number] },
      { title: "Opportunités", items: content.swotAnalysis.opportunities, color: [52, 152, 219] as [number, number, number] },
      { title: "Menaces", items: content.swotAnalysis.threats, color: [241, 196, 15] as [number, number, number] },
    ];

    swotData.forEach(({ title, items, color }) => {
      checkPageBreak(10 + items.length * 6);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(...color);
      pdf.text(title, margin, y);
      y += 6;
      pdf.setTextColor(50, 50, 50);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      items.forEach((item) => {
        checkPageBreak(6);
        pdf.text(`• ${item}`, margin + 5, y);
        y += 5;
      });
      y += 3;
    });

    // Market Study
    addTitle("4. ÉTUDE DE MARCHÉ", 16);
    addSeparator();
    addText(content.marketStudy);

    // Competitive Analysis
    addTitle("5. ANALYSE CONCURRENTIELLE", 16);
    addSeparator();
    addText(content.competitiveAnalysis);

    // Marketing Strategy
    addTitle("6. STRATÉGIE MARKETING", 16);
    addSeparator();
    addText(content.marketingStrategy);

    // Operational Plan
    addTitle("7. PLAN OPÉRATIONNEL", 16);
    addSeparator();
    addText(content.operationalPlan);

    // HR
    addTitle("8. ORGANISATION RH", 16);
    addSeparator();
    addText(content.hrOrganization);

    // Financial
    if (financial) {
      addTitle("9. PRÉVISIONS FINANCIÈRES", 16);
      addSeparator();

      const years = [
        { label: "Année 1", data: financial.year1 },
        { label: "Année 3", data: financial.year3 },
        { label: "Année 5", data: financial.year5 },
      ];

      years.forEach(({ label, data }) => {
        checkPageBreak(30);
        addTitle(label, 12);
        addText(`Chiffre d'affaires : ${formatCurrency(data.revenue)}`);
        addText(`Charges totales : ${formatCurrency(data.expenses)}`);
        addText(`Résultat net : ${formatCurrency(data.netProfit)}`);
        addText(`Cash-flow : ${formatCurrency(data.cashFlow)}`);
        y += 3;
      });

      checkPageBreak(20);
      addTitle("Indicateurs Clés", 12);
      addText(`Seuil de rentabilité : ${financial.breakEvenPoint} mois`);
      addText(`Retour sur investissement (ROI) : ${financial.roi}%`);
      addText(`Besoin en fonds de roulement : ${formatCurrency(financial.workingCapitalNeed)}`);
    }

    // Risk Management
    addTitle("10. GESTION DES RISQUES", 16);
    addSeparator();
    addText(content.riskManagement);

    // Conclusion
    addTitle("11. CONCLUSION", 16);
    addSeparator();
    addText(content.conclusion);

    const pdfBytes = pdf.output("arraybuffer");

    await prisma.export.create({
      data: {
        userId: session.user.id,
        businessPlanId: planId,
        format: "PDF",
      },
    });

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="business-plan-${plan.title.replace(/\s+/g, "-")}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return NextResponse.json({ error: "Erreur lors de l'export PDF" }, { status: 500 });
  }
}
