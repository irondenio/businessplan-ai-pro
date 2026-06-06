import Link from "next/link";
import { FileText, ArrowRight, Clock, CheckCircle, Loader2, Archive } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

const statusConfig = {
  DRAFT: { label: "Brouillon", icon: Clock, color: "text-gray-500 bg-gray-100" },
  GENERATING: { label: "En cours...", icon: Loader2, color: "text-blue-500 bg-blue-100" },
  COMPLETED: { label: "Complété", icon: CheckCircle, color: "text-green-500 bg-green-100" },
  ARCHIVED: { label: "Archivé", icon: Archive, color: "text-gray-400 bg-gray-50" },
};

export function RecentPlans({ plans }: { plans: Plan[] }) {
  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun business plan</h3>
        <p className="text-gray-500 text-sm mb-6">Créez votre premier business plan avec l&apos;IA en quelques minutes.</p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Créer mon premier plan
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Mes derniers business plans</h3>
        <Link href="/plans" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
          Voir tout <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="divide-y divide-gray-50">
        {plans.map((plan) => {
          const config = statusConfig[plan.status as keyof typeof statusConfig] || statusConfig.DRAFT;
          const Icon = config.icon;
          return (
            <Link
              key={plan.id}
              href={`/plans/${plan.id}`}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{plan.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">Modifié le {formatDate(plan.updatedAt)}</p>
              </div>
              <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", config.color)}>
                <Icon className="w-3 h-3" />
                {config.label}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
