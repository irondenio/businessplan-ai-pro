"use client";

import { useState } from "react";
import { Download, FileText, Table, BarChart2, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { BusinessPlan } from "@prisma/client";
import { GeneratedBusinessPlan, FinancialData } from "@/types";
import { FinancialCharts } from "./financial-charts";
import { SwotMatrix } from "./swot-matrix";
import { formatCurrency } from "@/lib/utils";

interface Props { plan: BusinessPlan }

const sections = [
  { key: "executiveSummary", title: "Résumé Exécutif" },
  { key: "projectPresentation", title: "Présentation du Projet" },
  { key: "marketStudy", title: "Étude de Marché" },
  { key: "competitiveAnalysis", title: "Analyse Concurrentielle" },
  { key: "marketingStrategy", title: "Stratégie Marketing" },
  { key: "operationalPlan", title: "Plan Opérationnel" },
  { key: "hrOrganization", title: "Organisation RH" },
  { key: "riskManagement", title: "Gestion des Risques" },
  { key: "conclusion", title: "Conclusion" },
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-6 py-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{children}</div>}
    </div>
  );
}

export function BusinessPlanView({ plan }: Props) {
  const [exportLoading, setExportLoading] = useState<"pdf" | "word" | "excel" | null>(null);

  const content = plan.generatedContent as unknown as GeneratedBusinessPlan | null;
  const financial = plan.financialData as unknown as FinancialData | null;

  const handleExport = async (format: "pdf" | "word" | "excel") => {
    setExportLoading(format);
    try {
      const endpoint = `/api/exports/${format}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });
      const blob = await res.blob();
      const ext = format === "word" ? "docx" : format === "excel" ? "xlsx" : "pdf";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `business-plan-${plan.title.replace(/\s+/g, "-")}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExportLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
          <p className="text-gray-500 text-sm mt-1">
            {plan.status === "COMPLETED" ? "Business plan complet" : "En cours de génération..."}
          </p>
        </div>

        {plan.status === "COMPLETED" && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {(["pdf", "word", "excel"] as const).map((fmt) => {
              const labels = { pdf: "PDF", word: "Word", excel: "Excel" };
              const icons = { pdf: FileText, word: FileText, excel: Table };
              const Icon = icons[fmt];
              return (
                <button
                  key={fmt}
                  onClick={() => handleExport(fmt)}
                  disabled={exportLoading === fmt}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  {exportLoading === fmt ? <Loader2 className="w-3 h-3 animate-spin" /> : <Icon className="w-3 h-3" />}
                  {labels[fmt]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {plan.status === "GENERATING" && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-blue-700 font-medium">L&apos;IA génère votre business plan...</p>
          <p className="text-blue-500 text-sm mt-1">Rafraîchissez la page dans 2 à 3 minutes</p>
        </div>
      )}

      {content && (
        <>
          {sections.map(({ key, title }) => (
            <Section key={key} title={title}>
              {content[key as keyof typeof content] as string}
            </Section>
          ))}

          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Analyse SWOT</h3>
              <BarChart2 className="w-4 h-4 text-gray-400" />
            </button>
            <div className="p-6">
              <SwotMatrix swot={content.swotAnalysis} />
            </div>
          </div>
        </>
      )}

      {financial && (
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Prévisions Financières</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Année 1", data: financial.year1 },
                { label: "Année 3", data: financial.year3 },
                { label: "Année 5", data: financial.year5 },
              ].map(({ label, data }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-3">{label}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">CA</span>
                      <span className="font-medium text-green-600">{formatCurrency(data.revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Charges</span>
                      <span className="font-medium text-red-500">{formatCurrency(data.expenses)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="text-gray-700 font-medium">Résultat net</span>
                      <span className={`font-bold ${data.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(data.netProfit)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-blue-600 font-medium">Seuil de rentabilité</p>
                <p className="text-xl font-bold text-blue-700 mt-1">{financial.breakEvenPoint} mois</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-xs text-green-600 font-medium">ROI</p>
                <p className="text-xl font-bold text-green-700 mt-1">{financial.roi}%</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-xs text-purple-600 font-medium">BFR</p>
                <p className="text-xl font-bold text-purple-700 mt-1">{formatCurrency(financial.workingCapitalNeed)}</p>
              </div>
            </div>

            <FinancialCharts financial={financial} />
          </div>
        </div>
      )}
    </div>
  );
}
