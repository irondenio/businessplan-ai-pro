"use client";

import Link from "next/link";
import { FileText, PlusCircle, Trash2, ArrowRight, CheckCircle, Clock, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { BusinessPlan } from "@prisma/client";

const statusConfig = {
  DRAFT: { label: "Brouillon", icon: Clock, color: "text-gray-500 bg-gray-100" },
  GENERATING: { label: "En cours", icon: Loader2, color: "text-blue-500 bg-blue-100" },
  COMPLETED: { label: "Complété", icon: CheckCircle, color: "text-green-500 bg-green-100" },
  ARCHIVED: { label: "Archivé", icon: Clock, color: "text-gray-400 bg-gray-50" },
};

export function PlansList({ plans }: { plans: BusinessPlan[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce business plan ?")) return;
    setDeletingId(id);
    await fetch(`/api/plans/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun business plan</h3>
        <p className="text-gray-500 text-sm mb-6">Créez votre premier business plan avec l&apos;IA.</p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4" />
          Créer maintenant
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {plans.map((plan) => {
        const config = statusConfig[plan.status as keyof typeof statusConfig] || statusConfig.DRAFT;
        const Icon = config.icon;
        return (
          <div key={plan.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", config.color)}>
                <Icon className="w-3 h-3" />
                {config.label}
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1 truncate">{plan.title}</h3>
            <p className="text-xs text-gray-400">Créé le {formatDate(plan.createdAt)}</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
              <button
                onClick={() => handleDelete(plan.id)}
                disabled={deletingId === plan.id}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                {deletingId === plan.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>

              <Link
                href={`/plans/${plan.id}`}
                className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                Ouvrir <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
