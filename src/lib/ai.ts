import OpenAI from "openai";
import { BusinessPlanFormData, GeneratedBusinessPlan, FinancialData } from "@/types";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function generateBusinessPlan(
  formData: BusinessPlanFormData
): Promise<GeneratedBusinessPlan> {
  const prompt = buildBusinessPlanPrompt(formData);

  const completion = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `Tu es un expert en stratégie d'entreprise et en rédaction de business plans professionnels pour le marché africain.
        Tu rédiges des business plans détaillés, professionnels et adaptés au contexte économique africain francophone.
        Réponds toujours en JSON valide selon le format demandé.`,
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error("Aucune réponse de l'IA");

  return JSON.parse(content) as GeneratedBusinessPlan;
}

function buildBusinessPlanPrompt(data: BusinessPlanFormData): string {
  return `Génère un business plan complet et professionnel pour le projet suivant.

INFORMATIONS DU PROJET:
- Nom du projet: ${data.projectName}
- Promoteur: ${data.promoterName}
- Pays: ${data.country}
- Secteur: ${data.sector}
- Description: ${data.description}

PRODUIT/SERVICE:
- Description: ${data.productDescription}
- Proposition de valeur: ${data.valueProposition}
- Avantages concurrentiels: ${data.competitiveAdvantages}

MARCHÉ:
- Clients cibles: ${data.targetCustomers}
- Taille du marché: ${data.marketSize}
- Concurrents: ${data.competitors}
- Zone géographique: ${data.geographicZone}

MARKETING:
- Canaux de vente: ${data.salesChannels}
- Acquisition clients: ${data.customerAcquisition}
- Communication: ${data.communication}

FINANCES:
- Investissement initial: ${data.initialInvestment} FCFA
- Charges mensuelles: ${data.monthlyExpenses} FCFA
- Prévisions de ventes mensuelles: ${data.salesForecast} FCFA
- Effectif: ${data.teamSize} personnes
- Modèle de revenus: ${data.revenueModel}

Retourne un JSON avec cette structure exacte:
{
  "executiveSummary": "Résumé exécutif détaillé (400-500 mots)",
  "projectPresentation": "Présentation complète du projet (300-400 mots)",
  "swotAnalysis": {
    "strengths": ["force 1", "force 2", "force 3", "force 4", "force 5"],
    "weaknesses": ["faiblesse 1", "faiblesse 2", "faiblesse 3", "faiblesse 4"],
    "opportunities": ["opportunité 1", "opportunité 2", "opportunité 3", "opportunité 4"],
    "threats": ["menace 1", "menace 2", "menace 3", "menace 4"]
  },
  "marketStudy": "Étude de marché approfondie (400-500 mots)",
  "competitiveAnalysis": "Analyse concurrentielle détaillée (300-400 mots)",
  "marketingStrategy": "Stratégie marketing complète (300-400 mots)",
  "operationalPlan": "Plan opérationnel détaillé (300-400 mots)",
  "hrOrganization": "Organisation RH et structure d'équipe (200-300 mots)",
  "riskManagement": "Gestion des risques avec mitigation (300-400 mots)",
  "conclusion": "Conclusion et perspectives (200-300 mots)"
}`;
}

export function calculateFinancials(formData: BusinessPlanFormData): FinancialData {
  const monthlyRevenue = formData.salesForecast;
  const monthlyExpenses = formData.monthlyExpenses;
  const initialInvestment = formData.initialInvestment;

  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  const breakEvenPoint = monthlyExpenses > 0
    ? Math.ceil(initialInvestment / monthlyProfit)
    : 0;

  const growthRate = 0.15;

  const buildYearlyData = (yearMultiplier: number, years: number) => {
    const yearRevenue = monthlyRevenue * 12 * yearMultiplier;
    const yearExpenses = monthlyExpenses * 12 * yearMultiplier * 0.9;
    const yearNetProfit = yearRevenue - yearExpenses;
    const yearCashFlow = yearNetProfit - (years === 1 ? initialInvestment : 0);

    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    const incomeStatement = months.map((month, i) => {
      const growth = Math.pow(1 + growthRate / 12, i);
      const rev = monthlyRevenue * yearMultiplier * growth;
      const exp = monthlyExpenses * yearMultiplier * 0.9 * growth;
      return {
        month,
        revenue: Math.round(rev),
        expenses: Math.round(exp),
        result: Math.round(rev - exp),
      };
    });

    const cashFlowStatement = months.map((month, i) => {
      const growth = Math.pow(1 + growthRate / 12, i);
      const cf = monthlyProfit * yearMultiplier * growth;
      return {
        month,
        revenue: Math.round(cf * 1.1),
        expenses: Math.round(cf * 0.2),
        result: Math.round(cf),
      };
    });

    return {
      revenue: Math.round(yearRevenue),
      expenses: Math.round(yearExpenses),
      netProfit: Math.round(yearNetProfit),
      cashFlow: Math.round(yearCashFlow),
      incomeStatement,
      cashFlowStatement,
    };
  };

  const roi = initialInvestment > 0
    ? ((monthlyProfit * 12 - initialInvestment) / initialInvestment) * 100
    : 0;

  const workingCapitalNeed = monthlyExpenses * 3;

  return {
    year1: buildYearlyData(1, 1),
    year3: buildYearlyData(Math.pow(1 + growthRate, 2), 3),
    year5: buildYearlyData(Math.pow(1 + growthRate, 4), 5),
    breakEvenPoint,
    roi: Math.round(roi),
    workingCapitalNeed,
  };
}
