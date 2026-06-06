export type SubscriptionPlan = "ONE_TIME" | "MONTHLY" | "PREMIUM";
export type SubscriptionStatus = "ACTIVE" | "CANCELED" | "EXPIRED" | "PAST_DUE";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type PaymentProvider = "STRIPE" | "CINETPAY" | "FLUTTERWAVE";
export type BusinessPlanStatus = "DRAFT" | "GENERATING" | "COMPLETED" | "ARCHIVED";
export type ExportFormat = "PDF" | "WORD" | "EXCEL";
export type Role = "USER" | "ADMIN";

export interface BusinessPlanFormData {
  // Étape 1 - Informations générales
  projectName: string;
  promoterName: string;
  country: string;
  sector: string;
  description: string;

  // Étape 2 - Produit/Service
  productDescription: string;
  valueProposition: string;
  competitiveAdvantages: string;

  // Étape 3 - Marché
  targetCustomers: string;
  marketSize: string;
  competitors: string;
  geographicZone: string;

  // Étape 4 - Marketing
  salesChannels: string;
  customerAcquisition: string;
  communication: string;

  // Étape 5 - Finances
  initialInvestment: number;
  monthlyExpenses: number;
  salesForecast: number;
  teamSize: number;
  revenueModel: string;
}

export interface GeneratedBusinessPlan {
  executiveSummary: string;
  projectPresentation: string;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  marketStudy: string;
  competitiveAnalysis: string;
  marketingStrategy: string;
  operationalPlan: string;
  hrOrganization: string;
  riskManagement: string;
  conclusion: string;
}

export interface FinancialData {
  year1: YearlyFinancials;
  year3: YearlyFinancials;
  year5: YearlyFinancials;
  breakEvenPoint: number;
  roi: number;
  workingCapitalNeed: number;
}

export interface YearlyFinancials {
  revenue: number;
  expenses: number;
  netProfit: number;
  cashFlow: number;
  incomeStatement: MonthlyData[];
  cashFlowStatement: MonthlyData[];
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  result: number;
}

export const PRICING_PLANS = {
  ONE_TIME: {
    name: "Document Unique",
    price: 10000,
    currency: "FCFA",
    description: "Un business plan complet",
    features: [
      "1 business plan complet",
      "Export PDF",
      "Analyse IA complète",
      "Module financier",
    ],
  },
  MONTHLY: {
    name: "Abonnement Mensuel",
    price: 25000,
    currency: "FCFA",
    description: "Générations illimitées",
    features: [
      "Générations illimitées",
      "Export PDF, Word, Excel",
      "Analyse IA complète",
      "Module financier avancé",
      "Support prioritaire",
    ],
  },
  PREMIUM: {
    name: "Abonnement Premium",
    price: 50000,
    currency: "FCFA",
    description: "Accès complet",
    features: [
      "Tout du plan Mensuel",
      "Pitch Deck IA",
      "Prévisions financières avancées",
      "Export illimité",
      "Accès API",
      "Support dédié",
    ],
  },
} as const;

export const SECTORS = [
  "Agriculture & Agroalimentaire",
  "Commerce & Distribution",
  "Construction & BTP",
  "Education & Formation",
  "Energie & Environnement",
  "Finance & Assurance",
  "Hôtellerie & Restauration",
  "Immobilier",
  "Industrie & Manufacture",
  "Logistique & Transport",
  "Numérique & Technologie",
  "Santé & Pharmacie",
  "Services aux entreprises",
  "Services aux particuliers",
  "Télécommunications",
  "Tourisme & Loisirs",
  "Autre",
] as const;

export const AFRICAN_COUNTRIES = [
  "Cameroun",
  "Côte d'Ivoire",
  "Sénégal",
  "Mali",
  "Burkina Faso",
  "Niger",
  "Tchad",
  "République Centrafricaine",
  "République du Congo",
  "République Démocratique du Congo",
  "Gabon",
  "Guinée Équatoriale",
  "Guinée",
  "Bénin",
  "Togo",
  "Madagascar",
  "Mauritanie",
  "Maroc",
  "Tunisie",
  "Algérie",
  "Autre",
] as const;
