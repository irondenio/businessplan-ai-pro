import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ExcelJS from "exceljs";
import { FinancialData } from "@/types";

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

    if (!plan || !plan.financialData) {
      return NextResponse.json({ error: "Plan non trouvé ou données financières manquantes" }, { status: 404 });
    }

    const financial = plan.financialData as unknown as FinancialData;
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "BusinessPlan AI Pro";
    workbook.created = new Date();

    const headerStyle = {
      font: { bold: true, color: { argb: "FFFFFFFF" }, size: 11 },
      fill: { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: "FF0F4C81" } },
      alignment: { horizontal: "center" as const, vertical: "middle" as const },
      border: {
        top: { style: "thin" as const },
        left: { style: "thin" as const },
        bottom: { style: "thin" as const },
        right: { style: "thin" as const },
      },
    };

    const addFinancialSheet = (sheetName: string, data: FinancialData["year1"]) => {
      const ws = workbook.addWorksheet(sheetName);
      ws.columns = [
        { header: "Mois", key: "month", width: 12 },
        { header: "Chiffre d'Affaires (FCFA)", key: "revenue", width: 25 },
        { header: "Charges (FCFA)", key: "expenses", width: 20 },
        { header: "Résultat Net (FCFA)", key: "result", width: 22 },
      ];

      ws.getRow(1).eachCell((cell) => { Object.assign(cell, headerStyle); });
      ws.getRow(1).height = 25;

      data.incomeStatement.forEach((row, i) => {
        const excelRow = ws.addRow([row.month, row.revenue, row.expenses, row.result]);
        excelRow.getCell(4).font = {
          color: { argb: row.result >= 0 ? "FF27AE60" : "FFE74C3C" },
          bold: true,
        };
        if (i % 2 === 0) {
          excelRow.eachCell((cell) => {
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F5F5" } };
          });
        }
      });

      const totalRow = ws.addRow([
        "TOTAL",
        data.revenue,
        data.expenses,
        data.netProfit,
      ]);
      totalRow.font = { bold: true, size: 12 };
      totalRow.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8F4FD" } };

      ws.addRow([]);
      ws.addRow(["Indicateurs Clés"]).font = { bold: true, size: 12, color: { argb: "FF0F4C81" } };
      ws.addRow(["Cash-flow total", data.cashFlow]);
    };

    addFinancialSheet("Année 1", financial.year1);
    addFinancialSheet("Année 3", financial.year3);
    addFinancialSheet("Année 5", financial.year5);

    const summaryWs = workbook.addWorksheet("Synthèse");
    summaryWs.columns = [
      { header: "Indicateur", key: "indicator", width: 35 },
      { header: "Valeur", key: "value", width: 25 },
    ];
    summaryWs.getRow(1).eachCell((cell) => { Object.assign(cell, headerStyle); });
    summaryWs.getRow(1).height = 25;

    const summaryData = [
      ["CA Année 1", financial.year1.revenue.toLocaleString("fr-FR") + " FCFA"],
      ["CA Année 3", financial.year3.revenue.toLocaleString("fr-FR") + " FCFA"],
      ["CA Année 5", financial.year5.revenue.toLocaleString("fr-FR") + " FCFA"],
      ["Résultat Net Année 1", financial.year1.netProfit.toLocaleString("fr-FR") + " FCFA"],
      ["Résultat Net Année 3", financial.year3.netProfit.toLocaleString("fr-FR") + " FCFA"],
      ["Résultat Net Année 5", financial.year5.netProfit.toLocaleString("fr-FR") + " FCFA"],
      ["Seuil de Rentabilité", financial.breakEvenPoint + " mois"],
      ["ROI", financial.roi + "%"],
      ["Besoin en Fonds de Roulement", financial.workingCapitalNeed.toLocaleString("fr-FR") + " FCFA"],
    ];

    summaryData.forEach(([indicator, value], i) => {
      const row = summaryWs.addRow([indicator, value]);
      if (i % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F5F5" } };
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();

    await prisma.export.create({
      data: {
        userId: session.user.id,
        businessPlanId: planId,
        format: "EXCEL",
      },
    });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="financials-${plan.title.replace(/\s+/g, "-")}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Excel export error:", error);
    return NextResponse.json({ error: "Erreur lors de l'export Excel" }, { status: 500 });
  }
}
