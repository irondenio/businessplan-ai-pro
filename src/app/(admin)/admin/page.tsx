import { Metadata } from "next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
import { formatCurrency } from "@/lib/utils";
import { Users, FileText, CreditCard, Download } from "lucide-react";

export const metadata: Metadata = { title: "Admin - Vue d'ensemble" };

export default async function AdminPage() {
  const [usersCount, plansCount, exportsCount, paymentsData] = await Promise.all([
    prisma.user.count(),
    prisma.businessPlan.count(),
    prisma.export.count(),
    prisma.payment.aggregate({ where: { status: "COMPLETED" }, _sum: { amount: true } }),
  ]);

  const recentUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  const stats = [
    { label: "Utilisateurs", value: usersCount, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Business Plans", value: plansCount, icon: FileText, color: "bg-green-50 text-green-600" },
    { label: "Exports", value: exportsCount, icon: Download, color: "bg-purple-50 text-purple-600" },
    { label: "Revenus", value: formatCurrency(paymentsData._sum.amount || 0), icon: CreditCard, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vue d&apos;ensemble</h1>
        <p className="text-gray-500 text-sm">Statistiques globales de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{s.label}</span>
              <div className={`w-9 h-9 ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Derniers utilisateurs inscrits</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-4 px-6 py-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.role === "ADMIN" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
