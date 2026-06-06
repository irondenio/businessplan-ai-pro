import { FileText, CheckCircle, Download, CreditCard } from "lucide-react";

interface Props {
  stats: {
    plansCount: number;
    plansCompleted: number;
    exportsCount: number;
    plan: string;
  };
}

const planLabels: Record<string, string> = {
  ONE_TIME: "Document Unique",
  MONTHLY: "Mensuel",
  PREMIUM: "Premium",
  Aucun: "Gratuit",
};

export function DashboardStats({ stats }: Props) {
  const cards = [
    {
      icon: FileText,
      label: "Business Plans",
      value: stats.plansCount,
      sub: "Total créés",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: CheckCircle,
      label: "Plans Complétés",
      value: stats.plansCompleted,
      sub: "Avec contenu IA",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Download,
      label: "Exports",
      value: stats.exportsCount,
      sub: "PDF, Word, Excel",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: CreditCard,
      label: "Abonnement",
      value: planLabels[stats.plan] || stats.plan,
      sub: "Plan actif",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">{card.label}</span>
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{card.value}</div>
          <div className="text-xs text-gray-400 mt-1">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
